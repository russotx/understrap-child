const copyBtn = document.getElementById('email-button');
const copyTarget = document.getElementById('email-addr');
const nameTag = document.getElementById('nameTag');
const skillsButton = document.getElementById('open-skills');
const techIcons = document.getElementById('all-tech-icons');
let cursorTop = false;

document.addEventListener("DOMContentLoaded", () => {
  typeName();
  setTimeout(() => {highlightName()},1500);
  setTimeout(() => {nameCaps()},2000);
  copyBtn.addEventListener('click', () => toClipboard(copyTarget), false);
  techIcons.addEventListener('click', bounceMarble, false);
  skillsButton.addEventListener("click", openSkills, false);
})

function bounceMarble(event) {
  let origin = event.target;
  // icon carries the background box-shadow, children is undefined if origin is the <i> tag
  let icon = origin.children[0] || origin;
  animateBounce(icon);
  function animateBounce(element) {
    let marble = element.parentNode.parentNode;
    marble.classList.add('bouncey');
    setTimeout(()=>{marble.classList.remove('bouncey')},800);
  }
}

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
  let cursor = newCursor();
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
  cursorTop = true;
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

function openSkills() {
  let allTechIcons = document.getElementById('all-tech-icons');
  let skillsEllipsis = document.getElementById('skills-ellipsis');
  skillsEllipsis.classList.toggle('invisible');
  skillsButton.classList.toggle('fa-plus-square-o');
  skillsButton.classList.toggle('fa-minus-square-o')
  if (allTechIcons.style.maxHeight) {
    allTechIcons.style.maxHeight = null;
  } else {
    allTechIcons.style.maxHeight = allTechIcons.scrollHeight + 'px';
  }
  if (cursorTop) {
    let oldCursor = document.getElementById('cursor');
    oldCursor.parentElement.removeChild(oldCursor);
    let cursor = newCursor(); 
    allTechIcons.parentElement.parentElement.lastElementChild.firstElementChild.appendChild(cursor);
  }
}

function newCursor(){
  let cursor = document.createElement('span');
  cursor.setAttribute('id','cursor');
  return cursor;
}