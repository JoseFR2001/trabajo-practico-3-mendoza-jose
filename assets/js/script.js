const contenedorPadre = document.getElementById('contenedor-data');
const btnBuscar = document.getElementById('btn-buscar');
const contenedorBuscador = document.getElementById('buscador')
const urlDragonBall = 'https://dragonball-api.com/api/characters'

const cargarDatos = async (url) => {
   try {
        const response = await fetch('https://dragonball-api.com/api/characters?limit=58')
    if (!response.ok) {
      throw new Error("Error en la API");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const verDetalles = async (id) => {
  try {
    const response = await fetch(`${urlDragonBall}/${id}`);

    if (!response.ok) {
      throw new error("Error en la API");
    }

    const data = await response.json();
    alert(data.description);
  } catch (error) {
    console.log(error);
  }
};



// btnBuscar.addEventListener('click', async () => {
//     const data = await cargarDatos(urlDragonBall);
//     const dataPersonajes= data.items;
//     console.log(data);
//     dataPersonajes.forEach((personaje) => {
//         contenedorPadre.innerHTML += `
//         <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
//             <div class="card">
//                 <img class="card-img-top" src=${personaje.image} alt=${personaje.name}/>
//                 <div class="card-body">
//                     <h5 class="card-title">${personaje.name}</h5>
//                     <p class="card-text">${personaje.race} - ${personaje.gender}</p>
//                     <button class="btn btn-success btn-ver-detalles">Ver más</button>
//                 </div>
//             </div>
//         </div>
//         `;
//     });
// })

document.addEventListener("DOMContentLoaded", async () => {
    const data = await cargarDatos(urlDragonBall);
    const dataPersonajes = data.items;
    let htmlContent = '';
    dataPersonajes.forEach((personaje) => {
        htmlContent += `
                <div class="col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
                    <div class="card bg-dark p-2 text-dark bg-opacity-10 mx-2 my-2" style="width: 500px;
                     overflow: visible; position: relative;
                     border: none;">
                        <img
                            class="card-img-top p-2 img-hover" alt=${personaje.name}
                            style="width: 100%; height: 400px; object-fit: contain;"
                            src="${personaje.image}"
                        />
                        <div class="card card-body">
                            <h5 class="card-title">${personaje.name}</h5>
                            <p class="card-text">${personaje.race} - ${personaje.gender}</p>
                            <button class="btn btn-success btn-ver-detalles">Ver más</button>
                        </div>
                    </div>
                </div>
        `;
    });
    contenedorPadre.innerHTML = htmlContent;
    console.log(contenedorPadre)
});

contenedorPadre.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-ver-detalles")) {
    const cardPadre = e.target.closest(".col-3");
    const id = cardPadre.dataset.id;

    verDetalles(id);
  }
});

// contenedorBuscador.addEventListener('keyup', (e) =>{
//   console.log(e.target.value)
//   if(e.target.matches('#buscador')){
//     document.querySelectorAll('.personajess').forEach(personaje => {
//       personaje.textContent.toLocaleLowerCase().includes(e.targer.value)
//       ? personaje.classList.remove('filtro')
//       :personaje.classList.add('filtro')
//     })
//   }
// })

contenedorBuscador.addEventListener('keyup', (e) => {
  const textoBusqueda = e.target.value.toLowerCase();
  console.log("Buscando:", textoBusqueda);

  document.querySelectorAll('personajes-dbz').forEach(personaje => {
    personaje.querySelectorAll(".card-title").textContent.toLowerCase().includes(textoBusqueda)
      ? personaje.classList.remove('filtro')
      : personaje.classList.add('filtro');
  });
});

btnBuscar.addEventListener('click', async () => {
  const termino = contenedorBuscador.value.trim();
  if (termino === '') {
    alert('Por favor, escribí un nombre para buscar.');
    return;
  }

  try {
    const data = await cargarDatos(`${urlDragonBall}?name=${termino.toLowerCase()}`);
    const personajes = data.items;

    if (!personajes || personajes.length === 0) {
      contenedorPadre.innerHTML = `<p class="text-center">No se encontraron resultados.</p>`;
      return;
    }

    renderizarPersonajes(personajes);
  } catch (error) {
    contenedorPadre.innerHTML = `<p class="text-center text-danger">Ocurrió un error al consultar la API.</p>`;
  }
});

// contenedorBuscador.addEventListener('keyup', (e) => {
//   const textoBusqueda = e.target.value.toLowerCase();
//   console.log("Buscando:", textoBusqueda);
//   document.querySelectorAll('.personajes-dbz').forEach(personaje => {
//   personaje.querySelector(".card-title").textContent.toLowerCase().includes(textoBusqueda)
//     ? personaje.classList.remove('filtro')
//     : personaje.classList.add('filtro');
// });
// }

