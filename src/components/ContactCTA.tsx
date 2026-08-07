"use client";
import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Clock, ShieldCheck, CheckCircle2, MessageSquare, X, ChevronUp, Navigation, MessageCircle } from "lucide-react";

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    projectType: "biet-thu",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.fullName) return;
    setSubmitted(true);
  };

  return (
    <section id="lien-he" className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#1677FF]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#E2C275]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Contact Info & Branches */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#E2C275]">
                Đối Tác Đáng Tin Cậy
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                LIÊN HỆ TƯ VẤN KIẾN TRÚC &amp; BÁO GIÁ
              </h2>
              <p className="text-sm leading-relaxed text-[#D2D8E3]">
                Đội ngũ KTS &amp; Chuyên gia kỹ thuật Eurowindow luôn sẵn sàng tư vấn trực tiếp tận nơi, đưa ra giải pháp vật liệu tối ưu nhất cho từng hạng mục công trình.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="glass-card flex items-start gap-4 p-5">
                <div className="shrink-0 rounded-xl bg-[#E2C275]/15 p-3 text-[#E2C275]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Showroom &amp; Văn Phòng Eurowindow HCM</h4>
                  <p className="mt-1 text-xs leading-5 text-[#D2D8E3]">
                    Trụ sở TP. Hồ Chí Minh &amp; Các chi nhánh toàn quốc
                  </p>
                </div>
              </div>

              <div className="glass-card flex items-start gap-4 p-5">
                <div className="shrink-0 rounded-xl bg-[#E2C275]/15 p-3 text-[#E2C275]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Hotline Tư Vấn Dự Án (24/7)</h4>
                  <p className="mt-1 text-base font-extrabold text-[#E2C275]">
                    1900 636 038 · 0942 62 64 69
                  </p>
                  <p className="mt-0.5 text-xs text-[#94A3B8]">Phòng tư vấn giải pháp: 0946 80 80 82</p>
                </div>
              </div>

              <div className="glass-card flex items-start gap-4 p-5">
                <div className="shrink-0 rounded-xl bg-[#E2C275]/15 p-3 text-[#E2C275]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Email &amp; Thời Gian Làm Việc</h4>
                  <p className="mt-1 text-xs text-[#D2D8E3]">info@eurowindowhcm.com.vn</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#94A3B8]">
                    <Clock className="h-3.5 w-3.5 text-[#E2C275]" />
                    Thứ 2 - Thứ 7: 08:00 - 17:30
                  </p>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="glass-card border-[#E2C275]/30 bg-[#E2C275]/10 p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E2C275]">
                <ShieldCheck className="h-4 w-4" />
                <span>Cam kết chính hãng Eurowindow</span>
              </div>
              <p className="text-xs text-[#D2D8E3]">
                Khảo sát &amp; Tư vấn bản vẽ kỹ thuật miễn phí. Sản phẩm bảo hành chính hãng lên đến 10 - 25 năm.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="glass-card p-6 sm:p-10 lg:col-span-7">
            <h3 className="text-2xl font-extrabold text-white">
              Đăng ký tư vấn &amp; Nhận báo giá công trình
            </h3>
            <p className="mt-2 text-xs text-[#D2D8E3] sm:text-sm">
              Điền thông tin bên dưới, chuyên viên tư vấn Eurowindow sẽ liên hệ gửi catalog &amp; bảng báo giá chi tiết trong 30 phút.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  Gửi yêu cầu thành công!
                </h4>
                <p className="mx-auto max-w-md text-xs text-[#D2D8E3] sm:text-sm">
                  Cảm ơn quý khách <strong>{formData.fullName}</strong>. Chuyên viên tư vấn Eurowindow sẽ gọi lại qua số điện thoại <strong>{formData.phone}</strong> trong thời gian sớm nhất!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-gold-luxury mt-4 text-xs font-bold uppercase tracking-wider"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#94A3B8] outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#94A3B8] outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Địa điểm công trình
                    </label>
                    <input
                      type="text"
                      placeholder="Tỉnh / Thành phố"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#94A3B8] outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Hạng mục sản phẩm
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full rounded-xl border border-white/15 bg-[#102238] px-4 py-3 text-sm text-white outline-none transition focus:border-[#E2C275]"
                    >
                      <option value="biet-thu">Cửa nhôm &amp; Vách nhôm kính lớn</option>
                      <option value="nha-pho">Cửa nhựa uPVC cao cấp</option>
                      <option value="thi-cong-tho">Cửa gỗ &amp; Cửa chống cháy</option>
                      <option value="tron-goi">Sản phẩm kính &amp; Kính an toàn</option>
                      <option value="noi-that">Cửa tự động &amp; Cửa xoay</option>
                      <option value="cai-tao">Cửa cuốn nhôm khe thoáng</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                    Ghi chú chi tiết (Kích thước, quy mô công trình, tiến độ...):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ví dụ: Công trình biệt thự 3 tầng, cần giải pháp cách âm cách nhiệt tốt..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#94A3B8] outline-none backdrop-blur-md transition focus:border-[#E2C275]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold-luxury w-full py-4 text-xs uppercase tracking-widest"
                >
                  <Send className="h-4 w-4" />
                  Gửi yêu cầu nhận báo giá &amp; tư vấn ngay
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Floating Interactive Speed-Dial VR Contact Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {speedDialOpen && (
          <div className="mb-2 flex flex-col items-end space-y-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <a
              href="https://zalo.me/0942626469"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-2xl transition hover:bg-blue-700"
            >
              <span>Chat Zalo</span>
              <MessageCircle className="h-4 w-4" />
            </a>

            <a
              href="tel:1900636038"
              className="btn-gold-luxury px-4 py-2.5 text-xs tracking-wider"
            >
              <span>Hotline: 1900 636 038</span>
              <Phone className="h-4 w-4" />
            </a>

            <a
              href="https://maps.google.com/?q=Eurowindow+HCM"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-2xl transition hover:bg-emerald-700"
            >
              <span>Chỉ đường đến Showroom</span>
              <Navigation className="h-4 w-4" />
            </a>
          </div>
        )}

        <button
          onClick={() => setSpeedDialOpen(!speedDialOpen)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#E2C275] to-[#F0D18A] text-[#071523] shadow-2xl transition hover:scale-110"
          title="Liên hệ nhanh Eurowindow"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[#E2C275] animate-pulse-ring" />
          {speedDialOpen ? <X className="z-10 h-6 w-6" /> : <Phone className="z-10 h-6 w-6 animate-bounce" />}
        </button>
      </div>
    </section>
  );
}
