export let text = "asdasdasd";
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2023-08-03T10:51:36.790Z",
    "2023-08-08T10:51:36.790Z",
    "2023-08-09T10:51:36.790Z",
    "2023-08-10T10:51:36.790Z",
    "2023-08-11T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2023-08-08T10:51:36.790Z",
    "2023-08-09T10:51:36.790Z",
    "2023-08-10T10:51:36.790Z",
    "2023-08-11T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Jessica Savis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,
};

export const accounts = [account1, account2, account3];
// Elements
const labelWelcome = document.querySelector(".welcome");
export const labelDate = document.querySelector(".date");
export const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
export const labelTimer = document.querySelector(".timer");

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

// FORMAT FUNCTIONS
const formatMovementsDate = (date, locale) => {
  const calcDayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDayPassed(new Date(), date);

  if (daysPassed === 0) {
    return "Today";
  } else if (daysPassed === 1) {
    return "Yesterday";
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  }
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formattedMovementCurrency = (locale, movement) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: locale.currency,
  }).format(movement);
};

// AFTER LOG IN
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const sortedMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  sortedMovements.forEach((movement, index) => {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formattedMovement = formattedMovementCurrency(acc, movement);

    const html = `
    <div class="movements__row" style="display: flex; justify-content: space-between;">
    <div class="movements__type movements__type--${type}">
    ${index + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class=movements__value">${formattedMovement}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  const formattedMovement = formattedMovementCurrency(acc, acc.balance);

  labelBalance.textContent = `${formattedMovement}`;
};

const calcDisplaySummary = (account) => {
  const incomes = account.movements
    .filter((move) => {
      return move > 0;
    })
    .reduce((acc, cur) => acc + cur, 0);
  const formattedIncome = formattedMovementCurrency(account, incomes);

  labelSumIn.textContent = `${formattedIncome}`;

  const out = account.movements
    .filter((move) => {
      return move < 0;
    })
    .reduce((acc, cur) => acc + cur, 0);
  const formattedOut = formattedMovementCurrency(account, out);
  labelSumOut.textContent = `${formattedOut}`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposite) => (deposite * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  const formattedInterest = formattedMovementCurrency(account, interest);
  labelSumInterest.textContent = `${formattedInterest}`;
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
  displayMovements(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

const startLogOutTimer = () => {
  // set time to 5 min

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // in each call prin the remaning time in UI
    labelTimer.textContent = `${min} : ${sec}`;

    //  Whne 0 second stop timer log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
      containerApp.style.visibility = "hidden";
    }

    // decrese -1s
    time--;
  };

  let time = 120;
  tick();
  let timer = setInterval(tick, 1000);
  return timer;
};

// EVENTS
// LOGIN FUNCTION
let currentAccount, timer;
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

    // const date = new Date();
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "long",
    };

    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    // display and calculate balance
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();
    updateUi(currentAccount);
  }
});

// DELETE ACCOUNT FUNCTION
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

// TRANSFER FUNCTION
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
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);

    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// LOAD AMOUNT FUNCTION
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  let loadAmount = Math.floor(inputLoanAmount.value);
  let loadAmountCondition = currentAccount.movements.some(
    (mov) => mov >= loadAmount * 0.1
  );
  if (loadAmount > 0 && loadAmountCondition) {
    setTimeout(() => {
      currentAccount.movements.push(loadAmount);
      currentAccount.movementsDates.push(new Date().toISOString());

      inputLoanAmount.value = "";
      updateUi(currentAccount);
    }, 2500);
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// SORT
// TODO: make it work
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// FAKE LOG IN
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;
// containerApp.style.visibility = "visible";
