let copyBtn = document.getElementById('email-button');
let copyTarget = document.getElementById('email-addr');
copyBtn.addEventListener('click', ()=>toClipboard(copyTarget));

function toClipboard(targetElem, data) {
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
      setTimeout(function(){copyBtn.removeChild(copiedIndic)}, 1500)
  }
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