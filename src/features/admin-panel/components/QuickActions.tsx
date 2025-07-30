'use client';

import { MoneyIcon, TrendUpIcon } from '@phosphor-icons/react';
import { Ticket, Users } from 'lucide-react';
import Link from 'next/link';

const QuickActions = () => {
  return (
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
              <TrendUpIcon className="me-2" size={20} />
              Generar Reporte
            </Link>
          </div>
          <div className="col-md-3">
            <Link href="/admin/announcements" className="btn btn-outline-warning w-100">
              <MoneyIcon className="me-2" size={20} />
              Nuevo Anuncio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
