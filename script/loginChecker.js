// Menampilkan nama user di navbar
// sessionStorage.setItem('isLogin', 'bambang');
const user = !!sessionStorage.getItem('isLogin') ? sessionStorage.getItem('isLogin').toLowerCase() : false;

const buttonMasukElement = document.querySelector(".button-masuk");
const userElement = document.querySelector('.user-element');
const userSpan = document.querySelector('.user')

if (user) {
    userSpan.textContent = `Hello, ${user[0].toUpperCase() + user.substring(1)}`;
    buttonMasukElement.classList.add('d-none');
    userElement.classList.remove('d-none');
} else {
    buttonMasukElement.classList.remove('d-none');
    userElement.classList.add('d-none');
}

// Logout system
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    sessionStorage.clear();
    location.reload();
})