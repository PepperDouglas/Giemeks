let currentSymbolChoice = '';

let firstSymbol = document.getElementsByClassName('symbol_slot')[0];
let boardArray = document.getElementById('s04');

console.log(firstSymbol.innerText);

firstSymbol.addEventListener('click', function(t){
    currentSymbolChoice = t.target.innerText;
    console.log(currentSymbolChoice);
    console.log('IM CLICKED');
});

boardArray.addEventListener('click', function(){
    this.innerText = currentSymbolChoice;
})


