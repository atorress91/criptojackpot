export enum NumberStatus {
  Available = 0,
  Reserved = 1,
  Sold = 2,
}

export interface AvailableNumberDto {
  number: number;
  availableSeries: number;
  totalSeries: number;
  isFullyAvailable: boolean;
  isExhausted: boolean;
}

export interface NumberReservationDto {
  numberId: string;
  lotteryId: string;
  number: number;
  series: number;
  reservationExpiresAt: string;
  secondsRemaining: number;
}

export interface NumberStatusDto {
  numberId: string;
  number: number;
  series: number;
  status: NumberStatus;
}
