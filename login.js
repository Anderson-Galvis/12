document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('form'); // Usar el ID correcto del formulario
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Evitar envío por defecto
            let warnings = "";
            let validacion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
            let entrar = false;
            let parrafo = document.getElementById('warnings'); // Para mostrar los mensajes
            let usuario = document.getElementById('name');
            let email = document.getElementById('email');
            let pass = document.getElementById('password');
            let confirmPass = document.getElementById('confirmPassword');

            parrafo.innerHTML = ""; // Limpiar mensajes previos

            // Validaciones
            if (usuario.value.length < 6) {
                warnings += `El nombre debe tener al menos 6 caracteres. <br>`;
                entrar = true;
            }
            if (!validacion.test(email.value)) {
                warnings += `El correo electrónico no es válido. <br>`;
                entrar = true;
            }
            if (pass.value.length < 2) {
                warnings += `La contraseña debe tener al menos 8 caracteres. <br>`;
                entrar = true;
            }
            if (pass.value !== confirmPass.value) {
                warnings += `Las contraseñas no coinciden. <br>`;
                entrar = true;
            }

            if (entrar) {
                parrafo.innerHTML = warnings;
                return;
            }

            // Crear datos del usuario
            let userData = {
                nameUser: usuario.value,
                emailUser: email.value,
                password: pass.value
            };

            // Enviar los datos al servidor
            try {
                const response = await fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    window.location.href = '/pages/reservas.html';
                } else {
                    console.error("Error al crear el usuario:", response.statusText);
                    parrafo.innerHTML = "Hubo un problema al crear el usuario.";
                }
            } catch (error) {
                console.error("Error de red:", error);
                parrafo.innerHTML = "No se pudo conectar con el servidor.";
            }
        });
    }
});



//evento para el inicio de sesion 




const loginForm = document.getElementById("loginForm");
const warning = document.getElementById("warning");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Solicitar datos del servidor
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) throw new Error("Error al conectarse al servidor");

        const users = await response.json();

        // Verificar si el usuario existe
        const user = users.find(u => u.emailUser === email && u.password === password);

        if (user) {
            alert("Inicio de sesión exitoso");
            // Redirigir al usuario a otra página
            window.location.href = "/pages/reservas.html";
        } else {
            warning.textContent = "Correo o contraseña incorrectos.";
            warning.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error:", error);
        warning.textContent = "No se pudo conectar con el servidor.";
        warning.classList.remove("hidden");
    }
});