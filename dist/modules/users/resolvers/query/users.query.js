export const users = (_, data, ctx) => {
    return ctx.BaseContext.usersRepository.showAll();
};
