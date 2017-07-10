const copyBtn = document.getElementById('email-button');
const copyTarget = document.getElementById('email-addr');
const nameTag = document.getElementById('nameTag');
document.addEventListener("DOMContentLoaded", () => {
  typeName();
  setTimeout(() => {highlightName()},1500);
  setTimeout(() => {nameCaps()},2000);
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
  let firstChar = 0;
  let typeDelay = 80;
  const cursor = document.createElement('span');
  cursor.setAttribute('id','cursor');
  function typing(charPos, lastPos, delay) {
    setTimeout(() => { 
      let typed = name.slice(0,charPos);
      nameTag.innerHTML = typed;
      nameTag.appendChild(cursor);
      charPos++;
      if (charPos <= lastPos) {
        typing(charPos,lastPos,delay);
      }
    }, delay);
  }
  typing(firstChar,name.length,typeDelay);
}

function highlightName() {
  const cursor = document.getElementById('cursor');
  const highlight = document.createElement('div');
  const nameParent = nameTag.parentElement;
  nameParent.appendChild(highlight);
  const highlightDelay = 1;
  highlight.setAttribute('id','highlight');
  function highlighting(width,left,widthLimit,delay,cursorPos){
    setTimeout(() => {
      width+=10;
      left-=10;
      cursorPos-=10;
      let widthStyle = width+"px";
      let leftStyle = left+"px";
      highlight.style.width = widthStyle;
      highlight.style.left = leftStyle;
      nameParent.removeChild(highlight);
      nameParent.appendChild(highlight);
      cursor.style.left=cursorPos+"px";
      if (width <= widthLimit) {
        highlighting(width,left,widthLimit,delay,cursorPos);
      }
    },delay);
  }
  highlighting(0,235,215,highlightDelay,8);
}

function nameCaps(){
  const cursor = document.getElementById('cursor');
  const highlight = document.getElementById('highlight');
  nameTag.innerHTML = "DANIEL RUSSO";
  nameTag.parentElement.removeChild(highlight);
  cursor.style.left = "7px";
  nameTag.appendChild(cursor);
}