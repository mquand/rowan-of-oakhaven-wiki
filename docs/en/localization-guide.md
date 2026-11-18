# Game Localization & i18n Architecture Guide

This document outlines the localization and internationalization standards synchronized between **Rowan of Oakhaven Wiki** and the **Godot project (Indie-game-001)**.

---

## 1. Data Synchronization Architecture

Game data is maintained in structured bilingual JSON format within the wiki:
* `rowan-of-oakhaven-wiki/docs/data/vi/` (Vietnamese)
* `rowan-of-oakhaven-wiki/docs/data/en/` (English)

In the Godot project, translation is managed using the industry-standard **GNU gettext (`.po` / `.pot`)** format located in:
* `Indie-game-001/localization/messages.pot`: Master template containing all message IDs (`msgid`).
* `Indie-game-001/localization/vi.po`: Vietnamese translations.
* `Indie-game-001/localization/en.po`: English translations.

---

## 2. Automated Synchronization Command

Whenever new items, crops, restoration projects, quests, or characters are added to the wiki, run the sync script:

```bash
python "D:/Dev-game/Indie-game-001/scripts/generate_po_localizations.py"
```

The script automatically:
1. Parses wiki JSON datasets.
2. Formats entries into standardized message keys (`ITEM_{ID}_NAME`, `PROJECT_{ID}_NAME`, etc.).
3. Generates/updates `messages.pot`, `vi.po`, and `en.po`.

---

## 3. Message ID Naming Standards

| Prefix | Scope |
| :--- | :--- |
| `UI_COMMON_` | Generic UI buttons, menus, and system prompts |
| `HUD_` | On-screen stats (Health, Stamina, Hope, Reputation) |
| `SEASON_` / `DAY_` | Calendar seasons and weekdays |
| `ITEM_{ID}_NAME` / `_DESC` | Item, crop, seed names and lore |
| `PROJECT_{ID}_NAME` / `_DESC` | 12 Oakhaven restoration projects |
| `INN_ROOM_{TIER}_NAME` / `_DESC` | Hearth Inn room tiers |
| `INN_GUEST_{ID}_NAME` | Inn guest archetypes |
| `EVENT_{ID}_NAME` / `_LOC` | Seasonal festivals and venues |
| `NPC_{ID}_NAME` / `_TITLE` | NPC identities and professions |
| `QUEST_{ID}_TITLE` / `_DESC` | Notice board commissions and bounties |
| `TREE_{ID}_NAME` / `_DESC` | Timber and orchard trees |
| `MSG_` | Gameplay alerts and dialogue messages |

---

## 4. Usage in Godot Engine

* **UI Labels & Buttons**: Assign keys directly into the `text` property in the inspector. Godot translates automatically.
* **In GDScript**: Use `tr("KEY")` or helper methods:
  * `item.get_item_name()`
  * `project.get_title()`
  * `tree.get_tree_name()`
* **Runtime Language Switching**:
  ```gdscript
  LocalizationManager.set_current_locale("en") # or "vi"
  ```
