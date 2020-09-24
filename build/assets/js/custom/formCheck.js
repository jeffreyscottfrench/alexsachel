const formCheck = function(){

  // get all the form inputs we're going to check against

  let email = document.getElementsByName('email')[0];
  let phone = document.getElementsByName('main_phone')[0];
  let required = document.querySelectorAll('[required]');
  let submit = document.getElementById('submit');
  let reset = document.getElementById('reset');

  let requiredContent = false;
  let emailContent = false;
  let phoneContent = false;

  let errorMessage;
  let errElName;

  // disable submit without required content
  const enableSubmit = function() {
    if (requiredContent && emailContent && phoneContent) {
      submit.classList.remove('button--disabled');
      submit.setAttribute('type', 'submit');
    } else {
      submit.setAttribute('type', 'disabled');
      submit.classList.add('button--disabled');
    }
  }

  // check inputs against regexp tests
  const checkRequired = function( e ) {
    let reqEl = e.target;
    let reqLbl = reqEl.parentNode.getElementsByTagName('label')[0].textContent;
    errElName = reqEl.name + '-required-error';
    errorMessage = reqLbl + ' is required!';

    if (document.getElementsByName(errElName)[0]) {
      this.parentNode.removeChild(document.getElementsByName(errElName)[0]);
    }

    if (!reqEl.value || reqEl.value==='default') {
      displayMessage(reqEl, errElName, errorMessage);
      requiredContent = false;
    } else {
      requiredContent = true;
      enableSubmit;
    }
  }
  const checkEmail = function() {

    if (document.getElementsByName('email-error')[0]) {
      this.parentNode.removeChild(document.getElementsByName('email-error')[0]);
    }

    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.value && !email.value.match(re)) {
      errorMessage = 'Email address is not in a valid format. Please try again.';
      errElName = 'email-error';
      displayMessage(email, errElName, errorMessage);
      emailContent = false;
    } else {
      emailContent = true;
      enableSubmit();
    }
  }
  const checkPhone = function() {
    if (document.getElementsByName('phone-error')[0]) {
      this.parentNode.removeChild(document.getElementsByName('phone-error')[0]);
    }

    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phone.value && !phone.value.match(re)) {
      errorMessage = 'A phone number with area code is required, but you can let me know to only contact you via email in the last field below.';
      errElName = 'phone-error';
      displayMessage(phone, errElName, errorMessage);
      phoneContent = false;
    } else {
      phoneContent = true;
      enableSubmit();
    }
  }

  // display message if needed
  const displayMessage = function(inputName, errElName, errorMessage){
    let msgEl = document.createElement("span");
    msgEl.textContent = errorMessage;
    msgEl.classList.add('form__input--error');
    msgEl.setAttribute('name', errElName);
    inputName.parentNode.insertBefore(msgEl, inputName.nextSibling);
  }

  // listen for changes/unfocus on form inputs
  required.forEach(req => req.addEventListener('blur', checkRequired))
  required.forEach(req => req.addEventListener('change', checkRequired))
  email.addEventListener('blur', checkEmail);
  email.addEventListener('change', checkEmail);
  phone.addEventListener('blur', checkPhone);
  phone.addEventListener('change', checkPhone);

  reset.addEventListener('click', function() {
    requiredContent = false;
    emailContent = false;
    phoneContent = false;
    enableSubmit();
  })
  enableSubmit();
};
formCheck();