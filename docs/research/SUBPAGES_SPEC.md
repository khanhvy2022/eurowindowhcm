# Subpage Clone Spec: catmoc.cmg.vn → eurowindowhcm

## Design Tokens (extracted from live site)
- Font: Space Grotesk (site uses) → project keeps Be Vietnam Pro + Fraunces (brand font, already in layout)
- Primary: #e50914 (catmoc red) → project uses #e30613 (Eurowindow red, already in tokens.css)
- Page banner: solid red bg, padding-top ~400px (content centered), H1 56px/700 white centered, breadcrumb below
- Section H2: uppercase, 40px/700, white, centered or left
- Section padding-bottom: 80px
- Body bg dark (#111) for subpages — consistent with existing homepage clone

## Page Structures (from live DOM)

### /gioi-thieu (Về chúng tôi)
1. PageBanner red: "VỀ CHÚNG TÔI" + breadcrumb
2. Intro 2-col: title + paragraph + link, alternating image/text
3. Stats counter: 6 stats (20 năm / 2500+ / 100000+ / 50+ / 60+ / 394+)
4. Red marquee strip: repeated uppercase words
5. Founder section: title + bio + image
6. 3-image gallery strip
7. Accordion: Tầm nhìn / Sứ mệnh / Quan niệm khi thiết kế / Phương châm hoạt động
8. Services: 3 cards (image bg + title + text + link)
9. Awards: 3 award cards
10. Featured projects grid: 6 cards → link /du-an

### /du-an (Dự án)
1. PageBanner red: "DỰ ÁN CỦA CÁT MỘC"
2. Search box + 8 anchor category links (#biet-thu, #nha-pho...)
3. Grid of project cards (image + H3 title)
4. "Tải thêm dự án" load-more button

### /thiet-ke-kien-truc (Dịch vụ)
1. PageBanner red: "DỊCH VỤ CỦA CÁT MỘC"
2. 3 service tabs (THIẾT KẾ KIẾN TRÚC / THI CÔNG THÔ / NỘI THẤT)
3. Team section: leader + member cards (KTS...)
4. Quy trình process: numbered stages (GIAI ĐOẠN 1-3)
5. Awards
6. Featured projects

### /tin-tuc (Tin tức)
1. PageBanner red: "TIN TỨC"
2. 5 sections, each with header + "XEM TẤT CẢ" link:
   - TIN MỚI NHẤT (latest posts grid)
   - ƯU ĐÃI (promos)
   - BÁO CHÍ NÓI GÌ VỀ CÁT MỘC
   - VĂN HÓA CMG
   - CHIA SẺ KIẾN THỨC

### /du-an/[slug] (Project detail)
1. Title banner
2. Gallery grid (16 images)
3. THÔNG TIN DỰ ÁN: CHỦ ĐẦU TƯ / PHÂN LOẠI / HOÀN THÀNH / DIỆN TÍCH / VỊ TRÍ / HẠNG MỤC
4. GIỚI THIỆU DỰ ÁN (description)
5. DỰ ÁN LIÊN QUAN (related projects grid)

### /tin-tuc/[slug] (Article detail)
1. Title banner
2. TOC (Mục lục) anchor links
3. Long-form article: H2 sections, H3 subsections, paragraphs, images
4. FAQ section
5. Related articles

## Content mapping: Eurowindow
- Company: Eurowindow (est. 2002, door/window/aluminum solutions)
- Services: Tư vấn giải pháp cửa / Thiết kế & thi công / Bảo hành
- Projects: Công trình quốc gia, văn phòng & căn hộ, nhà ở
- Stats: 20+ năm / 2000+ công trình / 100k+ khách hàng / 100+ giải thưởng
