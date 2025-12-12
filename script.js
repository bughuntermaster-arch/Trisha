// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('#photoFrame img');
const dots = document.querySelectorAll('#carouselDots .dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlide += direction;
    
    // Loop around
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto-play carousel
let autoplayInterval = setInterval(() => {
    changeSlide(1);
}, 4000);

// Pause autoplay on hover
document.getElementById('photoFrame').addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

document.getElementById('photoFrame').addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('photoFrame').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('photoFrame').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeSlide(1); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1); // Swipe right
    }
}

// Create confetti
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#d4af37', '#e8b4a8', '#f5d4cc', '#ffd700'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.opacity = Math.random();
        container.appendChild(confetti);
    }
}

// Countdown timer - set your target date here
function updateCountdown() {
    // Set the date we're counting down to (change this to your target date)
    const targetDate = new Date('2025-12-14T00:00:00').getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('hours-label').textContent = String(seconds).padStart(2, '0');
        // If countdown is finished
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('hours-label').textContent = '00';
        }
    }, 1000);
}

// Initialize
createConfetti();
updateCountdown();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});