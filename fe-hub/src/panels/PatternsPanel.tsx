/**
 * src/panels/PatternsPanel.tsx
 * Design Patterns + SOLID Principles with enterprise JS use cases.
 */
import React, { memo } from 'react';

const PatternsPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background:"linear-gradient(135deg,#7c3aed,#2563eb)"}}>
  <div className="hero-tag">🧩 Design Patterns</div>
  <h1>JavaScript Design Patterns &amp; SOLID</h1>
  <p>Five core design patterns + SOLID principles — with animated diagrams, enterprise use cases, and real-world JS/TS examples every frontend architect should master.</p>
</div>

{/* ── Module Pattern ── */}
<div className="card" id="pat-module">
  <div className="card-header">
    <div className="card-icon" style={{background:"#ede9fe"}}>📦</div>
    <div>
      <div className="card-title">Module Pattern</div>
      <div className="card-desc">Encapsulates private state using closure. Public API exposed via returned object. ES6 modules provide native syntax.</div>
    </div>
  </div>
  <div className="canvas-card">
    <canvas id="cvs-pat-module" data-h="240"/>
    <div className="canvas-controls">
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('module','call')}catch(_){}}} >📞 Call Public</button>
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('module','access')}catch(_){}}} >🔒 Access Private</button>
      <div className="canvas-tag">Module Pattern</div>
    </div>
  </div>
  <div className="code-block code-keyword" style={{fontSize:"11px",marginTop:"1rem"}}
    dangerouslySetInnerHTML={{__html:`<span>const</span> <span class="code-func">CartModule</span> = (<span>function</span>() {<br>&nbsp;&nbsp;<span>// Private state — not accessible outside</span><br>&nbsp;&nbsp;<span>const</span> _items = [];<br>&nbsp;&nbsp;<span>let</span> _total = <span class="code-string">0</span>;<br>&nbsp;&nbsp;<span>return</span> {<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>add</span>(item) { _items.push(item); _total += item.price; },<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>getTotal</span>() { <span>return</span> _total; },<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>getItems</span>() { <span>return</span> [..._items]; } <span>// copy, not ref</span><br>&nbsp;&nbsp;};<br>})();`}}/>
  <div className="info-banner" style={{marginTop:"0.75rem"}}>
    <div className="info-banner-icon">🏢</div>
    <div className="info-banner-text"><b>Enterprise use:</b> Shopping cart logic, feature flags, analytics trackers, auth token storage — any module needing private internal state with a controlled public API.</div>
  </div>
</div>

{/* ── Singleton Pattern ── */}
<div className="card" id="pat-singleton">
  <div className="card-header">
    <div className="card-icon" style={{background:"#fef9c3"}}>1️⃣</div>
    <div>
      <div className="card-title">Singleton Pattern</div>
      <div className="card-desc">Ensures a class has only one instance and provides a global access point — used for config managers, event buses, and service registries.</div>
    </div>
  </div>
  <div className="canvas-card">
    <canvas id="cvs-pat-singleton" data-h="240"/>
    <div className="canvas-controls">
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('singleton','create')}catch(_){}}} >🏗 Create</button>
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('singleton','reuse')}catch(_){}}} >♻ Reuse</button>
      <div className="canvas-tag">Singleton Pattern</div>
    </div>
  </div>
  <div className="code-block code-keyword" style={{fontSize:"11px",marginTop:"1rem"}}
    dangerouslySetInnerHTML={{__html:`<span>class</span> <span class="code-func">AppConfig</span> {<br>&nbsp;&nbsp;<span>static</span> instance = <span>null</span>;<br>&nbsp;&nbsp;<span class="code-func">constructor</span>() {<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>if</span> (AppConfig.instance) <span>return</span> AppConfig.instance;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>this</span>.env = process.env.NODE_ENV;<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>this</span>.apiUrl = process.env.API_URL;<br>&nbsp;&nbsp;&nbsp;&nbsp;AppConfig.instance = <span>this</span>;<br>&nbsp;&nbsp;}<br>}<br><span class="code-comment">// Both references point to same object</span><br><span>const</span> cfg1 = <span>new</span> <span class="code-func">AppConfig</span>();<br><span>const</span> cfg2 = <span>new</span> <span class="code-func">AppConfig</span>();<br>console.log(cfg1 === cfg2); <span class="code-comment">// true</span>`}}/>
</div>

{/* ── Factory Pattern ── */}
<div className="card" id="pat-factory">
  <div className="card-header">
    <div className="card-icon" style={{background:"#fff7ed"}}>🏭</div>
    <div>
      <div className="card-title">Factory Pattern</div>
      <div className="card-desc">Defines an interface for creating objects but lets subclasses decide which class to instantiate — decouples object creation from usage.</div>
    </div>
  </div>
  <div className="canvas-card">
    <canvas id="cvs-pat-factory" data-h="260"/>
    <div className="canvas-controls">
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('factory','button')}catch(_){}}} >🔵 Button</button>
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('factory','modal')}catch(_){}}} >📋 Modal</button>
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('factory','toast')}catch(_){}}} >🔔 Toast</button>
      <div className="canvas-tag">Factory Pattern</div>
    </div>
  </div>
</div>

{/* ── Observer Pattern ── */}
<div className="card" id="pat-observer">
  <div className="card-header">
    <div className="card-icon" style={{background:"#fdf2f8"}}>👁️</div>
    <div>
      <div className="card-title">Observer / PubSub Pattern</div>
      <div className="card-desc">Defines one-to-many dependency so when one object changes state, all dependents are notified. Foundation of event-driven architectures.</div>
    </div>
  </div>
  <div className="canvas-card">
    <canvas id="cvs-pat-observer" data-h="260"/>
    <div className="canvas-controls">
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('observer','emit')}catch(_){}}} >📢 Emit</button>
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('observer','sub')}catch(_){}}} >➕ Subscribe</button>
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('observer','unsub')}catch(_){}}} >➖ Unsubscribe</button>
      <div className="canvas-tag">Observer / PubSub</div>
    </div>
  </div>
</div>

{/* ── Strategy Pattern ── */}
<div className="card" id="pat-strategy">
  <div className="card-header">
    <div className="card-icon" style={{background:"#f0fdf4"}}>🎯</div>
    <div>
      <div className="card-title">Strategy Pattern</div>
      <div className="card-desc">Defines a family of algorithms, encapsulates each one, and makes them interchangeable — used for sorting, validation, payment methods.</div>
    </div>
  </div>
  <div className="canvas-card">
    <canvas id="cvs-pat-strategy" data-h="260"/>
    <div className="canvas-controls">
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('strategy','bubble')}catch(_){}}} >🔵 Bubble</button>
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('strategy','quick')}catch(_){}}} >⚡ Quick</button>
      <button className="cbtn" onClick={()=>{try{(window as any).patAnim('strategy','merge')}catch(_){}}} >🔀 Merge</button>
      <div className="canvas-tag">Strategy Pattern</div>
    </div>
  </div>
</div>

<div className="divider"/>

{/* ══════════════════════════════════════════════════════ */}
{/* SOLID PRINCIPLES                                      */}
{/* ══════════════════════════════════════════════════════ */}
<div className="card" id="pat-solid">
  <div className="card-header">
    <div className="card-icon" style={{background:"linear-gradient(135deg,#ede9fe,#dbeafe)",fontSize:"22px"}}>🏗</div>
    <div>
      <div className="card-title">SOLID Principles in JavaScript / TypeScript</div>
      <div className="card-desc">Five foundational principles for writing maintainable, scalable, enterprise-grade code — with real React + Node.js examples.</div>
    </div>
  </div>

  {/* S — Single Responsibility */}
  <div style={{marginBottom:"1.5rem"}}>
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
      <div style={{width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#6c5dd3,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px",flexShrink:0}}>S</div>
      <div>
        <div style={{fontWeight:700,fontSize:"14px",color:"var(--t1)"}}>Single Responsibility Principle</div>
        <div style={{fontSize:"12px",color:"var(--t2)"}}>A class/function should have one reason to change</div>
      </div>
    </div>
    <div className="compare-grid">
      <div>
        <div style={{fontSize:"11px",fontWeight:600,color:"#ef4444",marginBottom:"6px"}}>❌ Violates SRP</div>
        <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-comment">// Does too many things</span><br><span>function</span> <span class="code-func">UserComponent</span>() {<br>&nbsp;&nbsp;<span class="code-comment">// Fetches data</span><br>&nbsp;&nbsp;<span>const</span> data = fetch(<span class="code-string">'/api/user'</span>);<br>&nbsp;&nbsp;<span class="code-comment">// Transforms data</span><br>&nbsp;&nbsp;<span>const</span> user = JSON.parse(data);<br>&nbsp;&nbsp;<span class="code-comment">// Formats date</span><br>&nbsp;&nbsp;<span>const</span> date = format(user.createdAt);<br>&nbsp;&nbsp;<span class="code-comment">// Sends analytics</span><br>&nbsp;&nbsp;analytics.track(<span class="code-string">'view'</span>);<br>&nbsp;&nbsp;<span>return</span> &lt;div&gt;{user.name}&lt;/div&gt;;<br>}`}}/>
      </div>
      <div>
        <div style={{fontSize:"11px",fontWeight:600,color:"#059669",marginBottom:"6px"}}>✅ Follows SRP</div>
        <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-comment">// Each has one job</span><br><span>const</span> useUser = () =&gt; useSWR(<span class="code-string">'/api/user'</span>);<br><span>const</span> formatDate = (d) =&gt; format(d);<br><span>const</span> trackView = () =&gt; analytics.track(<span class="code-string">'view'</span>);<br><br><span>function</span> <span class="code-func">UserComponent</span>() {<br>&nbsp;&nbsp;<span>const</span> { data: user } = useUser();<br>&nbsp;&nbsp;useEffect(() =&gt; trackView(), []);<br>&nbsp;&nbsp;<span>return</span> &lt;div&gt;{user?.name}&lt;/div&gt;;<br>}`}}/>
      </div>
    </div>
    <div className="info-banner" style={{marginTop:"8px"}}>
      <div className="info-banner-icon">🏢</div>
      <div className="info-banner-text"><b>Enterprise:</b> React hooks split data-fetching, business logic, and UI. Node.js services split controllers, services, and repositories.</div>
    </div>
  </div>

  {/* O — Open/Closed */}
  <div style={{marginBottom:"1.5rem"}}>
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
      <div style={{width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#059669,#0891b2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px",flexShrink:0}}>O</div>
      <div>
        <div style={{fontWeight:700,fontSize:"14px",color:"var(--t1)"}}>Open/Closed Principle</div>
        <div style={{fontSize:"12px",color:"var(--t2)"}}>Open for extension, closed for modification</div>
      </div>
    </div>
    <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-comment">// ✅ OCP — extend via props, not by editing the component</span><br><span class="code-keyword">interface</span> ButtonProps {<br>&nbsp;&nbsp;variant?: <span class="code-string">'primary'</span> | <span class="code-string">'danger'</span> | <span class="code-string">'ghost'</span>;<br>&nbsp;&nbsp;icon?: React.ReactNode;<br>&nbsp;&nbsp;onClick?: () =&gt; <span>void</span>;<br>}<br><span>function</span> <span class="code-func">Button</span>({ variant = <span class="code-string">'primary'</span>, icon, children, ...rest }: ButtonProps) {<br>&nbsp;&nbsp;<span>return</span> &lt;button className={<span class="code-string">\`btn btn--\${variant}\`</span>} {...rest}&gt;{icon}{children}&lt;/button&gt;;<br>}<br><span class="code-comment">// New variants added WITHOUT touching Button component</span><br>&lt;<span class="code-func">Button</span> variant=<span class="code-string">"danger"</span> icon={&lt;TrashIcon/&gt;}&gt;Delete&lt;/Button&gt;`}}/>
  </div>

  {/* L — Liskov Substitution */}
  <div style={{marginBottom:"1.5rem"}}>
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
      <div style={{width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#d97706,#dc2626)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px",flexShrink:0}}>L</div>
      <div>
        <div style={{fontWeight:700,fontSize:"14px",color:"var(--t1)"}}>Liskov Substitution Principle</div>
        <div style={{fontSize:"12px",color:"var(--t2)"}}>Subtypes must be substitutable for their base types</div>
      </div>
    </div>
    <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-comment">// ✅ LSP — any Logger works where BaseLogger is expected</span><br><span class="code-keyword">interface</span> Logger {<br>&nbsp;&nbsp;log(msg: <span>string</span>): <span>void</span>;<br>&nbsp;&nbsp;error(msg: <span>string</span>): <span>void</span>;<br>}<br><span>class</span> <span class="code-func">ConsoleLogger</span> <span class="code-keyword">implements</span> Logger { <span class="code-comment">/* ... */</span> }<br><span>class</span> <span class="code-func">CloudLogger</span> <span class="code-keyword">implements</span> Logger { <span class="code-comment">/* sends to Datadog */</span> }<br><span>class</span> <span class="code-func">SilentLogger</span> <span class="code-keyword">implements</span> Logger { <span class="code-comment">/* for tests */</span> }<br><br><span>function</span> <span class="code-func">processOrder</span>(logger: Logger) {<br>&nbsp;&nbsp;logger.log(<span class="code-string">'Processing...'</span>); <span class="code-comment">// Works with ANY logger</span><br>}`}}/>
    <div className="info-banner" style={{marginTop:"8px"}}>
      <div className="info-banner-icon">🏢</div>
      <div className="info-banner-text"><b>Enterprise:</b> Swap ConsoleLogger → CloudLogger in production. Swap with SilentLogger in tests. Zero code changes needed upstream.</div>
    </div>
  </div>

  {/* I — Interface Segregation */}
  <div style={{marginBottom:"1.5rem"}}>
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
      <div style={{width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#7c3aed,#6c5dd3)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px",flexShrink:0}}>I</div>
      <div>
        <div style={{fontWeight:700,fontSize:"14px",color:"var(--t1)"}}>Interface Segregation Principle</div>
        <div style={{fontSize:"12px",color:"var(--t2)"}}>Clients should not depend on interfaces they don't use</div>
      </div>
    </div>
    <div className="compare-grid">
      <div>
        <div style={{fontSize:"11px",fontWeight:600,color:"#ef4444",marginBottom:"6px"}}>❌ Fat Interface</div>
        <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-keyword">interface</span> UserService {<br>&nbsp;&nbsp;getUser(id: <span>string</span>): User;<br>&nbsp;&nbsp;createUser(u: User): <span>void</span>;<br>&nbsp;&nbsp;deleteUser(id: <span>string</span>): <span>void</span>;<br>&nbsp;&nbsp;sendEmail(u: User): <span>void</span>;<br>&nbsp;&nbsp;generatePDF(u: User): <span>void</span>;<br>}<span class="code-comment">// ReadOnly component forced</span><br><span class="code-comment">// to depend on delete/PDF!</span>`}}/>
      </div>
      <div>
        <div style={{fontSize:"11px",fontWeight:600,color:"#059669",marginBottom:"6px"}}>✅ Segregated</div>
        <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-keyword">interface</span> UserReader {<br>&nbsp;&nbsp;getUser(id: <span>string</span>): User;<br>}<br><span class="code-keyword">interface</span> UserWriter {<br>&nbsp;&nbsp;createUser(u: User): <span>void</span>;<br>&nbsp;&nbsp;deleteUser(id: <span>string</span>): <span>void</span>;<br>}<br><span class="code-keyword">interface</span> Notifier {<br>&nbsp;&nbsp;sendEmail(u: User): <span>void</span>;<br>}<span class="code-comment">// Each uses only what it needs</span>`}}/>
      </div>
    </div>
  </div>

  {/* D — Dependency Inversion */}
  <div>
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
      <div style={{width:"32px",height:"32px",borderRadius:"8px",background:"linear-gradient(135deg,#0891b2,#2563eb)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px",flexShrink:0}}>D</div>
      <div>
        <div style={{fontWeight:700,fontSize:"14px",color:"var(--t1)"}}>Dependency Inversion Principle</div>
        <div style={{fontSize:"12px",color:"var(--t2)"}}>Depend on abstractions, not concretions</div>
      </div>
    </div>
    <div className="code-block" style={{fontSize:"10.5px"}} dangerouslySetInnerHTML={{__html:`<span class="code-comment">// ✅ DIP — component depends on abstraction (interface), not concrete impl</span><br><span class="code-keyword">interface</span> DataSource {<br>&nbsp;&nbsp;fetchProducts(): Promise&lt;Product[]&gt;;<br>}<br><span class="code-comment">// Concrete implementations</span><br><span>class</span> <span class="code-func">APIDataSource</span> <span class="code-keyword">implements</span> DataSource { <span class="code-comment">/* fetch from REST */</span> }<br><span>class</span> <span class="code-func">MockDataSource</span> <span class="code-keyword">implements</span> DataSource { <span class="code-comment">/* return fixtures */</span> }<br><br><span class="code-comment">// Component receives abstraction via props/context</span><br><span>function</span> <span class="code-func">ProductList</span>({ dataSource }: { dataSource: DataSource }) {<br>&nbsp;&nbsp;<span>const</span> [products, setProducts] = useState([]);<br>&nbsp;&nbsp;useEffect(() =&gt; { dataSource.fetchProducts().then(setProducts); }, [dataSource]);<br>&nbsp;&nbsp;<span>return</span> &lt;ul&gt;{products.map(p =&gt; &lt;li key={p.id}&gt;{p.name}&lt;/li&gt;)}&lt;/ul&gt;;<br>}`}}/>
    <div className="info-banner" style={{marginTop:"8px"}}>
      <div className="info-banner-icon">🏢</div>
      <div className="info-banner-text"><b>Enterprise:</b> Swap APIDataSource → MockDataSource in tests. Swap → GraphQLDataSource without touching ProductList. This is the foundation of Clean Architecture and testable React apps.</div>
    </div>
  </div>

  {/* SOLID Summary Grid */}
  <div style={{marginTop:"1.5rem"}}>
    <div style={{fontSize:"13px",fontWeight:600,marginBottom:"10px"}}>SOLID at a Glance</div>
    <div className="rg-3" style={{gap:"8px"}}>
      {[
        {letter:'S',name:'Single Responsibility',desc:'One reason to change',color:'#6c5dd3'},
        {letter:'O',name:'Open / Closed',desc:'Extend, don\'t modify',color:'#059669'},
        {letter:'L',name:'Liskov Substitution',desc:'Subtypes are substitutable',color:'#d97706'},
        {letter:'I',name:'Interface Segregation',desc:'No unused dependencies',color:'#7c3aed'},
        {letter:'D',name:'Dependency Inversion',desc:'Depend on abstractions',color:'#0891b2'},
      ].map(p => (
        <div key={p.letter} className="concept-chip" style={{flexDirection:'column',alignItems:'flex-start',gap:'4px',padding:'12px'}}>
          <div style={{width:'28px',height:'28px',borderRadius:'7px',background:p.color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800,fontSize:'14px'}}>{p.letter}</div>
          <div style={{fontSize:'11.5px',fontWeight:600,color:'var(--t1)',marginTop:'2px'}}>{p.name}</div>
          <div style={{fontSize:'11px',color:'var(--t3)'}}>{p.desc}</div>
        </div>
      ))}
    </div>
  </div>
</div>
    </>
  );
};

export default memo(PatternsPanel);
