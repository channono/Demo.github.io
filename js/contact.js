  emailjs.init("service_62321520");

  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.send("service_mcglihb", "template_950zstd", {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      topic: document.getElementById('topic').value,
      message: document.getElementById('message').value
    }).then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
  });
</script>
