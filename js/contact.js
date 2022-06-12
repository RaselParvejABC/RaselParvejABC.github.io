const form = document.querySelector("#contactForm");

const waitSpinner = document.querySelector('#wait-spinner');
const submitSuccessMessage = document.querySelector('#submitSuccessMessage');
const submitErrorMessage = document.querySelector('#submitErrorMessage');


form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    form.classList.add('was-validated');
    return;
  }

  waitSpinner.classList.toggle('d-none');
  
  emailjs.sendForm("RaselParvejABC", "MyGithubPageContactForm", this).then(
    function () {
      waitSpinner.classList.toggle('d-none');
      submitSuccessMessage.classList.toggle('d-none');
      setTimeout( () =>  {
        submitSuccessMessage.classList.toggle('d-none');
      },5000);

      form.reset();
    },
    function (_error) {
      waitSpinner.classList.toggle('d-none');
      submitErrorMessage.classList.toggle('d-none');
      setTimeout( () =>  {
        submitErrorMessage.classList.toggle('d-none');
      },5000);
    }
  );

});

const name = document.querySelector("#contactForm #name");
const email = document.querySelector("#contactForm #email");
const message = document.querySelector("#contactForm #message");
