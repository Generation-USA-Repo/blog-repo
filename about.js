// Get the element to display the images
const galleryContainer = document.getElementById('content');

// Function to display images in the gallery
function displayImages() {
  galleryContainer.innerHTML = '';

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const card = createCard(image);
    galleryContainer.appendChild(card);
  }
}

// Load saved images on page load
document.addEventListener('DOMContentLoaded', function() {
  loadImagesFromLocalStorage();
  displayImages();
});
