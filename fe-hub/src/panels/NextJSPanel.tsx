/**
 * src/panels/NextJSPanel.tsx
 * Next.js Architecture — CSR/SSR/SSG, App Router hooks, SSR vs CSR animation comparison.
 */
import React, { memo } from 'react';

const NextJSPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background:"linear-gradient(135deg,#18181b,#3f3f46)"}}>
  <div className="hero-tag">▲ Next.js</div>
  <h1>Next.js Architecture</h1>
  <p>App Router, Server Components, modern hooks, CSR vs SSR rendering — with animated diagrams showing how data flows in each strategy.</p>
</div>

{/* ── CSR ── */}
<div className="card" id="next-csr">
  <div className="card-header">
    <div className="card-icon" style={{background:"#ede9fe"}}>🖥️</div>
    <div>
      <div className="card-title">CSR — Client-Side Rendering</div>
      <div className="card-desc">Browser downloads minimal HTML + JS bundle, React hydrates and renders entirely client-side. Animations run natively in the browser with no server round-trips.</div>
    </div>
  </div>
  <div className="canvas-card">
    <canvas id="cvs-csr" data-h="260"/>
    <div className="canvas-controls">
      <button className="cbtn" onClick={()=>{try{(window as any).csrAnim('flow')}catch(_){}}} >▶ CSR Flow</button>
      <button className="cbtn" onClick={()=>{try{(window as any).csrAnim('hydrate')}catch(_){}}} >💧 Hydration</button>
      <div className="canvas-tag">Client-Side Rendering</div>
    </div>
  </div>
  <div className="rg-3" style={{marginTop:"1rem",gap:"8px"}}>
    {[
      {icon:'⚡',title:'Fast interactions',desc:'Zero server round-trips after load. Ideal for complex interactive UIs, dashboards, games.'},
      {icon:'🎬',title:'Rich animations',desc:'requestAnimationFrame, GSAP, Framer Motion — all run natively. No SSR rehydration mismatch.'},
      {icon:'⚠️',title:'Slow initial paint',desc:'Large JS bundle → higher TTFB. Bad for SEO without additional config (SSG/SSR pages).'},
    ].map((item,i) => (
      <div key={i} style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'10px',padding:'12px'}}>
        <div style={{fontSize:'18px',marginBottom:'4px'}}>{item.icon}</div>
        <div style={{fontSize:'12px',fontWeight:600,marginBottom:'4px'}}>{item.title}</div>
        <div style={{fontSize:'11px',color:'var(--t2)'}}>{item.desc}</div>
      </div>
    ))}
  </div>
</div>

{/* ── SSR ── */}
<div className="card" id="next-ssr">
  <div className="card-header">
    <div className="card-icon" style={{background:"#f0fdf4"}}>🌐</div>
    <div>
      <div className="card-title">SSR — Server-Side Rendering</div>
      <div className="card-desc">Server fetches data and renders full HTML per request. Client receives ready-to-display page — faster First Contentful Paint, SEO-friendly.</div>
    </div>
  </div>
  <div className="canvas-card">
    <canvas id="cvs-ssr" data-h="280"/>
    <div className="canvas-controls">
      <button className="cbtn" onClick={()=>{try{(window as any).ssrAnim('flow')}catch(_){}}} >▶ SSR Flow</button>
      <button className="cbtn" onClick={()=>{try{(window as any).ssrAnim('stream')}catch(_){}}} >🌊 Streaming</button>
      <div className="canvas-tag">Server-Side Rendering</div>
    </div>
  </div>
</div>

{/* ── SSR vs CSR Comparison ── */}
<div className="card" id="next-compare">
  <div className="card-header">
    <div className="card-icon" style={{background:"#fef9c3"}}>⚖️</div>
    <div>
      <div className="card-title">SSR vs CSR — When to Use Each</div>
      <div className="card-desc">Choosing the right rendering strategy determines performance, SEO, and animation behaviour in production.</div>
    </div>
  </div>
  <div className="compare-grid" style={{marginBottom:"1rem"}}>
    <div>
      <div style={{fontSize:"13px",fontWeight:700,color:"var(--t1)",marginBottom:"10px",display:"flex",alignItems:"center",gap:"6px"}}>
        <span style={{background:"#ede9fe",borderRadius:"6px",padding:"2px 8px",fontSize:"11px",color:"var(--p600)"}}>CLIENT-SIDE</span>
      </div>
      {[
        ['✅','Best for','SPAs, dashboards, authenticated UIs'],
        ['✅','Animations','Full freedom — GSAP, canvas, WebGL'],
        ['✅','Interactions','Instant, no server latency'],
        ['⚠️','SEO','Needs extra work (prerender/SSG)'],
        ['⚠️','Initial load','Larger bundle, slower FCP'],
        ['📦','Data pattern','useEffect + SWR / React Query'],
      ].map(([icon,label,val],i) => (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"8px",padding:"6px 0",borderBottom:"1px solid var(--border)"}}>
          <span style={{fontSize:"13px",flexShrink:0}}>{icon}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:"10.5px",fontWeight:600,color:"var(--t2)"}}>{label}</div>
            <div style={{fontSize:"11px",color:"var(--t1)"}}>{val}</div>
          </div>
        </div>
      ))}
    </div>
    <div>
      <div style={{fontSize:"13px",fontWeight:700,color:"var(--t1)",marginBottom:"10px",display:"flex",alignItems:"center",gap:"6px"}}>
        <span style={{background:"#f0fdf4",borderRadius:"6px",padding:"2px 8px",fontSize:"11px",color:"#059669"}}>SERVER-SIDE</span>
      </div>
      {[
        ['✅','Best for','Marketing pages, e-commerce, blogs'],
        ['⚠️','Animations','Risk: hydration mismatch. Use useEffect/dynamic imports'],
        ['⚠️','Interactions','Server round-trip on nav (mitigated by client components)'],
        ['✅','SEO','Fully crawlable HTML out of the box'],
        ['✅','Initial load','Faster FCP, lower LCP'],
        ['📦','Data pattern','async Server Components, fetch() with cache'],
      ].map(([icon,label,val],i) => (
        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"8px",padding:"6px 0",borderBottom:"1px solid var(--border)"}}>
          <span style={{fontSize:"13px",flexShrink:0}}>{icon}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:"10.5px",fontWeight:600,color:"var(--t2)"}}>{label}</div>
            <div style={{fontSize:"11px",color:"var(--t1)"}}>{val}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
  <div className="info-banner">
    <div className="info-banner-icon">🎬</div>
    <div className="info-banner-text"><b>Animations in SSR:</b> Server-rendered HTML reaches the client before JS loads. Animations using <code>document</code>, <code>window</code>, or canvas MUST be wrapped in <code>useEffect</code> or placed in a <code>'use client'</code> component to avoid hydration mismatches and SSR crashes.</div>
  </div>
</div>

{/* ── App Router Flow ── */}
<div className="card" id="next-flow">
  <div className="card-header">
    <div className="card-icon" style={{background:"#fef9c3"}}>▲</div>
    <div>
      <div className="card-title">Next.js App Router Data Flow</div>
      <div className="card-desc">App Router uses React Server Components by default. Data fetches on server, streams to client. Only interactive parts become client components.</div>
    </div>
  </div>
  <div className="canvas-card">
    <canvas id="cvs-nextflow" data-h="300"/>
    <div className="canvas-controls">
      <button className="cbtn" onClick={()=>{try{(window as any).nextflowAnim('request')}catch(_){}}} >📡 Request</button>
      <button className="cbtn" onClick={()=>{try{(window as any).nextflowAnim('stream')}catch(_){}}} >🌊 Stream</button>
      <button className="cbtn" onClick={()=>{try{(window as any).nextflowAnim('cache')}catch(_){}}} >📦 Cache</button>
      <div className="canvas-tag">Next.js App Router</div>
    </div>
  </div>
</div>

{/* ── Rendering Strategy Cards ── */}
<div className="rg-3 mt1">
  <div style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"10px",padding:"1rem"}}>
    <div style={{fontSize:"12px",fontWeight:600,marginBottom:"6px"}}>📄 Static (SSG)</div>
    <div style={{fontSize:"11px",color:"var(--t2)"}}>Build-time data. Fastest. Served from CDN. Revalidate with ISR (<code>revalidate: 60</code>).</div>
  </div>
  <div style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"10px",padding:"1rem"}}>
    <div style={{fontSize:"12px",fontWeight:600,marginBottom:"6px"}}>🔄 Dynamic (SSR)</div>
    <div style={{fontSize:"11px",color:"var(--t2)"}}>Request-time data via <code>fetch(url, &#123; cache: 'no-store' &#125;)</code>. Always fresh. Higher TTFB.</div>
  </div>
  <div style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"10px",padding:"1rem"}}>
    <div style={{fontSize:"12px",fontWeight:600,marginBottom:"6px"}}>🌊 Server Components</div>
    <div style={{fontSize:"11px",color:"var(--t2)"}}>Zero client JS. Async by default. Stream HTML. Default in App Router.</div>
  </div>
</div>

<div className="divider"/>

{/* ── Modern Hooks ── */}
<div className="card" id="next-hooks">
  <div className="card-header">
    <div className="card-icon" style={{background:"#ede9fe"}}>🪝</div>
    <div>
      <div className="card-title">Modern Next.js Hooks &amp; APIs</div>
      <div className="card-desc">App Router introduced a new set of client hooks. These only work in <code>'use client'</code> components and replace Pages Router equivalents.</div>
    </div>
  </div>

  <div className="rg-2" style={{gap:"12px",marginBottom:"1rem"}}>
    {/* useRouter */}
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"var(--p50)",color:"var(--p700)",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>useRouter</code>
        <span style={{fontSize:"10px",color:"var(--t3)"}}>next/navigation</span>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-string">'use client'</span>;<br><span>import</span> { useRouter } <span>from</span> <span class="code-string">'next/navigation'</span>;<br><br><span>function</span> <span class="code-func">CheckoutBtn</span>() {<br>&nbsp;&nbsp;<span>const</span> router = useRouter();<br>&nbsp;&nbsp;<span>return</span> (<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;button onClick={() =&gt; router.push(<span class="code-string">'/checkout'</span>)}&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Checkout<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;<br>&nbsp;&nbsp;);<br>}`}}/>
    </div>
    {/* usePathname */}
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"var(--p50)",color:"var(--p700)",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>usePathname</code>
        <span style={{fontSize:"10px",color:"var(--t3)"}}>next/navigation</span>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-string">'use client'</span>;<br><span>import</span> { usePathname } <span>from</span> <span class="code-string">'next/navigation'</span>;<br><br><span>function</span> <span class="code-func">NavLink</span>({ href, label }) {<br>&nbsp;&nbsp;<span>const</span> path = usePathname();<br>&nbsp;&nbsp;<span>const</span> active = path === href;<br>&nbsp;&nbsp;<span>return</span> &lt;a className={active ? <span class="code-string">'active'</span> : <span class="code-string">''</span>}&gt;{label}&lt;/a&gt;;<br>}`}}/>
    </div>
    {/* useSearchParams */}
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"var(--p50)",color:"var(--p700)",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>useSearchParams</code>
        <span style={{fontSize:"10px",color:"var(--t3)"}}>next/navigation</span>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-string">'use client'</span>;<br><span>import</span> { useSearchParams } <span>from</span> <span class="code-string">'next/navigation'</span>;<br><br><span>function</span> <span class="code-func">SearchResults</span>() {<br>&nbsp;&nbsp;<span>const</span> params = useSearchParams();<br>&nbsp;&nbsp;<span>const</span> query = params.get(<span class="code-string">'q'</span>);<br>&nbsp;&nbsp;<span>return</span> &lt;div&gt;Results for: {query}&lt;/div&gt;;<br>}`}}/>
    </div>
    {/* useParams */}
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"var(--p50)",color:"var(--p700)",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>useParams</code>
        <span style={{fontSize:"10px",color:"var(--t3)"}}>next/navigation</span>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-string">'use client'</span>;<br><span>import</span> { useParams } <span>from</span> <span class="code-string">'next/navigation'</span>;<br><br><span class="code-comment">// app/products/[id]/page.tsx</span><br><span>function</span> <span class="code-func">ProductPage</span>() {<br>&nbsp;&nbsp;<span>const</span> { id } = useParams();<br>&nbsp;&nbsp;<span>return</span> &lt;div&gt;Product: {id}&lt;/div&gt;;<br>}`}}/>
    </div>
  </div>

  {/* Server-side APIs */}
  <div style={{fontSize:"13px",fontWeight:600,margin:"1rem 0 10px"}}>Server-Side APIs (App Router)</div>
  <div className="rg-2" style={{gap:"12px",marginBottom:"1rem"}}>
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"#f0fdf4",color:"#059669",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>generateMetadata()</code>
        <span style={{fontSize:"10px",color:"var(--t3)"}}>SEO</span>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-comment">// app/blog/[slug]/page.tsx</span><br><span>export async function</span> <span class="code-func">generateMetadata</span>({ params }) {<br>&nbsp;&nbsp;<span>const</span> post = <span>await</span> fetchPost(params.slug);<br>&nbsp;&nbsp;<span>return</span> {<br>&nbsp;&nbsp;&nbsp;&nbsp;title: post.title,<br>&nbsp;&nbsp;&nbsp;&nbsp;description: post.excerpt,<br>&nbsp;&nbsp;&nbsp;&nbsp;openGraph: { images: [post.image] },<br>&nbsp;&nbsp;};<br>}`}}/>
    </div>
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"#f0fdf4",color:"#059669",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>generateStaticParams()</code>
        <span style={{fontSize:"10px",color:"var(--t3)"}}>SSG</span>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-comment">// Pre-render all product pages at build time</span><br><span>export async function</span> <span class="code-func">generateStaticParams</span>() {<br>&nbsp;&nbsp;<span>const</span> products = <span>await</span> fetchAllProducts();<br>&nbsp;&nbsp;<span>return</span> products.map(p =&gt; ({<br>&nbsp;&nbsp;&nbsp;&nbsp;id: p.id.toString(),<br>&nbsp;&nbsp;}));<br>}`}}/>
    </div>
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"#f0fdf4",color:"#059669",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>Server Actions</code>
        <span style={{fontSize:"10px",color:"var(--t3)"}}>Forms / Mutations</span>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-string">'use server'</span>;<br><span>async function</span> <span class="code-func">createOrder</span>(formData: FormData) {<br>&nbsp;&nbsp;<span>const</span> item = formData.get(<span class="code-string">'item'</span>);<br>&nbsp;&nbsp;<span>await</span> db.orders.create({ item });<br>&nbsp;&nbsp;revalidatePath(<span class="code-string">'/orders'</span>);<br>}<br><span class="code-comment">// Use in form: action={createOrder}</span>`}}/>
    </div>
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"#f0fdf4",color:"#059669",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>next/image</code>
        <span style={{fontSize:"10px",color:"var(--t3)"}}>Performance</span>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span>import</span> Image <span>from</span> <span class="code-string">'next/image'</span>;<br><br><span class="code-comment">// Auto: WebP, lazy-load, size hints</span><br>&lt;<span class="code-func">Image</span><br>&nbsp;&nbsp;src=<span class="code-string">"/hero.jpg"</span><br>&nbsp;&nbsp;alt=<span class="code-string">"Hero"</span><br>&nbsp;&nbsp;width={1200}<br>&nbsp;&nbsp;height={630}<br>&nbsp;&nbsp;priority  <span class="code-comment">// LCP image</span><br>/&gt;`}}/>
    </div>
  </div>

  {/* useTransition / Suspense */}
  <div style={{fontSize:"13px",fontWeight:600,margin:"1rem 0 10px"}}>Concurrent React Hooks (React 18+ / Next.js)</div>
  <div className="rg-2" style={{gap:"12px"}}>
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"var(--p50)",color:"var(--p700)",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>useTransition</code>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span>const</span> [isPending, startTransition] = useTransition();<br><br><span>function</span> <span class="code-func">handleClick</span>() {<br>&nbsp;&nbsp;startTransition(() =&gt; {<br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment">// Non-urgent update — keeps UI responsive</span><br>&nbsp;&nbsp;&nbsp;&nbsp;setTab(<span class="code-string">'analytics'</span>);<br>&nbsp;&nbsp;});<br>}<br><span>return</span> isPending ? &lt;<span class="code-func">Spinner</span>/&gt; : &lt;<span class="code-func">Tab</span>/&gt;;`}}/>
    </div>
    <div style={{border:"1px solid var(--border)",borderRadius:"10px",padding:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
        <code style={{background:"var(--p50)",color:"var(--p700)",padding:"2px 8px",borderRadius:"5px",fontSize:"11.5px",fontWeight:600}}>useDeferredValue</code>
      </div>
      <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span>const</span> [query, setQuery] = useState(<span class="code-string">''</span>);<br><span>const</span> deferred = useDeferredValue(query);<br><br><span class="code-comment">// deferred lags behind query</span><br><span class="code-comment">// UI stays responsive during fast typing</span><br><span>return</span> (<br>&nbsp;&nbsp;&lt;&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="code-func">SearchInput</span> value={query} onChange={setQuery}/&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="code-func">Results</span> query={deferred}/&gt; <span class="code-comment">// heavy</span><br>&nbsp;&nbsp;&lt;/&gt;<br>);`}}/>
    </div>
  </div>

  <div className="info-banner" style={{marginTop:"1rem"}}>
    <div className="info-banner-icon">⚡</div>
    <div className="info-banner-text"><b>Key rule:</b> All hooks (<code>useRouter</code>, <code>usePathname</code>, <code>useState</code>, <code>useEffect</code>) require <code>'use client'</code> directive. Server Components are async by default — use <code>await fetch()</code> directly without hooks.</div>
  </div>
</div>
    </>
  );
};

export default memo(NextJSPanel);
