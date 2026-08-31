import geoData from "@/data/geo/vietnam-provinces-v4.2.0.json";
import {
  GeographicEntity,
  GeoResolverResult,
  SearchIntentType,
  GeoDatasetMetadata,
} from "./types";

export const CANONICAL_ARTICLE_URL = "https://www.eurowindowhcm.com/cua-eurowindow";
export const CANONICAL_ARTICLE_PATH = "/cua-eurowindow";

/**
 * Remove Vietnamese accents and normalize string for robust matching.
 */
export function removeVietnameseTones(str: string): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/**
 * Clean and normalize a search query by removing punctuation and excess whitespace.
 */
export function normalizeSearchTerm(term: string): string {
  return removeVietnameseTones(term)
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strip common Vietnamese administrative prefixes.
 */
const ADMIN_PREFIX_REGEX = /^(phuong|xa|thi tran|tt|quan|huyen|thi xa|tx|thanh pho|tp|tinh|tai|o|khu vuc)\s+/g;

export function stripAdminPrefix(normalized: string): string {
  // Do not strip prefix if it is a numbered unit, e.g. "quan 1", "phuong 5"
  if (/^(quan|phuong|xa)\s+\d+$/i.test(normalized)) {
    return normalized;
  }

  let cleaned = normalized;
  let changed = true;
  while (changed) {
    const next = cleaned.replace(ADMIN_PREFIX_REGEX, "").trim();
    if (next === cleaned) {
      changed = false;
    } else {
      // If the remaining is just a number, restore prefix
      if (/^\d+$/.test(next)) {
        return cleaned;
      }
      cleaned = next;
    }
  }
  return cleaned;
}

/**
 * Legacy administrative aliases to support historical and regional queries
 * like "cửa Eurowindow quận 1", "cửa Eurowindow Cầu Giấy".
 */
export const LEGACY_ALIASES: Record<
  string,
  {
    name: string;
    parentCode: string;
    parentName: string;
    normalized: string;
  }
> = {
  // TP. Hồ Chí Minh legacy districts
  "quan 1": { name: "Quận 1", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 1" },
  "q1": { name: "Quận 1", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 1" },
  "quan 2": { name: "Quận 2", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 2" },
  "q2": { name: "Quận 2", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 2" },
  "quan 3": { name: "Quận 3", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 3" },
  "q3": { name: "Quận 3", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 3" },
  "quan 4": { name: "Quận 4", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 4" },
  "quan 5": { name: "Quận 5", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 5" },
  "quan 6": { name: "Quận 6", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 6" },
  "quan 7": { name: "Quận 7", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 7" },
  "q7": { name: "Quận 7", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 7" },
  "quan 8": { name: "Quận 8", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 8" },
  "quan 9": { name: "Quận 9", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 9" },
  "quan 10": { name: "Quận 10", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 10" },
  "quan 11": { name: "Quận 11", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 11" },
  "quan 12": { name: "Quận 12", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "quan 12" },
  "binh thanh": { name: "Bình Thạnh", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "binh thanh" },
  "go vap": { name: "Gò Vấp", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "go vap" },
  "phu nhuan": { name: "Phú Nhuận", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "phu nhuan" },
  "tan binh": { name: "Tân Bình", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "tan binh" },
  "tan phu": { name: "Tân Phú", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "tan phu" },
  "binh tan": { name: "Bình Tân", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "binh tan" },
  "thu duc": { name: "TP. Thủ Đức", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "thu duc" },
  "tp thu duc": { name: "TP. Thủ Đức", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "thu duc" },
  "cu chi": { name: "Củ Chi", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "cu chi" },
  "hoc mon": { name: "Hóc Môn", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "hoc mon" },
  "binh chanh": { name: "Bình Chánh", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "binh chanh" },
  "nha be": { name: "Nhà Bè", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "nha be" },
  "can gio": { name: "Cần Giờ", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "can gio" },

  // Hà Nội legacy districts
  "ba dinh": { name: "Ba Đình", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "ba dinh" },
  "hoan kiem": { name: "Hoàn Kiếm", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "hoan kiem" },
  "tay ho": { name: "Tây Hồ", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "tay ho" },
  "long bien": { name: "Long Biên", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "long bien" },
  "cau giay": { name: "Cầu Giấy", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "cau giay" },
  "dong da": { name: "Đống Đa", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "dong da" },
  "hai ba trung": { name: "Hai Bà Trưng", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "hai ba trung" },
  "hoang mai": { name: "Hoàng Mai", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "hoang mai" },
  "thanh xuan": { name: "Thanh Xuân", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "thanh xuan" },
  "ha dong": { name: "Hà Đông", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "ha dong" },
  "nam tu liem": { name: "Nam Từ Liêm", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "nam tu liem" },
  "bac tu liem": { name: "Bắc Từ Liêm", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "bac tu liem" },

  // Đà Nẵng legacy districts
  "hai chau": { name: "Hải Châu", parentCode: "48", parentName: "Thành phố Đà Nẵng", normalized: "hai chau" },
  "thanh khe": { name: "Thanh Khê", parentCode: "48", parentName: "Thành phố Đà Nẵng", normalized: "thanh khe" },
  "son tra": { name: "Sơn Trà", parentCode: "48", parentName: "Thành phố Đà Nẵng", normalized: "son tra" },
  "ngu hanh son": { name: "Ngũ Hành Sơn", parentCode: "48", parentName: "Thành phố Đà Nẵng", normalized: "ngu hanh son" },
  "lien chieu": { name: "Liên Chiểu", parentCode: "48", parentName: "Thành phố Đà Nẵng", normalized: "lien chieu" },
  "cam le": { name: "Cẩm Lệ", parentCode: "48", parentName: "Thành phố Đà Nẵng", normalized: "cam le" },

  // Regional common queries
  "tp hcm": { name: "TP. Hồ Chí Minh", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "tp hcm" },
  "tphcm": { name: "TP. Hồ Chí Minh", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "tphcm" },
  "sai gon": { name: "Sài Gòn", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "sai gon" },
  "saigon": { name: "Sài Gòn", parentCode: "79", parentName: "Thành phố Hồ Chí Minh", normalized: "saigon" },
  "hn": { name: "Hà Nội", parentCode: "01", parentName: "Thành phố Hà Nội", normalized: "hn" },
};

// In-memory data structures
const provinceByCode = new Map<string, GeographicEntity>();
const provinceByNorm = new Map<string, GeographicEntity>();
const wardByCode = new Map<string, GeographicEntity>();
const wardsByNorm = new Map<string, GeographicEntity[]>();

// Initialize in-memory index from imported dataset
(() => {
  for (const p of geoData.provinces) {
    const isMunicipality = p.fullName.toLowerCase().includes("thành phố");
    const pEntity: GeographicEntity = {
      code: p.code,
      name: p.name,
      fullName: p.fullName,
      normalizedName: removeVietnameseTones(p.name),
      type: isMunicipality ? "municipality" : "province",
      parentCode: undefined,
      parentName: "Việt Nam",
      aliases: [
        removeVietnameseTones(p.fullName),
        removeVietnameseTones(p.codeName.replace(/_/g, " ")),
      ],
      isCurrent: true,
      source: geoData.source,
      sourceVersion: geoData.version,
    };

    provinceByCode.set(p.code, pEntity);
    provinceByNorm.set(pEntity.normalizedName, pEntity);
    provinceByNorm.set(removeVietnameseTones(p.fullName), pEntity);
    provinceByNorm.set(stripAdminPrefix(pEntity.normalizedName), pEntity);

    // Map wards
    for (const w of p.wards) {
      const isPhuong = w.fullName.toLowerCase().startsWith("phường");
      const wEntity: GeographicEntity = {
        code: w.code,
        name: w.name,
        fullName: w.fullName,
        normalizedName: removeVietnameseTones(w.name),
        type: isPhuong ? "ward" : "commune",
        parentCode: p.code,
        parentName: p.fullName,
        aliases: [
          removeVietnameseTones(w.fullName),
          removeVietnameseTones(w.codeName.replace(/_/g, " ")),
        ],
        isCurrent: true,
        source: geoData.source,
        sourceVersion: geoData.version,
      };

      wardByCode.set(w.code, wEntity);

      const normName = wEntity.normalizedName;
      if (!wardsByNorm.has(normName)) {
        wardsByNorm.set(normName, []);
      }
      wardsByNorm.get(normName)!.push(wEntity);

      // Also map full name
      const normFullName = removeVietnameseTones(w.fullName);
      if (!wardsByNorm.has(normFullName)) {
        wardsByNorm.set(normFullName, []);
      }
      wardsByNorm.get(normFullName)!.push(wEntity);
    }
  }
})();

/**
 * Commercial intent terms to strip when extracting location keywords
 */
const COMMERCIAL_STOPWORDS = [
  "cua eurowindow",
  "cua nhom eurowindow",
  "cua nhua eurowindow",
  "cua upvc eurowindow",
  "cua kinh eurowindow",
  "cua cuon eurowindow",
  "vach kinh eurowindow",
  "giai phap cua eurowindow",
  "bao gia cua eurowindow",
  "gia cua eurowindow",
  "lap dat cua eurowindow",
  "thi cong cua eurowindow",
  "dai ly cua eurowindow",
  "showroom cua eurowindow",
  "van phong cua eurowindow",
  "eurowindow",
  "bao gia",
  "gia",
  "lap dat",
  "thi cong",
  "tu van",
  "dai ly",
  "showroom",
  "mua",
  "chinh hang",
  "cua nhom",
  "cua nhua",
  "cua kinh",
  "cua cuon",
  "cua di",
  "cua so",
  "cua",
];

/**
 * Resolve any search query into an administrative entity, intent classification,
 * and canonical URL.
 */
export function resolveGeographicQuery(rawQuery: string): GeoResolverResult {
  if (!rawQuery || !rawQuery.trim()) {
    return {
      query: rawQuery,
      matched: false,
      intent: "generic_commercial",
      canonicalUrl: CANONICAL_ARTICLE_URL,
      confidence: 1.0,
      explanation: "Empty query mapped to canonical article.",
    };
  }

  let cleaned = normalizeSearchTerm(rawQuery);

  // Strip commercial stopwords from longest to shortest
  for (const sw of COMMERCIAL_STOPWORDS) {
    if (cleaned.includes(sw)) {
      cleaned = cleaned.replace(new RegExp(`\\b${sw}\\b`, "g"), "").trim();
    }
  }

  cleaned = cleaned.replace(/\s+/g, " ").trim();

  // If no geographic keyword remains, it's a generic commercial query
  if (!cleaned) {
    return {
      query: rawQuery,
      matched: false,
      intent: "generic_commercial",
      canonicalUrl: CANONICAL_ARTICLE_URL,
      confidence: 1.0,
      explanation: "Commercial query without specific location; resolved to canonical article.",
    };
  }

  // 1. Check legacy aliases first (e.g. "quan 1", "cau giay", "sai gon")
  const strippedAdmin = stripAdminPrefix(cleaned);
  const aliasMatch =
    LEGACY_ALIASES[cleaned] ||
    LEGACY_ALIASES[strippedAdmin] ||
    LEGACY_ALIASES[`quan ${strippedAdmin}`];

  if (aliasMatch) {
    const parentEntity = provinceByCode.get(aliasMatch.parentCode);
    const legacyEntity: GeographicEntity = {
      code: `legacy_${aliasMatch.normalized.replace(/\s+/g, "_")}`,
      name: aliasMatch.name,
      fullName: `${aliasMatch.name} (${aliasMatch.parentName})`,
      normalizedName: aliasMatch.normalized,
      type: "legacy_district",
      parentCode: aliasMatch.parentCode,
      parentName: parentEntity ? parentEntity.fullName : aliasMatch.parentName,
      aliases: [aliasMatch.name, aliasMatch.normalized],
      isCurrent: false,
      source: "historical_administrative_unit",
      sourceVersion: geoData.version,
    };

    return {
      query: rawQuery,
      matched: true,
      entity: legacyEntity,
      intent: "legacy_intent",
      canonicalUrl: CANONICAL_ARTICLE_URL,
      confidence: 0.95,
      explanation: `Resolved legacy administrative unit '${aliasMatch.name}' under ${aliasMatch.parentName}.`,
    };
  }

  // 2. Check Province / Municipality (e.g. "ha noi", "da nang", "ho chi minh", "hai phong")
  const provinceMatch =
    provinceByNorm.get(cleaned) ||
    provinceByNorm.get(strippedAdmin) ||
    provinceByNorm.get(`thanh pho ${strippedAdmin}`) ||
    provinceByNorm.get(`tinh ${strippedAdmin}`);

  if (provinceMatch) {
    const intent: SearchIntentType =
      provinceMatch.type === "municipality" ? "municipality_intent" : "province_intent";

    return {
      query: rawQuery,
      matched: true,
      entity: provinceMatch,
      intent,
      canonicalUrl: CANONICAL_ARTICLE_URL,
      confidence: 1.0,
      explanation: `Resolved current province/municipality '${provinceMatch.fullName}'.`,
    };
  }

  // 3. Check Ward / Commune (e.g. "tan dinh", "ben thanh", "ba dinh")
  const wardMatches =
    wardsByNorm.get(cleaned) ||
    wardsByNorm.get(strippedAdmin) ||
    wardsByNorm.get(`phuong ${strippedAdmin}`) ||
    wardsByNorm.get(`xa ${strippedAdmin}`);

  if (wardMatches && wardMatches.length > 0) {
    // If multiple wards match, prefer TP.HCM (79) or Hà Nội (01) if available, otherwise first
    const preferred =
      wardMatches.find((w) => w.parentCode === "79") ||
      wardMatches.find((w) => w.parentCode === "01") ||
      wardMatches[0];

    const intent: SearchIntentType =
      preferred.type === "ward" ? "ward_intent" : "commune_intent";

    return {
      query: rawQuery,
      matched: true,
      entity: preferred,
      intent,
      canonicalUrl: CANONICAL_ARTICLE_URL,
      confidence: 0.9,
      explanation: `Resolved current ward/commune '${preferred.fullName}' (${preferred.parentName}).`,
    };
  }

  // 4. Fuzzy fallback check inside ward names
  for (const [norm, list] of wardsByNorm.entries()) {
    if (cleaned.length >= 4 && norm.includes(cleaned)) {
      const match = list[0];
      return {
        query: rawQuery,
        matched: true,
        entity: match,
        intent: "ward_intent",
        canonicalUrl: CANONICAL_ARTICLE_URL,
        confidence: 0.75,
        explanation: `Fuzzy matched ward '${match.fullName}' from token '${cleaned}'.`,
      };
    }
  }

  // 5. Unresolved location: falls back to canonical article safely
  return {
    query: rawQuery,
    matched: false,
    intent: "generic_commercial",
    canonicalUrl: CANONICAL_ARTICLE_URL,
    confidence: 0.5,
    explanation: `Geographic token '${cleaned}' not directly resolved; routed to canonical article.`,
  };
}

/**
 * Return system coverage metadata and stats
 */
export function getGeographicCoverageStats(): GeoDatasetMetadata & {
  legacyAliasesCount: number;
} {
  return {
    source: geoData.source,
    version: geoData.version,
    retrievalDate: geoData.retrievalDate,
    legalBasis: geoData.legalBasis,
    stats: {
      totalProvinces: geoData.stats.totalProvinces,
      totalWards: geoData.stats.totalWards,
    },
    legacyAliasesCount: Object.keys(LEGACY_ALIASES).length,
  };
}

/**
 * Return list of all provinces for dropdown selection
 */
export function getProvincesList(): Array<{
  code: string;
  name: string;
  fullName: string;
  codeName: string;
}> {
  return geoData.provinces.map((p) => ({
    code: p.code,
    name: p.name,
    fullName: p.fullName,
    codeName: p.codeName,
  }));
}

/**
 * Return wards belonging to a specific province code
 */
export function getWardsByProvince(provinceCode: string): Array<{
  code: string;
  name: string;
  fullName: string;
  codeName: string;
  provinceCode: string;
}> {
  const p = geoData.provinces.find((prov) => prov.code === provinceCode);
  return p ? p.wards : [];
}
