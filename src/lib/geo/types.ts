export type GeographicEntityType =
  | "province"
  | "municipality"
  | "ward"
  | "commune"
  | "special"
  | "legacy_district";

export type GeographicEntity = {
  code: string;
  name: string;
  fullName: string;
  normalizedName: string;
  type: GeographicEntityType;
  parentCode?: string;
  parentName?: string;
  aliases?: string[];
  isCurrent: boolean;
  source: string;
  sourceVersion: string;
};

export type SearchIntentType =
  | "province_intent"
  | "municipality_intent"
  | "ward_intent"
  | "commune_intent"
  | "legacy_intent"
  | "generic_commercial";

export type GeographicSearchMapping = {
  query: string;
  normalizedLocation?: string;
  locationCode?: string;
  intent: SearchIntentType;
  canonicalArticle: string;
};

export type GeoResolverResult = {
  query: string;
  matched: boolean;
  entity?: GeographicEntity;
  intent: SearchIntentType;
  canonicalUrl: string;
  confidence: number;
  explanation: string;
};

export type ProductKnowledge = {
  id: string;
  name: string;
  category: string;
  benefits: string[];
  specifications: string[];
  applications: string[];
  verified: boolean;
};

export type GeoDatasetMetadata = {
  source: string;
  version: string;
  retrievalDate: string;
  legalBasis: string;
  stats: {
    totalProvinces: number;
    totalWards: number;
  };
};

export type LeadAttributionPayload = {
  fullName: string;
  phone: string;
  email?: string;
  selectedProvince?: string;
  selectedProvinceCode?: string;
  selectedWard?: string;
  selectedWardCode?: string;
  requirement?: string;
  sourceUrl: string;
  submittedAt: string;
};
