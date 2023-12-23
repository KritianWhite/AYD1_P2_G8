import {Router} from 'express';

import {tiendaControllers} from '../controllers/tiendaControllers';

class TientaRoutes{
    public router: Router = Router();
    
    constructor(){      
        this.config();
    }

    config(): void {
        this.router.get('/', tiendaControllers.ListaProductos); //GET - Devuleve todos los productos de todos los cuidadores
        this.router.get('/:email', tiendaControllers.ListaProductosCuidador); //GET - devolver todos los productos de un cuidador por email
        this.router.get('/producto/:id_producto', tiendaControllers.Producto); //GET - devolver el producto por id
        this.router.post('/registrar/:email', tiendaControllers.InsertarProducto); // POST - Insertar un producto de un cuidador
        this.router.post('/actulizar/:id_producto', tiendaControllers.ActulizarProducto); //POST - actilizar los datos del producto
        this.router.get('/eliminar/:id_producto', tiendaControllers.EliminarProducto); //GET - eliminar un producto por su id_producto
    }
}
const tiendaRoutes = new TientaRoutes();
export default tiendaRoutes.router;