import { createPopup, showPopup } from './popupElements';
import './style.css';

const handlePopState = (event: any): void => {
  showPopup();
  window.onpopstate = null;
  if (event) {
    event.preventDefault();
  }
};

const createListeners = (): void => {
  // Detect exit intent (mouse moved from page to navigation area) and show the popup if user intended to exit
  document.addEventListener('mouseleave', showPopup);
  /* Handle 'back' navigation (either initiated by keystrokes/mobile menu)
  also for cases where page has loaded while the pointer wasn't within the window area */
  window.onpopstate = handlePopState;
};

export const removeExitIntentListeners = (): void => {
  document.removeEventListener('mouseleave', showPopup);
  window.onpopstate = null;
};

const onLoaded = (): void => {
  // Create the popup Elements
  createPopup((): void => {
    //If loading required data was successful, we can proceed to attach listeners
    createListeners();
    // ...and to modify history state for breaking "back" navigation,
    // NOTE: this will only work after User initiated event with the page for browser security reasons,
    history.pushState('', '', `?k=${Math.round(Math.random() * 10000000)}`);
  });
};

if (document.readyState === 'complete') {
  onLoaded();
} else {
  document.addEventListener('DOMContentLoaded', onLoaded);
}
