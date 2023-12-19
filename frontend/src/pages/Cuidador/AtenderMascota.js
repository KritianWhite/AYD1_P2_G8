import React, { useState, useEffect } from "react";

import NavbarCuidador from "./NavbarCuidador.js";

import "./Styles/MisLibros.css";

export default function AtenderMascota() {
  const [mascotas, setMascotas] = useState([]);

  const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    return fecha.toISOString().substring(0, 10);
  };

  useEffect(() => {
    fetch(
      `http://localhost:4000/usuario/cuidador_mascota/mariacuidador@email.com`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error:", err);
      })
      .then((response) => {
        console.log(response);
        //setMascotas(response);
/*         if (
          response.message !=
          "No se encontraron libros rentados/comprados por el usuario"
        ) {
          setMascotas(response);
        } else {
          setMascotas([
            {
              anio_publicacion: 2023,
              autor: "Nombre del autor",
              editorial: "Editorial",
              estado: "rentado",
              fecha_devolucion_renta: "2021-05-03T06:00:00.000Z",
              id_libro: 5,
              portada: null,
              precio_compra: 0,
              precio_venta: 0,
              sinopsis: "Sinopsis",
              titulo: "Titulo",
            },
          ]);
        } */
      });

/*     if (localStorage.getItem("usuario") == null) {
      console.log("No hay usuario");
      //window.location.href = "http://localhost:3000/";
    } else {
      //const user =  JSON.parse(localStorage.getItem("usuario")).replace(/"/g, "");
      //`http://localhost:4000/usuario/biblioteca/${user}`
      
    } */
  }, []);

  return (
    <>
      <NavbarCuidador />
      <div class="container">
        <a>Atender mascota</a>
        {mascotas.map((mascota, index) => {
          return (
            <div key={index} class="card-mislibros">
              <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" />
              <h3>{mascota.nombre}</h3>
              <p>Especie: {mascota.especie}</p>

            </div>
          );
        })}
      </div>
    </>
  );
}
