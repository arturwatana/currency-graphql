import { prismaClient } from "../../../utils/db/prisma.client.js";
export class UserPrismaRepository {
    async save(data) {
        const user = await prismaClient.user.create({
            data,
        });
        console.log(user);
        return user;
    }
    async showAll() {
        return await prismaClient.user.findMany();
    }
}
