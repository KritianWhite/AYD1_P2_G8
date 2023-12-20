import React, { useState, useEffect } from "react";
import NavbarCuidador from "./NavbarCuidador.js";
import "./Styles/MisLibros.css";

export default function AtenderMascota() {
  const [mascotas, setMascotas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    return fecha.toISOString().substring(0, 10);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = { ...selectedOptions, [index]: e.target.value };
    setSelectedOptions(newOptions);
  };

  const handleSaveOption = (index) => {
    // Aquí puedes usar la opción seleccionada (selectedOptions[index]) como desees
    console.log(`Opción seleccionada para mascota ${index}:`, selectedOptions[index]);
  };

  useEffect(() => {
    if (localStorage.getItem("correo") == null) {
      console.log("No hay usuario");
      window.location.href = "http://localhost:3000/";
    } else {
      const user = localStorage.getItem("correo").replace(/"/g, "");
      fetch(`http://localhost:4000/usuario/cuidador_mascota/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log("Error:", err);
        })
        .then((response) => {
         // console.log("Respuesta de mascotas:", response);
          setMascotas(response);
        });
    }
  }, []);

  return (
    <>
      <NavbarCuidador />
      <div className="container">
        {mascotas.map((mascota, index) => (
          <div key={index} className="card-mislibros">
            <img src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg" alt="Mascota" />
            <h3>{mascota.nombre}</h3>
            <p>Especie: {mascota.especie}</p>
            <p>Raza: {mascota.raza}</p>
            <p>Edad: {mascota.edad}</p>

            {/* Agregar el cuadro de opciones (select) */}
            <select value={selectedOptions[index] || ""} onChange={(e) => handleOptionChange(index, e)}>
              <option value="">Seleccionar actividad</option>
              <option value="comiendo">Comiendo</option>
              <option value="paseando">Paseando</option>
              <option value="bañando">Bañando</option>
              <option value="tomando-siesta">Tomando la siesta</option>
              <option value="jugando">Jugando</option>
            </select>

            {/* Botón para guardar la opción seleccionada */}
            <button onClick={() => handleSaveOption(index)}>Guardar</button>
          </div>
        ))}
      </div>
    </>
  );
}
