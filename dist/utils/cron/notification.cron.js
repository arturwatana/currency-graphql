// import cron from "node-cron"
// import { pusher } from "../pusher/index.js";
// import { usersRepository } from "../../modules/users/repository/index.js";
// import { CurrencyMemoryRepository } from "../../modules/currency/repositories/currency.implementation.repository.js";
//   cron.schedule('*/1 * * * *', async () => {
//     const memory = new CurrencyMemoryRepository(usersRepository)
//     const notify = await memory.updateTargets()
//     console.log(notify)
//      pusher.trigger("notifications", "new_notifications", notify)
//      console.log("notify")
//     });
