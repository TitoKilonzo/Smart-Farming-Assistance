export interface Seed {
  _id?: string;
  name: string;
  rainfallRequirement: 'high' | 'low';
  description: string;
  growingSeason: string;
  waterRequirement: string;
  yield: string;
  suitableRegions: string[];
  climateZone: string;
  soilType: string[];
  plantingTime: string;
  harvestTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  _id?: string;
  name: string;
  region: string;
  country: string;
  rainfallPattern: 'high' | 'low';
  annualRainfall: number; // in mm
  rainySeason: string;
  climateZone: string;
  temperature: {
    min: number;
    max: number;
    average: number;
  };
  soilType: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SeedSuggestionRequest {
  location?: string;
  rainfallType?: 'high' | 'low';
  region?: string;
}

export interface SeedSuggestion {
  seed: Seed;
  location: Location;
  matchScore: number;
  reasons: string[];
}