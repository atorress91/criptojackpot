export interface Prize {
  id: string;
  name: string;
  description: string;
  value: number;
  imageUrl: string;
  category: 'electronics' | 'jewelry' | 'vehicles' | 'real-estate' | 'luxury' | 'cash' | 'other';
  brand?: string;
  model?: string;
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePrizeData {
  name: string;
  description: string;
  value: number;
  image: File | null;
  category: string;
  brand?: string;
  model?: string;
  specifications?: Record<string, string>;
}

export interface UpdatePrizeData extends Partial<CreatePrizeData> {
  id: string;
}

export interface PrizeFilters {
  category?: string;
  minValue?: number;
  maxValue?: number;
  page?: number;
  limit?: number;
  search?: string;
}
