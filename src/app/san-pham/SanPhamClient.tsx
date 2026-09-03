"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsSlide from "@/components/NewsSlide";
import { ArrowRight, Award, Check, Layers, Phone, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { contact } from "@/data/eurowindow";

type Advantage = { title: string; text: string };
type Section = { title: string; text: string };

const services = [
  {
    id: "nhom",
    tab: "CỬA NHÔM & VÁCH KÍNH",
    title: "CỬA NHÔM & VÁCH KÍNH LỚN",
    text: "Hệ cửa nhôm và vách nhôm kính lớn từ vật liệu nhôm EA55–EA95i, phụ kiện chính hãng Cmech, Roto, Hafele. Độ kín khít cao, đóng mở đa chiều đáp ứng những yêu cầu khắt khe về thiết kế, chịu tải trọng gió lớn cho công trình quy mô.",
    features: [
      "Đóng mở đa chiều: quay trong, quay ngoài, hất, quay lật, xếp trượt, trượt",
      "Hệ nhôm EA55–EA95i, phụ kiện chính hãng Cmech, Roto, Hafele",
      "Chịu tải trọng gió lớn, phù hợp vách kính công trình quy mô",
    ],
    image: "/eurowindow/cuanhom.jpg.webp",
    detailHref: "/san-pham/cua-nhom",
    intro: [
      "Cửa nhôm và vách nhôm kính lớn Eurowindow được sản xuất từ vật liệu nhôm cao cấp, khắc phục triệt để những nhược điểm của nhôm thông thường như kết cấu yếu, phụ kiện đơn giản, không có cầu cách nhiệt nên khả năng cách âm, cách nhiệt kém, hay bị rò rỉ nước mưa.",
      "Cửa nhôm (gồm cửa sổ, cửa đi) và cửa vách nhôm đảm bảo độ kín khít cao, có thể đóng mở đa chiều, phù hợp với nhiều kiểu phong cách kiến trúc. Đặc biệt, profile nhôm có cầu cách nhiệt kết hợp với hộp kính bơm khí trơ giúp hạn chế tối đa sự truyền nhiệt, góp phần tiết kiệm điện năng. Bên cạnh hợp tác chiến lược với các nhà cung cấp profile nhôm hàng đầu thế giới như Technal (Pháp), Schüco (CHLB Đức), Eurowindow còn đầu tư dây chuyền sơn tĩnh điện (Powdercoating) và sơn nước (PVDF), cho phép sơn tấm nhôm gấp khổ lớn tới 2,5m x 2,5m x 6m, cùng hệ thống xử lý nước thải đạt chuẩn A Grade.",
    ],
    structure: [
      {
        title: "Thanh profile",
        text: "Thanh profile có cầu cách nhiệt hoặc không, với các khoang rỗng và gân tăng cứng, rãnh và vách kỹ thuật được tính toán kỹ lưỡng tạo sống gia cường, kênh thoát nước và khoang trống cách âm, cách nhiệt.",
      },
      {
        title: "Hộp kính",
        text: "Kết hợp hộp kính bơm khí trơ, hệ gioăng EPDM và hệ phụ kiện kim khí đồng bộ để đạt hiệu quả cách âm, cách nhiệt cao.",
      },
      {
        title: "Hệ phụ kiện",
        text: "Phụ kiện kim khí chính hãng Cmech, Roto, Hafele, Huy Hoàng, GMT, Kinlong tạo sự chính xác và an toàn trong sử dụng.",
      },
    ],
    advantages: [
      {
        title: "Cách âm, cách nhiệt",
        text: "Profile nhôm có cầu cách nhiệt kết hợp hộp kính, gioăng EPDM và phụ kiện đồng bộ đem lại tính cách âm, cách nhiệt cao — đặc biệt với dòng có cầu cách nhiệt.",
      },
      {
        title: "Chịu lực tốt",
        text: "Thanh profile thiết kế khoang rỗng, gân tăng cứng và chiều dày nhôm hợp lý giúp chịu tác động từ gió, bão, động đất.",
      },
      {
        title: "Tải trọng nhẹ",
        text: "Nhôm là vật liệu nhẹ, độ bền cao, giảm tải trọng toàn công trình so với vách tường vật liệu khác, mang lại giải pháp an toàn tối ưu.",
      },
      {
        title: "Kinh tế trong sử dụng",
        text: "Hộp kính cách âm, cách nhiệt, kính an toàn giúp tiết kiệm điện năng điều hòa; bề mặt sơn tĩnh điện bền màu, chỉ cần lau chùi thông thường.",
      },
      {
        title: "Tính thẩm mỹ",
        text: "Hệ vách giấu đố chịu lực tạo mặt phẳng kính lớn, sử dụng kính màu, kính hoa văn, kính mài mờ vừa đảm bảo kín đáo vừa thẩm mỹ.",
      },
      {
        title: "Tiêu chuẩn chất lượng",
        text: "Đạt tiêu chuẩn Châu Âu và TCVN 330:2004, TCVN 7452-1/2/3:2004 (lọt khí, kín nước, chịu áp lực gió), ISO 140-5 về cách âm.",
      },
    ],
    systems: [
      "Cửa đi nhôm",
      "Cửa sổ nhôm",
      "Vách nhôm kính lớn hệ Stick",
      "Vách nhôm kính hệ Spider",
      "Vách nhôm kính hệ Semi-Unitized",
      "Vách nhôm kính lớn hệ Unitized",
      "Mái che",
    ],
  },
  {
    id: "upvc",
    tab: "CỬA uPVC",
    title: "CỬA NHỰA uPVC CHÂU ÂU",
    text: "Cửa nhựa uPVC tiêu chuẩn Châu Âu với khả năng cách âm, cách nhiệt vượt trội, bền bỉ theo thời gian — dòng sản phẩm làm nên tên tuổi Eurowindow từ năm 2002, được ưu tiên lựa chọn cho mặt ngoài ngôi nhà.",
    features: [
      "Cách âm, cách nhiệt vượt trội, kín khít, không cong vênh",
      "Hệ nhựa Kömmerling & Asia tiêu chuẩn Châu Âu",
      "Cửa đi, cửa sổ, vách ngăn uPVC cho khách sạn, biệt thự, chung cư",
    ],
    image: "/eurowindow/cuanhua1.jpg.webp",
    detailHref: "/san-pham/cua-nhua-upvc",
    intro: [
      "Dòng sản phẩm cửa uPVC của Eurowindow chủ yếu là cửa sổ, cửa đi, vách ngăn phù hợp với khách sạn, biệt thự, chung cư – căn hộ. Cửa uPVC được cấu tạo bởi thanh profile uPVC có cấu trúc dạng hộp, lắp lõi thép gia cường, hệ phụ kiện đồng bộ với chốt đa điểm, bản lề 3D giúp đóng mở đa chiều, kết hợp hệ gioăng kép đảm bảo độ kín khít và hộp kính bơm khí trơ làm giảm sự truyền âm, truyền nhiệt.",
      "Vật liệu uPVC cao cấp có đặc tính nổi trội là không bị ôxy hóa hay ố vàng dưới điều kiện bức xạ mặt trời, giúp cửa uPVC Eurowindow có đặc tính cách âm, cách nhiệt cao, tiết kiệm điện năng, tiết kiệm chi phí bảo dưỡng, đem lại hiệu quả kinh tế lâu dài.",
    ],
    structure: [
      {
        title: "Thanh profile uPVC",
        text: "Thanh profile có cấu trúc dạng hộp chia nhiều khoang trống cách âm, cách nhiệt, lắp lõi thép gia cường tăng khả năng chịu lực. Eurowindow sử dụng profile uPVC của hãng Kömmerling (CHLB Đức) với uy tín hơn 100 năm.",
      },
      {
        title: "Hệ phụ kiện kim khí",
        text: "Phụ kiện đồng bộ với chốt đa điểm, bản lề 3D điều chỉnh được 3 chiều, khóa chuyên dụng. Bản lề bắt trực tiếp vào lõi thép gia cường bằng vít chuyên dụng.",
      },
      {
        title: "Hệ gioăng kép & hộp kính",
        text: "Gioăng kép đảm bảo độ kín khít tuyệt đối, hộp kính bơm khí trơ giảm truyền âm, truyền nhiệt.",
      },
    ],
    advantages: [
      {
        title: "Cách âm, cách nhiệt",
        text: "Phòng sát trục đường có tiếng ồn tới 85 dB, cửa uPVC Eurowindow giúp giảm xuống còn khoảng 40 – 45 dB. Cách nhiệt gấp 2 – 4 lần cửa thông thường.",
      },
      {
        title: "Hiệu quả kinh tế",
        text: "Ít phải sơn sửa, bảo dưỡng định kỳ; hạn chế truyền nhiệt nên tiết kiệm điện làm mát/sưởi ấm.",
      },
      {
        title: "Ổn định, không cong vênh",
        text: "Khác với cửa gỗ dễ cong vênh, co ngót trong khí hậu nhiệt đới, cửa uPVC giữ độ chuẩn xác của cấu trúc suốt thời gian sử dụng.",
      },
    ],
    systems: [
      "Cửa đi uPVC",
      "Cửa sổ uPVC",
      "Vách ngăn uPVC",
      "Hệ nhựa Kömmerling",
      "Hệ nhựa Asia",
      "Mở quay trong/ngoài, hất, quay – lật, trượt, xếp trượt",
    ],
  },
  {
    id: "go",
    tab: "CỬA GỖ & GỖ CHỐNG CHÁY",
    title: "CỬA GỖ & GỖ CHỐNG CHÁY",
    text: "Cửa gỗ tự nhiên, gỗ công nghiệp, gỗ ghép thanh, gỗ chống cháy và composite. Áp dụng công nghệ hiện đại từ Ý, Tây Ban Nha, Nga — giữ tính năng gỗ tự nhiên, độ cứng và độ bền cao, hạn chế cong vênh, co ngót theo thời tiết.",
    features: [
      "Đa dạng mẫu mã: pano kính, pano đặc, đường chỉ nổi, chỉ liền",
      "Công nghệ sản xuất hiện đại từ Ý, Tây Ban Nha, Nga",
      "Gỗ tự nhiên, công nghiệp, ghép thanh, chống cháy, composite",
    ],
    image: "/eurowindow/cuagotrangchu.jpg.webp",
    detailHref: "/san-pham/cua-go",
    intro: [
      "Áp dụng công nghệ sản xuất hiện đại từ Ý, Tây Ban Nha, Nga, cửa gỗ Eurowindow vừa giữ được tính năng của gỗ tự nhiên, vừa có độ cứng và độ bền cao, hạn chế tối đa sự biến đổi theo thời tiết như cong vênh, co ngót.",
      "Cửa gỗ được xem là giải pháp tối ưu bên trong (cửa thông phòng, căn hộ), phù hợp với nội thất cao cấp.",
    ],
    structure: [
      {
        title: "Nguyên liệu gỗ",
        text: "Nguyên liệu đầu vào được xử lý, tẩm sấy theo tiêu chuẩn độ ẩm xuất khẩu (12 – 14%); gỗ rừng trồng ghép thanh xử lý công nghệ biến tính gỗ.",
      },
      {
        title: "Hệ gioăng chuyên dụng",
        text: "Sử dụng hệ thống gioăng chuyên dụng nhập khẩu từ Châu Âu giúp cửa đóng mở êm, kín khít.",
      },
      {
        title: "Bề mặt & phun sơn",
        text: "Lựa chọn gỗ trước khi sản xuất kết hợp hệ thống phun sơn tự động cho độ phẳng bề mặt và màu sắc đồng đều.",
      },
    ],
    advantages: [
      {
        title: "Tính ổn định",
        text: "Nguyên liệu được tẩm sấy kỹ lưỡng, hạn chế biến đổi theo thời tiết.",
      },
      {
        title: "Đóng mở êm, kín khít",
        text: "Hệ gioăng chuyên dụng nhập khẩu Châu Âu giúp cửa đóng mở êm ái.",
      },
    ],
    systems: [
      "Cửa gỗ tự nhiên",
      "Cửa gỗ công nghiệp",
      "Cửa gỗ ghép thanh",
      "Cửa gỗ chống cháy",
      "Cửa gỗ composite",
    ],
  },
  {
    id: "kinh",
    tab: "SẢN PHẨM KÍNH",
    title: "SẢN PHẨM KÍNH CAO CẤP",
    text: "Trung tâm gia công kính tại KCN Quang Minh, Mê Linh, Hà Nội với dây chuyền sản xuất hiện đại trong phòng kín đạt chuẩn độ ẩm ≤46%, nhiệt độ 20–28°C. Kính cường lực, bán cường lực, hộp kính khổ lớn, kính hoa văn, kính dán an toàn, kính Low-E.",
    features: [
      "Kính cường lực, bán cường lực, kính dán an toàn",
      "Hộp kính khổ lớn, kính hoa văn, kính Low-E, kính điện đổi màu",
      "Sản xuất trong phòng kín đạt chuẩn nhiệt độ 20–28°C, độ ẩm ≤46%",
    ],
    image: "/eurowindow/san-pham-kinh.jpg.webp",
    detailHref: "/san-pham/san-pham-kinh",
    intro: [
      "Đáp ứng nhu cầu kính của Eurowindow và cung cấp cho thị trường các loại kính cao cấp, Eurowindow đầu tư Trung tâm gia công kính với dây chuyền sản xuất hiện đại và đồng bộ hàng đầu tại Việt Nam.",
    ],
    structure: [
      {
        title: "Kính cường lực & dán an toàn",
        text: "Gia công theo tiêu chuẩn Châu Âu EN 12150, chịu lực va đập gấp 5 lần kính thường.",
      },
      {
        title: "Hộp kính cản nhiệt Low-E",
        text: "Ngăn bức xạ mặt trời, giữ không gian luôn mát mẻ.",
      },
    ],
    advantages: [
      {
        title: "An toàn tuyệt đối",
        text: "Kính vỡ dạng hạt lựu tròn cạnh không gây sát thương.",
      },
    ],
    systems: ["Kính cường lực", "Kính dán an toàn", "Kính hộp Low-E", "Kính điện đổi màu"],
  },
  {
    id: "tu-dong",
    tab: "CỬA TỰ ĐỘNG",
    title: "CỬA TỰ ĐỘNG & THÔNG MINH",
    text: "Cửa trượt, cửa xoay tự động và vách kính thông minh cho các công trình thương mại, khách sạn, bệnh viện và biệt thự hiện đại.",
    features: [
      "Cảm biến hồng ngoại radar phát hiện chuyển động siêu nhạy",
      "Motor âm sàn / treo vận hành êm ái, tuổi thọ cao",
      "Cơ chế chống kẹp an toàn tuyệt đối",
    ],
    image: "/eurowindow/cua-tu-dong.jpg.webp",
    detailHref: "/san-pham/cua-tu-dong",
    intro: [
      "Hệ thống cửa tự động Eurowindow mang đến sự tiện nghi, sang trọng và nâng tầm kiến trúc hiện đại.",
    ],
    structure: [
      { title: "Hệ thống điều khiển", text: "Bộ vi xử lý thông minh kiểm soát tốc độ đóng mở an toàn." },
    ],
    advantages: [
      { title: "Tiện nghi đỉnh cao", text: "Đóng mở rảnh tay, cảm biến thông minh." },
    ],
    systems: ["Cửa trượt tự động", "Cửa xoay 3-4 cánh", "Cửa gấp trượt tự động"],
  },
  {
    id: "cuon",
    tab: "CỬA CUỐN",
    title: "CỬA CUỐN NHÔM KHE THOÁNG",
    text: "Cửa cuốn nhôm khe thoáng EASD45 hiện đại – vững chắc – an toàn – êm – đẹp, tích hợp cảm biến đảo chiều khi gặp vật cản và mã nhảy chống sao chép.",
    features: [
      "Nan nhôm hợp kim sơn tĩnh điện ngoài trời cao cấp",
      "Cảm biến đảo chiều tự động chống xô nan",
      "Mã nhảy Rolling Code bảo mật cao",
    ],
    image: "/eurowindow/cua-cuon.jpg.webp",
    detailHref: "/san-pham/cua-cuon",
    intro: [
      "Cửa cuốn nhôm khe thoáng Eurowindow hội tụ các ưu điểm: Hiện đại – Vững chắc – An toàn – Êm – Đẹp.",
    ],
    structure: [
      { title: "Nan nhôm khe thoáng", text: "Lưu thông không khí, giảm nhiệt." },
    ],
    advantages: [
      { title: "Bền bỉ, an toàn", text: "Vận hành êm ái, chống trộm an toàn." },
    ],
    systems: ["Cửa cuốn nhôm khe thoáng EASD45", "Cửa cuốn lên trần", "Cửa kéo ngang"],
  },
] as const;

const process = [
  ["GIAI ĐOẠN 1", "Tư vấn & khảo sát", "Lắng nghe nhu cầu, khảo sát hiện trường và tư vấn giải pháp cửa, vách chuẩn phong thủy và ngân sách."],
  ["GIAI ĐOẠN 2", "Sản xuất & kiểm tra", "Sản xuất tại nhà máy tự động theo hệ chuẩn Châu Âu và kiểm định chất lượng nghiêm ngặt."],
  ["GIAI ĐOẠN 3", "Lắp đặt & bàn giao", "Thi công bởi đội ngũ kỹ thuật giàu kinh nghiệm, nghiệm thu và bàn giao bảo hành chính hãng."],
] as const;

export default function SanPhamClient() {
  const [active, setActive] = useState<string>(services[0].id);
  const current = services.find((s) => s.id === active)!;

  return (
    <div className="min-h-screen bg-[#06101f] text-white">
      <Header />
      <main id="main-content">
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-[#06101f] pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/10">
          <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#1677FF]/5 blur-[140px]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C9A227]/5 blur-[140px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
              <Layers className="h-4 w-4 text-[#C9A227]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
                DANH MỤC SẢN PHẨM CAO CẤP
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Hệ Giải Pháp Cửa &amp; Vật Liệu Kiến Trúc Eurowindow
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#D2D8E3]">
              Tổng thể các dòng sản phẩm cửa nhôm kính, cửa nhựa uPVC, cửa gỗ, kính an toàn và cửa thông minh đạt chuẩn Châu Âu cho công trình hiện đại.
            </p>
          </div>
        </section>

        {/* Tab Selection & Product Presentation */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            {/* Pill Tabs */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center" role="tablist" aria-label="Chọn sản phẩm">
              {services.map((service) => {
                const isSelected = active === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActive(service.id)}
                    className={`rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      isSelected
                        ? "border border-[#C9A227] bg-[#C9A227] text-[#06101f] shadow-[0_0_25px_rgba(201,162,39,0.35)]"
                        : "border border-white/10 bg-white/5 text-[#D2D8E3] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {service.tab}
                  </button>
                );
              })}
            </div>

            {/* Active Product 2-Column Showcase */}
            <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="glass-card relative overflow-hidden p-3 backdrop-blur-2xl lg:col-span-6 rounded-3xl border border-white/10">
                <div className="relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden rounded-2xl bg-[#0c1c33]">
                  <img
                    key={current.id}
                    src={current.image}
                    alt={current.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06101f]/75 via-transparent to-transparent" />
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-3xl border border-white/10 bg-[#0c1c33]/80 p-8 lg:col-span-6 backdrop-blur-2xl shadow-xl space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>TIÊU CHUẨN CHÂU ÂU CHÍNH HÃNG</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">{current.title}</h2>
                <p className="leading-relaxed text-[#D2D8E3] text-sm sm:text-base">{current.text}</p>
                
                <ul className="space-y-3 pt-2">
                  {current.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-[#D2D8E3]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A227]" strokeWidth={3} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href={current.detailHref}
                    className="btn-gold-luxury px-6 py-3.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
                  >
                    <span>Xem Chi Tiết Dòng Sản Phẩm</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/lien-he"
                    className="btn-secondary-outline px-6 py-3.5 text-xs font-bold uppercase tracking-widest"
                  >
                    Nhận Báo Giá
                  </Link>
                </div>
              </div>
            </div>

            {/* Detailed Structure & Advantages */}
            <div key={`${current.id}-detail`} className="mt-20 border-t border-white/10 pt-16 space-y-16">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-[#0c1c33]/70 p-8 backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Giới thiệu sản phẩm</p>
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#D2D8E3]">
                    {current.intro.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0c1c33]/70 p-8 backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Cấu tạo &amp; Công nghệ</p>
                  <div className="mt-5 space-y-5">
                    {current.structure.map((item: Section) => (
                      <div key={item.title} className="border-l-2 border-[#C9A227] pl-4">
                        <h3 className="font-serif font-bold text-white text-base">{item.title}</h3>
                        <p className="mt-1 text-xs sm:text-sm text-[#D2D8E3] leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advantages Grid */}
              <div>
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-[#C9A227]">Đặc tính ưu việt</p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {current.advantages.map((item: Advantage) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0c1c33]/60 p-6 backdrop-blur-md transition hover:border-[#C9A227]/40">
                      <h4 className="flex items-start gap-2.5 font-serif font-bold text-white text-base">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#C9A227]" strokeWidth={3} />
                        <span>{item.title}</span>
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-[#D2D8E3]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Systems Tags */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1c33]/80 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Các hệ sản phẩm chi tiết</p>
                <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  {current.systems.map((system) => (
                    <li key={system} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#D2D8E3]">
                      <Check className="h-4 w-4 shrink-0 text-[#C9A227]" strokeWidth={3} />
                      <span>{system}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="border-t border-white/10 bg-[#071523] py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="space-y-2 mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">QUY TRÌNH CHUẨN CHÂU ÂU</span>
              <h2 className="font-serif text-3xl font-bold uppercase text-white md:text-4xl">QUY TRÌNH THI CÔNG &amp; BÀN GIAO</h2>
            </div>
            <ol className="grid gap-8 md:grid-cols-3">
              {process.map(([stage, title, text]) => (
                <li key={stage} className="rounded-3xl border border-white/10 bg-[#0c1c33] p-8 shadow-xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">{stage}</p>
                  <h3 className="mt-3 font-serif text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 leading-relaxed text-[#D2D8E3] text-sm">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <NewsSlide />
      <Footer />
    </div>
  );
}
