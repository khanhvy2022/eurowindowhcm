# Slider Navigation Buttons Specification (Eurowindow site)

Source pattern: catmoc.cmg.vn homepage — Flatsome theme news slider (Flickity)
(`row-slider slider-nav-circle slider-nav-push`). Adopt for Swiper in eurowindowhcm.

## Interaction Model
Hover-driven. Buttons hidden by default, revealed on container hover, active accent on button hover. Pagination dots static.

## Flatsome reference (extracted from computed styles + stylesheets)
### Button `.flickity-prev-next-button`
- width/height: 45px, position absolute, top 40% / bottom 40%
- background: transparent
- border: 2px solid currentColor (via `.slider-nav-circle .flickity-prev-next-button`)
- border-radius: 100%
- color: rgb(17, 17, 17) (#111)
- opacity: 0 (hidden default)
- transform: translateX(±20%) (prev +20%, next -20%)
- transition: transform 0.3s, opacity 0.3s, background 0.3s
- icon svg: fill currentColor, padding 20%, transition 0.3s

### Hover states
- `.slider:hover .flickity-prev-next-button` → opacity 0.7, transform translateX(0)
- `.slider .flickity-prev-next-button:hover` → opacity 1, svg fill → var(--fs-color-primary) (#e30613)

### Disabled state
- opacity 0, pointer-events none, cursor auto

### Pagination dots `.row-slider .flickity-page-dots .dot`
- width/height: 10px, border 0, background rgb(17,17,17), opacity 0.2 (default)
- active: primary color

## Eurowindow adaptation
Same structure/behavior; swap primary color #e30613 → #0066aa (Eurowindow blue), hover → #4da6e0.

### Implementation (Tailwind on existing components)
Wrapper gets `group` class; buttons get:
- `opacity-0 group-hover:opacity-70` (hidden → visible on section hover)
- `hover:opacity-100 hover:border-[#0066aa] hover:text-[#0066aa]`
- `rounded-full border-2 border-zinc-950 text-zinc-950 transition-all duration-300`
- size h-11 w-11 (44px, close to 45px)
- disabled hidden via Swiper nav disabled class → `opacity-0 pointer-events-none`

Pagination dots: 10px circle, rgba(17,17,17,.2); active #0066aa. CSS in globals.css.

## Files to change
1. `src/components/NewsSection.tsx` — circle buttons + pagination (Pagination module)
2. `src/app/en/page.tsx` — circle buttons + pagination for News section
3. `src/app/globals.css` — `.news-pagination` dots style (dark theme for light bg)
