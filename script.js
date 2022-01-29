'use strict';

// element selections
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

const navBar = document.querySelector('.nav');

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

// event delegation (reducing call back function to only specific clicked child element)
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

// Tabbed components

// event delegation to target specific button
tabsContainer.addEventListener('click', function (e) {
  const clickedBtn = e.target.closest('.operations__tab');
  // console.log(clickedBtn);

  // remove active class on all tabs btn before setting active class to clicked btn
  Array.from(tabs).forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });

  if (clickedBtn) {
    clickedBtn.classList.add('operations__tab--active');
  }

  // remove content area of all tabs
  Array.from(tabsContent).forEach(function (content) {
    content.classList.remove('operations__content--active');
  });

  // activate content area of clicked tab
  document
    .querySelector(
      `.operations__content--${clickedBtn.getAttribute('data-tab')}`
    )
    .classList.add('operations__content--active');
});

// menu link fade animation
navBar.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const hoveredLink = e.target;
    console.log(hoveredLink);

    const hoveredLinksiblings = hoveredLink
      .closest('.nav')
      .querySelectorAll('.nav__link');
    console.log(hoveredLinksiblings);

    const logo = hoveredLink.closest('.nav').querySelector('img');
    console.log(logo);

    Array.from(hoveredLinksiblings).forEach(function (el) {
      if (el !== hoveredLink) {
        el.style.opacity = 0.5;

        logo.style.opacity = 0.5;
      }
    });
  }
});

navBar.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const hoveredLink = e.target;
    console.log(hoveredLink);

    const hoveredLinksiblings = hoveredLink
      .closest('.nav')
      .querySelectorAll('.nav__link');
    console.log(hoveredLinksiblings);

    const logo = hoveredLink.closest('.nav').querySelector('img');
    console.log(logo);

    Array.from(hoveredLinksiblings).forEach(function (el) {
      if (el !== hoveredLink) {
        el.style.opacity = 1;

        logo.style.opacity = 1;
      }
    });
  }
});
