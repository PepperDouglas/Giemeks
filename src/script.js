let currentSymbolChoice = '';

let avaBtn = document.getElementById('avalanche_button');

let symbolMenu = document.getElementsByClassName('symbol_menu')[0].children;

let boardArray = document.getElementsByClassName('board_row');

console.log(symbolMenu.innerText);

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





