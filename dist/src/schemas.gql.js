export const typeDefs = `
type Currency {
  code: String!
  name: String!
  high: String!
  id: String
  queryDate: String!
  low: String!
  create_date: String!
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
    getLastSearchByName(name: String!):Currency!
    users:[User!]!
  }
  type Mutation {
    createCurrency(data: CurrencyReq): Currency
    deleteCurrency(currencyId: String!): User
    createUser(data: UserDTO): User
    login(data: LoginUserDTO): LoginResDTO!
  }
`;
