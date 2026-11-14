---
title: "Caverns, Combat Mechanics & Boris's Forge"
status: stable
audience: public
updated: 2026-11-14
tags: [dungeon, combat, monsters, weapons, mining, forge, boris]
spoiler: false
---

# 🌙 Caverns, Combat Mechanics & Boris's Forge

The subterranean depths of Oakhaven constitute the game's **core action and survival pillar**. All the gold coin reserves amassed from surface farming, cooking, and running the evening tea shop converge toward one paramount purpose: **investing in combat equipment at Boris's Forge**, tempering your arsenal, and delving deep into subterranean strata to cleanse the Star Blight.

---

## 1. Dual Subterranean Sectors

```
               ┌────────────────────────────────────────────────────────┐
               │                     OAKHAVEN TOWN                      │
               │   (Farmstead • Tea Bakery • Forge • Village Clinic)    │
               └───────────────┬────────────────────────┬───────────────┘
                               │                        │
                    Mineral Elevator                 Dungeon Rift
                               ▼                        ▼
               ┌────────────────────────┐  ┌────────────────────────────┐
               │     OAKHAVEN MINES     │  │   STAR BLIGHT DUNGEON      │
               │   (150 FIXED FLOORS)   │  │  (PROCEDURAL ROGUELIKE)    │
               │                        │  │                            │
               │ • Elevator every 5 fls │  │ • Randomly generated rooms │
               │ • Mine 17 raw ores     │  │ • 12 shifting biomes       │
               │ • Stratum Warden bosses│  │ • High survival stakes     │
               │ • Fl 150: Khaz-Drakor  │  │ • Astral Cores & Relics    │
               └────────────────────────┘  └────────────────────────────┘
```

1. **The Oakhaven Mines (150 Fixed Floors):**
   * A fixed 150-floor descent divided into 5 distinct geological strata (Shallow Earth 1–20, Copper Shafts 21–50, Iron Caverns 51–80, Golden Hollows 81–110, Volcanic Obsidian 111–140, and Starlight Depths 141–150).
   * **Mechanical Elevators:** Automatically unlocks a lift gate every 5 floors (5, 10, 15... 150), allowing instant transit between the surface and explored depths.
   * **Stratum Wardens:** Major bosses defending milestones at floors 30, 60, 90, 120, and 150. Slaying a Warden unlocks new blueprints at Boris's Forge and passage into subsequent strata.

2. **The Star Blight Dungeon (Procedural Roguelike):**
   * An infinite procedural labyrinth spanning **12 diverse biomes**.
   * Deeper chambers feature denser corruptions and cunning environmental hazards, yielding mythic drops: *Starlight Cores (`item_starlight_core`)*, *Diamonds (`gem_diamond`)*, and ancient runic fragments.

---

## 2. Real-Time ARPG Combat Systems

### Unified Stamina-as-Life Bar
In *Rowan of Oakhaven*, the protagonist **possesses no separate red Health Points (HP) bar**.
* **Stamina is Vitality:** Swinging weapons, activating abilities, or taking hits from cave beasts and spiky hazards drains your yellow Stamina bar directly.
* **Depleted Stamina = Collapse:** When Stamina hits 0, Rowan collapses from exhaustion and is carried back to Maeve's Clinic by forest spirits or Boris.
* **Culinary Survival Synergy:** Without conventional healing potions, **hearty stews, hot oven-baked pastries, and portable tea thermoses** serve as your lifelines. Gulping Warming Firefly Tea or eating a bowl of Miner's Turnip Stew instantly tops off Stamina and provides protective defensive buffs.

```
       [ Monster Strikes / Traps ] ──┐
                                     ▼
       [ Weapon Swings / Dashes  ] ──► [ UNIFIED STAMINA GAUGE ] ◄── [ Soups, Pastries & Teas ]
                                     │
                                     ▼ (If reaches 0)
                            [ COLLAPSE & RESCUE ]
```

### Stardust Dash & Invulnerability Frames (i-Frames)
* **Input:** `Space` key (or dedicated controller dodge button).
* **Cost & Effect:** Consumes **12 Stamina** to dash 2.5 tiles, leaving behind a luminous trail of stardust.
* **i-Frames:** During the **initial 0.25 seconds** of the dash, Rowan is completely invulnerable to all damage sources (including boss shockwaves, magma bursts, and sweeping cleaves).

### Perfect Parry & Guard Break
* **Eligible Gear:** Sturdy weapons capable of blocking (Broadswords, Knight Blades, Warhammers).
* **Execution:** Raise your guard within a 0.2-second window right before an incoming enemy attack connects.
* **Reward:**
  * Completely negates incoming damage.
  * Instantly restores **+15 Stamina**.
  * Stuns the hostile attacker for 2.0 seconds, exposing their flank for guaranteed critical counter-strikes.

### Firefly Hip-Lantern & Darkness Mechanic
* Lower cavern shafts past Floor 30 are pitch-black.
* Lurking creatures shrouded in darkness move 50% faster and conceal their weak points.
* **Firefly Lantern:** Must be equipped on your belt or held as an off-hand focus to project radiant circles that expose monster vulnerabilities and reveal sinkholes.

---

## 3. The 5 Weapon Archetypes

The armory features **23 craftable weapons** divided across 5 combat archetypes and 6 mineral tiers:

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                        5 OAKHAVEN WEAPON SYSTEMS                       │
  ├──────────────────┬─────────────────┬──────────────────┬────────────────┤
  │ Archetype        │ Speed / Reach   │ Monster Counter  │ Utility Role   │
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ 🗡️ Melee Blades   │ Fast (2.2-3.8)  │ Agile vermin     │ Cleaves vines  │
  │   (Sword/Rapier) │ Reach 1.2-1.5 tl│ Parries & Blocks │ & cave shrubs  │
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ 🌾 Runic Scythes │ Med-Fast (1.4)  │ Swarms, scarabs  │ Reaps crops &  │
  │   (Reapers)      │ Semi-circle 2.5 │ Siphons Stamina  │ herbs 3-5 tiles│
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ 🔨 Warhammers    │ Slow (0.7-1.1)  │ Armored golems   │ Crushes heavy  │
  │   (Heavy Maces)  │ Quake 2.4 tiles │ Smashes chitin   │ boulders & ores│
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ 🏹 Crossbows/Bows│ Ranged (1.2-2.5)│ Flying flyers    │ Hits distant   │
  │   (Arbalests)    │ Range 5.0-8.0 tl│ Pierces targets  │ cliff switches │
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ ✨ Starlight Staves│ Casting (1.3-2) │ Shadow fiends    │ Illumination,  │
  │   (Magic Relics) │ Range 4.5-7.5 tl│ Purifies Blight  │ dispels miasma │
  └──────────────────┴─────────────────┴──────────────────┴────────────────┘
```

### Overview of the 6 Mineral Tiers

1. **Tier 1 — Oak Starter (Floors 1–20):**
   * *Wooden Training Sword (`wooden_training_sword`):* ATK 6, 2.2 strikes/s.
   * *Rusty Farm Scythe (`rusty_farm_scythe`):* ATK 8, 2.0-tile sweep.
   * *Miner's Stone Mallet (`miner_stone_mallet`):* ATK 12, crushes coal rubble.
   * *Oakhaven Hunter Bow (`hunter_shortbow`):* ATK 10, 5.0-tile range.
   * *Apprentice Oak Wand (`apprentice_wood_wand`):* ATK 9, sparks faint light.
2. **Tier 2 — Smelted Copper (Floors 21–50):**
   * *Copper Broadsword (`copper_broadsword`):* ATK 14, 360° Whirlwind Slash.
   * *Copper Spiked Mace (`copper_spiked_mace`):* ATK 22, crushes scarab shells.
3. **Tier 3 — Oakhaven Forged Steel (Floors 51–80):**
   * *Oakhaven Forged Steelblade (`iron_knight_blade`):* ATK 24, 150% parry counter.
   * *Mystic Scythe (`mystic_scythe`):* ATK 28, gathers mobs in harvest vortex.
   * *Colossal Tea Whisk Hammer (`whisk_hammer`):* ATK 38, matcha dust slows foes 50%.
   * *Clockwork Iron Crossbow (`clockwork_iron_crossbow`):* ATK 26, 3-bolt burst pierce.
   * *Firefly Storm Lantern (`spirit_lantern`):* ATK 25, defensive orbiting aura.
4. **Tier 4 — Gilded Solar & Lunar (Floors 81–110):**
   * *Sunburst Rapier (`sunburst_rapier`):* ATK 35, lightning thrusts ignite burn.
   * *Silver Moon Scythe (`silver_moon_scythe`):* ATK 42, restores 3 Stamina per kill.
   * *Golden Solar Arbalest (`golden_solar_arbalest`):* ATK 44, 8-tile radiant blind.
5. **Tier 5 — Volcanic Obsidian (Floors 111–140):**
   * *Obsidian Flame Saber (`obsidian_flame_saber`):* ATK 50, erupts magma geyser.
   * *Magma Crag Warhammer (`magma_crag_warhammer`):* ATK 62, 4-tile magma fissure.
   * *Volcanic Magma Rod (`volcanic_fire_rod`):* ATK 54, 6s defensive ring of fire.
6. **Tier 6 — Pinnacle Starlight Core (Floors 141–150 & Star Blight Dungeon):**
   * *Starlight Blade (`starlight_blade`):* ATK 68, 3.8 strikes/s, 5 homing blade shards.
   * *Astral Void Reaper (`astral_void_reaper`):* ATK 74, executes foes below 25% HP.
   * *Titan Stellar Crusher (`titan_stellar_crusher`):* ATK 92, devastating meteor leap.
   * *Starblight Void Repeater (`starblight_void_repeater`):* ATK 65, 4x4 celestial arrow barrage.
   * *Primordial Starlight Staff (`primordial_starlight_staff`):* ATK 76, screen-clearing Supernova.

---

## 4. Boris's Forge Progression

Boris's Blacksmith Forge stands on the eastern ridge of Oakhaven Town. It transforms all mined ingots and shopkeeping earnings into combat prowess.

```
       [ Tea Shop Gold Coins ] ──┐
       [ Cavern Smelted Bars ] ──┼──► [ BORIS'S FORGE ] ──► [ UNBREAKABLE REINFORCED ARSENAL ]
       [ Gems & Monster Loot ] ──┘
```

### 1. New Weapon Forging
* Reaching cavern strata milestones (Floors 20, 50, 80, 110, 140, 150) unlocks respective weapon blueprints with Boris.
* Costs: Smelted bars (`bar_copper`, `bar_iron`, `bar_gold`, `bar_silver`) + Coal + Gold fee.

### 2. Tempering & Sharpening (+1 to +5)
* Weapons can be honed across **5 temper tiers** ($+1, +2, +3, +4, +5$).
* **Stat Bonuses:** Each $+1$ tier confers **$+10\%$ Base Attack (ATK)** and **$+5\%$ Attack Speed**.
* **Dark Cozy Human-First Guarantee:**
  > [!IMPORTANT]
  > Boris's temperings **HAVE A 100% SUCCESS RATE**. Gear never breaks, never degrades, and never fails. Mastery in Oakhaven belongs to timing, parries, and learning monster patterns — not predatory gambling.

| Temper Tier | Attack Increase | Speed Increase | Materials Required |
| :--- | :--- | :--- | :--- |
| **Base (+0)** | $100\%$ ATK | Standard | Base crafted weapon |
| **Tempered (+1)** | $+10\%$ ATK | $+5\%$ Speed | 2 Same-tier Bars + 2 Coal + 300g |
| **Tempered (+2)** | $+20\%$ ATK | $+10\%$ Speed | 4 Same-tier Bars + 4 Coal + 800g |
| **Tempered (+3)** | $+30\%$ ATK | $+15\%$ Speed | 6 Same-tier Bars + 6 Coal + 1,800g |
| **Tempered (+4)** | $+40\%$ ATK | $+20\%$ Speed | 8 Same-tier Bars + 8 Coal + 3,500g |
| **Tempered (+5 Max)**| $+50\%$ ATK | $+25\%$ Speed | 10 Same-tier Bars + 1 Monster Core + 7,000g |

### 3. Runic Gem Infusion
All weapons Tier 2 and above feature **1 socketed pommel slot**. Socket raw gems mined underground to confer permanent elemental traits:

* 🔴 **Ruby:** Grants **Blazing Burn** — Ignites struck hostiles with continuous fire damage for 4 seconds.
* 🔵 **Sapphire:** Grants **Frostbite Slow** — Reduces enemy movement and attack velocity by $40\%$.
* 🟢 **Emerald:** Grants **Toxic Spores** — Spawns cloud of venomous spores upon critical hits.
* 💎 **Diamond:** Grants **Critical Edge** — Grants a permanent **$+20\%$ Critical Strike Chance (2x damage)**.
* 🟣 **Amethyst:** Grants **Stamina Siphon** — Reduces **Stamina cost per swing by $25\%$**.
* 🟡 **Topaz:** Grants **Impact Surge** — Boosts **Knockback by $+35\%$** to interrupt enemy charges.

### 4. Scrap Salvage
When upgrading to advanced tiers, obsolete weapons can be melted down in Boris's crucible:
* Refunds **$60\%$ of all smelted metal bars** used in the original build.
* Unseats and **returns 100% of socketed gems unharmed**.

---

## 5. Cavern Stakes & Defeat Mechanics

Preserving the **Dark Cozy Pixel Art** philosophy — tense underground stakes balanced with cozy reassurance:

1. **Lockdown Chambers:**
   * Stepping into special rooms causes portcullises to slam shut.
   * Clear the enemy waves $\rightarrow$ Portcullises lift and a reward chest emerges in the center.
2. **Grandmother Amalia's Shrines:**
   * Found every 10 floors or amidst dungeon forks.
   * Select 1 of 3 run blessings (e.g., *+15% movement speed, +5 Stamina on breaking rocks, spike trap immunity*).
3. **Upon Cavern Collapse (Defeat Rules):**
   * **No Permadeath:** Your character and save state are permanent.
   * **100% Retained:** All equipped weapons, wallet gold, unlocked blueprints, and surface chest contents stay completely untouched.
   * **Fractional Drop:** Only $\approx 30\%$ of unbanked raw ores and wild herbs gathered on that specific descent drop in the caves (Boris or Maeve frequently recover a portion for you at the Town Lost & Found).

---

👉 Related Database Entries:
* [Weapons & Equipment Directory](/en/database/weapons)
* [Monsters & Bosses Dossiers](/en/database/monsters)
* [Minerals & Gems Compendium](/en/wiki/minerals-guide)
* [Culinary Recipes & Buff Guide](/en/wiki/cooking-recipes-guide)
