console.log("start clean")

const fs = require('fs')
const path = require('path')
const dir = process.cwd()
const dist = path.join(dir, 'dist')

if(fs.existsSync(dist)){
    fs.rmSync(dir + "/dist", { recursive: true })
}

const plugin_dist = path.join(dir, 'utools/dist')
if(fs.existsSync(plugin_dist)){
    fs.rmSync(plugin_dist, { recursive: true })
}
