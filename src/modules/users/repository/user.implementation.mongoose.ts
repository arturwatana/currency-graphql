import { Interest, TargetValueProps } from "../../Interest/model/Interest.model.js";
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

  async deleteInterest(email: string, interestName: string): Promise<User> {
    const user = await this.getUserByEmail(email)
    const interestFrom = interestName.split("-")[0]
    const interestTo = interestName.split("-")[1]
    const interestExists = user.interests.find(interest => interest.from === interestFrom && interest.to === interestTo)
    if(!interestExists){
      throw new Error("Ops, este interesse nao existe!")
    }
    const userInterestsWithouDeletedInterest = user.interests.filter(interest => {
      if(interest.from === interestFrom && interest.to === interestTo){
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
    const updatedUser = await this.getUserByEmail(email)
    return updatedUser
  }

 
  async save(data: User): Promise<User> {
    const user = await UserMongo.create({
      email: data.email,
      id: data.id,
      password: data.password,
      fullName: data.fullName,
      searches: data.searches,
      createdAt: data.createdAt,
      interests: data.interests
    });

    return user;
  }
  async showAll(): Promise<User[]> {
    return await UserMongo.find();
     
  }
  async deleteALL(): Promise<void> {
    await UserMongo.deleteMany();
    return 
     
  }
  async getUserByToken(token: string): Promise<User> {
    const user = await UserMongo.findOne({
      id: token,
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserMongo.findOne({
      email,
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
    const updatedUser = this.getUserByEmail(user.email);
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
       const updatedUser = await this.getUserByEmail(user.email);
       return updatedUser;
  }


  async updateUserInterests(user: User, interest: Interest): Promise<User> {
    const interestIndex = user.interests.findIndex(userInterest => interest.from === userInterest.from && interest.to === userInterest.to)
    if(interestIndex === -1){
      user.interests.push(interest)
    } else {
      user.interests[interestIndex] = interest
    }
    await UserMongo.updateOne(
      {
        id: user.id,
      },
      { interests: user.interests }
    );
    const updatedUser = await this.getUserByEmail(user.email);
    return updatedUser;
  }
  
  async updateInterestTargetValue(email: string, {from,to}: ChangeInterestProps, targetValue: TargetValueProps): Promise<Interest> {
    if(!targetValue.buy || !targetValue.sell){
      throw new Error("Ops, faltou especificar se o valor é de compra ou venda ")
    }
    const user = await this.getUserByEmail(email);
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
    const updatedUser = await this.getUserByEmail(user.email);

      return updatedUser.interests[interestIndex]
  }


  async getUserInterests(user: User): Promise<Interest[]> {
    const updatedUser = await this.getUserByEmail(user.email)
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
    const updatedUser = await this.getUserByEmail(user.email);
    const notificationUpdated = updatedUser.notifications.find(notify => notify.name === notification.name)
    return notificationUpdated;
  }
 async deleteUserExpiredNotifications(notifications: Notification[]): Promise<void> {
   const notificationsToDelete = notifications.map(notify => {
    const difInMilisec = Math.abs(+notify.createAt - +new Date());
    const dayInMilisec = 1000 * 60 * 60 * 24; 
    const difInDays = Math.floor(difInMilisec / dayInMilisec);
    if(difInDays > 3){
      return notify
    }
    return
   })

   notificationsToDelete.map(async notify => {
     const user = await UserMongo.findOne({
         id: notify.userId
     })
       const notificationyExistsIndex = user.notifications.findIndex(notification => notification.name === notification.name)
       if(notificationyExistsIndex != -1){
         user.notifications.splice(notificationyExistsIndex, 1)
         await UserMongo.updateOne(
           {
             id: user.id,
           },
           { notifications: user.notifications }
         );
      }})
    return ;
  }

}
