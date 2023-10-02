import { usersRepository } from "../../../../index.js";
export const users = () => {
    return usersRepository.showAll();
};
