---
title: "Forestry, Orchard & Botanical Farming Compendium"
status: published
audience: public
updated: 2026-11-26
tags: [farming, forestry, trees, orchards, crops]
spoiler: false
---

# Forestry, Orchard & Botanical Farming Compendium

> *"When war swept through, the gods returned neither gold nor gems to our soil, but slumbering seeds buried beneath cold ash. To plant an oak today is to build a hearth for the generations of tomorrow."*  
> — **From the Sylvicultural Journal of Maeve, Oakhaven Nursery**

The flora and agrarian ecology of Oakhaven is structured into **three foundational botanic pillars**:
1. **Silviculture & Timber Trees**: Lifeline of structural timber, hearth firewood for the inn, and artisanal tree-tapping resins and syrups.
2. **Perennial Fruit Orchards**: Long-term capital investments governed by the **$3\times3$ clear-space rule**, yielding daily premium fruit that ages in star quality year after year.
3. **Seasonal Field Crops & Trellises**: Four-season tilled-soil agriculture utilizing wood-ash fertilizers, vine trellises, and giant-crop combinations to supply the Hearth Eatery & Tavern.

---

## Pillar 1: Silviculture & Timber Trees

Forestry timber trees can be cultivated from seeds or acorns planted in any clear ground tile. They require neither daily tilling nor manual watering.

### The 6 Great Timber Species of Oakhaven

| Species | Seed / Cone | Growth Days | Felling Wood Yield | Tree Tapper Product | Tap Cycle | Axe Tier Required | Town Restoration & Tavern Utility |
| :--- | :--- | :---: | :--- | :--- | :---: | :--- | :--- |
| **Oakhaven Great Oak** | `seed_oak_acorn` | 24 days | 12-16 Oak Wood (`item_wood_oak`) + 4-6 Firewood | **Dark Oak Resin** (`item_oak_resin`) | 7 days | Basic Axe (10 hits) | Oakhaven Bridge restoration, fermentation casks, tavern dining tables |
| **Alpine Pine** | `seed_pine_cone` | 22 days | 12-16 Pine Wood (`item_wood_pine`) + 3-5 Firewood | **Alpine Pine Tar** (`item_pine_tar`) | 5 days | Basic Axe (8 hits) | Pier dock waterproofing, deep-mine flares, brewery barrels |
| **Ember Maple** | `seed_maple_seed` | 24 days | 10-14 Maple Wood (`item_wood_maple`) | **Amber Maple Syrup** (`item_maple_syrup`) | 9 days | Basic Axe (9 hits) | Tavern pancake breakfasts (+75 Energy), VIP suite furniture |
| **Silver Birch** | `seed_birch_catkin` | 20 days | 10-14 Birch Wood (`item_wood_birch`) + 2-4 Bark | **Pure Birch Sap** (`item_birch_sap`) | 6 days | Basic Axe (8 hits) | Chests, waterproof scrolls, fatigue-cleansing spring draughts |
| **River Willow** | `seed_willow_cutting` | 22 days | 14-18 Willow Branches (`item_willow_branch`) | **Medicinal Willow Sap** (`item_willow_sap`) | 6 days | Basic Axe (8 hits) | Woven fish traps and refugee cribs; fever remedies and cold resistance |
| **Abyssal Ironwood** | `seed_ironwood_pod` | 30 days | 8-12 Ironwood Timber (`item_wood_ironwood`) | **Ironwood Preserving Oil** (`item_ironwood_oil`) | 10 days | **Iron Axe+** (16 hits) | Deep-mine structural shoring, heavy ore wagons, anti-rust tool care |

### Forestry Mechanics & Silviculture Loop
- **Felling & Tree Stumps**: Chopping down a mature tree yields wood and firewood, leaving behind a stump. Spending 3-4 additional axe hits clears the stump, granting 2-4 bonus core timber and freeing the land.
- **Artisan Tree Tapper (`item_tree_tapper`)**: Crafted from `40 Oak Wood` + `2 Copper Bars`. Mounts directly onto mature trunks. Once the collection bucket glows golden, Rowan can harvest resin/syrup.
- **Tree Shaking**: Rowan may shake any mature tree daily. There is a 25% chance to dislodge acorns, pinecones, or unripened wild berries.

---

## Pillar 2: Perennial Fruit Orchards

Orchard trees are permanent fixtures requiring careful spatial planning and substantial seed capital, but repaying Rowan with effortless daily passive revenue.

### The $3\times3$ Clear-Space Spatial Rule
A young fruit sapling requires all **8 surrounding tiles** to be completely free of weeds, boulders, fences, or other trees during its 28-day maturation period.

### Fruit Tree Mechanics
1. **Maturation**: Exactly **28 days** (one complete in-game calendar season).
2. **Zero Watering**: Orchard roots tap deep into Oakhaven's pristine sub-aquifer; no daily watering can is needed.
3. **Daily In-Season Yield**: Bears **1 fruit every morning** during its active calendar season. If unharvested, the branches safely hold up to **3 fruits**.
4. **Star Quality Aging**:
   - **Year 1**: Regular quality.
   - **Year 2**: 100% Silver Star 🥈 (+25% sell price & stamina).
   - **Year 3**: 100% Gold Star 🥇 (+50% sell price & stamina).
   - **Year 4+**: 100% Oakhaven Star Quality ⭐⭐⭐ (+100% value & prolonged buffs).
5. **Greenhouse Miracles**: When Restoration Project #3 (The Ancient Conservatory) is rebuilt, all orchard trees planted inside fruit **365 days a year** regardless of exterior blizzards!

### The 8 Valley Orchard Trees

| Sapling Item | Tree Name | Season | Sapling Cost | Harvest Produce | Base Value | Tavern Specialty Dish |
| :--- | :--- | :---: | :---: | :--- | :---: | :--- |
| `seed_sapling_apple` | **Oakhaven Honey Apple** | Autumn | 900g | Honey Apple (`item_oakhaven_apple`) | 28g | Warm Oakhaven Apple Pie, Spiced Cider |
| `seed_spark_lemon` | **Spark Lemon Tree** | Summer | 1,000g | Spark Lemon (`item_spark_lemon`) | 35g | Iced Lemon Tea, Summer Roast Glaze |
| `seed_sapling_plum` | **Frost Plum Tree** | Winter | 1,000g | Frost Plum (`item_frost_plum`) | 38g | Mulled Plum Wine, Winter Warming Conserve |
| `seed_sapling_peach` | **Blossom Peach Tree** | Spring | 1,100g | Blossom Peach (`item_blossom_peach`) | 42g | Hearth Breakfast Peach Preserves |
| `seed_sapling_cherry` | **Crimson Cherry Tree** | Spring | 950g | Crimson Cherry (`item_crimson_cherry`) | 32g | Royal Oakhaven Pastry Tart |
| `seed_sapling_walnut` | **Oakhaven Walnut Tree** | Autumn | 1,200g | Valley Walnut (`item_walnut`) | 35g | Delver's High-Energy Trail Loaf |
| `seed_sapling_pear` | **Misty Pear Tree** | Autumn | 1,050g | Misty Pear (`item_mist_pear`) | 30g | Cinnamon Poached Pears |
| `seed_sapling_orange` | **Ember Orange Tree** | Summer | 1,000g | Ember Orange (`item_ember_orange`) | 32g | Fresh Morning Welcome Juice for Inn Guests |

---

## Pillar 3: Seasonal Field Crops & Trellises

Field crops provide the staple grains, vegetables, and culinary spices for Oakhaven Tavern. They require hoed soil (`is_tilled = true`) and daily watering.

### Field Categories
- **Single Harvest**: Plants harvested once by the roots (Silver Wheat, Ice Cabbage, Frost Potatoes, Turnips, Beets).
- **Regrowable Bush Crops**: Continues to bear fresh harvest every 3-4 days all season long (Sun Corn, Fire Tomatoes, Sen Tea Bushes, Spring Wildberries).
- **Trellis Crops**: Climbing vines requiring timber trellis frames (Sweet Peas, Night Grapes). Trellises are impassable; plan garden lanes carefully.
- **Giant Crops**: When planting a $3\times3$ grid of Sweet Pumpkins, Magma Melons, or Ice Cabbages, there is a 2% daily chance they fuse into a monumental Giant Crop yielding **15-20 harvest units** with an axe!

### Natural Soil Fertilizers
- **Wood Ash (`item_wood_ash`)**: Potash gathered from the tavern oven. Speeds growth cycle by 15%.
- **Starlight Bone Meal (`item_bone_meal`)**: Ground river shells and mine fossils. Boosts Silver and Gold quality yield by 30%.
- **Hydrating Moss Mulch (`item_retaining_moss`)**: Spongy wetland peat. Gives soil a 50% chance to remain watered overnight.

---

## Pillar 4: Specialty Cultivation & Mushroom Logs

- **Inoculated Mushroom Log (`item_mushroom_log`)**: Crafted from `1 Oak/Humus Wood` + `5 Wild Mushrooms`. When placed in shade or the tavern cellar, it reliably produces fresh Wild Mushrooms every 4 days year-round with zero watering.
- **Aquatic Marsh Agriculture**: **Millennial Frost Lotus (`crop_frost_lotus`)** only grows on water-adjacent shoreline plots during winter, fetching an unparalleled 320g per blossom.
