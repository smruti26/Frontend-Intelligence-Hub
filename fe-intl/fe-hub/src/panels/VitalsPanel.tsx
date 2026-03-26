/**
 * src/panels/VitalsPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * VITALS section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const VitalsPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#059669,#0ea5e9)"}}>
    <div className="hero-tag">
      📊 Performance
    </div>
  <h1>
    Core Web Vitals
  </h1>
<p>
  Google's set of real-world performance metrics — LCP, INP, CLS and more — that measure how users actually experience your site's loading, interactivity and visual stability.
</p>

</div>
<div className="card" id="vitals-overview">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfdf5"}}>
      📊
    </div>
  <div>
    <div className="card-title">
      Core Web Vitals — The Three Pillars
    </div>
  <div className="card-desc">
    Google's three Core Web Vitals measure Loading, Interactivity, and Visual Stability. They directly impact Search ranking and user satisfaction.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-vitals" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).vitalsAnim('lcp') } catch(_) {} }}>🖼 LCP</button> <button className="cbtn" onClick={() => { try { (window as any).vitalsAnim('inp') } catch(_) {} }}>👆 INP</button> <button className="cbtn" onClick={() => { try { (window as any).vitalsAnim('cls') } catch(_) {} }}>📐 CLS</button> <button className="cbtn" onClick={() => { try { (window as any).vitalsAnim('all') } catch(_) {} }}>📊 All Metrics</button> <div className="canvas-tag">
    Core Web Vitals
  </div>

</div>

</div>
<div className="rg-3 mt1">
  <div style={{background: "#ecfdf5", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "1.2rem", borderLeft: "4px solid #10b981"}}>
    <div style={{fontSize: "14px", fontWeight: 700, color: "#065f46", marginBottom: "6px"}}>
      🖼 LCP
    </div>
  <div style={{fontSize: "12px", fontWeight: 600, color: "#059669", marginBottom: "4px"}}>
    Largest Contentful Paint
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
  Time until the largest image or text block is visible. <b>Good: &lt;2.5s</b> · Needs work: 2.5–4s · Poor: &gt;4s
</div>
<div style={{marginTop: "8px", display: "flex", gap: "6px", fontSize: "10px"}}>
  <span style={{background: "#ecfdf5", border: "1px solid #10b981", borderRadius: "4px", padding: "2px 6px", color: "#065f46"}}>✅ &lt;2.5s</span><span style={{background: "#fff7ed", border: "1px solid #f59e0b", borderRadius: "4px", padding: "2px 6px", color: "#92400e"}}>⚠ 2.5–4s</span><span style={{background: "#fef2f2", border: "1px solid #ef4444", borderRadius: "4px", padding: "2px 6px", color: "#991b1b"}}>❌ &gt;4s</span>
</div>

</div>
<div style={{background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "1.2rem", borderLeft: "4px solid #3b82f6"}}>
  <div style={{fontSize: "14px", fontWeight: 700, color: "#1e40af", marginBottom: "6px"}}>
    👆 INP
  </div>
<div style={{fontSize: "12px", fontWeight: 600, color: "#2563eb", marginBottom: "4px"}}>
  Interaction to Next Paint
</div>
<div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
  Latency of all user interactions (click, tap, keypress). Replaced FID in 2024. <b>Good: &lt;200ms</b>
</div>
<div style={{marginTop: "8px", display: "flex", gap: "6px", fontSize: "10px"}}>
  <span style={{background: "#eff6ff", border: "1px solid #3b82f6", borderRadius: "4px", padding: "2px 6px", color: "#1e40af"}}>✅ &lt;200ms</span><span style={{background: "#fff7ed", border: "1px solid #f59e0b", borderRadius: "4px", padding: "2px 6px", color: "#92400e"}}>⚠ 200–500ms</span><span style={{background: "#fef2f2", border: "1px solid #ef4444", borderRadius: "4px", padding: "2px 6px", color: "#991b1b"}}>❌ &gt;500ms</span>
</div>

</div>
<div style={{background: "#fdf4ff", border: "1px solid #e9d5ff", borderRadius: "12px", padding: "1.2rem", borderLeft: "4px solid #a855f7"}}>
  <div style={{fontSize: "14px", fontWeight: 700, color: "#581c87", marginBottom: "6px"}}>
    📐 CLS
  </div>
<div style={{fontSize: "12px", fontWeight: 600, color: "#7c3aed", marginBottom: "4px"}}>
  Cumulative Layout Shift
</div>
<div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
  Unexpected layout shifts while loading. Set size on images/embeds to prevent. <b>Good: &lt;0.1</b>
</div>
<div style={{marginTop: "8px", display: "flex", gap: "6px", fontSize: "10px"}}>
  <span style={{background: "#fdf4ff", border: "1px solid #a855f7", borderRadius: "4px", padding: "2px 6px", color: "#581c87"}}>✅ &lt;0.1</span><span style={{background: "#fff7ed", border: "1px solid #f59e0b", borderRadius: "4px", padding: "2px 6px", color: "#92400e"}}>⚠ 0.1–0.25</span><span style={{background: "#fef2f2", border: "1px solid #ef4444", borderRadius: "4px", padding: "2px 6px", color: "#991b1b"}}>❌ &gt;0.25</span>
</div>

</div>

</div>

</div>
<div className="card" id="vitals-other">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef9c3"}}>
      ⚡
    </div>
  <div>
    <div className="card-title">
      Supporting Metrics — TTFB, FCP, TBT
    </div>
  <div className="card-desc">
    Beyond the three Core Vitals, these diagnostic metrics pinpoint bottlenecks in the loading pipeline.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-vitals-timeline" data-h="220"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).vitalsTimelineAnim('good') } catch(_) {} }}>✅ Good Page</button> <button className="cbtn" onClick={() => { try { (window as any).vitalsTimelineAnim('poor') } catch(_) {} }}>❌ Poor Page</button> <div className="canvas-tag">
    Loading Timeline
  </div>

</div>

</div>
<div className="rg-4 mt1">
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
    <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px", color: "var(--t1)"}}>
      🚀 TTFB
    </div>
  <div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
    Time To First Byte — server response speed. Good: &lt;800ms. Reduce with CDN, caching, edge functions.
  </div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px", color: "var(--t1)"}}>
    🎨 FCP
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
  First Contentful Paint — first text or image. Good: &lt;1.8s. Eliminate render-blocking resources.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px", color: "var(--t1)"}}>
    🧱 TBT
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
  Total Blocking Time — JS tasks blocking main thread. Good: &lt;200ms. Split long tasks, use Web Workers.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px", color: "var(--t1)"}}>
    ⏱ TTI
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
  Time To Interactive — fully responsive. Good: &lt;3.8s. Defer non-critical JS, minimize main-thread work.
</div>

</div>

</div>

</div>
<div className="card" id="vitals-optimize">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfdf5"}}>
      🛠️
    </div>
  <div>
    <div className="card-title">
      Optimization Strategies
    </div>
  <div className="card-desc">
    Practical techniques to improve each metric — from image loading to JavaScript execution to layout stability.
  </div>

</div>

</div>
<div className="rg-3">
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.2rem"}}>
    <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px", color: "#059669"}}>
      Improve LCP
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
    <div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
      <span style={{color: "#059669"}}>▸</span>Preload hero images with <code>&lt;link rel="preload"&gt;</code>
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
    <span style={{color: "#059669"}}>▸</span>Use next-gen formats (WebP, AVIF)
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#059669"}}>▸</span>Server-side render above-the-fold content
</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#059669"}}>▸</span>Eliminate render-blocking CSS/JS
</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#059669"}}>▸</span>Use CDN for static assets
</div>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.2rem"}}>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px", color: "#2563eb"}}>
    Improve INP
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
  <div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
    <span style={{color: "#2563eb"}}>▸</span>Break long tasks with <code>setTimeout(0)</code>
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#2563eb"}}>▸</span>Offload to Web Workers
</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#2563eb"}}>▸</span>Use React <code>startTransition</code> for non-urgent updates
</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#2563eb"}}>▸</span>Avoid layout thrashing in event handlers
</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#2563eb"}}>▸</span>Virtualize long lists
</div>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.2rem"}}>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px", color: "#7c3aed"}}>
    Improve CLS
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
  <div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
    <span style={{color: "#7c3aed"}}>▸</span>Always set <code>width</code> + <code>height</code> on images
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#7c3aed"}}>▸</span>Reserve space for ads/embeds
</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#7c3aed"}}>▸</span>Use <code>font-display: optional</code> or preload fonts
</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#7c3aed"}}>▸</span>Avoid inserting content above existing content
</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#7c3aed"}}>▸</span>Use CSS <code>aspect-ratio</code> for responsive media
</div>

</div>

</div>

</div>

</div>
    </>
  );
};

export default memo(VitalsPanel);
