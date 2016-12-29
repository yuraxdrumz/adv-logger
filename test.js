const path        = require('path');
const chai        = require('chai');
const expect      = chai.expect;
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
// throw err and parse it to get file name and line num
let catchError = ()=>{
    try{
        throw new Error('throwing this to get info of caller');
    }catch (e){
        let lineNum;
        let stack = e.stack.split('\n').slice(1)[2];
        let filename = stack.substr(stack.indexOf('(')).replace('(',"").replace(")","");
        let foundCaller = path.basename(filename).split(':');
        filePath = foundCaller[0];
        lineNumber = foundCaller[1];
        return {
            filePath,
            lineNumber
        }

    }
};
//main function
let log = (...args)=>{
    //let caller = callerId.getData();
    let caller = catchError();
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

let check = ()=>{
   return catchError()
}

describe('check all functions used in log', function() {
    it('should return filename and line number', function() {
        expect(JSON.stringify(check())).to.equal('{"filePath":"test.js","lineNumber":"140"}');
    });
    it('should return type of argument passed', function() {
        expect(getType('this is a string')).to.equal('string');
        expect(getType(12321)).to.equal('number');
        expect(getType([1,2,3])).to.equal('array');
        expect(getType(`sdadsa
                        sadads
                        sdadsa`)).to.equal('multi-line');
        expect(getType(__filename)).to.equal('path');
        expect(getType({1:2})).to.equal('object');
        expect(getType(check)).to.equal('function');
        expect(getType(null)).to.equal('null');
        expect(getType(undefined)).to.equal('undefined');
        expect(getType(new Date())).to.equal('date');
    });
});
