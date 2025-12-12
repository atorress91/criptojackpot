'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useLotteries } from '@/features/admin-panel/hooks';
import { Lottery, LotteryStatus, LotteryType } from '@/interfaces/lottery';
import Table from '@/components/table/Table';
import { TableColumn } from '@/components/table';
import { Plus, Pencil, Eye, Trash2, Play, Pause, Calendar, Ticket } from 'lucide-react';

const LotteriesList: React.FC = () => {
  const { t } = useTranslation();
  const { lotteries, isLoading, pagination, goToPage, deleteLottery, updateStatus, isDeleting } = useLotteries({
    pageNumber: 1,
    pageSize: 10,
  });

  const getStatusBadge = (status: LotteryStatus) => {
    const badges: Record<LotteryStatus, string> = {
      [LotteryStatus.Draft]: 'badge bg-secondary',
      [LotteryStatus.Active]: 'badge bg-success',
      [LotteryStatus.Paused]: 'badge bg-warning text-dark',
      [LotteryStatus.Completed]: 'badge bg-info',
      [LotteryStatus.Cancelled]: 'badge bg-danger',
    };
    return badges[status] || 'badge bg-secondary';
  };

  const getStatusText = (status: LotteryStatus) => {
    const texts: Record<LotteryStatus, string> = {
      [LotteryStatus.Draft]: t('LOTTERY_ADMIN.status.draft', 'Borrador'),
      [LotteryStatus.Active]: t('LOTTERY_ADMIN.status.active', 'Activa'),
      [LotteryStatus.Paused]: t('LOTTERY_ADMIN.status.paused', 'Pausada'),
      [LotteryStatus.Completed]: t('LOTTERY_ADMIN.status.completed', 'Completada'),
      [LotteryStatus.Cancelled]: t('LOTTERY_ADMIN.status.cancelled', 'Cancelada'),
    };
    return texts[status] || String(status);
  };

  const getTypeText = (type: LotteryType) => {
    const texts: Record<LotteryType, string> = {
      [LotteryType.Standard]: t('LOTTERY_ADMIN.type.standard', 'Estándar'),
      [LotteryType.Instant]: t('LOTTERY_ADMIN.type.instant', 'Instantánea'),
      [LotteryType.Daily]: t('LOTTERY_ADMIN.type.daily', 'Diaria'),
      [LotteryType.Weekly]: t('LOTTERY_ADMIN.type.weekly', 'Semanal'),
      [LotteryType.Monthly]: t('LOTTERY_ADMIN.type.monthly', 'Mensual'),
    };
    return texts[type] || String(type);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleDelete = (id: string) => {
    if (globalThis.confirm(t('LOTTERY_ADMIN.delete.confirm', '¿Estás seguro de eliminar esta lotería?'))) {
      deleteLottery(id);
    }
  };

  const handleToggleStatus = (lottery: Lottery) => {
    const newStatus = lottery.status === LotteryStatus.Active ? LotteryStatus.Paused : LotteryStatus.Active;
    updateStatus({ id: lottery.id, status: newStatus });
  };

  const columns: TableColumn[] = [
    { key: 'lotteryNo', header: t('LOTTERY_ADMIN.columns.number', 'Nº') },
    { key: 'title', header: t('LOTTERY_ADMIN.columns.title', 'Título') },
    { key: 'type', header: t('LOTTERY_ADMIN.columns.type', 'Tipo') },
    { key: 'price', header: t('LOTTERY_ADMIN.columns.price', 'Precio') },
    { key: 'tickets', header: t('LOTTERY_ADMIN.columns.tickets', 'Tickets') },
    { key: 'dates', header: t('LOTTERY_ADMIN.columns.dates', 'Fechas') },
    { key: 'status', header: t('LOTTERY_ADMIN.columns.status', 'Estado') },
    { key: 'actions', header: t('LOTTERY_ADMIN.columns.actions', 'Acciones') },
  ];

  const tableData = lotteries.map((lottery: Lottery) => ({
    id: lottery.id,
    lotteryNo: <span className="fw-bold text-primary">#{lottery.lotteryNo}</span>,
    title: (
      <div>
        <div className="fw-semibold">{lottery.title}</div>
        <small className="text-muted">{lottery.description?.substring(0, 40)}...</small>
      </div>
    ),
    type: <span className="badge bg-light text-dark">{getTypeText(lottery.type)}</span>,
    price: <span className="fw-bold text-success">${lottery.ticketPrice.toLocaleString()}</span>,
    tickets: (
      <div className="d-flex align-items-center gap-1">
        <Ticket size={14} className="text-muted" />
        <span>
          {lottery.soldTickets}/{lottery.maxTickets}
        </span>
      </div>
    ),
    dates: (
      <div className="small">
        <div className="d-flex align-items-center gap-1">
          <Calendar size={12} className="text-success" />
          <span>{formatDate(lottery.startDate)}</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <Calendar size={12} className="text-danger" />
          <span>{formatDate(lottery.endDate)}</span>
        </div>
      </div>
    ),
    status: <span className={getStatusBadge(lottery.status)}>{getStatusText(lottery.status)}</span>,
    actions: (
      <div className="btn-group btn-group-sm">
        <Link href={`/admin/lotteries/${lottery.id}`} className="btn btn-outline-info" title={t('COMMON.view', 'Ver')}>
          <Eye size={14} />
        </Link>
        <Link
          href={`/admin/lotteries/${lottery.id}/edit`}
          className="btn btn-outline-primary"
          title={t('COMMON.edit', 'Editar')}
        >
          <Pencil size={14} />
        </Link>
        {lottery.status !== LotteryStatus.Completed && lottery.status !== LotteryStatus.Cancelled && (
          <button
            className={`btn ${lottery.status === LotteryStatus.Active ? 'btn-outline-warning' : 'btn-outline-success'}`}
            onClick={() => handleToggleStatus(lottery)}
            title={
              lottery.status === LotteryStatus.Active ? t('COMMON.pause', 'Pausar') : t('COMMON.activate', 'Activar')
            }
          >
            {lottery.status === LotteryStatus.Active ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}
        <button
          className="btn btn-outline-danger"
          onClick={() => handleDelete(lottery.id)}
          disabled={isDeleting}
          title={t('COMMON.delete', 'Eliminar')}
        >
          <Trash2 size={14} />
        </button>
      </div>
    ),
  }));

  return (
    <div className="col-lg-9">
      <div className="user-panel-wrapper">
        <div className="d-flex justify-content-between align-items-center mb-xxl-10 mb-6">
          <h3 className="n4-clr fw_700">{t('LOTTERY_ADMIN.title', 'Gestión de Loterías')}</h3>
          <Link href="/admin/lotteries/create" className="btn btn-primary d-flex align-items-center gap-2">
            <Plus size={18} />
            {t('LOTTERY_ADMIN.create.button', 'Nueva Lotería')}
          </Link>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <Table
              columns={columns}
              data={tableData}
              isLoading={isLoading}
              emptyMessage={t('LOTTERY_ADMIN.empty', 'No hay loterías registradas')}
              pagination={pagination}
              onPageChange={goToPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteriesList;
