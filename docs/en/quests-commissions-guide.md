# 📜 Help Wanted & Bounty Commission Guide

The **Help Wanted & Commission System** in *Rowan of Oakhaven* anchors the game's core progression loop, tying together **Village Social Bonds**, **150-Floor Subterranean Delving**, and the culinary economy of **The Hearth Eatery & Tavern**.

---

## 1. The 3 Commission Noticeboards

```mermaid
flowchart TD
    Player["🧑 Rowan (Player)"]
    
    subgraph S1["1. Town Square Noticeboard"]
        Board1["📋 Town Help Wanted Board<br/>Maeve, Clara, Sylvan, Cedric, Linnea"]
    end

    subgraph S2["2. Delvers' Lodge Outpost"]
        Board2["⚔️ Delvers' Bounty Board<br/>Knight Marlo & Mine Foreman Bram"]
    end

    subgraph S3["3. The Hearth Eatery & Tavern"]
        Board3["🍲 Weekly Hearth Catering Orders<br/>Garrick, Thorne, Valerie, Festivals"]
    end

    Player -->|Every Dawn at 06:00| Board1
    Player -->|Prior to Mine Descent| Board2
    Player -->|Every Monday Morning| Board3

    Board1 -->|Fulfill| R1["❤️ +100 NPC Friendship Points<br/>💰 Modest Living Gold<br/>🌟 Town Renown"]
    Board2 -->|Fulfill| R2["🏅 Delver's Crest Insignias<br/>💰 Lucrative Combat Bounties<br/>⚔️ Delver Guild Ranking"]
    Board3 -->|Fulfill| R3["💰 Massive Gold (1k - 4k)<br/>📜 Ancestral Secret Recipes<br/>🛋️ Tavern Furniture Blueprints"]
```

---

## 2. Noticeboard Breakdown

### A. Town Help Wanted Board
* **Location:** Town Square, flanked by Maeve's Town Hall and Pip's Mailbox Post.
* **Refresh Schedule:** Dawn 06:00 daily (1 – 2 new postings generated).
* **Expiration:** **2 Days** from bulletin posting.
* **Core Function:** Grants **+100 Friendship Points** per completed quest, bypassing weekly gift limits (1/day, 2/week) and accelerating the 8-Heart milestone (3,200 points).

| Category | Typical Requester | Example Objective | Rewards |
| :--- | :--- | :--- | :--- |
| **Seasonal Produce** | Maeve, Linnea | 3 Spring Carrots, 5 Wild Berries | 100 - 150g, **+100 Heart Pts** |
| **Comfort Dishes** | Sylvan, Lyra | 1 Piping-hot Herbal Chicken Stew | 200 - 300g, **+100 Heart Pts** |
| **Lost & Found** | Clara, Penny, Finn | Lost sketchbook, reading glasses, wooden top | 150 - 200g, **+100 Heart Pts** |
| **Civic Repairs** | Cedric, Elora | 25 Oak Timber, 10 River Cobblestones | 250 - 350g, **+100 Heart Pts** |

---

### B. Delvers' Lodge Bounty Board
* **Location:** Outpost station preceding the 150-Floor Mine Elevator, overseen by Knight Marlo and Bram.
* **Refresh Schedule:** Dawn 06:00 daily (up to 3 active contracts concurrently).
* **Expiration:** **3 Days** (or indefinite until target Boss/Monster is felled).
* **Unique Currency:** **Delver's Crests (`item_delver_crest`)**.

| Contract Type | Target Objectives | Typical Rewards |
| :--- | :--- | :--- |
| **⚔️ Beast Culling** | Slay 15 Crag Spiders (Fl. 20-39) or 10 Magma Imps (Fl. 60-79) | 400 - 600g, **3 - 5 Crests** |
| **⛏️ Ore Extraction** | Mine 20 Lump Coal or 15 Deep Iron Ore for hoist boilers | 300 - 500g, **2 - 4 Crests**, +100 Pts Bram/Boris |
| **🌿 Subterranean Herbs** | Harvest 5 Luminous Cave Fungi for Sylvan's antidotes | 400 - 500g, **4 Crests**, +100 Pts Sylvan |
| **👑 Stratum Warden** | Defeat Floor 40 Blighted Treant or Floor 80 Scarab Warden | 1,200 - 2,500g, **10 - 20 Crests** |

> [!TIP]
> **What Are Delver's Crests For?**
> Trade with Knight Marlo at the lodge desk to obtain:
> 1. *Delver's Sigil Ring (+15% Attack Speed, +10% Poison Resistance).*
> 2. *Elevator Steam Oil (unlocks express drop cages straight to Floor 50 / 100).*
> 3. *Precision Whetstones to raise weapon Critical Rate at Boris's Forge.*

---

### C. Weekly Hearth Catering & Frontier Bento Orders
* **Location:** Loft R&D drafting desk and Bento Packaging Bench inside The Hearth Eatery & Tavern.
* **Refresh Schedule:** Monday dawn at 06:00 (Deadline: Sunday 23:00).
* **Duration:** **7 Days**.
* **Distinction:** High-volume catering contracts requiring 2-Star to 3-Star dishes or rugged Expedition Bento sets.

| Sample Order | Client | Objectives | Exclusive Rewards |
| :--- | :--- | :--- | :--- |
| **Fleet Banquet** | Captain Garrick | 8 Servings 3-Star Saffron Seafood Paella | 2,400g, +150 Pts, **Garrick's Spiced Rum Recipe** |
| **Mine Rescue Rations** | Captain Thorne & Valerie | 15 Tin Canisters of Dense Rye & Smoked Bacon | 3,200g, +150 Pts, **Insulated Pack Blueprint** |
| **Chilled Delver Supply** | Diver Vael | 5 Tin Canisters of Piping-hot Ginger Squash Soup | 1,100g, +120 Pts, **5x Subterranean Glacial Fish Scales** |
| **Autumn Pie Gala** | Oakhaven Villagers | 20 Golden Cinnamon Pumpkin Pies | 3,500g, +200 Village Pts, **Gilded Display Counter** |

---

## 3. Expedition Bento Packaging & The Freshness Bonus System

### A. Bento Box Tiers
To safely transport prepared meals into deep mine shafts or distant frontier checkpoints without crushing or quality loss:
* **Tier 1 - Rough Pine Box:** Crafted with *4 Softwood + 1 Braided Twine*. Holds rice balls, dried hardtack, steamed greens. Retains freshness for 2 days.
* **Tier 2 - Rustproof Tin Canister:** Crafted with *2 Tin Ingots + 1 Wax Seal*. Holds thick stews, pot roasts, pan-seared fish. Shock-resistant against mine hazards, retains heat for 3 days.
* **Tier 3 - Lacquered Thermal Tiffin:** Crafted with *1 Tin Canister + 2 Sheep Wool + 1 Tung Oil*. Holds a complete 3-course banquet for aristocrats (such as Valen de Montfort) or deep-delve expeditions. Retains pristine warmth for 5 days.

### B. The Freshness Bonus (Absolute Zero Food Spoilage)
* **Grounded Post-War Principle:** The game **never implements food rot or spoilage into worthless trash**. In a post-war frontier where every grain counts, throwing away cooked meals is unthinkable.
* **Piping-Hot / Fresh Status (Within 24 Hours of Cooking):**
  * Tavern Service: Patrons praise the hot meal, tipping **+20% bonus gold** and slightly boosting Tavern Cozy Rating.
  * Noticeboard Turn-in: Townsfolk include complimentary foraging extras (spare wild onions, foraging berries, mineral salt pinches).
  * Mine Delving: Grants an instantaneous micro-buff (+5% Movement Speed or +10 Stamina restore).
* **Standard Status (After 24 Hours or Overnight):**
  * Meals cool into standard, hearty rations. **Automatically stacks up to x99** in a single inventory slot (zero inventory bloat).
  * Retains 100% of core combat buffs (ATK, DEF, Speed, Resistances) and sells for full base catalog price.
* **Preserved Provisions:** Smoked ham, cellar-aged cheese, sun-dried marsh eels, scorched hazelnut cookies — dry foods that never cool or lose quality, designed specifically for long 150-floor delve prep.

---

## 4. Turn-In Options

Players have two delivery options:

1. **Direct In-Person Hand-In:**
   * Track NPC using the Schedule Matrix.
   * Speak to them and select *"Deliver Commission Items"*.
   * Triggers unique grateful dialogue + **Grants 100% of Friendship Points (+100 Pts)**.
2. **Deposit Drop-Box:**
   * When arriving after curfew or when the NPC is locked in work shifts, deposit items into the board's secure drop-box.
   * Gold and crests are mailed the following dawn; friendship gain is reduced to $+50$ due to lack of face-to-face rapport.

---

## 5. Smart Progression Guard

* **Contextual Gating:** Bulletins never demand resources or monsters beyond the player's current unlocked cavern stratum or tool tier (e.g., iron ore contracts will never appear before Floor 40 is reached).
* **Penalty-Free Expiration:** Missed or expired commissions vanish harmlessly without deducting gold, points, or reputation.
