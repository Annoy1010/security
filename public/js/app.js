// WEB
const container = document.querySelector('.app');
const loading = document.querySelector('.main-loading');
const submitBtn = document.querySelector('.app__info-send-btn');
const emailLabel = document.querySelector('.app__info-email');
const emailText = document.querySelector('.app__info-email__input');
const secureModel = document.querySelector('.app__info-secure');
var otp = document.querySelector('.otp-input');


function showMainInterface() {
    container.style.display = "flex";
    container.style.animation = `fadeIn linear 2.4s`;
    loading.style.display = "none";
}
setInterval(showMainInterface, 6000);

var nClickSubmitBtn = 0;
var newPass = document.querySelector('.pass-input');
var renewPass = document.querySelector('.repass-input');
var OTPCode;

submitBtn.addEventListener('click', function(e) {
    if (nClickSubmitBtn == 0) {
        if (!IsValidateEmail(emailText.value))
            alert("Email không hợp lệ! Vui lòng kiểm tra lại.");            
        else 
        SendMailUI();
    }
    else if (nClickSubmitBtn == 1) {
        if (otp.value == OTPCode) {
            alert("Mã PIN chính xác");
            ResetPasswordUI();
        }
        else
            alert("Mã PIN không chính xác! Vui lòng thử lại");
    }
    else if (nClickSubmitBtn == 2) {
        if (newPass.value == renewPass.value) {
            
            alert("Cập nhật mật khẩu thành công");
            newPass.value = "";
            renewPass.value = "";
        }
        else
            alert("Mật khẩu xác nhận không chính xác");
    }
})

function IsValidateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(re))
        return true;
    return false;
}

function GetRandomOTP(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function SendData(email, number, password) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    if (nClickSubmitBtn == 0) {
        SendOTP(email, number, xhr);
    }
    if (nClickSubmitBtn == 3) {
        SendPass(password, xhr);
    }
}

function SendOTP(email, number, xhr) {
    let formData = {
        email: email,
        subject: 'Security',
        message: 'Xin chào bạn,\nMã xác nhận của bạn là: ' + number.toString() + '\nVui lòng không để lộ thông tin bảo mật. Xác nhận mã để đặt lại mật khẩu mới.'
    }
    xhr.onload = function() {
        console.log(xhr.responseText);
        if (xhr.responseText == "success") {
            alert("Mã OTP đã gửi đến hộp thư của bạn. Vui lòng kiểm tra để hoàn thành bước cập nhật mật khẩu");
        }
        else {
            alert("Có lỗi xảy ra");
        }
    }
    xhr.send(JSON.stringify(formData));
}

function SendPass(pass, xhr) {
    let formData = {
        password: pass
    }
    xhr.onload = function() {
        console.log(xhr.responseText);
        if (xhr.responseText == "success") {
            alert("Cập nhật mật khẩu thành công");
        }
        else {
            alert("Có lỗi xảy ra");
        }
    }
    xhr.send(JSON.stringify(formData));
}

function SendMailUI() {
    OTPCode = GetRandomOTP(1000, 9999);
    SendData(emailText.value, OTPCode);
    emailLabel.textContent = "Mã OTP";
    emailLabel.style.margin = "13px 0 0 40px";           
    nClickSubmitBtn++;
    emailText.style.display = "none";
    otp.style.display = "block";
}

function ResetPasswordUI() {
    var str = "";
    SendData(str, str, newPass.value)
    otp.style.display = "none";
    var secureLabel = document.querySelector('.app__info-secure-label');
    secureLabel.innerHTML = 
    `
        <span class="app__info-email">Mật khẩu mới</span>
        <span class="app__info-email repass">Xác nhận mật khẩu</span>
    `;
    newPass.style.display = "block";
    renewPass.style.display = "block";
    secureModel.style.height = "100px";
    nClickSubmitBtn++;
}



