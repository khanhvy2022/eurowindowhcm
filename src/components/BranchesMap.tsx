"use client";
import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, ExternalLink, Globe } from "lucide-react";

export default function BranchesMap() {
  const [activeBranch, setActiveBranch] = useState(0);

  const branches = [
    {
      id: "hcm",
      name: "Showroom Eurowindow Mạc Đĩnh Chi (Chi Nhánh Miền Nam)",
      address: "39 Bis Mạc Đĩnh Chi, Phường Tân Định, Quận 1, TP. Hồ Chí Minh",
      phone: "(84 - 28) 6278 8124 · 0966 994 338",
      email: "Showroom.mdc@eurowindow.biz",
      hours: "Thứ 2 - Thứ 7: 08:00 - 18:00",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3490799981454!2d106.6961703758384!3d10.785258789364115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f37249c69cb%3A0xa546f92e33f90d78!2sCty%20c%E1%BB%95%20ph%E1%BA%A7n%20EUROWINDOW!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s",
      badge: "Showroom Miền Nam",
    },
    {
      id: "ha-noi",
      name: "Trụ Sở Chính Eurowindow Hà Nội",
      address: "Tòa nhà Eurowindow Office Building, Số 02 Tôn Thất Tùng, Kim Liên, Đống Đa, Hà Nội",
      phone: "(84 - 24) 37 47 47 00 · 0909 888 000",
      email: "infoew@eurowindow.biz",
      hours: "Thứ 2 - Thứ 7: 08:00 - 17:30",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6659216050134!2d105.828461314407!3d21.006024693931064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abbc499419d3%3A0x10a7662c32cc6067!2sEurowindow%20Office%20Building!5e0!3m2!1svi!2s!4v1648548798380!5m2!1svi!2s",
      badge: "Trụ Sở Chính",
    },
    {
      id: "da-nang",
      name: "Showroom Eurowindow Phan Đăng Lưu (Chi Nhánh Miền Trung)",
      address: "152 Phan Đăng Lưu, Phường Hòa Cường, TP. Đà Nẵng",
      phone: "(84 - 236) 3 582 877 · 0906 000 111",
      email: "cn-dn@eurowindow.biz",
      hours: "Thứ 2 - Thứ 7: 08:00 - 17:30",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.428414441434!2d108.21443421477028!3d16.04323798889709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c6e5c9ab69%3A0xe54e69a039755ab0!2zMTUyIFBoYW4gxJDEg25nIEzGsHUsIEhvw6AgQ8aw4budbmcgQuG6r2MsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1650000000000!5m2!1svi!2s",
      badge: "Chi Nhánh Miền Trung",
    },
    {
      id: "binh-duong",
      name: "Nhà Máy Sản Xuất Eurowindow Phía Nam",
      address: "ĐT745, P. Tân Uyên, TP. Hồ Chí Minh",
      phone: "0966 994 338",
      email: "factory@eurowindow.biz",
      hours: "Thứ 2 - Thứ 7: 07:30 - 17:00",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7!2d106.75!3d10.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU0JzM2LjAiTiAxMDbCsDQ1JzAwLjAiRQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
      badge: "Nhà Máy Sản Xuất",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#071523] py-24 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#1677FF]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Title */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2C275]/30 bg-[#E2C275]/10 px-4 py-1.5 backdrop-blur-md">
            <Globe className="h-4 w-4 text-[#E2C275]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2C275]">
              MẠNG LƯỚI CHI NHÁNH TOÀN QUỐC
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            HỆ THỐNG SHOWROOM &amp; NHÀ MÁY EUROWINDOW
          </h2>
          <p className="text-sm text-[#D2D8E3] sm:text-base">
            Eurowindow hiện diện tại Hà Nội, TP.HCM, Đà Nẵng và hệ thống 5 nhà máy sản xuất vật liệu xây dựng quy mô lớn trên toàn quốc.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Branch List */}
          <div className="space-y-4 lg:col-span-5">
            {branches.map((b, idx) => (
              <div
                key={b.id}
                onClick={() => setActiveBranch(idx)}
                className={`glass-card cursor-pointer p-5 backdrop-blur-xl transition duration-300 ${
                  activeBranch === idx
                    ? "border-[#E2C275] bg-[#102238] shadow-2xl scale-[1.01]"
                    : "opacity-80 hover:opacity-100 hover:border-white/20"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      activeBranch === idx
                        ? "bg-[#E2C275] text-[#071523]"
                        : "bg-white/10 text-[#D2D8E3]"
                    }`}
                  >
                    {b.badge}
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#E2C275]" />
                </div>

                <h3 className="mb-2 text-base font-extrabold text-white">{b.name}</h3>

                <div className="space-y-2 text-xs text-[#D2D8E3]">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E2C275]" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-[#E2C275]" />
                    <span className="font-bold text-white">{b.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Map Preview Container */}
          <div className="glass-card overflow-hidden p-2 lg:col-span-7 backdrop-blur-2xl">
            <div className="h-full min-h-[420px] w-full overflow-hidden rounded-xl bg-[#102238]">
              <iframe
                src={branches[activeBranch].mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "440px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={branches[activeBranch].name}
                className="h-full w-full filter contrast-125 saturate-75"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
