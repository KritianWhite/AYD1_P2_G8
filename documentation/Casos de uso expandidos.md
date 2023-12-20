*Universidad de San Carlos de Guatemala*  
*Escuela de Ingeniería en Ciencias y Sistemas, Facultad de Ingenieria*  
*Analisis y Diseño 1,Vacaiones Diciembre 2023.*  

___
## **PROYECTO 2**
___
## **CASOS DE USOS EXPANDIDOS**
| Caso de uso                    | CDU-001 Login                                                      |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cliente, Cuidador                                                 |
| Tipo                            | Primario, Esencial                                                |
| Descripción                     | Se utiliza para que el usuario pueda ingresar a la plataforma mi Huellita Feliz. |
| Flujo normal                    | 1. El usuario ingresa el correo electrónico.                       |
|                                 | 2. El usuario ingresa la contraseña.                               |
|                                 | 3. Presiona el botón "Ingresar".                                   |
|                                 | 4. El sistema busca en la base de datos si el correo existe.       |
|                                 | 5. El sistema valida que el correo y contraseña sean correctas.   |
|                                 | 6. El usuario logra entrar a la plataforma Huellita Feliz.         |
| Flujo alterno                   | - Línea 3: El usuario no ingresa su correo o contraseña, indica error. |
|                                 | - Línea 5: El sistema indica que el correo o contraseña no es válida, indica error. |

| Caso de uso                    | CDU-002 Registrar usuario                                          |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cliente, Cuidador                                                 |
| Tipo                            | Secundario, Opcional                                              |
| Descripción                     | Se utiliza para la creación de nuevos usuarios dentro de la plataforma Huellita Feliz. |
| Flujo normal                    | 1. El usuario ingresa el correo electrónico.                       |
|                                 | 2. El usuario ingresa la contraseña.                               |
|                                 | 3. Presiona el botón "Ingresar".                                   |
|                                 | 4. El sistema le envía un correo con un código.                    |
|                                 | 5. El sistema busca en la base de datos si el correo existe.       |
|                                 | 6. El sistema valida que el correo y contraseña sean correctas.   |
|                                 | 7. El usuario logra registrar en la plataforma Huellita Feliz.     |
| Flujo alterno                   | - Línea 2: Si el usuario no ha ingresado antes, debe ingresar el código recibido al correo; de lo contrario, indica error. |
|                                 | - Línea 3: El usuario no ingresa su correo o contraseña, indica error. |
|                                 | - Línea 5: El sistema indica que el correo o contraseña no es válida, indica error. |

| Caso de uso                    | CDU-003 Registrar Mascota                                          |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cliente                                                            |
| Tipo                            | Primario, Opcional                                                 |
| Descripción                     | Se utiliza para registrar toda la información de las mascotas del cliente. |
| Flujo normal                    | 1. El cliente accede a la plataforma "Huellita Feliz".             |
|                                 | 2. El sistema verifica la autenticación del cliente.               |
|                                 | 3. El cliente selecciona la opción "Registrar Mascota" desde el menú principal. |
|                                 | 4. El sistema presenta un formulario para ingresar la información de la mascota. |
|                                 | 5. El cliente completa el formulario con la información de la mascota. |
|                                 | 6. El cliente guarda la información.                               |
|                                 | 7. El sistema valida y registra la información de la mascota en la base de datos asociada al perfil del cliente. |
| Flujo alterno                   | - Línea 6: Si el cliente decide cancelar el registro de la mascota, el sistema descarta la información ingresada. |
|                                 | - Línea 7: Si el sistema encuentra errores en la información proporcionada. |

| Caso de uso                    | CDU-004 Ver Perfil                                                 |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cliente, Cuidador                                                 |
| Tipo                            | Secundario, Opcional                                              |
| Descripción                     | Se utiliza para que el usuario logre observar sus datos registrados en la plataforma Huellita Feliz. |
| Flujo normal                    | 1. El usuario accede a la plataforma "Huellita Feliz".             |
|                                 | 2. El sistema verifica la autenticación del usuario.               |
|                                 | 3. El usuario selecciona la opción "Ver Perfil" desde el menú principal. |
|                                 | 4. El sistema muestra la información del perfil del usuario, que puede. |
|                                 | 5. El usuario revisa la información presentada.                   |
|                                 | 6. Si es necesario, el usuario realiza cambios en la información del perfil y guarda los cambios. |
|                                 | 7. El sistema actualiza la información del perfil en la base de datos. |
| Flujo alterno                   | - Línea 2.1: Si el usuario no ha ingresado antes, el sistema envía un código de verificación al correo electrónico asociado a la cuenta. |
|                                 | - Línea 2.2: El sistema solicita al usuario que ingrese el código de verificación recibido por correo. |
|                                 | - Línea 2.3: El usuario ingresa el código de verificación.         |
|                                 | - Línea 2.4: El sistema verifica el código de verificación.        |
|                                 | - Línea 3.1: Si el usuario no ingresa su correo electrónico o contraseña, el sistema indica un error y muestra un mensaje que solicita al usuario completar ambos campos obligatorios. |
|                                 | - Línea 3.2: El sistema devuelve al usuario a la pantalla de inicio de sesión para corregir los errores. |

| Caso de uso                | CDU-005 Recoger mascota                                            |
|-----------------------------|--------------------------------------------------------------------|
| Actores                     | Cliente                                                            |
| Tipo                        | Secundario, Opcional                                              |
| Descripción                 | Se utiliza para que el cliente logre recoger a su mascota cuando está listo para ser devuelto. |
| Flujo normal                | 1. El cliente accede a la plataforma "Huellita Feliz".             |
|                             | 2. El sistema verifica la autenticación del cliente.               |
|                             | 3. El cliente selecciona la opción "Recoger Mascota" desde el menú principal. |
|                             | 4. El sistema presenta información sobre la mascota.              |
|                             | 5. El cliente confirma que está listo para recoger a su mascota.   |
|                             | 6. El sistema notifica al cuidador sobre la confirmación del cliente y proporciona instrucciones para la entrega de la mascota. |
|                             | 7. El cuidador entrega la mascota al cliente y, si es necesario, proporciona información adicional sobre el cuidado brindado durante el servicio. |
| Flujo alterno               | - Línea 5: Si el cliente no está seguro o necesita más tiempo para prepararse para recoger a su mascota. |
|                             | - Línea 7: Si hay algún problema durante la entrega.                |

| Caso de uso                | CDU-006 Hospedar Mascota                                           |
|-----------------------------|--------------------------------------------------------------------|
| Actores                     | Cliente                                                            |
| Tipo                        | Secundario, Opcional                                              |
| Descripción                 | Se utiliza para que el cliente logre hospedar a sus mascotas que están registradas en la plataforma Huellita Feliz. |
| Flujo normal                | 1. El cliente accede a la plataforma "Huellita Feliz".             |
|                             | 2. El sistema verifica la autenticación del cliente.               |
|                             | 3. El cliente selecciona la opción "Hospedar Mascota".             |
|                             | 4. El cliente ingresa la fecha de devolución.                     |
|                             | 5. El sistema registra el hospedaje de la mascota.                |
| Flujo alterno               | - Línea 4: Si el cliente no ingresa una fecha de devolución válida o deja el campo en blanco, el sistema indica un error. |

| Caso de uso                | CDU-007 Realizar reseña al cuidador                                |
|-----------------------------|--------------------------------------------------------------------|
| Actores                     | Cliente, Cuidador                                                 |
| Tipo                        | Secundario, Opcional                                              |
| Descripción                 | Se utiliza para que el cliente pueda realizar reseñas sobre el cuidador de la plataforma Huellita Feliz. |
| Flujo normal                | 1. Después de que finaliza un servicio de cuidado, el cliente accede a la plataforma "Huellita Feliz". |
|                             | 2. El sistema verifica la autenticación del cliente.               |
|                             | 3. El cliente selecciona la opción "Mis Servicios" desde el menú principal. |
|                             | 4. El cliente encuentra el servicio específico para el cual desea dejar una reseña. |
|                             | 5. El cliente selecciona la opción "Dejar Reseña" junto al servicio. |
|                             | 6. El sistema presenta un formulario para la reseña.               |
|                             | 7. El cliente completa el formulario y confirma la publicación de la reseña. |
|                             | 8. La reseña se publica en el perfil del cuidador.                 |
| Flujo alterno               | - Línea 6: El cliente decide no completar la reseña en ese momento.  |

| Caso de uso                    | CDU-008 Realizar reseña a la plataforma                             |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cliente                                                            |
| Tipo                            | Secundario, Opcional                                              |
| Descripción                     | Se utiliza para que el cliente pueda realizar reseñas y calificar a la plataforma Huellita Feliz. |
| Flujo normal                    | 1. El cliente accede a la plataforma "Huellita Feliz".             |
|                                 | 2. El sistema verifica la autenticación del cliente.               |
|                                 | 3. El cliente selecciona la opción "Realizar Reseña a la Plataforma" desde el menú principal. |
|                                 | 4. El sistema presenta un formulario para la reseña.               |
|                                 | 5. El cliente completa el formulario y confirma la publicación de la reseña. |
|                                 | 6. La reseña se publica y está disponible para que otros usuarios la vean. |
| Flujo alterno                   | - Línea 5: Si el cliente decide no completar la reseña.             |

| Caso de uso                    | CDU-009 Eliminar reseña al cuidador                                 |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cuidador                                                           |
| Tipo                            | Secundario, Opcional                                              |
| Descripción                     | Se utiliza para que el cuidador pueda eliminar las reseñas que sean ofensivas y que son realizadas por el cliente. |
| Flujo normal                    | 1. El cuidador accede a la plataforma "Huellita Feliz".            |
|                                 | 2. El sistema verifica la autenticación del cuidador.              |
|                                 | 3. El cuidador selecciona la opción "Gestionar Reseñas" desde su panel o menú. |
|                                 | 4. El sistema presenta una lista de reseñas asociadas al cuidador. |
|                                 | 5. El cuidador identifica la reseña que considera ofensiva o inapropiada. |
|                                 | 6. El cuidador selecciona la opción "Eliminar Reseña" junto a la reseña específica. |
|                                 | 7. El sistema solicita confirmación para la eliminación de la reseña. |
|                                 | 8. El cuidador confirma la eliminación.                           |
|                                 | 9. La reseña seleccionada se elimina del perfil del cuidador.      |
| Flujo alterno                   | - Línea 6: Si el cuidador considera que la reseña es inapropiada pero no desea eliminarla. |

| Caso de uso                    | CDU-011 Devolver Mascota                                           |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cuidador                                                           |
| Tipo                            | Secundario, Opcional                                              |
| Descripción                     | Se utiliza para que el cuidador pueda devolver una mascota para que el cliente pueda recoger a su mascota. |
| Flujo normal                    | 1. El cuidador accede a la plataforma "Huellita Feliz".            |
|                                 | 2. El sistema verifica la autenticación del cuidador.              |
|                                 | 3. El cuidador selecciona la opción "Devolver Mascota" desde su panel o menú. |
|                                 | 4. El sistema presenta una lista de las mascotas a cargo del cuidador que están listas para ser devueltas. |
|                                 | 5. El cuidador selecciona la mascota específica que está listo para devolver. |
|                                 | 6. El sistema notifica al propietario sobre la disponibilidad de la mascota para su recogida, utilizando la información de contacto proporcionada por el propietario al iniciar el servicio. |
|                                 | 7. El cuidador entrega la mascota al propietario.                 |
| Flujo alterno                   | - Línea 6: Si el sistema no puede notificar al propietario.       |

| Caso de uso                    | CDU-012 Atender Mascota                                            |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cuidador                                                           |
| Tipo                            | Secundario, Opcional                                              |
| Descripción                     | Se utiliza para que el cuidador pueda atender a una mascota para el cliente. |
| Flujo normal                    | 1. El cuidador accede a la plataforma "Huellita Feliz".            |
|                                 | 2. El sistema verifica la autenticación del cuidador.              |
|                                 | 3. El cuidador selecciona la opción "Atender Mascota" desde su panel o menú. |
|                                 | 4. El sistema presenta una lista de mascotas asignadas al cuidador para su atención. |
|                                 | 5. El cuidador selecciona la mascota específica que atenderá.      |
|                                 | 6. El cuidador atiende a la mascota.                               |
| Flujo alterno                   | - Línea 2: El cuidador ya tiene 2 mascotas atendiendo.             |
|                                 | - Línea 3: La mascota ya está siendo atendida.                    |


| Caso de uso                    | CDU-015 Actualizar perfil                                          |
|---------------------------------|--------------------------------------------------------------------|
| Actores                         | Cliente, Cuidador                                                 |
| Tipo                            | Secundario, Opcional                                              |
| Descripción                     | Se utiliza para que el usuario pueda modificar sus datos registrados en la plataforma Huellita Feliz. |
| Flujo normal                    | 1. El usuario (Cliente o Cuidador) accede a la plataforma "Huellita Feliz". |
|                                 | 2. El sistema verifica la autenticación del usuario.               |
|                                 | 3. El usuario selecciona la opción "Actualizar Perfil" desde su panel o menú. |
|                                 | 4. El sistema carga la página o formulario de actualización de perfil. |
|                                 | 5. El usuario confirma los cambios y guarda la actualización del perfil. |
|                                 | 6. El sistema actualiza la información en la base de datos y refleja los cambios en el perfil del usuario. |
| Flujo alterno                   | - Línea 5.1: El usuario completa el formulario de cambio de contraseña. |
|                                 | - Línea 5.2: El usuario confirma y guarda la nueva contraseña.     |
|                                 | - Línea 5.3: El sistema actualiza la contraseña en la base de datos. |
