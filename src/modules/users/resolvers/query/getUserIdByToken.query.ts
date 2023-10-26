import { GraphQLError } from "graphql"
import { ContextProps } from "../../../.."

interface getUserByTokenProps {
    data: {
        token: string
    }
}

export const getUserIdByToken = async (_, {data}: getUserByTokenProps, ctx: ContextProps) => {
    if (!ctx.user)
    throw new GraphQLError("Ops, preciso que faca o login novamente", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    })
    return{
      username: ctx.user.username,
      email: ctx.user.email
    }
}