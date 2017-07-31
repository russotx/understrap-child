let screenWidth = window.innerWidth;
const copyBtn = document.getElementById('email-button');
const copyTarget = document.getElementById('email-addr');
const nameTag = document.getElementById('name-tag');
const skillsButton = document.getElementById('open-skills');
const techIcons = document.getElementById('all-tech-icons');
const projectsNav = document.getElementById('projects-nav');
let cursorTop = false;
let skillsPopped = false;

document.addEventListener("DOMContentLoaded", () => {
  let ipadWidth = 768;
  typeText(nameTag, 100);
    //setTimeout(() => {highlightText(nameTag)},1500);
  //});
  //setTimeout(() => {highlightText(nameTag)},1500);
  //setTimeout(() => {toCaps(nameTag)}, 2000);
  copyBtn.addEventListener('click', () => toClipboard(copyTarget), false);
  // dev icons bounce on hover with desktop, bounce on click with mobile devices.
  if (screenWidth > ipadWidth) {
    techIcons.addEventListener('mouseover', bounceMarble, false);
  } else {
    techIcons.addEventListener('click', bounceMarble, false);
  }
  skillsButton.addEventListener("click", openSkills, false);
  projectsNav.addEventListener("click",cycleProjects, false);

})

function cycleProjects(event){
  let link = event.target;
  let linksList = document.getElementById('projects-nav').getElementsByTagName('h6');
  let projectActive = link.getAttribute('data-project');
  let projectsList = document.getElementById('project-content-box').getElementsByTagName('article');
  if (projectActive) {
    for(let i=0; i<projectsList.length; i++) {
      projectsList[i].classList.toggle('active',projectsList[i].getAttribute('id') === projectActive);
      linksList[i].classList.toggle('active',linksList[i].getAttribute('data-project') === projectActive);
    }
  }
}

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

function typeText(textElement,speed=80) {
  // HTML collection of all the spans in the h1 nameTag
  let theChars = textElement.getElementsByTagName('span');
  // using innerText so the last span placeholder for cursor isn't included
  let numChars = textElement.innerText.length;
  // start at the first letter
  let charIter = 0;
  function typing(charPos, lastPos, delay) {
    // typing speed default is .08 seconds per letter
    setTimeout(() => {
      // reveal the letter by changing opacity (performant)
      theChars[charIter].style.opacity = 1;
      // toggle typed class which reveals pseudo element :before (cursor) via opacity change 
      theChars[charIter].classList.toggle('typed');
      if (charIter > 0) {
        // hide the pseudo element of the last character that was "typed" thus moving the 
        // cursor forward
        theChars[charIter-1].classList.toggle('typed');
      }
      charIter++;
      // function calls itself unstil the last char is typed.
      if (charIter < numChars) {
        typing(charIter,numChars,delay);
      } else {
        // when finished typing, call the function to highlight the name
        // half second delay for effect
        setTimeout(()=>{highlightText(nameTag)},500);
      }   
    },delay);
  }
  // initial call to typing function
  typing(charIter,numChars,speed);
}

function highlightText(textElement) {
  // all the span elements in the h1 tag
  let textSpans = textElement.getElementsByTagName('span');
  // using innerText so the last span placeholder for the cursor isn't included
  let textLen = textElement.innerText.length;
  // Starting at the end and workgin back, HTMLcollections start at zero
  let textIter = textLen-1;
  function highlighter(limit,hIter,startPos) {
    // .02 seconds to mimmick hotkey highlight
    let highlightSpeed = 20;
    setTimeout(() => {
      // add highlight class to the span which sets opacity .5 to its pseudo element :after
      // pseudo element is equal to the size of the character WxH.
      textSpans[hIter].classList.add('highlight');
      // toggle the typed class for the span to move the cursor backwards by changing opacity of the
      // pseudo element :before to 1, which reveals the cursor under the current span.
      // hide the cursor under the last span that was highlighted
      if (hIter < startPos) {
        textSpans[hIter].classList.toggle('typed');
        textSpans[hIter+1].classList.toggle('typed');
      }
      hIter--;
      // function calls itself until the whole word is highlighted
      if (hIter >= limit) {
        highlighter(limit,hIter,startPos);
      } else {
        // once everything is highlighted, call the function to change to all caps
        toCaps(nameTag);
      }
    }, highlightSpeed);
  }
  // initial call to highlighter function.
  highlighter(0, textIter, textIter);
}

function toCaps(textElement){
  // using innerText so the last span placeholder for the cursor is not included
  let numChars = textElement.innerText.length;
  // HTML collection of all spans including the empty cursor span
  let charArray = textElement.getElementsByTagName('span');
  // the h4s wrapping the nameTag reading: [full stack developer] ^
  let lintText = textElement.parentElement.parentElement.getElementsByClassName('lint');
  // hide all the letters inside the span elements via opacity (performant)
  // last span for the cursor is unaffected.
  for (let i = 0; i < numChars; i++) {
    charArray[i].style.opacity = 0;
  }
  // add capsed class to the nameTag which reveals pseudo element :after via opacity change
  // the content of :after is the text in all caps (has opacity 0 by default)
  textElement.classList.add('capsed')
  // toggle typed class on the cursor span to reveal it at the end.
  document.getElementById('cursor').classList.toggle('typed');
  // set flag for cursor ready so it can be changed in the openSkills() function
  cursorTop = true;
  // slight delay for effect.
  setTimeout(() => { 
    for (let i = 0; i < lintText.length; i++) {
      // set class of h4s wrapping the nameTag to reveal text via opacity change.
      lintText[i].classList.add('linted');
    } 
  },300);
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
    oldCursor.classList.add('stop');
    let footerBar = document.getElementsByClassName('footer-bar');
    footerBar[0].firstElementChild.classList.add('activated');
  }
  if (!skillsPopped) {
    skillBirth();
  }
  function skillBirth() {
    let maskContainers = document.getElementsByClassName('mask-container');
    for (let i=0; i < maskContainers.length; i++) {
      maskContainers.item(i).classList.add('born');  
    }
    setTimeout(()=>{
      let skillMasks = document.getElementsByClassName('skill-mask');
      for (let i=0; i < maskContainers.length; i++) {
        skillMasks.item(i).style.zIndex = '-5';
        maskContainers.item(i).classList.remove('born');
      }
      skillsPopped = true;
    },2050);
  }
}
