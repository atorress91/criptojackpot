'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePrizes } from '@/features/admin-panel/hooks';
import { Prize } from '@/interfaces/prize';
import Image from 'next/image';

const PrizesList: React.FC = () => {
  const { t } = useTranslation();
  const { prizes, isLoading, deletePrize, isDeleting } = usePrizes();

  const handleDelete = async (id: string, name: string) => {
    if (globalThis.confirm(t('PRIZES_ADMIN.confirmDelete', `¿Estás seguro de eliminar el premio "${name}"?`))) {
      await deletePrize(id);
    }
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, string> = {
      electronics: 'badge bg-primary',
      jewelry: 'badge bg-warning text-dark',
      vehicles: 'badge bg-danger',
      'real-estate': 'badge bg-success',
      luxury: 'badge bg-info',
      cash: 'badge bg-dark',
      other: 'badge bg-secondary',
    };
    return badges[category] || 'badge bg-secondary';
  };

  const getCategoryText = (category: string) => {
    const texts: Record<string, string> = {
      electronics: t('PRIZES_ADMIN.categories.electronics', 'Electrónicos'),
      jewelry: t('PRIZES_ADMIN.categories.jewelry', 'Joyería'),
      vehicles: t('PRIZES_ADMIN.categories.vehicles', 'Vehículos'),
      'real-estate': t('PRIZES_ADMIN.categories.realEstate', 'Bienes Raíces'),
      luxury: t('PRIZES_ADMIN.categories.luxury', 'Artículos de Lujo'),
      cash: t('PRIZES_ADMIN.categories.cash', 'Efectivo'),
      other: t('PRIZES_ADMIN.categories.other', 'Otro'),
    };
    return texts[category] || category;
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
          <div className="card-header bg-white py-3">
            <h5 className="mb-0">{t('PRIZES_ADMIN.list.title', 'Lista de Premios')}</h5>
          </div>
          <div className="card-body p-0">
            {prizes && prizes.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '100px' }}>{t('PRIZES_ADMIN.columns.image', 'Imagen')}</th>
                      <th>{t('PRIZES_ADMIN.columns.name', 'Nombre')}</th>
                      <th>{t('PRIZES_ADMIN.columns.category', 'Categoría')}</th>
                      <th>{t('PRIZES_ADMIN.columns.value', 'Valor')}</th>
                      <th>{t('PRIZES_ADMIN.columns.brand', 'Marca/Modelo')}</th>
                      <th style={{ width: '150px' }}>{t('PRIZES_ADMIN.columns.actions', 'Acciones')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prizes.map((prize: Prize) => (
                      <tr key={prize.id}>
                        <td>
                          <Image
                            src={prize.imageUrl || '/images/placeholder.jpg'}
                            alt={prize.name}
                            width={80}
                            height={80}
                            className="rounded"
                            style={{ objectFit: 'cover' }}
                          />
                        </td>
                        <td>
                          <div className="fw-semibold">{prize.name}</div>
                          <small className="text-muted">{prize.description?.substring(0, 50)}...</small>
                        </td>
                        <td>
                          <span className={getCategoryBadge(prize.category)}>{getCategoryText(prize.category)}</span>
                        </td>
                        <td>
                          <span className="fw-bold text-success fs-5">${prize.value.toLocaleString()}</span>
                        </td>
                        <td>
                          {prize.brand || prize.model ? (
                            <div>
                              {prize.brand && <div className="fw-semibold">{prize.brand}</div>}
                              {prize.model && <small className="text-muted">{prize.model}</small>}
                            </div>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link
                              href={`/admin/prizes/${prize.id}/edit`}
                              className="btn btn-outline-primary"
                              title={t('COMMON.edit', 'Editar')}
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(prize.id, prize.name)}
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
