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

// Clase constructora de mercadería
class Mercaderia {
    constructor(nombre, precio, stock) {
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

const mostrarMercaderia = (prendas) => {
    console.clear();
    console.log("Prendas disponibles");
    prendas.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenamos alfabéticamente
    prendas.forEach(prenda => console.log(prenda));
}

let prendas = [
    new Mercaderia("Remera", 8000, 22),
    new Mercaderia("Camisa", 15000, 27),
    new Mercaderia("Pantalón", 12000, 32),
    new Mercaderia("Campera", 22000, 36),
];

mostrarMercaderia(prendas);

const agregarPrenda = () => {
    let nombre = prompt("Ingrese la prenda a agregar");
    let precio = parseInt(prompt("Ingrese el precio de la prenda"));
    let stock = parseInt(prompt("Ingrese el stock"));

    let prendaAgregada = new Mercaderia(nombre, precio, stock);

    prendas.push(prendaAgregada);

    mostrarMercaderia(prendas);
};

const eliminarPrenda = () => {
    const prendaBuscada = prendaExiste("Ingrese el nombre de la prenda a eliminar");

    if (!prendaBuscada) return;

    const confirmacion = confirm(`¿Estás seguro que deseas eliminar la prenda ${prendaBuscada.nombre}?`);

    if (confirmacion) {
        prendas = prendas.filter(prenda => prenda.nombre.toLowerCase() !== prendaBuscada.nombre.toLowerCase());
        mostrarMercaderia(prendas);
    } else {
        alert("Eliminación cancelada");
    }
};

const editarPrenda = () => {
    const prendaBuscada = prendaExiste("Ingrese el nombre de la prenda a editar");

    if (!prendaBuscada) return;

    alert("Menú editar prenda:\n1 - Editar nombre\n2 - Editar precio\n3 - Editar stock");

    let opcion = parseInt(prompt("Ingrese una opción para editar"));

    switch (opcion) {
        case 1:
            let nombre = prompt("Ingrese el nuevo nombre de la prenda");
            prendaBuscada.cambiarNombre(nombre);
            break;
        case 2:
            let precio = parseInt(prompt("Ingrese el nuevo precio de la prenda"));
            prendaBuscada.cambiarPrecio(precio);
            break;
        case 3:
            let stock = parseInt(prompt("Ingrese el nuevo stock de la prenda"));
            prendaBuscada.cambiarStock(stock);
            break;
        default:
            alert("Ingrese una opción correcta");
    }

    mostrarMercaderia(prendas);
}

const prendaExiste = (mensaje) => {
    let nombrePrenda = prompt(mensaje);

    let indice = prendas.findIndex(
        (prenda) => prenda.nombre.toLowerCase() === nombrePrenda.toLowerCase()
    );

    if (indice === -1) {
        alert(`La prenda ${nombrePrenda} no existe`);
        return null;
    }

    return prendas[indice];
};

let encendido = true;

while (encendido) {
    alert("Menú principal:\n1 - Agregar una prenda\n2 - Eliminar una prenda\n3 - Modificar prenda\n4 - Apagar");
    let opcion = parseInt(prompt("Ingrese una opción"));

    switch (opcion) {
        case 1:
            agregarPrenda();
            break;
        case 2:
            eliminarPrenda();
            break;
        case 3:
            editarPrenda();
            break;
        case 4:
            encendido = false;
            break;
        default:
            alert("Inserte una opción correcta");
    }
}

alert("Gracias vuelva pronto");




