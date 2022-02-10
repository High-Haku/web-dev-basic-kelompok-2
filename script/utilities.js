export function formatRupiah(number) {
    let number_string = number.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    return rupiah;
}

export function getData() {
    return new Promise((resolve, reject) => {
        fetch("https://61fb8aed87801d0017a2c56a.mockapi.io/produk")
            .then((response) => response.json())
            .then((result) => {
                resolve(result);
            })
            .catch((error) => reject(error))
    })
}

export function findDataUser(target) {
    const users = JSON.parse(localStorage.getItem('data-user'));
    let result;
    users.forEach(user => {
        if (user.nama.toLowerCase() == target.toLowerCase()) result = user;
    })
    return result;
}

export function getAllDataUser() {
    return JSON.parse(localStorage.getItem('data-user'));
}