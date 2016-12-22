class Logger{
    constructor(randomColor=true,colorIfNotRandom=null,showType=true,stringify=true){
        this.randomColor = randomColor;
        this.colorIfNotRandom = colorIfNotRandom;
        this.showType = showType;
        this.stringify = stringify;
        this.colors = ['red','green','white','magenta','cyan','yellow'];
    }
    getRandom(){
        let randNum = Math.floor(Math.random() * this.colors.length);
        return this.colors[randNum]
    }
    getChosenColorIfNotRandom(color){
        return this.colors[color]
    }
    forEach(arr,action){
        for(let i=0,len=arr.length;i<len;i++){
            action(arr[i])
        }
    }
    static log(...args){
        let caller = callerId.getData();
        let fileName = path.basename(caller.filePath);
        let lineNumber = caller.lineNumber;
        let chosenColor;
        let type;
        this.forEach(args,each=>{
            if(this.randomColor) chosenColor = getRandom();
            else chosenColor = this.colorIfNotRandom;
            if(Array.isArray(each)) type = 'array';
            else type =typeof each;
            if(this.stringify) each = JSON.stringify(each);
            if(this.showType){
                console.log(chalk.bgCyan(chalk.white.bold(`${fileName}:${lineNumber}`))+chalk[chosenColor]("",type,each))
            }else {
                console.log(chalk.bgCyan(chalk.white.bold(`${fileName}:${lineNumber}`)) + chalk[chosenColor]("", each))
            }
        })
        console.log('-----------------------')

    }

}
const log = require('./log').log
log('adsads')
log('adsads')
log('adsads')
log('adsads', [321,32,"2"])