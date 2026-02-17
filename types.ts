
export enum WasteCategory {
  PLASTIC = 'Plastic',
  GLASS = 'Glass',
  METAL = 'Metal',
  PAPER = 'Paper',
  ORGANIC = 'Organic',
  NON_RECYCLABLE = 'Non-Recyclable'
}

export interface ClassificationResult {
  id: string;
  category: WasteCategory;
  confidence: number;
  recyclable: boolean;
  guidelines: string[];
  binColor: string;
  timestamp: string;
  imageUrl: string;
}

export interface UserStats {
  totalUploads: number;
  mostFrequent: WasteCategory;
  weeklyActivity: { day: string; count: number }[];
  avgConfidence: number;
}

export interface AdminStats {
  totalUsers: number;
  totalClassifications: number;
  distribution: { name: string; value: number }[];
  trends: { date: string; count: number }[];
}
