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
// const debug = utools.isDev()
const debug = true

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
 * @returns {Promise<*|boolean>}
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
            return true
        } else if (resData.errCode === -2012) {
            console.log("数据格式问题,尝试初始化cookie值");
            return false
        }
    } catch (error) {
        console.error("请求出错:", error);
        return error
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

    const response = await axios.post(get_sKey_url, JSON.stringify(data), {
        headers: headers, withCredentials: true,
        adapter: "http",//@落雨
    });
    console.log("res",response.headers)
    console.log("res",response.data)
    const new_cookie = response.headers['Set-Cookie']
    if(!new_cookie || response.data.errCode === -12013){
        if(debug){
            console.log("重新登录")
        }
    }
    console.log('new_cookie', new_cookie)
    const cookie_obj = parseCookies(new_cookie)
    console.log('cookie_obj', cookie_obj)
    console.log('cookie_obj.wr_skey', cookie_obj.wr_skey)
}


function generateCookie(cookies) {
    return Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ');
}

function parseCookies(cookie){
    return cookie.split(';').map(function(s){
        return s.split('=')
    }).reduce(function(obj, arr){
        obj[arr[0].trimStart().trimEnd()] = arr[1]
        return obj
    }, {})
}


exports.read = read;
exports.get_sKey = get_sKey;
