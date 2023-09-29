import { usesrRepository } from "../../../../index.js";
import { User } from "../../model/user.model.js";
export const createUser = (_, { data }) => {
    const user = User.create(data);
    usesrRepository.save(user);
    return user;
};
