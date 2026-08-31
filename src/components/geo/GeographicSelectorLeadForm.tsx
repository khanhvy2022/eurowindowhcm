"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  MapPin,
  Building,
  User,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  ChevronDown,
  ShieldCheck,
  Mail,
} from "lucide-react";
import geoData from "@/data/geo/vietnam-provinces-v4.2.0.json";
import { removeVietnameseTones } from "@/lib/geo/resolver";

type ProvinceItem = {
  code: string;
  name: string;
  fullName: string;
  codeName: string;
};

type WardItem = {
  code: string;
  name: string;
  fullName: string;
  codeName: string;
  provinceCode: string;
};

// Analytics event tracker (dispatches custom DOM event and window.dataLayer if available)
function trackGeoEvent(eventName: string, payload?: Record<string, any>) {
  try {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("geo_seo_conversion", {
        detail: { event: eventName, ...payload, timestamp: new Date().toISOString() },
      });
      window.dispatchEvent(event);

      // Support GTM dataLayer if present
      const dl = (window as any).dataLayer;
      if (Array.isArray(dl)) {
        dl.push({ event: eventName, ...payload });
      }
    }
  } catch {
    // Ignore client analytics errors silently
  }
}

export default function GeographicSelectorLeadForm() {
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("79"); // Default: TP. Hồ Chí Minh
  const [selectedWardCode, setSelectedWardCode] = useState<string>("");
  const [provinceSearch, setProvinceSearch] = useState<string>("");
  const [wardSearch, setWardSearch] = useState<string>("");
  const [showProvinceDropdown, setShowProvinceDropdown] = useState<boolean>(false);
  const [showWardDropdown, setShowWardDropdown] = useState<boolean>(false);

  // Form states
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [requirement, setRequirement] = useState<string>("Cửa nhôm & vách kính lớn");
  const [customNotes, setCustomNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const provinceDropdownRef = useRef<HTMLDivElement>(null);
  const wardDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        provinceDropdownRef.current &&
        !provinceDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProvinceDropdown(false);
      }
      if (
        wardDropdownRef.current &&
        !wardDropdownRef.current.contains(event.target as Node)
      ) {
        setShowWardDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter provinces client-side
  const filteredProvinces = useMemo(() => {
    const query = removeVietnameseTones(provinceSearch.trim());
    if (!query) return geoData.provinces;
    return geoData.provinces.filter((p) => {
      const normName = removeVietnameseTones(p.name);
      const normFullName = removeVietnameseTones(p.fullName);
      return normName.includes(query) || normFullName.includes(query);
    });
  }, [provinceSearch]);

  // Current selected province
  const currentProvince = useMemo(() => {
    return geoData.provinces.find((p) => p.code === selectedProvinceCode);
  }, [selectedProvinceCode]);

  // Filter wards client-side by selected province
  const availableWards = useMemo(() => {
    if (!currentProvince) return [];
    return currentProvince.wards as WardItem[];
  }, [currentProvince]);

  const filteredWards = useMemo(() => {
    const query = removeVietnameseTones(wardSearch.trim());
    if (!query) return availableWards;
    return availableWards.filter((w) => {
      const normName = removeVietnameseTones(w.name);
      const normFullName = removeVietnameseTones(w.fullName);
      return normName.includes(query) || normFullName.includes(query);
    });
  }, [availableWards, wardSearch]);

  // Selected ward entity
  const currentWard = useMemo(() => {
    if (!selectedWardCode || !currentProvince) return undefined;
    return (currentProvince.wards as WardItem[]).find((w) => w.code === selectedWardCode);
  }, [selectedWardCode, currentProvince]);

  // Handle province change
  const handleSelectProvince = (p: ProvinceItem) => {
    setSelectedProvinceCode(p.code);
    setSelectedWardCode("");
    setProvinceSearch("");
    setShowProvinceDropdown(false);
    trackGeoEvent("province_selected", { provinceCode: p.code, provinceName: p.name });
  };

  // Handle ward change
  const handleSelectWard = (w: WardItem) => {
    setSelectedWardCode(w.code);
    setWardSearch("");
    setShowWardDropdown(false);
    trackGeoEvent("ward_selected", {
      provinceCode: selectedProvinceCode,
      wardCode: w.code,
      wardName: w.name,
    });
  };

  // Track form started on first focus
  const handleFormFocus = () => {
    trackGeoEvent("lead_form_started");
  };

  // Submit lead
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên của Quý khách.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setErrorMessage("Vui lòng nhập số điện thoại hợp lệ (tối thiểu 9-10 chữ số).");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      product: requirement,
      address: [
        currentWard ? currentWard.fullName : "",
        currentProvince ? currentProvince.fullName : "",
      ]
        .filter(Boolean)
        .join(", "),
      message: `[Khu vực: ${currentWard ? currentWard.fullName + " - " : ""}${currentProvince ? currentProvince.fullName : ""}] Yêu cầu: ${requirement}. Ghi chú: ${customNotes.trim() || "Cần tư vấn báo giá công trình."}`,
      sourceUrl: "https://www.eurowindowhcm.com/cua-eurowindow",
      selectedProvince: currentProvince?.fullName,
      selectedProvinceCode: currentProvince?.code,
      selectedWard: currentWard?.fullName,
      selectedWardCode: currentWard?.code,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        trackGeoEvent("lead_form_submitted", {
          provinceCode: currentProvince?.code,
          wardCode: currentWard?.code,
          requirement,
        });
      } else {
        setErrorMessage(data.error || "Gửi yêu cầu thất bại. Vui lòng liên hệ Điện Thoại 0966994338.");
      }
    } catch {
      setErrorMessage("Lỗi kết nối mạng. Quý khách vui lòng thử lại hoặc gọi trực tiếp Điện Thoại 0966994338.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="tu-van-khu-vuc" className="relative mt-16 overflow-hidden rounded-3xl border border-[#E2C275]/30 bg-[#071523] p-6 text-white shadow-2xl sm:p-10 lg:p-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#1677FF]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#E2C275]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/40 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
            <MapPin className="h-4 w-4 text-[#E2C275]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
              TƯ VẤN KỸ THUẬT &amp; DỰ TOÁN THEO KHU VỰC
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Nhận Tư Vấn &amp; Báo Giá Giải Pháp Cửa Eurowindow
          </h2>
          <p className="mt-3 text-sm text-[#D2D8E3] sm:text-base">
            Chọn tỉnh/thành và phường/xã của công trình để chuyên viên kỹ thuật Eurowindow tư vấn giải pháp nhôm kính, uPVC và cách âm cách nhiệt tối ưu nhất.
          </p>
        </div>

        {submitSuccess ? (
          <div className="mt-10 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-8 text-center backdrop-blur-xl">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
            <h3 className="mt-4 text-xl font-bold text-white">Yêu Cầu Đã Được Tiếp Nhận Thành Công!</h3>
            <p className="mt-2 text-sm text-emerald-200">
              Cảm ơn Quý khách <span className="font-semibold text-white">{fullName}</span>. Kỹ sư tư vấn Eurowindow sẽ liên hệ qua số điện thoại <span className="font-semibold text-white">{phone}</span>
              {email ? (
                <> và gửi hồ sơ dự toán đến email <span className="font-semibold text-white">{email}</span></>
              ) : null}{" "}
              trong vòng 15-30 phút làm việc.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs text-white/80">
              <ShieldCheck className="h-4 w-4 text-[#E2C275]" />
              Khu vực công trình: {currentWard ? `${currentWard.fullName}, ` : ""}{currentProvince?.fullName}
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setSubmitSuccess(false);
                  setFullName("");
                  setPhone("");
                  setEmail("");
                  setCustomNotes("");
                }}
                className="rounded-xl border border-emerald-500/40 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/20 transition cursor-pointer"
              >
                Gửi yêu cầu công trình khác
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="mt-10 space-y-6">
            {/* Geographic Selector Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Province Selector */}
              <div className="relative" ref={provinceDropdownRef}>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E2C275]">
                  <Building className="h-3.5 w-3.5" />
                  1. Tỉnh / Thành phố
                </label>
                <div
                  onClick={() => {
                    setShowProvinceDropdown(!showProvinceDropdown);
                    setShowWardDropdown(false);
                    trackGeoEvent("location_selector_opened", { level: "province" });
                  }}
                  className="flex h-12 cursor-pointer items-center justify-between rounded-xl border border-white/20 bg-[#102238]/80 px-4 text-sm text-white backdrop-blur transition hover:border-[#E2C275]/60"
                >
                  <span className="truncate">
                    {currentProvince ? currentProvince.fullName : "Chọn Tỉnh / Thành phố"}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#E2C275]" />
                </div>

                {showProvinceDropdown && (
                  <div className="absolute left-0 top-full z-50 mt-1.5 w-full rounded-xl border border-white/20 bg-[#0c1b2d] p-2 shadow-2xl backdrop-blur-2xl">
                    <div className="relative mb-2">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
                      <input
                        type="text"
                        placeholder="Tìm tỉnh/thành..."
                        value={provinceSearch}
                        onChange={(e) => setProvinceSearch(e.target.value)}
                        className="h-8 w-full rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 text-xs text-white placeholder-white/40 focus:border-[#E2C275] focus:outline-none"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1 pr-1 text-xs">
                      {filteredProvinces.map((p) => (
                        <div
                          key={p.code}
                          onClick={() => handleSelectProvince(p as ProvinceItem)}
                          className={`cursor-pointer rounded-lg px-3 py-2 transition ${
                            selectedProvinceCode === p.code
                              ? "bg-[#E2C275] font-semibold text-[#071523]"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {p.fullName}
                        </div>
                      ))}
                      {filteredProvinces.length === 0 && (
                        <div className="py-3 text-center text-xs text-white/50">Không tìm thấy tỉnh/thành</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Ward Selector */}
              <div className="relative" ref={wardDropdownRef}>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E2C275]">
                  <MapPin className="h-3.5 w-3.5" />
                  2. Phường / Xã
                </label>
                <div
                  onClick={() => {
                    setShowWardDropdown(!showWardDropdown);
                    setShowProvinceDropdown(false);
                    trackGeoEvent("location_selector_opened", { level: "ward" });
                  }}
                  className="flex h-12 cursor-pointer items-center justify-between rounded-xl border border-white/20 bg-[#102238]/80 px-4 text-sm text-white backdrop-blur transition hover:border-[#E2C275]/60"
                >
                  <span className="truncate">
                    {currentWard ? currentWard.fullName : "Chọn Phường / Xã (tùy chọn)"}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#E2C275]" />
                </div>

                {showWardDropdown && (
                  <div className="absolute left-0 top-full z-50 mt-1.5 w-full rounded-xl border border-white/20 bg-[#0c1b2d] p-2 shadow-2xl backdrop-blur-2xl">
                    <div className="relative mb-2">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
                      <input
                        type="text"
                        placeholder="Tìm phường/xã..."
                        value={wardSearch}
                        onChange={(e) => setWardSearch(e.target.value)}
                        className="h-8 w-full rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 text-xs text-white placeholder-white/40 focus:border-[#E2C275] focus:outline-none"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1 pr-1 text-xs">
                      {filteredWards.map((w) => (
                        <div
                          key={w.code}
                          onClick={() => handleSelectWard(w)}
                          className={`cursor-pointer rounded-lg px-3 py-2 transition ${
                            selectedWardCode === w.code
                              ? "bg-[#E2C275] font-semibold text-[#071523]"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {w.fullName}
                        </div>
                      ))}
                      {filteredWards.length === 0 && (
                        <div className="py-3 text-center text-xs text-white/50">Không tìm thấy phường/xã</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progressive Geographic Confirmation Card (Factually Verified Only) */}
            <div className="flex items-center gap-3 rounded-xl border border-[#E2C275]/20 bg-[#102238]/60 p-4 text-xs sm:text-sm">
              <MapPin className="h-5 w-5 shrink-0 text-[#E2C275]" />
              <div>
                <span className="text-white/60">Khu vực công trình bạn chọn: </span>
                <span className="font-bold text-white">
                  {currentWard ? `${currentWard.fullName}, ` : ""}
                  {currentProvince?.fullName}
                </span>
                <p className="mt-0.5 text-[11px] text-[#D2D8E3]">
                  Hệ thống nhà máy và đội ngũ kỹ sư Eurowindow hỗ trợ khảo sát thực tế, đo đạc thông số kỹ thuật và vận chuyển trực tiếp đến công trình.
                </p>
              </div>
            </div>

            {/* Product & Requirement Selection */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E2C275]">
                <FileText className="h-3.5 w-3.5" />
                3. Giải pháp cửa cần tư vấn
              </label>
              <select
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/20 bg-[#102238] px-4 text-sm text-white focus:border-[#E2C275] focus:outline-none"
              >
                <option value="Cửa nhôm & vách kính lớn (EA55-EA95i, cầu cách nhiệt)">
                  Cửa nhôm &amp; vách kính lớn (EA55-EA95i, cầu cách nhiệt)
                </option>
                <option value="Cửa nhựa uPVC Châu Âu (Kömmerling cách âm tuyệt đối)">
                  Cửa nhựa uPVC Châu Âu (Kömmerling cách âm tuyệt đối)
                </option>
                <option value="Cửa gỗ & cửa gỗ chống cháy Eurowindow">
                  Cửa gỗ &amp; cửa gỗ chống cháy Eurowindow
                </option>
                <option value="Cửa cuốn nhôm khe thoáng & cửa tự động">
                  Cửa cuốn nhôm khe thoáng &amp; cửa tự động
                </option>
                <option value="Vách kính hộp Low-E & kính an toàn cường lực">
                  Vách kính hộp Low-E &amp; kính an toàn cường lực
                </option>
                <option value="Tư vấn giải pháp tổng thể cho biệt thự / nhà phố / dự án">
                  Tư vấn giải pháp tổng thể cho biệt thự / nhà phố / dự án
                </option>
              </select>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E2C275]">
                  <User className="h-3.5 w-3.5" />
                  4. Họ và tên <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Anh Hoàng / Chị Mai"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/20 bg-[#102238]/80 px-4 text-sm text-white placeholder-white/30 focus:border-[#E2C275] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E2C275]">
                  <Phone className="h-3.5 w-3.5" />
                  5. Số điện thoại nhận tư vấn <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/20 bg-[#102238]/80 px-4 text-sm text-white placeholder-white/30 focus:border-[#E2C275] focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field (matching contact page) */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E2C275]">
                <Mail className="h-3.5 w-3.5" />
                6. Email nhận báo giá &amp; hồ sơ thiết kế (tùy chọn)
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/20 bg-[#102238]/80 px-4 text-sm text-white placeholder-white/30 focus:border-[#E2C275] focus:outline-none"
              />
            </div>

            {/* Optional Notes */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
                7. Ghi chú thêm về công trình (diện tích, bản vẽ, quy mô...)
              </label>
              <textarea
                rows={2}
                placeholder="Nhập kích thước sơ bộ hoặc yêu cầu cụ thể nếu có..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-[#102238]/80 p-3 text-sm text-white placeholder-white/30 focus:border-[#E2C275] focus:outline-none"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E2C275] to-[#c9a756] font-bold text-[#071523] shadow-lg transition duration-200 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#071523] border-t-transparent" />
                    Đang gửi thông tin...
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    GỬI YÊU CẦU TƯ VẤN &amp; DỰ TOÁN MIỄN PHÍ
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-[11px] text-white/50">
                * Thông tin liên hệ của Quý khách được bảo mật tuyệt đối theo chính sách quyền riêng tư của Eurowindow.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
