export interface ICurrency {
    id: number;
    $deleted?: boolean;
    flag: string;
    currencyCode: string;
    currency: string;
    level: number;
    units: string;
    asOf: string;
    onedChng: number;
  }