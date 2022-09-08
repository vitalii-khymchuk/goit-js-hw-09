import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const amountOfFunctionCalls = Number(formRef.amount.value);
  const delayStep = Number(formRef.step.value);
  let delay = Number(formRef.delay.value);

  for (let i = 0; i < amountOfFunctionCalls; i += 1) {
    const position = i + 1;

    createPromise(position, delay)
      .then(message => Notify.success(message))
      .catch(error => Notify.failure(error));

    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
