'use client';

import React from 'react';
import { recentActivity } from 'public/data/recentActivity';

const RecentActivityTable: React.FC = () => {
  return (
    <div className="card border-0 shadow-sm mb-6">
      <div className="card-header bg-white py-4">
        <h5 className="mb-0">Actividad Reciente</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Ticket/Producto</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.user}</td>
                  <td>{activity.action}</td>
                  <td>{activity.ticket}</td>
                  <td>{activity.date}</td>
                  <td>
                    <span className={`badge bg-${activity.statusColor}-subtle text-${activity.statusColor}`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTable;
