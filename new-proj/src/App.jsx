import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import { IdeasProvider } from "./lib/context/ideas"; // Import the IdeasProvider
import "./Navbar.css"
function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <UserProvider>
        <Navbar /> {/* Add the navbar before page content */}
        <main>
          {isLoginPage ? (
            <Login />
          ) : (
            <IdeasProvider> {/* Wrap Home with IdeasProvider */}
              <Home />
            </IdeasProvider>
          )}
        </main>
      </UserProvider>
    </div>
  );
}


function Navbar() {
  const user = useUser();

  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Idea tracker</a>
      <div className="navbar-right">
        {user.current ? (
          <>
            <span className="navbar-user">{user.current.email}</span>
            <button
              className="navbar-logout-btn"
              type="button"
              onClick={() => user.logout()}
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="navbar-login-btn">Login</a>
        )}
      </div>
    </nav>
  );
}



export default App;
