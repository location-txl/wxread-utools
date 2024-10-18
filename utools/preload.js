console.log("preload.js loaded")
const wx_read  = require("./wx_read")
//
// const pluginOutCallback = []
// let pluginEnterData = undefined
// const pluginReadyCallback = []
//
// function readay(){
//     return pluginEnterData
// }
//
// function notifyReady(){
//     if(readay()){
//         pluginReadyCallback.forEach((callback) => {
//             callback(pluginEnterData)
//         })
//     }
// }
//
// utools.onPluginEnter(({code, type, payload, option}) => {
//     console.log('用户进入插件应用', code, type, payload, option)
//     pluginEnterData = {
//         code: code, type: type, payload: payload, option: option
//     }
//     notifyReady()
// })
//
// utools.onPluginOut((processExit) => {
//     if (processExit) {
//         console.log('插件应用完全退出')
//     } else {
//         console.log('插件应用隐藏后台')
//     }
//     window.api.local_storage.persist()
//     pluginOutCallback.forEach((callback) => {
//         callback(processExit)
//     })
// })
//
//
//
//
//
//
// window.api = {
//     platform:{
//         deviceId:utools.getNativeId(),
//         isDarkMode: () => {
//             return window.matchMedia('(prefers-color-scheme: dark)').matches
//         },
//         registerDarkModeListener: (callback) => {
//             window.matchMedia('(prefers-color-scheme: dark)')
//                 .addEventListener('change', event => {
//                     if (event.matches) {
//                         callback(true)
//                     } else {
//                         callback(false)
//                     }
//                 })
//         },
//         openUrl:(url) => {
//             utools.shellOpenExternal(url)
//         },
//         isMacOS:() => {
//             return utools.isMacOS()
//         },
//         isDev:utools.isDev(),
//         debug: utools.isDev() && false,
//     },
//     storage:{
//         get: (key) => {
//             return utools.dbStorage.getItem(key)
//         },
//         set: (key, value) => {
//             utools.dbStorage.setItem(key, value)
//         },
//         remove: (key) => {
//             utools.dbStorage.removeItem(key)
//         },
//     },
//     plugins:{
//         registerPluginOutCallback:(callback) => {
//             pluginOutCallback.push(callback)
//         },
//         registerPluginReadyCallback: (callback) => {
//             if (readay()) {
//                 callback(pluginEnterData)
//             } else {
//                 pluginReadyCallback.push(callback)
//             }
//         },
//         exitPlugin:() =>{
//             utools.outPlugin()
//         }
//     },
//     wx:wx_read
// }
const a = {
    "method": "POST",
    "header": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "baggage": "sentry-environment=production,sentry-release=dev-1729059353664,sentry-public_key=ed67ed71f7804a038e898ba54bd66e44,sentry-trace_id=9d90a142c53d4681abd7b4606cd4fdc8",
        "content-type": "application/json;charset=UTF-8",
        "origin": "https://weread.qq.com",
        "priority": "u=1, i",
        "referer": "https://weread.qq.com/web/reader/2d3420b3643425f395031376e76377167314f30366d53366b713066563831370e9k98f3284021498f137082c2e",
        "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sentry-trace": "9d90a142c53d4681abd7b4606cd4fdc8-b671a681cf3ade57",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
    },
    "url": "https://weread.qq.com/web/book/read",
    "body": {
        "appId": "wb115321887466h1535937327",
        "b": "2d3420b3643425f395031376e76377167314f30366d53366b713066563831370e9",
        "c": "98f3284021498f137082c2e",
        "ci": 20,
        "co": 4058,
        "sm": "是宝宝心理还是舍不下丽丽，还是舍不下自己",
        "pr": 79,
        "rt": 30,
        "ts": 1729240021789,
        "rn": 536,
        "sg": "3c208c795b2d2188aa6734358ce423d940f6dc9c76cfb4fd8a9c3a9623e725d4",
        "ct": 1729240021,
        "ps": "4d5322b07a4e7254g011b5f",
        "pc": "966329e07a4e7254g019520",
        "dy": 1,
        "fm": "epub"
    },
    "cookie": {
        "wr_fp": "2671311802",
        "wr_gid": "214648857",
        "wr_skey": "sGNZ2UTu",
        "wr_vid": "364948414",
        "wr_rt": "web%40XOKnqAPGqmqXt6LFkuK_AL",
        "wr_localvid": "977321e0815c0abbe977b2b",
        "wr_name": "location",
        "wr_avatar": "https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTIu6dL8xykdcPSl5UXRThw02zniaXia4ZY2OPeKMgDIjia5ibe3phJrgSaoWVl9tIksiac7c8DVDRydT2Q%2F132",
        "wr_gender": "1"
    }
}

wx_read.get_sKey(a)







