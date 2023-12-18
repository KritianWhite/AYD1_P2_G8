"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const keys_1 = __importDefault(require("./keys"));
// Configuración de la conexión
const pool = mysql_1.default.createPool(keys_1.default.database);
// Obtener una conexión del pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        return;
    }
    console.log('Base de Datos Proyecto CONECTADA');
});
exports.default = pool;
