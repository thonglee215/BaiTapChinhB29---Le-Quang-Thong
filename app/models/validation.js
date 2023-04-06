class Validation {
    isEmpty(input, span) {
        let spanEle = document.querySelector(span);
        if (input) {
            spanEle.style.display = "none";
            spanEle.innerHTML = "";
            return true;
        } else {
            spanEle.style.display = "block";
            spanEle.innerHTML = "Vui lòng không được để trống!";
            return false;
        }
    };
    isCodeRepeat(input, span, idArray) {
        let isTrue = true;
        let spanEle = document.querySelector(span);
        for (let key of idArray) {
            if (input == key) {
                // nếu trùng:
                spanEle.style.display = "block";
                spanEle.innerHTML = "Tài khoản bị trùng! Vui lòng nhập một tài khoản khác!";
                isTrue = false;
                break;
            } else {
                spanEle.style.display = "none";
                spanEle.innerHTML = "";
            }
        }
        return isTrue;
    }
    isName(input, span) {
        let spanEle = document.querySelector(span);
        let pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (input.match(pattern)) {
            spanEle.style.display = "none";
            spanEle.innerHTML = "";
            return true;
        }else{
            spanEle.style.display = "block";
            spanEle.innerHTML = "Vui lòng nhập tên hợp lệ!";
            return false;
        }
    }
    isEmail(input, span){
        let pattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        let spanEle = document.querySelector(span);
        if(input.match(pattern)){
            spanEle.style.display = "none";
            spanEle.innerHTML = "";
            return true;
        }else{
            spanEle.style.display = "block";
            spanEle.innerHTML = "Vui lòng nhập email hợp lệ!";
            return false;
        }
    }
    isScore(input, span){
        let pattern =/^(\d{1,2}(\.\d{1,2})?)$/;
        let spanEle = document.querySelector(span);
        if(input.match(pattern)){
            spanEle.style.display = "none";
            spanEle.innerHTML = "";
            return true;
        }else{
            spanEle.style.display = "block";
            spanEle.innerHTML = "Vui lòng nhập điểm hợp lệ!(Số thập phân phải có ký tự `.` )";
            return false;
        }
        
    }
    isDayOfWork(input, span){
        let pattern =/^[0-9]+$/;
        let spanEle = document.querySelector(span);
        if(input.match(pattern)&& input >=10){
            spanEle.style.display = "none";
            spanEle.innerHTML = "";
            return true;
        }else{
            spanEle.style.display = "block";
            spanEle.innerHTML = "Ngày làm phải hợp lệ: ít nhất 10 ngày làm";
            return false;
        }
    }
    isIncomePerDay(input, span){
        let pattern =/^[0-9]+$/;
        let spanEle = document.querySelector(span);
        if(input.match(pattern)&& input >=100000){
            spanEle.style.display = "none";
            spanEle.innerHTML = "";
            return true;
        }else{
            spanEle.style.display = "block";
            spanEle.innerHTML = "Lương phải hợp lệ: ít nhất 100.000đ/ ngày";
            return false;
        }
    }
    íValueOfBill(input, span){
        let pattern =/^[0-9]+$/;
        let spanEle = document.querySelector(span);
        if(input.match(pattern)&& input >=10000){
            spanEle.style.display = "none";
            spanEle.innerHTML = "";
            return true;
        }else{
            spanEle.style.display = "block";
            spanEle.innerHTML = "Giá trị hóa đơn phải hợp lệ!(Ít nhất 10.000đ)";
            return false;
        }
    }
};





function onBlur(inputEle,cb){
    document.querySelector(inputEle).onblur = cb;

}

