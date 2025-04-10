// Variables
const marca = document.querySelector('#marca');
const clasificarAuto = document.querySelector('#clasificar-auto');
const year = document.querySelector('#year');
const puertas = document.querySelector('#puertas');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const carts = document.querySelector('#carts');//Resultados

const yearActual = new Date().getFullYear();
const yearMinimo = yearActual - 15;

const busquedaDatos = {
    marca:'',
    clasificacion: '',
    precio: '',
    puertas:'',
    year: '',
    minimo:'',
    maximo:''
}


EjecucionEventos();

// EvenListener
function EjecucionEventos(){
    document.addEventListener('DOMContentLoaded', () =>{
        mostrarMarcaSelect();
        mostrarYearSelect();
        crearElementos(marcas);
    })
}

//filtros 
//Marca
marca.addEventListener('change', (e) =>{
    busquedaDatos.marca = e.target.value;
    filtrar()
})

//clasificación
clasificarAuto.addEventListener('change', (e) =>{
    busquedaDatos.clasificacion = e.target.value;
    filtrar()
}) 

//Año
year.addEventListener('change', (e) =>{
    busquedaDatos.year = parseInt(e.target.value);
    filtrar()
})   

//Puertas
puertas.addEventListener('change', (e) =>{
    busquedaDatos.puertas = parseInt(e.target.value);
    filtrar()
}) 

//Minimo
minimo.addEventListener('change', (e) =>{
    busquedaDatos.minimo = parseInt(e.target.value);
    filtrar()
}) 

//Maximo
maximo.addEventListener('change', (e) =>{
    busquedaDatos.maximo = parseInt(e.target.value);
    filtrar()
}) 
// Funciones
function mostrarMarcaSelect(){
    marcas.forEach(auto =>{
        const opcion = document.createElement('OPTION')

        opcion.textContent = auto.marca;
        opcion.value = auto.marca;

        marca.appendChild(opcion);
    })
}

function crearElementos(marcas){
    limpiarHTML();

    marcas.forEach(marca =>{

        const cart = document.createElement('DIV');
        const infoCart = document.createElement('DIV');
        const infoSub = document.createElement('DIV');
        const img = document.createElement('IMG');
        const h3Marca = document.createElement('H3');
        const precio = document.createElement('P');
        const modelo = document.createElement('P');
        const noMargin = 'no-margin';

        cart.classList.add('cart');
        img.classList.add('imgC');
        infoCart.classList.add('grid-auto', 'info');
        h3Marca.classList.add(noMargin, 'text-center');
        infoSub.classList.add('flex');
        precio.classList.add('info__precio', noMargin);
        modelo.classList.add('info__modelo', noMargin);
        carts.classList.add('carts');

        img.src = `${marca.image}`;
        h3Marca.textContent = `${marca.marca}`;
        modelo.textContent =`${marca.clasificacion}`;
        precio.textContent =`$${marca.precio}`;

        carts.appendChild(cart);
        cart.appendChild(img);
        cart.appendChild(infoCart);
        infoCart.append(h3Marca, infoSub);
        infoSub.append(modelo, precio);
    })

}

function mostrarYearSelect(){
    for(let i = yearActual; i >= yearMinimo ;i--){
        const yearOption = document.createElement('OPTION');
        yearOption.innerText = i;
        yearOption.value = i;

        year.appendChild(yearOption);
    }
}

//Filtros funciones 
function filtrar(){
    const resultadosAutos = marcas.filter(filtrarMarca).filter(filtrarClasificacion).filter(filtrarYear).filter(filtrarPuertas).filter(filtrarMaximo).filter(filtrarMinimo);

    if(resultadosAutos.length){
        crearElementos(resultadosAutos);
    }else{
        sinResultados();
    }
}

//Crear elemento HTML sin resultados
function sinResultados(){
    limpiarHTML();

    const ceroResultados = document.createElement('P');
    ceroResultados.textContent = 'Ninguna respuesta';
    ceroResultados.classList.add('ceroResultados');
    carts.classList.remove('carts');

    carts.appendChild(ceroResultados);

}

function filtrarMarca(auto){
    const {marca} = busquedaDatos
    if(marca){
        return auto.marca === marca
    }else{
        return auto
    }
}

function filtrarClasificacion(auto){
    const {clasificacion} = busquedaDatos;
    if(clasificacion){
        return (auto.clasificacion).toLowerCase() === clasificacion;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = busquedaDatos;

    if(year){
        return auto.year === year;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = busquedaDatos;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto
}

function filtrarMinimo(auto){
    const {minimo} = busquedaDatos;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto
}

function filtrarMaximo(auto){
    const {maximo} = busquedaDatos;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto
}

function limpiarHTML(){
    while(carts.firstChild){
        carts.removeChild(carts.firstChild);
    }
}