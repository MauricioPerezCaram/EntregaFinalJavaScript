// // saludo bienvenida al usuario
// function saludar() {
//     let nombreUsuario = prompt("Ingresa tu nombre: ");
//     alert("Hola " + nombreUsuario + "! Bienvenido");
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
// } else {
//     alert("Bienvenido al programa.");
// }

// Clase constructora de mercadería
class Mercaderia {
    constructor(nombre, precio, stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

const mostrarMercaderia = (prendas) => {
    console.clear();
    console.log("Prendas disponibles");

    // para ver las prendas alfabeticamente
    prendas.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1;
        } else if (a.nombre < b.nombre) {
            return -1;
        } else {
            return 0;
        }
    });
    prendas.forEach( prenda => console.log(prenda));

}

// Array prendas
let prenda = [
    new Mercaderia("Remera", 8000, 22),
    new Mercaderia("Camisa", 15000, 27),
    new Mercaderia("Pantalón", 12000, 32),
    new Mercaderia("Campera", 22000, 36),
];

mostrarMercaderia(prenda);


// Función para crear y agregar prendas al array
const agregarPrenda = () => {
    // Pedimos los datos de la prenda
    let nombre = prompt("Ingrese la prenda a agregar");
    let precio = parseInt(prompt("Ingrese el precio de la prenda"));
    let stock = parseInt(prompt("Ingrese el stock"));

    let prendaAgregada = new Mercaderia(nombre, precio, stock);

    // Agregamos el empleado en el array empelados 
    prenda.push(prendaAgregada);

    // Llamamos la función para que nos muestre la lista de empleados actualizada por consola
    mostrarMercaderia(prenda);
};


// Función para eliminar empleados 
const eliminarPrenda = () => {

    const prendaBuscada = prendaExiste()
  
    if(!prendaBuscada) return
  
    const confirmacion = confirm(`Estas seguro que deseas eliminar el empleado ${prendaBuscada.nombre} ?`)
  
    if(confirmacion) {
      prenda = prenda.filter( prenda => prenda.nombre.toLowerCase() !== prendaBuscada.nombre.toLowerCase()); 
      mostrarMercaderia(prenda);
    } else {
      alert("Eliminación cancelada")
    }
};

const prendaExiste = () => {
    let nombrePrenda = prompt("Ingrese el nombre de la prenda a eliminar");

    let indice = prenda.findIndex(
      (prenda) => prenda.nombre.toLowerCase() === nombrePrenda.toLowerCase()
    );
  
    if (indice === -1) {
      return alert(`La prenda ${nombrePrenda} no existe`);
    }  
    return prenda[indice];
};

let encendido = true; // indicamos si la aplicación esta encendida

// Ciclo while que maneja la aplicación
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
      editarEmpleado();
      break;
    case 4:
      encendido = false;
      break;
    default:
      alert("Inserte una opción correcta");
  }
}

alert("Gracias vuelva pronto");




