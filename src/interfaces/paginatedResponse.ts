export interface PaginatedData<T> {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: PaginatedData<T>;
  code?: number;
  message?: string;
}
