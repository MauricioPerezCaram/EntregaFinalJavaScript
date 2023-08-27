let form = document.querySelector("#form");
let nombre = document.querySelector("#nombre");
let precio = document.querySelector("#precio");
let stock = document.querySelector("#stock");
let agregar = document.querySelector("#btn");
let buscar = document.querySelector("#buscar");
let contenedorPrendas = document.querySelector("#contenedorPrendas")

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

// Cargar datos desde el almacenamiento local cuando la página se carga
window.addEventListener("DOMContentLoaded", () => {
    const storedData = localStorage.getItem("prendas");
    if (storedData) {
        prendas = JSON.parse(storedData);
        mostrarPrendas(prendas);
    }
});

form.onsubmit = (event) => {
    event.preventDefault();

    if (modoEdicion) {
        let index = prendas.findIndex(prenda => prenda.id === prendasEditar.id)
        prendas[index].nombre = nombre.value;
        prendas[index].precio = precio.value;
        prendas[index].stock = stock.value;

        modoEdicion = false; 
        agregar.innerHTML = "Agregar"; 
        Swal.fire({
            title: `Prenda editada`,
            text: `Has editado la prenda ${prendasEditar.nombre}`,
            icon: "info",
            confirmButtonText: "Aceptar",
            timer: 3000
        });

    } else {
        prendas.push(new Mercaderia(nombre.value, precio.value, stock.value));
        Swal.fire({
            title: `Prenda agregada`,
            text: `Has agregado la prenda ${nombre.value}`,
            icon: "success",
            confirmButtonText: "Aceptar",
            timer: 3000
        });
    }

    localStorage.setItem("prendas", JSON.stringify(prendas));
    form.reset();
    mostrarPrendas(prendas);
}

const mostrarPrendas = (prendas) => {
    contenedorPrendas.innerHTML = " ";
    prendas.forEach((prenda, index) => {
        let tarjetaPrendas = document.createElement("div");
        tarjetaPrendas.classList.add("mt-2", "border", "borde-2", "p-3", "shadow", "shadow-md")
        tarjetaPrendas.innerHTML = `
        <p>Prenda: ${prenda.nombre}</p>
        <p>Precio: $ ${prenda.precio}</p>
        <p>Stock: ${prenda.stock}</p>
        `
        contenedorPrendas.appendChild(tarjetaPrendas);

        let btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-info", "m-3");
        btnEditar.innerHTML = "Editar";
        tarjetaPrendas.appendChild(btnEditar);


        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.innerHTML = "Eliminar";
        tarjetaPrendas.appendChild(btnEliminar);

        btnEliminar.onclick = () => {
            eliminarPrenda(index);
            Swal.fire({
                title: `Has eliminado una prenda`,
                text: `Has eliminado la prenda ${prenda.nombre}`,
                icon: "warning",
                confirmButtonText: "Aceptar",
                timer: 3000
            })
        }
        btnEditar.onclick = () => editarPrenda(index);
    })    

}

const eliminarPrenda = (index) => {
    prendas.splice(index, 1);
    localStorage.setItem("prendas", JSON.stringify(prendas));
    mostrarPrendas(prendas);
};

const editarPrenda = (index) => {
    prendasEditar = prendas[index];

    nombre.value = prendasEditar.nombre;
    precio.value = prendasEditar.precio;
    stock.value = prendasEditar.stock;

    modoEdicion = true;
    agregar.innerHTML = "Editar";

}

buscar.oninput = (event) => {
    if (event.target.value.trim() === "") {
        mostrarPrendas(prendas);
    } else {
        let prendasFiltradas = prendas.filter(prenda => prenda.nombre.toLowerCase().includes(event.target.value.toLowerCase()));
        mostrarPrendas(prendasFiltradas);
    }
}


// función mensaje ayuda
function mensajeAyuda () {
    Swal.fire({
        title: `Necesitas ayuda?`,
        text: `Podes enviarnos un mail a perezcarammauricio@gmail.com y contarnos cuál es el problema`,
        icon: "question",
        confirmButtonText: "Aceptar",
        timer: 5000
    })
}
setTimeout(mensajeAyuda, 100000) // proceso asincrónico (despues de leer todo el sincronico va a leer este asincronico)

// Realiza una solicitud fetch para obtener los datos del archivo JSON
fetch("./db/prendas.json")
    .then((resp) => resp.json())
    .then((data) => {
        // Almacena los datos en el almacenamiento local
        localStorage.setItem("prendasJSON", JSON.stringify(data));

        // Llama a la función para mostrar las prendas
        mostrarPrendasJson(data);
    })
    .catch((error) => {
        console.error("Error al cargar los datos:", error);
    });

// // Función para mostrar las prendas obtenidas del JSON
// const mostrarPrendasJson = (prendasJson) => {
//     prendasJson.forEach((prenda) => {
//         const { nombre, precio, stock } = prenda;
//         let div = document.createElement("div");
//         div.innerHTML = `
//             <p>Nombre: ${nombre}</p>
//             <p>Precio: ${precio}</p>
//             <p>Stock: ${stock}</p>
//         `;
//         contenedorPrendas.appendChild(div);  // Usar contenedorPrendas en lugar de prendas
//     });
// };

