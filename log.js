const chalk       = require('chalk')
const callerId    = require('caller-id')
const path        = require('path')

let log = (...other)=>{
  let caller = callerId.getData();
  let fileName = path.basename(caller.filePath)
  let lineNumber = caller.lineNumber
  let colors = ['red','green','white','magenta','cyan','yellow']
  let randNum = Math.floor(Math.random() * colors.length)
  console.log(chalk.bgCyan(chalk.white.bold(`${fileName}:${lineNumber}`))+chalk[colors[randNum]]("",...other))
}
module.exports = log
