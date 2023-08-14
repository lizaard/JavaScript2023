export let apyKey = "aAAaASADas12133121";

function numberString(arrg) {
  let obj = {};

  for (const element of arrg) {
    const char = element;
    obj[char] = (obj[char] || 0) + 1;
  }

  return obj;
}

// const userAction = async function logMovies() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
//   const movies = await response.json();
//   console.log(movies);
// }
// userAction();

(async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    const movies = await response.json();
    console.log(movies);
  } catch (error) {
    console.log(error);
  }
})();

function spinWords(string) {
  return string
    .split(" ")
    .map((cur) => (cur.length >= 5 ? cur.split("").reverse().join("") : cur))
    .join("");
}

console.log(spinWords("W E L C O M E E E"));

function alphabetPosition(text) {
    const alph = 'abcdefghijklmnopqrstuvwxyz';
    const rez = [];
    
    
    for(const el of text) {
      const letter = el.toLowerCase();
      const index = alph.indexOf(letter) + 1;
      if(index >= 1 && index <= 26) {
        rez.push(index)
      }
    }
    return rez.join(' ');
  }
  
  const text = "Salut, OpenAI!";
  const letters = alphabetPosition(text);
  console.log(letters);