import React from "react";

const Item = ({ item, onAddToCart, onRemoveFromCart }) => {
  return (
    <div className="item-card">
      <img src="https://cdn.pixabay.com/photo/2016/09/16/19/19/online-store-1674907_960_720.png" />
      <h3>{item.nombre}</h3>
      <p>{item.descripcion}</p>
      <p>Cantidad disponible: {item.cantidad_disponible}</p>
      <p>Precio: Q{item.precio}</p>
      <button onClick={() => onAddToCart(item)}>Agregar al carrito</button>
    </div>
  );
};

export default Item;
