const formReset = function() {
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', function() {
    let inputs = Array.from(document.getElementsByTagName('input'));
    inputs.forEach((input) => {
      input.value = '';
    })
    let textarea = document.getElementsByName('comments')[0];
    textarea.textContent = '';

    if (document.getElementsByClassName('form__input--error')) {
      let errors = Array.from(document.getElementsByClassName('form__input--error'));

      errors.forEach((error) => {
        error.parentNode.removeChild(error);
      });
    }

    // releases focus from button
    this.blur();
  });

}
formReset();