/**
 * src/panels/TestingPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * TESTING section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const TestingPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#0891b2,#0e7490)"}}>
    <div className="hero-tag">
      🧪 Testing
    </div>
  <h1>
    Frontend Testing Strategy
  </h1>
<p>
  From smoke tests to full regression suites — understand testing types, the testing pyramid, and how to build a strategy that catches bugs without slowing down development.
</p>

</div>
<div className="card" id="test-pyramid">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfeff"}}>
      🔺
    </div>
  <div>
    <div className="card-title">
      The Testing Pyramid &amp; Strategy
    </div>
  <div className="card-desc">
    The testing pyramid defines the ideal ratio of unit, integration, and E2E tests — more fast cheap unit tests at the base, fewer slow expensive E2E at the top.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-testing" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).testingAnim('unit') } catch(_) {} }}>⚡ Unit Tests</button> <button className="cbtn" onClick={() => { try { (window as any).testingAnim('integration') } catch(_) {} }}>🔗 Integration</button> <button className="cbtn" onClick={() => { try { (window as any).testingAnim('e2e') } catch(_) {} }}>🌐 E2E</button> <button className="cbtn" onClick={() => { try { (window as any).testingAnim('smoke') } catch(_) {} }}>💨 Smoke</button> <div className="canvas-tag">
    Testing Pyramid
  </div>

</div>

</div>

</div>
<div className="card" id="test-types">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfeff"}}>
      🧪
    </div>
  <div>
    <div className="card-title">
      Test Types — Smoke, Functional &amp; More
    </div>
  <div className="card-desc">
    Each testing type serves a different role in the quality pipeline — from fast sanity checks to detailed behavioural verification.
  </div>

</div>

</div>
<div className="rg-2">
  <div style={{background: "#ecfeff", border: "1px solid #a5f3fc", borderRadius: "12px", padding: "1.2rem", borderLeft: "4px solid #06b6d4"}}>
    <div style={{fontSize: "14px", fontWeight: 700, color: "#0e7490", marginBottom: "6px"}}>
      💨 Smoke Testing
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "10px"}}>
    A quick sanity check — verify that the most critical user paths work after a new build or deployment. If smoke tests fail, deeper testing is skipped entirely.
  </div>
<div style={{fontSize: "12px", fontWeight: 600, color: "#0e7490", marginBottom: "6px"}}>
  What to smoke test:
</div>
<div style={{display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "var(--t2)"}}>
  <div>
    ▸ App loads without crash
  </div>
<div>
  ▸ Login / signup flow works
</div>
<div>
  ▸ Core navigation routes respond
</div>
<div>
  ▸ API health endpoints return 200
</div>
<div>
  ▸ Payment / checkout flow accessible
</div>

</div>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "1.2rem", borderLeft: "4px solid #22c55e"}}>
  <div style={{fontSize: "14px", fontWeight: 700, color: "#15803d", marginBottom: "6px"}}>
    ✅ Functional Testing
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "10px"}}>
  Verifies that each feature behaves according to its specification — inputs produce expected outputs, UI interactions trigger correct state changes and API calls.
</div>
<div style={{fontSize: "12px", fontWeight: 600, color: "#15803d", marginBottom: "6px"}}>
  Tools &amp; Techniques:
</div>
<div style={{display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "var(--t2)"}}>
  <div>
    ▸ Jest + React Testing Library (component)
  </div>
<div>
  ▸ Cypress / Playwright (browser automation)
</div>
<div>
  ▸ Given-When-Then BDD pattern
</div>
<div>
  ▸ Mock APIs with MSW (Mock Service Worker)
</div>
<div>
  ▸ Accessibility testing with axe-core
</div>

</div>

</div>
<div style={{background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "1.2rem", borderLeft: "4px solid #3b82f6"}}>
  <div style={{fontSize: "14px", fontWeight: 700, color: "#1e40af", marginBottom: "6px"}}>
    🔗 Integration Testing
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "10px"}}>
  Tests how multiple units work together — component + API + state. Catches bugs at the boundaries that unit tests miss.
</div>
<div className="code-block code-comment" style={{fontSize: "11px", marginTop: "6px"}} dangerouslySetInnerHTML={{__html: ` <span>// React Testing Library</span><br/><span className="code-func">render</span>(&lt;UserProfile userId=<span className="code-string">"1"</span> /&gt;);<br/><span className="code-keyword">await</span> <span className="code-func">waitFor</span>(()=&gt;<br/>&nbsp;&nbsp;<span className="code-func">expect</span>(<span className="code-func">screen.getByText</span>(<span className="code-string">'Alice'</span>)).toBeInTheDocument()<br/>); `}}/>

</div>
<div style={{background: "#fdf4ff", border: "1px solid #e9d5ff", borderRadius: "12px", padding: "1.2rem", borderLeft: "4px solid #a855f7"}}>
  <div style={{fontSize: "14px", fontWeight: 700, color: "#6b21a8", marginBottom: "6px"}}>
    🌐 End-to-End Testing
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "10px"}}>
  Simulates real user journeys in a real browser. Slow but high confidence — catches issues unit tests cannot.
</div>
<div className="code-block code-comment" style={{fontSize: "11px", marginTop: "6px"}} dangerouslySetInnerHTML={{__html: ` <span>// Playwright E2E example</span><br/><span className="code-keyword">await</span> page.<span className="code-func">goto</span>(<span className="code-string">'/login'</span>);<br/><span className="code-keyword">await</span> page.<span className="code-func">fill</span>(<span className="code-string">'[name=email]'</span>, <span className="code-string">'<a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="0e7b7d6b7c4e7a6b7d7a206d6163">[email&#160;protected]</a>'</span>);<br/><span className="code-keyword">await</span> page.<span className="code-func">click</span>(<span className="code-string">'[type=submit]'</span>);<br/><span className="code-keyword">await</span> <span className="code-func">expect</span>(page).toHaveURL(<span className="code-string">'/dashboard'</span>); `}}/>

</div>

</div>

</div>
<div className="card" id="test-patterns">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfeff"}}>
      📐
    </div>
  <div>
    <div className="card-title">
      Test Patterns &amp; Best Practices
    </div>
  <div className="card-desc">
    Proven patterns that make tests maintainable, reliable, and fast — from AAA structure to the Page Object Model.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-testpattern" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).testPatAnim('aaa') } catch(_) {} }}>📐 AAA Pattern</button> <button className="cbtn" onClick={() => { try { (window as any).testPatAnim('pom') } catch(_) {} }}>📄 Page Object</button> <button className="cbtn" onClick={() => { try { (window as any).testPatAnim('tdd') } catch(_) {} }}>🔴 TDD Cycle</button> <div className="canvas-tag">
    Test Patterns
  </div>

</div>

</div>
<div className="rg-3 mt1">
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
    <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "6px"}}>
      🏗 AAA Pattern
    </div>
  <div style={{fontSize: "11px", color: "var(--t2)", marginBottom: "8px"}}>
    Arrange → Act → Assert. The universal structure for every unit test — setup state, perform action, verify result.
  </div>
<div className="code-block code-string" style={{fontSize: "10.5px"}} dangerouslySetInnerHTML={{__html: ` it(<span>'adds items'</span>, () =&gt; {<br/>&nbsp;&nbsp;<span className="code-comment">// Arrange</span><br/>&nbsp;&nbsp;<span className="code-keyword">const</span> cart = <span className="code-keyword">new</span> Cart();<br/>&nbsp;&nbsp;<span className="code-comment">// Act</span><br/>&nbsp;&nbsp;cart.<span className="code-func">add</span>({id:<span className="code-string">'1'</span>,qty:<span className="code-string">2</span>});<br/>&nbsp;&nbsp;<span className="code-comment">// Assert</span><br/>&nbsp;&nbsp;<span className="code-func">expect</span>(cart.total).toBe(<span className="code-string">2</span>);<br/>}); `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "6px"}}>
    📄 Page Object Model
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", marginBottom: "8px"}}>
  Encapsulate page selectors and actions in a class. Tests call methods, not raw selectors — survives UI changes.
</div>
<div className="code-block code-keyword" style={{fontSize: "10.5px"}} dangerouslySetInnerHTML={{__html: ` <span>class</span> <span className="code-func">LoginPage</span> {<br/>&nbsp;&nbsp;<span className="code-func">fillEmail</span>(v){ ... }<br/>&nbsp;&nbsp;<span className="code-func">submit</span>(){ ... }<br/>}<br/><span className="code-comment">// Test is readable</span><br/><span className="code-keyword">await</span> login.<span className="code-func">fillEmail</span>(e);<br/><span className="code-keyword">await</span> login.<span className="code-func">submit</span>(); `}}/>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "6px"}}>
    🔴 TDD Cycle
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", marginBottom: "8px"}}>
  Red → Green → Refactor. Write a failing test, write minimum code to pass it, then clean up. Prevents over-engineering.
</div>
<div style={{display: "flex", flexDirection: "column", gap: "4px", marginTop: "8px"}}>
  <div style={{background: "#fef2f2", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", fontWeight: 500, color: "#991b1b"}}>
    🔴 Write failing test
  </div>
<div style={{background: "#ecfdf5", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", fontWeight: 500, color: "#065f46"}}>
  🟢 Make test pass
</div>
<div style={{background: "#eff6ff", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", fontWeight: 500, color: "#1e40af"}}>
  🔵 Refactor code
</div>

</div>

</div>

</div>

</div>
<div className="card" id="test-tools">
  <div className="card-header">
    <div className="card-icon" style={{background: "#ecfeff"}}>
      🛠️
    </div>
  <div>
    <div className="card-title">
      Testing Tools Ecosystem
    </div>
  <div className="card-desc">
    The modern frontend testing stack — from unit runners to visual regression tools.
  </div>

</div>

</div>
<div className="rg-4">
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
    <div style={{fontSize: "22px", marginBottom: "6px"}}>
      🃏
    </div>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px"}}>
    Jest
  </div>
<div style={{fontSize: "10px", color: "var(--t2)"}}>
  Unit & integration runner. Snapshot testing, mocking, coverage reports.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "22px", marginBottom: "6px"}}>
    🐙
  </div>
<div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px"}}>
  RTL
</div>
<div style={{fontSize: "10px", color: "var(--t2)"}}>
  React Testing Library. Test components as users see them — by role, label, text.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "22px", marginBottom: "6px"}}>
    🎭
  </div>
<div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px"}}>
  Playwright
</div>
<div style={{fontSize: "10px", color: "var(--t2)"}}>
  Cross-browser E2E automation. Auto-wait, trace viewer, parallel execution.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "22px", marginBottom: "6px"}}>
    🌲
  </div>
<div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px"}}>
  Cypress
</div>
<div style={{fontSize: "10px", color: "var(--t2)"}}>
  Developer-friendly E2E. Time-travel debugging, real-time reloads.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "22px", marginBottom: "6px"}}>
    📖
  </div>
<div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px"}}>
  Storybook
</div>
<div style={{fontSize: "10px", color: "var(--t2)"}}>
  Component dev & visual testing. Interaction tests + Chromatic visual regression.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "22px", marginBottom: "6px"}}>
    🎯
  </div>
<div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px"}}>
  Vitest
</div>
<div style={{fontSize: "10px", color: "var(--t2)"}}>
  Vite-native unit tester. Jest-compatible API, blazing fast, ESM native.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "22px", marginBottom: "6px"}}>
    🤖
  </div>
<div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px"}}>
  MSW
</div>
<div style={{fontSize: "10px", color: "var(--t2)"}}>
  Mock Service Worker. Intercepts network requests at the Service Worker level.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem", textAlign: "center"}}>
  <div style={{fontSize: "22px", marginBottom: "6px"}}>
    ♿
  </div>
<div style={{fontSize: "12px", fontWeight: 600, marginBottom: "4px"}}>
  axe-core
</div>
<div style={{fontSize: "10px", color: "var(--t2)"}}>
  Automated accessibility testing. Integrates with Jest, Cypress, and Playwright.
</div>

</div>

</div>

</div>
    </>
  );
};

export default memo(TestingPanel);
