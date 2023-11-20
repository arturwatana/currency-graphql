
import { users } from "../../modules/users/resolvers/query/users.query.js";
import { login } from "../../modules/users/resolvers/mutation/login.mutation.js";
import { searches } from "../../modules/currency/resolvers/query/searches.query.js";
import { getLastSearchByName } from "../../modules/currency/resolvers/query/getLastSearchByName.js";
import { deleteCurrency } from "../../modules/currency/resolvers/mutation/deleteCurrency.mutation.js";
import { createCurrency } from "../../modules/currency/resolvers/mutation/currency.mutation.js";
import { updateInterest } from "../../modules/Interest/resolvers/mutation/updateInterest/index.js";
import { getUserLast15DaysFromInterests } from "../../modules/users/resolvers/query/interests.query.js";
import { deleteInterest } from "../../modules/Interest/resolvers/mutation/deleteInterest/index.js";
import { updateInterestTargetValue } from "../../modules/Interest/resolvers/mutation/updateInterestTargetValue/index.js";
import { getUserByToken } from "../../modules/users/resolvers/query/getUserIdByToken.query.js";
import {createFreeCurrency} from "../../modules/currency/resolvers/mutation/freeCurrency.mutation.js"
import { createInterest } from "../../modules/Interest/resolvers/mutation/createInterest/index.js";
import { createUser } from "../../modules/users/resolvers/mutation/createUser.mutation.js";
import { favoriteInterest } from "../../modules/Interest/resolvers/mutation/favoriteInterest/index.js";
import { getUserNotifications } from "../../modules/users/resolvers/query/getUserNotifications.js";

export const resolvers = {
    Query: { searches, users, getLastSearchByName, getUserLast15DaysFromInterests, getUserByToken, getUserNotifications },
    Mutation: { createCurrency, createUser, login, deleteCurrency, favoriteInterest,  updateInterest, deleteInterest, updateInterestTargetValue, createFreeCurrency, createInterest },
  };
  