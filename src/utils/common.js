const ALERT_SHOW_TIME = 3000;

const capitalizeFirstLetter = (word) => {
  return `${(word.charAt(0)).toUpperCase()}${(word.slice(1)).toLowerCase()}`;
};

const showAlert = (message = 'Info from the server is not available now. Please, retry later') => {
  const main = document.querySelector('.trip-main');
  const alertContainer = document.createElement('div');
  alertContainer.style.padding = '30px';
  alertContainer.style.fontSize = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  main.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isOnline = () => {
  return window.navigator.onLine;
};

export {
  capitalizeFirstLetter,
  showAlert,
  isOnline
};
