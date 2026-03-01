export type TerrainType = 'mountain' | 'forest' | 'desert' | 'coastal' | 'plains';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface GearItem {
  id: string;
  name: string;
  category: string;
  essential: boolean;
  packed: boolean;
  weight?: number;
  notes?: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  terrain: TerrainType;
  season: Season;
  startDate: string;
  endDate: string;
  groupSize: number;
  gearList: GearItem[];
  weatherData?: WeatherData;
  createdAt: string;
  updatedAt: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  icon: string;
}

export interface GearCategory {
  name: string;
  items: Omit<GearItem, 'id' | 'packed'>[];
}
