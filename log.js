const path        = require('path');

//colors with black,gray and blue removed
let colors        = ['\x1b[31m\x1b[0m','\x1b[32m\x1b[0m','\x1b[33m\x1b[0m','\x1b[35m\x1b[0m','\x1b[36m\x1b[0m'];
let underline     = '\x1b[4m\x1b[0m';
let white         = '\x1b[37m\x1b[0m';
let lastChosen;

//foreach loop for reuse
let forEach = (arr,action)=>{
  for(let i=0,len=arr.length;i<len;i++){
    action(arr[i])
  }
};

//gets an array and returns random item from that array
let getRandom = arr =>{
  let randNum = Math.floor(Math.random() * arr.length);
  if(lastChosen === randNum){
    return getRandom(arr);
  }
  lastChosen = randNum;
  return arr[randNum]
};

//checks if string is multi line and not stringify it
let checkIfMultiLine = (each,type) =>{
  if(type === 'multi-line' || type === 'function'){
    return each;
  }else if (type==='error'){
    return `\n\t${each.stack}`;
  }
  else{
    try{
      return each = JSON.stringify(each);
    }catch(e){
      return each;
    }
  }
};

//writes to the console
let write = msg => process.stdout.write(msg);

//tries to parse each argument passed if it was stringified, else returns item as is
let checkIfStringified = item =>{
  if( Array.isArray(item) || typeof item === 'string' ){
    return item;
  }
  try{
    return JSON.parse(item);
  }catch(e){
    return item;
  }
};

//check type of each item
let getType = each =>{
  if(each instanceof Error){
    return 'error';
  }
  else if(typeof each === 'boolean'){
    return 'boolean'
  }
  else if(typeof each ==='string' && each.includes('\n')){
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
};

// throw err and parse it to get file name and line num
let getStack = () =>{
  try{
    throw new Error('throwing this to get info of caller');
  }catch (e){
    let stack = e.stack.split('\n').slice(1)[2];
    let filename = stack.substr(stack.indexOf('(')).replace('(',"").replace(")","");
    let foundCaller = path.basename(filename).split(':');
    let filePath = foundCaller[0];
    let lineNumber = foundCaller[1];
    return {
      filePath,
      lineNumber
    }
  }
};

//main function
let log = (...args)=>{
  let caller = getStack();
  let fileName = path.basename(caller.filePath);
  let lineNumber = caller.lineNumber;
  let chosenColor;
  let type;
  switch(args.length){
    case 0:
      chosenColor = getRandom(colors);
      write(`${underline + white}${fileName}:${lineNumber}` + `${chosenColor} no arguments were passed! \n`);
      break;
    default:
      forEach(args,each=>{
        each = checkIfStringified(each);
        chosenColor = getRandom(colors);
        type = getType(each);
        write(`${underline + white}${fileName}:${lineNumber}` + `${chosenColor} ${type} ${checkIfMultiLine(each,type)} \n`)
      });
      break;
  }
  return write(`${white}------------------------------------ \n`);
};

module.exports = log;