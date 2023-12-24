import React from "react";

const Carrito = ({ carrito, onRemoveFromCart, onCancel }) => {
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio, 0);
  };

  return (
    <div className="carrito">
      <h2>Carrito</h2>
      {carrito.map((item, index) => (
        <div key={index} className="carrito-item">
          <div className="carrito-item-details">
            <p>{item.nombre}</p>
            <p>Precio: Q{item.precio}</p>
          </div>
          <button class="btn btn-danger" onClick={() => onRemoveFromCart(item)}>Eliminar</button>
        </div>
      ))}
      <div className="carrito-total">
        <p>Total: Q{calcularTotal()}</p>
      <button class="btn btn-success" onClick={onCancel}>Pagar compra</button>
      </div>
    </div>
  );
};

export default Carrito;
