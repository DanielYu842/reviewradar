import { Product } from "@/lib/types";

export const products: Product[] = [
  // ========== LAPTOPS ==========
  {
    slug: "macbook-air-m3",
    name: "MacBook Air 13\" M3",
    brand: "Apple",
    category: "laptops",
    image: "/products/macbook-air-m3.jpg",
    priceLow: 1049,
    priceHigh: 1299,
    useCases: ["school", "work", "creative", "everyday"],
    description:
      "Apple's ultra-thin laptop powered by the M3 chip, featuring an all-day battery, Liquid Retina display, and fanless design.",
    specs: {
      Processor: "Apple M3 (8-core CPU, 10-core GPU)",
      RAM: "8GB / 16GB / 24GB Unified Memory",
      Storage: "256GB / 512GB / 1TB / 2TB SSD",
      Display: '13.6" Liquid Retina (2560 × 1664)',
      Battery: "Up to 18 hours",
      Weight: "2.7 lbs (1.24 kg)",
    },
  },
  {
    slug: "dell-xps-15",
    name: "Dell XPS 15 9530",
    brand: "Dell",
    category: "laptops",
    image: "/products/dell-xps-15.jpg",
    priceLow: 1199,
    priceHigh: 1899,
    useCases: ["creative", "work", "gaming-light", "everyday"],
    description:
      "Premium 15-inch ultrabook with a stunning OLED display option, powerful Intel processors, and a sleek InfinityEdge design.",
    specs: {
      Processor: "Intel Core i7-13700H / i9-13900H",
      RAM: "16GB / 32GB / 64GB DDR5",
      Storage: "512GB / 1TB / 2TB SSD",
      Display: '15.6" OLED 3.5K (3456 × 2160) or FHD+',
      Battery: "Up to 13 hours",
      Weight: "4.23 lbs (1.92 kg)",
    },
  },
  {
    slug: "lenovo-thinkpad-x1-carbon",
    name: "ThinkPad X1 Carbon Gen 12",
    brand: "Lenovo",
    category: "laptops",
    image: "/products/thinkpad-x1-carbon.jpg",
    priceLow: 1399,
    priceHigh: 2149,
    useCases: ["work", "business", "travel", "everyday"],
    description:
      "The gold standard in business ultrabooks, featuring the legendary ThinkPad keyboard, military-grade durability, and Intel vPro platform.",
    specs: {
      Processor: "Intel Core Ultra 7 155U / Ultra 9 185H",
      RAM: "16GB / 32GB LPDDR5x",
      Storage: "256GB / 512GB / 1TB / 2TB SSD",
      Display: '14" 2.8K OLED or 2K IPS',
      Battery: "Up to 15 hours",
      Weight: "2.48 lbs (1.12 kg)",
    },
  },
  {
    slug: "asus-zenbook-14-oled",
    name: "ZenBook 14 OLED UX3405",
    brand: "ASUS",
    category: "laptops",
    image: "/products/asus-zenbook-14.jpg",
    priceLow: 799,
    priceHigh: 1099,
    useCases: ["school", "creative", "everyday", "budget"],
    description:
      "Affordable OLED ultrabook with great color accuracy, Intel Core Ultra processors, and a remarkably thin chassis.",
    specs: {
      Processor: "Intel Core Ultra 5 125H / Ultra 7 155H",
      RAM: "16GB LPDDR5x",
      Storage: "512GB / 1TB SSD",
      Display: '14" 2.8K OLED (2880 × 1800)',
      Battery: "Up to 12 hours",
      Weight: "2.82 lbs (1.28 kg)",
    },
  },
  {
    slug: "hp-pavilion-15",
    name: "Pavilion 15 Laptop",
    brand: "HP",
    category: "laptops",
    image: "/products/hp-pavilion-15.jpg",
    priceLow: 549,
    priceHigh: 749,
    useCases: ["school", "everyday", "budget"],
    description:
      "Budget-friendly 15-inch laptop for students and everyday users, featuring reliable performance and a full-size keyboard.",
    specs: {
      Processor: "Intel Core i5-1335U / AMD Ryzen 5 7530U",
      RAM: "8GB / 16GB DDR4",
      Storage: "256GB / 512GB SSD",
      Display: '15.6" FHD IPS (1920 × 1080)',
      Battery: "Up to 8.5 hours",
      Weight: "3.96 lbs (1.79 kg)",
    },
  },

  // ========== PHONES ==========
  {
    slug: "iphone-16",
    name: "iPhone 16",
    brand: "Apple",
    category: "phones",
    image: "/products/iphone-16.jpg",
    priceLow: 799,
    priceHigh: 899,
    useCases: ["everyday", "photography", "social-media"],
    description:
      "Apple's flagship smartphone with the A18 chip, advanced dual-camera system, and the new Camera Control button.",
    specs: {
      Processor: "A18 chip (6-core CPU, 5-core GPU)",
      RAM: "8GB",
      Storage: "128GB / 256GB / 512GB",
      Display: '6.1" Super Retina XDR OLED',
      Battery: "Up to 22 hours video playback",
      Camera: "48MP Fusion + 12MP Ultra Wide",
    },
  },
  {
    slug: "samsung-galaxy-s25",
    name: "Galaxy S25",
    brand: "Samsung",
    category: "phones",
    image: "/products/galaxy-s25.jpg",
    priceLow: 799,
    priceHigh: 859,
    useCases: ["everyday", "photography", "customization", "productivity"],
    description:
      "Samsung's 2025 flagship with Snapdragon 8 Elite, Galaxy AI features, and a vibrant Dynamic AMOLED display.",
    specs: {
      Processor: "Snapdragon 8 Elite",
      RAM: "12GB",
      Storage: "128GB / 256GB",
      Display: '6.2" Dynamic AMOLED 2X (2340 × 1080)',
      Battery: "4,000 mAh, up to 27 hours video playback",
      Camera: "50MP Wide + 12MP Ultra Wide + 10MP Telephoto",
    },
  },
  {
    slug: "google-pixel-9",
    name: "Pixel 9",
    brand: "Google",
    category: "phones",
    image: "/products/pixel-9.jpg",
    priceLow: 699,
    priceHigh: 799,
    useCases: ["photography", "everyday", "budget-flagship", "ai"],
    description:
      "Google's AI-first smartphone with the Tensor G4 chip, best-in-class computational photography, and seven years of updates.",
    specs: {
      Processor: "Google Tensor G4",
      RAM: "12GB",
      Storage: "128GB / 256GB",
      Display: '6.3" Actua OLED (2424 × 1080)',
      Battery: "4,700 mAh, up to 24 hours",
      Camera: "50MP Wide + 48MP Ultra Wide",
    },
  },
  {
    slug: "oneplus-12",
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "phones",
    image: "/products/oneplus-12.jpg",
    priceLow: 699,
    priceHigh: 799,
    useCases: ["everyday", "performance", "gaming", "budget-flagship"],
    description:
      "Flagship killer with Snapdragon 8 Gen 3, 100W SUPERVOOC charging, and Hasselblad-tuned cameras at a competitive price.",
    specs: {
      Processor: "Snapdragon 8 Gen 3",
      RAM: "12GB / 16GB LPDDR5x",
      Storage: "256GB / 512GB UFS 4.0",
      Display: '6.82" 2K LTPO AMOLED (3168 × 1440)',
      Battery: "5,400 mAh, 100W wired / 50W wireless",
      Camera: "50MP Wide + 48MP Ultra Wide + 64MP Periscope",
    },
  },

  // ========== KITCHEN ==========
  {
    slug: "ninja-blender-bn601",
    name: "Professional Plus Blender BN601",
    brand: "Ninja",
    category: "kitchen",
    image: "/products/ninja-blender.jpg",
    priceLow: 89,
    priceHigh: 109,
    useCases: ["smoothies", "food-prep", "cooking", "budget"],
    description:
      "Powerful 1400-watt blender with Auto-iQ technology and a 72 oz total crushing pitcher for smoothies, frozen drinks, and food processing.",
    specs: {
      Power: "1400 watts",
      Capacity: "72 oz Total Crushing Pitcher",
      Speeds: "4 speeds + 3 Auto-iQ programs",
      "Blade Material": "Stainless steel stacked blade assembly",
      Dishwasher: "BPA-free, dishwasher safe parts",
      Dimensions: '9.5" × 7.5" × 17"',
    },
  },
  {
    slug: "kitchenaid-artisan-mixer",
    name: "Artisan Series 5-Qt Stand Mixer",
    brand: "KitchenAid",
    category: "kitchen",
    image: "/products/kitchenaid-mixer.jpg",
    priceLow: 349,
    priceHigh: 449,
    useCases: ["baking", "cooking", "food-prep"],
    description:
      "The iconic tilt-head stand mixer with 10 speeds, a 5-quart stainless steel bowl, and compatibility with over 10 optional hub-powered attachments.",
    specs: {
      Power: "325 watts",
      Capacity: "5-Quart Stainless Steel Bowl",
      Speeds: "10 speeds with soft start",
      Attachments: "Flat beater, dough hook, wire whip included",
      Hub: "Power hub for 10+ optional attachments",
      Weight: "26 lbs",
    },
  },
  {
    slug: "instant-pot-duo",
    name: "Duo 7-in-1 Electric Pressure Cooker",
    brand: "Instant Pot",
    category: "kitchen",
    image: "/products/instant-pot-duo.jpg",
    priceLow: 79,
    priceHigh: 99,
    useCases: ["cooking", "meal-prep", "budget", "beginners"],
    description:
      "The best-selling multi-cooker that replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    specs: {
      Capacity: "6 Quart",
      Functions: "7-in-1 (Pressure Cook, Slow Cook, Rice, Steam, Sauté, Yogurt, Warm)",
      Programs: "13 one-touch smart programs",
      Material: "Stainless steel inner pot, fingerprint-resistant",
      Safety: "10+ built-in safety features",
      Dimensions: '13.4" × 12.2" × 12.5"',
    },
  },
  {
    slug: "cuisinart-knife-set",
    name: "C77SS-15PK Classic Knife Block Set",
    brand: "Cuisinart",
    category: "kitchen",
    image: "/products/cuisinart-knives.jpg",
    priceLow: 49,
    priceHigh: 79,
    useCases: ["cooking", "food-prep", "budget"],
    description:
      "15-piece forged stainless steel knife set with an ergonomic handle design and a sleek brushed chrome block.",
    specs: {
      Pieces: "15 (including 8\" chef's, 8\" bread, 7\" santoku, 5.5\" utility, 3.5\" paring, steak knives, shears)",
      Material: "High-carbon stainless steel blades",
      Handle: "Stainless steel riveted handles",
      Block: "Brushed chrome block",
      Care: "Hand wash recommended",
      Warranty: "Lifetime warranty",
    },
  },
  {
    slug: "lodge-cast-iron-skillet",
    name: "10.25\" Cast Iron Skillet",
    brand: "Lodge",
    category: "kitchen",
    image: "/products/lodge-skillet.jpg",
    priceLow: 19,
    priceHigh: 29,
    useCases: ["cooking", "budget", "camping", "everyday"],
    description:
      "Pre-seasoned cast iron skillet that's been a kitchen staple for over 125 years. Unmatched heat retention and even cooking.",
    specs: {
      Material: "Cast Iron, pre-seasoned with vegetable oil",
      Diameter: '10.25" cooking surface',
      Compatibility: "All cooktops including induction, oven safe, grill safe",
      "Max Temp": "Oven safe to any temperature",
      Weight: "5 lbs",
      Origin: "Made in USA (South Pittsburg, Tennessee)",
    },
  },

  // ========== LAWN & GARDEN ==========
  {
    slug: "honda-hrx217vka-mower",
    name: "HRX217VKA Lawn Mower",
    brand: "Honda",
    category: "lawn-garden",
    image: "/products/honda-mower.jpg",
    priceLow: 699,
    priceHigh: 799,
    useCases: ["lawn-care", "large-yard", "quality"],
    description:
      "Self-propelled gas mower with Honda's GCV200 engine, variable-speed Select Drive, and the exclusive Versamow mulch/bag system.",
    specs: {
      Engine: "Honda GCV200, 201cc",
      "Deck Width": '21"',
      Drive: "Variable speed Select Drive (0-4 mph)",
      Cutting: "Versamow System (mulch, bag, discharge, leaf shred)",
      "Deck Material": "NeXite® (lifetime warranty)",
      Weight: "91 lbs",
    },
  },
  {
    slug: "greenworks-40v-mower",
    name: "40V 20\" Brushless Push Mower",
    brand: "Greenworks",
    category: "lawn-garden",
    image: "/products/greenworks-mower.jpg",
    priceLow: 249,
    priceHigh: 349,
    useCases: ["lawn-care", "eco-friendly", "small-yard", "budget"],
    description:
      "Battery-powered electric mower with a brushless motor, 20-inch steel deck, and up to 45 minutes of runtime per charge.",
    specs: {
      Motor: "40V Brushless",
      "Deck Width": '20" Steel',
      Runtime: "Up to 45 minutes (with 4.0Ah battery)",
      "Cutting Heights": '5 positions (1.25" – 3.5")',
      Collection: "3-in-1 (mulch, rear bag, side discharge)",
      Weight: "42.5 lbs (without battery)",
    },
  },
  {
    slug: "fiskars-powergear2-pruner",
    name: "PowerGear2 Bypass Pruner",
    brand: "Fiskars",
    category: "lawn-garden",
    image: "/products/fiskars-pruner.jpg",
    priceLow: 16,
    priceHigh: 24,
    useCases: ["gardening", "pruning", "budget"],
    description:
      "Ergonomic pruning shears with patented gear technology that provides up to 3.2x more cutting power than traditional pruners.",
    specs: {
      "Cutting Capacity": 'Up to 3/4" diameter',
      Mechanism: "Rolling handle with gear technology",
      Blade: "Precision-ground steel, fully hardened",
      Coating: "Non-stick blade coating",
      Warranty: "Full lifetime warranty",
      Weight: "7.2 oz",
    },
  },
  {
    slug: "sun-joe-spx3000-pressure-washer",
    name: "SPX3000 Electric Pressure Washer",
    brand: "Sun Joe",
    category: "lawn-garden",
    image: "/products/sun-joe-washer.jpg",
    priceLow: 159,
    priceHigh: 199,
    useCases: ["cleaning", "home-maintenance", "auto-care", "budget"],
    description:
      "2030 PSI electric pressure washer with dual onboard detergent tanks, five quick-connect nozzles, and a powerful 14.5-amp motor.",
    specs: {
      Pressure: "2030 PSI max",
      Flow: "1.76 GPM max",
      Motor: "14.5-amp / 1800W",
      "Hose Length": "20 ft high-pressure hose",
      Nozzles: "5 quick-connect tips (0°, 15°, 25°, 40°, soap)",
      Weight: "31 lbs",
    },
  },

  // ========== AUDIO ==========
  {
    slug: "sony-wh1000xm5",
    name: "WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    category: "audio",
    image: "/products/sony-xm5.jpg",
    priceLow: 298,
    priceHigh: 398,
    useCases: ["music", "travel", "work", "noise-cancelling"],
    description:
      "Industry-leading noise cancelling headphones with Auto NC Optimizer, crystal-clear hands-free calling, and up to 30 hours of battery life.",
    specs: {
      Driver: "30mm, dome type",
      "Noise Cancelling": "Dual processor, 8 microphones",
      Battery: "Up to 30 hours (NC on)",
      Charging: "USB-C, 3 min quick charge = 3 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.2, Multipoint",
    },
  },
  {
    slug: "airpods-pro-2",
    name: "AirPods Pro 2 (USB-C)",
    brand: "Apple",
    category: "audio",
    image: "/products/airpods-pro-2.jpg",
    priceLow: 199,
    priceHigh: 249,
    useCases: ["music", "everyday", "fitness", "noise-cancelling"],
    description:
      "Apple's premium earbuds with H2 chip, Adaptive Audio, Personalized Spatial Audio, and up to 2x more Active Noise Cancellation than the previous generation.",
    specs: {
      Chip: "Apple H2",
      "Noise Cancelling": "Active Noise Cancellation + Transparency + Adaptive",
      Battery: "Up to 6 hours (ANC on), 30 hours with case",
      Resistance: "IP54 dust, sweat, and water resistant",
      Weight: "5.3g per earbud",
      Connectivity: "Bluetooth 5.3",
    },
  },
  {
    slug: "jbl-flip-6",
    name: "Flip 6 Portable Bluetooth Speaker",
    brand: "JBL",
    category: "audio",
    image: "/products/jbl-flip-6.jpg",
    priceLow: 99,
    priceHigh: 129,
    useCases: ["music", "outdoor", "travel", "budget"],
    description:
      "Portable waterproof Bluetooth speaker with powerful JBL Original Pro Sound, bold bass, and 12 hours of playtime.",
    specs: {
      Output: "30W (20W woofer + 10W tweeter)",
      Battery: "Up to 12 hours",
      Waterproof: "IP67 waterproof and dustproof",
      Connectivity: "Bluetooth 5.1, PartyBoost",
      Weight: "550g",
      Dimensions: '7.1" × 2.7" × 2.8"',
    },
  },
  {
    slug: "bose-quietcomfort-ultra",
    name: "QuietComfort Ultra Headphones",
    brand: "Bose",
    category: "audio",
    image: "/products/bose-qc-ultra.jpg",
    priceLow: 379,
    priceHigh: 429,
    useCases: ["music", "travel", "work", "noise-cancelling"],
    description:
      "Premium over-ear headphones with world-class noise cancellation, Immersive Audio, and CustomTune sound calibration.",
    specs: {
      "Noise Cancelling": "World-class ANC with Quiet and Aware modes",
      Battery: "Up to 24 hours",
      Audio: "Bose Immersive Audio, CustomTune",
      Charging: "USB-C, 15 min quick charge = 2.5 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.3, Multipoint",
    },
  },

  // ========== EXTRA PRODUCTS ==========
  {
    slug: "acer-swift-go-14",
    name: "Swift Go 14 OLED",
    brand: "Acer",
    category: "laptops",
    image: "/products/acer-swift-go-14.jpg",
    priceLow: 699,
    priceHigh: 999,
    useCases: ["school", "everyday", "creative", "budget"],
    description:
      "Thin and light 14-inch laptop with a stunning 2.8K OLED display, Intel Core Ultra processors, and all-day battery life at an accessible price.",
    specs: {
      Processor: "Intel Core Ultra 5 125H / Ultra 7 155H",
      RAM: "16GB LPDDR5x",
      Storage: "512GB / 1TB SSD",
      Display: '14" 2.8K OLED (2880 × 1800), 90Hz',
      Battery: "Up to 11 hours",
      Weight: "2.87 lbs (1.3 kg)",
    },
  },
  {
    slug: "samsung-galaxy-a55",
    name: "Galaxy A55 5G",
    brand: "Samsung",
    category: "phones",
    image: "/products/galaxy-a55.jpg",
    priceLow: 329,
    priceHigh: 429,
    useCases: ["everyday", "budget", "photography"],
    description:
      "Samsung's best mid-range phone with a Super AMOLED display, triple camera system, IP67 water resistance, and 4 years of OS updates.",
    specs: {
      Processor: "Samsung Exynos 1480",
      RAM: "8GB",
      Storage: "128GB / 256GB (expandable via microSD)",
      Display: '6.6" Super AMOLED, 120Hz (2340 × 1080)',
      Battery: "5,000 mAh, 25W charging",
      Camera: "50MP Wide + 12MP Ultra Wide + 5MP Macro",
    },
  },
  {
    slug: "blackdecker-hedge-trimmer",
    name: "20V MAX Cordless Hedge Trimmer",
    brand: "BLACK+DECKER",
    category: "lawn-garden",
    image: "/products/blackdecker-trimmer.jpg",
    priceLow: 69,
    priceHigh: 99,
    useCases: ["gardening", "hedge-trimming", "budget"],
    description:
      "Lightweight cordless hedge trimmer with 22-inch dual-action blade, 3/4-inch cutting capacity, and a wraparound front handle for comfortable use.",
    specs: {
      Power: "20V MAX Lithium-Ion",
      "Blade Length": '22" dual-action',
      "Cutting Capacity": '3/4" diameter',
      Runtime: "Up to 40 minutes per charge",
      Weight: "5.3 lbs (with battery)",
      Warranty: "2-year limited warranty",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.useCases.some((uc) => uc.toLowerCase().includes(q))
  );
}
