import React, { useState, useEffect } from "react";
import NavbarCuidador from "./NavbarCuidador.js";
import "./Styles/MisLibros.css";
import { set } from "date-fns";
import Swal from "sweetalert2";


function convertImageToBase64(image) {
  return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onloadend = () => resolve(reader.result.split(',')[1]);
     reader.onerror = reject;
     reader.readAsDataURL(image);
  });
}

export default function AtenderMascota() {
  const [mascotas, setMascotas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [idmascota, setIdMascota] = useState(0);

  const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    return fecha.toISOString().substring(0, 10);
  };

  const handleEliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estás seguro que deseas eliminar este producto?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/tienda/eliminar/${id}`, {
          method: "GET",
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
                title: "Producto eliminado exitosamente",
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
    });
  };
  

  const handleCrearPerfil = async () => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "CREAR NUEVO PRODUCTO   ",
        html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre del producto">
            <input id="swal-descripcion" class="swal2-input" placeholder="Descripcion">
            <input id="swal-precio" class="swal2-input" placeholder="Precio">
            <input id="swal-cantidad" class="swal2-input" placeholder="Cantidad disponible">
            <input id="swal-imagen" type="file" class="swal2-input" accept="image/*" placeholder="Seleccionar imagen">

        `,
        icon: "info",
        cancelButtonText: "Cancelar", // Texto del botón de cancelar
        confirmButtonText: "Agregar", // Texto del botón de aceptar
        showCancelButton: true, // mostrar botón de cancelar
        focusConfirm: false,
        allowOutsideClick: false, // Evita que el usuario haga clic fuera del formulario para cerrar la alerta
        allowEscapeKey: true, // Permite que el usuario cierre la alerta con la tecla Esc

        preConfirm: async () => {
          const nombre = document.getElementById("swal-nombre").value;
          const descripcion = document.getElementById("swal-descripcion").value;
          const precio = document.getElementById("swal-precio").value;
          const cantidad = document.getElementById("swal-cantidad").value;
          const imagenInput = document.getElementById("swal-imagen");
          
          // Obtener el archivo de imagen
          const imagen = imagenInput.files[0];
          
          // Convertir la imagen a base64
          const base64Image = await convertImageToBase64(imagen);
          //console.log(base64Image);
          
       
          return {
            imagen: base64Image,
            nombre,
            descripcion,
            precio,
            cantidad
          };
       },
      });
      if (formValues) {
        console.log("Formulario", formValues);
        const user = localStorage.getItem("correo").replace(/"/g, "");
        fetch(`http://localhost:4000/tienda/registrar/${user}`, {
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

  useEffect(() => {
    if (localStorage.getItem("correo") == null) {
      console.log("No hay usuario");
      window.location.href = "http://localhost:3000/";
    } else {
      const user = localStorage.getItem("correo").replace(/"/g, "");
      fetch(`http://localhost:4000/tienda`, {
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
            <p>Descripcion: {mascota.descripcion}</p>
            <p>Cantidad: {mascota.cantidad_disponible}</p>
            <p>Precio: {mascota.precio}</p>
            {/* Botón para guardar la opción seleccionada */}
            <button onClick={() => handleEliminarProducto(mascota.id_producto)}>Eliminar producto</button>
            <button >Editar producto</button>
          </div>
        ))}
      </div>
    </>
  );
}
