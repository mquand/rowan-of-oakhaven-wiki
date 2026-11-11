# 🍵 Stardust Wiki (by Fluvio Games)

Chào mừng đến với kho lưu trữ tài liệu Wiki chính thức của tựa game **Stardust (Tiệm Bụi Sao)**, được phát triển bởi **Fluvio Games**.

> ⚠️ **Lưu ý:** Repository này là **OUTPUT TỰ ĐỘNG ĐƯỢC SINH RA** từ repository chính của game. Mọi chỉnh sửa thủ công trực tiếp trên repo này sẽ bị ghi đè khi pipeline đồng bộ kích hoạt.

---

## 📖 Cấu Trúc Nội Dung Wiki

Tất cả tài liệu công khai được lưu trữ trong thư mục `docs/`:

- [`docs/world-overview.md`](docs/world-overview.md) — Bản đồ & 5 Đại Vực trong thế giới Stardust.
- [`docs/game-overview.md`](docs/game-overview.md) — Tổng quan lối chơi, vòng lặp ngày & 12 tính năng đặc trưng.
- [`docs/art-direction.md`](docs/art-direction.md) — Phong cách Dark Cozy Pixel Art & bảng màu chuẩn.
- [`docs/character-roster.md`](docs/character-roster.md) — Dàn nhân vật Rowan, bạn đồng hành và cư dân Oakhaven.
- `docs/data/` — Dữ liệu JSON công khai (vật phẩm, công thức, nhân vật) đã được lọc bỏ các trường nhạy cảm nội bộ.

---

## ⚡ Cơ Chế Đồng Bộ Tự Động (Automation)

Khi repository chính của game (`mquand/Stardust`) có commit mới vào `docs/**`:
1. GitHub Actions bên repo game chạy kiểm tra chất lượng tài liệu (`npm run docs:check`).
2. Gửi tín hiệu `repository_dispatch` (event: `docs-updated`) sang repo này.
3. GitHub Actions bên repo wiki tự động kéo tài liệu mới, chạy `node scripts/filter-data.mjs` để lọc bỏ trường bí mật và commit cập nhật tự động.

---
© 2026 **Fluvio Games**. All rights reserved.
