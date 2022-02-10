import { getData, formatRupiah } from "./utilities.js";

const produkContainer = document.querySelector('tbody');
const totalHargaElement = document.querySelector('.total h4');
const checkoutButton = document.querySelector(".total button");

//reset checkout item & keranjang
let checkoutItem = [];
sessionStorage.removeItem('checkout');
let keranjang = !!sessionStorage.getItem("keranjang") ? JSON.parse(sessionStorage.getItem("keranjang")) : false;
if (keranjang.length == 0) {
    sessionStorage.removeItem('keranjang');
    keranjang = false;
}

let nomor = 1;

if (keranjang) {
    document.querySelector('.keranjang-kosong').classList.add('d-none');
    document.querySelector('.text-title').classList.remove('d-none');
    document.querySelector('.table').classList.remove('d-none');
    document.querySelector('.table-footer').classList.remove('d-none');
}

produkContainer.addEventListener('click', (e) => {

    if (e.target.id == "pilih") {
        const namaData = e.target.getAttribute("data-nama");
        setCheckoutItem(namaData, "pilih", e.target.checked);
    }

    // Logika Increment Decrement Tombol Jumlah
    if (e.target.classList.contains("btn-jumlah")) {
        const data = getCheckoutItem(e.target.getAttribute("data-nama"));
        let jumlah = data.jumlah;
        if (e.target.innerHTML == "+") {
            jumlah = +jumlah + 1;
            e.target.previousElementSibling.innerHTML = jumlah;
        } else if (e.target.innerHTML == "-" && jumlah > 0) {
            jumlah = jumlah - 1;
            e.target.nextElementSibling.innerHTML = jumlah;
        }

        e.target.parentElement.parentElement.parentElement.querySelector('#subtotal').innerHTML = `Rp. ${formatRupiah(data.harga * jumlah)}`;
        setCheckoutItem(data.nama, "jumlah", jumlah);
    }
    ///////////////////////////////////////////////////

    updateHarga();
})

// Ketika tombol checkout ditekan
checkoutButton.addEventListener('click', () => {
    checkout();
    window.location = "checkout.html";
})

async function showKeranjang() {
    try {
        const datas = await getData();

        // Mengambil data yang mau di tampilkan di table
        datas.forEach(data => {
            keranjang.forEach(item => {
                if (data.nama_produk.toLowerCase() == item.nama.toLowerCase()) {
                    const produk = {
                        nama: data.nama_produk,
                        harga: data.harga,
                        jumlah: item.jumlah,
                        pilih: false,
                    }
                    checkoutItem.push(produk);
                }
            })
        });

        // Menampilkan data ke tabel
        checkoutItem.forEach(i => addProduk(i))

    } catch (error) {
        console.log(error);
    }
}

function addProduk(data) {
    produkContainer.innerHTML += `<tr data-nama="${data.nama}">
                            <th scope="row">${nomor}</th>
                            <td id="nama-produk">${data.nama}</td>
                            <td id="harga">Rp ${formatRupiah(data.harga)}</td>
                            <td>
                                <div class="jumlah-container d-flex">
                                    <button class="jumlah btn-jumlah" data-nama="${data.nama}">-</button>
                                    <div class="jumlah d-flex justify-content-center align-items-center">${data.jumlah}</div>
                                    <button class="jumlah btn-jumlah" data-nama="${data.nama}">+</button>
                                </div>
                            </td>
                            <td id="subtotal">Rp ${formatRupiah(data.harga * data.jumlah)}</td>
                            <td>
                                <input id="pilih" type="checkbox" data-nama="${data.nama}">
                            </td>
                        </tr>`;
    nomor++;
}

function setCheckoutItem(name, prop, value) {
    checkoutItem.forEach(item => {
        if (item.nama.toLowerCase() == name.toLowerCase()) {
            item[prop] = value;
        }
    })
}

function getCheckoutItem(name) {
    let result;
    checkoutItem.forEach(item => {
        if (item.nama.toLowerCase() == name.toLowerCase()) {
            result = item;
        }
    })
    return result;
}

function updateHarga() {
    let totalHarga = 0;
    checkoutItem.forEach((item) => {
        if (item.pilih) {
            totalHarga += item.harga * item.jumlah
        }
    })

    totalHargaElement.innerHTML = `Rp. ${formatRupiah(totalHarga)}`;

    if (totalHarga != 0) {
        checkoutButton.className = "btn-footer";
        checkoutButton.removeAttribute('disabled');
    } else {
        checkoutButton.className = "btn-disabled";
        checkoutButton.setAttribute("disabled", true);
    }
}

function checkout() {
    let newKeranjang = [];
    let newCheckoutItem = [];

    checkoutItem.forEach((item, index) => {
        console.log(item);
        if (item.pilih) newCheckoutItem.push(item)
        else {
            keranjang.splice(index, 1);
            newKeranjang.push(item);
        }
    })

    sessionStorage.setItem('keranjang', JSON.stringify(newKeranjang));
    sessionStorage.setItem('checkout', JSON.stringify(newCheckoutItem));
    console.log(checkoutItem);
}

showKeranjang();