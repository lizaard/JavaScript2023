 export let apyKey = 'aAAaASADas12133121';

function numberString(arrg){
    let obj = {};

    for (const element of arrg) {
        const char = element;
        obj[char] = (obj[char] || 0) + 1;
    }

    return obj
}

// const userAction = async function logMovies() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
//   const movies = await response.json();
//   console.log(movies);
// }
// userAction();

// (async ()=> {
//   const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
//   const movies = await response.json();
//   console.log(movies);
// })();