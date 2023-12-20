import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarCuidador from "./NavbarCuidador.js";
import Swal from "sweetalert2";

import "./Styles/Inicio.css";
import { set } from "date-fns";

export default function SeleccionarMascota() {
  const [mascotas, setMascotas] = useState([]);

  const getLibros = async () => {
    try {
      const response = await fetch("http://localhost:4000/mascota/", {
        method: "GET",
      });
      const data = await response.json();
      //console.log("Respuesta de mascotas:", data);
      setMascotas(data || []);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleAtender = async (idmascota) => {
    //console.log("Atender mascota con ID:", idmascota);
    const user = localStorage.getItem("correo").replace(/"/g, "");
    try {
      const response = await fetch(`http://localhost:4000/mascota/atender/${user}/${idmascota}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });
      const data = await response.json();
      //console.log("Respuesta de atender:", data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("correo");
    if (user == null) {
      window.location.href = "http://localhost:3000/";
    } else {
      getLibros();
    }
  }, []);

  return (
    <>
      <NavbarCuidador />
      <div id="mostrar-usuarios">
        <div className="container">
          <a>Seleccionar mascota</a>
          <div className="row" id="perfiles">
            {mascotas.map((mascota, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="our-team">
                  <div className="pic">
                    <Link to={`/libro/${mascota.nombre}`}>
                      <img
                        src="https://img2.wallspic.com/previews/2/9/0/4/6/164092/164092-samsung_galaxy-samsung-smartphone-water-liquid-x750.jpg"
                        alt={`Portada de ${mascota.nombre}`}
                      />
                    </Link>
                  </div>
                  <h3 className="title">{mascota.nombre}</h3>
                  <p className="post">Especie: {mascota.especie}</p>
                  <p className="post">Raza: {mascota.raza}</p>
                  <p className="post">Edad: {mascota.edad}</p>
                  <p className="post">Contacto veterinario: {mascota.contacto_veterinario}</p>
                  <ul className="social">
                    <li>
                      <button className="btn-acciones" onClick={() => handleAtender(mascota.id_mascota)}>
                        <a>
                          <i className="fa-solid fa-heart"></i>
                        </a>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
