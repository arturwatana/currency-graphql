export const users = (_, data, ctx) => {
    return ctx.BaseContext.userRepository.showAll();
};
