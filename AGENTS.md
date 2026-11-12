<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design rules — BẮT BUỘC (mandatory)

Mọi thay đổi UI của wiki này PHẢI theo phong cách **Dark Cozy Pixel Art** của game Rowan of Oakhaven. Không dùng phong cách SaaS/landing page generic.

- **Pixel là bắt buộc:** font pixel (`var(--font-pixel)` / `$font-pixel` — Pixelify Sans) cho logo, tiêu đề display, số liệu, nhãn trang trí; chỉ dùng cho text không dấu/ASCII. Body dùng Manrope (`var(--font-sans)` / `$font-sans`).
- **Khung góc pixel:** card, panel, khung nội dung phải có class `pixel-frame` (đã định nghĩa trong `src/styles/globals.scss`).
- **Icon:** chỉ dùng `<Icon name="..." />` từ `src/components/Icon.jsx` (bộ icon Phosphor inline SVG). TUYỆT ĐỐI không dùng emoji làm icon UI.
- **Màu:** nền phẳng xanh đêm tím (`$color-night-*`), một accent vàng hổ phách (`$color-amber-*`). Không gradient nền, không gradient button — gradient chỉ cho phép trên text hero.
- **Nút bấm kiểu game:** nền đặc + `box-shadow` cứng đáy, hover nhấc lên, active nhấn xuống.
- **Tokens:** spacing chỉ dùng thang `$sp-*`, radius `$radius-*`, motion curve `$ease-out` — định nghĩa trong `src/styles/_variables.scss`. Font size theo type scale (12/14/16/18/20/24/30/36/48/60px).
- **Texture:** sao pixel và ornament kim cương làm bằng SVG data-uri hoặc CSS, không ảnh nặng.
- **Tài liệu tham chiếu:** design skills bắt buộc đọc trước khi sửa UI nằm trong `.agents/skills/` (`redesign-existing-projects`, `landing-page-design`).
