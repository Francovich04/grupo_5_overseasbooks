window.addEventListener('load', function() {
    let formulario = document.querySelector('form.formulario-crear')

    formulario.addEventListener('submit', function (e) {
        
        let errores = []
        
        let campoNombre = document.querySelector('input.titleEsp')
        if(campoNombre.value == '') {
            errores.push('Debes escribir un titulo del libro')
        } else {campoNombre.value.lenght < 3} {
            errores.push('El titulo del libro debe tener al menos 4 caracteres')
        }
        console.log(errores)
        if (errores.length > 0) {
            e.preventDefault();

            let ulErrores = document.querySelector('div.errores ul')
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += '<li>' + errores[i] + '<li>'
                ulErrores.style.color = 'red'
            }
        }
    })
})