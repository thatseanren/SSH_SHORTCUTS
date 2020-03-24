
/*
    usage: node FIle_transmission.js HOST_NAME [FILE_NAME | CONNECT ]
**/
//Package variable
const path = require('path')
const file = require('fs')
const child = require('child_process');
const chalk = require('chalk')
const stream = require('stream')
const event = require('events')

//prompt unit 
const standard_input = process.stdin
const standard_output = process.stdout

//Javascript shortcut
const getProperty = Object.getOwnPropertyNames
//Application variable
const host = {
    Droplet: {
        ip: '',
        key: '~/.ssh/EXPRESS_',
        userName: 'root',
        desDir: '/root/app/'
    },
}
var args = process.argv.slice(2);

//RegExp for testing arguement
const fileReg = new RegExp(/(\w+)\.(\w+)/)
const stdReg = new RegExp(/[y|Y][eEsS]*/)
// Is HOSTNAME in the host object? 
var HOST_NAME = getProperty(host).indexOf(args[0]) >= 0 ? args[0] : false;
// 
// argument checking
var OPERATION = fileReg.test(args[1]) ? 'scp' : args[1] == 'connect' ? 'ssh' : false;

//finish checking 
if (HOST_NAME && OPERATION) {
    //ssh -i ~/.ssh/EXPRESS_ root@0.0.0.0

    //scp -i  ~/.ssh/EXPRESS_ ~/Desktop/index.html root@0.0.0.0:/root/app/public/
    let arg;
    if (OPERATION == 'ssh') {
        arg = ['-i', host[HOST_NAME]['key'], `${host[HOST_NAME]['userName']}@${host[HOST_NAME]['ip']}`]
    } else {
        arg = ['-i', host[HOST_NAME]['key'], `/Users/rensiyang/Desktop/${args[1]}`, `${host[HOST_NAME]['userName']}@${host[HOST_NAME]['ip']}:${host[HOST_NAME]['desDir']}`]
    }
    console.log(`\n${chalk.bold.red('exicuting')}${arg}...`)
    //arguement check passed
    child.spawn(OPERATION, arg, { stdio: 'inherit' })
    console.log(`\n${chalk.cyan.bold('...connecting')}`)

} else {
    console.log(` Either ${chalk.cyan.bold(HOST_NAME)} or ${chalk.cyan.bold(OPERATION)} is not a valided. `)
}

