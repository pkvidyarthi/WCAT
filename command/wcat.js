#!/usr/bin/env node
let fs = require("fs");
//INPUT
let  inputArr = process.argv.slice(2);
//console.log(inputArr);
// OPTIONS
let optionsArr = [];
let filesArr = [];
//Identify Option
for(let i = 0; i < inputArr.length; i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionsArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);  
    }
}
//Option Check
let isBothPresent = optionsArr.includes("-b") && optionsArr.includes("-n");
if(isBothPresent == true){
    console.log("Either enter -b or -n option.");
    return;
}
//Existance 
for(let i = 0; i <filesArr.length; i++){
    let isPresent = fs.existsSync(filesArr[i]);
if(isPresent == false){
    console.log(`File ${filesArr[i]} is not present.`);
    return;
}
}
//READ FILES
let content = "";
for(let i = 0; i < filesArr.length; i++){
    // Buffer
    let bufferContent = fs.readFileSync(filesArr[i]);
    content += bufferContent + "\r\n";  //bufferContent appended into content
    
}
//console.log(content);
let contentArr = content.split("\r\n");
//console.log(contentArr);

/*
-s filepath => 
convert big line breaks into a singular line break
*/

let isSPresent = optionsArr.includes("-s");
if(isSPresent == true){
    for(let i =1; i < contentArr.length; i++){
        // don't start with i = 0; because we have to keep first space.
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let  i =0; i < contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}

//console.log(contentArr.join("\n"));

// -n filepath => give numbering to all the lines.
let isNPresent = optionsArr.includes("-n");
if(isNPresent == true){
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = `${i + 1} ${contentArr[i]}`;
    }
}
//console.log(contentArr.join("\n"));

//-b filepath => give numbering to non-empty lines.

let isBPresent = optionsArr.includes("-b");
if(isBPresent == true){
    let counter = 1;
    for( let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));
