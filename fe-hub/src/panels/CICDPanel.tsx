/**
 * src/panels/CICDPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * CICD section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const CICDPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#0c4a6e,#0369a1)"}}>
    <div className="hero-tag">
      🚀 Deploy
    </div>
  <h1>
    CI/CD &amp; Deployment Ecosystem
  </h1>
<p>
  Docker, Kubernetes, Kafka &amp; Vercel — containerisation, orchestration, event streaming and modern deployment pipelines explained visually.
</p>

</div>
<div className='be-tech-grid'>
  <div className="be-tech-card active" onClick={(e) => { try { (window as any).cdSelect('docker', e.currentTarget) } catch(_) {} }} style={{"--be-accent": "#2496ed"}}>
    <div className="be-icon" style={{background: "#dbeafe"}}>
      🐳
    </div>
  <div className="be-name">
    Docker
  </div>
<div className="be-sub">
  Containers &amp; Images
</div>

</div>
<div className="be-tech-card" onClick={(e) => { try { (window as any).cdSelect('k8s', e.currentTarget) } catch(_) {} }} style={{"--be-accent": "#326ce5"}}>
  <div className="be-icon" style={{background: "#eff6ff"}}>
    ☸️
  </div>
<div className="be-name">
  Kubernetes
</div>
<div className="be-sub">
  Orchestration
</div>

</div>
<div className="be-tech-card" onClick={(e) => { try { (window as any).cdSelect('kafka', e.currentTarget) } catch(_) {} }} style={{"--be-accent": "#e34c2e"}}>
  <div className="be-icon" style={{background: "#fef2f2"}}>
    📨
  </div>
<div className="be-name">
  Kafka
</div>
<div className="be-sub">
  Event Streaming
</div>

</div>
<div className="be-tech-card" onClick={(e) => { try { (window as any).cdSelect('vercel', e.currentTarget) } catch(_) {} }} style={{"--be-accent": "#000000"}}>
  <div className="be-icon" style={{background: "#f8fafc"}}>
    ▲
  </div>
<div className="be-name">
  Vercel
</div>
<div className="be-sub">
  Edge Deployment
</div>

</div>

</div>
<div className="cd-section active" id="cd-docker">
  <div className="card" id="cicd-docker">
    <div className="card-header">
      <div className="card-icon" style={{background: "#dbeafe", fontSize: "20px"}}>
        🐳
      </div>
    <div>
      <div className="card-title">
        Docker — Containers &amp; Images
      </div>
    <div className="card-desc">
      Docker packages an application and its dependencies into a lightweight, portable container that runs identically on any machine — dev, staging, or production.
    </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-docker" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).dockerAnim('build') } catch(_) {} }}>🏗 Image Build</button> <button className="cbtn" onClick={() => { try { (window as any).dockerAnim('run') } catch(_) {} }}>▶ Container Run</button> <button className="cbtn" onClick={() => { try { (window as any).dockerAnim('compose') } catch(_) {} }}>🔗 Compose Stack</button> <div className="canvas-tag">
    Docker Architecture
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#2496ed"}}>
      📦 Image Layers
    </div>
  <p>
    Images are built in read-only layers stacked on a base image. Each Dockerfile instruction (RUN, COPY, ADD) creates a new layer. Layers are cached — if a layer hasn't changed, Docker reuses it, making rebuilds fast. Only changed layers are pushed/pulled from a registry.
  </p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>Union FS</span><span className="be-tag" style={{background: "#f0fdf4", color: "#166534"}}>Layer Cache</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#2496ed"}}>
    ⚙ Dockerfile Best Practices
  </div>
<p>
  Use multi-stage builds to keep final images small. Put rarely-changing layers first (base OS, dependencies) and frequently-changing layers last (app code) to maximise cache hits. Use <strong>.dockerignore</strong> to exclude node_modules. Prefer <strong>COPY</strong> over ADD. Run as non-root user.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>Multi-stage</span><span className="be-tag" style={{background: "#fef9c3", color: "#92400e"}}>.dockerignore</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#2496ed"}}>
    🔗 Docker Compose
  </div>
<p>
  Defines multi-container applications in a single <strong>docker-compose.yml</strong>. Services, networks, volumes, and environment variables declared declaratively. <code>docker compose up -d</code> starts the whole stack. Ideal for local dev — mirrors production topology with one command.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>compose up</span><span className="be-tag" style={{background: "#f0fdf4", color: "#166534"}}>healthcheck</span>
</div>

</div>

</div>

</div>
<div className="card">
  <div className="card-header">
    <div className="card-icon" style={{background: "#dbeafe"}}>
      🌐
    </div>
  <div>
    <div className="card-title">
      Networking, Volumes &amp; Registry
    </div>
  <div className="card-desc">
    Containers are isolated by default — networking and volumes connect them to each other and to persistent storage.
  </div>

</div>

</div>
<div className="be-concept-row triple">
  <div className="be-box">
    <div className="be-box-title" style={{color: "#0ea5e9"}}>
      🌐 Container Networking
    </div>
  <p>
    <strong>bridge</strong> (default): containers on the same bridge can reach each other by name. <strong>host</strong>: container shares host network stack (no isolation). <strong>overlay</strong>: multi-host networking for Swarm/K8s. In Compose, each service is DNS-resolvable by its service name — <code>postgres:5432</code> just works.
  </p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#0ea5e9"}}>
    💾 Volumes &amp; Bind Mounts
  </div>
<p>
  <strong>Named volumes</strong> managed by Docker, survive container removal, ideal for databases. <strong>Bind mounts</strong> map a host path into the container — great for dev hot-reload. <strong>tmpfs</strong> mounts stay in memory only. Always use volumes for stateful services in production.
</p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#0ea5e9"}}>
    🏛 Registry &amp; CI Integration
  </div>
<p>
  Push built images to Docker Hub, GitHub Container Registry (ghcr.io), or AWS ECR. Tag with semantic versions and <code>latest</code>. In CI: <strong>docker build → docker push → deploy</strong>. Use image digest pinning in production to prevent supply-chain attacks via mutable tags.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>ghcr.io</span><span className="be-tag" style={{background: "#fef2f2", color: "#b91c1c"}}>ECR</span><span className="be-tag" style={{background: "#f0fdf4", color: "#166534"}}>digest pin</span>
</div>

</div>

</div>

</div>

</div>
<div className="cd-section" id="cd-k8s">
  <div className="card" id="cicd-k8s">
    <div className="card-header">
      <div className="card-icon" style={{background: "#eff6ff", fontSize: "20px"}}>
        ☸️
      </div>
    <div>
      <div className="card-title">
        Kubernetes — Container Orchestration
      </div>
    <div className="card-desc">
      Kubernetes automates deployment, scaling, and management of containerised applications across clusters of machines.
    </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-k8s" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).k8sAnim('cluster') } catch(_) {} }}>☸ Cluster View</button> <button className="cbtn" onClick={() => { try { (window as any).k8sAnim('deploy') } catch(_) {} }}>🚀 Rolling Deploy</button> <button className="cbtn" onClick={() => { try { (window as any).k8sAnim('scale') } catch(_) {} }}>📈 Auto-Scale</button> <div className="canvas-tag">
    Kubernetes Architecture
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#326ce5"}}>
      🏗 Core Objects
    </div>
  <div className="be-flow" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
    <div className="be-flow-step" style={{background: "#eff6ff", borderColor: "#326ce5"}}>
      <strong>Pod</strong> — smallest unit, 1+ containers, shared network/storage
    </div>
  <div className="be-flow-step" style={{background: "#f0fdf4", borderColor: "#22c55e"}}>
    <strong>Deployment</strong> — desired state, rolling updates, rollbacks
  </div>
<div className="be-flow-step" style={{background: "#fef9c3", borderColor: "#d97706"}}>
  <strong>Service</strong> — stable DNS + load-balance across pod IPs
</div>
<div className="be-flow-step" style={{background: "#fdf4ff", borderColor: "#a855f7"}}>
  <strong>Ingress</strong> — HTTP routing rules, TLS termination
</div>
<div className="be-flow-step" style={{background: "#fef2f2", borderColor: "#ef4444"}}>
  <strong>ConfigMap / Secret</strong> — externalised config &amp; credentials
</div>

</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#326ce5"}}>
    🧠 Control Plane
  </div>
<p>
  <strong>API Server</strong>: single entry point for all kubectl/operator commands. <strong>etcd</strong>: distributed key-value store — source of truth for all cluster state. <strong>Scheduler</strong>: assigns pods to nodes based on resource requests. <strong>Controller Manager</strong>: reconciliation loops that drive actual state → desired state.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#eff6ff", color: "#1d4ed8"}}>etcd</span><span className="be-tag" style={{background: "#f0fdf4", color: "#166534"}}>kubectl</span><span className="be-tag" style={{background: "#fdf4ff", color: "#7e22ce"}}>Helm</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#326ce5"}}>
    📈 Scaling &amp; Self-Healing
  </div>
<p>
  <strong>HPA</strong> (Horizontal Pod Autoscaler): scales replica count based on CPU/memory or custom metrics. <strong>VPA</strong>: adjusts resource requests per pod. <strong>Liveness probe</strong>: restarts unhealthy containers. <strong>Readiness probe</strong>: removes pod from Service until it's ready. <strong>PodDisruptionBudget</strong>: ensures minimum availability during updates.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>HPA</span><span className="be-tag" style={{background: "#fef2f2", color: "#b91c1c"}}>Probes</span><span className="be-tag" style={{background: "#f0fdf4", color: "#166534"}}>PDB</span>
</div>

</div>

</div>

</div>

</div>
<div className="cd-section" id="cd-kafka">
  <div className="card" id="cicd-kafka">
    <div className="card-header">
      <div className="card-icon" style={{background: "#fef2f2", fontSize: "20px"}}>
        📨
      </div>
    <div>
      <div className="card-title">
        Apache Kafka — Distributed Event Streaming
      </div>
    <div className="card-desc">
      Kafka is a high-throughput, fault-tolerant distributed log. Producers publish events to topics; consumers read them independently at their own pace — enabling decoupled, real-time data pipelines.
    </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-kafka" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).kafkaAnim('flow') } catch(_) {} }}>📨 Produce &amp; Consume</button> <button className="cbtn" onClick={() => { try { (window as any).kafkaAnim('partition') } catch(_) {} }}>🗂 Partitions</button> <button className="cbtn" onClick={() => { try { (window as any).kafkaAnim('group') } catch(_) {} }}>👥 Consumer Group</button> <div className="canvas-tag">
    Kafka Architecture
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#e34c2e"}}>
      📦 Topics &amp; Partitions
    </div>
  <p>
    A <strong>topic</strong> is a named log. Topics are split into <strong>partitions</strong> — each an ordered, immutable sequence of records. Partitions enable parallelism: more partitions = more consumers. A <strong>partition key</strong> routes related events to the same partition, preserving order for a given entity (e.g. all events for user-id X).
  </p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#fef2f2", color: "#b91c1c"}}>retention</span><span className="be-tag" style={{background: "#fef9c3", color: "#92400e"}}>compaction</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#e34c2e"}}>
    🔁 Consumer Groups
  </div>
<p>
  A <strong>consumer group</strong> is a set of consumers that collectively read a topic. Each partition is assigned to exactly one consumer in the group — enabling parallel processing. If a consumer fails, Kafka <strong>rebalances</strong> partitions across remaining members. Different groups can read the same topic independently (fan-out pattern).
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#fef2f2", color: "#b91c1c"}}>group-id</span><span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>offset commit</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#e34c2e"}}>
    🛡 Durability &amp; Replication
  </div>
<p>
  Each partition has a configurable <strong>replication factor</strong> (typically 3). One broker is the <strong>leader</strong>; others are followers. Producers write to the leader; followers replicate. <strong>acks=all</strong> ensures writes are durable across all in-sync replicas. <strong>Zookeeper</strong> (or KRaft in modern Kafka) manages broker metadata and leader election.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#f0fdf4", color: "#166534"}}>acks=all</span><span className="be-tag" style={{background: "#fdf4ff", color: "#7e22ce"}}>KRaft</span>
</div>

</div>

</div>

</div>
<div className="card">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef2f2"}}>
      🔄
    </div>
  <div>
    <div className="card-title">
      Kafka Streams, Connect &amp; Use Cases
    </div>
  <div className="card-desc">
    The Kafka ecosystem extends beyond pub/sub into real-time stream processing and data integration.
  </div>

</div>

</div>
<div className="be-concept-row triple">
  <div className="be-box">
    <div className="be-box-title" style={{color: "#f97316"}}>
      ⚡ Kafka Streams
    </div>
  <p>
    A lightweight Java/Scala library for building real-time stream processing apps. Reads from input topics, applies transformations (filter, map, join, aggregate, windowing), and writes to output topics. No separate cluster — runs in your app. Stateful operations use local RocksDB stores backed by Kafka changelog topics.
  </p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#f97316"}}>
    🔌 Kafka Connect
  </div>
<p>
  Framework for streaming data between Kafka and external systems — databases, S3, Elasticsearch — without writing code. <strong>Source connectors</strong> ingest data into Kafka (e.g. Debezium for CDC from PostgreSQL). <strong>Sink connectors</strong> write Kafka data to destinations. Hundreds of connectors available on Confluent Hub.
</p>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#f97316"}}>
    🎯 Common Patterns
  </div>
<div className="be-flow" style={{flexDirection: "column", alignItems: "flex-start", gap: "4px"}}>
  <div className="be-flow-step" style={{background: "#fef2f2", borderColor: "#ef4444"}}>
    Event sourcing — events as source of truth
  </div>
<div className="be-flow-step" style={{background: "#fef9c3", borderColor: "#d97706"}}>
  CQRS — separate read/write models
</div>
<div className="be-flow-step" style={{background: "#f0fdf4", borderColor: "#22c55e"}}>
  CDC — capture DB changes as events
</div>
<div className="be-flow-step" style={{background: "#eff6ff", borderColor: "#3b82f6"}}>
  Saga — distributed transactions via events
</div>

</div>

</div>

</div>

</div>

</div>
<div className="cd-section" id="cd-vercel">
  <div className="card" id="cicd-vercel">
    <div className="card-header">
      <div className="card-icon" style={{background: "#f8fafc", fontSize: "20px", border: "1px solid #e2e8f0"}}>
        ▲
      </div>
    <div>
      <div className="card-title">
        Vercel — Edge-First Deployment Platform
      </div>
    <div className="card-desc">
      Vercel is a serverless deployment platform optimised for frontend frameworks. Push to git → instant global deployment. Zero-config Next.js, React, Vue, Svelte support with Edge Network CDN, Serverless Functions, and ISR.
    </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-vercel" data-h="280"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).vercelAnim('deploy') } catch(_) {} }}>🚀 Deploy Flow</button> <button className="cbtn" onClick={() => { try { (window as any).vercelAnim('edge') } catch(_) {} }}>🌍 Edge Network</button> <button className="cbtn" onClick={() => { try { (window as any).vercelAnim('preview') } catch(_) {} }}>👁 Preview URLs</button> <div className="canvas-tag">
    Vercel Platform
  </div>

</div>

</div>
<div className="be-concept-row triple" style={{marginTop: "1rem"}}>
  <div className="be-box">
    <div className="be-box-title" style={{color: "#000"}}>
      ⚡ Serverless &amp; Edge Functions
    </div>
  <p>
    <strong>Serverless Functions</strong>: Node.js/Python/Go code deployed to AWS Lambda under the hood. Auto-scales to zero. Cold starts ~200ms. <strong>Edge Functions</strong>: V8-based runtime deployed to 100+ PoPs globally, executes at the nearest edge node &lt;50ms latency. Use for auth middleware, A/B testing, personalisation — anything needing ultra-low latency.
  </p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#f1f5f9", color: "#334155"}}>Edge Runtime</span><span className="be-tag" style={{background: "#f0fdf4", color: "#166534"}}>Cold Start</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#000"}}>
    🔄 ISR &amp; Rendering Modes
  </div>
<p>
  <strong>SSG</strong>: pages built at deploy time, served from CDN. Fastest possible. <strong>SSR</strong>: rendered on each request. Fresh data, slower. <strong>ISR</strong> (Incremental Static Regeneration): pages statically generated, revalidated in background after <code>revalidate</code> seconds. Best of both worlds — CDN speed + fresh data. <strong>PPR</strong> (Partial Prerendering in Next.js 14+): static shell + streaming dynamic parts.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#dbeafe", color: "#1e40af"}}>ISR</span><span className="be-tag" style={{background: "#fdf4ff", color: "#7e22ce"}}>PPR</span><span className="be-tag" style={{background: "#f0fdf4", color: "#166534"}}>SSG</span>
</div>

</div>
<div className="be-box">
  <div className="be-box-title" style={{color: "#000"}}>
    🌿 Git-Based Workflow
  </div>
<p>
  Every git push triggers a build. <strong>Preview deployments</strong>: each branch/PR gets a unique URL — share with teammates for review. <strong>Production deployments</strong>: merge to main automatically promotes. <strong>Instant rollback</strong>: one-click revert to any previous deployment. Integrates with GitHub, GitLab, Bitbucket natively.
</p>
<div className="be-tag-row">
  <span className="be-tag" style={{background: "#f1f5f9", color: "#334155"}}>Preview URLs</span><span className="be-tag" style={{background: "#fef2f2", color: "#b91c1c"}}>Rollback</span>
</div>

</div>

</div>

</div>

</div>
<div className="card" id="cicd-pipeline">
  <div className="card-header">
    <div className="card-icon" style={{background: "#f0f9ff"}}>
      🔄
    </div>
  <div>
    <div className="card-title">
      Full CI/CD Pipeline — Code to Production
    </div>
  <div className="card-desc">
    How all four tools connect: code commits flow through automated CI, get containerised with Docker, orchestrated by Kubernetes, deployed via Vercel, with Kafka powering event-driven services.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-cicd-pipeline" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).cicdPipelineAnim('push') } catch(_) {} }}>📤 Code Push</button> <button className="cbtn" onClick={() => { try { (window as any).cicdPipelineAnim('test') } catch(_) {} }}>🧪 Test &amp; Build</button> <button className="cbtn" onClick={() => { try { (window as any).cicdPipelineAnim('deploy') } catch(_) {} }}>🚀 Deploy</button> <div className="canvas-tag">
    CI/CD Pipeline
  </div>

</div>

</div>

</div>
    </>
  );
};

export default memo(CICDPanel);
