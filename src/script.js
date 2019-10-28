let currentSymbolChoice = '';
let avaBtn = document.getElementById('avalanche_button');
let extrButton = document.getElementById('extract');
let insertButton = document.getElementById('insert');
let exdropButton = document.getElementById('exdrop');
let symbolMenu = document.getElementsByClassName('symbol_menu')[0].children;
let boardArray = document.getElementsByClassName('board_row');
let outField = document.getElementsByClassName('output_field');

avaBtn.addEventListener('click', fall);
exdropButton.addEventListener('click', exportDrop);
insertButton.addEventListener('click', insert);
extrButton.addEventListener('click', exportPosition);

let afterAva = 0;
const displayArr = [];

//listens for symbol selection
for(let i = 0; i < symbolMenu.length; i++){
    symbolMenu[i].addEventListener('click', function(t){
            currentSymbolChoice = t.target.innerText;
    });
}

//puts selected symbol
for(let i = 0; i < boardArray.length; i++){
    let aRow = boardArray[i];
    for (let j = 0; j < boardArray.length; j++){
        aRow.children[j].addEventListener('click', function(){
            this.innerText = currentSymbolChoice;
        })
    }
}

//Id getter from html
function intToStringId(num){
    if (num < 10){
        return 's0' + num;
    }
    return 's' + num;
}

//get all elements in the board array
function selectAndSet(count){
    const stringId = intToStringId(count);
    const selectedElement = document.getElementById(stringId);
    return selectedElement.innerText;
}

//Avalanche the array
function fall(){
    let exArr = [];
    let newArr = [];
    let diff = 0;
    for (let i = 0; i <= 24; i++){
        exArr.push(selectAndSet(i));
    }
    newArr = exArr.filter(e => e !== 'NONE');
    diff = 25 - newArr.length;
    afterAva = diff;
    for (let i = 0; i < diff; i++){
        newArr.unshift('');
    }
    for (let i = 0; i <= 24; i++){
        const stringId = intToStringId(i);
        document.getElementById(stringId).innerText = newArr[i];
    }
}

//Convert array to jiemeks string
function stringFromArr(arr){
    let jmxCode = '';
    for (let i = 0; i < arr.length - 1; i++){
        let stringNoSpaceSplit = arr[i].split(' ');
        let stringNoSpaceJoined = stringNoSpaceSplit[0] + stringNoSpaceSplit[1];
        if (arr[i + 1] !== undefined){
            stringNoSpaceJoined += ',';
        }
        jmxCode += stringNoSpaceJoined;
    }
    jmxCode += '\n';
    return jmxCode;
}


//exports only the drop after avalanche
function exportDrop(){
    let extractedArr = [];
    for (let i = 0; i <= afterAva; i++){
        extractedArr.push(selectAndSet(i));
    }
    outField[0].innerText += stringFromArr(extractedArr);
}

//puts out whole board as a jiemeks string
function exportPosition(){
    let extractedArr = [];
    for (let i = 0; i <= 24; i++){
        extractedArr.push(selectAndSet(i));
    }
    outField[0].innerText += stringFromArr(extractedArr);
}

//showcase on board according to jiemeks string
function insert(){
    const insText = document.getElementById('insertText').value;
    let insArr = arrFromString(insText);
    for (let i = 0; i < insArr.length; i++){
        const stringId = intToStringId(i);
        document.getElementById(stringId).innerText = insArr[i];
    }
}

//array from a string
function arrFromString(str){
    str = str.split(',');
    str.filter(e => e !== ',');
    str.pop();
    let newArr = [];
    for (let i = 0; i < str.length; i++){
        let arr = str[i].split('SYM');
        arr[0] = 'SYM';
        let arr2 = arr.join(' ')
        newArr.push(arr2);
    }
    return newArr;
}
