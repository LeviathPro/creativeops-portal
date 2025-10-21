import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles.css";
import App from "./App.jsx";

const WHITE_LOCK_CLASS = "portal-white-bg-lock";
const DESIRED_TAGLINE = "Innovative software for the intelligent minds of Creative Deck & Fence, LLC.";
const TIMEOUT_CAP = 10000;

const originalSetTimeout = window.setTimeout.bind(window);
window.setTimeout = (handler, timeout, ...args) => {
  const numericDelay =
    typeof timeout === "number"
      ? timeout
      : timeout === undefined
        ? 0
        : Number.isFinite(Number(timeout))
          ? Number(timeout)
          : TIMEOUT_CAP;
  const normalizedDelay = Math.max(0, Math.min(numericDelay, TIMEOUT_CAP));
  return originalSetTimeout(handler, normalizedDelay, ...args);
};

const scrubGradient = (node) => {
  if (!node) return;
  const style = window.getComputedStyle(node);
  if (style.backgroundImage && style.backgroundImage !== "none") {
    node.style.backgroundImage = "none";
  }
};

const enforceWhiteBackground = () => {
  const { body, documentElement } = document;
  if (!body || !documentElement) return;

  body.classList.add(WHITE_LOCK_CLASS);
  documentElement.classList.add(WHITE_LOCK_CLASS);
  body.style.backgroundColor = "#ffffff";
  documentElement.style.backgroundColor = "#ffffff";
  scrubGradient(body);
  scrubGradient(documentElement);

  document.querySelectorAll(".app-frame, .solid-white-bg").forEach((element) => {
    element.style.backgroundColor = "#ffffff";
    element.style.backgroundImage = "none";
  });
};

const ensureLandingCopy = () => {
  const tagline = document.querySelector(".landing-header__tagline");
  if (tagline && tagline.textContent?.trim() !== DESIRED_TAGLINE) {
    tagline.textContent = DESIRED_TAGLINE;
  }
};

const ensureFormulaLayerOrder = () => {
  const formulaLayer = document.querySelector(".formula-field");
  const landingContent = document.querySelector(".landing-content");
  if (formulaLayer) {
    formulaLayer.style.zIndex = "1";
  }
  if (landingContent) {
    landingContent.style.zIndex = "2";
  }
};

const markSignInRoot = () => {
  const signInScreen = document.querySelector(".signin-screen");
  if (signInScreen && !signInScreen.id) {
    signInScreen.id = "signin-root";
  }
};

const attachSignInFreeze = () => {
  if (!window.FREEZE_SIGNIN) return;
  const signInRoot = document.getElementById("signin-root");
  if (!signInRoot || signInRoot.dataset.freezeAttached === "true") {
    return;
  }
  const pristine = signInRoot.innerHTML;
  const observer = new MutationObserver((mutations) => {
    if (!window.FREEZE_SIGNIN) {
      observer.disconnect();
      signInRoot.dataset.freezeAttached = "false";
      return;
    }
    console.warn("[signin-freeze] reverting unauthorized mutation", mutations);
    signInRoot.innerHTML = pristine;
  });
  observer.observe(signInRoot, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  });
  signInRoot.dataset.freezeAttached = "true";
};

const bootstrapGuards = () => {
  enforceWhiteBackground();
  ensureLandingCopy();
  ensureFormulaLayerOrder();
  markSignInRoot();
  attachSignInFreeze();
};

document.addEventListener("DOMContentLoaded", () => {
  bootstrapGuards();

  const backgroundObserver = new MutationObserver(enforceWhiteBackground);
  const body = document.body;
  if (body) {
    backgroundObserver.observe(body, { attributes: true, attributeFilter: ["class", "style"] });
  }

  const structureObserver = new MutationObserver(() => {
    ensureLandingCopy();
    ensureFormulaLayerOrder();
    markSignInRoot();
    attachSignInFreeze();
  });
  structureObserver.observe(document.body, { childList: true, subtree: true });
});

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));

window.requestAnimationFrame(() => {
  bootstrapGuards();
});
