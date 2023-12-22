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

    }
}
const tiendaRoutes = new TientaRoutes();
export default tiendaRoutes.router;