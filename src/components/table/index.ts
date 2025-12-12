export interface TableColumn {
  key: string;
  header: string;
}

export interface TableRow {
  [key: string]: any;
}

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
}
