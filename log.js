const chalk       = require('chalk');
const callerId    = require('caller-id');
const path        = require('path');

let getRandom = ()=>{
    let colors = ['red','green','white','magenta','cyan','yellow'];
    let randNum = Math.floor(Math.random() * colors.length);
    return colors[randNum]
}

let log = (...args)=>{
    let caller = callerId.getData();
    let fileName = path.basename(caller.filePath);
    let lineNumber = caller.lineNumber;
    let chosenColor;
    let type;
    forEach(args,each=>{
        chosenColor = getRandom()
        if(Array.isArray(each)) type = 'array';
        else type = typeof each;
        each = JSON.stringify(each);
        console.log(chalk.bgCyan(chalk.white.bold(`${fileName}:${lineNumber}`))+chalk[chosenColor]("",type,each))
    })
}


let forEach = (arr,action)=>{
    for(let i=0,len=arr.length;i<len;i++){
        action(arr[i])
    }
}



module.exports = log;

log(321,3,[3,2])