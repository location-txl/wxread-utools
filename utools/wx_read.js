/**
 * 本文件的代码逻辑参考了 https://github.com/findmover/wxread
 */


const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');

function encodeData(data, keysToInclude = null) {
    const sortedKeys = Object.keys(data).sort();
    let queryString = '';

    for (const key of sortedKeys) {
        if (keysToInclude === null || keysToInclude.includes(key)) {
            const value = data[key];
            const encodedValue = encodeURIComponent(String(value));
            queryString += `${key}=${encodedValue}&`;
        }
    }

    if (queryString.endsWith('&')) {
        queryString = queryString.slice(0, -1);
    }

    return queryString;
}

function calHash(inputString) {
    let _7032f5 = 0x15051505;
    let _cc1055 = _7032f5;
    const length = inputString.length;
    let _19094e = length - 1;

    while (_19094e > 0) {
        _7032f5 = 0x7fffffff & (_7032f5 ^ inputString.charCodeAt(_19094e) << (length - _19094e) % 30);
        _cc1055 = 0x7fffffff & (_cc1055 ^ inputString.charCodeAt(_19094e - 1) << _19094e % 30);
        _19094e -= 2;
    }

    return (_7032f5 + _cc1055).toString(16).toLowerCase();
}


const read_url = "https://weread.qq.com/web/book/read";
const get_sKey_url = "https://weread.qq.com/web/login/renewal"

const key = "3c5c8717f3daf09iop3423zafeqoi";
const debug = utools.isDev()

/**
 * config 格式
 * {
 *     header:{
 *         cookie:{},
 *         header:{},
 *         body:{}
 *
 *     }
 * }
 * @param config
 */
async function read(config) {
    const data = config.body
    delete data.s;
    data.ct = Math.floor(Date.now() / 1000);
    data.ts = Date.now();
    data.rn = Math.floor(Math.random() * 1001);
    data.sg = crypto.createHash('sha256').update(`${data.ts}${data.rn}${key}`).digest('hex');
    data.s = calHash(encodeData(data));
    if(debug){
        console.log(`sg:${data.sg}`);
        console.log(`s:${data.s}`);
    }
    const sendData = JSON.stringify(data);
    const headers = config.header

    try {
        headers.cookie = generateCookie(config.cookie)
        if(debug){
            console.log("header   ", headers)
            console.log("sendData", sendData)
        }

        const response = await axios.post(read_url, sendData, {
            headers: headers, withCredentials: true,
            adapter: "http",//@落雨
        });
        const resData = response.data;
        if(debug){
            console.log("res",JSON.stringify(resData));
        }
        if ('succ' in resData) {
            console.log("数据格式正确，阅读进度有效！");
            return "succ"
        } else if (resData.errCode === -2012) {
            console.log("数据格式问题,尝试初始化cookie值");
            return "re_key"
        }
    } catch (error) {
        console.error("请求出错:", error);
        return error.message
    } finally {
        delete headers.cookie
    }
}


async function get_sKey(config) {
    const data = {
        "rq": "%2Fweb%2Fbook%2Fread"
    }
    const headers = config.header
    headers.cookie = generateCookie(config.cookie)

    const response = await axios.post(get_sKey_url, data, {
        headers: headers,
        adapter: "http",//@落雨
    });
    if(debug){
        console.log("request data",JSON.stringify(data))
        console.log("request headers",headers)
        console.log("response data",response.data)
        console.log("response headers",response.headers)
    }

    const new_cookie = response.headers['set-cookie']
    if(debug){
        console.log("new_cookie", new_cookie)
    }
    if(!new_cookie){
        if(debug){
            console.log("重新登录")
        }
        return {
            errorMsg: "请重新在网页登录 获取read接口信息",
        }
    }
    const new_key = getSKeyForCookie(new_cookie)
    if(debug){
        console.log("new_key", new_key)
    }
    if(!new_key){
        return {
            errorMsg: "未知错误 获取密钥失败 请重新在网页登录 获取read接口信息",
        }
    }
    return {
        sKey: new_key
    }
}


function getSKeyForCookie(cookies){
    for (let i = 0; i < cookies.length; i++) {
        if(cookies[i].startsWith("wr_skey")){
            return cookies[i].split(';')[0].split('=')[1]
        }
    }
    return undefined
}


function generateCookie(cookies) {
    return Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ');
}




exports.read = read;
exports.get_sKey = get_sKey;
