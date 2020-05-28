const formReset = function() {
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', function() {
    let inputs = Array.from(document.querySelectorAll('input:not([type="submit"])'));
    inputs.forEach((input) => {
      input.value = '';
      localStorage.removeItem(input.name);
    })
    let textareas = Array.from(document.getElementsByTagName('textarea'));
    textareas.forEach((textarea) => {
      textarea.textContent = '';
      localStorage.removeItem(textarea.name);
    })

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