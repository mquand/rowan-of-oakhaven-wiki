import itemsVi from '../../docs/data/vi/items.json';
import itemsEn from '../../docs/data/en/items.json';
import recipesVi from '../../docs/data/vi/recipes.json';
import recipesEn from '../../docs/data/en/recipes.json';
import { CATEGORY_ICONS } from './constants';
import { DEFAULT_LOCALE } from './i18n/config';

const DATA = {
  vi: {
    items: itemsVi.items || [],
    recipes: recipesVi.recipes || [],
  },
  en: {
    items: itemsEn.items || [],
    recipes: recipesEn.recipes || [],
  },
};

export function lookupGift(id, lang = DEFAULT_LOCALE) {
  if (!id) return null;

  const bundle = DATA[lang] || DATA[DEFAULT_LOCALE];
  const foundItem = bundle.items.find(it => it.id === id);
  if (foundItem) {
    return {
      id: foundItem.id,
      name: foundItem.name,
      type: 'item',
      category: foundItem.category,
      icon: CATEGORY_ICONS[foundItem.category] || 'package',
      href: `/${lang}/database/items/${foundItem.id}`,
      rarity: foundItem.rarity || 'common',
      sell_price: foundItem.sell_price,
    };
  }

  const foundRecipe = bundle.recipes.find(r => r.id === id);
  if (foundRecipe) {
    const isTea = foundRecipe.station === 'tea_station';
    return {
      id: foundRecipe.id,
      name: foundRecipe.name,
      type: 'recipe',
      category: isTea ? 'tea' : 'bakery',
      icon: isTea ? 'tea-bag' : 'cake',
      href: `/${lang}/database/recipes#${foundRecipe.id}`,
      resultItemId: foundRecipe.result_item_id,
    };
  }

  return {
    id,
    name: id.replace(/^(item_|seed_|recipe_)/, '').replace(/_/g, ' '),
    type: 'item',
    icon: 'package',
    href: `/${lang}/database/items`,
  };
}
