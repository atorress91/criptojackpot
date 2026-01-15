export interface LotteryNumber {
  numberId: string;
  number: string;
  series: string;
}

export interface Reservation {
  lotteryId: string;
  number: string;
  quantity: number;
}
