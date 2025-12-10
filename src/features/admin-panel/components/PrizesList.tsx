'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePrizes } from '@/features/admin-panel/hooks';
import { Prize, PrizeType } from '@/interfaces/prize';
import Table from '@/components/table/Table';
import { TableColumn } from '@/components/table';
import Image from 'next/image';

const PrizesList: React.FC = () => {
  const { t } = useTranslation();
  const { prizes, isLoading, pagination, goToPage } = usePrizes({ pageNumber: 1, pageSize: 10 });

  const getPrizeTypeBadge = (type: PrizeType) => {
    const badges: Record<PrizeType, string> = {
      [PrizeType.Cash]: 'badge bg-success',
      [PrizeType.Physical]: 'badge bg-primary',
      [PrizeType.Digital]: 'badge bg-info',
      [PrizeType.Experience]: 'badge bg-warning text-dark',
    };
    return badges[type] || 'badge bg-secondary';
  };

  const getPrizeTypeText = (type: PrizeType) => {
    const texts: Record<PrizeType, string> = {
      [PrizeType.Cash]: t('PRIZES_ADMIN.types.cash', 'Efectivo'),
      [PrizeType.Physical]: t('PRIZES_ADMIN.types.physical', 'Físico'),
      [PrizeType.Digital]: t('PRIZES_ADMIN.types.digital', 'Digital'),
      [PrizeType.Experience]: t('PRIZES_ADMIN.types.experience', 'Experiencia'),
    };
    return texts[type] || String(type);
  };

  const columns: TableColumn[] = [
    { key: 'image', header: t('PRIZES_ADMIN.columns.image', 'Imagen') },
    { key: 'name', header: t('PRIZES_ADMIN.columns.name', 'Nombre') },
    { key: 'type', header: t('PRIZES_ADMIN.columns.type', 'Tipo') },
    { key: 'value', header: t('PRIZES_ADMIN.columns.value', 'Valor') },
    { key: 'tier', header: t('PRIZES_ADMIN.columns.tier', 'Nivel') },
    { key: 'deliverable', header: t('PRIZES_ADMIN.columns.deliverable', 'Entregable') },
    { key: 'actions', header: t('PRIZES_ADMIN.columns.actions', 'Acciones') },
  ];

  const tableData = prizes.map((prize: Prize) => ({
    id: prize.id,
    image: (
      <Image
        src={prize.mainImageUrl || '/images/placeholder.jpg'}
        alt={prize.name}
        width={60}
        height={60}
        className="rounded"
        style={{ objectFit: 'cover' }}
      />
    ),
    name: (
      <div>
        <div className="fw-semibold">{prize.name}</div>
        <small className="text-muted">{prize.description?.substring(0, 40)}...</small>
      </div>
    ),
    type: <span className={getPrizeTypeBadge(prize.type)}>{getPrizeTypeText(prize.type)}</span>,
    value: (
      <div>
        <span className="fw-bold text-success">${prize.estimatedValue.toLocaleString()}</span>
        {prize.cashAlternative && (
          <div>
            <small className="text-muted">Alt: ${prize.cashAlternative.toLocaleString()}</small>
          </div>
        )}
      </div>
    ),
    tier: <span className="badge bg-secondary">Tier {prize.tier}</span>,
    deliverable: (
      <div className="d-flex flex-column gap-1">
        {prize.isDeliverable && (
          <span className="badge bg-light text-success">
            <i className="fas fa-truck me-1"></i>
            {t('PRIZES_ADMIN.deliverable', 'Entregable')}
          </span>
        )}
        {prize.isDigital && (
          <span className="badge bg-light text-info">
            <i className="fas fa-download me-1"></i>
            {t('PRIZES_ADMIN.digital', 'Digital')}
          </span>
        )}
      </div>
    ),
    actions: (
      <div className="btn-group btn-group-sm">
        <Link
          href={`/admin/prizes/${prize.id}/edit`}
          className="btn btn-outline-primary"
          title={t('COMMON.edit', 'Editar')}
        >
          <i className="fas fa-edit"></i>
        </Link>
        <Link href={`/admin/prizes/${prize.id}`} className="btn btn-outline-secondary" title={t('COMMON.view', 'Ver')}>
          <i className="fas fa-eye"></i>
        </Link>
      </div>
    ),
  }));

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`btn ${pagination.pageNumber === i ? 'btn-primary' : 'btn-outline-secondary'}`}
          style={{ minWidth: '40px' }}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div className="text-muted">
          {t('COMMON.showing', 'Mostrando')} <strong>{(pagination.pageNumber - 1) * pagination.pageSize + 1}</strong> -{' '}
          <strong>{Math.min(pagination.pageNumber * pagination.pageSize, pagination.totalCount)}</strong>{' '}
          {t('COMMON.of', 'de')} <strong>{pagination.totalCount}</strong> {t('COMMON.results', 'resultados')}
        </div>
        <div className="btn-group" aria-label="Paginación">
          <button
            className="btn btn-outline-secondary"
            onClick={() => goToPage(pagination.pageNumber - 1)}
            disabled={pagination.pageNumber === 1}
            title={t('COMMON.previous', 'Anterior')}
          >
            ←
          </button>
          {pages}
          <button
            className="btn btn-outline-secondary"
            onClick={() => goToPage(pagination.pageNumber + 1)}
            disabled={pagination.pageNumber === pagination.totalPages}
            title={t('COMMON.next', 'Siguiente')}
          >
            →
          </button>
        </div>
      </div>
    );
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
          <h3 className="n4-clr fw_700 mb-0">{t('PRIZES_ADMIN.title', 'Gestión de Premios')}</h3>
          <Link href="/admin/prizes/create" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            {t('PRIZES_ADMIN.create.button', 'Crear Premio')}
          </Link>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{t('PRIZES_ADMIN.list.title', 'Lista de Premios')}</h5>
            <small className="text-muted">
              {t('PRIZES_ADMIN.totalCount', 'Total')}: {pagination.totalCount}
            </small>
          </div>
          <div className="card-body p-0">
            {prizes && prizes.length > 0 ? (
              <>
                <Table columns={columns} data={tableData} />
                <div className="p-4 border-top bg-light">{renderPagination()}</div>
              </>
            ) : (
              <div className="text-center py-5">
                <i className="fas fa-gift fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">{t('PRIZES_ADMIN.empty', 'No hay premios creados')}</h5>
                <p className="text-muted mb-4">
                  {t('PRIZES_ADMIN.emptyMessage', 'Comienza creando tu primer premio para los sorteos')}
                </p>
                <Link href="/admin/prizes/create" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>
                  {t('PRIZES_ADMIN.create.button', 'Crear Premio')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesList;
