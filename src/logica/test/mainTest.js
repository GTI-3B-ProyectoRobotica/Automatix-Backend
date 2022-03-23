// ........................................................
// mainTestMediciones.js 
// Tests de la logica de negocio
// 29/09/2021 - Rubén Pardo Casanova
// ........................................................
const Logica = require( "../Logica.js" )
//const BDCredenciales = require( "../Constantes/BDCredenciales.js" )
//const BDConstantes = require( "../Constantes/BDConstantes.js" )
//const Modelo = require( "../Modelo.js" )
var assert = require ('assert')

const sinon = require('sinon');


// ........................................................
// main ()
// ........................................................
describe( "Test ", function() {


    it("Prueba",async function(){
        assert.equal(2,2)
    })
    // ....................................................
    // ....................................................
   /* it("Insertar mediciones correctas",async function(){
    

        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const publicarMedicionesStub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        
        var mediciones = new Array();
        mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 01:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',1));
        mediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 02:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',2));

        await laLogica.publicarMediciones(mediciones)
        // comprobamos que se crea bien la sentencia sql
        assert.equal(publicarMedicionesStub.calledWith("insert into medicion(fechaHora,posMedicion,valor,idUsuario,uuidSensor,tipoGas)  values ('2021-09-29 01:00:00',POINT(30,30),(50/(SELECT factorDescalibracion FROM sensor WHERE uuid = 'GTI-3A-1')),29,'GTI-3A-1',1),('2021-09-29 02:00:00',POINT(30,30),(50/(SELECT factorDescalibracion FROM sensor WHERE uuid = 'GTI-3A-1')),29,'GTI-3A-1',2)"),
        true,"No se monto bien la query?")

    })// it*/



    
}) // describe