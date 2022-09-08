import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const body = document.querySelector('body');
const startBtnRef = document.querySelector('[data-start]');
const timerElementsRefs = document.querySelectorAll('.value');

///////////////////////////////////

//Користі від цього коду сильно нема, це була спроба мінімізувати querryselectors + трохи освіжив знання)
// Тут створюється обєкт куди закидаються посилання на елементи таймера, обєкт можна потім десткуктуризувати

const timerElementsRefsObj = {};
for (const element of timerElementsRefs) {
  const elemNameByDataAttr = Object.keys(element.dataset)[0];
  timerElementsRefsObj[elemNameByDataAttr] = element;
}
///////////////////////////////////

startBtnRef.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startBtnRef.setAttribute('disabled', '');
      Notify.info('Please choose a date in the future');
      return;
    }
    startBtnRef.removeAttribute('disabled');
  },
};

let isTimesLaunched = false;
const fp = flatpickr('#datetime-picker', options);

function getSelectedUnixDate() {
  return fp.selectedDates[0].getTime();
}

function onStartBtnClick() {
  const timerInitValue = getSelectedUnixDate() - Date.now();
  if (!isTimesLaunched) {
    startTimer(timerInitValue);
  }
  isTimesLaunched = true;
}

function startTimer(timerInitValue) {
  let timerCurrentValue = timerInitValue;

  const setIntervalCallback = () => {
    if (timerCurrentValue > 1000) {
      timerCurrentValue -= 1000;
      updateTimerUI(timerCurrentValue);
    } else {
      clearInterval(timerId);
      onTimerEnd();
    }
  };
  const timerId = setInterval(setIntervalCallback, 1000);
}

function updateTimerUI(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  const {
    days: UIdays,
    hours: UIhours,
    minutes: UIminutes,
    seconds: UIseconds,
  } = timerElementsRefsObj;

  const formatNum = number => number.toString().padStart(2, '0');

  UIdays.textContent = formatNum(days);
  UIhours.textContent = formatNum(hours);
  UIminutes.textContent = formatNum(minutes);
  UIseconds.textContent = formatNum(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onTimerEnd() {
  body.style.backgroundColor = 'red';
  Notify.failure('Discounts finished!');
}
