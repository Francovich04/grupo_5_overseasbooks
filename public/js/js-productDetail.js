


let stockDisponible = document.querySelector('.stockDisponible p');
let divCantidad = document.querySelector('div.divCantidadArticulosDisponibles span');
let divBotonCompra = document.querySelector('div.divBotonCompra')



if (stockDisponible.classList.contains('outOfStockP')) {
    stockDisponible.innerText = 'Sin Stock';
    stockDisponible.style.color = 'red';
} else {
    stockDisponible.style.color = 'green';
}


if (divCantidad.classList.contains('sinArticulosDisponibles')) {
    divCantidad.innerText = '(Sin artículos disponibles)';
} 



