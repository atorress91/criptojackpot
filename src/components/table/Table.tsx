import React from 'react';
import { TableProps } from '@/components/table/index';

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
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
  );
};

export default Table;
