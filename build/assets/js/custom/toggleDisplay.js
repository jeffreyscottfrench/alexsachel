
const toggleDisplay = function(){

  let referrerPosY;

  const toggleTargetDisplay = function ( e, referrerPosY ){
    e.preventDefault();
    let link = e.target;
    let target = link.getAttribute('data-targetel');
    let targetEl = document.getElementById(target);
    let body = document.getElementsByTagName('body')[0];

    if (targetEl.classList.contains('js__toggleDisplay--none')) {
      referrerPosY = window.scrollY;
      window.localStorage.setItem('referrerPosY', referrerPosY);
      if ( targetEl.getAttribute('data-fullscreenoverlay') === 'true' ) {
        body.classList.add('js__overlayBody--noScroll');
      }
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
      referrerPosY = window.localStorage.getItem('referrerPosY');
      targetEl.classList.add('js__toggleDisplay--none');
      if ( body.classList.contains( 'js__overlayBody--noScroll' ) ) {
        body.classList.remove('js__overlayBody--noScroll');
      }
      window.scrollTo( 0, referrerPosY);
    }
  }

  // get all the links that are set up to toggle something
  let toggleLinks = Array.from(document.getElementsByClassName('js__toggleDisplayLink'));

  // listen for changes/unfocus on form inputs
  toggleLinks.forEach(link => link.addEventListener('click', toggleTargetDisplay));

};
toggleDisplay();