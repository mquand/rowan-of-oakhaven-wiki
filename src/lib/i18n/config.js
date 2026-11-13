export const LOCALES = ['vi', 'en'];
export const DEFAULT_LOCALE = 'vi';

export const LOCALE_NAMES = {
  vi: 'Tiếng Việt',
  en: 'English',
};

export const LOCALE_SHORT_NAMES = {
  vi: 'VI',
  en: 'EN',
};

export function isValidLocale(locale) {
  return LOCALES.includes(locale);
}

export function getValidLocale(locale) {
  return isValidLocale(locale) ? locale : DEFAULT_LOCALE;
}
