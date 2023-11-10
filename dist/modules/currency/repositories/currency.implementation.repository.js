import axios from "axios";
import { formatUnixDate } from "../../../utils/formatTimestamp/index.js";
import { Notification } from "../../notification/model/notification.model.js";
export class CurrencyMemoryRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.items = [];
    }
    async save(data) {
        this.items.push(data);
        return data;
    }
    async showAll() {
        return this.items;
    }
    async updateTargets() {
        const targets = await this.userRepository.getUsersTargets();
        const interests = [];
        targets.map(target => {
            target.interests.map(interest => {
                if (!interest.reached) {
                    interests.push(`${interest.from}-${interest.to}`);
                    return;
                }
                return;
            });
        });
        const uniqueInterests = [...new Set(interests)];
        try {
            const res = await axios.get(`https://economia.awesomeapi.com.br/json/last/${uniqueInterests}`);
            const keys = Object.keys(res.data);
            const currenciesResponse = keys.map(key => {
                return {
                    high: res.data[key].high,
                    low: res.data[key].low,
                    timestamp: formatUnixDate(res.data[key].timestamp),
                    code: res.data[key].code,
                    codein: res.data[key].codein,
                    bid: res.data[key].bid,
                    ask: res.data[key].ask,
                };
            });
            currenciesResponse.map(res => this.items.push(res));
            return await this.getNotificationsTarget();
        }
        catch (err) {
            throw new Error(err.response.data.message);
        }
    }
    async getNotificationsTarget() {
        const targets = await this.userRepository.getUsersTargets();
        const targetsToNotify = [];
        for (const target of targets) {
            for (const interest of target.interests) {
                for (const item of this.items) {
                    if (interest.from === item.code && interest.to === item.codein) {
                        if (interest.notifyAttempts >= 3) {
                            return;
                        }
                        interest.notifyAttempts++;
                        await this.userRepository.updateUserInterests(target, interest);
                        if (+item.ask >= interest.targetValue.sell) {
                            const data = {
                                name: `${interest.from}/${interest.to}`,
                                description: `Oba! Sua conversão trackeada ${interest.from}/${interest.to} atingiu o valor target de ${interest.targetValue.sell} com valor de venda ${+item.ask}  `,
                                userId: target.userId,
                            };
                            const notify = Notification.create(data);
                            await this.userRepository.updateUserNotifications(target.userId, notify);
                            targetsToNotify.push(notify);
                        }
                        if (+item.bid <= interest.targetValue.buy) {
                            const data = {
                                name: `${interest.from}/${interest.to}`,
                                description: `Oba! Sua conversão trackeada ${interest.from}/${interest.to} atingiu o valor target de ${interest.targetValue.buy} com valor de compra ${+item.bid}  `,
                                userId: target.userId,
                            };
                            const notify = Notification.create(data);
                            await this.userRepository.updateUserNotifications(target.userId, notify);
                            targetsToNotify.push(notify);
                        }
                    }
                }
            }
        }
        return targetsToNotify;
    }
}
