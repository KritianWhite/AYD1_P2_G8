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
        this.router.post('/hospedar/:email/:id_mascota', mascotaController.HospedarMascota); 
        this.router.post('/atender/:email/:id_mascota', mascotaController.AtenderMascota); 
        this.router.get('/ver_estado/:email/:id_mascota', mascotaController.VerEstadoMascota);
        this.router.post('/actulizar_estado/:email/:id_mascota', mascotaController.ActulizarEstado);
        this.router.get('/mascota_cuidador/:email', mascotaController.ListaMascotaCuidador);
        


    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;