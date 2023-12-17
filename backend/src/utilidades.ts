const nodemailer = require('nodemailer');
import { customAlphabet } from 'nanoid';

export  function crearTrasporte(email: string){
    const config ={
        host:'smtp.gmail.com',
        port: 587,
        auth:{
            user: "ang.geovany@gmail.com",
            pass: "dgrk toyf iyxt keyk",
        },
    }
    const codigo = generarCodigo();
    const mensaje = {
        from: "Huellita Feliz ang.geovany@gmail.com",
        to: email,
        subject: "codigo de inicio de sesion",
        text: "Este es tu codigo  para iniciar sesion:"+ codigo ,
    }

    const transport = nodemailer.createTransport(config);
    transport.sendMail(mensaje);
    return codigo;
}

//genera el codigo de verificacion
export function generarCodigo(): string {
    const alfabeto = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let codigo = '';

    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * alfabeto.length);
        codigo += alfabeto.charAt(indice);
    }

    return codigo;
}


//corregir formato de parametro
export function corregirFormato(param: string): string {
    return param.replace('%20', ' ');
}