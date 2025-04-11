import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to="/">
        <img
          src="Ollama.png"
          alt="Ollama Logo"
          width="30px"
          height="30px"
          className="image-inverted"
        />
      </Link>
      <span
        style={{
          display: "block",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
        className="logo-text"
      >
        <span style={{ fontSize: "20px" }}>MEOWRN</span>-LLAMA
      </span>
    </div>
  );
};

export default Logo;
