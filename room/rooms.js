document.addEventListener('DOMContentLoaded', function() {
    // Room Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const roomSections = document.querySelectorAll('.room-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            roomSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding room section
            const tabId = this.getAttribute('data-tab');
            const targetSection = document.getElementById(tabId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image Gallery Functionality for all rooms
    const setupGallery = (galleryContainerId) => {
        const galleryContainer = document.getElementById(galleryContainerId);
        if (!galleryContainer) return;
        
        const mainImage = galleryContainer.querySelector('.gallery-main img');
        const thumbnails = galleryContainer.querySelectorAll('.thumbnail');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails in this gallery
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Change main image
                mainImage.src = this.src;
                mainImage.alt = this.alt;
                
                // Add fade effect
                mainImage.style.opacity = 0;
                setTimeout(() => {
                    mainImage.style.opacity = 1;
                }, 100);
            });
        });
    };

    // Initialize galleries for each room
    setupGallery('cottage-gallery');
    setupGallery('maharaja-gallery');
    setupGallery('dormitory-gallery');

    // Sticky header enhancement
    const header = document.querySelector('header');
    const roomTabs = document.querySelector('.room-tabs-container');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        }
        
        if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
});