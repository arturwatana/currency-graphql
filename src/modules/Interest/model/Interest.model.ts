import { randomUUID } from "node:crypto";

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
    id: string
    from: string
    to: string
    targetValue: number
    reached: boolean
    favorite: boolean
    createdAt: Date

   private constructor(data: IInterest ){
        this.id = randomUUID()
        this.from = data.from
        this.to = data.to || "BRL"
        this.targetValue = data.targetValue || 0
        this.reached = false
        this.createdAt = new Date()
        this.favorite = false
    }

    static create(data: IInterest){
        const interest = new Interest(data)
        return interest
    }
}