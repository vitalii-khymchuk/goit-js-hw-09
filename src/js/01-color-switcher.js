const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

let timerId = null;

function onStartBtnClick() {
  bgColorSwitcher();
  switchBtn(startBtnRef, stopBtnRef);
}

function onStopBtnClick() {
  clearInterval(timerId);
  switchBtn(startBtnRef, stopBtnRef);
}

function switchBtn(...buttons) {
  for (const btn of buttons) {
    if (btn.hasAttribute('disabled')) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', '');
    }
  }
}

function bgColorSwitcher() {
  timerId = setInterval(changeBgColor, 1000);
}

function changeBgColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
