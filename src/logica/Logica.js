// .....................................................................
// Logica.js
// Rubén Pardo Casanova
// 23/03/2022
// Clase que controla la logica de negocio
// .....................................................................
//const Modelo = require("./Modelo.js");
//const {Utilidades} = require("./Utilidades.js");
const BDConstantes = require("./Constantes/BDConstantes");
const BDCredenciales = require('./Constantes/BDCredenciales.js');
const  mysql = require('mysql');

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


    // .................................................................
    // 
    // imagenBase64:Texto, idMapa:N -->
    // guardarMapa() --> 
    // .................................................................
    /**
     * actualiza en la tabla mapa su imagen escaneada 
     * 
     * @param imagenBase64 texto plano de la imagen
     * @param idMapa id al mapa que hace referencia
     * 
     */
     guardarMapa( imagenBase64, idMapa) {
        var textoSQL ='update '+BDConstantes.TABLA_MAPA.NOMBRE_TABLA +' set ' + BDConstantes.TABLA_MAPA.IMAGEN + '=? where '+BDConstantes.TABLA_MAPA.ID+'=?';
        let inserts = [imagenBase64,idMapa]
        let sql = mysql.format(textoSQL, inserts);
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                sql,
                function( err,res,fields ) {
                    
                    if(!err){
                        // return 
                        resolver(res)
    
                    }else{
                        rechazar(err)
                    }
                    
                }
               )//query
            })// promise

    } // ()guardarMapa


} // class
// .....................................................................
// .....................................................................