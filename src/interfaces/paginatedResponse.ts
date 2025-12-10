export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  code: number;
}
