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


// Función para crear y agregar empleados al array
const agregarPrenda = () => {
    // Pedimos los datos del empleado
  let nombre = prompt("Ingrese la prenda a agregar");
  let precio = parseInt(prompt("Ingrese el precio de la prenda"));
  let stock = parseInt(prompt("Ingrese el stock"));

    // Instanciamos la clase Empleado y almacenamos en la variable empleado con los datos ingresados por el usuario 
  let prendaAgregada = new Mercaderia(nombre, precio, stock);

  // Agregamos el empleado en el array empelados 
  prenda.push(prendaAgregada);

  // Llamamos la función para que nos muestre la lista de empleados actualizada por consola
  mostrarMercaderia(prenda);
};

agregarPrenda();