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
describe( "==================================================\n\t\t\t Test\n  ==================================================", function() {
    
  
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

    it('GET/prueba', function (done){
        
        let publicarStub = sinon.stub(laLogica, 'guardarMapa').resolves({});
        request(app).get('/prueba')
            .expect(200)
            .end((err, response)=>{
                done(err)
            })
    })

    it('POST/mapa publicar mapa correcto devuelve 200', function (done){
        
        // lo que le paso a la funcion
        let bodyPost ={
                    "idMapa":1, 
                    "imagen":"adfjij3km4idn8nmoca93j32inaosif083ih2hr8fn489n498ng384...",
                    "resolucion":0.5
                }
        // lo que espero con que se llame al metodo publicar 
        let idMapaEsperable = 1
        let imagenEsperable = "adfjij3km4idn8nmoca93j32inaosif083ih2hr8fn489n498ng384..."
        let resolucion = 0.5

        let publicarStub = sinon.stub(laLogica, 'guardarMapa').resolves({});

        request(app).post('/mapa')
            .send(bodyPost)
            .expect(200)
            .end((err, response)=>{

                let parametrosFuncion = publicarStub.args[0] // se llama a la funcion los parametros esperables

                expect(publicarStub).to.have.been.calledOnce; // se llamo a guardarMapa
                expect(parametrosFuncion[0]).to.eql(idMapaEsperable)// id del mapa que se le pasan a publicar mapa
                expect(parametrosFuncion[1]).to.eql(imagenEsperable)// imagen que se le pasan a publicar mapa
                expect(parametrosFuncion[2]).to.eql(resolucion)// resolucion que se le pasa a publicar mapa
                expect(response.statusCode).equal(200)
                done()
            })
    })
    
    it('POST/mapa publicar mapa con idMapa no existente devuelve 500', function(done){
        
        // lo que le paso a la funcion
        let bodyPost ={
                    "idMapa":-1, 
                    "imagen":"adfjij3km4idn8nmoca93j32inaosif083ih2hr8fn489n498ng384...",
                    "resolucion":0.5
                }
        // lo que espero con que se llame al metodo publicar 
        let idMapaEsperable = -1
        let imagenEsperable = "adfjij3km4idn8nmoca93j32inaosif083ih2hr8fn489n498ng384..."
        let resolucion = 0.5

        let publicarStub = sinon.stub(laLogica, 'guardarMapa').rejects({errno:1452});

        request(app).post('/mapa')
            .send(bodyPost)
            .expect(500)
            .end((err, response)=>{

                let parametrosFuncion = publicarStub.args[0] // se llama a la funcion los parametros esperables

                expect(publicarStub).to.have.been.calledOnce; // se llamo a guardarMapa
                expect(parametrosFuncion[0]).to.eql(idMapaEsperable)// id del mapa que se le pasan a publicar mapa
                expect(parametrosFuncion[1]).to.eql(imagenEsperable)// imagen que se le pasan a publicar mapa
                expect(parametrosFuncion[2]).to.eql(resolucion)// resolucion que se le pasa a publicar mapa
                expect(response.statusCode).equal(500)
                expect(response.text).equal('{"mensaje":"No existe un mapa con ese id"}'); // mensaje de ok
                done();
            })
    })
   
    it('POST/mapa publicar mapa sin todos los parametros obligatorios devuelve 400',function (done){
    
        // lo que le paso a la funcion
        let bodyPost ={
                    "idMapa":1, 
                }
        
        let publicarStub = sinon.stub(laLogica, 'guardarMapa').resolves({});

        request(app).post('/mapa')
            .send(bodyPost)
            .expect(400)
            .end((err, response)=>{

                expect(response.statusCode).equal(400)
                expect(publicarStub).to.not.have.been.calledOnce; // no se llamo a guardarMapa
                expect(response.text).equal('{"mensaje":"Falta algun parametro"}'); // mensaje de ok
                done();
            })
    })

    it('PUT/producto?idproducto?idzona actualiza correctamente devuelve 200',function (done){
    
        // lo que le paso a la funcion
        let bodyPost ={
                    "idProducto":1,
                    "idZona":"transportista",
        }
        
        let publicarStub = sinon.stub(laLogica, 'actualizarStockById').resolves({});

        request(app).put('/producto?idproducto?idzona')
            .send(bodyPost)
            .expect(200)
            .end((err, response)=>{

                let parametrosFuncion = publicarStub.args[0] // se llama a la funcion los parametros esperables

                expect(publicarStub).to.have.been.calledOnce; // se llamo a actualizarStockById
                expect(parametrosFuncion[0]).to.eql(1)
                expect(parametrosFuncion[1]).to.eql("transportista")
                expect(response.statusCode).equal(200)
                expect(response.text).equal('{"mensaje":"El stock se ha actualizado correctamente"}'); // mensaje de ok
                done()
            })
    })

    it('PUT/producto?idproducto?idzona producto no existe pero si zona, crea el objeto devuelve 200',function (done){
    
        // lo que le paso a la funcion
        let bodyPost ={
                    "idProducto":756,
                    "idZona":"transportista",
        }
        
        let publicarStub = sinon.stub(laLogica, 'actualizarStockById').resolves({});

        request(app).put('/producto?idproducto?idzona')
            .send(bodyPost)
            .expect(200)
            .end((err, response)=>{

                let parametrosFuncion = publicarStub.args[0] // se llama a la funcion los parametros esperables

                expect(publicarStub).to.have.been.calledOnce; // se llamo a actualizarStockById
                expect(parametrosFuncion[0]).to.eql(756)
                expect(parametrosFuncion[1]).to.eql("transportista")
                expect(response.statusCode).equal(200)
                expect(response.text).equal('{"mensaje":"El stock se ha actualizado correctamente"}'); // mensaje de ok
                done()
            })
    })
    
    it('PUT/producto?idproducto?idzona no se le manda ids devuelve 400',function (done){
        // lo que le paso a la funcion
        let bodyPost ={
            "idProducto":null,
            "idZona":null,
        }

        let publicarStub = sinon.stub(laLogica, 'actualizarStockById').rejects({err:400});

        request(app).put('/producto?idproducto?idzona')
            .send(bodyPost)
            .expect(400)
            .end((err, response)=>{

                expect(response.statusCode).equal(400)
                expect(publicarStub).to.not.have.been.calledOnce; // no se llamo a actualizarStockById
                expect(response.text).equal('{"mensaje":"Falta algun parametro"}'); // mensaje de ok
                done();
            })
        
    })

    it('PUT/producto?idproducto?idzona la zona y el objeto no existe devuelve 1452',function (done){
        // lo que le paso a la funcion
        let bodyPost ={
            "idProducto":600,
            "idZona":"zapatos" 
        }

        let publicarStub = sinon.stub(laLogica, 'actualizarStockById').rejects({errno:1452});

        request(app).put('/producto')
            .send(bodyPost)
            .expect(500)
            .end((err, response)=>{

                let parametrosFuncion = publicarStub.args[0] // se llama a la funcion los parametros esperables

                expect(publicarStub).to.have.been.calledOnce; // se llamo a actualizarStock
                expect(parametrosFuncion[0]).to.eql(600)
                expect(parametrosFuncion[1]).to.eql("zapatos")
                expect(response.statusCode).equal(500)
                expect(response.text).equal('{"mensaje":"No existe un producto o zona con ese id"}'); // mensaje de ok
                done();
            })

    })

    it('GET/productos?idmapa id correcto devuelve 200',function (done){

        let jsonEsperado =  [{
            id: 1,
            nombre: 'zapatos',
            cantidad: 37,
            precio: 29,
            zona: 'transportista'
          },
          {
            id: 3,
            nombre: 'prueba',
            cantidad: 1,
            precio: 5.5,
            zona: 'transportista'
          },
          {
            id: 800,
            nombre: 'prueba',
            cantidad: 3,
            precio: 5.5,
            zona: 'transportista'
          }]


        let publicarStub = sinon.stub(laLogica, 'obtenerTodosProductos').resolves(jsonEsperado);

        
        request(app).get('/productos?idmapa=1')
            .expect(200)
            .end((err, response)=>{

                let parametrosFuncion = publicarStub.args[0] // se llama a la funcion los parametros esperables

                expect(publicarStub).to.have.been.calledOnce; // se llamo a obtenerTodosProductos
                expect(parametrosFuncion[0]).to.eql("1")
                expect(response.statusCode).equal(200)
                expect(response.body).to.eql(jsonEsperado); // json bien montado
                done();
            })

    })

}) // describe
