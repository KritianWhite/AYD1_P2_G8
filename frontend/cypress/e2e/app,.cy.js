const UserValido = {
    email: 'juancliente@email.com',
    password: 'contraseña1',
    codigo: 'zxcvbn',
};

const NuevaMascota = {
    nombre: "Cody",
    edad: 3,
    especie: "Perro",
    raza: "Golden Retriever",
    comportamiento: "Jugueton",
    contacto_veterinario: 1234567890,
    comentario: "Mascota saludable y activa",
};

const NuevoUsuario ={
    nombre: "Pedro",
    apellido: "Perez",
    telefono: 12345678,
    email:"ang.geovany@gmail.com",
    password: "NewPass123",
}
  
describe("App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });
   
    it("Login correcto ", () => {
        // Verifica que los elementos iniciales estén presentes
        cy.get('.login-container').should('exist');
        cy.get("h1").contains("Login").should('exist');
        cy.get('img').should('exist');
        cy.get('p').contains("¿No tienes una cuenta?").should('exist');
        // Ingresa el email y avanza a la siguiente pantalla
        cy.get('#username').type(UserValido.email);
        cy.get('[type="submit"]').click();
        // Ingresa la contraseña si el usuario ya está verificado o después de verificar
        cy.get('#password').type(UserValido.password);
        cy.get('button').click();
    });

    it("Login Incorrecto", () => {
        // Verifica que los elementos iniciales estén presentes
        cy.get('.login-container').should('exist');
        cy.get("h1").contains("Login").should('exist');
        cy.get('img').should('exist');
        cy.get('p').contains("¿No tienes una cuenta?").should('exist');
        // Ingresa el email incorrecto
        cy.get('#username').type('invalido@gmail.com');
        cy.get('[type="submit"]').click();
        cy.get('.swal2-popup');
        cy.get('.swal2-confirm').click();
        //intento 2
        cy.get('#username').clear();
        cy.get('#username').type('intento2@gmail.com');
        cy.get('[type="submit"]').click();
        cy.get('.swal2-popup');
        cy.get('.swal2-confirm').click();
        //email valido pero  password incorrecto
        cy.get('#username').clear();
        cy.get('#username').type(UserValido.email);
        cy.get('[type="submit"]').click();
        //error password
        cy.get('#password').type("passinvalidoooooooo")
        cy.get('button').click();
        //
        cy.get('#password').clear();
        cy.get('#password').type(UserValido.password);
        cy.get('button').click();
        
    });

    it("Hospedar mascota", () => {
        // Ingresa el email y avanza a la siguiente pantalla
        cy.get('#username').type(UserValido.email);
        cy.get('[type="submit"]').click();
        // Ingresa la contraseña si el usuario ya está verificado o después de verificar
        cy.get('#password').clear();
        cy.get('#password').type(UserValido.password);
        cy.get('button').click();
        cy.get('.navbar-toggler').should('exist').click();

        //cy.get(':nth-child(1) > .nav-link').click();
        //cy.get('.swal2-cancel').click();
        cy.get(':nth-child(1) > .nav-link').click();
        //registrar
        cy.wait(2000); 
        cy.get('#swal-nombre').type(NuevaMascota.nombre);
        cy.get('#swal-edad').type(NuevaMascota.edad);
        cy.get('#swal-especie').type(NuevaMascota.especie);
        cy.get('#swal-raza').type(NuevaMascota.raza);
        cy.get('#swal-comportamiento').type(NuevaMascota.comportamiento);
        cy.get('#swal-contacto').type(NuevaMascota.contacto_veterinario);
        cy.get('#swal-comentario').type(NuevaMascota.comentario);
        cy.get('.swal2-confirm').click();
        //hospedar
        cy.get('.navbar-toggler-icon').click();
        cy.get('.dropdown > .nav-link').click();
        cy.get(':nth-child(1) > .dropdown-item').click();
        cy.get(':nth-child(2) > .social > li > a > .fas').click();
        cy.get('.swal2-confirm').click();

    });
    
    it("Cerrar Sesion", () => {
        // Verifica que los elementos iniciales estén presentes
        cy.get('.login-container').should('exist');
        cy.get("h1").contains("Login").should('exist');
        cy.get('img').should('exist');
        cy.get('p').contains("¿No tienes una cuenta?").should('exist');
        // Ingresa el email y avanza a la siguiente pantalla
        cy.get('#username').type(UserValido.email);
        cy.get('[type="submit"]').click();
        // Ingresa la contraseña si el usuario ya está verificado o después de verificar
        cy.get('#password').type(UserValido.password);
        cy.get('button').click();
        //menu
        cy.get('.navbar-toggler-icon').click();
        cy.get('.dropdown > .nav-link').click();
        cy.get(':nth-child(4) > .dropdown-item').click();
    });

      it("Registrar", () => {
        cy.get('p > button').click();
        cy.get(':nth-child(2) > input').type(NuevoUsuario.nombre);
        cy.get(':nth-child(3) > input').type(NuevoUsuario.apellido);
        cy.get(':nth-child(4) > input').type(NuevoUsuario.telefono);
        cy.get(':nth-child(5) > input').type(NuevoUsuario.email);
        cy.get(':nth-child(6) > input').type(NuevoUsuario.password);
        cy.get(':nth-child(7) > input').type(NuevoUsuario.password);
        cy.get(':nth-child(8) > input').click();
        cy.get(':nth-child(8) > input').type("2023-12-28");
        cy.get('select').select('Cliente', { force: true });
        cy.get('[type="submit"]').click();
        
    });

    it("Actulizar usuario", () => {
        // Ingresa el email y avanza a la siguiente pantalla
        cy.get('#username').type(UserValido.email);
        cy.get('[type="submit"]').click();
        // Ingresa la contraseña si el usuario ya está verificado o después de verificar
        cy.get('#password').type(UserValido.password);
        cy.get('button').click();
        //actulizar nombre
        cy.get(':nth-child(2) > .col-xl-12 > .text-right > .btn-primary').click();
        cy.get('#nombre').clear();
        cy.get('#nombre').type("Nuevo nombre");
        cy.get(':nth-child(2) > .col-xl-12 > .text-right > .btn-success').click();
    });
    
    
  });
  