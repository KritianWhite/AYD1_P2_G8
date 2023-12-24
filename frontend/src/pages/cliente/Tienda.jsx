import React, { useState } from "react";

import Navbar from "./Navbar";
import Item from "./Components/Item";
import Carrito from "./Components/Carrito";

import "./Styles/Tienda.css";

const Tienda = () => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const items = [
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
              <Item
                key={item.id}
                item={item}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}

        {mostrarCarrito && (
          <Carrito carrito={carrito} onRemoveFromCart={removeFromCart} onCancel={cancelarCompra} />
        )}
      </div>
    </>
  );
};

export default Tienda;
