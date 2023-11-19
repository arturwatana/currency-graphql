import { CurrencyMemoryRepository } from "../../modules/currency/repositories/currency.implementation.repository.js";
import { pusher } from "../pusher/index.js";
import cron from "node-cron"
import { usersRepository } from "../../modules/users/repository/index.js";


  cron.schedule('*/30 * * * * *', async () => {
      const memory = new CurrencyMemoryRepository(usersRepository)
      const notify = await memory.updateTargets()
      if(notify.length === 0){
        return
      }
       pusher.trigger("notifications", "new_notifications", notify)
    }
  );

// import { main } from "../db/mongoose.start.js";
// main().catch((err) => console.log(err));


// // export const usersRepository = new UserMongooseRepository();
// //     try{
// //       const memory = new CurrencyMemoryRepository(usersRepository)
// //       const notify = await memory.updateTargets()
// //       if(notify.length > 0){
// //         pusher.trigger("notifications", "new_notifications", notify)
// //       }

// //     } catch(err){
// //       console.log(err)
// //     }
