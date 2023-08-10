"use strict";
const accountse = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455, -307, 25000, -642, -134, 80, 1300],
  interestRate: 1.2, // %
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

const accountes = [accountse, account2, account3];
function ceva(t) {
  let x = t.map((item) => ({ val: item }));
  return x;
}

function transformToObjects(numberArray) {
  let x = numberArray.map((item) => ({ val: item }));
  return x;
}

// DOG APP

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);
  dogs.forEach((dog, index) => {
    if (dog >= 3) {
      console.log(
        `Dog number ${index + 1} is and adult, and is ${dog} years old`
      );
    } else {
      console.log(`Dog number ${index + 1} is still a puppy`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 31]);

// forEach Map for
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const euroToUsd = 1.1;

const transformUSD = account1.movements.map((move) => {
  return move * euroToUsd;
});

console.log(transformUSD);

const arr = [];
for (const mov of account1.movements) {
  arr.push(mov * euroToUsd);
}
console.log(arr);

const movementDescription = account1.movements.map((mov, index) => {
  if (mov > 0) {
    return `Movement ${index + 1}: You desposite ${mov}`;
  } else {
    return `Movement ${index + 1}: You withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementDescription);

const deposite = account1.movements.filter((mov) => {
  return mov > 0;
});
const withdrew = account1.movements.filter((mov) => {
  return mov < 0;
});
console.log(deposite);

const calcDepositeSum = account1.movements
  .filter((mov) => {
    return mov > 0;
  })
  .reduce((acc, cur) => {
    return acc + cur;
  }, 0);

console.log(calcDepositeSum);

// Maximum values
const maximValue = account1.movements.reduce((cur, next) => {
  return cur > next ? cur : next;
}, 0);

console.log(maximValue);

// Calc age return average

const testDataOne = [5, 2, 4, 1, 15, 8, 3];
const testDataTwo = [16, 6, 10, 5, 6, 1, 4];

const calcAgeOfDogInHuman = (arr) => {
  const humanAge = arr
    .map((age) => {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter((humanAges) => {
      return humanAges >= 18;
    })
    .reduce((acc, cur, _i, arr) => (acc + cur) / arr.length, 0);
  return humanAge;
};

let x = calcAgeOfDogInHuman(testDataOne);
let y = calcAgeOfDogInHuman(testDataTwo);
console.log(y);
console.log(x);

const users = [
  {
    id: 1,
    name: "Andrei",
    isActive: true,
    age: 30,
  },
  {
    id: 2,
    name: "Andrei1",
    isActive: true,
    age: 20,
  },
  {
    id: 3,
    name: "Andrei1",
    isActive: false,
    age: 10,
  },
];

let userName = users
  .sort((a, b) => a.age - b.age)
  .filter((user) => user.isActive)
  .map((name) => {
    return name.name;
  });

console.log(userName);

const counter = () => {
  let count = 0;
  return {
    increment: (val = 1) => {
      count += val;
    },
    getValue: () => {
      return count;
    },
  };
};

console.log(counter());

const multiply = (num1) => {
  return (num2) => {
    return num1 * num2;
  };
};

console.log(multiply(2)(6));

// curry functions

const curry = (fn) => {
  let arity = fn.length;
  return (...args) => {
    if (args.length >= arity) {
      console.log(args);
      return fn(...args);
    } else {
      console.log("need more arguments");
    }
  };
};
const sum = curry((a, b, c) => a + b + c);
console.log(sum(1, 3));

const number = [1, 2];
const num = 3;

console.log([...number, num]);

// function concatenate 2 arr

const concatenateArr = (arr1, arr2) => {
  return [...arr1, ...arr2];
};

console.log(concatenateArr(number, [6, 7, 8]));

users.forEach((x) => {
  if (x.age > 15) {
    return console.log(x.age);
  }
});

const isNameExists = (name, arr) => {
  arr.some((el) => el.name === name);
};
isNameExists("Andrei", users);

// Pipeline
const totalDeposite = account1.movements
  .filter((mov) => {
    return mov > 0;
  })
  .map((mov) => {
    return mov * euroToUsd;
  })
  .reduce((acc, cur) => {
    return acc + cur;
  });

console.log(totalDeposite);

// FIND return the first element in the array that respect the condition

const firstWithdrawal = account1.movements.find((mov) => mov > 10);
console.log(firstWithdrawal);

const account = accountes.find((acc) => acc.owner === "Alamin Mt");
console.log(account);

console.log(new Array(7).fill(1, 3, 5));

const dice = Array.from({ length: 100 }, (_, i) => i + 1).sort(
  () => 0.5 - Math.random()
);
console.log(dice);

const calcMovements = (accounts) => {
  let calc = accounts
    .flatMap((acc) => acc.movements)
    // .map((acc) => acc.movements)
    // .flat()
    .reduce((acc, cur) => acc + cur, 0);

  console.log(calc);
};
calcMovements(accountes);

const calcDepositeSums = (accounts) => {
  let calc = accounts
    .flatMap((acc) => acc.movements)
    .filter((pos) => pos > 0)
    .reduce((acc, cur) => acc + cur, 0);

  console.log(calc);
};
calcDepositeSums(accountes);

const calcDepositeSumPositive = (accounts) => {
  let calc = accounts
    .flatMap((acc) => acc.movements)
    .filter((pos) => pos > 1000);
  console.log(calc);
};
calcDepositeSumPositive(accountes);

const calcDepositeSumPositiveLength = (accounts) => {
  let calc = accounts
    .flatMap((acc) => acc.movements)
    .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
  console.log(calc);
};
calcDepositeSumPositiveLength(accountes);

const calcDepositeSumPositiveAndNegative = (accounts) => {
  let { deposite, withdrew } = accounts
    .flatMap((acc) => acc.movements)
    .reduce(
      (sums, cur) => {
        // cur > 0 ? (sums.deposite += cur) : (sums.withdrew += cur);

        sums[cur > 0 ? "deposite" : "withdrew"] += cur;
        return sums;
      },
      { deposite: 0, withdrew: 0 }
    );
  console.log(deposite, withdrew);

  let calcWithdraw = accounts
    .flatMap((acc) => acc.movements)
    .filter((pos) => pos < 0)
    .reduce((acc, cur) => acc + cur, 0);
  console.log(calcWithdraw);
  let calcDeposite = accounts
    .flatMap((acc) => acc.movements)
    .filter((pos) => pos > 0)
    .reduce((acc, cur) => acc + cur, 0);
  console.log(calcDeposite);
};
calcDepositeSumPositiveAndNegative(accountes);

const strings = ["asdasda", "asdasda", "asdasdas", "asdasda"];

console.log(
  strings.map((title) => title.charAt(0).toUpperCase() + title.slice(1))
);

//////////////////////////////////////////////////////////////////////////////////

const dogs = [
  {
    weight: 22,
    curFood: 250,
    owners: ["Alice", "Bob"],
  },
  {
    weight: 8,
    curFood: 200,
    owners: ["Matilda"],
  },
  {
    weight: 13,
    curFood: 275,
    owners: ["Sarah", "John"],
  },
  {
    weight: 32,
    curFood: 340,
    owners: ["Michael"],
  },
];

const recommendedFood = (dogs) => {
  dogs.forEach(
    (dog) => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
  );
};

recommendedFood(dogs);
console.log(dogs);

const findOwnerDog = (dogs) => {
  const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
  const above = sarahDog.curFood > sarahDog.recommendedFood * 0.9;
  const below = sarahDog.curFood < sarahDog.recommendedFood * 1.1;
  if (above) {
    console.log("Is eating to much");
  } else if (below) {
    console.log("Is eating to little");
  }
};
findOwnerDog(dogs);

const separteOwners = (dogs) => {
  let overWeight = dogs
    .filter((dog) => dog.curFood > dog.recommendedFood)
    .flatMap((dog) => dog.owners);

  let subWeight = dogs
    .filter((dog) => dog.curFood < dog.recommendedFood)
    .flatMap((dog) => dog.owners);
  console.log(overWeight);
  console.log(subWeight);
  console.log(`${overWeight.join(" and ")} dogs eat to much`);
  console.log(`${subWeight.join(" and ")} dogs eat to little`);
};

separteOwners(dogs);

console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));
const checkFoodAmount = (doge) =>
  doge.curFood > doge.recommendedFood * 0.9 &&
  doge.curFood < doge.recommendedFood * 1.1;
console.log(dogs.some(checkFoodAmount));

console.log(dogs.filter(checkFoodAmount));

const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);
