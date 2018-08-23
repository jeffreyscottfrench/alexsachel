const correctMobileMenuLocation = function() {

  // handle this by setting a custom css variable to be the value of 1vh calculated from innerwidth.

  const checkWidth = function() {
    // check if we're no longer in mobile territory
    // currently overriding using !important tag in css
    // pull media query for width from stylesheet?
    // set a custom style element that only contains media queries and pull from that?
    // use css variables to define them in ::root and pull from there?

    // this pulled from StackOverflow
    // const findClassRules = (selector, stylesheet) => {
    //   // combine all rules from all stylesheets to a single array
    //   const allRules = stylesheet !== undefined ?
    //     Array.from((document.styleSheets[stylesheet] || {}).cssRules || [])
    //     :
    //     [].concat(...Array.from(document.styleSheets).map(({ cssRules }) => Array.from(cssRules)));

    //   // filter the rules by their selectorText
    //   return allRules.filter(({ selectorText }) => selectorText && selectorText.includes(selector));
    // };

    // console.log(findClassRules('header', 0));
  }

  // checkWidth();

  const nav = document.getElementById('nav-main');
  const header = document.getElementById('header-main');

  // set neg margin on main-main to compensate for pulling nav out.

  let newTop = window.innerHeight - nav.offsetHeight + 'px';

  const setHeaderHeight = function() {
    let jsHeaderHeight = document.createElement('style');
    jsHeaderHeight.setAttribute('type', 'text/css');
    jsHeaderHeight.setAttribute('id', 'js-headerHeight');
    jsHeaderHeight.innerHTML = `header#header-main {height: ${newTop};}`
    document.body.appendChild(jsHeaderHeight);
  }

  const removeHeaderHeight = function(){
    document.body.removeChild(document.getElementById('js-headerHeight'));
  }

  if (document.getElementById('js-headerHeight') !== null) {
    removeHeaderHeight();
  } else {
    setHeaderHeight();
  }

  if (window.innerHeight !== (nav.offsetTop + nav.offsetHeight)) {
    let newTop = window.innerHeight - nav.offsetHeight + 'px';

    const setHeaderLocation = function() {
      let jsHeaderLocation = document.createElement('style');
      jsHeaderLocation.setAttribute('type', 'text/css');
      jsHeaderLocation.setAttribute('id', 'js-headerLocation');
      jsHeaderLocation.innerHTML = `nav#nav-main {top: ${newTop};}`
      document.body.appendChild(jsHeaderLocation);
    }

    const removeHeaderLocation = function(){
      document.body.removeChild(document.getElementById('js-headerLocation'));
    }

    if (document.getElementById('js-headerLocation') !== null) {
      removeHeaderLocation();
    }

    setHeaderLocation();
  }

}
// window.addEventListener('load', correctMobileMenuLocation);
// window.addEventListener('resize', correctMobileMenuLocation);
