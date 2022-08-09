import { Cars } from "./cars.model";

export class Profile {
    _id:any;
   email:string;
   serialNumber:number;
   car:Cars;

    constructor(email:string , car:Cars,serialNumber){
        this.email=email;
        this.car=car;
        this.serialNumber=serialNumber;
    }
}


