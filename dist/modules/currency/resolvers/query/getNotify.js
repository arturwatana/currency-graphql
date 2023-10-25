import { CurrencyMemoryRepository } from "../../repositories/currency.implementation.repository.js";
export const getNotify = async (_, data, ctx) => {
    const memory = new CurrencyMemoryRepository(ctx.BaseContext.usersRepository);
    const interestsToNotify = await memory.updateTargets();
    return interestsToNotify;
};
