
import Teacher from "../models/teacher.js"
import Student from "../models/studen.js"
import Customer from "../models/customer.js"
const manage = new ManagePerson;
const vd = new Validation;
function getLocalStorage() {
    if (localStorage.getItem('manageCollagePerson') != null) {
        manage.personArray = JSON.parse(localStorage.getItem('manageCollagePerson'));
        showInTable(manage.personArray);
    }
}
getLocalStorage()
function setLocalStorage() {
    localStorage.setItem('manageCollagePerson', JSON.stringify(manage.personArray))
}
function getInfo() {
    let name = document.querySelector('#name').value;
    let code = document.querySelector('#tknv').value;
    let email = document.querySelector('#email').value;
    let adress = document.querySelector('#adress').value;
    let type = document.querySelector('#proper').value;
    switch (type) {
        case 'student':
            let dToan = document.querySelector('#toan').value;
            let dLy = document.querySelector('#ly').value;
            let dHoa = document.querySelector('#hoa').value;
            let isValidcode1 = isValidCode(code);
            if ((isValid(name, email, adress, type, dToan, dLy, dHoa) && isValidcode1)) {
                var student = new Student(dToan, dLy, dHoa, code, name, adress, email, type)
                student['method'] = student.averageTotal().toFixed(1) + "đ";
                manage.addPerson(student)
            }
            break;
        case 'teacher':
            let dayOfWork = document.querySelector('#dayOfWork').value;
            let income = document.querySelector('#income').value;
            let isValidcode2 = isValidCode(code);
            if (isValid(name, email, adress, type, dayOfWork, income) && isValidcode2) {
                var teacher = new Teacher(dayOfWork, income, code, name, adress, email, type)
                teacher['method'] = teacher.getIncomeTotally().toLocaleString() + "đ";
                manage.addPerson(teacher)
            }
            break;
        case 'customer':
            let companyName = document.querySelector('#companyName').value;
            let valueOfBill = document.querySelector('#valueOfBill').value;
            let respone = document.querySelector('#respone').value;
            let isValidcode3 = isValidCode(code);
            if (isValid(name, email, adress, type, companyName, valueOfBill, respone) && isValidcode3) {
                var customer = new Customer(companyName, valueOfBill, respone, code, name, adress, email, type)
                manage.addPerson(customer)
            }
            break;
    }
    setLocalStorage()
    getLocalStorage()
} document.querySelector('#btnThemNV').onclick = getInfo;

function showInTable(list) {
    let showEle = document.querySelector('#tableDanhSach');
    showEle.innerHTML = list.map((item) => {
        let { code, name, email, adress, type, ...rest } = item;
        let restArr = [];
        let charArr = distinguishChar(type).arr;
        let typeOfChar = distinguishChar(type).type;
        for (let i = 0; i < Object.keys(rest).length; i++) {
            restArr.push((`${charArr[i]}:${rest[Object.keys(rest)[i]]}`))
        }
        let restShow = restArr.map((restItem) => {
            return `<li>${restItem}</li>`
        }).join('');
        return `
        <tr>
        <td>${code}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${adress}</td>
        <td class="tdRender">${typeOfChar} <ul class="ulRender">${restShow}
        </ul></td>
        <td>
            <button class="btn btn-success" onclick="showDetails('${code}')" data-toggle="modal" data-target="#myModal">Xem</button>
            <button onclick=deleteObject('${code}') class="btn btn-danger id="deletE" >Xóa</button>
        </td>
        </tr>
        `
    }).join('');
}


function distinguishChar(type) {
    switch (type) {
        case 'student':
            return {
                arr: ['điểm toán', 'điểm lý', 'điểm hóa', 'Điểm trung bình'],
                type: "Học sinh",
                idRender: ['toan', 'ly', 'hoa'],
            }
        case 'teacher':
            return {
                arr: ['ngày làm', 'lương theo ngày', 'Tổng lương'],
                type: "Giảng viên",
                idRender: ['dayOfWork', 'income'],
            }
        case 'customer':
            return {
                arr: ['tên công ty', 'giá trị hóa đơn', 'đánh giá'],
                type: 'Khách Hàng',
                idRender: ['companyName', 'valueOfBill', 'respone'],
            }
    }

}
window.deleteObject = function (code) {
    manage.deletePerson(code)
    setLocalStorage()
    getLocalStorage()
}

window.showDetails = function (code) {
    clearSpan()
    document.querySelector('#tknv').disabled =true;
    document.getElementById('btnThemNV').style.display = 'none';
    whenShowPopup("Cập nhật thông tin", "none", "block")
    let rs = manage.getPersonDetail(code)
    document.querySelector('#name').value = rs.name;
    document.querySelector('#tknv').value = rs.code;
    document.querySelector('#email').value = rs.email;
    document.querySelector('#adress').value = rs.adress;
    document.querySelector('#proper').value = rs.type;
    switch (rs.type) {
        case 'student':
            renderInput()
            document.querySelector('#toan').value = rs.dToan;
            document.querySelector('#ly').value = rs.dLy;
            document.querySelector('#hoa').value = rs.dHoa;
            break;
        case 'teacher':
            renderInput()
            document.querySelector('#dayOfWork').value = rs.dayOfWork;
            document.querySelector('#income').value = rs.income;
            break;
        case 'customer':
            renderInput()
            document.querySelector('#companyName').value = rs.companyName;
            document.querySelector('#valueOfBill').value = rs.valueOfBill;
            document.querySelector('#respone').value = rs.respone;
            break;
    }
}

function whenShowPopup(titleHeader, button, buttonUpdate) {
    let title = document.getElementById('header-title');
    let addbtn = document.getElementById('btnThemNV');
    let updateBtn = document.getElementById('btnCapNhat');
    title.innerHTML = titleHeader;
    addbtn.style.display = button;
    updateBtn.style.display = buttonUpdate;
}
function whenClickAddPerson() {
    clearSpan()
    whenShowPopup("Log in", "block", "none")
    document.querySelector('#tknv').disabled = false;
    document.querySelector('form').reset()
    renderInput()
}
document.getElementById('btnThem').addEventListener('click', whenClickAddPerson)

function updatePerson() {
    let name = document.querySelector('#name').value;
    let code = document.querySelector('#tknv').value;
    let email = document.querySelector('#email').value;
    let adress = document.querySelector('#adress').value;
    let type = document.querySelector('#proper').value;
    switch (type) {
        case 'student':
            let dToan = document.querySelector('#toan').value;
            let dLy = document.querySelector('#ly').value;
            let dHoa = document.querySelector('#hoa').value;
            if (isValid(name, email, adress, type, dToan, dLy, dHoa)){
                var student = new Student(dToan, dLy, dHoa, code, name, adress, email, type)
                student['method'] = student.averageTotal().toFixed(1) + "đ";
                manage.updatePerson(student, code)
            }
            break;
        case 'teacher':
            let dayOfWork = document.querySelector('#dayOfWork').value;
            let income = document.querySelector('#income').value;
            if (isValid(name, email, adress, type, dayOfWork, income)){
                var teacher = new Teacher(dayOfWork, income, code, name, adress, email, type)
                teacher['method'] = teacher.getIncomeTotally().toLocaleString() + "đ";
                manage.updatePerson(teacher, code)
            }
            break;
        case 'customer':
            let companyName = document.querySelector('#companyName').value;
            let valueOfBill = document.querySelector('#valueOfBill').value;
            let respone = document.querySelector('#respone').value;
            if (isValid(name, email, adress, type, companyName, valueOfBill, respone)){
                var customer = new Customer(companyName, valueOfBill, respone, code, name, adress, email, type)
                manage.updatePerson(customer, code)
            }
            break;
    }
    setLocalStorage()
    getLocalStorage()
}
document.querySelector('#btnCapNhat').addEventListener('click', updatePerson)


function sortNameToggleBtn() {
    let asc = document.querySelector('.fa-arrow-up').classList;
    let dasc = document.querySelector('.fa-arrow-down').classList;
    if (dasc.contains('d-none')) {
        asc.add('d-none');
        dasc.remove('d-none');
        return true;
    } else {
        asc.remove('d-none');
        dasc.add('d-none');
        return false;
    }
}
document.querySelector('.sortByName').addEventListener('click', sortByName);

function sortByName() {
    let personArray = [];
    if (sortByType()) {
        personArray = sortByType();
    } else {
        personArray = [...manage.personArray];
    }
    let resultArr = [];
    let nameArr = personArray.map((person, index) => {
        return person.name.split(' ').pop().toLowerCase();
    })
    let arrNameOrigin = [...nameArr]
    let sortedNameArr = [];
    if (sortNameToggleBtn()) {
        sortedNameArr = nameArr.sort();
    } else { sortedNameArr = nameArr.sort().reverse(); }
    for (let i = 0; i < nameArr.length; i++) {
        for (let j = 0; j < nameArr.length; j++) {
            if (arrNameOrigin[i] == sortedNameArr[j]) {
                resultArr[j] = personArray[i]
            }
        }
    }
    showInTable(resultArr)
}

function sortByType() {
    let personArray = [...manage.personArray];
    let resultArray = [];
    var sortTypeBtn = document.querySelector('#sortByType').value;
    personArray.forEach((person) => {
        let personType = person.type;
        switch (sortTypeBtn) {
            case 'student':
                personType == 'student' ? resultArray.push(person) : 1;
                break;
            case 'teacher':
                personType == 'teacher' ? resultArray.push(person) : 1;
                break;
            case 'customer':
                personType == 'customer' ? resultArray.push(person) : 1;
                break;
            default:
                resultArray = [...manage.personArray];
                break;
        }
    })
    showInTable(resultArray)
    return resultArray;
}
document.querySelector('#sortByType').addEventListener('change', sortByType);

function findName() {
    let keyWord = document.querySelector('.keyWord').value;
    let arrName = [...manage.personArray];
    let rs = arrName.filter((person) => {
        return person.name.toLowerCase().includes(keyWord.trim().toLowerCase())
    })
    showInTable(rs)
}
document.querySelector('.keyWord').addEventListener('input', findName);

function isValid(name, email, adress, type, ...rest) {
    let isValidRs = true;
    isValidRs &= vd.isEmpty(email, '#tbEmail') && vd.isEmail(email, '#tbEmail');
    isValidRs &= vd.isEmpty(adress, "#tbAdress");
    isValidRs &= vd.isEmpty(name, "#tbTen") && vd.isName(name, "#tbTen")
    let idForSpan = distinguishChar(type).idRender;
    switch (type) {
        case 'student':
            for (let i = 0; i < rest.length; i++) {
                isValidRs &= vd.isEmpty(rest[i], `#tb${idForSpan[i]}`) && vd.isScore(rest[i], `#tb${idForSpan[i]}`)
            }
            return isValidRs;
        case 'teacher':
            isValidRs &= vd.isEmpty(rest[0], `#tb${idForSpan[0]}`) && vd.isDayOfWork(rest[0], `#tb${idForSpan[0]}`)
            isValidRs &= vd.isEmpty(rest[1], `#tb${idForSpan[1]}`) && vd.isIncomePerDay(rest[1], `#tb${idForSpan[1]}`)
            return isValidRs;
        case 'customer':
            for (let i = 0; i < rest.length; i++) {
                isValidRs &= vd.isEmpty(rest[i], `#tb${idForSpan[i]}`) && vd.íValueOfBill(rest[1], `#tb${idForSpan[1]}`)
            }
            return isValidRs;
    }
};
function isValidCode(code){
    let codeArray = [];
    for (let key of manage.personArray) {
        codeArray.push(key.code)
    }
    let isValidRs = true;
    isValidRs = vd.isEmpty(code, '#tbTKNV') && vd.isCodeRepeat(code, '#tbTKNV', codeArray);
    return isValidRs;
}


function whenInput() {
    let inputElement = document.querySelectorAll('#myModal input')
    for (let key of inputElement) {
        key.oninput = () => {
            key.parentElement.nextElementSibling.innerHTML = '';
        }
    }
}
whenInput()

function clearSpan(){
    let inputElement = document.querySelectorAll('#myModal input')
    for (let key of inputElement) {
            key.parentElement.nextElementSibling.innerHTML = '';
        }
}