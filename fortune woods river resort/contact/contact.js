// Counter adjustment function
function adjustCount(type, change) {
    const input = document.getElementById(type);
    let value = parseInt(input.value) + change;
    if (value >= parseInt(input.min)) {
        input.value = value;
    }
}

// Calculate nights between dates
function calculateNights() {
    const arrival = new Date(document.getElementById('arrivalDate').value);
    const departure = new Date(document.getElementById('departureDate').value);
    
    if (arrival && departure && departure > arrival) {
        const diffTime = departure - arrival;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(`Number of nights: ${diffDays}`);
    }
}

// Form submission handler
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Validate dates
    const arrivalDate = new Date(document.getElementById('arrivalDate').value);
    const departureDate = new Date(document.getElementById('departureDate').value);
    
    if (departureDate <= arrivalDate) {
        alert('Departure date must be after arrival date');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Booking Request';
        return;
    }

    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        arrivalDate: document.getElementById('arrivalDate').value,
        departureDate: document.getElementById('departureDate').value,
        adults: document.getElementById('adults').value,
        children: document.getElementById('children').value,
        contactNumber: document.getElementById('contactNumber').value,
        message: document.getElementById('message').value || 'None'
    };

    // Format WhatsApp message
    const whatsappMessage = 
        `*New Booking Request in Fortune*%0A%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Arrival Date:* ${formData.arrivalDate}%0A` +
        `*Departure Date:* ${formData.departureDate}%0A` +
        `*Guests:* ${formData.adults} adults, ${formData.children} children%0A` +
        `*Contact:* ${formData.contactNumber}%0A` +
        `*Message:* ${formData.message}`;
    
    // WhatsApp number
    const whatsappNumber = "916366429999";
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    
    // Show success popup
    setTimeout(() => {
        document.getElementById('successModal').style.display = 'flex';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Booking Request';
        
        // Reset form
        e.target.reset();
        document.getElementById('adults').value = 1;
        document.getElementById('children').value = 0;
    }, 1000);
});

// Close modal functionality
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('successModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});