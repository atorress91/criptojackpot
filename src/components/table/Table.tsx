import React from 'react';
import { TableProps } from '@/components/table/index';

const Table: React.FC<TableProps> = ({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No hay datos disponibles',
  pagination,
  onPageChange,
}) => {
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-5">
        <p className="text-muted mb-0">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>
                  <span className="n4-clr fs20 fw_700">{col.header}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.id ?? rowIndex}>
                {columns.map(col => (
                  <td key={col.key}>
                    <span className="n3-clr">{row[col.key]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center p-3 border-top">
          <span className="text-muted small">
            Mostrando {(pagination.pageNumber - 1) * pagination.pageSize + 1} -{' '}
            {Math.min(pagination.pageNumber * pagination.pageSize, pagination.totalCount)} de {pagination.totalCount}
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${pagination.pageNumber <= 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => onPageChange?.(pagination.pageNumber - 1)}
                  disabled={pagination.pageNumber <= 1}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const startPage = Math.max(1, pagination.pageNumber - 2);
                const page = startPage + i;
                if (page > pagination.totalPages) return null;
                return (
                  <li key={page} className={`page-item ${pagination.pageNumber === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange?.(page)}>
                      {page}
                    </button>
                  </li>
                );
              })}
              <li className={`page-item ${pagination.pageNumber >= pagination.totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => onPageChange?.(pagination.pageNumber + 1)}
                  disabled={pagination.pageNumber >= pagination.totalPages}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Table;
