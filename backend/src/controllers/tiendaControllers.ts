import {Request, Response} from 'express';
import pool from '../database'; // conexion base de datos
import { corregirFormato, crearTrasporte} from '../utilidades';
class TiendaControllers{

    //GET - Devuleve todos los productos de todos los cuidadores
    public async ListaProductos(req: Request, res: Response): Promise<void> {
        try {
            // Realiza la consulta 
            pool.query('SELECT * FROM producto', (error, results) => {
                if (results && results.length > 0) {
                    res.json(results);
                } else {
                    res.json({message: "No se encontraron productos"});
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }

    //GET - devolver todos los productos de un cuidador por email
    public async ListaProductosCuidador(req: Request, res: Response): Promise<void> {
        try {
            // Realiza la consulta 
            const email  = corregirFormato(req.params.email);
            pool.query('SELECT * FROM producto where id_cuidador = (select id_cuidador from cuidador where email = ?)',[email], (error, results) => {
                if (results && results.length > 0) {
                    res.json(results);
                } else {
                    res.json({message: "No se encontraron productos del cuidador"});
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos del cuidador' });
        }
    }
    
    // POST - Insertar un producto de un cuidador
    public async InsertarProducto(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            // Realiza la consulta 
            pool.query('SELECT id_cuidador FROM CUIDADOR WHERE email = ?',[email], (error, results) => {
                if (results && results.length>0 ) {
                    req.body.id_cuidador=results[0].id_cuidador
                    pool.query('INSERT INTO PRODUCTO SET ?',[req.body]);
                    res.json({ message: 'Se registro el producto con exito' });
                }else{
                    res.status(500).json({ message: 'Error al realizar el registro de producto' });            
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al realizar el registro de producto' });        
        }
    }
    //actilizar datos del producto
    //actulizar precio de venta
    //actilizar la cantidad disponible
    //eliminar producto
    //comprar producto (cliente)

}

export const tiendaControllers = new TiendaControllers();
