'use client';

import RecentActivityTable from '@/components/admin-panel/RecentActivityTable';
import { Users, Ticket, Money, TrendUp } from '@phosphor-icons/react';
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="col-lg-9">
      <div className="user-panel-wrapper">
        <h3 className="n4-clr fw_700 mb-xxl-10 mb-6">Dashboard de Administración</h3>

        {/* Stats Cards */}
        <div className="row g-4 mb-6">
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted mb-2">Total Usuarios</p>
                    <h3 className="fw-bold mb-0">1,234</h3>
                    <small className="text-success">+12% este mes</small>
                  </div>
                  <div className="act4-bg rounded-circle p-3">
                    <Users size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted mb-2">Tickets Vendidos</p>
                    <h3 className="fw-bold mb-0">5,678</h3>
                    <small className="text-success">+8% este mes</small>
                  </div>
                  <div className="act4-bg rounded-circle p-3">
                    <Ticket size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted mb-2">Ingresos Total</p>
                    <h3 className="fw-bold mb-0">$45,678</h3>
                    <small className="text-success">+15% este mes</small>
                  </div>
                  <div className="act4-bg rounded-circle p-3">
                    <Money size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted mb-2">Tasa Conversión</p>
                    <h3 className="fw-bold mb-0">3.2%</h3>
                    <small className="text-danger">-2% este mes</small>
                  </div>
                  <div className="act4-bg rounded-circle p-3">
                    <TrendUp size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RecentActivityTable />

        {/* Quick Actions */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-4">
            <h5 className="mb-0">Acciones Rápidas</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <Link href="/admin/users" className="btn btn-outline-primary w-100">
                  <Users className="me-2" size={20} />
                  Gestionar Usuarios
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/admin/tickets" className="btn btn-outline-success w-100">
                  <Ticket className="me-2" size={20} />
                  Ver Tickets
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/admin/reports" className="btn btn-outline-info w-100">
                  <TrendUp className="me-2" size={20} />
                  Generar Reporte
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/admin/announcements" className="btn btn-outline-warning w-100">
                  <Money className="me-2" size={20} />
                  Nuevo Anuncio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
