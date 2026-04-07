export type Platform = "amazon" | "reddit" | "youtube" | "bestbuy" | "walmart";

export interface Review {
  id: string;
  productSlug: string;
  platform: Platform;
  author: string;
  date: string;
  rating: number | null; // null for platforms like Reddit/YouTube that don't have star ratings
  title: string;
  text: string;
  helpful?: number;
  verified?: boolean;
}

export type Category = "laptops" | "phones" | "kitchen" | "lawn-garden" | "audio";

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  image: string;
  priceLow: number;
  priceHigh: number;
  useCases: string[];
  description: string;
  specs: Record<string, string>;
}

export interface PlatformRating {
  platform: Platform;
  averageRating: number | null;
  reviewCount: number;
  url: string;
}

export interface ProConItem {
  text: string;
  mentionPercent: number;
}

export interface AnalysisResult {
  aggregatedRating: number;
  totalReviews: number;
  trustScore: number;
  platformRatings: PlatformRating[];
  pros: ProConItem[];
  cons: ProConItem[];
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export const PLATFORM_INFO: Record<
  Platform,
  { label: string; color: string; bgColor: string }
> = {
  amazon: { label: "Amazon", color: "#FF9900", bgColor: "#FFF8E7" },
  reddit: { label: "Reddit", color: "#FF4500", bgColor: "#FFF0EB" },
  youtube: { label: "YouTube", color: "#FF0000", bgColor: "#FFE8E8" },
  bestbuy: { label: "Best Buy", color: "#0046BE", bgColor: "#E8F0FF" },
  walmart: { label: "Walmart", color: "#0071DC", bgColor: "#E8F4FF" },
};

export type CategoryGroup = "electronics" | "home";

export const CATEGORY_INFO: Record<
  Category,
  { label: string; description: string; icon: string; group: CategoryGroup }
> = {
  laptops: {
    label: "Laptops",
    description: "Notebooks, ultrabooks, and portable computers",
    icon: "laptop",
    group: "electronics",
  },
  phones: {
    label: "Phones",
    description: "Smartphones and mobile devices",
    icon: "smartphone",
    group: "electronics",
  },
  kitchen: {
    label: "Kitchen",
    description: "Appliances, cookware, and kitchen tools",
    icon: "chefHat",
    group: "home",
  },
  "lawn-garden": {
    label: "Lawn & Garden",
    description: "Mowers, tools, and outdoor equipment",
    icon: "trees",
    group: "home",
  },
  audio: {
    label: "Audio",
    description: "Headphones, earbuds, and speakers",
    icon: "headphones",
    group: "electronics",
  },
};
