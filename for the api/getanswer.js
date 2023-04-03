// want to make sure that my app works when i guess the right word but i suck at worlde so this app will brute force the api

let currentChar = "a";
let result = [];
let answer = {};
let add = "";
main();

async function main() {
  while (true) {
    let nextString = currentChar.repeat(5);

    await sendRequest(nextString);
    getShit();
    console.log(results);
    console.log(answer);

    console.log(nextString);
    if (currentChar === "z") {
      dict(answer);
      break;
    } else {
      currentChar = String.fromCharCode(currentChar.charCodeAt(0) + 1);
    }
  }
}

// create a new XMLHttpRequest object
async function sendRequest(input) {
  return new Promise((resolve, reject) => {
    const guess = input;
    const url = `https://drtnf.net/wordle_guess?guess=${guess}`;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();
    xhttp.responseType = "json";
    xhttp.onload = async () => {
      if (xhttp.readyState == 4 && xhttp.status == 201) {
        const data = await xhttp.response;
        console.log(data);
        results = data.outcome;
        resolve(data);
      } else {
        reject(`Error ${xhttp.status}`);
      }
    };
  });
}

async function getShit() {
  for (let i = 0; i < 5; i++) {
    if (results[i] === 2) {
      console.log("thats in the right place");
      answer[i] = currentChar;
    }
  }
}

function dict(answer) {
  for (const key in answer) {
    result += answer[key];
  }
  let h1 = document.querySelector('h1');
  h1.textContent = result; 
  sendRequest(result);
  
}
