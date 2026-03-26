/**
 * src/panels/EnginePanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * ENGINE section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const EnginePanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#854d0e,#b45309)"}}>
    <div className="hero-tag">
      ⚡ V8 Engine
    </div>
  <h1>
    JavaScript Engine Internals
  </h1>
<p>
  From source code to machine code — follow the journey of JavaScript through the V8 engine's parsing, compilation, and optimization pipeline.
</p>

</div>
<div className="card" id="engine-pipeline">
  <div className="card-title" style={{marginBottom: "4px"}}>
    V8 Compilation Pipeline
  </div>
<div className="card-desc" style={{marginBottom: "1.2rem"}}>
  Hover over each stage to understand what happens inside V8.
</div>
<div className="engine-steps">
  <div className="engine-step tooltip-wrap" onmouseenter="hlEngine(0)" onmouseleave="hlEngine(-1)" id="es-0">
    <span className="tooltip">Raw text JavaScript source code</span><div className="engine-icon">
      📝
    </div>
  <div className="engine-label">
    Source
  </div>
<div className="engine-sub">
  JS Code
</div>

</div>
<div className="engine-step tooltip-wrap" onmouseenter="hlEngine(1)" onmouseleave="hlEngine(-1)" id="es-1">
  <span className="tooltip">Tokenizes and builds AST</span><div className="engine-icon">
    🔍
  </div>
<div className="engine-label">
  Parser
</div>
<div className="engine-sub">
  Tokenize
</div>

</div>
<div className="engine-step tooltip-wrap" onmouseenter="hlEngine(2)" onmouseleave="hlEngine(-1)" id="es-2">
  <span className="tooltip">Abstract Syntax Tree — tree of nodes</span><div className="engine-icon">
    🌳
  </div>
<div className="engine-label">
  AST
</div>
<div className="engine-sub">
  Syntax tree
</div>

</div>
<div className="engine-step tooltip-wrap" onmouseenter="hlEngine(3)" onmouseleave="hlEngine(-1)" id="es-3">
  <span className="tooltip">Ignition bytecode interpreter</span><div className="engine-icon">
    ⚙
  </div>
<div className="engine-label">
  Interpreter
</div>
<div className="engine-sub">
  Ignition
</div>

</div>
<div className="engine-step tooltip-wrap" onmouseenter="hlEngine(4)" onmouseleave="hlEngine(-1)" id="es-4">
  <span className="tooltip">TurboFan optimizes hot code paths</span><div className="engine-icon">
    🔥
  </div>
<div className="engine-label">
  JIT Compiler
</div>
<div className="engine-sub">
  TurboFan
</div>

</div>
<div className="engine-step tooltip-wrap" onmouseenter="hlEngine(5)" onmouseleave="hlEngine(-1)" id="es-5">
  <span className="tooltip">Fast native CPU instructions</span><div className="engine-icon">
    💻
  </div>
<div className="engine-label">
  Machine Code
</div>
<div className="engine-sub">
  Native
</div>

</div>

</div>
<div id="engine-detail" style={{marginTop: "1rem", background: "var(--bg)", borderRadius: "10px", padding: "1rem", border: "1px solid var(--border)", fontSize: "13px", color: "var(--t2)", display: "none", lineHeight: 1.6}}>

</div>

</div>
<div className="card" id="engine-concepts">
  <div className="card-title" style={{marginBottom: "1rem"}}>
    Key Engine Concepts
  </div>
<div className="rg-2">
  <div style={{background: "var(--bg)", borderRadius: "12px", padding: "1.2rem", border: "1px solid var(--border)"}}>
    <div style={{fontSize: "14px", fontWeight: 600, marginBottom: "10px"}}>
      🌳 Abstract Syntax Tree
    </div>
  <div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// Source: const x = 1 + 2</span><br/>{ type: <span className="code-string">"VariableDeclaration"</span>,<br/>&nbsp;&nbsp;declarations: [{ id: { name: <span className="code-string">"x"</span> }, init: { type: <span className="code-string">"BinaryExpression"</span>, operator: <span className="code-string">"+"</span>, left: { value: <span className="code-string">1</span> }, right: { value: <span className="code-string">2</span> } } }] } `}}/>

</div>
<div style={{background: "var(--bg)", borderRadius: "12px", padding: "1.2rem", border: "1px solid var(--border)"}}>
  <div style={{fontSize: "14px", fontWeight: 600, marginBottom: "10px"}}>
    🔥 JIT Optimization
  </div>
<div style={{fontSize: "13px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "10px"}}>
  V8 first interprets code fast, then monitors "hot" functions and compiles them to optimized machine code using TurboFan.
</div>
<div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
  <div style={{display: "flex", gap: "8px", alignItems: "center", fontSize: "12px"}}>
    <span style={{background: "#ecfdf5", color: "#065f46", padding: "2px 8px", borderRadius: "4px", fontWeight: 600}}>Cold</span><span style={{color: "var(--t2)"}}>Interpreted by Ignition</span>
  </div>
<div style={{display: "flex", gap: "8px", alignItems: "center", fontSize: "12px"}}>
  <span style={{background: "#fff7ed", color: "#9a3412", padding: "2px 8px", borderRadius: "4px", fontWeight: 600}}>Warm</span><span style={{color: "var(--t2)"}}>Baseline compiled</span>
</div>
<div style={{display: "flex", gap: "8px", alignItems: "center", fontSize: "12px"}}>
  <span style={{background: "#fef2f2", color: "#991b1b", padding: "2px 8px", borderRadius: "4px", fontWeight: 600}}>Hot</span><span style={{color: "var(--t2)"}}>TurboFan optimized</span>
</div>

</div>

</div>

</div>

</div>
<div className="card" id="engine-anim">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fff7ed"}}>
      🎬
    </div>
  <div>
    <div className="card-title">
      V8 Engine — Animated Compilation Flow
    </div>
  <div className="card-desc">
    Watch JavaScript source code travel through parsing, AST generation, Ignition bytecode interpretation, and TurboFan JIT compilation to native machine code.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-engine" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn on" id="eng-btn">⏸ Pause</button> <button className="cbtn" onClick={(e) => { try { (window as any).engCode('simple') } catch(e) {} }}>Simple fn</button> <button className="cbtn" onClick={() => { try { (window as any).engCode('hot') } catch(_) {} }}>Hot Path</button> <button className="cbtn" onClick={() => { try { (window as any).engCode('deopt') } catch(_) {} }}>Deoptimize</button> <div className="canvas-tag">
    V8 — Ignition + TurboFan
  </div>

</div>

</div>

</div>
<div className="card" id="engine-wsw">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#0f766e,#0e7490)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="white" strokeWidth="1.6"/> <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="white" strokeWidth="1.4"/> </svg>
    </div>
  <div>
    <div className="card-title">
      WebSockets &amp; Web Workers
    </div>
  <div className="card-desc">
    Real-time bidirectional communication and off-main-thread computation — two powerful browser APIs that extend JavaScript beyond its single-threaded roots.
  </div>

</div>

</div>
<div className="rg-2">
  <div style={{background: "var(--b50)", border: "1px solid var(--b100)", borderRadius: "12px", padding: "1.2rem"}}>
    <div style={{fontSize: "13px", fontWeight: 700, color: "var(--b700)", marginBottom: ".7rem", display: "flex", alignItems: "center", gap: "7px"}}>
      <span style={{fontSize: "18px"}}>🌐</span> WebSockets

    </div>
  <ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: "6px"}}>
    <li style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
      <span style={{color: "var(--b500)", flexShrink: 0}}>▸</span>Persistent full-duplex TCP connection over a single handshake
    </li>
  <li style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
    <span style={{color: "var(--b500)", flexShrink: 0}}>▸</span>Server pushes data without client polling — ultra-low latency
  </li>
<li style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "var(--b500)", flexShrink: 0}}>▸</span>Use cases: live chat, trading feeds, multiplayer games, dashboards
</li>
<li style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "var(--b500)", flexShrink: 0}}>▸</span>Upgrades from HTTP via <code style={{fontSize: "11px", background: "var(--b100)", padding: "1px 5px", borderRadius: "4px"}}>Upgrade: websocket</code> header
</li>

</ul>

</div>
<div style={{background: "var(--p50)", border: "1px solid var(--p100)", borderRadius: "12px", padding: "1.2rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "var(--p700)", marginBottom: ".7rem", display: "flex", alignItems: "center", gap: "7px"}}>
    <span style={{fontSize: "18px"}}>⚙️</span> Web Workers

  </div>
<ul style={{listStyle: "none", display: "flex", flexDirection: "column", gap: "6px"}}>
  <li style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
    <span style={{color: "var(--p500)", flexShrink: 0}}>▸</span>Runs JS in a background thread — main thread stays responsive
  </li>
<li style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "var(--p500)", flexShrink: 0}}>▸</span>No DOM access — communicates via <code style={{fontSize: "11px", background: "var(--p100)", padding: "1px 5px", borderRadius: "4px"}}>postMessage</code> API
</li>
<li style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "var(--p500)", flexShrink: 0}}>▸</span>Use cases: heavy computation, image processing, crypto, parsing
</li>
<li style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "var(--p500)", flexShrink: 0}}>▸</span>Types: Dedicated, Shared, Service Worker
</li>

</ul>

</div>

</div>
<div style={{marginTop: "1.2rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".6rem"}}>
    Live Animation — WebSocket &amp; Web Worker Flow
  </div>
<div className="canvas-card">
  <canvas id="cvs-wsw" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn active" onClick={(e) => { try { (window as any).wswMode('both', e.currentTarget) } catch(_) {} }} id="wsw-btn-both">🔀 Combined Flow</button> <button className="cbtn" onClick={(e) => { try { (window as any).wswMode('ws', e.currentTarget) } catch(_) {} }} id="wsw-btn-ws">🌐 WebSocket</button> <button className="cbtn" onClick={(e) => { try { (window as any).wswMode('ww', e.currentTarget) } catch(_) {} }} id="wsw-btn-ww">⚙️ Web Worker</button>
</div>

</div>

</div>
<div className="rg-2" style={{marginTop: "1.2rem"}}>
  <div>
    <div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: ".5rem"}}>
      WebSocket Client
    </div>
  <div className="code-block code-comment" style={{fontSize: "11.5px"}} dangerouslySetInnerHTML={{__html: `  <span>// Establish connection</span> <span className="code-keyword">const</span> ws = <span className="code-keyword">new</span> <span className="code-func">WebSocket</span>(<span className="code-string">'wss://api.example.com'</span>); ws.onopen = () =&gt; ws.<span className="code-func">send</span>(<span className="code-string">'Hello!'</span>); ws.onmessage = (e) =&gt; console.<span className="code-func">log</span>(e.data); ws.onclose = () =&gt; <span className="code-func">reconnect</span>(); `}}/>

</div>
<div>
  <div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: ".5rem"}}>
    Web Worker
  </div>
<div className="code-block code-comment" style={{fontSize: "11.5px"}} dangerouslySetInnerHTML={{__html: `  <span>// main.js</span> <span className="code-keyword">const</span> worker = <span className="code-keyword">new</span> <span className="code-func">Worker</span>(<span className="code-string">'worker.js'</span>); worker.<span className="code-func">postMessage</span>({ data: largeArray }); worker.onmessage = (e) =&gt; <span className="code-func">render</span>(e.data); <span className="code-comment">// worker.js</span> self.onmessage = (e) =&gt; { <span className="code-keyword">const</span> result = heavyCalc(e.data); self.<span className="code-func">postMessage</span>(result); }; `}}/>

</div>

</div>

</div>
    </>
  );
};

export default memo(EnginePanel);
