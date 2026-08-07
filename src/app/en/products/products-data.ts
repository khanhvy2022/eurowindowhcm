export type Product = {
  slug: string;
  id: string;
  title: string;
  tab: string;
  text: string;
  features: string[];
  image: string;
  intro: string[];
  structure: { title: string; text: string }[];
  advantages: { title: string; text: string }[];
  systems: string[];
};

export const products: Product[] = [
  {
    slug: "cua-nhom-vach-kinh",
    id: "nhom",
    tab: "ALUMINIUM DOORS & GLASS PARTITIONS",
    title: "ALUMINIUM DOORS & LARGE GLASS PARTITIONS",
    text: "Large aluminium door and glass partition systems using EA55–EA95i profiles with genuine Cmech, Roto, Hafele hardware. High sealing performance, multi-direction opening and high wind load resistance for large-scale projects.",
    features: ["Multi-direction operation: in-swing, out-swing, awning, tilt-turn, sliding, folding", "Profiles EA55–EA95i with genuine hardware from Cmech, Roto, Hafele", "High wind load resistance, suitable for large structural glass projects"],
    image: "/eurowindow/cuanhom.jpg.webp",
    intro: [
      "Eurowindow aluminium doors and large glass partitions are manufactured from premium aluminium, overcoming the weaknesses of conventional aluminium — weak profiles, simple hardware, no thermal break leading to poor acoustic/thermal performance and water leakage.",
      "Aluminium doors (including windows and main doors) and glass partitions guarantee high sealing and can open in multiple directions, suiting various architectural styles. Thermal-break profiles combined with argon-filled insulated glazing units minimise heat transfer, contributing to energy savings. Eurowindow also partners with world-class profile suppliers such as Technal (France) and Schüco (Germany) and operates powder-coating (Powdercoating) and PVDF paint lines capable of handling profiles up to 2.5m × 2.5m × 6m, with an A-grade wastewater treatment system.",
    ],
    structure: [
      { title: "Profile sections", text: "Profiles with or without thermal break, featuring hollow chambers and reinforcement ribs. Carefully engineered grooves and walls create structural ribs, drainage channels and acoustic/thermal cavities." },
      { title: "Insulated glazing units", text: "Combined with argon-filled insulated glazing units, EPDM gaskets and a synchronous hardware system for high acoustic and thermal performance." },
      { title: "Hardware system", text: "Genuine hardware from Cmech, Roto, Hafele, Huy Hoàng, GMT, Kinlong ensuring accuracy and safety during use." },
    ],
    advantages: [
      { title: "Acoustic & thermal insulation", text: "Thermal-break profiles combined with insulated glazing units, EPDM gaskets and synchronised hardware deliver excellent acoustic and thermal performance — particularly for thermal-break variants." },
      { title: "High structural strength", text: "Hollow-profile design with reinforcing ribs and reasonable aluminium thickness withstands wind, storm and seismic loads." },
      { title: "Lightweight load", text: "Aluminium is light yet strong, reducing the structural load compared to other wall materials — an optimal safe solution." },
      { title: "Cost-effective in use", text: "Insulated acoustic glazing, safety glass reduce air-conditioning energy; powder-coated surfaces stay colourful and only need regular cleaning." },
      { title: "Aesthetics", text: "Hidden-load-bearing designs create a flat large-glass surface; coloured, figured and frosted glass ensure both privacy and aesthetics." },
      { title: "Quality standard", text: "Compliant with European standards and TCVN 330:2004, TCVN 7452-1/2/3:2004 (airtightness, water tightness, wind pressure), and ISO 140-5 acoustic testing." },
    ],
    systems: ["Aluminium doors", "Aluminium windows", "Large glass partitions — Stick system", "Large glass partitions — Spider system", "Large glass partitions — Semi-unitised system", "Large glass partitions — Unitised system", "Canopy/Pergola"],
  },
  {
    slug: "cua-upvc",
    id: "upvc",
    tab: "EUROPEAN uPVC DOORS",
    title: "EUROPEAN uPVC DOORS",
    text: "European-standard uPVC doors with superior acoustic and thermal insulation, built to last. The product line that built Eurowindow's reputation since 2002, preferred for external residential openings.",
    features: ["Superior acoustic & thermal insulation, airtight, no warping", "European-standard Kömmerling & Asia systems", "Doors for hotels, villas and apartments"],
    image: "/eurowindow/cuanhua1.jpg.webp",
    intro: [
      "Eurowindow uPVC products mainly cover windows, doors and internal partitions for apartments, hotels, villas and serviced apartments. uPVC doors are built with box-structure profiles, reinforced steel cores, multi-point locks and 3D adjustable hinges for multi-direction operation, combined with dual gaskets and argon-filled insulated glazing for high acoustic and thermal performance.",
      "Premium uPVC does not oxidise, fade or yellow under solar radiation, giving doors excellent acoustic/thermal insulation, energy savings and low maintenance costs — long-term economic benefits. Products meet wind-pressure, water-tightness and welded-corner strength standards per TCVN 7451:2004 and 7452-2:2004.",
    ],
    structure: [
      { title: "uPVC profile sections", text: "Box-structure profiles with multiple hollow acoustic/thermal chambers, reinforced steel core increasing structural strength. Eurowindow uses Koemmerling profiles (Profine Group, Germany) — 100+ years reputation, sole agent in Vietnam." },
      { title: "Hardware system", text: "Synchronous hardware with multi-point locks and 3D adjustable hinges. Hinges bolt directly into the reinforced steel core with specialised screws, ensuring safety and accuracy — overcoming the weakness of conventional hardware." },
      { title: "Dual gaskets & insulated glazing", text: "Dual gaskets ensure absolute airtightness; argon-filled insulated glazing reduces sound and heat transmission — the trio that delivers high acoustic/thermal performance." },
    ],
    advantages: [
      { title: "Acoustic & thermal insulation", text: "On a road with 85 dB traffic noise, Eurowindow uPVC doors reduce it to 40–45 dB. Thermal insulation is 2–4 times better than conventional doors." },
      { title: "Economic efficiency", text: "Minimal repainting/maintenance; reduced heat transmission saves cooling/heating energy. Within a few years the doors fully amortise the initial investment." },
      { title: "Stable, no warping", text: "Unlike timber doors that warp and shrink in tropical climates, uPVC doors retain their original dimensions and beauty over time." },
      { title: "Suitable for Vietnam climate", text: "uPVC does not oxidise, age or yellow under sunlight in hot, humid, rainy conditions thanks to stabilisers and stabilised formulations." },
      { title: "Fire-safe", text: "Made from fire-retardant polymer and additives; does not form combustible parts even at high temperature. Under near-100°C heat lamps, uPVC profiles only deform without igniting." },
    ],
    systems: ["uPVC doors", "uPVC windows", "uPVC partitions", "Kömmerling system", "Asia system", "Tilt-turn, swing, sliding, bi-fold, casement"],
  },
  {
    slug: "cua-go-va-go-chong-chay",
    id: "go",
    tab: "TIMBER & FIRE-RATED DOORS",
    title: "TIMBER & FIRE-RATED DOORS",
    text: "Natural timber, engineered wood, laminated timber, fire-rated timber and composite doors. Modern production technology from Italy, Spain and Russia — preserving the natural qualities of wood while delivering high strength and stability against weather-induced warping.",
    features: ["Various patterns: glass panels, solid panels, embossed lines, flush joints", "Modern production technology from Italy, Spain, Russia", "Natural, engineered, laminated, fire-rated and composite timber"],
    image: "/eurowindow/cuagotrangchu.jpg.webp",
    intro: [
      "Using modern production technology from Italy, Spain and Russia, Eurowindow timber doors preserve the natural qualities of wood while achieving high strength and stability, minimising weather-induced changes such as warping and shrinking.",
      "If uPVC doors are the ideal solution for external openings (windows and balconies), timber doors are the optimal choice for interior spaces (room doors), complementing interior décor.",
      "Previously people chose Ironwood, Teak, Rosewood, Melia or Oak for doors thanks to their hardness, compressive strength, termite resistance and attractive grain. However, solid timber of large dimensions can still shrink or crack with humidity/temperature changes. Eurowindow's modern timber-processing plant at Quang Minh Industrial Zone (Hanoi) and Tan Uyên Industrial Zone (Binh Duong), with technology transferred from Italy, Spain and Russia, enables our timber doors to retain natural wood qualities while remaining stable, airtight, easy to operate, aesthetic and quick to install.",
    ],
    structure: [
      { title: "Wood material", text: "Raw materials are dried according to export moisture standards (12–14%). Plantation-grown laminated timber is stabilised via wood-modification technology, achieving high hardness and strength while minimising warping and shrinking." },
      { title: "Specialised gaskets", text: "European-imported specialised gaskets enable smooth, airtight door operation, enhancing acoustic and thermal insulation." },
      { title: "Surface finishing & spray painting", text: "Wood selection followed by an automatic spray-painting system for flat surfaces, uniform colour, high aesthetics and durability." },
    ],
    advantages: [
      { title: "Stability", text: "Raw materials are dried per export moisture standard (12–14%); modified laminated timber minimises weather-induced changes." },
      { title: "Smooth & airtight operation", text: "European-imported specialised gaskets enable smooth, airtight door operation, enhancing acoustic and thermal insulation." },
      { title: "Aesthetics", text: "Careful wood selection and automatic spray-painting give flat surfaces, uniform colour, high aesthetics and product durability." },
      { title: "Fast installation", text: "Frames and doors are designed for industrialised installation at the finishing stage, accelerating construction progress." },
      { title: "Economic efficiency", text: "High strength and good acoustic/thermal insulation deliver economic benefits. Compliant with TCVN 9366-1:2021 for wind pressure, water tightness and impact resistance." },
    ],
    systems: ["Natural timber doors", "Engineered timber doors", "Laminated timber doors", "Fire-rated timber doors", "Composite timber doors", "Styles: glass panels, solid panels, raised lines, flush joints"],
  },
  {
    slug: "san-pham-kinh",
    id: "kinh",
    tab: "GLASS PRODUCTS",
    title: "PREMIUM GLASS PRODUCTS",
    text: "Glass processing centre at Quang Minh Industrial Zone, Me Linh, Hanoi — modern production line in a clean room maintaining ≤46% humidity and 20–28°C. Toughened, heat-strengthened, large-format insulated, figured, laminated safety glass and Low-E glass.",
    features: ["Toughened, heat-strengthened, laminated safety glass", "Large-format insulated glass, figured glass, Low-E, colour-changing smart glass", "Clean-room production at 20–28°C, ≤46% humidity"],
    image: "/eurowindow/san-pham-kinh.jpg.webp",
    intro: [
      "To meet Eurowindow's glass needs and supply the market with premium glass, Eurowindow invested in a Glass Processing Centre at Lot 15, Quang Minh Industrial Zone, Me Linh, Hanoi — featuring the most modern and synchronised production lines in Vietnam.",
      "Key glass products: tempered glass, heat-strengthened glass, large-format insulated glass, figured glass, laminated safety glass — used for large glass walls, partitions, hydraulic doors, staircase railings, windows, doors, tabletops, glass showers... With high mechanical strength, safety, aesthetics, UV filtering, acoustic and thermal insulation, Eurowindow glass is the perfect choice for residential and industrial projects.",
    ],
    structure: [
      { title: "Clean room with temperature & humidity control", text: "Insulated glass and safety glass are processed in a controlled clean room, ≤46% humidity, 20–28°C, minimising moisture and dust affecting multi-layer glass quality." },
      { title: "European-standard production line", text: "Large-format glass cutting machines, double-edger, drilling, CNC machining centre, flat glass tempering furnace, laminated safety glass line and Italian/Finnish/Swiss/German insulated-glass lines." },
      { title: "Heat-Soak-Test inspection", text: "After tempering, safety glass is inspected by Heat-Soak-Test equipment to eliminate units with potential flaws before entering site." },
      { title: "Large-format glass", text: "Tempering and heat-strengthening capacity of 4mm–19mm thickness, up to 2,800 × 6,000mm — suitable for glass facades and large glass walls." },
    ],
    advantages: [
      { title: "High safety", text: "Tempered glass is 4–5 times stronger than annealed; when broken, produces small blunt fragments; heat-strengthened glass is 2–3 times stronger; laminated safety glass binds PVB layers retaining shards when impacted." },
      { title: "International standard", text: "Certified by British Standards Institution (BSI) Kitemark, complying with BS EN 12150-1:2000, BS EN 14449:2005, BS EN 1279-2:2002, EN 1863, ANSI Z97.1-2004, ECE R43." },
      { title: "Acoustic & thermal insulation, energy saving", text: "Super Soft Coating Low-E 0.01 limits solar radiation; Low-E heat-reflective glass reduces ~40% summer heat transmission, lowering air-conditioning load — ideal for green architecture." },
      { title: "Aesthetics & flexibility", text: "Diverse range: tempered, heat-strengthened, insulated, figured, safety, reflective and hard/soft coated glass — easy to select for each space." },
      { title: "Synchronous manufacturing", text: "Multiple lines within one centre ensure precise control of each component, guaranteeing quality and progress consistency per project." },
    ],
    systems: ["Tempered & heat-strengthened glass", "Laminated safety glass (multi-layer PVB)", "Insulated glass units & large-format IGUs (argon-filled)", "Safe Low-E thermal glass (saves up to 57% solar energy, 75% glare, 99% UV)", "Figured glass (CNC water-jet from Italy)", "Thickness: 5–12mm; Tempered 6.38–12.38mm; IGU 6mm-9-6mm"],
  },
  {
    slug: "cua-tu-dong-va-cua-xoay",
    id: "tu-dong",
    tab: "AUTOMATIC & ROTARY DOORS",
    title: "AUTOMATIC & ROTARY DOORS",
    text: "Modern door solutions for high-traffic areas: main lobbies, office towers, hotels, apartments and shopping centres. Automatic sliding and revolving doors sensor-operated, integrated with the fire-alarm system for emergency egress.",
    features: ["Sensor-operated automatic sliding & revolving doors", "Glass leaves with/without aluminium frames, max height 3m", "Fire-alarm system integration, safe, quiet, durable"],
    image: "/eurowindow/cua-tu-dong.jpg.webp",
    intro: [
      "Eurowindow automatic doors are modern solutions meeting comfort, safety and aesthetic requirements for residential, office, hotel, shopping centre and public spaces. With sensor-activated flexible opening, automatic doors optimise operation, improve traffic flow and align with smart-building trends.",
    ],
    structure: [
      { title: "Multi-mode controller", text: "Sliding doors feature 4 modes: automatic, stay-open, one-way and night-lock. Revolving doors offer 5 modes: Night (security lock), Revolve (low-speed continuous), Automatic, Exit and Manual (hand crank for power failure)." },
      { title: "Motion-sensing radar", text: "Radar detects people within the sensor zone; doors open automatically as people pass and close behind — minimising manual operation, synchronised with real traffic flow." },
      { title: "Speed-control & electric brake", text: "Rotational speed is adjustable per settings, preventing excessive speed from wind. Night mode uses electric lock and brake to hold the door closed, pausing the sensors." },
      { title: "Fire alarm system integration", text: "Doors perform self-diagnostics, emit fault alerts and connect to the building's fire-alarm system, enabling emergency response per the configured technical scenarios." },
    ],
    advantages: [
      { title: "High traffic capacity", text: "Two-leaf sliding doors up to 3m high create wide passages; 3–4-leaf revolving doors regulate stable pedestrian flow for large venues." },
      { title: "Flexible operation", text: "Multiple modes based on time and purpose: automatic open on approach, stay-open, one-way or night-lock for entry/exit control." },
      { title: "Safe operation", text: "Self-diagnostics, fault alerts and fire-alarm connection; revolving doors control rotation speed, preventing fast spin from wind." },
      { title: "Quiet & stable", text: "Motors, sensors and controllers are designed for smooth, quiet operation without interruption — revolving doors run continuously." },
      { title: "High durability", text: "Robust structure withstands high usage frequency plus wind and dust — suitable for entrances and main lobbies." },
      { title: "Aesthetics, professionalism", text: "Sleek modern design enhances lobby identity; revolving doors create focal points for hotels, offices and shopping centres." },
    ],
    systems: ["Automatic 2-leaf sliding doors (framed/unframed aluminium, max 3m high)", "Import 3 or 4-leaf revolving doors (from Germany, Italy)", "Modes: Night, Revolve, Automatic, Exit, Manual", "Integrated: self-diagnostics, alerts, fire-alarm connection"],
  },
  {
    slug: "cua-cuon-nhom-khe-thoang",
    id: "cuon",
    tab: "PERFORATED ALUMINIUM ROLLING DOORS",
    title: "EASD45 PERFORATED ALUMINIUM ROLLING DOORS",
    text: "Eurowindow EASD45 perforated aluminium rolling doors combine: modern design, sturdiness, safety, comfort and beauty. Three main systems — box-mounted, ceiling-mounted and retractable, all with high acoustic/thermal performance.",
    features: ["Three systems: box-mounted, ceiling-mounted, retractable", "High acoustic & thermal performance", "EASD45 perforated aluminium: modern – sturdy – safe – comfortable – beautiful"],
    image: "/eurowindow/cua-cuon.jpg.webp",
    intro: [
      "Today, rolling doors are an essential, inseparable part of modern architectural development. Beyond utility and aesthetics, rolling doors also ensure user safety.",
      "Meeting growing customer demand, Eurowindow launches the EASD45 perforated aluminium rolling-door line, integrating all advantages: modern — sturdy — safe — comfortable — beautiful. All structural characteristics are engineered to increase stability and durability versus conventional rolling doors on the market.",
    ],
    structure: [
      { title: "Perforated aluminium slats", text: "Perforated aluminium slats ensure air circulation and prevent overheating, while delivering high acoustic/thermal performance." },
      { title: "Drive mechanism", text: "Smooth, stable operation; all design features calculated for increased stability and durability versus ordinary rolling doors." },
    ],
    advantages: [
      { title: "Modern", text: "EASD45 perforated aluminium rolling-door design suits modern architecture, offering convenience and aesthetics." },
      { title: "Sturdy", text: "Aluminium slat structure is robust; design features calculated for stability and durability." },
      { title: "Safe", text: "Ensures user safety during daily operation." },
      { title: "Comfortable & beautiful", text: "Quiet operation without noise; aluminium surface clean and beautiful, enhancing project aesthetics." },
    ],
    systems: ["EASD45 box-mounted rolling doors", "Ceiling-mounted rolling doors", "Retractable sliding doors"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
