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
            uniqueInterests.map(async (interest) => {
                const words = interest.split("-");
                const from = words[0];
                const to = words[1];
                const res = await axios.get(`https://economia.awesomeapi.com.br/json/last/${from}-${to}`);
                const key = Object.keys(res.data);
                const item = {
                    high: res.data[key[0]].high,
                    low: res.data[key[0]].low,
                    timestamp: formatUnixDate(res.data[key[0]].timestamp),
                    code: res.data[key[0]].code,
                    codein: res.data[key[0]].codein
                };
                this.items.push(item);
                return;
            });
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
                        if (+item.low <= interest.targetValue) {
                            const data = {
                                name: `${interest.from}/${interest.to}`,
                                description: `Oba! Sua conversão trackeada ${interest.from}/${interest.to} atingiu o valor target de ${interest.targetValue} uma mínima de ${+item.low}`,
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
