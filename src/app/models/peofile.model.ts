import { Cars } from "./cars.model";

export class Profile {
    _id:any;
   email:string;
   car:Cars;
   
    constructor(email:string , car:Cars){
        this.email=email;
        this.car=car;
    }
}


