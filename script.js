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
const navBarHeight = navBar.getBoundingClientRect().height;

const header = document.querySelector('header');

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

// smooth scroll up effect
// step1 : observe and make scroll up btn visible after passing the header element
const scrollUpBtn = document.querySelector('.scrollUp__btn');
const scrollUp = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (entry.isIntersecting === true) {
    scrollUpBtn.classList.add('hidden');
  } else {
    scrollUpBtn.classList.remove('hidden');
  }
};
const scrollUpOptions = {
  root: null,
  threshold: 0,
};
const observeScrollUpBtn = new IntersectionObserver(scrollUp, scrollUpOptions);
observeScrollUpBtn.observe(header);

// step2 : scroll up into view when the btn is clicked
scrollUpBtn.addEventListener('click', function (e) {
  window.scrollTo({
    top: 0,
    behaviour: 'smooth',
  });
});

// Tabbed components

// event delegation to target specific tab button
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

// navigation links hover fade animation
const hoverHandler = function (e, opacity) {
  const openModal = e.target.classList.contains('btn--show-modal');

  if (e.target.classList.contains('nav__link') && !openModal) {
    const hoveredLink = e.target;

    const hoveredLinksiblings = hoveredLink
      .closest('.nav')
      .querySelectorAll('.nav__link');
    // console.log(hoveredLinksiblings);

    const logo = hoveredLink.closest('.nav').querySelector('img');
    // console.log(logo);

    Array.from(hoveredLinksiblings).forEach(function (el) {
      if (el !== hoveredLink) {
        el.style.opacity = opacity;

        logo.style.opacity = opacity;
      }
    });
  }
};

navBar.addEventListener('mouseover', function (e) {
  hoverHandler(e, 0.6);
});

navBar.addEventListener('mouseout', function (e) {
  hoverHandler(e, 1);
});

const staticNavBar = function (entries) {
  entries.forEach(entry => {
    // console.log(entry);

    if (entry.isIntersecting !== true) {
      navBar.classList.add('sticky');
    } else navBar.classList.remove('sticky');
  });
};

const navBarObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navBarHeight}px`,
};
const headerObserver = new IntersectionObserver(
  staticNavBar,
  navBarObserverOptions
);
headerObserver.observe(header);

// show section after scroll approach
const allSections = document.querySelectorAll('.section');
const showSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (entry.isIntersecting === true) {
    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target);
  }
};
const sectionObserverOptions = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(
  showSection,
  sectionObserverOptions
);
Array.from(allSections).forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// lazy loading images
const imageTargets = Array.from(document.querySelectorAll('img[data-src]'));

const imageTargetsFn = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; // do nothing if entry.isIntersecting is false

  // if entry.isIntersecting is true, replace img src with data-src
  entry.target.src = entry.target.getAttribute('data-src');

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imageTargetsOptn = {
  root: null,
  threshold: 0,
  rootMargin: '+200px',
};

const imageObserver = new IntersectionObserver(
  imageTargetsFn,
  imageTargetsOptn
);

imageTargets.forEach(image => imageObserver.observe(image));

// Add button icon to scroll up after reaching first section
// Add mouse enter effect on nav links to show list
