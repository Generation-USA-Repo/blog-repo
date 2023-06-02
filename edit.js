// Array to store uploaded images
let images = [];

// Get form elements
const form = document.getElementById('upload-form');
const imageInput = document.getElementById('image-input');
const nameInput = document.getElementById('name-input');
const descriptionInput = document.getElementById('description-input');


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

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.classList.add('btn', 'btn-primary', 'mr-2');
  editButton.addEventListener('click', function() {
    editImage(image);
  });
  cardBody.appendChild(editButton);
  card.appendChild(cardBody);
  return card;
}


function editImage(image) {
  const popup = document.createElement('div');
  popup.innerHTML =`<div class="container">
  <div>
      <h2>Add New Info</h2>
      <form id="editForm">
          <div >
          <label for="newName">Edit:</label>
          </div>
          <div >
               <input type="text" id="newName" value="${image.name}" placeholder="New Name"><br><br>
          </div>
          <div >
              <input type="text" id="newDescription" value="${image.description}" placeholder=New Description"><br><br>
          </div>
          <button type="submit" class="btn btn-success">Save</button>
          <button type="button" class="btn btn-warning" id="cancelButton">Cancel</button>
        </form>
      </form>
  </div>`;

  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = '20px';
  popup.style.background = 'white';
  popup.style.border = '1px solid black';

  document.body.appendChild(popup);

  const form = document.getElementById('editForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newName = document.getElementById('newName').value;
    const newDescription = document.getElementById('newDescription').value;
    // const newImageFile = document.getElementById('newImage').files[0];
  
    image.name = newName;
    image.description = newDescription;
    saveImagesToLocalStorage();
    displayImages();
    document.body.removeChild(popup);
  });
  // cancel the edit form
  const cancelButton = document.getElementById('cancelButton');
  cancelButton.addEventListener('click', () => {
    document.body.removeChild(popup);
  });
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
