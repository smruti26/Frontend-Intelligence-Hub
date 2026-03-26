/**
 * src/panels/BackendPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * BACKEND section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const BackendPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#166534,#15803d)"}}>
    <div className="hero-tag">
      🖥 Backend
    </div>
  <h1>
    Backend Tech Stack
  </h1>
<p>
  Node.js, Express.js, MongoDB &amp; PostgreSQL — architecture, internals, patterns and best practices for building production-grade server-side applications.
</p>

</div>
<div className="be-tech-grid">
  <div className="be-tech-card active" onClick={(e) => { try { (window as any).beSelect('node', e.currentTarget) } catch(_) {} }} style={{"--be-accent": "#68a063"}}>
    <div className="be-icon" style={{background: "#dcfce7"}}>
      🟢
    </div>
  <div className="be-name">
    Node.js
  </div>
<div className="be-sub">
  Runtime & Event Loop
</div>

</div>
<div className="be-tech-card" onClick={(e) => { try { (window as any).beSelect('express', e.currentTarget) } catch(_) {} }} style={{"--be-accent": "#f59e0b"}}>
  <div className="be-icon" style={{background: "#fef3c7"}}>
    ⚡
  </div>
<div className="be-name">
  Express.js
</div>
<div className="be-sub">
  Middleware & Routing
</div>

</div>
<div className="be-tech-card" onClick={(e) => { try { (window as any).beSelect('mongo', e.currentTarget) } catch(_) {} }} style={{"--be-accent": "#22c55e"}}>
  <div className="be-icon" style={{background: "#dcfce7"}}>
    🍃
  </div>
<div className="be-name">
  MongoDB
</div>
<div className="be-sub">
  Document Database
</div>

</div>
<div className="be-tech-card" onClick={(e) => { try { (window as any).beSelect('postgres', e.currentTarget) } catch(_) {} }} style={{"--be-accent": "#3b82f6"}}>
  <div className="be-icon" style={{background: "#dbeafe"}}>
    🐘
  </div>
<div className="be-name">
  PostgreSQL
</div>
<div className="be-sub">
  Relational Database
</div>

</div>

</div>
<div className="be-section active" id="be-node">
  <div className="card" id="be-node-overview">
    <div className="card-header">
      <div className="card-icon" style={{background: "#dcfce7", fontSize: "20px"}}>
        🟢
      </div>
    <div>
      <div className="card-title">
        Node.js — Non-blocking I/O Runtime
      </div>
    <div className="card-desc">
      V8-powered JavaScript runtime built on an event-driven, non-blocking I/O model — ideal for I/O-heavy, real-time and API-heavy workloads.
    </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-node-eventloop" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).nodeAnim('idle') } catch(_) {} }}>⚪ Idle</button> <button className="cbtn" onClick={() => { try { (window as any).nodeAnim('http') } catch(_) {} }}>🌐 HTTP Request</button> <button className="cbtn" onClick={() => { try { (window as any).nodeAnim('fs') } catch(_) {} }}>📁 File I/O</button> <button className="cbtn" onClick={() => { try { (window as any).nodeAnim('timer') } catch(_) {} }}>⏱ Timer</button> <div className="canvas-tag">
    Node.js Event Loop
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#68a063"}}>
      🔄 Event Loop Phases
    </div>
  <div className="be-flow" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
    <div className="be-flow-step" style={{background: "#dcfce7", borderColor: "#68a063"}}>
      1 · timers (setTimeout/setInterval)
    </div>
  <div className="be-flow-step" style={{background: "#fef9c3", borderColor: "#d97706"}}>
    2 · pending callbacks
  </div>
<div className="be-flow-step" style={{background: "#eff6ff", borderColor: "#3b82f6"}}>
  3 · idle, prepare
</div>
<div className="be-flow-step" style={{background: "#fdf4ff", borderColor: "#a855f7"}}>
  4 · poll (I/O events wait here)
</div>
<div className="be-flow-step" style={{background: "#fef2f2", borderColor: "#ef4444"}}>
  5 · check (setImmediate)
</div>
<div className="be-flow-step" style={{background: "#f0fdf4", borderColor: "#22c55e"}}>
  6 · close callbacks
</div>

</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#68a063"}}>
    ⚡ libuv Thread Pool
  </div>
<p>
  Node's event loop runs on a single thread, but libuv uses a thread pool (default 4 threads) for blocking operations: DNS lookups, file system I/O, crypto, and zlib. Network I/O uses OS async APIs (epoll/kqueue) — no thread needed.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>UV_THREADPOOL_SIZE</span><span className="be-tag" style={{background: "#fef9c3", color: "#92400e"}}>max 128 threads</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#68a063"}}>
    📦 Module System
  </div>
<p>
  <strong>CommonJS (CJS):</strong> synchronous require(), module.exports. Default in Node. <strong>ESM:</strong> static import/export, tree-shakeable. Use .mjs or "type":"module" in package.json. Cannot mix without wrappers.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>ESM</span><span className="be-tag" style={{background: "#fdf4ff", color: "#7e22ce"}}>CJS</span><span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>Worker Threads</span>
</div>

</div>

</div>

</div>
<div className="card" id="be-node-streams">
  <div className="card-header">
    <div className="card-icon" style={{background: "#dcfce7"}}>
      🌊
    </div>
  <div>
    <div className="card-title">
      Streams, Buffers &amp; Worker Threads
    </div>
  <div className="card-desc">
    Process large data without loading it fully into memory. Streams are the backbone of HTTP, file I/O and data pipelines in Node.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-node-streams" data-h="240"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).nodeStreamAnim('pipe') } catch(_) {} }}>🔗 Stream Pipeline</button> <button className="cbtn" onClick={() => { try { (window as any).nodeStreamAnim('backpressure') } catch(_) {} }}>⏸ Backpressure</button> <button className="cbtn" onClick={() => { try { (window as any).nodeStreamAnim('worker') } catch(_) {} }}>⚙ Worker Thread</button> <div className="canvas-tag">
    Streams & Workers
  </div>

</div>

</div>
<div className="be-concept-row" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#3b82f6"}}>
      🌊 Stream Types
    </div>
  <p>
    <strong>Readable</strong> — source of data (fs.createReadStream, HTTP req). <strong>Writable</strong> — destination (fs.createWriteStream, HTTP res). <strong>Duplex</strong> — both (TCP socket). <strong>Transform</strong> — modify in transit (zlib, crypto). Chain with .pipe() or stream.pipeline() (handles errors automatically).
  </p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#a855f7"}}>
    ⚙ Worker Threads
  </div>
<p>
  For CPU-intensive work (image processing, heavy computation) that would block the event loop. Workers run in isolated V8 contexts with their own event loop. Communicate via postMessage / SharedArrayBuffer. Don't use for I/O — that's already async. Pool workers with piscina for production.
</p>

</div>

</div>

</div>
<div className="card" id="be-node-perf">
  <div className="card-header">
    <div className="card-icon" style={{background: "#dcfce7"}}>
      🚀
    </div>
  <div>
    <div className="card-title">
      Clustering, PM2 &amp; Performance
    </div>
  <div className="card-desc">
    Node is single-threaded — to utilise all CPU cores you must cluster. PM2 manages processes in production.
  </div>

</div>

</div>
<div className="be-concept-row triple">
  <div className="be-box">
    <div className="be-box-title" style={{color: "#68a063"}}>
      🔀 Cluster Module
    </div>
  <p>
    cluster.fork() spawns one worker per CPU core. Master distributes connections using round-robin (Linux) or OS-handled (Windows). Workers share the same port. If a worker crashes, master restarts it.
  </p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>os.cpus().length</span><span className="be-tag" style={{background: "#fef9c3", color: "#92400e"}}>IPC messaging</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#22c55e"}}>
    🛠 PM2 Process Manager
  </div>
<p>
  pm2 start app.js --instances max starts a cluster automatically. Provides zero-downtime reloads (pm2 reload), log aggregation, CPU/memory monitoring, auto-restart on crash, and startup scripts.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>pm2 reload</span><span className="be-tag" style={{background: "#fef9c3", color: "#92400e"}}>ecosystem.config.js</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#3b82f6"}}>
    📊 Profiling Node
  </div>
<p>
  Built-in: --prof flag generates V8 profiler output. node --inspect for Chrome DevTools debugging. clinic.js (flame, bubbleprof, heapProfiler) for production profiling. Track: event loop lag (toobusy-js), heap usage (process.memoryUsage), GC pauses.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>clinic.js</span><span className="be-tag" style={{background: "#fdf4ff", color: "#7e22ce"}}>--prof</span>
</div>

</div>

</div>

</div>

</div>
<div className="be-section" id="be-express">
  <div className="card" id="be-express-overview">
    <div className="card-header">
      <div className="card-icon" style={{background: "#fef3c7"}}>
        ⚡
      </div>
    <div>
      <div className="card-title">
        Express.js — Middleware Architecture
      </div>
    <div className="card-desc">
      Minimalist, unopinionated web framework. Everything in Express flows through a middleware chain — understanding this is the key to mastering it.
    </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-express-mw" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).expressAnim('req') } catch(_) {} }}>📥 Request Flow</button> <button className="cbtn" onClick={() => { try { (window as any).expressAnim('error') } catch(_) {} }}>❌ Error Flow</button> <button className="cbtn" onClick={() => { try { (window as any).expressAnim('router') } catch(_) {} }}>🗺 Router</button> <div className="canvas-tag">
    Express Middleware Pipeline
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#d97706"}}>
      🔗 Middleware Chain
    </div>
  <p>
    Each middleware receives (req, res, next). Call next() to pass to the next handler, next(err) to jump to error handler. Order matters — middleware runs top-to-bottom in registration order. Application-level vs router-level vs built-in vs third-party.
  </p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#d97706"}}>
    🗺 Router
  </div>
<p>
  express.Router() creates a mini-application with its own middleware stack. Enables feature-based routing: userRouter.js, productRouter.js mounted at /api/users, /api/products. Use router.param() for id validation reuse across routes.
</p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#d97706"}}>
    ⚠ Error Handling
  </div>
<p>
  Error middleware has 4 args: (err, req, res, next). Must be registered LAST. Use a centralised error class hierarchy. async route handlers need try/catch or express-async-errors wrapper to propagate to error middleware.
</p>

</div>

</div>

</div>
<div className="card" id="be-express-patterns">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef3c7"}}>
      🏗
    </div>
  <div>
    <div className="card-title">
      Architecture Patterns &amp; Best Practices
    </div>
  <div className="card-desc">
    Structuring Express apps for maintainability at scale — layered architecture, validation, auth, and security hardening.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-express-arch" data-h="240"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).expressArchAnim('layers') } catch(_) {} }}>📐 Layers</button> <button className="cbtn" onClick={() => { try { (window as any).expressArchAnim('auth') } catch(_) {} }}>🔐 Auth Flow</button> <button className="cbtn" onClick={() => { try { (window as any).expressArchAnim('validate') } catch(_) {} }}>✅ Validation</button> <div className="canvas-tag">
    Express Architecture
  </div>

</div>

</div>
<div className="be-concept-row" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#f59e0b"}}>
      📐 3-Layer Architecture
    </div>
  <div className="be-flow">
    <div className="be-flow-step" style={{background: "#fef3c7", borderColor: "#d97706"}}>
      Route Handler
    </div>
  <div className="be-flow-arrow">
    →
  </div>
<div className="be-flow-step" style={{background: "#dcfce7", borderColor: "#22c55e"}}>
  Service Layer
</div>
<div className="be-flow-arrow">
  →
</div>
<div className="be-flow-step" style={{background: "#eff6ff", borderColor: "#3b82f6"}}>
  Data Access Layer
</div>

</div>
<p style={{marginTop: "8px"}}>
  Routes handle HTTP concerns only (parse req, call service, send res). Services contain business logic — pure functions, easily testable. DAL abstracts DB queries. Never put DB queries in route handlers.
</p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#f59e0b"}}>
    🔒 Security Hardening
  </div>
<p>
  <strong>helmet</strong> — sets 11 security headers (CSP, HSTS, X-Frame-Options). <strong>rate-limiter-flexible</strong> — per-IP request throttling (vs express-rate-limit for simpler cases). <strong>cors</strong> — whitelist origins. <strong>express-validator / zod</strong> — validate & sanitise all input. <strong>hpp</strong> — prevent HTTP parameter pollution.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#fef2f2", color: "#b91c1c"}}>helmet</span><span className="be-tag" style={{background: "#fef9c3", color: "#92400e"}}>rate-limit</span><span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>zod</span>
</div>

</div>

</div>

</div>

</div>
<div className="be-section" id="be-mongo">
  <div className="card" id="be-mongo-overview">
    <div className="card-header">
      <div className="card-icon" style={{background: "#dcfce7"}}>
        🍃
      </div>
    <div>
      <div className="card-title">
        MongoDB — Document Model &amp; Architecture
      </div>
    <div className="card-desc">
      Flexible document database storing BSON data. Schema-less by design, but best practice is to enforce schemas via Mongoose or JSON Schema validation.
    </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-mongo-arch" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).mongoAnim('crud') } catch(_) {} }}>📝 CRUD Flow</button> <button className="cbtn" onClick={() => { try { (window as any).mongoAnim('aggregate') } catch(_) {} }}>🔗 Aggregation</button> <button className="cbtn" onClick={() => { try { (window as any).mongoAnim('replica') } catch(_) {} }}>🔄 Replica Set</button> <button className="cbtn" onClick={() => { try { (window as any).mongoAnim('index') } catch(_) {} }}>🔍 Index Lookup</button> <div className="canvas-tag">
    MongoDB Architecture
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#16a34a"}}>
      📄 Data Modelling
    </div>
  <p>
    <strong>Embed</strong> related data when it's accessed together and doesn't exceed 16MB. <strong>Reference</strong> (normalise) when data is large, frequently updated independently, or shared across documents. Rule of thumb: embed for one-to-few, reference for one-to-many/many-to-many.
  </p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>Embed</span><span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>$ref</span><span className="be-tag" style={{background: "#fdf4ff", color: "#7e22ce"}}>Mongoose</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#16a34a"}}>
    🔍 Indexing Strategy
  </div>
<p>
  <strong>Single field</strong> for equality queries. <strong>Compound index</strong> for multi-field queries (follow ESR rule: Equality, Sort, Range). <strong>Text index</strong> for full-text search. <strong>TTL index</strong> auto-deletes documents after expiry. Use .explain("executionStats") to verify index usage.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>explain()</span><span className="be-tag" style={{background: "#fef9c3", color: "#92400e"}}>ESR Rule</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#16a34a"}}>
    🔄 Replica Sets &amp; Sharding
  </div>
<p>
  <strong>Replica Set</strong>: 1 primary + N secondaries. Writes go to primary, replicated to secondaries. Automatic failover (primary election in ~10s). <strong>Sharding</strong>: horizontal scaling — data split across shards by shard key. Choose shard key carefully to avoid hot spots.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>Replica Set</span><span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>Sharding</span>
</div>

</div>

</div>

</div>
<div className="card" id="be-mongo-aggregation">
  <div className="card-header">
    <div className="card-icon" style={{background: "#dcfce7"}}>
      🔗
    </div>
  <div>
    <div className="card-title">
      Aggregation Pipeline &amp; Mongoose
    </div>
  <div className="card-desc">
    MongoDB's aggregation framework transforms and analyses data through a pipeline of stages — the equivalent of SQL GROUP BY, JOIN, and subqueries.
  </div>

</div>

</div>
<div className="be-concept-row">
  <div className="be-box">
    <div className="be-box-title" style={{color: "#22c55e"}}>
      🔗 Aggregation Stages
    </div>
  <div className="be-flow" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
    <div className="be-flow-step" style={{background: "#dcfce7", borderColor: "#22c55e"}}>
      <strong>$match</strong> — filter documents (use early, leverages indexes)
    </div>
  <div className="be-flow-step" style={{background: "#eff6ff", borderColor: "#3b82f6"}}>
    <strong>$lookup</strong> — left outer join another collection
  </div>
<div className="be-flow-step" style={{background: "#fdf4ff", borderColor: "#a855f7"}}>
  <strong>$group</strong> — group by field, compute $sum/$avg/$count
</div>
<div className="be-flow-step" style={{background: "#fef9c3", borderColor: "#d97706"}}>
  <strong>$project</strong> — include/exclude/reshape fields
</div>
<div className="be-flow-step" style={{background: "#fef2f2", borderColor: "#ef4444"}}>
  <strong>$sort / $limit / $skip</strong> — pagination
</div>
<div className="be-flow-step" style={{background: "#f0fdf4", borderColor: "#10b981"}}>
  <strong>$unwind</strong> — flatten array fields
</div>

</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#22c55e"}}>
    🛠 Mongoose Patterns
  </div>
<p>
  Define schemas with types, validators, defaults, and virtuals. Middleware (pre/post hooks) on save, validate, remove. Populate for reference resolution. Lean queries (.lean()) for read-only — returns plain objects, 2–5× faster than full Mongoose documents.
</p>
<div className="be-concept-row full" style={{marginTop: "8px"}}>
  <div className="be-box" style={{padding: "0.7rem"}}>
    <div style={{fontSize: "11.5px", fontWeight: 600, marginBottom: "4px", color: "#22c55e"}}>
      Transactions (v4.0+)
    </div>
  <p>
    Use sessions for multi-document ACID transactions. session.startTransaction() → operations → session.commitTransaction(). Requires replica set. Adds latency — use only when truly needed for data consistency.
  </p>

</div>

</div>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>.lean()</span><span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>populate()</span><span className="be-tag" style={{background: "#fef9c3", color: "#92400e"}}>sessions</span>
</div>

</div>

</div>

</div>

</div>
<div className="be-section" id="be-postgres">
  <div className="card" id="be-pg-overview">
    <div className="card-header">
      <div className="card-icon" style={{background: "#dbeafe"}}>
        🐘
      </div>
    <div>
      <div className="card-title">
        PostgreSQL — Relational Power
      </div>
    <div className="card-desc">
      The world's most advanced open-source relational database. ACID compliant, supports JSON, full-text search, window functions, CTEs and geospatial queries.
    </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-pg-arch" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).pgAnim('query') } catch(_) {} }}>🔍 Query Lifecycle</button> <button className="cbtn" onClick={() => { try { (window as any).pgAnim('index') } catch(_) {} }}>📊 Index Types</button> <button className="cbtn" onClick={() => { try { (window as any).pgAnim('txn') } catch(_) {} }}>🔐 Transactions</button> <button className="cbtn" onClick={() => { try { (window as any).pgAnim('pool') } catch(_) {} }}>🏊 Connection Pool</button> <div className="canvas-tag">
    PostgreSQL Architecture
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#2563eb"}}>
      🔍 Query Planner
    </div>
  <p>
    EXPLAIN ANALYZE reveals the execution plan. Key terms: Seq Scan (full table, no index), Index Scan (b-tree lookup), Index Only Scan (covers all columns needed). Cost = startup + per-row. Use VACUUM ANALYZE to keep statistics fresh for planner accuracy.
  </p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>EXPLAIN ANALYZE</span><span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>VACUUM</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#2563eb"}}>
    📊 Index Types
  </div>
<p>
  <strong>B-Tree</strong> (default) — equality and range queries, ORDER BY. <strong>GIN</strong> — full-text search, JSONB, arrays (&#64;&#62; operator). <strong>GiST</strong> — geometric, network types, proximity. <strong>BRIN</strong> — very large tables with natural ordering (timestamps). Partial indexes for sparse filtered queries.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>B-Tree</span><span className="be-tag" style={{background: "#fdf4ff", color: "#7e22ce"}}>GIN</span><span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>BRIN</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#2563eb"}}>
    🔐 ACID &amp; MVCC
  </div>
<p>
  <strong>MVCC</strong> (Multi-Version Concurrency Control): readers never block writers. Each transaction sees a snapshot. Isolation levels: Read Committed (default), Repeatable Read, Serializable. Use FOR UPDATE for pessimistic locking; optimistic locking via version columns.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>MVCC</span><span className="be-tag" style={{background: "#fef2f2", color: "#b91c1c"}}>FOR UPDATE</span>
</div>

</div>

</div>

</div>
<div className="card" id="be-pg-advanced">
  <div className="card-header">
    <div className="card-icon" style={{background: "#dbeafe"}}>
      🚀
    </div>
  <div>
    <div className="card-title">
      Advanced Features &amp; Node.js Integration
    </div>
  <div className="card-desc">
    Window functions, CTEs, JSONB, partitioning, and connecting from Node with pg/Prisma/Drizzle.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-pg-node" data-h="240"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).pgNodeAnim('pool') } catch(_) {} }}>🏊 Connection Pooling</button> <button className="cbtn" onClick={() => { try { (window as any).pgNodeAnim('orm') } catch(_) {} }}>🛠 ORM vs Query Builder</button> <button className="cbtn" onClick={() => { try { (window as any).pgNodeAnim('migration') } catch(_) {} }}>📦 Migrations</button> <div className="canvas-tag">
    Node.js ↔ PostgreSQL
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#3b82f6"}}>
      🪟 Window Functions
    </div>
  <p>
    Compute over a set of rows related to current row without collapsing them. ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary) ranks within groups. LEAD/LAG access adjacent rows. Running totals: SUM(sales) OVER(ORDER BY date ROWS UNBOUNDED PRECEDING).
  </p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#3b82f6"}}>
    🧱 Partitioning
  </div>
<p>
  Range partitioning: split large tables by date (logs, events). List partitioning: by region/category. Hash partitioning: distribute evenly. Child tables inherit schema and constraints. Partition pruning: queries only scan relevant partitions. Dramatically improves performance on huge tables.
</p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#3b82f6"}}>
    🔌 Node.js Clients
  </div>
<p>
  <strong>pg</strong> (node-postgres): low-level, full control. Pool with pg.Pool — default max 10 connections. <strong>Prisma</strong>: type-safe ORM, migrations, schema-first. <strong>Drizzle</strong>: SQL-like syntax, fastest growing, zero-runtime overhead. <strong>Knex</strong>: query builder, good for complex dynamic queries.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>pg</span><span className="be-tag" style={{background: "#fdf4ff", color: "#7e22ce"}}>Prisma</span><span className="be-tag" style={{background: "#dcfce7", color: "#166534"}}>Drizzle</span>
</div>

</div>

</div>

</div>

</div>
<div className="card" id="be-stack-integration">
  <div className="card-header">
    <div className="card-icon" style={{background: "#f0fdf4"}}>
      🔗
    </div>
  <div>
    <div className="card-title">
      Full Stack Integration — Node + Express + DB
    </div>
  <div className="card-desc">
    How all four technologies connect in a production architecture — from HTTP request to database response.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-be-stack" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).beStackAnim('request') } catch(_) {} }}>📥 Full Request Cycle</button> <button className="cbtn" onClick={() => { try { (window as any).beStackAnim('microservice') } catch(_) {} }}>🔧 Microservices</button> <button className="cbtn" onClick={() => { try { (window as any).beStackAnim('caching') } catch(_) {} }}>⚡ Caching Layer</button> <div className="canvas-tag">
    Production Stack
  </div>

</div>

</div>

</div>
    </>
  );
};

export default memo(BackendPanel);
