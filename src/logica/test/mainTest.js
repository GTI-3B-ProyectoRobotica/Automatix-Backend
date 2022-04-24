// ........................................................
// mainTest.js 
// Tests de la logica de negocio
// 24/03/2021 - Rubén Pardo Casanova
// ........................................................
const Logica = require( "../Logica.js" )
const BDCredenciales = require( "../Constantes/BDCredenciales.js" )
const BDConstantes = require( "../Constantes/BDConstantes.js" )
//const Modelo = require( "../Modelo.js" )
var assert = require ('assert')

const sinon = require('sinon');


// ........................................................
// main ()
// ........................................................
describe( "Test ", function() {

    // ....................................................
    // ....................................................
    it("Guardar mapa",async function(){
    

        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var imagenBase64 = "base64imagen"
        var idMapa = 1;
        var resolucion = 0.5
        await laLogica.guardarMapa(idMapa,imagenBase64, resolucion)

        assert.equal(stub.calledOnce,true,"No se llamo al metodo query?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("update mapa set imagen='base64imagen',resolucion=0.5 where id=1"),true,"No se monto bien la query?")

    })// it

    it("Guardar zona existente",async function(){
    

        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var zonas = [{
            nombre: "transportista", 
            mapa: 1, 
            xSuperior: 0, 
            ySuperior: 0, 
            xInferior: 2, 
            yInferior: 2
        }, {
            nombre: "transportista", 
            mapa: 1, 
            xSuperior: 0, 
            ySuperior: 0, 
            xInferior: 2, 
            yInferior: 2
        }]
        await laLogica.guardarZonas(zonas)
        
        assert.equal(stub.calledOnce,true,"No se llamo al metodo query?")
        // comprobamos que se crea bien la sentencia sql

        assert.equal(stub.calledWith("INSERT INTO zona(nombre, mapa, xSuperior, ySuperior, xInferior, yInferior) VALUES('transportista',1,0,0,2,2) ON DUPLICATE KEY UPDATE nombre='transportista', 'mapa=1, xSuperior=0, ySuperior=0, xInferior=2, yInferior=2;INSERT INTO zona(nombre, mapa, xSuperior, ySuperior, xInferior, yInferior) VALUES('transportista',1,0,0,2,2) ON DUPLICATE KEY UPDATE nombre='transportista', 'mapa=1, xSuperior=0, ySuperior=0, xInferior=2, yInferior=2;"),true,"No se monto bien la query?")

    })// it

    it("Guardar zona nueva",async function(){
    

        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var zonas = [{
            nombre: "otra", 
            mapa: 1, 
            xSuperior: 0, 
            ySuperior: 0, 
            xInferior: 4, 
            yInferior: 4
        }]
        await laLogica.guardarZonas(zonas)

        assert.equal(stub.calledOnce,true,"No se llamo al metodo query?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("INSERT INTO zona(nombre, mapa, xSuperior, ySuperior, xInferior, yInferior) VALUES('otra',1,0,0,4,4) ON DUPLICATE KEY UPDATE nombre='otra', 'mapa=1, xSuperior=0, ySuperior=0, xInferior=4, yInferior=4;"),true,"No se monto bien la query?")

    })// it
    
}) // describe


