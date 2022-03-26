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
            let idMapa = json["idMapa"]
            let imagen = json["imagen"]
            if(idMapa==null || imagen==null){
                // no estan todo los parametros obligatorios
                respuesta.status(400).send( JSON.stringify( {mensaje:"Falta algun parametro"} ) )
                return
            }else{
               
                // todo ok 
                await laLogica.guardarMapa(idMapa,imagen)
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



}