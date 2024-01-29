const dark = 'dark';
const light = 'light';

const forceDarkTheme = () => {
  document.body.classList.add(dark);
  document.body.classList.remove(light);
  localStorage.theme = dark;
};

const forceLightTheme = () => {
  document.body.classList.add(light);
  document.body.classList.remove(dark);
  localStorage.theme = light;
};

const toggleTheme = () => {
  if (localStorage.getItem('theme') === dark) {
    forceLightTheme();
  } else {
    forceDarkTheme();
  }
};

const restorePageThemeFromStorage = () => {
  const storageTheme = localStorage.getItem('theme');
  storageTheme && document.body.classList.add(storageTheme);
};

export {
  toggleTheme,
  restorePageThemeFromStorage,
};