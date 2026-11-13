# 🍵 Rowan of Oakhaven Wiki (by Fluvio Games)

Wiki & Cơ sở dữ liệu chính thức dành cho người chơi của tựa game **Rowan of Oakhaven** (Tiệm Bụi Sao), do **Fluvio Games** phát triển.

> Repo này **độc lập** và là **nguồn sự thật duy nhất** cho nội dung wiki công khai.
> Bạn chỉnh sửa trực tiếp tại đây — **không còn đồng bộ tự động** từ repo game nữa.
> Phong cách tham chiếu: wiki người chơi kiểu *Stardew Valley* / *Terraria* (kiến thức curated, không sinh tự động từ dữ liệu game).

---

## 📖 Cấu Trúc Nội Dung

Nội dung người chơi nằm trong `docs/`:

**Trang tường thuật** (render tại `/wiki/<slug>`):

- [`docs/game-overview.md`](docs/game-overview.md) — Tổng quan: cốt truyện mở đầu, vòng lặp ngày, 12 tính năng.
- [`docs/gameplay-guide.md`](docs/gameplay-guide.md) — Cách chơi: chu kỳ ngày, thể lực, mùa, công cụ.
- [`docs/character-roster.md`](docs/character-roster.md) — Dàn nhân vật, bạn đồng hành, cư dân Oakhaven.
- [`docs/world-overview.md`](docs/world-overview.md) — Bản đồ & 5 Đại Vực.
- [`docs/getting-started.md`](docs/getting-started.md) — Hướng dẫn khởi đầu cho người chơi mới.
- [`docs/festivals-events.md`](docs/festivals-events.md) — Lễ hội & sự kiện theo lịch năm.
- [`docs/calendar-seasons.md`](docs/calendar-seasons.md) — Lịch, bốn mùa & thời tiết.
- [`docs/dungeon-combat.md`](docs/dungeon-combat.md) — Hầm ngục & chiến đấu.
- [`docs/lore-story.md`](docs/lore-story.md) — Cốt truyện & lore (spoiler).

**Dữ liệu duyệt được** (render tại `/database/*`, nguồn `docs/data/*.json`):

- Vật phẩm / hạt giống / khoáng sản / tinh thể / đồ rơi từ quái (`items.json`)
- Cây trồng (`crops.json`), công thức trà & bánh (`recipes.json`), vũ khí (`weapons.json`)
- Nhân vật (`characters.json`), quái vật (`monsters.json`), địa điểm (`locations.json`), kỹ năng (`perks.json`)

> 🔒 **Nội dung cốt truyện / nhạy cảm:** dùng frontmatter `spoiler: true` để ẩn khỏi trang chủ — đúng cách wiki Stardew/Terraria đánh dấu spoil.

---

## 🛠️ Chạy & Build

```bash
npm install
npm run dev      # phát triển trên localhost
npm run build    # build production
npm run start    # chạy bản build
```

**Triển khai (deploy):** Wiki là app **Next.js**, deploy độc lập trên nền tảng gắn với repo này (vd Vercel / GitHub Pages) — KHÔNG phụ thuộc repo game.

---

## 🎨 Quy Chuẩn Thiết Kế

Toàn bộ UI wiki tuân theo phong cách **Dark Cozy Pixel Art** của game — xem [`AGENTS.md`](AGENTS.md) và `.agents/skills/` trước khi sửa giao diện.

---
© 2026 **Fluvio Games**. All rights reserved.
