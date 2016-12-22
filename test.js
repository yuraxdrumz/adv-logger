const chalk       = require('chalk');
const callerId    = require('caller-id');
const path        = require('path');
const chai        = require('chai');
const expect      = chai.expect;

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
    let arr = [];
    if(args.length === 0){
        return `${fileName}:${lineNumber} no arguments were passed! \n`;
    }
    forEach(args,each=>{
        chosenColor = getRandom();
        if(Array.isArray(each)) type = 'array';
        else type = typeof each;
        arr.push(`${fileName}:${lineNumber} ${type} ${checkIfEachIsMultiline(each)} \n`);
    })
    return arr;
}

let checkIfEachIsMultiline = (each)=>{
    if(typeof each ==='string' && each.includes('\n')){
        return each
    }else{
        each = JSON.stringify(each)
        return each
    }
}

describe('log', function() {
    it('should return filename:lineNumber no arguments passed', function() {
        expect(log()).to.equal('test.js:48 no arguments were passed! \n');
    });
    it('should return an array',function(){
        expect(log('123',[1,2,3],{1:2},true,null,undefined)).to.have.members([
            'test.js:51 string \"123\" \n',
            'test.js:51 array [1,2,3] \n',
            'test.js:51 object {\"1\":2} \n',
            'test.js:51 boolean true \n',
            'test.js:51 object null \n',
            'test.js:51 undefined undefined \n',
        ])
    })
});