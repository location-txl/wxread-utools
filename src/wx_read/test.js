import axios from "axios";
import CryptoJS from 'crypto-js';

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

const cookies = {
    'wr_fp': '2671311802',
    'wr_gid': '214648857',
    'wr_skey': 'sGNZ2UTu',
    'wr_vid': '364948414',
    'wr_rt': 'web%40XOKnqAPGqmqXt6LFkuK_AL',
    'wr_localvid': '977321e0815c0abbe977b2b',
    'wr_name': 'location',
    'wr_avatar': 'https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTIu6dL8xykdcPSl5UXRThw02zniaXia4ZY2OPeKMgDIjia5ibe3phJrgSaoWVl9tIksiac7c8DVDRydT2Q%2F132',
    'wr_gender': '1',
};

const headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'baggage': 'sentry-environment=production,sentry-release=dev-1729059353664,sentry-public_key=ed67ed71f7804a038e898ba54bd66e44,sentry-trace_id=9d90a142c53d4681abd7b4606cd4fdc8',
    'content-type': 'application/json;charset=UTF-8',
    'origin': 'https://weread.qq.com',
    'priority': 'u=1, i',
    'referer': 'https://weread.qq.com/web/reader/2d3420b3643425f395031376e76377167314f30366d53366b713066563831370e9k98f3284021498f137082c2e',
    'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sentry-trace': '9d90a142c53d4681abd7b4606cd4fdc8-b671a681cf3ade57',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
};

const url = "https://weread.qq.com/web/book/read";

let data = {
    "appId": "wb182564874663h152492176",
    "b": "ce032b305a9bc1ce0b0dd2a",
    "c": "7cb321502467cbbc409e62d",
    "ci": 70,
    "co": 0,
    "sm": "[插图]第三部广播纪元7年，程心艾AA说",
    "pr": 74,
    "rt": 30,
    "ts": 1727660516749,
    "rn": 31,
    "sg": "991118cc229871a5442993ecb08b5d2844d7f001dbad9a9bc7b2ecf73dc8db7e",
    "ct": 1727660516,
    "ps": "b1d32a307a4c3259g016b67",
    "pc": "080327b07a4c3259g018787",
};

const key = "3c5c8717f3daf09iop3423zafeqoi";
let num = 1;

export async function main() {
    while (true) {
        axios.defaults.withCredentials = true; // 允许发送凭据（如 Cookie）
        console.log(`-------------------第${num}次，共阅读${num * 0.5}分钟-------------------`);
        data.ct = Math.floor(Date.now() / 1000);
        data.ts = Date.now();
        data.rn = Math.floor(Math.random() * 1001);

        // data.sg = crypto.createHash('sha256').update(`${data.ts}${data.rn}${key}`).digest('hex');
        data.sg = CryptoJS.SHA256(`${data.ts}${data.rn}${key}`).toString(CryptoJS.enc.Hex);
        // data.sg = hex(sha256(`${data.ts}${data.rn}${key}`));
        console.log(`sg:${data.sg}`);
        data.s = calHash(encodeData(data));
        console.log(`s:${data.s}`);

        const sendData = JSON.stringify(data);
        try {
            headers.cookie = generateCookie(cookies)
            const response = await axios.post(url, sendData, {
                headers:headers,
            });
            const resData = response.data;
            console.log(resData);
            return resData

            if ('succ' in resData) {
                console.log("数据格式正确，阅读进度有效！");
                num++;
                break
                await new Promise(resolve => setTimeout(resolve, 30000));
            } else {
                console.log("数据格式问题,尝试初始化cookie值");
                cookies.wr_skey = await getWrSkey();
                num--;
                break
            }

            if (num === 200) {
                console.log("阅读脚本运行已完成！");
                await push("阅读脚本运行已完成！");
                break;
            }

            delete data.s;
        } catch (error) {
            console.error("请求出错:", error);
            break;
        }
    }
}

async function getWrSkey() {
    // 实现获取wr_skey的逻辑
    return "new_wr_skey";
}

async function push(message) {
    // 实现推送消息的逻辑
    console.log("推送消息:", message);
}

function generateCookie(cookies) {
    return Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ');
}
console.log(generateCookie(cookies));
// main();
