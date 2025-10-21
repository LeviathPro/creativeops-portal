import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import LandingExperience from "./components/LandingExperience";
import TimewarpSequence from "./components/TimewarpSequence";
import SignInShell from "./components/SignInShell";

const useDurations = () =>
  useMemo(() => {
    const isTestEnv = typeof import.meta !== "undefined" && import.meta.env?.MODE === "test";
    return {
      splashFade: isTestEnv ? 0 : 800,
      splashVisible: isTestEnv ? 0 : 3200,
      timewarp: isTestEnv ? 0 : 12000
    };
  }, []);

const App = () => {
  const durations = useDurations();
  const initialSplash = durations.splashFade + durations.splashVisible > 0;
  const [stage, setStage] = useState("landing");
  const [showSplash, setShowSplash] = useState(initialSplash);
  const timersRef = useRef([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const queueTimer = useCallback((callback, delay) => {
    const timer = setTimeout(() => {
      callback();
      timersRef.current = timersRef.current.filter((existing) => existing !== timer);
    }, delay);
    timersRef.current.push(timer);
    return timer;
  }, []);

  const clearQueuedTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    if (!showSplash) return;
    const total = durations.splashFade + durations.splashVisible;
    if (total <= 0) {
      setShowSplash(false);
      return undefined;
    }

    const timer = queueTimer(() => {
      setShowSplash(false);
    }, total);

    return () => {
      clearTimeout(timer);
      timersRef.current = timersRef.current.filter((existing) => existing !== timer);
    };
  }, [durations.splashFade, durations.splashVisible, queueTimer, showSplash]);

  const handleEnterPortal = useCallback(() => {
    if (showSplash || stage !== "landing") return;
    clearQueuedTimers();
    if (durations.timewarp <= 0) {
      setStage("signin");
      return;
    }
    setStage("timewarp");
    queueTimer(() => {
      setStage("signin");
    }, durations.timewarp);
  }, [clearQueuedTimers, durations.timewarp, queueTimer, showSplash, stage]);

  const handleTimewarpComplete = useCallback(() => {
    setStage("signin");
  }, []);

  return (
    <div className="app-frame">
      <div className="solid-white-bg" aria-hidden="true" />
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" fadeDuration={durations.splashFade} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {stage === "landing" && (
          <LandingExperience key="landing" onEnterPortal={handleEnterPortal} />
        )}
        {stage === "timewarp" && (
          <TimewarpSequence
            key="timewarp"
            duration={durations.timewarp}
            onComplete={handleTimewarpComplete}
          />
        )}
        {stage === "signin" && <SignInShell key="signin" />}
      </AnimatePresence>
    </div>
  );
};

export default App;
