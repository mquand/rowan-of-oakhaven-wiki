import { getAllDocs } from './docs';
import {
  getItems,
  getRecipes,
  getCharacters,
  getCrops,
  getMonsters,
  getWeapons,
  getPerks,
  getLocations,
} from './gameData';
import { DEFAULT_LOCALE } from './i18n/config';
import { getDictionary } from './i18n/getDictionary';
import { getCategoryLabel, getBranchLabel, getSeasonLabel } from './constants';

export function getSearchIndex(lang = DEFAULT_LOCALE) {
  const dict = getDictionary(lang);
  const entries = [];
  const isEn = lang === 'en';

  // 1. Docs
  for (const doc of getAllDocs(lang)) {
    entries.push({
      id: `doc_${doc.slug}`,
      title: doc.title,
      sub: doc.audience === 'public'
        ? (isEn ? 'Public Guide' : 'Cẩm nang công khai')
        : doc.audience,
      type: 'doc',
      typeLabel: dict.search.docLabel,
      description: doc.title,
      href: `/${lang}/wiki/${doc.slug}`,
      icon: 'book-open',
      keywords: [doc.title, doc.slug, ...(doc.tags || []), doc.audience].join(' ').toLowerCase(),
    });
  }

  // 2. Items
  for (const item of getItems(lang)) {
    entries.push({
      id: `item_${item.id}`,
      title: item.name,
      sub: getCategoryLabel(item.category, lang),
      type: 'item',
      typeLabel: dict.search.itemLabel,
      description: item.description,
      href: `/${lang}/database/items/${item.id}`,
      icon: item.category === 'tea' ? 'tea-bag' : item.category === 'bakery' ? 'cake' : 'package',
      keywords: [item.name, item.id, item.description, ...(item.tags || [])].join(' ').toLowerCase(),
    });
  }

  // 3. Recipes
  for (const recipe of getRecipes(lang)) {
    entries.push({
      id: `recipe_${recipe.id}`,
      title: recipe.name,
      sub: recipe.station === 'tea_station'
        ? (isEn ? 'Tea Crafting Station' : 'Trạm Pha Trà')
        : (isEn ? 'Magic Bakery Oven' : 'Lò Nướng Bánh Thần Kỳ'),
      type: 'recipe',
      typeLabel: dict.search.recipeLabel,
      description: `${recipe.description} (${recipe.effect_description})`,
      href: `/${lang}/database/recipes#${recipe.id}`,
      icon: recipe.station === 'tea_station' ? 'tea-bag' : 'cake',
      keywords: [
        recipe.name,
        recipe.id,
        recipe.description,
        recipe.effect_description,
        ...(recipe.ingredients || []).map(i => i.name),
      ].join(' ').toLowerCase(),
    });
  }

  // 4. Characters
  for (const char of getCharacters(lang)) {
    entries.push({
      id: `char_${char.id}`,
      title: char.name,
      sub: `${char.role} · ${char.location}`,
      type: 'character',
      typeLabel: dict.search.characterLabel,
      description: char.description,
      href: `/${lang}/database/characters`,
      icon: 'users',
      keywords: [
        char.name,
        char.id,
        char.role,
        char.species,
        char.location,
        char.description,
        ...(char.favorite_items || []),
      ].join(' ').toLowerCase(),
    });
  }

  // 5. Crops
  for (const crop of getCrops(lang)) {
    const seasonsLabel = (crop.seasons || []).map(s => getSeasonLabel(s, lang)).join(', ');
    entries.push({
      id: `crop_${crop.id}`,
      title: crop.name,
      sub: isEn ? `Seasons: ${seasonsLabel}` : `Mùa: ${seasonsLabel}`,
      type: 'crop',
      typeLabel: dict.search.cropLabel,
      description: crop.description,
      href: `/${lang}/database/crops`,
      icon: 'farm',
      keywords: [crop.name, crop.id, crop.description, ...(crop.seasons || []), ...(crop.tags || [])].join(' ').toLowerCase(),
    });
  }

  // 6. Monsters
  for (const mon of getMonsters(lang)) {
    entries.push({
      id: `mon_${mon.id}`,
      title: mon.name,
      sub: mon.name_en || mon.realm,
      type: 'monster',
      typeLabel: dict.search.monsterLabel,
      description: mon.description,
      href: `/${lang}/database/monsters`,
      icon: 'sparkle',
      keywords: [mon.name, mon.name_en || '', mon.id, mon.realm, mon.description, mon.weakness || '', mon.loot || ''].join(' ').toLowerCase(),
    });
  }

  // 7. Weapons
  for (const wep of getWeapons(lang)) {
    entries.push({
      id: `wep_${wep.id}`,
      title: wep.name,
      sub: wep.name_en || wep.weapon_type,
      type: 'weapon',
      typeLabel: dict.search.weaponLabel,
      description: wep.description,
      href: `/${lang}/database/weapons`,
      icon: 'sword',
      keywords: [wep.name, wep.name_en || '', wep.id, wep.weapon_type, wep.description, ...(wep.tags || [])].join(' ').toLowerCase(),
    });
  }

  // 8. Perks
  for (const perk of getPerks(lang)) {
    entries.push({
      id: `perk_${perk.id}`,
      title: perk.name,
      sub: `${isEn ? 'Branch' : 'Nhánh'}: ${getBranchLabel(perk.branch, lang)}`,
      type: 'perk',
      typeLabel: dict.search.perkLabel,
      description: perk.description,
      href: `/${lang}/database/perks`,
      icon: 'book-open',
      keywords: [perk.name, perk.id, perk.branch, perk.description, perk.unlock_hint || ''].join(' ').toLowerCase(),
    });
  }

  // 9. Locations
  for (const loc of getLocations(lang)) {
    entries.push({
      id: `loc_${loc.id}`,
      title: loc.name,
      sub: loc.name_en || loc.location_type,
      type: 'location',
      typeLabel: dict.search.locationLabel,
      description: loc.description,
      href: `/${lang}/database/locations`,
      icon: 'map-pin',
      keywords: [loc.name, loc.name_en || '', loc.id, loc.description, ...(loc.features || [])].join(' ').toLowerCase(),
    });
  }

  return entries;
}
