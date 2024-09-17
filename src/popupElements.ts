import { getSuggestedArticles } from './api';
import { removeExitIntentListeners } from './main';
import { SuggestedArticle } from './types';

const overlay: HTMLDivElement = document.createElement('div');
const popup: HTMLDivElement = document.createElement('div');
const articlesContainer: HTMLDivElement = document.createElement('div');
const header: HTMLHeadingElement = document.createElement('h3');
const closeButton: HTMLInputElement = document.createElement('input');

const populateWithArticles = (onSuccess: Function): void => {
  getSuggestedArticles().then((suggestedArticles: SuggestedArticle[]) => {
    // If the data articles didn't load correctly - remove all created elements and event listeners
    if (suggestedArticles.length === 0) {
      destroy();
      return;
    }

    // Otherwise - create the HTML for the articles and attach it to the articles container
    let articlesHTML: string = '';
    suggestedArticles.forEach((suggestedArticle) => {
      articlesHTML += `
                      <a href="${suggestedArticle.url}" target="_blank">
                        <img src="${suggestedArticle.thumbnail_url}"/ >  
                        <p>${suggestedArticle.title}</p>
                      </a>
                    `;
    });
    articlesContainer.innerHTML += articlesHTML;
    onSuccess();
  });
};

const showPopup = (): void => {
  overlay.style.visibility = 'visible';
};

const hidePopup = (): void => {
  overlay.style.visibility = 'hidden';
  destroy();
};

const createPopup = (onSuccess: Function) => {
  overlay.id = 'kueezItaiTestOverlay';
  popup.id = 'popup';
  articlesContainer.id = 'articlesContainer';
  closeButton.id = 'closeButton';
  closeButton.type = 'Button';
  closeButton.addEventListener('click', hidePopup);
  header.innerHTML = 'Recommended Articles';

  popup.appendChild(header);
  popup.appendChild(articlesContainer);
  popup.appendChild(closeButton);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  populateWithArticles(onSuccess);
};

const destroy = (): void => {
  removeExitIntentListeners();
  closeButton.removeEventListener('click', hidePopup);
  popup.removeChild(header);
  popup.removeChild(articlesContainer);
  popup.removeChild(closeButton);
  overlay.removeChild(popup);
  document.body.removeChild(overlay);
};

export { showPopup, createPopup };
