const toggleDisplay = function(){

  const toggleTargetDisplay = function ( e ){
    let link = e.target;
    let target = link.getAttribute('data-targetel');
    let targetEl = document.getElementById(target);

    if (targetEl.classList.contains('js__toggleDisplay--none')) {
      targetEl.classList.remove('js__toggleDisplay--none');
      // make sure you can see it, after its loaded
      setTimeout(function() {
        targetEl.scrollIntoView({behavior: "smooth"});

        // if that doesn't work?
        let pos = getElemDistance(targetEl);
        if ((window.scrollY < pos.y) || (window.scrollY > pos.y)) {
          window.scrollTo(0, pos.y - 100);
        }
      }, 250);
    } else {
      targetEl.classList.add('js__toggleDisplay--none');
    }
  }

  // get all the links that are set up to toggle something
  let toggleLinks = Array.from(document.getElementsByClassName('js__toggleDisplayLink'));

  // listen for changes/unfocus on form inputs
  toggleLinks.forEach(link => link.addEventListener('click', toggleTargetDisplay));

};
toggleDisplay();