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
        await laLogica.guardarMapa(imagenBase64, idMapa)

        assert.equal(stub.calledOnce,true,"No se llamo al metodo query?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("update mapa set imagen='base64imagen' where id=1"),true,"No se monto bien la query?")

    })// it



    
}) // describe