export const getJSON = (name) => {
  const storage = localStorage.getItem(name);

  if (!storage) return;

  return JSON.parse(storage);
};

export const setJSON = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const validateInput = (input, regex, validatorArray) => {
  const data = input.value;

  if (!data) {
    setInputValid(input, false);
  }

  const valid = regex.test(data);

  if (!valid) setInputValid(input, false);

  validatorArray.push(valid);
};

export const setInputValid = (input, status) => {
  input.setAttribute('aria-invalid', !status);
};

export const clearInputError = (formToClear, validatorArray) => {
  const form = formToClear;

  const inputs = Array.from(form.querySelectorAll('input'));

  inputs.forEach((input) => setInputValid(input, true));

  validatorArray = [];
};

export const resetForm = (formID, inputs, validatorArray) => {
  const form = document.querySelector(formID);
  const formInputs = Array.from(form.querySelectorAll(inputs));

  clearForm(formInputs, validatorArray);
};

export const clearForm = (inputs, validatorArray) => {
  inputs.forEach((input) => (input.value = ''));

  validatorArray = [];
};

export const convertToSlug = (str) => {
  return str.trim().toLowerCase().replace(/\s+/g, '-');
};

export const convertToText = (slug) => {
  return slug.replace(/-/g, ' ');
};

export const getHash = () => {
  const hash = window.location.hash.slice(1);

  if (!hash) return false;

  return hash;
};

export const setHash = (value) => {
  window.location.hash = value;
};

export const clearHash = () => {
  window.location.hash = '';
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const allTrue = (array) => array.every((element) => element === true);

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const isChecked = (item) => {
  return item.checked;
};

export const clearElement = (element) => {
  element.innerHTML = '';
};
