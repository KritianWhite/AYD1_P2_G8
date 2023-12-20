import React, { useState, useEffect } from "react";
import { useParams, Link  } from "react-router-dom";
import NavbarCuidador from "./NavbarCuidador.js";
import Swal from "sweetalert2";



import "./Styles/Inicio.css";

export default function SeleccionarMascota() {
  const [mascotas, setMascotas] = useState([]);
  const [precioRenta, setPrecioRenta] = useState("");




  const getLibros = async (e) => {
    fetch("http://localhost:4000/mascota/", {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log("Error:", err);
      })
      .then((response) => {
        console.log(response);
        setMascotas(response || []);
      });
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
        <div class="container">
            <a>Seleccionar mascota</a>
          <div class="row" id="perfiles">
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