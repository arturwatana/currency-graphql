import cron from "node-cron"
import { usersRepository } from "../../modules/users/repository/index.js";
import { CurrencyMemoryRepository } from "../../modules/currency/repositories/currency.implementation.repository.js";
import { pusher } from "../pusher/index.js";

  
  cron.schedule('*/30 * * * * *', async () => {
      const memory = new CurrencyMemoryRepository(usersRepository)
      const notify = await memory.updateTargets()
      if(notify.length === 0){
        return
      }
       pusher.trigger("notifications", "new_notifications", notify)
    });
