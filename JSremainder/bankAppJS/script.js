"use strict";
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

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455, -307, 25000, -642, -134, 80, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Alamin Mt",
  movements: [2500, 400, -260, 830, -4210, 2200, 4600, -70],
  interestRate: 1.8,
  pin: 2222,
};

const account3 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,
};

const accounts = [account1, account2, account3];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = sorted) {
  containerMovements.innerHTML = "";

  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortedMovements.forEach((movement, index) => {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">
    ${index + 1} ${type}</div>
    <div class=movements__value">${movement}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${acc.balance} EURO`;
};

const calcDisplaySummary = (account) => {
  const incomes = account.movements
    .filter((move) => {
      return move > 0;
    })
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes} EURO`;

  const out = account.movements
    .filter((move) => {
      return move < 0;
    })
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)} EURO`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposite) => (deposite * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} EURO`;
};

const createUsername = (acc) => {
  acc.forEach((name) => {
    name.username = name.owner
      .toLowerCase()
      .split(" ")
      .map((name) => {
        return name[0];
      })
      .join("");
  });
};
createUsername(accounts);

const updateUi = (currentAccount) => {
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

let currentAccount;
btnLogin.addEventListener("click", (event) => {
  // Prevent form for submit
  event.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome msg
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    containerApp.style.visibility = "visible";

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    // display and calculate balance
    updateUi(currentAccount);
  }
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    Number(inputClosePin.value) == currentAccount.pin &&
    inputCloseUsername.value == currentAccount.username
  ) {
    const index = accounts.findIndex(
      (i) => i.username === currentAccount.username
    );
    accounts.splice(index, 1);
    labelWelcome.textContent = `Log in to get started`;
    containerApp.style.opacity = 0;
    containerApp.style.visibility = "hidden";
    // location.reload();
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username &&
    receiverAcc
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUi(currentAccount);
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  let loadAmount = Number(inputLoanAmount.value);
  let loadAmountCondition = currentAccount.movements.some(
    (mov) => mov >= loadAmount * 0.1
  );
  if (loadAmount > 0 && loadAmountCondition) {
    currentAccount.movements.push(loadAmount);
    inputLoanAmount.value = "";
    updateUi(currentAccount);
  }
});
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
