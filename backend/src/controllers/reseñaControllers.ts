import {Request, Response} from 'express';
import pool from '../database'; // conexion base de datos
import { corregirFormato, crearTrasporte} from '../utilidades';
class ReseñaControllers{

    //POST - Realizar una reseña al cuidador
    public async InsertReseñaCuidador(req: Request, res: Response): Promise<void>{
        try {
            const email_cliente  = corregirFormato(req.params.email_cliente);
            const email_cuidador  = corregirFormato(req.params.email_cuidador);
            // Realiza la consulta 
            pool.query('SELECT id_cliente FROM CLIENTE WHERE email = ?',[email_cliente], (error, results) => {
                pool.query('SELECT id_cuidador FROM CUIDADOR WHERE email = ?',[email_cuidador], (error, results2) => {
                    if (results && results.length>0 ) {
                        req.body.id_cliente=results[0].id_cliente
                        req.body.id_cuidador=results2[0].id_cuidador
                        pool.query('INSERT INTO COMENTARIO SET ?',[req.body]);
                        res.json({ message: 'Se registro el comentario con exito' });
                    }else{
                        res.status(500).json({ message: 'Error al regisrear el comentario' });            
                    }
                });
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al regisrear el comentario' });        
        }
    }

    //POST - Realizar una reseña a la plataforma
    public async InsertReseñaPlataforma(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            // Realiza la consulta 
            pool.query('SELECT id_cliente FROM CLIENTE WHERE email = ?',[email], (error, results) => {
                if (results && results.length>0 ) {
                    req.body.id_cliente=results[0].id_cliente
                    console.log(req.body)
                    pool.query('INSERT INTO CALIFICACION SET ?',[req.body]);
                    res.json({ message: 'Se registro el comentario con exito' });
                }else{
                    res.status(500).json({ message: 'Error al regisrear el comentario' });            
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al regisrear el comentario' });        
        }
    }

    //GET - retorna todas las reseñas de ese cuidador por su email
    public async ListaReseñaCuidador(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            pool.query('SELECT COM.*,CLI.nombre AS nombre_cliente,CLI.apellido AS apellido_cliente,CLI.telefono AS telefono_cliente,CLI.email AS email_cliente,CLI.fecha_nacimiento AS fecha_nacimiento_cliente,CUI.nombre AS nombre_cuidador,CUI.apellido AS apellido_cuidador,CUI.telefono AS telefono_cuidador,CUI.email AS email_cuidador,CUI.fecha_nacimiento AS fecha_nacimiento_cuidador FROM proyecto2.COMENTARIO COM JOIN proyecto2.CLIENTE CLI ON COM.id_cliente = CLI.id_cliente JOIN proyecto2.CUIDADOR CUI ON COM.id_cuidador = CUI.id_cuidador WHERE CUI.email = ?',[email], (error, results) => {
                if (results && results.length > 0) {
                    res.json(results);
                } else {
                    res.json({message: "No se encontraron reseñas del cuidador"});
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'No se encontraron reseñas del cuidador' });
        }
    }

    //GET - retorna todas las reseñas realizadas a la plataforma
    public async ListaReseñaPlataforma(req: Request, res: Response): Promise<void> {
        try {
            pool.query('SELECT CAL.*,CLI.nombre AS nombre_cliente,CLI.apellido AS apellido_cliente,CLI.telefono AS telefono_cliente,CLI.email AS email_cliente,CLI.fecha_nacimiento AS fecha_nacimiento_cliente FROM proyecto2.CALIFICACION CAL JOIN proyecto2.CLIENTE CLI ON CAL.id_cliente = CLI.id_cliente', (error, results) => {
                if (results && results.length > 0) {
                    res.json(results);
                } else {
                    res.json({message: "No se encontraron reseñas a la plataforma"});
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'No se encontraron reseñas a la plataformar' });
        }
    }

    //POST - Eliminar reseña de un cliente hecho al cuidador
    public async EliminarReseña(req: Request, res: Response):Promise<void>{
        try{
            pool.query('DELETE FROM COMENTARIO WHERE comentario = ? LIMIT 1',[req.body.comentario]);
            res.json({message: 'comentario Eliminado'});    
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el comentario' });
        }
    }
}

export const reseñaControllers = new ReseñaControllers();
