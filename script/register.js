const namaInput = document.querySelector('.nama-input');
const emailInput = document.querySelector('.email-input');
const nomor = document.querySelector('.nomor');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.password2');
const button = document.querySelector('.submit');
const form = document.querySelector('#form')
let dataInfo = []


form.onsubmit = function(event) {
    event.preventDefault();
    alert("Registrasi Berhasil");

    const data = {
        nama: namaInput.value,
        email: emailInput.value,
        nomor: nomor.value,
        password: password.value

    }
    console.log(data)
    if (password.value === confirmPassword.value) {
        dataInfo.push(data);

        let abc = localStorage.getItem('data-user');



        if (localStorage.getItem('data-user') != null) {
            let user = [];
            user = JSON.parse(localStorage.getItem('data-user'));
            user.push(data)
            localStorage.setItem('data-user', JSON.stringify(user));
        } else {
            localStorage.setItem('data-user', JSON.stringify(dataInfo));
        }


    } else {
        alert('password berbeda')
    }

    window.location = "login.html"
}