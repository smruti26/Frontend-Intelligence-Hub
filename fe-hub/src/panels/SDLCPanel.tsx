/**
 * src/panels/SDLCPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * SDLC section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const SDLCPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#b45309,#f59e0b,#d97706)"}}>
    <div className="hero-wm">

    </div>
  <div className="hero-tag">
    ⚙️ Engineering Process
  </div>
<h1>
  Software Development Life Cycle
</h1>
<p>
  From requirements gathering to production deployment — understand every phase of the SDLC, the role of a Software Architect, and the architectural patterns that shape modern systems.
</p>

</div>
<div className="card" id="sdlc-overview">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef3c7"}}>
      ⚙️
    </div>
  <div>
    <div className="card-title">
      SDLC — All 7 Phases Explained
    </div>
  <div className="card-desc">
    The Software Development Life Cycle is a structured process that guides teams from initial concept through to a live, maintained product.
  </div>

</div>

</div>
<div className="rg-2">
  <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
    <div style={{background: "#fef3c7", border: "1px solid #fde68a", borderRadius: "11px", padding: "1rem", borderLeft: "4px solid #f59e0b"}}>
      <div style={{fontSize: "13px", fontWeight: 700, color: "#92400e", marginBottom: "5px"}}>
        1 · Planning
      </div>
    <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
      Define project scope, feasibility, resources, budget and timeline. Produce a Project Plan and Risk Register. Stakeholders align on goals before any code is written.
    </div>
  <div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
    <span className="badge badge-orange">Scope Definition</span><span className="badge badge-orange">Risk Analysis</span><span className="badge badge-orange">Resource Planning</span>
  </div>

</div>
<div style={{background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "11px", padding: "1rem", borderLeft: "4px solid #3b82f6"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#1e40af", marginBottom: "5px"}}>
    2 · Requirements Analysis
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
  Gather and document functional and non-functional requirements. Techniques: user interviews, user stories, use-case diagrams, acceptance criteria with the BDD Given/When/Then format.
</div>
<div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
  <span className="badge badge-blue">User Stories</span><span className="badge badge-blue">Acceptance Criteria</span><span className="badge badge-blue">BDD</span>
</div>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "11px", padding: "1rem", borderLeft: "4px solid #22c55e"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#14532d", marginBottom: "5px"}}>
    3 · System Design
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
  High-level and low-level design. Architecture patterns (MVC, microservices, event-driven), DB schema, API contracts (OpenAPI), UI wireframes, and technology stack decisions.
</div>
<div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
  <span className="badge badge-green">HLD / LLD</span><span className="badge badge-green">API Design</span><span className="badge badge-green">DB Schema</span>
</div>

</div>
<div style={{background: "#fdf4ff", border: "1px solid #e9d5ff", borderRadius: "11px", padding: "1rem", borderLeft: "4px solid #a855f7"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#581c87", marginBottom: "5px"}}>
    4 · Implementation (Coding)
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
  Developers write code following the design docs, coding standards, and TDD/BDD practices. Feature branches, code reviews via PRs, pair programming, and daily standups keep quality high.
</div>
<div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
  <span className="badge badge-purple">TDD</span><span className="badge badge-purple">Code Review</span><span className="badge badge-purple">CI</span>
</div>

</div>

</div>
<div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
  <div style={{background: "#ecfeff", border: "1px solid #a5f3fc", borderRadius: "11px", padding: "1rem", borderLeft: "4px solid #06b6d4"}}>
    <div style={{fontSize: "13px", fontWeight: 700, color: "#0e7490", marginBottom: "5px"}}>
      5 · Testing &amp; QA
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
    Unit → Integration → System → UAT. Automated regression suites via CI pipeline. Performance, security (OWASP), and accessibility testing gate every release. Bugs are tracked and prioritised.
  </div>
<div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
  <span className="badge" style={{background: "#cffafe", color: "#155e75"}}>UAT</span><span className="badge" style={{background: "#cffafe", color: "#155e75"}}>Regression</span><span className="badge" style={{background: "#cffafe", color: "#155e75"}}>OWASP</span>
</div>

</div>
<div style={{background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "11px", padding: "1rem", borderLeft: "4px solid #ef4444"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#7f1d1d", marginBottom: "5px"}}>
    6 · Deployment
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
  Staged rollout: Dev → Staging → Production. Blue-green or canary deployments minimise risk. Infrastructure-as-Code (Terraform, Pulumi) ensures reproducibility. Feature flags allow safe releases.
</div>
<div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
  <span className="badge badge-orange">Blue-Green</span><span className="badge badge-orange">Canary</span><span className="badge badge-orange">IaC</span>
</div>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "11px", padding: "1rem", borderLeft: "4px solid #10b981"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#065f46", marginBottom: "5px"}}>
    7 · Maintenance &amp; Operations
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6}}>
  Monitor with APM tools (Datadog, New Relic), respond to incidents via SLO/SLA, patch security vulnerabilities, optimise performance, gather user feedback, and plan next iterations.
</div>
<div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
  <span className="badge badge-green">SLO/SLA</span><span className="badge badge-green">APM</span><span className="badge badge-green">Hotfix</span>
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "11px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: "8px"}}>
    🔄 SDLC Models at a Glance
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
  <div style={{display: "flex", gap: "8px", alignItems: "flex-start"}}>
    <span style={{fontSize: "11px", fontWeight: 600, color: "#f59e0b", minWidth: "72px"}}>Waterfall</span><span style={{fontSize: "11px", color: "var(--t2)"}}>Sequential phases. Clear docs. Best for stable, well-defined requirements.</span>
  </div>
<div style={{display: "flex", gap: "8px", alignItems: "flex-start"}}>
  <span style={{fontSize: "11px", fontWeight: 600, color: "#8b7ae8", minWidth: "72px"}}>Agile/Scrum</span><span style={{fontSize: "11px", color: "var(--t2)"}}>2-week sprints. Incremental delivery. Adapts to changing requirements.</span>
</div>
<div style={{display: "flex", gap: "8px", alignItems: "flex-start"}}>
  <span style={{fontSize: "11px", fontWeight: 600, color: "#10b981", minWidth: "72px"}}>Kanban</span><span style={{fontSize: "11px", color: "var(--t2)"}}>Flow-based. Continuous delivery. WIP limits reduce context switching.</span>
</div>
<div style={{display: "flex", gap: "8px", alignItems: "flex-start"}}>
  <span style={{fontSize: "11px", fontWeight: 600, color: "#3b82f6", minWidth: "72px"}}>SAFe</span><span style={{fontSize: "11px", color: "var(--t2)"}}>Scaled Agile for large enterprises. Program Increments, ARTs.</span>
</div>

</div>

</div>

</div>

</div>

</div>
<div className="card" id="sdlc-anim">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef3c7"}}>
      🎬
    </div>
  <div>
    <div className="card-title">
      SDLC Pipeline — Animated Flow
    </div>
  <div className="card-desc">
    Watch how a feature travels through each SDLC phase from idea to production, with data flowing between stages.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-sdlc" data-h="340"/>

<div className="canvas-controls">
  <button className="cbtn on" onClick={(e) => { try { (window as any).sdlcMode('waterfall', e.currentTarget) } catch(_) {} }}>💧 Waterfall</button> <button className="cbtn" onClick={(e) => { try { (window as any).sdlcMode('agile', e.currentTarget) } catch(_) {} }}>🔄 Agile Sprint</button> <button className="cbtn" onClick={(e) => { try { (window as any).sdlcMode('devops', e.currentTarget) } catch(_) {} }}>♾️ DevOps Loop</button> <div className="canvas-tag">
    SDLC Animation
  </div>

</div>

</div>

</div>
<div className="card" id="sdlc-architect">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef3c7"}}>
      🏛️
    </div>
  <div>
    <div className="card-title">
      The Software Architect — Role &amp; Responsibilities
    </div>
  <div className="card-desc">
    A Software Architect bridges business requirements and technical implementation — making high-stakes decisions that shape the entire system from planning to production.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-architect" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn on" onClick={(e) => { try { (window as any).archMode('overview', e.currentTarget) } catch(_) {} }}>🗺 Overview</button> <button className="cbtn" onClick={(e) => { try { (window as any).archMode('planning', e.currentTarget) } catch(_) {} }}>📋 Planning</button> <button className="cbtn" onClick={(e) => { try { (window as any).archMode('design', e.currentTarget) } catch(_) {} }}>✏️ Design</button> <button className="cbtn" onClick={(e) => { try { (window as any).archMode('production', e.currentTarget) } catch(_) {} }}>🚀 Production</button> <div className="canvas-tag">
    Architect Journey
  </div>

</div>

</div>
<div className="rg-3 mt1">
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
    <div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: "8px"}}>
      📋 Planning Phase
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "5px", fontSize: "11.5px", color: "var(--t2)"}}>
    <div>
      ▸ Analyse business requirements &amp; constraints
    </div>
  <div>
    ▸ Define non-functional requirements (NFRs)
  </div>
<div>
  ▸ Produce Architecture Decision Records (ADRs)
</div>
<div>
  ▸ Technology stack selection &amp; justification
</div>
<div>
  ▸ Estimate technical risk and complexity
</div>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: "8px"}}>
    ✏️ Design Phase
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "5px", fontSize: "11.5px", color: "var(--t2)"}}>
  <div>
    ▸ Create system context, container &amp; component diagrams (C4)
  </div>
<div>
  ▸ Design API contracts (REST/GraphQL/gRPC)
</div>
<div>
  ▸ Define data models and DB strategy
</div>
<div>
  ▸ Establish security boundaries &amp; auth patterns
</div>
<div>
  ▸ Plan scalability, caching &amp; CDN strategy
</div>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: "8px"}}>
    🚀 Production Phase
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "5px", fontSize: "11.5px", color: "var(--t2)"}}>
  <div>
    ▸ Review code for architectural compliance
  </div>
<div>
  ▸ Define SLOs, SLAs, and error budgets
</div>
<div>
  ▸ Design CI/CD pipeline and deployment strategy
</div>
<div>
  ▸ Capacity planning &amp; auto-scaling policies
</div>
<div>
  ▸ Post-incident reviews &amp; architecture evolution
</div>

</div>

</div>

</div>
<div style={{background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "12px", padding: "1.2rem", marginTop: "1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "var(--p700)", marginBottom: "10px"}}>
    📐 C4 Model — 4 Levels of Architecture Diagrams
  </div>
<div className="rg-4">
  <div style={{background: "var(--white)", borderRadius: "8px", padding: ".8rem", textAlign: "center", border: "1px solid var(--border)"}}>
    <div style={{fontSize: "18px", marginBottom: "4px"}}>
      🌍
    </div>
  <div style={{fontSize: "11px", fontWeight: 700, color: "var(--p700)"}}>
    Level 1
  </div>
<div style={{fontSize: "10.5px", color: "var(--t2)"}}>
  System Context — Big picture, users &amp; external systems
</div>

</div>
<div style={{background: "var(--white)", borderRadius: "8px", padding: ".8rem", textAlign: "center", border: "1px solid var(--border)"}}>
  <div style={{fontSize: "18px", marginBottom: "4px"}}>
    📦
  </div>
<div style={{fontSize: "11px", fontWeight: 700, color: "var(--p700)"}}>
  Level 2
</div>
<div style={{fontSize: "10.5px", color: "var(--t2)"}}>
  Container — Apps, APIs, databases, microservices
</div>

</div>
<div style={{background: "var(--white)", borderRadius: "8px", padding: ".8rem", textAlign: "center", border: "1px solid var(--border)"}}>
  <div style={{fontSize: "18px", marginBottom: "4px"}}>
    🔧
  </div>
<div style={{fontSize: "11px", fontWeight: 700, color: "var(--p700)"}}>
  Level 3
</div>
<div style={{fontSize: "10.5px", color: "var(--t2)"}}>
  Component — Major building blocks within a container
</div>

</div>
<div style={{background: "var(--white)", borderRadius: "8px", padding: ".8rem", textAlign: "center", border: "1px solid var(--border)"}}>
  <div style={{fontSize: "18px", marginBottom: "4px"}}>
    📄
  </div>
<div style={{fontSize: "11px", fontWeight: 700, color: "var(--p700)"}}>
  Level 4
</div>
<div style={{fontSize: "10.5px", color: "var(--t2)"}}>
  Code — Classes, functions (UML class diagrams)
</div>

</div>

</div>

</div>

</div>
<div className="card" id="sdlc-patterns">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fdf4ff"}}>
      🏗️
    </div>
  <div>
    <div className="card-title">
      Architectural Patterns — MVC vs MVP vs MVVM
    </div>
  <div className="card-desc">
    Three UI architectural patterns that separate concerns between Model (data), View (UI) and the third component — each with different coupling, testability, and use-case trade-offs.
  </div>

</div>

</div>
<div style={{overflowX: "auto", marginBottom: "1.2rem"}}>
  <table style={{width: "100%", borderCollapse: "collapse", fontSize: "12px"}}>
    <thead>
      <tr style={{background: "var(--bg)"}}>
        <th style={{textAlign: "left", padding: "10px 12px", borderBottom: "2px solid var(--border2)", color: "var(--t2)", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: ".05em"}}>
          Feature
        </th>
      <th style={{textAlign: "left", padding: "10px 12px", borderBottom: "2px solid var(--p400)", color: "var(--p700)", fontWeight: 700}}>
        MVC
      </th>
    <th style={{textAlign: "left", padding: "10px 12px", borderBottom: "2px solid #22c55e", color: "#15803d", fontWeight: 700}}>
      MVP
    </th>
  <th style={{textAlign: "left", padding: "10px 12px", borderBottom: "2px solid #3b82f6", color: "#1d4ed8", fontWeight: 700}}>
    MVVM
  </th>

</tr>

</thead>
<tbody>
  <tr>
    <td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", fontWeight: 600, color: "var(--t1)"}}>
      Mediator
    </td>
  <td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
    Controller
  </td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Presenter
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  ViewModel
</td>

</tr>
<tr style={{background: "var(--bg)"}}>
  <td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", fontWeight: 600, color: "var(--t1)"}}>
    Relationship
  </td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Many-to-One<br/><span style={{fontSize: "10px", color: "var(--t3)"}}>(many views → one controller)</span>
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  One-to-One<br/><span style={{fontSize: "10px", color: "var(--t3)"}}>(one presenter per view)</span>
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  One-to-Many<br/><span style={{fontSize: "10px", color: "var(--t3)"}}>(one VM → many views)</span>
</td>

</tr>
<tr>
  <td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", fontWeight: 600, color: "var(--t1)"}}>
    Data Flow
  </td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Two-way
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  One-way<br/><span style={{fontSize: "10px", color: "var(--t3)"}}>View → Presenter → Model → View</span>
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  One-way<br/><span style={{fontSize: "10px", color: "var(--t3)"}}>View → ViewModel → Model → View</span>
</td>

</tr>
<tr style={{background: "var(--bg)"}}>
  <td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", fontWeight: 600, color: "var(--t1)"}}>
    View Knowledge
  </td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  View knows Model
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  View knows Presenter
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  View knows ViewModel
</td>

</tr>
<tr>
  <td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)", fontWeight: 600, color: "var(--t1)"}}>
    Testability
  </td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)"}}>
  <span style={{background: "#fef2f2", color: "#991b1b", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 600}}>Hard</span>
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)"}}>
  <span style={{background: "#fef9c3", color: "#92400e", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 600}}>Good</span>
</td>
<td style={{padding: "9px 12px", borderBottom: "1px solid var(--border)"}}>
  <span style={{background: "#f0fdf4", color: "#14532d", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 600}}>Best</span>
</td>

</tr>
<tr style={{background: "var(--bg)"}}>
  <td style={{padding: "9px 12px", fontWeight: 600, color: "var(--t1)"}}>
    Primary Use
  </td>
<td style={{padding: "9px 12px", color: "var(--t2)"}}>
  Small apps / simpler logic
</td>
<td style={{padding: "9px 12px", color: "var(--t2)"}}>
  Webforms, older Android
</td>
<td style={{padding: "9px 12px", color: "var(--t2)"}}>
  Modern Android/iOS, React, Angular, Vue
</td>

</tr>

</tbody>

</table>

</div>
<div className="rg-3">
  <div style={{background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "11px", padding: "1.1rem"}}>
    <div style={{fontSize: "13px", fontWeight: 700, color: "var(--p700)", marginBottom: "8px"}}>
      🅼 MVC — Model View Controller
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "6px", fontSize: "11.5px"}}>
    <div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid var(--p500)"}}>
      📦 <strong>Model</strong> — Data, business logic, state
    </div>
  <div style={{textAlign: "center", fontSize: "10px", color: "var(--t3)"}}>
    ↕ bidirectional
  </div>
<div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid #3b82f6"}}>
  🖥 <strong>View</strong> — UI, templates, rendering
</div>
<div style={{textAlign: "center", fontSize: "10px", color: "var(--t3)"}}>
  ↕ user events up, updates down
</div>
<div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid #10b981"}}>
  🎮 <strong>Controller</strong> — Handles input, updates Model
</div>

</div>
<div style={{marginTop: "10px", fontSize: "11px", color: "var(--t2)"}}>
  Used in: Express.js (Node), Ruby on Rails, Spring MVC, Laravel
</div>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "11px", padding: "1.1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#14532d", marginBottom: "8px"}}>
    🅿 MVP — Model View Presenter
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "6px", fontSize: "11.5px"}}>
  <div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid #22c55e"}}>
    📦 <strong>Model</strong> — Data &amp; business logic
  </div>
<div style={{textAlign: "center", fontSize: "10px", color: "var(--t3)"}}>
  ↕ Presenter mediates all
</div>
<div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid #3b82f6"}}>
  🖥 <strong>View</strong> — Passive, delegates to Presenter
</div>
<div style={{textAlign: "center", fontSize: "10px", color: "var(--t3)"}}>
  ↕ strict one presenter per view
</div>
<div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid #22c55e"}}>
  🧩 <strong>Presenter</strong> — Formats data for View
</div>

</div>
<div style={{marginTop: "10px", fontSize: "11px", color: "var(--t2)"}}>
  Used in: Android (classic), WinForms, ASP.NET WebForms
</div>

</div>
<div style={{background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "11px", padding: "1.1rem"}}>
  <div style={{fontSize: "13px", fontWeight: 700, color: "#1e40af", marginBottom: "8px"}}>
    🆅 MVVM — Model View ViewModel
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "6px", fontSize: "11.5px"}}>
  <div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid #3b82f6"}}>
    📦 <strong>Model</strong> — Data &amp; business logic
  </div>
<div style={{textAlign: "center", fontSize: "10px", color: "var(--t3)"}}>
  ↕ data binding (automatic)
</div>
<div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid #8b5cf6"}}>
  🖥 <strong>View</strong> — Binds to ViewModel properties
</div>
<div style={{textAlign: "center", fontSize: "10px", color: "var(--t3)"}}>
  ↕ two-way data binding
</div>
<div style={{background: "var(--white)", borderRadius: "7px", padding: "6px 10px", borderLeft: "3px solid #3b82f6"}}>
  ⚡ <strong>ViewModel</strong> — Exposes observable state
</div>

</div>
<div style={{marginTop: "10px", fontSize: "11px", color: "var(--t2)"}}>
  Used in: Angular, Vue, React+MobX, Kotlin, SwiftUI
</div>

</div>

</div>

</div>
<div className="card" id="sdlc-tdd">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef3c7"}}>
      🧪
    </div>
  <div>
    <div className="card-title">
      TDD vs BDD vs ATDD — Key Differences
    </div>
  <div className="card-desc">
    Three test-driven development approaches — each answering a different question: <em>Does it work?</em> (TDD) · <em>Does it behave correctly?</em> (BDD) · <em>Does it meet acceptance criteria?</em> (ATDD)
  </div>

</div>

</div>
<div className="rg-3" style={{marginBottom: "1.2rem"}}>
  <div style={{background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", overflow: "hidden"}}>
    <div style={{background: "#ef4444", padding: ".8rem 1rem", display: "flex", alignItems: "center", gap: "8px"}}>
      <span style={{fontSize: "18px"}}>🔴</span> <span style={{fontSize: "13px", fontWeight: 700, color: "white"}}>TDD — Test Driven Development</span>
    </div>
  <div style={{padding: "1rem"}}>
    <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.65, marginBottom: "10px"}}>
      <strong style={{color: "var(--t1)"}}>Who writes tests?</strong> Developers. Tests are written in the same language as the code (Jest, JUnit, pytest).
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.65, marginBottom: "10px"}}>
    <strong style={{color: "var(--t1)"}}>Focus:</strong> Individual functions, classes, units of code — does each unit work correctly in isolation?
  </div>
<div style={{fontSize: "12px", fontWeight: 600, color: "#7f1d1d", marginBottom: "6px"}}>
  The Red → Green → Refactor Cycle:
</div>
<div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
  <div style={{background: "#fef2f2", borderLeft: "3px solid #ef4444", borderRadius: "0 6px 6px 0", padding: "6px 10px", fontSize: "11.5px", fontWeight: 600, color: "#991b1b"}}>
    🔴 RED — Write a failing test first
  </div>
<div style={{background: "#f0fdf4", borderLeft: "3px solid #22c55e", borderRadius: "0 6px 6px 0", padding: "6px 10px", fontSize: "11.5px", fontWeight: 600, color: "#14532d"}}>
  🟢 GREEN — Write minimum code to pass
</div>
<div style={{background: "#eff6ff", borderLeft: "3px solid #3b82f6", borderRadius: "0 6px 6px 0", padding: "6px 10px", fontSize: "11.5px", fontWeight: 600, color: "#1e40af"}}>
  🔵 REFACTOR — Clean up, keep tests green
</div>

</div>
<div className="code-block code-comment" style={{fontSize: "10.5px", marginTop: "10px"}} dangerouslySetInnerHTML={{__html: ` <span>// 1. Write failing test</span><br/>it(<span className="code-string">'adds 2 + 2'</span>, () =&gt; {<br/>&nbsp;&nbsp;<span className="code-func">expect</span>(<span className="code-func">add</span>(2,2)).toBe(4); <span className="code-comment">// FAILS</span><br/>});<br/><span className="code-comment">// 2. Implement just enough</span><br/><span className="code-keyword">const</span> add = (a,b) =&gt; a+b; `}}/>
<div style={{marginTop: "8px", fontSize: "11px", color: "var(--t2)"}}>
  ✅ Best for: Unit tests, API logic, algorithms, libraries
</div>

</div>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", overflow: "hidden"}}>
  <div style={{background: "#16a34a", padding: ".8rem 1rem", display: "flex", alignItems: "center", gap: "8px"}}>
    <span style={{fontSize: "18px"}}>🟢</span> <span style={{fontSize: "13px", fontWeight: 700, color: "white"}}>BDD — Behaviour Driven Development</span>
  </div>
<div style={{padding: "1rem"}}>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.65, marginBottom: "10px"}}>
    <strong style={{color: "var(--t1)"}}>Who writes tests?</strong> Developers + QA + Business Analysts, collaboratively. Uses plain English (Gherkin syntax).
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.65, marginBottom: "10px"}}>
  <strong style={{color: "var(--t1)"}}>Focus:</strong> Feature behaviour from the user's perspective — does the system behave as expected in each scenario?
</div>
<div style={{fontSize: "12px", fontWeight: 600, color: "#14532d", marginBottom: "6px"}}>
  Given / When / Then Structure:
</div>
<div className="code-block" style={{fontSize: "10.5px"}} dangerouslySetInnerHTML={{__html: ` Feature: Login<br/><br/>&nbsp;&nbsp;Scenario: Valid credentials<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">Given</span> I am on the login page<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">When</span> I enter valid credentials<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">Then</span> I should see the dashboard<br/><br/>&nbsp;&nbsp;Scenario: Invalid password<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">Given</span> I am on the login page<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">When</span> I enter wrong password<br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">Then</span> I see <span className="code-string">"Invalid credentials"</span> `}}/>
<div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
  <span className="badge badge-green">Cucumber</span><span className="badge badge-green">Jasmine</span><span className="badge badge-green">Behave (Python)</span><span className="badge badge-green">SpecFlow (.NET)</span>
</div>
<div style={{marginTop: "8px", fontSize: "11px", color: "var(--t2)"}}>
  ✅ Best for: Feature specs, integration tests, shared understanding
</div>

</div>

</div>
<div style={{background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", overflow: "hidden"}}>
  <div style={{background: "#1d4ed8", padding: ".8rem 1rem", display: "flex", alignItems: "center", gap: "8px"}}>
    <span style={{fontSize: "18px"}}>🔵</span> <span style={{fontSize: "13px", fontWeight: 700, color: "white"}}>ATDD — Acceptance Test Driven Dev</span>
  </div>
<div style={{padding: "1rem"}}>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.65, marginBottom: "10px"}}>
    <strong style={{color: "var(--t1)"}}>Who writes tests?</strong> The whole team: Business + Dev + QA together, before development starts.
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.65, marginBottom: "10px"}}>
  <strong style={{color: "var(--t1)"}}>Focus:</strong> Meeting the customer's acceptance criteria — does the system satisfy the business requirement end-to-end?
</div>
<div style={{fontSize: "12px", fontWeight: 600, color: "#1e40af", marginBottom: "6px"}}>
  ATDD Process:
</div>
<div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
  <div style={{background: "#eff6ff", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "#1e40af"}}>
    <span style={{fontWeight: 700}}>1.</span> Discuss — Team defines acceptance criteria together
  </div>
<div style={{background: "#eff6ff", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "#1e40af"}}>
  <span style={{fontWeight: 700}}>2.</span> Distil — Convert criteria into automated tests
</div>
<div style={{background: "#eff6ff", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "#1e40af"}}>
  <span style={{fontWeight: 700}}>3.</span> Develop — Write code to make acceptance tests pass
</div>
<div style={{background: "#eff6ff", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", color: "#1e40af"}}>
  <span style={{fontWeight: 700}}>4.</span> Demo — Stakeholder verifies and accepts
</div>

</div>
<div style={{marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "4px"}}>
  <span className="badge badge-blue">FitNesse</span><span className="badge badge-blue">Robot Framework</span><span className="badge badge-blue">Cucumber</span>
</div>
<div style={{marginTop: "8px", fontSize: "11px", color: "var(--t2)"}}>
  ✅ Best for: User story validation, full-system E2E, stakeholder sign-off
</div>

</div>

</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "11px", padding: "1.1rem"}}>
  <div style={{fontSize: "12px", fontWeight: 700, color: "var(--t1)", marginBottom: "10px"}}>
    ⚡ TDD vs BDD vs ATDD — Quick Comparison
  </div>
<div style={{overflowX: "auto"}}>
  <table style={{width: "100%", borderCollapse: "collapse", fontSize: "11.5px"}}>
    <thead>
      <tr style={{background: "var(--white)"}}>
        <th style={{padding: "7px 10px", borderBottom: "1px solid var(--border2)", textAlign: "left", color: "var(--t2)", fontWeight: 600}}>
          Aspect
        </th>
      <th style={{padding: "7px 10px", borderBottom: "1px solid var(--border2)", textAlign: "left", color: "#ef4444", fontWeight: 600}}>
        TDD
      </th>
    <th style={{padding: "7px 10px", borderBottom: "1px solid var(--border2)", textAlign: "left", color: "#16a34a", fontWeight: 600}}>
      BDD
    </th>
  <th style={{padding: "7px 10px", borderBottom: "1px solid var(--border2)", textAlign: "left", color: "#1d4ed8", fontWeight: 600}}>
    ATDD
  </th>

</tr>

</thead>
<tbody>
  <tr>
    <td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", fontWeight: 500}}>
      Written by
    </td>
  <td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
    Developers
  </td>
<td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Dev + QA + BA
</td>
<td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Whole team
</td>

</tr>
<tr style={{background: "var(--white)"}}>
  <td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", fontWeight: 500}}>
    Language
  </td>
<td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Code (JS/Java…)
</td>
<td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Gherkin (natural)
</td>
<td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Natural + automated
</td>

</tr>
<tr>
  <td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", fontWeight: 500}}>
    Scope
  </td>
<td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Unit / function
</td>
<td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Feature / behaviour
</td>
<td style={{padding: "6px 10px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Acceptance / system
</td>

</tr>
<tr style={{background: "var(--white)"}}>
  <td style={{padding: "6px 10px", fontWeight: 500}}>
    Goal
  </td>
<td style={{padding: "6px 10px", color: "var(--t2)"}}>
  Code correctness
</td>
<td style={{padding: "6px 10px", color: "var(--t2)"}}>
  Behaviour clarity
</td>
<td style={{padding: "6px 10px", color: "var(--t2)"}}>
  Business value delivery
</td>

</tr>

</tbody>

</table>

</div>

</div>

</div>
    </>
  );
};

export default memo(SDLCPanel);
