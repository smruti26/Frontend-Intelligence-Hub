/**
 * src/panels/HCAPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * HCA section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const HCAPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#0f4c75,#1b6ca8,#4a90d9)"}}>
    <div className="hero-wm">

    </div>
  <div className="hero-tag">
    🎨 Web Foundations
  </div>
<h1>
  HTML, CSS &amp; Accessibility
</h1>
<p>
  Master semantic HTML5, modern CSS layout systems, web accessibility standards, and CSS preprocessors — the essential building blocks of every great web experience.
</p>

</div>
<div className="card" id="hca-html">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#e44d26,#f16529)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4zm13.1 4H8.9l.2 2.5h7.7l-.6 6.5-4.2 1.2-4.2-1.2-.3-3h2.4l.1 1.5 2 .5 2-.5.2-2.5H7.5l-.5-5.5h9.6l-.5 1.5z"/></svg>
    </div>
  <div>
    <div className="card-title">
      HTML5 — Semantic Web
    </div>
  <div className="card-desc">
    HTML5 introduces semantic elements that give meaning to your markup — helping browsers, screen readers, and search engines understand page structure.
  </div>

</div>

</div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: ".7rem", marginBottom: "1.2rem"}}>
  <div style={{background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: ".8rem"}}>
    <div style={{fontSize: "13px", fontWeight: 700, color: "#c2410c", marginBottom: "4px"}}>
      &lt;header&gt;
    </div>
  <div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
    Page or section header. Contains nav, logo, headings.
  </div>

</div>
<div style={{background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: ".8rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#c2410c", marginBottom: "4px"}}>
    &lt;nav&gt;
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Navigation links — main menus, breadcrumbs, pagination.
</div>

</div>
<div style={{background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: ".8rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#c2410c", marginBottom: "4px"}}>
    &lt;main&gt;
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Primary content of the page. Only one per document.
</div>

</div>
<div style={{background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: ".8rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#c2410c", marginBottom: "4px"}}>
    &lt;article&gt;
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Self-contained content: blog post, news, forum entry.
</div>

</div>
<div style={{background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: ".8rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#c2410c", marginBottom: "4px"}}>
    &lt;section&gt;
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Thematic grouping of content with a heading.
</div>

</div>
<div style={{background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: ".8rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#c2410c", marginBottom: "4px"}}>
    &lt;aside&gt;
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Tangentially related content — sidebars, callouts.
</div>

</div>
<div style={{background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: ".8rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#c2410c", marginBottom: "4px"}}>
    &lt;footer&gt;
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Footer for its nearest ancestor — copyright, links.
</div>

</div>
<div style={{background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: "10px", padding: ".8rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#c2410c", marginBottom: "4px"}}>
    &lt;figure&gt;
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Self-contained media — images, diagrams, code with captions.
</div>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: ".7rem"}}>
    🆕 HTML5 Key Features
  </div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: ".6rem"}}>
  <div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px", alignItems: "flex-start"}}>
    <span style={{color: "#e44d26", fontWeight: 700, flexShrink: 0}}>▸</span><div>
      <strong>Canvas &amp; SVG</strong> — 2D/3D drawing APIs for interactive graphics
    </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px", alignItems: "flex-start"}}>
  <span style={{color: "#e44d26", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Video &amp; Audio</strong> — native media without plugins
  </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px", alignItems: "flex-start"}}>
  <span style={{color: "#e44d26", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Web Storage</strong> — localStorage, sessionStorage
  </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px", alignItems: "flex-start"}}>
  <span style={{color: "#e44d26", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Form Inputs</strong> — date, email, range, color, tel
  </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px", alignItems: "flex-start"}}>
  <span style={{color: "#e44d26", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Geolocation API</strong> — access device location
  </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "6px", alignItems: "flex-start"}}>
  <span style={{color: "#e44d26", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Web Workers</strong> — background JS threads
  </div>

</div>

</div>

</div>

</div>
<div className="card" id="hca-css">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#264de4,#2965f1)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4zm13.3 3.5l-.3 3H9.5l.2 2h7.2l-.9 9-4 1.1-4-1.1-.3-2.9h2.4l.1 1.5 1.8.5 1.8-.5.3-3.1H8.8l-.6-9h9.1z"/></svg>
    </div>
  <div>
    <div className="card-title">
      CSS — Box Model, Flexbox &amp; Grid
    </div>
  <div className="card-desc">
    Three fundamental CSS concepts every front-end developer must master for building precise, responsive, and maintainable layouts.
  </div>

</div>

</div>
<div className="tabs" style={{marginBottom: "1rem"}}>
  <button className="tab-btn active" onClick={(e) => { try { (window as any).hcaCssTab('boxmodel', e.currentTarget) } catch(_) {} }}>📦 Box Model</button> <button className="tab-btn" onClick={(e) => { try { (window as any).hcaCssTab('flexbox', e.currentTarget) } catch(_) {} }}>↔️ Flexbox</button> <button className="tab-btn" onClick={(e) => { try { (window as any).hcaCssTab('grid', e.currentTarget) } catch(_) {} }}>⊞ Grid</button>
</div>
<div id="hca-boxmodel" className="css-panel active">
  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem"}}>
    <div>
      <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".6rem"}}>
        How the Box Model Works
      </div>
    <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.7, marginBottom: ".8rem"}}>
      Every HTML element is a rectangular box made of four layers from inside out: <strong>Content → Padding → Border → Margin</strong>. Understanding this is essential for precise spacing control.
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
    <div style={{background: "#fef2f2", borderLeft: "3px solid #ef4444", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
      <strong style={{color: "#ef4444"}}>Margin:</strong> Space outside the border — separates from other elements
    </div>
  <div style={{background: "#fff7ed", borderLeft: "3px solid #f97316", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
    <strong style={{color: "#f97316"}}>Border:</strong> Visible or invisible line around the padding
  </div>
<div style={{background: "#fefce8", borderLeft: "3px solid #eab308", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <strong style={{color: "#ca8a04"}}>Padding:</strong> Space between border and content — transparent
</div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <strong style={{color: "#16a34a"}}>Content:</strong> The actual text, image, or child elements
</div>

</div>
<div style={{marginTop: ".8rem", background: "#0d0b1e", borderRadius: "8px", padding: ".8rem", fontFamily: "'DM Mono',monospace", fontSize: "11px", lineHeight: 1.7, color: "#c8b8ff"}}>

  <span style={{color: "#4a4570"}}>/* box-sizing changes measurement */</span>
  <br/><span style={{color: "#9d8df5"}}>box-sizing</span>: content-box; <span style={{color: "#4a4570"}}>/* default */</span>
  <br/><span style={{color: "#9d8df5"}}>box-sizing</span>: border-box; <span style={{color: "#4a4570"}}>/* recommended ✓ */</span>
</div>

</div>
<div>
  <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".6rem"}}>
    Live Diagram
  </div>
<div className="canvas-card">
  <canvas id="cvs-boxmodel" data-h="220"/>

</div>

</div>

</div>

</div>
<div id="hca-flexbox" className="css-panel">
  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem"}}>
    <div>
      <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".6rem"}}>
        Flexbox — 1D Layout
      </div>
    <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.7, marginBottom: ".8rem"}}>
      Flexbox distributes items along <strong>one axis</strong> (row or column). Perfect for nav bars, card rows, centering, and component-level layouts.
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "5px", marginBottom: ".8rem"}}>
    <div style={{background: "#eef3ff", borderLeft: "3px solid #4285F4", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
      <strong style={{color: "#1a56cc"}}>display: flex</strong> — enables flex context on container
    </div>
  <div style={{background: "#eef3ff", borderLeft: "3px solid #4285F4", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
    <strong style={{color: "#1a56cc"}}>justify-content</strong> — align along main axis
  </div>
<div style={{background: "#eef3ff", borderLeft: "3px solid #4285F4", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <strong style={{color: "#1a56cc"}}>align-items</strong> — align along cross axis
</div>
<div style={{background: "#eef3ff", borderLeft: "3px solid #4285F4", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <strong style={{color: "#1a56cc"}}>flex: 1</strong> — grow to fill available space
</div>
<div style={{background: "#eef3ff", borderLeft: "3px solid #4285F4", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <strong style={{color: "#1a56cc"}}>flex-wrap: wrap</strong> — items wrap to next line
</div>

</div>

</div>
<div>
  <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".6rem"}}>
    Interactive Diagram
  </div>
<div className="canvas-card">
  <canvas id="cvs-flexbox" data-h="220"/>

<div className="canvas-controls">
  <button className="cbtn active" onClick={(e) => { try { (window as any).flexMode('row', e.currentTarget) } catch(_) {} }}>→ Row</button> <button className="cbtn" onClick={(e) => { try { (window as any).flexMode('column', e.currentTarget) } catch(_) {} }}>↓ Column</button> <button className="cbtn" onClick={(e) => { try { (window as any).flexMode('space', e.currentTarget) } catch(_) {} }}>⇔ Space</button> <button className="cbtn" onClick={(e) => { try { (window as any).flexMode('center', e.currentTarget) } catch(_) {} }}>⊙ Center</button>
</div>

</div>

</div>

</div>

</div>
<div id="hca-grid" className="css-panel">
  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem"}}>
    <div>
      <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".6rem"}}>
        CSS Grid — 2D Layout
      </div>
    <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.7, marginBottom: ".8rem"}}>
      Grid works in <strong>both axes simultaneously</strong>. Perfect for page layouts, dashboards, image galleries, and any 2D structure.
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "5px", marginBottom: ".8rem"}}>
    <div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
      <strong style={{color: "#16a34a"}}>display: grid</strong> — enables grid on container
    </div>
  <div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
    <strong style={{color: "#16a34a"}}>grid-template-columns</strong> — define column sizes
  </div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <strong style={{color: "#16a34a"}}>grid-template-rows</strong> — define row sizes
</div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <strong style={{color: "#16a34a"}}>grid-column: 1 / -1</strong> — span all columns
</div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <strong style={{color: "#16a34a"}}>fr unit</strong> — fractional share of available space
</div>

</div>

</div>
<div>
  <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".6rem"}}>
    Interactive Diagram
  </div>
<div className="canvas-card">
  <canvas id="cvs-grid" data-h="220"/>

<div className="canvas-controls">
  <button className="cbtn active" onClick={(e) => { try { (window as any).gridMode('basic', e.currentTarget) } catch(_) {} }}>3-Col Grid</button> <button className="cbtn" onClick={(e) => { try { (window as any).gridMode('layout', e.currentTarget) } catch(_) {} }}>Page Layout</button> <button className="cbtn" onClick={(e) => { try { (window as any).gridMode('areas', e.currentTarget) } catch(_) {} }}>Grid Areas</button>
</div>

</div>

</div>

</div>

</div>

</div>
<div className="card" id="hca-a11y">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><circle cx="12" cy="4" r="2"/><path d="M12 8c-4 0-7 1.5-7 4v1h14v-1c0-2.5-3-4-7-4zM5 15l1 6h2l1-4 1 4h2l1-6H5z" fill="white"/></svg>
    </div>
  <div>
    <div className="card-title">
      Web Accessibility (a11y)
    </div>
  <div className="card-desc">
    Accessibility ensures your web app is usable by everyone — including people with visual, auditory, motor, or cognitive disabilities. It's not optional; it's a right.
  </div>

</div>

</div>
<div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.2rem"}}>
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
    <div style={{fontSize: "24px", marginBottom: "6px"}}>
      👁️
    </div>
  <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
    Visual
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  ~285M people with visual impairment rely on screen readers, high contrast, zoom
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "24px", marginBottom: "6px"}}>
    🦻
  </div>
<div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
  Auditory
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  ~430M rely on captions, transcripts, and visual alerts for audio content
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "24px", marginBottom: "6px"}}>
    🖱️
  </div>
<div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
  Motor
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Keyboard-only users, switch devices, voice control — need full keyboard support
</div>

</div>

</div>
<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.2rem"}}>
  <div>
    <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".7rem"}}>
      WCAG 4 Principles (POUR)
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
    <div style={{display: "flex", gap: "10px", alignItems: "flex-start"}}>
      <div style={{width: "28px", height: "28px", background: "linear-gradient(135deg,#059669,#10b981)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0}}>
        P
      </div>
    <div>
      <div style={{fontSize: "12px", fontWeight: 600, color: "var(--t1)"}}>
        Perceivable
      </div>
    <div style={{fontSize: "11.5px", color: "var(--t2)"}}>
      Info presentable in ways users can perceive — alt text, captions
    </div>

</div>

</div>
<div style={{display: "flex", gap: "10px", alignItems: "flex-start"}}>
  <div style={{width: "28px", height: "28px", background: "linear-gradient(135deg,#0369a1,#0ea5e9)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0}}>
    O
  </div>
<div>
  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--t1)"}}>
    Operable
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)"}}>
  All functions operable via keyboard — no keyboard traps
</div>

</div>

</div>
<div style={{display: "flex", gap: "10px", alignItems: "flex-start"}}>
  <div style={{width: "28px", height: "28px", background: "linear-gradient(135deg,#7c3aed,#a855f7)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0}}>
    U
  </div>
<div>
  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--t1)"}}>
    Understandable
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)"}}>
  Content readable and predictable — error suggestions
</div>

</div>

</div>
<div style={{display: "flex", gap: "10px", alignItems: "flex-start"}}>
  <div style={{width: "28px", height: "28px", background: "linear-gradient(135deg,#dc2626,#ef4444)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0}}>
    R
  </div>
<div>
  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--t1)"}}>
    Robust
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)"}}>
  Content parseable by assistive tech — valid HTML, ARIA
</div>

</div>

</div>

</div>

</div>
<div>
  <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".7rem"}}>
    Key Practices
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
  <div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
    <code style={{background: "#dcfce7", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>alt=""</code> — descriptive alt text on all images
  </div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <code style={{background: "#dcfce7", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>role=""</code> — ARIA roles for custom components
</div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <code style={{background: "#dcfce7", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>aria-label</code> — label elements without visible text
</div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <code style={{background: "#dcfce7", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>tabindex</code> — manage keyboard focus order
</div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <code style={{background: "#dcfce7", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>focus-visible</code> — visible focus rings always
</div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "5px", padding: "6px 10px", fontSize: "11.5px"}}>
  <code style={{background: "#dcfce7", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>color contrast ≥4.5:1</code> for normal text (WCAG AA)
</div>

</div>

</div>

</div>
<div style={{background: "linear-gradient(135deg,#ecfdf5,#f0fdf4)", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "1rem", display: "flex", gap: "12px", alignItems: "flex-start"}}>
  <span style={{fontSize: "20px", flexShrink: 0}}>💡</span> <div style={{fontSize: "12.5px", color: "#065f46", lineHeight: 1.6}}>
    <strong>Semantic HTML IS accessibility.</strong> Using &lt;button&gt; instead of &lt;div onclick&gt;, &lt;label&gt; with inputs, proper heading hierarchy (h1→h2→h3) and landmark elements (&lt;main&gt;, &lt;nav&gt;) gives screen readers all the context they need — often for free.
  </div>

</div>

</div>
<div className="card" id="hca-preprocessors">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#cc6699,#a8518a)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
    </div>
  <div>
    <div className="card-title">
      CSS Preprocessors — SASS &amp; LESS
    </div>
  <div className="card-desc">
    Preprocessors extend CSS with variables, nesting, mixins, and functions. They compile down to standard CSS — giving you superpowers without breaking browser compatibility.
  </div>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0", flexWrap: "wrap", justifyContent: "center"}}>
  <div style={{textAlign: "center", padding: ".6rem 1rem"}}>
    <div style={{fontSize: "22px"}}>
      📝
    </div>
  <div style={{fontSize: "11px", fontWeight: 600, color: "var(--t2)", marginTop: "4px"}}>
    .scss / .less
  </div>
<div style={{fontSize: "10px", color: "var(--t3)"}}>
  Source file
</div>

</div>
<div style={{fontSize: "20px", color: "var(--p400)", padding: "0 .5rem"}}>
  →
</div>
<div style={{textAlign: "center", padding: ".6rem 1rem"}}>
  <div style={{fontSize: "22px"}}>
    ⚙️
  </div>
<div style={{fontSize: "11px", fontWeight: 600, color: "var(--t2)", marginTop: "4px"}}>
  Compiler
</div>
<div style={{fontSize: "10px", color: "var(--t3)"}}>
  node-sass / less.js
</div>

</div>
<div style={{fontSize: "20px", color: "var(--p400)", padding: "0 .5rem"}}>
  →
</div>
<div style={{textAlign: "center", padding: ".6rem 1rem"}}>
  <div style={{fontSize: "22px"}}>
    🎨
  </div>
<div style={{fontSize: "11px", fontWeight: 600, color: "var(--t2)", marginTop: "4px"}}>
  styles.css
</div>
<div style={{fontSize: "10px", color: "var(--t3)"}}>
  Standard CSS
</div>

</div>
<div style={{fontSize: "20px", color: "var(--p400)", padding: "0 .5rem"}}>
  →
</div>
<div style={{textAlign: "center", padding: ".6rem 1rem"}}>
  <div style={{fontSize: "22px"}}>
    🌐
  </div>
<div style={{fontSize: "11px", fontWeight: 600, color: "var(--t2)", marginTop: "4px"}}>
  Browser
</div>
<div style={{fontSize: "10px", color: "var(--t3)"}}>
  Renders styles
</div>

</div>

</div>
<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.2rem"}}>
  <div style={{background: "#fdf2f8", border: "1px solid #f9a8d4", borderRadius: "12px", padding: "1.1rem"}}>
    <div style={{fontSize: "14px", fontWeight: 700, color: "#be185d", marginBottom: ".8rem", display: "flex", alignItems: "center", gap: "7px"}}>
      <span style={{fontSize: "20px"}}>💅</span> SASS / SCSS
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "5px", marginBottom: ".8rem"}}>
    <div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
      <span style={{color: "#be185d"}}>▸</span>Two syntaxes: SASS (indented) and SCSS (CSS-like)
    </div>
  <div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
    <span style={{color: "#be185d"}}>▸</span>Variables with <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>$variable</code> syntax
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#be185d"}}>▸</span>Powerful <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@mixin</code> and <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@include</code>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#be185d"}}>▸</span><code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@extend</code> for sharing styles between selectors
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#be185d"}}>▸</span>Built-in functions: <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>darken(), lighten(), mix()</code>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#be185d"}}>▸</span>Most popular — used by Bootstrap, Bulma
</div>

</div>
<div style={{background: "#0d0b1e", borderRadius: "8px", padding: ".7rem", fontFamily: "'DM Mono',monospace", fontSize: "10.5px", lineHeight: 1.7, color: "#c8b8ff"}} dangerouslySetInnerHTML={{__html: `<span style={{color: "#f9a8d4"}}>$primary</span>: <span style={{color: "#86efac"}}>#6c5dd3</span>;<br/> <span style={{color: "#f9a8d4"}}>$radius</span>: <span style={{color: "#fbbf24"}}>8px</span>;<br/><br/> <span style={{color: "#60a5fa"}}>@mixin</span> <span style={{color: "#fbbf24"}}>flex-center</span> {<br/> &nbsp;&nbsp;<span style={{color: "#f9a8d4"}}>display</span>: flex;<br/> &nbsp;&nbsp;<span style={{color: "#f9a8d4"}}>align-items</span>: center;<br/> }<br/><br/> <span style={{color: "#60a5fa"}}>.button</span> {<br/> &nbsp;&nbsp;<span style={{color: "#60a5fa"}}>@include</span> flex-center;<br/> &nbsp;&nbsp;<span style={{color: "#f9a8d4"}}>background</span>: <span style={{color: "#f9a8d4"}}>$primary</span>;<br/> &nbsp;&nbsp;<span style={{color: "#f9a8d4"}}>border-radius</span>: <span style={{color: "#f9a8d4"}}>$radius</span>;<br/> }`}}/>

</div>
<div style={{background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "12px", padding: "1.1rem"}}>
  <div style={{fontSize: "14px", fontWeight: 700, color: "#92400e", marginBottom: ".8rem", display: "flex", alignItems: "center", gap: "7px"}}>
    <span style={{fontSize: "20px"}}>🔷</span> LESS
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "5px", marginBottom: ".8rem"}}>
  <div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
    <span style={{color: "#d97706"}}>▸</span>One syntax — close to regular CSS, easier to learn
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#d97706"}}>▸</span>Variables with <code style={{background: "#fef3c7", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@variable</code> syntax
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#d97706"}}>▸</span>Mixins are classes called directly — no <code style={{background: "#fef3c7", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@mixin</code>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#d97706"}}>▸</span>Can run in browser via less.js (SASS cannot)
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#d97706"}}>▸</span>Operations: <code style={{background: "#fef3c7", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@base * 2, @color + #111</code>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px"}}>
  <span style={{color: "#d97706"}}>▸</span>Used by Bootstrap 3, Ant Design
</div>

</div>
<div style={{background: "#0d0b1e", borderRadius: "8px", padding: ".7rem", fontFamily: "'DM Mono',monospace", fontSize: "10.5px", lineHeight: 1.7, color: "#c8b8ff"}} dangerouslySetInnerHTML={{__html: `<span style={{color: "#fde68a"}}>@primary</span>: <span style={{color: "#86efac"}}>#6c5dd3</span>;<br/> <span style={{color: "#fde68a"}}>@radius</span>: <span style={{color: "#fbbf24"}}>8px</span>;<br/><br/> <span style={{color: "#60a5fa"}}>.flex-center</span>() {<br/> &nbsp;&nbsp;<span style={{color: "#fde68a"}}>display</span>: flex;<br/> &nbsp;&nbsp;<span style={{color: "#fde68a"}}>align-items</span>: center;<br/> }<br/><br/> <span style={{color: "#60a5fa"}}>.button</span> {<br/> &nbsp;&nbsp;<span style={{color: "#60a5fa"}}>.flex-center</span>();<br/> &nbsp;&nbsp;<span style={{color: "#fde68a"}}>background</span>: <span style={{color: "#fde68a"}}>@primary</span>;<br/> &nbsp;&nbsp;<span style={{color: "#fde68a"}}>border-radius</span>: <span style={{color: "#fde68a"}}>@radius</span>;<br/> }`}}/>

</div>

</div>
<div style={{background: "linear-gradient(135deg,var(--p50),var(--b50))", border: "1px solid var(--border2)", borderRadius: "12px", padding: "1.2rem", marginBottom: "1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "var(--t1)", marginBottom: ".8rem", display: "flex", alignItems: "center", gap: "8px"}}>
    <span style={{fontSize: "18px"}}>⚖️</span> Key Differences — SASS vs LESS

  </div>
<p style={{fontSize: "12.5px", color: "var(--t2)", lineHeight: 1.7, marginBottom: "1rem"}}>

  Sass and Less are both CSS preprocessors that extend the capabilities of standard CSS with features like variables, nesting, and mixins. The primary differences lie in their <strong>programming base</strong> (Sass is Ruby/Dart-based; Less is JavaScript-based), <strong>syntax variations</strong>, and the extent of their feature sets.

</p>
<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".8rem"}}>
  <div style={{background: "var(--surface)", border: "1px solid #f9a8d4", borderRadius: "10px", padding: ".9rem"}}>
    <div style={{fontSize: "12px", fontWeight: 700, color: "#be185d", marginBottom: ".6rem"}}>
      💅 SASS / SCSS
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
    <div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
      <span style={{color: "#be185d", flexShrink: 0}}>▸</span><span><strong>Base:</strong> Ruby (original) / Dart (modern)</span>
    </div>
  <div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
    <span style={{color: "#be185d", flexShrink: 0}}>▸</span><span><strong>Variable:</strong> <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>$primary</code></span>
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#be185d", flexShrink: 0}}>▸</span><span><strong>Mixins:</strong> <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@mixin</code> + <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@include</code></span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#be185d", flexShrink: 0}}>▸</span><span><strong>Inheritance:</strong> <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@extend</code></span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#be185d", flexShrink: 0}}>▸</span><span><strong>Logic:</strong> <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@if</code>, <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@for</code>, <code style={{background: "#fce7f3", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@each</code></span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#be185d", flexShrink: 0}}>▸</span><span><strong>Compile:</strong> Node CLI / Dart standalone</span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#be185d", flexShrink: 0}}>▸</span><span><strong>Community:</strong> Larger — used by Bootstrap 5</span>
</div>

</div>

</div>
<div style={{background: "var(--surface)", border: "1px solid #fde68a", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "#92400e", marginBottom: ".6rem"}}>
    🔷 LESS
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
  <div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
    <span style={{color: "#d97706", flexShrink: 0}}>▸</span><span><strong>Base:</strong> JavaScript (Node.js)</span>
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#d97706", flexShrink: 0}}>▸</span><span><strong>Variable:</strong> <code style={{background: "#fef3c7", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>@primary</code></span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#d97706", flexShrink: 0}}>▸</span><span><strong>Mixins:</strong> call class directly — no keyword</span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#d97706", flexShrink: 0}}>▸</span><span><strong>Inheritance:</strong> <code style={{background: "#fef3c7", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>&:extend()</code></span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#d97706", flexShrink: 0}}>▸</span><span><strong>Logic:</strong> limited — guarded mixins only</span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#d97706", flexShrink: 0}}>▸</span><span><strong>Compile:</strong> Runs in browser via less.js</span>
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.45}}>
  <span style={{color: "#d97706", flexShrink: 0}}>▸</span><span><strong>Community:</strong> Smaller — used by Bootstrap 3</span>
</div>

</div>

</div>

</div>
<div style={{marginTop: ".9rem", overflowX: "auto"}}>
  <table style={{width: "100%", borderCollapse: "collapse", fontSize: "11.5px"}}>
    <thead>
      <tr style={{background: "var(--bg)"}}>
        <th style={{padding: "7px 10px", textAlign: "left", borderBottom: "2px solid var(--border2)", color: "var(--t1)", fontWeight: 700}}>
          Feature
        </th>
      <th style={{padding: "7px 10px", textAlign: "center", borderBottom: "2px solid #f9a8d4", color: "#be185d", fontWeight: 700}}>
        SASS/SCSS
      </th>
    <th style={{padding: "7px 10px", textAlign: "center", borderBottom: "2px solid #fde68a", color: "#92400e", fontWeight: 700}}>
      LESS
    </th>

</tr>

</thead>
<tbody>
  <tr style={{borderBottom: "1px solid var(--border)"}}>
    <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
      Language base
    </td>
  <td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
    Ruby / Dart
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  JavaScript
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)", background: "var(--bg)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Variable syntax
  </td>
<td style={{padding: "6px 10px", textAlign: "center"}}>
  <code style={{background: "#fce7f3", padding: "1px 5px", borderRadius: "3px", color: "#be185d"}}>$var</code>
</td>
<td style={{padding: "6px 10px", textAlign: "center"}}>
  <code style={{background: "#fef3c7", padding: "1px 5px", borderRadius: "3px", color: "#92400e"}}>@var</code>
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Mixin syntax
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  @mixin / @include
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  Class call ()
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)", background: "var(--bg)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Conditional logic
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#22c55e", fontWeight: 600}}>
  ✅ Full @if/@for/@each
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#f97316", fontWeight: 600}}>
  ⚠️ Limited
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Browser compile
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#ef4444", fontWeight: 600}}>
  ❌ No
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#22c55e", fontWeight: 600}}>
  ✅ Via less.js
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)", background: "var(--bg)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Ecosystem
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  Bootstrap 5, Bulma
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  Bootstrap 3, Ant Design
</td>

</tr>
<tr>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Recommendation
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#22c55e", fontWeight: 700}}>
  ⭐ Preferred today
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t3)"}}>
  Legacy projects
</td>

</tr>

</tbody>

</table>

</div>

</div>
<div style={{marginTop: "1rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".6rem"}}>
    Animated Diagram — Preprocessor Compilation Pipeline
  </div>
<div className="canvas-card">
  <canvas id="cvs-preprocessors" data-h="180"/>

</div>

</div>

</div>
    </>
  );
};

export default memo(HCAPanel);
