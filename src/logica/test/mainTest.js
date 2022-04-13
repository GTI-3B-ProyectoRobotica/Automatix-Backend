// ........................................................
// mainTest.js 
// Tests de la logica de negocio
// 24/03/2022 - Rubén Pardo Casanova
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


    // ....................................................
    // ....................................................
    it("Obtener mapa",async function(){
    

        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada


        let resultadoMock = 
            [   
                {
                    "imagen": "base64",
                    "id": 1,
                    "resolucion":0.05,
                    "nombre":"zona1",
                    "xSuperior":41,
                    "ySuperior":34,
                    "xInferior":243,
                    "yInferior":197
                },
                {
                    "imagen": "base64",
                    "id": 1,
                    "resolucion":0.05,
                    "nombre":"zona2",
                    "xSuperior":560,
                    "ySuperior":45,
                    "xInferior":627,
                    "yInferior":130,
                },
                {
                    "imagen": "base64",
                    "id": 1,
                    "resolucion":0.05,
                    "nombre":"transportista",
                    "xSuperior":272,
                    "ySuperior":148,
                    "xInferior":355,
                    "yInferior":403,
                }

        ]

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,resultadoMock) // index, error, resultado de la query
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var idMapa = 1;
        var resultadoObtenido = await laLogica.obtenerMapa(idMapa)

        assert.equal(stub.calledOnce,true,"No se llamo al metodo query?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("select mapa.id,mapa.resolucion, CONVERT(mapa.imagen USING utf8) as imagen, zona.nombre,zona.xInferior,zona.yInferior,zona.xSuperior,zona.yInferior from mapa left join zona on mapa.id = zona.mapa where id=1"),
            true,"No se monto bien la query?")

        assert.equal(resultadoObtenido.zonas.length,3) // se crea el atributo zonas
        assert.equal(resultadoObtenido.id,1) // hay un atributo id
        assert.equal(resultadoObtenido.imagen,"base64") //
        assert.equal(resultadoObtenido.resolucion,0.05) //

    })// it

    it("Obtener mapa vacio",async function(){
    

        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada


        let resultadoMock = 
            [   
                {
                    "imagen": "base64",
                    "id": 1,
                    "resolucion":0.05,
                    "nombre":null,
                    "xSuperior":null,
                    "ySuperior":null,
                    "xInferior":null,
                    "yInferior":null
                }

        ]

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,resultadoMock) // index, error, resultado de la query
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var idMapa = 1;
        var resultadoObtenido = await laLogica.obtenerMapa(idMapa)

        assert.equal(stub.calledOnce,true,"No se llamo al metodo query?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("select mapa.id,mapa.resolucion, CONVERT(mapa.imagen USING utf8) as imagen, zona.nombre,zona.xInferior,zona.yInferior,zona.xSuperior,zona.yInferior from mapa left join zona on mapa.id = zona.mapa where id=1"),
            true,"No se monto bien la query?")

        assert.equal(resultadoObtenido.zonas.length,0) // se crea el atributo zonas
        assert.equal(resultadoObtenido.id,1) // hay un atributo id
        assert.equal(resultadoObtenido.imagen,"base64") //
        assert.equal(resultadoObtenido.resolucion,0.05) //

    })// it


    
}) // describe