export type KnowledgeEntry = {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "contact-hotline",
    category: "Liên hệ",
    keywords: ["hotline", "số điện thoại", "liên hệ", "gọi", "phone", "tư vấn"],
    question: "Liên hệ Eurowindow bằng cách nào?",
    answer: "Hotline Miền Nam: 0966 994 338. Hotline Miền Bắc: 0909 888 000. Hotline Miền Trung: 0906 000 111. Trụ sở chính Hà Nội: (84 - 24) 37 47 47 00. Email: infoew@eurowindow.biz. Chi Nhánh Miền Nam: 39 Bis Mạc Đĩnh Chi, Phường Tân Định, Quận 1, TP.HCM. Trụ sở chính: Tòa nhà Eurowindow Office Building, Số 02 Tôn Thất Tùng, Kim Liên, Đống Đa, Hà Nội.",
  },
  {
    id: "contact-email",
    category: "Liên hệ",
    keywords: ["email", "mail", "gửi thư", "thư"],
    question: "Email liên hệ Eurowindow?",
    answer: "Email chính thức: infoew@eurowindow.biz. Chăm sóc khách hàng: cskhhn@eurowindow.biz. Showroom Miền Nam: Showroom.mdc@eurowindow.biz. Dự án quốc tế & xuất khẩu: export@eurowindow.biz (+84 -903 41 55 52).",
  },
  {
    id: "contact-showroom",
    category: "Liên hệ",
    keywords: ["showroom", "cửa hàng", "địa chỉ", "trụ sở", "văn phòng", "mua ở đâu"],
    question: "Eurowindow có showroom ở đâu?",
    answer: "Mạng lưới showroom và chi nhánh Eurowindow phủ rộng toàn quốc. Trụ sở chính Hà Nội: Tòa nhà Eurowindow Office Building, Số 02 Tôn Thất Tùng, Đống Đa (Tel: (84 - 24) 37 47 47 00 - Hotline: 0909 888 000). Showroom TP.HCM: 39 Bis Mạc Đĩnh Chi, Phường Tân Định, Quận 1 (Tel: (84 - 28) 6278 8124 - Hotline: 0966 994 338). Showroom Đà Nẵng: 152 Phan Đăng Lưu, Phường Hòa Cường (Tel: (84 - 236) 3 582 877 - Hotline: 0906 000 111). Cùng hệ thống showroom tại Cần Thơ, Biên Hòa, Vũng Tàu, Nha Trang, Buôn Ma Thuột...",
  },
  {
    id: "about-company",
    category: "Giới thiệu",
    keywords: ["eurowindow là gì", "giới thiệu", "công ty", "doanh nghiệp", "lịch sử", "thành lập"],
    question: "Giới thiệu về Eurowindow?",
    answer: "Eurowindow thành lập năm 2002, tiên phong đưa cửa uPVC tiêu chuẩn Châu Âu vào Việt Nam. Sau hơn 20 năm, Eurowindow phát triển đa dạng dòng sản phẩm: cửa uPVC, cửa nhôm, vách nhôm kính lớn, cửa gỗ, cửa gỗ chống cháy, cửa tự động, cửa cuốn, cửa thủy lực, sản phẩm kính và nội thất. Sản phẩm hiện diện ở hàng trăm nghìn công trình, trong đó có các công trình trọng điểm như Tòa nhà Quốc hội, cảng hàng không quốc tế.",
  },
  {
    id: "about-awards",
    category: "Giới thiệu",
    keywords: ["giải thưởng", "thương hiệu quốc gia", "chứng nhận", "award"],
    question: "Eurowindow đạt những giải thưởng nào?",
    answer: "Eurowindow 14 năm liên tiếp đạt Thương hiệu Quốc gia Việt Nam (Bộ Công Thương), vào Top 10 doanh nghiệp xanh Việt Nam 2026, và đạt Giải thưởng chất lượng sản phẩm Việt Nam (Vietnam Quality Award 2024).",
  },
  {
    id: "product-nhom",
    category: "Sản phẩm · Cửa nhôm",
    keywords: ["cửa nhôm", "nhôm kính", "vách nhôm", "nhôm", "EA55", "EA95", "cửa kính"],
    question: "Giới thiệu cửa nhôm và vách nhôm kính?",
    answer: "Cửa nhôm và vách nhôm kính Eurowindow sản xuất từ nhôm cao cấp hệ EA55–EA95i, phụ kiện chính hãng Cmech, Roto, Hafele. Profile nhôm có cầu cách nhiệt kết hợp hộp kính bơm khí trơ, gioăng EPDM đem lại khả năng cách âm, cách nhiệt cao, chịu tải trọng gió lớn, đóng mở đa chiều. Gồm các hệ: cửa đi nhôm, cửa sổ nhôm, vách kính lớn hệ Stick, Spider, Semi-Unitized, Unitized và mái che. Đạt TCVN 330:2004, TCVN 7452-1/2/3:2004, ISO 140-5.",
  },
  {
    id: "product-upvc",
    category: "Sản phẩm · Cửa uPVC",
    keywords: ["upvc", "nhựa", "cửa nhựa", "cửa sổ nhựa", "kömmerling", "cách nhiệt"],
    question: "Giới thiệu cửa uPVC Eurowindow?",
    answer: "Cửa uPVC Eurowindow dùng profile của hãng Kömmerling (tập đoàn Profine, CHLB Đức) — hiện Eurowindow là nhà cung cấp độc quyền tại Việt Nam. Thanh profile cấu trúc dạng hộp có lõi thép gia cường, phụ kiện chốt đa điểm, bản lề 3D, gioăng kép và hộp kính bơm khí trơ. Cửa có khả năng cách âm, cách nhiệt vượt trội (cách nhiệt gấp 2–4 lần cửa thường), không cong vênh, không ố vàng, an toàn cháy nổ. Gồm cửa đi, cửa sổ, vách ngăn uPVC phù hợp khách sạn, biệt thự, chung cư.",
  },
  {
    id: "product-go",
    category: "Sản phẩm · Cửa gỗ",
    keywords: ["cửa gỗ", "gỗ tự nhiên", "gỗ công nghiệp", "gỗ chống cháy", "chỉ nổi", "pano"],
    question: "Giới thiệu cửa gỗ Eurowindow?",
    answer: "Cửa gỗ Eurowindow áp dụng công nghệ sản xuất từ Ý, Tây Ban Nha, Nga, tại nhà máy KCN Quang Minh (Hà Nội) và KCN Tân Uyên (Bình Dương). Nguyên liệu được tẩm sấy theo tiêu chuẩn độ ẩm xuất khẩu 12–14%, giữ tính năng gỗ tự nhiên, hạn chế cong vênh co ngót. Gồm 5 dòng: gỗ tự nhiên, gỗ công nghiệp, gỗ ghép thanh, gỗ chống cháy, gỗ composite. Mẫu mã đa dạng: pano kính, pano đặc, chỉ nổi, chỉ liền. Đạt TCVN 9366-1:2021.",
  },
  {
    id: "product-kinh",
    category: "Sản phẩm · Kính",
    keywords: ["kính", "kính cường lực", "hộp kính", "low-e", "kính an toàn", "kính hoa văn", "kinh"],
    question: "Giới thiệu sản phẩm kính Eurowindow?",
    answer: "Trung tâm gia công kính Eurowindow tại KCN Quang Minh, Mê Linh, Hà Nội có dây chuyền hiện đại nhập từ Italia, Phần Lan, Thụy Sĩ, Đức, sản xuất trong phòng kín kiểm soát nhiệt độ 20–28°C và độ ẩm ≤46%. Gồm: kính cường lực (bền gấp 4–5 lần kính thường), kính bán cường lực (gấp 2–3 lần), kính dán an toàn (màng PVB), hộp kính khổ lớn (bơm khí Argon), kính cách nhiệt an toàn ACT (giảm tới 57% năng lượng mặt trời, 99% tia UV), kính hoa văn. Đạt chứng chỉ Kitemark của Viện Tiêu chuẩn Anh BSI.",
  },
  {
    id: "product-tu-dong",
    category: "Sản phẩm · Cửa tự động",
    keywords: ["cửa tự động", "cửa xoay", "cửa trượt", "cảm biến", "tự động"],
    question: "Giới thiệu cửa tự động Eurowindow?",
    answer: "Eurowindow cung cấp 2 dòng cửa tự động thương mại: cửa trượt tự động 2 cánh (cánh kính có khung hoặc không khung, chiều cao tối đa 3m, 4 chế độ: tự động, mở thường trực, mở một chiều, khóa ban đêm) và cửa tự động xoay tròn 3–4 cánh (nhập khẩu từ Đức, Italy, 5 chế độ: Night, Revolve, Automatic, Exit, Manual). Hệ cửa vận hành bằng cảm biến radar, tự kiểm tra, cảnh báo lỗi và kết nối hệ thống báo cháy tòa nhà. Phù hợp sảnh tòa nhà, khách sạn, trung tâm thương mại.",
  },
  {
    id: "product-cuon",
    category: "Sản phẩm · Cửa cuốn",
    keywords: ["cửa cuốn", "cuốn", "EASD45", "khe thoáng"],
    question: "Giới thiệu cửa cuốn Eurowindow?",
    answer: "Eurowindow cung cấp dòng cửa cuốn nhôm khe thoáng EASD45 hội tụ ưu điểm: hiện đại, vững chắc, an toàn, êm và đẹp. Gồm 3 hệ chính: cửa cuốn lên hộp, cửa cuốn lên trần và cửa kéo ngang, với khả năng cách âm, cách nhiệt cao. Các đặc tính được thiết kế, tính toán để tăng độ ổn định và độ bền so với cửa cuốn khe thoáng thông thường.",
  },
  {
    id: "product-so-sanh",
    category: "Sản phẩm",
    keywords: ["chọn cửa", "nên chọn", "loại cửa nào", "so sánh", "mặt ngoài", "mặt tiền"],
    question: "Nên chọn loại cửa nào cho ngôi nhà?",
    answer: "Cho mặt ngoài ngôi nhà (cửa sổ, cửa ban công), uPVC là giải pháp hoàn hảo nhờ cách âm, cách nhiệt vượt trội, không cong vênh. Cửa gỗ là giải pháp tối ưu bên trong (cửa thông phòng), phù hợp nội thất. Với mặt tiền kính lớn, dùng vách kính hộp cách nhiệt kết hợp kính Low-E để ngăn thất thoát nhiệt. Khu vực lưu lượng người lớn (sảnh, văn phòng) nên dùng cửa tự động.",
  },
  {
    id: "product-chong-nong",
    category: "Sản phẩm · Chống nóng",
    keywords: ["chống nóng", "mùa hè", "cách nhiệt", "nắng nóng", "low-e"],
    question: "Loại cửa nào chống nóng tốt nhất?",
    answer: "Cửa uPVC kết hợp kính hộp cách nhiệt hoặc cửa nhôm kính dùng kính Low-E cho khả năng chống nóng vượt trội. Kính Low-E phản xạ nhiệt nhưng vẫn cho ánh sáng tự nhiên đi qua, giữ không gian sáng và mát. Kính cản nhiệt Low-E của Eurowindow giúp hạn chế khoảng 40% truyền nhiệt vào mùa hè.",
  },
  {
    id: "warranty",
    category: "Chính sách",
    keywords: ["bảo hành", "bảo hành mấy năm", "warranty", "bảo trì", "bảo dưỡng"],
    question: "Chính sách bảo hành của Eurowindow?",
    answer: "Eurowindow bảo hành tiêu chuẩn 5 năm cho sản phẩm. Cửa uPVC ít phải sơn sửa, bảo dưỡng định kỳ; cửa nhôm chỉ cần lau chùi thông thường là sáng đẹp như mới. Liên hệ tổng đài (84 - 24) 37 47 47 00 để được hỗ trợ bảo hành, bảo trì.",
  },
  {
    id: "price-bao-gia",
    category: "Báo giá",
    keywords: ["giá", "bao nhiêu", "báo giá", "chi phí", "cost", "bảng giá"],
    question: "Báo giá cửa Eurowindow như thế nào?",
    answer: "Giá cửa phụ thuộc hệ sản phẩm, kích thước, loại kính, phụ kiện và vị trí công trình. Eurowindow hỗ trợ đo đạc thực địa, lên phương án và báo giá miễn phí. Liên hệ hotline 0966 994 338 hoặc email infoew@eurowindow.biz để nhận tư vấn.",
  },
  {
    id: "production-thoi-gian",
    category: "Sản xuất",
    keywords: ["thời gian", "bao lâu", "tiến độ", "thi công", "sản xuất", "lắp đặt"],
    question: "Thời gian sản xuất và lắp đặt mất bao lâu?",
    answer: "Thời gian phụ thuộc quy mô công trình và loại sản phẩm. Quy trình của Eurowindow gồm 4 bước: tư vấn giải pháp, thiết kế & triển khai, sản xuất & thi công, bảo hành & chăm sóc. Với cửa gỗ, thiết kế khuôn, cửa cho lắp dựng công nghiệp giúp đẩy nhanh tiến độ ở giai đoạn hoàn thiện công trình. Liên hệ để được tư vấn cụ thể theo công trình.",
  },
  {
    id: "standards-chat-luong",
    category: "Chất lượng",
    keywords: ["tiêu chuẩn", "chất lượng", "chứng nhận", "tcvn", "iso", "kitemark", "châu âu"],
    question: "Sản phẩm Eurowindow đạt tiêu chuẩn nào?",
    answer: "Sản phẩm đạt tiêu chuẩn Châu Âu và Việt Nam: TCVN 330:2004 (hợp kim nhôm định hình), TCVN 7452-1/2/3:2004 (độ lọt khí, kín nước, chịu áp lực gió), TCVN 9366-1:2021 (cửa gỗ), ISO 140-5 (cách âm), TCVN 7451:2004 (uPVC). Kính được Viện Tiêu chuẩn Anh BSI cấp chứng chỉ Kitemark, đạt BS EN 12150-1:2000, EN 1863, ANSI Z97.1-2004.",
  },
  {
    id: "factory-nha-may",
    category: "Sản xuất",
    keywords: ["nhà máy", "sản xuất ở đâu", "công nghệ", "dây chuyền", "khu công nghiệp"],
    question: "Eurowindow sản xuất ở đâu?",
    answer: "Eurowindow sở hữu hệ thống nhà máy hiện đại: Nhà máy sản xuất phía Nam tại ĐT745, P. Tân Uyên, TP. Hồ Chí Minh; Trung tâm gia công kính tại KCN Quang Minh, Mê Linh, Hà Nội; dây chuyền sơn tĩnh điện (Powdercoating, PVDF) tự động và xưởng gia công kính hộp tiêu chuẩn Châu Âu.",
  },
  {
    id: "project-du-an",
    category: "Dự án",
    keywords: ["công trình", "dự án", "bệnh viện", "sân bay", "quốc hội", "chung cư", "vinhomes"],
    question: "Những công trình tiêu biểu của Eurowindow?",
    answer: "Eurowindow đã tham gia hàng trăm nghìn công trình, tiêu biểu: Tòa nhà Quốc hội, trụ sở Chính phủ, cảng hàng không Phú Bài Huế, Bệnh viện Việt Pháp, Bệnh viện Nhi đồng TP.HCM, Bệnh viện ung bướu Đà Nẵng, TT Truyền hình Thông tấn xã Việt Nam, khu đô thị Vinhomes Global Gate Cổ Loa.",
  },
  {
    id: "cong-trinh-quoc-te",
    category: "Dự án",
    keywords: ["xuất khẩu", "quốc tế", "nước ngoài", "export"],
    question: "Eurowindow có dự án quốc tế không?",
    answer: "Có. Eurowindow triển khai dự án quốc tế và xuất khẩu. Bộ phận dự án quốc tế: +84 - 903 41 55 52, email export@eurowindow.biz.",
  },
  {
    id: "kinh-dien-doi-mau",
    category: "Sản phẩm · Kính",
    keywords: ["kính điện", "đổi màu", "kính điện đổi màu", "smart glass"],
    question: "Kính điện đổi màu là gì?",
    answer: "Eurowindow cung cấp kính điện đổi màu (smart glass) cho phép chuyển đổi giữa trạng thái trong suốt và mờ đục bằng công tắc điện, ứng dụng cho vách ngăn, cửa đi, mặt dựng tạo sự linh hoạt và riêng tư cho không gian. Đây là một trong những sản phẩm kính cao cấp của Eurowindow.",
  },
  {
    id: "thuy-luc",
    category: "Sản phẩm",
    keywords: ["cửa thủy lực", "thủy lực", "khóa thủy lực"],
    question: "Cửa thủy lực là gì?",
    answer: "Cửa thủy lực Eurowindow là cửa kính sử dụng bản lề sàn thủy lực, đóng mở nhẹ nhàng, thường dùng cho văn phòng, nhà hàng, showroom. Kính cường lực dùng làm cửa thủy lực có khả năng chịu lực cơ học tốt, tăng độ an toàn.",
  },
];
