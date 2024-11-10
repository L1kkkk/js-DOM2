const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');
const clearGalleryBtn = document.getElementById('clearGallery');
const removeLastBtn = document.getElementById('removeLast');
const reverseGalleryBtn = document.getElementById('reverseGallery');

let imageIds = new Set();

async function fetchImages(count = 4) {
  try {
    const response = await fetch(`https://picsum.photos/v2/list?limit=20`);
    const images = await response.json();
    let newImages = images.filter(img => !imageIds.has(img.id)).slice(0, count);
    newImages.forEach(img => imageIds.add(img.id));
    return newImages;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

async function loadImages(count = 4) {
  const images = await fetchImages(count);
  images.forEach(img => {
    const imgElement = document.createElement('img');
    imgElement.src = img.download_url;
    imgElement.alt = img.author;
    gallery.appendChild(imgElement);
  });
}

function clearGallery() {
  gallery.innerHTML = '';
  imageIds.clear();
}

function removeLastImage() {
  if (gallery.lastChild) {
    gallery.removeChild(gallery.lastChild);
  }
}

function reverseGallery() {
  const images = Array.from(gallery.children);
  gallery.innerHTML = '';
  images.reverse().forEach(img => gallery.appendChild(img));
}


loadImages();


loadMoreBtn.addEventListener('click', () => loadImages());
clearGalleryBtn.addEventListener('click', clearGallery);
removeLastBtn.addEventListener('click', removeLastImage);
reverseGalleryBtn.addEventListener('click', reverseGallery);
