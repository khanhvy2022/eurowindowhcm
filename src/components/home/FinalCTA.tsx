"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { contact } from "@/data/eurowindow";
import vietnamUnits34 from "@/data/vietnam-units-34.json";

interface FinalCTAProps {
  lang?: "vi" | "en";
}

const productOptions = [
  "Cửa nhôm cầu cách nhiệt (EA55 – EA95i)",
  "Cửa nhựa uPVC tiêu chuẩn Châu Âu Kömmerling",
  "Cửa gỗ tự nhiên & gỗ chống cháy (60 - 120 phút)",
  "Sản phẩm kính (Kính Low-E, kính hộp, kính dán an toàn, kính điện)",
  "Cửa tự động thông minh & cửa xoay",
  "Cửa cuốn nhôm khe thoáng EASD45",
  "Tư vấn giải pháp tổng thể kiến trúc công trình",
];

export default function FinalCTA({ lang = "vi" }: FinalCTAProps) {
  const isEn = lang === "en";

  // 34 Provinces and post-merger wards from thanglequoc/vietnamese-provinces-database
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>("Thành phố Hồ Chí Minh");

  const currentProvince = useMemo(() => {
    return (
      vietnamUnits34.find((p) => p.name === selectedProvinceName) ||
      vietnamUnits34[0]
    );
  }, [selectedProvinceName]);

  const wardsList = useMemo(() => {
    return (currentProvince?.wards || []).slice().sort((a, b) => a.localeCompare(b, "vi"));
  }, [currentProvince]);

  const [selectedWard, setSelectedWard] = useState<string>(() => {
    const defaultProvince = vietnamUnits34.find((p) => p.name === "Thành phố Hồ Chí Minh");
    const found = defaultProvince?.wards.find((w) => w.includes("Tân Định"));
    return found || defaultProvince?.wards[0] || "";
  });

  const [streetAddress, setStreetAddress] = useState("");

  // Contact States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(productOptions[0]);
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleProvinceChange = (provinceName: string) => {
    setSelectedProvinceName(provinceName);
    const p = vietnamUnits34.find((item) => item.name === provinceName);
    if (p && p.wards.length > 0) {
      if (provinceName === "Thành phố Hồ Chí Minh") {
        const found = p.wards.find((w) => w.includes("Tân Định"));
        setSelectedWard(found || p.wards[0]);
      } else {
        setSelectedWard(p.wards[0]);
      }
    } else {
      setSelectedWard("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Vui lòng nhập họ và tên.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Vui lòng nhập số điện thoại liên hệ.");
      return;
    }

    const fullFormattedAddress = [
      streetAddress.trim(),
      selectedWard,
      selectedProvinceName,
    ]
      .filter(Boolean)
      .join(", ");

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: fullFormattedAddress,
          product: selectedProduct,
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.error || "Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại hoặc gọi Hotline."
        );
      }
    } catch {
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng liên hệ Hotline: 0966 994 338.");
    } finally {
      setSubmitting(false);
    }
  };

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3490799981454!2d106.6961703758384!3d10.785258789364115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f37249c69cb%3A0xa546f92e33f90d78!2sCty%20c%E1%BB%95%20ph%E1%BA%A7n%20EUROWINDOW!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s";

  const googleMapsDirectionsUrl = "https://maps.app.goo.gl/7CEjrBTxbV1uYYdq5";

  return (
    <section
      id="lien-he-tu-van"
      className="relative overflow-hidden bg-[#06101f] py-20 sm:py-28 text-white border-t border-white/10"
    >
      {/* Background Architectural Glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#1677FF]/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C9A227]/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A227]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
              {isEn ? "EXPERIENCE & CONSULTATION" : "ĐỒNG HÀNH CÙNG CÔNG TRÌNH CỦA BẠN"}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.18]">
            {isEn
              ? "Creating Distinctive Spaces With Eurowindow"
              : "Kiến Tạo Không Gian Khác Biệt Cùng Eurowindow"}
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#D2D8E3]">
            {isEn
              ? "Visit our flagship showroom or send your project inquiry for direct on-site consultation, CAD design, and certified estimations."
              : "Trải nghiệm trực tiếp các giải pháp cửa Châu Âu tại Eurowindow Miền Nam (39 Bis Mạc Đĩnh Chi, P. Tân Định, TP. Hồ Chí Minh) hoặc gửi thông tin công trình để nhận tư vấn và báo giá chi tiết tận nơi."}
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Form + Right Google Maps */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* ── LEFT COLUMN: CONSULTATION FORM (7 COLS) ── */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/15 bg-[#0c1c33]/85 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Đăng Ký Tư Vấn &amp; Báo Giá Dự Toán
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Khảo sát hiện trường &bull; Dự toán kỹ thuật miễn phí trong 24h
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#C9A227]/10 px-3 py-1 border border-[#C9A227]/30 text-[11px] font-bold text-[#C9A227]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Chính Hãng</span>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A227]/20 text-[#C9A227]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Gửi Yêu Cầu Thành Công!
                  </h4>
                  <p className="text-sm text-[#D2D8E3] max-w-md mx-auto">
                    Cảm ơn Quý khách. Chuyên viên kỹ thuật Eurowindow sẽ liên hệ qua số điện thoại{" "}
                    <strong className="text-[#C9A227]">{phone}</strong> để khảo sát và gửi phương án tối ưu nhất.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="btn-secondary-outline mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
                  >
                    Gửi Yêu Cầu Khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {errorMessage && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D2D8E3] mb-1.5">
                        Họ và tên <span className="text-[#C9A227]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-xl border border-white/15 bg-[#06101f]/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D2D8E3] mb-1.5">
                        Số điện thoại <span className="text-[#C9A227]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        className="w-full rounded-xl border border-white/15 bg-[#06101f]/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      />
                    </div>
                  </div>

                  {/* 34 Provinces and Post-Merger Wards */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="final-cta-province" className="block text-[11px] font-bold uppercase tracking-wider text-[#D2D8E3] mb-1.5">
                        Tỉnh / Thành phố (34 tỉnh thành) <span className="text-[#C9A227]">*</span>
                      </label>
                      <select
                        id="final-cta-province"
                        aria-label="Tỉnh hoặc Thành phố"
                        value={selectedProvinceName}
                        onChange={(e) => handleProvinceChange(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-[#06101f] px-4 py-3 text-sm text-white outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      >
                        {vietnamUnits34.map((p) => (
                          <option key={p.code} value={p.name} className="bg-[#06101f] text-white">
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="final-cta-ward" className="block text-[11px] font-bold uppercase tracking-wider text-[#D2D8E3] mb-1.5">
                        Phường / Xã (Sau sáp nhập) <span className="text-[#C9A227]">*</span>
                      </label>
                      <select
                        id="final-cta-ward"
                        aria-label="Phường hoặc Xã"
                        value={selectedWard}
                        onChange={(e) => setSelectedWard(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-[#06101f] px-4 py-3 text-sm text-white outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      >
                        {wardsList.map((w) => (
                          <option key={w} value={w} className="bg-[#06101f] text-white">
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Street and Product */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="final-cta-street" className="block text-[11px] font-bold uppercase tracking-wider text-[#D2D8E3] mb-1.5">
                        Địa chỉ chi tiết (Số nhà, tên đường)
                      </label>
                      <input
                        id="final-cta-street"
                        aria-label="Địa chỉ chi tiết"
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Số 39 Bis Mạc Đĩnh Chi..."
                        className="w-full rounded-xl border border-white/15 bg-[#06101f]/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      />
                    </div>

                    <div>
                      <label htmlFor="final-cta-product" className="block text-[11px] font-bold uppercase tracking-wider text-[#D2D8E3] mb-1.5">
                        Dòng sản phẩm quan tâm
                      </label>
                      <select
                        id="final-cta-product"
                        aria-label="Dòng sản phẩm quan tâm"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-[#06101f] px-4 py-3 text-sm text-white outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                      >
                        {productOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#06101f] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Requirements / Note */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D2D8E3] mb-1.5">
                      Quy mô công trình &amp; Ghi chú yêu cầu (Tùy chọn)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ví dụ: Biệt thự 3 tầng cần báo giá 12 bộ cửa nhôm EA55 và vách kính Low-E..."
                      className="w-full rounded-xl border border-white/15 bg-[#06101f]/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold-luxury w-full py-4 text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(201,162,39,0.35)]"
                  >
                    {submitting ? (
                      isEn ? "Sending..." : "Đang gửi..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>{isEn ? "SEND INQUIRY" : "Gửi Liên Hệ"}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-[#94A3B8]">
              <span>Cam kết bảo mật 100% thông tin khách hàng</span>
              <span className="text-[#C9A227] font-semibold">Tư vấn tận nơi miễn phí</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: SHOWROOM INFO + GOOGLE MAP (5 COLS) ── */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Showroom Detail Card */}
            <div className="rounded-3xl border border-white/15 bg-[#0c1c33]/85 p-6 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#C9A227]">
                  SHOWROOM MIỀN NAM
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Đang Mở Cửa
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Eurowindow Miền Nam
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#D2D8E3]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A227]" />
                  <span>
                    <strong>Địa chỉ:</strong> 39 Bis Mạc Đĩnh Chi, Phường Tân Định, TP. Hồ Chí Minh
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-[#C9A227]" />
                  <span>
                    <strong>Hotline:</strong>{" "}
                    <a href={`tel:${contact.hotline.replace(/\s+/g, "")}`} className="text-[#C9A227] hover:underline font-bold">
                      {contact.hotline}
                    </a>{" "}
                    &bull; (84 - 28) 6278 8124
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-[#C9A227]" />
                  <span>
                    <strong>Giờ làm việc:</strong> Thứ 2 – Thứ 7: 08:00 – 18:00
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-outline w-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-white/20 hover:border-[#C9A227]"
                >
                  <Navigation className="h-3.5 w-3.5 text-[#C9A227]" />
                  <span>Chỉ Đường Trên Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#94A3B8]" />
                </a>
              </div>
            </div>

            {/* Embedded Live Google Map */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#06101f] shadow-2xl flex-1 min-h-[320px] sm:min-h-[360px]">
              <iframe
                src={mapEmbedUrl}
                title="Bản đồ vị trí Eurowindow Miền Nam - 39 Bis Mạc Đĩnh Chi, P. Tân Định, TP. Hồ Chí Minh"
                className="w-full h-full min-h-[320px] sm:min-h-[360px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 rounded-lg border border-white/10 bg-[#06101f]/90 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                📍 39 Bis Mạc Đĩnh Chi, P. Tân Định
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
