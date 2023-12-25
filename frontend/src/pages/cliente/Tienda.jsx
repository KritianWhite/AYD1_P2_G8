import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Navbar from "./Navbar";
import Item from "./Components/Item";
import Carrito from "./Components/Carrito";

import "./Styles/Tienda.css";

const Tienda = () => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  let [items, setItems] = useState([]);

  const addToCart = (item) => {
    setCarrito([...carrito, item]);
  };

  const removeFromCart = (item) => {
    const updatedCarrito = carrito.filter((cartItem) => cartItem !== item);
    setCarrito(updatedCarrito);
  };

  const toggleMostrarCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  const cancelarCompra = () => {
    setCarrito([]); // Limpiar el carrito al cancelar la compra
    //setMostrarCarrito(false); // Opcional: ocultar el carrito al cancelar
  };

  useEffect(() => {
    fetch(`http://localhost:4000/tienda/`, {
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
          setItems(response);
        } else {
        
          let itemsaux = [
            {
              id: 1,
              nombre: "Producto 1",
              descripcion: "Descripción del Producto 1",
              precio: 20,
            },
            {
              id: 2,
              nombre: "Producto 2",
              descripcion: "Descripción del Producto 2",
              precio: 30,
            },
            // Agrega más productos según sea necesario
          ];
          setItems(itemsaux);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error inesperado, intentelo de nuevo.",
          });
        }
      });
  }, [carrito]);

  return (
    <>
      <Navbar />
      <div className="tienda">
        <h1>Mi Tienda</h1>
        <button
          className="button-mostrar-carrito btn btn-info"
          onClick={toggleMostrarCarrito}
        >
          {mostrarCarrito ? "Ocultar Carrito" : "Mostrar Carrito"}
        </button>
        {!mostrarCarrito && (
          <div className="items-container">
            {items.map((item) => (
              <Item key={item.id_producto} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        )}

        {mostrarCarrito && (
          <Carrito
            carrito={carrito}
            onRemoveFromCart={removeFromCart}
            onCancel={cancelarCompra}
          />
        )}
      </div>
    </>
  );
};

export default Tienda;
