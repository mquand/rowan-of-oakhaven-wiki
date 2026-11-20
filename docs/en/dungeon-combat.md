---
title: "The Infinite Mine-Dungeon, Combat Systems & Boris's Forge"
status: stable
audience: public
updated: 2026-11-20
tags: [dungeon, combat, monsters, weapons, mining, forge, boris]
spoiler: false
---

# ⚔️ The Infinite Mine-Dungeon, Combat Systems & Boris's Forge

The subterranean depths of Oakhaven constitute the game's **core action and survival pillar**, combining **curiosity-driven mining exploration (Stardew Valley)** with **fast-paced room-clearing combat (Soul Knight)**. All the gold coins amassed from farming and running **The Hearth Eatery & Tavern** converge toward one paramount purpose: investing in combat equipment at Boris's Forge, tempering weapons, and delving deep into the 150-floor ancient mines to cleanse the valley of its wartime curse.

---

## 1. Unified Subterranean Architecture (The Infinite Mine-Dungeon)

> **CORE PRINCIPLE:** The Mines and the Dungeon are **MERGED INTO A SINGLE UNIFIED SYSTEM** titled **The Infinite Mine-Dungeon**. This is a pure battleground of survival.

```
               ┌────────────────────────────────────────────────────────┐
               │                     OAKHAVEN TOWN                      │
               │  (Farmstead • The Hearth Eatery • Forge • Clinic)      │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                               Oakhaven Mine Entrance
                                          ▼
               ┌────────────────────────────────────────────────────────┐
               │         THE INFINITE MINE-DUNGEON (150 FLOORS)         │
               ├────────────────────────────────────────────────────────┤
               │ • FLOORS 1–150 (STORY CAMPAIGN ACROSS 4 STRATA)        │
               │   - Stratum 1 (1–30): Peat Bog & Copper Drift (Boss 30) │
               │   - Stratum 2 (31–70): Ancient Forge Khaz-Drakor (Boss) │
               │   - Stratum 3 (71–110): Deeproot Caverns (Boss 110)    │
               │   - Stratum 4 (111–150): Sunken Vaults (Boss 150)      │
               │ • FLOORS 151+ (ENDLESS ABYSS HARDCORE DELVING)         │
               │ • Mechanical elevator checkpoints saved every 5 floors │
               │ • Mine Entrance: Choose 1 of 3 Daily Expedition Boons  │
               │ • 5-Floor Milestones: Accumulate & Swap Boons (Max 4)  │
               └────────────────────────────────────────────────────────┘
```

---

## 2. Soul Knight Room Flow & Stardew Curiosity Mining

### 2.1. The Single Chamber Flow
Each floor consists of **3 to 5 interconnected stone chambers** displayed on an automated mini-map:

1. **Room Lockdown:** Stepping into an active chamber causes stone portcullises to slam shut. Sconce lanterns turn **RED**. Monsters attack across 2 waves.
2. **Fast-Paced Combat:**
   * Players equip **2 Weapon Slots** swapped instantly with `Q` (e.g., Melee Blade + Ranged Crossbow, or Warhammer + Wand).
   * **Ward Shield Gauge:** Absorbs the first 30–50 damage; regenerates to full after 3 seconds without taking damage, protecting your core Stamina/HP bar.
3. **Room Cleared!:** Lanterns switch to **GREEN**, doors unseal, and an **Ore/Loot Chest** emerges from the floor.
4. **Stardew Mining Phase:** The cleared chamber is 100% safe. Players comfortably swing their pickaxe to break boulders, gather coal, and uncover hidden ore nodes.

### 2.2. Curiosity-Driven Rock Breaking & Dual-Trigger Exit
* **Breaking standard rocks yields:**
  * $60\%$: Stone rubble (building material for farmstead renovations).
  * $20\%$: Coal (fuel for hearths and metal smelting).
  * $12\%$: Stratum-appropriate ore (Copper, Iron, Gold, Mithril).
  * $5\%$: **Geodes** (brought to Boris to crack for gems and artifacts).
  * $3\%$: Uncovering the **Stone Ladder** leading to the next floor.
* **Dual-Trigger Floor Progression:**
  * *Mining Branch:* Ladder spawn rate scales dynamically: $3\% + (\text{Luck} \times 1\%) + (1 / \text{Remaining Rocks})$ $\rightarrow$ Zero soft-locks.
  * *Combat Branch:* Slaying the final enemy on the floor guarantees **100% a stone ladder spawns directly beneath its defeat location**!

---

## 3. Expedition Boon System (Soul Knight Style)

* **At the Mine Entrance (Floor 1):** Grandmother Amalia's Altar presents **3 randomized Daily Boons** $\rightarrow$ Pick 1 starting boon (locked for the day).
* **Every 5 Floors (Floor 5, 10, 15, 20...):**
  * Elevator checkpoints activate the Altar.
  * Pick from **3 new randomized Boons** to fill up to **4 Boon Slots**.
  * Once full, players can **SWAP** an older boon for a new one to optimize for the next stratum (e.g., swapping Mud Resistance for Lava Resistance).
* **Natural Reset:** All boons are temporary. Sleeping in bed at The Hearth clears boons for a fresh, exciting run tomorrow.

---

## 4. Survival Mechanics: Escape Rope, Mimics, Chutes & Curfew

1. **Chest RNG & The Mimic Ambush (75% Real / 25% Mimic):**
   * Standard dungeon chests have a $25\%$ chance to be a **Hermit Crab Mimic**! Attentive players can notice the lid breathing slightly before opening. Slaying a Mimic yields prized **King Crab Meat**. Milestone chests at floors 10, 20, 40, etc., are **100% genuine**.
2. **Escape Rope:** Crafted from 10 Wild Fiber or bought from Bram (150g). Standing still for 3 seconds whisks Rowan straight to the surface, **preserving 100% of ores and items in your bag**.
3. **Ventilation Chutes:** Breaking rocks has a $1\%$ chance to collapse a chute, dropping you **3–8 floors instantly** at the cost of 15–30 HP.
4. **02:00 AM Curfew:** Passing out inside the mine at 02:00 results in Colm wheeling you to the clinic, losing 10% gold in emergency fees and waking up at 08:00 AM.
5. **Defeat (HP = 0):** All ores and raw monster loot gathered during that specific dive are **lost permanently** (equipped weapons and tools remain safe).

---

## 5. The 4 Strata & 4 Warden Bosses

* **Floor 30 — The Steam Colossus (`the_steam_colossus`):** Rusted wartime trench colossus; slams the floor to cause cave-ins. Vulnerable at its rear steam exhaust after slamming. Drops **Giant Gear** (kitchen upgrades) and **Kiln Salt** (120h thermal bento cooking).
* **Floor 70 — The Slag Fire Dragon (`the_slag_fire_dragon`):** Massive fire reptile lurking beneath slag pits; scales glow orange-red before breathing 3 fireballs. Drops **Dragon Tail Meat** (x2 attack power stew) and **Dragon Tallow** (unlocks 7-day high-radius lanterns).
* **Floor 110 — The Blighted Hangman Oak (`the_blighted_hangman_oak`):** Ancient subterranean root rooted into old war graves; lashes roots and emits disorienting spores. Drops **Runic Sacred Wood** and **Ancient Golden Acorns**.
* **Floor 150 — Ancient Vault Warden (`ancient_vault_warden`):** Cold, calculating ancient commander in 3 brutal phases. Drops **Ancient Heart Shard**, cleansing the valley and unlocking the **Endless Abyss (Floor 151+)**.

---

## 6. Boris's Forge & 4 Geode Tiers

### 1. Weapon Tempering (+1 to +5)
* Weapons can be tempered up to $+5$, granting $+10\%$ ATK and $+5\%$ swing speed per rank with a **guaranteed 100% success rate**.

### 2. Permanent Runic Gem Infusion
* Weapons from Tier 2 onward feature 1 gem socket. **Infusion is permanent**:
  * 🔴 **Ruby:** Burns targets for 4 seconds.
  * 🔵 **Sapphire:** Slows target movement and attack speed by 40%.
  * 🟢 **Emerald:** Releases poison spore clouds on impact.
  * 💎 **Diamond:** Grants $+20\%$ Critical Strike chance.

### 3. Geode Cracking (25g fee at Boris):
* **Regular Geode (Stratum 1):** Quartz, Copper Ore, Salt Crystals, Ancient Arrowhead.
* **Magma & Frost Geode (Stratum 2):** Ruby, Iron Ore, Ancient Fossils, Lava Pepper.
* **Crystal Geode (Stratum 3):** Sapphire, Emerald, Rare Spices, Veteran Crest.
* **Abyssal Geode (Stratum 4):** Diamond, Prismatic Shard, Mithril, Ancient Deep Seeds.

---

## 7. Practical Miner's Culinary Buffs (The Hearth)

```
[ DELVING DIET RULES ]
• Max 2 active buffs: 1 Main Dish (Stew/Bento) + 1 Beverage (Tea/Juice)
• Duration: 8 real-time minutes or 5 complete mine floors
• Consuming a new dish in the same category overwrites the previous buff
```

* 🍀 **Mining Luck (+2 Luck):** *Salt-Grilled Mimic Crab Claw* $\rightarrow$ Massive boost to rare ore and geode drops.
* ⛏️ **Pickaxe Speed (+25% Mining Speed):** *Garlic Butter Walking Mushroom Stew* $\rightarrow$ Cuts rock-breaking time in half.
* 👟 **Movement Speed (+20% Move Speed):** *Cliffside Peppermint Tea* $\rightarrow$ Run fast to dodge telegraphed strikes and dart across spike traps.
* ⚔️ **Attack Power (+20 ATK):** *Crispy Fried Cockatrice Breast* $\rightarrow$ Fells subterranean beasts in fewer hits.
* 🛡️ **Defense (+30 DEF):** *Smoked Deep-Beast Ribs Bento* $\rightarrow$ Reduces ambush damage.
* 🔥 **Lava Resistance (+60% Lava Resist):** *Hot-Rock Roasted Scythe-Scorpion Tail*.
* 🩸 **Emergency Recovery (+100% HP & Stamina):** *Screaming Mandrake Chicken Broth*.
* 👑 **Apex Feast (ATK x2, Speed +15%, Luck +3):** *Royal Dragon Tail Hotpot*.

---

## 8. Delvers' Hunt Ledger (Marlo & Bram's Bounties)
*(Balanced targets of 30–50 kills at the Mine Entrance Bounty Board)*

1. **Walking Fungi & Flora:** Slay 40 $\rightarrow$ `Antidote Amulet` (Reduces poison duration by 70%).
2. **Mimics & Shell Crabs:** Slay 30 $\rightarrow$ `Golden Pry-Hammer` (+25% damage against armored shells).
3. **Carrion Avians & Cockatrices:** Slay 50 $\rightarrow$ `Glow-Mining Goggles` (+20% vision radius in dark floors).
4. **Scorpions & Arthropods:** Slay 35 $\rightarrow$ `Heavy Leather Gauntlets` (Immunity to slag burns).
5. **Burrowers & Trench Hounds:** Slay 30 $\rightarrow$ `Spiked Miner Boots` (Immunity to slip and knockbacks).
6. **Revenants & Living Armor:** Slay 45 $\rightarrow$ `Ward Siphon Ring` (Restores $+4$ Ward on monster kill).
7. **Slay all 4 Warden Bosses:** `Boris's Master Contract` (Permanent 30% discount on forge tempering).
