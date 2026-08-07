# Strategic Partners — Logo Slider Spec

> Source: `https://catmoc.cmg.vn` — section "ĐỐI TÁC CHIẾN LƯỢC" (`.album-doitac`).

## Structure
- Container: `.row.album-doitac.large-columns-6 medium-columns-3 small-columns-2` — **slick slider**, autoplay, loop.
- **No arrows / no dots** visible. Purely autoplay loop.
- 7 slides (real partner logos as images, NOT text).

## Slide / Image geometry
| Prop | Value |
|---|---|
| slide width | 224px (slide count → ~6 per row on desktop) |
| img width | 194px |
| aspect-ratio | **12 / 7** (`aspect-ratio: 12/7`) |
| object-fit | `contain` |
| display | block, centered via `.box-image { display: inline-flex; align-items: center; justify-content: center }` |

## Logo styling
- **Default:** `filter: grayscale(1)` → zinc/grey look.
- **Hover:** `filter: grayscale(0)` → full color.
- Transition: `filter 0.6s` (via `.has-hover` default transition).
- No zoom, no brightness, no overlay on hover for this section.

## Autoplay
- Autoplay, `delay ~2400ms`, continuous loop (slick defaults), no user controls.

## Asset URLs (downloaded → `public/partners/`)
| File | Original URL |
|---|---|
| `log1.png` | `.../uploads/2025/01/log1.png` (700×269) |
| `logo2.png` | `.../uploads/2025/01/logo2.png` (1200×469) |
| `logo3.png` | `.../uploads/2025/01/logo3.png` (800×385) |
| `logo4.png` | `.../uploads/2025/01/logo4.png` (1372×839) |
| `logo5.png` | `.../uploads/2025/01/logo5.png` (1200×700) |
| `logo6.png` | `.../uploads/2025/01/logo6.png` (800×342) |
| `logo7.png` | `.../uploads/2025/01/logo7.png` (737×165) |

## Tailwind translation (ours)
```tsx
<Swiper modules={[Autoplay]} autoplay={{ delay: 2400, disableOnInteraction: false }} loop speed={750}
  spaceBetween={18} slidesPerView={1.8}
  breakpoints={{ 640: { slidesPerView: 3.2 }, 1024: { slidesPerView: 5.2 }, 1440: { slidesPerView: 6.2 } }}
  className="!overflow-visible">
  {logos.map((src) => (
    <SwiperSlide key={src}>
      <div className="flex h-28 items-center justify-center md:h-32">
        <img src={src} alt="" className="aspect-[12/7] w-[194px] max-w-full object-contain
          grayscale transition-[filter] duration-500 hover:grayscale-0" />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
```

## Notes
- `alt=""` (decorative — logos are the brands themselves, text-less on source too).
- VN (StrategicPartners.tsx) and EN (en/page.tsx) use the same 7 logos.
