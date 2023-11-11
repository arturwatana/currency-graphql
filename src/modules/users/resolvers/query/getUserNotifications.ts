import { GraphQLError } from "graphql"
import { ContextProps } from "../../../.."


export const getUserNotifications = async (_, data, ctx: ContextProps) => {
    if (!ctx.user)
    throw new GraphQLError("Ops, preciso que faca o login novamente", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    })
    return {
        userId: ctx.user.id,
        notifications: ctx.user.notifications
    }
    
}