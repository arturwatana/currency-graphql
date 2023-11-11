export const typeDefs = `
type Currency {
  code: String!
  name: String!
  from: String!
  to: String!
  high: String!
  id: String
  buy: String!
  sell: String
  queryDate: String!
  low: String!
  create_date: String!
  timestamp: Date!
}

type CurrencyPeriod {
  code: String!
  from: String!
  to: String!
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

type Notification {
  name: String!
  description: String!
  read: Boolean
  userId: String!
  createAt: Date!
  type: String!
}

type InterestReached {
  buy: Boolean!
  sell: Boolean!
}

type Last15DaysFromInterest {
  code: String!
  codein: String!
  name: String!
  high: String!
  low: String!
  varBid: String!
  pctChange: String!
  reached: InterestReached!
  favorite: Boolean!
  targetValue: TargetValue!
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
  fullName: String!
  password: String!
  email: String!
  createdAt: Date!
  searches: [Currency!]!
  interests: [Interest!]!
  notifications: [Notification]!
}

type TargetValue {
  buy: Float!
  sell: Float!
}

input UserDTO {
  fullName: String!
  password: String!
  email: String!
}


type LoginResDTO {
  id: String!
  email: String!
  token: String!
}
type getUserDTO {
  fullName: String!
  email: String!
  id: String!
}

type Interest {
  from: String!
  to: String!
  targetValue: TargetValue!
  createdAt: Date!
  id: String!
  reached: InterestReached!
  favorite: Boolean!
  notifyAttempts: Int
}
type InterestToNotify {
  from: String!
  to: String!
  targetValue: TargetValue!
  createdAt: Date!
  id: String!
  userId: String!
}

scalar Date

input LoginUserDTO{
  email: String!
  password: String!
}

input InterestDTO{
  from: String!
  to: String!
  buy: Float!
  sell: Float!
}
input FavoriteInterestDTO{
  from: String!
  to: String!
  favorite: Boolean!

}
input updateInterestTargetValueDTO{
  from: String!
  to: String!
  buy: Float!
  sell: Float!
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

type GetUserNotifications{
  userId: String!
  notifications: [Notification!]!
}

  type Query {
    searches:[Currency!]!
    getLastSearchByName(name: String!):Currency!
    getUserByToken:getUserDTO!
    getUserNotifications:GetUserNotifications!
    getUserLast15DaysFromInterests:[Last15DaysFromInterest!]!
    users:[User!]!
    getNotify:[InterestToNotify!]!
  }
  type Mutation {
    createCurrency(data: CurrencyReq!): Currency!
    createFreeCurrency(data: CurrencyReq!): Currency!
    createInterest(data:InterestDTO!): Interest!
    updateInterest(data: InterestDTO!): User!
    favoriteInterest(data: FavoriteInterestDTO!): User!
    updateInterestTargetValue(data: updateInterestTargetValueDTO!): Interest!
    deleteCurrency(currencyId: String!): User
    deleteInterest(data: DeleteInterestDTO!): User
    createUser(data: UserDTO): User
    login(data: LoginUserDTO): LoginResDTO!
  }
`;
