import axios from "axios";
import { IUserRepository } from "../../users/repository/user.repository";
import { ICurrencyRepository } from "./currency.repository";
import { Interest } from "../../Interest/model/Interest.model.js";
import { formatUnixDate } from "../../../utils/formatTimestamp/index.js";
import { INotification, Notification } from "../../notification/model/notification.model.js";
import { formatCoin } from "../../../utils/formatCoin/index.js";

interface IInterestTargetProps extends Interest {
  userId: string 
} 

export class CurrencyMemoryRepository implements ICurrencyRepository {
  constructor(private userRepository: IUserRepository){}
  items: any[] = [];

  async save(data: any): Promise<any> {
    this.items.push(data);
    return data;
  }
  async showAll(): Promise<any[]> {
    return this.items;
  }

  async updateTargets(){
    const targets = await this.userRepository.getUsersTargets()
    const interests = []
     targets.map(target => {
      target.interests.map(interest => {
        if(!interest.reached.buy || !interest.reached.sell){
          interests.push(`${interest.from}-${interest.to}`)
          return
        }
        return
      })
    })
    const uniqueInterests = [...new Set(interests)]
    try {
        const res = await axios.get(
          `https://economia.awesomeapi.com.br/json/last/${uniqueInterests}`
        );
        const keys: string[] = Object.keys(res.data);
        const currenciesResponse = keys.map(key => {
          return {
            high: res.data[key].high,
            low: res.data[key].low,
            timestamp: formatUnixDate(res.data[key].timestamp),
            code: res.data[key].code,
            codein: res.data[key].codein,
            bid:  Math.floor(res.data[key].bid * 100) / 100,
            ask:  Math.floor(res.data[key].ask * 100) / 100,
          }
        })
        currenciesResponse.map(res => this.items.push(res))

        return await this.getNotificationsTarget();
      } catch (err) {
        throw new Error(err.response.data.message);
      }
  }

  async getNotificationsTarget(){
    const targets = await this.userRepository.getUsersTargets()
    const targetsToNotify = []
    for (const target of targets) {
      for (const interest of target.interests) {
        for (const item of this.items) {
          if (interest.from === item.code && interest.to === item.codein) {
            if (+item.ask >= interest.targetValue.sell && interest.targetValue.sell != 0) {
              const data: INotification = {
                name: `${interest.from}/${interest.to}`,
                description: `Oba! Sua conversão trackeada ${interest.from}/${interest.to} atingiu o target de ${formatCoin(interest.targetValue.sell, interest.to)} com valor de venda ${formatCoin(+item.ask, interest.to)}`,
                userId: target.user.id,
                type: "sell"
              };
              const notify = Notification.create(data);
              const alreadyNotified = await this.userRepository.updateUserNotifications(target.user.id, notify);
              interest.reached.sell = true
              await this.userRepository.updateUserInterests(target.user, interest)
              if(alreadyNotified != null){
                targetsToNotify.push(notify);
              }
            }
            if (+item.bid <= interest.targetValue.buy && interest.targetValue.buy != 0) {
              const data: INotification  = {
                name: `${interest.from}/${interest.to}`,
                description: `Oba! Sua conversão trackeada ${interest.from}/${interest.to} atingiu o target de ${formatCoin(interest.targetValue.buy, interest.to)} com valor de compra ${formatCoin(+item.bid, interest.to)}`,
                userId: target.user.id,
                type: "buy"
              };
              const notify = Notification.create(data);
              const alreadyNotified = await this.userRepository.updateUserNotifications(target.user.id, notify);
              interest.reached.buy = true
              await this.userRepository.updateUserInterests(target.user, interest)
              if(alreadyNotified != null){
                targetsToNotify.push(notify);
              }
            }
          }
        }
      }
    }
    return targetsToNotify;
  }
    

}
