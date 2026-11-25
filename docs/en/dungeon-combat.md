---
title: "The Infinite Mine-Dungeon, Action RPG Combat & Boris's Forge"
status: stable
audience: public
updated: 2026-11-25
tags: [dungeon, combat, monsters, weapons, mining, forge, boris, wardens, endless_abyss]
spoiler: false
---

# ⚔️ The Infinite Mine-Dungeon, Action RPG Combat & Boris's Forge

The subterranean frontier beneath Oakhaven is the game's **core action and survival pillar**. The Mines and Dungeon are **MERGED INTO ONE UNIFIED SYSTEM** called **The Infinite Mine-Dungeon**, spanning a 150-floor campaign across 4 geological strata followed by the **Endless Abyss (Floors 151+)**.

Every ore vein excavated and every monster part harvested serves one ultimate loop: forging combat equipment at **Boris's Forge**, powering farm automation, and fueling surface homestead restoration (**100% Non-Food Drops**).

---

## 1. Unified Subterranean Structure: 4 Strata, 16 Sub-Biomes & Endless Abyss

```
                ┌────────────────────────────────────────────────────────┐
                │                     OAKHAVEN TOWN                      │
                │  (92-Species Farm • The Hearth Kitchen • Forge • Clinic)│
                └──────────────────────────┬─────────────────────────────┘
                                           │
                          10-Floor Rescue Elevators / Mine Gate
                                           ▼
                ┌────────────────────────────────────────────────────────┐
                │         THE INFINITE MINE-DUNGEON (150 + ENDLESS)      │
                ├────────────────────────────────────────────────────────┤
                │ • STRATUM 1 (Fl. 1–30): Peat Bog & Old Copper Mine     │
                │   (Flooded Drift 1-10 • Trenches 11-20 • HQ Vault 21-29│
                │   ► Boss Fl. 30: The Steam Colossus                    │
                ├────────────────────────────────────────────────────────┤
                │ • STRATUM 2 (Fl. 31–70): Ancient Forge Khaz-Drakor     │
                │   (Magma 31-40 • Magnetic 41-50 • Foundry 51-60 • 61-69│
                │   ► Boss Fl. 70: The Magma Forge Dragon                │
                ├────────────────────────────────────────────────────────┤
                │ • STRATUM 3 (Fl. 71–110): Deeproot & Glow-Mushroom Cave│
                │   (Glow-Shrooms 71-80 • Roots 81-90 • Barrows 91-100)  │
                │   ► Boss Fl. 110: The Hanged Root God                  │
                ├────────────────────────────────────────────────────────┤
                │ • STRATUM 4 (Fl. 111–150): Sunken Relics & Solaria     │
                │   (Outer City 111-120 • Archives 121-130 • Rifts 131+) │
                │   ► Boss Fl. 150: The Sealed Warden of Khaz-Drakor     │
                ├────────────────────────────────────────────────────────┤
                │ • ENDLESS ABYSS (Fl. 151+): Infinite Chaos Realms      │
                │   (Floating Islands • Energy Bridges • Zero Gravity)   │
                │   ► Apex Foes: Amorphous Slime King & Void Rift Worm   │
                └────────────────────────────────────────────────────────┘
```

- **16 Sub-Biomes:** Each stratum divides into 4 distinct sub-biomes (~10 floors each) with unique tile palettes, environmental hazards, and landmark props.
- **Mechanical Rescue Elevators:** Automatically save checkpoints every **10 floors (10, 20, 30, ..., 150)** so Rowan can return to run The Hearth at night and resume delving the next morning.
- **Pre-Boss Campfire Sanctuaries:** Guaranteed safe rest chambers ahead of Floors 30, 70, 110, and 150 featuring campfires and ore deposit lockers.

---

## 2. Real-Time Action RPG Combat & Survival Rules

### 2.1. Dual Survival Bars (`100 HP / 270 Stamina`)
1. **Health Bar (Base HP: 100):** Drained by monster attacks and traps. Dropping to **0 HP triggers immediate defeat**. Restored through packed dishes from *The Hearth* (`+30..180 HP` subject to 6s Digestion Satiety) or Aurelia's emergency Field Salve.
2. **Stamina Bar (Base Stamina: 270):** Spent on heavy weapon swings, tool mining, and dashing. Dropping to **0 triggers Exhausted** (`-50%` movement speed, cannot Dash).

### 2.2. Dodge Dash (`i-Frames`) & Perfect Parry
- **Dash (`Space`):** Lunges `2.5 tiles` (`15 Stamina`) with **0.25s invincibility frames (i-Frames)** to pass cleanly through lasers, magma waves, and Boss slams.
- **Perfect Parry:** Blocking with melee swords/warhammers within a **0.2s parry window** negates 100% incoming damage, stuns the attacker for **1.5–2.0s**, and recovers **+20 Stamina**.

### 2.3. Spirit Lantern Illumination
- Deep caverns hide lurking threats in pitch blackness; **Shadow/Banshee entities** can only be revealed and damaged inside the beam of Rowan's **Spirit Lantern**.

### 2.4. Permanent Loss on Defeat & Guild Lost & Found
- Falling at `0 HP` underground prompts **Colm** and Guild rangers to haul Rowan back to **Aurelia's Infirmary** (`10%` gold medical fee capped at `1,000g`).
- **Permanent Loot Loss:** All raw ores, cut gems, and monster materials gathered during that expedition are **dropped and lost permanently** (`no free full-bag rescue`). Pack **Escape Ropes** to extract safely before collapsing.
- **Gear Safeguard (Lost & Found):** Weapons, armor, and farm tools are never erased; Guildmaster **Thorne** & **Valerie** hold them at the **Lost & Found Counter**, redeemable via Gold or **Delver Crests** earned from Bento commissions.

---

## 3. Evolving Slime Ecology (5 Tiers)

1. **Stratum 1 — Acid Mud Slime (`slime_mud_acid`):** Leaves slippery mud trails, swells for 0.8s before splashing cross-shaped acid, splits into 2 slimes on death. Counter: Scythe AoE sweep (`+30% DMG`).
2. **Stratum 2 — Molten Magma Slime (`slime_magma_molten`):** Leaves 4s burning cinders, fires 3 magma bolts, explodes in a 3x3 blast on death. Counter: **Frost Shard** weapons (`+35% DMG`).
3. **Stratum 3 — Toxic Violet Spore Slime (`slime_spore_violet`):** Emits poison mist clouds; death leaves exploding fungal traps after 2s. Counter: **Pyre Ember** or Fire Bombs (`+30% DMG`).
4. **Stratum 4 — Void Crystal Slime (`slime_void_crystal`):** Refracts magic and crossbow bolts, firing straight purple laser beams after 0.6s. Counter: Warhammer shatter (`+40% DMG`).
5. **Endless 151+ — Amorphous Slime King (`slime_amorphous_king`):** 3x3 colossus cycling all 4 elemental forms with 2s core color telegraphs.

---

## 4. Monster Roster (`100% Non-Food Drops`)

> **LOCKED RULE:** Monsters drop **zero food ingredients**. All cooking ingredients come from surface farming/ranching/fishing. Dungeon drops split cleanly into **Combat Ore/Gear (`40%`)**, **Exploration Utilities (`30%`)**, and **Farm Automation/Fertilizer (`30%`)**.

### 4.1. Stratum 1: Peat Bog & Old Copper Mine (Fl. 1–30 | `50–120 HP / 8–18 ATK`)
- **Acid Mud Slime (`slime_mud_acid`)**, **Copper Carapace Beetle (`beast_copper_beetle`)**, **Blind Echo Bat (`beast_blind_bat`)**, **Skeleton Pick-Miner (`skel_miner_pick`)**, **Trench-Digging Mole (`beast_trench_mole`)**, **Bog Trench Walker (`undead_trench_walker`)**, **Rusted Iron Training Dummy (`armor_scrap_dummy`)**.

### 4.2. Stratum 2: Ancient Forge Khaz-Drakor (Fl. 31–70 | `110–190 HP / 18–34 ATK`)
- **Molten Magma Slime (`slime_magma_molten`)**, **Magnet Shell Snail (`beast_magnet_snail`)**, **Lava Thread Spider (`beast_magma_weaver`)**, **Ironclad Skeleton Shieldbearer (`skel_iron_legion`)**, **Ancient Boiler Sentry (`armor_boiler_sentry`)**, **Charred Pyre Runner (`undead_charred_pyre`)**, **Iron Mimic Chest (`mimic_iron_chest`)**.

### 4.3. Stratum 3: Deeproot & Glow-Mushroom Caverns (Fl. 71–110 | `150–240 HP / 24–34 ATK`)
- **Toxic Violet Spore Slime (`slime_spore_violet`)**, **Brier Carnivore Creeper (`plant_brier_creeper`)**, **Luminescent Night Moth (`beast_luminous_moth`)**, **Brier Skeleton Sniper (`skel_brier_sniper`)**, **Deep Cavern Banshee (`undead_deep_banshee`)**, **Centipede Bone Cavalry (`skel_centipede_cavalry`)**, **Gold Crystal Beetle (`beast_gold_carapace`)**.

### 4.4. Stratum 4: Sunken Relics & Solaria Ruins (Fl. 111–150 | `240–420 HP / 36–52 ATK`)
- **Void Crystal Slime (`slime_void_crystal`)**, **Ancient Backfire Grimoire (`relic_flying_grimoire`)**, **Petrifying Quartz Gargoyle (`beast_quartz_gargoyle`)**, **Void Bone Necromancer (`skel_void_necromancer`)**, **Hollow Royal Armor (`armor_hollow_champion`)**, **Void Death Cavalier (`undead_death_knight`)**, **Gilded Royal Mimic (`mimic_golden_royalty`)**, **Void Mirror Rowan (`abyssal_mirror_phantom`)**.

### 4.5. Endless Abyss (Fl. 151+ | Elite Affixes)
- **Amorphous Slime King (`slime_amorphous_king` — `22,000 HP / 85 ATK`)**, **Void Rift Worm (`beast_void_rift_worm` — `19,000 HP / 92 ATK`)**, plus randomized Elite Affixes (*Thorns, Blink, Crystal Barrier, Mirror Image*).

---

## 5. Four Warden Bosses & Khaz-Drakor – Solaria Lore

> **LOCKED LORE:** During the ancient war to contain the Void Rift, the Dwarven Smiths of **Khaz-Drakor (Stratum 2)** forged the Great Seal alongside the mages of **Solaria (Stratum 4)**. Khaz-Drakor's greatest Marshal fused his body with the Seal Core beneath Solaria's shattered hall, standing eternal vigil before the Endless Abyss.

- **Floor 30 — The Steam Colossus (`the_steam_colossus` — `1,600 HP / 24 ATK`):** Industrial war-golem with sawblade and hydraulic hammer; exposes rear steam exhaust for 2.5s (`x2.5 DMG`). *Drops: Khaz-Drakor Giant Gear, Thermal Alloy Plate, 15x Pure Copper Ore.*
- **Floor 70 — The Magma Forge Dragon (`the_magma_forge_dragon` — `4,200 HP / 38 ATK`):** Basalt-plated wyrm circling molten ore pits across 5 stone platforms; scales crack below 30% HP. *Drops: Basalt Dragon Scale, Fossil Fire-Tallow, Ruby, Iron Ore.*
- **Floor 110 — The Hanged Root God (`the_blighted_hangman_oak` — `8,000 HP / 52 ATK`):** Subterranean elder tree entangling warrior graves; spore clouds tighten vision to 3 tiles; exposes Runic Heartwood core below 35% HP. *Drops: Runic Sacred Heartwood, Ancient Golden Acorn, Emerald, Gold Ore.*
- **Floor 150 — The Sealed Warden (`ancient_vault_warden` — `15,000 HP / 72 ATK`):** 3-Phase Marshal duel featuring wide Parryable sweeps, gravity vortex pillars, and Void clone splits below 30% HP (track true body via marble shadows & purple floor cracks). *Drops: Khaz-Drakor Rune Heart (unlocks Endless Abyss 151+), Solaria Void Blueprints, Pure Void Ore, Diamond.*

---

## 6. Boris's Forge, 6-Tier Gear & Permanent Soul Essences

1. **Weapon Forging (6 Ore Tiers / 23 Weapons):** Progressing through *Oak & Stone $\rightarrow$ Red Copper $\rightarrow$ Oakhaven Iron $\rightarrow$ Gold & Gems $\rightarrow$ Mithril & Basalt $\rightarrow$ Void & Solaria Relics*.
2. **Weapon Tempering (`+1` to `+5`) — 100% Success Rate:** No failed upgrades or broken gear. Each rank adds **`+10% ATK`** and **`+5% Attack Speed`** (`+50% ATK / +25% Speed` at `+5`).
3. **6 Armor Defense Tiers (`Flat DEF`):** Calibrated to keep **Base HP = 100** viable through Floor 150: Tier 1 (`-4 DEF`), Tier 2 (`-10 DEF`), Tier 3 (`-18 DEF`), Tier 4 (`-26 DEF`), Tier 5 (`-36 DEF`), Tier 6 (`-46 DEF`). Combined with Buffs (`+3..+4 DEF / +25..30 Temp Max HP`), Rowan withstands 3–4 direct hits from Floor 150's Warden (`72 ATK`).
4. **5 Permanent Soul Essences (`One-Way Infusion`):** Once socketed into a weapon or armor piece, a Soul Essence **cannot be removed**:
   - 🔥 **Pyre Ember:** 5s burn DoT / Lava resistance.
   - ❄️ **Frost Shard:** `-35%` enemy move speed / Slip immunity on mud & ice.
   - ⚡ **Volt Spark:** 20% chain lightning across 3 nearby foes.
   - 🩸 **Vampiric Leech:** Heals `3%` of critical hit damage as HP.
   - 🛡️ **Aegis Core:** Blocks the first hit taken upon entering each new chamber.
5. **4 Geode Tiers (`25g` cracking at Boris):** Regular (Fl. 1–30), Magma & Frost (Fl. 31–70), Crystal (Fl. 71–110), Abyssal (Fl. 111–150+ for Diamond & Prismatic Shard).

---

## 7. Combat Buff & Core Loop Integration

- **5 Active Buff Slots (`No Stat Stacking` — Max Value Wins):** Player-cooked dishes from **The Hearth** cap at **Max 3 Buffs** (`48 dishes: 0–2 buffs`, `7 pinnacle dishes: 3 buffs`) and **Digestion Satiety (`6s`)** halves consecutive HP heals to block x99 face-tanking.
- **NPC Endgame 5-Buff Specialists:** Only **Valen** (8H), **Thorne & Valerius** (Delver Badges), and **Fern** (Region 3) supply rare weekly **5-Buff** consumables alongside Aurelia's combat salves and Morrigan's Thornblood Brew.
