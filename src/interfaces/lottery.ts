import { Prize } from './prize';

export interface Lottery {
  id: string;
  name: string;
  description: string;
  price: number;
  drawDate: Date;
  drawTime: string;
  totalTickets: number;
  soldTickets: number;
  remainingTickets: number;
  percentageSold: number;
  status: 'active' | 'closed' | 'upcoming' | 'completed';
  prizeId?: string;
  prize?: Prize; // Información del premio asociado (incluye mainImageUrl)
  createdAt: Date;
  updatedAt: Date;
}

export enum LotteryType {
  Standard = 0,
  Instant = 1,
  Daily = 2,
  Weekly = 3,
  Monthly = 4,
}

export interface CreateLotteryRequest {
  title: string;
  description: string;
  minNumber: number;
  maxNumber: number;
  totalSeries: number;
  ticketPrice: number;
  maxTickets: number;
  startDate: string;
  endDate: string;
  status: LotteryStatus;
  type: LotteryType;
  terms: string;
  hasAgeRestriction: boolean;
  minimumAge?: number;
  restrictedCountries: string[];
}

export interface UpdateLotteryRequest extends Partial<CreateLotteryRequest> {
  id: string;
}

export interface CreateLotteryData {
  name: string;
  description: string;
  price: number;
  drawDate: string;
  drawTime: string;
  totalTickets: number;
  status: 'active' | 'upcoming';
  prizeId?: string;
}

export enum LotteryStatus {
  Draft = 0,
  Active = 1,
  Paused = 2,
  Completed = 3,
  Cancelled = 4,
}

export interface LotteryFilters {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
}
