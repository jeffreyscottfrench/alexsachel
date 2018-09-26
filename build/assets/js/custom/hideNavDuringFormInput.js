const hideNavDuringFormInput = function() {
  const nav = document.getElementById('nav-main');
  let inputs = ['input', 'select', 'textarea'];

  const hideNav = function() {
    if (!nav.classList.contains('hidden')) {
      nav.classList.add('hidden');
    }
  }
  const showNav = function() {
    if (nav.classList.contains('hidden')) {
      nav.classList.remove('hidden');
      customViewHeight();
    }
  }

  const checkInputFocus = function() {
    if (window.matchMedia("(min-width: 750px)").matches) {
      return;
    } else {
      if (document.activeElement === this) {
        hideNav();
      } else {
        showNav();
      }
    }
  }

  inputs.forEach((input) => {
    let inputType = Array.from(document.getElementsByTagName(input));
    inputType.forEach((inputField) => {
      inputField.addEventListener('focus', checkInputFocus);
      inputField.addEventListener('blur', checkInputFocus);
    })
  })
}
hideNavDuringFormInput();