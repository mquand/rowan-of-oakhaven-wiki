import fs from 'node:fs';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'docs/data');

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

export function getRecipesUsingItem(itemId) {
  return getRecipes().filter(recipe =>
    (recipe.ingredients || []).some(ing => ing.id === itemId)
  );
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

export function getItemSources(itemId) {
  const item = getItemById(itemId);
  if (!item) return [];

  const sources = [];

  // 1. Kiểm tra từ cây trồng (crops)
  const crops = getCrops();
  const matchingCrop = crops.find(c => c.harvest_item_id === itemId);
  if (matchingCrop) {
    sources.push({
      type: 'crop',
      title: `Thu hoạch từ ${matchingCrop.name}`,
      description: `Mùa: ${(matchingCrop.seasons || []).join(', ')} · Sinh trưởng ${matchingCrop.growth_days} ngày${matchingCrop.regrow_days > 0 ? ` (tái sinh mỗi ${matchingCrop.regrow_days} ngày)` : ''}`,
      href: `/database/crops`,
      badge: 'Nông trại',
      icon: 'farm',
    });
  }

  // 2. Kiểm tra nếu là hạt giống
  if (item.category === 'seed') {
    sources.push({
      type: 'shop',
      title: 'Cửa hàng hạt giống Oakhaven & Cú Pip mang về',
      description: 'Mua tại quầy hạt giống của Thị Trấn Oakhaven hoặc nhận từ chú cú Pip sau chuyến bay đêm.',
      badge: 'Thương nhân / Hòm thư',
      icon: 'package',
    });
  }

  // 3. Kiểm tra từ quái vật (monsters)
  const monsters = getMonsters();
  const matchingMonsters = monsters.filter(m =>
    (m.loot && m.loot.toLowerCase().includes(item.name.toLowerCase())) ||
    (m.tags && m.tags.includes(itemId))
  );
  for (const m of matchingMonsters) {
    sources.push({
      type: 'monster',
      title: `Rơi từ quái: ${m.name}`,
      description: `Vực: ${m.realm} · Điểm yếu: ${m.weakness || 'Không rõ'}`,
      href: `/database/monsters`,
      badge: 'Chiến đấu',
      icon: 'sparkle',
    });
  }

  // 4. Nếu là khoáng sản / tinh thể
  if (item.category === 'mineral' || item.category === 'gem') {
    sources.push({
      type: 'mining',
      title: 'Khai thác hang mỏ Rừng Thầm Thì',
      description: 'Dùng cuốc đập đá khoáng sản và khối tinh thể ở các tầng hầm mỏ sâu.',
      badge: 'Khai mỏ',
      icon: 'mountains',
    });
  }

  // 5. Nếu là quái vật rơi nhưng chưa match cụ thể
  if (item.category === 'monster_drop' && matchingMonsters.length === 0) {
    sources.push({
      type: 'monster',
      title: 'Rơi từ quái vật đới mỏ',
      description: item.description,
      href: `/database/monsters`,
      badge: 'Chiến đấu',
      icon: 'sparkle',
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
