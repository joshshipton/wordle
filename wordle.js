const secretWord = "goats";
let guesses = document.querySelector(".guesses");
let input = document.querySelector("input");
let button = document.querySelector("button");
let results = [];
turns = 0;


button.addEventListener("click", check_guess);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    check_guess();
  }
});

function getScore(target, guess) {

  let tempResults = [];
  for (i = 0; i < target.length; i++) {
    if (target[i] == guess[i]) {
      tempResults.push(2);
    } else {
    if (target.includes(guess[i])) {
        tempResults.push(1);
      } else {
        tempResults.push(0);
      }
    }

  }
  console.log(tempResults);
  results = tempResults;
}

function check_guess() {
  turns += 1;
  console.log(turns);
  console.log("check_guess ran");
  let guessContent = input.value;
  let guessParent = document.createElement('div');
  guessParent.classList.add('guessParent');
  guesses.appendChild(guessParent);
  if (guessContent.length === 5) {
  
    input.value = "";
    getScore(secretWord, guessContent);
    for (i = 0; i < 5; i++) {
      let newItem = document.createElement('p')
      if (results[i] === 0) {
        newItem.style.backgroundColor = "red";
      } else if (results[i] === 1) {
        newItem.style.backgroundColor = "yellow";
      } else newItem.style.backgroundColor = 'green';
     newItem.textContent = guessContent[i]
     guessParent.appendChild(newItem)}
     if(guessContent === secretWord){
        alert('You win!!!!!');
        button.remove();
        input.remove();
     }
     if(turns === 9){
        alert('You lose');
        button.remove();
        input.remove();
     }
  } else {
    input.value = "";
    alert("guess needs to be 5 letters long");
  }
}
