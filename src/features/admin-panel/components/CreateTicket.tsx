'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useCreateTicketForm } from '@/features/admin-panel/hooks/useCreateTicketForm';
import Image from 'next/image';

const CreateTicket: React.FC = () => {
  const { formData, imagePreview, isSubmitting, handleInputChange, handleImageChange, handleSubmit } =
    useCreateTicketForm();

  const { t } = useTranslation();

  return (
    <div className="col-lg-9">
      <div className="user-panel-wrapper">
        <h3 className="n4-clr fw_700 mb-xxl-10 mb-6">{t('TICKETS_ADMIN.create.title', 'Crear Ticket')}</h3>

        <div className="card border-0 shadow-sm mb-6">
          <div className="card-header bg-white py-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{t('TICKETS_ADMIN.create.formTitle', 'Nuevo Ticket de Sorteo')}</h5>
            <Link href="/admin/tickets" className="btn btn-outline-secondary">
              {t('COMMON.cancel', 'Cancelar')}
            </Link>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-4">
              {/* Nombre del Ticket */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('TICKETS_ADMIN.fields.name', 'Nombre del Ticket')} <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('TICKETS_ADMIN.placeholders.name', 'Ej: Digital Dreamscapes')}
                  required
                />
              </div>

              {/* Descripción */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">{t('TICKETS_ADMIN.fields.description', 'Descripción')}</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('TICKETS_ADMIN.placeholders.description', 'Descripción del sorteo')}
                />
              </div>

              {/* Precio y Total de Tickets */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('TICKETS_ADMIN.fields.price', 'Precio por Entrada')} <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('TICKETS_ADMIN.fields.totalTickets', 'Total de Tickets')} <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="totalTickets"
                  className="form-control"
                  value={formData.totalTickets}
                  onChange={handleInputChange}
                  placeholder="1000"
                  min="1"
                  required
                />
              </div>

              {/* Fecha y Hora del Sorteo */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('TICKETS_ADMIN.fields.drawDate', 'Fecha del Sorteo')} <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="drawDate"
                  className="form-control"
                  value={formData.drawDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('TICKETS_ADMIN.fields.drawTime', 'Hora del Sorteo')} <span className="text-danger">*</span>
                </label>
                <input
                  type="time"
                  name="drawTime"
                  className="form-control"
                  value={formData.drawTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Estado */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('TICKETS_ADMIN.fields.status', 'Estado')} <span className="text-danger">*</span>
                </label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="upcoming">{t('TICKETS_ADMIN.status.upcoming', 'Próximamente')}</option>
                  <option value="active">{t('TICKETS_ADMIN.status.active', 'Activo')}</option>
                </select>
                <div className="form-text">
                  {t('TICKETS_ADMIN.help.status', 'Los tickets activos estarán disponibles para compra inmediata')}
                </div>
              </div>

              {/* Imagen del Ticket */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('TICKETS_ADMIN.fields.image', 'Imagen del Ticket')} <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
                <div className="form-text">
                  {t('TICKETS_ADMIN.help.image', 'Tamaño recomendado: 368x383 píxeles. Formatos: JPG, PNG, WEBP')}
                </div>
              </div>

              {/* Preview de Imagen */}
              {imagePreview && (
                <div className="col-md-12">
                  <label className="form-label fw-semibold">{t('TICKETS_ADMIN.fields.preview', 'Vista Previa')}</label>
                  <div className="border rounded p-3 bg-light">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={368}
                          height={383}
                          className="img-fluid rounded"
                          style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="ticket-preview-info">
                          <div className="badge bg-warning text-dark mb-2 p-2">
                            Draw{' '}
                            {formData.drawDate &&
                              new Date(formData.drawDate).toLocaleDateString('en-US', { weekday: 'long' })}{' '}
                            {formData.drawTime}
                          </div>
                          <h4 className="mb-2">{formData.name || 'Nombre del Ticket'}</h4>
                          <h5 className="text-danger mb-3">
                            ${formData.price || '0.00'} <small className="text-muted">PER ENTRY</small>
                          </h5>
                          <div className="d-flex gap-3 mb-2">
                            <div>
                              <i className="fas fa-clock me-2"></i>
                              <small>Sorteo programado</small>
                            </div>
                            <div>
                              <i className="fas fa-ticket-alt me-2"></i>
                              <small>{formData.totalTickets || 0} Total</small>
                            </div>
                          </div>
                          <div className="badge bg-info">
                            {formData.status === 'active' ? 'Activo' : 'Próximamente'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div className="col-12">
                <div className="d-flex gap-3 justify-content-end pt-3 border-top">
                  <Link href="/admin/tickets" className="btn btn-outline-secondary px-4">
                    {t('COMMON.cancel', 'Cancelar')}
                  </Link>
                  <button type="submit" className="btn btn-primary px-5" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        {t('COMMON.saving', 'Guardando...')}
                      </>
                    ) : (
                      t('TICKETS_ADMIN.create.submit', 'Crear Ticket')
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

export default CreateTicket;
