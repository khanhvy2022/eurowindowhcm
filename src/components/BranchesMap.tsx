"use client";
import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, ExternalLink, Globe } from "lucide-react";

export default function BranchesMap() {
  const [activeBranch, setActiveBranch] = useState(0);

  const branches = [
    {
      id: "hcm",
      name: "Showroom Eurowindow TP. Hồ Chí Minh",
      address: "282 Nguyễn Trãi, Phường 10, Quận Phú Nhuận, TP. Hồ Chí Minh",
      phone: "0942 62 64 69 . 1900 636 038",
      email: "hcm@eurowindow.biz",
      hours: "Thứ 2 - Thứ 7: 08:00 - 17:30",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.124673809623!2d106.6663583!3d10.8017778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529241b7145ed%3A0x6b772c6cf1f09c68!2zMjgyIE5ndXnhu4VuIFRy4buNbmcgVHV54buDniwgUGjGsOG7nW5nIDEwLCBQaMO6IE5odeG6rW4sIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
      badge: "Showroom Miền Nam",
    },
    {
      id: "ha-noi",
      name: "Trụ Sở Chính Eurowindow Hà Nội",
      address: "Tòa nhà Eurowindow Office Building, 2 Tôn Thất Tùng, Đống Đa, Hà Nội",
      phone: "024 3747 4700",
      email: "Thangtq2@eurowindow.biz",
      hours: "Thứ 2 - Thứ 7: 08:00 - 17:30",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d105.83!3d21.00!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAwJzAwLjAiTiAxMDXCsDQ5JzQ4LjAiRQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
      badge: "Trụ Sở Chính",
    },
    {
      id: "da-nang",
      name: "Văn Phòng Chi Nhánh Đà Nẵng",
      address: "Đường Nguyễn Văn Linh, Quận Thanh Khê, TP. Đà Nẵng",
      phone: "0236 3747 470",
      email: "danang@eurowindow.biz",
      hours: "Thứ 2 - Thứ 7: 08:00 - 17:30",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0!2d108.21!3d16.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzM2LjAiTiAxMDjCsDEyJzM2LjAiRQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
      badge: "Chi Nhánh Miền Trung",
    },
    {
      id: "binh-duong",
      name: "Nhà Máy Sản Xuất Eurowindow Bình Dương",
      address: "KCN Tân Đông Hiệp B, Dĩ An, Tỉnh Bình Dương",
      phone: "0274 3747 470",
      email: "factory@eurowindow.biz",
      hours: "Thứ 2 - Thứ 7: 07:30 - 17:00",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7!2d106.75!3d10.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU0JzM2LjAiTiAxMDbCsDQ1JzAwLjAiRQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
      badge: "Nhà Máy Công Nghệ Cao",
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
