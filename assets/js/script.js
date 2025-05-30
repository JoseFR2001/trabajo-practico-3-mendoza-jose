// Mis contastes que usare
const contenedorPadre = document.getElementById("contenedor-data");
const urlDragonBall = "https://dragonball-api.com/api/characters";
const buscar = document.getElementById("btn-buscar");
const inputBuscar = document.getElementById("input-buscar");
limpiar = document.getElementById('btn-limpiar')

// Validación de la api
const cargarDatos = async (url) => {
  try {
    const response = await fetch(
      "https://dragonball-api.com/api/characters?limit=58"
    );
    if (!response.ok) {
      throw new Error("Error en la API");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Función asincrinica para ver la descripción de los personajes
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

// Función para cargar los datos personajes 
document.addEventListener("DOMContentLoaded", async () => {
  const data = await cargarDatos(urlDragonBall);
  const dataPersonajes = data.items;
  // Cree una variable para cargar los datos
  let contenidoPersonajes = "";
  dataPersonajes.forEach((personaje) => {
    contenidoPersonajes += `
                <div class="personajes-dbz col-3 pb-2 d-flex justify-content-center" data-id=${personaje.id}>
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
  // Cargo esos datos en el contenedor padre
  contenedorPadre.innerHTML = contenidoPersonajes;
});

// Función para ver la descripción
contenedorPadre.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-ver-detalles")) {
    const cardPadre = e.target.closest(".col-3");
    const id = cardPadre.dataset.id;

    verDetalles(id);
  }
});


// Función para buscar a los personajes por nombre
buscar.addEventListener("click", async function () {
  const valorInput = inputBuscar.value;

  if (valorInput === "") {
    return alert("Debe escribir")
  }

  const respuesta = await fetch(
    `https://dragonball-api.com/api/characters?name=${valorInput}`
  );
  const datos = await respuesta.json();
  contenedorPadre.innerHTML = ""

  datos.forEach((personaje) => {
    contenedorPadre.innerHTML += `
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
});


// Función para limpiara la busqueda
limpiar.addEventListener("click", async () => {
  inputBuscar.value = ""; 
  contenedorPadre.innerHTML = ""; 
  
  const data = await cargarDatos(urlDragonBall);
  const dataPersonajes = data.items;
  let contenidoPersonajes = "";

  dataPersonajes.forEach((personaje) => {
    contenidoPersonajes += `
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

  contenedorPadre.innerHTML = contenidoPersonajes;
});


