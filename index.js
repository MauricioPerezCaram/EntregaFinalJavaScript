// saludo bienvenida al usuario
function saludar() {
    let nombreUsuario = prompt("Tienda Ropa Flama \nIngresa tu nombre: ");
    alert("Hola " + nombreUsuario + "! Bienvenido a nuestra tienda online.\nCon esta aplicación vas a poder ver, agregar , eliminar y hasta modificar las prendas.");
  }
saludar();
  
// ingreso con usuario y contraseña
let intentos = 0;
let usuario = prompt("Ingresa tu nombre de usuario administrador (Admin)").toLowerCase();
let contrasena = prompt("Ingresa la contraseña de administrador (admin123)").toLowerCase();
function pedirUsuario(){
usuario = prompt("Ingresa un nombre de usuario administrador (Admin)").toLowerCase();
}

function pedirContrasena() {
    contrasena = prompt("Ingresa una contraseña de administrador (admin123)").toLowerCase();
}
  
while ((usuario !== "admin".toLowerCase() || contrasena !== "admin123".toLowerCase()) && intentos < 2) {
    intentos++;
    alert("El usuario o contraseña son incorrectos. Te quedan " + (3-intentos) + " intentos.");
    pedirUsuario();
    pedirContrasena();
}
  
if (intentos === 2 && (usuario !== "admin".toLowerCase() || contrasena !== "admin123".toLowerCase())) {
    alert("Intentaste muchas veces. Acceso denegado.");
    console.log("Recarga la página");
    throw new Error("Acceso denegado");
} else {
    alert("Bienvenido al programa.");
}


let form = document.querySelector("#form");
let nombre = document.querySelector("#nombre");
let precio = document.querySelector("#precio");
let stock = document.querySelector("#stock");
let agregar = document.querySelector("#btn");
let buscar = document.querySelector("#buscar");
let contenedorPrendas = document.querySelector("#contenedorPrendas")

// Clase constructora de mercadería
class Mercaderia {
    constructor(nombre, precio, stock) {
        this.id = Date.now().toString(36);
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    cambiarNombre(nombre) {
        this.nombre = nombre;
        alert("El nombre ha sido cambiado con éxito");
    }

    cambiarPrecio(precio) {
        if (isNaN(precio)) {
            return alert("El precio debe ser un valor numérico");
        }
        this.precio = precio;
        alert("El precio ha sido cambiado con éxito");
    }

    cambiarStock(stock) {
        if (isNaN(stock)) {
            return alert("El stock debe ser un valor numérico");
        }
        this.stock = stock;
        alert("El stock ha sido cambiado con éxito");
    }
}

let prendas = [];
let prendasEditar;
let modoEdicion = false;

form.onsubmit = (event) => {
    event.preventDefault();

    if (modoEdicion) {
        let index = prendas.findIndex(prenda => prenda.id === prendasEditar.id)
        prendas[index].nombre = nombre.value;
        prendas[index].precio = precio.value;
        prendas[index].stock = stock.value;

        modoEdicion = false; 
        agregar.innerHTML = "Agregar"; 
    } else {
        prendas.push(new Mercaderia(nombre.value, precio.value, stock.value));
    }

    localStorage.setItem("prendas", JSON.stringify(prendas))
    form.reset();
    mostrarPrendas(prendas);
}


const mostrarPrendas = (prendas) => {
    contenedorPrendas.innerHTML = " ";
    prendas.forEach((prendas, index) => {
        let tarjetaPrendas = document.createElement("div");
        tarjetaPrendas.classList.add("mt-2", "border", "borde-2", "p-3", "shadow", "shadow-md")
        tarjetaPrendas.innerHTML = `
        <p>Prenda: ${prendas.nombre}</p>
        <p>Precio: $ ${prendas.precio}</p>
        <p>Stock: ${prendas.stock}</p>
        `
        contenedorPrendas.appendChild(tarjetaPrendas);

        // Editar prenda
        let btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-info", "m-3");
        btnEditar.innerHTML = "Editar";
        tarjetaPrendas.appendChild(btnEditar);

        // Eliminar prenda
        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.innerHTML = "Eliminar";
        tarjetaPrendas.appendChild(btnEliminar);

        btnEliminar.onclick = () => {
            eliminarPrenda(index);
            localStorage.setItem("prendas", JSON.stringify(prendas))
        }

        btnEditar.onclick = () => editarPrenda(index);

    })    

}

const eliminarPrenda = (index) => {
    prendas.splice(index, 1);
    mostrarPrendas(prendas);
};

// funcion para editar prenda

const editarPrenda = (index) => {
    prendasEditar = prendas[index];

    nombre.value = prendasEditar.nombre;
    precio.value = prendasEditar.precio;
    stock.value = prendasEditar.stock;

    modoEdicion = true;
    agregar.innerHTML = "Editar"; // Cambiar el texto del botón a "Editar"
}


// boton busqueda y filtrado
buscar.oninput = (event) => {
    console.log(event.target.value);
    if(event.target.value === " ") {
        mostrarPrendas(prendas);
    }else {
        let prendasFiltradas = prendas.filter (prenda => prenda.nombre.toLowerCase().includes(event.target.value))
        mostrarPrendas(prendasFiltradas);
    }
}
