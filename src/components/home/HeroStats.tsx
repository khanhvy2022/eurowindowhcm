import { Award, Building, Factory, ShieldCheck } from "lucide-react";

interface HeroStatsProps {
  lang?: "vi" | "en";
}

export default function HeroStats({ lang = "vi" }: HeroStatsProps) {
  const isEn = lang === "en";

  const stats = [
    {
      value: "23+",
      unit: isEn ? "Years" : "Năm",
      label: isEn ? "Pioneering Market" : "Tiên phong thị trường",
      desc: isEn ? "Over two decades shaping modern Vietnamese architecture" : "Hơn 2 thập kỷ kiến tạo kiến trúc Việt",
      icon: Award,
    },
    {
      value: "5",
      unit: isEn ? "Plants" : "Nhà máy",
      label: isEn ? "European Standard" : "Quy mô chuẩn Châu Âu",
      desc: isEn ? "Advanced automated manufacturing lines in VN" : "Dây chuyền tự động hóa công nghệ cao",
      icon: Factory,
    },
    {
      value: "Top 1",
      unit: "",
      label: isEn ? "Market Leadership" : "Thị phần dẫn đầu",
      desc: isEn ? "Vietnam National Brand recognized 14 consecutive years" : "Thương hiệu Quốc gia 14 năm liên tiếp",
      icon: ShieldCheck,
    },
    {
      value: "100.000+",
      unit: "",
      label: isEn ? "Landmarks" : "Công trình phủ sóng",
      desc: isEn ? "National assembly, airports, hospitals & luxury estates" : "Tòa nhà Quốc hội, sân bay, bệnh viện & biệt thự",
      icon: Building,
    },
  ];

  return (
    <section className="relative z-20 -mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1c33]/90 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-[#C9A227]/40 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-bold tracking-tight text-[#C9A227] sm:text-4xl">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      {item.unit}
                    </span>
                  )}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#C9A227] transition group-hover:border-[#C9A227]/40 group-hover:bg-[#C9A227]/10">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <h2 className="mt-3 text-sm font-bold uppercase tracking-wider text-white">
                {item.label}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-[#94A3B8]">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
