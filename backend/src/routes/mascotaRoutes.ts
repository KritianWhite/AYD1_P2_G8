import {Router} from 'express';

import {mascotaController} from '../controllers/mascotaControllers';

class UsuariosRoutes{
    public router: Router = Router();
    
    constructor(){      
        this.config();
    }

    config(): void {
        this.router.get('/', mascotaController.ListaMascota); // obtiene la lista de todos las mascotas hospedadas
        this.router.get('/verperfil/:nombre', mascotaController.VerPerfil); // obtiene la lista de todos las mascotas hospedadas
        this.router.post('/registrar/:email', mascotaController.RegistrarMascota); 
        this.router.post('/hospedar/:email/:nombre', mascotaController.HospedarMascota); 
        
        


    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;