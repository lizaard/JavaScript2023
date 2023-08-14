"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTO = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (const element of btnsOpenModal)
//   element.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");

const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML = `We use cookied for improved functionality and analytics . 
  <button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);
header.append(message);

// delete elements

document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove();
});

message.style.backgroundColor = "#37383d";
message.style.width = "120%";

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color.-primary", "orangered");

const logo = document.querySelector(".nav__logo");

btnScrollTO.addEventListener("click", (e) => {
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({behavior:'smooth'})
});

const fetchPromise = fetch(
  "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => {
    console.error(`Could not get products: ${error}`);
  });

  // const fetchPromise1 = fetch(
  //   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  // );
  // const fetchPromise2 = fetch(
  //   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
  // );
  // const fetchPromise3 = fetch(
  //   "bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  // );
  
  // Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  //   .then((responses) => {
  //     for (const response of responses) {
  //       console.log(`${response.url}: ${response.status}`);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(`Failed to fetch: ${error}`);
  //   });
  

    const fetchPromise1 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    const fetchPromise2 = fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
    );
    const fetchPromise3 = fetch(
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
    );
    
    Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
      .then((response) => {
        console.log(`${response.url}: ${response.status}`);
      })
      .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
      });
    