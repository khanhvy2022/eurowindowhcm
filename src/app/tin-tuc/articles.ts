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
          "Ngoài ra, các loại kính hộp cách nhiệt với khí Argon giúp cách âm, cách nhiệt tối ưu — phù hợp cho nhà phố, biệt thự và công trình văn phòng.",
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
          "Khi lựa chọn cửa cho khí hậu nắng nóng, cần cân nhắc khả năng cách nhiệt của khung, loại kính, hệ số truyền nhiệt và chi phí vận hành lâu dài. Sự kết hợp hài hòa giữa khung cửa và kính quyết định hiệu quả chống nóng tổng thể.",
        ],
      },
      {
        heading: "Gợi ý từ Eurowindow",
        id: "goi-y-tu-eurowindow",
        body: [
          "Với nhà phố, biệt thự, Eurowindow khuyến nghị cửa nhựa uPVC kết hợp kính hộp cách nhiệt hoặc cửa nhôm kính dùng kính Low-E. Với mặt tiền kính lớn, nên dùng vách kính hộp cách nhiệt có thanh nhôm nhiệt cắt cầu để ngăn thất thoát nhiệt.",
          "Hãy liên hệ Eurowindow để được tư vấn giải pháp phù hợp nhất với công trình của bạn.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
