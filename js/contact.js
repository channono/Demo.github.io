document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('customname').value,
                email: document.getElementById('customemail').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('custommessagetext').value
            };

            // Disable submit button and show loading state
            const submitButton = document.getElementById('sendMessage');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ' + 
                                   i18next.t('contact.sending');

            try {
                // Here you would typically send the data to your server
                // For now, we'll simulate a server delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Show success message
                alert(i18next.t('contact.messageSent'));
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                // Show error message
                alert(i18next.t('contact.errorSending'));
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }
});