'use strict';

// element selections
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

Array.from(btnsOpenModal).forEach((ele, index, arr) =>
  ele.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('.hidden')) {
    closeModal();
  }
});

// smooth scroll on 'learn more btn'
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// page navigation
// Array.from(document.querySelectorAll('.nav__link')).forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// event delegation (reducing call back function to only specific clicked elements)
// step 1: add event listener to common parent element
// step 2: Find child element that originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();

    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});
