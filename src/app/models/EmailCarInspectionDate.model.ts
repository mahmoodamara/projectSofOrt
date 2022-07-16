import { Cars } from "./cars.model";

export class EmailCarInspectionDate{
    _id:string;
    email: string;
    rand:number;
    car:Cars;
    constructor(email:string,car:Cars){
        this.email=email;
        this.car=car
    }
}