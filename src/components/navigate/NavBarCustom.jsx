import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../helpers/config";
import { setLogin } from "../../app/slices/userSlice";
function NavBarCustom() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logOut();
    dispatch(setLogin(false));
  };

  const { user, login } = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-expand-md bg-light">
      <div className="container">
        <Link className="navbar-brand">Navbar</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user.role === "admin" ? (
              <li className="nav-item">
                <Link className="nav-link active" to="/company/list">
                  Empresas
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link active" to="/users/detail">
                  Persona
                </Link>
              </li>
            )}

            {login ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={() => handleLogout()}
                >
                  Cerrar sesión
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Iniciar sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBarCustom;
