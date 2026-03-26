/**
 * src/panels/SecurityPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * SECURITY section panel.
 * Content extracted 1:1 from original HTML — full visual parity.
 * Canvas animations initialised via useEffect after mount.
 */
import React, { memo } from 'react';

const SecurityPanel: React.FC = () => {
  return (
    <>
<div className="hero" style={{background: "linear-gradient(135deg,#dc2626,#7c3aed)"}}>
    <div className="hero-tag">
      🔒 Security
    </div>
  <h1>
    Frontend Security
  </h1>
<p>
  Protect your application from XSS, CSRF, clickjacking and injection attacks — with automated scanning, security headers and defence-in-depth strategies.
</p>

</div>
<div className="card" id="sec-overview">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef2f2"}}>
      🛡️
    </div>
  <div>
    <div className="card-title">
      Security Threat Landscape
    </div>
  <div className="card-desc">
    Animated overview of the most critical frontend attack vectors and how each is mitigated.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-security" data-h="300"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).secAnim('xss') } catch(_) {} }}>⚠ XSS Attack</button> <button className="cbtn" onClick={() => { try { (window as any).secAnim('csrf') } catch(_) {} }}>🔄 CSRF</button> <button className="cbtn" onClick={() => { try { (window as any).secAnim('cors') } catch(_) {} }}>🌐 CORS</button> <button className="cbtn" onClick={() => { try { (window as any).secAnim('mitm') } catch(_) {} }}>🕵 MITM</button> <div className="canvas-tag">
    Security Threats
  </div>

</div>

</div>

</div>
<div className="card" id="sec-xss">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fef2f2"}}>
      ⚠️
    </div>
  <div>
    <div className="card-title">
      XSS — Cross-Site Scripting
    </div>
  <div className="card-desc">
    XSS allows attackers to inject malicious scripts into pages viewed by other users. Three variants: Stored, Reflected, and DOM-based.
  </div>

</div>

</div>
<div className="rg-3 mb1">
  <div style={{background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "1rem", borderLeft: "4px solid #ef4444"}}>
    <div style={{fontSize: "12px", fontWeight: 600, color: "#991b1b", marginBottom: "6px"}}>
      💾 Stored XSS
    </div>
  <div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
    Malicious script saved to the database. Every user who loads the page executes it. Highest severity.
  </div>

</div>
<div style={{background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "10px", padding: "1rem", borderLeft: "4px solid #f97316"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "#9a3412", marginBottom: "6px"}}>
    🔗 Reflected XSS
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
  Script embedded in URL, reflected back in server response. Requires victim to click a crafted link.
</div>

</div>
<div style={{background: "#fdf4ff", border: "1px solid #e9d5ff", borderRadius: "10px", padding: "1rem", borderLeft: "4px solid #a855f7"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "#581c87", marginBottom: "6px"}}>
    🖥 DOM-Based XSS
  </div>
<div style={{fontSize: "11px", color: "var(--t2)", lineHeight: 1.5}}>
  Client-side script reads from an attacker-controlled source (URL hash) and writes to a dangerous sink (innerHTML).
</div>

</div>

</div>
<div className="divider">

</div>
<div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
  Prevention Techniques
</div>
<div className="rg-2">
  <div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// ❌ Dangerous — never do this</span><br/>el.innerHTML = userInput;<br/>document.<span className="code-func">write</span>(data);<br/><br/><span className="code-comment">// ✅ Safe alternatives</span><br/>el.textContent = userInput; <span className="code-comment">// text only</span><br/>el.<span className="code-func">setAttribute</span>(<span className="code-string">'data-x'</span>, sanitized);<br/><span className="code-keyword">import</span> DOMPurify from <span className="code-string">'dompurify'</span>;<br/>el.innerHTML = DOMPurify.<span className="code-func">sanitize</span>(html); `}}/>
<div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
  <div style={{background: "#ecfdf5", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "10px"}}>
    <div style={{fontSize: "12px", fontWeight: 600, color: "#065f46", marginBottom: "3px"}}>
      Content Security Policy (CSP)
    </div>
  <div style={{fontSize: "11px", color: "var(--t2)"}}>
    HTTP header whitelist of trusted script sources. Blocks inline scripts and unauthorized origins.
  </div>
<div style={{background: "var(--code-bg)", borderRadius: "5px", padding: "5px", marginTop: "5px", fontFamily: "'DM Mono',monospace", fontSize: "10px", color: "var(--p800)"}}>
  Content-Security-Policy: script-src 'self' cdn.example.com
</div>

</div>
<div style={{background: "var(--b50)", border: "1px solid var(--b100)", borderRadius: "8px", padding: "10px"}}>
  <div style={{fontSize: "12px", fontWeight: 600, color: "var(--b700)", marginBottom: "3px"}}>
    HttpOnly &amp; Secure Cookies
  </div>
<div style={{fontSize: "11px", color: "var(--t2)"}}>
  Prevents JS from accessing session cookies. Always set HttpOnly, Secure, and SameSite=Strict on auth cookies.
</div>

</div>

</div>

</div>

</div>
<div className="card" id="sec-cors-csrf">
  <div className="card-header">
    <div className="card-icon" style={{background: "#eff6ff"}}>
      🔄
    </div>
  <div>
    <div className="card-title">
      CORS &amp; CSRF Protection
    </div>
  <div className="card-desc">
    CORS controls which origins can access your API. CSRF exploits the browser's automatic cookie sending to forge authenticated requests.
  </div>

</div>

</div>
<div className="rg-2 mb1">
  <div>
    <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "8px"}}>
      🌐 CORS (Cross-Origin Resource Sharing)
    </div>
  <div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "8px"}}>
    Browser enforces the Same-Origin Policy. CORS headers tell the browser which cross-origin requests are allowed. A preflight OPTIONS request checks permissions before the real request.
  </div>
<div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// Express CORS setup</span><br/><span className="code-func">app</span>.<span className="code-func">use</span>(<span className="code-func">cors</span>({<br/>&nbsp;&nbsp;origin: [<span className="code-string">'https://app.example.com'</span>],<br/>&nbsp;&nbsp;methods: [<span className="code-string">'GET'</span>,<span className="code-string">'POST'</span>],<br/>&nbsp;&nbsp;credentials: <span className="code-keyword">true</span>,<br/>})); `}}/>

</div>
<div>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "8px"}}>
    🔄 CSRF (Cross-Site Request Forgery)
  </div>
<div style={{fontSize: "12px", color: "var(--t2)", lineHeight: 1.6, marginBottom: "8px"}}>
  Attacker tricks authenticated user into making an unintended request. Mitigated with CSRF tokens, SameSite cookies, and double-submit cookie pattern.
</div>
<div className="code-block code-comment" style={{fontSize: "11px"}} dangerouslySetInnerHTML={{__html: ` <span>// SameSite cookie — blocks CSRF</span><br/><span className="code-func">res</span>.<span className="code-func">cookie</span>(<span className="code-string">'session'</span>, token, {<br/>&nbsp;&nbsp;httpOnly: <span className="code-keyword">true</span>,<br/>&nbsp;&nbsp;secure: <span className="code-keyword">true</span>,<br/>&nbsp;&nbsp;sameSite: <span className="code-string">'Strict'</span>,<br/>}); `}}/>

</div>

</div>

</div>
<div className="card" id="sec-scanning">
  <div className="card-header">
    <div className="card-icon" style={{background: "#fdf4ff"}}>
      🔍
    </div>
  <div>
    <div className="card-title">
      Security Scanning &amp; Tools
    </div>
  <div className="card-desc">
    Automated and manual scanning tools that identify vulnerabilities before attackers do — integrated into CI/CD pipelines.
  </div>

</div>

</div>
<div className="canvas-card">
  <canvas id="cvs-scanning" data-h="260"/>

<div className="canvas-controls">
  <button className="cbtn" onClick={() => { try { (window as any).scanAnim('blackbox') } catch(_) {} }}>🕵 Blackbox Scan</button> <button className="cbtn" onClick={() => { try { (window as any).scanAnim('sast') } catch(_) {} }}>🔬 SAST</button> <button className="cbtn" onClick={() => { try { (window as any).scanAnim('deps') } catch(_) {} }}>📦 Dependency Scan</button> <div className="canvas-tag">
    Security Pipeline
  </div>

</div>

</div>
<div className="rg-2 mt1">
  <div>
    <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
      🕵 Blackbox Scanning
    </div>
  <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
    <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px"}}>
      <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "3px"}}>
        OWASP ZAP
      </div>
    <div style={{fontSize: "11px", color: "var(--t2)"}}>
      Open-source DAST tool. Crawls the app as a black box and probes for XSS, SQLi, misconfigs, broken auth.
    </div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "3px"}}>
    Burp Suite
  </div>
<div style={{fontSize: "11px", color: "var(--t2)"}}>
  Industry-standard web security proxy. Intercepts, inspects, and replays HTTP traffic to find vulnerabilities.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "3px"}}>
    Automated CI Scanning
  </div>
<div style={{fontSize: "11px", color: "var(--t2)"}}>
  GitHub Advanced Security, Snyk, or SonarQube run on every PR to block vulnerabilities before they merge.
</div>

</div>

</div>

</div>
<div>
  <div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
    🔬 Code & Dependency Analysis
  </div>
<div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
  <div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px"}}>
    <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "3px"}}>
      ESLint Security Plugin
    </div>
  <div style={{fontSize: "11px", color: "var(--t2)"}}>
    eslint-plugin-security flags dangerous JS patterns — eval(), unsafe regex, and object injection sinks.
  </div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "3px"}}>
    npm audit / Snyk
  </div>
<div style={{fontSize: "11px", color: "var(--t2)"}}>
  Scans package.json dependencies against CVE databases. Flags and auto-fixes known vulnerabilities.
</div>

</div>
<div style={{background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px"}}>
  <div style={{fontSize: "12px", fontWeight: 600, marginBottom: "3px"}}>
    Eclipse IDE Security Tools
  </div>
<div style={{fontSize: "11px", color: "var(--t2)"}}>
  SpotBugs + FindSecBugs plugin for Java backends. Static analysis of bytecode for common OWASP vulnerabilities.
</div>

</div>

</div>

</div>

</div>
<div className="divider">

</div>
<div style={{fontSize: "13px", fontWeight: 600, marginBottom: "10px"}}>
  🔒 Essential Security Headers
</div>
<div style={{overflowX: "auto"}}>
  <table style={{width: "100%", borderCollapse: "collapse", fontSize: "12px"}}>
    <thead>
      <tr style={{background: "var(--bg)"}}>
        <th style={{textAlign: "left", padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t3)", fontWeight: 600}}>
          Header
        </th>
      <th style={{textAlign: "left", padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t3)", fontWeight: 600}}>
        Purpose
      </th>
    <th style={{textAlign: "left", padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t3)", fontWeight: 600}}>
      Recommended Value
    </th>

</tr>

</thead>
<tbody>
  <tr>
    <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", fontWeight: 500}}>
      Content-Security-Policy
    </td>
  <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
    Prevents XSS &amp; data injection
  </td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "var(--p600)"}}>
  script-src 'self'; object-src 'none'
</td>

</tr>
<tr style={{background: "var(--bg)"}}>
  <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", fontWeight: 500}}>
    Strict-Transport-Security
  </td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Forces HTTPS (HSTS)
</td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "var(--p600)"}}>
  max-age=31536000; includeSubDomains
</td>

</tr>
<tr>
  <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", fontWeight: 500}}>
    X-Frame-Options
  </td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Prevents clickjacking
</td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "var(--p600)"}}>
  DENY
</td>

</tr>
<tr style={{background: "var(--bg)"}}>
  <td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", fontWeight: 500}}>
    X-Content-Type-Options
  </td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", color: "var(--t2)"}}>
  Prevents MIME sniffing
</td>
<td style={{padding: "8px 12px", borderBottom: "1px solid var(--border)", fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "var(--p600)"}}>
  nosniff
</td>

</tr>
<tr>
  <td style={{padding: "8px 12px", color: "var(--t1)", fontWeight: 500}}>
    Permissions-Policy
  </td>
<td style={{padding: "8px 12px", color: "var(--t2)"}}>
  Limits browser feature access
</td>
<td style={{padding: "8px 12px", fontFamily: "'DM Mono',monospace", fontSize: "11px", color: "var(--p600)"}}>
  camera=(), microphone=(), geolocation=()
</td>

</tr>

</tbody>

</table>

</div>

</div>
    </>
  );
};

export default memo(SecurityPanel);
