'use client';

import 'reflect-metadata';
import '@/di/init';

import defaultImage from '@/../public/images/man-global/nf1.png';

// URL del placeholder para fallback de imágenes
const PLACEHOLDER_IMAGE = '/images/man-global/nf1.png';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BarbellIcon,
  CalendarIcon,
  ClockIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
  TagIcon,
  TicketIcon,
  TrophyIcon,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import { getLotteryService } from '@/di/serviceLocator';
import { Lottery, LotteryStatus } from '@/interfaces/lottery';
import NavbarBlack from '@/components/navbar/NavbarBlack';
import Jewellery1Footer from '@/components/landing-jewellery1/Jewellery1Footer';
import MotionFade from '@/components/motionEffect/MotionFade';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const LotteryDetailsPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const lotteryId = params.id as string;

  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const {
    data: lottery,
    isLoading,
    error,
  } = useQuery<Lottery, Error>({
    queryKey: ['lottery', lotteryId],
    queryFn: async () => {
      const lotteryService = getLotteryService();
      return lotteryService.getLotteryById(lotteryId);
    },
    enabled: !!lotteryId,
  });

  // Calcular días restantes
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return t('LOTTERY_DETAILS.finished', 'Finalizado');
    if (days === 0) return t('LOTTERY_DETAILS.today', 'Hoy');
    if (days === 1) return t('LOTTERY_DETAILS.oneDay', '1 Día');
    return `${days} ${t('LOTTERY_DETAILS.days', 'Días')}`;
  };

  // Calcular porcentaje vendido
  const getSoldPercentage = (sold: number, max: number) => {
    if (max === 0) return 0;
    return Math.round((sold / max) * 100);
  };

  // Formatear fecha del sorteo
  const formatDrawDate = (endDate: string) => {
    const date = new Date(endDate);
    return {
      dayName: date.toLocaleDateString('es-ES', { weekday: 'long' }),
      date: date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  // Obtener estado de la lotería
  const getStatusText = (status: LotteryStatus) => {
    switch (status) {
      case LotteryStatus.Active:
        return t('LOTTERY_DETAILS.status.active', 'Activa');
      case LotteryStatus.Draft:
        return t('LOTTERY_DETAILS.status.draft', 'Borrador');
      case LotteryStatus.Paused:
        return t('LOTTERY_DETAILS.status.paused', 'Pausada');
      case LotteryStatus.Completed:
        return t('LOTTERY_DETAILS.status.completed', 'Completada');
      case LotteryStatus.Cancelled:
        return t('LOTTERY_DETAILS.status.cancelled', 'Cancelada');
      default:
        return '';
    }
  };

  // Manejar cantidad de tickets
  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      const maxAvailable = lottery ? lottery.maxTickets - lottery.soldTickets : 10;
      if (ticketQuantity < maxAvailable) {
        setTicketQuantity(prev => prev + 1);
      }
    } else if (ticketQuantity > 1) {
      setTicketQuantity(prev => prev - 1);
    }
  };

  // Validar si una URL de imagen es válida
  const isValidImageUrl = (url: string | undefined | null): boolean => {
    if (!url || typeof url !== 'string') return false;
    // Verificar que sea una URL válida o path relativo
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
  };

  // Obtener todas las imágenes del premio
  const getAllImages = () => {
    if (!lottery?.prizes?.[0]) return [];
    const prize = lottery.prizes[0];
    const images: { url: string; caption: string }[] = [];

    if (isValidImageUrl(prize.mainImageUrl)) {
      images.push({ url: prize.mainImageUrl, caption: prize.name });
    }

    if (prize.additionalImages?.length) {
      prize.additionalImages.forEach(img => {
        if (isValidImageUrl(img.imageUrl)) {
          images.push({ url: img.imageUrl, caption: img.caption || prize.name });
        }
      });
    }

    return images;
  };

  if (isLoading) {
    return (
      <div>
        <NavbarBlack />
        <section className="contest-carslide-section position-relative pt-120 pb-120">
          <div className="container">
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" aria-live="polite">
                  <span className="visually-hidden">{t('COMMON.loading', 'Cargando...')}</span>
                </div>
                <p className="n3-clr">{t('LOTTERY_DETAILS.loading', 'Cargando detalles de la lotería...')}</p>
              </div>
            </div>
          </div>
        </section>
        <Jewellery1Footer />
      </div>
    );
  }

  if (error || !lottery) {
    return (
      <div>
        <NavbarBlack />
        <section className="pt-120 pb-120">
          <div className="container">
            <div className="text-center" style={{ minHeight: '400px' }}>
              <h3 className="n4-clr mb-4">{t('LOTTERY_DETAILS.notFound', 'Lotería no encontrada')}</h3>
              <p className="n3-clr mb-4">
                {t('LOTTERY_DETAILS.notFoundDesc', 'La lotería que buscas no existe o ha sido eliminada.')}
              </p>
              <Link href="/landing-page" className="kewta-btn d-inline-flex align-items-center">
                <span className="kew-text act4-bg n0-clr">{t('COMMON.backToHome', 'Volver al inicio')}</span>
              </Link>
            </div>
          </div>
        </section>
        <Jewellery1Footer />
      </div>
    );
  }

  const mainPrize = lottery.prizes?.[0];
  const images = getAllImages();
  const soldPercent = getSoldPercentage(lottery.soldTickets, lottery.maxTickets);
  const remaining = lottery.maxTickets - lottery.soldTickets;
  const drawInfo = formatDrawDate(lottery.endDate);
  const totalPrice = (lottery.ticketPrice * ticketQuantity).toFixed(2);

  return (
    <div>
      <NavbarBlack />

      {/* Contest Car Slide Section */}
      <section className="contest-carslide-section position-relative pt-120 pb-60">
        <div className="container">
          {/* Main Image Slider */}
          <div className="contest-details-carslidewrap position-relative act4-bg radius24 overflow-hidden mb-6">
            {images.length > 1 ? (
              <Swiper
                modules={[Navigation, Thumbs, FreeMode]}
                navigation={{
                  prevEl: '.contest-prev',
                  nextEl: '.contest-next',
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="contest-main-slider"
              >
                {images.map(img => (
                  <SwiperSlide key={img.url}>
                    <div className="cons-decar-items py-xxl-10 py-8">
                      <Image
                        src={img.url}
                        alt={img.caption || lottery.title}
                        width={850}
                        height={500}
                        className="w-100"
                        style={{ objectFit: 'contain', maxHeight: '500px' }}
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="cons-decar-items py-xxl-10 py-8">
                {isValidImageUrl(mainPrize?.mainImageUrl) ? (
                  <Image
                    src={mainPrize?.mainImageUrl || PLACEHOLDER_IMAGE}
                    alt={lottery.title}
                    width={850}
                    height={500}
                    className="w-100"
                    style={{ objectFit: 'contain', maxHeight: '500px' }}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                ) : (
                  <Image
                    src={defaultImage}
                    alt={lottery.title}
                    width={850}
                    height={500}
                    className="w-100"
                    style={{ objectFit: 'contain', maxHeight: '500px' }}
                  />
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <div className="click-slideluxry-button d-flex align-items-center justify-content-between w-100 px-4">
                <button className="contest-prev cmn-60 d-center radius-circle n0-bg">
                  <ArrowLeftIcon className="fs-four n4-clr" weight="bold" />
                </button>
                <button className="contest-next cmn-60 d-center radius-circle n0-bg">
                  <ArrowRightIcon className="fs-four n4-clr" weight="bold" />
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail Slider */}
          {images.length > 1 && (
            <div className="contest-thumbs-wrapper mb-8">
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Thumbs]}
                spaceBetween={16}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  576: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1200: { slidesPerView: 5 },
                }}
                className="contest-thumbs-slider"
              >
                {images.map(img => (
                  <SwiperSlide key={`thumb-${img.url}`}>
                    <div
                      className="thumb-ticketbig position-relative cursor-pointer"
                      style={{ height: '120px', cursor: 'pointer' }}
                    >
                      <Image
                        src={img.url}
                        alt={img.caption || lottery.title}
                        width={200}
                        height={120}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </section>

      {/* Contest Details Section */}
      <section className="pb-120">
        <div className="container">
          <div className="row g-6">
            {/* Left Column - Lottery Info */}
            <div className="col-lg-8">
              <MotionFade>
                <div className="ans-qustion-wrap">
                  {/* Header */}
                  <div className="ans-title d-flex flex-wrap align-items-center justify-content-between gap-3 p-xxl-6 p-4">
                    <div>
                      <span className="badge act4-bg n0-clr fs-eight fw_600 mb-2">{getStatusText(lottery.status)}</span>
                      <h2 className="n4-clr fw_700">{lottery.title}</h2>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <CalendarIcon className="fs-four act4-clr" />
                      <div>
                        <span className="d-block fs-eight n3-clr">{t('LOTTERY_DETAILS.draw', 'Sorteo')}</span>
                        <span className="fw_700 n4-clr">
                          {drawInfo.dayName} {drawInfo.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-xxl-6 p-4">
                    {/* Prize Info */}
                    {mainPrize && (
                      <div className="mb-6">
                        <h4 className="n4-clr fw_700 mb-3 d-flex align-items-center gap-2">
                          <TrophyIcon className="fs-four act4-clr" />
                          {t('LOTTERY_DETAILS.prize', 'Premio Principal')}
                        </h4>
                        <div className="n0-bg radius16 p-4">
                          <h3 className="act4-clr fw_700 mb-2">{mainPrize.name}</h3>
                          <p className="n3-clr mb-3">{mainPrize.description}</p>
                          {mainPrize.estimatedValue > 0 && (
                            <div className="d-flex flex-wrap gap-4">
                              <div>
                                <span className="d-block fs-eight n3-clr">
                                  {t('LOTTERY_DETAILS.estimatedValue', 'Valor estimado')}
                                </span>
                                <span className="fs-four fw_700 s1-clr">
                                  ${mainPrize.estimatedValue.toLocaleString()}
                                </span>
                              </div>
                              {mainPrize.cashAlternative && (
                                <div>
                                  <span className="d-block fs-eight n3-clr">
                                    {t('LOTTERY_DETAILS.cashAlternative', 'Alternativa en efectivo')}
                                  </span>
                                  <span className="fs-four fw_700 act4-clr">
                                    ${mainPrize.cashAlternative.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <div className="mb-6">
                      <h4 className="n4-clr fw_700 mb-3">{t('LOTTERY_DETAILS.description', 'Descripción')}</h4>
                      <p className="n3-clr fs-six">{lottery.description}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="row g-4 mb-6">
                      <div className="col-sm-6 col-md-3">
                        <div className="n0-bg radius12 p-3 text-center">
                          <ClockIcon className="fs-two act4-clr mb-2" />
                          <span className="d-block fs-eight n3-clr">
                            {t('LOTTERY_DETAILS.timeRemaining', 'Tiempo restante')}
                          </span>
                          <span className="fw_700 n4-clr">{getDaysRemaining(lottery.endDate)}</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-3">
                        <div className="n0-bg radius12 p-3 text-center">
                          <TicketIcon className="fs-two act4-clr mb-2" />
                          <span className="d-block fs-eight n3-clr">
                            {t('LOTTERY_DETAILS.totalTickets', 'Total tickets')}
                          </span>
                          <span className="fw_700 n4-clr">{lottery.maxTickets.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-3">
                        <div className="n0-bg radius12 p-3 text-center">
                          <BarbellIcon className="fs-two act4-clr mb-2" />
                          <span className="d-block fs-eight n3-clr">
                            {t('LOTTERY_DETAILS.remaining', 'Disponibles')}
                          </span>
                          <span className="fw_700 s1-clr">{remaining.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-3">
                        <div className="n0-bg radius12 p-3 text-center">
                          <StarIcon className="fs-two act4-clr mb-2" />
                          <span className="d-block fs-eight n3-clr">{t('LOTTERY_DETAILS.sold', 'Vendidos')}</span>
                          <span className="fw_700 act4-clr">{soldPercent}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="n4-clr fw_600">{t('LOTTERY_DETAILS.soldProgress', 'Progreso de venta')}</span>
                        <span className="act4-clr fw_700">{soldPercent}%</span>
                      </div>
                      <div
                        className="position-relative"
                        style={{
                          background: 'rgba(85, 74, 255, 0.2)',
                          height: '8px',
                          borderRadius: '4px',
                          width: '100%',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${soldPercent}%`,
                            background: 'var(--s1)',
                            borderRadius: '4px',
                            transition: 'width 0.5s ease',
                          }}
                        />
                      </div>
                    </div>

                    {/* Terms */}
                    {lottery.terms && (
                      <div className="mb-4">
                        <h4 className="n4-clr fw_700 mb-3">{t('LOTTERY_DETAILS.terms', 'Términos y Condiciones')}</h4>
                        <div className="n0-bg radius12 p-4">
                          <p className="n3-clr fs-seven" style={{ whiteSpace: 'pre-line' }}>
                            {lottery.terms}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Age Restriction Warning */}
                    {lottery.hasAgeRestriction && (
                      <div className="alert alert-warning d-flex align-items-center gap-3" role="alert">
                        <span className="fs-four">⚠️</span>
                        <div>
                          <strong>{t('LOTTERY_DETAILS.ageRestriction', 'Restricción de edad')}:</strong>{' '}
                          {t('LOTTERY_DETAILS.minimumAge', 'Debes tener al menos')} {lottery.minimumAge || 18}{' '}
                          {t('LOTTERY_DETAILS.years', 'años')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </MotionFade>
            </div>

            {/* Right Column - Buy Tickets */}
            <div className="col-lg-4">
              <MotionFade>
                <div className="ans-qustion-wrap position-sticky" style={{ top: '100px' }}>
                  {/* Price Header */}
                  <div className="ans-title p-xxl-5 p-4 text-center">
                    <span className="d-block fs-eight n3-clr mb-1">
                      {t('LOTTERY_DETAILS.pricePerTicket', 'Precio por ticket')}
                    </span>
                    <h2 className="act4-clr fw_700">${lottery.ticketPrice.toFixed(2)}</h2>
                  </div>

                  <div className="p-xxl-5 p-4">
                    {/* Quantity Selector */}
                    <div className="mb-4">
                      <label className="d-block n4-clr fw_600 mb-3">
                        {t('LOTTERY_DETAILS.selectQuantity', 'Selecciona cantidad')}
                      </label>
                      <div className="quantity-basket">
                        <div className="quantity-body d-flex align-items-center justify-content-center gap-3">
                          <button
                            className="qtyminus cmn-60 d-center radius12 n0-bg border"
                            onClick={() => handleQuantityChange('decrease')}
                            disabled={ticketQuantity <= 1}
                          >
                            <MinusIcon className="fs-four n4-clr" weight="bold" />
                          </button>
                          <input
                            type="text"
                            className="qty text-center fs-four fw_700 n4-clr"
                            value={ticketQuantity}
                            readOnly
                            style={{ width: '80px', border: 'none', background: 'transparent' }}
                          />
                          <button
                            className="qtyplus cmn-60 d-center radius12 n0-bg border"
                            onClick={() => handleQuantityChange('increase')}
                            disabled={ticketQuantity >= remaining}
                          >
                            <PlusIcon className="fs-four n4-clr" weight="bold" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Select Buttons */}
                    <div className="mb-4">
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {[1, 5, 10, 25].map(qty => (
                          <button
                            key={qty}
                            className={`btn ${
                              ticketQuantity === qty ? 'act4-bg n0-clr' : 'n0-bg n4-clr border'
                            } radius8 px-4 py-2`}
                            onClick={() => setTicketQuantity(Math.min(qty, remaining))}
                            disabled={qty > remaining}
                          >
                            {qty}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="n0-bg radius12 p-4 mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="n3-clr">{t('LOTTERY_DETAILS.quantity', 'Cantidad')}:</span>
                        <span className="n4-clr fw_600">{ticketQuantity} tickets</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="n3-clr">{t('LOTTERY_DETAILS.unitPrice', 'Precio unitario')}:</span>
                        <span className="n4-clr fw_600">${lottery.ticketPrice.toFixed(2)}</span>
                      </div>
                      <hr className="my-3" />
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="n4-clr fw_700 fs-five">{t('LOTTERY_DETAILS.total', 'Total')}:</span>
                        <span className="act4-clr fw_700 fs-four">${totalPrice}</span>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <button
                      className="kewta-btn d-flex align-items-center justify-content-center w-100 mb-3"
                      disabled={lottery.status !== LotteryStatus.Active || remaining === 0}
                    >
                      <span className="kew-text act4-bg n0-clr d-flex align-items-center justify-content-center gap-2 w-100">
                        <ShoppingCartIcon className="fs-five" weight="bold" />
                        {t('LOTTERY_DETAILS.buyNow', 'Comprar Ahora')}
                      </span>
                    </button>

                    {/* Add to Cart Button */}
                    <button
                      className="kewta-btn d-flex align-items-center justify-content-center w-100"
                      disabled={lottery.status !== LotteryStatus.Active || remaining === 0}
                    >
                      <span className="kew-text n0-bg n4-clr border d-flex align-items-center justify-content-center gap-2 w-100">
                        <TagIcon className="fs-five" weight="bold" />
                        {t('LOTTERY_DETAILS.addToCart', 'Agregar al Carrito')}
                      </span>
                    </button>

                    {/* Sold Out Message */}
                    {remaining === 0 && (
                      <div className="alert alert-danger mt-3 text-center" role="alert">
                        <strong>{t('LOTTERY_DETAILS.soldOut', '¡Agotado!')}</strong>
                      </div>
                    )}

                    {/* Lottery Number Info */}
                    <div className="mt-4 text-center">
                      <span className="fs-eight n3-clr">
                        {t('LOTTERY_DETAILS.lotteryNo', 'Lotería No.')}{' '}
                        <strong className="n4-clr">{lottery.lotteryNo}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </MotionFade>
            </div>
          </div>
        </div>
      </section>

      <Jewellery1Footer />
    </div>
  );
};

export default LotteryDetailsPage;
