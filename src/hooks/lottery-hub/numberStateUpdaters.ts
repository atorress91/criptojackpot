import { AvailableNumberDto, NumberStatusDto } from '@/interfaces/lotteryHub';

/**
 * Actualiza el estado de un número cuando se reserva (decrementa availableSeries)
 */
export const updateNumberOnReserve = (numbers: AvailableNumberDto[], targetNumber: number): AvailableNumberDto[] => {
  return numbers.map(n => {
    if (n.number !== targetNumber) return n;

    const newAvailable = n.availableSeries - 1;
    return {
      ...n,
      availableSeries: newAvailable,
      isFullyAvailable: newAvailable === n.totalSeries,
      isExhausted: newAvailable === 0,
    };
  });
};

/**
 * Actualiza el estado de un número cuando se libera (incrementa availableSeries)
 */
export const updateNumberOnRelease = (numbers: AvailableNumberDto[], targetNumber: number): AvailableNumberDto[] => {
  return numbers.map(n => {
    if (n.number !== targetNumber) return n;

    const newAvailable = n.availableSeries + 1;
    return {
      ...n,
      availableSeries: newAvailable,
      isFullyAvailable: newAvailable === n.totalSeries,
      isExhausted: newAvailable === 0,
    };
  });
};

/**
 * Actualiza el estado de un número cuando se vende (decrementa availableSeries y totalSeries)
 */
export const updateNumberOnSold = (numbers: AvailableNumberDto[], targetNumber: number): AvailableNumberDto[] => {
  return numbers.map(n => {
    if (n.number !== targetNumber) return n;

    const newAvailable = Math.max(0, n.availableSeries - 1);
    const newTotal = Math.max(0, n.totalSeries - 1);
    return {
      ...n,
      availableSeries: newAvailable,
      totalSeries: newTotal,
      isFullyAvailable: newAvailable === newTotal,
      isExhausted: newAvailable === 0,
    };
  });
};

/**
 * Actualiza múltiples números cuando se liberan
 */
export const updateNumbersOnBulkRelease = (
  numbers: AvailableNumberDto[],
  releasedNumbers: NumberStatusDto[]
): AvailableNumberDto[] => {
  const updated = [...numbers];

  releasedNumbers.forEach(released => {
    const idx = updated.findIndex(n => n.number === released.number);
    if (idx !== -1) {
      const newAvailable = updated[idx].availableSeries + 1;
      updated[idx] = {
        ...updated[idx],
        availableSeries: newAvailable,
        isFullyAvailable: newAvailable === updated[idx].totalSeries,
        isExhausted: newAvailable === 0,
      };
    }
  });

  return updated;
};

/**
 * Actualiza múltiples números cuando se venden
 */
export const updateNumbersOnBulkSold = (
  numbers: AvailableNumberDto[],
  soldNumbers: NumberStatusDto[]
): AvailableNumberDto[] => {
  const updated = [...numbers];

  soldNumbers.forEach(sold => {
    const idx = updated.findIndex(n => n.number === sold.number);
    if (idx !== -1) {
      const newAvailable = Math.max(0, updated[idx].availableSeries - 1);
      const newTotal = Math.max(0, updated[idx].totalSeries - 1);
      updated[idx] = {
        ...updated[idx],
        availableSeries: newAvailable,
        totalSeries: newTotal,
        isFullyAvailable: newAvailable === newTotal,
        isExhausted: newAvailable === 0,
      };
    }
  });

  return updated;
};
