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
        
    }) // put /mediciones

}