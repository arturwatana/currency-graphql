import { users } from "./modules/users/resolvers/query/users.query.js";
import { login } from "./modules/users/resolvers/mutation/login.mutation.js";
import { createUser } from "./modules/users/resolvers/mutation/users.mutation.js";
import { searches } from "./modules/currency/resolvers/query/searches.query.js";
import { getLastSearchByName } from "./modules/currency/resolvers/query/getLastSearchByName.js";
import { deleteCurrency } from "./modules/currency/resolvers/mutation/deleteCurrency.mutation.js";
import { createCurrency } from "./modules/currency/resolvers/mutation/currency.mutation.js";
import { updateInterest } from "./modules/Interest/resolvers/mutation/updateInterest.mutation.js";
import { getUserLast15DaysFromInterests } from "./modules/users/resolvers/query/interests.query.js";
import { deleteInterest } from "./modules/Interest/resolvers/mutation/deleteInterest.mutation.js";
export const resolvers = {
    Query: { searches, users, getLastSearchByName, getUserLast15DaysFromInterests },
    Mutation: { createCurrency, createUser, login, deleteCurrency, updateInterest, deleteInterest },
};