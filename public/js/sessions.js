const spanName = document.getElementById("span-name");
const smallEmail = document.getElementById("small-email");
const logoAvatar = document.getElementById("logo-avatar");

async function checkSession() {
    const data = await fetch("/is-auth");

    if (data.redirected === true) return (window.location.href = "/");
}

let checkOutEmail = "";

async function getData() {
    try {
        const res = await fetch("/get-data");
        const data = await res.json();

        sessionStorage.setItem("personalData", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

async function logout() {
    sessionStorage.removeItem("personalData");

    Swal.fire({
        icon: "success",
        title: `Te desloguaste correctamente ${checkOutEmail}`,
        showConfirmButton: false,
        timer: 2000,
    });

    setInterval(() => {
        window.location.href = "/logout";
    }, 2000);
}

(async function start() {
    checkSession();

    await getData();
    const data = JSON.parse(sessionStorage.getItem("personalData"));

    const { personName, email, avatar } = data;

    spanName.innerText = personName;
    smallEmail.innerText = email;
    logoAvatar.src = avatar;

    checkOutEmail = email;
})();
