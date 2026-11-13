import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'docs/data');

const REALM_NAMES = {
  oakhaven: 'Thị trấn Oakhaven',
  solaria: 'Kinh Đô Ánh Sáng Solaria',
  'sylva-fae': 'Đại Rừng Yêu Tinh Sylva-Fae',
  'khaz-drakor': 'Đại Đô Thị Ngầm Khaz-Drakor',
  aethelgard: 'Địa Đàng Cực Quang Aethelgard',
};

const SEASON_NAMES = {
  spring: 'Xuân',
  summer: 'Hạ',
  autumn: 'Thu',
  winter: 'Đông',
};

export function getItems() {
  const filePath = path.join(DATA_DIR, 'items.json');
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(raw);
    return json.items || [];
  } catch (err) {
    console.error('Failed to load items.json:', err);
    return [];
  }
}

export function getItemById(id) {
  return getItems().find(item => item.id === id) || null;
}

export function getRecipes() {
  const filePath = path.join(DATA_DIR, 'recipes.json');
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(raw);
    return json.recipes || [];
  } catch (err) {
    console.error('Failed to load recipes.json:', err);
    return [];
  }
}

export function getRecipeById(id) {
  return getRecipes().find(r => r.id === id) || null;
}

export function getRecipeByResultItem(itemId) {
  return getRecipes().find(r => r.result_item_id === itemId) || null;
}

export function getRecipesUsingItem(itemId) {
  return getRecipes().filter(recipe =>
    (recipe.ingredients || []).some(ing => ing.id === itemId)
  );
}

export function getCharacters() {
  const filePath = path.join(DATA_DIR, 'characters.json');
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(raw);
    return json.characters || [];
  } catch (err) {
    console.error('Failed to load characters.json:', err);
    return [];
  }
}

export function getCharacterById(id) {
  return getCharacters().find(c => c.id === id) || null;
}

function getCollection(fileName, key) {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(raw);
    return json[key] || [];
  } catch (err) {
    console.error(`Failed to load ${fileName}:`, err);
    return [];
  }
}

export const getCrops = () => getCollection('crops.json', 'crops');
export const getMonsters = () => getCollection('monsters.json', 'monsters');
export const getWeapons = () => getCollection('weapons.json', 'weapons');
export const getPerks = () => getCollection('perks.json', 'perks');
export const getLocations = () => getCollection('locations.json', 'locations');

export function getCharactersWhoLoveItem(itemId) {
  const characters = getCharacters();
  const item = getItemById(itemId);
  return characters.filter(c =>
    (c.favorite_items || []).some(favId => {
      if (favId === itemId) return true;
      if (item && item.recipe_id === favId) return true;
      return false;
    })
  );
}

export function getItemSources(itemId) {
  const item = getItemById(itemId);
  if (!item) return [];

  const sources = [];

  // 1. Chế biến từ công thức (Trạm Pha Trà / Lò Nướng Bánh)
  const craftingRecipe = getRecipeByResultItem(itemId);
  if (craftingRecipe) {
    const ingText = (craftingRecipe.ingredients || [])
      .map(i => `${i.name} x${i.quantity}`)
      .join(', ');
    const isTea = craftingRecipe.station === 'tea_station';
    sources.push({
      type: 'crafting',
      title: `Chế biến tại ${isTea ? 'Trạm Pha Trà' : 'Lò Nướng Bánh Thần Kỳ'}`,
      description: `Nguyên liệu: ${ingText} · Thời gian: ${craftingRecipe.duration_seconds}s`,
      href: `/database/recipes#${craftingRecipe.id}`,
      badge: isTea ? 'Trạm Pha Trà' : 'Lò Nướng Bánh',
      icon: isTea ? 'tea-bag' : 'cake',
    });
  }

  // 2. Thu hoạch từ cây trồng (crops)
  const crops = getCrops();
  const matchingCrop = crops.find(c => c.harvest_item_id === itemId);
  if (matchingCrop) {
    const seasonsText = (matchingCrop.seasons || [])
      .map(s => SEASON_NAMES[s] || s)
      .join(', ');
    sources.push({
      type: 'crop',
      title: `Thu hoạch từ ${matchingCrop.name}`,
      description: `Mùa vụ: ${seasonsText} · Sinh trưởng ${matchingCrop.growth_days} ngày${matchingCrop.regrow_days > 0 ? ` (tái sinh mỗi ${matchingCrop.regrow_days} ngày)` : ''}`,
      href: `/database/crops`,
      badge: 'Nông Trại Bốn Mùa',
      icon: 'farm',
    });
  }

  // 3. Hạt giống mua tại shop hoặc nhận từ chú cú Pip
  if (item.category === 'seed') {
    sources.push({
      type: 'shop',
      title: 'Cửa hàng hạt giống Maeve & Cú Pip mang về',
      description: 'Mua tại quầy hạt giống Maeve ở Quảng trường Oakhaven hoặc nhận từ chú cú Pip sau chuyến bay đêm.',
      badge: 'Thương nhân / Hòm thư',
      icon: 'package',
    });
  }

  // 4. Rơi từ quái vật (monsters)
  const monsters = getMonsters();
  const matchingMonsters = monsters.filter(m =>
    (m.loot_items && m.loot_items.some(l => l.id === itemId)) ||
    (m.loot && m.loot.toLowerCase().includes(item.name.toLowerCase()))
  );
  for (const m of matchingMonsters) {
    const lootMatch = (m.loot_items || []).find(l => l.id === itemId);
    const chanceText = lootMatch?.chance ? ` (Tỉ lệ rơi: ${lootMatch.chance})` : '';
    sources.push({
      type: 'monster',
      title: `Rơi khi hạ ${m.name}${chanceText}`,
      description: `Khu vực: ${REALM_NAMES[m.realm] || m.realm} · Điểm yếu: ${m.weakness || 'Không rõ'}`,
      href: `/database/monsters`,
      badge: 'Chiến đấu',
      icon: 'sparkle',
    });
  }

  // 5. Khai thác khoáng sản & đá tinh thể
  if (item.category === 'mineral' || item.category === 'gem') {
    sources.push({
      type: 'mining',
      title: 'Khai thác hang mỏ Rừng Thầm Thì (Mỏ 100 Tầng)',
      description: 'Dùng cuốc đập đá khoáng sản và vỉa tinh thể ở các tầng hầm mỏ sâu.',
      badge: 'Khai khoáng',
      icon: 'mountains',
    });
  }

  return sources;
}

export function getRelatedItems(itemId, limit = 4) {
  const current = getItemById(itemId);
  if (!current) return [];

  return getItems()
    .filter(it => it.id !== itemId && it.category === current.category)
    .slice(0, limit);
}

export function getDatabaseStats() {
  const items = getItems();
  const recipes = getRecipes();
  const characters = getCharacters();
  const crops = getCrops();
  const monsters = getMonsters();
  const weapons = getWeapons();
  const perks = getPerks();
  const locations = getLocations();

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
