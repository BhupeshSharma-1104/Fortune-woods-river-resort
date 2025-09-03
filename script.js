// activities auto scroll
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const container = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.activity-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    const navArrows = document.querySelector('.carousel-nav');
    let currentIndex = 0;
    let autoSlideInterval;
    let cardsPerView = 4;
    
    function calculateVisibleCards() {
        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0]?.offsetWidth + 30;
        cardsPerView = Math.floor(containerWidth / cardWidth);
        return cardsPerView;
    }
    
    function setupCarousel() {
        const totalCards = cards.length;
        calculateVisibleCards();
        
        if (totalCards <= cardsPerView) {
            dotsContainer.style.display = 'none';
            if (navArrows) navArrows.style.display = 'none';
            carousel.style.justifyContent = 'center';
            return;
        } else {
            dotsContainer.style.display = 'flex';
            if (navArrows) navArrows.style.display = 'flex';
            carousel.style.justifyContent = 'flex-start';
        }
        
        dotsContainer.innerHTML = '';
        const totalDots = totalCards - cardsPerView + 1;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        updateCarousel();
        startAutoSlide();
    }
    
    function startAutoSlide() {
        if (cards.length <= cardsPerView) return;
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    
    function nextSlide() {
        if (currentIndex >= cards.length - cardsPerView) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    
    function updateCarousel() {
        const cardWidth = cards[0]?.offsetWidth + 30;
        const scrollPosition = currentIndex * cardWidth;
        carousel.style.transform = `translateX(-${scrollPosition}px)`;
        updateDots();
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dots span');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Initialize
    if (window.innerWidth > 750) {
      setupCarousel();
    }

    
    // Handle resize
    resizeTimer = setTimeout(() => {
    pauseAutoSlide();
    if (window.innerWidth > 750) {
      setupCarousel();
    }
}, 250);

    
    // Navigation arrows
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
                resetAutoSlide();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - cardsPerView) {
                currentIndex++;
                updateCarousel();
                resetAutoSlide();
            }
        });
    }
    
    // Pause on hover
    container.addEventListener('mouseenter', pauseAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
});

// Add this to your script.js
// Update copyright year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.createElement('button');
  menuToggle.classList.add('mobile-menu-toggle');
  menuToggle.innerHTML = '☰';
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
  
  const navbar = document.querySelector('.navbar');
  const navMenu = document.querySelector('.nav-menu');
  
  // Insert the toggle button
  navbar.appendChild(menuToggle);
  
  // Toggle menu on click
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      menuToggle.innerHTML = '☰';
    });
  });
  
  // Update year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Add to your existing JavaScript
// Video loading optimization
document.addEventListener('DOMContentLoaded', function() {
    // Optimize video loading
    const video = document.querySelector('.hero-section video');
    if (video) {
        video.addEventListener('loadeddata', function() {
            this.classList.add('loaded');
        });
        
        // Set video to low priority loading
        video.setAttribute('preload', 'metadata');
    }
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
    
    // Add schema markup dynamically
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.fortunewoodsriverresorts.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Dandeli Resorts",
                "item": "https://www.fortunewoodsriverresorts.com/dandeli-resorts"
            }
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
});


// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    
    faqItems.forEach(function(question) {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].parentElement.classList.add('active');
    }
});