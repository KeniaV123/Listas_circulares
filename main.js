var lista = document.querySelector("#listar");

class Rutas{
    constructor( nombre, minutos,) {
        this.nombre = nombre;
        this.minutos = minutos;
        this.siguiente = null;
    }
    articleToHtml() {
        let productString = '<li class="list-group-item">';
        for (let key in this) {
        productString += `<br><strong>${key}:</strong> ${this[key]}`;
        }
        return productString + "</li>";
    }
    trayecto(ruta,hora){
    let productString = '<li class="list-group-item">';
    for (let key in this) {
        productString += `<br><strong>${key}:</strong> ${this[key]}`;
    }
    let texto = `<br>` + "La ruta: " + ruta + ", empieza su trayecto a las: " + hora;
    return productString + texto + "</li>";
    }
}


  
class Bases{
    constructor(){
        this.inicio = null;
        this.tamaño = 0;
    }

    agregarBase(nuevo) {
        if (this.inicio === null ) {
            this.inicio = nuevo;
            nuevo.siguiente= this.inicio
        }else {
            let aux = this.inicio;
            while (aux.siguiente !== this.inicio){
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
            nuevo.siguiente = this.inicio;
        }
        this.tamaño++;
        document.getElementById("form1").reset();
        this.listar();
    }
   
    borraBase(nombre) {
        let aux = this.inicio;
        if(aux.nombre === nombre){
            this.inicio = aux.siguiente;
            let temp = this.inicio;
            while(temp.siguiente.nombre !== nombre){
                temp = temp.siguiente;
            }
            this.tamaño--;
            temp.siguiente = this.inicio;
            document.getElementById("form1").reset();
            this.listar();
        }else {
            let temp = this.inicio;
            while(temp.siguiente.nombre !== nombre){
                temp = temp.siguiente;
            }
            temp.siguiente = temp.siguiente.siguiente;
            this.tamaño--;
            document.getElementById("form1").reset();
            this.listar();
            return temp.siguiente;
        }
        document.getElementById("form1").reset();
        this.listar();
        return null;
        
    }
  
    buscarBase(nombre) {
        if(this.inicio !== null){
            let aux = this.inicio;
            while(aux){
                if(aux.nombre == nombre){
                    document.getElementById("form1").reset();
                    return (aux);
                }
                aux = aux.siguiente;
            }
        }
        document.getElementById("form1").reset();
        return null; 
    }
  
    listar() {
        lista.innerHTML = "";
        if(this.tamaño === 0){
            return null;
        }
        let aux = this.inicio;
        let aux2 = false;
        while(!aux2){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.siguiente;
            if(aux.nombre === this.inicio.nombre){
                aux2 = true;
            }
        }
    }

    crearRecorridoRutas(baseInicio, minutosInicio, minutosFin){
        lista.innerHTML = "";
        let aux = this.buscarBase(baseInicio);
        let horaTemp = Number(minutosInicio);
        
        while(horaTemp < minutosFin){
            lista.innerHTML += aux.trayecto(aux.nombre, horaTemp);
            aux = aux.siguiente;
            horaTemp += Number(aux.minutos);
        }
        lista.innerHTML += aux.trayecto(aux.nombre, horaTemp);
    }

}



let ruta = new Bases();

var botonAgregar = document.querySelector('#botonAgregar');
botonAgregar.addEventListener("click", () => {
    let nombre = document.querySelector('#nombre');
    let minutos = document.querySelector('#minutos');
    let nuevaBase = new Rutas(nombre.value, Number(minutos.value));
    ruta.agregarBase(nuevaBase);
});

var botonBorrar = document.querySelector('#botonBorrar');
botonBorrar.addEventListener("click", () => {
    var borrarBase = document.querySelector("#borrarBase");
    ruta.borraBase(borrarBase.value);
    
});
  
var botonBuscar = document.querySelector('#botonBuscar');
botonBuscar.addEventListener("click", () => {
    lista.innerHTML = "";
    var buscarBase = document.querySelector("#buscarBase");
    let busca = ruta.buscarBase(buscarBase.value);
    lista.innerHTML += busca.articleToHtml(); 
});
  
var botonListar = document.querySelector('#botonListar');
botonListar.addEventListener("click", () => {
    ruta.listar();
});

var botonCrearR = document.querySelector('#botonCrearR');
botonCrearR.addEventListener("click", () => {
    var baseInicio = document.querySelector('#baseInicio');
    var minutosInicio = document.querySelector('#MinutosInicio');
    var minutosFin = document.querySelector('#minutosFin');
    ruta.crearRecorridoRutas(baseInicio.value, Number(minutosInicio.value), Number(minutosFin.value));
    document.getElementById("form2").reset();
})
