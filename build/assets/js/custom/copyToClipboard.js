const copyToClipboard = function() {

  const confirmMessage = this.querySelector('.js__copyToClipBoard--confirm');

  if (confirmMessage.classList.contains('show')) {
    let copiedItem = confirmMessage.querySelector('[data-copieditem]');
    confirmMessage.removeChild(copiedItem);
    confirmMessage.classList.remove('show');
    document.querySelector('body').classList.remove('js__copyToClipBoard--confirm__show');
    return;
  }

  let copyItem = this.tagName === "INPUT" ? this.textContent : this.getAttribute("value");

  const tempEl = document.createElement('textarea');
  tempEl.value = copyItem;
  tempEl.textContent = copyItem;
  tempEl.setAttribute('id', 'itemToCopy');
  tempEl.readOnly = true;
  tempEl.contentEditable = "true";
  tempEl.style.position = 'absolute';
  tempEl.style.left = '-9999px';
  document.querySelector('main').appendChild(tempEl);

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  let range, selection;
  if (isOS()) {
    range = document.createRange();
    range.selectNodeContents(tempEl);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    tempEl.setSelectionRange(0, 999999);
  } else {
      tempEl.select();
  }

  console.log(tempEl);
  document.execCommand("copy", false);
  // document.body.removeChild(tempEl);

  let emailPattern = /^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$/;
  let isEmailAddress = RegExp(emailPattern).test(copyItem);


  let confirmMessageDefault = confirmMessage.querySelector('span.js__defaultMessage');
  let confirmMessageText = isEmailAddress ? document.createElement('a') : document.createElement('span');
  confirmMessageText.textContent = copyItem;
  confirmMessageText.setAttribute('data-copieditem', `${copyItem}`);
  if (isEmailAddress) {
    confirmMessageText.setAttribute('href', `mailto:${copyItem}`);
    confirmMessageText.setAttribute('title', `Compose a new email to: ${copyItem}`);
  };

  document.querySelector('body').classList.add('js__copyToClipBoard--confirm__show');

  confirmMessage.classList.add('show');
  confirmMessage.insertBefore(confirmMessageText, confirmMessageDefault);

  this.setAttribute('href', `mailto:${copyItem}`);
}

const allCopyToClipBoardItems = document.querySelectorAll('.js__copyToClipBoard');
allCopyToClipBoardItems.forEach((el) => {
  el.addEventListener('click', copyToClipboard);
})