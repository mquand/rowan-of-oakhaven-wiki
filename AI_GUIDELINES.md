# HƯỚNG DẪN DÀNH CHO AI AGENT: QUY CHUẨN ĐỌC, SỬA FILE & KIỂM TRA TOÀN DIỆN
*(AI Codebase Protocols & Quality Standards — Rowan of Oakhaven Wiki)*

Tài liệu này là quy chuẩn **BẮT BUỘC** đối với mọi AI Agent (Antigravity, Cursor, Copilot, Claude Code, v.v.) khi làm việc trong repository này. Mục tiêu hàng đầu là **loại bỏ triệt để 3 lỗi thường gặp: Sửa thiếu, Xót file và Bỏ qua kiểm chứng**.

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Tuyệt đối không làm tắt / Không dùng code placeholder:**
   - CẤM TUYỆT ĐỐI viết code rút gọn như: `// ... rest of code`, `/* giữ nguyên phần còn lại */`, `// TODO: implement later`.
   - Mọi đoạn code thêm mới hoặc thay thế PHẢI hoàn chỉnh 100%, có thể biên dịch và chạy được ngay.
2. **Luôn đọc kỹ trước khi sửa (Read Before Edit):**
   - CẤM đoán mò nội dung, tham số hoặc cấu trúc dữ liệu.
   - Luôn dùng công cụ đọc file (`read_file`) để nắm rõ toàn bộ logic, các import, export và ngữ cảnh trước khi gọi lệnh sửa (`edit_file` hoặc `write_file`).
3. **Phạm vi hoàn chỉnh (Full-Scope Completeness):**
   - Khi chỉnh sửa một tính năng, không được dừng lại ở một nửa giải pháp. Phải sửa xuyên suốt từ tầng Dữ liệu (JSON / Markdown) $\rightarrow$ Tầng Thư viện logic (Helper / Lib) $\rightarrow$ Tầng Giao diện (Component / SCSS) $\rightarrow$ Định tuyến (Route / Proxy).
4. **Đối chiếu Design Compendium gốc (Single Source of Truth — BẮT BUỘC):**
   - Khi chỉnh sửa, đối chiếu hoặc bổ sung bất kỳ thành phần nào (22 nhân vật, 20 cây trồng, 17 quặng kim loại, 11 đá quý, 33 công thức ẩm thực, 23 vũ khí, 5 địa danh), **BẮT BUỘC PHẢI MỞ VÀ CHECK TÀI LIỆU [OAKHAVEN_DESIGN_COMPENDIUM.md](./OAKHAVEN_DESIGN_COMPENDIUM.md)**.
   - Tuyệt đối không tự ý bịa đặt thông số, tên gọi, công thức hoặc hiệu ứng sai lệch so với Compendium chuẩn. Khi mở rộng hoặc thay đổi thiết kế hệ thống, BẮT BUỘC phải cập nhật đồng bộ ngược lại vào Compendium.

---

## 2. QUY TẮC CHỐNG "XÓT FILE" (DEPENDENCY & BILINGUAL MAPPING)

Khi có bất kỳ thay đổi nào về giao diện, tính năng hoặc dữ liệu, AI **bắt buộc** phải lập danh sách các file liên quan trước khi sửa:

### A. Quy tắc đồng bộ song ngữ (Bilingual Rule — Bắt buộc 100%)
Repository này hoạt động ở chế độ đa ngôn ngữ (`vi` và `en`).
- **Dữ liệu JSON:** Sửa `docs/data/vi/<file>.json` $\rightarrow$ **BẮT BUỘC** cập nhật tương ứng vào `docs/data/en/<file>.json`.
- **Tài liệu Markdown:** Thêm/sửa `docs/vi/<doc>.md` $\rightarrow$ **BẮT BUỘC** thêm/sửa tại `docs/en/<doc>.md`.
- **Từ điển giao diện:** Thêm nhãn mới tại `src/lib/i18n/dictionaries/vi.js` $\rightarrow$ **BẮT BUỘC** thêm nhãn đó vào `src/lib/i18n/dictionaries/en.js`.
- **Hằng số & nhãn:** Thêm enum/label mới phải đăng ký vào `src/lib/constants.js`.

### B. Quy tắc rà soát toàn bộ điểm phụ thuộc (Usages & Consumers)
- Dùng công cụ tìm kiếm (`grep` hoặc `code_search`) để tìm tất cả các file đang import hoặc tiêu thụ hàm/dữ liệu vừa thay đổi.
- Khi sửa Component: Luôn kiểm tra SCSS Module đi kèm (ví dụ: `Header.jsx` đi liền với `Header.module.scss`).
- Khi di dời route (ví dụ từ `src/app/abc/` sang `src/app/[lang]/abc/`): **PHẢI XÓA** thư mục/file cũ ở `src/app/abc/` để tránh lỗi xung đột route trùng lặp và vỡ AST layout của Next.js.

---

## 3. QUY TẮC CHỐNG "SỬA THIẾU" (ROBUST EDITING)

1. **Bảo tồn toàn vẹn dữ liệu (Data Integrity):**
   - Khi cập nhật một item trong file JSON, tuyệt đối không được xóa nhầm các trường (fields) khác của item đó hoặc các item lân cận.
   - Khi viết Markdown frontmatter, luôn giữ đúng các trường chuẩn: `title`, `status`, `audience`, `updated`, `tags`, `spoiler`.
2. **Tuân thủ ranh giới Client vs Server (Next.js App Router):**
   - Tệp có `'use client'` ở đầu **TUYỆT ĐỐI KHÔNG** import trực tiếp hoặc gián tiếp các module Node.js (`fs`, `path`, `node:crypto`, `process.cwd()`).
   - Nếu Client Component cần dữ liệu, hãy truyền qua `props` từ Server Component hoặc import từ tệp JSON tĩnh / tệp hằng số không dùng Node API.
3. **Tuân thủ Design Rules (Mandatory):**
   - Phải giữ đúng phong cách **Dark Cozy Pixel Art** của Rowan of Oakhaven (khung `pixel-frame`, font `var(--font-pixel)` cho ASCII/English, icon từ `Icon.jsx`, màu `$color-night-*` và `$color-amber-*`).
   - Tuyệt đối không dùng emoji thay cho icon giao diện.

---

## 4. QUY TRÌNH 5 BƯỚC BẮT BUỘC CHO MỌI NHIỆM VỤ

Mọi AI khi nhận yêu cầu sửa đổi code PHẢI tuân thủ trình tự sau:

```
[1. Khảo sát & Lập danh sách] ──> [2. Đọc kỹ từng file] ──> [3. Sửa đầy đủ 100%]
                                                                   │
                                                                   ▼
[5. Báo cáo kết quả]          <── [4. Build & Kiểm chứng] <── [3b. Dọn dẹp file cũ]
```

- **Bước 1: Khảo sát (Survey & Map)**
  - Tìm kiếm toàn bộ các file liên quan đến yêu cầu bằng `grep` / `find`.
  - Liệt kê nhẩm trong suy nghĩ danh sách đầy đủ các file cần tạo/sửa/xóa.
- **Bước 2: Đọc (Read Thoroughly)**
  - Đọc nội dung thực tế của các file trong danh sách. Không suy diễn nội dung.
- **Bước 3: Sửa đổi (Complete Execution)**
  - Viết code hoàn chỉnh, không bỏ dở giữa chừng, không dùng placeholder.
  - Đảm bảo tính song ngữ (`vi` và `en`) đồng bộ.
- **Bước 3b: Dọn dẹp (Cleanup)**
  - Xóa các file thừa, file cũ không còn dùng, các import không tồn tại.
- **Bước 4: Kiểm chứng (Verify & Validate)**
  - Chạy `npm run build` để kiểm tra TypeScript, Turbopack, tính hợp lệ của layout và prerender SSG.
  - Chạy `git status` để kiểm tra danh sách file: đảm bảo không xót file, không để lại file rác.
- **Bước 5: Báo cáo (Report)**
  - Trình bày tóm tắt rõ ràng các file đã sửa/tạo kèm link markdown `file://` theo đúng quy định.

---

## 5. CHECKLIST ĐỐI SOÁT TRƯỚC KHI BÁO CÁO (PRE-FINISH CHECKLIST)

Trước khi kết thúc lượt phản hồi, AI phải tự kiểm tra các câu hỏi sau:
- [ ] Mình có để lại bất kỳ đoạn `// ...` hay placeholder nào trong code không?
- [ ] Dữ liệu hoặc nhãn mới đã có ở CẢ HAI ngôn ngữ `vi` và `en` chưa?
- [ ] Mọi thông số dữ liệu/tính năng mới hoặc sửa đổi đã được đối chiếu và đồng bộ với [OAKHAVEN_DESIGN_COMPENDIUM.md](./OAKHAVEN_DESIGN_COMPENDIUM.md) chưa?
- [ ] Tất cả các consumer/call-sites của hàm/API đã được cập nhật chưa?
- [ ] Có file cũ nào bị bỏ sót gây xung đột build không?
- [ ] Đã chạy `npm run build` và kết quả có 0 lỗi, 0 cảnh báo không?
- [ ] Lệnh `git status` đã được kiểm tra để xác nhận cây thư mục sạch sẽ chưa?

> **LƯU Ý:** Nếu `npm run build` phát sinh bất kỳ lỗi nào, AI **PHẢI** tự khắc phục triệt để và build lại thành công trước khi thông báo hoàn tất cho người dùng.
