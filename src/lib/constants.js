import { getDictionary } from './i18n/getDictionary';
import { DEFAULT_LOCALE } from './i18n/config';

export const CATEGORY_ICONS = {
  tea: 'tea-bag',
  bakery: 'cake',
  seed: 'plant',
  ingredient: 'grains',
  mineral: 'mountains',
  gem: 'diamond',
  monster_drop: 'sparkle',
  wood: 'acorn',
  magic: 'sparkle',
};

export const RARITY_CLASSES = {
  common: 'forest',
  uncommon: 'seed',
  rare: 'gem',
  mythic: 'monster_drop',
};

export const STATION_ICONS = {
  tea_station: 'tea-bag',
  bakery_oven: 'cake',
};

export function getCategoryLabel(category, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.categories[category] || category;
}

export function getRarityLabel(rarity, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.rarities[rarity] || rarity;
}

export function getRealmLabel(realm, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.realms[realm] || realm;
}

export function getSeasonLabel(season, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.seasons[season] || season;
}

export function getBranchLabel(branch, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.branches[branch] || branch;
}

export function getWeaponTypeLabel(type, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.weaponTypes[type] || type;
}

export function getLocationTypeLabel(type, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.locationTypes[type] || type;
}

export function getStationLabel(station, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.stations[station] || station;
}

export function getTagTranslation(tag, lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  return dict.labels.tags[tag] || tag;
}
