import axios from "axios";
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
        targets.forEach(target => {
            target.interests.forEach(interest => {
                const alreadyExists = interests.find(int => int.from === interest.from && int.to === interest.to);
                if (!alreadyExists) {
                    interests.push({
                        from: interest.from,
                        to: interest.to
                    });
                }
            });
        });
        try {
            for (const interest of interests) {
                const res = await axios.get(`${process.env.BINANCE_CURRENCY_URL}${interest.from}${interest.to}`);
                const data = {
                    ask: res.data.askPrice,
                    bid: res.data.bidPrice,
                    from: interest.from,
                    to: interest.to
                };
                this.items.push(data);
            }
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
                    if (interest.from === item.from && interest.to === item.to) {
                        if (+item.ask >= interest.targetValue.sell && interest.targetValue.sell != 0) {
                            const data = {
                                name: `${interest.from}/${interest.to}`,
                                description: `Oba! Sua conversão trackeada ${interest.from}/${interest.to} atingiu o target de ${interest.targetValue.sell} ${interest.to} com valor de venda ${item.ask} ${interest.to}`,
                                userId: target.user.id,
                                type: "sell"
                            };
                            const notify = Notification.create(data);
                            const alreadyNotified = await this.userRepository.updateUserNotifications(target.user.id, notify);
                            interest.reached.sell = true;
                            await this.userRepository.updateUserInterests(target.user, interest);
                            if (alreadyNotified != null) {
                                targetsToNotify.push(notify);
                            }
                        }
                        if (+item.bid <= interest.targetValue.buy && interest.targetValue.buy != 0) {
                            const data = {
                                name: `${interest.from}/${interest.to}`,
                                description: `Oba! Sua conversão trackeada ${interest.from}/${interest.to} atingiu o target de ${interest.targetValue.buy} ${interest.to} com valor de compra ${item.bid} ${interest.to}`,
                                userId: target.user.id,
                                type: "buy"
                            };
                            const notify = Notification.create(data);
                            const alreadyNotified = await this.userRepository.updateUserNotifications(target.user.id, notify);
                            interest.reached.buy = true;
                            await this.userRepository.updateUserInterests(target.user, interest);
                            if (alreadyNotified != null) {
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
