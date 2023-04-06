let selectEle = document.querySelector('#proper');
let innerDOM = document.querySelector('.renderInput');
let addBtn = document.getElementById('btnThemNV')
function renderInput() {
    switch (selectEle.value) {
        case 'student':
            let studentProper = ['toan','ly','hoa']
            let text = ['điểm toán','điểm lý','điểm hóa']
            if(document.getElementById('header-title').innerHTML == "Log in"){
                 addBtn.style.display = "block"
            }
            renderByArray(studentProper,text);
            console.log(document.querySelectorAll('#myModal input'))
            break;
        case 'teacher':
            let teacherProper = ['dayOfWork','income']
            let text2 = ['ngày làm','lương theo ngày']
            if(document.getElementById('header-title').innerHTML == "Log in"){
                addBtn.style.display = "block"
           }
            renderByArray(teacherProper,text2)

            break;
        case 'customer':
            let customerProper = ['companyName','valueOfBill','respone'];
            let text3 = ['tên công ty','giá trị hóa đơn','đánh giá']
            if(document.getElementById('header-title').innerHTML == "Log in"){
                addBtn.style.display = "block"
           }
            renderByArray(customerProper,text3)
            break;
        default:
            let arrEmpty =[];
            addBtn.style.display = "none"
            renderByArray(arrEmpty,arrEmpty)
            break;
    }
}

function renderByArray(array,array2){
            innerDOM.innerHTML = array.map((item,index)=>{
                return `
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa-solid fa-keyboard"></i></span>
                        </div>
                        <input oninput="whenInputForRenderBtn(${item})" type="text" name="${item}" id="${item}" class="form-control input-sm" placeholder="Nhập ${array2[index]}">
                    </div>
                    <span class="sp-thongbao" id="tb${item}"></span>
                </div>
                `
            }).join('');
}

window.whenInputForRenderBtn = function(id){
    id.parentElement.nextElementSibling.innerHTML = '';
}