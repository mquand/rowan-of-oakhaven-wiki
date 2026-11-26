---
title: "Hướng Dẫn Hệ Thống Đa Ngôn Ngữ Game (Game Localization / i18n Guide)"
status: published
audience: public
updated: 2026-11-26
tags: [localization, i18n, gettext, godot, wiki]
spoiler: false
---

# Hướng Dẫn Hệ Thống Đa Ngôn Ngữ Game (Game Localization / i18n Guide)

Tài liệu này ghi chú quy chuẩn đồng bộ dữ liệu đa ngôn ngữ giữa **Rowan of Oakhaven Wiki** và dự án game **Godot (Indie-game-001)**.

---

## 1. Cơ Chế Đồng Bộ Dữ Liệu Từ Wiki Sang Game

Toàn bộ dữ liệu của dự án được lưu trữ dưới dạng cấu trúc JSON song ngữ tại:
* `rowan-of-oakhaven-wiki/docs/data/vi/` (Tiếng Việt)
* `rowan-of-oakhaven-wiki/docs/data/en/` (Tiếng Anh)

Trong dự án game Godot, hệ thống bản dịch sử dụng chuẩn **GNU gettext (`.po` / `.pot`)** đặt tại:
* `Indie-game-001/localization/messages.pot`: Template chứa tất cả các Message ID (`msgid`).
* `Indie-game-001/localization/vi.po`: Bản dịch Tiếng Việt.
* `Indie-game-001/localization/en.po`: Bản dịch Tiếng Anh.

---

## 2. Lệnh Đồng Bộ Bản Dịch Tự Động

Mỗi khi bổ sung thêm vật phẩm, cây trồng, công trình tái thiết, nhiệm vụ hoặc NPC mới vào Wiki, chỉ cần chạy script:

```bash
python "D:/Dev-game/Indie-game-001/scripts/generate_po_localizations.py"
```

Script sẽ tự động quét các file JSON của Wiki:
1. Trích xuất tên, mô tả, danh xưng, đối thoại...
2. Chuẩn hóa thành các key quy chuẩn (`ITEM_{ID}_NAME`, `PROJECT_{ID}_NAME`, `QUEST_{ID}_TITLE`...).
3. Xuất ra file `.pot` và cập nhật bản dịch vào `vi.po`, `en.po`.

---

## 3. Quy Ước Message ID

| Tiền tố | Mô tả |
| :--- | :--- |
| `UI_COMMON_` | UI, menu, hệ thống nút bấm chung |
| `HUD_` | Thông số hiển thị màn hình (Health, Stamina, Hope...) |
| `SEASON_` / `DAY_` | Mùa và thứ trong tuần |
| `ITEM_{ID}_NAME` / `_DESC` | Tên & mô tả vật phẩm |
| `PROJECT_{ID}_NAME` / `_DESC` | 12 Dự án tái thiết thị trấn Oakhaven |
| `INN_ROOM_{TIER}_NAME` / `_DESC` | Hạng phòng nhà trọ Oakhaven |
| `INN_GUEST_{ID}_NAME` | Archetype khách lưu trú quán trọ |
| `EVENT_{ID}_NAME` / `_LOC` | Lễ hội bốn mùa và địa điểm |
| `NPC_{ID}_NAME` / `_TITLE` | Tên NPC và nghề nghiệp |
| `QUEST_{ID}_TITLE` / `_DESC` | Nhiệm vụ uỷ thác & săn thưởng |
| `TREE_{ID}_NAME` / `_DESC` | Cây lâm nghiệp & ăn quả |
| `MSG_` | Popup thông báo gameplay |

---

## 4. Cách Sử Dụng Trong Godot

* **UI Labels & Buttons**: Gán trực tiếp key vào trường `Text` của Node trên Inspector. Godot tự dịch.
* **Trong GDScript**: Dùng `tr("KEY")` hoặc các hàm getter của Resource:
  * `item.get_item_name()`
  * `project.get_title()`
  * `tree.get_tree_name()`
* **Đổi ngôn ngữ runtime**:
  ```gdscript
  LocalizationManager.set_current_locale("vi") # hoặc "en"
  ```
