import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import ImageComponent from "../components/ImageComponent";

import "./Styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [codigo, setCodigo] = useState("");
  const [step, setStep] = useState(2);

  const handleStepSubmit = async (e) => {
    e.preventDefault();

    if (step === 2) {
      // Lógica para verificar el correo (puedes hacer una llamada a la API si es necesario)
      // Simulación de lógica para verificar el correo
      fetch(`http://localhost:4000/usuario/verificacion/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if (response.verificacion == 0) {
            console.log("Success email:", response.verificacion);
            setStep(0); // Ir al siguiente paso (ingreso de código de verificación)
          }else if (response.verificacion == 1) {
            console.log("Success email:", response.verificacion);
            setStep(1); // Ir al siguiente paso (ingreso de contraseña)
          }
           else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Usuario no encontrado.",
            });
          }
        });
    } else if (step === 0) {
      // Lógica para verificar el código de verificación
      // Simulación de lógica para verificar el código de verificación

      fetch(`http://localhost:4000/usuario/codigo/${username}`, {
        method: "POST",
        body: JSON.stringify({
          password: codigo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          if(response.status == 200){
            console.log("Success code:", response);
          }
        });


      // const isVerificationCodeValid = true; // Reemplaza esto con tu lógica real

      // if (isVerificationCodeValid) {
      //   setStep(1); // Ir al siguiente paso (ingreso de contraseña)
      // } else {
      //   // Lógica para manejar el código de verificación incorrecto
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "Código de verificación incorrecto",
      //   });
      // }
    } else if (step === 1) {
      // Lógica para verificar la contraseña
      // Simulación de lógica para verificar la contraseña  

      fetch(`http://localhost:4000/usuario/login/${username}`, {
        method: "POST",
        body: JSON.stringify({
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          console.log("Success password:", response);
          if (response.rol == "cliente"){
            localStorage.setItem("correo", response.email);
            window.location.href = "/verperfil";
          }
        });




      // const isPasswordValid = true; // Reemplaza esto con tu lógica real

      // if (isPasswordValid) {
      //   // Lógica para iniciar sesión
      //   Swal.fire({
      //     icon: "success",
      //     title: "¡Inicio de sesión exitoso!",
      //   });
      // } else {
      //   // Lógica para manejar la contraseña incorrecta
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "Contraseña incorrecta",
      //   });
      // }
    }
  };

  const handleInputChange = (event) => {
    if (step === 2) {
      setUsername(event.target.value);
    } else if (step === 0) {
      // Puedes manejar el cambio en el código de verificación si es necesario
      setCodigo(event.target.value);
    } else if (step === 1) {
      setPassword(event.target.value);
    }
  };


  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="login-container">
      <form onSubmit={handleStepSubmit} className="login-form">
        <ImageComponent />
        {step === 2 && (
          <>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleInputChange}
              required
              placeholder="Ingrese su correo"
            />
            <button type="submit">Siguiente</button>
          </>
        )}
        {step === 0 && (
          <>
            <input
              type="text"
              id="verificationCode"
              value={codigo}
              onChange={handleInputChange}
              required
              placeholder="Ingrese su código de verificación"
            />
            <button type="submit">Siguiente</button>
          </>
        )}
        {step === 1 && (
          <>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange}
              required
              placeholder="Ingrese su contraseña"
            />
            <button type="submit">Iniciar sesión</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
