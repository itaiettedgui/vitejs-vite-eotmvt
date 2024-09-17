import { SUGGESTED_ARTICLES } from './constants';
import { SuggestedArticle } from './types';

export const getSuggestedArticles = async (): Promise<SuggestedArticle[]> => {
  try {
    const response = await fetch(SUGGESTED_ARTICLES);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const suggestedArticles: SuggestedArticle[] = await response.json();
    return suggestedArticles;
  } catch (error: any) {
    console.log(`Kueez data load error: ${error}, destroying module..`);
  }
  return [];
};
