const copyBtn = document.getElementById('email-button');
const copyTarget = document.getElementById('email-addr');
document.addEventListener("DOMContentLoaded", () => {
  typeName();
  copyBtn.addEventListener('click', () => toClipboard(copyTarget));
})

function toClipboard(targetElem) {
  let killGhostDelay = 1500;
  let emailAddr = targetElem;
  makeGhostInput(emailAddr);
  let ghostInput = document.getElementById('ghostInput');
  ghostInput.focus();
  ghostInput.select();
  try {
      document.execCommand('Copy');
  } catch (err) {
      alert('Copy failed in your browser, please manually copy the email address');
  } finally {
      copiedEffect();
      let copiedIndic = document.getElementById('copiedIndic');
      copyTarget.removeChild(ghostInput);
      setTimeout(function(){copyBtn.removeChild(copiedIndic)}, killGhostDelay);
  }
  function makeGhostInput(targetElem) {
    let inputVal = targetElem.innerHTML;
    let ghostInput = document.createElement('input');
    ghostInput.style.zIndex = -2;
    ghostInput.style.opacity = 0;
    ghostInput.id = "ghostInput";
    ghostInput.value = inputVal;
    copyTarget.appendChild(ghostInput);
    ghostInput.textContent = inputVal;
    ghostInput.readonly = true;
  }
  function copiedEffect() {
    let copiedIndic = document.createElement('div');
    copiedIndic.innerHTML = 'copied';
    copiedIndic.style.color = 'gray';
    copiedIndic.id = 'copiedIndic';
    copiedIndic.zIndez = 10;
    copyBtn.appendChild(copiedIndic);
    copiedIndic.className = 'copiedEffect';
  }
}

function typeName() {
  let name = "Daniel Russo";
  const nameTag = document.getElementById('nameTag');
  const cursor = document.getElementById('cursor');
  let firstChar = 0;
  let typeDelay = 80;
  function typing(charPos, lastPos, delay) {
    setTimeout(() => { 
      let c = name.charAt(charPos);
      let char = document.createTextNode(c);
      nameTag.insertBefore(char, cursor); 
      charPos++;
      if (charPos < lastPos) {
        typing(charPos,lastPos,delay);
      }
    }, delay);
  }
  typing(firstChar,name.length,typeDelay);
}

