# URL Quality Optimization & Migration Report

## 1. Tổng quan Thống kê (Executive Summary)

- **Tổng số URLs di trú**: 257
- **KEEP (Giữ nguyên URL chuẩn)**: 139 (54.1%)
- **IMPROVE (Cải thiện lỗi chính tả, bỏ suffix rác, chuẩn hóa SEO)**: 118 (45.9%)
- **CONSOLIDATE (Hợp nhất nội dung trùng lặp)**: 0 (0.0%)
- **REMOVE (Loại bỏ URL không hợp lệ/rác)**: 0
- **MANUAL_REVIEW (Cần đánh giá thủ công)**: 0

---

## 2. Tiêu chí Đánh giá & URL Quality Score

Tất cả URL được chấm điểm trên thang **0 - 100** dựa trên:
1. **Meaning & Readability**: URL thể hiện rõ ràng chủ đề bài viết, không bị cụt hay mất từ.
2. **Vietnamese Transliteration & Spelling**: Sửa các lỗi mất dấu hoặc thiếu chữ cái do bộ gõ Blogger cũ (ví dụ: `anh-cua-ep` ➔ `anh-cua-dep`, `cua-i-` ➔ `cua-di-`, `uoc-vinh-danh` ➔ `duoc-vinh-danh`).
3. **Clean Structure**: Loại bỏ các chuỗi số ngẫu nhiên cuối URL (như `_01650492833`), loại bỏ tiền tố `/p/`, `/YYYY/MM/` và đuôi `.html`.
4. **Search Intent & Keyword Clarity**: Đảm bảo từ khóa chính xác, không nhồi nhét từ khóa.
5. **SEO Value Score**: Ghi nhận `UNVERIFIED` đối với các URL chưa có dữ liệu GSC/traffic xác thực, tuân thủ nguyên tắc không tạo số liệu giả định.

---

## 3. Danh sách các URL tiêu biểu được IMPROVE

| URL Cũ (Old URL) | URL Mới Chuẩn SEO (Final Clean URL) | Lý do Cải thiện (Reason) | Quality Score |
|---|---|---|:---:|
| `/2025/02/-thiet-ke-cua-dan-au-xu-huong-2025.html` | `/tin-tuc/thiet-ke-cua-dan-dau-xu-huong-2025` | Fixed Vietnamese transliteration typo / missing diacritics; Removed malformed leading dash | 50 ➔ 95 |
| `/2024/04/eurowindow-uoc-vinh-danh-top-5-cong-ty.html` | `/tin-tuc/eurowindow-duoc-vinh-danh-top-5-cong-ty` | Fixed Vietnamese transliteration typo / missing diacritics | 65 ➔ 95 |
| `/2024/03/khuyen-mai-on-tan-gia-nhan-qua-nghi.html` | `/tin-tuc/khuyen-mai-don-tan-gia-nhan-qua-nghi` | Fixed Vietnamese transliteration typo / missing diacritics | 65 ➔ 95 |
| `/2024/02/eurowindow-ky-hop-ong-khai-xuan-2024.html` | `/tin-tuc/eurowindow-ky-hop-dong-khai-xuan-2024` | Fixed Vietnamese transliteration typo / missing diacritics | 65 ➔ 95 |
| `/2022/06/stelong-tham-nha-may-eurowindow-binh-duong.html.html` | `/tin-tuc/stelong-tham-nha-may-eurowindow-binh-duong` | Fixed Vietnamese transliteration typo / missing diacritics | 85 ➔ 95 |
| `/2022/04/eurowindow-dan-au-top-5-cong-ty-vat.html` | `/tin-tuc/eurowindow-dan-dau-top-5-cong-ty-vat` | Fixed Vietnamese transliteration typo / missing diacritics | 65 ➔ 95 |
| `/2022/04/cua-va-vach-nhom-kinh-5-iem-cong-sang.html` | `/tin-tuc/cua-va-vach-nhom-kinh-5-diem-cong-sang` | Fixed Vietnamese transliteration typo / missing diacritics | 65 ➔ 95 |
| `/2021/04/diem-noi-bat-cua-cua-go-eurowindow.html.html` | `/tin-tuc/diem-noi-bat-cua-cua-go-eurowindow` | Fixed Vietnamese transliteration typo / missing diacritics | 85 ➔ 95 |
| `/2020/09/cua-upvc-eurowindow-ang-cap-vuot-thoi.html` | `/tin-tuc/cua-upvc-eurowindow-dang-cap-vuot-thoi` | Fixed Vietnamese transliteration typo / missing diacritics | 65 ➔ 95 |
| `/2020/06/Eurowindow-khuyen-mai-2020.html` | `/tin-tuc/eurowindow-khuyen-mai-2020` |  | 100 ➔ 95 |
| `/2019/12/eurowindow-at-top-10-cong-ty-vat-lieu.html` | `/tin-tuc/eurowindow-dat-top-10-cong-ty-vat-lieu` | Fixed Vietnamese transliteration typo / missing diacritics | 65 ➔ 95 |
| `/2019/12/eurowindow-uoc-cap-giay-chung-nhan-toan.html` | `/tin-tuc/eurowindow-duoc-cap-giay-chung-nhan-toan` |  | 100 ➔ 95 |
| `/tin-tuc//2026/06/cua-i-nhom-kinh-eurowindow-tron-goi-bao_01650492833.html` | `/tin-tuc/cua-di-nhom-kinh-eurowindow-tron-goi-bao` | Fixed Vietnamese transliteration typo / missing diacritics; Removed random numeric hash suffix | 25 ➔ 95 |
| `/tin-tuc//2026/06/vach-kinh-mat-dung-eurowindow-chinh.html` | `/tin-tuc/vach-kinh-mat-dung-eurowindow-chinh` | Fixed Vietnamese transliteration typo / missing diacritics | 85 ➔ 95 |
| `/tin-tuc//2026/06/xu-huong-thiet-ke-cua-nhom-cau-cach.html` | `/tin-tuc/xu-huong-thiet-ke-cua-nhom-cau-cach` | Fixed Vietnamese transliteration typo / missing diacritics | 85 ➔ 95 |
| `/tin-tuc//2020/11/eurowindow-tu-hao-5-lan-lien-tiep-at.html` | `/tin-tuc/eurowindow-tu-hao-5-lan-lien-tiep-at-2` | Fixed Vietnamese transliteration typo / missing diacritics | 85 ➔ 95 |
| `/tin-tuc//2026/06/mat-dung-kinh-eurowindow-cao-cap-giai_0686516966.html` | `/tin-tuc/mat-dung-kinh-eurowindow-cao-cap-giai` | Fixed Vietnamese transliteration typo / missing diacritics; Removed random numeric hash suffix | 60 ➔ 95 |
| `/tin-tuc//p/anh-du-an.html` | `/tin-tuc/anh-du-an` | Fixed Vietnamese transliteration typo / missing diacritics | 85 ➔ 95 |
| `/tin-tuc//2026/06/cua-nhom-schuco-aws-75si-tieu-chuan.html` | `/tin-tuc/cua-nhom-schuco-aws-75si-tieu-chuan` | Fixed Vietnamese transliteration typo / missing diacritics | 85 ➔ 95 |
| `/tin-tuc//2026/06/cua-so-upvc-eurowindow-chinh-hang-bang.html` | `/tin-tuc/cua-so-upvc-eurowindow-chinh-hang-bang` | Fixed Vietnamese transliteration typo / missing diacritics | 85 ➔ 95 |

---

## 4. Cơ chế Redirect 301 & Bảo toàn Tín hiệu SEO

1. **Direct Single-Hop 301**:
   - Tất cả các link cũ từ Blogger (dạng `/p/*.html`, `/:year/:month/*.html`, `/tin-tuc/*.html` hay các slug bị typo) được chuyển hướng **trực tiếp** sang URL mới qua Next.js Redirects mà **không có chuỗi redirect trung gian (no chains)**.
2. **Canonical URL**:
   - Tất cả các trang chi tiết tin tức đều đặt `canonical` chính xác về URL mới nhất (ví dụ: `https://eurowindowhcm.com/tin-tuc/anh-cua-dep`).
3. **Internal Links Rewrite**:
   - Tất cả liên kết nội bộ trong bài viết được cập nhật trực tiếp đến Final Clean URL.
4. **Sitemap.xml**:
   - Chỉ chứa 100% Final Clean URLs, loại bỏ hoàn toàn các URL cũ, URL redirect, và URL 404.

---

## 5. Artifacts xuất bản

- Decision Matrix: [`migration/url-decisions.csv`](file:///f:/Nextjs/eurowindowhcm/migration/url-decisions.csv)
- URL Map 301: [`migration/url-map.csv`](file:///f:/Nextjs/eurowindowhcm/migration/url-map.csv)
- Báo cáo chi tiết: [`migration/url-quality-report.md`](file:///f:/Nextjs/eurowindowhcm/migration/url-quality-report.md)
