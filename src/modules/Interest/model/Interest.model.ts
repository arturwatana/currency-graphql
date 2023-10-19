
export interface IInterest{
    name: string
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
    name: string
    targetValue: number
    createdAt: Date

   private constructor(data: IInterest ){
        this.name = data.name
        this.targetValue = data.targetValue || 0
        this.createdAt = new Date()
    }

    static create(data: IInterest){
        const interest = new Interest(data)
        return interest
    }
}