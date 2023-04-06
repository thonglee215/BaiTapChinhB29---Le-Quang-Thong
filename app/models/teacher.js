import Person from "./person.js";

export default class Teacher extends Person{
    constructor(dayOfWork,income,...rest){
        super(...rest);
        this.dayOfWork = Number(dayOfWork);
        this.income = Number(income);
    }
    getIncomeTotally(){
        return this.income * this.dayOfWork;
    }
}