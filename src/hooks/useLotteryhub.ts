/**
 * Hook modular para conexión con LotteryHub via SignalR
 * Re-exporta desde el módulo lottery-hub para mantener compatibilidad
 */
export { useLotteryHub } from './lottery-hub';
export type { LotteryHubReturn, LotteryHubState, LotteryHubActions } from './lottery-hub';
