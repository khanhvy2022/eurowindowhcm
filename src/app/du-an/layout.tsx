import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dự án Eurowindow – Công trình tiêu biểu trên toàn quốc",
  description:
    "Khám phá các dự án tiêu biểu của Eurowindow: từ công trình cấp quốc gia, bệnh viện, trụ sở cơ quan đến dự án dân dụng cao cấp. Hơn 100.000 công trình đã được tin dùng.",
  alternates: {
    canonical: "https://eurowindowhcm.vn/du-an",
  },
  openGraph: {
    title: "Dự án Eurowindow – Công trình tiêu biểu trên toàn quốc",
    description:
      "Các dự án tiêu biểu Eurowindow từ sân bay, bệnh viện đến tòa nhà văn phòng – hơn 100.000 công trình phủ sóng toàn quốc.",
    url: "https://eurowindowhcm.vn/du-an",
    images: [{ url: "/eurowindow/constructions/viber-image-2025-02-05-13-33-24-065.png.webp", width: 1200, height: 630, alt: "Dự án Eurowindow" }],
  },
};

export default function DuAnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
