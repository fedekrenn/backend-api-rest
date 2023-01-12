const $form = document.querySelector('#register-form');

const pass1 = document.querySelector('#password');
const pass2 = document.querySelector('#password2');

$form.addEventListener('submit', (e) => {
    if (pass1.value !== pass2.value) {
        e.preventDefault();
        SweetAlert.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseñas no coinciden!',
        })
    }
});
