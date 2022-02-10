import { formatRupiah, findDataUser } from "./utilities.js";

const checkoutItems = !!sessionStorage.getItem('checkout') ? JSON.parse(sessionStorage.getItem('checkout')) : window.location = "produk.html";
let nomor = 1;
let totalHarga = 0;
let totalBerat = 0;

// Menampilkan Product ///////////////////////////////////////////////////
const produkElementContainer = document.querySelector('.content-barang');
checkoutItems.forEach(item => addProduk(item));

function addProduk(item) {
    produkElementContainer.innerHTML += `<div class="d-flex justify-content-between">
                                            <span class="d-inline-block">${nomor}. ${item.nama} (${item.jumlah} Kg)</span>
                                            <span class="d-inline-block">Rp. ${formatRupiah(item.harga * item.jumlah)}</span>
                                         </div>`;
    totalHarga += item.harga * item.jumlah;
    totalBerat = +totalBerat + +item.jumlah;
    nomor++;
}

// Menampilkan data user /////////////////////////////////////////////////
const userElement = document.querySelector('#user');
const alamatElement = document.querySelector('#alamat');
const user = findDataUser(sessionStorage.getItem('isLogin'));
userElement.innerHTML = `<b>Rumah</b> - ${user.nama[0].toUpperCase() + user.nama.substr(1)} (${user.nomor})`;
if (user.alamat) alamatElement.value = user.alamat;

// Kalkulasi ongkos kirim ///////////////////////////////////////////////
let ongkosPerKilo = 10000; //default value jne reguler
let totalOngkos = ongkosPerKilo * totalBerat;
const ongkosElement = document.querySelectorAll('.ongkos');
const pengiriman = document.querySelector("#pengiriman");
const kurir = document.querySelector("#kurir");

document.querySelector('.content-pengiriman').addEventListener('click', () => {
    totalOngkos = 0;
    ongkosPerKilo = 5000;
    ongkosPerKilo = pengiriman.value == "express" ? ongkosPerKilo += 8000 : ongkosPerKilo += 2000;

    switch (kurir.value) {
        case "jne":
            ongkosPerKilo += 3000;
            break;
        case "anteraja":
            ongkosPerKilo += 1000;
            break;
        case "sicepat":
            ongkosPerKilo += 2000;
            break;
    }

    totalOngkos = ongkosPerKilo * totalBerat
    updateHarga();
})

// Menampilkan ringkasan belanja /////////////////////////////
const totalHargaElement = document.querySelector('#subtotal');
const totalTagihanElement = document.querySelector('#tagihan');

updateHarga();

function updateHarga() {
    totalHargaElement.innerHTML = `Rp. ${formatRupiah(totalHarga)}`;
    totalTagihanElement.innerHTML = `Rp. ${formatRupiah(totalHarga + totalOngkos)}`;
    ongkosElement[0].innerHTML = `Rp. ${formatRupiah(ongkosPerKilo)} / Kg`;
    ongkosElement[1].innerHTML = `Rp. ${formatRupiah(totalOngkos)}`;
}

// Tombol Bayar ////////////////////////////////////////
const metodePembayaran = document.querySelector("#pembayaran");
const alamat = document.querySelector("#alamat")
const bayarBtn = document.querySelector('.bayar');

const modalDataElement = document.querySelector('.modal-data');
const modalSucessElement = document.querySelector('.modal-sucess');
const modalBackdrop = document.querySelector('.modal-backdrop');


bayarBtn.addEventListener('click', () => {
    if (alamat.value && metodePembayaran.value) {
        modalToggle(modalSucessElement)
    } else {
        modalToggle(modalDataElement);
    }
})

document.addEventListener('click', e => {
    if (e.target.classList.contains('close')) {
        modalToggle(modalDataElement);
    } else if (e.target.classList.contains('oke')) {
        sessionStorage.removeItem('checkout');
        window.location = 'index.html';
    }
})

function modalToggle(modal) {
    if (modal.classList.contains('d-none')) {
        modal.classList.remove('d-none');
        modalBackdrop.classList.remove('d-none');
    } else {
        modal.classList.add('d-none');
        modalBackdrop.classList.add('d-none');
    }
}