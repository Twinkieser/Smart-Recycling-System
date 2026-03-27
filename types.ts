
export enum WasteCategory {
  PLASTIC = 'Plastic',
  GLASS = 'Glass',
  METAL = 'Metal',
  PAPER = 'Paper',
  ORGANIC = 'Organic',
  NON_RECYCLABLE = 'Non-Recyclable'
}

export interface Reward {
  id: string;
  title: string;
  pointsRequired: number;
  description: string;
  category: string;
}

export interface WasteContainer {
  id: string;
  name: string;
  type: WasteCategory;
  lat: number;
  lng: number;
  address: string;
  fillLevel: number;
  status: 'available' | 'full' | 'maintenance';
}

export interface User {
  id: string;
  name: string;
  nativeName?: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  avatar: string;
  studentId: string;
  iin: string;
  birthdate: string;
  financing: string;
  course: number;
  status: string;
  studyingStatus: string;
  phone: string;
  points: number;
  level: number;
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
