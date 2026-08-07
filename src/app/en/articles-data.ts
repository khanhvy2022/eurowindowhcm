export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  sections: { heading: string; id: string; body: string[] }[];
  faq?: { q: string; a: string }[];
  image?: string;
};

export const articles: Article[] = [
  {
    slug: "toa-dam-xu-huong-nguon-nhan-luc",
    title: "Eurowindow hosted a successful talk on human-resource trends and management strategy in the new era",
    category: "Activities",
    date: "25/07/2026",
    excerpt: "The talk gathered speakers, experts and leaders to share human-resource trends along with development and management strategies in a new economic context.",
    image: "/eurowindow/toa-dam-1.png.webp",
    sections: [
      {
        heading: "A deep-dive talk on HR strategy",
        id: "toa-dam-chuyen-sau",
        body: [
          "Eurowindow recently hosted the talk “Human-resource trends – Development and management strategy in the new era”. The event brought together leaders, HR experts and management teams across levels to discuss challenges and opportunities in attracting, retaining and developing talent.",
          "At the talk, speakers shared an overview of the labour market, talent-shift trends and the role of corporate culture in building a sustainable working environment.",
        ],
      },
      {
        heading: "People are the foundation of growth",
        id: "con-nguoi-la-nen-tang",
        body: [
          "With more than 20 years of development, Eurowindow has always identified its people as its most precious asset. Training programmes, career paths and welfare policies are continuously improved to accompany the growth of every individual.",
          "Through the talk, Eurowindow aims to build a strong team ready to create sustainable value for customers and the community.",
        ],
      },
    ],
  },
  {
    slug: "cua-vach-kinh-vinhomes-global-gate",
    title: "Eurowindow supplies and installs doors and glass partitions at Vinhomes Global Gate Co Loa",
    category: "Projects",
    date: "18/07/2026",
    excerpt: "Eurowindow continues to make its mark by supplying and installing door and glass partition systems for the Vinhomes Global Gate Co Loa urban area.",
    image: "/eurowindow/img-0344.jpeg.webp",
    sections: [
      {
        heading: "A large-scale project at Co Loa",
        id: "du-an-quy-mo-co-loa",
        body: [
          "Eurowindow was selected to supply and install door and glass partition systems for Vinhomes Global Gate Co Loa – one of the most notable mega urban areas in eastern Hanoi.",
          "With experience present in hundreds of thousands of projects, Eurowindow delivers coordinated aluminium door and glass partition solutions meeting European standards for aesthetics, acoustics and safety.",
        ],
      },
      {
        heading: "Coordinated solutions for modern living",
        id: "giai-phap-dong-bo",
        body: [
          "The aluminium-glass doors and large glass partitions supplied by Eurowindow optimise natural light, open up views and deliver comfortable living space for residents.",
          "This is further proof of Eurowindow's capability to deliver large-scale real-estate projects.",
        ],
      },
    ],
  },
  {
    slug: "giai-phap-cua-chong-nong-mua-he-2026",
    title: "Eurowindow heat-proof door solutions for summer 2026",
    category: "Knowledge sharing",
    date: "10/07/2026",
    excerpt: "Explore Eurowindow's effective heat-proof door solutions that keep living spaces cool and energy-efficient in summer.",
    image: "/eurowindow/cua-nhom-kinh-cach-am-1.jpg.webp",
    sections: [
      {
        heading: "Why heat-proof doors matter",
        id: "vi-sao-can-cua-chong-nong",
        body: [
          "In summer, temperatures rise and windows and entrance doors become the biggest bridge for heat into living space. Choosing the right heat-proof door system reduces heat absorption, saves air-conditioning electricity and improves comfort for the whole family.",
        ],
      },
      {
        heading: "Key solutions",
        id: "cac-giai-phap-tieu-bieu",
        body: [
          "uPVC doors with multi-chamber hollow profiles combined with insulated glazing stop heat transfer exceptionally well. Aluminium-glass doors with Low-E glass reflect solar radiation, reducing heat gain while still letting natural light through.",
          "In addition, insulated double-glazed units with Argon gas provide optimal acoustic and thermal insulation — ideal for townhouses, villas and office buildings.",
        ],
      },
    ],
    faq: [
      { q: "Which door type resists heat best?", a: "uPVC doors combined with insulated glazing, or aluminium-glass doors with Low-E glass, deliver outstanding heat resistance." },
      { q: "Does Low-E glass reduce brightness?", a: "Low-E glass reflects heat but still lets natural light through, keeping the space bright and cool." },
    ],
  },
  {
    slug: "nen-chon-cua-gi-cho-mua-he-nang-nong",
    title: "Which door should you choose for hot summer weather?",
    category: "Knowledge sharing",
    date: "05/07/2026",
    excerpt: "Advice on choosing the right door system for Vietnam's hot climate, balancing heat resistance, aesthetics and budget.",
    image: "/eurowindow/z7978260236950-59ec572c33f7b933b6e48fae6107511b.jpg",
    sections: [
      {
        heading: "Deciding factors when choosing doors",
        id: "yeu-to-quyet-dinh",
        body: [
          "When choosing doors for hot climates, consider the thermal insulation of the frame, the glass type, the heat-transfer coefficient and long-term running costs. The harmony between the frame and the glass determines the overall heat-proof effectiveness.",
        ],
      },
      {
        heading: "Eurowindow recommendations",
        id: "goi-y-tu-eurowindow",
        body: [
          "For townhouses and villas, Eurowindow recommends uPVC doors combined with insulated glazing, or aluminium-glass doors with Low-E glass. For large glazed facades, use insulated glazing with thermal-break aluminium frames to prevent heat loss.",
          "Contact Eurowindow for advice on the solution that best fits your project.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
