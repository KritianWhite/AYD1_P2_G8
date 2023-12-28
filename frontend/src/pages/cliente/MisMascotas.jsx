import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Navbar from "./Navbar.jsx";

import "./Styles/MisMascotas.css";

export default function MisMascotas() {
  const [showRecogerButton, setShowRecogerButton] = useState(true);

  const [mascotas, setMascotas] = useState([
    {
      id_mascota: 1,
      nombre: "Max",
      edad: 3,
      especie: "Perro",
      raza: "Labrador",
      comportamiento: "Juguetón",
      contacto_veterinario: 12345678,
      comentario: "Es un perro activo y amigable",
      id_cliente: 1,
      nombre_cliente: "Juan",
    },
  ]);

  const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    return fecha.toISOString().substring(0, 10);
  };

  const handleHospedar = (nombre) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: `¿Seguro que quieres hospedar tu mascota?`,
        html: `<p>Ingresa la fecha de devolución:</p>
                <input type="date" id="fecha-devolucion" name="fecha">`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, hospedar.",
        cancelButtonText: "Cancelar.",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const user = localStorage.getItem("correo").replace(/"/g, "");
          fetch(`http://localhost:4000/mascota/hospedar/${user}/${nombre}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fecha_devolucion:
                document.getElementById("fecha-devolucion").value,
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
                title: "¡Tu mascota ha sido hospedada!",
              });
              //window.location.reload();
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Tu mascota no ha sido hospedada.",
            icon: "error",
          });
        }
      });
  };

  const handleRecoger = (nombre) => {
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
      title: "¡Tu mascota ha sido recogida!",
    });

    // Ocultar el botón de recoger
    setShowRecogerButton(false);
  };

  useEffect(() => {
    if (localStorage.getItem("correo") === null) {
      window.location.href = "/";
    } else {
      const user = localStorage.getItem("correo");
      fetch(`http://localhost:4000/usuario/cliente_mascotas/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((response) => {
          console.log(response);
          setMascotas(response);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div class="container">
        {mascotas.map((mascota, index) => (
          <div key={index} class="card-mislibros">
            <img src="https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <h3>{mascota.nombre}</h3>
            <p>Raza: {mascota.raza}</p>
            <p>Comportamiento: {mascota.comportamiento}</p>
            <p>Edad: {mascota.edad}</p>
            <h6>{mascota.comentario}</h6>
            <ul className="social">
              <li>
                <a href="#" onClick={(e) => handleHospedar(mascota.nombre)}>
                  <i class="fas fa-house"></i>
                </a>
              </li>
              <li>
                <a>
                  <i>Estado: {mascota.estado_mascota}</i>
                </a>
              </li>
            </ul>
            {mascota.estado_mascota === "listo para recoger" && showRecogerButton && (
              <button
                class="btn-sucess"
                onClick={(e) => handleRecoger(mascota.id_mascota)}
              >
                Recoger mascota
              </button>
            )}
          </div>
        ))}

        {/* <div class="card-mislibros">
          <img src="https://images.unsplash.com/photo-1593134257782-e89567b7718a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <h3>HOLA H3</h3>
          <p>Tipo de adquisición: </p>
          <p>Fecha de devolución:</p>
        </div> */}
      </div>
    </>
  );
}
