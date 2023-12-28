import React from "react";
import Swal from "sweetalert2";


const handleDelete = (comment) => {
  console.log("Eliminar comentario:", comment);
  const user = localStorage.getItem("correo");
  fetch(`http://localhost:4000/comentario/eliminar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comentario: comment,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response) {
        console.log("Success:", response);
        Swal.fire({
          icon: "success",
          title: "Comentario eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo eliminar el comentario",
        });
      }
    });
}


export default function Review({ author, content, rating, onDeleteClick }) {
  return (
    <div className="review">
      <div className="review-header">
        <span className="author">{author}</span>
        <span className="separator">|</span>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < rating ? "★" : "☆"}</span>
          ))}
        </div>
        {<button className="delete-button" onClick={() => handleDelete(content)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button> }
      </div>
      <p className="review-content">{content}</p>
    </div>
  );
}
