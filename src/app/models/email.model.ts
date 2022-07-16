import { Cars } from "./cars.model";

export class Email {
    _id:string;
    email: string;
    rand:number;
    car:Cars;
    constructor(email:string){
        this.email=email;
    }

   
}
