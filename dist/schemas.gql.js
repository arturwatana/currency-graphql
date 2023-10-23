export const typeDefs = `
type Currency {
  code: String!
  name: String!
  from: String!
  to: String!
  high: String!
  id: String
  queryDate: String!
  low: String!
  create_date: String!
  timestamp: Date!
}

type CurrencyPeriod {
  code: String!
  name: String!
  high: String!
  codein: String!
  id: String
  queryDate: String!
  low: String!
  create_date: String!
  timestamp: Date!
  otherDays: [Currency!]!
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
  interests: [Interest]!
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
  from: String!
  to: String!
  targetValue: Int!
  createdAt: Date!
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
  from: String!
  to: String
}

input DeleteInterestDTO {
  interestName: String!
}
input CreateCurrencyByPeriodDTO {
  startAt: String!
  endAt: String!
  from: String!
  to: String
}

  type Query {
    searches:[Currency!]!
    getLastSearchByName(name: String!):Currency!
    getUserLast15DaysFromInterests:[Last15DaysFromInterest!]!
    users:[User!]!
  }
  type Mutation {
    createCurrency(data: CurrencyReq!): Currency!
    createCurrencyByPeriod(data: CreateCurrencyByPeriodDTO!): CurrencyPeriod
    updateInterest(data: InterestDTO!): User!
    deleteCurrency(currencyId: String!): User
    deleteInterest(data: DeleteInterestDTO!): User
    createUser(data: UserDTO): User
    login(data: LoginUserDTO): LoginResDTO!
  }
`;
