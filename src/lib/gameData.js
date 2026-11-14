import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_LOCALE } from './i18n/config';
import { getRealmLabel, getSeasonLabel } from './constants';

const BASE_DATA_DIR = path.join(process.cwd(), 'docs/data');

function resolveDataFilePath(fileName, lang = DEFAULT_LOCALE) {
  const langPath = path.join(BASE_DATA_DIR, lang, fileName);
  if (fs.existsSync(langPath)) return langPath;
  const viPath = path.join(BASE_DATA_DIR, 'vi', fileName);
  if (fs.existsSync(viPath)) return viPath;
  return path.join(BASE_DATA_DIR, fileName);
}

function getCollection(fileName, key, lang = DEFAULT_LOCALE) {
  const filePath = resolveDataFilePath(fileName, lang);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(raw);
    return json[key] || [];
  } catch (err) {
    console.error(`Failed to load ${fileName} for lang "${lang}":`, err);
    return [];
  }
}

export function getItems(lang = DEFAULT_LOCALE) {
  return getCollection('items.json', 'items', lang);
}

export function getItemById(id, lang = DEFAULT_LOCALE) {
  return getItems(lang).find(item => item.id === id) || null;
}

export function getRecipes(lang = DEFAULT_LOCALE) {
  return getCollection('recipes.json', 'recipes', lang);
}

export function getRecipeById(id, lang = DEFAULT_LOCALE) {
  return getRecipes(lang).find(r => r.id === id) || null;
}

export function getRecipeByResultItem(itemId, lang = DEFAULT_LOCALE) {
  return getRecipes(lang).find(r => r.result_item_id === itemId) || null;
}

export function getRecipesUsingItem(itemId, lang = DEFAULT_LOCALE) {
  return getRecipes(lang).filter(recipe =>
    (recipe.ingredients || []).some(ing => ing.id === itemId)
  );
}

export function getCharacters(lang = DEFAULT_LOCALE) {
  return getCollection('characters.json', 'characters', lang);
}

export function getCharacterById(id, lang = DEFAULT_LOCALE) {
  return getCharacters(lang).find(c => c.id === id) || null;
}

export const getCrops = (lang = DEFAULT_LOCALE) => getCollection('crops.json', 'crops', lang);
export const getMonsters = (lang = DEFAULT_LOCALE) => getCollection('monsters.json', 'monsters', lang);
export const getWeapons = (lang = DEFAULT_LOCALE) => getCollection('weapons.json', 'weapons', lang);
export const getPerks = (lang = DEFAULT_LOCALE) => getCollection('perks.json', 'perks', lang);
export const getLocations = (lang = DEFAULT_LOCALE) => getCollection('locations.json', 'locations', lang);

export function getCharactersWhoLoveItem(itemId, lang = DEFAULT_LOCALE) {
  const characters = getCharacters(lang);
  const item = getItemById(itemId, lang);
  return characters.filter(c =>
    (c.favorite_items || []).some(favId => {
      if (favId === itemId) return true;
      if (item && item.recipe_id === favId) return true;
      return false;
    })
  );
}

export function getItemSources(itemId, lang = DEFAULT_LOCALE) {
  const item = getItemById(itemId, lang);
  if (!item) return [];

  const isEn = lang === 'en';
  const sources = [];

  // 1. Chế biến từ công thức (Trạm Pha Trà / Lò Nướng Bánh / Bếp Nồi Hầm)
  const craftingRecipe = getRecipeByResultItem(itemId, lang);
  if (craftingRecipe) {
    const ingText = (craftingRecipe.ingredients || [])
      .map(i => `${i.name} x${i.quantity}`)
      .join(', ');
    const isTea = craftingRecipe.station === 'tea_station';
    const isPot = craftingRecipe.station === 'cooking_pot';
    const stationTitle = isTea
      ? (isEn ? 'Tea & Beverage Station' : 'Trạm Pha Trà Oakhaven')
      : isPot
      ? (isEn ? 'Hearth Cauldron & Pot' : 'Bếp Nấu & Nồi Hầm Oakhaven')
      : (isEn ? 'Stone Bakery Oven' : 'Lò Nướng Bánh Đá Oakhaven');
    const badgeText = isTea
      ? (isEn ? 'Tea Station' : 'Trạm Pha Trà')
      : isPot
      ? (isEn ? 'Cooking Pot' : 'Nồi Hầm')
      : (isEn ? 'Bakery Oven' : 'Lò Nướng Bánh');
    const iconName = isTea ? 'tea-bag' : isPot ? 'cooking-pot' : 'cake';
    sources.push({
      type: 'crafting',
      title: isEn ? `Crafted at ${stationTitle}` : `Chế biến tại ${stationTitle}`,
      description: isEn
        ? `Ingredients: ${ingText} · Duration: ${craftingRecipe.duration_seconds}s`
        : `Nguyên liệu: ${ingText} · Thời gian: ${craftingRecipe.duration_seconds}s`,
      href: `/${lang}/database/recipes#${craftingRecipe.id}`,
      badge: badgeText,
      icon: iconName,
    });
  }

  // 2. Thu hoạch từ cây trồng (crops)
  const crops = getCrops(lang);
  const matchingCrop = crops.find(c => c.harvest_item_id === itemId);
  if (matchingCrop) {
    const seasonsText = (matchingCrop.seasons || [])
      .map(s => getSeasonLabel(s, lang))
      .join(', ');
    sources.push({
      type: 'crop',
      title: isEn ? `Harvested from ${matchingCrop.name}` : `Thu hoạch từ ${matchingCrop.name}`,
      description: isEn
        ? `Seasons: ${seasonsText} · Growth: ${matchingCrop.growth_days} days${matchingCrop.regrow_days > 0 ? ` (regrows every ${matchingCrop.regrow_days} days)` : ''}`
        : `Mùa vụ: ${seasonsText} · Sinh trưởng ${matchingCrop.growth_days} ngày${matchingCrop.regrow_days > 0 ? ` (tái sinh mỗi ${matchingCrop.regrow_days} ngày)` : ''}`,
      href: `/${lang}/database/crops`,
      badge: isEn ? 'Four Seasons Farm' : 'Nông Trại Bốn Mùa',
      icon: 'farm',
    });
  }

  // 3. Hạt giống mua tại shop hoặc nhận từ chú cú Pip
  if (item.category === 'seed') {
    sources.push({
      type: 'shop',
      title: isEn
        ? "Maeve's Seed Stand & Pip's Night Foraging"
        : 'Cửa hàng hạt giống Maeve & Cú Pip mang về',
      description: isEn
        ? "Purchase at Maeve's stall in Oakhaven Square or receive from Pip after night flights."
        : 'Mua tại quầy hạt giống Maeve ở Quảng trường Oakhaven hoặc nhận từ chú cú Pip sau chuyến bay đêm.',
      badge: isEn ? 'Merchant / Mailbox' : 'Thương nhân / Hòm thư',
      icon: 'package',
    });
  }

  // 4. Rơi từ quái vật (monsters)
  const monsters = getMonsters(lang);
  const matchingMonsters = monsters.filter(m =>
    (m.loot_items && m.loot_items.some(l => l.id === itemId)) ||
    (m.loot && m.loot.toLowerCase().includes(item.name.toLowerCase()))
  );
  for (const m of matchingMonsters) {
    const lootMatch = (m.loot_items || []).find(l => l.id === itemId);
    const chanceText = lootMatch?.chance
      ? (isEn ? ` (Drop rate: ${lootMatch.chance})` : ` (Tỉ lệ rơi: ${lootMatch.chance})`)
      : '';
    sources.push({
      type: 'monster',
      title: isEn
        ? `Dropped upon defeating ${m.name}${chanceText}`
        : `Rơi khi hạ ${m.name}${chanceText}`,
      description: isEn
        ? `Realm: ${getRealmLabel(m.realm, lang)} · Weakness: ${m.weakness || 'Unknown'}`
        : `Khu vực: ${getRealmLabel(m.realm, lang)} · Điểm yếu: ${m.weakness || 'Không rõ'}`,
      href: `/${lang}/database/monsters`,
      badge: isEn ? 'Combat' : 'Chiến đấu',
      icon: 'sparkle',
    });
  }

  // 5. Khai thác khoáng sản & đá tinh thể
  if (item.category === 'mineral' || item.category === 'gem') {
    sources.push({
      type: 'mining',
      title: isEn
        ? 'Mined in Oakhaven Caverns (150-Floor Mine)'
        : 'Khai thác Hang Mỏ Oakhaven (150 Tầng)',
      description: isEn
        ? 'Mine ore veins and crystal clusters using a pickaxe in subterranean depths.'
        : 'Dùng cuốc đập đá khoáng sản và vỉa tinh thể ở các tầng hầm mỏ sâu.',
      badge: isEn ? 'Mining' : 'Khai khoáng',
      icon: 'mountains',
    });
  }

  return sources;
}

export function getRelatedItems(itemId, limit = 4, lang = DEFAULT_LOCALE) {
  const current = getItemById(itemId, lang);
  if (!current) return [];

  return getItems(lang)
    .filter(it => it.id !== itemId && it.category === current.category)
    .slice(0, limit);
}

export function getDatabaseStats(lang = DEFAULT_LOCALE) {
  const items = getItems(lang);
  const recipes = getRecipes(lang);
  const characters = getCharacters(lang);
  const crops = getCrops(lang);
  const monsters = getMonsters(lang);
  const weapons = getWeapons(lang);
  const perks = getPerks(lang);
  const locations = getLocations(lang);

  return {
    items: items.length,
    recipes: recipes.length,
    characters: characters.length,
    crops: crops.length,
    monsters: monsters.length,
    weapons: weapons.length,
    perks: perks.length,
    locations: locations.length,
    total:
      items.length +
      recipes.length +
      characters.length +
      crops.length +
      monsters.length +
      weapons.length +
      perks.length +
      locations.length,
  };
}
