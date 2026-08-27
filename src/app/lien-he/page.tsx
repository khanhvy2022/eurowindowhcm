"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

export default function ContactPage() {
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
    <div className="min-h-screen bg-[#071523] text-white">
      <Header />

      <PageBanner
        title="Liên Hệ Eurowindow"
        sub="Đồng hành cùng khách hàng kiến tạo không gian sống hiện đại, an toàn và đẳng cấp trên toàn quốc."
        crumb="Liên hệ"
        bgImage="/eurowindow/banner-02-1.png.webp"
      />

      <main className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 lg:py-20">
        {/* Top Feature Cards */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Hotline Tư Vấn 24/7
            </h3>
            <a
              href={`tel:${contact.hotline.replace(/\s+/g, "")}`}
              className="mt-1 block text-xl font-extrabold text-[#E2C275] hover:underline"
            >
              {contact.hotline}
            </a>
            <p className="mt-2 text-xs text-[#D2D8E3]">
              Tư vấn kỹ thuật & báo giá nhanh chóng cho mọi công trình.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Email Tiếp Nhận
            </h3>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block text-base font-bold text-white hover:text-[#E2C275]"
            >
              {contact.email}
            </a>
            <p className="mt-2 text-xs text-[#D2D8E3]">
              Phản hồi hồ sơ thiết kế, dự toán trong vòng 2 giờ làm việc.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Chi Nhánh Miền Nam
            </h3>
            <p className="mt-1 text-sm font-semibold leading-snug text-white">
              39 Bis Mạc Đĩnh Chi, P. Tân Định, TP.HCM
            </p>
            <p className="mt-2 text-xs text-[#D2D8E3]">
              Showroom trải nghiệm thực tế các hệ cửa cao cấp nhất.
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-[#E2C275]/50 hover:bg-white/[0.08]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2C275]/10 text-[#E2C275] transition group-hover:scale-110">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
              Trụ Sở Chính
            </h3>
            <p className="mt-1 text-sm font-semibold leading-snug text-white">
              Eurowindow Office, 02 Tôn Thất Tùng, Hà Nội
            </p>
            <p className="mt-2 text-xs text-[#D2D8E3]">
              Trung tâm điều hành & văn phòng dự án toàn quốc.
            </p>
          </div>
        </section>

        {/* Main Grid: Form + Address Info */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                <Sparkles className="h-3.5 w-3.5" /> Gửi Yêu Cầu Báo Giá
              </div>
              <h2 className="mt-4 text-2xl font-black uppercase text-white sm:text-3xl">
                Tư Vấn & Khảo Sát Tận Nơi
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#D2D8E3]">
                Quý khách vui lòng để lại thông tin công trình. Chuyên viên Eurowindow sẽ liên hệ tư vấn và gửi bảng dự toán chi tiết trong thời gian sớm nhất.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-8 text-center backdrop-blur-xl">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Gửi yêu cầu thành công!
                  </h3>
                  <p className="mt-2 text-sm text-emerald-200/90">
                    Cảm ơn Quý khách. Đội ngũ tư vấn kỹ thuật Eurowindow sẽ liên hệ qua số điện thoại <strong>{form.phone}</strong> trong vòng 15-30 phút.
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
                    className="mt-6 rounded-xl border border-emerald-500/40 px-5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/20 transition"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {errorMessage ? (
                    <div className="rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-200">
                      {errorMessage}
                    </div>
                  ) : null}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                        Họ và tên <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                        Số điện thoại <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="0966 994 338"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                        Email (tùy chọn)
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@example.com"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                        Địa chỉ công trình / Tỉnh thành
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Quận 1, TP.HCM / Đà Nẵng / Hà Nội"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Dòng sản phẩm quan tâm
                    </label>
                    <select
                      value={form.product}
                      onChange={(e) => setForm({ ...form, product: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/15 bg-[#102238] px-4 py-3 text-sm text-white outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                    >
                      {productOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#071523] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#D2D8E3]">
                      Nội dung yêu cầu / Kích thước ước tính
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ví dụ: Công trình biệt thự 3 tầng, cần báo giá 12 bộ cửa đi mở quay nhôm EA55 và 8 vách kính lớn..."
                      className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition focus:border-[#E2C275] focus:ring-1 focus:ring-[#E2C275]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold-luxury flex w-full items-center justify-center gap-2 py-3.5 text-sm font-extrabold uppercase tracking-wider"
                  >
                    {submitting ? (
                      "Đang gửi yêu cầu..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Gửi Yêu Cầu Tư Vấn Ngay
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Office info & Commitments (5 cols) */}
          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
                Hệ Thống Trụ Sở & Chi Nhánh
              </h3>

              <div className="mt-6 space-y-6 text-sm">
                <div className="border-l-2 border-[#E2C275] pl-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E2C275]">
                    Khu vực Miền Nam
                  </div>
                  <div className="mt-1 font-bold text-white">
                    Chi Nhánh TP. Hồ Chí Minh
                  </div>
                  <div className="mt-1 text-xs text-[#D2D8E3]">
                    39 Bis Mạc Đĩnh Chi, Phường Tân Định, TP.HCM
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#E2C275]">
                    <Phone className="h-3.5 w-3.5" /> Hotline: 0966 994 338
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
                    Số 02 Tôn Thất Tùng, Kim Liên, Q. Đống Đa, Hà Nội
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#D2D8E3]">
                    <Phone className="h-3.5 w-3.5" /> Hotline: 0966 994 338
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
                    Số 02 Nguyễn Hữu Thọ, Q. Hải Châu, TP. Đà Nẵng
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#D2D8E3]">
                    <Phone className="h-3.5 w-3.5" /> Hotline: 0966 994 338
                  </div>
                </div>
              </div>
            </div>

            {/* Commitments Box */}
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#102238] to-[#071523] p-6 backdrop-blur-xl sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#E2C275]">
                Cam Kết Từ Eurowindow
              </h3>
              <div className="mt-5 space-y-4">
                {commitments.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <div key={i} className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E2C275]/10 text-[#E2C275]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wide text-white">
                          {c.title}
                        </h4>
                        <p className="mt-0.5 text-xs leading-5 text-[#D2D8E3]">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
