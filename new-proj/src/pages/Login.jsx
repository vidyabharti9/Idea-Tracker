import { useState } from "react";
import { useUser } from "../lib/context/user";
import "./Login.css"; 

export function Login() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleLogin = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await user.login(email, password);
      // Redirect or update UI upon successful login
    } catch (error) {
      setSubmitError(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await user.register(email, password);
      // Redirect or update UI upon successful registration
    } catch (error) {
      setSubmitError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-section">
      <h1 className="login-title">Login and Register</h1>
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email" className="login-label">Email*</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="login-input"
          required
        />

        <label htmlFor="password" className="login-label">Password*</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="login-input"
          required
        />

        {submitError && <p className="error-message">{submitError}</p>}

        <div className="login-buttons">
          <button
            className="login-button"
            type="button"
            onClick={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <button
            className="register-button"
            type="button"
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
}
