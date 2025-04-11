import React, { useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../components/Styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };
  
  useEffect(() => {
    const checkUser = () => {
      if (auth?.user) {
        navigate("/chat");
      }
    };
    checkUser();
  }, [auth]);

  return (
    <div className="signup-page">
      <div className="signup-form-wrapper">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2 className="signup-form-title">Signup</h2>
          <div className="signup-form-field">
            <input
              className="signup-form-input"
              type="text"
              name="name"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="signup-form-label">Name</label>
          </div>
          <div className="signup-form-field">
            <input
              className="signup-form-input"
              type="email"
              name="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="signup-form-label">Email</label>
          </div>
          <div className="signup-form-field">
            <input
              className="signup-form-input"
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="signup-form-label">Password</label>
            <span
              className="password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>
          <div className="signup-form-field">
            <input
              className="signup-form-input"
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className="signup-form-label">Confirm Password</label>
            <span
              className="password-toggle"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? "Hide" : "Show"}
            </span>
          </div>
          <button type="submit" className="signup-submit-button">
            <IoIosLogIn /> Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
