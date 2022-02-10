import { findDataUser, getAllDataUser } from "./utilities.js";

// Menampilkan data user //////////////////////
const namaElement = document.querySelector('#nama');
const tanggalElement = document.querySelector('#tanggal');
const genderElement = document.querySelectorAll('.gender input');
const alamatElement = document.querySelector('#alamat');
const emailElement = document.querySelector('#email');
const hpElement = document.querySelector('#hp');
const fotoElement = document.querySelector('.img-thumbnail');
const fotoInput = document.querySelector('.foto');

const cekUser = !!sessionStorage.getItem('isLogin') ? sessionStorage.getItem('isLogin') : window.location = "index.html";
let user = findDataUser(cekUser);

updateData();

// Edit data ///////////////////////////////
const tombolUbah = document.querySelector('.edit');
const dataUser = getAllDataUser();

tombolUbah.addEventListener('click', () => {
    dataUser.forEach(data => {
        if (data.nama == user.nama) {
            data.nama = namaElement.value;
            data.tanggal = tanggalElement.value;
            genderElement.forEach(element => { if (element.checked) data.gender = element.id });
            data.alamat = alamatElement.value;
            data.email = emailElement.value;
            data.nomor = hpElement.value;
            // data.foto = fotoInput.value;

            localStorage.setItem('data-user', JSON.stringify(dataUser));
            sessionStorage.setItem('isLogin', namaElement.value);
            alert("Data berhasil diubah");
            location.reload();
        }
    })
})

function updateData() {
    user = findDataUser(cekUser);
    // let foto = user.foto ? user.foto : './img/profile.jpg'

    namaElement.value = user.nama;
    tanggalElement.value = user.tanggal;
    genderElement.forEach(element => { if (element.id == user.gender) element.checked = true });
    alamatElement.value = user.alamat;
    emailElement.value = user.email;
    hpElement.value = user.nomor;
    // fotoElement.setAttribute('src', foto);
}