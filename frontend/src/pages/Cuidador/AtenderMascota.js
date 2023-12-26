import React, { useState, useEffect } from "react";
import NavbarCuidador from "./NavbarCuidador.js";
import "./Styles/MisLibros.css";
import { set } from "date-fns";
import Swal from "sweetalert2";

export default function AtenderMascota() {
  const [mascotas, setMascotas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [idmascota, setIdMascota] = useState(0);

  const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    return fecha.toISOString().substring(0, 10);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = { ...selectedOptions, [index]: e.target.value };
    setSelectedOptions(newOptions);

    
  };

  const handleSaveOption = (index) => {
    console.log("Opción seleccionada para mascota", index, ":", selectedOptions[index]);
    // Aquí puedes usar la opción seleccionada (selectedOptions[index]) como desees
    console.log(`ID de mascota ${index}:`, mascotas[index].id_mascota);

    const idmascota2 = mascotas[index].id_mascota;

    const opcion = selectedOptions[index];
    console.log("Opción:", opcion);

    // Aquí puedes hacer una llamada a la API para guardar la opción seleccionada
    const user = localStorage.getItem("correo").replace(/"/g, "");
    fetch(`http://localhost:4000/mascota/actulizar_estado/${user}/${idmascota2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado: opcion,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error:", err);
      })
      .then((response) => {
        Swal.fire({ icon: "success", title: "¡Estado actualizado!", text: "El estado de la mascota ha sido actualizado." });
        window.location.reload();
      });
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
         console.log("Respuesta de mascotas:", response);
          setMascotas(response);
          setIdMascota(response.id_mascota);
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
            <p>Estado: {mascota.estado}</p>

            {/* Agregar el cuadro de opciones (select) */}
            <select value={selectedOptions[index] || ""} onChange={(e) => handleOptionChange(index, e)}>
              <option value="">Seleccionar actividad</option>
              <option value="Comiendo">Comiendo</option>
              <option value="Paseando">Paseando</option>
              <option value="Bañando">Bañando</option>
              <option value="Tomando Siesta">Tomando la siesta</option>
              <option value="Jugando">Jugando</option>
            </select>

            {/* Botón para guardar la opción seleccionada */}
            <button onClick={() => handleSaveOption(index)}>Guardar</button>
            <button >Devolver</button>

          </div>
        ))}
      </div>
    </>
  );
}
