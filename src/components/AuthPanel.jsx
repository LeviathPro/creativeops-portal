import React, { useState } from "react";

const AuthPanel = ({ onLogin, onQuickLogin, providers, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) return;
    onLogin(email, password);
  };

  return (
    <div className="auth-panel glass">
      <h2 className="auth-title">Sign In</h2>
      <div className="auth-buttons">
        {providers.map((provider) => (
          <button
            key={provider.email}
            className="auth-button"
            onClick={() => onQuickLogin(provider.email)}
          >
            {provider.label}
          </button>
        ))}
      </div>
      <div className="auth-divider">or use email access</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@creativeops"
          />
        </label>
        <label className="auth-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-submit">
          Enter Portal
        </button>
      </form>
      <p className="auth-note">Use the credentials issued by Creative Deck &amp; Fence administration.</p>
    </div>
  );
};

export default AuthPanel;
