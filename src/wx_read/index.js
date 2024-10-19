import {ref} from "vue";

import {Message} from "@arco-design/web-vue";

export const WX_READ_URL = "https://weread.qq.com/web/book/read"
export const STATUS = {
    normal: 1, running: 2, finish: 3
}

const config_key = "read_config"
//只有两个界面 不用做状态处理 直接使用ref
export const configRef = ref(window.api.storage.get(config_key))
export const statusRef = ref(STATUS.normal)


let taskId = undefined

export const readSecondsRef = ref(0)


export function initConfig(c) {
    //暂时不做格式检测
    delete c.body.s
    configRef.value = c
    window.api.storage.set(config_key, JSON.parse(JSON.stringify(c)))
}


let error_count = 0
async function readBook() {
    const r = await window.api.wx.read(configRef.value)
    if (window.api.platform.debug) {
        console.log("read result", r)
    }
    const succ = r === 'succ'
    if(!succ){
        error_count += 1
        if(error_count >= 3){
            stopRead()
            Message.error("连续执行错误超过3次 请联系开发者")
            return
        }
    }else{
        error_count = 0
    }
    if (succ) {
        readSecondsRef.value += 30
    } else if (r === 're_key') {
        const keyResult = await window.api.wx.get_sKey(configRef.value)
        if (window.api.platform.debug) {
            console.log("update key", keyResult)
        }
        if (!keyResult.sKey) {
            stopRead()
            Message.error(keyResult.errorMsg ?? '获取sKey失败')
            configRef.value = undefined
        } else {
            configRef.value.cookie.wr_skey = keyResult.sKey
            initConfig(configRef.value)
            await readBook()
        }
    } else {
        stopRead()
        Message.error("未知错误:" + r)
    }
}

export async function startRead(totalSecond) {
    stopRead()
    readSecondsRef.value = 0
    statusRef.value = STATUS.running
    await readBook();
    taskId = setInterval(async () => {
        await readBook();
        if (readSecondsRef.value >= totalSecond) {
            stopRead()
            statusRef.value = STATUS.finish
        }
    }, 30 * 1000)
}


export function stopRead() {
    if (taskId) {
        clearInterval(taskId)
        taskId = undefined
    }
    statusRef.value = STATUS.normal
}

export function clearConfig(){
    configRef.value = undefined
    window.api.storage.remove(config_key)
}




