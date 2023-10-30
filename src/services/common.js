import Cookies from 'universal-cookie';

function convertDateToAgo(isoTime) {

  const then = new Date(isoTime);
  const now = new Date();

  const secondsPastFromTimeInS = Math.round((now.getTime() - then.getTime()) / 1000);

  const hours = Math.floor(secondsPastFromTimeInS / 3600);
  const minutes = Math.floor((secondsPastFromTimeInS - hours * 3600) / 60);

  const h = hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const m = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

  return h > 100 ? '100hrs+ ago' : `${h}h:${m}m ago`;
}

function saveTokenIntoCookie(token) {
  const fromNow29days = new Date(Date.now() + 2500000 * 1000);
  const options = { path: '/', sameSite: 'lax', expires: fromNow29days };
  new Cookies().set('token', token, options);
}

function getPayloadFromJwtToken(token) {
  return JSON.parse(window.atob(token.split('.')[1]));
}

function getUserTokenFromCookies() {
  return new Cookies().get('token');
}

function animateWithSlideUp(selector) {
  const element = document.querySelector(selector);

  element.style.cssText = `
    transition: opacity 100ms linear, max-height 200ms cubic-bezier(0,0,0,1);
    max-height: ${element.offsetHeight}px;
    overflow: hidden;
    padding: 0;
    margin: 0;
  `;

  setTimeout(() => {
    element.style.cssText += `
      max-height: 0px;
      opacity: 0.3;
     `;
  }, 0);
}

export {
  convertDateToAgo,
  saveTokenIntoCookie,
  getPayloadFromJwtToken,
  getUserTokenFromCookies,
  animateWithSlideUp,
};
