const chalk       = require('chalk');
const callerId    = require('caller-id');
const path        = require('path');

//chalk colors with black and gray removed
let colors = ['red','green','white','magenta','cyan','yellow'];

//foreach loop for reuse
let forEach = (arr,action)=>{
    for(let i=0,len=arr.length;i<len;i++){
        action(arr[i])
    }
};

//gets an array and returns random item from that array
let getRandom = (arr)=>{
    let randNum = Math.floor(Math.random() * arr.length);
    return arr[randNum]
};

//checks if string is multi line and not stringify it
let checkIfMultiLine = (each)=>{
    if(typeof each ==='string' && each.includes('\n')){
        return each;
    }else{
        each = JSON.stringify(each);
        return each;
    }
};

//writes to the console
let write = (msg)=> process.stdout.write(msg);

//tries to parse each argument passed if it was stringified, else returns item as is
let checkIfStringified = (item)=>{
    try{
        return JSON.parse(item);
    }catch(e){
        return item;
    }
};

//main function
let log = (...args)=>{
    let caller = callerId.getData();
    let fileName = path.basename(caller.filePath);
    let lineNumber = caller.lineNumber;
    let chosenColor;
    let type;
    if(args.length === 0){
        write(chalk.underline(chalk.white.bold(`${fileName}:${lineNumber}`))+chalk[getRandom(colors)]("",'no arguments were passed!' + '\n'));
        return write('-----------------------------------' + '\n');
    }
    forEach(args,each=>{
        each = checkIfStringified(each);
        chosenColor = getRandom(colors);
        Array.isArray(each) ? type = 'array' : type = typeof each;
        write(chalk.underline(chalk.white.bold(`${fileName}:${lineNumber}`))+chalk[chosenColor]("",type,checkIfMultiLine(each)) + '\n');
    });
    return write('------------------------------ \n');
};

module.exports = log;
