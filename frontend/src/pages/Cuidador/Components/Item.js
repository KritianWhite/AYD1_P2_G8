import React, { useState, useEffect } from "react";

const Item = ({ item, onAddToCart, removerProducto }) => {
  const [decodedImage, setDecodedImage] = useState(null);

  useEffect(() => {
    // Función para decodificar la imagen en base64
    const decodeBase64Image = (base64String) => {
      const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches.length !== 3) {
        throw new Error("Invalid input string");
      }

      const decodedImage = Buffer.from(matches[2], "base64");

      return decodedImage;
    };

    // Decodificar la imagen cuando el componente se monta
    try {
      const decodedImageBuffer = decodeBase64Image(item.imagen);
      const decodedImageURL = URL.createObjectURL(new Blob([decodedImageBuffer]));
      setDecodedImage(decodedImageURL);
    } catch (error) {
      console.error("Error decoding image:", error);
    }

    // Limpiar la URL de la imagen cuando el componente se desmonta
    return () => {
      if (decodedImage) {
        URL.revokeObjectURL(decodedImage);
      }
    };
  }, [item.imagen]);

  return (
    <div className="item-card">
      {/* Utilizar la variable decodedImage en lugar de item.imagen */}
      <img src={decodedImage} alt={item.nombre} />
      <h3>{item.nombre}</h3>
      <p>{item.descripcion}</p>
      <p>Cantidad disponible: {item.cantidad_disponible}</p>
      <p>Precio: Q{item.precio}</p>
      <button onClick={() => onAddToCart(item)}>Actualizar Producto</button>
      <button onClick={() => removerProducto(item.id_producto)}>Eliminar producto</button>
    </div>
  );
};

export default Item;
