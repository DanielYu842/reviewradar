import { Review, Platform, PlatformRating, ProConItem, AnalysisResult } from "./types";

const POSITIVE_WORDS = new Set([
  "great", "excellent", "amazing", "awesome", "fantastic", "love", "loved",
  "perfect", "best", "wonderful", "beautiful", "solid", "reliable", "smooth",
  "fast", "powerful", "impressive", "outstanding", "superb", "brilliant",
  "comfortable", "durable", "sturdy", "premium", "quality", "worth",
  "recommend", "recommended", "happy", "pleased", "satisfied", "incredible",
  "gorgeous", "sharp", "bright", "crisp", "lightweight", "quiet", "easy",
  "intuitive", "versatile", "convenient", "efficient", "exceptional",
  "flawless", "stellar", "phenomenal", "delighted", "enjoyable", "glad",
  "handy", "neat", "nice", "pleasant", "terrific", "unbeatable",
]);

const NEGATIVE_WORDS = new Set([
  "bad", "terrible", "awful", "horrible", "worst", "hate", "hated",
  "poor", "cheap", "broken", "disappointing", "disappointed", "slow",
  "loud", "noisy", "heavy", "expensive", "overpriced", "flimsy",
  "weak", "mediocre", "frustrating", "annoying", "useless", "waste",
  "defective", "faulty", "unreliable", "uncomfortable", "ugly", "dim",
  "fragile", "clunky", "laggy", "bloated", "overheating", "hot",
  "regret", "return", "returned", "refund", "complaint", "issue",
  "problem", "problems", "issues", "broke", "cracked", "scratched",
  "junk", "garbage", "trash", "nightmare", "sucks", "sucked",
]);

const STOP_WORDS = new Set([
  "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
  "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
  "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
  "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
  "these", "those", "am", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
  "the", "and", "but", "if", "or", "because", "as", "until", "while", "of",
  "at", "by", "for", "with", "about", "against", "between", "through",
  "during", "before", "after", "above", "below", "to", "from", "up", "down",
  "in", "out", "on", "off", "over", "under", "again", "further", "then",
  "once", "here", "there", "when", "where", "why", "how", "all", "both",
  "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not",
  "only", "own", "same", "so", "than", "too", "very", "s", "t", "can",
  "will", "just", "don", "should", "now", "d", "ll", "m", "o", "re", "ve",
  "y", "ain", "aren", "couldn", "didn", "doesn", "hadn", "hasn", "haven",
  "isn", "ma", "mightn", "mustn", "needn", "shan", "shouldn", "wasn",
  "weren", "won", "wouldn", "get", "got", "one", "also", "would", "could",
  "really", "much", "like", "still", "even", "way", "thing", "things",
  "use", "used", "using", "well", "good", "go", "going", "went", "back",
  "make", "makes", "made", "been", "come", "came", "take", "took", "know",
  "knew", "think", "thought", "see", "saw", "want", "wanted", "look",
  "looked", "give", "gave", "tell", "told", "work", "works", "worked",
  "say", "said", "try", "tried", "need", "needed", "feel", "felt", "put",
  "keep", "kept", "let", "seem", "seemed", "help", "show", "hear", "play",
  "run", "move", "live", "believe", "bring", "happen", "write", "provide",
  "sit", "stand", "lose", "pay", "meet", "include", "continue", "set",
  "learn", "change", "lead", "understand", "watch", "follow", "stop",
  "create", "speak", "read", "spend", "grow", "open", "walk", "win",
  "teach", "offer", "remember", "consider", "appear", "buy", "bought",
  "wait", "serve", "die", "send", "build", "stay", "fall", "cut", "reach",
  "kill", "remain", "suggest", "raise", "pass", "sell", "require", "report",
  "decide", "pull", "ve", "re", "ll", "bit", "lot", "pretty", "quite",
  "enough", "many", "every", "new", "old", "first", "last", "long", "little",
  "big", "small", "sure", "since", "though", "however", "already", "yet",
  "maybe", "probably", "definitely", "actually", "basically", "honestly",
]);

const ASPECT_PATTERNS: Record<string, string[]> = {
  "battery life": ["battery", "charge", "charging", "lasts", "hours", "runtime", "dies"],
  "build quality": ["build", "construction", "solid", "sturdy", "premium", "cheap", "flimsy", "plastic", "metal", "aluminum"],
  "display": ["display", "screen", "oled", "brightness", "colors", "resolution", "retina", "panel", "hdr"],
  "performance": ["performance", "fast", "speed", "snappy", "lag", "laggy", "slow", "processor", "cpu", "ram", "smooth"],
  "keyboard": ["keyboard", "typing", "keys", "key", "travel", "tactile"],
  "camera": ["camera", "photo", "photos", "picture", "pictures", "video", "lens", "zoom", "portrait", "night"],
  "price / value": ["price", "value", "money", "worth", "expensive", "affordable", "cheap", "cost", "budget", "overpriced"],
  "noise level": ["noise", "noisy", "loud", "quiet", "silent", "sound", "volume", "decibel"],
  "durability": ["durable", "durability", "lasted", "lasts", "broke", "broken", "reliable", "warranty", "years"],
  "ease of use": ["easy", "simple", "intuitive", "user-friendly", "straightforward", "learning curve", "complicated", "confusing"],
  "weight / portability": ["weight", "heavy", "light", "lightweight", "portable", "carry", "travel", "thin"],
  "power": ["power", "powerful", "watt", "motor", "engine", "strong", "torque"],
  "customer service": ["support", "customer service", "warranty", "return", "replacement", "service"],
  "software": ["software", "app", "update", "updates", "bloatware", "os", "android", "ios"],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

export function scoreSentiment(text: string): number {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  let counted = 0;

  const negators = new Set(["not", "no", "never", "don't", "doesn't", "didn't", "isn't", "wasn't", "won't", "can't", "couldn't", "wouldn't", "shouldn't"]);
  let negated = false;

  for (let i = 0; i < words.length; i++) {
    const clean = words[i].replace(/[^a-z]/g, "");
    if (negators.has(words[i]) || negators.has(clean)) {
      negated = true;
      continue;
    }
    if (POSITIVE_WORDS.has(clean)) {
      score += negated ? -0.5 : 1;
      counted++;
      negated = false;
    } else if (NEGATIVE_WORDS.has(clean)) {
      score += negated ? 0.5 : -1;
      counted++;
      negated = false;
    } else {
      if (i > 0) negated = false;
    }
  }

  if (counted === 0) return 0;
  return Math.max(-1, Math.min(1, score / counted));
}

function extractKeywords(reviews: Review[]): Map<string, { count: number; sentiment: number }> {
  const freq = new Map<string, { count: number; totalSentiment: number }>();

  for (const review of reviews) {
    const tokens = tokenize(review.text);
    const sentiment = scoreSentiment(review.text);
    const seen = new Set<string>();

    for (const token of tokens) {
      if (seen.has(token)) continue;
      seen.add(token);
      const existing = freq.get(token) || { count: 0, totalSentiment: 0 };
      existing.count++;
      existing.totalSentiment += sentiment;
      freq.set(token, existing);
    }
  }

  const result = new Map<string, { count: number; sentiment: number }>();
  for (const [word, data] of freq) {
    if (data.count >= 2) {
      result.set(word, {
        count: data.count,
        sentiment: data.totalSentiment / data.count,
      });
    }
  }
  return result;
}

function detectAspects(reviews: Review[]): { pros: ProConItem[]; cons: ProConItem[] } {
  const aspectScores = new Map<string, { positive: number; negative: number; total: number }>();

  for (const review of reviews) {
    const textLower = review.text.toLowerCase();
    const sentiment = scoreSentiment(review.text);
    const ratingBias = review.rating !== null ? (review.rating - 3) / 2 : 0;
    const effectiveSentiment = sentiment * 0.7 + ratingBias * 0.3;

    for (const [aspect, keywords] of Object.entries(ASPECT_PATTERNS)) {
      const mentioned = keywords.some((kw) => textLower.includes(kw));
      if (mentioned) {
        const current = aspectScores.get(aspect) || { positive: 0, negative: 0, total: 0 };
        current.total++;
        if (effectiveSentiment > 0.1) current.positive++;
        else if (effectiveSentiment < -0.1) current.negative++;
        aspectScores.set(aspect, current);
      }
    }
  }

  const pros: ProConItem[] = [];
  const cons: ProConItem[] = [];
  const totalReviews = reviews.length;

  for (const [aspect, scores] of aspectScores) {
    if (scores.total < 2) continue;

    const mentionPercent = Math.round((scores.total / totalReviews) * 100);

    if (scores.positive > scores.negative) {
      const positiveRatio = scores.positive / scores.total;
      if (positiveRatio > 0.5) {
        const label = `${aspect.charAt(0).toUpperCase() + aspect.slice(1)} praised in ${Math.round(positiveRatio * 100)}% of mentions`;
        pros.push({ text: label, mentionPercent });
      }
    } else if (scores.negative > scores.positive) {
      const negativeRatio = scores.negative / scores.total;
      if (negativeRatio > 0.4) {
        const label = `${aspect.charAt(0).toUpperCase() + aspect.slice(1)} criticized in ${Math.round(negativeRatio * 100)}% of mentions`;
        cons.push({ text: label, mentionPercent });
      }
    }
  }

  // Supplement with keyword-based pros/cons if aspects are sparse
  if (pros.length < 3 || cons.length < 2) {
    const keywords = extractKeywords(reviews);
    const sortedKeywords = [...keywords.entries()].sort((a, b) => b[1].count - a[1].count);

    for (const [word, data] of sortedKeywords) {
      if (pros.length >= 5 && cons.length >= 4) break;
      const mentionPercent = Math.round((data.count / totalReviews) * 100);
      if (mentionPercent < 10) continue;

      const alreadyInPros = pros.some((p) => p.text.toLowerCase().includes(word));
      const alreadyInCons = cons.some((c) => c.text.toLowerCase().includes(word));
      if (alreadyInPros || alreadyInCons) continue;

      if (data.sentiment > 0.2 && pros.length < 5) {
        pros.push({
          text: `"${word}" mentioned positively by ${mentionPercent}% of reviewers`,
          mentionPercent,
        });
      } else if (data.sentiment < -0.2 && cons.length < 4) {
        cons.push({
          text: `"${word}" mentioned negatively by ${mentionPercent}% of reviewers`,
          mentionPercent,
        });
      }
    }
  }

  pros.sort((a, b) => b.mentionPercent - a.mentionPercent);
  cons.sort((a, b) => b.mentionPercent - a.mentionPercent);

  return { pros: pros.slice(0, 5), cons: cons.slice(0, 4) };
}

function computePlatformRatings(reviews: Review[], productName: string): PlatformRating[] {
  const platformData = new Map<Platform, { ratings: number[]; count: number; sentiments: number[] }>();

  for (const review of reviews) {
    const data = platformData.get(review.platform) || { ratings: [], count: 0, sentiments: [] };
    data.count++;
    if (review.rating !== null) {
      data.ratings.push(review.rating);
    }
    data.sentiments.push(scoreSentiment(review.text));
    platformData.set(review.platform, data);
  }

  const result: PlatformRating[] = [];
  const encoded = encodeURIComponent(productName);
  const platformUrls: Record<Platform, string> = {
    amazon: `https://www.amazon.com/s?k=${encoded}`,
    reddit: `https://www.reddit.com/search/?q=${encoded}+review`,
    youtube: `https://www.youtube.com/results?search_query=${encoded}+review`,
    bestbuy: `https://www.bestbuy.com/site/searchpage.jsp?st=${encoded}`,
    walmart: `https://www.walmart.com/search?q=${encoded}`,
  };

  for (const [platform, data] of platformData) {
    let averageRating: number | null = null;
    if (data.ratings.length > 0) {
      averageRating = parseFloat((data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length).toFixed(1));
    } else {
      const avgSentiment = data.sentiments.reduce((a, b) => a + b, 0) / data.sentiments.length;
      averageRating = parseFloat(((avgSentiment + 1) * 2.5).toFixed(1));
    }

    result.push({
      platform,
      averageRating,
      reviewCount: data.count,
      url: platformUrls[platform],
    });
  }

  return result.sort((a, b) => b.reviewCount - a.reviewCount);
}

function computeTrustScore(reviews: Review[], platformRatings: PlatformRating[]): number {
  let score = 0;

  // Factor 1: Number of platforms (more = more trustworthy) — up to 25 points
  const platformCount = platformRatings.length;
  score += Math.min(25, platformCount * 5);

  // Factor 2: Total review volume — up to 25 points
  const totalReviews = reviews.length;
  if (totalReviews >= 50) score += 25;
  else if (totalReviews >= 30) score += 20;
  else if (totalReviews >= 20) score += 15;
  else if (totalReviews >= 10) score += 10;
  else score += 5;

  // Factor 3: Cross-platform agreement (low std dev of ratings) — up to 25 points
  const ratings = platformRatings.filter((p) => p.averageRating !== null).map((p) => p.averageRating!);
  if (ratings.length >= 2) {
    const mean = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const variance = ratings.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / ratings.length;
    const stdDev = Math.sqrt(variance);
    if (stdDev < 0.3) score += 25;
    else if (stdDev < 0.5) score += 20;
    else if (stdDev < 0.8) score += 15;
    else if (stdDev < 1.0) score += 10;
    else score += 5;
  }

  // Factor 4: Recency — up to 25 points
  const now = new Date();
  const dates = reviews.map((r) => new Date(r.date));
  const recentCount = dates.filter((d) => now.getTime() - d.getTime() < 180 * 24 * 60 * 60 * 1000).length;
  const recencyRatio = recentCount / totalReviews;
  score += Math.round(recencyRatio * 25);

  return Math.min(100, Math.max(0, score));
}

export function analyzeProduct(reviews: Review[], slug: string, productName?: string): AnalysisResult {
  if (reviews.length === 0) {
    return {
      aggregatedRating: 0,
      totalReviews: 0,
      trustScore: 0,
      platformRatings: [],
      pros: [],
      cons: [],
      sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
    };
  }

  const platformRatings = computePlatformRatings(reviews, productName || slug);

  // Aggregated rating: weighted average of platform ratings by review count
  let weightedSum = 0;
  let weightTotal = 0;
  for (const pr of platformRatings) {
    if (pr.averageRating !== null) {
      weightedSum += pr.averageRating * pr.reviewCount;
      weightTotal += pr.reviewCount;
    }
  }
  const aggregatedRating = weightTotal > 0 ? parseFloat((weightedSum / weightTotal).toFixed(1)) : 0;

  const trustScore = computeTrustScore(reviews, platformRatings);
  const { pros, cons } = detectAspects(reviews);

  // Sentiment breakdown
  let positive = 0;
  let neutral = 0;
  let negative = 0;
  for (const review of reviews) {
    const s = scoreSentiment(review.text);
    if (s > 0.15) positive++;
    else if (s < -0.15) negative++;
    else neutral++;
  }

  return {
    aggregatedRating,
    totalReviews: reviews.length,
    trustScore,
    platformRatings,
    pros,
    cons,
    sentimentBreakdown: {
      positive: Math.round((positive / reviews.length) * 100),
      neutral: Math.round((neutral / reviews.length) * 100),
      negative: Math.round((negative / reviews.length) * 100),
    },
  };
}
