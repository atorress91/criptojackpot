import { Prize } from './prize';

export interface Ticket {
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

export interface CreateTicketData {
  name: string;
  description: string;
  price: number;
  drawDate: string;
  drawTime: string;
  totalTickets: number;
  status: 'active' | 'upcoming';
  prizeId?: string; // ID del premio asociado (la imagen se hereda del premio)
}

export interface UpdateTicketData extends Partial<CreateTicketData> {
  id: string;
}

export interface TicketFilters {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
}
