


import {expect, test, describe} from "vitest"
import { usersRepository } from "../../../.."



test("Should be able to return all Users", async () => {
    const users = await usersRepository.showAll()

    
})