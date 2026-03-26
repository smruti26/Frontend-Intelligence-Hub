/**
 * src/panels/BuildPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * BUILD section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const BuildPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#ea580c,#eab308)"}}>
    <div className="hero-tag">
      🔧 Build Tools
    </div>
  <h1>
    Modern Build Toolchain
  </h1>
<p>
  Webpack, Vite, Turborepo, NX, Monorepo architecture and NPX — understand how modern frontend projects are built, bundled and orchestrated.
</p>

</div>
<div className="card" id="build-webpack">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fff7ed"}}>
      📦
    </div>
  <div>
    <div className="card-title">
      Webpack — Module Bundler
    </div>
  <div className="card-desc">
    Webpack statically analyzes your entire dependency graph, applies loaders to transform files, and outputs optimized bundles. Everything is a module.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-webpack" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).webpackAnim('build') } catch(_) {} }}>▶ Build Process</button> <button className="cbtn" onClick={() => { try { (window as any).webpackAnim('hmr') } catch(_) {} }}>🔥 HMR</button> <button className="cbtn" onClick={() => { try { (window as any).webpackAnim('split') } catch(_) {} }}>✂ Code Split</button> <div className="canvas-tag">
    Webpack 5
  </div>

</div>

</div>

</div>
<div className="card" id="build-webpack-adv">
  <div className="card-header">
    <div className="card-icon" style={{background: "#eff6ff"}}>
      🧩
    </div>
  <div>
    <div className="card-title">
      Module Federation, Tree Shaking &amp; Code Splitting
    </div>
  <div className="card-desc">
    Webpack 5's most powerful features — sharing live modules across apps, eliminating dead code, and loading only what's needed.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-webpack-adv" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).webpackAdvAnim('federation') } catch(_) {} }}>🔗 Module Federation</button> <button className="cbtn" onClick={() => { try { (window as any).webpackAdvAnim('treeshake') } catch(_) {} }}>🌳 Tree Shaking</button> <button className="cbtn" onClick={() => { try { (window as any).webpackAdvAnim('codesplit') } catch(_) {} }}>✂ Code Splitting</button> <button className="cbtn" onClick={() => { try { (window as any).webpackAdvAnim('compile') } catch(_) {} }}>⚙ Compilation</button> <div className="canvas-tag">
    Webpack Advanced
  </div>

</div>

</div>
<div className="rg-2 mt1">
  <div>
    <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
      🔗 Module Federation
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "8px"}}>
    Allows multiple independent builds (micro-frontends) to share JavaScript modules at runtime — without rebuilding. App A can expose components and App B consumes them live.
  </div>
<div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// webpack.config.js — Host App</span><br/><span className="code-keyword">new</span> ModuleFederationPlugin({<br/>&nbsp;&nbsp;remotes: { <span className="code-string">shop</span>: <span className="code-string">'shop@http://cdn/remote.js'</span> },<br/>})<br/><span className="code-comment">// Use remote component</span><br/><span className="code-keyword">const</span> Cart = <span className="code-func">React.lazy</span>(()=&gt;<span className="code-func">import</span>(<span className="code-string">'shop/Cart'</span>)); `}}/>

</div>
<div>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
    🌳 Tree Shaking
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "8px"}}>
  Dead code elimination based on ES module static analysis. Webpack marks unexported or unused exports and strips them from the final bundle.
</div>
<div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// utils.js — only add() is used</span><br/><span className="code-keyword">export</span> <span className="code-keyword">function</span> <span className="code-func">add</span>(a,b){<span className="code-keyword">return</span> a+b;}<br/><span className="code-keyword">export</span> <span className="code-keyword">function</span> <span className="code-func">unused</span>(){...} <span className="code-comment">// ❌ shaken</span><br/><br/><span className="code-comment">// package.json</span><br/><span className="code-string">"sideEffects"</span>: <span className="code-keyword">false</span> <span className="code-comment">// hint for tree-shaking</span> `}}/>

</div>
<div>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
    ✂ Code Splitting
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "8px"}}>
  Split bundles into smaller chunks loaded on-demand. Dynamic <code>import()</code> creates async chunks. SplitChunksPlugin shares common vendor code between routes.
</div>
<div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// Dynamic import — creates async chunk</span><br/><span className="code-keyword">const</span> Chart = <span className="code-func">React.lazy</span>(()=&gt;<span className="code-func">import</span>(<br/>&nbsp;&nbsp;<span className="code-comment">/* webpackChunkName: "chart" */</span><br/>&nbsp;&nbsp;<span className="code-string">'./Chart'</span><br/>)); `}}/>

</div>
<div>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
    ⚙ Compilation Pipeline
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "8px"}}>
  Webpack builds a module graph, applies loaders (Babel, CSS, TS), runs plugins (terser, html-webpack-plugin), then serializes the dependency graph into output chunks.
</div>
<div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// Loader chain (right→left)</span><br/>{ test: /\\.tsx?$/, use: [<span className="code-string">'babel-loader'</span>, <span className="code-string">'ts-loader'</span>] }<br/><span className="code-comment">// Plugin runs after all modules resolved</span><br/><span className="code-keyword">new</span> <span className="code-func">MiniCssExtractPlugin</span>({ filename: <span className="code-string">'[hash].css'</span> }) `}}/>

</div>

</div>

</div>
<div className="card" id="build-vite">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef9c3"}}>
      ⚡
    </div>
  <div>
    <div className="card-title">
      Vite — Next-Gen Build Tool
    </div>
  <div className="card-desc">
    Vite serves source files over native ESM during development (no bundling!), and uses Rollup for production builds. Dramatically faster than Webpack for dev server startup.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-vite" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).viteAnim('dev') } catch(_) {} }}>🚀 Dev Server</button> <button className="cbtn" onClick={() => { try { (window as any).viteAnim('prod') } catch(_) {} }}>📦 Production Build</button> <div className="canvas-tag">
    Vite + Rollup
  </div>

</div>

</div>

</div>
<div className="card" id="build-compare">
  <div className="card-header">
    <div className="card-icon" style={{background: "#f0fdf4"}}>
      ⚖️
    </div>
  <div>
    <div className="card-title">
      Webpack vs Vite — Side by Side
    </div>
  <div className="card-desc">
    See how each tool handles dev server startup, HMR, and production builds differently.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-buildcmp" data-h="240"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).buildCmpAnim('startup') } catch(_) {} }}>⏱ Cold Start</button> <button className="cbtn" onClick={() => { try { (window as any).buildCmpAnim('hmr') } catch(_) {} }}>🔥 HMR Speed</button> <button className="cbtn" onClick={() => { try { (window as any).buildCmpAnim('prod') } catch(_) {} }}>📦 Prod Bundle</button> <div className="canvas-tag">
    Webpack vs Vite
  </div>

</div>

</div>

</div>
<div className="card" id="build-monorepo">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ede9fe"}}>
      🏗️
    </div>
  <div>
    <div className="card-title">
      Monorepo — Turborepo & NX
    </div>
  <div className="card-desc">
    A monorepo hosts multiple packages/apps in one repo. Turborepo adds smart remote caching and task pipelines. NX adds generators, affected commands, and graph visualization.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-monorepo" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).monorepoAnim('turbo') } catch(_) {} }}>🚀 Turborepo Cache</button> <button className="cbtn" onClick={() => { try { (window as any).monorepoAnim('nx') } catch(_) {} }}>🔷 NX Affected</button> <button className="cbtn" onClick={() => { try { (window as any).monorepoAnim('build') } catch(_) {} }}>🏗 Build Pipeline</button> <div className="canvas-tag">
    Monorepo Architecture
  </div>

</div>

</div>
<div className="rg-2 mt1">
  <div style={{background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "10px", padding: "1rem"}}>
    <div style={{fontSize: "13px", fontWeight: 600, color: "var(--p700)", marginBottom: "8px"}}>
      🚀 Turborepo
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
    Remote caching — never rebuild unchanged packages. Pipeline dependency graph ensures correct build order. Zero-config for most setups.
  </div>

</div>
<div style={{background: "var(--b50)", border: "1px solid var(--b100)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 600, color: "var(--b700)", marginBottom: "8px"}}>
    🔷 NX
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
  Project graph, affected commands, code generators, distributed task execution. Supports Angular, React, Node. Highly configurable workspace.
</div>

</div>

</div>
<div className="info-banner" style={{marginTop: "1rem"}}>
  <div className="info-banner-icon">
    💡
  </div>
<div className="info-banner-text">
  <b>NPX</b> (Node Package Execute) runs npm packages without installing them globally — e.g. <code>npx create-react-app my-app</code> always fetches the latest version.
</div>

</div>

</div>
    </>
  );
};

export default memo(BuildPanel);
