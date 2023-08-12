import * as scriptOne from "../bank1/script.js";

// DIFFERENT DATA! Contains movement dates, currency and locale

export const account5 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account6 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accountses = [account5, account6];

// console.log(scriptOne.accounts);
// FAKE LOG IN
// scriptOne.updateUi(account5);

// scriptOne.labelBalance.addEventListener("click", (e) => {
//   [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = "green";
//     }
//   });
// });

// const date = new Date();
// const day = date.getDay();
// const month = date.getMonth() + 1;
// const year = date.getFullYear();

// scriptOne.labelDate.textContent = `${day}/${month}/${year}`;
const future1 = new Date(2037, 10, 19, 15, 23);
const future2 = new Date(2047, 10, 19, 15, 23);

const calcDayPassed = (date1, date2) => (date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDayPassed(future1, future2);
console.log(days1);
console.log(new Date(days1));

const mumber = 155789933123.23;

const options = {
  style: "currency",
  unit: "celsius",
  currency: "EUR",
};
const numberFormat = new Intl.NumberFormat(navigator.language, options).format(
  mumber
);
console.log(numberFormat);

const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(`Here is your pizza with ${ing1} and ${ing2} pizza`);
  },
  3000,
  ...ingredients
);

console.log("wait...");
if (ingredients.includes("spinach")) {
  clearTimeout(pizzaTimer);
}


// setInterval(() => {
//   const date = new Date();
//   console.log(date);
// },1000)