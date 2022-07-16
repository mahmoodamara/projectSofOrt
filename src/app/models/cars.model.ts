export class Cars {
    _id:string;
    serialNumber: number;
    img: string;
    type: string;
    manufacturer: string;
    yearOfManufacture:number;
    model: string;
    horsePower: number;
    engineCapacity: number ; 
    fuelType:string;
    KM:number;
    price:number;
    views:number;
    isShowRent:boolean;
    isRent:boolean;
    timeRent:string;
    carInspectionDate:string;

    email: string;
    checkIn:string;
    checkOut:string;
    constructor(email:string,checkIn:string,checkOut:string){
        this.checkOut=checkOut;
        this.checkIn=checkIn
        this.email=email;
    }
    
}
