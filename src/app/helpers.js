export const getJSON = (name) => {
  const storage = localStorage.getItem(name);

  if (!storage) return;

  return JSON.parse(storage);
};

export const setJSON = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const clearForm = (inputs) => {
  inputs.map((input) => (input.value = ''));
};
