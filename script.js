function saveImage() {
    const input = document.getElementById('image-input');
    const file = input.files[0];
    
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageData = event.target.result;
      localStorage.setItem('savedImage', imageData);
      displayImage(imageData);
    };
    
    reader.readAsDataURL(file);
  }
  
  function displayImage(imageData) {
    const container = document.getElementById('image-container');
    const img = document.createElement('img');
    img.src = imageData;
    container.appendChild(img);
  }
  
  // Load the saved image on page load if available
  document.addEventListener('DOMContentLoaded', function() {
    const savedImage = localStorage.getItem('savedImage');
    if (savedImage) {
      displayImage(savedImage);
    }
  });
  