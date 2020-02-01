'use strict'

// Slider variables
let sliderItems = document.querySelectorAll(".slider__item");
let sliderItem = document.querySelector(".slider__item");
let sliderList = document.querySelector(".slider__list");
let leftArrow = document.querySelector(".slider__button_arrow-left");
let rightArrow = document.querySelector(".slider__button_arrow-right");
let translateValue = 0;   // Current translate value
let visibleItems = Math.round(sliderList.offsetWidth/sliderItem.offsetWidth);  // Amount of the visible items
let currentItem = visibleItems;  // Element placed nearby in the right side of the slider 
// Modal variables
let petButtons = document.querySelectorAll(".friends-item__button");
// Menu variables
const menu = document.querySelector(".menu");
const nav = document.querySelector(".navigation");
const menuToggler = document.querySelector(".nav-toggler");
const menuCloseBtn = document.querySelector(".menu__button_close");
let isMenuActive = false;

// Slider methods
const slideToRight = () => {
  if(currentItem === sliderItems.length) return;
  translateValue -= sliderItem.offsetWidth;
  sliderList.style.transform = `translateX(${translateValue}px)`;
  currentItem++;
}

const slideToLeft = () => {
  if(currentItem === visibleItems) return;
  translateValue += sliderItem.offsetWidth;
  sliderList.style.transform = `translateX(${translateValue}px)`;
  currentItem--;
}

leftArrow.addEventListener('click', slideToLeft);
rightArrow.addEventListener('click', slideToRight); 

// Modal methods

petButtons.forEach(  // Action binding for each button
  button => button.addEventListener('click', toggleModal)
); 

class Modal {  // Modal component
  constructor(content) {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'modal-window';
    modalWrapper.innerHTML = `
      <div class='modal-window__content'>
        ${content}
        <button 
          class="modal-window__button modal-window__button_close action-button fa fa-close" 
          onclick="toggleModal()">
        </button>
      </div>
    `;

    return modalWrapper;
  }
}

function toggleModal(e) {
  const modal = document.querySelector('.modal-window');
  // Creation of the new modal window based on the content
  if(!modal) {
    document.body.append(new Modal(getModalContent(e)));
    return;
  }

  modal.remove();
}

function getModalContent(e) {  // Content for modal window
  let target = e.target;
  console.log(target);
  let modalItem = target.parentNode.querySelector('.modal-item');

  return modalItem.innerHTML;
}

// Menu methods

const toggleMenu = () => {
  if(!isMenuActive) {  // Open modal
    menu.style.display = "block";
    window.addEventListener('click', handleWindowClick);
    isMenuActive = true;
    return;
  }
  // Close modal
  window.removeEventListener('click', handleWindowClick);
  nav.classList.add('closeNav');
  menu.classList.add('fadeOut');
  nav.addEventListener('transitionend', closeAnimation);
  isMenuActive = false;
}

const closeAnimation = () => {
  nav.removeEventListener('transitionend', closeAnimation)
  nav.classList.remove('closeNav');
  menu.classList.remove('fadeOut');
  menu.style.display = "none";
}

const handleWindowClick = (e) => {
  const target = e.target;
  const targetClasses = target.classList;
  // Close modal, when user clicks on the modal window or one of the menu items
  if(targetClasses.contains('menu') || targetClasses.contains('menu__link')) {
    toggleMenu();
  }
}

menuToggler.addEventListener('click', toggleMenu);
menuCloseBtn.addEventListener('click', toggleMenu);