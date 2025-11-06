export interface Ticket {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  drawDate: Date;
  drawTime: string;
  totalTickets: number;
  soldTickets: number;
  remainingTickets: number;
  percentageSold: number;
  status: 'active' | 'closed' | 'upcoming' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTicketData {
  name: string;
  description: string;
  price: number;
  image: File | null;
  drawDate: string;
  drawTime: string;
  totalTickets: number;
  status: 'active' | 'upcoming';
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
