// Get an element's distance from the top of the page
const getElemDistance = function ( element ) {
  var xPosition = 0;
  var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
};

const formConfirm = function(alertType, alertText) {
  let alert = document.createElement('div');
  alert.classList.add('alert', alertType);

  let alertMsg = document.createElement('h3');
  alertMsg.innerHTML = alertText;
  alertMsg.classList.add('title__alert');
  alert.appendChild(alertMsg);

  let contactForm = document.getElementById('form-contact');
  contactForm.appendChild(alert);

  // make sure you can see it, after its loaded
  setTimeout(function() {
    alert.scrollIntoView(true);

    // if that doesn't work?
    let pos = getElemDistance(alert);
    if (window.scrollY < pos.y) {
      window.scrollTo(0, pos.y);
    }
  }, 500);

  // click to remove
  alert.addEventListener('click', function() {
    this.parentElement.removeChild(this);
  })

  // timeout to remove
  setTimeout(function() {
    contactForm.removeChild(alert);
  }, 5000);
}
const checkURL = function() {
  let url = window.location.href;
  if (url.includes('?contact-success')) {
    formConfirm('alert__success', 'Thank you for reaching out! I will get back to you as soon as possible.');
  } else if (url.includes('?contact-failure')) {
    formConfirm('alert__failure', 'Hmmm looks like something went wrong, try that again please!');
  } else {
    return;
  }
}
checkURL();
