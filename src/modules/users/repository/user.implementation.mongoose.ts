import { Interest } from "../../Interest/model/Interest.model.js";
import { searches } from "../../currency/resolvers/query/searches.query.js";
import { Notification } from "../../notification/model/notification.model.js";
import { User } from "../model/user.model.js";
import { UserMongo } from "../model/user.schema.js";
import { IUserRepository } from "./user.repository.js";

export type ChangeInterestProps = {
  from: string
  to: string
}

export class UserMongooseRepository implements IUserRepository {


  async deleteInterest(username: string, interestName: string): Promise<User> {
    const user = await this.getUserByUsername(username)
    const userInterestsWithouDeletedInterest = user.interests.filter(interest => {
      if(interest.from === interestName){
        return
      }
      return interest
    })
     await UserMongo.updateOne(
      {
        id: user.id,
      },
      { interests: userInterestsWithouDeletedInterest }
    );
    const updatedUser = await this.getUserByUsername(username)
    return updatedUser
  }

 
  async save(data: User): Promise<User> {
    const user = await UserMongo.create({
      email: data.email,
      id: data.id,
      password: data.password,
      username: data.username,
      searches: data.searches,
      createdAt: data.createdAt,
      interests: data.interests
    });

    return user;
  }
  async showAll(): Promise<User[]> {
    return await UserMongo.find();
     
  }
  async getUserByToken(token: string): Promise<User> {
    const user = await UserMongo.findOne({
      id: token,
    });
    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await UserMongo.findOne({
      username,
    });
    return user || null;
  }
  async updateUserSearches(user: User): Promise<User> {
    await UserMongo.updateOne(
      {
        id: user.id,
      },
      { searches: user.searches }
    );
    const updatedUser = this.getUserByUsername(user.username);
    return updatedUser;
  }

  async deleteCurrency(currencyId: string, userId: string): Promise<User| null> {
    const user = await UserMongo.findOne({
      id: userId
    })
    if(!user){
      return null
    }
    const currency = user.searches.find(currency => currency.id === currencyId)

    if(!currency){
      throw new Error("Ops, currency nao encontrada")
    }

    const currenciesWithoutDeletedCurrency = user.searches.filter(currency => {
      if(currency === currencyId) return 
      return currency
    })
       await UserMongo.updateOne(
        {
          id: userId
        },
        {
          searches: currenciesWithoutDeletedCurrency
        }
       )
       const updatedUser = await this.getUserByUsername(user.username);
       return updatedUser;
  }


  async updateUserInterests(user: User, interest: Interest): Promise<User> {
    user.interests.push(interest)
    await UserMongo.updateOne(
      {
        id: user.id,
      },
      { interests: user.interests }
    );
    const updatedUser = await this.getUserByUsername(user.username);
    return updatedUser;
  }
  
  async updateInterestTargetValue(username: string, {from,to}: ChangeInterestProps, targetValue: number): Promise<Interest> {
    const user = await this.getUserByUsername(username);
    const interestIndex = user.interests.findIndex(interest => {
      if(interest.from.toLowerCase() === from.toLowerCase() && interest.to.toLowerCase() === to.toLowerCase()){
        return interest
      }
      return
    })
    user.interests[interestIndex].targetValue = targetValue
    await UserMongo.updateOne(
      {
        id: user.id,
      },
      { interests: user.interests }
    );
    const updatedUser = await this.getUserByUsername(user.username);

      return updatedUser.interests[interestIndex]
  }


  async getUserInterests(user: User): Promise<Interest[]> {
    const updatedUser = await this.getUserByUsername(user.username)
    return updatedUser.interests
  }

  async getUsersTargets(): Promise<any[]>{
     const users = await UserMongo.find()
     const userInterests = users.map(user => {
      return {
        userId: user.id,
        interests: user.interests
      }
     })
     return userInterests
  }


  async updateUserNotifications(userId: string, notification: Notification): Promise<Notification> {
    const user = await UserMongo.findOne({
        id: userId
    })
    const notificationAlreadyExists = user.notifications.find(notify => notify.name === notification.name)
    if(notificationAlreadyExists){
      return notificationAlreadyExists
    }
    user.notifications.push(notification)
    await UserMongo.updateOne(
      {
        id: user.id,
      },
      { notifications: user.notifications }
    );
    const updatedUser = await this.getUserByUsername(user.username);
    const notificationUpdated = updatedUser.notifications.find(notify => notify.name === notification.name)
    return notificationUpdated;
  }

}
