// .....................................................................
// Logica.js
// Rubén Pardo Casanova
// 23/03/2022
// Clase que controla la logica de negocio
// .....................................................................
//const sqlite3 = require( "sqlite3" )
//const Modelo = require("./Modelo.js");
//const {Utilidades} = require("./Utilidades.js");
//const BDConstantes = require("./Constantes/BDConstantes");
const BDCredenciales = require('./Constantes/BDCredenciales.js');

// .....................................................................
// .....................................................................

module.exports = class Logica {
    

    // .................................................................
    // conexionBD: Conexion
    // -->
    // constructor () -->
    // .................................................................
    constructor( conexionBD ) {

        this.laConexion = conexionBD;
        

    } // ()

    // .................................................................
    // -->
    // conectarBD() --> 
    // .................................................................
    conectarBD(cb){
        if(this.laConexion!=null){
            this.laConexion.connect(function(err) {
                if (err) {
                  console.error('error connecting: ' + err.stack);
                  
                  return;
                }
                cb( err)
              
    
              });
        }else{
            cb("No esta inicializado la conexion")
        }
        
    }
    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar() {
        return new Promise( (resolver, rechazar) => {
        this.laConexion.close( (err)=>{
                ( err ? rechazar(err) : resolver() )
            })
        })
    } // ()
} // class
// .....................................................................
// .....................................................................