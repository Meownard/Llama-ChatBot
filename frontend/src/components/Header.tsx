import { useState } from "react";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLinks";
import "../components/Styles/Header.css"; // Link to the new CSS file

const Header = () => {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <Logo />
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {auth?.isLoggedIn ? (
          <>
            <NavigationLink bg="#39424E" to="/chat" text="Go To Chat" textColor="#06101c" />
            <NavigationLink bg="#630303" textColor="#06101c" to="/" text="Logout" onClick={auth.logout} />
          </>
        ) : (
          <>
            <NavigationLink bg="#39424E" to="/login" text="Login" textColor="#A3ABB2" />
            <NavigationLink bg="#1B2A35" textColor="#A3ABB2" to="/signup" text="Sign up" />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
