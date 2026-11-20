---
title: "Four-Season Crops & Farm Automation"
status: public
audience: public
updated: 2026-11-20
tags: [farming, crops, trees, seasons, automation, eatery]
spoiler: false
---

# 🌾 Four-Season Crops & Farm Automation Compendium

The farmstead of Oakhaven Valley is the essential supply line for The Hearth Eatery & Tavern kitchen, providing fresh sustenance for a post-war community in recovery. The agricultural system features **41 canonical plant species**, strictly categorized into:
- **27 Seasonal Field Crops**: Tilled and watered daily on plowed soil, featuring single-harvest staples, wooden trellis vines, and multi-harvest regrowable perennials.
- **14 Perennial Trees & Orchards**: 6 massive silviculture timber species for lumber & tapper resin + 8 fruit tree varieties adhering to a strict $3\times3$ clear-space rule for permanent daily yields.

---

## 1. Soil Management, Water Systems & Automation

### Basic Cultivation Loop
1. **Soil Preparation:** Till soil plots using the Pickaxe/Hoe (`is_tilled = true`).
2. **Sowing Seeds:** Plant seeds purchased from Maeve's Nursery or harvested from wild groves.
3. **Daily Irrigation:** Water every morning via Watering Can or automated sprinklers. Crops left unwatered halt growth for that day without withering.
4. **Harvesting:** Harvest by hand, or chop giant crop clusters with an axe.

### Automated Sprinkler Irrigation Systems
Sprinklers automatically water surrounding crops at **06:00 AM** daily, freeing up Stamina and hours for deep dungeon delves:
- **Copper Sprinkler:** Waters 4 adjacent cross tiles (North, South, East, West). Forged from 1 Copper Bar + 1 Iron Ore.
- **Iron Sprinkler:** Waters 8 surrounding tiles ($3\times3$ grid). Forged from 1 Iron Bar + 1 Copper Bar.
- **Void Sprinkler:** Waters 24 surrounding tiles ($5\times5$ area minus center). Forged from 1 Void Bar (Deep Mine Floors 141+) + 1 Amethyst Shard.

### Crop Protection & Natural Fertilizers
- **Straw Scarecrow:** Shields an 8-tile radius against forest crows stealing planted seeds.
- **Oakhaven Wood Ash (`item_wood_ash`):** Recovered from kitchen hearth embers; speeds crop maturation by 15%.
- **Dungeon Bone Meal (`item_bone_meal`):** Ground beast bones from mine depths; increases Silver/Gold harvest quality rates by 30%.
- **Retaining Moss Mulch (`item_retaining_moss`):** Blended wetland moss giving a 50% chance for soil to remain watered overnight.

---

## 2. Catalog of 27 Seasonal Field Crops

### 🌸 A. Spring (7 Field Crops)
| Crop | Growth | Regrowth | Seed Cost | Sell Price | Daily Profit | Culinary & Valley Usage |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Silver Wheat** (*Lúa Mì Bạc*) | 4 days | Single | 15g | 30g | **3.75 Gold/day** | Milled at the Windmill into Fresh Flour for hearth loaves and rations. Plantable in Spring, Summer, Autumn. |
| **Ice Cabbage** (*Bắp Cải Băng*) | 6 days | Single | 35g | 55g | **3.33 Gold/day** | Crisp, tightly wrapped heads thriving in morning frost; essential for clear broths and pickled reserves. |
| **Wild Strawberry** (*Dâu Rừng Mùa Xuân*) | 7 days | **3 days** | 60g | 35g | **7.86 Gold/day** (8 harvests) | Juicy berries yielding 8 harvest waves across Spring; cooked into preserves for flaky croissants. |
| **Pea Pod** (*Đậu Hà Lan Giàn Leo*) | 10 days | **3 days** | 60g | 30g | **5.36 Gold/day** (7 harvests) | Wooden trellis vine (impassable); sweet pods for vegetable fried rice and beet broth. |
| **Oakhaven Lotus Tea** (*Búp Trà Sen Oakhaven*) | 12 days | **4 days** | 40g | 25g | **3.04 Gold/day** (5 harvests) | Perennial tea shrub sprouting in Spring & Summer; delicate tips dried for restorative calming tea blends. |
| **Sun Daisy** (*Hoa Cúc Mặt Trời*) | 5 days | Single | 20g | 38g | **3.60 Gold/day** | Bright golden blossoms brewed into soothing herbal infusions and boiled into natural yellow fabric dye. |
| **Sopophorous Bean** (*Đậu Thao Thức Cổ Sinh*) | 11 days | **3 days** | 90g | 50g | **13.81 Gold/day** (3 seasons) | Ancient perennial vine yielding across Spring, Summer, and Autumn (25 harvests); bean oil wards off drowsiness. |

---

### ☀️ B. Summer (7 Field Crops)
| Crop | Growth | Regrowth | Seed Cost | Sell Price | Daily Profit | Culinary & Valley Usage |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Sun Corn** (*Bắp Ngô Ánh Dương*) | 12 days | **4 days** | 80g | 45g | **8.21 Gold/day** (2 seasons) | Tall stalks persisting through Autumn (12 harvests); roasted with garlic butter and stewed in corn chowder. |
| **Fire Tomato** (*Cà Chua Lửa Mọng Nước*) | 10 days | **4 days** | 50g | 24g | **2.50 Gold/day** (5 harvests) | Crimson vines producing juicy fruit; simmered into meat sauces, spicy seafood stews, and savory marinades. |
| **Magma Melon** (*Dưa Hấu Dung Nham*) | 12 days | Single | 80g | 180g | **8.33 Gold/day** | Massive melons with warming reddish-orange flesh; 2% chance to fuse into a Giant Melon in $3\times3$ plots. |
| **Honey Cane** (*Mía Mật Ong Hổ Phách*) | 7 days | Single | 30g | 55g | **3.57 Gold/day** | Deep-purple sugar stalks pressed into Raw Cane Sugar for tavern baking. |
| **Shadow Carrot** (*Hắc Cà Rốt Mắt Mèo*) | 6 days | Single | 35g | 65g | **5.00 Gold/day** | Dark purple skin with bioluminescent orange core; enhances night vision in deep mines. Grows in Summer & Autumn. |
| **Whisper Ginger** (*Hỏa Khương Rừng Thầm Thì*) | 8 days | Single | 45g | 85g | **5.00 Gold/day** | Pungent warm root; removes fishiness from trout skewers and warms cold guests during storms. |
| **Sunflower** (*Hoa Hướng Dương Vàng*) | 8 days | Single | 40g | 50g | **~6.25 Gold/day** (with seeds) | Harvest drops 1–2 bonus seed packets (saving 40–80g); pressed for culinary cooking oil. |

---

### 🍂 C. Autumn (6 Field Crops)
| Crop | Growth | Regrowth | Seed Cost | Sell Price | Daily Profit | Culinary & Valley Usage |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Sweet Pumpkin** (*Bí Ngô Mật Khổng Lồ*) | 13 days | Single | 100g | 260g | **12.31 Gold/day** | Autumn cash king; baked into honey pumpkin pies and cream soups; 2% chance to become a Giant Pumpkin. |
| **Shadow Rye** (*Hắc Mạch Đêm Rừng*) | 5 days | Single | 30g | 60g | **6.00 Gold/day** | Fast-growing dark grain; milled into coarse flour for dense miner bread loaves. |
| **Night Grape** (*Nho Đêm Giàn Leo*) | 10 days | **3 days** | 80g | 44g | **8.14 Gold/day** (7 harvests) | Heavy dark clusters requiring trellises; fermented in oak casks into rich Oakhaven Vintage Red Wine. |
| **Moonlight Yam** (*Khoai Lang Nguyệt Quang*) | 9 days | Single | 45g | 95g | **5.56 Gold/day** | Silver-skinned tubers with sweet violet flesh; coal-roasted on tavern hearth stones. |
| **Misty Lavender** (*Oải Hương Đồi Sương*) | 7 days | Single | 35g | 75g | **5.71 Gold/day** | Fragrant purple stalks from misty ridges; sewn into tavern pillows to boost lodging comfort scores. |
| **Mandrake Root** (*Củ Mandrake Nhân Sâm*) | 14 days | Single | 100g | 280g | **12.86 Gold/day** | Prized humanoid root plantable in Autumn & Winter; stewed into vigor-restoring boss combat broths. |

---

### ❄️ D. Winter (6 Field Crops)
| Crop | Growth | Regrowth | Seed Cost | Sell Price | Daily Profit | Culinary & Valley Usage |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Frost Turnip** (*Bạch Ngọc Củ Cải*) | 5 days | Single | 25g | 50g | **5.00 Gold/day** | Fast-growing snowy tubers; simmered with wild boar bone broth during bitter cold snaps. |
| **Frostmint** (*Bạc Hà Băng Giá*) | 6 days | Single | 30g | 65g | **5.83 Gold/day** | Ice-rimmed aromatic leaves; brewed into herbal decongestants and invigorating mint pastilles. |
| **Frost Potato** (*Khoai Tây Tuyết Núi Cao*) | 7 days | Single | 45g | 90g | **~8.04 Gold/day** (with 25% extra) | Hearty mountain potatoes; mashed with butter and garlic for blacksmith Boris's favorite side dish. |
| **Frost Beet** (*Củ Dền Băng Ruby*) | 6 days | Single | 40g | 80g | **6.67 Gold/day** | Ruby-red roots rich in concentrated sugars; gives deep crimson coloring to holiday stews and pastries. |
| **Lichen Root** (*Rễ Địa Y Băng Giá*) | 8 days | Single | 55g | 120g | **8.12 Gold/day** | Ancient subterranean lichen roots; refined into immune-boosting cold resistance tonics. |
| **Frost Lotus** (*Sen Băng Tuyết Ngàn Năm*) | 12 days | Single | 120g | 320g | **16.67 Gold/day** | Rare crystalline water lilies growing on semi-frozen shorelines; winter economic record yield. |

---

### 🪵 E. Four-Season Specialty Cultivation (1 Model)
- **Mushroom Cultivation Log (`crop_mushroom_log`):**
  - One-time crafting investment (180g cost: Dead Wood + Spores).
  - Harvests wild mushrooms every **4 days year-round across all 4 seasons** with zero watering required.
  - Generates steady revenue: **11.25 Gold/day** (28 harvests/year = 1,260 Gold net annual revenue).
  - 10% chance to mutate into rare Lumina Cave Shrooms when placed in damp cellar spots.

---

## 3. Catalog of 14 Perennial Trees & Orchards

### 🌲 A. 6 Silviculture Timber Species
Saplings mature in 20–30 days on any clear unplowed tile with no daily watering required:
1. **Oakhaven Great Oak (`tree_oak` - 24d):** Yields 12–16 Aged Oak Logs + Firewood. Tapper produces **Dark Oak Resin** every 7 days (fermentation casks, bridge repairs).
2. **Alpine Pine (`tree_pine` - 22d):** Yields 12–16 Alpine Pine Logs. Tapper produces **Pine Tar** every 5 days (boat hull waterproofing, mine torches).
3. **Ember Maple (`tree_maple` - 24d):** Yields 10–14 Ember Maple Lumber. Tapper produces **Amber Maple Syrup** every 9 days (inn pancakes, VIP tables).
4. **Silver Birch (`tree_birch` - 20d):** Yields 10–14 Silver Birch Logs + Bark Strips. Tapper produces **Birch Sap** every 6 days (storage chests).
5. **River Willow (`tree_willow` - 22d):** Yields 14–18 Flexible Willow Branches. Tapper produces **Willow Sap** every 6 days (fish traps, fever tea).
6. **Abyssal Ironwood (`tree_ironwood` - 30d):** Requires Iron Axe or better (16 chops). Yields 8–12 Dense Ironwood. Tapper produces **Anti-Rust Ironwood Oil** every 10 days (deep mine timbers).

### 🍎 B. 8 Perennial Fruit Orchards ($3\times3$ Clear Footprint)
Requires 28 days to mature from saplings, needing the 8 surrounding tiles completely clear of debris. Once mature, produces 1 fruit daily throughout their active season (28 fruit per season):
1. **Honey Oak Apple Tree (`fruit_apple`):** Autumn — Crisp honeyed apples (**28 Gold/day**); baked into tavern pies and apple cider.
2. **Volt Lemon Tree (`fruit_lemon`):** Summer — Zesty citrus (**35 Gold/day**); mixed into thirst-quenching lemonades and fish sauces.
3. **Frost Plum Tree (`fruit_plum`):** Winter — Cold-hardy sweet plums (**38 Gold/day**); distilled into spiced plum brandy.
4. **Primrose Peach Tree (`fruit_peach`):** Spring — Tender pink peaches (**42 Gold/day**); whipped into delicate fruit mousses.
5. **Crimson Cherry Tree (`fruit_cherry`):** Spring — Juicy tart cherries (**32 Gold/day**); baked into tarts and glazes.
6. **Wild Walnut Tree (`fruit_walnut`):** Autumn — Rich savory nuts (**35 Gold/day**); crushed into nutrient bars for miners.
7. **Frost Pear Tree (`fruit_pear`):** Autumn — Sweet crisp pears (**30 Gold/day**); poached in mulled wine to soothe winter coughs.
8. **Fire Orange Tree (`fruit_orange`):** Summer — Vibrant sweet oranges (**32 Gold/day**); freshly squeezed breakfast juices.

---

## 4. Strategic Crop Planning & Economic Guidelines

1. **Year 1 Spring:**
   - Devote 60% of tilled land to **Silver Wheat** to maintain steady flour for bakery bread orders.
   - Plant 1 row of **Wild Strawberry** (8 harvests) and 1 row of **Pea Pods** for dependable passive income every 3 days.
2. **Year 1 Summer:**
   - Plant **Sun Corn** on Summer Day 1: it survives continuously through Autumn (56 days), minimizing re-planting costs.
   - Cultivate a $3\times3$ grid of **Magma Melons** to fish for Giant Melons.
3. **Year 1 Autumn:**
   - Reinvest savings into **Sweet Pumpkins** (leading profit at 12.31 Gold/day) to fund high-tier tool upgrades before winter freezes.
4. **Year 1 Winter:**
   - Do not leave fields idle! Rapidly rotate **Frost Turnips** (5-day turnaround) and plant shoreline **Frost Lotus** for substantial year-end profits.
