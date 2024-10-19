console.log("preload.js loaded")
const wx_read = require("./wx_read")








window.api = {
    platform: {
        isDarkMode: () => {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        },
        registerDarkModeListener: (callback) => {
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', event => {
                    if (event.matches) {
                        callback(true)
                    } else {
                        callback(false)
                    }
                })
        },
        openUrl: (url) => {
            utools.shellOpenExternal(url)
        },
        debug: utools.isDev(),
    },
    storage: {
        get: (key) => {
            return utools.dbStorage.getItem(key)
        },
        set: (key, value) => {
            utools.dbStorage.setItem(key, value)
        },
        remove: (key) => {
            utools.dbStorage.removeItem(key)
        },
    },
    plugins: {
        exitPlugin: () => {
            utools.outPlugin()
        },
        onPluginOutCallback: (callback) => {
            utools.onPluginOut(callback)
        }
    },
    wx: wx_read
}











