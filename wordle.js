const secretWord = "goats";
let guesses = document.querySelector(".guesses");
let input = document.querySelector("input");
let button = document.querySelector("button");
let results = [];
turns = 0;


// create a new XMLHttpRequest object
function sendRequest(input) {
  return new Promise((resolve, reject) => {
  let guess = input;
  const url = `https://drtnf.net/wordle_guess?guess=${guess}`;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url);
  xhttp.send();
  xhttp.responseType = "json";
  xhttp.onload = async () => {
    if (xhttp.readyState == 4 && xhttp.status == 201) {
      let data = await xhttp.response;
      console.log(data);
      results = data;
      resolve(data);
    } else {
      reject(`Error ${xhttp.status}`);
    }}
  });
}

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

async function check_guess() {
  turns += 1;
  console.log(turns);
  let guessContent = input.value;
  let guessParent = document.createElement("div");
  guessParent.classList.add("guessParent");
  guesses.appendChild(guessParent);
  if (guessContent.length === 5) {
    input.value = "";
    //getScore(secretWord, guessContent);
    try {
      await sendRequest(guessContent);
      console.log(results);}
    catch (error){
      console.log(error);
    }
    for (i = 0; i < 5; i++) {
      let newItem = document.createElement("p");
      if (results.outcome[i] === 0) {
        newItem.style.backgroundColor = "red";
      } else if (results.outcome[i] === 1) {
        newItem.style.backgroundColor = "yellow";
      } else newItem.style.backgroundColor = "green";
      newItem.textContent = guessContent[i];
      guessParent.appendChild(newItem);
    }

    let correct = results.outcome.every(num => num === 2);
    if (correct) {
      alert("You win!!!!!");
      button.remove();
      input.remove();
    }
    if (turns === 10000) {
      alert("You lose");
      button.remove();
      input.remove();
    }
  } else {
    input.value = "";
    alert("guess needs to be 5 letters long");
  }
}
