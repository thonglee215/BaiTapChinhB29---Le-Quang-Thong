import Person from "./person.js";

export default class Customer extends Person{
    constructor(companyName,valueOfBill,respone,...rest){
        super(...rest);
        this.companyName = companyName;
        this.valueOfBill = valueOfBill;
        this.respone = respone;
    }
}