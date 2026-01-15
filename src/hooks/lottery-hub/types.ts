import { AvailableNumberDto, NumberReservationDto } from '@/interfaces/lotteryHub';

export interface LotteryHubState {
  availableNumbers: AvailableNumberDto[];
  reservations: NumberReservationDto[];
  error: string | null;
  isConnected: boolean;
}

export interface LotteryHubActions {
  reserveNumber: (number: number, quantity?: number) => Promise<void>;
  clearError: () => void;
  clearReservations: () => void;
}

export type LotteryHubReturn = LotteryHubState & LotteryHubActions;
