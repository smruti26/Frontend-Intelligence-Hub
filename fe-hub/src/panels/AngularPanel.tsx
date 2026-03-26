/**
 * src/panels/AngularPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * ANGULAR section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const AngularPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#dc2626,#ea580c)"}}>
    <div className="hero-tag">
      🅰 Framework
    </div>
  <h1>
    Angular Ecosystem
  </h1>
<p>
  Angular is an opinionated full framework with modules, dependency injection, RxJS, and NgRx for enterprise-scale apps.
</p>

</div>
<div className="card" id="ng-arch">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef2f2"}}>
      🅰️
    </div>
  <div>
    <div className="card-title">
      Angular Architecture
    </div>
  <div className="card-desc">
    Angular uses modules, components, services, and dependency injection — forming a complete MVC-style framework.
  </div>

</div>

</div>
<div className="rg-2">
  <div className="flow-diagram">
    <div className="flow-title">
      NgRx State Flow
    </div>
  <div className="flow-steps">
    <div style={{display: "flex"}}>
      <div className="flow-node node-orange">
        🅰 Component
      </div>

  </div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-blue">
    🔧 Service (DI)
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-purple">
    🏪 NgRx Store
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-pink">
    ⚡ Effects
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
    💾 State Update
  </div>

</div>

</div>

</div>
<div>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
    Angular Core Building Blocks
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
  <div style={{background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "10px", padding: "12px"}}>
    <div style={{fontSize: "12px", fontWeight: 600, color: "#9a3412"}}>
      📦 NgModule
    </div>
  <div style={{fontSize: "11px", color: "var(--t2)", marginTop: "3px"}}>
    Groups components, directives, pipes and providers
  </div>

</div>
<div style={{background: "var(--b50)", border: "1px solid var(--b100)", borderRadius: "10px", padding: "12px"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--b700)"}}>
    🔧 Dependency Injection
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", marginTop: "3px"}}>
  Services are injected into components via constructor
</div>

</div>
<div style={{background: "#fdf2f8", border: "1px solid #f9a8d4", borderRadius: "10px", padding: "12px"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "#831843"}}>
    🌊 RxJS Observables
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", marginTop: "3px"}}>
  Reactive streams power all async operations
</div>

</div>
<div style={{background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "10px", padding: "12px"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--p700)"}}>
    ⚡ NgRx Effects
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", marginTop: "3px"}}>
  Side effect handler — similar to Redux Saga
</div>

</div>

</div>

</div>

</div>
<div className="code-block code-func" style={{marginTop: "1rem"}} dangerouslySetInnerHTML={{__html: ` @<span>Injectable</span>({ providedIn: <span className="code-string">'root'</span> })<br/><span className="code-keyword">export class</span> <span className="code-func">UserService</span> {<br/>&nbsp;&nbsp;<span className="code-keyword">constructor</span>(<span className="code-keyword">private</span> http: HttpClient) {}<br/>&nbsp;&nbsp;<span className="code-func">getUser</span>(id: string): Observable&lt;User&gt; {<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-keyword">this</span>.http.<span className="code-func">get</span>&lt;User&gt;(<span className="code-string">\`/api/users/\${id}\`</span>);<br/>&nbsp;&nbsp;}<br/>} `}}/>

</div>
<div className="card" id="ng-anim">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef2f2"}}>
      🎬
    </div>
  <div>
    <div className="card-title">
      Angular Architecture — Animated Diagram
    </div>
  <div className="card-desc">
    See how Components, Services, DI, RxJS streams, and NgRx state management connect and flow data through an Angular application.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-angular" data-h="220"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).angularAnim('dispatch') } catch(_) {} }}>Dispatch Action</button> <button className="cbtn" onClick={() => { try { (window as any).angularAnim('http') } catch(_) {} }}>HTTP Effect</button> <button className="cbtn" onClick={() => { try { (window as any).angularAnim('rxjs') } catch(_) {} }}>RxJS Stream</button> <div className="canvas-tag">
    Angular + NgRx
  </div>

</div>

</div>

</div>
    </>
  );
};

export default memo(AngularPanel);
