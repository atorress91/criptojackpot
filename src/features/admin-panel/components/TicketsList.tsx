'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useTickets } from '@/features/admin-panel/hooks';
import { Ticket } from '@/interfaces/ticket';
import Image from 'next/image';

const TicketsList: React.FC = () => {
  const { t } = useTranslation();
  const { tickets, isLoading, deleteTicket, isDeleting } = useTickets();

  const handleDelete = async (id: string, name: string) => {
    if (globalThis.confirm(t('TICKETS_ADMIN.confirmDelete', `¿Estás seguro de eliminar el ticket "${name}"?`))) {
      await deleteTicket(id);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      active: 'badge bg-success',
      closed: 'badge bg-secondary',
      upcoming: 'badge bg-info',
      completed: 'badge bg-primary',
    };
    return badges[status] || 'badge bg-secondary';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      active: t('TICKETS_ADMIN.status.active', 'Activo'),
      closed: t('TICKETS_ADMIN.status.closed', 'Cerrado'),
      upcoming: t('TICKETS_ADMIN.status.upcoming', 'Próximamente'),
      completed: t('TICKETS_ADMIN.status.completed', 'Completado'),
    };
    return texts[status] || status;
  };

  if (isLoading) {
    return (
      <div className="col-lg-9">
        <div className="user-panel-wrapper">
          <div className="text-center py-5">
            <div className="spinner-border text-primary">
              <span className="visually-hidden">{t('COMMON.loading', 'Cargando...')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-9">
      <div className="user-panel-wrapper">
        <div className="d-flex justify-content-between align-items-center mb-xxl-10 mb-6">
          <h3 className="n4-clr fw_700 mb-0">{t('TICKETS_ADMIN.title', 'Gestión de Tickets')}</h3>
          <Link href="/admin/tickets/create" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            {t('TICKETS_ADMIN.create.button', 'Crear Ticket')}
          </Link>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0">{t('TICKETS_ADMIN.list.title', 'Lista de Tickets de Sorteo')}</h5>
          </div>
          <div className="card-body p-0">
            {tickets && tickets.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '100px' }}>{t('TICKETS_ADMIN.columns.image', 'Imagen')}</th>
                      <th>{t('TICKETS_ADMIN.columns.name', 'Nombre')}</th>
                      <th>{t('TICKETS_ADMIN.columns.prize', 'Premio')}</th>
                      <th>{t('TICKETS_ADMIN.columns.price', 'Precio')}</th>
                      <th>{t('TICKETS_ADMIN.columns.drawDate', 'Sorteo')}</th>
                      <th>{t('TICKETS_ADMIN.columns.tickets', 'Tickets')}</th>
                      <th>{t('TICKETS_ADMIN.columns.sold', 'Vendidos')}</th>
                      <th>{t('TICKETS_ADMIN.columns.status', 'Estado')}</th>
                      <th style={{ width: '150px' }}>{t('TICKETS_ADMIN.columns.actions', 'Acciones')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket: Ticket) => (
                      <tr key={ticket.id}>
                        <td>
                          <Image
                            src={ticket.imageUrl || '/images/placeholder.jpg'}
                            alt={ticket.name}
                            width={80}
                            height={80}
                            className="rounded"
                            style={{ objectFit: 'cover' }}
                          />
                        </td>
                        <td>
                          <div className="fw-semibold">{ticket.name}</div>
                          <small className="text-muted">{ticket.description?.substring(0, 50)}...</small>
                        </td>
                        <td>
                          {ticket.prize ? (
                            <div>
                              <div className="fw-semibold text-primary">{ticket.prize.name}</div>
                              <small className="text-muted">${ticket.prize.value.toLocaleString()}</small>
                            </div>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          <span className="fw-bold text-success">${ticket.price.toFixed(2)}</span>
                          <br />
                          <small className="text-muted">por entrada</small>
                        </td>
                        <td>
                          <div>
                            <i className="far fa-calendar me-1"></i>
                            {new Date(ticket.drawDate).toLocaleDateString()}
                          </div>
                          <small className="text-muted">
                            <i className="far fa-clock me-1"></i>
                            {ticket.drawTime}
                          </small>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark">{ticket.totalTickets}</span>
                        </td>
                        <td>
                          <div className="d-flex flex-column gap-1">
                            <div>
                              <span className="fw-semibold">{ticket.soldTickets}</span>
                              <small className="text-muted"> / {ticket.totalTickets}</small>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div
                                className="progress-bar"
                                style={{ width: `${ticket.percentageSold}%` }}
                                aria-label={`${ticket.percentageSold}% vendido`}
                              />
                            </div>
                            <small className="text-muted">{ticket.percentageSold}%</small>
                          </div>
                        </td>
                        <td>
                          <span className={getStatusBadge(ticket.status)}>{getStatusText(ticket.status)}</span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link
                              href={`/admin/tickets/${ticket.id}/edit`}
                              className="btn btn-outline-primary"
                              title={t('COMMON.edit', 'Editar')}
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(ticket.id, ticket.name)}
                              disabled={isDeleting}
                              title={t('COMMON.delete', 'Eliminar')}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="fas fa-ticket-alt fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">{t('TICKETS_ADMIN.empty', 'No hay tickets creados')}</h5>
                <p className="text-muted mb-4">
                  {t('TICKETS_ADMIN.emptyMessage', 'Comienza creando tu primer ticket de sorteo')}
                </p>
                <Link href="/admin/tickets/create" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>
                  {t('TICKETS_ADMIN.create.button', 'Crear Ticket')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsList;
