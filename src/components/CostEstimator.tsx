"use client";
import React, { useState } from "react";
import { Calculator, DollarSign, CheckCircle2, ArrowRight, Download, ShieldAlert, Sparkles } from "lucide-react";

export default function CostEstimator() {
  const [projectType, setProjectType] = useState("cua-nhom");
  const [area, setArea] = useState<number>(150); // m2
  const [floors, setFloors] = useState<number>(3);
  const [packageLevel, setPackageLevel] = useState<string>("cao-cap");

  const calculateCost = () => {
    let baseUnitPriceWindow = 2800000; // 2.8M / m2
    let baseUnitPriceSystem = 4500000; // 4.5M / m2

    if (projectType === "cua-nhom") {
      baseUnitPriceWindow = 3200000;
      baseUnitPriceSystem = 5800000;
    } else if (projectType === "cua-go") {
      baseUnitPriceWindow = 3500000;
      baseUnitPriceSystem = 6200000;
    } else if (projectType === "san-pham-kinh") {
      baseUnitPriceWindow = 2900000;
      baseUnitPriceSystem = 5200000;
    }

    if (packageLevel === "tieu-chuan") {
      baseUnitPriceSystem *= 0.9;
    } else if (packageLevel === "cao-cap") {
      baseUnitPriceSystem *= 1.2;
    }

    // Door area estimation (~ 20% to 25% of floor construction area)
    const doorAreaEst = Math.round(area * floors * 0.22);
    const totalCostStandard = Math.round(doorAreaEst * baseUnitPriceWindow);
    const totalCostPremium = Math.round(doorAreaEst * baseUnitPriceSystem);

    return {
      doorAreaEst,
      totalCostStandard,
      totalCostPremium,
      unitPriceStandard: Math.round(baseUnitPriceWindow),
      unitPricePremium: Math.round(baseUnitPriceSystem),
    };
  };

  const costResult = calculateCost();

  return (
    <section id="du-toan" className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#1677FF]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
            <Calculator className="h-4 w-4 text-[#E2C275]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
              CÔNG CỤ DỰ TOÁN DỰ ÁN
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            DỰ TOÁN CHI PHÍ HỆ THỐNG CỬA &amp; VÁCH KÍNH EUROWINDOW
          </h2>
          <p className="text-sm text-[#D2D8E3] sm:text-base">
            Công cụ tự động ước tính diện tích cửa &amp; dự toán ngân sách thi công trọn gói cho công trình biệt thự, nhà phố và dự án hiện đại.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="glass-card mt-12 p-6 sm:p-10 backdrop-blur-2xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left Inputs */}
            <div className="space-y-6 lg:col-span-7">
              {/* Project Type */}
              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                  1. Chọn hệ sản phẩm vật liệu:
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { id: "cua-nhom", name: "Cửa nhôm & Vách kính" },
                    { id: "cua-upvc", name: "Cửa nhựa uPVC" },
                    { id: "cua-go", name: "Cửa gỗ cao cấp" },
                    { id: "san-pham-kinh", name: "Kính an toàn / Low-E" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setProjectType(item.id)}
                      className={`rounded-xl border p-3.5 text-xs font-bold transition text-center backdrop-blur-md ${
                        projectType === item.id
                          ? "border-[#E2C275] bg-[#E2C275] text-[#071523] shadow-lg"
                          : "border-white/10 bg-white/5 text-[#D2D8E3] hover:border-white/30"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area & Floors */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                    Diện tích sàn xây dựng (m²):
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={2000}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-base font-extrabold text-white outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                    Số tầng công trình:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-base font-extrabold text-white outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                  />
                </div>
              </div>

              {/* Package Level */}
              <div>
                <label htmlFor="cost-estimator-package" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                  Phân khúc giải pháp thiết kế:
                </label>
                <select
                  id="cost-estimator-package"
                  aria-label="Phân khúc giải pháp thiết kế"
                  value={packageLevel}
                  onChange={(e) => setPackageLevel(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#102238] px-4 py-3.5 text-sm font-semibold text-white outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                >
                  <option value="tieu-chuan">Gói Tiêu Chuẩn (Căn hộ &amp; Nhà phố)</option>
                  <option value="cao-cap">Gói Cao Cấp Luxury (Biệt thự &amp; Penthouse)</option>
                </select>
              </div>
            </div>

            {/* Right Cost Summary Card */}
            <div className="glass-card border-[#E2C275]/30 bg-[#102238]/90 p-6 sm:p-8 lg:col-span-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                  Dự Toán Ngân Sách
                </span>
                <span className="rounded-full bg-[#E2C275]/15 px-3 py-1 font-mono text-xs font-bold text-[#E2C275]">
                  Đơn Giá 2026
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between text-xs text-[#D2D8E3]">
                  <span>Diện tích cửa ước tính (~22% diện tích sàn):</span>
                  <span className="text-lg font-extrabold text-white">{costResult.doorAreaEst} m²</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1">
                  <div className="text-xs text-[#94A3B8]">Gói Tiêu Chuẩn Quốc Tế:</div>
                  <div className="text-xl font-extrabold text-white sm:text-2xl">
                    {costResult.totalCostStandard.toLocaleString("vi-VN")} VND
                  </div>
                  <div className="text-xs text-[#94A3B8]">
                    Đơn giá ước tính: {costResult.unitPriceStandard.toLocaleString("vi-VN")} đ/m²
                  </div>
                </div>

                <div className="rounded-xl border border-[#E2C275]/40 bg-[#E2C275]/10 p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                    Gói Luxury Cao Cấp Trọn Gói:
                  </div>
                  <div className="text-2xl font-extrabold text-[#E2C275] sm:text-3xl">
                    {costResult.totalCostPremium.toLocaleString("vi-VN")} VND
                  </div>
                  <div className="text-xs text-[#D2D8E3]">
                    Bao gồm phụ kiện kim khí đồng bộ nhập khẩu + Bảo hành 10 - 25 năm
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#lien-he"
                  className="btn-gold-luxury w-full py-4 text-xs uppercase tracking-widest"
                >
                  <Download className="h-4 w-4" />
                  Tải bảng dự toán chi tiết
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
