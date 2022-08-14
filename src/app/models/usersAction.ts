import { Auction } from "./action.model";

export class UsersAuction {
  _id:string;
    Action:Auction
    email:string;
    bidValue:number;
    carNumber:number;
    constructor(email:string,bidValue:number,carNumber:number,Action:Auction){
        this.email=email;
        this.bidValue=bidValue;
        this.carNumber=carNumber;
        this.Action=Action;
    }
}
