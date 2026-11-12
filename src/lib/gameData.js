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
