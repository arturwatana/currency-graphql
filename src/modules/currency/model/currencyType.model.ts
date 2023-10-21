export type CurrencyType = {
  code: string;
  name: string;
  high: string;
  low: string;
  create_date: string;
  userId: string;
  id: string
  queryDate: Date;
};


export interface CurrencyByPeriodDTO {
    code: string
    name: string
    high: string
    low: string
    varBid: string
    pctChange: string
    timestamp: string
    otherDays: OtherDaysCurrencyDTO[]
}


interface OtherDaysCurrencyDTO {
  high: string;
  low: string;
  varBid: string
  pctChange: string
  timestamp: string
}