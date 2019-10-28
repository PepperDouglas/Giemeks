let currentSymbolChoice = '';
let avaBtn = document.getElementById('avalanche_button');
let extrButton = document.getElementById('extract');
let insertButton = document.getElementById('insert');
let exdropButton = document.getElementById('exdrop');
let symbolMenu = document.getElementsByClassName('symbol_menu')[0].children;
let boardArray = document.getElementsByClassName('board_row');
let outField = document.getElementsByClassName('output_field');


console.log(symbolMenu.innerText);
avaBtn.addEventListener('click', fall);
exdropButton.addEventListener('click', exportDrop);
insertButton.addEventListener('click', insert);


for(let i = 0; i < symbolMenu.length; i++){
    symbolMenu[i].addEventListener('click', function(t){
            currentSymbolChoice = t.target.innerText;
            console.log(currentSymbolChoice);
            console.log('IM CLICKED');
    });

}

for(let i = 0; i < boardArray.length; i++){
    console.log('board rows');
    let aRow = boardArray[i];
    for (let j = 0; j < boardArray.length; j++){
        console.log('a slot');
        aRow.children[j].addEventListener('click', function(){
            this.innerText = currentSymbolChoice;
        })
    }
}

//Id getter
function intToStringId(num){
    if (num < 10){
        return 's0' + num;
    }
    return 's' + num;
}

let  afterAva = 0;
//Avalanche the array
function fall(){
    let exArr = [];
    let newArr = [];
    let diff = 0;
    for (let i = 0; i <= 24; i++){
        const stringId = intToStringId(i);
        const selectedElement = document.getElementById(stringId);
        const positionSym = selectedElement.innerText;
        exArr.push(positionSym);
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

const displayArr = [];
//function Export DROP
function exportDrop(){
    let extractedArr = [];
    for (let i = 0; i <= afterAva; i++){
        const stringId = intToStringId(i);
        const selectedElement = document.getElementById(stringId);
        const positionSym = selectedElement.innerText;
        extractedArr.push(positionSym);
    }
    outField[0].innerText += stringFromArr(extractedArr);
}

//function Export Position
extrButton.addEventListener('click', exportPosition);

function exportPosition(){
    let extractedArr = [];
    for (let i = 0; i <= 24; i++){
        const stringId = intToStringId(i);
        const selectedElement = document.getElementById(stringId);
        const positionSym = selectedElement.innerText;
        extractedArr.push(positionSym);
    }
    outField[0].innerText += stringFromArr(extractedArr);
}

//showcase according to JMX string
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
