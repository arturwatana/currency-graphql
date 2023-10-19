
export interface IInterest{
    name: string
    targetValue?: number
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