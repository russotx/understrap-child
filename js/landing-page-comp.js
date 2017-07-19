'use strict';

var screenWidth = window.innerWidth;
var copyBtn = document.getElementById('email-button');
var copyTarget = document.getElementById('email-addr');
var nameTag = document.getElementById('name-tag');
var skillsButton = document.getElementById('open-skills');
var techIcons = document.getElementById('all-tech-icons');
var cursorTop = false;
var skillsPopped = false;

document.addEventListener("DOMContentLoaded", function () {
  var ipadWidth = 768;
  typeText(nameTag, 100);
  //setTimeout(() => {highlightText(nameTag)},1500);
  //});
  //setTimeout(() => {highlightText(nameTag)},1500);
  //setTimeout(() => {toCaps(nameTag)}, 2000);
  copyBtn.addEventListener('click', function () {
    return toClipboard(copyTarget);
  }, false);
  // dev icons bounce on hover with desktop, bounce on click with mobile devices.
  if (screenWidth > ipadWidth) {
    techIcons.addEventListener('mouseover', bounceMarble, false);
  } else {
    techIcons.addEventListener('click', bounceMarble, false);
  }
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

function typeText(textElement) {
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 80;

  // HTML collection of all the spans in the h1 nameTag
  var theChars = textElement.getElementsByTagName('span');
  // using innerText so the last span placeholder for cursor isn't included
  var numChars = textElement.innerText.length;
  // start at the first letter
  var charIter = 0;
  function typing(charPos, lastPos, delay) {
    // typing speed default is .08 seconds per letter
    setTimeout(function () {
      // reveal the letter by changing opacity (performant)
      theChars[charIter].style.opacity = 1;
      // toggle typed class which reveals pseudo element :before (cursor) via opacity change 
      theChars[charIter].classList.toggle('typed');
      if (charIter > 0) {
        // hide the pseudo element of the last character that was "typed" thus moving the 
        // cursor forward
        theChars[charIter - 1].classList.toggle('typed');
      }
      charIter++;
      // function calls itself unstil the last char is typed.
      if (charIter < numChars) {
        typing(charIter, numChars, delay);
      } else {
        // when finished typing, call the function to highlight the name
        // half second delay for effect
        setTimeout(function () {
          highlightText(nameTag);
        }, 500);
      }
    }, delay);
  }
  // initial call to typing function
  typing(charIter, numChars, speed);
}

function highlightText(textElement) {
  // all the span elements in the h1 tag
  var textSpans = textElement.getElementsByTagName('span');
  // using innerText so the last span placeholder for the cursor isn't included
  var textLen = textElement.innerText.length;
  // Starting at the end and workgin back, HTMLcollections start at zero
  var textIter = textLen - 1;
  function highlighter(limit, hIter, startPos) {
    // .02 seconds to mimmick hotkey highlight
    var highlightSpeed = 20;
    setTimeout(function () {
      // add highlight class to the span which sets opacity .5 to its pseudo element :after
      // pseudo element is equal to the size of the character WxH.
      textSpans[hIter].classList.add('highlight');
      // toggle the typed class for the span to move the cursor backwards by changing opacity of the
      // pseudo element :before to 1, which reveals the cursor under the current span.
      // hide the cursor under the last span that was highlighted
      if (hIter < startPos) {
        textSpans[hIter].classList.toggle('typed');
        textSpans[hIter + 1].classList.toggle('typed');
      }
      hIter--;
      // function calls itself until the whole word is highlighted
      if (hIter >= limit) {
        highlighter(limit, hIter, startPos);
      } else {
        // once everything is highlighted, call the function to change to all caps
        toCaps(nameTag);
      }
    }, highlightSpeed);
  }
  // initial call to highlighter function.
  highlighter(0, textIter, textIter);
}

function toCaps(textElement) {
  // using innerText so the last span placeholder for the cursor is not included
  var numChars = textElement.innerText.length;
  // HTML collection of all spans including the empty cursor span
  var charArray = textElement.getElementsByTagName('span');
  // the h4s wrapping the nameTag reading: [full stack developer] ^
  var lintText = textElement.parentElement.parentElement.getElementsByClassName('lint');
  // hide all the letters inside the span elements via opacity (performant)
  // last span for the cursor is unaffected.
  for (var i = 0; i < numChars; i++) {
    charArray[i].style.opacity = 0;
  }
  // add capsed class to the nameTag which reveals pseudo element :after via opacity change
  // the content of :after is the text in all caps (has opacity 0 by default)
  textElement.classList.add('capsed');
  // toggle typed class on the cursor span to reveal it at the end.
  document.getElementById('cursor').classList.toggle('typed');
  // set flag for cursor ready so it can be changed in the openSkills() function
  cursorTop = true;
  // slight delay for effect.
  setTimeout(function () {
    for (var _i = 0; _i < lintText.length; _i++) {
      // set class of h4s wrapping the nameTag to reveal text via opacity change.
      lintText[_i].classList.add('linted');
    }
  }, 300);
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
    oldCursor.classList.add('stop');
    var footerBar = document.getElementsByClassName('footer-bar');
    footerBar[0].firstElementChild.classList.add('activated');
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
      for (var _i2 = 0; _i2 < maskContainers.length; _i2++) {
        skillMasks.item(_i2).style.zIndex = '-5';
        maskContainers.item(_i2).classList.remove('born');
      }
      skillsPopped = true;
    }, 2050);
  }
}
