export const typeDefs = `
type Currency {
  code: String!
  name: String!
  high: String!
  low: String!
  create_date: String!
  user: User!
}

type User {
  id: String!
  username: String!
  password: String!
  email: String!
  searches: [Currency!]!
}

input UserDTO {
  username: String!
  password: String!
  email: String!
}

type LoginResDTO {
  id: String!
  username: String!
  token: String!
}

input LoginUserDTO{
  username: String!
  password: String!
}
input CurrencyReq {
  name: String!
}

  type Query {
    searches:[Currency!]!
    users:[User!]!
  }
  type Mutation {
    createCurrency(data: CurrencyReq): Currency
    createUser(data: UserDTO): User
    login(data: LoginUserDTO): LoginResDTO!
  }
`;
