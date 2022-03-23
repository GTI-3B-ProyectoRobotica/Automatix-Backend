// ........................................................
// mainTestMedicion.js
// Clase de tests para probar los endpoints
// Rubén Pardo Casanova 29/09/2021
// ........................................................
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
var assert = require ('assert')
const bodyParser = require('body-parser')
const request = require('supertest');
//const sandbox = sinon.sandbox.create();


var app = rewire('../mainServidorREST').servidorExpress;
var Logica = require('../../logica/Logica.js');
//const Modelo = require('../../logica/Modelo.js');
//const { Posicion } = require('../../logica/Modelo.js');


// ........................................................
// main ()
// ........................................................
describe( "==================================================\nTest 1 RECURSO MEDICION\n==================================================", function() {
    
  
    var laLogica;
     // preparamos el servidor falso para las pruebas
    this.beforeAll(()=>{
        laLogica = new Logica(null);
        app = rewire('../mainServidorREST').servidorExpress;
        app.use(bodyParser.text({type :'application/json'}))
        var reglas = rewire("../ReglasREST.js")
   
        reglas.cargar(app,laLogica)
    })
// despues de cada test limpiamos el sinon
      afterEach(()=>{
        sinon.restore();
    })

    it("Prueba",async function(){
        assert.equal(2,2)
    })

  /*  
    context('GET /prueba--------------------------------------------------', ()=>{
        let obtenerStub, errorStub;

        it('Obtener mediciones devuelve un array', (done)=>{
        
            // si obtener mediciones devuelve un array de mediciones esperamos un 200 y un formato json en el body
            let resultadoMediciones = new Array();
            resultadoMediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 01:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',1));
            resultadoMediciones.push(new Modelo.Medicion(null, 50, '2021-09-29 02:00:00', new Modelo.Posicion(30,30), 29, 'GTI-3A-1',2));
           
            let jsonEsperado =  [{
                fechaHora: '2021-09-29 01:00:00',
                posMedicion: { latitud: 30, longitud: 30 },
                valor: 50,
                idUsuario: 29,
                uuidSensor: 'GTI-3A-1',
                tipoGas: 1
              },
              {
                fechaHora: '2021-09-29 02:00:00',
                posMedicion: { latitud: 30, longitud: 30 },
                valor: 50,
                idUsuario: 29,
                uuidSensor: 'GTI-3A-1',
                tipoGas: 2
              }]

            obtenerStub = sinon.stub(laLogica, 'obtenerTodasMediciones').resolves(resultadoMediciones);
            
            request(app).get('/mediciones')
                .expect(200) // esperamos un 200
                .end((err, response)=>{

                    expect(response.statusCode).equal(200)
                    expect(obtenerStub).to.have.been.calledOnce; // se llamo a obtenerTodasMediciones
                    expect(response.body.length).equal(2); // json de 2 elementos
                    expect(response.body).to.eql(jsonEsperado); // json bien montado
                    done();
                })
        })
    })
*/
   

}) // describe
