import {Request, Response} from 'express';
import pool from "../database";
import { corregirFormato, crearTrasporte} from '../utilidades';

class UsuariosController{
    //GET - Devuelve la lista de todos los usuarios
    public async ListarUsuarios(req: Request, res: Response): Promise<void> {
        try {
            // Realiza la consulta 
            pool.query('SELECT * FROM CLIENTE', (error, results) => {
                // Verifica si hay resultados
                if (results && results.length > 0) {
                    console.log(results)
                    res.json(results);
                } else {
                    res.json({message: "No se encontraron usuarios"}); 
                }
            });
        } catch (error) {
           // console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    }

    //GET - el email
    public async Verificacion(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            pool.query('SELECT verificacion FROM CLIENTE WHERE email = ? UNION SELECT verificacion FROM CUIDADOR WHERE email = ?',[email,email], (error, results) => {
                // Verifica si hay resultados
                if (results && results.length > 0) {
                    res.json(results[0]);
                } else {
                    res.json({message: "Error no se encontro el usuario"});
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    }

    // Post - Login
    public async Codigo(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            const { password } = req.body;
            // Realiza la consulta 
            pool.query(
                'SELECT * FROM CLIENTE WHERE email = ? AND token = ? UNION SELECT * FROM CUIDADOR WHERE email = ? AND token = ?',
                [email, password,email,password], (error, results) => {
                // Verifica si hay resultados en el array devuelto
                if (results && results.length > 0) {
                    pool.query('UPDATE CLIENTE SET verificacion = \'1\' WHERE email = ? LIMIT 1',[email]);
                    pool.query('UPDATE CUIDADOR SET verificacion = \'1\' WHERE email = ? LIMIT 1',[email]);
                    res.json(results[0]);
                } else {
                    res.status(401).json({ message: 'Usuario o codigo Incorrectos' }); 
                }
            });
        } catch (error) {
            //console.error('Error en el proceso de inicio de sesión:', error);
            res.status(500).json({ message: 'Error en el proceso de inicio de sesión' });
        }
    }

    // Post - Login
    public async Login(req: Request, res: Response): Promise<void> {
        try {
            const email  = corregirFormato(req.params.email);
            const { password } = req.body;
            // Realiza la consulta 
            pool.query(
                'SELECT * FROM CLIENTE WHERE email = ? AND passwordd = ? UNION SELECT * FROM CUIDADOR WHERE email = ? AND passwordd = ?;',
                [email, password,email,password], (error, results) => {
                // Verifica si hay resultados en el array devuelto
                if (results && results.length > 0) {
                    res.json(results[0]);
                } else {
                    res.status(401).json({ message: 'Usuario o Contraseña Incorrectos' }); 
                }
            });
        } catch (error) {
            //console.error('Error en el proceso de inicio de sesión:', error);
            res.status(500).json({ message: 'Error en el proceso de inicio de sesión' });
        }
    }

    // post - registrar usuario
    public async RegistrarUsuario(req: Request, res: Response): Promise<void> {
        try {
            const  email  = req.body.email;
            const  rol  = req.body.rol;
            pool.query(
                'SELECT * FROM CLIENTE WHERE email = ? UNION SELECT * FROM CLIENTE WHERE email = ?', 
                [email,email], (error, results) => {
                // Verifica si no hay resultados 
                if (!(results.length > 0)) {
                    const codigo = crearTrasporte(email);//envio del correo 
                    console.log(codigo)
                    var queryInsert = ''
                    var queryupdate = ''
                    if (rol == 'cliente') {
                        queryInsert = 'INSERT INTO CLIENTE SET ?';
                        queryupdate='UPDATE CLIENTE SET token = ? WHERE email = ? LIMIT 1';
                    } else if (rol == 'cuidador') {
                        queryInsert = 'INSERT INTO CUIDADOR SET ?';
                        queryupdate='UPDATE CUIDADOR SET token = ? WHERE email = ? LIMIT 1';
                    }
                    if (queryInsert !=''){
                        pool.query(queryInsert, [req.body], (error, results) => {
                            pool.query(queryupdate, [codigo,req.body.email]);
                        });
                        res.json({ message: 'Usuario Creado' })
                    }else{
                        res.status(500).json({ message: 'Error en el proceso de registro de usuario' });            
                    }
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error en el proceso de registro de usuario' });
        }
    }

    //GET - VER PERFIL
    public async VerPerfil(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            pool.query('SELECT * FROM CLIENTE WHERE email = ? UNION SELECT * FROM CUIDADOR WHERE email = ?',[email,email], (error, results) => {
                // Verifica si hay resultados
                if (results.length > 0) {
                    res.json(results[0]);
                }else{
                    res.status(500).json({ message: 'Error al obtener informacion del usuario' });        
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener informacion del usuario' });
        }
    }

    //POST - cambiar contraseña
    public async CambiarPass(req: Request, res: Response):Promise<void>{
        try{
            const email  = corregirFormato(req.params.email);
            pool.query('UPDATE CLIENTE SET passwordd = ? WHERE email = ? LIMIT 1',[req.body.password, email]);
            pool.query('UPDATE CUIDADOR SET passwordd = ? WHERE email = ? LIMIT 1',[req.body.password, email]);
            res.json({message: 'Contraseña Actualizada'});    
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    }

    public async ModificarDatos(req: Request,res: Response):Promise<void>{
        try{
            const email  = corregirFormato(req.params.email);
            pool.query('UPDATE CLIENTE SET ? WHERE email = ?',[req.body, email]);
            pool.query('UPDATE CUIDADOR SET ? WHERE email = ?',[req.body, email]);
            res.json({message: 'Datos Actualizados'});
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    }

        // GET - retornar todas las mascotas del cliente
    public async MacotasCliente(req: Request, res: Response): Promise<void>{
        try {
            const email  = corregirFormato(req.params.email);
            // Realiza la consulta 
            pool.query('SELECT M.*, C.nombre AS nombre_cliente FROM proyecto2.CLIENTE C JOIN proyecto2.MASCOTA M ON C.id_cliente = M.id_cliente WHERE C.email = ? ',[email], (error, results) => {
                if (results && results.length>0 ) {
                    res.json(results);
                }else{
                    res.status(500).json({ message: 'El cliente no tiene ninguna mascota hospedada' });            
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al realizar el hospedaje' });        
        }
    }

        // GET - retornar todas las mascotas que tiene el cuidador
        public async MascotaCuidador(req: Request, res: Response): Promise<void>{
            try {
                const email  = corregirFormato(req.params.email);
                // Realiza la consulta 
                pool.query('SELECT M.*, Cu.nombre AS nombre_cuidador FROM proyecto2.CUIDADOR Cu JOIN proyecto2.ATENCION A ON Cu.id_cuidador = A.id_cuidador JOIN proyecto2.MASCOTA M ON A.id_mascota = M.id_mascota WHERE Cu.email = ?',[email], (error, results) => {
                    if (results && results.length>0 ) {
                        res.json(results);
                    }else{
                        res.status(500).json({ message: 'El cuidador no tiene ninguna mascota atendiendo' });            
                    }
                });
            } catch (error) {
                res.status(500).json({ message: 'Error al realizar el hospedaje' });        
            }
        }

}

export const usuariosController = new UsuariosController();