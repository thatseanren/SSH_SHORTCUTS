const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

let currentDir = __dirname;
function verifyHostFile() {
    const rootDir = path.resolve(__dirname, '..')
    var List = []
    while (true) {
        List.push(currentDir)
        var HostFile = path.resolve(currentDir, 'hofst.json')
        console.log(`\nchecking${chalk.red(` host.json `)}under ${chalk.red(`${currentDir}`)}`)
        if (fs.existsSync(HostFile)) {
            console.log(`\n${chalk.red(HostFile)} exists\n\nproceeding next action...`)
            break;
        }
        var previousFile = currentDir;
        if (previousFile === rootDir) {
            console.error(chalk.red(`Seems like host.json is not existing under ${List}`));
            break;
        }
        currentDir = path.resolve(currentDir, '..')
    }
}
module.teexports.verifyHostFile = verifyHostFile;