import migratedArticlesData from "@/data/migrated-articles.json";

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  sections: { heading: string; id: string; body: string[] }[];
  faq?: { q: string; a: string }[];
  image?: string;
  contentHtml?: string;
  author?: string;
  tags?: string[];
  oldUrl?: string;
  originalSlug?: string;
  aliases?: string[];
};

const handcraftedArticles: Article[] = [
  {
    slug: "uu-dai-cua-upvc",
    aliases: ["uu-dai-cua-nhua-upvc", "khuyen-mai-cua-upvc"],
    title: "ƯU ĐÃI CỬA uPVC TIẾT KIỆM NĂNG LƯỢNG – EUROWINDOW HCM",
    category: "Ưu đãi",
    date: "15/07/2026",
    excerpt: "Chương trình ưu đãi đặc quyền hệ cửa nhựa uPVC Eurowindow tiêu chuẩn Châu Âu: cách âm vượt trội tới 44dB, giảm 30% chi phí điện năng tiêu thụ, bảo hành profile chính hãng 10 năm.",
    image: "/eurowindow/cuanhua1.jpg.webp",
    sections: [
      {
        heading: "Đột phá cách âm và tiết kiệm năng lượng với cửa uPVC Eurowindow",
        id: "dot-pha-cach-am-tiet-kiem-nang-luong",
        body: [
          "Cửa nhựa uPVC Eurowindow là dòng sản phẩm tiên phong làm nên thương hiệu Eurowindow từ năm 2002 tại thị trường Việt Nam. Được sản xuất từ thanh profile định hình uPVC cao cấp gia cường lõi thép mạ kẽm chống gỉ, quý khách có thể tham khảo bảng thông số kỹ thuật chi tiết tại danh mục [cửa nhựa uPVC Eurowindow](/san-pham/cua-nhua-upvc) chính hãng.",
          "Hệ thống khoang rỗng cách âm nhiều buồng kết hợp gioăng cao su kép EPDM chuyên dụng kín khít tuyệt đối giúp giảm độ ồn từ bên ngoài vào tới 44dB, kiến tạo không gian sống yên tĩnh hoàn hảo giữa đô thị ồn ào.",
          "Đặc biệt, khả năng dẫn nhiệt cực thấp của thanh profile uPVC kết hợp hộp kính khí trơ Argon hoặc kính Low-E ngăn truyền nhiệt hiệu quả, giúp căn nhà luôn mát mẻ vào mùa hè và ấm áp vào mùa đông, cắt giảm tới 30% chi phí tiền điện điều hòa hàng tháng.",
        ],
      },
      {
        heading: "Chính sách ưu đãi và gói bảo hành vàng 2026",
        id: "chinh-sach-uu-dai-bao-hanh",
        body: [
          "Nhằm tri ân khách hàng và đồng hành cùng các gia đình kiến tạo tổ ấm bền vững, Eurowindow HCM triển khai chương trình ưu đãi đặc biệt:",
          "• Giảm trực tiếp lên đến 15% cho các đơn hàng cửa sổ và cửa đi uPVC cao cấp lắp đặt trong tháng.",
          "• Tặng gói phụ kiện kim khí đồng bộ nhập khẩu chính hãng (Roto, Winkhaus, GU) đạt chuẩn Châu Âu.",
          "• Miễn phí 100% chi phí khảo sát công trình, tư vấn giải pháp thiết kế phong thủy và dự toán chi tiết tận nơi.",
          "• Cam kết bảo hành 10 năm đối với thanh profile uPVC không ố vàng, rạn nứt hay co ngót theo thời tiết nhiệt đới.",
        ],
      },
      {
        heading: "Tiêu chuẩn kỹ thuật vượt trội",
        id: "tieu-chuan-ky-thuat-vuot-troi",
        body: [
          "Toàn bộ sản phẩm được gia công trên dây chuyền tự động hóa nhập khẩu từ CHLB Đức. Các góc ghép được hàn nhiệt liên kết phân tử nguyên khối đảm bảo kín nước 100%, không bị thẩm thấu hay rò rỉ ngay cả khi đối mặt với bão gió cấp 12.",
        ],
      },
    ],
    faq: [
      {
        q: "Cửa nhựa uPVC Eurowindow có bị ố vàng hay cong vênh dưới nắng nhiệt đới không?",
        a: "Thanh profile uPVC của Eurowindow chứa hợp chất phụ gia ổn định nhiệt và chất chống tia cực tím (UV stabilizer) cao cấp, được chứng nhận không biến màu, không ố vàng và không cong vênh co ngót suốt hàng chục năm sử dụng.",
      },
      {
        q: "Lắp đặt cửa uPVC Eurowindow tiết kiệm điện năng như thế nào?",
        a: "Nhờ hệ số dẫn nhiệt k cực thấp của nhựa uPVC kết hợp với kính hộp cách nhiệt và gioăng EPDM kép, nhiệt lượng từ ngoài trời không truyền vào nhà, giảm tải làm việc cho máy điều hòa và giúp tiết kiệm khoảng 30% lượng điện tiêu thụ.",
      },
      {
        q: "Thời gian bảo hành cửa uPVC Eurowindow là bao lâu?",
        a: "Eurowindow áp dụng chính sách bảo hành chính hãng lên tới 10 năm cho thanh profile uPVC và bảo hành bảo trì định kỳ cho hệ phụ kiện kim khí đồng bộ.",
      },
    ],
  },
  {
    slug: "uu-dai-cua-nhom-kinh",
    aliases: ["uu-dai-cua-nhom", "khuyen-mai-cua-nhom-kinh"],
    title: "ƯU ĐÃI HỆ CỬA NHÔM KÍNH EA55–EA95i EUROWINDOW",
    category: "Ưu đãi",
    date: "12/07/2026",
    excerpt: "Chương trình ưu đãi hấp dẫn hệ cửa nhôm kính cao cấp EA55, EA65, EA95i có cầu cách nhiệt tiêu chuẩn Châu Âu, tích hợp phụ kiện Roto, Cmech cùng kính Low-E an toàn.",
    image: "/eurowindow/ctkm-ea65ea68i-169-at-3x-large.png.webp",
    sections: [
      {
        heading: "Đỉnh cao cửa nhôm kính thế hệ mới EA55 – EA95i",
        id: "dinh-cao-cua-nhom-the-he-moi",
        body: [
          "Hệ [cửa nhôm Eurowindow EA55–EA95i](/san-pham/cua-nhom) là dòng sản phẩm cao cấp được thiết kế tối ưu cho các công trình biệt thự, penthouse và căn hộ cao cấp. Với kết cấu profile nhôm định hình hợp kim 6063-T5 độ dày tiêu chuẩn, hệ cửa đem lại độ cứng cáp và khả năng chịu áp lực gió bão vượt trội.",
          "Đặc biệt, phiên bản có dải cầu cách nhiệt Polyamide giúp ngắt hoàn toàn cầu dẫn nhiệt giữa mặt trong và mặt ngoài khung nhôm, kết hợp kính Low-E cản bức xạ mặt trời, giữ không gian nội thất luôn mát mẻ và sang trọng.",
        ],
      },
      {
        heading: "Ưu đãi độc quyền và quà tặng cao cấp",
        id: "uu-dai-doc-quyen-qua-tang",
        body: [
          "Khách hàng ký hợp đồng lắp đặt hệ cửa nhôm EA55, EA65 hoặc EA95i trong thời gian khuyến mãi sẽ nhận ngay chiết khấu đặc biệt lên tới 12% tổng giá trị đơn hàng, kèm gói nâng cấp miễn phí kính an toàn 2 lớp chống trộm và dịch vụ bảo dưỡng định kỳ 2 năm đầu hoàn toàn miễn phí.",
        ],
      },
    ],
    faq: [
      {
        q: "Cửa nhôm cầu cách nhiệt EA95i khác gì so với cửa nhôm thông thường?",
        a: "Nhôm thông thường dẫn nhiệt mạnh khiến phòng dễ bị nóng. Hệ nhôm EA95i có cầu cách nhiệt bằng thanh Polyamide ở giữa, ngăn truyền nhiệt tới 95%, kết hợp kính hộp cách âm cách nhiệt toàn diện.",
      },
      {
        q: "Bề mặt sơn nhôm Eurowindow được bảo hành bao lâu?",
        a: "Bề mặt nhôm được sơn tĩnh điện công nghệ cao hoặc phủ PVDF/Anodize đạt chuẩn quốc tế Qualicoat, cam kết độ bền màu và chống ăn mòn muối biển lên tới 15 - 25 năm.",
      },
    ],
  },
  {
    slug: "sinh-nhat-eurowindow",
    aliases: ["chao-mung-sinh-nhat-eurowindow", "ky-niem-sinh-nhat-eurowindow"],
    title: "CHÀO MỪNG SINH NHẬT EUROWINDOW – HÀNH TRÌNH 20+ NĂM TIÊN PHONG KIẾN TẠO",
    category: "Văn hóa",
    date: "20/08/2026",
    excerpt: "Hành trình hơn hai thập kỷ phát triển bứt phá của Eurowindow, khẳng định vị thế thương hiệu quốc gia dẫn đầu ngành cửa và vật liệu xây dựng xanh tại Việt Nam.",
    image: "/eurowindow/videos/phong-su-eurowindow.jpg.webp",
    sections: [
      {
        heading: "Hơn 20 năm khẳng định vị thế thương hiệu tiên phong",
        id: "hon-20-nam-khang-dinh-vi-the",
        body: [
          "Thành lập từ năm 2002, Eurowindow tự hào mở ra cuộc cách mạng về cửa hiện đại tại Việt Nam. Từ những ngày đầu đưa cửa uPVC vào thị trường, đến nay thương hiệu đã hiện diện tại hàng trăm nghìn công trình trên khắp cả nước, bao gồm cả những công trình trọng điểm cấp quốc gia như Tòa nhà Quốc hội, trụ sở Chính phủ, sân bay quốc tế và các khu đô thị hàng đầu.",
          "Cột mốc sinh nhật là dịp để toàn thể cán bộ nhân viên nhìn lại hành trình vẻ vang và tiếp tục cống hiến cho sứ mệnh mang đến giải pháp cửa thông minh, xanh và bền vững cho người tiêu dùng.",
        ],
      },
      {
        heading: "Chuỗi hoạt động kỷ niệm và tri ân",
        id: "chuoi-hoat-dong-ky-niem",
        body: [
          "Nhân dịp sinh nhật, Eurowindow tổ chức hàng loạt hoạt động văn hóa nội bộ sôi nổi, cùng các chương trình thiện nguyện vì cộng đồng và ưu đãi tri ân đối tác, khách hàng đã luôn tin tưởng đồng hành cùng thương hiệu suốt thời gian qua.",
        ],
      },
    ],
  },
  {
    slug: "giai-bong-da-noi-bo",
    aliases: ["giai-bong-da-eurowindow", "hoi-thao-bong-da-noi-bo"],
    title: "GIẢI BÓNG ĐÁ NỘI BỘ EUROWINDOW – GẮN KẾT ĐỘI NGŨ & BỨT PHÁ TINH THẦN",
    category: "Văn hóa",
    date: "15/08/2026",
    excerpt: "Giải bóng đá nội bộ thường niên Eurowindow quy tụ các đội bóng từ khối văn phòng, nhà máy và chi nhánh, tạo sân chơi thể thao rèn luyện thể lực và thắt chặt tình đoàn kết.",
    image: "/eurowindow/banner-than-website.png.webp",
    sections: [
      {
        heading: "Sân chơi thể thao rèn luyện và gắn kết",
        id: "san-choi-the-thao-gan-ket",
        body: [
          "Bên cạnh hoạt động sản xuất kinh doanh, Eurowindow luôn chú trọng xây dựng đời sống văn hóa tinh thần lành mạnh cho người lao động. Giải bóng đá nội bộ là sự kiện thường niên được đông đảo cán bộ công nhân viên mong chờ, quy tụ các tài năng bóng đá phong trào từ mọi phòng ban và đơn vị thành viên.",
          "Các trận đấu diễn ra kịch tính, sôi nổi trên tinh thần thể thao cao thượng, đoàn kết và hữu nghị, tiếp thêm năng lượng tích cực cho tập thể hoàn thành xuất sắc các mục tiêu chung.",
        ],
      },
    ],
  },
  {
    slug: "toa-dam-xu-huong-nguon-nhan-luc",
    title: "Eurowindow tổ chức thành công tọa đàm “Xu hướng nguồn nhân lực – Chiến lược phát triển và quản trị trong bối cảnh mới”",
    category: "Hoạt động",
    date: "25/07/2026",
    excerpt: "Tọa đàm quy tụ các diễn giả, chuyên gia và lãnh đạo nhằm chia sẻ xu hướng nguồn nhân lực cùng chiến lược phát triển, quản trị nhân sự trong bối cảnh kinh tế mới.",
    image: "/eurowindow/toa-dam-1.png.webp",
    sections: [
      {
        heading: "Tọa đàm chuyên sâu về chiến lược nhân sự",
        id: "toa-dam-chuyen-sau",
        body: [
          "Eurowindow vừa tổ chức thành công tọa đàm “Xu hướng nguồn nhân lực – Chiến lược phát triển và quản trị trong bối cảnh mới”. Sự kiện quy tụ lãnh đạo, chuyên gia nhân sự và đội ngũ quản lý các cấp cùng trao đổi về những thách thức và cơ hội trong thu hút, giữ chân và phát triển nhân tài.",
          "Tại tọa đàm, các diễn giả đã chia sẻ bức tranh tổng quan về thị trường lao động, xu hướng chuyển dịch nhân sự cũng như vai trò của văn hóa doanh nghiệp trong việc kiến tạo môi trường làm việc bền vững.",
        ],
      },
      {
        heading: "Con người là nền tảng phát triển",
        id: "con-nguoi-la-nen-tang",
        body: [
          "Với hơn 20 năm phát triển, Eurowindow luôn xác định con người là tài sản quý giá nhất. Các chương trình đào tạo, lộ trình thăng tiến và chính sách phúc lợi được liên tục hoàn thiện nhằm đồng hành cùng sự phát triển của từng cá nhân.",
          "Thông qua tọa đàm, Eurowindow mong muốn xây dựng một đội ngũ vững mạnh, sẵn sàng kiến tạo những giá trị bền vững cho khách hàng và cộng đồng.",
        ],
      },
    ],
  },
  {
    slug: "cua-vach-kinh-vinhomes-global-gate",
    title: "Eurowindow cung cấp, lắp đặt cửa và vách kính tại khu đô thị Vinhomes Global Gate Cổ Loa",
    category: "Dự án",
    date: "18/07/2026",
    excerpt: "Eurowindow tiếp tục ghi dấu ấn khi cung cấp và lắp đặt hệ cửa, vách kính cho khu đô thị Vinhomes Global Gate Cổ Loa.",
    image: "/eurowindow/img-0344.jpeg.webp",
    sections: [
      {
        heading: "Dự án quy mô tại Cổ Loa",
        id: "du-an-quy-mo-co-loa",
        body: [
          "Eurowindow được lựa chọn cung cấp và lắp đặt hệ cửa, vách kính cho khu đô thị Vinhomes Global Gate Cổ Loa – một trong những đại đô thị đáng chú ý phía Đông Hà Nội.",
          "Với kinh nghiệm hiện diện ở hàng trăm nghìn công trình, Eurowindow mang đến giải pháp cửa, vách nhôm kính đồng bộ, đạt tiêu chuẩn châu Âu, đáp ứng yêu cầu khắt khe về thẩm mỹ, cách âm và an toàn.",
        ],
      },
      {
        heading: "Giải pháp đồng bộ cho không gian hiện đại",
        id: "giai-phap-dong-bo",
        body: [
          "Hệ cửa nhôm kính và vách kính lớn do Eurowindow cung cấp giúp tối ưu ánh sáng tự nhiên, tầm nhìn rộng mở và không gian sống tiện nghi cho cư dân.",
          "Đây là minh chứng tiếp theo cho năng lực triển khai các dự án quy mô lớn của Eurowindow trong phân khúc bất động sản.",
        ],
      },
    ],
  },
  {
    slug: "giai-phap-cua-chong-nong-mua-he-2026",
    title: "Tổng hợp giải pháp cửa chống nóng Eurowindow mùa hè 2026",
    category: "Chia sẻ kiến thức",
    date: "10/07/2026",
    excerpt: "Cùng Eurowindow khám phá các giải pháp cửa chống nóng hiệu quả giúp không gian sống mát mẻ, tiết kiệm năng lượng trong mùa hè.",
    image: "/eurowindow/cua-nhom-kinh-cach-am-1.jpg.webp",
    sections: [
      {
        heading: "Vì sao cần cửa chống nóng?",
        id: "vi-sao-can-cua-chong-nong",
        body: [
          "Mùa hè nhiệt độ tăng cao, cửa sổ và cửa đi chính là cầu nối truyền nhiệt lớn nhất vào không gian sống. Lựa chọn hệ cửa chống nóng phù hợp giúp giảm hấp thụ nhiệt, tiết kiệm điện cho điều hòa và nâng cao sự thoải mái cho cả gia đình.",
        ],
      },
      {
        heading: "Các giải pháp tiêu biểu",
        id: "cac-giai-phap-tieu-bieu",
        body: [
          "[Cửa nhựa uPVC Eurowindow](/san-pham/cua-nhua-upvc) với cấu trúc khoang rỗng nhiều ngăn kết hợp kính hộp cách nhiệt giúp ngăn truyền nhiệt vượt trội. Trong khi đó, [cửa nhôm kính Eurowindow](/san-pham/cua-nhom) kết hợp kính Low-E phản xạ bức xạ mặt trời, giảm nóng hiệu quả mà vẫn đón sáng tự nhiên.",
        ],
      },
    ],
    faq: [
      { q: "Loại cửa nào chống nóng tốt nhất?", a: "Cửa uPVC kết hợp kính hộp cách nhiệt hoặc cửa nhôm kính với kính Low-E cho khả năng chống nóng vượt trội." },
      { q: "Kính Low-E có giảm sáng không?", a: "Kính Low-E phản xạ nhiệt nhưng vẫn cho ánh sáng tự nhiên đi qua, giữ không gian sáng và mát." },
    ],
  },
  {
    slug: "nen-chon-cua-gi-cho-mua-he-nang-nong",
    title: "Nên chọn cửa gì cho mùa hè nắng nóng?",
    category: "Chia sẻ kiến thức",
    date: "05/07/2026",
    excerpt: "Tư vấn lựa chọn hệ cửa phù hợp với thời tiết nắng nóng của Việt Nam, cân bằng giữa chống nóng, thẩm mỹ và ngân sách.",
    image: "/eurowindow/z7978260236950-59ec572c33f7b933b6e48fae6107511b.jpg",
    sections: [
      {
        heading: "Yếu tố quyết định khi chọn cửa",
        id: "yeu-to-quyet-dinh",
        body: [
          "Khi lựa chọn cửa cho khí hậu nắng nóng, cần cân nhắc khả năng cách nhiệt của khung và ưu tiên ứng dụng các dòng [sản phẩm kính an toàn, kính Low-E Eurowindow](/san-pham/san-pham-kinh) với hệ số truyền nhiệt thấp để tối ưu chi phí vận hành điều hòa lâu dài.",
        ],
      },
    ],
  },
  {
    slug: "eurowindow-top-10-doanh-nghiep-xanh-2026",
    aliases: ["top-10-doanh-nghiep-xanh"],
    title: "Eurowindow tự hào được vinh danh Top 10 doanh nghiệp xanh Việt Nam 2026",
    category: "Sự kiện",
    date: "28/06/2026",
    excerpt: "Eurowindow tiếp tục khẳng định vị thế dẫn đầu khi lần thứ 14 vinh danh trong bảng xếp hạng doanh nghiệp phát triển xanh và bền vững.",
    image: "/eurowindow/img-0344.jpeg.webp",
    sections: [
      {
        heading: "Hành trình cam kết phát triển xanh",
        id: "hanh-trinh-cam-ket",
        body: ["Ứng dụng công nghệ tiết kiệm năng lượng và dây chuyền sản xuất hiện đại tiêu chuẩn Châu Âu giúp Eurowindow giảm phát thải carbon."],
      },
    ],
  },
  {
    slug: "eurowindow-dien-dan-nang-luong-moi-truong",
    title: "Eurowindow đồng hành Diễn đàn Năng lượng và Môi trường Thế giới – Việt Nam 2026",
    category: "Sự kiện",
    date: "20/06/2026",
    excerpt: "Thúc đẩy các giải pháp vật liệu xây dựng xanh hướng tới Net Zero và kiến trúc phát triển bền vững.",
    image: "/eurowindow/toa-dam-1.png.webp",
    sections: [
      {
        heading: "Đồng hành hướng tới mục tiêu Net Zero",
        id: "dong-hanh-net-zero",
        body: ["Eurowindow mang tới các giải pháp vách kính tiết kiệm năng lượng, kính Low-E và cửa nhôm cầu cách nhiệt cao cấp."],
      },
    ],
  },
  {
     slug: "eurowindow-fpt-telecom-tower",
     title: "Eurowindow trúng thầu thi công hệ cửa và vách nhôm kính dự án FPT Telecom Tower",
     category: "Dự án",
     date: "12/06/2026",
     excerpt: "Thi công hệ vách kính mặt dựng nhôm kính lớn cho tòa nhà công nghệ hiện đại FPT Telecom Tower.",
     image: "/eurowindow/z7653606237319-b225700b968578333eda5fd2d45b447f-large.jpg.webp",
    sections: [
      {
        heading: "Hệ vách kính mặt dựng quy mô lớn",
        id: "he-vach-kinh-mat-dung",
        body: ["Dự án đòi hỏi khả năng chịu lực gió, cách âm và phản quang chống chói tối ưu cho tòa nhà văn phòng cao tầng."],
      },
    ],
  },
  {
     slug: "eurowindow-sunshine-noble-palace",
     title: "Eurowindow góp phần kiến tạo không gian sống thượng lưu dự án Sunshine Noble Palace Long Biên",
     category: "Dự án",
     date: "02/06/2026",
     excerpt: "Cung cấp trọn gói hệ thống cửa nhôm kính cao cấp cho quần thể biệt thự xa xỉ tại Hà Nội.",
     image: "/eurowindow/z7566831336677-bcca668552e197796dcd2bd428af8f1a-large.jpg.webp",
    sections: [
      {
        heading: "Đẳng cấp kiến trúc thượng lưu",
        id: "dang-cap-kien-truc",
        body: ["Cửa nhôm kính Eurowindow tôn vinh vẻ đẹp hiện đại và đáp ứng các tiêu chuẩn cách âm, kín nước cao nhất."],
      },
    ],
  },
  {
     slug: "eurowindow-the-9-stellars",
     title: "Eurowindow trúng thầu thi công cửa và vách nhôm kính dự án The 9 Stellars",
     category: "Dự án",
     date: "25/05/2026",
     excerpt: "Triển khai lắp đặt giải pháp cửa nhôm kính cao cấp tại khu đô thị thông minh The 9 Stellars TP. Thủ Đức.",
     image: "/eurowindow/z7407016766473-8a61e442dd6f696fc17cd2dbcfa746f8-large.jpg.webp",
    sections: [
      {
        heading: "Dấu ấn kiến trúc tại TP. Thủ Đức",
        id: "dau-an-thu-duc",
        body: ["Đồng hành cùng chủ đầu tư tạo nên không gian sống xanh, đón ánh sáng tự nhiên tối đa."],
      },
    ],
  },
  {
     slug: "eurowindow-the-prive-nam-rach-chiec",
     title: "Eurowindow kiến tạo không gian sống tại chung cư cao tầng The Privé Nam Rạch Chiếc",
     category: "Dự án",
     date: "15/05/2026",
     excerpt: "Cung cấp giải pháp cửa uPVC cách âm và vách nhôm kính ban công cho tổ hợp căn hộ cao cấp.",
     image: "/eurowindow/the-prive-layout-5-large.jpg.webp",
    sections: [
      {
        heading: "Giải pháp cửa cách âm vượt trội",
        id: "cua-cach-am-privie",
        body: ["Giúp cư dân tận hưởng không gian yên tĩnh và tầm nhìn xanh tuyệt đẹp hướng sông."],
      },
    ],
  },
  {
    slug: "cua-nhom-cau-cach-nhiet-bi-quyet-tiet-kiem-dien",
    title: "Cửa nhôm cầu cách nhiệt – Bí quyết tiết kiệm điện năng cho biệt thự hiện đại",
    category: "Chia sẻ kiến thức",
    date: "02/05/2026",
    excerpt: "Giải mã cấu tạo dải polyamide cách nhiệt giúp cản nhiệt nóng mùa hè và giữ ấm mùa đông.",
    image: "/eurowindow/cuanhom.jpg.webp",
    sections: [
      {
        heading: "Công nghệ cầu cách nhiệt Châu Âu",
        id: "cong-nghe-cau-cach-nhiet",
        body: [
          "Dải Polyamide cách nhiệt kết hợp hệ gioăng EPDM và khoang rỗng đa buồng giúp giảm đến 40% lượng nhiệt thất thoát qua khung nhôm.",
          "Hệ nhôm cao cấp có cầu cách nhiệt Polyamide kết hợp đồng bộ với kính hộp nạp khí trơ mang lại giải pháp [cửa nhôm Eurowindow](/san-pham/cua-nhom) cách nhiệt, cách âm vượt trội cho các công trình nhà phố, biệt thự và căn hộ hiện đại.",
        ],
      },
    ],
  },
  {
    slug: "phong-thuy-cua-so-va-cua-chinh",
    title: "Phong thủy cửa sổ và cửa chính: Kích thước Lỗ Ban đón tài lộc cho gia chủ",
    category: "Chia sẻ kiến thức",
    date: "20/04/2026",
    excerpt: "Hướng dẫn chọn kích thước lọt lòng hợp phong thủy theo Thước Lỗ Ban 52.2cm chuẩn xác.",
    image: "/eurowindow/cuanhua1.jpg.webp",
    sections: [
      {
        heading: "Ứng dụng Thước Lỗ Ban 52.2cm",
        id: "ung-dung-thuoc-lo-ban",
        body: [
          "Đo thông thủy cửa đi và cửa sổ vào các cung Cát: Tài Lộc, Quý Nhân, Tử Tức.",
          "Quý gia chủ đang chuẩn bị hoàn thiện tổ ấm có thể đăng ký [tư vấn kích thước cửa Eurowindow chuẩn phong thủy tại TP.HCM](/cua-eurowindow) để nhận bản vẽ chi tiết và giải pháp báo giá tối ưu.",
        ],
      },
    ],
  },
  {
    slug: "so-sanh-cua-nhom-va-cua-upvc",
    title: "So sánh cửa nhôm kính và cửa nhựa uPVC Eurowindow: Nên chọn loại nào?",
    category: "Chia sẻ kiến thức",
    date: "10/04/2026",
    excerpt: "Phân tích ưu nhược điểm, độ bền, độ cách âm và chi phí giữa cửa nhôm cao cấp và cửa uPVC.",
    image: "/eurowindow/cuagotrangchu.jpg.webp",
    sections: [
      {
        heading: "So sánh toàn diện hai hệ cửa",
        id: "so-sanh-hai-he-cua",
        body: [
          "Dòng [cửa nhựa uPVC Eurowindow](/san-pham/cua-nhua-upvc) với cấu trúc khoang rỗng gia cường thép vượt trội về độ kín khít, cách âm tới 44dB và ngăn truyền nhiệt tối ưu cho không gian sống yên tĩnh.",
          "Trong khi đó, hệ [cửa nhôm kính Eurowindow](/san-pham/cua-nhom) vượt trội về khả năng chịu tải trọng gió bão lớn, thích hợp hoàn hảo cho các diện vách kính khổ lớn và kiến trúc khẩu độ rộng sang trọng.",
        ],
      },
    ],
  },
  {
    slug: "quy-trinh-san-xuat-kinh-cuong-luc-eurowindow",
    title: "Quy trình gia công kính cường lực và kính hộp cách nhiệt tiêu chuẩn Châu Âu",
    category: "Chia sẻ kiến thức",
    date: "01/04/2026",
    excerpt: "Khám phá quy trình tôi cường lực, nạp khí Argon và gia công kính Low-E tại nhà máy Eurowindow.",
    image: "/eurowindow/san-pham-kinh.jpg.webp",
    sections: [
      {
        heading: "Dây chuyền công nghệ cao",
        id: "day-chuyen-cong-nghe",
        body: [
          "Sử dụng công nghệ Châu Âu đảm bảo bề mặt kính phẳng hoàn hảo và chịu va đập gấp 5 lần so với kính nổi thông thường.",
          "Quy trình nạp khí trơ Argon tự động cùng thanh cữ nhôm hút ẩm tạo nên các hệ [sản phẩm kính an toàn Eurowindow](/san-pham/san-pham-kinh) và kính hộp cách nhiệt chất lượng cao, hạn chế tối đa hiện tượng ngưng tụ sương.",
        ],
      },
    ],
  },
  {
    slug: "khuyen-mai-kinh-dien-doi-mau",
    aliases: ["khuyen-mai-kinh-dien"],
    title: "Chương trình ưu đãi kính điện đổi màu và cửa tự động Eurowindow 2026",
    category: "Ưu đãi",
    date: "20/03/2026",
    excerpt: "Ưu đãi hấp dẫn lên đến 15% cho các gói giải pháp kính thông minh và cửa trượt tự động.",
    image: "/eurowindow/cua-tu-dong.jpg.webp",
    sections: [
      {
        heading: "Trải nghiệm kính thông minh cao cấp",
        id: "trai-nghiem-kinh-thong-minh",
        body: [
          "Đổi màu linh hoạt từ trong suốt sang mờ chỉ bằng một thao tác bấm công tắc hoặc điều khiển thông minh qua smartphone.",
          "Khi lựa chọn gói kính điện thông minh, khách hàng được hưởng chính sách ưu đãi đặc biệt khi kết hợp lắp đặt đồng bộ cùng hệ thống [cửa tự động Eurowindow](/san-pham/cua-tu-dong) chuẩn Châu Âu.",
        ],
      },
    ],
  },
  {
    slug: "bao-tri-he-thong-cua-dung-cach",
    title: "Hướng dẫn bảo trì & vệ sinh hệ thống cửa nhôm kính luôn như mới",
    category: "Chia sẻ kiến thức",
    date: "10/03/2026",
    excerpt: "Mẹo vệ sinh bề mặt nhôm sơn tĩnh điện và tra dầu phụ kiện kim khí định kỳ đúng kỹ thuật.",
    image: "/eurowindow/cua-cuon.jpg.webp",
    sections: [
      {
        heading: "Quy trình chăm sóc định kỳ",
        id: "quy-trinh-cham-soc",
        body: [
          "Việc tra dầu phụ kiện kim khí và vệ sinh bề mặt định kỳ giúp nâng cao tuổi thọ vận hành cửa lên tới 30 - 50 năm.",
          "Bên cạnh việc tự bảo dưỡng cơ bản, khách hàng nên định kỳ sử dụng [dịch vụ bảo trì cửa chuyên nghiệp](/dich-vu) của Eurowindow để kỹ thuật viên kiểm tra độ kín khít và cân chỉnh bản lề, khóa đồng bộ.",
        ],
      },
    ],
  },
  {
    slug: "eurowindow-thi-cong-vach-kinh-ban-mong-sa-pa",
    title: "Eurowindow thi công hệ vách kính mặt dựng khu nghỉ dưỡng Bản Mòng - Sa Pa",
    category: "Dự án",
    date: "25/11/2025",
    excerpt: "Với uy tín và năng lực đã được khẳng định qua hàng loạt công trình trọng điểm trên cả nước, Eurowindow tiếp tục được lựa chọn là đơn vị cung cấp và thi công hệ vách kí…",
    image: "/eurowindow/z7258257468568-ccd777e6df2eea84744ecb1bff5b95da-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-1",
        body: ["Với uy tín và năng lực đã được khẳng định qua hàng loạt công trình trọng điểm trên cả nước, Eurowindow tiếp tục được lựa chọn là đơn vị cung cấp và thi công hệ vách kính mặt dựng hoàn thiện tại dự án khu nghỉ dưỡng cao cấp Bản Mòng - Sa Pa, do CTCP Đầu tư Xây dựng và Thương mại Việt Nam làm tổng thầu.", "Khu nghỉ dưỡng Bản Mòng do CTCP Đầu tư Xây dựng và Thương mại Việt Nam làm tổng thầu, quy mô hơn 27 ha, là tổ hợp nghỉ dưỡng, giải trí và ẩm thực hạng sang tại triền núi Hàm Rồng. Dự án tọa lạc trên triền núi Hàm Rồng, phường Cầu Mây- cách trung tâm Sa Pa 2 km. Bản Mòng Resort & Funfair mang đến quần thể khách sạn mini 5 sao hơn 1.500 phòng, được sử dụng vật liệu và nội thất cao cấp."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-1",
        body: ["Theo hợp đồng ký kết, Eurowindow sẽ chịu trách nhiệm cung cấp và lắp đặt trọn gói hệ vách kính mặt dựng cho dự án Bản Mòng. Vách kính cố định sử dụng nhôm Eurowindow EA55, sơn tĩnh điện màu đỏ, kính hộp kết hợp kính cường lực, kính dán an toàn giúp tăng cường khả năng chịu lực, cách âm, cách nhiệt, chống tia UV hiệu quả.", "Hệ vách kính Eurowindow được thiết kế đặc biệt giúp hạn chế tối đa hiện tượng đọng nước – ngưng sương trên bề mặt, giữ cho mặt dựng luôn khô thoáng và ổn định trước mọi điều kiện thời tiết.", "Khung nhôm Eurowindow hệ EA55 được xử lý bề mặt bằng công nghệ sơn tĩnh điện cao cấp, giúp chống oxy hóa, hạn chế tối đa tình trạng han gỉ, phai màu hay hoen ố sau thời gian dài sử dụng trong môi trường núi cao ẩm ướt. Tuổi thọ công trình được kéo dài đáng kể, giảm chi phí bảo trì cho chủ đầu tư.", "Kính hộp và kính dán an toàn trong hệ mặt dựng không chỉ tăng cường độ bền mà còn giúp du khách tận hưởng trọn vẹn tầm nhìn “triệu đô” ra thung lũng Mường Hoa, đỉnh Fansipan hay dãy Hoàng Liên Sơn,... Đây chính là yếu tố quan trọng tạo nên giá trị khác biệt cho các phòng khách sạn hạng sang tại Bản Mòng."],
      },
    ],
  },
  {
    slug: "eurowindow-the-opusk-residence-thu-thiem",
    title: "Eurowindow đồng hành cùng The OpusK Residence – Khẳng định vị thế bất động sản thượng lưu tại trung tâm Thủ Thiêm",
    category: "Dự án",
    date: "31/10/2025",
    excerpt: "Tiếp tục ghi dấu ấn tại các công trình biểu tượng trên cả nước, Eurowindow mới đây đã ký kết hợp đồng cung cấp và thi công gần 1.000m² hạng mục cửa và vách kính cho dự…",
    image: "/eurowindow/viber-image-2025-10-31-19-34-18-446-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-2",
        body: ["Tiếp tục ghi dấu ấn tại các công trình biểu tượng trên cả nước, Eurowindow mới đây đã ký kết hợp đồng cung cấp và thi công gần 1.000m² hạng mục cửa và vách kính cho dự án tháp A văn phòng The OpusK Residence thuộc khu phức hợp The Metropole Thủ Thiêm.", "The OpusK Residence nằm tại vị trí lõi trung tâm, được ví như mảnh ghép hoàn thiện bức tranh đô thị KĐT cao cấp The Metropole Thủ Thiêm. Dự án gồm hai tòa tháp: một tòa tháp văn phòng hạng A cao 30 tầng và một tòa phức hợp cao 36 tầng với 150 căn hộ hạng sang, được thiết kế theo phong cách đương đại, tinh tế và đầy tính nghệ thuật. The OpusK sở hữu tầm nhìn toàn cảnh ra sông Sài Gòn và trung tâm thành phố, tạo nên hình ảnh thời thượng giữa lòng đô thị năng động."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-2",
        body: ["Cửa và vách kính Eurowindow giúp hoàn thiện vẻ đẹp hiện đại của công trình", "Chủ đầu tư dự án – Công ty Cổ phần Quốc Lộc Phát – cho biết, tháp A của The OpusK Residence được quy hoạch và phát triển theo tiêu chuẩn văn phòng cao cấp, mang đến trải nghiệm làm việc trong môi trường chuẩn quốc tế.", "Theo hợp đồng, Eurowindow chịu trách nhiệm cung cấp và lắp đặt trọn gói các hạng mục gồm hệ vách kính mặt dựng tích hợp cửa sổ, cửa đi, cửa thông gió nhôm, thanh nhôm trang trí, lan can kính ngoài nhà, mái kính lấy sáng cùng hệ khung đỡ kết cấu thép và trần nhôm ngoại thất. Tất cả sản phẩm đều đáp ứng yêu cầu kỹ thuật khắt khe, đảm bảo kết cấu an toàn, khả năng chịu lực vượt trội và mang đến giá trị thẩm mỹ tinh tế cho toàn bộ công trình.", "Hệ vách kính mặt dựng Eurowindow cao cấp giúp công trình đón sáng tối đa"],
      },
    ],
  },
  {
    slug: "eurowindow-the-residences-at-arbora-quang-nam",
    title: "Eurowindow thi công cửa và vách nhôm kính cho dự án Tổ hợp nghỉ dưỡng 5 sao The Residences at Arbora (Quảng Nam)",
    category: "Dự án",
    date: "30/09/2025",
    excerpt: "Tiếp nối thành công sau Hyatt Regency Hồ Tràm, mới đây, Eurowindow tiếp tục đồng hành cùng IFF Holdings thi công hoàn thiện dự án khu nghỉ dưỡng 5 sao quốc tế The Resi…",
    image: "/eurowindow/picture1-4-large.png.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-3",
        body: ["Tiếp nối thành công sau Hyatt Regency Hồ Tràm, mới đây, Eurowindow tiếp tục đồng hành cùng IFF Holdings thi công hoàn thiện dự án khu nghỉ dưỡng 5 sao quốc tế The Residences at Arbora, nằm trong bộ sưu tập The Luxury Collection - thương hiệu khách sạn xa xỉ lớn nhất thế giới, quản lý vận hành bởi Marriott International.", "The Residences at Arbora lấy cảm hứng từ di sản châu Âu phong phú, hòa quyện với những đường nét tinh hoa của văn hóa bản địa, bộ sưu tập giới hạn 63 căn biệt thự được kiến tạo như những kiệt tác kiến trúc, mang đến không gian đẳng cấp, riêng tư và trọn vẹn trải nghiệm nghỉ dưỡng giữa thiên nhiên."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-3",
        body: ["Cụ thể, Eurowindow cung cấp và lắp đặt tại dự án The Residences at Arbora hơn 12.000 m² sản phẩm cửa đi, cửa sổ, vách nhôm kính, mái sảnh, lan can kính… Chủ đầu tư lựa chọn sử dụng hộp kính dày 24-26mm kết hợp kính cường lực, kính Low-E, kính dán an toàn để đảm bảo độ chịu lực tốt, bền chắc và mang lại giá trị thẩm mỹ tinh tế, hiện đại.", "Ở hạng mục cửa đi, Eurowindow mang đến những giải pháp hiện đại. Thiết kế thông minh này không chỉ tạo sự tiện lợi mà còn đảm bảo khả năng cách âm, cách nhiệt vượt trội.", "Cửa đi nhôm mở trượt lắp kính hộp kết hợp kính cường lực, kính Low-E giúp mở rộng tầm nhìn, kết nối không gian bên trong biệt thự với thiên nhiên bên ngoài, đảm bảo cách âm, cách nhiệt hiệu quả.", "Cửa đi mở trượt được chọn lắp đặt cho khu nghỉ dưỡng giúp mở rộng tầm nhìn toàn cảnh, tận dụng tối đa ánh sáng tự nhiên, đồng thời tiết kiệm không gian sử dụng."],
      },
    ],
  },
  {
    slug: "eurowindow-sunshine-crystal-river",
    title: "Eurowindow cung cấp và thi công gần 30.000m2 cửa, vách kính tại dự án Sunshine Crystal River",
    category: "Dự án",
    date: "30/06/2025",
    excerpt: "Tiếp tục trúng thầu cung cấp và thi công hệ cửa, vách kính cho tháp S1 thuộc dự án Sunshine Crystal River, Eurowindow đã và đang đồng hành cùng Sunshine Group phát tri…",
    image: "/eurowindow/anh-1-2-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-4",
        body: ["Tiếp tục trúng thầu cung cấp và thi công hệ cửa, vách kính cho tháp S1 thuộc dự án Sunshine Crystal River, Eurowindow đã và đang đồng hành cùng Sunshine Group phát triển các dự án đô thị hiện đại, tiện nghi và sang trọng.", "Sunshine Crystal River nằm ở khu vực ven sông Hồng, được ví như một “đảo ngọc giữa lòng Thủ đô”. Theo quy hoạch, tháp S1 là tòa nhà cao tầng tiêu chuẩn cao cấp, tích hợp trung tâm thương mại, căn hộ hạng sang và hệ tiện ích khép kín. Đây không chỉ là biểu tượng mới về phong cách sống hiện đại, mà còn là công trình mang tính kiến trúc đặc trưng, yêu cầu khắt khe về chất lượng vật liệu và tiêu chuẩn kỹ thuật."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-4",
        body: ["Theo hợp đồng ký kết, Eurowindow sẽ chịu trách nhiệm cung cấp và lắp đặt trọn gói gần 30.000m2 cho các hạng mục cửa, vách mặt dựng nhôm kính giấu đố, lan can kính louver và mái kính, sử dụng kính dán an toàn cho tháp S1 giúp tăng cường khả năng chịu lực, cách âm, cách nhiệt, chống tia UV hiệu quả.", "Không chỉ cung cấp sản phẩm chất lượng cao, Eurowindow còn được đối tác tin tưởng bởi năng lực thi công tốt, thiết bị hiện đại, tác phong chuyên nghiệp. Đội ngũ kỹ sư và công nhân lành nghề triển khai lắp đặt theo đúng quy trình đảm bảo an toàn lao động, chất lượng kỹ thuật.", "Trong quá trình sản xuất sản phẩm và thi công, Eurowindow ứng dụng công nghệ kiểm tra nghiêm ngặt như thử nghiệm độ kín nước, độ kín khí, kiểm tra chống va đập, cách âm… nhằm đảm bảo sản phẩm đạt độ bền và tính ổn định cao, thích ứng với điều kiện thời tiết.", "Việc Eurowindow tiếp tục được lựa chọn đồng hành cùng Sunshine Group – chủ đầu tư lớn và giàu tiềm lực – tại dự án Sunshine Crystal River là minh chứng cho năng lực tổng thầu nhôm kính hàng đầu tại Việt Nam."],
      },
    ],
  },
  {
    slug: "eurowindow-trung-tam-hoi-nghi-yen-bai",
    title: "Trung tâm Hội nghị tỉnh Yên Bái – Biểu tượng kiến trúc mới mang hơi thở thiên nhiên Tây Bắc & dấu ấn Eurowindow",
    category: "Dự án",
    date: "15/05/2025",
    excerpt: "Eurowindow vừa trúng thầu cung cấp và thi công gần 4.000 m2 sản phẩm vách kính mặt dựng, vách kính trong nhà và mái kính tại dự án Trung tâm Hội nghị tỉnh Yên Bái.",
    image: "/eurowindow/viber-image-2025-05-15-17-45-09-985-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-5",
        body: ["Eurowindow vừa trúng thầu cung cấp và thi công gần 4.000 m2 sản phẩm vách kính mặt dựng, vách kính trong nhà và mái kính tại dự án Trung tâm Hội nghị tỉnh Yên Bái.", "Tọa lạc tại phường Đồng Tâm, trung tâm hành chính sôi động của TP. Yên Bái, dự án được xây dựng trên khu đất rộng với tổng vốn đầu tư gần 350 tỷ đồng.Lấy cảm hứng từ hình ảnh ruộng bậc thang huyền thoại tại Mù Cang Chải, công trình Trung tâm Hội nghị tỉnh Yên Bái được kỳ vọng trở thành công trình biểu tượng mới, kết hợp tinh tế giữa phong cách kiến trúc đương đại và bản sắc văn hóa vùng Tây Bắc. Thiết kế cao 4 tầng, Trung tâm Hội nghị tỉnh Yên Bái được phân chia thành 3 khu vực chức năng chính: hội trường lớn với sức chứa 1.024 chỗ ngồi thiết kế hai tầng khán đài, khu vực hội thảo và hội trường đa năng, cùng các phòng chức năng kỹ thuật chuyên biệt. Đây sẽ là địa điểm tổ chức các sự kiện quan trọng về chính trị, văn hóa – xã hội và lễ hội lớn của tỉnh Yên Bái trong thời gian tới."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-5",
        body: ["Tại công trình này, Eurowindow thi công 3.400m² mặt dựng nhôm kính bao che, 200m² vách kính bên trong và 200m² mái kính. Chủ đầu tư lựa sử dụng kính cường lực dày 10mm không chỉ giúp mở rộng tầm nhìn, đón sáng tự nhiên tối ưu, mà còn nâng cao hiệu quả cách nhiệt, cách âm, giữ không gian bên trong mát vào mùa hè, ấm vào mùa đông, góp phần tiết kiệm điện năng. Đồng thời, loại kính này có khả năng chịu được lực va đập mạnh, khi vỡ không tạo thành cạnh sắc nhọn như kính thông thường, an toàn cho người sử dụng.Với bề dày 23 năm kinh nghiệm sản xuất - thi công, hiện diện ở hàng chục nghìn công trình trên khắp cả nước, Eurowindow cam kết cung cấp các sản phẩm chất lượng cao, bảo hành dài hạn, đội ngũ kỹ thuật viên chuyên nghiệp luôn sẵn sàng hỗ trợ nhanh, đảm bảo sự hài lòng tuyệt đối cho khách hàng/ chủ đầu tư.Dự kiến hoàn thiện và bàn giao vào tháng 6/2025, Trung tâm Hội nghị tỉnh Yên Bái không chỉ góp phần nâng cao năng lực tổ chức các sự kiện lớn mà còn tạo nên một điểm nhấn kiến trúc hiện đại, góp phần quan trọng vào sự phát triển đô thị và văn hóa của tỉnh nhà, đánh dấu bước tiến mới trong việc ứng dụng vật liệu xây dựng bền vững và hiện đại tại Việt Nam.", "Cập nhật cuộc thi \"Eurowindow – Nơi làm việc tôi yêu\": 16 câu chuyện đầu tiên và lời mời gọi tiếp nối hành trình", "Bài viết đọc nhiều", "EUROWINDOW KHUYẾN MÃI NHÂN DỊP VIETBUILD: “ĐÓN CỬA TÂN GIA – NHẬN QUÀ NGHỈ DƯỠNG”"],
      },
    ],
  },
  {
    slug: "eurowindow-cang-hang-khong-quoc-te-long-thanh",
    title: "Cảng hàng không quốc tế Long Thành: Công trình kiến trúc mang tính biểu tượng và dấu ấn kiến tạo từ Eurowindow",
    category: "Dự án",
    date: "28/04/2025",
    excerpt: "Mới đây, Eurowindow vừa trúng thầu dự án trọng điểm quốc gia – Cảng hàng không Quốc tế Long Thành (Đồng Nai). Theo đó, Eurowindow tư vấn giải pháp, cung cấp và lắp đặt…",
    image: "/eurowindow/viber-image-2025-04-28-16-08-31-035-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-6",
        body: ["Mới đây, Eurowindow vừa trúng thầu dự án trọng điểm quốc gia – Cảng hàng không Quốc tế Long Thành (Đồng Nai). Theo đó, Eurowindow tư vấn giải pháp, cung cấp và lắp đặt hoàn thiện hơn 12.000 m2 cửa, vách kính cao cấp, đảm bảo các tiêu chí khắt khe về không gian xanh, thân thiện môi trường, hiện thực hóa thiết kế công trình kiến trúc mang tính biểu tượng của quốc gia trong kỷ nguyên mới.", "Cảng hàng không Quốc tế Long Thành (tỉnh Đồng Nai) được định hướng trở thành trung tâm trung chuyển hàng không quốc tế, có tổng vốn đầu tư hàng chục tỷ USD. Giai đoạn 1 của dự án đang được đẩy nhanh tiến độ thi công với các hạng mục trọng yếu như nhà ga hành khách, đường cất – hạ cánh, tháp điều khiển không lưu và khu nhà để xe hiện đại."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-6",
        body: ["Thiết kế Cảng hàng không quốc tế Long Thành lấy ý tưởng từ hình ảnh hoa sen cách điệu đặc trưng cho văn hóa Việt, mang phong cách kiến trúc hiện đại, bố cục hài hòa, sử dụng vật liệu tinh tế tạo điểm nhấn.", "Theo chia sẻ của đơn vị tư vấn thiết kế ngoại thất, Cảng hàng không quốc tế Long Thành sử dụng các vật liệu thân thiện môi trường nhằm giảm hiệu ứng nhà kính, tiết kiệm năng lượng, đảm bảo sự bền vững trong suốt quá trình khai thác, vận hành. Gam màu hiện đại, trung tính, phù hợp thiết kế không gian xanh, kết nối mở. Tất cả các chủng loại vật tư, vật liệu đều được thiết kế phù hợp công năng sử dụng, đáp ứng tiêu chuẩn kỹ thuật quốc tế cao.", "Cảng hàng không Quốc tế Long Thành có tổng vốn đầu tư lên đến hàng chục tỷ USD", "Là nhà thầu đảm nhiệm việc cung cấp, lắp đặt cửa kính, vách kính, lan can kính, thang máy lồng kính, màn ngăn khói và màn ngăn cháy tự động … Eurowindow góp phần nâng cao hiệu quả tổ chức lưu chuyển hành khách, kiến tạo trải nghiệm tiện nghi, hiện đại và an toàn tại Cảng hàng không quốc tế Long Thành. Lựa chọn sử dụng vật liệu nhôm có độ bền cao, công trình còn được đầu tư bài bản, đồng bộ nhiều loại kính cao cấp như: kính cường lực chống ồn cách nhiệt, mái kính skylight tối ưu hiệu quả lấy sáng tự nhiên, tiết kiệm điện năng."],
      },
    ],
  },
  {
     slug: "eurowindow-luong-van-chanh-phu-yen",
     title: "Hơn 4.200m² cửa uPVC và vách ngăn kính Eurowindow lắp đặt hoàn thiện công trình Trường THPT chuyên Lương Văn Chánh (Phú Yên)",
     category: "Dự án",
     date: "17/04/2025",
     excerpt: "Eurowindow vừa ký kết hợp tác, trở thành nhà thầu cung cấp, lắp đặt hơn 4.200m² cửa đi, cửa sổ uPVC lõi thép, vách ngăn kính cho công trình Trường THPT chuyên Lương Văn Chánh, tỉnh Phú Yên.",
     image: "/eurowindow/viber-image-2025-04-17-17-56-03-140-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-7",
        body: ["Eurowindow vừa ký kết hợp tác, trở thành nhà thầu cung cấp, lắp đặt hơn 4.200m² cửa đi, cửa sổ uPVC lõi thép, vách ngăn kính cho công trình Trường THPT chuyên Lương Văn Chánh, tỉnh Phú Yên.", "Là ngôi trường chuyên có lịch sử phát triển lâu đời và thành tích nổi bật ở khu vực duyên hải miền Trung, Trường THPT chuyên Lương Văn Chánh được tỉnh Phú Yên đặc biệt quan tâm đầu tư, nhằm nâng cao chất lượng môi trường giáo dục. Việc lựa hạng mục cửa và vách kính là một trong những yếu tố quan trọng quyết định trực tiếp đến độ bền sử dụng, tính thẩm mỹ kiến trúc cũng như chất lượng không gian giảng dạy, học tập của giáo viên và học sinh."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-7",
        body: ["Tại dự án này, các sản phẩm cửa đi, cửa sổ uPVC lõi thép, vách kính của Eurowindow đáp ứng được các tiêu chí khắt khe về độ bền, tính an toàn, khả năng cách âm, cách nhiệt và có chi phí đầu tư hợp lý.", "Phối cảnh dự án Trường THPT chuyên Lương Văn Chánh, tỉnh Phú Yên", "uPVC là Polyvinyl Chloride chiết xuất từ gốc dầu mỏ. Quá trình sản xuất, đùn thanh Profile được thêm bởi nhiều thành phần tạo cho nhựa bền chắc chịu được va đập mạnh chịu được tác động của nhiệt và tia cực tím mà không biến đổi màu. Bề mặt được đánh bóng bằng sáp tạo cho thanh profle có bề mặt bóng, đẹp và bền bỉ… Sản phẩm phù hợp Quy chuẩn kỹ thuật QCVN 16:2019/BXD.", "Với kết cấu chắc chắn từ khung profile uPVC có lõi thép gia cường và kính dán an toàn 2 lớp, giải pháp cửa uPVC và vách kính Eurowindow có khả năng chịu lực tốt, bền bỉ trước tác động của thời tiết khắc nghiệt miền Trung, đặc biệt phù hợp với công trình trường học có tần suất sử dụng, đóng mở liên tục. Kính an toàn Eurowindow có khả năng chịu được va đập mạnh, vẫn đứng vững ngay cả khi bị đập rạn vỡ, an toàn cho giáo viên và học sinh."],
      },
    ],
  },
  {
    slug: "eurowindow-mandarin-oriental-da-nang",
    title: "Eurowindow đồng hành cùng Mandarin Oriental Đà Nẵng kiến tạo không gian nghỉ dưỡng thượng lưu 5*",
    category: "Dự án",
    date: "17/04/2025",
    excerpt: "Với năng lực đã được khẳng định qua nhiều công trình cao cấp, Eurowindow tiếp tục ghi dấu ấn khi trở thành đối tác cung cấp, thi công hoàn thiện hạng mục cửa và vách k…",
    image: "/eurowindow/12-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-8",
        body: ["Với năng lực đã được khẳng định qua nhiều công trình cao cấp, Eurowindow tiếp tục ghi dấu ấn khi trở thành đối tác cung cấp, thi công hoàn thiện hạng mục cửa và vách kính cao cấp cho khu nghỉ dưỡng Mandarin Oriental, Đà Nẵng.", "Cụ thể, Eurowindow cung cấp và lắp đặt toàn bộ hệ cửa đi, cửa sổ, mái lấy sáng (skylight); lan can kính… sử dụng hộp kính kết hợp kính an toàn, kính cường lực, kính Low-E. Hệ vách kính mặt dựng kết hợp lam nhôm hài hòa vừa tạo điểm nhấn kiến trúc tổng thể hiện đại, thẩm mỹ sang trọng, vừa gia tăng hiệu quả cách nhiệt, làm mát không gian phía trong công trình."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-8",
        body: ["Mái kính thiết kế khung nhôm sơn tĩnh điện kết hợp kính dán an toàn, trang bị cảm biến khói, cảm biến thời tiết, vừa hiệu quả đón sáng tự nhiên, góp phần tiết kiệm chi phí điện năng vừa đảm bảo tính an toàn cao, hiệu quả phòng hỏa hoạn, giảm thiểu rủi ro trong quá trình khai thác, vận hành. Lan can kính trong suốt đảm bảo độ an toàn mà vẫn ghi điểm cộng bởi sự thanh thoát, hiện đại, không giới hạn tầm nhìn, kết nối mở thông suốt từ không gian bên trong tới thiên nhiên bên ngoài.", "Đối với hạng mục cửa đi, Eurowindow cung cấp và thi công các dòng cửa nhôm kính cao cấp, bao gồm: cửa đi mở trượt 2 cánh/ 3 cánh/ 6 cánh, cửa xếp trượt 10 cánh, cửa kính trục xoay thiết kế mở linh hoạt 180 độ theo cả hai chiều… giúp tối ưu hóa không gian, tạo sự lưu thông thuận tiện cho du khách khi tới trải nghiệm dịch vụ, du lịch lưu trú. Riêng tại khu vực nhà hàng và khu bếp các căn biệt thự Mandarin Oriental Đà Nẵng, chủ đầu tư lựa chọn cửa đi sử dụng vật liệu kính chống cháy có khả năng ngăn khói lan, lửa lan, kéo dài thời gian thoát hiểm tới 60 phút, gia tăng tính an toàn cho du khách.", "Cửa trượt kính khổ lớn với khung nhôm cao cấp mang tới tầm nhìn thoáng đãng, đón trọn ánh sáng và cảnh sắc đại dương bao la, tạo nên trải nghiệm nghỉ dưỡng đẳng cấp.", "Đối với hạng mục cửa sổ, Eurowindow đã tư vấn, lắp đặt đa dạng các mẫu cửa với thiết kế kiểu dáng, kiểu mở khác nhau như: cửa sổ 1 cánh đơn, cửa sổ 2 cánh đôi, cửa sổ 3 cánh/ 4 cánh, cửa sổ hình chữ L, cửa sổ mở lùa..."],
      },
    ],
  },
  {
    slug: "eurowindow-midori-park-the-ten-binh-duong",
    title: "Eurowindow kiến tạo không gian sống hiện đại tại Midori Park The Ten Bình Dương",
    category: "Dự án",
    date: "13/02/2025",
    excerpt: "Eurowindow mới đây vừa ký kết hợp đồng cung cấp và thi công hơn 14.500m2 cửa nhôm, vách nhôm kính hoàn thiện dự án chung cư cao cấp Midori Park The Ten tại TP Bình Dương.",
    image: "/eurowindow/midori-park-the-ten-1-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-9",
        body: ["Eurowindow mới đây vừa ký kết hợp đồng cung cấp và thi công hơn 14.500m2 cửa nhôm, vách nhôm kính hoàn thiện dự án chung cư cao cấp Midori Park The Ten tại TP Bình Dương.", "The Ten là cụm căn hộ thứ 3 trong phân khu dự án Midori Park - dự án bất động sản cao cấp với nhiều tiện ích chung phong phú bậc nhất tỉnh Bình Dương. Thiết kế cao 10 tầng, công trình có tổng cộng 300 căn hộ chung cư hạng sang."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-9",
        body: ["Phối cảnh dự án Midori Park The Ten tại TP Bình Dương (nguồn ảnh: internet)", "Chủ đầu tư dự án - công ty TNHH Becamex Tokyu cho biết, với ý tưởng “xây dựng không sống gian cao cấp, rộng rãi, mang đến trải nghiệm tiện nghi và kết nối thiên nhiên”, dự án có thiết kế zigzag độc đáo, đảm bảo tiêu chí xanh, yên tĩnh và riêng tư, cùng sự đa dạng về tiện ích, cư dân sẽ được tận hưởng cuộc sống thượng lưu với thiên nhiên ngay trong tầm mắt.", "Không gian căn hộ cao cấp kết nối mở với thiên nhiên (nguồn ảnh: internet)", "Các căn hộ tại The Ten được thiết kế kính cao chạm trần, tận dụng tối đa ánh sáng tự nhiên, giúp khai mở tầm nhìn, mang đến trải nghiệm thư giãn trọn vẹn trong từng khoảnh khắc."],
      },
    ],
  },
  {
    slug: "eurowindow-khach-san-cong-doan-thanh-hoa",
    title: "Eurowindow thi công 4.415m2 hệ thống cửa nhôm, vách kính mặt ngoài khách sạn 5 sao Công đoàn Thanh Hóa",
    category: "Dự án",
    date: "23/01/2025",
    excerpt: "Ngày 22/01/2025, Eurowindow đã ký kết là tổng thầu thi công hệ thống cửa nhôm, vách kín mặt ngoài của dự án nâng cấp xây dựng khách sạn 5 sao Lam Sơn – Công Đoàn Thanh…",
    image: "/eurowindow/lam-son-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-10",
        body: ["Ngày 22/01/2025, Eurowindow đã ký kết là tổng thầu thi công hệ thống cửa nhôm, vách kín mặt ngoài của dự án nâng cấp xây dựng khách sạn 5 sao Lam Sơn – Công Đoàn Thanh Hóa, với tổng giá trị gói thầu ký kết là hơn 18 tỷ đồng.", "Khách sạn 5 sao Lam Sơn – Công đoàn Thanh Hóa, có địa chỉ tại số 2 đường Bà Triệu, phường Bắc Sơn, Tp. Sầm Sơn, tỉnh Thanh Hóa. Sở hữu vị trí đắc địa với ba mặt tiền, cách mặt biển 300m, giữa trung tâm Tp. Sầm Sơn, trên diện tích toàn khu là 17.994m2, khách sạn Lam Sơn – Công Đoàn Thanh Hóa khi hoàn thành nâng cấp xây dựng hứa hẹn sẽ là công trình góp phần thay đổi diện mạo của thành phố Sầm Sơn.Theo ký kết hợp tác, Eurowindow sẽ là đơn vị sản xuất, lắp dựng 4.415m2 hệ thống cửa nhôm, vách kính mặt ngoài của dự án khách sạn này, bao gồm: hệ cửa trượt, hệ vách dựng giấu đố kết hợp cửa sổ mở hất, lan can, louver, cửa mở trượt tự động, cửa đi mở quay 2 chiều có khung. Kính sử dụng là kính hộp low e, phụ kiện chống ăn mòn muối biển. Sơn chống ăn mòn muối biển."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-10",
        body: ["Với các sản phẩm chất lượng cao mang thương hiệu Eurowindow, dự án nâng cấp xây dựng khách sạn Lam Sơn – Công Đoàn Thanh Hóa khi hoàn thiện chắc chắn sẽ là điểm nhấn kiến trúc mới của thành phố Sầm Sơn. Bên cạnh đó, không gian bên trong khách sạn cũng sẽ được tăng cường khả năng chống ồn, cách nhiệt, đảm bảo sự yên tĩnh, riêng tư cho khách hàng.", "Ngoài ra, hệ vách kính dựng giấu đố kết hợp cửa sổ mở hất có định hình vững chắc, khả năng chịu lực tốt, an toàn trước gió bão, mà vẫn có thể lấy được tối đa ánh sáng tự nhiên, tạo không gian mở và tầm nhìn thoáng đãng từ trong ra ngoài, đồng thời góp phần tiết kiệm điện năng cho tòa nhà.", "Cập nhật cuộc thi \"Eurowindow – Nơi làm việc tôi yêu\": 16 câu chuyện đầu tiên và lời mời gọi tiếp nối hành trình", "Bài viết đọc nhiều"],
      },
    ],
  },
  {
    slug: "eurowindow-toa-nha-misa-da-nang",
    title: "Eurowindow- Tổng thầu thi công gần 1700 m2 cửa & vách kính nhôm mặt dựng tòa nhà Misa Đà Nẵng",
    category: "Dự án",
    date: "08/01/2025",
    excerpt: "Tư vấn, cung cấp và thi công toàn bộ hạng mục cửa và mặt dựng nhôm kính, hoàn thiện tòa nhà phức hợp MISA 17 tầng tại Đà Nẵng, Eurowindow tiếp tục góp phần hiện đại hó…",
    image: "/eurowindow/viber-image-2025-01-08-17-31-49-140-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-11",
        body: ["Tư vấn, cung cấp và thi công toàn bộ hạng mục cửa và mặt dựng nhôm kính, hoàn thiện tòa nhà phức hợp MISA 17 tầng tại Đà Nẵng, Eurowindow tiếp tục góp phần hiện đại hóa kiến trúc đô thị khu vực miền Trung.", "Tòa nhà phức hợp MISA, tọa lạc trên đường 30/4, quận Hải Châu, thành phố Đà Nẵng thiết kế 2 tầng hầm và 15 tầng nổi cung cấp không gian làm việc hiện đại và đẳng cấp cho các doanh nghiệp. Theo ký kết hợp tác, Eurowindow cung cấp gần 1700m2 cửa hộp kính Solar 24mm; cửa nhôm Eurowindow EA55, EA95, mặt dựng FA52."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-11",
        body: ["Công trình tòa nhà phức hợp MISA Đà Nẵng vừa khánh thành ngày ngày 05/01/2025", "Đầu tư sử dụng các sản phẩm chất lượng cao mang thương hiệu Eurowindow, không gian tòa nhà được tăng cường khả năng chống ồn, cách nhiệt, đảm bảo sự mát mẻ, thư thái cho người dùng. Thêm vào đó, hệ vách kính mặt dựng định hình vững chắc, khả năng chịu lực tốt an toàn trước gió bão mà vẫn đảm bảo kết nối không gian mở tạo tầm nhìn thoáng đãng từ bên trong.", "Khi hoàn thiện, công trình không chỉ trở thành điểm nhấn kiến trúc mới của thành phố Đà Nẵng mà còn được đánh giá là một trong những tòa nhà văn phòng tốt nhất hiện nay ở khu vực miền Trung với diện tích rộng rãi, thông thoáng, lấy ánh sáng tự nhiên tốt, góp phần tiết kiệm điện năng tiêu thụ khi vận hành.", "Theo chia sẻ của Ông Lưu Công Hoan - Giám đốc kinh doanh Eurowindow chi nhánh miền Trung: \"Eurowindow vinh dự đồng hành cùng công ty Cổ phần MISA hoàn thiện xây dựng tòa nhà văn phòng tại Đà Nẵng. Đối với chủ đầu tư, một không gian làm việc hiện đại không chỉ đáp ứng nhu cầu về thẩm mỹ mà còn phải đảm bảo các tiêu chuẩn kỹ thuật cao, kích thích khả năng sáng tạo, nâng cao hiệu quả công việc. Chính vì vậy, Eurowindow tư vấn chọn và cung cấp những sản phẩm nhôm kính chất lượng tốt thiết kế tối ưu hóa, đa công năng mang đến cho tòa nhà một diện mạo hiện đại, khang trang. Hệ thống cửa và mặt dựng nhôm kính cao cấp tạo nên một không gian làm việc chuyên nghiệp, thoải mái cho người sử dụng, góp phần nâng cao hình ảnh và vị thế của doanh nghiệp\"."],
      },
    ],
  },
  {
    slug: "eurowindow-dai-hoc-cong-nghe-dong-a",
    title: "Hơn 3.300 m2 cửa và vách kính Eurowindow lắp đặt tại trường Đại học Công nghệ Đông Á",
    category: "Dự án",
    date: "26/12/2024",
    excerpt: "Góp phần nâng cao chất lượng giảng dạy, đào tạo tại các trường đại học trên cả nước, Eurowindow là nhà thầu thi công hoàn thiện hàng trăm nghìn m2 cửa và vách kính mặt…",
    image: "/eurowindow/dai-hoc-cong-nghe-dong-a-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-12",
        body: ["Góp phần nâng cao chất lượng giảng dạy, đào tạo tại các trường đại học trên cả nước, Eurowindow là nhà thầu thi công hoàn thiện hàng trăm nghìn m2 cửa và vách kính mặt dựng ở các tòa nhà giảng đường, viện nghiên cứu… Trường Đại học Công nghệ Đông Á là một trong số các công trình đó.", "Đón đầu xu thế đào tạo tiên tiến trên thế giới, trường Đại học Công nghệ Đông Á luôn ý thức tầm quan trọng của việc đầu tư cơ sở vật chất nhằm hỗ trợ nâng cao chất lượng đào tạo. Theo đó, hệ thống các phòng học, phòng thí nghiệm, khu thực hành… được nhà trường thiết kế đồng bộ, thoáng mát, sạch đẹp, tạo điều kiện thuận lợi cho sinh viên nghiên cứu, học tập."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-12",
        body: ["Lựa chọn Eurowindow là thương hiệu vật liệu xây dựng uy tín hàng đầu tại Việt Nam, cung cấp và lắp đặt gần 200 bộ cửa với tổng diện tích hơn 3.300 m2 cửa sổ mở hất, cửa đi mở quay, vách kính trong nhà và vách kính mặt dựng, tòa nhà cao 6 tầng nằm trong khuôn viên cơ sở 2 Đại học Công nghệ Đông Á vừa được hoàn thành trong năm 2024. Các sản phẩm nhôm kính chất lượng cao, đảm bảo sự chắc chắn, an toàn, tạo không gian mở thoáng đãng.", "Đầu tư xây dựng cơ sở vật chất hiện đại, không gian giảng dạy và đào tạo tại trường ĐH Công nghệ Đông Á thúc đẩy tinh thần học tập, sáng tạo ở các thế hệ sinh viên (ảnh minh họa).", "Hệ vách nhôm mặt dựng lộ đố toát lên sự năng động, khỏe khoắn, tạo thẩm mỹ độc đáo cho công trình. Vật liệu kính giúp tận dụng tối đa lấy sáng tự nhiên, tiết kiệm hiệu quả điện năng chiếu sáng bên trong tòa nhà. Kính hộp sử dụng 2 lớp kính cường lực vừa có tác dụng chịu lực tốt, hạn chế sự thâm nhập từ bên ngoài vào bên trong, vừa gia tăng khả năng cách âm, cách nhiệt, giúp môi trường giảng dạy và học tập yên tĩnh, mát mẻ, giảm thiểu tối đa điện năng tiêu thụ bởi điều hòa không khí.", "Trước đó, Eurowindow cũng đã cung cấp, lắp đặt gần 1.500 bộ cửa và vách nhôm kính cho công trình trường ĐH Bách Khoa Hà Nội. Tại Đà Nẵng, sản phẩm cửa Eurowindow đã góp phần kiến tạo diện mạo sang trọng, đẳng cấp quốc tế cho công trình trường Đại học Duy Tân."],
      },
    ],
  },
  {
    slug: "eurowindow-tru-so-hanh-chinh-thai-nguyen",
    title: "Eurowindow thi công cửa, vách kính dự án trụ sở cơ quan hành chính 400 tỷ đồng tại Thái Nguyên",
    category: "Dự án",
    date: "19/12/2024",
    excerpt: "Dự án Trụ sở làm việc khối cơ quan TP. Phổ Yên tỉnh Thái Nguyên có tổng vốn đầu tư 400 tỷ đồng được triển khai nhằm xây dựng và hoàn thiện cơ sở làm việc, khang trang,…",
    image: "/eurowindow/tin-du-an-large.png.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-13",
        body: ["Dự án Trụ sở làm việc khối cơ quan TP. Phổ Yên tỉnh Thái Nguyên có tổng vốn đầu tư 400 tỷ đồng được triển khai nhằm xây dựng và hoàn thiện cơ sở làm việc, khang trang, hiện đại cho các cơ quan hành chính của thành phố. Công trình do Eurowindow thi công hoàn thiện toàn bộ hệ cửa và vách kính mặt ngoài.", "Dự án do Ban Quản lý Dự án Đầu tư Xây dựng TP. Phổ Yên làm chủ đầu tư, xây dựng tổng diện tích khoảng 38400 m², công trình bao gồm một trụ sở làm việc quy mô 8 tầng, cùng các hạng mục phụ trợ như sân vườn, bãi đỗ xe... tạo nên một không gian làm việc chuyên nghiệp, nâng cao hiệu suất phục vụ nhân dân"],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-13",
        body: ["Trụ sở làm việc khối cơ quan TP. Phổ Yên lắp cửa Eurowindow thiết kế hiện đại, tiện ích", "Sự kết hợp giữa thiết kế kiến trúc hiện đại và vật liệu nhôm kính tiên tiến không chỉ nâng cao tính thẩm mỹ sang trọng mà còn đảm bảo an toàn cao, gia tăng hiệu quả sử dụng không gian bên trong công trình. Cửa đi hai cánh mở quay nhôm kính lắp đặt tại các lối ra vào chính cửa trụ sở, đảm bảo lưu thông thuận tiện. Kết cấu sản phẩm chắc chắn và độ kín khít cao, giúp ngăn bụi, giảm tiếng ồn và tối ưu khả năng cách nhiệt, tạo môi trường làm việc và tiếp dân thoải mái, thân thiện. Phần cửa sổ mở hất ra ngoài vừa tiết kiệm diện tích bên trong, tối ưu lấy sáng vừa đảm bảo thông gió tự nhiên mà không nước mưa hắt, không lo bị dập cánh. Khả năng cách âm, cách nhiệt vượt trội giúp duy trì không gian làm việc yên tĩnh, mát mẻ, đồng thời tiết kiệm điện năng hiệu quả. Hệ vách kính mặt ngoài tòa nhà được bố trí hài hòa, tạo nên không gian làm việc mở, đón ánh sáng tự nhiên, giúp giảm thiểu sử dụng ánh sáng nhân tạo và mang lại cảm giác gần gũi với thiên nhiên.", "Dự kiến, khi hoàn thành và đi vào hoạt động, Trụ sở làm việc khối cơ quan TP. Phổ Yên hứa hẹn sẽ trở thành biểu tượng cơ quan hành chính kiểu mới, nâng cao chất lượng phục vụ và tạo dấu ấn mạnh mẽ trong kiến thiết diện mạo đô thị năng động của thành phố phía Nam tỉnh Thái Nguyên.", "Cập nhật cuộc thi \"Eurowindow – Nơi làm việc tôi yêu\": 16 câu chuyện đầu tiên và lời mời gọi tiếp nối hành trình"],
      },
    ],
  },
  {
     slug: "eurowindow-tru-so-uy-khanh-hoa",
     title: "Trụ sở làm việc Tỉnh ủy, HĐND, UBND Tỉnh Khánh Hòa – “Công trình xanh” mang dấu ấn Eurowindow",
     category: "Dự án",
     date: "27/11/2024",
     excerpt: "Thiết kế kiến trúc độc đáo, Trụ sở làm việc Tỉnh ủy, HĐND, UBND tỉnh Khánh Hòa được xây dựng theo tiêu chuẩn quốc tế đạt chứng chỉ “công trình xanh” EDGE. Công trình h…",
     image: "/eurowindow/ubnd3-large.jpg.webp",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-14",
        body: ["Thiết kế kiến trúc độc đáo, Trụ sở làm việc Tỉnh ủy, HĐND, UBND tỉnh Khánh Hòa được xây dựng theo tiêu chuẩn quốc tế đạt chứng chỉ “công trình xanh” EDGE. Công trình hoàn thiện hệ vách kính, cửa đi và cửa sổ nhôm kính bởi đội ngũ chuyên gia Eurowindow.", "Công trình trụ sở làm việc của Tỉnh ủy, Đoàn đại biểu Quốc hội và HĐND, UBND tỉnh Khánh Hoà có tổng vốn đầu tư hơn 544 tỷ đồng, xây dựng trên khu đất có diện tích 2,3 ha, quy mô gồm 4 tòa nhà thiết kế cao 8 tầng."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-14",
        body: ["Theo chia sẻ của đơn vị tư vấn thiết kế, ngoài điểm nhấn nổi bật là ngôi nhà trung tâm có hình lục giác, hai toà nhà hai bên lấy ý tưởng từ hình tượng cánh chim hoà bình tung cánh hướng ra đại dương và bầu trời. Trục thiết kế của công trình hướng về phía cột mốc chủ quyền trên đảo Trường Sa lớn (huyện đảo Trường Sa, tỉnh Khánh Hòa), thể hiện sự kết nối giữa đất liền và biển, đảo thiêng liêng của Tổ quốc.", "Phối cảnh tổng thể công trình Trụ sở làm việc Tỉnh ủy, HĐND, UBND tỉnh Khánh Hòa tại địa chỉ số 1 Trần Phú, phường Xương Huân, TP Nha Trang.", "Ý tưởng thiết kế mặt đứng công trình vừa hướng tới tiêu chí bảo đảm sự riêng tư, vừa tối ưu không gian mở, có tầm nhìn khoáng đạt ra đại dương; vừa giảm thiểu tối đa sự ảnh hưởng do bức xạ mặt trời chiếu vào, vừa có tác dụng thông gió tự nhiên.", "Mặt đứng công trình kết hợp hài hòa giữa 3 vật liệu chủ đạo gồm: kính tiết kiệm năng lượng solar control, đá granite tím và bê tông màu cốt sợi thủy tinh. Theo đánh giá của các chuyên gia, các vật liệu này đảm bảo tính bền vững và thẩm mỹ lâu dài cho mặt ngoài công trình, đồng thời mang lại hiệu quả cao trong việc tiết kiệm năng lượng thông qua các giải pháp thiết kế che nắng, tạo bóng đổ, nghiên cứu tỷ lệ đặc - rỗng để tối ưu chiếu sáng tự nhiên."],
      },
    ],
  },
  {
     slug: "eurowindow-tt-capella-du-an-dang-song",
     title: "Eurowindow thương hiệu bảo chứng chất lượng tòa nhà T&T Capella - \"Dự án đáng sống năm 2023\"",
     category: "Dự án",
     date: "14/11/2024",
     excerpt: "Cung cấp lắp đặt toàn bộ hạng mục cửa, lan can kính, hệ khung nhôm vách kính trong và ngoài nhà dự án: Tòa nhà hỗn hợp T&T Capella ( số 02 Phạm Ngọc Thạch), Eurowindow…",
     image: "/eurowindow/z6033885174973-71d5c8e14fb8674fa35f2eac9b2d8fe1-large.jpg",
    sections: [
      {
        heading: "Tổng quan dự án",
        id: "tong-quan-15",
        body: ["Cung cấp lắp đặt toàn bộ hạng mục cửa, lan can kính, hệ khung nhôm vách kính trong và ngoài nhà dự án: Tòa nhà hỗn hợp T&T Capella (số 02 Phạm Ngọc Thạch), Eurowindow đã góp phần bảo chứng chất lượng công trình hạng sang tọa lạc trên quỹ đất “vàng” quận Đống Đa, Hà Nội.", "Tòa nhà hỗn hợp T&T Capella thiết kế cao 24 tầng nổi và 5 tầng hầm, sở hữu bộ sưu tập 198 căn hộ cao cấp và shophouse. Điểm nhấn độc đáo của dự án nằm ở thiết kế mảng xanh bao trùm toàn bộ mặt đứng, kết hợp với hệ thống kính hai lớp Low-e mang đến cho căn hộ T&T Capella không gian sinh thái, tối ưu công năng đón ánh sáng và gió trời. Không chỉ cách âm, cách nhiệt, chống tia UV hiệu quả, các căn hộ tại dự án còn sở hữu tầm nhìn đắt giá “triệu đô” bao trọn khu vực trung tâm thành phố."],
      },
      {
        heading: "Giải pháp cửa và vách Eurowindow",
        id: "giai-phap-15",
        body: ["Phối cảnh tổng thể mặt ngoài sang trọng của tòa nhà hỗn hợp số 02 Phạm Ngọc Thạch.", "Dự án sở hữu tiện ích nội khu đa dạng như trung tâm thương mại, phòng tập gym, khu vui chơi trẻ em... đáp ứng nhu cầu sống hiện đại. Với thiết kế sang trọng và vị trí thuận tiện, dự án hứa hẹn mang đến không gian sống lý tưởng cho các cư dân thượng lưu, đã được vinh danh giải thưởng \"Dự án đáng sống năm 2023\".", "Ông Đỗ Minh Thanh - Phó Tổng giám đốc phụ trách Kinh doanh Eurowindow cho biết:\"Các giải pháp cửa và vách kính cao cấp của Eurowindow phù hợp với các công trình thiết kế kiến trúc hiện đại, yêu cầu kỹ thuật cao, đáp ứng các chỉ số về khả năng chống ồn, cách nhiệt, chịu lực tốt. Tiếp tục “bắt tay” hợp tác cùng chủ đầu tư lớn, uy tín trên thị trường bất động sản, Eurowindow kỳ vọng, các tính năng vượt trội của sản phẩm sẽ góp phần nâng cao thẩm mỹ, chất lượng sống và giá trị lâu dài cho dự án cũng như người dùng\".", "Theo hợp đồng ký kết, Eurowindow đảm nhiệm gói thầu giá trị lớn, bao gồm rất nhiều hạng mục thi công cửa đi, cửa sổ, lan can kính, hệ vách kính khung nhôm mặt dựng, mái kính khối đế, mái sảnh khối căn hộ, hệ chớp 3D mặt dựng… tạo điểm nhấn kiến trúc độc đáo và ấn tượng với tông màu vàng gold nổi bật."],
      },
    ],
  },
];

const EXTRA_ALIASES: Record<string, string[]> = {
  "eurowindow-12-nam-lien-tiep-dat-thuong-hieu-quoc-gia": ["thuong-hieu-quoc-gia"],
  "eurowindow-tu-hao-hang-viet-nam-chat-luong-cao-2023": ["hang-viet-nam-chat-luong-cao"],
  "cua-di-hai-canh-mo-quay": ["cua-di-hai-mo-quay-eurowindow"],
  "kinh-cach-nhiet-toan-act": ["kinh-cach-nhiet-eurowindow"],
  "gioi-thieu-ve-cua-nhua-upvc": ["gioi-thieu-ve-cua-nhua-eurowindow"],
};

const migratedArticles: Article[] = (migratedArticlesData as Article[])
  .filter((m) => !handcraftedArticles.some((h) => h.slug === m.slug))
  .map((m) => {
    if (EXTRA_ALIASES[m.slug]) {
      return {
        ...m,
        aliases: [...(m.aliases || []), ...EXTRA_ALIASES[m.slug]],
      };
    }
    return m;
  });

export const articles: Article[] = [...handcraftedArticles, ...migratedArticles];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

