class ManagePerson{
    personArray =[];
    addPerson(person){
        this.personArray.push(person);
        alert("Đã thêm thành công!!")
        document.querySelector('#btnDong').click()
    }
    deletePerson(personID){
       let index = this.findIndexByID(personID);
       this.personArray.splice(index,1);
    }
    getPersonDetail(personID){
        let index = this.findIndexByID(personID);
        return this.personArray[index]
    }
    updatePerson(person,id){
        let index = this.findIndexByID(id);
        this.personArray[index] = person;
        alert("Đã cập nhật thành công!!")
        document.querySelector('#btnDong').click()
    }
    findIndexByID(id){
        let index = this.personArray.findIndex((person)=>{
            return person.code == id;
        })
        return index
    }

}