---
title: "Art Direction & Visual Identity"
status: draft
audience: public
updated: 2026-11-12
tags: [art, palette, style, visuals, dark-cozy]
spoiler: false
---

# 🎨 Art Direction & Visual Identity

> **Game:** Rowan of Oakhaven  
> **Phong cách chủ đạo:** **Dark Cozy Pixel Art** — thế giới đêm lạnh (navy/tím) kết hợp nguồn sáng ấm vàng mật ong và hiệu ứng ánh sáng 2D của Godot 4.  
> **Mục tiêu cảm xúc:** Ấm áp, thư thái, ngon mắt (Appetizing) và chữa lành tâm hồn.

---

## 1. Bản Sắc Thị Giác (Visual Identity)

* **Phong cách:** Pixel Art Hiện Đại 16-bit / 32-bit với các đường nét bo tròn mềm mại, không góc cạnh sắc nhọn gay gắt.
* **Cảm xúc cốt lõi:** Một tách trà bốc khói nghi ngút bên đĩa bánh quy vàng ươm, đặt cạnh ô cửa sổ đọng nước mưa và chú mèo nằm ngủ gừ gừ bên ánh đèn dầu.
* **Quy tắc vàng:**
  * Mọi món ăn/đồ uống phải trông thật **ngon mắt (Appetizing)**: Bánh quy có màu vàng mật ong giòn rụm, nước trà có độ trong suốt và lấp lánh ánh kim.
  * Mọi nhân vật mang lại cảm giác **thân thiện và dễ mến**: Không có thiết kế gai góc, u ám hay rùng rợn.

---

## 2. Bảng Màu Chuẩn (Dark Cozy Palette)

Bảng màu bao gồm 5 nhóm màu chính tạo nên sự tương phản hài hòa:

| Nhóm Màu | Dải Hex Chuẩn | Ứng Dụng Trong Game |
| :--- | :--- | :--- |
| **Nền Đêm Lạnh** | `#151829`, `#1e1b38`, `#2b2046`, `#3a2d5c` | Bầu trời, bóng rừng sâu, tường ngoài tiệm |
| **Thiên Nhiên Trầm** | `#243d32`, `#3b4e34`, `#453023`, `#3e4759` | Thảo mộc, cỏ rêu, đất cày, vách núi |
| **Gỗ & Bánh Ấm** | `#422013`, `#8b4f2c`, `#c4844e`, `#f0d39e` | Bàn bếp, lò nướng, sàn nhà, vỏ bánh |
| **Ánh Sáng Sưởi** | `#ffe680`, `#ffcf40`, `#f38428`, `#c9561c` | Đèn lồng, nến, than hồng — **nguồn sáng tương phản** |
| **Phép Thuật Sao** | `#6ee2ff`, `#b874ff`, `#fff4b8` | Tinh thể, bụi sao, phép thuật thảo mộc |

**Nguyên tắc phối màu:** Thế giới lạnh (navy/tím) làm nền, mọi nguồn sáng ấm (vàng mật ong) đặt lên trên. Tuyệt đối không dùng pastel có độ bão hoà quá cao.

---

## 3. Quy Chuẩn Kỹ Thuật Đồ Họa

* **Độ phân giải tham chiếu:** `1920 x 1080` (Màn hình ngang 16:9 chuẩn PC).
* **Đơn vị lưới Map (Map Grid):** `16 × 16` pixel (chuẩn ô địa hình TileMapLayer, sàn nhà, vách đá, luống đất).
* **Kích thước Canvas Sprite:**
  * `64 × 64` pixel cho nhân vật người (Rowan, NPC — thân ~32×48).
  * `32 × 32` pixel cho Pip (cú), Mallow (mèo), prop nhỏ và hiệu ứng.
  * `16 × 16` pixel cho tile địa hình và icon vật phẩm UI.
  * `128 × 128` pixel cho avatar top-bar (hiển thị 64px).
  * `256 × 256` pixel cho portrait đối thoại (hiển thị ~220×240px).
* **Base world render:** `640 × 360`, phóng `3×` bằng `Camera2D.zoom` ở 1080p. UI giữ design space `1920 × 1080`.
* **Texture Filter:** `Nearest` — Giữ nguyên từng điểm ảnh pixel sắc cạnh, không làm nhòe.
* **Snap 2D Transform:** Bật chế độ snap to pixel để tránh hiện tượng sub-pixel jitter khi di chuyển.
