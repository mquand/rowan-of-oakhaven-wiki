---
title: "The Oakhaven Inn & Lodging Management Guide"
status: published
audience: public
updated: 2026-11-26
tags: [inn, lodging, tavern, hospitality, economy]
spoiler: false
---

# 🛌 The Oakhaven Inn & Lodging Management Guide

Inside The Hearth Eatery & Tavern, the ground floor hums with crackling kitchen fires and hearty platters, while the **Second-Story Loft** serves as a tranquil sanctuary for bone-weary delvers, far-traveled merchants, and mysterious strangers seeking refuge from midnight blizzards.

---

## 1. Daily Lodging Loop

```mermaid
flowchart LR
    A["18:00 – 21:00<br/>Check-in & Dinner"] --> B["21:00 – 06:00<br/>Overnight Rest & Passive Revenue"]
    B --> C["06:30 – 08:30<br/>Hot Breakfast Service"]
    C --> D["09:00 – 11:00<br/>Checkout, Tips & Housekeeping"]
    D --> A
```

1. **18:00 – 21:00 (Check-in & Dinner):** Travelers check in at the reception counter, order dinner platters, and retire upstairs.
2. **21:00 – 06:00 (Overnight Rest):** Room rental tariffs accumulate automatically into the morning ledger.
3. **06:30 – 08:30 (Morning Breakfast Rush):** Lodgers awaken as the morning chime rings, requesting hot breakfast orders before departure.
4. **09:00 (Checkout & Tips):** Guests settle accounts, leaving bonus coin gratuities and rare curios if satisfied (5 Stars).
5. **09:00 – 11:00 (Housekeeping):** Tidy rumpled bedrolls, restock hearth firewood, and prepare rooms for the next evening.

---

## 2. The 3 Room Tiers & Renovations

| Room Tier | Capacity | Typical Lodgers | Base Tariff / Night | Unlock Materials |
| :--- | :---: | :--- | :---: | :--- |
| **Delver Bunkhouse Dorm** | 4 Bunks | Miners, haulers, rangers | **$40g$ / bunk** | Initial attic cleanup (10 Oak + 500g) |
| **Standard Hearth Room** | 2 Rooms | Merchants, hunters, visitors | **$150g$ / room** | 30 Oak Timber + 15 Iron Bars + 1,200g |
| **Grand Merchant Suite** | 1 Suite | Fleet Captain Garrick, VIPs | **$450g$ / night** | 50 Ancient Timber + 10 Gold Bars + 3,500g |

---

## 3. Inn Cozy Rating

Each room features a Cozy Rating scale ranging from $0$ to $250$ points:

* **Raising Cozy Rating:**
  * Furnish oak study desks and hand-stitched leather armchairs (crafted or bought from Weaver Mae / Elora).
  * Illuminate corners with smokeless **Luminous Glowstone Lanterns** (`stone_lumina_glow`).
  * Diffuse **Forest Lavender Oil** for peaceful slumber.
  * Stoke cedar hearth fires during harsh winter seasons.
* **Economic Balance & Upkeep Rules:**
  * Rating $< 80$: Average nightly occupancy stays around $\sim 50\%$.
  * Rating $80 - 149$: Occupancy climbs to $\sim 75\%$ and lodgers award $+20\%$ coin tips.
  * Rating $\ge 150$: $100\%$ overnight occupancy achieved (up to **$910g$ / night** across 4 Dorm bunks + 2 Hearth rooms + 1 Suite), with patrons leaving **Deep Cavern Treasure Map Scraps** and rare seeds.
  * **Heating & Laundry Upkeep (`15%`):** Deducts `15%` of gross lodging rent nightly for linens and firewood — **waived permanently (`0%`)** once **Assistant Colm** joins your homestead crew.

---

## 4. Special Event: Stormbound Strangers

When weather deteriorates into a midnight **Blizzard** or **Gale-force Downpour**, urgent pounding echoes upon the front door at 22:30:

* **Exiled Knight Valerius:** Hunted across Solaria. Granting him refuge with a searing hot iron steak rewards the **Royal Parry Dagger Blueprint (`blueprint_royal_parry_dagger`)**.
* **Recluse Witch Morrigan:** Seeking respite from sub-zero drafts. Serving her hot wild mushroom porridge yields the **Blight Soil Purification Salt Recipe (`item_purification_salt_recipe`)**.
