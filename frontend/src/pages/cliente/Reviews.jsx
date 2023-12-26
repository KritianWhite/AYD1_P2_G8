import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import ReviewsList from "./Components/ReviewList";
import Navbar from "./Navbar.jsx";

import "./Styles/Reviews.css";

export default function Reviews() {

    const [sampleReviews, setSampleReviews] = useState([]);

//   const sampleReviews = [
//     { author: "Usuario1", content: "Excelente producto", rating: 5 },
//     { author: "Usuario2", content: "Buen servicio al cliente", rating: 4 },
//     // Agrega más reseñas según sea necesario
//   ];

  useEffect(() => {
    // Aquí se debe hacer la petición al backend para obtener las reseñas
    fetch(`http://localhost:4000/comentario/plataforma`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if (response){
            console.log('Success:', response);
            setSampleReviews(response);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo obtener los comentarios',
            })
        }
    });
  }, []);

  return (
    <div className="container-review">
      <Navbar />
      <ReviewsList reviews={sampleReviews} />
    </div>
  );
}
