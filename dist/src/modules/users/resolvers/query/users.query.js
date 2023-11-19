export const users = async (_, data, ctx) => {
    return await ctx.BaseContext.usersRepository.showAll();
};
