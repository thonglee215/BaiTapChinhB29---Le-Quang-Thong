import Person from "./person.js";

export default class Student extends Person{
    constructor(dToan,dLy,dHoa,...rest){
        super(...rest)
        this.dToan = Number(dToan);
        this.dLy = Number(dLy);
        this.dHoa = Number(dHoa);
    }
    averageTotal(){
        return (this.dHoa + this.dToan + this.dLy)/3;
    }
}



