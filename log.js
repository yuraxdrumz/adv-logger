const callerId    = require('caller-id');
const path        = require('path');
const fs          = require('fs');

//colors with black,gray and blue removed
let colors        = ['\033[31m','\033[32m','\033[33m','\033[35m','\033[36m'];
let underline     = '\033[4m';
let white         = '\033[37m';
let lastChosen;

//foreach loop for reuse
let forEach = (arr,action)=>{
    for(let i=0,len=arr.length;i<len;i++){
        action(arr[i])
    }
};

//gets an array and returns random item from that array
let getRandom = (arr)=>{
    let randNum = Math.floor(Math.random() * arr.length);
    if(lastChosen === randNum){
        return getRandom(arr);
    }
    lastChosen = randNum;
    return arr[randNum]
};

//checks if string is multi line and not stringify it
let checkIfMultiLine = (each)=>{
    let checkType = getType(each)
    if(checkType==='multi-line' || checkType==='function'){
        return each;
    }
    else{
        try{
            each = checkIfPath(each);
            return each = JSON.stringify(each);
        }catch(e){
            return each;
        }
    }
};

// check if string is path and exists, if so, return resolved path
let checkIfPath = (filePath)=>{
    try{
        fs.lstatSync(filePath);
        return path.resolve(filePath);
    }catch (e){
        return filePath;
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

//check type of each item
let getType = (each)=>{
    try{
        fs.lstatSync(each);
        return 'path';
    }catch (e){
        if(typeof each ==='string' && each.includes('\n')){
            return 'multi-line';
        }else if(typeof each === 'function'){
            return 'function';
        }else if(each === null){
            return 'null';
        }else if (each === undefined){
            return 'undefined';
        }else if (Array.isArray(each)){
            return 'array';
        }else if(each instanceof Date){
            return 'date';
        }else if(typeof each === 'object'){
            return 'object';
        }else if (typeof each === 'string'){
            return 'string';
        }else if (!Number.isNaN(each)){
            return 'number';
        }
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
        chosenColor = getRandom(colors);
        write(`${underline + white}${fileName}:${lineNumber}` + `${chosenColor} no arguments were passed! \n`);
        return write(`${white}------------------------------------ \n`);
    }
    forEach(args,each=>{
        each = checkIfStringified(each);
        chosenColor = getRandom(colors);
        type = getType(each);
        write(`${underline + white}${fileName}:${lineNumber}` + `${chosenColor} ${type} ${checkIfMultiLine(each)} \n`)
    });
    return write(`${white}------------------------------------ \n`);
};

module.exports = log;

// attempt to get line num and filename without dependencies
let catchError = ()=>{
    try{
        throw new Error('sadasd');
    }catch (e){
        let stack = e.stack.split('\n').slice(1)[0];
        let filename = path.basename(__filename);
        let lineNum = stack.substr(stack.indexOf(filename)).split(':')[1];
    }
};
