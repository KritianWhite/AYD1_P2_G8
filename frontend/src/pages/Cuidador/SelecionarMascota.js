import React, { useState, useEffect } from "react";
import { useParams, Link  } from "react-router-dom";
import NavbarCuidador from "./NavbarCuidador.js";
import Swal from "sweetalert2";



import "./Styles/Inicio.css";
import { set } from "date-fns";

export default function SeleccionarMascota() {
  const [mascotas, setMascotas] = useState([]);
  const [precioRenta, setPrecioRenta] = useState("");
  const [idmascota, setIdmascota] = useState("");

  const handleAtender = async (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        html: `<p>Ingresa la fecha de devolución:</p>
              <input type="date" id="fecha-devolucion" name="fecha">`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sí, atender.",
        cancelButtonText: "Cancelar.",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const user = localStorage.getItem("correo").replace(/"/g, "");
          fetch(`http://localhost:4000/mascota/atender/${user}/${idmascota}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fecha_devolucion: document.getElementById("fecha-devolucion").value,
            }),
          })
            .then((res) => res.json())
            .catch((err) => {
              console.log("Error:", err);
            })
            .then((response) => {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "¡Rentado con éxito! Podrás encontrar el libro en tu biblioteca.",
              });
              //window.location.reload();
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El libro no se ha rentado. ¡Sigue disfrutando de nuestra biblioteca!",
            icon: "error",
          });
        }
      });
  };
  
  


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
        setIdmascota(response.id_mascota)
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
                    <button className="btn-acciones" onClick={handleAtender}>
                        <a>
                            <i class="fa-solid fa-heart"></i>
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