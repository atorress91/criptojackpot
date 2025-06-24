'use client';

import { Money, Ticket, TrendUp, Users } from '@phosphor-icons/react';

const StatsSection = () => {
  return (
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
  );
};

export default StatsSection;
