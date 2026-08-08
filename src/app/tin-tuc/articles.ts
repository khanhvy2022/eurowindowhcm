export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  sections: { heading: string; id: string; body: string[] }[];
  faq?: { q: string; a: string }[];
  image?: string;
};

export const articles: Article[] = [
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
          "Cửa nhựa uPVC với cấu trúc khoang rỗng nhiều ngăn kết hợp kính hộp cách nhiệt giúp ngăn truyền nhiệt vượt trội. Cửa nhôm kính kết hợp kính Low-E phản xạ bức xạ mặt trời, giảm nóng hiệu quả mà vẫn đón sáng tự nhiên.",
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
          "Khi lựa chọn cửa cho khí hậu nắng nóng, cần cân nhắc khả năng cách nhiệt của khung, loại kính, hệ số truyền nhiệt và chi phí vận hành lâu dài.",
        ],
      },
    ],
  },
  {
    slug: "eurowindow-top-10-doanh-nghiep-xanh-2026",
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
    image: "/eurowindow/constructions/img-7172.jpg.webp",
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
    image: "/eurowindow/constructions/img-7105.jpg.webp",
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
    image: "/eurowindow/constructions/dji-0090-1.jpg.webp",
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
    image: "/eurowindow/constructions/benh-vien-ung-buou-da-nang-17.jpg.webp",
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
        body: ["Dải Polyamide cách nhiệt giảm đến 40% lượng nhiệt thất thoát qua khung nhôm."],
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
        body: ["Đo thông thủy cửa đi và cửa sổ vào các cung Cát: Tài Lộc, Quý Nhân, Tử Tức."],
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
        body: ["Cửa uPVC vượt trội về cách âm cách nhiệt. Cửa nhôm vượt trội về chịu lực và thẩm mỹ kính lớn."],
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
        body: ["Sử dụng công nghệ Châu Âu đảm bảo bề mặt kính phẳng hoàn hảo và chịu va đập gấp 5 lần."],
      },
    ],
  },
  {
    slug: "khuyen-mai-kinh-dien-doi-mau",
    title: "Chương trình ưu đãi kính điện đổi màu và cửa tự động Eurowindow 2026",
    category: "Ưu đãi",
    date: "20/03/2026",
    excerpt: "Ưu đãi hấp dẫn lên đến 15% cho các gói giải pháp kính thông minh và cửa trượt tự động.",
    image: "/eurowindow/cua-tu-dong.jpg.webp",
    sections: [
      {
        heading: "Trải nghiệm kính thông minh cao cấp",
        id: "trai-nghiem-kinh-thong-minh",
        body: ["Đổi màu linh hoạt từ trong suốt sang mờ chỉ bằng một thao tác bấm công tắc hoặc smartphone."],
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
        body: ["Giúp nâng cao tuổi thọ vận hành cửa lên tới 30 - 50 năm."],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
