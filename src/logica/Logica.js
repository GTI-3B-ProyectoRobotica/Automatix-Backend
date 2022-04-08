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
    // imagenBase64:Texto, idMapa:N, resolucion:R -->
    // guardarMapa() --> 
    // .................................................................
    /**
     * actualiza en la tabla mapa su imagen escaneada 
     * 
     * @param imagenBase64 texto plano de la imagen
     * @param idMapa id al mapa que hace referencia
     * @param resolucion la resolucion de la imagen my_map
     * 
     */
     guardarMapa( idMapa, imagenBase64, resolucion) {
        var textoSQL ='update '+BDConstantes.TABLA_MAPA.NOMBRE_TABLA +' set ' + BDConstantes.TABLA_MAPA.IMAGEN  + '=?,'+ BDConstantes.TABLA_MAPA.RESOLUCION + '=? where '+BDConstantes.TABLA_MAPA.ID+'=?';
        let inserts = [imagenBase64,resolucion,idMapa]
        let sql = mysql.format(textoSQL, inserts);
        console.log(sql)
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                sql,
                function( err,res,fields ) {
                    if(!err){
                        // return 
                        if(res.affectedRows == 0){
                            rechazar({errno:1452})
                        }else{
                            resolver(res)
                        }
                        
    
                    }else{
                        
                        rechazar(err)
                    }
                    
                }
               )//query
            })// promise

    } // ()guardarMapa


    // .................................................................
    // 
    // idMapa:N -->
    // getPosicionZonaLLegadaProductosByIdMapa() --> {xI,xS,yI,yS}
    // .................................................................
    /**
     * toma la posicion de la zona de llegada de paquetes gracias a la ID
     * 
     * @param idMapa id al mapa que hace referencia
     * 
     */
     getPosicionZonaLLegadaProductosByIdMapa( idMapa) {
        var textoSQL ='select * from '+BDConstantes.TABLA_ZONAS.NOMBRE_TABLA +' where ' + BDConstantes.TABLA_ZONAS.MAPA + '=?';
        let inserts = [idMapa]
        let sql = mysql.format(textoSQL, inserts);
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                sql,
                function( err,res,fields ) {
                    if(!err){
                        // return 
                        if(res.affectedRows == 0){
                            rechazar({errno:1452})
                        }else{
                            resolver(res)
                        }
                        
    
                    }else{
                        
                        rechazar(err)
                    }
                    
                }
               )//query
            })// promise

    } // ()getPosicionZonaLLegadaProductosByIdMapa



    // .................................................................
    // 
    // idMapa:N -->
    // obtenerMapa() --> Mapa
    // .................................................................
    /**
     * Obtener la informacion de un mapa 
     * 
     * @param idMapa id al mapa que hace referencia
     * @returns La informacion del mapa {id:N,imagen:Texto,resolucion:N}
     */
     obtenerMapa( idMapa) {
        var textoSQL ='select  id,resolucion,CONVERT(imagen USING utf8) as imagen from '+BDConstantes.TABLA_MAPA.NOMBRE_TABLA +' where ' + BDConstantes.TABLA_MAPA.ID + '=?';
        let inserts = [idMapa]
        let sql = mysql.format(textoSQL, inserts);
        return new Promise( (resolver, rechazar) => {
            this.laConexion.query( 
                sql,
                function( err,res,fields ) {
                    if(!err){
                        // return 
                        if(res.affectedRows == 0){
                            rechazar({errno:1452})
                        }else{
                            resolver(res)
                        }
                        
    
                    }else{
                        
                        rechazar(err)
                    }
                    
                }
               )//query
            })// promise

    } // ()obtenerMapa

} // class
// .....................................................................
// .....................................................................