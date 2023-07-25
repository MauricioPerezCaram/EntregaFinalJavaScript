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

class Mercaderia {
    constructor(nombre, precio, stock)
}