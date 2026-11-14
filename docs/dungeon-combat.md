---
title: "Hầm Ngục, Cơ Chế Chiến Đấu & Lò Rèn Boris"
status: stable
audience: public
updated: 2026-11-14
tags: [dungeon, combat, monsters, weapons, mining, forge, boris]
spoiler: false
---

# 🌙 Hầm Ngục, Cơ Chế Chiến Đấu & Lò Rèn Boris

Thế giới lòng đất của Oakhaven là trụ cột **hành động & sinh tồn cốt lõi** trong trò chơi. Toàn bộ tiền vàng tích lũy từ việc làm nông, nấu ăn và bán trà bánh trên mặt đất đều hướng tới mục tiêu tối thượng: **đầu tư trang bị chiến đấu tại Lò rèn Boris**, tôi luyện vũ khí và khai phá sâu vào lòng đất để giải mã thảm họa ô nhiễm Tinh Tú (Star Blight).

---

## 1. Cấu Trúc Hai Phân Khu Lòng Đất

```
               ┌────────────────────────────────────────────────────────┐
               │                  THỊ TRẤN OAKHAVEN                     │
               │   (Nông trại • Bếp trà bánh • Lò rèn • Trạm y tế)      │
               └───────────────┬────────────────────────┬───────────────┘
                               │                        │
             Thang máy khoáng sản              Lối vào Hầm ngục
                               ▼                        ▼
               ┌────────────────────────┐  ┌────────────────────────────┐
               │   HANG MỎ OAKHAVEN     │  │   HẦM NGỤC STAR BLIGHT     │
               │    (150 TẦNG CỐ ĐỊNH)  │  │  (ROGUELIKE PROCEDURAL)    │
               │                        │  │                            │
               │ • Thang máy mỗi 5 tầng │  │ • Phòng sinh ngẫu nhiên    │
               │ • Khai thác 17 quặng   │  │ • 12 Biome biến đổi        │
               │ • Đụng độ Boss mốc     │  │ • Thử thách sinh tồn cao   │
               │ • Tầng 150: Khaz-Drakor│  │ • Mảnh vỡ & Cổ vật Tinh Tú │
               └────────────────────────┘  └────────────────────────────┘
```

1. **Hang Mỏ Oakhaven (The 150-Floor Mines):**
   * Tiến trình cố định gồm **150 tầng mỏ**, phân bố thành 5 đới địa chất (Đất mềm tầng 1–20, Mỏ đồng tầng 21–50, Vực quặng sắt tầng 51–80, Đới hoàng kim tầng 81–110, Vực dung nham & hắc diện thạch tầng 111–140, và Đáy mỏ Tinh Tú tầng 141–150).
   * **Thang máy cơ giới:** Tự động mở khóa trạm dừng mỗi 5 tầng mỏ (5, 10, 15... 150), cho phép di chuyển tức thời giữa mặt đất và tầng đã khai phá.
   * **Warden Boss mốc:** Canh giữ tại các mốc tầng 30, 60, 90, 120 và 150. Đánh bại Warden sẽ mở khóa bản vẽ rèn đúc mới của Boris và lối đi sang đới kế tiếp.

2. **Hầm Ngục Hư Không (Star Blight Roguelike Dungeon):**
   * Hệ thống phòng ốc sinh ngẫu nhiên (Procedural Generation) trải rộng qua **12 Biome** huyền bí.
   * Càng đi sâu, mật độ quái vật hắc hóa càng dày đặc, bẫy cơ quan tinh vi hơn nhưng bù lại sẽ rơi các giọt nguyên liệu huyền thoại: *Lõi Tinh Tú (`item_starlight_core`)*, *Kim Cương (`gem_diamond`)* và mảnh cổ ngữ.

---

## 2. Cơ Chế Chiến Đấu ARPG Thời Gian Thực

### Thanh Thể Lực Hợp Nhất (Stamina-as-Life)
Trong *Rowan of Oakhaven*, nhân vật **không có thanh máu đỏ (HP) riêng biệt**. 
* **Thể lực (Stamina) chính là Sinh lực:** Mọi hành vi vung vũ khí, dùng chiêu thức, hoặc nhận sát thương từ quái vật/bẫy gai đều trừ trực tiếp vào thanh Thể lực.
* **Cạn Thể lực = Gục ngã (Collapse):** Khi Thể lực tụt về 0, Rowan kiệt sức ngất lịm và được các Tinh linh Rừng hoặc Boris dìu về Trạm y tế của Maeve.
* **Cộng hưởng Sinh tồn từ Ẩm thực:** Do không có bình thuốc máu màu đỏ thông thường, **các món ăn ninh hầm, bánh nướng nóng và ấm trà mang theo** chính là nguồn hồi sinh lực trực tiếp. Uống một ngụm Trà Lửa Ấm hay ăn một bát Súp Hầm Củ Cải Thợ Mỏ sẽ lập tức bơm đầy Thể lực và tăng giáp phòng ngự.

```
       [ Đòn đánh quái / Va bẫy ] ──┐
                                     ▼
       [ Vung vũ khí / Lướt né  ] ──► [ THANH THỂ LỰC (STAMINA) ] ◄── [ Ăn Súp & Bánh / Uống Trà ]
                                     │
                                     ▼ (Nếu chạm mốc 0)
                            [ GỤC NGÃ & VỀ TRẠM XÁ ]
```

### Kỹ Năng Lướt Né (Stardust Dash) & Bất Tử Nhất Thời (i-Frames)
* **Kích hoạt:** Phím `Space` (hoặc nút né chuyên dụng trên tay cầm).
* **Hiệu ứng:** Tiêu hao **12 Thể lực**, lướt nhanh 2.5 ô để lại một vệt tàn ảnh bụi sao lung linh.
* **Khung hình bất tử (i-Frames):** Trong **0.25 giây đầu** của cú lướt, Rowan hoàn toàn miễn nhiễm với mọi nguồn sát thương (kể cả tia laser, cầu lửa hay đòn dậm chấn động của Boss).

### Phản Đòn Hoàn Hảo (Perfect Parry) & Phá Vỡ Thế Thủ
* **Áp dụng cho:** Các vũ khí có độ cứng cáp (Kiếm Bản Rộng, Kiếm Hiệp Sĩ, Búa Chiến).
* **Thao tác:** Giơ thế thủ ngay trước khoảnh khắc đòn tấn công của quái chạm vào người trong khung thời gian 0.2s.
* **Kết quả:**
  * Hoàn toàn triệt tiêu sát thương nhận vào.
  * Hồi phục ngay lập tức **+15 Thể lực**.
  * Làm choáng (Stun) quái vật trong 2.0 giây, kích hoạt trạng thái hở sườn để tung đòn trảm quyết.

### Cơ Chế Ánh Sáng Đèn Lồng (Lantern Darkness Mechanic)
* Các tầng hang sâu từ tầng 30 trở đi hoàn toàn chìm trong bóng tối dày đặc.
* Quái vật ẩn mình trong bóng tối sẽ tàng hình hoặc tăng 50% tốc độ di chuyển.
* **Đèn Lồng Đom Đóm (Firefly Lantern):** Bắt buộc phải mang bên hông hoặc cầm tay để tỏa vòng sáng xua tan bóng tối, làm hiện hình điểm yếu của quái vật và phát hiện các bẫy hố sụp.

---

## 3. Năm Hệ Vũ Khí Oakhaven (The 5 Weapon Archetypes)

Hệ thống vũ khí gồm **23 món vũ khí** được chia đều qua 5 phân hệ chiến đấu và 6 bậc khoáng sản:

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                           5 HỆ VŨ KHÍ OAKHAVEN                         │
  ├──────────────────┬─────────────────┬──────────────────┬────────────────┤
  │ Hệ Vũ Khí        │ Tốc Độ / Tầm    │ Khắc Chế Quái    │ Tác Dụng Khác  │
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ 🗡️ Kiếm & Đoản Đao│ Nhanh (2.2-3.8) │ Quái linh hoạt   │ Chém bụi gai,  │
  │   (Melee Blade)  │ Tầm 1.2 - 1.5 ô │ Đỡ đòn & Parry   │ dây leo hang   │
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ 🌾 Liềm Runic    │ Nhanh vừa (1.4) │ Quái bầy, rết đá │ Gặt vạt lúa mì,│
  │   (Scythe)       │ Bán nguyệt 2.5ô │ Hút lại Thể lực  │ thảo mộc 3-5 ô │
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ 🔨 Búa Tạ & Chùy │ Chậm (0.7-1.1)  │ Quái bọc thép đá │ Đập vỡ khối đá │
  │   (Warhammer)    │ Chấn động 2.4 ô │ Phá vỡ giáp vỏ   │ & quặng cực lớn│
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ 🏹 Cung & Nỏ     │ Bắn xa (1.2-2.5)│ Quái bay, nhện trần│ Bắn công tắc  │
  │   (Crossbow)     │ Tầm 5.0 - 8.0 ô │ Bắn xuyên mục tiêu│ vách đá xa     │
  ├──────────────────┼─────────────────┼──────────────────┼────────────────┤
  │ ✨ Trượng Tinh Tú│ Bắn phép (1.3-2)│ Quái bóng tối    │ Soi sáng hầm,  │
  │   (Magic Staff)  │ Tầm 4.5 - 7.5 ô │ Thanh tẩy hắc hóa│ xua tan sương độc│
  └──────────────────┴─────────────────┴──────────────────┴────────────────┘
```

### Danh Sách 6 Bậc Tiến Cấp Vũ Khí (Weapon Tiers)

1. **Bậc 1 — Gỗ Sồi Khởi Đầu (Tầng 1–20):**
   * *Kiếm Gỗ Huấn Luyện (`wooden_training_sword`):* ATK 6, tốc độ 2.2 nhịp/s.
   * *Liềm Làm Nông Cũ (`rusty_farm_scythe`):* ATK 8, quét bán nguyệt 2.0 ô.
   * *Búa Đá Thợ Mỏ (`miner_stone_mallet`):* ATK 12, đập vỡ đá cuội.
   * *Cung Săn Oakhaven (`hunter_shortbow`):* ATK 10, tầm xa 5.0 ô.
   * *Đũa Phép Gỗ Sơ Cấp (`apprentice_wood_wand`):* ATK 9, bắn đốm sáng nhỏ.
2. **Bậc 2 — Đồng Đỏ Đúc Lửa (Tầng 21–50):**
   * *Kiếm Bản Rộng Đồng Đỏ (`copper_broadsword`):* ATK 14, quét 360 độ Trảm Phong.
   * *Chùy Gai Đồng Đỏ (`copper_spiked_mace`):* ATK 22, nghiền nát vỏ bọ cánh cứng.
3. **Bậc 3 — Sắt Thép Rèn Oakhaven (Tầng 51–80):**
   * *Kiếm Thép Rèn Oakhaven (`iron_knight_blade`):* ATK 24, phản đòn 150% sát thương.
   * *Liềm Ma Thuật (`mystic_scythe`):* ATK 28, tạo lốc xoáy gom quái.
   * *Gậy Quấy Trà Khổng Lồ (`whisk_hammer`):* ATK 38, sóng chấn động làm chậm quái 50%.
   * *Nỏ Cơ Giới Bánh Răng (`clockwork_iron_crossbow`):* ATK 26, bắn liền 3 mũi thép xuyên thấu.
   * *Đèn Lồng Bão Đom Đóm (`spirit_lantern`):* ATK 25, hào quang đom đóm hộ thể.
4. **Bậc 4 — Hoàng Kim & Ngân Nguyệt (Tầng 81–110):**
   * *Kiếm Liễu Thái Dương (`sunburst_rapier`):* ATK 35, đâm cực nhanh, kích hoạt hiệu ứng Cháy.
   * *Lưỡi Hái Ngân Nguyệt (`silver_moon_scythe`):* ATK 42, hồi 3 Thể lực cho mỗi quái hạ gục.
   * *Nỏ Bắn Tỉa Kim Quang (`golden_solar_arbalest`):* ATK 44, tầm bắn 8 ô làm mù quái bóng tối.
5. **Bậc 5 — Hỏa Sơn & Hắc Diện Thạch (Tầng 111–140):**
   * *Kiếm Lửa Hắc Diện Thạch (`obsidian_flame_saber`):* ATK 50, tạo cột dung nham hất tung quái.
   * *Búa Tạ Nham Thạch (`magma_crag_warhammer`):* ATK 62, rạch nứt đất phun trào nham thạch 4 ô.
   * *Trượng Hỏa Sơn Dung Nham (`volcanic_fire_rod`):* ATK 54, dựng tường lửa tròn chặn quái 6s.
6. **Bậc 6 — Tinh Vân Hư Không Tối Thượng (Tầng 141–150 & Star Blight Dungeon):**
   * *Kiếm Pha Lê Sao (`starlight_blade`):* ATK 68, tốc độ 3.8 nhịp/s, bắn 5 phi kiếm sao truy tìm.
   * *Lưỡi Hái Hư Không Tinh Tú (`astral_void_reaper`):* ATK 74, trảm sát quái thường dưới 25% sinh lực.
   * *Búa Tinh Vân Thần Tượng (`titan_stellar_crusher`):* ATK 92, đòn giáng thiên thạch uy lực vô song.
   * *Nỏ Liên Thanh Hư Không (`starblight_void_repeater`):* ATK 65, gọi mưa tên sao diện tích 4x4 ô.
   * *Pháp Trượng Tinh Tú Khởi Nguyên (`primordial_starlight_staff`):* ATK 76, nổ Siêu Tân Tinh thanh tẩy toàn màn hình.

---

## 4. Hệ Thống Lò Rèn Boris (Boris's Forge System)

Cửa tiệm Lò rèn của Boris tọa lạc ở phía Đông thị trấn Oakhaven. Đây là nơi biến đổi toàn bộ khoáng sản bạn cuốc được và tiền vàng bạn kiếm được thành sức mạnh chiến đấu thuần túy.

```
       [ Tiền Vàng từ Quán Trà ] ──┐
       [ Phôi Kim Loại từ Hang ] ──┼──► [ LÒ RÈN BORIS ] ──► [ VŨ KHÍ CƯỜNG HÓA VỮNG VÀNG ]
       [ Đá Quý & Giọt Quái    ] ──┘
```

### 1. Rèn Vũ Khí Mới (New Weapon Forging)
* Mỗi khi Rowan vượt qua một mốc tầng mỏ (Tầng 20, 50, 80, 110, 140, 150), Boris sẽ mở khóa bản vẽ vũ khí tương ứng.
* Yêu cầu: Phôi kim loại (`bar_copper`, `bar_iron`, `bar_gold`, `bar_silver`) + Than đá + Phí chế tác bằng Vàng.

### 2. Cường Hóa Tôi Thép (+1 đến +5)
* Mỗi vũ khí có thể tôi luyện tối đa **5 cấp cường hóa** ($+1, +2, +3, +4, +5$).
* **Chỉ số gia tăng:** Mỗi cấp $+1$ tăng **$+10\%$ Sát thương cơ bản (ATK)** và **$+5\%$ Tốc độ vung đòn**.
* **Nguyên tắc nhân văn (Dark Cozy Principle):**
  > [!IMPORTANT]
  > Tại Lò rèn Boris, **tỉ lệ cường hóa LUÔN LUÔN LÀ 100% THÀNH CÔNG**. Không bao giờ có cơ chế xịt trang bị, không tụt cấp và tuyệt đối không gãy nát vũ khí. Thử thách của trò chơi nằm ở kỹ năng né đòn và đọc hành vi quái vật trong hầm ngục, không nằm ở sự may rủi cờ bạc.

| Cấp Cường Hóa | Sát Thương Gia Tăng | Tốc Độ Gia Tăng | Nguyên Liệu Yêu Cầu |
| :--- | :--- | :--- | :--- |
| **Vũ khí Gốc (+0)** | $100\%$ ATK | Chuẩn | Vũ khí rèn ban đầu |
| **Tôi Thép (+1)** | $+10\%$ ATK | $+5\%$ Tốc độ | 2 Phôi cùng bậc + 2 Than đá + 300g |
| **Tôi Thép (+2)** | $+20\%$ ATK | $+10\%$ Tốc độ | 4 Phôi cùng bậc + 4 Than đá + 800g |
| **Tôi Thép (+3)** | $+30\%$ ATK | $+15\%$ Tốc độ | 6 Phôi cùng bậc + 6 Than đá + 1,800g |
| **Tôi Thép (+4)** | $+40\%$ ATK | $+20\%$ Tốc độ | 8 Phôi cùng bậc + 8 Than đá + 3,500g |
| **Tôi Thép (+5 Max)** | $+50\%$ ATK | $+25\%$ Tốc độ | 10 Phôi cùng bậc + 1 Tinh thể quái + 7,000g |

### 3. Khảm Ấn Ngọc Cổ Ngữ (Runic Gem Infusion)
Mỗi vũ khí từ Bậc 2 trở lên đều sở hữu **1 ổ khảm ngọc cổ ngữ** trên chuôi kiếm/cán búa. Đem đá quý khai thác được đến gặp Boris để khảm hiệu ứng nguyên tố vĩnh viễn:

* 🔴 **Hồng Ngọc (Ruby):** Kích hoạt **Hỏa Thiêu (Burn)** — Đòn đánh đốt cháy kẻ địch, gây sát thương duy trì trong 4 giây.
* 🔵 **Lam Ngọc (Sapphire):** Kích hoạt **Hàn Băng (Frostbite)** — Giảm $40\%$ tốc độ di chuyển và đòn đánh của quái vật.
* 🟢 **Ngọc Lục Bảo (Emerald):** Kích hoạt **Bào Tử Độc (Poison Spore)** — Xác suất phóng thích đám mây độc tính khi đánh trúng.
* 💎 **Kim Cương (Diamond):** Kích hoạt **Chí Mạng Sắc Bén (Critical Edge)** — Tăng vĩnh viễn **$+20\%$ Tỉ lệ đòn đánh chí mạng (x2 sát thương)**.
* 🟣 **Thạch Anh Tím (Amethyst):** Kích hoạt **Hấp Thu Linh Lực (Stamina Siphon)** — Giảm **$25\%$ Thể lực tiêu hao** cho mọi đòn đánh của vũ khí này.
* 🟡 **Hoàng Ngọc (Topaz):** Kích hoạt **Trọng Kích Đẩy Lùi (Impact Surge)** — Tăng $+35\%$ lực đánh văng quái vật (Knockback) và phá vỡ thế thủ nhanh hơn.

### 4. Tái Chế Nấu Chảy Phế Liệu (Scrap Salvage)
Khi người chơi chuyển sang vũ khí bậc cao hơn, các vũ khí cũ không còn sử dụng có thể đưa vào Lò luyện của Boris để nấu chảy:
* Hoàn lại **$60\%$ số phôi kim loại** đã từng dùng để rèn món đồ đó.
* Tháo rời và **trả lại 100% viên đá quý** đã khảm vào ổ rune mà không làm vỡ ngọc.

---

## 5. Luật Lệ Thám Hiểm & Mức Độ Trừng Phạt (Stakes & Death Mechanics)

Để giữ đúng tinh thần **Dark Cozy Pixel Art** — vừa có sự căng thẳng hồi hộp khi lặn sâu vào lòng đất, vừa ấm áp và không trừng phạt tàn khốc:

1. **Khóa Phòng Tử Chiến (Lockdown Chambers):**
   * Khi bước vào một số mật thất đặc biệt, các cửa đá sẽ sập xuống khóa kín.
   * Tiêu diệt toàn bộ đợt quái vật hung hãn $\rightarrow$ Cửa đá tự động nâng lên, rương báu xuất hiện ở giữa phòng.
2. **Đền Thờ Tổ Mẫu Amalia (Grandmother's Shrines):**
   * Xuất hiện ngẫu nhiên mỗi 10 tầng mỏ hoặc giữa các phòng hầm ngục.
   * Cho phép chọn 1 trong 3 lời chúc phúc tạm thời cho chuyến thám hiểm đó (ví dụ: *Tăng 15% tốc độ chạy, Hồi 5 Thể lực khi đập vỡ đá, Miễn nhiễm bẫy gai*).
3. **Khi Rowan Gục Ngã Trong Hầm Mỏ (Defeat Mechanics):**
   * Bạn **KHÔNG BAO GIỜ mất vĩnh viễn nhân vật (No Permadeath)**.
   * Bạn **GIỮ NGUYÊN 100%**: Tất cả vũ khí trang bị, tiền vàng trong túi, bản vẽ đã mở khóa và các hòm đồ đã cất an toàn trên mặt đất.
   * Bạn **CHỈ ĐÁNH RƠI**: Khoảng $30\%$ lượng quặng thô và thảo mộc dã ngoại vừa thu nhặt được trong lần lặn mỏ đó (Boris hoặc Maeve có thể tìm lại giúp bạn một phần vào ngày hôm sau tại quầy Thất lạc).

---

👉 Xem thêm cơ sở dữ liệu liên quan:
* [Kho Vũ Khí & Trang Bị](/database/weapons)
* [Sổ Quái Vật & Boss](/database/monsters)
* [Khoáng Sản & Đá Quý Mỏ](/wiki/minerals-guide)
* [Cẩm Nang Ẩm Thực & Hồi Thể Lực](/wiki/cooking-recipes-guide)
