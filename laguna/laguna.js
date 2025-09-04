// Mobile menu toggle functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Guest counter functionality
function updateGuestCount(type, change) {
  const countElement = document.getElementById(`${type}Count`);
  let count = parseInt(countElement.textContent);
  count += change;
  
  // Ensure counts don't go below minimum
  if (type === 'adults' && count < 1) count = 1;
  if (type === 'children' && count < 0) count = 0;
  
  countElement.textContent = count;
}

// Contact form functionality
document.getElementById('resortContactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const arrivalDate = document.getElementById('arrivalDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const adults = document.getElementById('adultsCount').textContent;
  const children = document.getElementById('childrenCount').textContent;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value || 'None';
  
  // Format dates for better readability
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Create WhatsApp message
  const whatsappMessage = `*New Reservation Inquiry For Laguna*\n\n` +
                         `*Name:* ${name}\n` +
                         `*Arrival:* ${formatDate(arrivalDate)}\n` +
                         `*Departure:* ${formatDate(returnDate)}\n` +
                         `*Adults:* ${adults}\n` +
                         `*Children:* ${children}\n` +
                         `*Phone:* ${phone}\n` +
                         `*Message:* ${message}`;
  
  // Replace with your actual WhatsApp number in international format (without +)
  const whatsappNumber = '916366429999'; 
  
  // Open WhatsApp with pre-filled message (properly encoded)
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
