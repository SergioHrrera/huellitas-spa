import './style.css'

const WHATSAPP = '573000000000'

const formulario = document.querySelector('#cotizar form')
const fecha = document.querySelector('#fecha')

// No dejar elegir días que ya pasaron
const hoy = new Date()
hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset())
fecha.min = hoy.toISOString().slice(0, 10)

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault()

  const datos = new FormData(formulario)
  const tamano = formulario.tamano.selectedOptions[0].textContent
  const servicios = [...formulario.querySelectorAll('input[name="servicios"]:checked')]
    .map((casilla) => formulario.querySelector(`label[for="${casilla.id}"]`).textContent.split(',')[0])

  const lineas = [
    `Hola, soy ${datos.get('nombre').trim()} y quiero una cotización.`,
    `Barrio: ${datos.get('barrio').trim()}`,
    datos.get('raza').trim() && `Raza: ${datos.get('raza').trim()}`,
    `Tamaño: ${tamano}`,
    `Servicios: ${servicios.length ? servicios.join(', ') : 'Quiero que me recomienden'}`,
    datos.get('fecha') && `Día preferido: ${datos.get('fecha').split('-').reverse().join('/')}`,
    datos.get('comentarios').trim() && `Comentarios: ${datos.get('comentarios').trim()}`,
  ].filter(Boolean)

  const enlace = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lineas.join('\n'))}`
  window.open(enlace, '_blank', 'noopener')
})
