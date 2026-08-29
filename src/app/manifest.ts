import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cửa Eurowindow Hồ Chí Minh",
    short_name: "Eurowindow HCM",
    description: "Nhà phân phối chính hãng cửa nhôm kính, cửa uPVC, cửa gỗ, kính an toàn Eurowindow tại TP.HCM",
    start_url: "/",
    display: "standalone",
    background_color: "#071523",
    theme_color: "#071523",
    icons: [
      {
        src: "/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
