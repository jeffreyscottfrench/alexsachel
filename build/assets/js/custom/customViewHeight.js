const customViewHeight = function() {
  // focus is on input / keyboard is showing don't do anything

  let activeElement = document.activeElement;
  let inputs = ['input', 'select', 'button', 'textarea'];
  let cvh;

  if (activeElement && inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1) {
      let cvh = '1vh';
      document.documentElement.style.setProperty('--cvh', cvh);
    } else {
      let cvh = window.innerHeight / 100 + 'px';
      document.documentElement.style.setProperty('--cvh', cvh);
    }

    requestAnimationFrame(customViewHeight);
}

// customViewHeight();
requestAnimationFrame(customViewHeight);
window.addEventListener('resize', function() {
  requestAnimationFrame(customViewHeight);
});
