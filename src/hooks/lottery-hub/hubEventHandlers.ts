import * as signalR from '@microsoft/signalr';
import { AvailableNumberDto, NumberReservationDto, NumberStatusDto } from '@/interfaces/lotteryHub';
import {
  updateNumberOnReserve,
  updateNumberOnRelease,
  updateNumberOnSold,
  updateNumbersOnBulkRelease,
  updateNumbersOnBulkSold,
} from './numberStateUpdaters';

export interface HubEventCallbacks {
  setAvailableNumbers: React.Dispatch<React.SetStateAction<AvailableNumberDto[]>>;
  setReservations: React.Dispatch<React.SetStateAction<NumberReservationDto[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Registra todos los event handlers del hub
 */
export const registerHubEventHandlers = (connection: signalR.HubConnection, callbacks: HubEventCallbacks): void => {
  const { setAvailableNumbers, setReservations, setError, setIsConnected } = callbacks;

  // Recibir números disponibles al unirse
  connection.on('ReceiveAvailableNumbers', (_lotId: string, numbers: AvailableNumberDto[]) => {
    setAvailableNumbers(numbers);
  });

  // Número reservado (individual)
  connection.on('NumberReserved', (_lotId: string, _numberId: string, number: number) => {
    setAvailableNumbers(prev => updateNumberOnReserve(prev, number));
  });

  // Número liberado (individual)
  connection.on('NumberReleased', (_lotId: string, _numberId: string, number: number) => {
    setAvailableNumbers(prev => updateNumberOnRelease(prev, number));
  });

  // Número vendido (individual)
  connection.on('NumberSold', (_lotId: string, _numberId: string, number: number) => {
    setAvailableNumbers(prev => updateNumberOnSold(prev, number));
  });

  // Múltiples números liberados
  connection.on('NumbersReleased', (_lotId: string, numbers: NumberStatusDto[]) => {
    setAvailableNumbers(prev => updateNumbersOnBulkRelease(prev, numbers));
  });

  // Múltiples números vendidos
  connection.on('NumbersSold', (_lotId: string, numbers: NumberStatusDto[]) => {
    setAvailableNumbers(prev => updateNumbersOnBulkSold(prev, numbers));
  });

  // Confirmación de reserva individual
  connection.on('ReservationConfirmed', (reservation: NumberReservationDto) => {
    setReservations(prev => [...prev, reservation]);
  });

  // Confirmación de múltiples reservas
  connection.on('ReservationsConfirmed', (newReservations: NumberReservationDto[]) => {
    setReservations(prev => [...prev, ...newReservations]);
  });

  // Error del servidor
  connection.on('ReceiveError', (message: string) => {
    setError(message);
  });

  // Eventos de reconexión
  connection.onreconnecting(() => {
    setIsConnected(false);
    console.log('Reconectando a LotteryHub...');
  });

  connection.onreconnected(() => {
    setIsConnected(true);
    console.log('Reconectado a LotteryHub');
  });

  connection.onclose(() => {
    setIsConnected(false);
    console.log('Desconectado de LotteryHub');
  });
};

/**
 * Elimina todos los event handlers del hub
 */
export const unregisterHubEventHandlers = (connection: signalR.HubConnection): void => {
  const events = [
    'ReceiveAvailableNumbers',
    'NumberReserved',
    'NumberReleased',
    'NumberSold',
    'NumbersReleased',
    'NumbersSold',
    'ReservationConfirmed',
    'ReservationsConfirmed',
    'ReceiveError',
  ];

  events.forEach(event => connection.off(event));
};
