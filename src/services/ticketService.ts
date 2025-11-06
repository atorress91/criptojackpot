import { BaseService } from './baseService';
import { Ticket, TicketFilters } from '@/interfaces/ticket';
import { Response } from '@/interfaces/response';

class TicketService extends BaseService {
  protected endpoint = 'tickets';

  async getTickets(filters?: TicketFilters): Promise<Ticket[]> {
    try {
      const params: Record<string, string> = {};
      if (filters?.status) params.status = filters.status;
      if (filters?.page) params.page = filters.page.toString();
      if (filters?.limit) params.limit = filters.limit.toString();
      if (filters?.search) params.search = filters.search;

      const response = await this.apiClient.get<Response<Ticket[]>>(this.endpoint, { params });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async getTicketById(id: string): Promise<Ticket> {
    return this.getById<Ticket>(id);
  }

  async createTicket(data: FormData): Promise<Ticket> {
    try {
      const response = await this.apiClient.post<Response<Ticket>>(this.endpoint, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async updateTicket(id: string, data: FormData): Promise<Ticket> {
    try {
      const response = await this.apiClient.put<Response<Ticket>>(`${this.endpoint}/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async deleteTicket(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      return this.handleError(error as any);
    }
  }

  async updateTicketStatus(id: string, status: string): Promise<Ticket> {
    return this.patch<Ticket>(`${this.endpoint}/${id}/status`, { status });
  }
}

export { TicketService };
