"use client";

import PageBanner from "@/components/PageBanner";
import { contact } from "@/data/eurowindow";
import {
  Building2,
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const productOptions = [
  "Cửa nhôm & vách nhôm kính lớn (EA55 - EA95i)",
  "Cửa nhựa uPVC tiêu chuẩn Châu Âu",
  "Cửa gỗ tự nhiên & gỗ công nghiệp",
  "Cửa gỗ chống cháy (60 - 120 phút)",
  "Sản phẩm kính (Kính dán, cường lực, Low-E, hộp kính)",
  "Cửa tự động & cửa trượt thông minh",
  "Cửa cuốn nhôm khe thoáng",
  "Tư vấn giải pháp tổng thể công trình",
];

const commitments = [
  {
    icon: Headphones,
    title: "Tư Vấn Miễn Phí 24/7",
    desc: "Đội ngũ chuyên viên kỹ thuật giàu kinh nghiệm sẵn sàng giải đáp và tư vấn phương án tối ưu.",
  },
  {
    icon: Clock,
    title: "Báo Giá Nhanh Trong 24H",
    desc: "Khảo sát thực tế hiện trường và gửi bản vẽ, bảng bóc tách chi phí chuẩn xác, minh bạch.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo Hành Chính Hãng Đến 10 Năm",
    desc: "Cam kết chất lượng profile, phụ kiện kim khí đồng bộ và dịch vụ bảo trì định kỳ tận nơi.",
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    product: productOptions[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!form.fullName.trim() || !form.phone.trim()) {
      setErrorMessage("Vui lòng điền họ tên và số điện thoại liên hệ.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.");
      }
    } catch {
      setErrorMessage("Không thể kết nối đến máy chủ. Vui lòng liên hệ hotline 0966 994 338.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageBanner
        title="Liên Hệ Eurowindow"
        sub="Đồng hành cùng khách hàng kiến tạo không gian sống hiện đại, an toàn và đẳng cấp trên toàn quốc."
        crumb="Liên hệ"
      />

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Hotline Miền Nam
              </h3>
              <p className="mt-2 text-lg font-bold text-white">
                <a href={`tel:${contact.hotline.replace(/\s+/g, "")}`} className="hover:text-[#E2C275]">
                  {contact.hotline}
                </a>
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">(84 - 28) 6278 8124</p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Hotline Miền Bắc
              </h3>
              <p className="mt-2 text-lg font-bold text-white">
                <a href={`tel:${contact.hotlineNorth.replace(/\s+/g, "")}`} className="hover:text-[#E2C275]">
                  {contact.hotlineNorth}
                </a>
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">(84 - 24) 37 47 47 00</p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Email Liên Hệ
              </h3>
              <p className="mt-2 text-sm font-bold text-white">
                <a href={`mailto:${contact.email}`} className="hover:text-[#E2C275]">
                  {contact.email}
                </a>
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">Phản hồi trong 24h</p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                Showroom TP.HCM
              </h3>
              <p className="mt-2 text-sm font-bold text-white">
                39 Bis Mạc Đĩnh Chi, P. Tân Định, TP.HCM
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">Mở cửa: 8h00 - 18h00</p>
            </div>
          </div>

          {/* Form + Information */}
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Contact Form (7 cols) */}
            <div className="glass-card rounded-3xl p-8 sm:p-10 lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                <Sparkles className="h-4 w-4" />
                <span>Tư Vấn Trực Tuyến</span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Gửi Yêu Cầu Cho Chúng Tôi
              </h2>
              <p className="mt-2 text-xs text-[#D2D8E3]">
                Điền thông tin bên dưới, chuyên viên Eurowindow sẽ liên hệ khảo sát và tư vấn giải pháp tối ưu trong 24h.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Gửi Yêu Cầu Thành Công!
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#D2D8E3]">
                    Cảm ơn Quý khách đã tin tưởng Eurowindow. Chuyên viên kinh doanh khu vực sẽ liên hệ qua số điện thoại{" "}
                    <strong className="text-[#E2C275]">{form.phone}</strong> trong thời gian sớm nhất.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        fullName: "",
                        phone: "",
                        email: "",
                        address: "",
                        product: productOptions[0],
                        message: "",
                      });
                    }}
                    className="btn-primary mt-6 px-6 py-2.5 text-xs uppercase tracking-wider"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {errorMessage && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Họ và tên <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Số điện thoại <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="09xx xxx xxx"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Email liên hệ
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@example.com"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Địa chỉ / Khu vực công trình
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Quận/Huyện, Tỉnh/Thành..."
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Sản phẩm quan tâm
                    </label>
                    <select
                      value={form.product}
                      onChange={(e) => setForm({ ...form, product: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#071523] px-4 py-3 text-sm text-white outline-none transition focus:border-[#E2C275]"
                    >
                      {productOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#071523] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Nội dung yêu cầu / Ghi chú công trình
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Mô tả sơ bộ về công trình, kích thước hoặc các yêu cầu kỹ thuật đặc biệt..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#E2C275] focus:bg-white/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider"
                  >
                    {submitting ? (
                      "Đang gửi thông tin..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Gửi Yêu Cầu Tư Vấn Ngay
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[#94A3B8]">
                    Cam kết bảo mật 100% thông tin cá nhân theo chính sách quyền riêng tư.
                  </p>
                </form>
              )}
            </div>

            {/* Right: Commitments & Network info (5 cols) */}
            <div className="space-y-6 lg:col-span-5">
              {/* Commitments */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#E2C275]">
                  Cam Kết Chất Lượng Dịch Vụ
                </h3>
                <div className="mt-6 space-y-6">
                  {commitments.map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2C275]/15 text-[#E2C275]">
                        <c.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{c.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#D2D8E3]">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Details */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#E2C275]">
                  <Building2 className="h-4 w-4" />
                  <span>Hệ Thống Trụ Sở &amp; Chi Nhánh</span>
                </h3>

                <div className="mt-6 space-y-6 text-sm">
                  <div className="border-l-2 border-[#E2C275] pl-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                      Khu vực Miền Nam
                    </div>
                    <div className="mt-1 font-bold text-white">
                      Eurowindow Miền Nam
                    </div>
                    <div className="mt-1 text-xs text-[#D2D8E3]">
                      39 Bis Mạc Đĩnh Chi, Phường Tân Định, TP. Hồ Chí Minh
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#E2C275]">
                      <Phone className="h-3.5 w-3.5" /> Hotline: 0966 994 338 &bull; (84 - 28) 6278 8124
                    </div>
                  </div>

                  <div className="border-l-2 border-white/30 pl-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Khu vực Miền Bắc (Trụ sở chính)
                    </div>
                    <div className="mt-1 font-bold text-white">
                      Tòa nhà Eurowindow Office Building
                    </div>
                    <div className="mt-1 text-xs text-[#D2D8E3]">
                      Số 02 Tôn Thất Tùng, Kim Liên, Đống Đa, Hà Nội
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
                      <Phone className="h-3.5 w-3.5" /> Hotline: 0909 888 000 &bull; (84 - 24) 37 47 47 00
                    </div>
                  </div>

                  <div className="border-l-2 border-white/30 pl-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                      Khu vực Miền Trung
                    </div>
                    <div className="mt-1 font-bold text-white">
                      Chi Nhánh Đà Nẵng
                    </div>
                    <div className="mt-1 text-xs text-[#D2D8E3]">
                      152 Phan Đăng Lưu, Phường Hòa Cường, Đà Nẵng
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
                      <Phone className="h-3.5 w-3.5" /> Hotline: 0906 000 111 &bull; (84 - 236) 3 582 877
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
