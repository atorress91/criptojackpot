'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useCreateLotteryForm } from '@/features/admin-panel/hooks';
import { LotteryStatus, LotteryType } from '@/interfaces/lottery';
import { Calendar, DollarSign, Hash, FileText, Users, AlertTriangle } from 'lucide-react';

const CreateLottery: React.FC = () => {
  const { formData, isSubmitting, handleInputChange, handleRestrictedCountriesChange, handleSubmit } =
    useCreateLotteryForm();

  const { t } = useTranslation();

  const statusOptions = [
    { value: LotteryStatus.Draft, label: t('LOTTERY_ADMIN.status.draft', 'Borrador') },
    { value: LotteryStatus.Active, label: t('LOTTERY_ADMIN.status.active', 'Activa') },
    { value: LotteryStatus.Paused, label: t('LOTTERY_ADMIN.status.paused', 'Pausada') },
  ];

  const typeOptions = [
    { value: LotteryType.Standard, label: t('LOTTERY_ADMIN.type.standard', 'Estándar') },
    { value: LotteryType.Instant, label: t('LOTTERY_ADMIN.type.instant', 'Instantánea') },
    { value: LotteryType.Daily, label: t('LOTTERY_ADMIN.type.daily', 'Diaria') },
    { value: LotteryType.Weekly, label: t('LOTTERY_ADMIN.type.weekly', 'Semanal') },
    { value: LotteryType.Monthly, label: t('LOTTERY_ADMIN.type.monthly', 'Mensual') },
  ];

  return (
    <div className="col-lg-9">
      <div className="user-panel-wrapper">
        <h3 className="n4-clr fw_700 mb-xxl-10 mb-6">{t('LOTTERY_ADMIN.create.title', 'Crear Lotería')}</h3>

        <div className="card border-0 shadow-sm mb-6">
          <div className="card-header bg-white py-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{t('LOTTERY_ADMIN.create.formTitle', 'Nueva Lotería')}</h5>
            <Link href="/admin/lotteries" className="btn btn-outline-secondary">
              {t('COMMON.cancel', 'Cancelar')}
            </Link>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-4">
              {/* Título */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  <FileText size={16} className="me-2" />
                  {t('LOTTERY_ADMIN.fields.title', 'Título')} <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={t('LOTTERY_ADMIN.placeholders.title', 'Ej: Gran Sorteo de Navidad')}
                  required
                />
              </div>

              {/* Descripción */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('LOTTERY_ADMIN.fields.description', 'Descripción')} <span className="text-danger">*</span>
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('LOTTERY_ADMIN.placeholders.description', 'Descripción detallada de la lotería')}
                  required
                />
              </div>

              {/* Rango de Números */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <Hash size={16} className="me-2" />
                  {t('LOTTERY_ADMIN.fields.minNumber', 'Número Mínimo')} <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="minNumber"
                  className="form-control"
                  value={formData.minNumber}
                  onChange={handleInputChange}
                  placeholder="1"
                  min="0"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <Hash size={16} className="me-2" />
                  {t('LOTTERY_ADMIN.fields.maxNumber', 'Número Máximo')} <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="maxNumber"
                  className="form-control"
                  value={formData.maxNumber}
                  onChange={handleInputChange}
                  placeholder="49"
                  min="1"
                  required
                />
              </div>

              {/* Series y Precio */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  {t('LOTTERY_ADMIN.fields.totalSeries', 'Total de Series')} <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="totalSeries"
                  className="form-control"
                  value={formData.totalSeries}
                  onChange={handleInputChange}
                  placeholder="1"
                  min="1"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  <DollarSign size={16} className="me-2" />
                  {t('LOTTERY_ADMIN.fields.ticketPrice', 'Precio del Ticket')} <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="ticketPrice"
                    className="form-control"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  <Users size={16} className="me-2" />
                  {t('LOTTERY_ADMIN.fields.maxTickets', 'Máximo de Tickets')} <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="maxTickets"
                  className="form-control"
                  value={formData.maxTickets}
                  onChange={handleInputChange}
                  placeholder="1000"
                  min="1"
                  required
                />
              </div>

              {/* Fechas */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <Calendar size={16} className="me-2" />
                  {t('LOTTERY_ADMIN.fields.startDate', 'Fecha de Inicio')} <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  className="form-control"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  <Calendar size={16} className="me-2" />
                  {t('LOTTERY_ADMIN.fields.endDate', 'Fecha de Fin')} <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  className="form-control"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Estado y Tipo */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('LOTTERY_ADMIN.fields.status', 'Estado')} <span className="text-danger">*</span>
                </label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('LOTTERY_ADMIN.fields.type', 'Tipo de Lotería')} <span className="text-danger">*</span>
                </label>
                <select name="type" className="form-select" value={formData.type} onChange={handleInputChange} required>
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Términos y Condiciones */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  <FileText size={16} className="me-2" />
                  {t('LOTTERY_ADMIN.fields.terms', 'Términos y Condiciones')} <span className="text-danger">*</span>
                </label>
                <textarea
                  name="terms"
                  className="form-control"
                  rows={6}
                  value={formData.terms}
                  onChange={handleInputChange}
                  placeholder={t(
                    'LOTTERY_ADMIN.placeholders.terms',
                    'Ingrese los términos y condiciones de la lotería'
                  )}
                  required
                />
              </div>

              {/* Restricción de Edad */}
              <div className="col-md-12">
                <div className="card bg-light border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <AlertTriangle size={20} className="text-warning me-2" />
                      <h6 className="mb-0">{t('LOTTERY_ADMIN.fields.ageRestriction', 'Restricciones')}</h6>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        name="hasAgeRestriction"
                        className="form-check-input"
                        id="hasAgeRestriction"
                        checked={formData.hasAgeRestriction}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="hasAgeRestriction">
                        {t('LOTTERY_ADMIN.fields.hasAgeRestriction', 'Restricción de edad')}
                      </label>
                    </div>

                    {formData.hasAgeRestriction && (
                      <div className="mb-3">
                        <label className="form-label">{t('LOTTERY_ADMIN.fields.minimumAge', 'Edad Mínima')}</label>
                        <input
                          type="number"
                          name="minimumAge"
                          className="form-control"
                          value={formData.minimumAge || ''}
                          onChange={handleInputChange}
                          placeholder="18"
                          min="18"
                          style={{ maxWidth: '150px' }}
                        />
                      </div>
                    )}

                    <div>
                      <label className="form-label">
                        {t('LOTTERY_ADMIN.fields.restrictedCountries', 'Países Restringidos')}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t(
                          'LOTTERY_ADMIN.placeholders.restrictedCountries',
                          'Ej: US, UK, CA (separados por coma)'
                        )}
                        onChange={e => {
                          const countries = e.target.value
                            .split(',')
                            .map(c => c.trim())
                            .filter(c => c.length > 0);
                          handleRestrictedCountriesChange(countries);
                        }}
                      />
                      <small className="text-muted">
                        {t(
                          'LOTTERY_ADMIN.hints.restrictedCountries',
                          'Ingrese los códigos de país separados por comas'
                        )}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="col-12">
                <hr className="my-4" />
                <div className="d-flex justify-content-end gap-3">
                  <Link href="/admin/lotteries" className="btn btn-outline-secondary px-4">
                    {t('COMMON.cancel', 'Cancelar')}
                  </Link>
                  <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <output className="spinner-border spinner-border-sm me-2" aria-hidden="true"></output>
                        {t('COMMON.creating', 'Creando...')}
                      </>
                    ) : (
                      t('LOTTERY_ADMIN.create.submit', 'Crear Lotería')
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLottery;
