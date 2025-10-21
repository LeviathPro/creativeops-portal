import React from "react";
import { motion } from "framer-motion";

const SignInShell = () => (
  <motion.section
    className="signin-screen"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }}
    exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } }}
  >
    <div className="signin-panel">
      <h2 className="signin-title">Creative Ops Portal Access</h2>
      <p className="signin-subtitle">Choose how you would like to begin.</p>
      <div className="signin-actions">
        <button type="button" className="signin-button signin-button--outline" disabled>
          Create Account
        </button>
        <button type="button" className="signin-button signin-button--filled" disabled>
          Log In
        </button>
      </div>
      <p className="signin-note">
        The authentication gateway will activate in a subsequent release. This shell preserves the finalized landing
        experience.
      </p>
    </div>
  </motion.section>
);

export default SignInShell;
