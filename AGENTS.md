# ⚠️ QUY TẮC BẮT BUỘC CHO AI AGENT (MANDATORY AGENT RULE)

> **LUÔN ĐỌC GUIDE TRƯỚC KHI SỬA BẤT KỲ FILE NÀO (ALWAYS READ GUIDES BEFORE MODIFYING ANY FILES):**  
> Trước khi thực hiện bất kỳ chỉnh sửa nội dung wiki, dữ liệu JSON nhân vật/địa điểm/vật phẩm, hoặc giao diện UI:
> 1. Agent **BẮT BUỘC PHẢI ĐỌC** tài liệu **[AI_GUIDELINES.md](./AI_GUIDELINES.md)** trong thư mục gốc wiki — đây là cẩm nang quy chuẩn bắt buộc nhằm loại bỏ triệt để 3 lỗi: Sửa thiếu, Xót file và Bỏ qua kiểm chứng.
> 2. Đọc **[OAKHAVEN_DESIGN_COMPENDIUM.md](./OAKHAVEN_DESIGN_COMPENDIUM.md)** để đối chiếu thông số chuẩn mực thiết kế (40 nhân vật, 55 công thức ẩm thực, 32 cây trồng, 150 tầng mỏ, 23 vũ khí, 5 địa danh).
> 3. Khi cần đối chiếu tài liệu game engine gốc, tra cứu sang repository game: **`../rowan-of-oakhaven/HUONG-DAN-SU-DUNG.md` (Mục 7: Bản đồ tài liệu)** và **`../rowan-of-oakhaven/design/game-brief.md`**.
> 4. Tuyệt đối tuân thủ định vị canon: Quán Ăn & Nhà Trọ Oakhaven (Hearth Eatery & Tavern), 40 NPC mang vết thương tâm lý đời thực, bối cảnh hậu chiến Solaria, hầm mỏ 150 tầng thuần Action RPG. Cấm sử dụng các thuật ngữ cũ đã bị loại bỏ (như dỗ dành quái bằng trà, tiệm trà bụi sao).
> 5. **Hai quy tắc bắt buộc khi brainstorm & thiết kế (BẮT BUỘC):**
>    - **Quy tắc Asset thực tế:** Luôn bám sát bài toán khả thi pixel art 2D Godot (phân cấp 3 tầng nhân vật Tier 1 Core, Tier 2 Dịch vụ, Tier 3 Quần chúng; dùng chung body rigs & emote bubbles, tránh phình to asset). Tuyệt đối KHÔNG biến toàn bộ ~160 mốc tim thành cinematic cutscene (bẫy chết dự án): Cấp C (~50% thư tay Pip hòm thư sáng sớm), Cấp B (~35% tâm sự bàn ăn ca tối The Hearth), Cấp A (~15% cutscene đỉnh cao mốc 8/10 Tim).
>    - **Quy tắc Chống Văn Mẫu ChatGPT:** Cấm văn sáo rỗng, sến súa, tự sự self-help triết lý "chữa lành/hàn gắn tâm hồn". Nhân vật phải mộc mạc, thực tế, có tật xấu đời thường (cơm áo gạo tiền, đau nhức khớp, cằn nhằn, bảo thủ). Dark Cozy thể hiện qua hành động cụ thể, không dùng văn mẫu giáo điều.
> 6. **Đường dẫn luôn tương đối từ gốc repo** (`docs/...`, `src/...`). Tuyệt đối không hardcode đường dẫn tuyệt đối (`file:///Users/...`, `D:\...`, `C:\...`).
> 7. **Quy Tắc Báo Cáo Sự Cố & Chống Để User Chờ Lâu (Mandatory Proactive Reporting & Zero Silent Stalling):**
>    - Khi thực thi bất kỳ lệnh build, kiểm thử, script hoặc tác vụ nào: nếu lệnh **chạy không được, thất bại, phát sinh lỗi, bị treo/chậm bất thường (hang/stall) hoặc kéo dài quá lâu (quá 30 giây mà không tiến triển rõ rệt)**, Agent **BẮT BUỘC PHẢI DỪNG LẠI VÀ BÁO CÁO NGAY CHO USER**.
>    - **TUYỆT ĐỐI CẤM** im lặng chờ đợi lệnh chạy nền vô định, cấm để mặc màn hình hoặc bắt user phải chờ đợi sốt ruột mà không có cập nhật rõ ràng. Phải phân tích ngay nguyên nhân gây nghẽn, báo cáo trung thực và đề xuất giải pháp xử lý.

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design rules — BẮT BUỘC (Mandatory)

Mọi thay đổi UI của wiki này PHẢI theo phong cách **Dark Cozy Pixel Art** của game Rowan of Oakhaven. Không dùng phong cách SaaS/landing page generic.

- **Pixel là bắt buộc:** Font pixel (`var(--font-pixel)` / `$font-pixel` — Pixelify Sans) cho logo, tiêu đề display, số liệu, nhãn trang trí; chỉ dùng cho text không dấu/ASCII. Body dùng Manrope (`var(--font-sans)` / `$font-sans`).
- **Khung góc pixel:** Card, panel, khung nội dung phải có class `pixel-frame` (đã định nghĩa trong `src/styles/globals.scss`).
- **Icon:** Chỉ dùng `<Icon name="..." />` từ `src/components/Icon.jsx` (bộ icon Phosphor inline SVG). TUYỆT ĐỐI không dùng emoji làm icon UI.
- **Màu sắc:** Nền phẳng xanh đêm tím (`$color-night-*`), một accent vàng hổ phách (`$color-amber-*`). Không gradient nền, không gradient button — gradient chỉ cho phép trên text hero.
- **Nút bấm kiểu game:** Nền đặc + `box-shadow` cứng đáy, hover nhấc lên, active nhấn xuống.
- **Tokens:** Spacing chỉ dùng thang `$sp-*`, radius `$radius-*`, motion curve `$ease-out` — định nghĩa trong `src/styles/_variables.scss`. Font size theo type scale (12/14/16/18/20/24/30/36/48/60px).
- **Texture:** Sao pixel và ornament kim cương làm bằng SVG data-uri hoặc CSS, không dùng ảnh nặng.

---

## Quy chuẩn song ngữ & Dữ liệu — BẮT BUỘC 100% (Bilingual Parity)

Repository này hoạt động ở chế độ đa ngôn ngữ (`vi` và `en`). Mọi cập nhật dữ liệu hoặc tài liệu PHẢI đồng bộ đầy đủ:

- **Dữ liệu JSON:** Sửa `docs/data/vi/<file>.json` $\rightarrow$ **BẮT BUỘC** cập nhật tương ứng vào `docs/data/en/<file>.json` và file fallback `docs/data/<file>.json`.
- **Tài liệu Markdown:** Thêm/sửa `docs/vi/<doc>.md` $\rightarrow$ **BẮT BUỘC** cập nhật tại `docs/en/<doc>.md` và file fallback `docs/<doc>.md`.
- **Từ điển giao diện:** Thêm nhãn mới tại `src/lib/i18n/dictionaries/vi.js` $\rightarrow$ **BẮT BUỘC** thêm nhãn đó vào `src/lib/i18n/dictionaries/en.js`.
- **Hằng số & nhãn:** Thêm enum/label mới phải đăng ký vào `src/lib/constants.js`.
- **Frontmatter Markdown:** Giữ đúng các trường chuẩn: `title`, `status`, `audience`, `updated`, `tags`, `spoiler`.

---

## Quy chuẩn code & Kiến trúc (Robust Architecture)

- **Không dùng placeholder:** CẤM TUYỆT ĐỐI viết `// ... rest of code`, `/* giữ nguyên */`, `// TODO`. Viết code hoàn chỉnh 100%.
- **Đọc kỹ trước khi sửa:** Luôn dùng `read_file` đọc toàn bộ file trước khi gọi `edit_file` hoặc `write_file`. Cấm đoán mò cấu trúc file.
- **Đối chiếu Design Compendium gốc (BẮT BUỘC):** Khi đối chiếu, sửa đổi hoặc thêm mới bất kỳ thành phần nào (nhân vật, cây trồng, khoáng sản, công thức món ăn, vũ khí, địa danh), BẮT BUỘC phải kiểm tra tài liệu chuẩn [OAKHAVEN_DESIGN_COMPENDIUM.md](./OAKHAVEN_DESIGN_COMPENDIUM.md).
- **Rà soát điểm phụ thuộc:** Dùng `grep` tìm tất cả consumer/call-sites trước khi sửa. Sửa component phải kiểm tra cả `.module.scss` đi kèm.
- **Phân biệt Server vs Client:** File có `'use client'` CẤM import `fs`, `path`, hoặc module Node.js.

---

## Quy chuẩn Viết Nội Dung & Lore Wiki (Anti-AI Cliché & Grounded Tone)

- **Cấm văn sáo rỗng ChatGPT:** Tuyệt đối không dùng văn mẫu triết lý tâm lý học sến súa (*"chữa lành tâm hồn", "hàn gắn vết thương sâu kín", "ánh lên tia hy vọng", "tâm chấn cảm xúc"*).
- **Mộc mạc & Đời thực:** Nhân vật và cốt truyện phải có gai góc, tật xấu đời thường, gắn liền với lo toan cơm áo gạo tiền, mùa màng, nhà dột, chuột cắn lúa, nợ quán, tính khí bộc trực/cộc cằn.
- **Tiết kiệm Asset:** Bám sát cấu trúc 3 tầng NPC (Tier 1 Core 8-10, Tier 2 Dịch vụ 12-15, Tier 3 Quần chúng 15-18), không đặt ra các yêu cầu sprite/animation bất khả thi cho đội ngũ artist.

---

## Kiểm chứng bắt buộc trước khi hoàn thành (Verification)

Trước khi kết thúc lượt phản hồi hoặc commit thay đổi:
1. **Kiểm tra biên dịch:** BẮT BUỘC chạy `npm run build` (phải đạt 0 error, 0 warning; layout, static routes, dynamic routes và SSG đều hợp lệ).
2. **Kiểm tra cây thư mục:** Chạy `git status` xác nhận không có file rác hoặc file thừa bị bỏ xót.
