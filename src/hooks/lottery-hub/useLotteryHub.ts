import { useEffect, useState, useCallback, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { AvailableNumberDto, NumberReservationDto } from '@/interfaces/lotteryHub';
import { createHubConnection, startConnection, stopConnection } from './connectionFactory';
import { registerHubEventHandlers, unregisterHubEventHandlers } from './hubEventHandlers';
import type { LotteryHubReturn } from './types';

export const useLotteryHub = (lotteryId: string, token: string): LotteryHubReturn => {
  const [availableNumbers, setAvailableNumbers] = useState<AvailableNumberDto[]>([]);
  const [reservations, setReservations] = useState<NumberReservationDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = createHubConnection(token);
    connectionRef.current = connection;

    // Registrar event handlers
    registerHubEventHandlers(connection, {
      setAvailableNumbers,
      setReservations,
      setError,
      setIsConnected,
    });

    // Handler especial para reconexión (necesita lotteryId)
    connection.onreconnected(() => {
      setIsConnected(true);
      console.log('Reconectado a LotteryHub');
      connection.invoke('JoinLottery', lotteryId).catch(console.error);
    });

    // Iniciar conexión
    const initConnection = async () => {
      try {
        await startConnection(connection, lotteryId);
        setIsConnected(true);
      } catch (err) {
        console.error('Error al iniciar conexión SignalR:', err);
        setError('Error al conectar con el servidor');
      }
    };

    initConnection();

    // Cleanup
    return () => {
      unregisterHubEventHandlers(connection);
      stopConnection(connection, lotteryId);
    };
  }, [token, lotteryId]);

  // ========== MÉTODOS DEL HUB ==========

  const reserveNumber = useCallback(
    async (number: number, quantity: number = 1) => {
      const connection = connectionRef.current;

      if (connection?.state !== signalR.HubConnectionState.Connected) {
        setError('No hay conexión con el servidor');
        return;
      }

      try {
        setError(null);
        await connection.invoke('ReserveNumber', lotteryId, number, quantity);
      } catch (e) {
        console.error('Error en ReserveNumber:', e);
        setError('Error al reservar el número');
      }
    },
    [lotteryId]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearReservations = useCallback(() => {
    setReservations([]);
  }, []);

  return {
    availableNumbers,
    reservations,
    error,
    isConnected,
    reserveNumber,
    clearError,
    clearReservations,
  };
};
