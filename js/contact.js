document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('topic').value,
                message: document.getElementById('message').value
            };

            // Disable submit button and show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ' + 
                                   i18next.t('contact.sending');

            try {
                // Read the current messages
                const response = await fetch('/data/messages.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const messages = await response.json();

                // Add new message to the list
                messages.push(formData);

                // Write the updated messages back to the file (note: this requires server-side support, which GitHub Pages does not provide)
                await fetch('/path/to/messages.json', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messages)
                });

                // Show success message
                alert(i18next.t('contact.messageSent'));
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
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
