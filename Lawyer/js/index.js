'use strict'

const menuToggler = document.querySelector('.menu-icon');
const menu = document.querySelector('.navigation');
const menuItems = document.querySelectorAll('.menu-item');
const closeMenuButton = document.querySelector('.menu-closeButton');

function menuClose() {
  menu.classList.remove('open');

  menuItems.forEach(
    item => item.removeEventListener('click', menuClose)
  )
}

function menuOpen() {
  menu.classList.add('open');
  
  menuItems.forEach(
    item => item.addEventListener('click', menuClose)
  )
}

menuToggler.addEventListener('click', menuOpen);
closeMenuButton.addEventListener('click', menuClose);