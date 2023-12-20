import {Request, Response} from 'express';
import pool from "../database";
import { corregirFormato, crearTrasporte} from '../utilidades';

class MascotaController{
    //GET - Devuelve la lista de todas las mascotas
    public async ListaMascota(req: Request, res: Response): Promise<void> {
        try {
            // Realiza la consulta 
            pool.query('SELECT * FROM HOSPEDAR JOIN MASCOTA ON HOSPEDAR.id_mascota = MASCOTA.id_mascota;', (error, results) => {
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
            const id_mascota  = corregirFormato(req.params.id_mascota);
            // Realiza la consulta 
            pool.query('SELECT id_cuidador FROM CUIDADOR WHERE email = ?',[email], (error, cuidador) => {
                if (cuidador ) {
                    req.body.id_mascota=id_mascota
                    req.body.id_cuidador=cuidador[0].id_cuidador
                    req.body.estado="ingresado"
                    pool.query('INSERT INTO HOSPEDAR SET ?',[req.body]);
                }else{
                    res.status(500).json({ message: 'Error al realizar el hospedaje' });            
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al realizar el hospedaje' });        
        }
    }

    // POST - atender mascota
    public async AtenderMascota(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            const id_mascota  = corregirFormato(req.params.id_mascota);
            // Realiza la consulta 
            pool.query('SELECT id_cuidador FROM CUIDADOR WHERE email = ?',[email], (error, cuidador) => {
                if (cuidador ) {
                    req.body.id_mascota=id_mascota
                    req.body.id_cuidador=cuidador[0].id_cuidador
                    req.body.estado="ingresado"
                    pool.query('INSERT INTO ATENDER SET ?',[req.body]);
                }else{
                    res.status(500).json({ message: 'Error al realizar la atencion' });            
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al realizar el hospedaje' });        
        }
    }

       // GET - ver estado de la mascota atendida
       public async VerEstadoMascota(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            const id_mascota  = corregirFormato(req.params.id_mascota);
            // Realiza la consulta 
            pool.query('Select estado from atencion where id_mascota = ? and id_cuidador = (select id_cuidador from cuidador where email = ? )',[id_mascota,email], (error, results) => {
                if (results &&results.length>0 ) {
                    res.json(results[0])
                }else{
                    res.status(500).json({ message: 'No se encontro la mascota para observar el estado' });            
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'No se encontro la mascota para observar el estado' });        
        }
    }

    // post - actuliza el estado de la mascota atendida
    public async ActulizarEstado(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            const id_mascota  = corregirFormato(req.params.id_mascota);
            // Realiza la consulta 
            pool.query('UPDATE ATENCION SET estado = ? WHERE id_mascota = ? and id_cuidador = (select id_cuidador from CUIDADOR where email = ? )',[req.body.estado,id_mascota,email], (error, results) => {
                res.json({ message: 'Se actulizo el estado' })
            });
        } catch (error) {
            res.status(500).json({ message: 'No se encontro la mascota para actulizar el estado' });        
        }
    }

    //GET - Devuelve la lista de todas las mascotas que esta atendiendo el cuidador
    public async ListaMascotaCuidador(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            pool.query('SELECT CUIDADOR.NOMBRE AS NombreCuidador, MASCOTA.*, ATENCION.fecha_devolucion, ATENCION.estado FROM ATENCION  JOIN CUIDADOR ON ATENCION.id_cuidador = CUIDADOR.id_cuidador JOIN MASCOTA ON ATENCION.id_mascota = MASCOTA.id_mascota WHERE CUIDADOR.email = ?',[email], (error, results) => {
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
    


}

export const mascotaController = new MascotaController();