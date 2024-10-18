
import {main} from "./test";
export const WX_READ_URL = "https://weread.qq.com/web/book/read"
export const STATUS_NORMAL = 0x1
export const STATUS_FINISH = 0x2
export const STATUS_RUNNING = 0x3

const config_key = "read_config"
let config = window.api.storage.get(config_key)
let status = STATUS_NORMAL

let callback = undefined

export function initConfig(c){
    //暂时不做格式检测
    delete c.body.s
    config = c
    window.api.storage.set(config_key, c)
}

export function getStatus(){
    return status
}


export function setCallback(cb){
    callback = cb
}




export async function start(totalMinute){

    let id = 0
    // const timer =setInterval(async () => {
    //     id++
    //     console.log("id", id)
    // }, 1000)
    return await main()
}




export function stop(){

}

export function getConfig(){
    return config
}



