// .......................................................
// ReglasREST.js
// Clase donde estan definidos todos los endpoints de REST
// Rubén Pardo Casanova 23/03/2022
// 
// Modificado por Pablo Enguix Llopis 04/11/2021
// Añadimos metodos POST/registro/bateria y POST /registro/averia
//.........................................................

const {json} = require('express')
//const Modelo = require('../logica/Modelo.js')
const nodemailer = require('nodemailer');
//require("dotenv").config();
const { request } = require('chai');
const path = require("path")

module.exports.cargar = function(servidorExpress, laLogica){
    
    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba', async function( peticion, respuesta ){
        console.log( " * GET /prueba " )
        respuesta.send("¡Funciona!")
        
    }) // 


    // .......................................................
    // POST /mapa
    // .......................................................
    servidorExpress.post('/mapa', async function( peticion, respuesta ){
        console.log( " * POST /mapa" )
       
        try{
           console.log(peticion.body);
            var json = JSON.parse(peticion.body);
            let idMapa = json['idMapa']
            let imagen = json['imagen']
            let resolucion = json['resolucion']
            if(idMapa==null || imagen==null || resolucion==null){
                // no estan todo los parametros obligatorios
                respuesta.status(400).send( JSON.stringify( {mensaje:"Falta algun parametro"} ) )
                return
            }else{
               
                // todo ok 
                await laLogica.guardarMapa(idMapa,imagen,resolucion)
                respuesta.status(200).send()
                return 
               
            }

        }catch(error){
            if(error.errno == 1452){ // 1452 es el codigo de error en una clave ajena
                respuesta.status(500).send( JSON.stringify( {mensaje:"No existe un mapa con ese id"} ) )
            }else{
               
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
        }
        
    }) // 

    // .......................................................
    // GET /zona/llegada?idMapa
    // .......................................................
    servidorExpress.get('/zona/llegada', async function( peticion, respuesta ){
        console.log( " * GET /zona/llegada?idMapa" )
       
        try{

            let idMapa = peticion.query.idMapa
            if(idMapa==null){
                // no estan todo los parametros obligatorios
                respuesta.status(400).send( JSON.stringify( {mensaje:"Falta algun parametro"} ) )
                return
            }else{
               
                // llamada a BD
                var resultado = await laLogica.getPosicionZonaLLegadaProductosByIdMapa(idMapa)

                // no hay elementos
                if(resultado.length == 0){
                    respuesta.status(500).send( JSON.stringify( {mensaje:"Ese mapa no tiene una zona de llegada asignada"} ) )
                }
                // todo ok
                respuesta.status(200).send(resultado)
                return 
               
            }

        }catch(error){
            respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            
        }
        
    }) // 


    // .......................................................
    // GET /mapa?idMapa
    // .......................................................
    servidorExpress.get('/mapa', async function( peticion, respuesta ){
        console.log( " * GET /mapa?idMapa" )
       
        try{

            let idMapa = peticion.query.idMapa
            if(idMapa==null){
                // no estan todo los parametros obligatorios
                respuesta.status(400).send( JSON.stringify( {mensaje:"Falta algun parametro"} ) )
                return
            }else{
               
                // llamada a BD
                var resultado = await laLogica.obtenerMapa(idMapa)

                // no hay elementos
                if(resultado.length == 0){
                    respuesta.status(500).send( JSON.stringify( {mensaje:"No existe un mapa con esa id"} ) )
                }

                // todo ok
                respuesta.status(200).send(resultado)
                return 
               
            }

        }catch(error){
            respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            
        }
        
    }) // 

    // .......................................................
    // POST /zonas
    // .......................................................
    servidorExpress.post('/zonas', async function( peticion, respuesta ){
        console.log( " * POST /zonas" )
       
        try{
            var zonas = JSON.parse(peticion.body);
            for (let i = 0; i < zonas.length; i++) {
                let zona = zonas[i]
                let nombre = zona.nombre
                let mapa = zona.mapa
                let xSup = zona.xSuperior
                let ySup = zona.ySuperior
                let xInf = zona.xInferior
                let yInf = zona.yInferior
                console.log(zona);
                if(nombre==null || mapa==null || xSup==null || ySup==null || xInf==null ||yInf==null){
                    // no estan todo los parametros obligatorios
                    respuesta.status(400).send( JSON.stringify( {mensaje:"Falta algun parametro"} ) )
                    return
                }
            }             
                // todo ok 
                await laLogica.guardarZonas(zonas)
                console.log("exito")
                respuesta.status(200).send()
                return 

        }catch(error){
            console.log(error)
            if(error.errno == 1452){ // 1452 es el codigo de error en una clave ajena
                respuesta.status(500).send( JSON.stringify( {mensaje:"No existe una zona con ese id"} ) )
            }else{
               
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
        }
        
    }) // 


      // .......................................................
    // PUT /producto?idproducto?idzona
    // .......................................................
    servidorExpress.put('/producto', async function(peticion, respuesta) {

        console.log("PUT */producto?idproducto?nombre?idzona?cantidad?precio");
        // creo el registro

        try {
            var json = JSON.parse(peticion.body);

            let producto = json['idProducto']
            let nombre = json['nombre']
            let zona = json['idZona']
            let cantidad = json['cantidad']
            let precio = json['precio']
            if(producto==null){
                // no estan todo los parametros obligatorios
                respuesta.status(400).send( JSON.stringify( {mensaje:"Falta algun parametro"} ) )
                return
            }else{
                // todo ok 
                await laLogica.actualizarStockById(producto,nombre,zona,cantidad,precio);
                // todo ok
                respuesta.status(200).send( JSON.stringify( {mensaje:"El stock se ha actualizado correctamente"} ) )
                return 
               
            }

        } catch (error) {
            if(error.errno == 1452){ // 1452 es el codigo de error en una clave ajena
                respuesta.status(500).send( JSON.stringify( {mensaje:"No existe un producto o zona con ese id"} ) )
            }else{
               
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
            
        }
    })

     // .......................................................
    // GET /productos?idmapa
    // .......................................................
    servidorExpress.get('/productos', async function(peticion, respuesta) {

        console.log("GET */productos?idMapa");

        try{

            let idMapa = peticion.query.idMapa
            if(idMapa==null){
                // no estan todo los parametros obligatorios
                respuesta.status(400).send( JSON.stringify( {mensaje:"Falta algun parametro"} ) )
                return
            }else{
               
                // llamada a BD
                var resultado = await laLogica.obtenerTodosProductos(idMapa)

                // no hay elementos
                if(resultado.length == 0){
                    respuesta.status(500).send( JSON.stringify( {mensaje:"No existe un mapa con esa id"} ) )
                }

                // todo ok
                respuesta.status(200).send(resultado)
                return 
               
            }

        }catch(error){
            respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido: "+error} ) )
            
        }

    })

}