
const dir = process.cwd()
const fs = require('fs')
const path = require('path')
const dist_path = path.join(dir, 'dist')
const plugin_dist_path = path.join(dir, 'utools/dist')
//copy dist to plugin/dist
if (fs.existsSync(dist_path)) {
    if(fs.existsSync(plugin_dist_path)){
        fs.rmSync(plugin_dist_path, {recursive: true})
    }
    fs.mkdirSync(plugin_dist_path)
    copyFolderSync(dist_path, plugin_dist_path)
}

console.log("release success")

function copyFolderSync(from, to) {
    fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}