/**
 * src/panels/GraphQLPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * GRAPHQL section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const GraphQLPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#e11d48,#9333ea)"}}>
    <div className="hero-tag">
      ⬡ GraphQL
    </div>
  <h1>
    React + GraphQL
  </h1>
<p>
  Explore how Apollo Client connects your React app to a GraphQL API — with caching, queries, mutations, and subscriptions.
</p>

</div>
<div className="card" id="gql-apollo">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fce7f3"}}>
      🚀
    </div>
  <div>
    <div className="card-title">
      Apollo Client Architecture
    </div>
  <div className="card-desc">
    Apollo Client sits between your React components and the GraphQL server, handling caching, queries, and mutations automatically.
  </div>

</div>

</div>
<div className="rg-2">
  <div className="flow-diagram">
    <div className="flow-title">
      Request Lifecycle
    </div>
  <div className="flow-steps">
    <div style={{display: "flex"}}>
      <div className="flow-node node-purple">
        ⚛ React Component
      </div>

  </div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-pink">
    🚀 Apollo Client
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-blue">
    🔵 In-Memory Cache?
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-orange">
    📡 Network Request
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-teal">
    ⬡ GraphQL Server
  </div>

</div>
<div className="flow-arrow">

</div>
<div style={{display: "flex"}}>
  <div className="flow-node node-green">
    🗄 Database
  </div>

</div>

</div>

</div>
<div>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
    Apollo Client Layers
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
  <div style={{background: "var(--p50)", border: "1px solid var(--p200)", borderRadius: "10px", padding: "12px", borderLeft: "4px solid var(--p500)"}}>
    <div style={{fontSize: "12px", fontWeight: 600, color: "var(--p700)"}}>
      🔍 Query Layer
    </div>
  <div style={{fontSize: "11px", color: "var(--t2)", marginTop: "3px"}}>
    useQuery, useLazyQuery — fetch &amp; watch data
  </div>

</div>
<div style={{background: "#fdf2f8", border: "1px solid #f9a8d4", borderRadius: "10px", padding: "12px", borderLeft: "4px solid #ec4899"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "#831843"}}>
    ✏ Mutation Layer
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", marginTop: "3px"}}>
  useMutation — create, update, delete data
</div>

</div>
<div style={{background: "var(--b50)", border: "1px solid var(--b100)", borderRadius: "10px", padding: "12px", borderLeft: "4px solid var(--b500)"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--b700)"}}>
    ⚡ Subscription Layer
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", marginTop: "3px"}}>
  useSubscription — real-time via WebSocket
</div>

</div>
<div style={{background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "12px", borderLeft: "4px solid #10b981"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "#065f46"}}>
    🧠 Cache Layer
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", marginTop: "3px"}}>
  Normalized cache — avoids duplicate fetches
</div>

</div>

</div>

</div>

</div>
<div className="divider">

</div>
<div className="code-block code-comment" dangerouslySetInnerHTML={{__html: ` <span>// Query Example with Apollo</span><br/><span className="code-keyword">const</span> GET_USER = <span className="code-func">gql</span><span className="code-string">\`query GetUser($id: ID!) { user(id: $id) { name, email } }\`</span>;<br/><span className="code-keyword">const</span> { loading, error, data } = <span className="code-func">useQuery</span>(GET_USER, { variables: { id: <span className="code-string">'123'</span> } }); `}}/>

</div>
<div className="card" id="gql-concepts">
  <div className="card-title" style={{marginBottom: "1rem"}}>
    GraphQL Core Concepts
  </div>
<div className="concept-grid">
  <div className="concept-chip" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
    <div style={{fontSize: "18px"}}>
      🔍
    </div>
  <div style={{fontSize: "13px", fontWeight: 600}}>
    Query
  </div>
<div style={{fontSize: "11px", color: "var(--t3)", lineHeight: 1.4}}>
  Fetch exactly the data you need
</div>

</div>
<div className="concept-chip" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
  <div style={{fontSize: "18px"}}>
    ✏
  </div>
<div style={{fontSize: "13px", fontWeight: 600}}>
  Mutation
</div>
<div style={{fontSize: "11px", color: "var(--t3)", lineHeight: 1.4}}>
  Create, update, delete data
</div>

</div>
<div className="concept-chip" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
  <div style={{fontSize: "18px"}}>
    ⚡
  </div>
<div style={{fontSize: "13px", fontWeight: 600}}>
  Subscription
</div>
<div style={{fontSize: "11px", color: "var(--t3)", lineHeight: 1.4}}>
  Real-time updates via WebSocket
</div>

</div>
<div className="concept-chip" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
  <div style={{fontSize: "18px"}}>
    📐
  </div>
<div style={{fontSize: "13px", fontWeight: 600}}>
  Schema
</div>
<div style={{fontSize: "11px", color: "var(--t3)", lineHeight: 1.4}}>
  Type-safe contract between client &amp; server
</div>

</div>
<div className="concept-chip" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
  <div style={{fontSize: "18px"}}>
    🔧
  </div>
<div style={{fontSize: "13px", fontWeight: 600}}>
  Resolver
</div>
<div style={{fontSize: "11px", color: "var(--t3)", lineHeight: 1.4}}>
  Server function that returns field data
</div>

</div>

</div>

</div>
<div className="card" id="gql-anim">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fce7f3"}}>
      🎬
    </div>
  <div>
    <div className="card-title">
      GraphQL — Animated Query Flow
    </div>
  <div className="card-desc">
    Watch how a GraphQL query travels from React component through Apollo Client, hits or misses the cache, fetches from the server, and populates the normalized store.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-graphql" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).gqlAnim('query') } catch(_) {} }}>🔍 Query</button> <button className="cbtn" onClick={() => { try { (window as any).gqlAnim('cache') } catch(_) {} }}>⚡ Cache Hit</button> <button className="cbtn" onClick={() => { try { (window as any).gqlAnim('mutation') } catch(_) {} }}>✏ Mutation</button> <button className="cbtn" onClick={() => { try { (window as any).gqlAnim('sub') } catch(_) {} }}>📡 Subscription</button> <div className="anim-legend">
    <div className="aleg">
      <div className="aleg-dot" style={{background: "#E535AB"}}>

      </div>
    GraphQL
  </div>
<div className="aleg">
  <div className="aleg-dot" style={{background: "#8b7ae8"}}>

  </div>
Apollo
</div>
<div className="aleg">
  <div className="aleg-dot" style={{background: "#34d399"}}>

  </div>
Cache
</div>
<div className="aleg">
  <div className="aleg-dot" style={{background: "#f59e0b"}}>

  </div>
Network
</div>

</div>
<div className="canvas-tag">
  Apollo Client
</div>

</div>

</div>

</div>
    </>
  );
};

export default memo(GraphQLPanel);
