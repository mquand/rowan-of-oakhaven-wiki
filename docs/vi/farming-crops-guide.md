---
title: "Cây Trồng Bốn Mùa & Tự Động Hóa Nông Trại"
status: public
audience: public
updated: 2026-11-20
tags: [farming, crops, trees, seasons, automation, eatery]
spoiler: false
---

# 🌾 Cây Trồng Bốn Mùa & Tự Động Hóa Nông Trại Oakhaven

Nông trại Oakhaven là chuỗi cung ứng nguyên liệu thiết yếu cho gian bếp Quán Ăn The Hearth và nguồn lương thực nuôi dưỡng cả thung lũng thời hậu chiến. Hệ thống canh tác của trò chơi bao gồm **41 loài thực vật chuẩn mực**, được phân định rõ ràng thành:
- **27 Cây Hoa Màu Theo Vụ (Seasonal Field Crops)**: Gieo hạt trên luống đất cuốc xới, chăm sóc tưới nước hàng ngày, gồm cả cây thu hoạch một lần, cây dây leo giàn và cây lưu niên tái sinh nhiều đợt.
- **14 Cây Thân Gỗ Lâu Năm (Timber & Orchard Trees)**: 6 loài đại thụ lấy gỗ xây dựng & trích nhựa + 8 loài cây ăn quả $3\times3$ cho trái ngọt vĩnh cửu.

---

## 1. Cơ Chế Thổ Nhưỡng, Nguồn Nước & Tự Động Hóa

### Vòng Lặp Canh Tác Cơ Bản
1. **Dọn Đất & Cuốc Luống:** Dùng Cuốc chim xới đất (`is_tilled = true`).
2. **Gieo Hạt:** Thả hạt giống mua từ Vườn Ươm Maeve hoặc tự ươm giống.
3. **Cấp Nước:** Tưới nước mỗi sáng bằng Bình tưới hoặc hệ thống Vòi phun tự động. Cây không được tưới sẽ ngừng lớn nhưng không bị chết khô.
4. **Thu Hoạch:** Nhổ bằng tay hoặc bổ rìu (đối với cây khổng lồ).

### Hệ Thống Vòi Phun Nước Tự Động (Sprinklers)
Tự động tưới đất vào lúc **06:00 AM** mỗi sáng, giúp giải phóng hoàn toàn thể lực và thời gian cho Rowan xuống hầm mỏ:
- **Vòi Phun Đồng (Copper Sprinkler):** Tưới 4 ô liền kề chữ thập (Trên, Dưới, Trái, Phải). Rèn từ 1 Thỏi Đồng + 1 Quặng Sắt.
- **Vòi Phun Sắt (Iron Sprinkler):** Tưới 8 ô xung quanh (khung $3\times3$). Rèn từ 1 Thỏi Sắt + 1 Thỏi Đồng.
- **Vòi Phun Hư Không (Void Sprinkler):** Tưới 24 ô xung quanh (khung $5\times5$, diện tích 25 ô trừ tâm). Rèn từ 1 Thỏi Void (Quặng Hư Không tầng 141+) + 1 Bột Thạch Anh Tím.

### Bù Nhìn & Phân Bón Tự Nhiên
- **Bù Nhìn Rơm (Scarecrow):** Bảo vệ phạm vi bán kính 8 ô xung quanh khỏi quạ rừng mổ hạt giống.
- **Tro Bếp Oakhaven (`item_wood_ash`):** Lấy từ tro lò than bếp nướng, bón vào đất cày rút ngắn 15% thời gian sinh trưởng.
- **Bột Xương Hang Mỏ (`item_bone_meal`):** Nghiền từ xương quái vật mỏ, tăng 30% tỷ lệ nông sản đạt phẩm chất Bạc/Vàng.
- **Mùn Rêu Giữ Ẩm (`item_retaining_moss`):** Trộn vào luống cày giúp đất có 50% cơ hội giữ ẩm qua đêm, không cần tưới lại hôm sau.

---

## 2. Danh Mục 27 Cây Hoa Màu Theo Mùa

### 🌸 A. Mùa Xuân (7 Cây Canh Tác)
| Cây Trồng | Ngày Lớn | Tái Sinh | Giá Hạt | Giá Bán | Lợi Nhuận/Ngày | Ứng Dụng Trong Bếp & Đời Sống |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Lúa Mì Bạc** (*Silver Wheat*) | 4 ngày | 1 lần | 15g | 30g | **3.75 Vàng/ngày** | Xay tại Cối Xay Gió ra Bột Mì Tươi làm vỏ bánh mì, mì sợi dã chiến. Trồng được cả Xuân, Hạ, Thu. |
| **Bắp Cải Băng** (*Ice Cabbage*) | 6 ngày | 1 lần | 35g | 55g | **3.33 Vàng/ngày** | Bắp cải cuộn chắc, lá giòn ngọt; dùng nấu súp thanh vị và muối chua dự trữ đông. |
| **Dâu Rừng Mùa Xuân** (*Wild Strawberry*) | 7 ngày | **3 ngày** | 60g | 35g | **7.86 Vàng/ngày** (8 đợt/vụ) | Quả mọng đỏ ngọt thanh, hái 8 đợt suốt mùa; làm mứt dâu kẹp bánh sừng bò và nước giải khát. |
| **Đậu Hà Lan Giàn Leo** (*Pea Pod*) | 10 ngày | **3 ngày** | 60g | 30g | **5.36 Vàng/ngày** (7 đợt/vụ) | Dây leo giàn cọc gỗ (không đi xuyên qua được); hạt ngọt bùi cho món cơm rang và súp củ dền. |
| **Búp Trà Sen Oakhaven** (*Oakhaven Lotus Tea*) | 12 ngày | **4 ngày** | 40g | 25g | **3.04 Vàng/ngày** (5 đợt/mùa) | Bụi trà lưu niên đâm chồi Xuân & Hạ; đọt non xao khô pha các ấm trà an thần hồi phục Stamina. |
| **Hoa Cúc Mặt Trời** (*Sun Daisy*) | 5 ngày | 1 lần | 20g | 38g | **3.60 Vàng/ngày** | Hoa cánh vàng rực; hãm trà hoa cúc mật ong hạ hỏa và làm thuốc nhuộm vải rèm trang trí quán. |
| **Đậu Thao Thức Cổ Sinh** (*Sopophorous Bean*) | 11 ngày | **3 ngày** | 90g | 50g | **13.81 Vàng/ngày** (xuyên 3 mùa) | Dây leo cổ đại canh tác suốt Xuân, Hạ, Thu (25 đợt hái); dịch đậu luyện thuốc chống ngủ gục khi đi mỏ đêm. |

---

### ☀️ B. Mùa Hạ (7 Cây Canh Tác)
| Cây Trồng | Ngày Lớn | Tái Sinh | Giá Hạt | Giá Bán | Lợi Nhuận/Ngày | Ứng Dụng Trong Bếp & Đời Sống |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Bắp Ngô Ánh Dương** (*Sun Corn*) | 12 ngày | **4 ngày** | 80g | 45g | **8.21 Vàng/ngày** (xuyên 2 mùa) | Cây thân cao sống qua cả mùa Thu (12 đợt hái); bắp luộc bơ tỏi, nấu súp ngô kem và làm thức ăn gia súc. |
| **Cà Chua Lửa Mọng Nước** (*Fire Tomato*) | 10 ngày | **4 ngày** | 50g | 24g | **2.50 Vàng/ngày** (5 đợt/vụ) | Cà chua đỏ rực trĩu cành; xào làm sốt cà chua thịt băm, súp hải sản chua cay và ướp thịt nướng. |
| **Dưa Hấu Dung Nham** (*Magma Melon*) | 12 ngày | 1 lần | 80g | 180g | **8.33 Vàng/ngày** | Quả khổng lồ ruột đỏ ấm nồng; giải nhiệt mùa hè, có 2% cơ hội hóa Dưa Hấu Khổng Lồ khi trồng cụm 3x3. |
| **Mía Mật Ong Hổ Phách** (*Honey Cane*) | 7 ngày | 1 lần | 30g | 55g | **3.57 Vàng/ngày** | Mía thân tím ngọt lịm; ép thành Đường Mía Thô tại trạm chế biến làm nguyên liệu nướng bánh ngọt. |
| **Hắc Cà Rốt Mắt Mèo** (*Shadow Carrot*) | 6 ngày | 1 lần | 35g | 65g | **5.00 Vàng/ngày** | Củ cà rốt vỏ tím ruột cam dạ quang; tăng thị lực trong hang tối hầm mỏ. Trồng được cả Hè và Thu. |
| **Hỏa Khương Rừng Thầm Thì** (*Whisper Ginger*) | 8 ngày | 1 lần | 45g | 85g | **5.00 Vàng/ngày** | Củ gừng cay nồng đậm vị; khử tanh cho món cá nướng bờ suối và nấu canh gừng ấm lòng mùa mưa bão. |
| **Hoa Hướng Dương Vàng** (*Sunflower*) | 8 ngày | 1 lần | 40g | 50g | **~6.25 Vàng/ngày** (kèm hạt rơi) | Khi gặt rơi thêm 1-2 Túi Hạt giống miễn phí (tiết kiệm 40-80g hạt); ép dầu ăn và tặng quà dân làng. |

---

### 🍂 C. Mùa Thu (6 Cây Canh Tác)
| Cây Trồng | Ngày Lớn | Tái Sinh | Giá Hạt | Giá Bán | Lợi Nhuận/Ngày | Ứng Dụng Trong Bếp & Đời Sống |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Bí Ngô Mật Khổng Lồ** (*Sweet Pumpkin*) | 13 ngày | 1 lần | 100g | 260g | **12.31 Vàng/ngày** | Vua kinh tế mùa thu; nấu súp bí đỏ hạt sen ấm, bánh pie nướng lò than; có cơ hội hóa Bí Khổng Lồ 3x3. |
| **Hắc Mạch Đêm Rừng** (*Shadow Rye*) | 5 ngày | 1 lần | 30g | 60g | **6.00 Vàng/ngày** | Ngũ cốc sinh trưởng siêu tốc; xay bột đen nướng bánh mì lúa mạch đen dã chiến cho thợ mỏ. |
| **Nho Đêm Giàn Leo** (*Night Grape*) | 10 ngày | **3 ngày** | 80g | 44g | **8.14 Vàng/ngày** (7 đợt/vụ) | Dây leo cọc giàn trĩu chùm quả tím đen; ủ men thùng gỗ sồi thành Rượu Vang Đêm Oakhaven thượng hạng. |
| **Khoai Lang Nguyệt Quang** (*Moonlight Yam*) | 9 ngày | 1 lần | 45g | 95g | **5.56 Vàng/ngày** | Củ khoai vỏ ánh bạc ruột tím; nướng tro bếp lùi than hồng phục vụ ca tối quán The Hearth. |
| **Oải Hương Đồi Sương** (*Misty Lavender*) | 7 ngày | 1 lần | 35g | 75g | **5.71 Vàng/ngày** | Hoa tím ngát hương triền đồi; sấy khô lót gối phòng trọ lầu 2 và hãm trà thảo mộc ru giấc ngủ. |
| **Củ Mandrake Nhân Sâm** (*Mandrake Root*) | 14 ngày | 1 lần | 100g | 280g | **12.86 Vàng/ngày** | Rễ củ quý hiếm trồng Thu & Đông; hầm gà sâm tăng tối đa kháng cự và sinh mệnh khi đánh Boss. |

---

### ❄️ D. Mùa Đông (6 Cây Canh Tác)
| Cây Trồng | Ngày Lớn | Tái Sinh | Giá Hạt | Giá Bán | Lợi Nhuận/Ngày | Ứng Dụng Trong Bếp & Đời Sống |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Bạch Ngọc Củ Cải** (*Frost Turnip*) | 5 ngày | 1 lần | 25g | 50g | **5.00 Vàng/ngày** | Củ cải trắng muốt giòn tan lớn nhanh trong tuyết; hầm canh xương lợn rừng ấm áp ngày rét buốt. |
| **Bạc Hà Băng Giá** (*Frostmint*) | 6 ngày | 1 lần | 30g | 65g | **5.83 Vàng/ngày** | Lá the mát viền tinh thể băng; pha trà giải cảm mùa đông và chế kẹo the mát cho lữ khách đường xa. |
| **Khoai Tây Tuyết Núi Cao** (*Frost Potato*) | 7 ngày | 1 lần | 45g | 90g | **~8.04 Vàng/ngày** (kèm 25% củ phụ) | Giống khoai đào sâu dưới lớp tuyết dẻo ngọt; nghiền tỏi bơ cho đĩa bít-tết thợ rèn Boris. |
| **Củ Dền Băng Ruby** (*Frost Beet*) | 6 ngày | 1 lần | 40g | 80g | **6.67 Vàng/ngày** | Củ dền tròn đỏ thẫm; cô đặc đường tự nhiên, tạo màu đỏ thắm cho súp borscht và bánh nướng lễ hội. |
| **Rễ Địa Y Băng Giá** (*Lichen Root*) | 8 ngày | 1 lần | 55g | 120g | **8.12 Vàng/ngày** | Rễ thảo mộc cổ sinh bám kẽ đá; nấu nước cao thảo dược bồi bổ thể lực cho thương binh. |
| **Sen Băng Tuyết Ngàn Năm** (*Frost Lotus*) | 12 ngày | 1 lần | 120g | 320g | **16.67 Vàng/ngày** | Hoa sen băng giá trên mặt hồ đóng băng; kỷ lục doanh thu mùa đông, bán cho thương lái phương Bắc. |

---

### 🪵 E. Canh Tác 4 Mùa Đặc Thù (1 Mô Hình)
- **Khúc Gỗ Cấy Nấm Rừng (`crop_mushroom_log`):**
  - Chế tác 1 lần (chi phí 180g gồm Gỗ Mục + Meo Nấm).
  - Thu hoạch đều đặn mỗi **4 ngày quanh năm cả 4 mùa** mà không cần cuốc đất hay tưới nước.
  - Lợi nhuận ròng: **11.25 Vàng/ngày** (thu hoạch 28 đợt/năm = 1,260 Vàng doanh thu ròng).
  - Có 10% đột biến ra Nấm Huỳnh Quang Mỏ Sâu nếu đặt khúc gỗ trong hang tối ẩm.

---

## 3. Danh Mục 14 Cây Thân Gỗ & Vườn Ăn Quả

### 🌲 A. 6 Loài Cây Lâm Nghiệp Lấy Gỗ & Trích Nhựa
Cây phát triển từ hạt con trong 20–30 ngày trên mọi ô đất trống, không cần tưới nước:
1. **Cây Sồi Oakhaven (`tree_oak` - 24d):** Đốn thu 12-16 Gỗ Sồi Già + Củi Khô. Gắn bình trích nhựa thu **Nhựa Sồi Đen Thơm** mỗi 7 ngày (làm Thùng Ủ Men, sửa Cầu Đá).
2. **Cây Thông Dẻo Tuyết Sơn (`tree_pine` - 22d):** Đốn thu 12-16 Gỗ Thông Dẻo. Gắn bình trích nhựa thu **Hắc Nhựa Thông Dẻo** mỗi 5 ngày (chống thấm ghe thuyền, làm Đuốc Hầm Mỏ).
3. **Cây Phong Hoàng Kim (`tree_maple` - 24d):** Đốn thu 10-14 Gỗ Phong Vân Hồng. Gắn bình trích nhựa thu **Siro Phong Hổ Phách** mỗi 9 ngày (làm Bánh Kếp Quán Trọ, bàn ăn VIP).
4. **Cây Bạch Dương Trắng (`tree_birch` - 20d):** Đốn thu 10-14 Gỗ Bạch Dương + Vỏ Cuộn. Trích **Nước Nhựa Bạch Dương** mỗi 6 ngày (đóng Rương Chứa Đồ).
5. **Cây Liễu Gai Thủy Ngạn (`tree_willow` - 22d):** Đốn thu 14-18 Cành Liễu Gai dẻo dai. Trích **Nhựa Liễu Dược Liệu** mỗi 6 ngày (đan Giỏ Bẫy Cá, thuốc hạ sốt).
6. **Cây Thiết Mộc Hắc Ám (`tree_ironwood` - 30d):** Đòi hỏi Rìu Sắt trở lên (16 nhát). Đốn thu 8-12 Gỗ Thiết Mộc cực nặng. Trích **Dầu Thiết Mộc Chống Gỉ** mỗi 10 ngày (gia cố Dầm Mỏ Tầng Sâu).

### 🍎 B. 8 Loài Cây Ăn Quả Lâu Năm ($3\times3$ Không Gian)
Cần 28 ngày lớn từ cây con, 8 ô xung quanh phải hoàn toàn thông thoáng. Khi trưởng thành cho quả mỗi ngày trong mùa tương ứng (28 quả/vụ):
1. **Cây Táo Sồi Mật (`fruit_apple`):** Mùa Thu — Táo đỏ giòn ngọt (**28 Vàng/ngày**); nướng bánh pie và ủ rượu táo men.
2. **Cây Chanh Sét Vàng (`fruit_lemon`):** Mùa Hạ — Quả chua thanh thơm ngát (**35 Vàng/ngày**); pha nước chanh đá dã chiến và làm sốt cá.
3. **Cây Mận Băng Tuyết (`fruit_plum`):** Mùa Đông — Quả tím giòn ngọt chịu rét (**38 Vàng/ngày**); ủ rượu mận hâm nóng mùa đông.
4. **Cây Đào Anh Thảo (`fruit_peach`):** Mùa Xuân — Quả mọng thịt hồng mềm ngọt (**42 Vàng/ngày**); làm bánh mousse đào tráng miệng.
5. **Cây Anh Đào Đỏ Rực (`fruit_cherry`):** Mùa Xuân — Quả đỏ tươi mọng nước (**32 Vàng/ngày**); làm mứt anh đào và bánh tart.
6. **Cây Quả Óc Chó Rừng (`fruit_walnut`):** Mùa Thu — Hạt bùi béo ngậy (**35 Vàng/ngày**); xay hạt béo làm bánh quy dinh dưỡng cho thợ mỏ.
7. **Cây Lê Sương Muối (`fruit_pear`):** Mùa Thu — Lê giòn ngọt đượm sương (**30 Vàng/ngày**); hầm rượu vang lửa than làm dịu cơn ho khan buốt giá.
8. **Cây Cam Lửa Oakhaven (`fruit_orange`):** Mùa Hạ — Cam mọng nước giàu vitamin (**32 Vàng/ngày**); ép nước cam tươi giải nhiệt ca làm việc.

---

## 4. Chiến Lược Canh Tác Hiệu Quả & Chống Bẫy Phá Sản

1. **Vụ Xuân Năm 1:**
   - Dành 60% đất gieo **Lúa Mì Bạc** để có bột mì liên tục nướng bánh cho quán.
   - Trồng ít nhất 1 hàng **Dâu Rừng Mùa Xuân** (hái 8 đợt) và 1 hàng **Đậu Hà Lan Giàn Leo** để có thu nhập thụ động mỗi 3 ngày.
2. **Vụ Hạ:**
   - Gieo **Bắp Ngô Ánh Dương** ngay ngày đầu hè vì ngô sống xuyên suốt 56 ngày qua cả mùa Thu, tiết kiệm tối đa tiền mua hạt giống.
   - Đầu tư cụm $3\times3$ **Dưa Hấu Dung Nham** săn Dưa Hấu Khổng Lồ.
3. **Vụ Thu:**
   - Dồn toàn bộ vốn tích lũy vào **Bí Ngô Mật Khổng Lồ** (lợi nhuận kỷ lục 12.31 Vàng/ngày) để gom tiền mua đồ rèn nâng cấp công cụ trước mùa đông.
4. **Vụ Đông:**
   - Không bị bỏ hoang đất! Gieo **Bạch Ngọc Củ Cải** (5 ngày/vụ) xoay vòng vốn nhanh và đầu tư **Sen Băng Tuyết Ngàn Năm** ven hồ để bùng nổ doanh thu cuối năm.
