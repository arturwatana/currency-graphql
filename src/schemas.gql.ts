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

type Last15DaysFromInterest {
  code: String!
  codein: String!
  name: String!
  high: String!
  low: String!
  varBid: String!
  pctChange: String!
  bid: String!
  ask: String!
  timestamp: String!
  create_date: String!
  lastDays: [LastDaysQuery!]!
}

type LastDaysQuery{
  high: String!
  low: String!
  varBid: String!
  pctChange: String!
  bid: String!
  ask: String!
  timestamp: String!
}

type User {
  id: String!
  username: String!
  password: String!
  email: String!
  createdAt: Date!
  searches: [Currency!]!
  interests: [Interest!]!
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

type Interest {
  name: String
  targetValue: Int
  createdAt: Date
}

scalar Date

input LoginUserDTO{
  username: String!
  password: String!
}
input InterestDTO{
  name: String!
  targetValue: Int!
}
input CurrencyReq {
  name: String!
}

  type Query {
    searches:[Currency!]!
    getLastSearchByName(name: String!):Currency!
    getUserLast15DaysFromInterests:[Last15DaysFromInterest!]!
    users:[User!]!
  }
  type Mutation {
    createCurrency(data: CurrencyReq): Currency
    updateInterest(data: InterestDTO!): User!
    deleteCurrency(currencyId: String!): User
    createUser(data: UserDTO): User
    login(data: LoginUserDTO): LoginResDTO!
  }
`;
