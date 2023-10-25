import cron from "node-cron";
import { pusher } from "../pusher/index.js";
import { usersRepository } from "../../modules/users/repository/index.js";
import { CurrencyMemoryRepository } from "../../modules/currency/repositories/currency.implementation.repository.js";
cron.schedule('0 8 * * *', async () => {
    const memory = new CurrencyMemoryRepository(usersRepository);
    const notify = await memory.updateTargets();
    pusher.trigger("notifications", "new_notifications", notify);
});
