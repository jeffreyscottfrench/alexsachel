const formSaveLoadEntries = function() {


    let inputs = Array.from(document.querySelectorAll('input:not([type="submit"])'));

    let textareas = Array.from(document.getElementsByTagName('textarea'));

    let entries = inputs.concat(textareas);

    entries.forEach(elt => {
      elt.value = localStorage.getItem(elt.name);
      elt.addEventListener("change", e => {
          localStorage.setItem(e.target.name, e.target.value);
      });
  });

}
formSaveLoadEntries();