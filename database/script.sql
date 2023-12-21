CREATE SCHEMA IF NOT EXISTS proyecto2;

CREATE TABLE IF NOT EXISTS proyecto2.CLIENTE (
    id_cliente INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono INTEGER NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwordd VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    rol VARCHAR(100) NOT NULL,
    verificacion CHAR(1),
    token VARCHAR(10),
    PRIMARY KEY (id_cliente)
);

CREATE TABLE IF NOT EXISTS proyecto2.CALIFICACION (
    id_calificacion INTEGER NOT NULL AUTO_INCREMENT,
    punteo INTEGER NOT NULL,
    comentario VARCHAR(300),
    id_cliente INTEGER NOT NULL,
    PRIMARY KEY (id_calificacion),
    FOREIGN KEY (id_cliente) REFERENCES proyecto2.CLIENTE(id_cliente)
);

CREATE TABLE IF NOT EXISTS proyecto2.CUIDADOR (
    id_cuidador INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono INTEGER NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwordd VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    rol VARCHAR(100) NOT NULL,
    verificacion CHAR(1),
    token VARCHAR(10),
    PRIMARY KEY (id_cuidador)
);

CREATE TABLE IF NOT EXISTS proyecto2.PRODUCTO (
    id_producto INTEGER NOT NULL AUTO_INCREMENT,
    imagen BLOB NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    precio FLOAT NOT NULL,
    cantidad_disponible INTEGER NOT NULL,
    id_cuidador INTEGER NOT NULL,
    PRIMARY KEY (id_producto),
    FOREIGN KEY (id_cuidador) REFERENCES proyecto2.CUIDADOR (id_cuidador)
);

CREATE TABLE IF NOT EXISTS proyecto2.COMENTARIO (
    id_comentario INTEGER NOT NULL AUTO_INCREMENT,
    comentario VARCHAR(300) NOT NULL,
    id_cuidador INTEGER NOT NULL,
    id_cliente INTEGER NOT NULL,
    PRIMARY KEY (id_comentario),
    FOREIGN KEY (id_cliente) REFERENCES proyecto2.CLIENTE (id_cliente),
    FOREIGN KEY (id_cuidador) REFERENCES proyecto2.CUIDADOR (id_cuidador)
);

CREATE TABLE IF NOT EXISTS proyecto2.MASCOTA (
    id_mascota INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL,
    especie VARCHAR(100) NOT NULL,
    raza VARCHAR(100) NOT NULL,
    comportamiento VARCHAR(100) NOT NULL,
    contacto_veterinario INTEGER NOT NULL,
    comentario VARCHAR(300),
    id_cliente INTEGER NOT NULL,
    PRIMARY KEY (id_mascota),
    FOREIGN KEY (id_cliente) REFERENCES proyecto2.CLIENTE (id_cliente)
);

CREATE TABLE IF NOT EXISTS proyecto2.HOSPEDAR(
    id_hospedaje INTEGER AUTO_INCREMENT,
    fecha_devolucion DATE NOT NULL,
    id_mascota INTEGER NOT NULL,
    PRIMARY KEY (id_hospedaje),
    FOREIGN KEY (id_mascota) REFERENCES proyecto2.MASCOTA (id_mascota)
);

CREATE TABLE IF NOT EXISTS proyecto2.ATENCION (
    id_atencion INTEGER NOT NULL AUTO_INCREMENT,
    estado VARCHAR(100) NOT NULL,
    id_mascota INTEGER NOT NULL,
    id_cuidador INTEGER NOT NULL,
    PRIMARY KEY (id_atencion),
    FOREIGN KEY (id_mascota) REFERENCES proyecto2.MASCOTA (id_mascota),
    FOREIGN KEY (id_cuidador) REFERENCES proyecto2.CUIDADOR (id_cuidador)
);