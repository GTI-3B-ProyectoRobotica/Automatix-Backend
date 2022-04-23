/**
 * Fichero que contiene clases con los nombres de las tablas de la BD y sus atributos
 * 24/03/2022
 * @author Rubén Pardo Casanova
 */


// Tabla Mapa
class TABLA_MAPA{

   
    static NOMBRE_TABLA = "mapa";
    static ID = "id";
    static IMAGEN = "imagen";
    static RESOLUCION = "resolucion"

}

// Tabla ZONAS
class TABLA_ZONAS{

   
    static NOMBRE_TABLA = "zona";
    static NOMBRE = "nombre";
    static MAPA = "mapa";
    static X_SUPERIOR = "xSuperior";
    static Y_SUPERIOR = "ySuperior";
    static X_INFERIOR = "xInferior";
    static Y_INFERIOR = "yInferior";

}

// Tabla Mapa
class TABLA_ROBOT{

   
    static NOMBRE_TABLA = "robot";
    static ID = "id";
    static MAPA = "mapa";

}


// Tabla Usuario
class TABLA_USUARIO{

   
    static NOMBRE_TABLA = "usuario";
    static ID = "id";
    static CORREO = "correo";
    static PASSWORD = "password";
    static MAPA = "mapa";

}

// Tabla producto
class TABLA_PRODUCTO{

   
    static NOMBRE_TABLA = "producto";
    static ID = "id";
    static NOMBRE = "nombre";
    static CANTIDAD = "cantidad";
    static PRECIO = "precio ud";
    static ZONA = "zona";

}

module.exports = {
    TABLA_MAPA : TABLA_MAPA,
    TABLA_ZONAS:TABLA_ZONAS,
    TABLA_ROBOT: TABLA_ROBOT,
    TABLA_USUARIO: TABLA_USUARIO,
    TABLA_PRODUCTO: TABLA_PRODUCTO
}