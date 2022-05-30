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

        assert.equal(stub.calledWith("INSERT INTO zona(nombre, mapa, xSuperior, ySuperior, xInferior, yInferior) VALUES('transportista',1,0,0,2,2) ON DUPLICATE KEY UPDATE nombre='transportista', mapa=1, xSuperior=0, ySuperior=0, xInferior=2, yInferior=2;INSERT INTO zona(nombre, mapa, xSuperior, ySuperior, xInferior, yInferior) VALUES('transportista',1,0,0,2,2) ON DUPLICATE KEY UPDATE nombre='transportista', mapa=1, xSuperior=0, ySuperior=0, xInferior=2, yInferior=2;"),true,"No se monto bien la query?")

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
        assert.equal(stub.calledWith("INSERT INTO zona(nombre, mapa, xSuperior, ySuperior, xInferior, yInferior) VALUES('otra',1,0,0,4,4) ON DUPLICATE KEY UPDATE nombre='otra', mapa=1, xSuperior=0, ySuperior=0, xInferior=4, yInferior=4;"),true,"No se monto bien la query?")

    })// it

    it("Añadir correctamente un producto",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var id = "1"
        var zona = "transportista"
        var nombre = "zapatos"
        var cantidad = "2"
        var precio = "30"
        var error = null
        try{
            await laLogica.actualizarStockById(id, nombre, zona, cantidad, precio)   
        } catch(err){
            error=err
        }
        assert.equal(error,null,"¿No está bien la id o la zona?")
        assert.equal(stub.calledOnce,true,"No se llamo al metodo actualizarStock?")

        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("INSERT INTO producto(id,nombre,zona,cantidad,precio) VALUES ('1','zapatos','transportista','2','30') ON DUPLICATE KEY UPDATE cantidad=cantidad+2"),true,"No se montó bien la query?")
        
    })// it

    it("Añadir una id de producto que no existe",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var id = "800"
        var zona = "transportista"
        var nombre = "prueba"
        var precio = "2"
        var cantidad = "76"
        var error = null
        try {
            await laLogica.actualizarStockById(id, nombre, zona, cantidad, precio)    
        } catch(err){
            error = err
        }
        assert.equal(error,null,"¿No está bien la id o la zona?")
        assert.equal(stub.calledOnce,true,"No se llamo al metodo actualizarStock?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("INSERT INTO producto(id,nombre,zona,cantidad,precio) VALUES ('800','prueba','transportista','76','2') ON DUPLICATE KEY UPDATE cantidad=cantidad+76"),true,"No se montó bien la query?")     
    })// it

    it("Añadir producto sin zona",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var id = "800"
        var zona = null
        var nombre = "prueba"
        var precio = "2"
        var cantidad = "76"
        var error = null
        try {
            await laLogica.actualizarStockById(id, nombre, zona, cantidad, precio)   
        } catch(err){
            error=err
        }
        assert.equal(error,null,"¿No está bien la id o la zona?")
        assert.equal(stub.calledOnce,true,"No se llamo al metodo actualizarStock?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("INSERT INTO producto(id,nombre,zona,cantidad,precio) VALUES ('800','prueba',NULL,'76','2') ON DUPLICATE KEY UPDATE cantidad=cantidad+76"),true,"No se montó bien la query?")

        
    })// it

    it("Añadir un producto inexistente a una zona que no existe",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,{errno: 1425},[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var id = "600"
        var zona = "zapatos"
        var nombre = "prueba"
        var precio = "2"
        var cantidad = "76"
        var error = null
        try {
            await laLogica.actualizarStockById(id, nombre, zona, cantidad, precio)       
        } catch(err){
            error = err
        }
        assert.equal(error,"No existe la zona", "La zona no existe!!!")
        assert.equal(stub.calledOnce,true,"No se llamo al metodo actualizarStock?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("INSERT INTO producto(id,nombre,zona,cantidad,precio) VALUES ('600','prueba','zapatos','76','2') ON DUPLICATE KEY UPDATE cantidad=cantidad+76"),true,"No se montó bien la query?")  
    })// it


    it("Obtener todos los productos",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var id = 1
        var error = null
        var res = 0
        try {
           await laLogica.obtenerTodosProductos(id)    
        } catch(err){
            error = err
        }
        assert.equal(error,null, "Este mapa no existe??")
        assert.equal(stub.calledOnce,true,"No se llamo al metodo obtenerProductos?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("SELECT * FROM producto WHERE zona in (SELECT nombre FROM zona WHERE mapa=1)"),true,"No se montó bien la query?")  
    })// it

    it("Obtener todos los productos de un mapa inexistente",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var id = 589
        var error = null
        try {
            await laLogica.obtenerTodosProductos(id)    
        } catch(err){
            error = err
        }
        assert.equal(error,null, "No existe el mapa, pero no deberia mostrar productos")
        assert.equal(stub.calledOnce,true,"No se llamo al metodo obtenerProductos?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("SELECT * FROM producto WHERE zona in (SELECT nombre FROM zona WHERE mapa=589)"),true,"No se montó bien la query?")  
    })// it

    it("Borrar zona que existe",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var nombre = "zona2"
        var error = null
        try {
            await laLogica.borrarZona(nombre)    
        } catch(err){
            error = err
        }
        assert.equal(error,null, "Esta zona no existe??")
        assert.equal(stub.calledOnce,true,"No se llamo al borrarZona?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("DELETE FROM zona WHERE nombre='zona2'"),true,"No se montó bien la query?")  
    })// it

    it("Borrar zona sin zona no deberia dar problema",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var nombre = null
        var error = null
        try {
            await laLogica.borrarZona(nombre)    
        } catch(err){
            error = err
        }
        assert.equal(error,null, "¿Error desconocido?")
        assert.equal(stub.calledOnce,true,"No se llamo al borrarZona?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("DELETE FROM zona WHERE nombre=NULL"),true,"No se montó bien la query?")  
    })// it

    it("Borrar zona sin zona no deberia dar problema",async function(){
    
        // creamos el mock de la conexion
        const conexion = {
            query: async function(textoSQL,funcion){}
        }; // objeto mock, cuando llame a objetos que usan la conexion no pasara nada

        const stub = sinon.stub(conexion,"query").callsArgWith(1,null,[]) // index, error, resultado
        // creamos la logica con el metodo conexion moqueado
        let laLogica = new Logica(conexion);

        var nombre = "zona9"
        var error = null
        try {
            await laLogica.borrarZona(nombre)    
        } catch(err){
            error = err
        }
        assert.equal(error,null, "¿Error desconocido?")
        assert.equal(stub.calledOnce,true,"No se llamo al borrarZona?")
        // comprobamos que se crea bien la sentencia sql
        assert.equal(stub.calledWith("DELETE FROM zona WHERE nombre='zona9'"),true,"No se montó bien la query?")  
    })// it

    
}) // describe


