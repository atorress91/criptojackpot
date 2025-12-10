import { PrizeImageRequest, PrizeType } from '@/interfaces/prize';

export interface CreatePrizeFormData {
  lotteryId: string;
  tier: number;
  name: string;
  description: string;
  estimatedValue: number;
  type: PrizeType;
  mainImageUrl: string;
  additionalImages: PrizeImageRequest[];
  specifications: Record<string, string>;
  cashAlternative: number;
  isDeliverable: boolean;
  isDigital: boolean;
}
