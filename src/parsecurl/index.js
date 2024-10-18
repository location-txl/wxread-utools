import { split } from "shellwords";
const debug = false
//see https://github.com/tj/parse-curl.js/blob/master/index.js
export default function (url){
    const s = url.trimStart()
    if (0 !== s.indexOf('curl ')) return
    if(debug){
        console.log("url", s)
        console.log(split(s))
    }
    var args = rewrite(split(s))
    var out = { method: 'GET', header: {} }
    var state = ''

    args.forEach(function(arg){
        switch (true) {
            case isURL(arg):
                out.url = arg
                break;

            case arg == '-A' || arg == '--user-agent':
                state = 'user-agent'
                break;

            case arg == '-H' || arg == '--header':
                state = 'header'
                break;

            case arg == '-d' || arg == '--data' || arg == '--data-ascii' || arg == '--data-raw':
                state = 'data'
                break;

            case arg == '-u' || arg == '--user':
                state = 'user'
                break;

            case arg == '-I' || arg == '--head':
                out.method = 'HEAD'
                break;

            case arg == '-X' || arg == '--request':
                state = 'method'
                break;

            case arg == '-b' || arg =='--cookie':
                state = 'cookie'
                break;

            case arg == '--compressed':
                out.header['Accept-Encoding'] = out.header['Accept-Encoding'] || 'deflate, gzip'
                break;

            case !!arg:
                switch (state) {
                    case 'header':
                        var field = parseField(arg)
                        out.header[field[0]] = field[1]
                        state = ''
                        break;
                    case 'user-agent':
                        out.header['User-Agent'] = arg
                        state = ''
                        break;
                    case 'data':
                        out.method = 'POST'
                        out.body = out.body
                            ? out.body + '&' + arg
                            : arg
                        state = ''
                        break;
                    case 'user':
                        out.header['Authorization'] = 'Basic ' + btoa(arg)
                        state = ''
                        break;
                    case 'method':
                        out.method = arg
                        state = ''
                        break;
                    case 'cookie':
                        out.header['Set-Cookie'] = arg
                        state = ''
                        break;
                }
                break;
        }
    })

    const cookieStr = out.header.cookie
    if(debug){
        console.log("cookie", parseCookies(cookieStr))
    }
    delete out.header.cookie
    out.cookie = parseCookies(cookieStr)
    if(out.body){
        out.body = JSON.parse(out.body)
    }
    return out
}

function parseCookies(str){
    return str.split(';').map(function(s){
        return s.split('=')
    }).reduce(function(obj, arr){
        obj[arr[0].trimStart().trimEnd()] = arr[1]
        return obj
    }, {})
}

/**
 * Rewrite args for special cases such as -XPUT.
 */

function rewrite(args) {
    return args.reduce(function(args, a){
        if (0 == a.indexOf('-X')) {
            args.push('-X')
            args.push(a.slice(2))
        } else {
            args.push(a)
        }

        return args
    }, [])
}

/**
 * Parse header field.
 */

function parseField(s) {
    return s.split(/: (.+)/)
}

/**
 * Check if `s` looks like a url.
 */

function isURL(s) {
    // TODO: others at some point
    return /^https?:\/\//.test(s)
}