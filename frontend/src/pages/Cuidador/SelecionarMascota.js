import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarCuidador from "./NavbarCuidador.js";
import Swal from "sweetalert2";

import "./Styles/Inicio.css";
import { set } from "date-fns";

export default function SeleccionarMascota() {
  const [mascotas, setMascotas] = useState([]);
  const [cantidadmascotas, setCantidadMascotas] = useState(0);

  const getLibros = async () => {
    try {
      const response = await fetch("http://localhost:4000/mascota/", {
        method: "GET",
      });
      const data = await response.json();
      console.log("Respuesta de mascotas:", data);
      setMascotas(data || []);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleAtender = async (idmascota) => {
    //console.log("Atender mascota con ID:", idmascota);
    if (cantidadmascotas <2) {

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
      Window.location.reload();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mascota atendida!",
          text: "La mascota ha sido ingresada a atención.",
        });
      } else {
        // Si la respuesta no fue exitosa, mostrar un mensaje de error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al atender la mascota. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puedes atender más de 2 mascotas.",
    });
  };
  };

  useEffect(() => {
    const user = localStorage.getItem("correo");
    if (user == null) {
      window.location.href = "http://localhost:3000/";
    } else {
      const user = localStorage.getItem("correo").replace(/"/g, "");
      fetch(`http://localhost:4000/usuario/cant_mascotas_cuidador/${user}`, {
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
          //console.log("Respuesta de cantidad de mascotas:", response);
         setCantidadMascotas(response.cantidad_mascotas);
        });
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
