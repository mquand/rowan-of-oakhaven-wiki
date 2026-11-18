# Cẩm Nang Lâm Nghiệp, Cây Ăn Quả & Nông Nghiệp Oakhaven

> *"Khi chiến tranh đi qua, thứ đầu tiên mà thần linh gửi lại cho thung lũng không phải là vàng bạc, mà là những hạt mầm ngủ vùi dưới tro tàn. Trồng xuống một cây sồi hôm nay là dựng nên mái nhà cho thế hệ mai sau."*  
> — **Trích nhật ký lâm học, Maeve của Vườn Ươm Oakhaven**

Hệ thống thực vật và thổ nhưỡng của Oakhaven được chia thành **ba phân hệ cốt lõi**:
1. **Cây Lâm Nghiệp Lấy Gỗ & Trích Nhựa (Silviculture & Timber Trees)**: Nguồn cung gỗ tròn, củi sưởi cho quán trọ và các loại nhựa, siro quý giá qua bình trích nhựa.
2. **Cây Ăn Quả Lâu Năm (Perennial Fruit Orchards)**: Đầu tư dài hạn với quy tắc không gian $3\times3$, sinh trưởng vĩnh cửu, cho quả mọng tươi ngon mỗi ngày theo mùa và nâng cấp phẩm chất sao theo năm tuổi.
3. **Cây Nông Nghiệp Ngắn Ngày (Annual Field Crops & Trellises)**: Rau củ, ngũ cốc bốn mùa gieo trên đất cày, tận dụng phân bón tro bếp và kỹ thuật giàn leo để đạt sản lượng tối đa phục vụ Quán Ăn & Nhà Trọ Oakhaven.

---

## Phân Hệ 1: Cây Lâm Nghiệp Lấy Gỗ & Trích Nhựa

Cây lấy gỗ có thể gieo từ hạt non (nhặt được khi đốn cây, rung cây hoặc mua từ Vườn Ươm Maeve) trên bất kỳ ô đất trống nào. Cây không đòi hỏi phải cuốc đất hay tưới nước hàng ngày.

```
       [Giai Đoạn 0: Hạt/Mầm]
                │ (25% thời gian)
                ▼
       [Giai Đoạn 1: Cây Nhỡ]
                │ (50% thời gian)
                ▼
       [Giai Đoạn 2: Cây Non]
                │ (75% thời gian)
                ▼
  [Giai Đoạn 3: Cận Trưởng Thành]
                │ (100% thời gian)
                ▼
     [Giai Đoạn 4: ĐẠI THỤ TRƯỞNG THÀNH]
           /                    \
   [Đốn Hạ Bằng Rìu]       [Gắn Bình Trích Nhựa]
          │                         │
  12-16 Gỗ + Củi Khô        Thu hoạch Nhựa/Siro
   + Để lại Gốc Cây          định kỳ 5-10 ngày
```

### Danh Mục 6 Loài Cây Lâm Nghiệp Đại Thụ

| Tên Cây | Hạt Giống | Ngày Lớn | Sản Lượng Gỗ Khi Đốn | Sản Phẩm Bình Trích Nhựa (Tapper) | Chu Kỳ Nhựa | Yêu Cầu Dụng Cụ | Ứng Dụng Tái Thiết & Quán Ăn |
| :--- | :--- | :---: | :--- | :--- | :---: | :--- | :--- |
| **Cây Sồi Oakhaven** (*Great Oak*) | `seed_oak_acorn` | 24 ngày | 12-16 Gỗ Sồi Già (`item_wood_oak`) + 4-6 Củi Khô | **Nhựa Sồi Đen Thơm** (`item_oak_resin`) | 7 ngày | Rìu Thường (10 nhát) | Sửa Cầu Đá Oakhaven, Thùng Lên Men, Bàn Ghế Quán Trọ |
| **Cây Thông Dẻo Tuyết Sơn** (*Alpine Pine*) | `seed_pine_cone` | 22 ngày | 12-16 Gỗ Thông Dẻo (`item_wood_pine`) + 3-5 Củi Khô | **Hắc Nhựa Thông Dẻo** (`item_pine_tar`) | 5 ngày | Rìu Thường (8 nhát) | Chống thấm gầm thuyền Bến Cảng, Đuốc hầm mỏ, Thùng ủ men |
| **Cây Phong Hoàng Kim** (*Ember Maple*) | `seed_maple_seed` | 24 ngày | 10-14 Gỗ Phong Vân Hồng (`item_wood_maple`) | **Siro Phong Hổ Phách** (`item_maple_syrup`) | 9 ngày | Rìu Thường (9 nhát) | Bánh kếp mật ong quán trọ (+75 Năng Lượng), Bàn ăn VIP |
| **Cây Bạch Dương Trắng** (*Silver Birch*) | `seed_birch_catkin` | 20 ngày | 10-14 Gỗ Bạch Dương (`item_wood_birch`) + 2-4 Vỏ Cuộn | **Nước Nhựa Bạch Dương** (`item_birch_sap`) | 6 ngày | Rìu Thường (8 nhát) | Rương đồ, Đuốc sáng lâu tàn, Nước khoáng thanh lọc cơ thể |
| **Cây Liễu Gai Thủy Ngạn** (*River Willow*) | `seed_willow_cutting` | 22 ngày | 14-18 Cành Liễu Gai (`item_willow_branch`) + Củi Khô | **Nhựa Liễu Dược Liệu** (`item_willow_sap`) | 6 ngày | Rìu Thường (8 nhát) | Đan rổ cá, nôi trẻ em tị nạn; Thuốc hạ sốt & Kháng lạnh |
| **Cây Thiết Mộc Hắc Ám** (*Abyssal Ironwood*) | `seed_ironwood_pod` | 30 ngày | 8-12 Gỗ Thiết Mộc (`item_wood_ironwood`) | **Dầu Thiết Mộc Chống Gỉ** (`item_ironwood_oil`) | 10 ngày | **Rìu Sắt trở lên** (16 nhát) | Gia cố dầm mỏ Tầng Sâu, Xe kéo quặng, Chống gỉ công cụ |

### Cơ Chế Khai Thác & Lâm Nghiệp Bền Vững
- **Đốn hạ & Gốc cây (Stumps)**: Đốn hạ cây đại thụ sẽ thu về toàn bộ gỗ tròn và củi khô, để lại một gốc cây. Cần thêm 3-4 nhát bổ rìu để bứng sạch gốc, thu thêm 2-4 khúc gỗ lõi và giải phóng ô đất.
- **Bình Trích Nhựa Thủ Công (`item_tree_tapper`)**: Chế tạo từ `40 Gỗ Sồi` + `2 Thỏi Đồng`. Gắn trực tiếp lên thân cây trưởng thành. Tapper sẽ tự động thu gom nhựa và đổi màu vàng óng khi đã sẵn sàng để Rowan thu hoạch.
- **Rung Cây (Tree Shaking)**: Mỗi ngày, Rowan có thể tương tác rung cây trưởng thành. Có 25% cơ hội rơi rụng hạt sồi, nón thông hoặc quả mọng dại non.
- **Tái sinh tự nhiên**: Rừng Oakhaven có 15% cơ hội tự gieo hạt xuống các ô lân cận nếu không bị rào chắn, tạo nên quần thể rừng tự nhiên xanh tươi.

---

## Phân Hệ 2: Cây Ăn Quả Lâu Năm (Perennial Fruit Orchards)

Khác với cây lấy gỗ, vườn cây ăn trái đòi hỏi sự quy hoạch cẩn thận và vốn đầu tư ban đầu lớn nhưng mang lại dòng thu nhập thụ động bền vững suốt đời nhân vật.

```
┌───────┬───────┬───────┐
│ Ô RỐNG│ Ô RỐNG│ Ô RỐNG│   QUY TẮC KHÔNG GIAN 3x3:
├───────┼───────┼───────┤   Cây ăn quả non cần 8 ô bao quanh
│ Ô RỐNG│ CÂY ĂN│ Ô RỐNG│   hoàn toàn thông thoáng. Không được
│       │  QUẢ  │       │   có cỏ dại, đá tảng, cọc rào hay cây khác
├───────┼───────┼───────┤   trong suốt 28 ngày sinh trưởng đầu tiên!
│ Ô RỐNG│ Ô RỐNG│ Ô RỐNG│
└───────┴───────┴───────┘
```

### Đặc Tính Canh Tác Cây Ăn Quả
1. **Thời gian trưởng thành**: Đúng **28 ngày** (tròn 1 mùa vụ trong game) kể từ khi gieo bầu cây non (`Sapling`).
2. **Không cần tưới nước**: Rễ cây ăn quả ăn sâu vào lòng mạch nước ngầm thung lũng, Rowan không cần mang bình tưới mỗi ngày.
3. **Chu kỳ thụ quả**: Mỗi sáng trong mùa vụ hoạt động, cây tự sinh ra **1 quả tươi**. Nếu Rowan bận việc không thu hoạch, cây có thể lưu trữ tối đa **3 quả** trên tán lá.
4. **Hệ thống Lão Hóa Tăng Phẩm (Quality Aging)**:
   - **Năm 1**: 100% Quả phẩm chất Thường (không sao).
   - **Năm 2**: 100% Quả Bạc (Silver Star 🥈 - Tăng 25% giá bán & hồi phục).
   - **Năm 3**: 100% Quả Vàng (Gold Star 🥇 - Tăng 50% giá bán & hồi phục).
   - **Năm 4 trở đi**: 100% Quả Tinh Hoa Oakhaven (Star Quality ⭐⭐⭐ - Tăng 100% giá bán & hiệu ứng buff đặc biệt).
5. **Kỳ Tích Nhà Kính (Greenhouse Project)**: Khi hoàn thành Dự Án Tái Thiết Số 3 (Nhà Kính Cổ Oakhaven), cây ăn quả trồng bên trong sẽ **cho quả liên tục 365 ngày quanh năm**, bất chấp ngoài trời đang là bão tuyết!

### Danh Mục 8 Cây Ăn Quả Đặc Sản Oakhaven

| Cây Giống | Tên Cây | Mùa Vụ | Giá Cây Giống | Sản Phẩm Thu Hoạch | Giá Bán Cơ Bản | Món Ăn Tiêu Biểu Tại Quán Ăn |
| :--- | :--- | :---: | :---: | :--- | :---: | :--- |
| `seed_sapling_apple` | **Cây Táo Sồi Mật** | Mùa Thu | 900 Vàng | Táo Sồi Mật Ngọt (`item_oakhaven_apple`) | 28 Vàng | Bánh Pie Táo Nóng Oakhaven, Rượu Táo Lên Men |
| `seed_spark_lemon` | **Cây Chanh Sét Vàng** | Mùa Hè | 1,000 Vàng | Chanh Sét Tê Lưỡi (`item_spark_lemon`) | 35 Vàng | Trà Đá Chanh Sét, Sốt Bò Nướng Mùa Hè |
| `seed_sapling_plum` | **Cây Mận Băng Tuyết** | Mùa Đông | 1,000 Vàng | Mận Băng Ruột Đỏ (`item_frost_plum`) | 38 Vàng | Mận Hầm Rượu Vang Đêm, Mứt Mận Chống Cảm |
| `seed_sapling_peach` | **Cây Đào Anh Thảo** | Mùa Xuân | 1,100 Vàng | Đào Mọng Anh Thảo (`item_blossom_peach`) | 42 Vàng | Bánh Nướng Phết Mứt Đào Bữa Sáng Nhà Trọ |
| `seed_sapling_cherry` | **Cây Anh Đào Đỏ Rực** | Mùa Xuân | 950 Vàng | Anh Đào Đỏ Thắm (`item_crimson_cherry`) | 32 Vàng | Bánh Tart Anh Đào Hoàng Gia Oakhaven |
| `seed_sapling_walnut` | **Cây Quả Óc Chó Rừng** | Mùa Thu | 1,200 Vàng | Quả Óc Chó Bùi Béo (`item_walnut`) | 35 Vàng | Bánh Mì Lương Khô Óc Chó Dưỡng Sức Thợ Mỏ |
| `seed_sapling_pear` | **Cây Lê Sương Muối** | Mùa Thu | 1,050 Vàng | Lê Sương Thanh Mát (`item_mist_pear`) | 30 Vàng | Lê Sương Hầm Quế Rừng Quán Ăn |
| `seed_sapling_orange` | **Cây Cam Lửa Oakhaven** | Mùa Hè | 1,000 Vàng | Cam Lửa Mọng Nước (`item_ember_orange`) | 32 Vàng | Nước Cam Ép Đón Khách Trọ Tá Túc Đêm |

---

## Phân Hệ 3: Cây Nông Nghiệp Ngắn Ngày Theo Mùa

Canh tác đồng ruộng là nguồn cung lương thực thiết yếu cho các bữa ăn hàng ngày tại Quán Ăn & Nhà Trọ Oakhaven. Cây trồng đồng ruộng yêu cầu:
- Đất phải được **cày xới bằng Cuốc** (`is_tilled = true`).
- Cần được **tưới nước mỗi ngày** (hoặc đất tự ẩm khi trời mưa / có bình phun nước).
- Nếu không được tưới nước, cây không chết ngay nhưng sẽ bị ngừng lớn ngày hôm đó.

### Phân Loại Canh Tác Đồng Ruộng
1. **Thu Hoạch Một Lần (Single Harvest)**: Cây nhổ cả gốc rễ sau khi thu hoạch (như Lúa mì bạc, Bắp cải băng, Khoai tây tuyết, Củ cải, Củ dền). Cần mua hạt gieo lại.
2. **Cây Lưu Niên Tái Sinh (Regrowable Crops)**: Sau lần thu hoạch đầu tiên, thân cây tiếp tục bám đất và ra quả định kỳ sau mỗi 3-4 ngày (Dâu tuyết, Bắp ngô ánh dương, Cà chua lửa, Bụi trà sen).
3. **Cây Dây Leo Trên Giàn (Trellis Vines)**: Yêu cầu dựng cọc giàn cọc gỗ (Đậu Hà Lan, Nho Đêm). Nhân vật không thể đi xuyên qua ô cọc giàn, cần bố trí lối đi thông minh khi quy hoạch luống đất.
4. **Cây Khổng Lồ (Giant Crops)**: Khi gieo cụm $3\times3$ ô của cùng một loại cây (Bí Ngô Mật, Dưa Hấu Dung Nham, Bắp Cải Băng), mỗi sáng khi cây chín có 2% cơ hội hợp nhất thành một quả khổng lồ sừng sững. Dùng rìu bổ quả khổng lồ thu được **15 đến 20 nông sản** cùng loại!

### Cải Tạo Thổ Nhưỡng Bằng Phân Bón Tự Nhiên
- **Tro Bếp Oakhaven (`item_wood_ash`)**: Chế biến từ tro củi lò sưởi quán trọ. Bón vào đất cày giúp rút ngắn 15% thời gian sinh trưởng.
- **Bột Vỏ Xương Sao (`item_bone_meal`)**: Nghiền từ vỏ sò sông và xương sinh vật hang mỏ. Tăng 30% tỷ lệ thu hoạch nông sản chất lượng Bạc và Vàng.
- **Đất Rêu Rừng Giữ Ẩm (`item_retaining_moss`)**: Trộn mùn rêu đầm lầy vào luống cày. Giúp đất có 50% cơ hội giữ ẩm qua đêm, Rowan không cần tưới lại vào sáng hôm sau.

---

## Phân Hệ 4: Canh Tác Đặc Thù & Nuôi Nấm Rừng

Bên cạnh luống cày truyền thống, thung lũng Oakhaven có 2 phương pháp canh tác sinh thái đặc thù:
1. **Khúc Gỗ Cấy Nấm Rừng (`item_mushroom_log`)**:
   - Chế tạo: `1 Khúc Gỗ Sồi/Gỗ Mục` + `5 Nấm Hương Rừng`.
   - Vận hành: Đặt tại nơi râm mát dưới tán đại thụ hoặc trong hầm đá ẩm ướt của quán trọ.
   - Sản lượng: Cho **Nấm Hương Rừng** (`item_wild_mushroom`) đều đặn mỗi 4 ngày suốt cả 4 mùa quanh năm mà không cần tưới nước.
   - Đột biến ma thuật: Nếu đặt khúc gỗ trong hang tối gần tinh thể lam ngọc, có 10% cơ hội thu được **Nấm Huỳnh Quang Mỏ Sâu** (`herb_lumina_shroom`).
2. **Thảo Dược Đầm Lầy Bán Ngập Nước**:
   - **Sen Băng Tuyết Ngàn Năm (`crop_frost_lotus`)**: Chỉ sinh trưởng trên các ô đất sát mép nước hồ hoặc kênh tưới mùa đông. Đem lại giá trị kinh tế kỷ lục (320 Vàng/bông) cho các nhà giả kim và thương lái phương Bắc.

---

## Chiến Lược Phối Hợp Giữa Lâm Nghiệp, Nông Nghiệp & Quán Trọ

1. **Giai đoạn Đầu Game (Xuân & Hè Năm 1)**:
   - Ưu tiên gieo Lúa Mì Bạc (`crop_silver_wheat`) để có bột mì dự trữ cho Lò Nướng Bánh Đá.
   - Gieo ngay 1 hàng Đậu Hà Lan Giàn Leo và Bụi Trà Sen để có nguồn nguyên liệu pha trà ổn định mỗi tuần.
   - Dành 1 góc đất trống trồng 10 cây Sồi và 10 cây Thông để bắt đầu chu trình tích lũy gỗ phục hồi cầu đá Oakhaven.
2. **Giai đoạn Tích Lũy Vốn (Thu & Đông Năm 1)**:
   - Mua ít nhất 1 Cây Con Táo Sồi Mật (`seed_sapling_apple`) và 1 Cây Con Mận Tuyết (`seed_sapling_plum`) từ Maeve để cây kịp bén rễ cho các mùa tiếp theo.
   - Tận dụng vụ Mùa Thu gieo Bí Ngô Mật Khổng Lồ để tối đa hóa doanh thu từ món Súp Bí Đỏ Hạt Mây.
   - Chế tạo 5 Bình Trích Nhựa gắn lên cây Sồi và Thông để có Nhựa Sồi Đen đóng Thùng Lên Men.
3. **Giai đoạn Tái Thiết Toàn Diện (Năm 2 trở đi)**:
   - Hoàn thành Nhà Kính để đưa toàn bộ 8 loại Cây Ăn Quả vào canh tác 365 ngày quanh năm.
   - Bố trí trang trại gỗ Thiết Mộc ở rìa thung lũng, trích xuất Dầu Thiết Mộc bảo dưỡng toàn bộ công cụ lao động lên độ bền vĩnh cửu.
   - Biến Quán Ăn & Nhà Trọ Oakhaven thành thiên đường ẩm thực tự cung tự cấp đẳng cấp bậc nhất vương quốc!
