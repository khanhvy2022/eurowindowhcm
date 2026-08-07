export type Product = {
  slug: string;
  id: string;
  title: string;
  tab: string;
  text: string;
  features: string[];
  image: string;
  intro: string[];
  structure: { title: string; text: string }[];
  advantages: { title: string; text: string }[];
  systems: string[];
};

export const products: Product[] = [
  {
    slug: "cua-nhom-vach-kinh",
    id: "nhom",
    tab: "CỬA NHÔM & VÁCH KÍNH",
    title: "CỬA NHÔM & VÁCH KÍNH LỚN",
    text: "Hệ cửa nhôm và vách nhôm kính lớn từ vật liệu nhôm EA55–EA95i, phụ kiện chính hãng Cmech, Roto, Hafele. Độ kín khít cao, đóng mở đa chiều đáp ứng những yêu cầu khắt khe về thiết kế, chịu tải trọng gió lớn cho công trình quy mô.",
    features: ["Đóng mở đa chiều: quay trong, quay ngoài, hất, quay lật, xếp trượt, trượt", "Hệ nhôm EA55–EA95i, phụ kiện chính hãng Cmech, Roto, Hafele", "Chịu tải trọng gió lớn, phù hợp vách kính công trình quy mô"],
    image: "/eurowindow/cuanhom.jpg.webp",
    intro: [
      "Cửa nhôm và vách nhôm kính lớn Eurowindow được sản xuất từ vật liệu nhôm cao cấp, khắc phục triệt để những nhược điểm của nhôm thông thường như kết cấu yếu, phụ kiện đơn giản, không có cầu cách nhiệt nên khả năng cách âm, cách nhiệt kém, hay bị rò rỉ nước mưa.",
      "Cửa nhôm (gồm cửa sổ, cửa đi) và cửa vách nhôm đảm bảo độ kín khít cao, có thể đóng mở đa chiều, phù hợp với nhiều kiểu phong cách kiến trúc. Đặc biệt, profile nhôm có cầu cách nhiệt kết hợp với hộp kính bơm khí trơ giúp hạn chế tối đa sự truyền nhiệt, góp phần tiết kiệm điện năng. Bên cạnh hợp tác chiến lược với các nhà cung cấp profile nhôm hàng đầu thế giới như Technal (Pháp), Shueco (CHLB Đức), Eurowindow còn đầu tư dây chuyền sơn tĩnh điện (Powdercoating) và sơn nước (PVDF), cho phép sơn tấm nhôm gấp khổ lớn tới 2,5m x 2,5m x 6m, cùng hệ thống xử lý nước thải đạt chuẩn A Grade.",
    ],
    structure: [
      { title: "Thanh profile", text: "Thanh profile có cầu cách nhiệt hoặc không, với các khoang rỗng và gân tăng cứng, rãnh và vách kỹ thuật được tính toán kỹ lưỡng tạo sống gia cường, kênh thoát nước và khoang trống cách âm, cách nhiệt." },
      { title: "Hộp kính", text: "Kết hợp hộp kính bơm khí trơ, hệ gioăng EPDM và hệ phụ kiện kim khí đồng bộ để đạt hiệu quả cách âm, cách nhiệt cao." },
      { title: "Hệ phụ kiện", text: "Phụ kiện kim khí chính hãng Cmech, Roto, Hafele, Huy Hoàng, GMT, Kinlong tạo sự chính xác và an toàn trong sử dụng." },
    ],
    advantages: [
      { title: "Cách âm, cách nhiệt", text: "Profile nhôm có cầu cách nhiệt kết hợp hộp kính, gioăng EPDM và phụ kiện đồng bộ đem lại tính cách âm, cách nhiệt cao — đặc biệt với dòng có cầu cách nhiệt." },
      { title: "Chịu lực tốt", text: "Thanh profile thiết kế khoang rỗng, gân tăng cứng và chiều dày nhôm hợp lý giúp chịu tác động từ gió, bão, động đất." },
      { title: "Tải trọng nhẹ", text: "Nhôm là vật liệu nhẹ, độ bền cao, giảm tải trọng toàn công trình so với vách tường vật liệu khác, mang lại giải pháp an toàn tối ưu." },
      { title: "Kinh tế trong sử dụng", text: "Hộp kính cách âm, cách nhiệt, kính an toàn giúp tiết kiệm điện năng điều hòa; bề mặt sơn tĩnh điện bền màu, chỉ cần lau chùi thông thường." },
      { title: "Tính thẩm mỹ", text: "Hệ vách giấu đố chịu lực tạo mặt phẳng kính lớn, sử dụng kính màu, kính hoa văn, kính mài mờ vừa đảm bảo kín đáo vừa thẩm mỹ." },
      { title: "Tiêu chuẩn chất lượng", text: "Đạt tiêu chuẩn Châu Âu và TCVN 330:2004, TCVN 7452-1/2/3:2004 (lọt khí, kín nước, chịu áp lực gió), ISO 140-5 về cách âm." },
    ],
    systems: ["Cửa đi nhôm", "Cửa sổ nhôm", "Vách nhôm kính lớn hệ Stick", "Vách nhôm kính hệ Spider", "Vách nhôm kính hệ Semi-Unitized", "Vách nhôm kính lớn hệ Unitized", "Mái che"],
  },
  {
    slug: "cua-upvc",
    id: "upvc",
    tab: "CỬA uPVC",
    title: "CỬA NHỰA uPVC CHÂU ÂU",
    text: "Cửa nhựa uPVC tiêu chuẩn Châu Âu với khả năng cách âm, cách nhiệt vượt trội, bền bỉ theo thời gian — dòng sản phẩm làm nên tên tuổi Eurowindow từ năm 2002, được ưu tiên lựa chọn cho mặt ngoài ngôi nhà.",
    features: ["Cách âm, cách nhiệt vượt trội, kín khít, không cong vênh", "Hệ nhựa Kömmerling & Asia tiêu chuẩn Châu Âu", "Cửa đi, cửa sổ, vách ngăn uPVC cho khách sạn, biệt thự, chung cư"],
    image: "/eurowindow/cuanhua1.jpg.webp",
    intro: [
      "Dòng sản phẩm cửa uPVC của Eurowindow chủ yếu là cửa sổ, cửa đi, vách ngăn phù hợp với khách sạn, biệt thự, chung cư – căn hộ. Cửa uPVC được cấu tạo bởi thanh profile uPVC có cấu trúc dạng hộp, lắp lõi thép gia cường, hệ phụ kiện đồng bộ với chốt đa điểm, bản lề 3D giúp đóng mở đa chiều, kết hợp hệ gioăng kép đảm bảo độ kín khít và hộp kính bơm khí trơ làm giảm sự truyền âm, truyền nhiệt.",
      "Vật liệu uPVC cao cấp có đặc tính nổi trội là không bị ôxy hóa hay ố vàng dưới điều kiện bức xạ mặt trời, giúp cửa uPVC Eurowindow có đặc tính cách âm, cách nhiệt cao, tiết kiệm điện năng, tiết kiệm chi phí bảo dưỡng, đem lại hiệu quả kinh tế lâu dài. Sản phẩm đạt độ bền áp lực gió, độ kín nước, độ bền góc hàn thanh profile, cách âm theo TCVN 7451:2004 và 7452-2:2004.",
    ],
    structure: [
      { title: "Thanh profile uPVC", text: "Thanh profile có cấu trúc dạng hộp chia nhiều khoang trống cách âm, cách nhiệt, lắp lõi thép gia cường tăng khả năng chịu lực. Eurowindow sử dụng profile uPVC của hãng Koemmerling (tập đoàn Profine, CHLB Đức) với uy tín hơn 100 năm, hiện là nhà cung cấp độc quyền tại Việt Nam." },
      { title: "Hệ phụ kiện kim khí", text: "Phụ kiện đồng bộ với chốt đa điểm, bản lề 3D điều chỉnh được 3 chiều, khóa chuyên dụng. Bản lề bắt trực tiếp vào lõi thép gia cường bằng vít chuyên dụng, đảm bảo độ an toàn và chính xác, khắc phục nhược điểm của phụ kiện thông thường." },
      { title: "Hệ gioăng kép & hộp kính", text: "Gioăng kép đảm bảo độ kín khít tuyệt đối, hộp kính bơm khí trơ giảm truyền âm, truyền nhiệt — là bộ ba yếu tố tạo nên đặc tính cách âm, cách nhiệt cao." },
    ],
    advantages: [
      { title: "Cách âm, cách nhiệt", text: "Phòng sát trục đường có tiếng ồn tới 85 dB, cửa uPVC Eurowindow giúp giảm xuống còn khoảng 40 – 45 dB. Cách nhiệt gấp 2 – 4 lần cửa thông thường." },
      { title: "Hiệu quả kinh tế", text: "Ít phải sơn sửa, bảo dưỡng định kỳ; hạn chế truyền nhiệt nên tiết kiệm điện làm mát/sưởi ấm. Sau vài năm sử dụng, cửa uPVC khấu hao toàn bộ chi phí đầu tư ban đầu." },
      { title: "Ổn định, không cong vênh", text: "Khác với cửa gỗ dễ cong vênh, co ngót trong khí hậu nhiệt đới, cửa uPVC giữ độ chuẩn xác của cấu trúc và vẻ đẹp ban đầu suốt thời gian sử dụng." },
      { title: "Phù hợp khí hậu Việt Nam", text: "uPVC không bị ôxy hóa, không lão hóa hay ố vàng dưới bức xạ mặt trời và khí hậu nóng, ẩm, mưa nhiều nhờ phụ gia và chất ổn định trong công thức phối liệu." },
      { title: "An toàn cháy nổ", text: "Sản xuất từ polymer và phụ gia chống cháy, không phân hủy thành thành phần dễ cháy ngay cả ở nhiệt độ cao. Với gần 100°C của đèn khò, thanh uPVC chỉ biến dạng mà không bén cháy." },
    ],
    systems: ["Cửa đi uPVC", "Cửa sổ uPVC", "Vách ngăn uPVC", "Hệ nhựa Kömmerling", "Hệ nhựa Asia", "Mở quay trong/ngoài, hất, quay – lật, trượt, xếp trượt"],
  },
  {
    slug: "cua-go-va-go-chong-chay",
    id: "go",
    tab: "CỬA GỖ & GỖ CHỐNG CHÁY",
    title: "CỬA GỖ & GỖ CHỐNG CHÁY",
    text: "Cửa gỗ tự nhiên, gỗ công nghiệp, gỗ ghép thanh, gỗ chống cháy và composite. Áp dụng công nghệ hiện đại từ Ý, Tây Ban Nha, Nga — giữ tính năng gỗ tự nhiên, độ cứng và độ bền cao, hạn chế cong vênh, co ngót theo thời tiết.",
    features: ["Đa dạng mẫu mã: pano kính, pano đặc, đường chỉ nổi, chỉ liền", "Công nghệ sản xuất hiện đại từ Ý, Tây Ban Nha, Nga", "Gỗ tự nhiên, công nghiệp, ghép thanh, chống cháy, composite"],
    image: "/eurowindow/cuagotrangchu.jpg.webp",
    intro: [
      "Áp dụng công nghệ sản xuất hiện đại từ Ý, Tây Ban Nha, Nga, cửa gỗ Eurowindow vừa giữ được tính năng của gỗ tự nhiên, vừa có độ cứng và độ bền cao, hạn chế tối đa sự biến đổi theo thời tiết như cong vênh, co ngót.",
      "Nếu như cửa uPVC được chọn là giải pháp hoàn hảo cho mặt ngoài ngôi nhà (cửa sổ và cửa ban công) thì cửa gỗ được xem là giải pháp tối ưu bên trong (cửa thông phòng), phù hợp với nội thất trong nhà.",
      "Trước đây người ta thường chọn gỗ Đinh, Lim, Sến, Táu, Nghiến hay Lát Hoa để làm cửa nhờ độ cứng, chắc, khả năng chịu nén, kháng mối mọt cao và vân gỗ đẹp. Tuy nhiên gỗ nguyên tấm kích thước lớn vẫn có co ngót hoặc nứt do thay đổi độ ẩm, nhiệt độ. Nhà máy cửa gỗ hiện đại tại KCN Quang Minh, Mê Linh – Hà Nội và KCN Tân Uyên – Bình Dương, cùng công nghệ chuyển giao từ Ý, Tây Ban Nha, Nga cho phép cửa gỗ Eurowindow vừa giữ tính năng gỗ tự nhiên vừa ổn định, kín khít, đóng mở êm, thẩm mỹ cao và thi công nhanh.",
    ],
    structure: [
      { title: "Nguyên liệu gỗ", text: "Nguyên liệu đầu vào được xử lý, tẩm sấy theo tiêu chuẩn độ ẩm xuất khẩu (12 – 14%); gỗ rừng trồng ghép thanh được xử lý bằng công nghệ biến tính gỗ nên có độ cứng, độ bền cao, hạn chế cong vênh, co ngót." },
      { title: "Hệ gioăng chuyên dụng", text: "Sử dụng hệ thống gioăng chuyên dụng nhập khẩu từ Châu Âu giúp cửa đóng mở êm, kín khít, tăng khả năng cách âm, cách nhiệt." },
      { title: "Bề mặt & phun sơn", text: "Lựa chọn gỗ trước khi sản xuất kết hợp hệ thống phun sơn tự động cho độ phẳng bề mặt, đồng đều màu sắc, thẩm mỹ cao và tăng độ bền." },
    ],
    advantages: [
      { title: "Tính ổn định", text: "Nguyên liệu được tẩm sấy theo tiêu chuẩn độ ẩm xuất khẩu 12 – 14%, gỗ ghép thanh xử lý công nghệ biến tính gỗ, hạn chế biến đổi theo thời tiết." },
      { title: "Đóng mở êm, kín khít", text: "Hệ gioăng chuyên dụng nhập khẩu Châu Âu giúp cửa đóng mở êm, kín khít, tăng khả năng cách âm, cách nhiệt." },
      { title: "Tính thẩm mỹ", text: "Lựa chọn gỗ kỹ lưỡng và hệ thống phun sơn tự động cho bề mặt phẳng, màu sắc đồng đều, thẩm mỹ cao, bền sản phẩm." },
      { title: "Thi công nhanh", text: "Khuôn và cửa được thiết kế cho lắp dựng công nghiệp ở giai đoạn cuối hoàn thiện công trình, đẩy nhanh tiến độ thi công." },
      { title: "Hiệu quả kinh tế", text: "Độ bền cao, cách âm cách nhiệt tốt đem lại hiệu quả kinh tế cho người sử dụng. Đạt tiêu chuẩn TCVN 9366-1:2021 về độ bền áp lực gió, độ kín nước, độ bền chịu va đập." },
    ],
    systems: ["Cửa gỗ tự nhiên", "Cửa gỗ công nghiệp", "Cửa gỗ ghép thanh", "Cửa gỗ chống cháy", "Cửa gỗ composite", "Kiểu dáng: pano kính, pano đặc, chỉ nổi, chỉ liền"],
  },
  {
    slug: "san-pham-kinh",
    id: "kinh",
    tab: "SẢN PHẨM KÍNH",
    title: "SẢN PHẨM KÍNH CAO CẤP",
    text: "Trung tâm gia công kính tại KCN Quang Minh, Mê Linh, Hà Nội với dây chuyền sản xuất hiện đại trong phòng kín đạt chuẩn độ ẩm ≤46%, nhiệt độ 20–28°C. Kính cường lực, bán cường lực, hộp kính khổ lớn, kính hoa văn, kính dán an toàn, kính Low-E.",
    features: ["Kính cường lực, bán cường lực, kính dán an toàn", "Hộp kính khổ lớn, kính hoa văn, kính Low-E, kính điện đổi màu", "Sản xuất trong phòng kín đạt chuẩn nhiệt độ 20–28°C, độ ẩm ≤46%"],
    image: "/eurowindow/san-pham-kinh.jpg.webp",
    intro: [
      "Đáp ứng nhu cầu kính của Eurowindow và cung cấp cho thị trường các loại kính cao cấp, Eurowindow đầu tư Trung tâm gia công kính tại lô 15 KCN Quang Minh, Mê Linh, Hà Nội với dây chuyền sản xuất hiện đại và đồng bộ hàng đầu tại Việt Nam.",
      "Các sản phẩm kính tiêu biểu: kính cường lực, kính bán cường lực, hộp kính khổ lớn, kính hoa văn, kính dán an toàn — dùng làm vách kính lớn, vách ngăn, cửa thủy lực, lan can cầu thang, cửa sổ, cửa đi, bàn kính, buồng tắm kính… Với tính an toàn, chịu lực cơ học cao, thẩm mỹ, loại trừ tia cực tím, cách âm, cách nhiệt, sản phẩm kính Eurowindow là lựa chọn hoàn hảo cho công trình dân dụng và công nghiệp.",
    ],
    structure: [
      { title: "Phòng kín kiểm soát nhiệt độ, độ ẩm", text: "Hộp kính và kính an toàn được gia công trong phòng kín, độ ẩm ≤46%, nhiệt độ 20 – 28°C, hạn chế hơi ẩm, bụi bẩn ảnh hưởng tới chất lượng kính nhiều lớp." },
      { title: "Dây chuyền thiết bị châu Âu", text: "Máy cắt kính khổ lớn, máy mài song cạnh, máy khoan, máy gia công CNC, lò tôi kính phẳng, dây chuyền kính dán an toàn và hộp kính nhập khẩu từ Italia, Phần Lan, Thụy Sĩ, Đức." },
      { title: "Kiểm tra Heat-Soak-Test", text: "Sau khi tôi, kính cường lực được kiểm tra bằng thiết bị Heat-Soak-Test để loại bỏ tấm kính có nguy cơ lỗi tiềm ẩn trước khi đưa vào công trình." },
      { title: "Kính khổ lớn", text: "Khả năng tôi kính cường lực và bán cường lực dày từ 4mm đến 19mm, kích thước tối đa lên tới 2.800 × 6.000mm, phù hợp mặt dựng kính và vách kính lớn." },
    ],
    advantages: [
      { title: "Độ an toàn cao", text: "Kính cường lực bền gấp 4 – 5 lần kính thường, khi vỡ tạo mảnh nhỏ ít sắc cạnh; kính bán cường lực cứng gấp 2 – 3 lần; kính dán an toàn liên kết màng PVB giữ mảnh kính khi va đập." },
      { title: "Tiêu chuẩn quốc tế", text: "Được Viện Tiêu chuẩn Anh BSI cấp chứng chỉ Kitemark, đáp ứng BS EN 12150-1:2000, BS EN 14449:2005, BS EN 1279-2:2002, EN 1863, ANSI Z97.1-2004, ECE R43." },
      { title: "Cách âm, cách nhiệt, tiết kiệm năng lượng", text: "Ứng dụng công nghệ tôi kính Super Soft Coating Low-E 0,01 hạn chế bức xạ mặt trời, kính cản nhiệt Low-E giảm khoảng 40% truyền nhiệt mùa hè, giảm áp lực điều hòa, phù hợp kiến trúc xanh." },
      { title: "Thẩm mỹ & linh hoạt", text: "Đa dạng dòng kính: cường lực, bán cường lực, hộp kính, kính hoa văn, kính an toàn, kính phản quang, kính phủ cứng/phủ mềm — dễ lựa chọn theo từng không gian." },
      { title: "Chủ động sản xuất đồng bộ", text: "Nhiều dây chuyền trong cùng một trung tâm giúp kiểm soát độ chính xác từng chi tiết, đảm bảo đồng bộ chất lượng và tiến độ cho từng công trình." },
    ],
    systems: ["Kính cường lực & bán cường lực", "Kính an toàn (dán nhiều lớp PVB)", "Hộp kính & hộp kính khổ lớn (bơm khí Argon)", "Kính cách nhiệt an toàn ACT (giảm tới 57% năng lượng mặt trời, 75% ánh sáng gây chói, 99% tia UV)", "Kính hoa văn (khắc chìm CNC từ Italy)", "Độ dày: 5 – 12mm, kính Temper, kính dán 6.38 – 12.38mm, hộp kính 6mm-9-6mm"],
  },
  {
    slug: "cua-tu-dong-va-cua-xoay",
    id: "tu-dong",
    tab: "CỬA TỰ ĐỘNG",
    title: "CỬA TỰ ĐỘNG & CỬA XOAY",
    text: "Giải pháp cửa hiện đại cho khu vực lưu lượng người qua lại lớn: sảnh chính, tòa nhà văn phòng, khách sạn, chung cư và trung tâm thương mại. Cửa trượt & cửa xoay tự động vận hành bằng cảm biến, kết nối hệ thống PCCC hỗ trợ thoát hiểm.",
    features: ["Cửa trượt & cửa xoay tự động vận hành bằng cảm biến", "Cánh kính trượt có/không khung nhôm, chiều cao tối đa 3m", "Kết nối hệ thống PCCC, an toàn, êm ái, bền bỉ"],
    image: "/eurowindow/cua-tu-dong.jpg.webp",
    intro: [
      "Cửa tự động Eurowindow là giải pháp cửa hiện đại, đáp ứng nhu cầu sử dụng tiện nghi, an toàn và thẩm mỹ trong các công trình nhà ở, văn phòng, khách sạn, trung tâm thương mại và không gian công cộng. Với khả năng đóng mở linh hoạt bằng cảm biến, các dòng cửa tự động giúp tối ưu trải nghiệm vận hành, tăng khả năng lưu thông và phù hợp với xu hướng kiến trúc thông minh.",
    ],
    structure: [
      { title: "Hệ điều khiển đa chế độ", text: "Cửa trượt tích hợp 4 chế độ: tự động, mở thường trực, mở một chiều, khóa ban đêm. Cửa xoay có 5 chế độ: Night (khóa đêm an ninh), Revolve (xoay liên tục tốc độ thấp), Automatic, Exit, Manual (vận hành tay khi mất điện)." },
      { title: "Cảm biến nhận diện chuyển động", text: "Radar phát hiện người trong vùng cảm biến, cửa tự mở khi người đi qua và tự đóng, hạn chế thao tác chạm tay, đồng bộ với nhịp di chuyển thực tế." },
      { title: "Cơ chế kiểm soát tốc độ & phanh điện", text: "Tốc độ quay được kiểm soát theo chế độ cài đặt, hạn chế xoay quá nhanh do gió. Chế độ Night dùng khóa điện và phanh điện giữ cửa đóng, ngừng cảm biến." },
      { title: "Kết nối hệ thống PCCC", text: "Cửa có khả năng tự kiểm tra, cảnh báo lỗi và kết nối hệ thống báo cháy tòa nhà, hỗ trợ xử lý tình huống khẩn cấp theo kịch bản kỹ thuật đã thiết lập." },
    ],
    advantages: [
      { title: "Phù hợp lưu lượng lớn", text: "Cửa trượt 2 cánh kích thước lớn, chiều cao tối đa 3m tạo lối đi rộng; cửa lồng xoay 3 – 4 cánh điều tiết dòng người ổn định cho công trình quy mô lớn." },
      { title: "Vận hành linh hoạt", text: "Nhiều chế độ theo thời điểm và mục đích: tự động mở khi có người, giữ mở thường trực, đi một chiều hoặc khóa ban đêm để kiểm soát ra vào." },
      { title: "An toàn khi sử dụng", text: "Tự kiểm tra, cảnh báo lỗi, kết nối báo cháy; cửa lồng xoay kiểm soát tốc độ quay, hạn chế xoay nhanh do tác động của gió." },
      { title: "Êm ái, ổn định", text: "Động cơ, cảm biến và cơ cấu điều khiển thiết kế cho đóng mở nhịp nhàng, hạn chế tiếng ồn, cửa xoay hoạt động liên tục không gián đoạn." },
      { title: "Độ bền cao", text: "Kết cấu chắc chắn chịu tần suất sử dụng lớn, gió, bụi và thay đổi thời tiết — phù hợp mặt tiền và sảnh chính công trình." },
      { title: "Thẩm mỹ, chuyên nghiệp", text: "Thiết kế gọn gàng, hiện đại, sang trọng nâng cao tính nhận diện sảnh chính; cửa xoay tạo điểm nhấn cho khách sạn, văn phòng, trung tâm thương mại." },
    ],
    systems: ["Cửa trượt tự động 2 cánh (cánh kính có khung / không khung nhôm, cao tối đa 3m)", "Cửa tự động xoay tròn 3 hoặc 4 cánh (nhập khẩu nguyên chiếc từ Đức, Italy)", "Chế độ: Night, Revolve, Automatic, Exit, Manual", "Tích hợp: tự kiểm tra lỗi, cảnh báo, kết nối hệ thống báo cháy"],
  },
  {
    slug: "cua-cuon-nhom-khe-thoang",
    id: "cuon",
    tab: "CỬA CUỐN",
    title: "CỬA CUỐN NHÔM KHE THOÁNG EASD45",
    text: "Cửa cuốn nhôm khe thoáng Eurowindow EASD45 hội tụ các ưu điểm: hiện đại, vững chắc, an toàn, êm và đẹp. Gồm 3 hệ chính: cửa cuốn lên hộp, lên trần và cửa kéo ngang với khả năng cách âm, cách nhiệt cao.",
    features: ["3 hệ chính: cửa cuốn lên hộp, lên trần, cửa kéo ngang", "Khả năng cách âm, cách nhiệt cao", "Nhôm khe thoáng EASD45: hiện đại – vững chắc – an toàn – êm – đẹp"],
    image: "/eurowindow/cua-cuon.jpg.webp",
    intro: [
      "Ngày nay, cửa cuốn đã trở thành một phần rất quan trọng và không thể tách rời trong sự phát triển mạnh mẽ của kiến trúc hiện đại. Ngoài tính tiện ích, tính thẩm mỹ, cửa cuốn còn đảm bảo an toàn cho người sử dụng.",
      "Đáp ứng nhu cầu ngày càng lớn của khách hàng, Eurowindow cung cấp ra thị trường dòng sản phẩm cửa cuốn nhôm khe thoáng Eurowindow EASD45, hội tụ đủ các ưu điểm: Hiện đại – Vững chắc – An toàn – Êm – Đẹp. Các đặc tính cơ bản đều được thiết kế, tính toán để tăng độ ổn định và độ bền so với các loại cửa cuốn khe thoáng hiện có trên thị trường.",
    ],
    structure: [
      { title: "Nan nhôm khe thoáng", text: "Thanh nan nhôm có khe thoáng đảm bảo lưu thông không khí, chống bí nóng cho không gian, kết hợp khả năng cách âm, cách nhiệt cao." },
      { title: "Cơ cấu vận hành", text: "Vận hành êm ái, vững chắc; các đặc tính thiết kế được tính toán kỹ để tăng độ ổn định và độ bền so với cửa cuốn khe thoáng thông thường." },
    ],
    advantages: [
      { title: "Hiện đại", text: "Thiết kế cửa cuốn nhôm khe thoáng EASD45 phù hợp xu hướng kiến trúc hiện đại, tiện dụng và thẩm mỹ." },
      { title: "Vững chắc", text: "Kết cấu thanh nhôm bền chắc, các đặc tính được thiết kế, tính toán để tăng độ ổn định và độ bền." },
      { title: "An toàn", text: "Đảm bảo an toàn cho người sử dụng trong quá trình vận hành hằng ngày." },
      { title: "Êm & đẹp", text: "Vận hành êm ái, không ồn; bề mặt nhôm đẹp, sạch sẽ, tăng tính thẩm mỹ cho công trình." },
    ],
    systems: ["Cửa cuốn nhôm khe thoáng EASD45 lên hộp", "Cửa cuốn lên trần", "Cửa kéo ngang"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
