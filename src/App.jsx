import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Smooth, high-fidelity animated hue background (WebGL), fixed while scrolling
function EnergyHueBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize(); window.addEventListener("resize", resize);

    const vs = "attribute vec2 a; void main(){ gl_Position=vec4(a,0.0,1.0);}";

    const fs = `
      precision highp float; uniform vec2 r; uniform float t;
      mat2 R(float a){ float s=sin(a), c=cos(a); return mat2(c,-s,s,c); }
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
        float a=h(i), b=h(i+vec2(1.,0.)), c=h(i+vec2(0.,1.)), d=h(i+vec2(1.,1.));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }
      float f(vec2 p){ float v=0., a=0.5; for(int i=0;i<6;i++){ v+=a*n(p); p*=2.02; a*=0.52; } return v; }
      vec3 pal(float x){ return 0.5 + 0.5*cos(6.28318*vec3(x, x+0.33, x+0.67)); }
      void main(){
        vec2 uv = (gl_FragCoord.xy/r)*2.0-1.0; uv.x *= r.x/r.y;
        float k = t*0.15; vec2 q = uv*R(0.10*sin(k*0.7));
        float a = f(q*1.4 + vec2(0.0,k*0.5));
        float b = f(q*3.1 + vec2(k*0.2,-k*0.3));
        vec3 col = mix(vec3(0.03,0.04,0.07), pal(a*0.6 + k*0.05), 0.65);
        col *= 0.9 + 0.1*sin(k*2.0 + a*6.2831);
        float v = 1.0 - 0.18*dot(uv,uv);
        col = mix(col, vec3(dot(col, vec3(0.299,0.587,0.114))), 0.08);
        col *= clamp(v, 0.6, 1.0);
        gl_FragColor = vec4(col,1.0);
      }`;

    const make = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, make(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, make(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a"); gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "r");
    const uTime = gl.getUniformLocation(prog, "t");

    let raf = 0;
    const tick = (ms) => { gl.uniform2f(uRes, canvas.width, canvas.height); gl.uniform1f(uTime, ms/1000); gl.drawArrays(gl.TRIANGLES,0,3); raf=requestAnimationFrame(tick); };
    raf=requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 hue-bg" />;
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [standalone, setStandalone] = useState(false);

  // Register service worker + detect standalone + capture install event
  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(()=>{});
    const mql = window.matchMedia("(display-mode: standalone)");
    const upd = () => setStandalone(mql.matches || window.navigator.standalone);
    upd(); mql.addEventListener?.("change", upd);
    const bip = (e) => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener("beforeinstallprompt", bip);
    window.addEventListener("appinstalled", () => setDeferredPrompt(null));
    return () => { mql.removeEventListener?.("change", upd); window.removeEventListener("beforeinstallprompt", bip); };
  }, []);

  return (
    <div className="relative min-h-dvh text-slate-100 overflow-hidden"
         style={{paddingTop: 'env(safe-area-inset-top)', paddingBottom:'env(safe-area-inset-bottom)'}}>
      <EnergyHueBackground />

      {!entered ? (
        <div className="relative z-10 mx-auto max-w-md sm:max-w-2xl md:max-w-3xl p-4 sm:p-6">
          <div className="rounded-2xl bg-white/60 sm:bg-white/50 md:bg-white/40 backdrop-blur-md ring-1 ring-white/70 sm:ring-white/60 p-5 sm:p-7 md:p-8 text-center">
            <img src="/logo.jpg" alt="Creative Deck & Fence" className="mb-5 h-20 md:h-24 mx-auto" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">CreativeOps Portal</h1>
            <p className="mt-3 text-base sm:text-lg text-slate-700">
              Innovative Software for the Intelligent Minds of Creative Deck &amp; Fence, LLC.
            </p>
            <p className="mt-3 text-base sm:text-lg text-slate-700">
              You've finally found a purpose and the stability to secure a financial future.
            </p>
            <motion.button
              onClick={() => setEntered(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              animate={{ boxShadow: ["0 0 20px rgba(56,189,248,.6)", "0 0 40px rgba(167,139,250,.7)", "0 0 30px rgba(236,72,153,.6)"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative mt-8 rounded-full w-full sm:w-auto h-14 px-8 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 overflow-hidden"
            >
              <span className="relative z-10">Enter Portal</span>
              <motion.span aria-hidden className="absolute inset-0 rounded-full bg-white/30"
                initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 mx-auto max-w-4xl p-4 sm:p-6">
          <div className="rounded-2xl bg-white/50 backdrop-blur-md ring-1 ring-white/60 p-6 text-slate-900">
            <h2 className="text-2xl sm:text-3xl font-bold">Dashboard</h2>
            <p className="mt-2 text-slate-700">Key metrics and recent activity for Creative Deck &amp; Fence, LLC.</p>
          </div>
        </div>
      )}

      {/* Floating Install button (Android/desktop Chromium) */}
      {deferredPrompt && !standalone && (
        <motion.button
          onClick={async () => { deferredPrompt.prompt(); const res = await deferredPrompt.userChoice; if (res?.outcome === "accepted") setDeferredPrompt(null); }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
          className="fixed bottom-4 right-4 z-20 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600"
        >
          Install App
        </motion.button>
      )}
    </div>
  );
}
