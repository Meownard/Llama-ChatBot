import { useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css';
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../components/Styles/Login.css";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false); // To control password visibility
  const [email, setEmail] = useState(""); // For controlled email input
  const [password, setPassword] = useState(""); // For controlled password input
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    toast.loading("Signing In", { id: "login" });

    if (!isValidEmail(email)) {
      toast.error("Invalid email format", { id: "login" });
      setIsLoading(false);
      return;
    }

    try {
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
      navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error("Signing In Failed", { id: "login" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <div className="login-page">
      <div className="login-form-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-form-title">Sign in to your account</h2>
          <div className="login-form-field">
            <input
              className="login-form-input"
              name="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="login-form-label">Email</label>
          </div>
          <div className="login-form-field password-field">
            <input
              className="login-form-input"
              name="password"
              type={passwordVisible ? "text" : "password"} // Toggle password visibility
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="login-form-label">Password</label>
            <span
              className="login-password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            >
              {passwordVisible ? <RiEyeOffFill size={22} /> : <RiEyeFill size={22} />}
            </span>
          </div>
          <button type="submit" className="login-submit-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>

          <div className="login-signup-redirect">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="signup-redirect-button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
