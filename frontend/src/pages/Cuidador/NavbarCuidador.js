import Reac from "react";

export default function NavbarCuidador() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "http://localhost:3000/";
    };
  return (
    <>
      <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand">Bienvenido </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end text-bg-dark"
            tabindex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Menú
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="http://localhost:3000/seleccionarmascota"
                  >
                    Mascotas hospedadas
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="http://localhost:3000/usuario/mislibros"
                  >
                    Mis Mascotas
                  </a>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Configuraciones
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a class="dropdown-item" href="http://localhost:3000/usuario/principalcuidador">
                        Mi perfil
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Action 2
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="http://localhost:3000/"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}