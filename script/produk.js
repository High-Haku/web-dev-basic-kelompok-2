const content = document.querySelector(".content");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const categoriesList = document.getElementsByClassName("menu");
const category = [];
let keranjang = !!sessionStorage.getItem('keranjang') ? JSON.parse(sessionStorage.getItem('keranjang')) : [];

fetch("https://61fb8aed87801d0017a2c56a.mockapi.io/produk")
  .then((response) => response.json())
  .then((result) => {
    result.forEach((item) => {
      let kategori = category.length != 0 ? category.join("|") : "z";
      let regex = new RegExp(kategori);
      if (regex.test(item.kategori)) {
        addData(item.kategori, item);
      } else {
        category.push(item.kategori);
        addCategories(item);
        addData(item.kategori, item);
      }
    });
  })
  .catch((error) => error);

searchForm.addEventListener("submit", (e) => {
  const products = document.querySelectorAll(".card");
  const regex = new RegExp(`^${searchInput.value}|. ${searchInput.value}`);
  products.forEach((produk) => {
    if (regex.test(produk.id) && searchInput.value) {
      produk.scrollIntoView(true);
    }
  });

  e.preventDefault();
});

document.addEventListener("click", (e) => {
  // Kategori Produk Menu Logic
  if (e.target.classList.contains("menu")) {
    clearCategoryClass();
    e.target.classList.add("active");
    const target = e.target.innerHTML.toLowerCase();
    showCategories(target);
  }

  // add item qty ////////////////////////////////////
  if (e.target.classList.contains("min")) e.target.nextElementSibling.value--;
  else if (e.target.classList.contains("plus"))
    e.target.previousElementSibling.value++;

  // tambah item ke keranjang ////////////////////////
  if (e.target.classList.contains("tambah")) {
    const namaItem = e.target.parentElement.parentElement.id;
    const qtyItem = e.target.parentElement.querySelector("input").value;

    if (qtyItem < 1) alert("Jumlah item tidak boleh kurang dari 1");
    else tambahKeranjang(namaItem, qtyItem);
  }
});

function tambahKeranjang(namaItem, jumlah) {
    let isFound = false;
    let index;
    keranjang.forEach((item,i) => {
        if(item.namaItem == namaItem) {
            isFound = true;
            index = i
        }
    })

    if(isFound) {
        keranjang[index].jumlah = +keranjang[index].jumlah + +jumlah;
        sessionStorage.setItem("keranjang", JSON.stringify(keranjang))
    } else {
        const item = { namaItem, jumlah };
        keranjang.push(item);
        sessionStorage.setItem("keranjang", JSON.stringify(keranjang));
    }

}

function addCategories(item) {
  content.innerHTML += `<div class="row kategori">
                    <h2>${item.kategori}</h2><hr>
                    <div class="cards-container d-flex flex-wrap justify-content-around" id="${item.kategori}"></div>
                </div>`;
}

function addData(kategori, item) {
  const targetElement = document.querySelector(`#${kategori}`);
  targetElement.innerHTML += `<div class="card" id="${item.nama_produk.toLowerCase()}">
                            <img src="${
                              item.gambar
                            }" class="card-img-top" alt="Ikan Tongkol">
                            <div class="card-body">
                            <h5 class="card-title">${item.nama_produk}</h5>
                            <p class="card-text">Rp. ${formatRupiah(
                              item.harga
                            )} / Kg</p>
                            <div class="btn-group mb-3">
                                <a class="btn min">-</a>
                                <input type="text" pattern="\d*" value="1" maxlength="2">
                                <a class="btn plus">+</a>
                            </div>
                            <a class="btn btn-blue tambah">Tambah ke Keranjang</a>
                            </div>
                        </div>`;
}

function showCategories(kategori) {
  hideAllCategories();
  if (kategori == "semua produk") {
    category.forEach((c) => {
      const targetElement = document.querySelector(`#${c}`).parentElement;
      targetElement.classList.remove("d-none");
    });
  } else {
    const targetElement = document.querySelector(`#${kategori}`).parentElement;
    targetElement.classList.remove("d-none");
  }
}

function hideAllCategories() {
  const categories = document.getElementsByClassName("kategori");
  for (let i = 0; i < categories.length; i++)
    categories[i].classList.add("d-none");
}

function clearCategoryClass() {
  for (let i = 0; i < categoriesList.length; i++) {
    categoriesList[i].classList.remove("active");
  }
}

function formatRupiah(number) {
  let number_string = number.toString(),
    sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  return rupiah;
}
