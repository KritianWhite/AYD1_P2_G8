import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {


  const handleCrearPerfil = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "CREAR PERFIL DE MASCOTA   ",
        html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre de la mascota">
            <input id="swal-edad" class="swal2-input" placeholder="Edad">
            <input id="swal-especie" class="swal2-input" placeholder="Especie">
            <input id="swal-raza" class="swal2-input" placeholder="Raza">
            <input id="swal-comportamiento" class="swal2-input" placeholder="Comportamiento">
            <input id="swal-contacto" class="swal2-input" placeholder="Contacto de veterinario">
            <input id="swal-comentario" class="swal2-input" placeholder="Comentario">
        `,
        icon: "info",
        cancelButtonText: "Cancelar", // Texto del botón de cancelar
        confirmButtonText: "Agregar", // Texto del botón de aceptar
        showCancelButton: true, // mostrar botón de cancelar
        focusConfirm: false,
        allowOutsideClick: false, // Evita que el usuario haga clic fuera del formulario para cerrar la alerta
        allowEscapeKey: true, // Permite que el usuario cierre la alerta con la tecla Esc
        preConfirm: async () => {
          return {
            nombre: document.getElementById("swal-nombre").value,
            edad: document.getElementById("swal-edad").value,
            especie: document.getElementById("swal-especie").value,
            raza: document.getElementById("swal-raza").value,
            comportamiento: document.getElementById("swal-comportamiento").value,
            contacto_veterinario: document.getElementById("swal-contacto").value,
            comentario: document.getElementById("swal-comentario").value,
          };
        },
      });
      if (formValues) {
        console.log("Formulario", formValues);
        const user = localStorage.getItem("correo").replace(/"/g, "");
        fetch(`http://localhost:4000/mascota/registrar/${user}`, {
          method: "POST",
          body: JSON.stringify(formValues),
          headers: { "Content-type": "application/json;charset=UTF-8" },
        })
          .then((res) => res.json())
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err,
            });
          })
          .then((response) => {
            //console.log( "Formulario adentro de response ",formValues)
            if (response) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              Toast.fire({
                icon: "success",
                title: "Perfil creado exitosamente",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error inesperado, intentelo de nuevo.",
              });
            }
          });
      }
      //console.log("Formulario afuera de response ",formValues)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al mostrar el formulario, intentelo denuevo más tarde.",
      });
    }
  
  }

  const handleLogout = () => {
    // Eliminar el usuario del Local Storage al hacer logout
    localStorage.removeItem('correo');
    // recargamos la pagina
    window.location.reload();
  };
  

  return (
    <>
      <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand">CLIENTE </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end text-bg-dark"
            tabindex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Menú
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" style={{cursor: 'pointer'} } onClick={handleCrearPerfil} aria-current="page">
                    Crear perfil mascota
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/tienda">
                    Tienda
                  </a>
                </li>
                
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Configuraciones
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a class="dropdown-item" href="/mismascotas">
                        Ver perfil de mis mascotas
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Action 2
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a class="dropdown-item" style={{cursor: 'pointer'} } onClick={handleLogout}>
                        Cerrar sesión
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}