import { randomUUID } from "node:crypto";

export interface TargetValueProps{
    buy?: number
    sell?: number
}

export interface IInterest{
    from: string
    to?: string
    targetValue: TargetValueProps
    customMessage?: string
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
    targetValue: TargetValueProps
    customMessage: string
    favorite: boolean
    createdAt: Date
    notifyAttempts: number

   private constructor(data: IInterest ){

    if(data.targetValue.buy === 0 && data.targetValue.sell === 0){
        throw new Error("Ops, precisamos de um valor valido")
    }
    if(data.targetValue.buy < 0 || data.targetValue.sell < 0){
        throw new Error("Ops, precisamos de um valor valido")
    }
        this.id = randomUUID()
        this.from = data.from
        this.to = data.to || "BRL"
        this.targetValue = data.targetValue || {buy: data.targetValue.buy != 0 ? data.targetValue.buy : 0, sell: data.targetValue.sell != 0 ? data.targetValue.sell : 0} 
        this.createdAt = new Date()
        this.favorite = false
        this.notifyAttempts = 0
    }

    static create(data: IInterest){
        const interest = new Interest(data)
        return interest
    }
}