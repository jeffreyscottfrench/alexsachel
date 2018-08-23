// fix last character letter-spacing
const letterSpacing = function() {
  const els = document.querySelectorAll('.letter-spacing');
  let lastChar = {};

  els.forEach((el) => {
    let allChars = Array.from(el.innerHTML);

    let i;
    for (i = 0; i < allChars.length; i++) {
      if (allChars[i].match(/[\S\.]/)) {
        lastChar.value = allChars[i];
        lastChar.index = i;
      }
    };
    let lastCharEl = document.createElement('span');
    lastCharEl.setAttribute('class', 'last-letter');
    lastCharEl.textContent = lastChar.value;

    let newStart = allChars.slice(0, lastChar.index).join('');
    let newEnd = allChars.slice((lastChar.index + 1)).join('');

    el.innerHTML = newStart;
    el.appendChild(lastCharEl);
    el.innerHTML += newEnd;

  })
}
letterSpacing();