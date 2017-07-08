'use strict';

var copyBtn = document.getElementById('email-button');
var copyTarget = document.getElementById('email-addr');

document.addEventListener("DOMContentLoaded", function (event) {
  copyBtn.addEventListener('click', function () {
    return toClipboard(copyTarget);
  });
});

function toClipboard(targetElem, data) {
  var emailAddr = targetElem;
  makeGhostInput(emailAddr);
  var ghostInput = document.getElementById('ghostInput');
  ghostInput.focus();
  ghostInput.select();
  try {
    document.execCommand('Copy');
  } catch (err) {
    alert('Copy failed in your browser, please manually copy the email address');
  } finally {
    copiedEffect();
    var copiedIndic = document.getElementById('copiedIndic');
    copyTarget.removeChild(ghostInput);
    setTimeout(function () {
      copyBtn.removeChild(copiedIndic);
    }, 1500);
  }
}

function makeGhostInput(targetElem) {
  var inputVal = targetElem.innerHTML;
  var ghostInput = document.createElement('input');
  ghostInput.style.zIndex = -2;
  ghostInput.style.opacity = 0;
  ghostInput.id = "ghostInput";
  ghostInput.value = inputVal;
  copyTarget.appendChild(ghostInput);
  ghostInput.textContent = inputVal;
  ghostInput.readonly = true;
}

function copiedEffect() {
  var copiedIndic = document.createElement('div');
  copiedIndic.innerHTML = 'copied';
  copiedIndic.style.color = 'gray';
  copiedIndic.id = 'copiedIndic';
  copiedIndic.zIndez = 10;
  copyBtn.appendChild(copiedIndic);
  copiedIndic.className = 'copiedEffect';
}

function typeName() {
  var name = "Daniel Russo";
  var nameTag = document.getElementById('nameTag');
  name.forEach(function (char) {
    nameTag.appendChild(char);
  });
}
