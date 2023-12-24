import {Router} from 'express';

import {reseñaControllers} from '../controllers/reseñaControllers';

class ReseñasRoutes{
    public router: Router = Router();
    
    constructor(){      
        this.config();
    }

    config(): void {
        this.router.get('/cuidador/:email', reseñaControllers.ListaReseñaCuidador);//GET - retorna todas las reseñas de ese cuidador por su email
        this.router.get('/plataforma', reseñaControllers.ListaReseñaPlataforma);//GET - retorna todas las reseñas realizadas a la plataforma
        this.router.post('/comentario_cuidador/:email_cliente/:email_cuidador', reseñaControllers.InsertReseñaCuidador);//POST - Realizar una reseña al cuidador
        this.router.post('/comentario_plataforma/:email', reseñaControllers.InsertReseñaPlataforma);//POST - Realizar una reseña a la plataforma
        this.router.post('/eliminar', reseñaControllers.EliminarReseña);//POST - Eliminar reseña de un cliente hecho al cuidador
    }
}
const reseñaRoutes = new ReseñasRoutes();
export default reseñaRoutes.router;