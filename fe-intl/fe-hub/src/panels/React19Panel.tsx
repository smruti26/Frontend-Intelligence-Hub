/**
 * src/panels/React19Panel.tsx
 * ─────────────────────────────────────────────────────────────────
 * REACT19 section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const React19Panel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#0f172a,#1e3a5f,#0ea5e9)"}}>
    <div className="hero-tag">
      ⚛ React 19
    </div>
  <h1>
    React 19 — The Next Generation
  </h1>
<p>
  React 19 is a major release introducing the React Compiler, Server Components, new hooks for async state, and dramatically improved developer experience with less boilerplate.
</p>

</div>
<div className="card" id="r19-overview">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="12" cy="12" r="3" fill="white"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="white" strokeWidth="1.4" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="white" strokeWidth="1.4" fill="none" transform="rotate(60 12 12)"/></svg>
    </div>
  <div>
    <div className="card-title">
      What's New in React 19
    </div>
  <div className="card-desc">
    A landmark release focused on performance, developer experience, and server-first architecture
  </div>

</div>

</div>
<div className="rg-auto mt1">
  <div style={{background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "12px", padding: "1rem"}}>
    <div style={{fontSize: "18px", marginBottom: "6px"}}>
      🔧
    </div>
  <div style={{fontSize: "13px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
    React Compiler
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.55}}>
  Automatically memoizes components — no more manual useMemo / useCallback / React.memo needed
</div>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "1rem"}}>
  <div style={{fontSize: "18px", marginBottom: "6px"}}>
    ⚡
  </div>
<div style={{fontSize: "13px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
  Actions
</div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.55}}>
  Native async transitions — handle pending states, errors, and optimistic updates with new hooks
</div>

</div>
<div style={{background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "12px", padding: "1rem"}}>
  <div style={{fontSize: "18px", marginBottom: "6px"}}>
    🌐
  </div>
<div style={{fontSize: "13px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
  Server Components
</div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.55}}>
  Full support for RSC — async components, direct DB access, zero client bundle cost
</div>

</div>
<div style={{background: "#fdf2ff", border: "1px solid #e9d5ff", borderRadius: "12px", padding: "1rem"}}>
  <div style={{fontSize: "18px", marginBottom: "6px"}}>
    📄
  </div>
<div style={{fontSize: "13px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
  Document Metadata
</div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.55}}>
  Use &lt;title&gt;, &lt;meta&gt;, and &lt;link&gt; directly inside components — React hoists them to &lt;head&gt;
</div>

</div>
<div style={{background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "12px", padding: "1rem"}}>
  <div style={{fontSize: "18px", marginBottom: "6px"}}>
    🖼️
  </div>
<div style={{fontSize: "13px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
  Asset Loading
</div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.55}}>
  Stylesheets, fonts, and scripts load in the background. Suspense waits until assets are ready
</div>

</div>
<div style={{background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "12px", padding: "1rem"}}>
  <div style={{fontSize: "18px", marginBottom: "6px"}}>
    🔗
  </div>
<div style={{fontSize: "13px", fontWeight: 700, color: "var(--t1)", marginBottom: "4px"}}>
  ref as Prop
</div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.55}}>
  Function components now accept ref directly — forwardRef is no longer needed
</div>

</div>

</div>

</div>
<div className="card" id="r19-hooks">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2a4 4 0 00-4 4v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V6a4 4 0 00-4-4z" fill="white" opacity=".9"/></svg>
    </div>
  <div>
    <div className="card-title">
      New Hooks in React 19
    </div>
  <div className="card-desc">
    Six powerful new hooks that replace common patterns and eliminate boilerplate
  </div>

</div>

</div>
<div style={{marginTop: "1.5rem", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden"}}>
  <div style={{background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", padding: "1rem 1.2rem", borderBottom: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: "10px"}}>
    <span style={{width: "32px", height: "32px", background: "linear-gradient(135deg,#16a34a,#15803d)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px"}}>⚡</span> <div>
      <div style={{fontFamily: "monospace", fontSize: "14px", fontWeight: 700, color: "#15803d"}}>
        useActionState
      </div>
    <div style={{fontSize: "11px", color: "var(--t2)"}}>
      Replaces: useState + useEffect + manual error/pending handling
    </div>

</div>
<span style={{marginLeft: "auto", background: "#dcfce7", border: "1px solid #86efac", borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: 700, color: "#15803d"}}>NEW</span>
</div>
<div className="rg-2-0">
  <div style={{padding: "1.2rem", borderRight: "1px solid var(--border)"}}>
    <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".8rem"}}>
      What it does
    </div>
  <p style={{fontSize: "12.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: ".8rem"}}>
    Manages async form action state — pending, error, and result — all in one hook. Works with Server Actions and client-side async functions.
  </p>
<div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
  <div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
    <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", flexShrink: 0}}></span>Tracks pending (loading) state automatically
  </div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", flexShrink: 0}}></span>Captures action errors without try/catch
</div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", flexShrink: 0}}></span>Returns action result as state
</div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a", flexShrink: 0}}></span>Works with &lt;form action=&#123;...&#125;&gt; natively
</div>

</div>

</div>
<div style={{padding: "1.2rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".8rem"}}>
    Code Example
  </div>
<div className="code-block cod-c" style={{fontSize: "11px", lineHeight: 1.7}} dangerouslySetInnerHTML={{__html: ` <span>// Before React 19</span><br/> <span className="cod-k">const</span> [loading, setLoading] = useState(<span className="cod-b">false</span>);<br/> <span className="cod-k">const</span> [error, setError] = useState(<span className="cod-b">null</span>);<br/> <span className="cod-k">const</span> [data, setData] = useState(<span className="cod-b">null</span>);<br/><br/> <span className="cod-c">// React 19 ✨</span><br/> <span className="cod-k">const</span> [state, action, isPending] =<br/> &nbsp;&nbsp;<span className="cod-fn">useActionState</span>(submitForm, <span className="cod-b">null</span>);<br/><br/> <span className="cod-c">// state = result | error</span><br/> <span className="cod-c">// isPending = loading boolean</span> `}}/>

</div>

</div>
<div style={{padding: "1rem 1.2rem", borderTop: "1px solid var(--border)", background: "var(--bg)"}}>
  <div style={{fontSize: "10px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".6rem"}}>
    How It Works
  </div>
<div style={{display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap"}}>
  <div style={{background: "#dcfce7", border: "1px solid #86efac", borderRadius: "8px", padding: "6px 12px", fontSize: "11.5px", fontWeight: 600, color: "#15803d"}}>
    User Action
  </div>
<span style={{color: "var(--t3)", fontSize: "12px"}}>→</span> <div style={{background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "8px", padding: "6px 12px", fontSize: "11.5px", fontWeight: 600, color: "#a16207"}}>
  isPending: true
</div>
<span style={{color: "var(--t3)", fontSize: "12px"}}>→</span> <div style={{background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "6px 12px", fontSize: "11.5px", fontWeight: 600, color: "#1d4ed8"}}>
  async action()
</div>
<span style={{color: "var(--t3)", fontSize: "12px"}}>→</span> <div style={{background: "#fdf2ff", border: "1px solid #e9d5ff", borderRadius: "8px", padding: "6px 12px", fontSize: "11.5px", fontWeight: 600, color: "#7c3aed"}}>
  state updated
</div>
<span style={{color: "var(--t3)", fontSize: "12px"}}>→</span> <div style={{background: "#dcfce7", border: "1px solid #86efac", borderRadius: "8px", padding: "6px 12px", fontSize: "11.5px", fontWeight: 600, color: "#15803d"}}>
  isPending: false
</div>

</div>

</div>

</div>
<div style={{marginTop: "1.2rem", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden"}}>
  <div style={{background: "linear-gradient(135deg,#eff6ff,#dbeafe)", padding: "1rem 1.2rem", borderBottom: "1px solid #bfdbfe", display: "flex", alignItems: "center", gap: "10px"}}>
    <span style={{width: "32px", height: "32px", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px"}}>📋</span> <div>
      <div style={{fontFamily: "monospace", fontSize: "14px", fontWeight: 700, color: "#1d4ed8"}}>
        useFormStatus
      </div>
    <div style={{fontSize: "11px", color: "var(--t2)"}}>
      Replaces: prop-drilling pending state to child components
    </div>

</div>
<span style={{marginLeft: "auto", background: "#dbeafe", border: "1px solid #93c5fd", borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: 700, color: "#1d4ed8"}}>NEW</span>
</div>
<div className="rg-2-0">
  <div style={{padding: "1.2rem", borderRight: "1px solid var(--border)"}}>
    <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".8rem"}}>
      What it does
    </div>
  <p style={{fontSize: "12.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: ".8rem"}}>
    Reads the status of the parent &lt;form&gt; from inside a child component — no prop drilling needed. Perfect for submit buttons.
  </p>
<div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
  <div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
    <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#2563eb", flexShrink: 0}}></span>Returns &#123; pending, data, method, action &#125;
  </div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#2563eb", flexShrink: 0}}></span>Must be used inside a &lt;form&gt; child
</div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#2563eb", flexShrink: 0}}></span>Pairs perfectly with useActionState
</div>

</div>

</div>
<div style={{padding: "1.2rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".8rem"}}>
    Code Example
  </div>
<div className="code-block cod-k" style={{fontSize: "11px", lineHeight: 1.7}} dangerouslySetInnerHTML={{__html: ` <span>function</span> <span className="cod-fn">SubmitButton</span>() {<br/> &nbsp;&nbsp;<span className="cod-k">const</span> { pending } = <span className="cod-fn">useFormStatus</span>();<br/> &nbsp;&nbsp;<span className="cod-k">return</span> (<br/> &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="cod-b">button</span> disabled={pending}&gt;<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{pending ? <span className="cod-s">'Saving...'</span> : <span className="cod-s">'Save'</span>}<br/> &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="cod-b">button</span>&gt;<br/> &nbsp;&nbsp;);<br/> }  `}}/>

</div>

</div>

</div>
<div style={{marginTop: "1.2rem", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden"}}>
  <div style={{background: "linear-gradient(135deg,#fff7ed,#ffedd5)", padding: "1rem 1.2rem", borderBottom: "1px solid #fed7aa", display: "flex", alignItems: "center", gap: "10px"}}>
    <span style={{width: "32px", height: "32px", background: "linear-gradient(135deg,#ea580c,#c2410c)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px"}}>🚀</span> <div>
      <div style={{fontFamily: "monospace", fontSize: "14px", fontWeight: 700, color: "#c2410c"}}>
        useOptimistic
      </div>
    <div style={{fontSize: "11px", color: "var(--t2)"}}>
      Replaces: complex optimistic update patterns with useState + rollback logic
    </div>

</div>
<span style={{marginLeft: "auto", background: "#ffedd5", border: "1px solid #fdba74", borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: 700, color: "#c2410c"}}>NEW</span>
</div>
<div className="rg-2-0">
  <div style={{padding: "1.2rem", borderRight: "1px solid var(--border)"}}>
    <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".8rem"}}>
      What it does
    </div>
  <p style={{fontSize: "12.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: ".8rem"}}>
    Instantly shows the expected result of an async action before the server responds. Automatically reverts if the action fails.
  </p>
<div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
  <div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
    <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#ea580c", flexShrink: 0}}></span>Immediate UI feedback, zero latency feel
  </div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#ea580c", flexShrink: 0}}></span>Auto-reverts on server error
</div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#ea580c", flexShrink: 0}}></span>Perfect for likes, toggles, list mutations
</div>

</div>

</div>
<div style={{padding: "1.2rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".8rem"}}>
    How It Works — Diagram
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
  <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
    <div style={{background: "#fef3c7", border: "1px solid #fde68a", borderRadius: "8px", padding: "5px 10px", fontSize: "11px", fontWeight: 600, color: "#92400e", whiteSpace: "nowrap"}}>
      Click ❤️
    </div>
  <span style={{color: "var(--t3)"}}>→</span> <div style={{background: "#dcfce7", border: "1px solid #86efac", borderRadius: "8px", padding: "5px 10px", fontSize: "11px", fontWeight: 600, color: "#15803d", whiteSpace: "nowrap"}}>
    UI shows ❤️ 100 (optimistic)
  </div>

</div>
<div style={{display: "flex", alignItems: "center", gap: "6px"}}>
  <div style={{background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "5px 10px", fontSize: "11px", fontWeight: 600, color: "#1d4ed8", whiteSpace: "nowrap"}}>
    Server call
  </div>
<span style={{color: "var(--t3)"}}>→</span> <div style={{background: "#dcfce7", border: "1px solid #86efac", borderRadius: "8px", padding: "5px 10px", fontSize: "11px", fontWeight: 600, color: "#15803d", whiteSpace: "nowrap"}}>
  ✅ Confirm 100
</div>

</div>
<div style={{display: "flex", alignItems: "center", gap: "6px"}}>
  <div style={{background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "5px 10px", fontSize: "11px", fontWeight: 600, color: "#1d4ed8", whiteSpace: "nowrap"}}>
    Server fails
  </div>
<span style={{color: "var(--t3)"}}>→</span> <div style={{background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "5px 10px", fontSize: "11px", fontWeight: 600, color: "#dc2626", whiteSpace: "nowrap"}}>
  ❌ Revert to 99
</div>

</div>

</div>

</div>

</div>

</div>
<div style={{marginTop: "1.2rem", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden"}}>
  <div style={{background: "linear-gradient(135deg,#fdf4ff,#fae8ff)", padding: "1rem 1.2rem", borderBottom: "1px solid #e9d5ff", display: "flex", alignItems: "center", gap: "10px"}}>
    <span style={{width: "32px", height: "32px", background: "linear-gradient(135deg,#9333ea,#7c3aed)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px"}}>🎣</span> <div>
      <div style={{fontFamily: "monospace", fontSize: "14px", fontWeight: 700, color: "#7c3aed"}}>
        use()
      </div>
    <div style={{fontSize: "11px", color: "var(--t2)"}}>
      Replaces: useContext() and complex Promise handling in render
    </div>

</div>
<span style={{marginLeft: "auto", background: "#fae8ff", border: "1px solid #d8b4fe", borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: 700, color: "#7c3aed"}}>NEW</span>
</div>
<div className="rg-2-0">
  <div style={{padding: "1.2rem", borderRight: "1px solid var(--border)"}}>
    <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".8rem"}}>
      What it does
    </div>
  <p style={{fontSize: "12.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: ".8rem"}}>
    A new primitive that reads the value of a resource — a Promise or Context — during render. Unlike other hooks, it can be called conditionally.
  </p>
<div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
  <div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
    <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#9333ea", flexShrink: 0}}></span>Can be used inside if/else and loops
  </div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#9333ea", flexShrink: 0}}></span>Reads Promises — integrates with Suspense
</div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#9333ea", flexShrink: 0}}></span>Replaces useContext() for Context reading
</div>
<div style={{display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: "var(--t2)"}}>
  <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#9333ea", flexShrink: 0}}></span>Works in Client and Server Components
</div>

</div>

</div>
<div style={{padding: "1.2rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".8rem"}}>
    Code Example
  </div>
<div className="code-block cod-c" style={{fontSize: "11px", lineHeight: 1.7}} dangerouslySetInnerHTML={{__html: ` <span>// Reading a Promise</span><br/> <span className="cod-k">const</span> data = <span className="cod-fn">use</span>(fetchUserPromise);<br/><br/> <span className="cod-c">// Reading Context conditionally</span><br/> <span className="cod-k">if</span> (showTheme) {<br/> &nbsp;&nbsp;<span className="cod-k">const</span> theme = <span className="cod-fn">use</span>(ThemeContext);<br/> }<br/><br/> <span className="cod-c">// Pair with Suspense</span><br/> &lt;Suspense fallback=&#123;&lt;Spinner/&gt;&#125;&gt;<br/> &nbsp;&nbsp;&lt;UserCard promise=&#123;p&#125; /&gt;<br/> &lt;/Suspense&gt;  `}}/>

</div>

</div>

</div>
<div style={{marginTop: "1.5rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden"}}>
  <div style={{padding: ".8rem 1.2rem", borderBottom: "1px solid var(--border)", fontSize: "12px", fontWeight: 700, color: "var(--t1)"}}>
    React 19 Hooks — At a Glance
  </div>
<div style={{overflowX: "auto"}}>
  <table style={{width: "100%", borderCollapse: "collapse", fontSize: "12px"}}>
    <thead>
      <tr style={{background: "var(--surface)"}}>
        <th style={{padding: ".6rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--t1)", borderBottom: "1px solid var(--border)"}}>
          Hook
        </th>
      <th style={{padding: ".6rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--t1)", borderBottom: "1px solid var(--border)"}}>
        Purpose
      </th>
    <th style={{padding: ".6rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--t1)", borderBottom: "1px solid var(--border)"}}>
      Replaces
    </th>
  <th style={{padding: ".6rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--t1)", borderBottom: "1px solid var(--border)"}}>
    Key Benefit
  </th>

</tr>

</thead>
<tbody>
  <tr style={{borderBottom: "1px solid var(--border)"}}>
    <td style={{padding: ".6rem 1rem", fontFamily: "monospace", fontWeight: 700, color: "#15803d"}}>
      useActionState
    </td>
  <td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
    Async action state
  </td>
<td style={{padding: ".6rem 1rem", color: "var(--t3)"}}>
  useState + useEffect
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Pending, error, result in one hook
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)"}}>
  <td style={{padding: ".6rem 1rem", fontFamily: "monospace", fontWeight: 700, color: "#1d4ed8"}}>
    useFormStatus
  </td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Form submission state
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t3)"}}>
  Prop drilling
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Child reads parent form status
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)"}}>
  <td style={{padding: ".6rem 1rem", fontFamily: "monospace", fontWeight: 700, color: "#c2410c"}}>
    useOptimistic
  </td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Optimistic UI updates
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t3)"}}>
  Complex state + rollback
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Instant UI, auto-revert on fail
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)"}}>
  <td style={{padding: ".6rem 1rem", fontFamily: "monospace", fontWeight: 700, color: "#7c3aed"}}>
    use()
  </td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Read promises/context
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t3)"}}>
  useContext + async patterns
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Works conditionally in render
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)"}}>
  <td style={{padding: ".6rem 1rem", fontFamily: "monospace", fontWeight: 700, color: "#0891b2"}}>
    useTransition
  </td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Non-urgent state updates
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t3)"}}>
  Manual defer logic
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Now supports async functions
</td>

</tr>
<tr>
  <td style={{padding: ".6rem 1rem", fontFamily: "monospace", fontWeight: 700, color: "#d97706"}}>
    useDeferredValue
  </td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Defer expensive renders
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t3)"}}>
  Debounce hacks
</td>
<td style={{padding: ".6rem 1rem", color: "var(--t2)"}}>
  Now accepts an initial value
</td>

</tr>

</tbody>

</table>

</div>

</div>

</div>
<div className="card" id="r19-actions">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#0f766e,#0891b2)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  <div>
    <div className="card-title">
      Server Actions &amp; the Actions Pattern
    </div>
  <div className="card-desc">
    Write server-side logic directly in components — React handles serialization, round-trips, and state updates
  </div>

</div>

</div>
<div className="rg-2 mt1">
  <div>
    <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", marginBottom: ".6rem"}}>
      Server Action Example
    </div>
  <div className="code-block cod-s" style={{fontSize: "11px", lineHeight: 1.7}} dangerouslySetInnerHTML={{__html: ` <span>'use server'</span>;<br/><br/> <span className="cod-k">async function</span> <span className="cod-fn">saveUser</span>(formData) {<br/> &nbsp;&nbsp;<span className="cod-k">const</span> name = formData.<span className="cod-fn">get</span>(<span className="cod-s">'name'</span>);<br/> &nbsp;&nbsp;<span className="cod-k">await</span> db.users.<span className="cod-fn">create</span>({ name });<br/> &nbsp;&nbsp;<span className="cod-fn">revalidatePath</span>(<span className="cod-s">'/users'</span>);<br/> }<br/><br/> <span className="cod-c">// In a component</span><br/> &lt;form action=&#123;saveUser&#125;&gt;<br/> &nbsp;&nbsp;&lt;input name=<span className="cod-s">"name"</span>/&gt;<br/> &nbsp;&nbsp;&lt;<span className="cod-fn">SubmitButton</span>/&gt;<br/> &lt;/form&gt;  `}}/>

</div>
<div>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", marginBottom: ".6rem"}}>
    With useActionState
  </div>
<div className="code-block cod-k" style={{fontSize: "11px", lineHeight: 1.7}} dangerouslySetInnerHTML={{__html: ` <span>function</span> <span className="cod-fn">UserForm</span>() {<br/> &nbsp;&nbsp;<span className="cod-k">const</span> [state, action, isPending] =<br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="cod-fn">useActionState</span>(saveUser, <span className="cod-b">null</span>);<br/><br/> &nbsp;&nbsp;<span className="cod-k">return</span> (<br/> &nbsp;&nbsp;&nbsp;&nbsp;&lt;form action=&#123;action&#125;&gt;<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{state?.error &amp;&amp; &lt;Error/&gt;}<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input name=<span className="cod-s">"name"</span>/&gt;<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button disabled={isPending}&gt;<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isPending ? <span className="cod-s">'...'</span> : <span className="cod-s">'Save'</span>}<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;<br/> &nbsp;&nbsp;&nbsp;&nbsp;&lt;/form&gt;<br/> &nbsp;&nbsp;);<br/> }  `}}/>

</div>

</div>
<div style={{marginTop: "1.2rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".6rem"}}>
    Live Animation — Server Action Round Trip
  </div>
<div className="canvas-card">
  <canvas id="cvs-r19-actions" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn active" onClick={() => { try { (window as any).r19ActAnim('roundtrip') } catch(_) {} }} id="r19a-btn-rt">🔄 Round Trip</button> <button className="cbtn" onClick={() => { try { (window as any).r19ActAnim('error') } catch(_) {} }} id="r19a-btn-err">❌ Error Path</button> <button className="cbtn" onClick={() => { try { (window as any).r19ActAnim('optimistic') } catch(_) {} }} id="r19a-btn-opt">⚡ Optimistic</button>
</div>

</div>

</div>

</div>
<div className="card" id="r19-compiler">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  <div>
    <div className="card-title">
      React Compiler (Automatic Memoization)
    </div>
  <div className="card-desc">
    The compiler automatically optimizes your code — no more manual memoization
  </div>

</div>

</div>
<div className="rg-2 mt1">
  <div style={{background: "#fef9c3", border: "1px solid #fde68a", borderRadius: "12px", padding: "1.2rem"}}>
    <div style={{fontSize: "12px", fontWeight: 700, color: "#92400e", marginBottom: ".8rem"}}>
      ❌ Before React Compiler
    </div>
  <div className="code-block cod-k" style={{fontSize: "11px", lineHeight: 1.7}} dangerouslySetInnerHTML={{__html: ` <span>const</span> Component = <span className="cod-fn">React.memo</span>(({ data }) => {<br/> &nbsp;&nbsp;<span className="cod-k">const</span> processed = <span className="cod-fn">useMemo</span>(<br/> &nbsp;&nbsp;&nbsp;&nbsp;() =&gt; <span className="cod-fn">heavyCalc</span>(data),<br/> &nbsp;&nbsp;&nbsp;&nbsp;[data]<br/> &nbsp;&nbsp;);<br/> &nbsp;&nbsp;<span className="cod-k">const</span> handler = <span className="cod-fn">useCallback</span>(<br/> &nbsp;&nbsp;&nbsp;&nbsp;() =&gt; <span className="cod-fn">doSomething</span>(),<br/> &nbsp;&nbsp;&nbsp;&nbsp;[]<br/> &nbsp;&nbsp;);<br/> &nbsp;&nbsp;<span className="cod-k">return</span> &lt;div onClick={handler}&gt;...&lt;/div&gt;;<br/> });  `}}/>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "1.2rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "#15803d", marginBottom: ".8rem"}}>
    ✅ With React Compiler
  </div>
<div className="code-block cod-c" style={{fontSize: "11px", lineHeight: 1.7}} dangerouslySetInnerHTML={{__html: ` <span>// Just write normal code!</span><br/> <span className="cod-k">const</span> Component = ({ data }) =&gt; {<br/> &nbsp;&nbsp;<span className="cod-k">const</span> processed = <span className="cod-fn">heavyCalc</span>(data);<br/><br/> &nbsp;&nbsp;<span className="cod-k">const</span> handler = () =&gt; <br/> &nbsp;&nbsp;&nbsp;&nbsp;<span className="cod-fn">doSomething</span>();<br/><br/> &nbsp;&nbsp;<span className="cod-k">return</span> &lt;div onClick={handler}&gt;...&lt;/div&gt;;<br/> };<br/><br/> <span className="cod-c">// Compiler adds memoization</span><br/> <span className="cod-c">// automatically at build time</span> `}}/>

</div>

</div>
<div style={{marginTop: "1rem", background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "10px", padding: "1rem", display: "flex", alignItems: "flex-start", gap: "10px"}}>
  <span style={{fontSize: "20px"}}>💡</span> <div>
    <div style={{fontSize: "12.5px", fontWeight: 600, color: "var(--t1)", marginBottom: "3px"}}>
      What developers gain from React 19
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
    Less boilerplate, fewer performance bugs, simpler async flows, native form handling, and automatic optimization — React 19 lets you focus on product logic instead of framework plumbing.
  </div>

</div>

</div>
<div style={{marginTop: "1.2rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".6rem"}}>
    Live Animation — Compiler Optimisation Pipeline
  </div>
<div className="canvas-card">
  <canvas id="cvs-r19-compiler" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn active" onClick={() => { try { (window as any).r19CmpAnim('transform') } catch(_) {} }} id="r19c-btn-tr">⚙️ Transform</button> <button className="cbtn" onClick={() => { try { (window as any).r19CmpAnim('memo') } catch(_) {} }} id="r19c-btn-mem">💾 Memoization</button> <button className="cbtn" onClick={() => { try { (window as any).r19CmpAnim('perf') } catch(_) {} }} id="r19c-btn-pf">📈 Performance</button>
</div>

</div>

</div>

</div>
<div className="card" id="r19-animation" style={{marginTop: "0"}}>
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#0f172a,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M5 3l14 9-14 9V3z" fill="white"/></svg>
    </div>
  <div>
    <div className="card-title">
      React 19 — Live Feature Visualiser
    </div>
  <div className="card-desc">
    Watch how the new hooks and features work in real time
  </div>

</div>

</div>
<div className="canvas-card" style={{marginTop: "1rem"}}>
  <canvas id="cvs-react19" data-h="320"/>

<div className="canvas-controls">
  <button className="cbtn active" onClick={() => { try { (window as any).r19Anim('actions') } catch(_) {} }} id="r19-btn-actions">⚡ Actions Flow</button> <button className="cbtn" onClick={() => { try { (window as any).r19Anim('optimistic') } catch(_) {} }} id="r19-btn-optimistic">🚀 useOptimistic</button> <button className="cbtn" onClick={() => { try { (window as any).r19Anim('compiler') } catch(_) {} }} id="r19-btn-compiler">🔧 Compiler</button> <button className="cbtn" onClick={() => { try { (window as any).r19Anim('use') } catch(_) {} }} id="r19-btn-use">🎣 use() Hook</button>
</div>

</div>

</div>
    </>
  );
};

export default memo(React19Panel);
