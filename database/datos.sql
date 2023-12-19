-- INSERTAR DATOS 
-- CLIENTE
INSERT INTO proyecto2.CLIENTE (nombre, apellido, telefono, email, passwordd, fecha_nacimiento, rol, verificacion)
VALUES 
    ('Juan', 'Pérez', 51234567, 'juancliente@email.com', 'contraseña1', '1990-05-15','cliente', '0'),
    ('Ana', 'Rodríguez', 52345678, 'anacliente@email.com', 'contraseña2', '1985-08-22','cliente', '0'),
    ('Carlos', 'Gómez', 53456789, 'carloscliente@email.com', 'contraseña3', '1992-12-10','cliente', '0'),
    ('María', 'López', 54567890, 'mariacliente@email.com', 'contraseña4', '1988-04-03','cliente', '0'),
    ('Javier', 'Sánchez', 55678901, 'javiercliente@email.com', 'contraseña5', '1995-09-28','cliente', '0'),
    ('Laura', 'Martínez', 56789012, 'lauracliente@email.com', 'contraseña6', '1983-06-17','cliente', '0'),
    ('Andrés', 'Torres', 57890123, 'andrescliente@email.com', 'contraseña7', '1998-02-05','cliente', '0'),
    ('Sofia', 'González', 58901234, 'sofiacliente@email.com', 'contraseña8', '1980-11-20','cliente', '0'),
    ('Diego', 'Herrera', 59012345, 'diegocliente@email.com', 'contraseña9', '1993-07-14','cliente', '0'),
    ('Carolina', 'Castro', 50123456, 'carolinacliente@email.com', 'contraseña10', '1987-01-30','cliente', '0')
;

-- CUIDADOR
INSERT INTO proyecto2.CUIDADOR (nombre, apellido, telefono, email, passwordd, fecha_nacimiento, rol, verificacion)
VALUES 
    ('María', 'Rodríguez', 12345678, 'mariacuidador@email.com', 'pass123', '1990-05-15','cuidador', '0'),
    ('Juan', 'Pérez', 23456789, 'juancuidador@email.com', 'secret@123', '1985-08-22','cuidador', '0'),
    ('Laura', 'Gómez', 34567890, 'lauracuidador@email.com', 'mypass', '1992-12-10','cuidador', '0'),
    ('Carlos', 'Martínez', 45678901, 'carloscuidador@email.com', 'secure123', '1988-04-03','cuidador', '0'),
    ('Ana', 'Sánchez', 56789012, 'anacuidador@email.com', '12345pass', '1995-09-28','cuidador', '0'),
    ('Jorge', 'Torres', 67890123, 'jorgecuidador@email.com', 'p@ssword', '1983-06-17','cuidador', '0'),
    ('Gabriela', 'González', 78901234, 'gabrielacuidador@email.com', 'gabby123', '1998-02-05','cuidador', '0'),
    ('Javier', 'Herrera', 89012345, 'javiercuidador@email.com', 'javi_pass', '1980-11-20','cuidador', '0'),
    ('Andrea', 'Castro', 90123456, 'andreacuidador@email.com', 'pass1234', '1993-07-14','cuidador', '0'),
    ('Martín', 'López', 1234567, 'martincuidador@email.com', 'm@rtinpass', '1987-01-30','cuidador', '0')
;

-- MASCOTA
INSERT INTO proyecto2.MASCOTA (nombre, edad, especie, raza, comportamiento, contacto_veterinario, comentario, id_cliente)
VALUES 
    ('Max', 3, 'Perro', 'Labrador', 'Juguetón', 12345678, 'Es un perro activo y amigable', 1),
    ('Luna', 2, 'Gato', 'Siames', 'Tranquila', 23456789, 'Le gusta descansar en lugares cómodos', 2),
    ('Rocky', 4, 'Perro', 'Bulldog', 'Fuerte', 34567890, 'Adora jugar con pelotas', 1),
    ('Mia', 1, 'Gato', 'Persa', 'Curiosa', 45678901, 'Siempre está explorando', 4),
    ('Toby', 2, 'Perro', 'Golden Retriever', 'Amigable', 56789012, 'Le encanta nadar', 5),
    ('Nina', 3, 'Gato', 'British Shorthair', 'Tímida', 67890123, 'Se lleva bien con otros gatos', 2),
    ('Rex', 5, 'Perro', 'Doberman', 'Protector', 78901234, 'Guardián de la casa', 7),
    ('Bella', 2, 'Gato', 'Ragdoll', 'Juguetona', 89012345, 'Le gusta cazar juguetes', 8),
    ('Coco', 4, 'Perro', 'Poodle', 'Inteligente', 90123456, 'Adora aprender nuevos trucos', 9),
    ('Milo', 1, 'Gato', 'Abyssinian', 'Energético', 1234567, 'Le gusta trepar a lugares altos', 10)
;

-- HOSPEDAJE
INSERT INTO proyecto2.ATENCION (id_mascota, id_cuidador, fecha_devolucion, estado)
VALUES 
    (2, 3, '2023-03-01', 'comiendo'),
    (4, 5, '2023-03-02', 'paseando'),
    (6, 7, '2023-03-03', 'bañado'),
    (8, 9, '2023-03-04', 'durmiendo'),
    (10, 1, '2023-03-05', 'jugando'),
    (1, 2, '2023-03-06', 'listo para recoger'),
    (3, 4, '2023-03-07', 'comiendo'),
    (5, 6, '2023-03-08', 'paseando'),
    (7, 8, '2023-03-09', 'bañado'),
    (9, 10, '2023-03-10', 'durmiendo')
;

-- COMENTARIO
INSERT INTO proyecto2.COMENTARIO (id_cliente, id_cuidador, comentario)
VALUES 
    (1, 3, 'Excelente cuidado y atención para mi mascota.'),
    (2, 5, 'El cuidador fue muy amable y mi mascota se divirtió mucho.'),
    (3, 7, 'Mi mascota regresó bañada y contenta. ¡Gracias!'),
    (4, 9, 'Mi perro durmió profundamente durante toda la estadía. Muy satisfecho.'),
    (5, 1, 'El cuidador jugó mucho con mi mascota. Se nota que ama a los animales.'),
    (6, 2, 'Recogí a mi gato y estaba feliz y relajado. Buena experiencia.'),
    (7, 4, 'Gracias por cuidar de mi mascota como si fuera suya. Comeremos aquí de nuevo.'),
    (8, 6, 'Excelente servicio. Pasearon a mi perro y lo mantuvieron activo.'),
    (9, 8, 'El cuidador fue muy atento a las necesidades específicas de mi mascota.'),
    (10, 10, 'Mi gato estaba limpio y bien cuidado cuando lo recogí. Recomiendo este servicio.'),
    (1, 2, 'Gracias por la actualización diaria sobre mi perro. Me dio tranquilidad.'),
    (2, 3, 'Mi gato se llevó bien con el cuidador. Todo salió según lo planeado.'),
    (3, 4, 'Comunicación eficiente y servicio confiable. Mi mascota estuvo en buenas manos.'),
    (4, 5, 'Mi perro estaba jugando felizmente cuando lo recogí. Muy recomendado.'),
    (5, 6, 'El cuidador proporcionó fotos diarias. ¡Estoy agradecido por el servicio!'),
    (6, 7, 'Mi gato fue tratado con mucho cariño y atención. Sin duda volveré.'),
    (7, 8, 'El cuidador siguió todas las instrucciones y mi perro estuvo feliz.'),
    (8, 9, 'Cuidaron bien de mi mascota anciana. Aprecio la paciencia del cuidador.'),
    (9, 10, 'Excelente comunicación y atención. Mi perro estaba relajado al regresar.'),
    (10, 1, 'Buen trabajo en mantener a mi mascota entretenida y cómoda. Gracias.')
;

-- PRODUCTO
INSERT INTO proyecto2.PRODUCTO (id_cuidador, imagen, nombre, descripcion, precio, cantidad_disponible)
VALUES 
    (3, 'imagen1.jpg', 'Comida para perros', 'Alimento balanceado para perros de todas las edades', 20.99, 100),
    (5, 'imagen2.jpg', 'Juguete para gatos', 'Pelota de lana con campana', 10.5, 50),
    (7, 'imagen3.jpg', 'Champú para mascotas', 'Fórmula suave para perros y gatos', 15.75, 75),
    (9, 'imagen4.jpg', 'Cama para perros', 'Colchón cómodo y lavable', 35.25, 25),
    (1, 'imagen5.jpg', 'Correa retráctil para perros', 'Correa duradera y ajustable', 18.99, 80),
    (2, 'imagen6.jpg', 'Cepillo para gatos', 'Cepillo de doble cara para cuidado del pelaje', 8.75, 60),
    (4, 'imagen7.jpg', 'Snacks para perros', 'Pack de golosinas saludables', 12.5, 120),
    (6, 'imagen8.jpg', 'Juguete interactivo para perros', 'Juguete dispensador de golosinas', 22, 40),
    (8, 'imagen9.jpg', 'Caja de arena para gatos', 'Caja con filtro y pala incluidos', 30.99, 30),
    (10, 'imagen10.jpg', 'Rascador para gatos', 'Árbol rascador con plataformas y escondites', 45.75, 15),
    (3, 'imagen11.jpg', 'Pienso premium para gatos', 'Alimento de alta calidad para gatos adultos', 24.5, 90),
    (5, 'imagen12.jpg', 'Collar para perros', 'Collar ajustable y resistente', 14.25, 70),
    (7, 'imagen13.jpg', 'Arnés para gatos', 'Arnés suave y seguro para paseos', 17.99, 55),
    (9, 'imagen14.jpg', 'Juguete masticable para perros', 'Hueso de goma resistente', 9.95, 100),
    (1, 'imagen15.jpg', 'Comedero automático para mascotas', 'Programable y fácil de limpiar', 32.5, 20),
    (2, 'imagen16.jpg', 'Caja de transporte para gatos', 'Caja resistente con ventilación', 38.99, 25),
    (4, 'imagen17.jpg', 'Casa para perros', 'Perrera resistente a la intemperie', 55, 10),
    (6, 'imagen18.jpg', 'Cortauñas para gatos', 'Cortauñas con mango antideslizante', 5.99, 120),
    (8, 'imagen19.jpg', 'Chaleco salvavidas para perros', 'Chaleco con asa de rescate', 27.75, 30),
    (10, 'imagen20.jpg', 'Cama elevada para perros', 'Cama fresca y elevada del suelo', 48.25, 15)
;

-- CALIFICACION
INSERT INTO proyecto2.CALIFICACION (id_cliente, punteo, comentario)
VALUES 
    (1, 5, '¡Excelente servicio! Mi mascota estuvo feliz durante toda la estadía.'),
    (2, 4, 'Buena atención, pero sería genial si ofrecieran actualizaciones diarias.'),
    (3, 5, 'El cuidador fue muy amable y mi gato se sintió como en casa.'),
    (4, 3, 'No hubo problemas, pero esperaba una comunicación más frecuente.'),
    (5, 5, 'Recomiendo este servicio. Mi perro siempre está emocionado de ir.'),
    (6, 4, 'Buen cuidado, pero me gustaría recibir fotos o mensajes más a menudo.'),
    (7, 5, 'El cuidador siguió todas nuestras instrucciones. Muy satisfecho.'),
    (8, 3, 'Hubo algunos problemas de comunicación, pero en general, bien.'),
    (9, 5, 'Mi mascota recibió un excelente trato. Definitivamente regresaremos.'),
    (10, 4, 'Buen servicio, pero la entrega fue un poco tarde.')
;

