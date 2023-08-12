// // saludo bienvenida al usuario
// function saludar() {
//     let nombreUsuario = prompt("Tienda Ropa Flama \nIngresa tu nombre: ");
//     alert("Hola " + nombreUsuario + "! Bienvenido a nuestra tienda online.\nCon esta aplicación vas a poder ver, agregar , eliminar y hasta modificar las prendas.");
//   }
// saludar();
  
// // ingreso con usuario y contraseña
// let intentos = 0;
// let usuario = prompt("Ingresa tu nombre de usuario administrador (Admin)").toLowerCase();
// let contrasena = prompt("Ingresa la contraseña de administrador (admin123)").toLowerCase();
// function pedirUsuario(){
// usuario = prompt("Ingresa un nombre de usuario administrador (Admin)").toLowerCase();
// }

// function pedirContrasena() {
//     contrasena = prompt("Ingresa una contraseña de administrador (admin123)").toLowerCase();
// }
  
// while ((usuario !== "admin".toLowerCase() || contrasena !== "admin123".toLowerCase()) && intentos < 2) {
//     intentos++;
//     alert("El usuario o contraseña son incorrectos. Te quedan " + (3-intentos) + " intentos.");
//     pedirUsuario();
//     pedirContrasena();
// }
  
// if (intentos === 2 && (usuario !== "admin".toLowerCase() || contrasena !== "admin123".toLowerCase())) {
//     alert("Intentaste muchas veces. Acceso denegado.");
//     console.log("Recarga la página");
//     throw new Error("Acceso denegado");
// } else {
//     alert("Bienvenido al programa.");
// }






// const mostrarMercaderia = (prendas) => {
//     console.clear();
//     console.log("Prendas disponibles");
//     prendas.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenamos alfabéticamente
//     prendas.forEach(prenda => console.log(prenda));
// }

// mostrarMercaderia(prendas);

// const agregarPrenda = () => {
//     let nombre = prompt("Ingrese la prenda a agregar");
//     let precio = parseInt(prompt("Ingrese el precio de la prenda"));
//     let stock = parseInt(prompt("Ingrese el stock"));

//     let prendaAgregada = new Mercaderia(nombre, precio, stock);

//     prendas.push(prendaAgregada);

//     mostrarMercaderia(prendas);
// };



//     const prendaBuscada = prendaExiste("Ingrese el nombre de la prenda a editar");

//     if (!prendaBuscada) return;

//     alert("Menú editar prenda:\n1 - Editar nombre\n2 - Editar precio\n3 - Editar stock");

//     let opcion = parseInt(prompt("Ingrese una opción para editar"));

//     switch (opcion) {
//         case 1:
//             let nombre = prompt("Ingrese el nuevo nombre de la prenda");
//             prendaBuscada.cambiarNombre(nombre);
//             break;
//         case 2:
//             let precio = parseInt(prompt("Ingrese el nuevo precio de la prenda"));
//             prendaBuscada.cambiarPrecio(precio);
//             break;
//         case 3:
//             let stock = parseInt(prompt("Ingrese el nuevo stock de la prenda"));
//             prendaBuscada.cambiarStock(stock);
//             break;
//         default:
//             alert("Ingrese una opción correcta");
//     }

//     mostrarMercaderia(prendas);
// }

// const prendaExiste = (mensaje) => {
//     let nombrePrenda = prompt(mensaje);

//     let indice = prendas.findIndex(
//         (prenda) => prenda.nombre.toLowerCase() === nombrePrenda.toLowerCase()
//     );

//     if (indice === -1) {
//         alert(`La prenda ${nombrePrenda} no existe`);
//         return null;
//     }

//     return prendas[indice];
// };

// let encendido = true;

// while (encendido) {
//     alert("Menú principal:\n1 - Agregar una prenda\n2 - Eliminar una prenda\n3 - Modificar prenda\n4 - Apagar");
//     let opcion = parseInt(prompt("Ingrese una opción"));

//     switch (opcion) {
//         case 1:
//             agregarPrenda();
//             break;
//         case 2:
//             eliminarPrenda();
//             break;
//         case 3:
//             editarPrenda();
//             break;
//         case 4:
//             encendido = false;
//             break;
//         default:
//             alert("Inserte una opción correcta");
//     }
// }

// alert("Gracias vuelva pronto");


let form = document.querySelector("#form");
let nombre = document.querySelector("#nombre");
let precio = document.querySelector("#precio");
let stock = document.querySelector("#stock");
let agregar = document.querySelector("#btn");
let buscar = document.querySelector("#buscar");
let contenedorPrendas = document.querySelector("#contenedorPrendas")

// // Clase constructora de mercadería
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


        // Local Storage


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





// localStorage.setItem("prendas", prendas);
// localStorage.setItem("prendasStringify", JSON.stringify(prendas));

// let prendasStringify = localStorage.getItem("prendasStringify");
// console.log(prendasStringify);
// console.log(typeof prendasStringify);

// let prendasParseadas = JSON.parse(localStorage.getItem("prendasStringify"))


