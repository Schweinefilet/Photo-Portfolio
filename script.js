// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// Gallery items (no filtering needed)
const galleryItems = document.querySelectorAll('.gallery-item');

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentImageIndex = 0;
let visibleImages = [];

// Update visible images array (now all images are always visible)
function updateVisibleImages() {
    visibleImages = Array.from(galleryItems);
}

// Open lightbox when clicking on gallery items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateVisibleImages();
        currentImageIndex = visibleImages.indexOf(item);
        openLightbox(item);
    });
});

function openLightbox(item) {
    const img = item.querySelector('img');
    
    // use flex display so the lightbox centers content reliably
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    // captions/descriptions removed — keep caption element empty
    if (lightboxCaption) lightboxCaption.textContent = '';
    // remove any visible class then trigger zoom-in
    lightboxImg.classList.remove('visible');
    // Fade in effect
    setTimeout(() => {
        lightbox.style.opacity = '1';
        lightbox.style.animation = 'lightboxFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        // small delay then add visible class to animate image scale
        setTimeout(() => lightboxImg.classList.add('visible'), 80);
    }, 10);
    lightbox.setAttribute('aria-hidden', 'false');
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

// Close lightbox
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightboxImg.classList.remove('visible');
    lightbox.style.opacity = '0';
    lightbox.style.animation = '';
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
}

// --- Mobile swipe support for lightbox ---
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const swipeThreshold = 50; // px

lightbox.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
}, { passive: true });

lightbox.addEventListener('touchmove', (e) => {
    const t = e.changedTouches[0];
    touchEndX = t.clientX;
    touchEndY = t.clientY;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    // horizontal swipe detection (ignore small vertical moves)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
        if (dx > 0) {
            // swipe right -> previous
            prevBtn.click();
        } else {
            // swipe left -> next
            nextBtn.click();
        }
    }
    // reset
    touchStartX = touchStartY = touchEndX = touchEndY = 0;
}, { passive: true });

// Navigate to previous image
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    openLightbox(visibleImages[currentImageIndex]);
});

// Navigate to next image
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    openLightbox(visibleImages[currentImageIndex]);
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    // check if lightbox is visible using computed style
    if (window.getComputedStyle(lightbox).display !== 'none') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add fade-in animation to sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items for fade-in animation
galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Toggle scrolled class when past threshold so CSS can switch colors/backgrounds
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Add transition to header
header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

console.log('Photography Portfolio loaded successfully!');
