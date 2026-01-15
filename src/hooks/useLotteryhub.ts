import { useEffect, useState, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import { LotteryNumber, Reservation } from '@/interfaces/lotteryHub';

const filterByNumberId = (numbers: LotteryNumber[], numberId: string): LotteryNumber[] => {
  return numbers.filter(n => n.numberId !== numberId);
};

export const useLotteryHub = (lotteryId: string, token: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [availableNumbers, setAvailableNumbers] = useState<LotteryNumber[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Inicializar la conexión
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://tu-api.com/hubs/lottery', {
        accessTokenFactory: () => token, // Requerido por [Authorize]
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);
  }, [token]);

  // Configurar escuchadores de eventos
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Conectado a LotteryHub');
          // Unirse al grupo específico de la lotería
          connection.invoke('JoinLottery', lotteryId);
        })
        .catch((e: Error) => console.error('Error de conexión: ', e));

      // Escuchar números disponibles iniciales
      connection.on('ReceiveAvailableNumbers', (id: string, numbers: LotteryNumber[]) => {
        setAvailableNumbers(numbers);
      });

      // Escuchar cuando alguien reserva un número
      connection.on('NumberReserved', (lId: string, numberId: string, number: string, series: string) => {
        setAvailableNumbers(prev => filterByNumberId(prev, numberId));
        console.log(`Número ${number} serie ${series} reservado`);
      });

      // Escuchar confirmación propia de reserva
      connection.on('ReservationsConfirmed', (reservations: Reservation[]) => {
        console.log('Tus reservas confirmadas:', reservations);
      });

      // Escuchar errores del servidor
      connection.on('ReceiveError', (message: string) => {
        setError(message);
        console.error('Error desde Hub:', message);
      });
    }

    return () => {
      if (connection) {
        connection.invoke('LeaveLottery', lotteryId);
        connection.stop();
      }
    };
  }, [connection, lotteryId]);

  // Método para reservar números
  const reserveNumber = useCallback(
    async (number: string, quantity = 1) => {
      if (connection) {
        try {
          await connection.invoke('ReserveNumber', lotteryId, number, quantity);
        } catch (e) {
          console.error('Error al invocar ReserveNumber:', e);
        }
      }
    },
    [connection, lotteryId]
  );

  return { availableNumbers, reserveNumber, error };
};
