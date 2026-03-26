/**
 * src/panels/ES6Panel.tsx
 * ─────────────────────────────────────────────────────────────────
 * ES6 section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const ES6Panel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#4f46e5,#7c3aed)"}}>
    <div className="hero-tag">
      📦 Modern JavaScript
    </div>
  <h1>
    ES6+ Concepts
  </h1>
<p>
  Animated Event Loop, Call Stack, Task Queue, Promises, Async/Await, and Module system — the core of modern JavaScript explained visually.
</p>

</div>
<div className="card" id="es6-eventloop">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ede9fe"}}>
      🔁
    </div>
  <div>
    <div className="card-title">
      Event Loop — Call Stack, Microtasks &amp; Task Queue
    </div>
  <div className="card-desc">
    The most important concept in JavaScript runtime — watch how sync code, Promises (microtasks), and setTimeout (macrotasks) are scheduled and executed.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-eventloop" data-h="400"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).elRun('sync') } catch(_) {} }}>Sync Code</button> <button className="cbtn" onClick={() => { try { (window as any).elRun('promise') } catch(_) {} }}>Promise.then()</button> <button className="cbtn" onClick={() => { try { (window as any).elRun('timeout') } catch(_) {} }}>setTimeout()</button> <button className="cbtn" onClick={() => { try { (window as any).elRun('async') } catch(_) {} }}>async/await</button> <div className="canvas-tag">
    JavaScript Runtime
  </div>

</div>

</div>
<div className="divider">

</div>
<div className="rg-3">
  <div style={{background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "10px", padding: "1rem"}}>
    <div style={{fontSize: "13px", fontWeight: 600, color: "var(--p700)", marginBottom: "6px"}}>
      Call Stack
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.5}}>
    LIFO structure. Synchronous functions pushed and popped. Blocks the main thread while executing.
  </div>

</div>
<div style={{background: "#fdf2f8", border: "1px solid #f9a8d4", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 600, color: "#831843", marginBottom: "6px"}}>
    Microtask Queue
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.5}}>
  Promise callbacks (.then, .catch). Processed after every task, before the next macrotask. Higher priority.
</div>

</div>
<div style={{background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 600, color: "#9a3412", marginBottom: "6px"}}>
    Task Queue
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.5}}>
  setTimeout, setInterval, I/O events. Processed one at a time when the call stack is empty.
</div>

</div>

</div>

</div>
<div className="card" id="es6-async">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ede9fe"}}>
      ⏳
    </div>
  <div>
    <div className="card-title">
      Promises &amp; Async/Await — Animated Flow
    </div>
  <div className="card-desc">
    Visualize how promise chains and async/await map to microtask queue operations under the hood.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-async" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).asyncRun('chain') } catch(_) {} }}>Promise Chain</button> <button className="cbtn" onClick={() => { try { (window as any).asyncRun('await') } catch(_) {} }}>Async/Await</button> <button className="cbtn" onClick={() => { try { (window as any).asyncRun('all') } catch(_) {} }}>Promise.all()</button> <button className="cbtn" onClick={() => { try { (window as any).asyncRun('error') } catch(_) {} }}>Catch Error</button> <div className="canvas-tag">
    ES2017+ Async Patterns
  </div>

</div>

</div>

</div>
<div className="card" id="es6-features">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#f59e0b,#f97316)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none"> <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> </svg>
    </div>
  <div>
    <div className="card-title">
      Key ES6+ Features Overview
    </div>
  <div className="card-desc">
    ES6 (ECMAScript 2015) and beyond introduced powerful syntax improvements and new built-in features that transformed modern JavaScript development — making code cleaner, more expressive, and easier to maintain.
  </div>

</div>

</div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: ".75rem", marginBottom: "1.2rem"}}>
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
    <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
      <span style={{background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>let / const</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Block-Scoped Variables</span>
    </div>
  <p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
    <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>let</code> for variables that can change, <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>const</code> for immutable constants. Both are block-scoped — no more <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>var</code> hoisting issues.
  </p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>const</span> API = <span className="code-string">'https://api.dev'</span>;<br/> <span className="code-keyword">let</span> count = 0; count++;  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#f59e0b,#f97316)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>=&gt;</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Arrow Functions</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Shorter syntax for function expressions. Also lexically binds <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>this</code> — no more <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>self = this</code> hacks.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>const</span> <span className="code-func">add</span> = (a, b) =&gt; a + b;<br/> <span className="code-keyword">const</span> <span className="code-func">greet</span> = name =&gt; <span className="code-string">\`Hi, \${name}!\`</span>;  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>` `</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Template Literals</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Easier string interpolation using backticks and <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>&#36;&#123;expression&#125;</code> syntax. Supports multi-line strings natively.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>const</span> msg = <span className="code-string">\`Hello, \${name}!<br/>&nbsp;Score: \${score * 2}\`</span>;  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#0ea5e9,#0284c7)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>{ }</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Destructuring Assignment</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Unpack values from arrays or objects directly into distinct variables in one clean expression.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>const</span> { name, age = 18 } = user;<br/> <span className="code-keyword">const</span> [first, ...rest] = items;  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#ec4899,#db2777)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>...</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Spread &amp; Rest Operators</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  <strong>Spread</strong> expands arrays/objects. <strong>Rest</strong> collects multiple elements into an array.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>const</span> merged = [...arr1, ...arr2];<br/> <span className="code-keyword">const</span> <span className="code-func">sum</span> = (...nums) =&gt; nums.<span className="code-func">reduce</span>((a,b) =&gt; a+b);  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#7c3aed,#6d28d9)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>class</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Classes</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Clean OOP syntax for creating objects and handling inheritance — replaces verbose prototype-based construction.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>class</span> <span className="code-func">Animal</span> {<br/> &nbsp;&nbsp;<span className="code-func">constructor</span>(name) { <span className="code-keyword">this</span>.name = name; }<br/> &nbsp;&nbsp;<span className="code-func">speak</span>() { <span className="code-keyword">return</span> <span className="code-string">\`\${this.name} roars!\`</span>; }<br/> }  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#14b8a6,#0d9488)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>Promise</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Promises</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Robust async handling — eliminates callback hell. Three states: <em>pending</em>, <em>fulfilled</em>, <em>rejected</em>.
</p>
<div className="code-block code-func" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>fetch</span>(<span className="code-string">'/api'</span>)<br/> &nbsp;&nbsp;.then(r =&gt; r.<span className="code-func">json</span>())<br/> &nbsp;&nbsp;.catch(err =&gt; console.<span className="code-func">error</span>(err));  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#f97316,#ea580c)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>{ }</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Enhanced Object Literals</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Property shorthand, computed keys, and method shorthand — less boilerplate when creating objects.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>const</span> obj = { name, age, <span className="code-func">greet</span>() { <span className="code-keyword">return</span> <span className="code-string">'hi'</span>; },<br/> &nbsp;&nbsp;[<span className="code-string">\`key_\${id}\`</span>]: <span className="code-keyword">true</span> };  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#06b6d4,#0891b2)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>= val</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Default Parameters</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Functions can have default values for parameters if no value or <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>undefined</code> is passed.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>function</span> <span className="code-func">greet</span>(name = <span className="code-string">'World'</span>, times = 1) {<br/> &nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-string">\`Hello \${name}\`</span>.repeat(times);<br/> }  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#84cc16,#65a30d)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>for..of</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>For...of Loop</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Iterates over iterable objects — arrays, strings, Maps, Sets. Cleaner than <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>for...in</code> for values.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>for</span> (<span className="code-keyword">const</span> item <span className="code-keyword">of</span> items) <span className="code-func">process</span>(item);<br/> <span className="code-keyword">for</span> (<span className="code-keyword">const</span> [k, v] <span className="code-keyword">of</span> map) console.<span className="code-func">log</span>(k, v);  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#a855f7,#9333ea)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>Map/Set</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Map &amp; Set</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>Set</code> stores unique values. <code style={{background: "var(--p50)", padding: "1px 5px", borderRadius: "3px", color: "var(--p600)", fontSize: "11px"}}>Map</code> stores ordered key-value pairs — any type as key.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>const</span> unique = <span className="code-keyword">new</span> <span className="code-func">Set</span>([1, 2, 2, 3]); <span className="code-comment">// {1,2,3}</span><br/> <span className="code-keyword">const</span> map = <span className="code-keyword">new</span> <span className="code-func">Map</span>(); map.<span className="code-func">set</span>(<span className="code-string">'key'</span>, 42);  `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px"}}>
    <span style={{background: "linear-gradient(135deg,#3b82f6,#2563eb)", borderRadius: "6px", padding: "3px 8px", fontSize: "10.5px", fontWeight: 700, color: "white", fontFamily: "monospace"}}>import</span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)"}}>Modules</span>
  </div>
<p style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "6px"}}>
  Split code into reusable, separate files improving modularity, tree-shaking, and maintainability.
</p>
<div className="code-block code-keyword" style={{fontSize: "10.5px", margin: "0", padding: ".5rem .7rem"}} dangerouslySetInnerHTML={{__html: `  <span>export</span> <span className="code-keyword">const</span> PI = 3.14;<br/> <span className="code-keyword">import</span> { PI } <span className="code-keyword">from</span> <span className="code-string">'./math.js'</span>;  `}}/>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".9rem"}}>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: ".6rem"}}>
    ES Version Timeline
  </div>
<div style={{display: "flex", flexWrap: "wrap", gap: ".5rem"}}>
  <span style={{background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: "20px", padding: "3px 11px", fontSize: "11px", fontWeight: 600, color: "#92400e"}}>ES6 / 2015 — let, const, classes, arrow fn, template literals, destructuring, spread, modules, promises, Map/Set</span> <span style={{background: "#ecfdf5", border: "1px solid #6ee7b7", borderRadius: "20px", padding: "3px 11px", fontSize: "11px", fontWeight: 600, color: "#065f46"}}>ES7 / 2016 — Array.includes(), ** operator</span> <span style={{background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: "20px", padding: "3px 11px", fontSize: "11px", fontWeight: 600, color: "#1e40af"}}>ES8 / 2017 — async/await, Object.entries/values</span> <span style={{background: "#fdf4ff", border: "1px solid #d8b4fe", borderRadius: "20px", padding: "3px 11px", fontSize: "11px", fontWeight: 600, color: "#6b21a8"}}>ES9+ / 2018+ — rest/spread objects, Promise.all, optional chaining, nullish coalescing</span>
</div>

</div>

</div>
<div className="card" id="es6-modules">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ede9fe"}}>
      📦
    </div>
  <div>
    <div className="card-title">
      ES6 Modules — import / export
    </div>
  <div className="card-desc">
    How the JavaScript module system resolves dependencies, parses module graphs, and executes code in the correct order.
  </div>

</div>

</div>
<div className="rg-2">
  <div className="flow-diagram">
    <div className="flow-title">
      Module Resolution
    </div>
  <div className="flow-steps">
    <div style={{display: "flex"}}>
      <div className="flow-node node-purple">
        📄 Entry Point
      </div>

  </div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-blue">
    🔍 Parse Imports
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-teal">
    📦 Build Module Graph
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-green">
    ⚡ Execute in Order
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-orange">
    🔗 Live Bindings
  </div>

</div>

</div>

</div>
<div>
  <div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// Named exports</span><br/><span className="code-keyword">export</span> <span className="code-keyword">const</span> PI = <span className="code-string">3.14</span>;<br/><span className="code-keyword">export function</span> <span className="code-func">add</span>(a, b) { <span className="code-keyword">return</span> a + b; }<br/><br/><span className="code-comment">// Default export</span><br/><span className="code-keyword">export default</span> <span className="code-keyword">class</span> <span className="code-func">Calculator</span> {}<br/><br/><span className="code-comment">// Import</span><br/><span className="code-keyword">import</span> Calculator, { PI, add } <span className="code-keyword">from</span> <span className="code-string">'./math.js'</span>;<br/><span className="code-keyword">import</span> * <span className="code-keyword">as</span> math <span className="code-keyword">from</span> <span className="code-string">'./math.js'</span>; `}}/>
<div className="info-banner" style={{marginTop: "10px"}}>
  <div className="info-banner-icon">
    💡
  </div>
<div className="info-banner-text">
  ES6 modules are <b>statically analyzed</b> — imports are resolved before execution. This enables tree-shaking and circular dependency detection.
</div>

</div>

</div>

</div>

</div>
<div className="card" id="es6-typescript">
  <div className="card-header">
    <div className="card-icon" style={{background: "linear-gradient(135deg,#0072c6,#0096d7)", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="white"> <rect x="2" y="2" width="20" height="20" rx="3" fill="#0072c6"/> <text x="4.5" y="17" fontSize="11" fontWeight="900" fontFamily="Arial" fill="white">TS</text> </svg>
    </div>
  <div>
    <div className="card-title">
      TypeScript — Typed JavaScript at Scale
    </div>
  <div className="card-desc">
    TypeScript is a strongly typed superset of JavaScript that compiles to plain JS. It adds optional static typing, interfaces, generics, and powerful tooling — making large codebases safer, more maintainable, and easier to scale.
  </div>

</div>

</div>
<div style={{background: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "1px solid #93c5fd", borderRadius: "12px", padding: "1rem", marginBottom: "1.2rem"}}>
  <div style={{fontSize: "12.5px", fontWeight: 700, color: "#1e40af", marginBottom: ".7rem"}}>
    🚀 Why TypeScript for Large Applications?
  </div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: ".6rem"}}>
  <div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
    <span style={{color: "#2563eb", fontWeight: 700, flexShrink: 0}}>▸</span><div>
      <strong>Catch errors at compile time</strong> — not at runtime in production
    </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "#2563eb", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>IDE IntelliSense</strong> — autocomplete, refactoring, navigation
  </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "#2563eb", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Self-documenting code</strong> — types describe intent and contracts
  </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "#2563eb", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Safe refactoring</strong> — change a type and see every breakage instantly
  </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "#2563eb", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Team scalability</strong> — onboard developers faster with typed APIs
  </div>

</div>
<div style={{fontSize: "12px", color: "var(--t2)", display: "flex", gap: "7px", lineHeight: 1.5}}>
  <span style={{color: "#2563eb", fontWeight: 700, flexShrink: 0}}>▸</span><div>
    <strong>Used everywhere</strong> — React, Angular, Node.js, Next.js all support it natively
  </div>

</div>

</div>

</div>
<div style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", marginBottom: ".8rem"}}>
  Core Concepts
</div>
<div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: ".7rem", marginBottom: "1.2rem"}}>
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".85rem"}}>
    <div style={{fontSize: "12px", fontWeight: 700, color: "#0072c6", marginBottom: "5px"}}>
      🔷 Static Types
    </div>
  <div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
    <code style={{background: "var(--code-bg)", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>string</code>, <code style={{background: "var(--code-bg)", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>number</code>, <code style={{background: "var(--code-bg)", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>boolean</code>, <code style={{background: "var(--code-bg)", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>any</code>, <code style={{background: "var(--code-bg)", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>unknown</code>, <code style={{background: "var(--code-bg)", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>never</code>, <code style={{background: "var(--code-bg)", padding: "1px 5px", borderRadius: "3px", fontSize: "10.5px"}}>void</code>
  </div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".85rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "#0072c6", marginBottom: "5px"}}>
    📐 Interfaces
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Define the shape of objects. Extendable, mergeable, and the foundation of contract-based design.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".85rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "#0072c6", marginBottom: "5px"}}>
    🔧 Generics
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Write reusable components that work with any type — <code style={{background: "var(--code-bg)", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>Array&lt;T&gt;</code>, <code style={{background: "var(--code-bg)", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>Promise&lt;T&gt;</code>
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".85rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "#0072c6", marginBottom: "5px"}}>
    🏷️ Type Aliases
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Name any type with <code style={{background: "var(--code-bg)", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>type</code> keyword — union, intersection, mapped, conditional types.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".85rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "#0072c6", marginBottom: "5px"}}>
    🔒 Enums
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Named constant sets — <code style={{background: "var(--code-bg)", padding: "1px 4px", borderRadius: "3px", fontSize: "10.5px"}}>enum Direction &#123; Up, Down &#125;</code>
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: ".85rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "#0072c6", marginBottom: "5px"}}>
    🎯 Decorators
  </div>
<div style={{fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.5}}>
  Metadata annotation for classes and methods — used heavily in Angular and NestJS.
</div>

</div>

</div>
<div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: ".5rem"}}>
  JavaScript vs TypeScript
</div>
<div className="rg-2" style={{marginBottom: "1.2rem"}}>
  <div>
    <div style={{fontSize: "11px", fontWeight: 600, color: "#f97316", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "6px 6px 0 0", padding: "5px 10px"}}>
      ❌ JavaScript — errors at runtime
    </div>
  <div className="code-block code-keyword" style={{fontSize: "11px", margin: "0", borderRadius: "0 0 8px 8px", borderTop: "none"}} dangerouslySetInnerHTML={{__html: `  <span>function</span> <span className="code-func">add</span>(a, b) {<br/> &nbsp;&nbsp;<span className="code-keyword">return</span> a + b;<br/> }<br/> <span className="code-func">add</span>(<span className="code-string">"5"</span>, 10); <span className="code-comment">// "510" 💥 silent bug</span> `}}/>

</div>
<div>
  <div style={{fontSize: "11px", fontWeight: 600, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "6px 6px 0 0", padding: "5px 10px"}}>
    ✅ TypeScript — caught at compile time
  </div>
<div className="code-block code-keyword" style={{fontSize: "11px", margin: "0", borderRadius: "0 0 8px 8px", borderTop: "none"}} dangerouslySetInnerHTML={{__html: `  <span>function</span> <span className="code-func">add</span>(a: <span className="code-func">number</span>, b: <span className="code-func">number</span>): <span className="code-func">number</span> {<br/> &nbsp;&nbsp;<span className="code-keyword">return</span> a + b;<br/> }<br/> <span className="code-func">add</span>(<span className="code-string">"5"</span>, 10); <span className="code-comment">// TS Error ✓ caught!</span> `}}/>

</div>

</div>
<div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: ".5rem"}}>
  Key Features in Practice
</div>
<div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: `  <span>// Interface + Type Alias</span><br/> <span className="code-keyword">interface</span> <span className="code-func">User</span> { id: <span className="code-func">number</span>; name: <span className="code-func">string</span>; role: <span className="code-string">'admin'</span> | <span className="code-string">'user'</span>; }<br/> <span className="code-keyword">type</span> <span className="code-func">ID</span> = <span className="code-func">string</span> | <span className="code-func">number</span>; <span className="code-comment">// Union type</span><br/><br/> <span className="code-comment">// Generics — reusable typed function</span><br/> <span className="code-keyword">function</span> <span className="code-func">getFirst</span>&lt;T&gt;(arr: T[]): T { <span className="code-keyword">return</span> arr[0]; }<br/> <span className="code-func">getFirst</span>&lt;<span className="code-func">number</span>&gt;([1, 2, 3]); <span className="code-comment">// typed as number</span><br/><br/> <span className="code-comment">// Optional + Readonly</span><br/> <span className="code-keyword">interface</span> <span className="code-func">Config</span> { <span className="code-keyword">readonly</span> api: <span className="code-func">string</span>; timeout?: <span className="code-func">number</span>; }<br/><br/> <span className="code-comment">// Enum</span><br/> <span className="code-keyword">enum</span> <span className="code-func">Status</span> { Active = <span className="code-string">'ACTIVE'</span>, Inactive = <span className="code-string">'INACTIVE'</span> }<br/><br/> <span className="code-comment">// Type Guard</span><br/> <span className="code-keyword">function</span> <span className="code-func">isString</span>(val: <span className="code-keyword">unknown</span>): val <span className="code-keyword">is</span> <span className="code-func">string</span> {<br/> &nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-keyword">typeof</span> val === <span className="code-string">'string'</span>;<br/> }  `}}/>
<div style={{marginTop: "1.1rem", overflowX: "auto"}}>
  <table style={{width: "100%", borderCollapse: "collapse", fontSize: "11.5px"}}>
    <thead>
      <tr style={{background: "var(--bg)"}}>
        <th style={{padding: "7px 10px", textAlign: "left", borderBottom: "2px solid var(--border2)", color: "var(--t1)", fontWeight: 700}}>
          Aspect
        </th>
      <th style={{padding: "7px 10px", textAlign: "center", borderBottom: "2px solid #fed7aa", color: "#c2410c", fontWeight: 700}}>
        JavaScript
      </th>
    <th style={{padding: "7px 10px", textAlign: "center", borderBottom: "2px solid #93c5fd", color: "#1d4ed8", fontWeight: 700}}>
      TypeScript
    </th>

</tr>

</thead>
<tbody>
  <tr style={{borderBottom: "1px solid var(--border)"}}>
    <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
      Typing
    </td>
  <td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
    Dynamic (runtime)
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  Static (compile time)
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)", background: "var(--bg)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Error detection
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#ef4444", fontWeight: 600}}>
  ❌ Runtime
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#22c55e", fontWeight: 600}}>
  ✅ Compile time
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    IDE support
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  Basic
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#22c55e", fontWeight: 600}}>
  ✅ Full IntelliSense
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)", background: "var(--bg)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Learning curve
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#22c55e", fontWeight: 600}}>
  ✅ Lower
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  Moderate
</td>

</tr>
<tr style={{borderBottom: "1px solid var(--border)"}}>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Large projects
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#f97316", fontWeight: 600}}>
  ⚠️ Gets complex
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "#22c55e", fontWeight: 600}}>
  ✅ Scales well
</td>

</tr>
<tr>
  <td style={{padding: "6px 10px", color: "var(--t1)", fontWeight: 600}}>
    Used by
  </td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  All projects
</td>
<td style={{padding: "6px 10px", textAlign: "center", color: "var(--t2)"}}>
  Angular, Next.js, NestJS
</td>

</tr>

</tbody>

</table>

</div>

</div>
    </>
  );
};

export default memo(ES6Panel);
