import {Router} from 'express';

import {usuariosController} from '../controllers/usuariosController';

class UsuariosRoutes{
    public router: Router = Router();
    
    constructor(){      
        this.config();
    }

    config(): void {
        this.router.get('/', usuariosController.ListarUsuarios); // obtiene la lista de todos los usuarios
        this.router.post('/login/:email', usuariosController.Login); // login
        this.router.post('/registrar/', usuariosController.RegistrarUsuario); // registrar
        this.router.get('/verperfil/:email', usuariosController.VerPerfil); // ver perfil
        this.router.post('/cambiarpass/:email', usuariosController.CambiarPass); // cambiar contraseña
        this.router.post('/actulizarusuario/:email', usuariosController.ModificarDatos); // cambiar contraseña




    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;