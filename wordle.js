function Wordle(target, guess){

    let results = [];

    if(target.length != 5 && guess.length != 5){
        return console.log("input words are not 5 characters long")
    }

    for(i=0;i<target.length;i++){

        if(target[i] == guess[i]){
            results.push(2);
            console.log(`The ${i+1} letter is in the right position`)
        }else{
            if(target.includes(guess[i])){
                results.push(1);
                console.log(`The ${i+1} letter is in the word but in a different position`)
                // if its in the word once but not twice
            
            }  
            else{
                console.log(`The ${i+1} letter is not in the word`);
                results.push(0);
            }
        }
    console.log(results);}
}

Wordle("scope", "eagle");


const secretWord = 'goats';

let guesses = document.querySelector('.guesses');
let input = document.querySelector('input');
let button = document.querySelector('button');

button.addEventListener('click', check_guess)
input.addEventListener('keydown', function(e){

})



function check_guess(){
    console.log('check_guess ran')
    //get the content of the guess
    //put the content of the guess in a <p> element in the main div
    //change the color of the letters based on the wordle function's result
    let guessContent = input.value;
    if(guessContent.length === 5){
    let newItem = document.createElement('p');
    newItem.textContent = guessContent;
    guesses.appendChild(newItem);
    input.value = '';}else{
        input = ''
        alert('guess needs to be 5 letters long');
        check_guess();
    }


}





