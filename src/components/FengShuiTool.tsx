"use client";
import React, { useState } from "react";
import { Compass, Sparkles, Check, ArrowRight, Ruler, AlertCircle } from "lucide-react";

export default function FengShuiTool() {
  const [activeTab, setActiveTab] = useState<"bat-trach" | "lo-ban" | "tuoi-xay-nha">("bat-trach");

  // Bat Trach State
  const [birthYear, setBirthYear] = useState("1988");
  const [gender, setGender] = useState("nam");
  const [direction, setDirection] = useState("dong-nam");
  const [result, setResult] = useState<any>(null);

  // Thước Lỗ Ban State
  const [rulerLength, setRulerLength] = useState(2150); // mm

  const calculateFengShui = () => {
    const year = parseInt(birthYear);
    if (!year || year < 1940 || year > 2026) return;

    let sum = year.toString().split("").reduce((a, b) => a + parseInt(b), 0);
    while (sum >= 10) {
      sum = sum.toString().split("").reduce((a, b) => a + parseInt(b), 0);
    }

    let isDongTu = false;
    let menh = "";

    if (gender === "nam") {
      const val = (11 - sum) % 9 || 9;
      if ([1, 3, 4, 9].includes(val)) {
        isDongTu = true;
        menh = "Đông Tứ Mệnh (Khảm, Tốn, Chấn, Ly)";
      } else {
        isDongTu = false;
        menh = "Tây Tứ Mệnh (Càn, Khôn, Cấn, Đoài)";
      }
    } else {
      const val = (sum + 4) % 9 || 9;
      if ([1, 3, 4, 9].includes(val)) {
        isDongTu = true;
        menh = "Đông Tứ Mệnh (Khảm, Tốn, Chấn, Ly)";
      } else {
        isDongTu = false;
        menh = "Tây Tứ Mệnh (Càn, Khôn, Cấn, Đoài)";
      }
    }

    const goodDirsDong = ["Đông", "Đông Nam", "Nam", "Bắc"];
    const goodDirsTay = ["Tây", "Tây Bắc", "Tây Nam", "Đông Bắc"];

    setResult({
      year,
      gender: gender === "nam" ? "Nam giới" : "Nữ giới",
      menh,
      isDongTu,
      goodDirections: isDongTu ? goodDirsDong : goodDirsTay,
      badDirections: isDongTu ? goodDirsTay : goodDirsDong,
    });
  };

  // Check Thước Lỗ Ban 52.2 cm (Thông Thủy Cửa)
  const checkLoBan = (lengthMm: number) => {
    const cm = lengthMm / 10;
    const remainder = cm % 52.2;
    if (remainder < 13.05 || (remainder >= 26.1 && remainder < 39.15)) {
      return { status: "tot", label: "Cung Tốt (Đại Cát): TÀI LỘC · PHÚC LỘC · CẮT CÁT", color: "bg-emerald-600/90" };
    }
    return { status: "xau", label: "Cung Xấu (Cần Chỉnh): THẤT TÀI · HOẠ HẠI · CÔ ĐỘC", color: "bg-rose-600/90" };
  };

  const loBanEval = checkLoBan(rulerLength);

  return (
    <section id="phong-thuy" className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-[#1677FF]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Intro Text */}
          <div className="space-y-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
              <Compass className="h-4 w-4 text-[#E2C275]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                CÔNG CỤ PHONG THỦY THÔNG THỦY CỬA
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              TRA CỨU HƯỚNG CỬA &amp; KÍCH THƯỚC LỖ BAN CHUẨN
            </h2>

            <p className="text-sm leading-relaxed text-[#D2D8E3] sm:text-base">
              Eurowindow ứng dụng Bát Trạch &amp; Thước Lỗ Ban 52.2cm vào bản vẽ thiết kế hệ thống cửa đi, cửa sổ. Giúp gia chủ thu hút tài lộc, bình an và vận khí tốt lành cho ngôi nhà.
            </p>

            <div className="space-y-3 pt-2 text-xs font-semibold text-[#D2D8E3] sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#E2C275]" />
                <span>Tra cứu mệnh Bát Trạch chuẩn xác 100%</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#E2C275]" />
                <span>Thước Lỗ Ban Online 52.2cm chuyên dụng cho cửa đi &amp; cửa sổ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[#E2C275]" />
                <span>Tư vấn kích thước lọt lòng hợp phong thủy cho biệt thự &amp; nhà phố</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Tool Widget */}
          <div className="glass-card p-6 sm:p-8 lg:col-span-7 backdrop-blur-2xl">
            {/* Tool Tabs Selector */}
            <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("bat-trach")}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === "bat-trach"
                    ? "bg-[#E2C275] text-[#071523] shadow-md"
                    : "bg-white/5 text-[#D2D8E3] hover:bg-white/10"
                }`}
              >
                <Compass className="h-4 w-4" /> Bát Trạch Hướng Nhà
              </button>

              <button
                onClick={() => setActiveTab("lo-ban")}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === "lo-ban"
                    ? "bg-[#E2C275] text-[#071523] shadow-md"
                    : "bg-white/5 text-[#D2D8E3] hover:bg-white/10"
                }`}
              >
                <Ruler className="h-4 w-4" /> Thước Lỗ Ban Cửa 52.2cm
              </button>

              <button
                onClick={() => setActiveTab("tuoi-xay-nha")}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === "tuoi-xay-nha"
                    ? "bg-[#E2C275] text-[#071523] shadow-md"
                    : "bg-white/5 text-[#D2D8E3] hover:bg-white/10"
                }`}
              >
                <Sparkles className="h-4 w-4" /> Xem Tuổi Làm Nhà 2026
              </button>
            </div>

            {/* TAB 1: BÁT TRẠCH */}
            {activeTab === "bat-trach" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Năm sinh:
                    </label>
                    <input
                      type="number"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      placeholder="1988"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Giới tính:
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-[#102238] px-4 py-3 text-sm font-semibold text-white outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                    >
                      <option value="nam">Nam</option>
                      <option value="nu">Nữ</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Hướng cửa dự kiến:
                    </label>
                    <select
                      value={direction}
                      onChange={(e) => setDirection(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-[#102238] px-4 py-3 text-sm font-semibold text-white outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                    >
                      <option value="dong-nam">Đông Nam</option>
                      <option value="dong">Đông</option>
                      <option value="nam">Nam</option>
                      <option value="bac">Bắc</option>
                      <option value="tay">Tây</option>
                      <option value="tay-bac">Tây Bắc</option>
                      <option value="tay-nam">Tây Nam</option>
                      <option value="dong-bac">Đông Bắc</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateFengShui}
                  className="btn-gold-luxury w-full py-3.5 text-xs uppercase tracking-widest"
                >
                  Tra cứu quẻ mệnh Bát Trạch
                  <ArrowRight className="h-4 w-4" />
                </button>

                {result && (
                  <div className="rounded-xl border border-[#E2C275]/30 bg-[#102238]/90 p-5 space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-bold text-white">
                        Tuổi {result.year} ({result.gender}):
                      </span>
                      <span className="text-xs font-extrabold text-[#E2C275]">
                        {result.menh}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                        <span className="mb-1 block font-bold text-emerald-400">
                          ★ Hướng Tốt Cát Khánh:
                        </span>
                        <span className="font-semibold text-[#D2D8E3]">
                          {result.goodDirections.join(", ")}
                        </span>
                      </div>

                      <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
                        <span className="mb-1 block font-bold text-rose-400">
                          ★ Hướng Hung Cần Tránh:
                        </span>
                        <span className="font-semibold text-[#D2D8E3]">
                          {result.badDirections.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: THƯỚC LỖ BAN */}
            {activeTab === "lo-ban" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#D2D8E3]">Kích thước lọt lòng cửa (mm):</span>
                    <span className="text-lg font-extrabold text-[#E2C275]">
                      {rulerLength} mm ({rulerLength / 10} cm)
                    </span>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min={500}
                    max={4000}
                    step={10}
                    value={rulerLength}
                    onChange={(e) => setRulerLength(parseInt(e.target.value))}
                    className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-[#E2C275]"
                  />
                  <div className="flex justify-between font-mono text-[11px] text-[#94A3B8]">
                    <span>500 mm</span>
                    <span>2000 mm</span>
                    <span>4000 mm</span>
                  </div>
                </div>

                {/* Dynamic Ruler Display */}
                <div className="rounded-xl border border-white/10 bg-[#071523] p-5 text-center space-y-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
                    Thước Lỗ Ban 52.2cm (Thông Thủy Cửa)
                  </div>
                  <div className={`p-4 rounded-xl text-white font-extrabold text-sm ${loBanEval.color}`}>
                    {loBanEval.label}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: XEM TUỔI LÀM NHÀ 2026 */}
            {activeTab === "tuoi-xay-nha" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="rounded-xl border border-[#E2C275]/30 bg-[#E2C275]/10 p-5 text-xs space-y-2">
                  <h4 className="text-sm font-extrabold text-[#E2C275]">
                    Các Tuổi Đẹp Xây Nhà Năm 2026 (Bính Ngọ)
                  </h4>
                  <p className="leading-6 text-[#D2D8E3]">
                    Năm 2026 (Bính Ngọ), gia chủ sinh năm: <strong>1957, 1960, 1966, 1969, 1975, 1978, 1984, 1987, 1993, 1996</strong> không phạm Kim Lâu, Hoang Ốc, Tam Tai. Rất vượng khí để làm nhà &amp; lắp đặt hệ thống cửa Eurowindow!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
