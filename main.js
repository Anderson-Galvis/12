const navBtn = document.getElementById('nav-btn');
const cancelBtn = document.getElementById('cancel-btn');
const sideNav = document.getElementById('sidenav');
const modal = document.getElementById('modal');
const registro = document.getElementById('regis'); // Agregado

navBtn.addEventListener("click", function(){
    sideNav.classList.add('show');
    modal.classList.add('showModal');
});

cancelBtn.addEventListener('click', function(){
    sideNav.classList.remove('show');
    modal.classList.remove('showModal');
});

window.addEventListener('click', function(event){
    if(event.target === modal){
        sideNav.classList.remove('show');
        modal.classList.remove('showModal');
    }
});

// Evento para redirigir a otra página al hacer clic en 'sign-in'
registro.addEventListener('click', function() {

window.location.href = 'formRegistro.html'; // Reemplaza con la URL deseada
});


//carrusel de fotos de el inicio 

//traemos los elementos que utilizaremos 
const carrusel = document.getElementById('carrusel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const totalImages = 7; // Número total de imágenes
let index = 0;

// Función para actualizar la posición del carrusel
function updateCarrusel() {
    const offset = -index * 100; // Mover al siguiente bloque de imágenes
    carrusel.style.transform = `translateX(${offset}%)`;
}

// Botón "Anterior"
prevBtn.addEventListener('click', () => {
    index = (index > 0) ? index - 1 : totalImages - 1;
    updateCarrusel();
});

// Botón "Siguiente"
nextBtn.addEventListener('click', () => {
    index = (index < totalImages - 1) ? index + 1 : 0;
    updateCarrusel();
});

// Función asincrónica para reproducir automáticamente el carrusel
async function autoPlay() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Espera 3 segundos
        index = (index < totalImages - 1) ? index + 1 : 0;
        updateCarrusel();
    }
}

// Iniciar reproducción automática
autoPlay();






//colocar el login 

//seleccion de elementos en el DOM
let userData = {};
const usuario = document.getElementById('name');
const email = document.getElementById('email');
const pass = document.getElementById('password');
const form = document.getElementById('form');
const parrafo = document.getElementById('warnings')


form.addEventListener("submit", async (e) =>{
    e.preventDefault()
    let warnings = ""
    let validacion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4 })+$/ 
    let entrar = false 
    parrafo.innerHTML =""
    if(usuario.value.length <6){
        warnings += `El nombre no es valido <br>`
        entrar =true
    }
    if(validacion.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }

    if(pass.value.length < 8){
        warnings += `La Contraseña no es valido <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings;
        return; 
    }

        //crear datos del usuario
    const userData = {
            nameUser: usuario.value,
            emailUser: email.value,
            password: pass.value
        };
        // enviar los datos al servidor 
        try {
            const response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData) // Convierte el objeto en JSON
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Usuario creado:", data);
                parrafo.innerHTML = "Usuario creado exitosamente";
                
                

            } else {
                console.error("Error al crear el usuario:", response.statusText);
                parrafo.innerHTML = "Hubo un problema al crear el usuario.";
            }
        } catch (error) {
            console.error("Error de red:", error);
            parrafo.innerHTML = "No se pudo conectar con el servidor.";
        }
    });
