'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useCreatePrizeForm } from '@/features/admin-panel/hooks';
import Image from 'next/image';

const CreatePrize: React.FC = () => {
  const { formData, imagePreview, isSubmitting, handleInputChange, handleImageChange, handleSubmit } =
    useCreatePrizeForm();

  const { t } = useTranslation();

  const categories = [
    { value: 'electronics', label: t('PRIZES_ADMIN.categories.electronics', 'Electrónicos') },
    { value: 'jewelry', label: t('PRIZES_ADMIN.categories.jewelry', 'Joyería') },
    { value: 'vehicles', label: t('PRIZES_ADMIN.categories.vehicles', 'Vehículos') },
    { value: 'real-estate', label: t('PRIZES_ADMIN.categories.realEstate', 'Bienes Raíces') },
    { value: 'luxury', label: t('PRIZES_ADMIN.categories.luxury', 'Artículos de Lujo') },
    { value: 'cash', label: t('PRIZES_ADMIN.categories.cash', 'Efectivo') },
    { value: 'other', label: t('PRIZES_ADMIN.categories.other', 'Otro') },
  ];

  return (
    <div className="col-lg-9">
      <div className="user-panel-wrapper">
        <h3 className="n4-clr fw_700 mb-xxl-10 mb-6">{t('PRIZES_ADMIN.create.title', 'Crear Premio')}</h3>

        <div className="card border-0 shadow-sm mb-6">
          <div className="card-header bg-white py-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{t('PRIZES_ADMIN.create.formTitle', 'Nuevo Premio')}</h5>
            <Link href="/admin/prizes" className="btn btn-outline-secondary">
              {t('COMMON.cancel', 'Cancelar')}
            </Link>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-4">
              {/* Nombre del Premio */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.name', 'Nombre del Premio')} <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('PRIZES_ADMIN.placeholders.name', 'Ej: iPhone 15 Pro Max')}
                  required
                />
              </div>

              {/* Descripción */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">{t('PRIZES_ADMIN.fields.description', 'Descripción')}</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('PRIZES_ADMIN.placeholders.description', 'Descripción detallada del premio')}
                />
              </div>

              {/* Valor y Categoría */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.value', 'Valor del Premio')} <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="value"
                    className="form-control"
                    value={formData.value}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-text">{t('PRIZES_ADMIN.help.value', 'Valor comercial del premio')}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.category', 'Categoría')} <span className="text-danger">*</span>
                </label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marca y Modelo (opcional) */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">{t('PRIZES_ADMIN.fields.brand', 'Marca')}</label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder={t('PRIZES_ADMIN.placeholders.brand', 'Ej: Apple, Samsung, BMW')}
                />
                <div className="form-text">{t('PRIZES_ADMIN.help.brand', 'Opcional: Marca del producto')}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">{t('PRIZES_ADMIN.fields.model', 'Modelo')}</label>
                <input
                  type="text"
                  name="model"
                  className="form-control"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder={t('PRIZES_ADMIN.placeholders.model', 'Ej: Pro Max, S24 Ultra')}
                />
                <div className="form-text">{t('PRIZES_ADMIN.help.model', 'Opcional: Modelo específico')}</div>
              </div>

              {/* Imagen del Premio */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.image', 'Imagen del Premio')} <span className="text-danger">*</span>
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
                  {t('PRIZES_ADMIN.help.image', 'Tamaño recomendado: 800x800 píxeles. Formatos: JPG, PNG, WEBP')}
                </div>
              </div>

              {/* Preview de Imagen */}
              {imagePreview && (
                <div className="col-md-12">
                  <label className="form-label fw-semibold">{t('PRIZES_ADMIN.fields.preview', 'Vista Previa')}</label>
                  <div className="border rounded p-4 bg-light text-center">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={300}
                      height={300}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: '300px', objectFit: 'contain' }}
                    />
                    <div className="mt-3">
                      <h5 className="mb-1">{formData.name || 'Nombre del Premio'}</h5>
                      <p className="text-muted mb-2">{formData.description || 'Descripción'}</p>
                      <div className="d-flex gap-2 justify-content-center">
                        <span className="badge bg-success fs-6 px-3 py-2">${formData.value.toLocaleString()}</span>
                        <span className="badge bg-info fs-6 px-3 py-2">{formData.category}</span>
                      </div>
                      {(formData.brand || formData.model) && (
                        <div className="mt-2 text-muted small">
                          {formData.brand} {formData.model}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div className="col-12">
                <div className="d-flex gap-3 justify-content-end pt-3 border-top">
                  <Link href="/admin/prizes" className="btn btn-outline-secondary px-4">
                    {t('COMMON.cancel', 'Cancelar')}
                  </Link>
                  <button type="submit" className="btn btn-primary px-5" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        {t('COMMON.saving', 'Guardando...')}
                      </>
                    ) : (
                      t('PRIZES_ADMIN.create.submit', 'Crear Premio')
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

export default CreatePrize;
