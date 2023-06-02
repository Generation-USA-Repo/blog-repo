// Array to store uploaded images
let images = [];

// Get form elements
const form = document.getElementById('upload-form');
const imageInput = document.getElementById('image-input');
const nameInput = document.getElementById('name-input');
const descriptionInput = document.getElementById('description-input');

// Add form submission event listener
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const file = imageInput.files[0];
  const name = nameInput.value;
  const description = descriptionInput.value;

  const reader = new FileReader();
  reader.onload = function(event) {
    const imageData = event.target.result;
    const image = {
      name: name,
      description: description,
      data: imageData
    };
    images.push(image);
    saveImagesToLocalStorage();
    displayImages();
    clearForm();
  };
  
  reader.readAsDataURL(file);
});

// Save images to localStorage
function saveImagesToLocalStorage() {
  localStorage.setItem('images', JSON.stringify(images));
}

// Load images from localStorage
function loadImagesFromLocalStorage() {
  const savedImages = localStorage.getItem('images');
  if (savedImages) {
    images = JSON.parse(savedImages);
    displayImages();
  }
}

// Display images in the gallery
function displayImages() {
  const gallery = document.getElementById('image-gallery');
  const pagination = document.getElementById('pagination');
  gallery.innerHTML = '';
  pagination.innerHTML = '';

  const itemsPerPage = 10;
  const totalPages = Math.ceil(images.length / itemsPerPage);

  let currentPage = 1;
  if (location.hash) {
    const hashValue = parseInt(location.hash.substring(1));
    if (!isNaN(hashValue) && hashValue >= 1 && hashValue <= totalPages) {
      currentPage = hashValue;
    }
  }
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < images.length; i++) {
    const image = images[i];
    const card = createCard(image);
    gallery.appendChild(card);
  }

  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.innerText = i;
      button.addEventListener('click', function() {
        location.hash = i;
        displayImages();
      });
      pagination.appendChild(button);
    }
  }
}


// Create a card for an image
function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card', 'mb-4');

  const img = document.createElement('img');
  img.src = image.data;
  img.classList.add('card-img-top');
  card.appendChild(img);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const name = document.createElement('h5');
  name.classList.add('card-title');
  name.innerText = image.name;
  cardBody.appendChild(name);

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.innerText = image.description;
  cardBody.appendChild(description);

  // const editButton = document.createElement('button');
  // editButton.innerText = 'Edit';
  // editButton.classList.add('btn', 'btn-primary', 'mr-2');
  // editButton.addEventListener('click', function() {
  //   editImage(image);
  // });
  // cardBody.appendChild(editButton);

  // const deleteButton = document.createElement('button');
  // deleteButton.innerText = 'Delete';
  // deleteButton.classList.add('btn', 'btn-danger');
  // deleteButton.addEventListener('click', function() {
  //   deleteImage(image);
  // });
  // cardBody.appendChild(deleteButton);

  card.appendChild(cardBody);

  return card;
}


// Clear the form inputs
function clearForm() {
  imageInput.value = '';
  nameInput.value = '';
  descriptionInput.value = '';
}

// Load saved images on page load
document.addEventListener('DOMContentLoaded', function() {
  loadImagesFromLocalStorage();
});
