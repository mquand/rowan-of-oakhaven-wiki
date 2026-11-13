import itemsJson from '../../docs/data/items.json';
import recipesJson from '../../docs/data/recipes.json';

const items = itemsJson.items || [];
const recipes = recipesJson.recipes || [];

const CATEGORY_ICONS = {
  seed: 'plant',
  ingredient: 'grains',
  mineral: 'mountains',
  gem: 'diamond',
  monster_drop: 'sparkle',
  tea: 'tea-bag',
  bakery: 'cake',
};

const lookupMap = new Map();

for (const it of items) {
  lookupMap.set(it.id, {
    id: it.id,
    name: it.name,
    type: 'item',
    category: it.category,
    icon: CATEGORY_ICONS[it.category] || 'package',
    href: `/database/items/${it.id}`,
    rarity: it.rarity || 'common',
    sell_price: it.sell_price,
  });
}

for (const r of recipes) {
  const isTea = r.station === 'tea_station';
  lookupMap.set(r.id, {
    id: r.id,
    name: r.name,
    type: 'recipe',
    category: isTea ? 'tea' : 'bakery',
    icon: isTea ? 'tea-bag' : 'cake',
    href: `/database/recipes#${r.id}`,
    resultItemId: r.result_item_id,
  });
}

export function lookupGift(id) {
  if (!id) return null;
  if (lookupMap.has(id)) return lookupMap.get(id);

  return {
    id,
    name: id.replace(/^(item_|seed_|recipe_)/, '').replace(/_/g, ' '),
    type: 'item',
    icon: 'package',
    href: `/database/items`,
  };
}
