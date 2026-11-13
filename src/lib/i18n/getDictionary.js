import vi from './dictionaries/vi';
import en from './dictionaries/en';
import { DEFAULT_LOCALE } from './config';

const dictionaries = {
  vi,
  en,
};

export function getDictionary(locale = DEFAULT_LOCALE) {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}
