/**
 * src/panels/VuePanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * VUE section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const VuePanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#059669,#0891b2)"}}>
    <div className="hero-tag">
      💚 Vue.js
    </div>
  <h1>
    Vue.js Ecosystem
  </h1>
<p>
  Vue's progressive architecture with its reactive system, Pinia state management, and Composition API make it uniquely approachable.
</p>

</div>
<div className="card" id="vue-arch">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfdf5"}}>
      💚
    </div>
  <div>
    <div className="card-title">
      Vue Reactivity System
    </div>
  <div className="card-desc">
    Vue 3 uses Proxy-based reactivity. When reactive data changes, Vue automatically tracks dependencies and updates the DOM.
  </div>

</div>

</div>
<div className="rg-2">
  <div className="flow-diagram">
    <div className="flow-title">
      Pinia State Flow
    </div>
  <div className="flow-steps">
    <div style={{display: "flex"}}>
      <div className="flow-node node-green">
        💚 Component
      </div>

  </div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-teal">
    🍍 Pinia Store
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-blue">
    💡 Reactive State
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-purple">
    ⚙ Computed Props
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-orange">
    🔄 DOM Update
  </div>

</div>

</div>

</div>
<div>
  <div className="code-block code-keyword" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>export const</span> useCounterStore = <span className="code-func">defineStore</span>(<span className="code-string">'counter'</span>, {<br/>&nbsp;&nbsp;state: () => ({ count: <span className="code-string">0</span> }),<br/>&nbsp;&nbsp;getters: { doubled: (s) => s.count * <span className="code-string">2</span> },<br/>&nbsp;&nbsp;actions: { <span className="code-func">increment</span>() { <span className="code-keyword">this</span>.count++ } },<br/>}); `}}/>
<div className="info-banner">
  <div className="info-banner-icon">
    🍍
  </div>
<div className="info-banner-text">
  <b>Pinia</b> replaced Vuex as Vue's official state manager. It's simpler, fully typed, and supports Vue DevTools.
</div>

</div>

</div>

</div>

</div>
<div className="card" id="vue-anim">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfdf5"}}>
      🎬
    </div>
  <div>
    <div className="card-title">
      Vue.js Ecosystem — Animated Diagram
    </div>
  <div className="card-desc">
    Watch how Vue's Proxy-based reactivity, computed properties, watchers, and Pinia store all respond to state changes in real time.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-vue" data-h="320"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).vueAnim('reactive') } catch(_) {} }}>Set Reactive Data</button> <button className="cbtn" onClick={() => { try { (window as any).vueAnim('computed') } catch(_) {} }}>Computed Update</button> <button className="cbtn" onClick={() => { try { (window as any).vueAnim('pinia') } catch(_) {} }}>Pinia Action</button> <button className="cbtn" onClick={() => { try { (window as any).vueAnim('watcher') } catch(_) {} }}>Watch Trigger</button> <div className="canvas-tag">
    Vue 3 Reactivity
  </div>

</div>

</div>

</div>
    </>
  );
};

export default memo(VuePanel);
