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
                respuesta.status(200).send(resultado[0])
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
                respuesta.status(200).send(resultado[0])
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
           console.log(peticion.body);
            var json = JSON.parse(peticion.body);
            let nombre = json['nombre']
            let mapa = json['mapa']
            let xSup = json['xSuperior']
            let ySup = json['ySuperior']
            let xInf = json['xInferior']
            let yInf = json['yInferior']
            if(nombre==null || mapa==null || xSup==null || ySup==null || xInf==null ||yInf==null){
                // no estan todo los parametros obligatorios
                respuesta.status(400).send( JSON.stringify( {mensaje:"Falta algun parametro"} ) )
                return
            }else{
               
                // todo ok 
                await laLogica.guardarZonas(nombre,mapa,xSup,ySup,xInf,yInf)
                respuesta.status(200).send()
                return 
               
            }

        }catch(error){
            if(error.errno == 1452){ // 1452 es el codigo de error en una clave ajena
                respuesta.status(500).send( JSON.stringify( {mensaje:"No existe una zona con ese id"} ) )
            }else{
               
                respuesta.status(500).send( JSON.stringify( {mensaje:"Error desconocido"} ) )
            }
        }
        
    }) // 

}