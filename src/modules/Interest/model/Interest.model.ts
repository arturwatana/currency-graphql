
export interface IInterest{
    from: string
    to?: string
    targetValue?: number
  }

export interface Last15DaysInterestProps {
    code?: string
    codein?: string
    name?: string
    high: string
    low: string
    varBid: string
    pctChange: string
    bid: string
    ask: string
    timestamp: string
    create_date?: string
}

export class Interest {
    from: string
    to: string
    targetValue: number
    createdAt: Date
    fromTo: string

   private constructor(data: IInterest ){
        this.from = data.from
        this.to = data.to || "BRL"
        this.targetValue = data.targetValue || 0
        this.createdAt = new Date()
    }

    static create(data: IInterest){
        const interest = new Interest(data)
        return interest
    }
}