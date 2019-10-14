'use strict'

let form = document.querySelector('.search-form');
let imgs = [];
let counter = 0;
let elemsPerColumn = 0;
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-img');
const columns = document.querySelectorAll('.column');
const loader = document.querySelector('.loader');

//Modal
const replaceLoader = () => {
  modalImage.hidden = !modalImage.hidden;
  loader.hidden = !loader.hidden;
}

const showModal = (src) => {
  modalImage.classList.add('appearence');
  modalImage.src = src;
  
  modalImage.onload = () => {
    replaceLoader();
    console.log(modalImage.offsetHeight >= modalImage.offsetWidth)
    if(modalImage.offsetHeight >= modalImage.offsetWidth) modalImage.classList.add('tall'); //Усечение высоких картинок
  }
  modal.style.display = 'flex';

  document.body.addEventListener('click', hideModal);
}

const hideModal = e => {
  if(!e.target.classList.contains('modal')) return;

  modal.style.display = 'none';
  if(modalImage.classList.contains("tall")) modalImage.classList.remove('tall');
  replaceLoader();

  document.body.removeEventListener('click', hideModal);
}

const onClick = e => {
  let target = e.target;
  if(!target.classList.contains('grid-img')) return;

  showModal(target.dataset.large);
}

document.body.addEventListener('click', onClick);



//Query
const getQuery = () => {
  const query = form.elements.query.value || 'town';
  const imagesPerPage = document.querySelector('.perPage').value;

  return `https://pixabay.com/api/?key=13863081-cfc3b9a87c9f70c0bb449a8f3&q=${query}&image_type=photo&per_page=${imagesPerPage}`
}

form.addEventListener('submit', e => {
  e.preventDefault();
  columns.forEach(item=> item.innerHTML = '');
  imgs = [];

  makeRequest(getQuery());
})

//Request

function makeRequest(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    data.hits.forEach(img => createImg(img))
    elemsPerColumn = Math.floor(imgs.length/4);
    timeDec(setImgs)(imgs);
    observe();
    return data;
  })
  // .then(item => console.log(item.hits))
}


//ImageElement
const createImg = ({webformatURL, largeImageURL}) => {
  let div = document.createElement('div');
  div.className = 'img-wrapper';
  div.innerHTML = `<img src='./imgs/load2.svg' data-src=${webformatURL} data-large=${largeImageURL} class='grid-img'>`;

  imgs = [...imgs, div];
}

function setImgs(imgs) {
  const columnsAmount = columns.length;
  let imgsClone = [...imgs];

  for(let i = 0; i < columnsAmount; i++) {
    let insertImgs = imgsClone.splice(0, elemsPerColumn);
    columns[i].append(...insertImgs);
  }

  if(imgsClone.length) {
    imgsClone.forEach((item, i) => columns[i].append(item)); 
  }
}


// Lazy Load
function observe() {
  const targets = document.querySelectorAll('.grid-img');

  function lazyLoad(target) {
    const intObs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // console.log(entry.intersectionRatio);
  
        // if(entry.isIntersecting) {
        if(entry.intersectionRatio > 0){
          const image = entry.target;
          image.src = image.getAttribute('data-src');
          image.classList.add('appearence');

          observer.disconnect();
        }
      })
    }, {rootMargin: '50px'});

    intObs.observe(target);
  }
  targets.forEach(lazyLoad);
}

// makeRequest('town');
makeRequest(getQuery());


function timeDec(func) {
  return function() {
    let start = Date.now();

    let result = func.apply(this, arguments);

    console.log(`Function execute time: ${Date.now() - start} ms`);
    return result;
  }
}