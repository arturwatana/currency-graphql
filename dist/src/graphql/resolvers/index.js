import { users } from "../../modules/users/resolvers/query/users.query";
import { login } from "../../modules/users/resolvers/mutation/login.mutation";
import { searches } from "../../modules/currency/resolvers/query/searches.query";
import { getLastSearchByName } from "../../modules/currency/resolvers/query/getLastSearchByName";
import { deleteCurrency } from "../../modules/currency/resolvers/mutation/deleteCurrency.mutation";
import { createCurrency } from "../../modules/currency/resolvers/mutation/currency.mutation";
import { updateInterest } from "../../modules/Interest/resolvers/mutation/updateInterest/index";
import { getUserLast15DaysFromInterests } from "../../modules/users/resolvers/query/interests.query";
import { deleteInterest } from "../../modules/Interest/resolvers/mutation/deleteInterest/index";
import { updateInterestTargetValue } from "../../modules/Interest/resolvers/mutation/updateInterestTargetValue/index";
import { getUserByToken } from "../../modules/users/resolvers/query/getUserIdByToken.query";
import { createFreeCurrency } from "../../modules/currency/resolvers/mutation/freeCurrency.mutation";
import { createInterest } from "../../modules/Interest/resolvers/mutation/createInterest/index";
import { createUser } from "../../modules/users/resolvers/mutation/createUser.mutation";
import { favoriteInterest } from "../../modules/Interest/resolvers/mutation/favoriteInterest/index";
import { getUserNotifications } from "../../modules/users/resolvers/query/getUserNotifications";
export const resolvers = {
    Query: { searches, users, getLastSearchByName, getUserLast15DaysFromInterests, getUserByToken, getUserNotifications },
    Mutation: { createCurrency, createUser, login, deleteCurrency, favoriteInterest, updateInterest, deleteInterest, updateInterestTargetValue, createFreeCurrency, createInterest },
};
