import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

form.addEventListener(
  'input',
  throttle(e => {
    const formData = { email: email.value, message: message.value };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});

const load = key => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData === null ? undefined : JSON.parse(savedData);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const loadData = load(STORAGE_KEY);
if (loadData) {
  email.value = loadData.email;
  message.value = loadData.message;
}
