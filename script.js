document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the default form submission (page reload)
            event.preventDefault();
            
            // Get values from the inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation check
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields before submitting.');
                return;
            }
            
        
            // Success response
            alert(`Thank you, ${name}! Your message has been sent successfully. We will get back to you within 24 hours.`);
            
            // Clear out the form inputs
            contactForm.reset();
        });
    }
});







