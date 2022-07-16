import { Auction } from "./action.model";

export class UsersAuction {
    Action:Auction
    email:string;
    bidValue:number;
    constructor(email:string,bidValue:number,Action:Auction){
        this.email=email;
        this.bidValue=bidValue;
        this.Action=Action;
    }
}
