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

const CATEGORY_LABELS = {
  seed: 'Hạt giống',
  ingredient: 'Nguyên liệu',
  mineral: 'Khoáng sản',
  gem: 'Tinh thể',
  monster_drop: 'Loot quái vật',
  tea: 'Trà Thảo Mộc',
  bakery: 'Bánh ma thuật',
};

const BRANCH_LABELS = {
  exploration: 'Khám phá mỏ',
  farming: 'Nông trại',
  tea: 'Trà bánh',
};

export function getSearchIndex() {
  const entries = [];

  // 1. Docs
  for (const doc of getAllDocs()) {
    entries.push({
      id: `doc_${doc.slug}`,
      title: doc.title,
      sub: doc.audience === 'public' ? 'Cẩm nang công khai' : doc.audience,
      type: 'doc',
      typeLabel: 'Tài liệu',
      description: doc.title,
      href: `/wiki/${doc.slug}`,
      icon: 'book-open',
      keywords: [doc.title, doc.slug, ...(doc.tags || []), doc.audience].join(' ').toLowerCase(),
    });
  }

  // 2. Items
  for (const item of getItems()) {
    entries.push({
      id: `item_${item.id}`,
      title: item.name,
      sub: CATEGORY_LABELS[item.category] || item.category,
      type: 'item',
      typeLabel: 'Vật phẩm',
      description: item.description,
      href: `/database/items/${item.id}`,
      icon: item.category === 'tea' ? 'tea-bag' : item.category === 'bakery' ? 'cake' : 'package',
      keywords: [item.name, item.id, item.description, ...(item.tags || [])].join(' ').toLowerCase(),
    });
  }

  // 3. Recipes
  for (const recipe of getRecipes()) {
    entries.push({
      id: `recipe_${recipe.id}`,
      title: recipe.name,
      sub: recipe.station === 'tea_station' ? 'Trạm Pha Trà' : 'Lò Nướng Bánh Thần Kỳ',
      type: 'recipe',
      typeLabel: 'Công thức',
      description: `${recipe.description} (${recipe.effect_description})`,
      href: `/database/recipes#${recipe.id}`,
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
  for (const char of getCharacters()) {
    entries.push({
      id: `char_${char.id}`,
      title: char.name,
      sub: `${char.role} · ${char.location}`,
      type: 'character',
      typeLabel: 'Cư dân',
      description: char.description,
      href: `/database/characters`,
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
  for (const crop of getCrops()) {
    entries.push({
      id: `crop_${crop.id}`,
      title: crop.name,
      sub: `Mùa: ${(crop.seasons || []).join(', ')}`,
      type: 'crop',
      typeLabel: 'Cây trồng',
      description: crop.description,
      href: `/database/crops`,
      icon: 'farm',
      keywords: [crop.name, crop.id, crop.description, ...(crop.seasons || []), ...(crop.tags || [])].join(' ').toLowerCase(),
    });
  }

  // 6. Monsters
  for (const mon of getMonsters()) {
    entries.push({
      id: `mon_${mon.id}`,
      title: mon.name,
      sub: mon.name_en || mon.realm,
      type: 'monster',
      typeLabel: 'Quái vật',
      description: mon.description,
      href: `/database/monsters`,
      icon: 'sparkle',
      keywords: [mon.name, mon.name_en || '', mon.id, mon.realm, mon.description, mon.weakness || '', mon.loot || ''].join(' ').toLowerCase(),
    });
  }

  // 7. Weapons
  for (const wep of getWeapons()) {
    entries.push({
      id: `wep_${wep.id}`,
      title: wep.name,
      sub: wep.name_en || wep.weapon_type,
      type: 'weapon',
      typeLabel: 'Vũ khí',
      description: wep.description,
      href: `/database/weapons`,
      icon: 'sword',
      keywords: [wep.name, wep.name_en || '', wep.id, wep.weapon_type, wep.description, ...(wep.tags || [])].join(' ').toLowerCase(),
    });
  }

  // 8. Perks
  for (const perk of getPerks()) {
    entries.push({
      id: `perk_${perk.id}`,
      title: perk.name,
      sub: `Nhánh: ${BRANCH_LABELS[perk.branch] || perk.branch}`,
      type: 'perk',
      typeLabel: 'Kỹ năng',
      description: perk.description,
      href: `/database/perks`,
      icon: 'book-open',
      keywords: [perk.name, perk.id, perk.branch, perk.description, perk.unlock_hint || ''].join(' ').toLowerCase(),
    });
  }

  // 9. Locations
  for (const loc of getLocations()) {
    entries.push({
      id: `loc_${loc.id}`,
      title: loc.name,
      sub: loc.name_en || loc.location_type,
      type: 'location',
      typeLabel: 'Địa danh',
      description: loc.description,
      href: `/database/locations`,
      icon: 'map-pin',
      keywords: [loc.name, loc.name_en || '', loc.id, loc.description, ...(loc.features || [])].join(' ').toLowerCase(),
    });
  }

  return entries;
}
