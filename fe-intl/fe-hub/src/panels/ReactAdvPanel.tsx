/**
 * src/panels/ReactAdvPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * REACT-ADV section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const ReactAdvPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#0ea5e9,#6366f1)"}}>
    <div className="hero-tag">
      ⚛ Advanced React
    </div>
  <h1>
    React Internals & Patterns
  </h1>
<p>
  Deep-dive into React Fiber, Higher-Order Components, Context API, Portals, and Fragments — with live animated diagrams.
</p>

</div>
<div className="card" id="radv-fiber">
  <div className="card-header">
    <div className="card-icon" style={{background: "#e0f2fe"}}>
      🧵
    </div>
  <div>
    <div className="card-title">
      React Fiber — Reconciliation Engine
    </div>
  <div className="card-desc">
    Fiber is React's reimplemented reconciliation algorithm. It breaks rendering into small units of work, enabling interruption, prioritization, and concurrency.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-fiber" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).fiberAnim('render') } catch(_) {} }}>▶ Render Phase</button> <button className="cbtn" onClick={() => { try { (window as any).fiberAnim('commit') } catch(_) {} }}>💾 Commit Phase</button> <button className="cbtn" onClick={() => { try { (window as any).fiberAnim('interrupt') } catch(_) {} }}>⏸ Interrupt</button> <div className="canvas-tag">
    React Fiber Scheduler
  </div>

</div>

</div>
<div className="divider">

</div>
<div className="rg-3 mt1">
  <div style={{background: "var(--b50)", border: "1px solid var(--b100)", borderRadius: "10px", padding: "1rem"}}>
    <div style={{fontSize: "13px", fontWeight: 600, color: "var(--b700)", marginBottom: "6px"}}>
      🔍 Render Phase
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.5}}>
    Traverses the fiber tree, computes changes. Can be paused/resumed. No side effects yet.
  </div>

</div>
<div style={{background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 600, color: "var(--p700)", marginBottom: "6px"}}>
    💾 Commit Phase
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.5}}>
  Applies DOM changes synchronously. Runs useLayoutEffect, then useEffect after paint.
</div>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 600, color: "#065f46", marginBottom: "6px"}}>
    ⚡ Concurrent Mode
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.5}}>
  Fiber enables React to yield control back to the browser between units of work, keeping UI responsive.
</div>

</div>

</div>

</div>
<div className="card" id="radv-hoc">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef9c3"}}>
      🔁
    </div>
  <div>
    <div className="card-title">
      Higher-Order Components (HOC)
    </div>
  <div className="card-desc">
    A HOC is a function that takes a component and returns a new enhanced component — the classic pattern for cross-cutting concerns like auth, logging, and theming.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-hoc" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).hocAnim('auth') } catch(_) {} }}>🔒 withAuth</button> <button className="cbtn" onClick={() => { try { (window as any).hocAnim('theme') } catch(_) {} }}>🎨 withTheme</button> <button className="cbtn" onClick={() => { try { (window as any).hocAnim('log') } catch(_) {} }}>📝 withLogger</button> <div className="canvas-tag">
    HOC Pattern
  </div>

</div>

</div>
<div className="code-block code-keyword" style={{marginTop: "1rem", fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>const</span> withAuth = (WrappedComponent) => (props) => {<br/>&nbsp;&nbsp;<span className="code-keyword">const</span> { isAuthenticated } = <span className="code-func">useAuth</span>();<br/>&nbsp;&nbsp;<span className="code-keyword">if</span> (!isAuthenticated) <span className="code-keyword">return</span> &lt;Redirect to=<span className="code-string">"/login"</span> /&gt;;<br/>&nbsp;&nbsp;<span className="code-keyword">return</span> &lt;WrappedComponent &#123;...props&#125; /&gt;;<br/>};<br/><span className="code-keyword">export default</span> <span className="code-func">withAuth</span>(Dashboard); `}}/>

</div>
<div className="card" id="radv-context">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ede9fe"}}>
      🌐
    </div>
  <div>
    <div className="card-title">
      React Context API
    </div>
  <div className="card-desc">
    Context provides a way to pass data through the component tree without manually passing props at every level — ideal for themes, auth state, and locale.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-context" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).contextAnim('provide') } catch(_) {} }}>📡 Provide Value</button> <button className="cbtn" onClick={() => { try { (window as any).contextAnim('consume') } catch(_) {} }}>🎣 Consume</button> <button className="cbtn" onClick={() => { try { (window as any).contextAnim('update') } catch(_) {} }}>🔄 Update Context</button> <div className="canvas-tag">
    React Context API
  </div>

</div>

</div>
<div className="code-block code-keyword" style={{fontSize: "11px", marginTop: "1rem"}} dangerouslySetInnerHTML={{__html: ` <span>const</span> ThemeContext = React.<span className="code-func">createContext</span>(<span className="code-string">'light'</span>);<br/><span className="code-comment">// Provider wraps tree</span><br/>&lt;ThemeContext.Provider value=<span className="code-string">"dark"</span>&gt;&lt;App /&gt;&lt;/ThemeContext.Provider&gt;<br/><span className="code-comment">// Consumer anywhere in tree</span><br/><span className="code-keyword">const</span> theme = <span className="code-func">useContext</span>(ThemeContext); <span className="code-comment">// → "dark"</span> `}}/>

</div>
<div className="card" id="radv-portal">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fdf2f8"}}>
      🚪
    </div>
  <div>
    <div className="card-title">
      React Portal
    </div>
  <div className="card-desc">
    Portals render children into a DOM node outside the parent component's DOM hierarchy — perfect for modals, tooltips, and dropdowns that need to escape overflow:hidden.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-portal" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).portalAnim('open') } catch(_) {} }}>🚪 Open Modal</button> <button className="cbtn" onClick={() => { try { (window as any).portalAnim('event') } catch(_) {} }}>⚡ Event Bubble</button> <div className="canvas-tag">
    ReactDOM.createPortal
  </div>

</div>

</div>
<div className="code-block code-keyword" style={{fontSize: "11px", marginTop: "1rem"}} dangerouslySetInnerHTML={{__html: ` <span>const</span> Modal = ({ children }) =&gt; ReactDOM.<span className="code-func">createPortal</span>(<br/>&nbsp;&nbsp;&lt;div className=<span className="code-string">"modal"</span>&gt;{children}&lt;/div&gt;,<br/>&nbsp;&nbsp;document.<span className="code-func">getElementById</span>(<span className="code-string">'portal-root'</span>) <span className="code-comment">// outside #app</span><br/>); `}}/>

</div>
<div className="card" id="radv-fragment">
  <div className="card-header">
    <div className="card-icon" style={{background: "#f0fdf4"}}>
      🧩
    </div>
  <div>
    <div className="card-title">
      React Fragment
    </div>
  <div className="card-desc">
    Fragments let you group elements without adding extra nodes to the DOM — keeping the HTML semantic and avoiding div-soup in table rows, list items, and flex children.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-fragment" data-h="220"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).fragmentAnim('with') } catch(_) {} }}>✅ With Fragment</button> <button className="cbtn" onClick={() => { try { (window as any).fragmentAnim('without') } catch(_) {} }}>❌ Without Fragment</button> <div className="canvas-tag">
    React.Fragment
  </div>

</div>

</div>
<div className="rg-2 mt1">
  <div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// ✅ Fragment — no extra DOM node</span><br/><span className="code-keyword">return</span> (<br/>&nbsp;&nbsp;&lt;&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Name&lt;/td&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Age&lt;/td&gt;<br/>&nbsp;&nbsp;&lt;/&gt;<br/>); `}}/>
<div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// ❌ Extra &lt;div&gt; breaks table</span><br/><span className="code-keyword">return</span> (<br/>&nbsp;&nbsp;&lt;div&gt; <span className="code-comment">// invalid in &lt;tr&gt;!</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Name&lt;/td&gt;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Age&lt;/td&gt;<br/>&nbsp;&nbsp;&lt;/div&gt;<br/>); `}}/>

</div>

</div>
<div className="card" id="radv-errorboundary">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#dc2626,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"> <path d="M12 2L2 19h20L12 2z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/> <path d="M12 9v5M12 16.5v.5" stroke="white" strokeWidth="2" strokeLinecap="round"/> </svg>
    </div>
  <div>
    <div className="card-title">
      React Error Boundaries
    </div>
  <div className="card-desc">
    Error Boundaries are React components that catch JavaScript errors during rendering, in lifecycle methods, and in constructors within their child component tree — logging errors and displaying a fallback UI instead of crashing the entire application.
  </div>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.1rem", marginBottom: "1.2rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".8rem"}}>
    How Error Boundaries Work
  </div>
<div style={{display: "flex", alignItems: "center", gap: "0", flexWrap: "wrap", justifyContent: "center", gap: ".5rem"}}>
  <div style={{background: "#fff1f2", border: "1.5px solid #fca5a5", borderRadius: "9px", padding: ".6rem 1rem", textAlign: "center", minWidth: "110px"}}>
    <div style={{fontSize: "18px", marginBottom: "3px"}}>
      💥
    </div>
  <div style={{fontSize: "11px", fontWeight: 700, color: "#dc2626"}}>
    JS Error Thrown
  </div>
<div style={{fontSize: "10px", color: "var(--t3)"}}>
  in child tree
</div>

</div>
<div style={{fontSize: "18px", color: "var(--p400)"}}>
  →
</div>
<div style={{background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: "9px", padding: ".6rem 1rem", textAlign: "center", minWidth: "110px"}}>
  <div style={{fontSize: "18px", marginBottom: "3px"}}>
    🛡️
  </div>
<div style={{fontSize: "11px", fontWeight: 700, color: "#1d4ed8"}}>
  Error Boundary
</div>
<div style={{fontSize: "10px", color: "var(--t3)"}}>
  catches the error
</div>

</div>
<div style={{fontSize: "18px", color: "var(--p400)"}}>
  →
</div>
<div style={{background: "#fefce8", border: "1.5px solid #fde047", borderRadius: "9px", padding: ".6rem 1rem", textAlign: "center", minWidth: "110px"}}>
  <div style={{fontSize: "18px", marginBottom: "3px"}}>
    📋
  </div>
<div style={{fontSize: "11px", fontWeight: 700, color: "#92400e"}}>
  componentDidCatch
</div>
<div style={{fontSize: "10px", color: "var(--t3)"}}>
  logs the error
</div>

</div>
<div style={{fontSize: "18px", color: "var(--p400)"}}>
  →
</div>
<div style={{background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: "9px", padding: ".6rem 1rem", textAlign: "center", minWidth: "110px"}}>
  <div style={{fontSize: "18px", marginBottom: "3px"}}>
    🔄
  </div>
<div style={{fontSize: "11px", fontWeight: 700, color: "#16a34a"}}>
  Fallback UI
</div>
<div style={{fontSize: "10px", color: "var(--t3)"}}>
  shown to user
</div>

</div>

</div>

</div>
<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.2rem"}}>
  <div>
    <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".7rem"}}>
      Two Lifecycle Methods
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
    <div style={{background: "#fff1f2", borderLeft: "3px solid #ef4444", borderRadius: "5px", padding: "7px 10px"}}>
      <code style={{fontSize: "11.5px", fontWeight: 700, color: "#dc2626"}}>static getDerivedStateFromError()</code> <div style={{fontSize: "11.5px", color: "var(--t2)", marginTop: "3px", lineHeight: 1.5}}>
        Called during render phase. Updates state to show the fallback UI on next render.
      </div>

  </div>
<div style={{background: "#eff6ff", borderLeft: "3px solid #3b82f6", borderRadius: "5px", padding: "7px 10px"}}>
  <code style={{fontSize: "11.5px", fontWeight: 700, color: "#1d4ed8"}}>componentDidCatch(error, info)</code> <div style={{fontSize: "11.5px", color: "var(--t2)", marginTop: "3px", lineHeight: 1.5}}>
    Called after render phase. Used for logging errors to services like Sentry.
  </div>

</div>

</div>

</div>
<div>
  <div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".7rem"}}>
    What They Catch / Don't Catch
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
  <div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.5}}>
    <span style={{color: "#22c55e", fontWeight: 700, flexShrink: 0}}>✅</span> Errors in render methods
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.5}}>
  <span style={{color: "#22c55e", fontWeight: 700, flexShrink: 0}}>✅</span> Errors in lifecycle methods
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.5}}>
  <span style={{color: "#22c55e", fontWeight: 700, flexShrink: 0}}>✅</span> Errors in constructors of child tree
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.5}}>
  <span style={{color: "#ef4444", fontWeight: 700, flexShrink: 0}}>❌</span> Event handlers (use try/catch)
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.5}}>
  <span style={{color: "#ef4444", fontWeight: 700, flexShrink: 0}}>❌</span> Async code (setTimeout, Promises)
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.5}}>
  <span style={{color: "#ef4444", fontWeight: 700, flexShrink: 0}}>❌</span> Server-side rendering
</div>
<div style={{fontSize: "11.5px", color: "var(--t2)", display: "flex", gap: "6px", lineHeight: 1.5}}>
  <span style={{color: "#ef4444", fontWeight: 700, flexShrink: 0}}>❌</span> Errors in the boundary itself
</div>

</div>

</div>

</div>
<div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: ".5rem"}}>
  Implementation
</div>
<div className="rg-2">
  <div className="code-block code-keyword" style={{fontSize: "11px", margin: "0"}} dangerouslySetInnerHTML={{__html: `  <span>class</span> <span className="code-func">ErrorBoundary</span> <span className="code-keyword">extends</span> Component {<br/> &nbsp;&nbsp;<span className="code-func">constructor</span>(props) {<br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">super</span>(props);<br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">this</span>.state = { hasError: <span className="code-keyword">false</span> };<br/> &nbsp;&nbsp;}<br/> &nbsp;&nbsp;<span className="code-keyword">static</span> <span className="code-func">getDerivedStateFromError</span>(err) {<br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> { hasError: <span className="code-keyword">true</span> };<br/> &nbsp;&nbsp;}<br/> &nbsp;&nbsp;<span className="code-func">componentDidCatch</span>(err, info) {<br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-func">logToService</span>(err, info);<br/> &nbsp;&nbsp;}<br/> &nbsp;&nbsp;<span className="code-func">render</span>() {<br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (<span className="code-keyword">this</span>.state.hasError)<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-string">&lt;h2&gt;Something went wrong.&lt;/h2&gt;</span>;<br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-keyword">this</span>.props.children;<br/> &nbsp;&nbsp;}<br/> }  `}}/>
<div className="code-block code-comment" style={{fontSize: "11px", margin: "0"}} dangerouslySetInnerHTML={{__html: `  <span>// Wrap any component tree</span><br/> <span className="code-keyword">function</span> <span className="code-func">App</span>() {<br/> &nbsp;&nbsp;<span className="code-keyword">return</span> (<br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">&lt;ErrorBoundary&gt;</span><br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">&lt;Dashboard /&gt;</span><br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">&lt;UserProfile /&gt;</span><br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">&lt;/ErrorBoundary&gt;</span><br/> &nbsp;&nbsp;);<br/> }<br/><br/> <span className="code-comment">// React 19: use ErrorBoundary</span><br/> <span className="code-comment">// from 'react-error-boundary' pkg</span><br/> <span className="code-string">&lt;ErrorBoundary</span><br/> &nbsp;&nbsp;<span className="code-func">fallback</span>=<span className="code-string">{&lt;ErrorFallback /&gt;}</span><br/> &nbsp;&nbsp;<span className="code-func">onError</span>=<span className="code-string">{logError}</span><br/> <span className="code-string">&gt;</span><br/> &nbsp;&nbsp;<span className="code-string">&lt;MyWidget /&gt;</span><br/> <span className="code-string">&lt;/ErrorBoundary&gt;</span> `}}/>

</div>
<div style={{marginTop: "1rem", background: "linear-gradient(135deg,#fef2f2,#fff1f2)", border: "1px solid #fca5a5", borderRadius: "10px", padding: ".9rem 1rem", display: "flex", gap: "10px", alignItems: "flex-start"}}>
  <span style={{fontSize: "18px", flexShrink: 0}}>💡</span> <div style={{fontSize: "12.5px", color: "#7f1d1d", lineHeight: 1.65}}>
    <strong>Best practice:</strong> Place Error Boundaries at <em>strategic levels</em> — wrap top-level routes for page-level recovery, and wrap critical widgets individually so one broken component doesn't crash the whole app. Use <code style={{background: "#fee2e2", padding: "1px 5px", borderRadius: "3px", fontSize: "11px"}}>react-error-boundary</code> package for hooks-based components and React 19.

  </div>

</div>

</div>
    </>
  );
};

export default memo(ReactAdvPanel);
