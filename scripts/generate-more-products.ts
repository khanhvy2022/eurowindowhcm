import { generateContent } from "../src/lib/seo/content_gen";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE = join(process.cwd(), "docs", "articles", "san-pham");

const moreProducts = [
  // Cửa gỗ (5 bài)
  { topic: "Cửa gỗ tự nhiên Eurowindow - Sang trọng bền bỉ cho biệt thự và nhà phố cao cấp", keywords: ["cửa gỗ tự nhiên", "biệt thự", "Eurowindow"], style: "product" as const },
  { topic: "Cửa gỗ công nghiệp Eurowindow - Giải pháp cửa gỗ giá rẻ chất lượng cao cho căn hộ", keywords: ["cửa gỗ công nghiệp", "căn hộ", "giá rẻ"], style: "product" as const },
  { topic: "Cửa gỗ ghép thanh Eurowindow - Kết cấu vững chắc chống cong vênh cho mọi thời tiết", keywords: ["cửa gỗ ghép thanh", "chống cong vênh"], style: "product" as const },
  { topic: "Cửa gỗ chống cháy Eurowindow - Bảo vệ an toàn tính mạng tài sản cho tòa nhà cao tầng", keywords: ["cửa gỗ chống cháy", "an toàn", "tòa nhà cao tầng"], style: "product" as const },
  { topic: "Cửa gỗ composite Eurowindow - Chống nước chống mối mọt cho vùng khí hậu nhiệt đới", keywords: ["cửa gỗ composite", "chống nước", "khí hậu nhiệt đới"], style: "product" as const },

  // Cửa cuốn (5 bài)
  { topic: "Cửa cuốn Eurowindow cho garage xe hơi - An toàn bảo mật tuyệt đối cho ngôi nhà", keywords: ["cửa cuốn", "garage", "bảo mật"], style: "product" as const },
  { topic: "Cửa cuốn nan nhôm Eurowindow - Thiết kế sang trọng cho mặt tiền shophouse", keywords: ["cửa cuốn nan nhôm", "shophouse", "mặt tiền"], style: "product" as const },
  { topic: "Cửa cuốn tấm liền Eurowindow - Vận hành êm ái nhanh chóng cho cửa hàng retail", keywords: ["cửa cuốn tấm liền", "cửa hàng", "êm ái"], style: "product" as const },
  { topic: "Bảng giá cửa cuốn Eurowindow 2026 - Phân tích chi phí đầu tư hợp lý", keywords: ["bảng giá cửa cuốn", "chi phí", "2026"], style: "product" as const },
  { topic: "So sánh cửa cuốn và cửa xếp nhôm - Nên chọn loại nào cho công trình dân dụng?", keywords: ["cửa cuốn vs cửa xếp", "công trình dân dụng"], style: "product" as const },

  // Cửa tự động (5 bài)
  { topic: "Cửa tự động Eurowindow cho bệnh viện - Vận hành trơn tru vệ sinh cho môi trường y tế", keywords: ["cửa tự động", "bệnh viện", "vệ sinh"], style: "product" as const },
  { topic: "Cửa tự động trượt Eurowindow cho trung tâm thương mại - Lối ra vào hiện đại chuyên nghiệp", keywords: ["cửa tự động trượt", "trung tâm thương mại"], style: "product" as const },
  { topic: "Cửa tự động xoay Eurowindow cho khách sạn 5 sao - Ấn tượng từ cái nhìn đầu tiên", keywords: ["cửa tự động xoay", "khách sạn"], style: "product" as const },
  { topic: "Maintenance cửa tự động Eurowindow - Hướng dẫn bảo trì định kỳ kéo dài tuổi thọ", keywords: ["bảo trì cửa tự động", "tuổi thọ"], style: "product" as const },
  { topic: "Cửa tự động Eurowindow tích hợp sensor an toàn - Phòng ngừa tai nạn cho người sử dụng", keywords: ["cửa tự động", "sensor an toàn", "tai nạn"], style: "product" as const },

  // Sản phẩm kính (5 bài)
  { topic: "Kính Low-E Eurowindow - Giảm bức xạ nhiệt tiết kiệm điện năng cho tòa nhà văn phòng", keywords: ["kính Low-E", "bức xạ nhiệt", "tiết kiệm điện"], style: "product" as const },
  { topic: "Kính điện thông minh Eurowindow - Chuyển đổi trong suốt mờ chỉ bằng một thao tác", keywords: ["kính điện thông minh", "chuyển đổi"], style: "product" as const },
  { topic: "Kính chống cháy Eurowindow EI30 đến EI180 - Nâng cao an toàn phòng cháy chữa cháy", keywords: ["kính chống cháy", "EI30", "EI180", "phòng cháy"], style: "product" as const },
  { topic: "Kính cường lực Eurowindow - Chịu lực gấp 5 lần kính thường an toàn tuyệt đối", keywords: ["kính cường lực", "chịu lực", "an toàn"], style: "product" as const },
  { topic: "Kính cách âm Eurowindow - Giảm tiếng ồn đến 40dB cho không gian yên tĩnh", keywords: ["kính cách âm", "giảm tiếng ồn"], style: "product" as const },

  // Cửa thông minh (5 bài)
  { topic: "Cửa thông minh Eurowindow thế hệ mới - Kiểm soát bằng vân tay mã PIN smartphone", keywords: ["cửa thông minh", "vân tay", "mã PIN"], style: "product" as const },
  { topic: "Cửa thông minh Eurowindow tích hợp IoT - Quản lý từ xa qua ứng dụng điện thoại", keywords: ["cửa thông minh", "IoT", "quản lý từ xa"], style: "product" as const },
  { topic: "Cửa gỗ thông minh Eurowindow - Kết hợp thẩm mỹ cổ điển với công nghệ hiện đại", keywords: ["cửa gỗ thông minh", "thẩm mỹ", "công nghệ"], style: "product" as const },
  { topic: "An ninh cửa thông minh Eurowindow - Hệ thống cảnh báo chống trộm tiên tiến", keywords: ["cửa thông minh", "chống trộm", "an ninh"], style: "product" as const },
  { topic: "Lắp đặt cửa thông minh Eurowindow - Quy trình thi công chuẩn cho mọi loại cửa", keywords: ["lắp đặt cửa thông minh", "quy trình thi công"], style: "product" as const },
];

async function run() {
  console.log("Generating more product articles...");
  let count = 0;
  const total = moreProducts.length;
  
  for (const item of moreProducts) {
    count++;
    console.log(`[${count}/${total}] ${item.topic.slice(0, 60)}...`);
    try {
      const result = await generateContent(item);
      const slug = item.topic
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80);
      mkdirSync(BASE, { recursive: true });
      const content = `---\ntitle: "${result.title}"\ndescription: "${result.description}"\ncategory: "Sản phẩm"\ndate: "${new Date().toISOString().slice(0, 10)}"\nkeywords: [${item.keywords.map((k) => `"${k}"`).join(", ")}]\n---\n\n${result.content}`;
      writeFileSync(join(BASE, `${slug}.md`), content, "utf-8");
      console.log(`  ✓ Saved: ${slug}.md`);
    } catch (err) {
      console.error(`  ✗ Error: ${err}`);
    }
  }

  console.log(`\nDone! Generated ${total} more product articles.`);
}

run().catch(console.error);
