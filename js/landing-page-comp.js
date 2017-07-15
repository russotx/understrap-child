'use strict';

var copyBtn = document.getElementById('email-button');
var copyTarget = document.getElementById('email-addr');
var nameTag = document.getElementById('nameTag');
var skillsButton = document.getElementById('open-skills');
var techIcons = document.getElementById('all-tech-icons');
var cursorTop = false;
var skillsPopped = false;

document.addEventListener("DOMContentLoaded", function () {
  typeName();
  setTimeout(function () {
    highlightName();
  }, 1500);
  setTimeout(function () {
    nameCaps();
  }, 2000);
  copyBtn.addEventListener('click', function () {
    return toClipboard(copyTarget);
  }, false);
  techIcons.addEventListener('click', bounceMarble, false);
  skillsButton.addEventListener("click", openSkills, false);
});

function bounceMarble(event) {
  var origin = event.target;
  // icon carries the background box-shadow, children is undefined if origin is the <i> tag
  var icon = origin.children[0] || origin;
  animateBounce(icon);
  function animateBounce(element) {
    var marble = element.parentNode.parentNode;
    marble.classList.add('bouncey');
    setTimeout(function () {
      marble.classList.remove('bouncey');
    }, 800);
  }
}

function toClipboard(targetElem) {
  var killGhostDelay = 1500;
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
    }, killGhostDelay);
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
}

function typeName() {
  var name = "Daniel Russo";
  var firstChar = 0;
  var typeDelay = 80;
  var cursor = newCursor();
  function typing(charPos, lastPos, delay) {
    setTimeout(function () {
      var typed = name.slice(0, charPos);
      nameTag.innerHTML = typed;
      nameTag.appendChild(cursor);
      charPos++;
      if (charPos <= lastPos) {
        typing(charPos, lastPos, delay);
      }
    }, delay);
  }
  typing(firstChar, name.length, typeDelay);
  cursorTop = true;
}

function highlightName() {
  var cursor = document.getElementById('cursor');
  var highlight = document.createElement('div');
  var nameParent = nameTag.parentElement;
  nameParent.appendChild(highlight);
  var highlightDelay = 1;
  highlight.setAttribute('id', 'highlight');
  function highlighting(width, left, widthLimit, delay, cursorPos) {
    setTimeout(function () {
      width += 10;
      left -= 10;
      cursorPos -= 10;
      var widthStyle = width + "px";
      var leftStyle = left + "px";
      highlight.style.width = widthStyle;
      highlight.style.left = leftStyle;
      nameParent.appendChild(highlight);
      cursor.style.left = cursorPos + "px";
      if (width <= widthLimit) {
        highlighting(width, left, widthLimit, delay, cursorPos);
      }
    }, delay);
  }
  highlighting(0, 235, 215, highlightDelay, 8);
}

function nameCaps() {
  var cursor = document.getElementById('cursor');
  var highlight = document.getElementById('highlight');
  nameTag.innerHTML = "DANIEL RUSSO";
  nameTag.parentElement.removeChild(highlight);
  cursor.style.left = "7px";
  nameTag.appendChild(cursor);
}

function openSkills() {
  var allTechIcons = document.getElementById('all-tech-icons');
  var skillsEllipsis = document.getElementById('skills-ellipsis');
  skillsEllipsis.classList.toggle('invisible');
  skillsButton.classList.toggle('fa-plus-square-o');
  skillsButton.classList.toggle('fa-minus-square-o');
  if (allTechIcons.style.maxHeight) {
    allTechIcons.style.maxHeight = null;
  } else {
    allTechIcons.style.maxHeight = allTechIcons.scrollHeight + 'px';
  }
  if (cursorTop) {
    var oldCursor = document.getElementById('cursor');
    oldCursor.parentElement.removeChild(oldCursor);
    var cursor = newCursor();
    allTechIcons.parentElement.parentElement.lastElementChild.firstElementChild.appendChild(cursor);
  }
  if (!skillsPopped) {
    skillBirth();
  }
  function skillBirth() {
    var maskContainers = document.getElementsByClassName('mask-container');
    for (var i = 0; i < maskContainers.length; i++) {
      maskContainers.item(i).classList.add('born');
    }
    setTimeout(function () {
      var skillMasks = document.getElementsByClassName('skill-mask');
      for (var _i = 0; _i < maskContainers.length; _i++) {
        skillMasks.item(_i).style.zIndex = '-5';
        maskContainers.item(_i).classList.remove('born');
      }
      skillsPopped = true;
    }, 2050);
  }
}

function newCursor() {
  var cursor = document.createElement('span');
  cursor.setAttribute('id', 'cursor');
  return cursor;
}
