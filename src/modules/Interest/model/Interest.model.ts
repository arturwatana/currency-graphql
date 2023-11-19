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
    favorite: boolean
    createdAt: Date
    notifyAttempts: number
    reached: {
        buy: boolean
        sell: boolean
    }

   private constructor(data: IInterest ){

    if(data.targetValue.buy === 0 && data.targetValue.sell === 0){
        throw new Error("Ops, precisamos de um valor valido")
    }
    if(data.targetValue.buy < 0 || data.targetValue.sell < 0){
        throw new Error("Ops, precisamos de um valor valido")
    }

    if(!data.targetValue.buy){
        data.targetValue.buy = 0
    }
    if(!data.targetValue.sell){
        data.targetValue.sell = 0
    }
        this.id = randomUUID()
        this.from = data.from
        this.to = data.to 
        this.targetValue = data.targetValue  
        this.createdAt = new Date()
        this.reached = {
            buy: false,
            sell: false
        }
        this.favorite = false
    }

    static create(data: IInterest){
        const interest = new Interest(data)
        return interest
    }
}