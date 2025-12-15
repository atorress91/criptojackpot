'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useEditPrizeForm } from '@/features/admin-panel/hooks/useEditPrizeForm';
import { PrizeType } from '@/interfaces/prize';
import Image from 'next/image';
import { Plus, X, Trash2, ArrowLeft } from 'lucide-react';

interface EditPrizeProps {
  prizeId: string;
}

const EditPrize: React.FC<EditPrizeProps> = ({ prizeId }) => {
  const {
    formData,
    isLoading,
    isSubmitting,
    handleInputChange,
    handleTypeChange,
    handleMainImageUrlChange,
    handleAddAdditionalImage,
    handleRemoveAdditionalImage,
    handleSpecificationChange,
    handleRemoveSpecification,
    handleSubmit,
  } = useEditPrizeForm(prizeId);

  const { t } = useTranslation();

  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newAdditionalImageUrl, setNewAdditionalImageUrl] = useState('');
  const [newAdditionalImageCaption, setNewAdditionalImageCaption] = useState('');

  const prizeTypes = [
    { value: PrizeType.Cash, label: t('PRIZES_ADMIN.types.cash', 'Efectivo') },
    { value: PrizeType.Physical, label: t('PRIZES_ADMIN.types.physical', 'Físico') },
    { value: PrizeType.Digital, label: t('PRIZES_ADMIN.types.digital', 'Digital') },
    { value: PrizeType.Experience, label: t('PRIZES_ADMIN.types.experience', 'Experiencia') },
  ];

  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      handleSpecificationChange(newSpecKey.trim(), newSpecValue.trim());
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const handleAddImage = () => {
    if (newAdditionalImageUrl.trim()) {
      handleAddAdditionalImage({
        imageUrl: newAdditionalImageUrl.trim(),
        caption: newAdditionalImageCaption.trim(),
        displayOrder: formData.additionalImages.length,
      });
      setNewAdditionalImageUrl('');
      setNewAdditionalImageCaption('');
    }
  };

  if (isLoading) {
    return (
      <div className="col-lg-9">
        <div className="user-panel-wrapper">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" aria-hidden="true"></div>
            <output className="visually-hidden">{t('COMMON.loading', 'Cargando...')}</output>
            <p className="mt-3 text-muted">{t('PRIZES_ADMIN.edit.loading', 'Cargando información del premio...')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-9">
      <div className="user-panel-wrapper">
        <div className="d-flex align-items-center gap-3 mb-xxl-10 mb-6">
          <Link href="/admin/prizes" className="btn btn-outline-secondary btn-sm">
            <ArrowLeft size={16} />
          </Link>
          <h3 className="n4-clr fw_700 mb-0">{t('PRIZES_ADMIN.edit.title', 'Editar Premio')}</h3>
        </div>

        <div className="card border-0 shadow-sm mb-6">
          <div className="card-header bg-white py-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{formData.name || t('PRIZES_ADMIN.edit.formTitle', 'Editar Premio')}</h5>
            <span className="badge bg-info">Tier {formData.tier}</span>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-4">
              {/* Nombre del Premio */}
              <div className="col-md-8">
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

              {/* Tier (solo lectura en edición) */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">{t('PRIZES_ADMIN.fields.tier', 'Nivel/Tier')}</label>
                <input
                  type="number"
                  name="tier"
                  className="form-control"
                  value={formData.tier || ''}
                  disabled
                  readOnly
                />
                <div className="form-text">
                  {t('PRIZES_ADMIN.help.tierReadOnly', 'El tier no puede ser modificado')}
                </div>
              </div>

              {/* Descripción */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.description', 'Descripción')} <span className="text-danger">*</span>
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('PRIZES_ADMIN.placeholders.description', 'Descripción detallada del premio')}
                  required
                />
              </div>

              {/* Valor Estimado y Alternativa en Efectivo */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.estimatedValue', 'Valor Estimado')} <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="estimatedValue"
                    className="form-control"
                    value={formData.estimatedValue || ''}
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
                  {t('PRIZES_ADMIN.fields.cashAlternative', 'Alternativa en Efectivo')}
                </label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="cashAlternative"
                    className="form-control"
                    value={formData.cashAlternative || ''}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-text">
                  {t(
                    'PRIZES_ADMIN.help.cashAlternative',
                    'Valor en efectivo que el ganador puede elegir en lugar del premio'
                  )}
                </div>
              </div>

              {/* Tipo de Premio */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.type', 'Tipo de Premio')} <span className="text-danger">*</span>
                </label>
                <select
                  name="type"
                  className="form-select"
                  value={formData.type}
                  onChange={e => handleTypeChange(Number(e.target.value) as PrizeType)}
                  required
                >
                  {prizeTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Placeholder para mantener grid */}
              <div className="col-md-6"></div>

              {/* Opciones de Entrega */}
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isDeliverable"
                    id="isDeliverable"
                    checked={formData.isDeliverable}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isDeliverable">
                    {t('PRIZES_ADMIN.fields.isDeliverable', 'Es entregable físicamente')}
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isDigital"
                    id="isDigital"
                    checked={formData.isDigital}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isDigital">
                    {t('PRIZES_ADMIN.fields.isDigital', 'Es un producto digital')}
                  </label>
                </div>
              </div>

              {/* URL de Imagen Principal */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.mainImageUrl', 'URL de Imagen Principal')}{' '}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="url"
                  name="mainImageUrl"
                  className="form-control"
                  value={formData.mainImageUrl}
                  onChange={e => handleMainImageUrlChange(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              {/* Preview de Imagen Principal */}
              {formData.mainImageUrl && (
                <div className="col-md-12">
                  <label className="form-label fw-semibold">{t('PRIZES_ADMIN.fields.preview', 'Vista Previa')}</label>
                  <div className="border rounded p-4 bg-light text-center">
                    <Image
                      src={formData.mainImageUrl}
                      alt="Preview"
                      width={300}
                      height={300}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: '300px', objectFit: 'contain' }}
                      onError={e => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="mt-3">
                      <h5 className="mb-1">{formData.name || 'Nombre del Premio'}</h5>
                      <p className="text-muted mb-2">{formData.description || 'Descripción'}</p>
                      <div className="d-flex gap-2 justify-content-center">
                        <span className="badge bg-success fs-6 px-3 py-2">
                          ${formData.estimatedValue.toLocaleString()}
                        </span>
                        <span className="badge bg-info fs-6 px-3 py-2">Tier {formData.tier}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Imágenes Adicionales */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.additionalImages', 'Imágenes Adicionales')}
                </label>
                <div className="row g-2 mb-3">
                  <div className="col-md-5">
                    <input
                      type="url"
                      className="form-control"
                      value={newAdditionalImageUrl}
                      onChange={e => setNewAdditionalImageUrl(e.target.value)}
                      placeholder="URL de imagen"
                    />
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      value={newAdditionalImageCaption}
                      onChange={e => setNewAdditionalImageCaption(e.target.value)}
                      placeholder="Descripción (opcional)"
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-outline-primary w-100" onClick={handleAddImage}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                {formData.additionalImages.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {formData.additionalImages.map((img, index) => (
                      <div key={img.id || img.imageUrl} className="position-relative">
                        <Image
                          src={img.imageUrl}
                          alt={img.caption || `Image ${index + 1}`}
                          width={80}
                          height={80}
                          className="rounded"
                          style={{ objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          onClick={() => handleRemoveAdditionalImage(index)}
                          style={{ transform: 'translate(25%, -25%)' }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Especificaciones */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">
                  {t('PRIZES_ADMIN.fields.specifications', 'Especificaciones')}
                </label>
                <div className="row g-2 mb-3">
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      value={newSpecKey}
                      onChange={e => setNewSpecKey(e.target.value)}
                      placeholder="Nombre (ej: Color)"
                    />
                  </div>
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      value={newSpecValue}
                      onChange={e => setNewSpecValue(e.target.value)}
                      placeholder="Valor (ej: Negro)"
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-outline-primary w-100" onClick={handleAddSpecification}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                {Object.keys(formData.specifications).length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>{t('PRIZES_ADMIN.spec.name', 'Especificación')}</th>
                          <th>{t('PRIZES_ADMIN.spec.value', 'Valor')}</th>
                          <th style={{ width: '50px' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(formData.specifications).map(([key, value]) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRemoveSpecification(key)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

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
                      t('PRIZES_ADMIN.edit.submit', 'Guardar Cambios')
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

export default EditPrize;
