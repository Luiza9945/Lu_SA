// script.js
let currentImgIndex = 0;
let galleryImages = [];

function openLightbox(img) {
    const lightbox = document.getElementById('.pin');
    const lightboxImg = document.getElementById('.pin-img');
    
    // Preenche array com todas as imagens da galeria
    galleryImages = Array.from(document.querySelectorAll('.gallery img'));
    currentImgIndex = galleryImages.indexOf(img);
    
    lightboxImg.src = img.src;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Impede scroll
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto'; // Reativa scroll
}

function changeImage(direction) {
    currentImgIndex += direction;
    
    // Loop circular
    if (currentImgIndex >= galleryImages.length) {
        currentImgIndex = 0;
    } else if (currentImgIndex < 0) {
        currentImgIndex = galleryImages.length - 1;
    }
    
    const newImg = galleryImages[currentImgIndex];
    document.getElementById('lightbox-img').src = newImg.src;
}

// Fechar com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Navegação por teclado
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});