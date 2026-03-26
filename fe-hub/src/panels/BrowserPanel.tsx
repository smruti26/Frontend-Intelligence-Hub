/**
 * src/panels/BrowserPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * BROWSER section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const BrowserPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#0284c7,#0891b2)"}}>
    <div className="hero-tag">
      🌐 Browser
    </div>
  <h1>
    Browser Internals
  </h1>
<p>
  What happens from URL entry to the first painted pixel — the complete rendering pipeline explained visually.
</p>

</div>
<div className="card" id="browser-pipeline">
  <div className="card-title" style={{marginBottom: "4px"}}>
    Rendering Pipeline
  </div>
<div className="card-desc" style={{marginBottom: "1.2rem"}}>
  Click any step to learn what happens inside the browser at that stage.
</div>
<div className="pipeline">
  <div className="pipeline-step" id="ps-0">
    <div className="pipeline-num">
      1
    </div>
  <div className="pipeline-label">
    DNS Lookup
  </div>
<div className="pipeline-sub">
  URL → IP
</div>

</div>
<div className="pipeline-step" id="ps-1">
  <div className="pipeline-num">
    2
  </div>
<div className="pipeline-label">
  HTTP Request
</div>
<div className="pipeline-sub">
  Fetch HTML
</div>

</div>
<div className="pipeline-step" id="ps-2">
  <div className="pipeline-num">
    3
  </div>
<div className="pipeline-label">
  HTML Parse
</div>
<div className="pipeline-sub">
  Build DOM
</div>

</div>
<div className="pipeline-step" id="ps-3">
  <div className="pipeline-num">
    4
  </div>
<div className="pipeline-label">
  CSS Parse
</div>
<div className="pipeline-sub">
  Build CSSOM
</div>

</div>
<div className="pipeline-step" id="ps-4">
  <div className="pipeline-num">
    5
  </div>
<div className="pipeline-label">
  Render Tree
</div>
<div className="pipeline-sub">
  DOM + CSSOM
</div>

</div>
<div className="pipeline-step" id="ps-5">
  <div className="pipeline-num">
    6
  </div>
<div className="pipeline-label">
  Layout
</div>
<div className="pipeline-sub">
  Geometry calc
</div>

</div>
<div className="pipeline-step" id="ps-6">
  <div className="pipeline-num">
    7
  </div>
<div className="pipeline-label">
  Paint
</div>
<div className="pipeline-sub">
  Draw pixels
</div>

</div>
<div className="pipeline-step" id="ps-7">
  <div className="pipeline-num">
    8
  </div>
<div className="pipeline-label">
  JS Execute
</div>
<div className="pipeline-sub">
  Run scripts
</div>

</div>

</div>
<div id="pipeline-detail" className="pipeline-detail">

</div>

</div>
<div className="card" id="browser-render">
  <div className="card-title" style={{marginBottom: "1rem"}}>
    DOM + CSSOM → Render Tree
  </div>
<div className="flow-diagram">
  <div style={{display: "flex", gap: "2rem", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap"}}>
    <div>
      <div className="flow-title" style={{textAlign: "center"}}>
        HTML
      </div>
    <div className="flow-steps">
      <div style={{display: "flex"}}>
        <div className="flow-node node-blue" style={{minWidth: "120px"}}>
          &lt;html&gt;
        </div>

    </div>
  <div className="flow-arrow" style={{marginLeft: "60px"}}>

  </div>
<div style={{display: "flex"}}>
  <div className="flow-node node-blue" style={{minWidth: "120px"}}>
    &lt;body&gt;
  </div>

</div>
<div className="flow-arrow" style={{marginLeft: "60px"}}>

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-blue" style={{minWidth: "120px"}}>
    DOM Tree ✓
  </div>

</div>

</div>

</div>
<div style={{display: "flex", alignItems: "center", fontSize: "24px", color: "var(--p400)", paddingTop: "40px"}}>
  +
</div>
<div>
  <div className="flow-title" style={{textAlign: "center"}}>
    CSS
  </div>
<div className="flow-steps">
  <div style={{display: "flex"}}>
    <div className="flow-node node-pink" style={{minWidth: "120px"}}>
      .class {}
    </div>

</div>
<div className="flow-arrow" style={{marginLeft: "60px"}}>

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-pink" style={{minWidth: "120px"}}>
    Cascade
  </div>

</div>
<div className="flow-arrow" style={{marginLeft: "60px"}}>

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-pink" style={{minWidth: "120px"}}>
    CSSOM ✓
  </div>

</div>

</div>

</div>
<div style={{display: "flex", alignItems: "center", fontSize: "24px", color: "var(--p400)", paddingTop: "40px"}}>
  =
</div>
<div>
  <div className="flow-title" style={{textAlign: "center"}}>
    Result
  </div>
<div className="flow-steps">
  <div style={{display: "flex"}}>
    <div className="flow-node node-purple" style={{minWidth: "120px"}}>
      Render Tree
    </div>

</div>
<div className="flow-arrow" style={{marginLeft: "60px"}}>

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-teal" style={{minWidth: "120px"}}>
    Layout
  </div>

</div>
<div className="flow-arrow" style={{marginLeft: "60px"}}>

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-green" style={{minWidth: "120px"}}>
    🖥 Screen ✓
  </div>

</div>

</div>

</div>

</div>

</div>

</div>
<div className="card" id="browser-middleware">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fff7ed"}}>
      🔀
    </div>
  <div>
    <div className="card-title">
      Middleware — Visual Explainer
    </div>
  <div className="card-desc">
    Middleware intercepts actions between dispatch and the reducer — enabling logging, async calls, analytics, and more.
  </div>

</div>

</div>
<div style={{display: "flex", gap: "2rem", alignItems: "flex-start"}}>
  <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0"}}>
    <button style={{background: "linear-gradient(135deg,var(--p600),var(--b600))", color: "white", padding: "10px 28px", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", border: "none", fontFamily: "inherit"}}>🚀 Dispatch Action</button> <div style={{width: "2px", height: "24px", background: "var(--p200)", position: "relative"}}>
      <div style={{position: "absolute", bottom: "-5px", left: "-4px", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid var(--p200)"}}>

      </div>

  </div>
<div id="mw-layer1" style={{background: "#fff7ed", border: "2px solid #fed7aa", borderRadius: "10px", padding: "10px 28px", fontSize: "13px", fontWeight: 500, minWidth: "220px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", borderLeft: "6px solid #f97316"}}>
  <span style={{fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7, display: "block", marginBottom: "2px", color: "#9a3412"}}>Middleware 1</span>Logger — logs every action
</div>
<div style={{width: "2px", height: "24px", background: "#fed7aa", position: "relative"}}>
  <div style={{position: "absolute", bottom: "-5px", left: "-4px", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #fed7aa"}}>

  </div>

</div>
<div id="mw-layer2" style={{background: "#fdf2f8", border: "2px solid #f9a8d4", borderRadius: "10px", padding: "10px 28px", fontSize: "13px", fontWeight: 500, minWidth: "220px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", borderLeft: "6px solid #ec4899"}}>
  <span style={{fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7, display: "block", marginBottom: "2px", color: "#831843"}}>Middleware 2</span>Thunk — handles async
</div>
<div style={{width: "2px", height: "24px", background: "var(--p200)", position: "relative"}}>
  <div style={{position: "absolute", bottom: "-5px", left: "-4px", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid var(--p200)"}}>

  </div>

</div>
<div id="mw-reducer" style={{background: "var(--p50)", border: "2px solid var(--p200)", borderRadius: "10px", padding: "10px 28px", fontSize: "13px", fontWeight: 500, minWidth: "220px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", borderLeft: "6px solid var(--p500)"}}>
  <span style={{fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7, display: "block", marginBottom: "2px", color: "var(--p700)"}}>Reducer</span>Pure state transform
</div>
<div style={{width: "2px", height: "24px", background: "var(--b100)", position: "relative"}}>
  <div style={{position: "absolute", bottom: "-5px", left: "-4px", width: "0", height: "0", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid var(--b100)"}}>

  </div>

</div>
<div id="mw-store" style={{background: "var(--b50)", border: "2px solid var(--b100)", borderRadius: "10px", padding: "10px 28px", fontSize: "13px", fontWeight: 500, minWidth: "220px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", borderLeft: "6px solid var(--b500)"}}>
  <span style={{fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7, display: "block", marginBottom: "2px", color: "var(--b700)"}}>Store</span>New state saved
</div>

</div>
<div style={{flex: 1}}>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
    Why middleware exists
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
  <div style={{display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", lineHeight: 1.5}}>
    <span style={{color: "var(--p500)", fontSize: "16px", flexShrink: 0}}>◆</span><div>
      <b>Separation of concerns</b> — async logic stays out of components and reducers
    </div>

</div>
<div style={{display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", lineHeight: 1.5}}>
  <span style={{color: "var(--p500)", fontSize: "16px", flexShrink: 0}}>◆</span><div>
    <b>Composability</b> — multiple middlewares chain together
  </div>

</div>
<div style={{display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", lineHeight: 1.5}}>
  <span style={{color: "var(--p500)", fontSize: "16px", flexShrink: 0}}>◆</span><div>
    <b>Interception</b> — middleware can delay, modify, or cancel actions
  </div>

</div>
<div style={{display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", lineHeight: 1.5}}>
  <span style={{color: "var(--p500)", fontSize: "16px", flexShrink: 0}}>◆</span><div>
    <b>Observability</b> — logging, analytics without touching business logic
  </div>

</div>

</div>
<div id="mw-status" style={{marginTop: "1rem", fontSize: "12px", color: "var(--t3)", fontStyle: "italic"}}>
  ← Click "Dispatch Action" to see the flow animate
</div>

</div>

</div>

</div>
<div className="card" id="browser-anim">
  <div className="card-header">
    <div className="card-icon" style={{background: "#eff6ff"}}>
      🎬
    </div>
  <div>
    <div className="card-title">
      Browser Engine — Animated Pipeline
    </div>
  <div className="card-desc">
    Step-by-step animation of how the browser processes a URL request all the way to a painted page on screen.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-browser" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn on" id="br-btn">⏸ Pause</button> <button className="cbtn" onClick={() => { try { (window as any).brPrev() } catch(_) {} }}>⏮</button> <button className="cbtn" onClick={() => { try { (window as any).brNext() } catch(_) {} }}>⏭</button> <button className="cbtn" onClick={() => { try { (window as any).brReset() } catch(_) {} }}>↺ Restart</button> <span id="br-label" style={{fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono',monospace"}}></span> <div className="canvas-tag">
    Browser Rendering Pipeline
  </div>

</div>

</div>

</div>
    </>
  );
};

export default memo(BrowserPanel);
