/**
 * src/panels/ReactPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * REACT section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const ReactPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#6c5dd3,#2563eb)"}}>
        <div className="hero-tag">
          ⚛ Ecosystem
        </div>
      <h1>
        React Architecture
      </h1>
    <p>
      Understand how React works internally — from component trees to state management, middleware, and data flow.
    </p>

</div>
<div className="card" id="react-arch">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ede9fe"}}>
      ⚛️
    </div>
  <div>
    <div className="card-title">
      Component Architecture
    </div>
  <div className="card-desc">
    React builds a virtual DOM tree of components. When state changes, React reconciles the virtual DOM with the real DOM efficiently.
  </div>

</div>

</div>
<div className="flow-diagram">
  <div className="flow-title">
    React Component Lifecycle
  </div>
<div style={{display: "flex", gap: "1rem", flexWrap: "wrap"}}>
  <div className="flow-steps">
    <div style={{display: "flex"}}>
      <div className="flow-node node-purple">
        App Component (Root)
      </div>

  </div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-blue">
    Child Components
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-teal">
    Render Phase
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-green">
    Virtual DOM Diff
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-orange">
    DOM Update
  </div>

</div>

</div>
<div style={{flex: 1, padding: "1rem 1.1rem", background: "var(--bg)", borderRadius: "12px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "6px"}}>
  <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", paddingBottom: "8px", borderBottom: "1px solid var(--border)"}}>
    <span style={{display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", background: "linear-gradient(135deg,var(--p600),var(--b500))", borderRadius: "6px", flexShrink: 0}}> <svg viewBox="0 0 24 24" width="13" height="13" fill="none"><path d="M12 3C8 3 5 6 5 10c0 2.5 1.2 4.7 3 6.1V18h8v-1.9c1.8-1.4 3-3.6 3-6.1 0-4-3-7-7-7z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M9 21h6M10 18v3M14 18v3" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg> </span> <span style={{fontSize: "12.5px", fontWeight: 700, color: "var(--t1)", letterSpacing: "0.01em"}}>Key Hooks</span> <span style={{marginLeft: "auto", fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "10px", background: "var(--p100)", color: "var(--p600)"}}>6 hooks</span>
  </div>
<div className="hook-row" style={{display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "8px", background: "var(--white)", border: "1px solid var(--border)", transition: "all 0.15s", cursor: "default"}}>
  <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6", flexShrink: 0, boxShadow: "0 0 6px #3b82f680"}}></span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)", fontFamily: "monospace"}}>useState</span> <span style={{fontSize: "10.5px", color: "var(--t2)", marginLeft: "auto"}}>local state</span> <div className="hook-tooltip">
    <div className="hook-tooltip-name" style={{color: "#3b82f6"}}>
      useState
    </div>
  <div className="hook-tooltip-desc">
    Adds reactive local state to a function component. Returns a value and a setter — calling the setter triggers a re-render with the new value.
  </div>
<div className="hook-tooltip-example" dangerouslySetInnerHTML={{__html: `const [count, setCount] = useState(0)`}}/>

</div>

</div>
<div className="hook-row" style={{display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "8px", background: "var(--white)", border: "1px solid var(--border)", transition: "all 0.15s", cursor: "default"}}>
  <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "#8b7ae8", flexShrink: 0, boxShadow: "0 0 6px #8b7ae880"}}></span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)", fontFamily: "monospace"}}>useEffect</span> <span style={{fontSize: "10.5px", color: "var(--t2)", marginLeft: "auto"}}>side effects</span> <div className="hook-tooltip">
    <div className="hook-tooltip-name" style={{color: "#8b7ae8"}}>
      useEffect
    </div>
  <div className="hook-tooltip-desc">
    Runs a side-effect after render. Use for data fetching, subscriptions, or DOM mutations. The dependency array controls when it re-runs.
  </div>
<div className="hook-tooltip-example" dangerouslySetInnerHTML={{__html: `useEffect(() =&gt; fetchData(), [id])`}}/>

</div>

</div>
<div className="hook-row" style={{display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "8px", background: "var(--white)", border: "1px solid var(--border)", transition: "all 0.15s", cursor: "default"}}>
  <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "#059669", flexShrink: 0, boxShadow: "0 0 6px #05966980"}}></span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)", fontFamily: "monospace"}}>useContext</span> <span style={{fontSize: "10.5px", color: "var(--t2)", marginLeft: "auto"}}>global ctx</span> <div className="hook-tooltip">
    <div className="hook-tooltip-name" style={{color: "#059669"}}>
      useContext
    </div>
  <div className="hook-tooltip-desc">
    Reads and subscribes to a React context. Avoids prop-drilling by making shared values (theme, auth, locale) accessible anywhere in the tree.
  </div>
<div className="hook-tooltip-example" dangerouslySetInnerHTML={{__html: `const theme = useContext(ThemeCtx)`}}/>

</div>

</div>
<div className="hook-row" style={{display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "8px", background: "var(--white)", border: "1px solid var(--border)", transition: "all 0.15s", cursor: "default"}}>
  <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", flexShrink: 0, boxShadow: "0 0 6px #f59e0b80"}}></span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)", fontFamily: "monospace"}}>useRef</span> <span style={{fontSize: "10.5px", color: "var(--t2)", marginLeft: "auto"}}>DOM access</span> <div className="hook-tooltip">
    <div className="hook-tooltip-name" style={{color: "#f59e0b"}}>
      useRef
    </div>
  <div className="hook-tooltip-desc">
    Returns a mutable ref object whose .current persists across renders without causing re-renders. Ideal for direct DOM access or storing instance values.
  </div>
<div className="hook-tooltip-example" dangerouslySetInnerHTML={{__html: `const el = useRef(null)`}}/>

</div>

</div>
<div className="hook-row" style={{display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "8px", background: "var(--white)", border: "1px solid var(--border)", transition: "all 0.15s", cursor: "default"}}>
  <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", flexShrink: 0, boxShadow: "0 0 6px #ef444480"}}></span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)", fontFamily: "monospace"}}>useMemo</span> <span style={{fontSize: "10.5px", color: "var(--t2)", marginLeft: "auto"}}>memoized val</span> <div className="hook-tooltip">
    <div className="hook-tooltip-name" style={{color: "#ef4444"}}>
      useMemo
    </div>
  <div className="hook-tooltip-desc">
    Caches the result of an expensive calculation between renders. Only recomputes when its dependencies change — prevents redundant heavy work.
  </div>
<div className="hook-tooltip-example" dangerouslySetInnerHTML={{__html: `const sorted = useMemo(() =&gt; sort(list), [list])`}}/>

</div>

</div>
<div className="hook-row" style={{display: "flex", alignItems: "center", gap: "8px", padding: "5px 8px", borderRadius: "8px", background: "var(--white)", border: "1px solid var(--border)", transition: "all 0.15s", cursor: "default"}}>
  <span style={{width: "8px", height: "8px", borderRadius: "50%", background: "#0ea5e9", flexShrink: 0, boxShadow: "0 0 6px #0ea5e980"}}></span> <span style={{fontSize: "11.5px", fontWeight: 700, color: "var(--t1)", fontFamily: "monospace"}}>useCallback</span> <span style={{fontSize: "10.5px", color: "var(--t2)", marginLeft: "auto"}}>stable fn</span> <div className="hook-tooltip">
    <div className="hook-tooltip-name" style={{color: "#0ea5e9"}}>
      useCallback
    </div>
  <div className="hook-tooltip-desc">
    Returns a memoized version of a callback that only changes when dependencies change. Prevents child re-renders caused by new function references.
  </div>
<div className="hook-tooltip-example" dangerouslySetInnerHTML={{__html: `const fn = useCallback(() =&gt; doX(), [x])`}}/>

</div>

</div>

</div>

</div>

</div>
<div className="tabs">
  <button className="tab-btn active" onClick={(e) => { try { (window as any).switchSubTab('lifecycle', e.currentTarget) } catch(_) {} }}>Lifecycle</button> <button className="tab-btn" onClick={(e) => { try { (window as any).switchSubTab('mount', e.currentTarget) } catch(_) {} }}>Mount</button> <button className="tab-btn" onClick={(e) => { try { (window as any).switchSubTab('update', e.currentTarget) } catch(_) {} }}>Update</button> <button className="tab-btn" onClick={(e) => { try { (window as any).switchSubTab('unmount', e.currentTarget) } catch(_) {} }}>Unmount</button>
</div>
<div id="subtab-lifecycle">
  <div className="code-block code-keyword" dangerouslySetInnerHTML={{__html: ` <span>const</span> <span className="code-func">MyComponent</span> = () => {<br/>&nbsp;&nbsp;<span className="code-keyword">const</span> [count, setCount] = <span className="code-func">useState</span>(<span className="code-string">0</span>);<br/>&nbsp;&nbsp;<span className="code-func">useEffect</span>(() => {<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Runs after every render</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;document.title = <span className="code-string">\`Count: \${count}\`</span>;<br/>&nbsp;&nbsp;}, [count]);<br/>&nbsp;&nbsp;<span className="code-keyword">return</span> &lt;button onClick={() => <span className="code-func">setCount</span>(c => c+<span className="code-string">1</span>)}&gt;{count}&lt;/button&gt;;<br/>}; `}}/>

</div>
<div id="subtab-mount" style={{display: "none"}}>
  <div className="code-block code-comment" dangerouslySetInnerHTML={{__html: ` <span>// Runs once on mount</span><br/><span className="code-func">useEffect</span>(() => {<br/>&nbsp;&nbsp;<span className="code-func">fetchData</span>();<br/>&nbsp;&nbsp;<span className="code-keyword">return</span> () => <span className="code-func">cleanup</span>();<br/>}, []); `}}/>

</div>
<div id="subtab-update" style={{display: "none"}}>
  <div className="code-block code-comment" dangerouslySetInnerHTML={{__html: ` <span>// Runs when 'userId' changes</span><br/><span className="code-func">useEffect</span>(() => {<br/>&nbsp;&nbsp;<span className="code-func">loadUser</span>(userId);<br/>}, [userId]); `}}/>

</div>
<div id="subtab-unmount" style={{display: "none"}}>
  <div className="code-block code-func" dangerouslySetInnerHTML={{__html: ` <span>useEffect</span>(() => {<br/>&nbsp;&nbsp;<span className="code-keyword">const</span> timer = <span className="code-func">setInterval</span>(..., <span className="code-string">1000</span>);<br/>&nbsp;&nbsp;<span className="code-keyword">return</span> () => <span className="code-func">clearInterval</span>(timer);<br/>}, []); `}}/>

</div>

</div>
<div className="card" id="react-redux">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ede9fe"}}>
      🏪
    </div>
  <div>
    <div className="card-title">
      React + Redux
    </div>
  <div className="card-desc">
    Redux provides predictable state management using a single store, pure reducers, and dispatched actions.
  </div>

</div>

</div>
<div className="rg-2">
  <div className="flow-diagram">
    <div className="flow-title">
      Redux Data Flow
    </div>
  <div className="flow-steps">
    <div style={{display: "flex"}}>
      <div className="flow-node node-purple">
        🖥 React Component
      </div>

  </div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-blue">
    ⚡ Dispatch Action
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-orange">
    🔀 Middleware
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-teal">
    ⚙ Reducer
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-green">
    🗄 Store Update
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-pink">
    🔄 Re-render
  </div>

</div>

</div>

</div>
<div>
  <div style={{marginBottom: "1rem"}}>
    <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "8px"}}>
      Redux Concepts
    </div>
  <div className="concept-grid">
    <div className="concept-chip tooltip-wrap" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
      <span className="tooltip">Central state container</span><div style={{fontSize: "18px"}}>
        🗄
      </div>
    <div style={{fontSize: "12px", fontWeight: 600}}>
      Store
    </div>
  <div style={{fontSize: "11px", color: "var(--t3)"}}>
    Single source of truth
  </div>

</div>
<div className="concept-chip tooltip-wrap" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
  <span className="tooltip">Pure state transformer</span><div style={{fontSize: "18px"}}>
    ⚙
  </div>
<div style={{fontSize: "12px", fontWeight: 600}}>
  Reducer
</div>
<div style={{fontSize: "11px", color: "var(--t3)"}}>
  Pure function (state, action)
</div>

</div>
<div className="concept-chip tooltip-wrap" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
  <span className="tooltip">Describes what happened</span><div style={{fontSize: "18px"}}>
    ⚡
  </div>
<div style={{fontSize: "12px", fontWeight: 600}}>
  Action
</div>
<div style={{fontSize: "11px", color: "var(--t3)"}}>
  &#123; type, payload &#125;
</div>

</div>
<div className="concept-chip tooltip-wrap" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
  <span className="tooltip">Sends actions to the store</span><div style={{fontSize: "18px"}}>
    📡
  </div>
<div style={{fontSize: "12px", fontWeight: 600}}>
  Dispatch
</div>
<div style={{fontSize: "11px", color: "var(--t3)"}}>
  Triggers state change
</div>

</div>

</div>

</div>
<div className="code-block code-keyword" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>const</span> addTodo = (text) => ({<br/>&nbsp;&nbsp;type: <span className="code-string">'ADD_TODO'</span>, payload: text<br/>});<br/><br/><span className="code-keyword">const</span> todos = (state=[], action) => {<br/>&nbsp;&nbsp;<span className="code-keyword">switch</span>(action.type) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> <span className="code-string">'ADD_TODO'</span>:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> [...state, action.payload];<br/>&nbsp;&nbsp;}<br/>}; `}}/>

</div>

</div>
<div className="divider">

</div>
<div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
  Middleware — Redux Thunk vs Saga
</div>
<div className="compare-grid">
  <div className="compare-card">
    <h4>
      <span style={{fontSize: "16px"}}>🌊</span> Redux Thunk <span className="badge badge-blue">Simple</span>
    </h4>
  <div className="compare-item">
    <div className="compare-dot" style={{background: "#3b82f6"}}>

    </div>
  Action creators return functions
</div>
<div className="compare-item">
  <div className="compare-dot" style={{background: "#3b82f6"}}>

  </div>
Built into Redux Toolkit by default
</div>
<div className="compare-item">
  <div className="compare-dot" style={{background: "#3b82f6"}}>

  </div>
Good for simple async operations
</div>
<div className="compare-item">
  <div className="compare-dot" style={{background: "#3b82f6"}}>

  </div>
Less boilerplate code
</div>
<div className="code-block code-keyword" style={{fontSize: "11px", marginTop: "10px"}} dangerouslySetInnerHTML={{__html: ` <span>const</span> fetchUser = (id) =><br/>&nbsp;&nbsp;<span className="code-keyword">async</span> (dispatch) => {<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">const</span> user = <span className="code-keyword">await</span> <span className="code-func">api</span>(id);<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-func">dispatch</span>({ type: <span className="code-string">'SET_USER'</span>, user });<br/>&nbsp;&nbsp;}; `}}/>

</div>
<div className="compare-card">
  <h4>
    <span style={{fontSize: "16px"}}>⚗</span> Redux Saga <span className="badge badge-orange">Advanced</span>
  </h4>
<div className="compare-item">
  <div className="compare-dot" style={{background: "#f97316"}}>

  </div>
Uses ES6 generator functions
</div>
<div className="compare-item">
  <div className="compare-dot" style={{background: "#f97316"}}>

  </div>
Handles complex async flows
</div>
<div className="compare-item">
  <div className="compare-dot" style={{background: "#f97316"}}>

  </div>
Highly testable side effects
</div>
<div className="compare-item">
  <div className="compare-dot" style={{background: "#f97316"}}>

  </div>
More boilerplate, more power
</div>
<div className="code-block code-keyword" style={{fontSize: "11px", marginTop: "10px"}} dangerouslySetInnerHTML={{__html: ` <span>function*</span> <span className="code-func">fetchUserSaga</span>() {<br/>&nbsp;&nbsp;<span className="code-keyword">const</span> {id} = <span className="code-keyword">yield take</span>(<span className="code-string">'FETCH'</span>);<br/>&nbsp;&nbsp;<span className="code-keyword">const</span> user = <span className="code-keyword">yield call</span>(api, id);<br/>&nbsp;&nbsp;<span className="code-keyword">yield put</span>({ type: <span className="code-string">'SET'</span>, user });<br/>} `}}/>

</div>

</div>

</div>
<div className="card" id="react-zustand">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfdf5"}}>
      🐻
    </div>
  <div>
    <div className="card-title">
      React + Zustand
    </div>
  <div className="card-desc">
    Zustand is a lightweight state management solution — no boilerplate, no reducers, just a simple store with actions.
  </div>

</div>

</div>
<div className="rg-2">
  <div className="flow-diagram">
    <div className="flow-title">
      Zustand Flow
    </div>
  <div className="flow-steps">
    <div style={{display: "flex"}}>
      <div className="flow-node node-purple">
        🖥 Component
      </div>

  </div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-green">
    🐻 Zustand Store
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-teal">
    💾 State Update
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-pink">
    🔄 Re-render
  </div>

</div>

</div>

</div>
<div>
  <div className="code-block code-keyword" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>const</span> useStore = <span className="code-func">create</span>((set) => ({<br/>&nbsp;&nbsp;count: <span className="code-string">0</span>,<br/>&nbsp;&nbsp;inc: () => <span className="code-func">set</span>(s => ({<br/>&nbsp;&nbsp;&nbsp;&nbsp;count: s.count + <span className="code-string">1</span><br/>&nbsp;&nbsp;})),<br/>}));<br/><br/><span className="code-keyword">const</span> {count, inc} = <span className="code-func">useStore</span>(); `}}/>
<div className="info-banner">
  <div className="info-banner-icon">
    💡
  </div>
<div className="info-banner-text">
  Zustand uses React's <b>useSyncExternalStore</b> under the hood, giving it fine-grained re-render control without a Provider wrapping the app.
</div>

</div>

</div>

</div>
<div className="divider">

</div>
<div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
  Redux vs Zustand at a glance
</div>
<div style={{overflowX: "auto"}}>
  <table style={{width: "100%", borderCollapse: "collapse", fontSize: "12px"}}>
    <thead>
      <tr style={{background: "var(--bg)"}}>
        <th style={{textAlign: "left", padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t3)", fontWeight: 600}}>
          Feature
        </th>
      <th style={{textAlign: "left", padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--p600)", fontWeight: 600}}>
        Redux
      </th>
    <th style={{textAlign: "left", padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--success)", fontWeight: 600}}>
      Zustand
    </th>

</tr>

</thead>
<tbody>
  <tr>
    <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
      Setup
    </td>
  <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)"}}>
    Store, Reducers, Actions
  </td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)"}}>
  One function call
</td>

</tr>
<tr style={{background: "var(--bg)"}}>
  <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
    Boilerplate
  </td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)"}}>
  High
</td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)"}}>
  Minimal
</td>

</tr>
<tr>
  <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
    DevTools
  </td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)"}}>
  Excellent
</td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)"}}>
  Good
</td>

</tr>
<tr style={{background: "var(--bg)"}}>
  <td style={{padding: "8px 12px", color: "var(--t2)"}}>
    Bundle size
  </td>
<td style={{padding: "8px 12px"}}>
  ~45kb
</td>
<td style={{padding: "8px 12px"}}>
  ~1kb
</td>

</tr>

</tbody>

</table>

</div>

</div>
<div className="card" id="react-anim">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ede9fe"}}>
      🎬
    </div>
  <div>
    <div className="card-title">
      React Ecosystem — Animated Architecture
    </div>
  <div className="card-desc">
    Live animation showing how components, state, virtual DOM, and the Redux pipeline interact. Click the buttons to trigger flows.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-react" data-h="320"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).reactAnim('render') } catch(_) {} }}>⚛ Component Render</button> <button className="cbtn" onClick={() => { try { (window as any).reactAnim('redux') } catch(_) {} }}>🏪 Redux Flow</button> <button className="cbtn" onClick={() => { try { (window as any).reactAnim('zustand') } catch(_) {} }}>🐻 Zustand Flow</button> <div className="anim-legend">
    <div className="aleg">
      <div className="aleg-dot" style={{background: "#8b7ae8"}}>

      </div>
    Components
  </div>
<div className="aleg">
  <div className="aleg-dot" style={{background: "#60a5fa"}}>

  </div>
Virtual DOM
</div>
<div className="aleg">
  <div className="aleg-dot" style={{background: "#34d399"}}>

  </div>
State
</div>
<div className="aleg">
  <div className="aleg-dot" style={{background: "#f59e0b"}}>

  </div>
Action/Event
</div>

</div>
<div className="canvas-tag">
  React Reconciler
</div>

</div>

</div>

</div>
    </>
  );
};

export default memo(ReactPanel);
