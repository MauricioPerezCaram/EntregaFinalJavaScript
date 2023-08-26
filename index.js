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
            timer: 1500
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
        text: `Comunicate con el centro de atención para recibir ayuda`,
        icon: "question",
        confirmButtonText: "Recibir ayuda",
    })
}
setTimeout(mensajeAyuda, 15000)
