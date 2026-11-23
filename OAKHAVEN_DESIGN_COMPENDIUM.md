# Oakhaven Design Compendium: Master Specification (Quán Ăn, Nông Trại & Thám Hiểm)

> **Dự án:** Rowan of Oakhaven  
> **Thể loại:** Dark Pixel Action RPG + Farming & Tavern/Eatery Life-Sim  
> **Engine:** Godot 4.7.2  

---

## 1. Tổng Quan Kiến Trúc Vòng Lặp Trò Chơi (Core Loop)

```mermaid
flowchart TD
    Farm["🌾 NÔNG TRẠI 4 MÙA<br/>(41 loài cây canh tác: 27 hoa màu + 14 thân gỗ, Vòi tưới tự động, Bù nhìn, Ruộng lúa nước)"] --> Kitchen["🍳 BẾP NẤU 55 MÓN<br/>(Buff chiến đấu: Công/Thủ/Tốc/Hồi máu & Cầu siêu)"]
    Mine["⚔️ HẦM MỎ 150 TẦNG THUẦN COMBAT<br/>(Chặt chém quái, Khai thác 5 cấp quặng, Đập geode, Trảm Boss)"] --> Kitchen
    Kitchen --> Tavern["🍻 QUÁN ĂN & PHÒNG TRỌ OAKHAVEN<br/>(Bán mang đi, Bàn ăn tại quán, Cho thuê phòng lầu)"]
    Tavern --> Invest["💰 TÁI THIẾT & ĐẦU TƯ THỊ TRẤN<br/>(Kênh thủy lợi, Cáp treo đỉnh núi, Ga đường sắt, Khế ước thương mại)"]
    Invest --> Farm
    Invest --> Mine
    Mine --> Guild["🛡️ HIỆP HỘI MẠO HIỂM<br/>(Bounty săn quái, Thu hồi trang bị thất lạc Lost & Found)"]
    Guild --> Tavern
```

---

## 2. Hệ Thống HP, Stamina & Cơ Chế Phạt Ngất Xỉu

### 2.1. Thanh Chỉ Số Sinh Mệnh
- **Thanh Thể Lực (Stamina Bar - Khởi điểm 270):** 
  - Mọi thao tác cuốc đất, gieo hạt, tưới nước, đập đá, chặt cây, câu cá tiêu hao Stamina (từ 1 đến 4 điểm tùy cấp công cụ).
  - Khi Stamina chạm 0: Kích hoạt trạng thái **Kiệt Sức (Exhausted)** — tốc độ di chuyển giảm 50%, nhân vật thở dốc, màn hình tối góc.
  - Tiếp tục dùng công cụ khi đang kiệt sức $\rightarrow$ Ngất xỉu ngay lập tức.
- **Thanh Máu (HP Bar - Khởi điểm 100):**
  - Máu giảm khi trúng đòn tấn công của quái vật hoặc bẫy hầm ngục. Chạm 0 $\rightarrow$ Gục ngã tại trận.

### 2.2. Cơ Chế Phạt Ngất Xỉu & Dịch Vụ Thu Hồi Tại Hiệp Hội Mạo Hiểm (Rescue & Lost & Found)
Phân định rõ rệt giữa hai trường hợp kiệt sức trên mặt đất và gục ngã dưới hầm mỏ:

1. **Ngất Xỉu Trên Mặt Đất (Cạn Stamina hoặc quá 02:00 AM):**
   - **Cậu phụ tá Colm** phát hiện và vác cáng khiêng Rowan về giường ngủ tại The Hearth.
   - Bị trừ 10% tiền mặt hiện có (tối đa 1,000g viện phí chi trả cho Trạm Y Tế của **Dược Sĩ Aurelia**).
   - **Bảo toàn trang bị & túi đồ:** Hoàn toàn **KHÔNG mất bất kỳ món đồ nào** trong ba lô hay nông sản vừa thu hoạch.
2. **Gục Ngã Trong Hầm Ngục Mỏ Cổ 150 Tầng (Cạn HP do quái vật hoặc bẫy):**
   - Đội cứu nạn của **Hiệp Hội Mạo Hiểm (dưới quyền Hội Trưởng Thorne)** khẩn cấp kéo Rowan về Trạm Y Tế của **Dược Sĩ Aurelia**.
   - Bị trừ 10% tiền mặt (tối đa 1,000g phí cứu hộ và điều trị).
   - **Mất mát chiến lợi phẩm (Permanent Loss - Mất đồ là mất đồ):** Rơi mất vĩnh viễn toàn bộ quặng thô, đá quý, thịt quái và vật liệu nhặt được trong chuyến đi mỏ hôm đó.
   - **Bảo vệ Trang bị & Công cụ chính (Tools & Weapons Guard):** Vũ khí chính, giáp trụ và nông cụ không bao giờ bị xóa vĩnh viễn, nhưng sẽ bị rơi lại tại hiện trường. Đội tuần tra đưa về bàn **Đồ Thất Lạc (Lost & Found)** của Hiệp Hội Mạo Hiểm do Thorne và Valerie quản lý:
     - Cách 1: **Trả Vàng chuộc đồ:** Chi trả khoản tiền tương ứng với giá trị món đồ.
     - Cách 2: **Đổi Bằng Cơm Hộp Tiếp Tế (Expedition Bento):** Nấu các phần thức ăn dã chiến theo đơn uỷ thác của Hiệp Hội để nhận **Huy Hiệu Cứu Viện** đổi lại vũ khí/công cụ miễn phí.


---

## 3. Không Gian Riêng & Tùy Biến Nhà Của Rowan (Private Quarters)

Rowan sở hữu không gian sống hoàn toàn riêng biệt nằm trên tầng gác mái của quán ăn (hoặc khuôn viên nhà riêng ven suối), tách bạch với khu kinh doanh phục vụ thực khách:

### 3.1. Các Khu Vực Chức Năng Riêng Biệt
1. **Giường Ngủ Cá Nhân (Personal Bed):**
   - Đi ngủ để kết thúc ngày, hồi phục chỉ số và lưu game.
   - Nâng cấp: Giường Rơm $\rightarrow$ Giường Gỗ Sồi $\rightarrow$ Giường Nệm Lông Ngỗng (hồi phục 100% Stamina ngay cả khi hôm trước bị kiệt sức).
2. **Bàn Thử Nghiệm Ẩm Thực R&D (Rowan's Secret Lab Counter):**
   - Nơi Rowan tự do ghép 2 đến 4 nguyên liệu bất kỳ để tự mò ra công thức nấu ăn mới mà không lo làm hỏng nguyên liệu trước mặt khách.
3. **Tủ Đồ Thời Trang & Gương Soi (Wardrobe & Mirror):**
   - Quản lý và thay đổi trang phục: Nón, Áo giáp/Trang phục, Quần, Giày với hiệu ứng thị giác hiển thị trực tiếp lên nhân vật.
4. **Kệ Trưng Bày Chiến Tích & Cổ Vật (Trophy & Relic Showcase):**
   - Nơi cắm các cúp vàng Lễ hội ẩm thực Oakhaven, đầu lâu quái vật tinh anh và cổ vật khai quật từ phế tích.
5. **Hầm Ủ Men & Lên Men Riêng (Private Aging Cellar):**
   - Mở khóa khi nâng cấp nhà cấp 2. Chứa các thùng gỗ sồi ủ phô mai, tương đậu, dấm hoa quả và rượu vang mật ong hảo hạng.

---

## 4. Hệ Thống Hầm Ngục Mỏ Cổ Vô Tận & Chiến Đấu (The Infinite Mine-Dungeon & Action RPG Combat)

> **NGUYÊN TẮC CỐT LÕI:** Hầm mỏ và Dungeon **GỘP LÀM 1 THỂ THỐNG NHẤT** mang tên **Hầm Ngục Mỏ Cổ Vô Tận (The Infinite Mine-Dungeon)**. Đây là **chiến trường sinh tử thuần túy**. Quái vật mang tính thù địch (Hostile), cực kỳ hung dữ và tấn công lập tức khi thấy người chơi. **Tuyệt đối không có cơ chế xoa dịu hay dâng đồ ăn cho quái vật trong hầm ngục.** 
> Thức ăn 55 món được sử dụng làm **buff chỉ số chiến đấu cho chính Rowan** (Công, Thủ, Tốc độ, Kháng nguyên tố, Hồi máu tức thì) để tiêu diệt kẻ thù!

### 4.1. Cơ Chế Chinh Phục Hầm Mỏ (Soul-Knight Style Dungeon Flow & Endless Abyss)
- **Cấu Trúc Hầm Ngục Thống Nhất:**
  - **Tầng 1–150 (Chiến Dịch Cốt Truyện):** Chia làm 4 đới địa chất chính nối tiếp nhau. Mỗi tầng bao gồm các phòng hang kết nối qua cửa đá phong ấn.
  - **Tầng 151+ (Vực Thẳm Vô Tận - The Infinite Abyss):** Không giới hạn tầng mỏ (Endless), độ khó tăng tiến liên tục, quái vật đột biến tinh anh mang thuộc tính ngẫu nhiên, tỉ lệ rơi quặng hiếm và ngọc tinh linh tối thượng cao nhất dành cho lối chơi hardcore endgame.
- **Dọn sạch phòng:** Bước vào phòng đá, cửa sau lập tức khóa chặt $\rightarrow$ Tiêu diệt toàn bộ quái vật trong phòng để cửa thông tầng tiếp theo mở ra và nhận rương tài nguyên.
- **Quy Tắc Sinh Tử — "Mất Đồ Là Mất Đồ" (Permanent Loss on Defeat):**
  - Khi Rowan kiệt sức (HP = 0) trong hầm mỏ: Cậu phụ tá Colm dùng cáng kéo Rowan về Trạm Xá để bảo toàn tính mạng (tránh permadeath/xóa file save).
  - Người chơi bị trừ tiền viện phí cấp cứu điều trị chấn thương.
  - **Toàn bộ khoáng sản, vật phẩm và chiến lợi phẩm thu thập trong lượt thám hiểm đó rơi lại dưới lòng đất và MẤT VĨNH VIỄN.**
  - **Tuyệt đối không có cơ chế cứu hộ miễn phí 100%, không giảm giá chuộc đồ, không giữ an toàn hành trang.** Người chơi phải luôn tính toán lượng máu và chủ động dùng Dây Thừng Thoát Hiểm (Escape Rope) hoặc Cửa Dịch Chuyển để rút lui an toàn.
- **Quy Tắc Cư Dân Mặt Đất & Chạm Trán Ngẫu Nhiên Trong Mỏ (Surface-Only NPCs & Mine Encounters):**
  - **100% NPC đều sinh sống cố định tại thị trấn, điền trang hoặc các lán trại trên MẶT ĐẤT.** Không có NPC nào dựng lều định cư lâu dài trong hầm ngục.
  - **Chạm trán ngẫu nhiên:** Trong quá trình đào mỏ, Rowan thỉnh thoảng có thể bắt gặp một số NPC đang làm công việc dã ngoại ngắn hạn (Bram đang gõ mạch quặng sâu, Lão Gomer thử nghiệm mìn phá đá, Thợ lặn Vael khảo sát hồ nước ngầm, Hiệp sĩ Hester tìm nhặt mảnh thép vụn, Hội trưởng Thorne thị sát phong ấn). Đây là các sự kiện chạm trán gia tăng chiều sâu thế giới (flavor encounters), không biến hầm mỏ thành khu dân cư.
- **Chiến Đấu Nhịp Độ Nhanh (Hack & Slash):**
  - Kết hợp vung vũ khí cận chiến (Kiếm chém nhanh 3 nhịp, Liềm quét hình bán nguyệt rộng AoE, Búa tạ đập chấn động vỡ giáp).
  - Tấn công tầm xa bằng Pháp trượng ma thuật hoặc ném Bom lửa.
  - Phím `Space` Lướt né (Dash) có khung bất tử (i-frames) để tránh đòn quét diện rộng của quái vật.
- **Đèn Lồng Bão Đom Đóm (Spirit Lantern):**
  - Chiếu sáng các căn phòng tối đen như mực.
  - Một số quái vật ẩn mình trong bóng đêm chỉ có thể bị phát hiện và dính sát thương khi bước vào quầng sáng của Đèn Lồng.

### 4.2. Danh Mục 4 Đới Địa Chất & Quái Vật Hậu Chiến (100% Non-Food Drops)

> **QUY TẮC CHIẾN LỢI PHẨM (100% NON-FOOD):** Toàn bộ thực phẩm nấu 55 món tại *The Hearth* đến từ nông nghiệp mặt đất (41 loài cây canh tác, cá suối, chăn nuôi). Quái vật hầm mỏ **100% chỉ rơi vật phẩm rèn đúc (Combat 40%), công cụ khám phá mỏ (Exploration 30%), và vật tư tự động hóa/phân bón nông trại (Farming & Automation 30%)**.

| Đới Địa Chất & Tầng | Tên Quái Vật & ID | Ngoại Hình & Visual Tells | Khắc Chế & Lợi Thế (+25% đến +40%) | Chiến Lợi Phẩm 100% Non-Food (Combat / Explore / Farm) |
|:---|:---|:---|:---|:---|
| **Đới 1: Đầm Than Bùn & Mỏ Đồng Cũ**<br/>*(Tầng 1–30)*<br/>*Biomes: Mỏ Ngập Nước (1-10), Chiến Hào Bỏ Hoang (11-20), Hầm Chỉ Huy Sập (21-29)* | **Slime Bùn Axit**<br/>*(slime_mud_acid)* | Bán trong suốt, lõi vàng xanh phát sáng, bề mặt sủi bọt axit, để vệt bùn trơn trượt. | Liềm chém quét diện rộng dọn dẹp phân thân lập tức (+30%). | • Dịch nhầy axit (nấu chất tẩy rỉ Boris)<br/>• Quặng Đồng Thô<br/>• Bùn khoáng giàu đạm (ủ đất nông trại) |
| | **Bọ Mai Đồng**<br/>*(beast_copper_beetle)* | Bọ mai kim loại đồng phủ rêu, giáp lưng cứng, bụng mềm, mặt đất rung trước khi trồi. | Búa Tạ đập lật ngửa bụng lộ điểm yếu nhận x2 DMG. | • Mảnh Vỏ Mai Đồng (rèn giáp cấp 1)<br/>• Quặng Đồng<br/>• Bột vỏ bọ (kích rễ mầm cây) |
| | **Dơi Mỏ Đui Mù**<br/>*(beast_blind_bat)* | Cánh màng lớn rách rưới, mắt mờ đục thoái hóa, định vị sóng âm làm rung màn hình. | Kiếm chém đón đầu nhịp bổ; Đèn Lồng xua quầng bay. | • Màng Cánh Dơi Dai (may ba lô dã ngoại)<br/>• Xương cánh (chế tên nỏ) |
| | **Thợ Mỏ Xương Cầm Cuốc**<br/>*(skel_miner_pick)* | Bộ xương mặc áo thợ mỏ cũ, mũ gắn đèn hỏng, vác cuốc chim gãy, chuyển động nặng nề. | Lướt né ra sau lưng trảm kích khi cuốc bổ kẹt sàn đá. | • Đầu Cuốc Chim Rỉ Sét (Boris tái chế thỏi đồng)<br/>• Bột Xương Hang Mỏ (+30% tỷ lệ sao nông sản) |
| | **Chuột Chũi Đào Hầm**<br/>*(beast_trench_mole)* | Chuột hang thân thấp chắc khỏe, móng vuốt xẻng sắt, gò đất đùn lên trước khi phục kích. | Đặt bom nổ ngay điểm đất nứt; Búa Tạ nện chấn động. | • Móng Vuốt Xẻng Đào (chế xẻng nâng cấp đất)<br/>• Da chuột thuộc bền bỉ |
| | **Xác Binh Sĩ Sa Lầy**<br/>*(undead_trench_walker)* | Quân phục rách nát, giáp sắt hoen rỉ bọc bùn, lao tới ghì ôm khống chế người chơi 1.5s. | Lướt né cú ôm; Liềm chém quét đứt khớp chân. | • Huy Hiệu Binh Sĩ Cũ (cầu siêu Bàn Thờ Cổ Đại)<br/>• Mảnh Giáp Sắt Rỉ Sét<br/>• Dây đai quân dụng |
| | **Bù Nhìn Thép Rỉ**<br/>*(armor_scrap_dummy)* | Cỗ máy tập trận cũ ghép sắt cọc gỗ, lõi máy cũ, rung lắc phát tiếng kim loại rồi xoay 360°. | Parry nhịp xoay làm gãy chốt; Búa Tạ đập vỡ khung. | • Bánh Răng Rỉ Sét (chế vòi tưới đồng)<br/>• Cọc Sắt Gia Cố (hàng rào chuồng trại) |
| **Đới 2: Lò Luyện Cổ Khaz-Drakor**<br/>*(Tầng 31–70)*<br/>*Biomes: Đường Hầm Nham Thạch (31-40), Chuyển Quặng Từ Tính (41-50), Xưởng Đúc Cơ Khí (51-60), Hồ Luyện Kim (61-69)* | **Slime Nham Thạch Nóng**<br/>*(slime_magma)* | Magma bán đông kẹp vảy basalt đen, để vệt than hồng, chết phát nổ miểng xỉ 3x3 ô. | Vũ khí khảm Hàn Tinh (Frost Shard) dập lửa làm đông cứng vỏ. | • Mảnh Đá Basalt Nguội (rèn giáp chịu nhiệt)<br/>• Than Cốc Lò Luyện<br/>• Quặng Sắt |
| | **Ốc Sên Vỏ Nam Châm**<br/>*(beast_magnet_snail)* | Vỏ quặng từ tính phát sáng xanh lam, vụn sắt xoay quanh, phát xung từ trường hút vũ khí. | Đổi sang vũ khí gỗ/phép trượng; Lướt ngược lực hút. | • Quặng Từ Tính Lodestone (chế Nhẫn Hút Vật Phẩm)<br/>• Vỏ ốc siêu cứng (rèn khiên) |
| | **Nhện Tơ Lửa Dung Nham**<br/>*(beast_magma_spider)* | Giáp đen chịu nhiệt, bụng than hồng, chân gai nhọn, giăng mạng tơ lửa cam đỏ giữ chân. | Vũ khí Hàn Tinh chém đứt tơ; Búa nện vỡ bụng. | • Tơ Nhện Chống Cháy (bao tay chịu nhiệt)<br/>• Tuyến Lửa Magma |
| | **Khiên Binh Xương Bọc Sắt**<br/>*(skel_ironclad_shield)* | Khung xương lùn cổ bọc giáp sắt nặng, đại khiên thép chặn 100% sát thương trực diện. | Lướt vòng sau lưng trảm khớp gối; Búa đập vỡ khiên. | • Tấm Khiên Thép Cổ (Boris rèn khiên cấp 2)<br/>• Thỏi Sắt Khaz-Drakor<br/>• Bột Xương Cổ |
| | **Người Máy Lò Hơi Cổ**<br/>*(automaton_boiler_bot)* | Thiết bị tự động 3 chân kim loại, nồi áp suất lưng, xả luồng hơi nước áp suất cao hình nón. | Lướt né luồng hơi, chọc thủng nồi hơi sau lưng khi mở van. | • Bánh Răng Đồng Thau Lò Hơi (máy bơm thủy lợi)<br/>• Ống Đồng Áp Suất |
| | **Lính Cháy Than Ôm Bom**<br/>*(undead_bomb_runner)* | Thi thể thợ mỏ hóa than đen cháy đỏ, ôm bình hỏa dược chạy dốc lao tới rồi tự kích nổ. | Bắn nỏ từ xa kích nổ bom trước khi tiếp cận. | • Mảnh Bình Thuốc Nổ Đen (chế mìn phá đá)<br/>• Than Hoạt Tính Khử Độc |
| | **Mimic Rương Sắt Cổ**<br/>*(mimic_iron)* | Hòm khai khoáng cơ khí nẹp đinh tán, hé mắt thở phì phò, miệng răng cưa sắt bén ngót. | Quan sát khe nắp hòm thở; Búa Tạ nện đòn phủ đầu. | • Bản Lề Thép Chế Tác Boris<br/>• Quặng Sắt Tinh Khiết<br/>• Đá Quý Thô (Hồng Ngọc/Lam Ngọc) |
| **Đới 3: Hang Rễ Sâu & Rừng Nấm**<br/>*(Tầng 71–110)*<br/>*Biomes: Rừng Nấm Dạ Quang (71-80), Mê Cung Rễ Cây (81-90), Nghĩa Địa Rễ Ma (91-100), Thân Cây Cổ Thần (101-109)* | **Slime Bào Tử Độc Tím**<br/>*(slime_toxic_spore)* | Khối gelatin tím mọc nấm sống trên lưng, trườn xả vòng khói độc rút máu, chết mọc nấm bẫy. | Vũ khí khảm Hỏa Tinh hoặc ném Bom Lửa thiêu rụi bào tử. | • Bào Tử Phát Quang Tím (pha thuốc nhuộm/đèn)<br/>• Mùn Nấm Hoạt Tính (tăng tốc độ ủ men) |
| | **Cây Ăn Thịt Rễ Gai**<br/>*(plant_briar_carnivore)* | Miệng hoa răng sắc ẩn dưới rêu ngầm, rễ bò dưới đất trồi lên trói chân kéo vào miệng hoa. | Chặt đứt rễ chính bằng Liềm Runic; Lướt ra khỏi vùng nứt. | • Dây Leo Gai Dai Dẻo (chế dây thừng giếng)<br/>• Nhựa Cây Bắt Mồi (bảo vệ chuồng gia súc) |
| | **Bướm Đêm Phát Quang**<br/>*(beast_luminescent_moth)* | Cánh lớn hoa văn mắt xanh ngọc, rải phấn dạ quang ru ngủ và làm mờ tầm nhìn vừa phải. | Đèn Lồng Đom Đóm hút hướng bay; Nỏ bắn tầm xa. | • Phấn Cánh Phát Quang (bột huỳnh quang soi mỏ)<br/>• Tơ tằm đêm thượng hạng |
| | **Cung Thủ Xương Brier**<br/>*(skel_briar_archer)* | Bộ xương bị rễ gai quấn chặt, cầm trường cung rễ hóa thạch, bắn tỉa tên gai tẩm độc từ xa. | Áp sát né tầm ngắm; Kiếm chém đứt dây cung. | • Cành Gỗ Rễ Hóa Thạch (chế cần câu cao cấp)<br/>• Mũi Tên Gai Rừng<br/>• Quặng Vàng |
| | **Oán Hồn Hang Sâu Banshee**<br/>*(undead_depth_banshee)* | Vong linh bán trong suốt, tóc trôi như khói tím, tụ sóng âm phát sáng vòng tròn 1.0s rồi thét choáng. | Rọi Đèn Lồng xua tan thể sương; Parry nhịp sóng âm. | • Dải Khăn Vong Linh Cổ (cầu siêu Bàn Thờ Cổ Đại)<br/>• Tinh Thể Lệ Hồn (khảm ngọc kháng phép) |
| | **Kỵ Sĩ Xương Cưỡi Rết**<br/>*(skel_centipede_knight)* | Rết đá 20 đốt bò trườn vách hang chuyển động liên tục từng đốt, kỵ sĩ cầm thương bổ nhào. | Búa đập vỡ giáp đốt rết hất kỵ sĩ ngã xuống đất. | • Vảy Giáp Đốt Rết Đá (rèn giáp Bậc 4)<br/>• Mũi Thương Cổ Rỉ Sét<br/>• Quặng Vàng |
| | **Bọ Giáp Tinh Thể Vàng**<br/>*(beast_gold_crystal_beetle)* | Mai cấu tạo từ các phiến tinh thể vàng lục giác, cuộn tròn lăn tông cực nhanh va đập tường. | Đặt bom/Búa Tạ chặn đường lăn gây lật ngửa. | • Tinh Thể Vàng Nguyên Khối (bán cho Boris)<br/>• Quặng Vàng Thô<br/>• Bột mài kim hoàn |
| **Đới 4: Vực Cổ Vật & Cổ Thành Solaria**<br/>*(Tầng 111–150)*<br/>*Biomes: Ngoại Thành Chìm (111-120), Thư Viện Cổ Solaria (121-130), Vực Vết Nứt Hư Không (131-140), Cung Điện Niêm Phong (141-149)* | **Slime Hư Không Tinh Thể**<br/>*(slime_void_crystal)* | Tinh thể pha lê tím lam nhiều mặt cắt khúc xạ, hấp thụ phép rồi phản lại tia laser tím thẳng. | Búa Tạ đập vỡ góc tinh thể trước khi tích đủ năng lượng. | • Mảnh Pha Lê Hư Không (Vòi Tưới Hư Không 24 ô)<br/>• Quặng Mithril<br/>• Bột Huỳnh Quang Tinh Thể |
| | **Sách Cổ Phản Phệ**<br/>*(grimoire_ancient_backfire)* | Sách da thuộc khắc chữ rune, gáy mở hàm răng nhọn, lật trang phóng ký tự ma thuật bay. | Chém kiếm trúng gáy sách khi đang lật trang; Nỏ lửa. | • Mảnh Giấy Da Cổ Ngữ (công thức rèn cổ vật Boris)<br/>• Bìa Da Thuộc Solaria |
| | **Gargoyle Xương Hóa Đá**<br/>*(gargoyle_stone_skeletal)* | Dực quỷ cẩm thạch pha xương; **Nhìn trực diện = Hóa đá bất tử; Quay lưng = Bổ cào**. | Lừa góc nhìn, nấp sau cột đá rồi lướt vòng sau lưng đánh gáy. | • Đá Cẩm Thạch Solaria (lát sàn quảng trường quán)<br/>• Mảnh Cánh Đá |
| | **Pháp Sư Xương Hư Không**<br/>*(skel_void_mage)* | Áo choàng tím rách, trượng nạm tinh thể, vẽ vòng ma thuật triệu hồi bầy xương và dựng khiên. | Ưu tiên tiêu diệt đầu tiên; Đập vỡ trượng ngắt phép. | • Trượng Ma Thuật Gãy (chiết xuất Thỏi Mithril)<br/>• Quặng Hư Không Thô<br/>• Đá Thạch Anh Tím |
| | **Bộ Giáp Hoàng Gia Rỗng**<br/>*(armor_empty_royal)* | Giáp cẩm thạch trắng viền bạc, đại kiếm lơ lửng, bên trong rỗng, chém 3 nhịp rộng. | Parry nhát chém thứ 2 làm vỡ liên kết ma thuật rơi giáp. | • Phiến Giáp Cẩm Thạch Trắng (rèn giáp Bậc 5)<br/>• Chuôi Kiếm Hoàng Gia |
| | **Kỵ Sĩ Tử Thần Hư Không**<br/>*(undead_death_cavalier)* | Cưỡi ngựa xương bán trong suốt, hạ thấp thương 1.2s phi nước đại đâm xuyên khiên. | Lướt né vuông góc vào khoảnh khắc phi ngựa; Chặt chân ngựa. | • Móng Ngựa Bạc Hóa Thạch (móng ngựa tăng tốc chạy)<br/>• Vải Liệm Hoàng Gia |
| | **Mimic Hoàng Kim Vương Giả**<br/>*(mimic_gilded_royal)* | Rương hoàng gia dát vàng nạm hồng ngọc, càng kim loại lớn vươn ra xoay lưỡi cưa kim cương. | Quan sát vệt sáng đỏ ổ khóa; Đặt bom nổ phá bản lề. | • Khóa Vàng Vương Triều (Boris mở khóa rương báu)<br/>• Vàng Thỏi Nguyên Chất<br/>• Kim Cương Thô |
| | **Bản Sao Hư Không Rowan**<br/>*(mirror_void_rowan)* | Tàn ảnh giống hệt Rowan, viền tím, cử động giật nhẹ, sao chép vũ khí, combo và thói quen né. | Đổi sang vũ khí phụ đột ngột phá vỡ chuỗi combo sao chép. | • Mảnh Gương Vực Thẳm (chế Nhẫn Phản Đòn Tối Thượng)<br/>• Bụi Không Gian |
| **Vực Thẳm Vô Tận**<br/>*(Tầng 151+ Endless Abyss)* | **Vua Slime Vô Định Hình**<br/>*(slime_amorphous_king)* | Kích thước 3x3 ô, luân chuyển 4 thể: Bùn lầy dính chân, Magma bắn sao băng, Bào tử mù, Tinh thể laser. | Đọc nhịp chuyển màu lõi 2s trước khi đổi thể để hoán đổi vũ khí. | • Tinh Thể Tứ Nguyên Tố Cổ (Vũ khí Bậc 6)<br/>• Lõi Năng Lượng Bất Diệt<br/>• Mảnh Cầu Vồng (Prismatic Shard) |
| | **Cự Trùng Vết Nứt Hư Không**<br/>*(beast_void_rift_worm)* | Sâu không gian nhiều đốt vảy đen tím, miệng xoáy hút nuốt cả phòng đấu trường. | Quan sát hướng đá bị hút; Ném bom vào miệng xoáy gây choáng 3s. | • Răng Kim Cương Vực Thẳm (Mũi Khoan Vô Tận)<br/>• Quặng Hư Không Tinh Khiết |

### 4.3. Đấu Trường 4 Đại Thủ Vệ (Warden Boss Fights) & Lore Khaz-Drakor - Solaria

> **MỐI LIÊN HỆ LỊCH SỬ KHAZ-DRAKOR & SOLARIA:** Trong cuộc chiến cổ đại ngăn Vết Nứt Hư Không tràn lên mặt đất, Vương quốc Luyện Kim Khaz-Drakor (Đới 2) và Vương Triều Pháp Thuật Solaria (Đới 4) đã kết liên minh chế tạo Cổ Đai Niêm Phong. Vị Tướng Soái Vĩ Đại nhất của Khaz-Drakor đã tình nguyện ở lại tâm chấn Cung Điện Solaria, dung hợp thể xác sắt đá với Lõi Phong Ấn để canh giữ miệng vực vĩnh viễn. Năng lượng hư không qua thiên niên kỷ biến đổi đại kiếm của ngài thành kiếm pha lê nứt tím, biến ngài thành bức tường thành thử thách cuối cùng trước cánh cổng Endless Abyss.

- **Tầng 30: Golem Hơi Nước Chiến Hào (The Steam Colossus)**
  - *Hình tượng:* Cỗ máy chiến tranh khai khoáng khổng lồ bọc giáp sắt rỉ sét, 1 tay cưa công nghiệp quay tóe lửa, 1 tay búa thủy lực đập sàn. Sau lưng là nồi hơi lớn với 3 van xả áp suất phát sáng đỏ cam rung bần bật.
  - *Cơ chế:* Quét cưa 180° và nện búa sập đá trần hang. Sau mỗi chuỗi 3 đòn, Golem dừng lại 2.5s xả hơi qua van lưng $\rightarrow$ Rowan lướt ra sau chém thẳng vào Lõi Nồi Hơi (nhận x2.5 DMG). Dưới 20% HP kích hoạt **Meltdown Mode**: nổ tung giáp ngực lộ lò xoay đỏ rực, tốc độ tăng 30%, để lại vệt than hồng.
  - *Chiến lợi phẩm 100% Non-Food:* `Bánh Răng Khổng Lồ Khaz-Drakor` (nâng cấp Bếp Than Cấp 2), `Van Áp Suất Hoàn Hảo` (chế Vòi Tưới Tự Động), `Quặng Đồng Tinh Chất` x15.
- **Tầng 70: Hỏa Long Hồ Đúc Khaz-Drakor (The Magma Forge Dragon)**
  - *Hình tượng:* Rồng dung nham sống ngập mình trong hồ quặng nóng chảy. Vảy cấu tạo từ đá basalt đen kẹp dải magma đỏ rực, cổ và ngực bọc giáp quặng sắt nóng chảy bám dính.
  - *Cơ chế:* Bơi lặn dưới hồ xỉ kim loại, mặt hồ sủi bọt báo trước vị trí trồi lên quét sóng dung nham ngang bệ đá; phun 3 cầu lửa diện rộng. Dưới 30% HP, rồng quất đuôi làm sập bệ đá basalt, vảy lưng nứt toác để lộ khe thịt đỏ rực điểm yếu cho Rowan dồn đòn trảm quyết.
  - *Chiến lợi phẩm 100% Non-Food:* `Mảnh Vảy Hỏa Long Basalt` (rèn Giáp Hỏa Long kháng dung nham), `Túi Mỡ Lửa Cổ Sinh` (chế Đèn Bão Mỡ Rồng soi sáng x3), `Thỏi Sắt Khaz-Drakor` x20.
- **Tầng 110: Mộc Thần Rễ Treo Cổ (The Hanged Root God)**
  - *Hình tượng:* Cổ thụ khổng lồ cắm rễ nuốt chửng nghĩa trang cổ ngầm, thân vặn xoắn hiện những khuôn mặt rên rỉ mờ ảo, cành buông thõng rễ gai thòng lọng bao quanh bia mộ chiến sĩ.
  - *Cơ chế:* Rễ trồi xiên cọc nhọn theo vết nứt đất rêu; cành rễ quét ngang sàn đấu buộc lướt né i-Frames; hoa trần hang nhả phấn mờ tầm nhìn còn bán kính 3 ô. Dưới 35% HP, thân cây nứt toác để lộ Lõi Gỗ Thiêng phát sáng ngọc lục bảo $\rightarrow$ người chơi tập trung chém thẳng vào Lõi Thần Mộc.
  - *Chiến lợi phẩm 100% Non-Food:* `Lõi Gỗ Thiêng Runic Khổng Lồ` (Boris chế Bàn Nâng Cấp Nông Cụ Thần Thoại), `Nhựa Cây Hóa Thạch Ngàn Năm` (Thùng Ủ Men Thượng Hạng), `Thỏi Vàng Khắc Cổ Ngữ` x15.
- **Tầng 150: Tướng Soái Phong Ấn Khaz-Drakor (The Sealed Warden)**
  - *Hình tượng:* Vị tướng lùn huyền thoại bọc giáp cẩm thạch trắng nẹp hợp kim Khaz-Drakor, mũ giáp bọc kín chỉ lộ ánh tím hư không, tay cầm Đại Kiếm Pha Lê nứt nẻ phát ra sóng xung kích tím.
  - *Cơ chế 3 Phase:*
    - *Phase 1:* Nghệ thuật đại kiếm cận chiến rộng 2 nhịp; Parry nhịp 2 làm khựng 1.5s.
    - *Phase 2:* Cắm kiếm xuống sàn tạo 3 lốc xoáy hư không và lực hút trọng lực kéo người chơi; Rowan phải nấp sau cột cẩm thạch.
    - *Phase 3 (Dưới 30% HP):* Phân thân thành Thể Chính + 2 Tàn Ảnh Hư Không cùng lao trảm. **Dấu hiệu nhận biết:** Thể chính có bóng đổ trên sàn cẩm thạch và để lại vệt nứt năng lượng phát sáng tím dưới chân; chém trúng thể chính lập tức giải trừ 2 tàn ảnh.
  - *Chiến lợi phẩm 100% Non-Food:* `Trái Tim Cổ Ngữ Khaz-Drakor` (Mở khóa Vực Thẳm Vô Tận Endless Abyss Tầng 151+), `Bản Vẽ Vũ Khí Tối Thượng Solaria` (rèn Vũ khí Bậc 6), `Thỏi Quặng Hư Không Tinh Khiết` x10, `Mảnh Cầu Vồng` (Prismatic Shard).

---

## 5. Hệ Thống Khoáng Sản, Quặng & Khảm Ngọc Vĩnh Viễn

### 5.1. 5 Cấp Bậc Quặng & Kim Loại
1. **Quặng Đồng (Copper Ore) & Thỏi Đồng:** Tầng 1–30. Rèn trang bị cấp 1, Nồi nấu, Vòi tưới 4 ô.
2. **Quặng Sắt (Iron Ore) & Thỏi Sắt:** Tầng 31–70. Rèn trang bị cấp 2, Bếp nướng, Vòi tưới 8 ô.
3. **Quặng Vàng (Gold Ore) & Thỏi Vàng:** Tầng 71–110. Chế tạo máy móc tự động, Vòi tưới cao cấp, Đồ trang sức.
4. **Quặng Mithril (Mithril Ore) & Thỏi Mithril:** Tầng 111–140. Kim loại nhẹ sắc bén, kháng phép thuật.
5. **Quặng Hư Không (Void Ore) & Thỏi Void:** Tầng 141–150+. Rèn vũ khí tối thượng Bậc 6 và Vòi tưới 24 ô.

### 5.2. Đá Quý & Trứng Khoáng Thạch (Geodes)
- **Trứng Khoáng Thạch (Geode):** Thu thập khi đập đá hầm mỏ (Geode Thường, Geode Băng & Lửa, Geode Tinh Thể, Geode Hư Không). Mang đến Lò rèn Boris đập (25g/lần) để mở khóa cổ vật, đá quý và muối khoáng ẩm thực.
- **Đá Quý:** Hồng Ngọc, Lam Ngọc, Ngọc Lục Bảo, Hoàng Ngọc, Thạch Anh Tím, Kim Cương, Mảnh Cầu Vồng (Prismatic Shard).

### 5.3. 5 Loại Ngọc Tinh Linh Khảm Vĩnh Viễn (Soul Essences)
- **Quy tắc tuyệt đối:** **Đã khảm là vĩnh viễn, không thể tháo rời** (để tránh rườm rà tiểu tiết). Muốn dùng ngọc khác cần rèn vũ khí mới!
  - **Hỏa Tinh (Pyre Ember):** Vũ khí gây thiêu đốt 5 giây; Giáp tăng kháng lửa dung nham.
  - **Hàn Tinh (Frost Shard):** Vũ khí làm chậm quái 35%; Giày miễn nhiễm trơn trượt trên băng/bùn.
  - **Lôi Tinh (Volt Spark):** Đòn đánh có 20% giật sét lan sang 3 quái vật lân cận.
  - **Huyết Tinh (Vampiric Leech):** Hồi 3% sát thương gây ra thành máu (HP) khi đánh chí mạng.
  - **Hộ Mệnh Tinh (Aegis Core):** Tạo 1 lớp khiên chắn miễn nhiễm hoàn toàn 1 đòn chí mạng đầu tiên mỗi khi vào phòng mới.

---

## 6. Mở Rộng Bản Đồ Thế Giới: Độc Bản Oakhaven (Không Rập Khuôn Stardew)

Thế giới game mở rộng dựa trên **Khôi Phục Đại Công Trình Thủy Lợi, Giao Thương Xuyên Lục Địa & Đại Lễ Hội Ẩm Thực**:

| Đại Công Trình Oakhaven | Tài Nguyên Tái Thiết | Cơ Chế Mở Khóa Độc Bản & Vùng Đất Mới |
|:---|:---|:---|
| **1. Kênh Thủy Lợi Thượng Nguồn & Bánh Xe Nước** *(Highland Aqueduct)* | 300 Gỗ Sồi, 40 Thỏi Sắt, 10 Bánh Răng Cổ, 3,000g | Khơi thông cống ngầm cổ đại, đưa nước ngọt về thung lũng. Mở khóa **Ruộng Bậc Thang Trồng Lúa Nước (Rice Paddies)** vụ Hè-Thu, hồ thả cá nước ngọt và tuyến chèo thuyền nan xuôi dòng. |
| **2. Cây Thần Ngàn Năm & Đại Lễ Tẩy Trần** *(The Sacred Elder Grove)* | Nấu 5 Món Đại Tiệc Tẩy Trần cho Dân Làng & Bàn Thờ Cổ | Tổ chức Lễ Hội Ẩm Thực tại quảng trường, dâng 5 món đại tiệc thanh lọc khói sương chướng khí tích tụ sau chiến tranh. Xua tan sương mù tím độc, mở ra **Khu Rừng Thần Thảo Mộc** chứa cây giống vĩnh cửu và đàn ong rừng mật sao. |
| **3. Tuyến Cáp Treo Mỏ Khai Nguyên** *(The Ancient Sky-Tram)* | 50 Cáp Thép, 4 Lõi Năng Lượng Cổ, 20 Thỏi Vàng, 8,000g | Kích hoạt buồng cáp treo hơi nước vượt qua Vực Thẳm Không Đáy. Mở khóa **Đỉnh Núi Răng Sói (Wolf-Fang Peak)** — nơi có quặng Bụi Sao lộ thiên, khu suối nước nóng ngâm mình hồi đầy Stamina và thảo mộc băng tuyết. |
| **4. Tuyến Đường Sắt Trung Tâm Oakhaven** *(The Central Rail Line)* | 100 Thanh Ray Thép, 50 Thỏi Vàng, Ký Hợp Đồng Cung Cấp Lương Thực | **Không phải xe dịch chuyển!** Tàu hỏa mang các **Đoàn khách du lịch, Quý tộc đại lục, Đầu bếp quốc tế và Thương gia xa** tới Oakhaven vào mỗi cuối tuần. Làm bùng nổ nhu cầu thuê phòng trọ tầng 2 và ăn uống tại quán. |
| **5. Cổ Đô Cấm Địa Lòng Đất** *(Sunken Necropolis - Hậu Tầng 150)* | 4 Món Ăn Tinh Tế Đặt Lên 4 Bệ Thờ Tứ Nguyên Tố | Phá vỡ phong ấn cổ xưa dưới đáy mỏ. Mở ra **Hầm Ngục Vô Tận Đổi Mới Hàng Tuần**, chứa các căn bếp thất truyền của nền văn minh cổ, boss thần thoại và trang bị truyền thuyết. |

---

## 7. Nông Trại 41 Loài Thực Vật Canh Tác (27 Hoa Màu + 14 Cây Gỗ) & Tự Động Hóa

### 7.1. Phân Bổ 27 Hoa Màu Theo Vụ (Seasonal Field Crops)
Chu kỳ canh tác: Cuốc đất $\rightarrow$ Gieo hạt $\rightarrow$ Tưới nước mỗi sáng $\rightarrow$ Thu hoạch. Cây không được tưới sẽ ngừng lớn nhưng không bị khô héo.

1. **Mùa Xuân (7 cây):**
   - **Lúa Mì Bạc (`crop_silver_wheat` - 4 ngày):** Giá hạt 15g, bán 30g (**3.75 Vàng/ngày**). Xay bột mì tươi làm bánh mì dã chiến. Trồng được cả Xuân, Hạ, Thu.
   - **Bắp Cải Băng (`crop_ice_cabbage` - 6 ngày):** Giá hạt 35g, bán 55g (**3.33 Vàng/ngày**). Lá giòn ngọt mát; nấu súp thanh vị và muối chua dự trữ đông.
   - **Dâu Rừng Mùa Xuân (`crop_spring_wildberry` - 7 ngày, tái sinh 3 ngày):** Giá hạt 60g, bán 35g (**7.86 Vàng/ngày**, 8 đợt/vụ). Quả mọng đỏ ngọt thanh; làm mứt và bánh nướng.
   - **Đậu Hà Lan Giàn Leo (`crop_pea_trellis` - 10 ngày, tái sinh 3 ngày):** Giá hạt 60g, bán 30g (**5.36 Vàng/ngày**, 7 đợt/vụ). Dây leo cọc giàn (không đi xuyên qua được); hạt ngọt bùi cho món cơm rang.
   - **Búp Trà Sen Oakhaven (`crop_sen_tea` - 12 ngày, tái sinh 4 ngày):** Giá hạt 40g, bán 25g (**3.04 Vàng/ngày**, 5 đợt/mùa). Sprout suốt Xuân & Hạ; đọt non xao khô pha trà an thần phục hồi Stamina.
   - **Hoa Cúc Mặt Trời (`crop_sun_daisy` - 5 ngày):** Giá hạt 20g, bán 38g (**3.60 Vàng/ngày**). Hãm trà cúc mật ong hạ hỏa và làm thuốc nhuộm vải rèm.
   - **Đậu Thao Thức Cổ Sinh (`crop_sopophorous_bean` - 11 ngày, tái sinh 3 ngày):** Giá hạt 90g, bán 50g (**13.81 Vàng/ngày**, xuyên 3 mùa Xuân-Hạ-Thu, 25 đợt). Tinh dầu chống ngủ gục khi đi mỏ đêm.

2. **Mùa Hạ (7 cây):**
   - **Bắp Ngô Ánh Dương (`crop_sun_corn` - 12 ngày, tái sinh 4 ngày):** Giá hạt 80g, bán 45g (**8.21 Vàng/ngày**, xuyên 2 mùa Hạ-Thu, 12 đợt). Bắp luộc bơ tỏi, nấu súp ngô kem dã chiến.
   - **Cà Chua Lửa Mọng Nước (`crop_fire_tomato` - 10 ngày, tái sinh 4 ngày):** Giá hạt 50g, bán 24g (**2.50 Vàng/ngày**, 5 đợt/vụ). Xào làm sốt cà chua thịt băm, súp hải sản chua cay.
   - **Dưa Hấu Dung Nham (`crop_magma_melon` - 12 ngày):** Giá hạt 80g, bán 180g (**8.33 Vàng/ngày**). Ruột đỏ ấm nồng; có 2% cơ hội hợp nhất thành Dưa Hấu Khổng Lồ khi trồng cụm $3\times3$.
   - **Mía Mật Ong Hổ Phách (`crop_honey_cane` - 7 ngày):** Giá hạt 30g, bán 55g (**3.57 Vàng/ngày**). Ép lấy Đường Mía Thô tinh khiết làm nguyên liệu nướng bánh ngọt.
   - **Hắc Cà Rốt Mắt Mèo (`crop_shadow_carrot` - 6 ngày):** Giá hạt 35g, bán 65g (**5.00 Vàng/ngày**). Vỏ tím ruột cam dạ quang; tăng thị lực ban đêm hầm mỏ. Trồng cả Hè và Thu.
   - **Hỏa Khương Rừng Thầm Thì (`crop_whisper_ginger` - 8 ngày):** Giá hạt 45g, bán 85g (**5.00 Vàng/ngày**). Gừng cay nồng đậm vị; khử tanh cá nướng bờ suối và nấu canh gừng ấm dạ dày.
   - **Hoa Hướng Dương Vàng (`crop_sunflower` - 8 ngày):** Giá hạt 40g, bán 50g (**~6.25 Vàng/ngày** tính cả hạt). Khi gặt rơi thêm 1-2 Túi Hạt giống miễn phí (tiết kiệm 40-80g hạt).

3. **Mùa Thu (6 cây):**
   - **Bí Ngô Mật Khổng Lồ (`crop_sweet_pumpkin` - 13 ngày):** Giá hạt 100g, bán 260g (**12.31 Vàng/ngày**). Vua kinh tế mùa thu; nấu súp bí đỏ hạt sen ấm; có cơ hội hóa Bí Ngô Khổng Lồ $3\times3$.
   - **Hắc Mạch Đêm Rừng (`crop_shadow_rye` - 5 ngày):** Giá hạt 30g, bán 60g (**6.00 Vàng/ngày**). Ngũ cốc lớn nhanh; xay bột nướng bánh mì lúa mạch đen dã chiến cho thợ mỏ.
   - **Nho Đêm Giàn Leo (`crop_night_grape` - 10 ngày, tái sinh 3 ngày):** Giá hạt 80g, bán 44g (**8.14 Vàng/ngày**, 7 đợt/vụ). Dây leo cọc giàn; ủ men thùng sồi thành Rượu Vang Đêm Oakhaven.
   - **Khoai Lang Nguyệt Quang (`crop_moonlight_yam` - 9 ngày):** Giá hạt 45g, bán 95g (**5.56 Vàng/ngày**). Vỏ ánh bạc ruột tím; nướng tro bếp lùi than hồng phục vụ ca tối quán The Hearth.
   - **Oải Hương Đồi Sương (`crop_star_lavender` - 7 ngày):** Giá hạt 35g, bán 75g (**5.71 Vàng/ngày**). Hoa tím ngát hương triền đồi; sấy khô lót gối phòng trọ lầu 2 và hãm trà an thần.
   - **Củ Mandrake Nhân Sâm (`crop_mandrake` - 14 ngày):** Giá hạt 100g, bán 280g (**12.86 Vàng/ngày**). Trồng cả Thu và Đông; hầm canh gà sâm tăng tối đa kháng cự và sinh mệnh.

4. **Mùa Đông (6 cây):**
   - **Bạch Ngọc Củ Cải (`crop_frost_turnip` - 5 ngày):** Giá hạt 25g, bán 50g (**5.00 Vàng/ngày**). Củ cải trắng muốt giòn tan lớn nhanh trong tuyết; hầm canh xương ấm ngày rét buốt.
   - **Bạc Hà Băng Giá (`crop_frostmint` - 6 ngày):** Giá hạt 30g, bán 65g (**5.83 Vàng/ngày**). Viền tinh thể băng; pha trà giải cảm mùa đông và chế kẹo the mát cho lữ khách.
   - **Khoai Tây Tuyết Núi Cao (`crop_frost_potato` - 7 ngày):** Giá hạt 45g, bán 90g (**~8.04 Vàng/ngày** kèm 25% củ phụ). Nghiền tỏi bơ cho đĩa bít-tết thợ rèn Boris.
   - **Củ Dền Băng Ruby (`crop_frost_beet` - 6 ngày):** Giá hạt 40g, bán 80g (**6.67 Vàng/ngày**). Tạo màu đỏ thắm cho súp borscht và bánh nướng lễ hội.
   - **Rễ Địa Y Băng Giá (`crop_lichen_root` - 8 ngày):** Giá hạt 55g, bán 120g (**8.12 Vàng/ngày**). Rễ cổ sinh bám kẽ đá; nấu cao thảo dược bồi bổ thể lực cho thương binh.
   - **Sen Băng Tuyết Ngàn Năm (`crop_frost_lotus` - 12 ngày):** Giá hạt 120g, bán 320g (**16.67 Vàng/ngày**). Đóa sen pha lê trên mặt hồ đóng băng mỏng; kỷ lục doanh thu mùa đông.

5. **Canh Tác 4 Mùa Đặc Thù (1 mô hình):**
   - **Khúc Gỗ Cấy Nấm Rừng (`crop_mushroom_log`):** Chế tác 1 lần (180g: Gỗ Mục + Meo Nấm). Cho nấm hương tự nhiên mỗi 4 ngày quanh năm 4 mùa mà không cần tưới nước (**11.25 Vàng/ngày**, 28 đợt/năm = 1,260 Vàng doanh thu ròng). 10% đột biến ra Nấm Huỳnh Quang Mỏ Sâu trong hang tối ẩm.

### 7.2. Danh Mục 14 Cây Thân Gỗ & Vườn Cây Ăn Quả (Timber & Orchard Trees)

1. **6 Loài Cây Lâm Nghiệp Lấy Gỗ & Trích Nhựa (Silviculture Trees):**
   - Phát triển từ hạt con trong 20–30 ngày trên mọi ô đất trống, không cần tưới nước:
   - **Cây Sồi Oakhaven (`tree_oak` - 24d):** 12–16 Gỗ Sồi Già + Củi Khô. Gắn bình trích nhựa thu **Nhựa Sồi Đen Thơm** mỗi 7 ngày (thùng ủ men, sửa Cầu Đá).
   - **Cây Thông Dẻo Tuyết Sơn (`tree_pine` - 22d):** 12–16 Gỗ Thông Dẻo. Gắn bình trích nhựa thu **Hắc Nhựa Thông Dẻo** mỗi 5 ngày (chống thấm ghe thuyền, đuốc hầm mỏ).
   - **Cây Phong Hoàng Kim (`tree_maple` - 24d):** 10–14 Gỗ Phong Vân Hồng. Gắn bình trích nhựa thu **Siro Phong Hổ Phách** mỗi 9 ngày (bánh kếp quán trọ, bàn ăn VIP).
   - **Cây Bạch Dương Trắng (`tree_birch` - 20d):** 10–14 Gỗ Bạch Dương + Vỏ Cuộn. Trích **Nước Nhựa Bạch Dương** mỗi 6 ngày (đóng rương chứa đồ).
   - **Cây Liễu Gai Thủy Ngạn (`tree_willow` - 22d):** 14–18 Cành Liễu Gai dẻo dai. Trích **Nhựa Liễu Dược Liệu** mỗi 6 ngày (giỏ bẫy cá, thuốc hạ sốt).
   - **Cây Thiết Mộc Hắc Ám (`tree_ironwood` - 30d):** Yêu cầu Rìu Sắt trở lên (16 nhát). Thu 8–12 Gỗ Thiết Mộc. Trích **Dầu Thiết Mộc Chống Gỉ** mỗi 10 ngày (gia cố dầm mỏ Tầng Sâu).

2. **8 Loài Cây Ăn Quả Lâu Năm (Perennial Fruit Orchards - Không gian $3\times3$):**
   - Cần 28 ngày lớn từ cây con, 8 ô xung quanh phải hoàn toàn thông thoáng. Cho quả mỗi ngày trong mùa tương ứng (28 quả/vụ):
   - **Cây Táo Sồi Mật (`fruit_apple`):** Mùa Thu — Táo đỏ giòn ngọt (**28 Vàng/ngày**); nướng bánh pie và ủ rượu táo.
   - **Cây Chanh Sét Vàng (`fruit_lemon`):** Mùa Hạ — Quả chua thanh thơm ngát (**35 Vàng/ngày**); pha nước chanh dã chiến và sốt cá.
   - **Cây Mận Băng Tuyết (`fruit_plum`):** Mùa Đông — Quả tím giòn ngọt chịu rét (**38 Vàng/ngày**); ủ rượu mận hâm nóng mùa đông.
   - **Cây Đào Anh Thảo (`fruit_peach`):** Mùa Xuân — Quả mọng thịt hồng mềm ngọt (**42 Vàng/ngày**); làm bánh mousse đào tráng miệng.
   - **Cây Anh Đào Đỏ Rực (`fruit_cherry`):** Mùa Xuân — Quả đỏ tươi mọng nước (**32 Vàng/ngày**); làm mứt anh đào và bánh tart.
   - **Cây Quả Óc Chó Rừng (`fruit_walnut`):** Mùa Thu — Hạt bùi béo ngậy (**35 Vàng/ngày**); làm bánh quy dinh dưỡng cho thợ mỏ.
   - **Cây Lê Sương Muối (`fruit_pear`):** Mùa Thu — Lê giòn ngọt đượm sương (**30 Vàng/ngày**); hầm rượu vang lửa than làm dịu cơn ho khan buốt giá.
   - **Cây Cam Lửa Oakhaven (`fruit_orange`):** Mùa Hạ — Cam mọng nước giàu vitamin (**32 Vàng/ngày**); ép nước cam tươi giải nhiệt.

### 7.3. Tự Động Hóa Nông Trại & Thổ Nhưỡng
- **Vòi Phun Tưới Tự Động (Sprinklers):** Tự động tưới đất lúc 06:00 AM mỗi sáng:
  - *Vòi Đồng:* Tưới 4 ô chữ thập liền kề (1 Thỏi Đồng + 1 Quặng Sắt).
  - *Vòi Sắt:* Tưới 8 ô xung quanh khung $3\times3$ (1 Thỏi Sắt + 1 Thỏi Đồng).
  - *Vòi Hư Không (Void Sprinkler):* Tưới 24 ô xung quanh khung $5\times5$ (1 Thỏi Void + 1 Thạch Anh Tím).
- **Bù Nhìn Đuổi Chim (Scarecrows):** Bảo vệ bán kính 8 ô xung quanh khỏi chim rừng mổ hạt giống.
- **Phân Bón Tự Nhiên:**
  - *Tro Bếp Oakhaven (`item_wood_ash`):* Lấy từ tro lò than bếp, rút ngắn 15% thời gian sinh trưởng.
  - *Bột Xương Hang Mỏ (`item_bone_meal`):* Nghiền từ xương quái vật mỏ, tăng 30% tỷ lệ nông sản Bạc/Vàng.
  - *Mùn Rêu Giữ Ẩm (`item_retaining_moss`):* Giúp đất có 50% cơ hội giữ ẩm qua đêm, không cần tưới lại hôm sau.
- **Nhà Kính Cổ Đại (Ancient Greenhouse):** Sau khi phục hồi, cho phép trồng toàn bộ 27 hoa màu và 8 cây ăn quả quanh năm bất chấp bão tuyết mùa đông.

---

## 8. Bếp Quán Ăn, 55 Món Ăn & Buff Chiến Đấu Toàn Diện

### 8.1. 5 Trạm Bếp Chế Biến Quán Ăn
1. **Nồi Ninh Hầm (Boiling Pot):** Các món canh bổ, súp hầm thịt, trà dược liệu hồi máu/thể lực tức thì.
2. **Chảo Rán & Xào (Frying Pan):** Các món xào lăn, chiên giòn tăng cực mạnh Sát Thương Tấn Công (ATK).
3. **Lò Nướng Đá (Stone Oven):** Các loại bánh nướng, thịt quay tăng Giáp Phòng Ngự (DEF) và Kháng Nguyên Tố.
4. **Nồi Hấp Chân Không (Bamboo/Metal Steamer):** Món hấp thanh đạm, tăng Tốc Độ Di Chuyển (Speed) và Tốc Đánh.
5. **Bếp Nướng Than & Lò Hun Khói (Smoker & Grill):** Thịt cá hun khói, thịt xiên nướng tăng Tỉ Lệ Bạo Kích (Crit Rate) và May Mắn (Luck).

### 8.2. Danh Sách 55 Món Ẩm Thực & Bảng Buff Thực Chiến

*(Chi tiết đầy đủ 55 món ăn với nguyên liệu, trạm chế biến, giá bán và buff chỉ số xem chi tiết tại [cooking-recipes-guide.md](file:///D:/Dev-game/rowan-of-oakhaven-wiki/docs/cooking-recipes-guide.md))*

* **Nhóm Buff Tấn Công (ATK Boost):** Bò bít tết sốt tiêu đen (+25% ATK), Cơm chiên hải sản cay (+15% ATK, +10% Crit), Thịt xiên nướng than hồng (+12% ATK).
* **Nhóm Buff Phòng Ngự (DEF Boost):** Súp nấm rễ cây dày (+10 DEF, Kháng Choáng), Bánh mì thợ mỏ nướng giòn (+8 DEF, +20 Kháng gai nhọn), Khoai tây nghiền bơ tỏi (+5 DEF).
* **Nhóm Buff Cơ Động & Tốc Độ (Speed Boost):** Trà xanh búp non tuyết (+20% Tốc chạy trong 5 phút), Gỏi cuốn tôm suối (+15% Tốc chạy, +10% Tốc đánh), Nước ép việt quất lên men (+15% Tốc chạy).
* **Nhóm Buff Đào Mỏ & Thu Thập (Mining & Luck Boost):** Súp bí đỏ thợ mỏ (+1 Cấp Đào Đá, tăng 20% tỉ lệ rơi quặng), Bánh quy bơ hạt phỉ (+2 May Mắn nhặt Geode hiếm).
* **Nhóm Thanh Tẩy Cầu Siêu (Soul Cleansing):** Dùng để dâng lên các Bàn Thờ Cổ trên mặt đất Chiến Trường Tro Tàn để giải phóng linh hồn và hóa giải đất độc thành đất đen phì nhiêu.

---

## 9. Đại Bản Doanh Điền Trang Oakhaven (The Frontier Homestead), Nhà Trọ Áp Mái & Lối Chơi Tự Do

### 9.1. Tự Do Lối Chơi Tuyệt Đối & Cơ Chế Quán Kết Hợp (Hybrid Sandbox Loop)
- **Không Gò Bó Giờ Giấc (No Mandatory Shifts):** Rowan không bị xích chân vào ca làm việc chạy bàn (không áp lực Diner Dash). Người chơi hoàn toàn tự do phân bổ thời gian: cày 150 tầng mỏ, canh tác 32 giống cây, câu cá ven sông hồ, hoặc chế tác máy móc.
- **Quyền Làm Chủ Căn Bếp (Master of the Kitchen):** Rowan sở hữu và làm chủ 100% việc sáng tạo 55 món ăn. Thức ăn phục vụ 2 mục đích chính:
  1. **Lương thực dã ngoại & Buff chiến đấu:** Mang theo ba lô để hồi máu, tăng công, tăng thủ, kháng độc khi khám phá mỏ sâu.
  2. **Bán buôn thụ động (Passive Sales):** Thức ăn đặt lên **Quầy Tự Phục Vụ (Honor Pantry)** hoặc quẳng vào **Hòm Xuất Khẩu (Shipping Bin)** trước cổng. Tiền tự động cộng vào túi qua sổ sách thống kê của Bác Quản Gia Barnaby.
- **Dịch Vụ Ca Tối Tùy Chọn (Optional Evening Hearthside Service):**
  - Từ 18:00 đến 22:00 mỗi tối, cư dân địa phương và khách trọ ghé The Hearth ngồi vào các bàn quen thuộc.
  - **Nếu Rowan có mặt tại quán:** Trực tiếp bưng bê món ăn "Ký ức & Đồng điệu" phục vụ khách để nhận thêm **+20% Tiền Boa (Tip)** và kích hoạt các đoạn đối thoại tâm sự sâu lắng (**Heart Events Cấp B**).
  - **Nếu Rowan vắng mặt (bận đi mỏ, câu cá đêm):** Bác Quản Gia Barnaby và Cậu Phụ Tá Colm sẽ tự động vận hành quầy cơ bản, **người chơi hoàn toàn không bị phạt hay trừ điểm uy tín**.


### 9.2. Dãy Phòng Trọ Áp Mái & Nhân Sự Điền Trang (The Bunkhouse & Staff)
- **Cơ chế Phòng Trọ Áp Mái:** Có 3 đến 5 phòng cho khách thám hiểm vãng lai, thương nhân thuê qua đêm.
- **Bác Quản Gia Barnaby:** Cựu thủ kho quân nhu Solaria giải ngũ; quản lý dãy phòng trọ áp mái, tự động thu tiền trọ (Passive Rent) mỗi sáng Thứ Hai, kê khai sổ sách lời lỗ hòm xuất khẩu, đàm phán giảm chi phí nâng cấp công trình.
- **Cậu Phụ Tá Colm:** Chẻ củi đầy hộc bếp, xay lúa mì thành bột mịn, gom trứng sữa vào kho lạnh, vót sẵn đuốc dã ngoại. Khi Rowan kiệt sức/ngất xỉu trên mặt đất, Colm dùng cáng khiêng về giường ngủ The Hearth an toàn.


### 9.3. Đầu Tư Thương Mại & Tái Thiết Thị Trấn
- Bảng Nhiệm Vụ Hiệp Hội & Bảng Tái Thiết Thị Trấn: Đóng góp vật liệu sửa Cối Xay Gió, Đèn Đường, Trạm Xá.
- Ký hợp đồng cung cấp lương thực số lượng lớn cho đoàn buôn đường sắt.
- Đầu tư cổ phần tàu thám hiểm của Thuyền Trưởng Garrick để nhận hải sản và gia vị ngoại quốc độc quyền.

---

## 10. Hồ Sơ Tâm Lý, Chiều Sâu 51 Nhân Vật & Tuyến Nhiệm Vụ Trái Tim (NPC Narrative Lore & Heart Events)

### 10.1. Triết Lý Xây Dựng: "Vết Nứt Đời Thực & Sự Ấm Áp Mộc Mạc"
Mỗi cư dân Oakhaven không phải NPC rập khuôn vô hồn, mà mang một **vết nứt đời thực mộc mạc**: gánh nặng mưu sinh sau chiến tranh, chuột cắn mùa màng, đau khớp khi trời lạnh, nợ tiền quán rượu hay nỗi hoang mang của kẻ tha hương. Mâm cơm nóng và ổ bánh nướng giòn rụm của Rowan là cầu nối gắn kết, giải quyết những khó khăn cơm áo gạo tiền rất cụ thể.

### 10.2. Mạng Lưới 51 Nhân Vật Tiêu Biểu & Vết Thương Đời Thực
1. **Rowan (Chủ Điền Trang, Master Cook & Thợ Săn Mỏ):** Người trẻ kiệt quệ (burnout) trốn chạy cuộc sống vô cảm kinh đô, mang hội chứng kẻ giả mạo (Imposter Syndrome). Tự tay làm chủ 100% căn bếp 55 món, vừa cuốc đất khai hoang vừa săn quặng trong Hầm Ngục Mỏ Cổ Vô Tận.
2. **Bác Quản Gia Barnaby (Quản Gia Sổ Sách & Dãy Phòng Trọ):** Cựu thủ kho quân nhu giải ngũ nghèo túng, sợ mình thành gánh nặng thừa thãi; quản lý phòng trọ áp mái, thu tiền trọ tự động, dự báo thị trường sốt giá và quản lý két sắt điền trang sinh lãi 3%/tuần.
3. **Cậu Phụ Tá Colm (Hậu Cần, Sơ Chế & Chuyển Cứu Khẩn Cấp):** Trẻ mồ côi làm thuê bị quịt lương, được Rowan cứu ở Tầng 15 mỏ; chẻ củi, xay bột mì, gom sữa trứng tự động; phụ trách cáng cứu hộ đưa Rowan về giường khi kiệt sức (mất đồ nhặt trong chuyến đi, không có cứu đồ free).
4. **Bà Ngoại Amalia (Di sản & Linh hồn dẫn lối):** Biểu tượng người phụ nữ gom yêu thương vào mâm cơm. Từng ở lại cứu thị trấn trong nạn đói. Lời dặn: *"Nấu ăn là để người ta có sức sống sót và tiếp tục vững vàng ngày mai."*
5. **Cặp Anh Em Nhà Lùn Boris & Bram Barnaby (Mâu Thuẫn Anh Em Ruột):**
   - *Boris (Thợ rèn):* Dằn vặt 10 năm sau vụ sập mỏ khiến em trai Bram tàn tật; bao bọc thái quá vì sợ mất em.
   - *Bram (Thợ mỏ tầng sâu):* Tự ái vì bị xem là kẻ phế nhân thương hại; liều mạng xuống mỏ sâu chứng minh giá trị (thỉnh thoảng Rowan bắt gặp Bram đang đào quặng ở các tầng mỏ).
   - *Hàn gắn (8 Tim):* Nồi súp bò củ dền *Dwarf Ironforge Goulash* và bức thư di sản của người mẹ mở khóa **Trạm Tinh Luyện Cao Cấp** (rút ngắn thời gian đúc quặng, tăng tỷ lệ ngọc quý).
6. **Bà Cụ Maeve & Cậu Bé Bán Diêm Kael (Tình Thân Không Cùng Máu Mủ):**
   - *Bà Maeve:* Người làm vườn già thoái hóa khớp nặng, nén đau chắt chiu từng đồng tiền thuốc để dành cho tương lai của Kael.
   - *Kael:* Trẻ mồ côi từng bán diêm co ro trong bão tuyết, sợ bị bỏ rơi lần nữa nên làm việc kiệt sức để chứng minh bản thân hữu ích.
   - *Hàn gắn (8 Tim):* *Súp Bí Đỏ Hạt Sen* và bánh sinh nhật bảy màu; Kael tiếp quản và mở khóa **Vườn Ươm Cây Giống Bốn Mùa**.
7. **Hiệp Hội Mạo Hiểm: Hội Trưởng Thorne & Điều Phối Viên Valerie:**
   - *Thorne:* Cựu chỉ huy cấm vệ quân mang chân giả, mất 18 đồng đội dưới hầm sâu; quản lý Bảng Treo Thưởng Săn Quái (Bounties) & Giấy Phép/Ấn Triện Thông Hành Đới Mỏ (Clearance Seals).
   - *Valerie:* Cung thủ bắn tỉa giải ngũ vì mất thính lực một bên tai và chứng sợ tiếng nổ lớn (PTSD); quản lý Quầy Tiếp Tân và Quầy Mua Lại (Buyback Shop) cho đồ đạc người chơi lỡ tay bán nhầm trong ngày (không phải chuộc đồ mất trong mỏ).
   - *Hàn gắn (8 Tim):* Cơm hộp dã chiến tiếp tế và *Súp Nấm Tuyết Sườn Non*; mở khóa **Bảng Săn Boss Tinh Anh & Hợp Đồng Thưởng Quặng Quý Hiệp Hội**.
8. **Cha Con Đài Thiên Văn: Giáo Sư Orion & Thủ Thư Clara (Chăm Sóc Cha Già Sa Sút Trí Nhớ):**
   - *Giáo sư Orion:* Mắc chứng sa sút trí tuệ (Alzheimer), tuyệt vọng thức trắng đêm tìm vì sao mang tên người vợ quá cố Elise trước khi trí nhớ tan biến.
   - *Clara:* Kiệt sức vì chăm cha già (Caregiver Burnout), xé nát thư trúng tuyển đại học danh giá kinh đô để ở lại Oakhaven phụng dưỡng cha.
   - *Hàn gắn (8 Tim):* *Bánh Tart Việt Quất Tinh Cầu* và Trà Bá Tước Hoa Nhài; Thư viện mở khóa **Kho Lưu Trữ Công Thức Cổ Đại**.
9. **Thuyền Trưởng Garrick & Cậu Bé Finn (Vùng Bến Cảng Ven Biển):** Lão hoa tiêu già mù màu mặc cảm "khúc gỗ mục mắc cạn" và đứa cháu trai ngày đêm câu cá sao gom tiền chuộc lại chiếc la bàn báu vật cho ông.
10. **Lumi (Tinh Linh Cáo Tuyết Kemomimi-Elf):** Sinh linh lai bị cả người thú và tinh linh xa lánh; tìm thấy sự an toàn tuyệt đối bên tách *Trà Sen An Thần* và chiếc bánh bột gạo hấp của Rowan.
11. **Aurelia (Dược Sĩ) & Marlo (Cảnh Vệ Ca Đêm):**
   - *Aurelia:* Dược sĩ trạm xá, gánh nặng y đức trước cảnh bệnh nhân nghèo không đủ tiền mua thuốc giảm đau.
   - *Marlo:* Cảnh vệ ca đêm bảo vệ cổng làng Oakhaven, trung thực và kiệt sức vì thức trắng tuần tra xua đuổi dã thú; chắt chiu 90% lương gửi về quê nuôi đàn em.
12. **Lão Silas & Con Lừa Già (Thương Nhân Du Mục - Khách Trọ The Hearth):** Lái buôn xe lừa bán hạt giống và gia vị hiếm phương xa; ký hợp đồng cung ứng hàng tuần ở 8 Tim.
13. **Võ Sư Valerius (Võ Đường Đèo Núi Mặt Đất):** Cựu Đội trưởng Huấn luyện Vệ binh Hoàng gia bị lưu đày; mở võ đường trên đèo núi mặt đất dạy kỹ thuật Đỡ Đòn Phản Công (Parry) và thế thủ cận chiến; truyền dạy tuyệt kỹ phản đòn ở 8 Tim.
14. **Hiệp Sĩ Hester (Khách Trọ Áp Mái The Hearth):** Cựu kỵ sĩ thuộc cấp của Valerius lưu lạc tha hương; tá túc tại phòng áp mái, làm thợ mài giáp/rèn dã chiến giúp sửa chữa độ bền trang bị và gia cố giáp thô (+DEF).
15. **Valen de Montfort (Quý Tộc Lưu Vong Bệnh Máu Hiếm - Phòng Trọ Lầu 2 The Hearth):** Quý tộc lưu vong từ Solaria mắc chứng bệnh thiếu máu bẩm sinh và sợ ánh nắng mặt trời gay gắt; tá túc tại phòng kín The Hearth; cảm kích các món canh súp bổ máu và thuốc hãm thảo dược của Rowan; tặng bản thảo cổ và công thức chế tác trang sức gia truyền Solaria ở 8 Tim.
16. **Cô Thợ Dệt Mae (Khách Trọ The Hearth):** Nghệ nhân dệt du mục và thợ mộc nội thất; cung cấp giường nệm ấm áp, đồ gỗ thô và nhận hoàn thiện sơn màu nội thất gia dụng trọn gói; tặng Khung Dệt Len Điền Trang tự động ở 8 Tim.
17. **Lão Gomer (Khai Thác Đá & Kho Thuốc Nổ Cửa Hầm Mỏ - Mặt Đất):** Chuyên gia thuốc nổ người lùn điếc đặc; bán thuốc nổ mỏ đá và tặng Máy Khoan Hơi Nước cầm tay ở 8 Tim (thỉnh thoảng Rowan bắt gặp lão tại các tầng đá cứng hầm mỏ để bộc phá).
18. **Thợ Lặn Vael (Trại Lặn Hồ Băng Chân Núi - Mặt Đất):** Thợ lặn khoáng thể và thợ săn thủy quái mỏ; trại lặn ở hồ băng chân núi lộ thiên (Mặt Đất); thỉnh thoảng khảo sát các hồ ngầm trong mỏ; tặng Bộ Đồ Lặn Hơi Nước ở 8 Tim.
19. **Bà Rowena "Tro Than" (Chòi Than Rừng Sâu):** Cung cấp Than Rừng Già cháy x3 thời gian; mở khóa Lò Nung Than Tro Trấu cao cấp ở 8 Tim.
20. **Lão Tad "Bẫy Lươn" (Ngư Dân Đầm Lầy Lau Sậy):** Tặng Đó Tre Bắt Cá Tự Động; tặng Cần Câu Trúc Ngàn Năm tăng 25% tốc độ câu ở 8 Tim.
21. **Cậu Bé Milo (Quậy Phá & Trinh Sát Bìa Rừng):** Hái quả rụng và chỉ điểm bụi dâu rừng bí mật; lập Đội Thám Tử Nhí canh chừng thú hoang phá hoại mùa màng ở 8 Tim.
22. **Bé Hạt Dẻ Cora (Nhặt Sỏi Cuội & Hái Dâu Bờ Suối Đợi Cha):** Bé gái mồ côi mẹ, ngày ngày nhặt sỏi đá cuội ven suối và hái dâu dại ngóng tin cha là người lính viễn chinh; tặng Rowan Vòng Đá Cuội May Mắn (+5% né đòn); ở 8 Tim nhận thư cha bình an xuất ngũ trở về.
23. **Rosemary (Người Giữ Đền Cổ Oakhaven - Bìa Rừng Thầm Thì):** Người phụ nữ trầm mặc chăm sóc Bàn Thờ Cổ Đại; hướng dẫn Rowan nghi thức nấu các món đại tiệc thanh lọc khói độc miasma và tro tàn chiến tranh để giải phóng đất hoang.

### 10.3. Cơ Chế Bữa Ăn Kết Nối Tối (The Nightly Hearthside Service)
- Mỗi tối cư dân ghé Điền trang mang theo tâm trạng và khúc mắc đời thường.
- Nếu Rowan phục vụ đúng món ăn "Ký ức & Đồng điệu" phù hợp tâm trạng của họ:
  - Điểm thân mật tăng gấp 3 lần.
  - Kích hoạt các đoạn độc thoại mộc mạc, giải tỏa gánh nặng tâm lý.
  - Sau sự kiện 8 Tim, nhân vật sẽ tặng Rowan công thức gia truyền hoặc mở khóa tiện ích dịch vụ vĩnh viễn cho thị trấn.

### 10.4. Kiến Trúc 51 Cảnh Diễn Khoảnh Khắc Vàng & Bộ Sưu Tập Ảnh Polaroid (51 Signature Milestone Scenes)
Để giải quyết bài toán khả thi sản xuất (Asset Feasibility) và đảm bảo sự công bằng, trọn vẹn cho toàn bộ cư dân thung lũng, hệ thống tình cảm vận hành trên nguyên tắc:
* **Giao diện đồng nhất 8 Tim (8 Hearts Cap):** Toàn bộ 51 nhân vật đều có thanh tiến trình 8 Tim trên UI Sổ Dân Làng để người chơi tự do kết bạn, tặng quà và đạt thành tựu toàn diện.
* **Tạm gác cơ chế Kết Hôn (Romance Postponed):** Loại bỏ áp lực hẹn hò/kết hôn phức tạp, dồn 100% nguồn lực vào **Tình Thân Cộng Đồng, Sự Gắn Kết & Chữa Lành Hậu Chiến (Community Bonds & Healing)**.
* **Mỗi nhân vật đều có ĐÚNG 1 CẢNH DIỄN KHOẢNH KHẮC VÀNG (1 Signature Milestone Scene):**
  - Không có "NPC rác" hay NPC bị bỏ rơi; bất kỳ ai khi đạt tới mốc đỉnh cao của họ đều kích hoạt 1 hoạt cảnh In-Engine giàu cảm xúc.
  - Sau khi hoàn thành cảnh diễn, người chơi mở khóa **1 Bức Ảnh Kỷ Niệm Polaroid 16-bit** để treo lên **Bức Tường Kỷ Niệm (Memory Wall)** tại phòng áp mái The Hearth cùng **1 Kỷ Vật Đời Người (Passive Relic)**.
* **3 Tầng Phân Bổ Mốc Xuất Hiện Cảnh Diễn (In-Engine Scenes):**
  1. **Tầng 1 (Tier 1 - 14 NPC Nòng Cốt Cốt Truyện):** Cảnh diễn diễn ra ở **Mốc 8 Tim** (Thời lượng 45 – 60s, hóa giải bi kịch quá khứ sâu lắng nhất).
  2. **Tầng 2 (Tier 2 - 16 NPC Trụ Cột Đời Sống & Dịch Vụ):** Cảnh diễn diễn ra ở **Mốc 6 Tim** (Thời lượng 30 – 40s, đồng lòng mở công trình/tiện ích lớn).
  3. **Tầng 3 (Tier 3 - 21 NPC Khách Trọ, Dân Rìa Làng & Trẻ Em):** Cảnh diễn diễn ra ở **Mốc 4 Tim** (Thời lượng 20 – 30s, khoảnh khắc đời thường mộc mạc, một nụ cười ấm áp hay bát canh nóng).
* *(Xem danh mục chi tiết 51 Cảnh Diễn và 51 Tấm Ảnh Polaroid tại `docs/ideas/brainstorm-expansion-notes.md`).*

### 10.5. 4 Thực Thể Thế Giới & Khách Niên Kỷ (World & Event Entities)
Tách biệt khỏi 47 NPC thường trú, thế giới vận hành thêm 4 thực thể đặc thù cho các dịp lễ hội và khám phá hầm mỏ:
1. **👑 Bá Tước Thẩm Định Lord Julian (Royal Culinary Critic):** Xuất hiện Ngày 20 Mùa Thu tại Quảng Trường chấm thi Vua Đầu Bếp; món đạt 3–5 sao trao Cúp Vàng (+15% giá bán món ăn) và Sắc phong Quán Ăn Hoàng Gia.
2. **🐢 Linh Quy Rêu Phong Cụ Mỏ (Old Moss Tortoise):** Đầm nước ngầm Tầng 35 Hầm Mỏ; thả 3 củ quả thanh đạm đánh thức cụ rùa làm Trạm Dịch Chuyển Tức Thời Tầng 1–35 và nhả Mai Rùa Hóa Thạch (chế Khiên chống đẩy lùi).
3. **🕯️ Yêu Tinh Chợ Đen Grib (Smuggler Goblin Grib):** Góc hầm sụp tối đen Tầng 65 Hầm Mỏ; sợ ánh sáng; đổi bánh mì nướng lấy Quặng Iridium, Chìa Khóa Rương Cổ và Hạt Giống Hư Không.
4. **🎈 Đoàn Buôn Khí Cầu Biển Mây (Sky Caravan of Zephyr):** Đỉnh đồi Tháp Thiên Văn đúng Đêm 28 Mùa Đông (Giao Thừa Bếp Lửa); bán Hạt Giống Thần Thoại 4 Mùa, Đĩa Than Lo-fi hiếm và Ngọc Bội May Mắn Đào Mỏ (+50% tỷ lệ quặng).

### 10.6. Cơ Chế Di Cư Nội Vùng Oakhaven (Strict Anti-Island Policy)
Không sao chép cơ chế đảo xa tách biệt; 100% sự chuyển dịch nơi cư trú diễn ra trong thung lũng khi Quán Ăn The Hearth phát triển và tình cảm nhân vật thăng hoa:
- **Kael (`npc_kael`):** Mốc 6 Tim & nhiệm vụ *"Mái Ấm Cho Hạt Mầm"*, dọn từ túp lều rách ven sông buốt giá về căn gác xép gỗ ấm áp cạnh Vườn Ươm của Bà Maeve; phụ trách Trạm Nhân Giống Cây Bốn Mùa.
- **Valen (`npc_valen`):** Mốc 8 Tim & chữa khỏi bệnh thiếu máu, mua đứt phòng lầu 2 The Hearth, mở rộng Hầm Rượu Vang và bảo trợ tài chính lâu dài.
- **Lumi (`npc_lumi`):** Mốc 6 Tim, vượt qua nỗi sợ dị chủng lai, dọn về căn nhà nhỏ đầu làng và phụ việc bên lò sưởi The Hearth mỗi tối.
- **Hester & Valerius (`npc_hester`, `npc_valerius`):** Mốc 8 Tim qua Dự Án Tái Thiết của Trưởng Lão Oakwood, cùng mở Trạm Bảo An & Võ Đường ngay trung tâm thị trấn.

---

## 11. Hệ Thống Thành Tựu Steam, Thử Thách Kỹ Năng & Tab Hồ Sơ In-Game (Steam Achievements, Tactical Trials & Player Profile)

### 11.1. Kiến Trúc Đồng Bộ 1:1 Giữa Steamworks & Sổ Tay Điền Trang
- **Đồng bộ song hành:** Hệ thống thành tựu được thiết kế chuẩn Steamworks API (`steam_api_name: ACH_*`). Khi người chơi thỏa mãn điều kiện, game vừa kích hoạt Toast Popup của Steam, vừa lưu vào file save và hiển thị trong **Tab Hồ Sơ (Player Profile Tab)** trong Sổ Tay Điền Trang (`J` hoặc `Tab`).
- **Chế độ Ngoại Tuyến (Offline / DRM-Free):** Khi chơi không qua Steam Client, toàn bộ 50 thành tựu vẫn mở khóa bình thường và hiển thị đầy đủ trong giao diện game.

### 11.2. Phân Bổ 50 Thành Tựu Theo 7 Danh Mục Cốt Lõi
1. **Bếp Lửa & Ẩm Thực (Culinary - 7 Thành tựu):** Nấu món ăn đầu tiên, đạt 25 và 55 công thức, phục vụ đúng 15 món Comfort Dish, đạt 5,000 vàng/ca tối, hoàn thành tiệc đêm cho Valen de Montfort.
2. **Hầm Mỏ & Chiến Đấu (Mining & Combat - 6 Thành tựu):** Vượt qua 4 Trùm Giám Ngục (Tầng 30, 70, 110, 150), thu thập khoáng thạch lớn, phá 50 cự thạch bằng bom mỏ Gomer.
3. **Thử Thách Kỹ Năng / Độ Hard Vừa (Tactical Trials - 6 Thành tựu):**
   - *Bức Tường Thép:* 15 lần Master Parry liên tiếp trước Trùm không dính đòn.
   - *Hành Trang Tối Giản:* Xuống liên tục 30 tầng chỉ mang 2 hộp cơm và 1 ngọn đuốc.
   - *Bước Vào Hư Vô:* Đặt chân xuống Tầng 180 của Vực Thẳm Vô Tận (151+).
   - *Thân Thủ Phi Phàm:* Hạ gục Boss mà HP không tụt dưới 90%.
   - *Sinh Tồn Ẩm Thực:* Vượt Đới Dung Nham (71-110) không dùng thuốc hồi máu, chỉ sống sót nhờ buff đồ ăn.
   - *Chạy Đua Sương Độc:* Vét sạch quặng trên một tầng mỏ hiểm trở và thoát hiểm trước khi thanh miasma đạt 100%.
4. **Đồng Xanh & Mùa Màng (Farming & Husbandry - 6 Thành tựu):** Thu hoạch trọn vẹn 41 loài cây canh tác 4 mùa (27 hoa màu + 14 thân gỗ), tự động hóa vòi phun và nhân giống, gia súc 5 sao, câu đủ 15 loài cá, củ khổng lồ 3x3, giữ thể lực trên 10% từ 06:00 đến 23:00.
5. **Tri Kỷ & Hàn Gắn (Heart Bonds - 6 Thành tựu):** 2 Tim với toàn bộ 51 nhân vật, hóa giải Boris & Bram, hóa giải Kael & Maeve, tha thứ Hester & Valerius, 8 Tim với 30 cư dân, Lời Thề Bếp Lửa 10 Tim kết duyên.
6. **Tái Thiết & Cầu Siêu (Restoration & Altars - 5 Thành tựu):** Hoàn thành 12 công trình Town Board, Đại Tiệc Cầu Siêu thanh tẩy Bàn Thờ Cổ Đại giải phóng đất hoang, thông thương 4 tuyến liên vùng, hoàn thiện Viện Bảo Tàng 30 cổ vật của Iris, khách quen 4 tuần Chợ Đêm Thứ Bảy.
7. **Dị Biệt & Hài Hước (Quirky & Secrets - 14 Thành tựu Ẩn):** Nồi trứng phát hỏa cùng Colm, Milo kẹt đũng quần trên hàng rào, ủng dính bùn chọc giận Barnaby, đẩy lừa Silas bất động 3 phút, ngất xỉu rớt sạch đồ ở đúng Tầng 149 cửa trùm, say rượu đầm lầy của Lão Tad, mèo Mallow ngủ phớt lờ 20 lần vuốt, ù tai cạnh bom mỏ Gomer, ăn nấm phát quang bị ảo giác tím, ăn vụng nửa đêm bị mèo và cú nhìn chằm chằm, trượt vỏ băng hồ Vael ngã dập mông 5 lần, chặt cây thông đè bẹp hàng rào bà Maeve, đòi nợ khách quịt chỉ được củ cải khô, bị đàn cừu Tilly vây kín 30 giây.

### 11.3. Tính Năng Tương Tác Của "Tab Hồ Sơ" (Player Profile Tab)
1. **Trang Bị Danh Hiệu Tác Động Thoại NPC (Dynamic Active Titles):** Người chơi tự do chọn danh hiệu đã mở (ví dụ: *Bếp Trưởng Oakhaven*, *Kẻ Nổ Bếp*, *Bậc Thầy Đỡ Đòn*, *Kẻ Suýt Thắng*...). NPC sẽ chào hỏi Rowan bằng danh hiệu tương ứng.
2. **Kệ Trưng Bày Lò Sưởi The Hearth (Trophy Mantle):** Cho phép đặt các kỷ vật độc bản (Cuốc vàng Boris, Nơ cung bạc Valerie, Kiếm gỗ Valerius, Cúp pha lê vực thẳm...) lên lò sưởi, trực tiếp tăng Cozy Rating thu hút khách quý tộc.
3. **Bảng Thống Kê Sinh Hoạt Đời Thường (Quirky Stats Counter):** Ghi nhận số củ khoai đã nhổ, số lần Colm vác cáng khiêng về giường, số lần bị Barnaby lườm, số tiền nợ chưa đòi được, số củi đã chẻ.

---

## 12. Hệ Thống Bảng Tin Dân Sinh & Đơn Tiếp Tế Cơm Hộp (Town Board, Provision Orders & Freshness Mechanics)

### 12.1. Bản Đồ Mạng Lưới 3 Bảng Uỷ Thác Cốt Lõi
1. **Bảng Gỗ Trước Hiên Quán The Hearth (The Porch Notice Board):** 
   - Đặt ngay hiên trước quán ăn The Hearth. Dân làng ghim giấy nhờ vả lặt vặt sinh hoạt (nông cụ gỉ sét, củ cải cho heo ăn, nợ môn quán tạp hóa, gỗ khô vá mái nhà dột, thịt xông khói chống rét...).
   - Làm mới 2 - 3 đơn ngẫu nhiên mỗi sáng Thứ Hai và Thứ Năm. Thời hạn 2 - 3 ngày.
2. **Bảng Tiền Đồn Mỏ & Hiệp Hội Mạo Hiểm (Adventurer's Guild Provision & Bounty Board):**
   - Đặt tại trụ sở Hiệp Hội Mạo Hiểm cạnh cửa thang máy mỏ do Hội Trưởng Thorne và Valerie quản lý.
   - Chuyên các hợp đồng cơm hộp viễn chinh tiếp tế cho thợ lặn hồ băng, thợ mỏ bộc phá, lệnh tiễu phạt quái Blight và săn Boss Warden. Thưởng **Huy Hiệu Cứu Viện** đổi lại vũ khí/trang bị thất lạc (Lost & Found).
3. **Bảng Tái Thiết Thị Trấn Oakhaven (Town Restoration Board):**
   - Đặt tại Quảng Trường Trung Tâm trước Tòa Thị Chính do Thị Trưởng Oakwood chủ trì.
   - Nơi toàn bộ cộng đồng chung tay đóng góp vật tư, nông sản và ngân khố để khôi phục các Đại Công Trình (Kênh Thủy Lợi, Tuyến Cáp Treo, Tuyến Đường Sắt Trung Tâm).

### 12.2. Phân Cấp Hộp Đựng Dã Chiến & Kéo Dài Độ Tươi (Expedition Bento Packaging)
Thức ăn dã chiến được đóng gói tại Bàn Đóng Gói (góc bếp The Hearth) thành 3 cấp. Hộp Bento có công năng đặc biệt là **kéo dài thời gian Nóng Hổi (Freshness Bonus)** trước khi thức ăn nguội thành trạng thái Tiêu Chuẩn:
1. **Tier 1 - Hộp Gỗ Thông Thô:** Chế tạo từ *4 Gỗ mềm + 1 Dây bện*. Đựng cơm nắm, bánh mì khô, rau luộc. **Kéo dài trạng thái Nóng Hổi (Fresh Bonus) trong 48 Giờ (2 ngày)**.
2. **Tier 2 - Hộp Thiếc Chống Gỉ:** Chế tạo từ *2 Thỏi Thiếc + 1 Đệm sáp*. Đựng súp đặc, thịt hầm, cá áp chảo. Chống va đập hầm mỏ, **kéo dài trạng thái Nóng Hổi trong 72 Giờ (3 ngày)**.
3. **Tier 3 - Cặp Lồng Giữ Nhiệt Sơn Mài:** Chế tạo từ *1 Hộp Thiếc + 2 Len Cừu + 1 Dầu Trẩu*. Đựng đại tiệc 3 món cho khách quý tộc và toán thám hiểm sâu. **Kéo dài trạng thái Nóng Hổi trong 120 Giờ (5 ngày)**.

### 12.3. Quy Chuẩn Độ Tươi & Nóng Hổi (The Freshness Bonus - Tuyệt Đối Không Thiu Thối)
- **Quy tắc bất biến:** **Không áp dụng hạn sử dụng làm thối/hỏng thức ăn thành rác**. Trong bối cảnh hậu chiến khan hiếm lương thực, mọi cọng rau củ khoai đều quý giá.
- **Trạng thái Nóng Hổi (Fresh - Trong vòng 24h nếu để ngoài, hoặc kéo dài theo cấp Hộp Bento):**
  - Bán tại The Hearth: Thực khách khen ngợi, tip thêm **+20% tiền vàng**, tăng nhẹ điểm Cozy.
  - Giao đơn Bảng tin: Nhận thêm quà vặt của dân làng (vài củ hành, nắm muối hầm, quả rừng).
  - Ăn khi đi mỏ: Nhận thêm buff phụ ngắn hạn (+5% Tốc độ chạy hoặc hồi 10 Stamina ngay lập tức).
- **Trạng thái Tiêu Chuẩn (Standard - Sau khi hết thời gian giữ nhiệt của hộp hoặc sau 24h):**
  - Đồ ăn nguội đi thành đĩa thức ăn thông thường, **tự động gộp xếp chồng (Stack x99)** vào 1 ô túi đồ (không phân mảnh ô nhớ).
  - Giữ nguyên 100% chỉ số buff chiến đấu (Công, Thủ, Tốc, Kháng nguyên tố) và bán đúng 100% giá niêm yết.
- **Nhóm Thực Phẩm Bảo Quản (Preserved Provisions):** Thịt hun khói, phô mai ủ hầm gác mái, lươn sấy khô, bánh quy nướng nứt nham — bản chất khô ráo không bao giờ nguội, chuyên dùng dự trữ thám hiểm 150 tầng mỏ.


### 12.4. Hệ Sinh Thái Nhiệm Vụ Đa Tầng (Layered Quest Ecosystem) & Mở Khóa Độc Bản
Nhằm kiến tạo chiều sâu gameplay và triệt tiêu lối mòn "chạy việc vặt nhạt nhẽo" (fetch quests), hệ thống nhiệm vụ được phân thành **5 Phân Loại Trọng Tâm**, nơi các nhiệm vụ khó mở khóa trực tiếp các **Thành Tựu Ẩn**, **Công Thức Thất Truyền**, **Bản Vẽ Cơ Khí**, **Kỷ Vật Ba Lô Thụ Động (Passive Relics)** và **Đồ Trang Trí Nội Thất Tăng Điểm Ấm Cúng (Cozy Rating)**:

1. **Nhánh Thường Nhật & Tương Trợ Dân Sinh (Routine Errands):** 
   - Đơn lặt vặt của 51 cư dân đăng tải vào Thứ Hai và Thứ Năm trên Bảng Gỗ Hiên Quán The Hearth.
   - Thù lao: Vàng tiêu vặt (50g - 250g), điểm thân mật (+100 Tim), hạt giống rau mùa vụ, rau củ gia vị phụ.
2. **Nhánh Môi Trường Khắc Nghiệt & Cứu Hộ Dã Ngoại (Hazard & Frontier Survival):** 
   - Kích hoạt vào ngày bão tuyết, mưa lũ, sương mù độc hoặc sự cố sập vách mỏ tầng sâu. Yêu cầu giao hộp cơm Bento nóng hổi trước giờ giới nghiêm hoặc giải cứu nạn nhân mắc kẹt.
   - Phần thưởng: Kỷ vật chống rét, áo choàng dã chiến, bản vẽ balo cách nhiệt, thành tựu ẩn.
3. **Nhánh Chuỗi Khúc Mắc Lâu Năm & Hóa Giải Quá Khứ (Grounded Multi-Stage Narrative Questlines):** 
   - Các chuỗi nhiệm vụ 3 giai đoạn khai thác góc khuất tâm lý hậu chiến mộc mạc của các cặp nhân vật (Boris & Bram mâu thuẫn xưởng rèn mộc; Hester & Valerius về lời thề vệ binh danh dự; Valen de Montfort trốn chạy tai mắt Solaria...).
   - Phần thưởng: Bàn chế tác cơ khí liên hoàn, bàn cờ gỗ sồi tăng Cozy Rating, công thức quý tộc Solaria.
4. **Nhánh Tiễu Phạt Thợ Săn Tinh Anh & Trảm Warden Kèm Ràng Buộc (Tactical Warden & Cavern Bounties):** 
   - Niêm yết tại Bảng Tiền Đồn Mỏ. Hạ gục Boss Warden Tầng 30, 70, 110, 150 với điều kiện chiến thuật nghiêm ngặt (Master Parry 15 lần, không dùng bình thuốc Aurelia, chỉ dựa vào buff đồ ăn Bento, hoàn thành trong thời gian thanh miasma dưới 50%).
   - Phần thưởng: Huy Hiệu Cứu Viện, Đầu lâu quái vật tinh anh trưng bày lò sưởi (+Cozy Rating), danh hiệu hồ sơ độc bản.
5. **Nhánh Đại Lễ Cầu Siêu & Giải Phóng Đất Hoang (Ancient Altar Cleansing & Land Reclamation):** 
   - Người Giữ Đền Rosemary chủ trì tại 4 Bàn Thờ Cổ Đại (4 mùa Xuân - Hạ - Thu - Đông). Nấu mâm đại tiệc thanh lọc 5 món chuẩn 3 Sao dâng lên bệ thờ lúc nửa đêm và chống đỡ đợt linh hồn chiến trận thức tỉnh.
   - Phần thưởng: Thanh tẩy vĩnh viễn bãi chiến trường tro tàn thành **Vườn Thảo Dược Vĩnh Cửu** (cây trồng không héo úa theo mùa), Lư hương đồng cổ đại (+Tối đa Cozy Rating), Công thức Trà Tẩy Trần Ngàn Năm.

### 12.5. Danh Mục Nhiệm Vụ Khó Điển Hình & Ma Trận Phần Thưởng Mở Khóa Độc Quyền

| Mã & Tên Nhiệm Vụ | NPC Giao | Điều Kiện Thử Thách Khắc Nghiệt | Phần Thưởng Độc Quyền Mở Khóa |
| :--- | :--- | :--- | :--- |
| **Q-HAZ-01: Bát Canh Bão Tuyết Lên Đèo** | Hiệp Sĩ Hester | Giao 1 Cặp lồng sơn mài *Súp Bí Đỏ Gừng Củ* lên chòi đèo tuyết lúc 20:00 - 23:00 đêm bão tuyết; không để ngất vì cóng lạnh. | 🏆 Thành tựu ẩn: `ACH_BLIZZARD_RUNNER` *(Người Vượt Bão Tuyết)*<br/>🧿 Kỷ vật: *Khăn Len Cũ Của Hester* (giảm 50% tụt Stamina khi làm việc dưới mưa tuyết)<br/>🛋️ Trang trí: *Bản Đồ Hành Quân Cổ* (+10 Cozy). |
| **Q-HAZ-02: Khí Độc Đáy Hồ Băng** | Thợ Lặn Vael | Lặn đáy hồ mỏ tầng 85 thu thập 3 Băng Tinh Ngàn Năm trong lúc thanh miasma dâng cao; không dùng bình thở dự phòng. | 🏆 Thành tựu ẩn: `ACH_DEEP_DIVER` *(Thợ Lặn Vực Sâu)*<br/>📜 Bản vẽ: *Bộ Lọc Hơi Nước Mỏ Sâu* (miễn nhiễm miasma 5 phút)<br/>🛋️ Trang trí: *Vỏ Ốc Băng Phát Quang* (+12 Cozy). |
| **Q-HAZ-03: Sập Vách Hầm Lò Đêm** | Lão Gomer | Vận chuyển 15 Cơm Nắm Nướng Mỡ Hành (Hộp Thiếc) cứu viện toán thợ mỏ mắc kẹt tầng 45 trong vòng 1 ngày. | 🏆 Thành tựu ẩn: `ACH_MINE_SAVIOR` *(Cứu Tinh Thợ Mỏ)*<br/>📜 Bản vẽ: *Máy Khoan Hơi Nước Cầm Tay Gomer* (đào đá nhanh x2, -50% Stamina)<br/>💰 800g + 10x Thuốc Nổ Bộc Phá. |
| **Q-LORE-01: Lò Rèn & Thước Gỗ (Boris & Bram)** | Boris & Bram | Tìm lại *Bản Vẽ Xưởng Rèn Liên Hoàn Thất Lạc* tại Tầng 65 mỏ; phục vụ món *Bánh Mì Nướng Men Rượu Táo* cho cả hai tại The Hearth. | 🏆 Thành tựu ẩn: `ACH_ANVIL_AND_TIMBER` *(Lò Rèn Cùng Thước Gỗ)*<br/>📜 Bản vẽ: *Bàn Chế Tác Cơ Khí Liên Hoàn* (-20% nguyên liệu rèn/gỗ)<br/>🛋️ Trang trí: *Bàn Cờ Gỗ Sồi Của Hai Lão Già* (+15 Cozy). |
| **Q-LORE-02: Bóng Đêm Hoàng Tộc Solaria** | Valen de Montfort | Nấu *Súp Bổ Máu Củ Dền Thảo Mộc 3 Sao* trong Cặp lồng sơn mài; lén giao lên phòng kín lầu 2 sau 23:00; né tránh lính tuần tra. | 🏆 Thành tựu ẩn: `ACH_SOLARIA_SHADOW` *(Bóng Đêm Solaria)*<br/>📜 Công thức gia truyền: *Súp Bổ Máu Solaria* (Hồi 100 HP, +20% Kháng Vật Lý)<br/>🛋️ Trang trí: *Bộ Dao Nĩa Bạc Hoàng Triều* (+20 Cozy, hút khách sang). |
| **Q-LORE-03: Chiếc Cúc Áo Người Lính Cũ** | Bé Cora | Lặn mò ven suối tìm chiếc Cúc Áo Bạc Quân Đội của cha Cora bị lũ cuốn; làm 1 đĩa Bánh Quy Hạt Phỉ an ủi bé. | 🏆 Thành tựu ẩn: `ACH_PROMISE_BY_STREAM` *(Lời Hứa Bờ Suối)*<br/>🧿 Kỷ vật: *Vòng Đá Cuội Bảy Màu May Mắn* (+5% Tỉ lệ Né đòn vĩnh viễn)<br/>🛋️ Trang trí: *Bức Tranh Bờ Suối Vẽ Tay Của Cora* (+10% khách tip thêm). |
| **Q-LORE-04: Sổ Môn Không Thể Xóa** | Bác Barnaby | Đòi lại 1,200g nợ mua rượu cũ từ 3 khách trọ quịt nợ dạt ra bìa rừng; hoặc tự bù tiền nếu thương hại họ. | 🏆 Thành tựu ẩn: `ACH_DEBT_COLLECTOR` *(Tay Hòm Chìa Khóa)*<br/>🧿 Kỷ vật: *Sổ Ghi Nợ Bọc Da Của Barnaby* (xem trước biến động giá nông sản/quặng ngày mai)<br/>💰 Barnaby chia 30% tiền nợ thu hồi. |
| **Q-HUNT-01: Bức Tường Thép Trước Warden Bọ** | Hiệp Sĩ Hester | Tiêu diệt Warden Bọ Hung Tầng 80 với điều kiện thực hiện tối thiểu 12 lần Master Parry chuẩn xác; HP không tụt dưới 80%. | 🏆 Thành tựu ẩn: `ACH_PARRY_MASTER` *(Bậc Thầy Đỡ Đòn)*<br/>🛋️ Trang trí: *Đầu Lâu Warden Bọ Hung Mạ Vàng* (treo tường The Hearth, +15% tip từ thợ mỏ)<br/>⚔️ Danh hiệu: *"Bức Tường Thép Oakhaven"*. |
| **Q-HUNT-02: Bữa Tiệc Sinh Tồn Dung Nham** | Hội Trưởng Thorne | Quét sạch 3 tầng Đới Dung Nham (71-73) không dùng bình thuốc Aurelia; chỉ sống sót bằng buff từ Cơm hộp dã chiến mang theo. | 🏆 Thành tựu ẩn: `ACH_IRON_STOMACH` *(Sinh Tồn Ẩm Thực)*<br/>📜 Bản vẽ: *Ba Lô Cách Nhiệt Dã Ngoại* (+8 ô chứa đồ, giữ thức ăn tươi gấp đôi)<br/>🏅 15x Huy Hiệu Cứu Viện. |
| **Q-ALTAR-01: Khúc Ca Cầu Siêu Tiết Xuân Phân** | Rosemary | Nấu mâm đại tiệc 5 món Xuân (Cải thìa xào nấm sao, Canh củ sen tuyết...) dâng Bàn Thờ Cổ lúc nửa đêm; trảm 3 đợt Hồn Ma Miasma. | 🏆 Thành tựu ẩn: `ACH_ASHES_TO_BLOOM` *(Hóa Giải Tro Tàn)*<br/>🌱 Mở khóa: *Vườn Thảo Dược Vĩnh Cửu Bìa Rừng* (trồng thảo mộc quanh năm)<br/>🛋️ Trang trí: *Lư Hương Đồng Bàn Thờ Cổ* (+25 Cozy Rating, max cấp). |

---

## 13. Hệ Thống Đại Lễ Hội Đa Vùng Đất, Khách Phương Xa & Chợ Phiên Sưu Tầm (Regional Festivals, Outlander Merchants & Pop-up Street Stalls)

### 13.1. Bản Sắc 4 Đại Lễ Hội & Tinh Gọn 2 Hoạt Động Cốt Lõi Mỗi Mùa (Solo-Dev Scope)
Để tránh phình to tính năng (Feature Creep) và quá tải thời gian trong ngày lễ, mỗi lễ hội được chuẩn hóa thành **đúng 2 hoạt động chính** (tái sử dụng 100% vòng lặp cơ bản: đập đá, nấu ăn, đỡ đòn, đối thoại) + **1 Sạp ẩm thực lưu động**. Người chơi được cấp **2 Vé Hoạt Động (Activity Points)** trong ngày, vừa đủ để trải nghiệm trọn vẹn 100% nội dung (Vé 1 ca sáng, Vé 2 ca chiều/tối):

1. **Mùa Xuân (Ngày 15) - Đại Lễ Cầu Siêu & Chợ Cổ Rừng Thầm Thì (Bìa Rừng Đền Cổ):**
   - *Vùng đất:* Bìa Rừng Thầm Thì & Bàn Thờ Cổ Đại (Rosemary trông coi).
   - *Bản sắc:* Tâm linh, tưởng niệm tử sĩ viễn chinh, nạo vét kênh mương dẫn nước ngọt và tẩy uế khí độc miasma.
   - *2 Hoạt động cốt lõi:*
     1. **Hội Đập Cự Thạch Nạo Mương:** Dùng cuốc/bom đập đá nghẽn dòng nước. Phân bậc: Đập 2 đá mở tạm kênh; đập sạch 5 đá mở vĩnh viễn dòng nước ngọt + 50 Tem. *(Đường lùi: Bảng Tái Thiết mở ngay Tuần 1 mùa Xuân, nộp 30 Gỗ + 20 Đá mỏ để Boris nạo sau 3 ngày nếu lỡ lễ).*
     2. **Dâng Mâm Cỗ Thanh Tẩy Bàn Thờ Cổ:** Dâng mâm cỗ 3 món (Canh củ sen, Cơm lam, Nấm rừng) nhận +40 Tem Phiếu hợp tác.
   - *Khách phương xa:* Tu sĩ viễn xứ, thảo dược sư rừng già, sạp khảo cổ Iris.
   - *Hàng sưu tập Tem Phiếu:* *Hạt Giống Trà Sen Tuyết* (cây thâm canh cao sản, không phải blocker), *Bào Tử Nấm Phát Quang*, *Dao Bạc Cắt Rễ Thảo Dược*, *Chuông Gió Đồng Cổ* (+12 Cozy).

2. **Mùa Hạ (Ngày 18) - Hội Chợ Nước & Đêm Đèn Lồng Bờ Suối (Bến Cảng Bờ Hồ & Đầm Lầy):**
   - *Vùng đất:* Bến Cảng Hồ Nước Ngọt nối liền Đầm Lầy Lau Sậy (khu vực Vael & Lão Tad).
   - *Bản sắc:* Phóng khoáng, mùi cá nướng và rượu rum; tôn vinh thợ lặn mỏ băng và đoàn thủy thủ đại dương.
   - *2 Hoạt động cốt lõi:*
     1. **Võ Đài Thử Thách Đỡ Đòn (Parry Challenge):** Đứng lôi đài cùng Valerius & Hester. Phân bậc rõ rệt: Cấp Tân Binh (Novice - cửa sổ canh 1.0s) nhận **Huy Hiệu Đồng (−5% độ hao mòn vũ khí mỏ)**; Cấp Bậc Thầy (Master - 8 Tim) nâng cấp lên **Huy Hiệu Vàng (−15% độ hao mòn)**.
     2. **Đêm Thả Thuyền Đèn Bờ Suối (19:30):** Chèo thuyền nan ra hồ ngắm đom đóm (+40 Tem). Nếu chưa có tri kỷ 4 Tim, Rowan có thể đi cùng Bô lão (Bà Maeve / Lão Silas) kể chuyện xưa (+tình thân, hạt giống hiếm) hoặc tự thả thuyền một mình (nhận Buff Tâm Hồn Tĩnh Lặng: +30 Stamina, +10% tốc chạy hôm sau).
   - *Khách phương xa:* Đoàn thuyền buôn 3 cột buồm của Thuyền Trưởng Garrick & lái buôn san hô Nam Hải.
   - *Hàng sưu tập Tem Phiếu:* *Hạt Giống Dưa Lưới Tinh Vân*, *Bụi Ớt Quỷ Biển Đỏ*, *Cần Câu Trúc Biển Sâu Garrick*, *Bình Nuôi Đom Đóm* (+15 Cozy).

3. **Mùa Thu (Ngày 20) - Hội Đấu Xảo Giao Thương & Chợ Đường Sắt Kinh Đô (Quảng Trường & Ga Tàu):**
   - *Vùng đất:* Quảng trường Oakhaven nối liền Ga Tuyến Đường Sắt Trung Tâm.
   - *Bản sắc:* Kinh tế bùng nổ, đón các đoàn tàu hỏa từ Kinh Đô Solaria và các thành bang cơ khí.
   - *2 Hoạt động cốt lõi:*
     1. **Cuộc Thi Đấu Xảo Ẩm Thực (Culinary Contest):** Tranh tài món ăn chấm theo Độ Tươi (Freshness) và Sao nguyên liệu. Phân bậc: Đạt 100-199 điểm nhận **+4% Giá bán món chính vĩnh viễn**; Đạt giải Nhất (200+ điểm) nhận **+8% Giá bán món chính vĩnh viễn** (năm sau thi lại để nâng cấp).
     2. **Hội Đấu Giá Nông Sản Khổng Lồ:** Đặt củ quả 3x3 lên bục chấm điểm quy đổi hàng nghìn vàng và nhận cúp danh dự.
   - *Khách phương xa:* Đoàn tàu hỏa Solaria, quý tộc, thương nhân xe lừa Lão Silas.
   - *Hàng sưu tập Tem Phiếu:* *Giống Nho Đêm Solaria*, *Hạt Giống Củ Dền Cung Đình*, *Bản Vẽ Máy Gieo Hạt Hơi Nước*, *Bộ Dao Nĩa Bạc Hoàng Triều* (+20 Cozy).

4. **Mùa Đông (Ngày 28) - Đêm Lửa Trại Đỉnh Răng Sói & Đại Tiệc Giao Thừa (Đỉnh Núi Tuyết & The Hearth):**
   - *Vùng đất:* Ban ngày tại Trạm Cáp Treo Đỉnh Răng Sói; Đêm rút về Đại sảnh Quán The Hearth.
   - *Bản sắc:* Sinh tồn băng giá ấm áp tình người; hội ngộ thợ mỏ người lùn tuyết, lính biên phòng và kẻ tha hương.
   - *2 Hoạt động cốt lõi:*
     1. **Nồi Lẩu Bách Vị Đại Ngàn (3 Ô Nguyên Liệu):** Rowan bắt buộc đóng góp đủ 3 nhóm (Ô 1 Tinh bột + Ô 2 Protein + Ô 3 Thảo mộc/Men ủ). Góp đủ nhận ngay **Sổ Tay Công Thức Bà Amalia Tập 2** (nếu bỏ lỡ, sáng hôm sau Clara nhặt được gửi vào hòm thư với phí chuộc 300g). Điểm thân mật phân tầng: +20 đến +80 điểm nền cả làng, và **+50 điểm riêng cho NPC có món ăn ưa thích trùng nguyên liệu trong nồi**. Nếu chạm trần tim, điểm dừng lại hiện thông báo mở khóa tâm sự và đổi điểm dư thành quà mật ong/bánh quy.
     2. **Tâm Sự Bên Lò Sưởi Giao Thừa (23:00):** Cùng toàn bộ cư dân nâng chén rượu táo, hàn gắn ân oán năm cũ (+40 Tem hợp tác).
   - *Khách phương xa:* Phường thợ nung đá người lùn Bắc Cực, lính trinh sát biên giới.
   - *Hàng sưu tập Tem Phiếu:* *Hạt Giống Hoa Tuyết Liên*, *Rễ Địa Y Lạnh*, *Cuốc Chim Bọc Đá Băng Cực Hạn*, *Tấm Da Gấu Tuyết* (+25 Cozy).

### 13.2. Cơ Chế Kinh Doanh Của Rowan: Sạp Ẩm Thực Lưu Động (Pop-up Street Stall) & Cân Bằng Kinh Tế
- **Vận hành sạp lưu động:**
  - Menu bán nhanh mang đi (Xiên nướng than, Bánh bao hấp, Trà thảo mộc, Bánh quy).
  - Tự Rowan đứng bán: Nhận 100% doanh thu vàng + 1 Tem Phiếu/đĩa. Sức chứa khay giữ nhiệt Năm 1 tối đa 60 đĩa. Phí mặt bằng 50g (Năm 1), doanh thu ròng ~1.150g (gấp ~2.3 lần ngày thường 350g-600g, cân bằng kinh tế).
  - Nhờ trẻ nhỏ trông sạp (Kael / Penny - phí 50g): Chỉ đạt **60% doanh thu** và **0 Tem Phiếu** (chống lạm dụng để ăn gian hoạt động).
- **Quy chuẩn Tiền tệ Tem Phiếu Hội Chợ (Fair Tokens):**
  - Dùng **1 loại Tem Phiếu chung** xuyên suốt 4 mùa. Tối đa kiếm được ~560 Tem/năm.
  - Mở **Tủ Đồ Lưu Niệm tại sảnh Tòa Thị Chính** quanh năm để tiêu tem tích lũy.
  - Chốt sổ thu hồi vào đúng **26:00 (tức 02:00 sáng hôm sau)** đêm 28 Mùa Đông. Cú Pip gửi thư quy đổi tiền vàng (, tối đa ~2.800g không lạm phát) vào hòm thư **Sáng ngày 01 Mùa Xuân**.
  - Các mặt hàng độc quyền nếu bỏ lỡ sẽ được Thuyền buôn Garrick bán lại từ **Năm 2** với giá bằng vàng **gấp 2.5 lần** (giữ vững giá trị cày cuốc).

### 13.3. Tối Ưu Asset Đồ Họa Cho Lễ Hội (Zero Asset Creep)
- **Bản đồ:** Tái sử dụng 100% các vùng đất có sẵn trong game (Đền cổ, Ga tàu, Bến hồ, Đỉnh núi), chỉ bật layer tilemap lều bạt sự kiện tĩnh ().
- **Khách phương xa (NPC Tier 3):** Tận dụng khung xương chung (Body Rigs) và đổi bảng màu (Palette Swap) cho trang phục.
- **Vật phẩm sưu tập:** Sử dụng item icon 16×16 và sprite nội thất tĩnh 32×32 đặt tại The Hearth.

