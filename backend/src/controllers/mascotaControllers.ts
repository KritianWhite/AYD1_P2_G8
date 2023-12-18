import {Request, Response} from 'express';
import pool from "../database";
import { corregirFormato, crearTrasporte} from '../utilidades';

class MascotaController{
    //GET - Devuelve la lista de todas las mascotas
    public async ListaMascota(req: Request, res: Response): Promise<void> {
        try {
            // Realiza la consulta 
            pool.query('SELECT * FROM MASCOTA', (error, results) => {
                // Verifica si hay resultados
                if (results && results.length > 0) {
                    res.json(results);
                } else {
                    res.json({message: "No se encontraron mascotas"}); // Enviar un JSON vacío 
                }
            });
        } catch (error) {
           // console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener las mascotas' });
        }
    }

     // get - ver perfil de la mascota
     public async VerPerfil(req: Request, res: Response): Promise<void>{
        try {
            const nombre  = corregirFormato(req.params.nombre);
            // Realiza la consulta 
            pool.query('SELECT * FROM MASCOTA WHERE nombre = ?',[nombre], (error, results) => {
                // Verifica si hay resultados
                if (results && results.length > 0) {
                    res.json(results[0]);
                }else{
                    res.status(500).json({ message: 'Error el perfil de la mascota' });        
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error el perfil de la mascota' });        
        }
    }
 
     // post - registrar mascota
     public async RegistrarMascota(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            pool.query('SELECT id_cliente FROM CLIENTE WHERE email = ?',[email], (error, results) => {
                // Verifica si hay resultados
                if (results && results.length > 0) {
                    req.body.id_cliente=results[0].id_cliente;
                    pool.query('INSERT INTO MASCOTA SET ?', [req.body]);
                    res.json({ message: 'Mascota registrada' });
                }else{
                    res.status(500).json({ message: 'Error el perfil de la mascota' });        
                }
            });
        } catch (error) {
           // console.error('Error en el proceso de registro de usuario:', error);
            res.status(500).json({ message: 'Error en el proceso de registro de usuario' });
        }
    }

    // POST - hospedar una mascota
    public async HospedarMascota(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            const nombre  = corregirFormato(req.params.nombre);
            // Realiza la consulta 
            pool.query('SELECT id_mascota FROM MASCOTA WHERE nombre = ?',[nombre], (error, mascota) => {
                pool.query('SELECT id_cuidador FROM CUIDADOR WHERE email = ?',[email], (error, cuidador) => {
                    console.log(mascota[0])
                    if (mascota && cuidador ) {
                        req.body.id_mascota=mascota[0].id_mascota
                        req.body.id_cuidador=cuidador[0].id_cuidador
                        req.body.estado="recien ingresado"
                        pool.query('INSERT INTO ATENCION SET ?',[req.body]);
                    }else{
                        res.status(500).json({ message: 'Error al realizar el hospedaje' });            
                    }
                });
            });
            
           
           
        } catch (error) {
            res.status(500).json({ message: 'Error al realizar el hospedaje' });        
        }
    }

}

export const mascotaController = new MascotaController();