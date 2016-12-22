const chalk       = require('chalk');
const callerId    = require('caller-id');
const path        = require('path');

let forEach = (arr,action)=>{
    for(let i=0,len=arr.length;i<len;i++){
        action(arr[i])
    }
};
let getRandom = ()=>{
    let colors = ['red','green','white','magenta','cyan','yellow'];
    let randNum = Math.floor(Math.random() * colors.length);
    return colors[randNum]
};

let log = (...args)=>{
    let caller = callerId.getData();
    let fileName = path.basename(caller.filePath);
    let lineNumber = caller.lineNumber;
    let chosenColor;
    let type;
    if(args.length === 0){
        process.stdout.write(chalk.underline(chalk.white.bold(`${fileName}:${lineNumber}`))+chalk[getRandom()]("",'no arguments were passed!' + '\n'));
        return process.stdout.write('---------------------' + '\n');
    }
    forEach(args,each=>{
        chosenColor = getRandom();
        Array.isArray(each) ? type = 'array' : type = typeof each;
        process.stdout.write(chalk.underline(chalk.white.bold(`${fileName}:${lineNumber}`))+chalk[chosenColor]("",type,checkIfMultiLine(each)) + '\n');
    })
    return process.stdout.write('---------------------' + '\n');
}

let checkIfMultiLine = (each)=>{
    if(typeof each ==='string' && each.includes('\n')){
        return each
    }else{
        each = JSON.stringify(each);
        return each
    }
}

module.exports = log;

