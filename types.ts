export interface Report {
  id: string;
  speciesName: string;
  sightingDate: string;
  location: string;
  photoBase64: string | null;
  reporterName?: string;
  reporterContact?: string;
  notes?: string;
  timestamp: number;
}

export enum AppView {
  Reporting = 'reporting',
  Learning = 'learning',
  Examples = 'examples', // Added new view
}

export interface ExampleSpecies {
  name: string;
  imageUrl: string;
  scientificName?: string; // Optional scientific name
}
