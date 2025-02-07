  emailjs.init("Zem1i6FxQ8G-0pe8P");

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.send("service_62321520", "template_950zstd", {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      topic: document.getElementById('topic').value,
      message: document.getElementById('message').value
    }).then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
      alert(i18next.t('contact.messageSent'));
    }, function(error) {
       console.log('FAILED...', error);
     alert(i18next.t('contact.errorSending'));
    });
  });
