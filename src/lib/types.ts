import * as icons from '$lib/assets/icons/index'

export interface Wallet {
  id: string;
  name: string;
  icon: keyof typeof icons;
  balance: number;
  currency: string;
}