const spanName = document.getElementById('span-name');

async function checkSession() {

    const data = await fetch('/is-auth');

    if (data.status) return window.location.href = '/';

    // if (data.status) return window.location.href = '/';
}

let nombre = '';

async function getName() {
    const data = await fetch('/get-name');
    const name = await data.json();

    return name.nameAccess;
}


async function logout() {

    Swal.fire({
        icon: 'success',
        title: `Te desloguaste correctamente ${nombre}`,
        showConfirmButton: false,
        timer: 2000
    });

    setInterval(() => {
        window.location.href = '/logout';
    }, 2000);
}


(async function start() {
    checkSession()
    // No tiene que mostrar nada de la página antes de checkear

    spanName.innerHTML = await getName() || '';
    nombre = await getName();
})();