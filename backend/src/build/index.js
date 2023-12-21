"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Rutas Importadas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 4000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)()); // Para que Agular pueda pedir datos al servidor
        this.app.use(express_1.default.json()); // Obtener formato json desde Angular, para poder entenderlo
        this.app.use(express_1.default.urlencoded({ extended: false })); // Enviar desde Fromularios HTML
    }
    // Rutas del servidor
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/usuario', usuariosRoutes_1.default);
    }
    // Iniciar Servidor
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en el puerto ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
