import { generateContent } from "../src/lib/seo/content_gen";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE = join(process.cwd(), "docs", "articles");

// 20 dự án Eurowindow
const projects = [
  { topic: "Nhà Quốc hội Việt Nam - Kiến tạo công trình trọng điểm quốc gia với cửa và vách nhôm kính Eurowindow", keywords: ["Nhà Quốc hội", "cửa nhôm kính", "Eurowindow", "công trình trọng điểm"], style: "blog" as const },
  { topic: "Trụ sở Bộ Ngoại giao Việt Nam - Giải pháp cửa kính Eurowindow cho công trình ngoại giao cấp cao", keywords: ["Trụ sở Bộ Ngoại giao", "cửa kính", "Eurowindow"], style: "blog" as const },
  { topic: "Trụ sở Bộ Công an - Hệ cửa nhôm kính Eurowindow đảm bảo an ninh và thẩm mỹ", keywords: ["Trụ sở Bộ Công an", "cửa nhôm kính", "an ninh"], style: "blog" as const },
  { topic: "Tòa nhà Văn phòng Chính phủ - Eurowindow đồng hành kiến tạo không gian làm việc quốc gia", keywords: ["Tòa nhà Văn phòng Chính phủ", "Eurowindow", "văn phòng"], style: "blog" as const },
  { topic: "Cảng hàng không quốc tế Vân Đồn - Cửa nhôm kính Eurowindow cho công trình hàng không hiện đại", keywords: ["Cảng hàng không Vân Đồn", "cửa nhôm kính", "hàng không"], style: "blog" as const },
  { topic: "Cảng hàng không quốc tế Cần Thơ - Giải pháp cửa Eurowindow cho cảng hàng không miền Tây", keywords: ["Cảng Cần Thơ", "cửa nhôm kính", "Eurowindow"], style: "blog" as const },
  { topic: "Cảng hàng không Phú Bài Huế - Hệ cửa nhôm kính Eurowindow nâng tầm cảng hàng không xứ Huế", keywords: ["Cảng Phú Bài", "cửa nhôm", "Huế"], style: "blog" as const },
  { topic: "Bệnh viện Việt Pháp Hà Nội - Cửa kính Eurowindow cho môi trường y tế chuẩn quốc tế", keywords: ["Bệnh viện Việt Pháp", "cửa kính", "y tế"], style: "blog" as const },
  { topic: "Bệnh viện ung bướu Đà Nẵng - Giải pháp cửa kính chống nhiễm khuẩn Eurowindow", keywords: ["Bệnh viện ung bướu Đà Nẵng", "cửa kính", "chống nhiễm khuẩn"], style: "blog" as const },
  { topic: "Bệnh viện Nhi đồng TP. Hồ Chí Minh - Cửa uPVC Eurowindow thân thiện với môi trường trẻ em", keywords: ["Bệnh viện Nhi đồng", "cửa uPVC", "trẻ em"], style: "blog" as const },
  { topic: "Trung tâm Truyền hình Thông tấn xã Việt Nam - Cửa nhôm kính Eurowindow cho tòa nhà truyền thông hiện đại", keywords: ["TT Truyền hình Thông tấn", "cửa nhôm kính", "truyền thông"], style: "blog" as const },
  { topic: "Trụ sở Văn phòng Viện kiểm sát nhân dân tối cao - Cửa kính Eurowindow đảm bảo tiêu chuẩn an ninh", keywords: ["Viện kiểm sát", "cửa kính", "an ninh"], style: "blog" as const },
  { topic: "Dự án Vinhomes Global Gate Cổ Loa - Cửa và vách kính Eurowindow cho khu đô thị cao cấp", keywords: ["Vinhomes Global Gate", "cửa kính", "khu đô thị"], style: "blog" as const },
  { topic: "FPT Telecom Tower - Eurowindow trúng thầu thi công hệ cửa và vách nhôm kính", keywords: ["FPT Telecom Tower", "cửa nhôm kính", "tòa nhà văn phòng"], style: "blog" as const },
  { topic: "Sunshine Noble Palace Long Biên - Cửa nhôm kính Eurowindow kiến tạo không gian sống thượng lưu", keywords: ["Sunshine Noble Palace", "cửa nhôm kính", "chung cư cao cấp"], style: "blog" as const },
  { topic: "The 9 Stellars - Cửa và vách nhôm kính Eurowindow cho dự án bất động sản nghỉ dưỡng", keywords: ["The 9 Stellars", "cửa nhôm kính", "nghỉ dưỡng"], style: "blog" as const },
  { topic: "The Privé Nam Rạch Chiếc - Cửa kính Eurowindow cho chung cư cao tầng hiện đại", keywords: ["The Privé", "cửa kính", "chung cư"], style: "blog" as const },
  { topic: "Tòa nhà văn phòng Eurowindow Office Building - Cửa nhôm EA65 và EA68i cho tòa nhà tiết kiệm năng lượng", keywords: ["Eurowindow Office Building", "cửa nhôm EA65", "tiết kiệm năng lượng"], style: "blog" as const },
  { topic: "Khu đô thị Vinhomes Grand Park - Cửa uPVC Eurowindow cho hàng ngàn căn hộ", keywords: ["Vinhomes Grand Park", "cửa uPVC", "khu đô thị"], style: "blog" as const },
  { topic: "Trung tâm Hội nghị Quốc gia - Cửa kính Eurowindow cho công trình văn hóa - chính trị lớn nhất Việt Nam", keywords: ["Trung tâm Hội nghị Quốc gia", "cửa kính", "công trình văn hóa"], style: "blog" as const },
];

// 10 tin tức
const news = [
  { topic: "Eurowindow đồng hành Diễn đàn Năng lượng và Môi trường Thế giới - Việt Nam 2026 thúc đẩy giải pháp vật liệu xanh hướng tới Net Zero", keywords: ["Eurowindow", "Net Zero", "vật liệu xanh", "Diễn đàn năng lượng"], style: "news" as const },
  { topic: "Eurowindow tự hào được vinh danh Top 10 doanh nghiệp Việt Nam xanh 2026", keywords: ["Eurowindow", "doanh nghiệp xanh", "vinh danh"], style: "news" as const },
  { topic: "Eurowindow đồng hành cùng kiến tạo không gian văn phòng giáo dục thích ứng kỷ nguyên mới", keywords: ["Eurowindow", "văn phòng", "giáo dục", "kỷ nguyên mới"], style: "news" as const },
  { topic: "Eurowindow doanh nghiệp tiên phong sản xuất vật liệu xây dựng xanh thúc đẩy phát triển bền vững tại Việt Nam", keywords: ["Eurowindow", "vật liệu xây dựng xanh", "phát triển bền vững"], style: "news" as const },
  { topic: "Gian hàng tuyển dụng Eurowindow thu hút hàng trăm sinh viên tại ngày hội tư vấn hướng nghiệp", keywords: ["Eurowindow", "tuyển dụng", "sinh viên", "hướng nghiệp"], style: "news" as const },
  { topic: "Eurowindow tổ chức thành công tọa đàm Xu hướng nguồn nhân lực chiến lược phát triển và quản trị trong bối cảnh mới", keywords: ["Eurowindow", "nguồn nhân lực", "tọa đàm"], style: "news" as const },
  { topic: "Chương trình khuyến mãi Eurowindow Đón cửa tân gia nhận quà nghỉ dưỡng nhân dịp Vietbuild 2026", keywords: ["Eurowindow", "khuyến mãi", "Vietbuild"], style: "news" as const },
  { topic: "Tổng hợp giải pháp cửa chống nóng Eurowindow mùa hè 2026 cho mọi công trình", keywords: ["Eurowindow", "cửa chống nóng", "mùa hè"], style: "news" as const },
  { topic: "Eurowindow ra mắt dòng cửa thông minh thế hệ mới tích hợp công nghệ IoT", keywords: ["Eurowindow", "cửa thông minh", "IoT"], style: "news" as const },
  { topic: "Kính Low-E Eurowindow giải pháp tối ưu năng lượng cho công trình xanh tại Việt Nam", keywords: ["Eurowindow", "kính Low-E", "công trình xanh"], style: "news" as const },
];

// 7 sản phẩm chính × 5 bài = 35 bài
const products = [
  { topic: "Cửa nhôm Eurowindow EA65 và EA68i - Giải pháp cách âm cách nhiệt cho mọi công trình", keywords: ["cửa nhôm", "EA65", "EA68i", "cách âm", "cách nhiệt"], style: "product" as const },
  { topic: "Cửa đi nhôm Eurowindow - Thiết kế hiện đại bền bỉ cho tòa nhà văn phòng và chung cư", keywords: ["cửa đi nhôm", "văn phòng", "chung cư"], style: "product" as const },
  { topic: "Cửa sổ nhôm Eurowindow - Lấy sáng tự nhiên tối ưu ventilations cho căn hộ", keywords: ["cửa sổ nhôm", "lấy sáng", "ventilation"], style: "product" as const },
  { topic: "Vách kính nhôm Eurowindow - Không gian mở panoramic cho现代建筑", keywords: ["vách kính nhôm", "không gian mở", "panoramic"], style: "product" as const },
  { topic: "Cửa uPVC Eurowindow - Giải pháp cửa nhựa lõi thép tiết kiệm năng lượng hiệu quả", keywords: ["cửa uPVC", "nhựa lõi thép", "tiết kiệm năng lượng"], style: "product" as const },
];

async function run() {
  console.log("Starting article generation...");
  let count = 0;
  const total = projects.length + news.length + products.length;
  
  for (const item of projects) {
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
      const dir = join(BASE, "du-an");
      mkdirSync(dir, { recursive: true });
      const content = `---\ntitle: "${result.title}"\ndescription: "${result.description}"\ncategory: "Dự án"\ndate: "${new Date().toISOString().slice(0, 10)}"\nkeywords: [${item.keywords.map((k) => `"${k}"`).join(", ")}]\n---\n\n${result.content}`;
      writeFileSync(join(dir, `${slug}.md`), content, "utf-8");
      console.log(`  ✓ Saved: ${slug}.md`);
    } catch (err) {
      console.error(`  ✗ Error: ${err}`);
    }
  }

  for (const item of news) {
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
      const dir = join(BASE, "tin-tuc");
      mkdirSync(dir, { recursive: true });
      const content = `---\ntitle: "${result.title}"\ndescription: "${result.description}"\ncategory: "Tin tức"\ndate: "${new Date().toISOString().slice(0, 10)}"\nkeywords: [${item.keywords.map((k) => `"${k}"`).join(", ")}]\n---\n\n${result.content}`;
      writeFileSync(join(dir, `${slug}.md`), content, "utf-8");
      console.log(`  ✓ Saved: ${slug}.md`);
    } catch (err) {
      console.error(`  ✗ Error: ${err}`);
    }
  }

  for (const item of products) {
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
      const dir = join(BASE, "san-pham");
      mkdirSync(dir, { recursive: true });
      const content = `---\ntitle: "${result.title}"\ndescription: "${result.description}"\ncategory: "Sản phẩm"\ndate: "${new Date().toISOString().slice(0, 10)}"\nkeywords: [${item.keywords.map((k) => `"${k}"`).join(", ")}]\n---\n\n${result.content}`;
      writeFileSync(join(dir, `${slug}.md`), content, "utf-8");
      console.log(`  ✓ Saved: ${slug}.md`);
    } catch (err) {
      console.error(`  ✗ Error: ${err}`);
    }
  }

  console.log(`\nDone! Generated ${total} articles.`);
}

run().catch(console.error);
