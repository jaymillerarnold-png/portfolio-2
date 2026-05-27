/* eslint-disable */
const { useState, useMemo, useEffect, useRef } = React;

// ============================================================================
// Tokens & utilities
// ============================================================================
const T = {
  navy: "var(--timber-color-built-navy)",
  navyMuted: "var(--timber-color-built-navy-muted)",
  fgHeavy: "var(--timber-color-foreground-heavy)",
  fgBase: "var(--timber-color-foreground-base)",
  fgLight: "var(--timber-color-foreground-light)",
  fgLightest: "var(--timber-color-foreground-lightest)",
  fgInverse: "var(--timber-color-foreground-inverse)",
  fgLink: "var(--timber-color-foreground-link)",
  bgBase: "var(--timber-color-background-base)",
  bgLight: "var(--timber-color-background-light)",
  bgHeavy: "var(--timber-color-background-heavy)",
  divBase: "var(--timber-color-divider-base)",
  divLight: "var(--timber-color-divider-light)",
  divHeavy: "var(--timber-color-divider-heavy)",
  // tones
  actionLightest: "var(--timber-color-tone-action-lightest)",
  actionMedium: "var(--timber-color-tone-action-medium)",
  actionHeavy: "var(--timber-color-tone-action-heavy)",
  positiveLightest: "var(--timber-color-tone-positive-lightest)",
  positiveLight: "var(--timber-color-tone-positive-light)",
  positiveMedium: "var(--timber-color-tone-positive-medium)",
  positiveHeavy: "var(--timber-color-tone-positive-heavy)",
  negativeLightest: "var(--timber-color-tone-negative-lightest)",
  negativeLight: "var(--timber-color-tone-negative-light)",
  negativeMedium: "var(--timber-color-tone-negative-medium)",
  negativeHeavy: "var(--timber-color-tone-negative-heavy)",
  attentionLightest: "var(--timber-color-tone-attention-lightest)",
  attentionLight: "var(--timber-color-tone-attention-light)",
  attentionMedium: "var(--timber-color-tone-attention-medium)",
  attentionHeavy: "var(--timber-color-tone-attention-heavy)",
  verifyLightest: "var(--timber-color-tone-verify-lightest)",
  verifyLight: "var(--timber-color-tone-verify-light)",
  verifyMedium: "var(--timber-color-tone-verify-medium)",
  verifyHeavy: "var(--timber-color-tone-verify-heavy)",
  // ai purple (panel chrome)
  aiHeavy: "#5b32d2",
  aiMedium: "#7560e2",
  aiLight: "#ebe8fc",
  aiLightest: "#f3f1fd",
  // type
  fontPrimary: "var(--timber-font-primary)",
  fontSecondary: "var(--timber-font-secondary)",
  // radius
  rBase: "var(--timber-radius-base)",
  rLg: "var(--timber-radius-large)",
  rPill: "var(--timber-radius-pill)",
  // shadows
  shLight: "var(--timber-shadow-light)",
  shMed: "var(--timber-shadow-medium)",
};

const TONE = {
  negative: {
    bg: T.negativeLightest, border: "#fbd5d6", fg: T.negativeHeavy, accent: T.negativeMedium, icon: "fa-circle-exclamation",
  },
  attention: {
    bg: T.attentionLightest, border: "#f9e8b4", fg: T.attentionHeavy, accent: T.attentionMedium, icon: "fa-triangle-exclamation",
  },
  action: {
    bg: T.actionLightest, border: "#cfdfff", fg: T.actionHeavy, accent: T.actionMedium, icon: "fa-bolt",
  },
  positive: {
    bg: T.positiveLightest, border: "#bfe9d0", fg: T.positiveHeavy, accent: T.positiveMedium, icon: "fa-circle-check",
  },
  neutral: {
    bg: T.bgLight, border: T.divLight, fg: T.fgHeavy, accent: T.fgLight, icon: "fa-circle-info",
  },
  verify: {
    bg: T.verifyLightest, border: "#dfd8f8", fg: T.verifyHeavy, accent: T.verifyMedium, icon: "fa-sparkles",
  },
};

// ============================================================================
// Section header used between primitives in the showcase
// ============================================================================
function PrimitiveBlock({ label, name, spec, children }) {
  return (
    <div className="pb">
      <div className="pb-meta">
        <div className="pb-label">{label}</div>
        <div className="pb-name">{name}</div>
        {spec ? <div className="pb-spec">{spec}</div> : null}
      </div>
      <div className="pb-body">{children}</div>
    </div>
  );
}

// ============================================================================
// 1. CALLOUT CARD — health metric
// ============================================================================
function CalloutCard({ tone = "neutral", variant = "gradient", icon, eyebrow, title, body, meta, action }) {
  const t = TONE[tone];
  const v = variant; // classic | gradient | minimal
  const style = v === "gradient"
    ? { "--co-bg": t.bg, "--co-border": t.border, "--co-accent": t.accent, "--co-fg": t.fg }
    : v === "minimal"
    ? { "--co-accent": t.accent, "--co-fg": t.fg, "--co-bg-soft": t.bg }
    : { background: t.bg, borderColor: t.border };
  return (
    <div className={`callout callout-v-${v}`} style={style}>
      {v === "minimal" ? <div className="callout-rail" style={{ background: t.accent }}></div> : null}
      <div className="callout-icon" style={
        v === "gradient" ? { color: t.accent, background: "rgba(255,255,255,0.85)", boxShadow: `0 1px 2px rgba(0,0,0,0.06)` }
        : v === "minimal" ? { color: t.accent, background: t.bg }
        : { color: t.accent, background: "rgba(255,255,255,0.6)" }
      }>
        <i className={`fa-solid ${icon || t.icon}`}></i>
      </div>
      <div className="callout-body">
        {eyebrow ? <div className="callout-eyebrow" style={{ color: t.fg }}>{eyebrow}</div> : null}
        <div className="callout-title">{title}</div>
        {body ? <div className="callout-text">{body}</div> : null}
        {meta ? <div className="callout-meta">{meta}</div> : null}
        {action ? (
          <button className="callout-action" style={{ color: t.fg }}>
            {action} <i className="fa-solid fa-arrow-right"></i>
          </button>
        ) : null}
      </div>
    </div>
  );
}

// ============================================================================
// 2. BUTTON GROUP
// ============================================================================
function Btn({ variant = "primary", icon, iconRight, children, onClick, full, size = "md" }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${full ? "btn-full" : ""}`}
    >
      {icon ? <i className={`fa-solid ${icon}`}></i> : null}
      <span>{children}</span>
      {iconRight ? <i className={`fa-solid ${iconRight}`}></i> : null}
    </button>
  );
}

function ButtonGroup({ children, align = "start", stack }) {
  return <div className={`btn-group ${stack ? "btn-group-stack" : ""}`} style={{ justifyContent: align }}>{children}</div>;
}

// ============================================================================
// 3. PROMPT BOX — suggested next prompts
// ============================================================================
function PromptList({ title, prompts, onPick }) {
  return (
    <div className="prompt-list">
      {title ? <div className="prompt-list-title">{title}</div> : null}
      <div className="prompt-list-items">
        {prompts.map((p, i) => (
          <button key={i} className="prompt-row" onClick={() => onPick && onPick(p)}>
            <i className={`fa-regular ${p.icon || "fa-message-lines"}`}></i>
            <div className="prompt-row-body">
              <div className="prompt-row-text">{p.text}</div>
              {p.sub ? <div className="prompt-row-sub">{p.sub}</div> : null}
            </div>
            <i className="fa-solid fa-arrow-right prompt-row-arrow"></i>
          </button>
        ))}
      </div>
    </div>
  );
}

function PromptChips({ prompts, onPick }) {
  return (
    <div className="prompt-chips">
      {prompts.map((p, i) => (
        <button key={i} className="prompt-chip" onClick={() => onPick && onPick(p)}>
          {p.icon ? <i className={`fa-solid ${p.icon}`}></i> : null}
          <span>{p.text}</span>
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// 4. CHARTS
// ============================================================================
// 4a. Forecast bar chart (actuals + projection)
function ForecastBarChart({ data, height = 140 }) {
  const max = Math.max(...data.map(d => Math.max(d.actual || 0, d.forecast || 0))) * 1.1;
  const W = 360, H = height, P = { l: 36, r: 8, t: 8, b: 22 };
  const cw = W - P.l - P.r;
  const ch = H - P.t - P.b;
  const bw = cw / data.length;
  const groupW = bw * 0.7;
  const barW = groupW / 2 - 1;
  const yTicks = [0, 0.5, 1];
  const fmt = v => `$${(v / 1000).toFixed(0)}k`;

  return (
    <div className="chart-card">
      <div className="chart-head">
        <div>
          <div className="chart-title">Q3 budget vs. forecast</div>
          <div className="chart-sub">Hard costs · Riverside Phase 2</div>
        </div>
        <div className="chart-legend">
          <span className="lg lg-actual"></span>Actual
          <span className="lg lg-forecast"></span>Forecast
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="chart-svg">
        {/* gridlines */}
        {yTicks.map((t, i) => {
          const y = P.t + ch - t * ch;
          return (
            <g key={i}>
              <line x1={P.l} x2={W - P.r} y1={y} y2={y} stroke="var(--timber-color-divider-light)" />
              <text x={P.l - 6} y={y + 3} textAnchor="end" fontSize="9" fill="var(--timber-color-foreground-lightest)">
                {fmt(t * max)}
              </text>
            </g>
          );
        })}
        {/* bars */}
        {data.map((d, i) => {
          const x0 = P.l + i * bw + (bw - groupW) / 2;
          const aH = (d.actual / max) * ch;
          const fH = (d.forecast / max) * ch;
          const over = d.forecast > d.actual && d.actual > 0 ? false : d.forecast > (d.budget || Infinity);
          return (
            <g key={i}>
              <rect x={x0} y={P.t + ch - aH} width={barW} height={aH} fill="var(--timber-color-base-blue-600)" rx="1.5" />
              <rect
                x={x0 + barW + 2}
                y={P.t + ch - fH}
                width={barW}
                height={fH}
                fill={d.over ? "var(--timber-color-base-rose-500)" : "var(--timber-color-base-violet-400)"}
                rx="1.5"
                opacity="0.9"
              />
              <text x={x0 + groupW / 2} y={H - 6} textAnchor="middle" fontSize="9" fill="var(--timber-color-foreground-light)">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="chart-foot">
        <span className="chart-stat">
          <i className="fa-solid fa-arrow-trend-up" style={{ color: T.negativeMedium }}></i>
          Forecast <strong>+8.4%</strong> over budget
        </span>
      </div>
    </div>
  );
}

// 4b. Line chart — cashflow trend
function LineChart({ series, height = 120 }) {
  const W = 360, H = height, P = { l: 36, r: 10, t: 10, b: 20 };
  const cw = W - P.l - P.r, ch = H - P.t - P.b;
  const all = series.flatMap(s => s.points.map(p => p.y));
  const max = Math.max(...all) * 1.1;
  const min = Math.min(...all, 0);
  const x = i => P.l + (i / (series[0].points.length - 1)) * cw;
  const y = v => P.t + ch - ((v - min) / (max - min)) * ch;

  return (
    <div className="chart-card">
      <div className="chart-head">
        <div>
          <div className="chart-title">Draw cadence — last 6 months</div>
          <div className="chart-sub">Approved vs. requested, USD</div>
        </div>
        <div className="chart-legend">
          {series.map((s, i) => (
            <React.Fragment key={i}>
              <span className="lg" style={{ background: s.color }}></span>{s.name}
            </React.Fragment>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="chart-svg">
        {[0, 0.5, 1].map((t, i) => {
          const yy = P.t + ch - t * ch;
          return <line key={i} x1={P.l} x2={W - P.r} y1={yy} y2={yy} stroke="var(--timber-color-divider-light)" />;
        })}
        {series[0].points.map((p, i) => (
          <text key={i} x={x(i)} y={H - 4} textAnchor="middle" fontSize="9" fill="var(--timber-color-foreground-light)">
            {p.x}
          </text>
        ))}
        {series.map((s, si) => {
          const d = s.points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.y)}`).join(" ");
          const area = `${d} L${x(s.points.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
          return (
            <g key={si}>
              {si === 0 ? <path d={area} fill={s.color} opacity="0.1" /> : null}
              <path d={d} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {s.points.map((p, i) => (
                <circle key={i} cx={x(i)} cy={y(p.y)} r={i === s.points.length - 1 ? 3 : 0} fill={s.color} stroke="white" strokeWidth="1.5" />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// 4c. KPI block with sparkline
function SparklineKPI({ label, value, delta, deltaTone, points }) {
  const W = 80, H = 28;
  const max = Math.max(...points), min = Math.min(...points);
  const x = i => (i / (points.length - 1)) * W;
  const y = v => H - 2 - ((v - min) / (max - min || 1)) * (H - 4);
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p)}`).join(" ");
  const tColor = deltaTone === "negative" ? T.negativeMedium : deltaTone === "positive" ? T.positiveHeavy : T.fgLight;
  return (
    <div className="kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-row">
        <div className="kpi-value">{value}</div>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
          <path d={d} stroke={tColor} strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div className="kpi-delta" style={{ color: tColor }}>
        <i className={`fa-solid ${deltaTone === "negative" ? "fa-arrow-up" : "fa-arrow-down"}`}></i> {delta}
      </div>
    </div>
  );
}

// 4d. Donut — budget allocation
function Donut({ slices, label, sub }) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  let cum = 0;
  const R = 32, r = 22, C = 40;
  return (
    <div className="donut-card">
      <svg viewBox="0 0 80 80" width="80" height="80">
        {slices.map((s, i) => {
          const start = (cum / total) * 2 * Math.PI;
          cum += s.value;
          const end = (cum / total) * 2 * Math.PI;
          const large = end - start > Math.PI ? 1 : 0;
          const x1 = C + R * Math.sin(start), y1 = C - R * Math.cos(start);
          const x2 = C + R * Math.sin(end), y2 = C - R * Math.cos(end);
          const xi1 = C + r * Math.sin(start), yi1 = C - r * Math.cos(start);
          const xi2 = C + r * Math.sin(end), yi2 = C - r * Math.cos(end);
          return (
            <path
              key={i}
              d={`M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2} L${xi2},${yi2} A${r},${r} 0 ${large} 0 ${xi1},${yi1} Z`}
              fill={s.color}
            />
          );
        })}
      </svg>
      <div className="donut-info">
        <div className="donut-label">{label}</div>
        <div className="donut-sub">{sub}</div>
        <ul className="donut-legend">
          {slices.map((s, i) => (
            <li key={i}>
              <span className="lg" style={{ background: s.color }}></span>
              <span>{s.label}</span>
              <span className="donut-pct">{Math.round((s.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ============================================================================
// 5. CALENDAR
// ============================================================================
function MonthCalendar({ year = 2026, month = 4, events = [], selected, onSelect }) {
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const eventsByDay = {};
  events.forEach(e => { eventsByDay[e.day] = e; });

  return (
    <div className="cal">
      <div className="cal-head">
        <button className="cal-nav"><i className="fa-solid fa-chevron-left"></i></button>
        <div className="cal-title">{monthNames[month]} {year}</div>
        <button className="cal-nav"><i className="fa-solid fa-chevron-right"></i></button>
      </div>
      <div className="cal-grid cal-dow">
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} className="cal-dow-cell">{d}</div>
        ))}
      </div>
      <div className="cal-grid">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} className="cal-cell cal-cell-empty"></div>;
          const ev = eventsByDay[d];
          const isSel = selected === d;
          return (
            <button
              key={i}
              className={`cal-cell ${isSel ? "cal-cell-sel" : ""} ${ev ? `cal-cell-has-${ev.tone}` : ""}`}
              onClick={() => onSelect && onSelect(d)}
            >
              <span className="cal-day">{d}</span>
              {ev ? <span className={`cal-dot cal-dot-${ev.tone}`}></span> : null}
            </button>
          );
        })}
      </div>
      <div className="cal-legend">
        <span><span className="cal-dot cal-dot-negative"></span>Overdue</span>
        <span><span className="cal-dot cal-dot-attention"></span>Due soon</span>
        <span><span className="cal-dot cal-dot-action"></span>Scheduled</span>
      </div>
    </div>
  );
}

// 5b. Agenda / week view
function AgendaList({ items }) {
  return (
    <div className="agenda">
      {items.map((it, i) => (
        <div key={i} className="agenda-row">
          <div className="agenda-date">
            <div className="agenda-dow">{it.dow}</div>
            <div className="agenda-day">{it.day}</div>
          </div>
          <div className="agenda-bar" style={{ background: TONE[it.tone].accent }}></div>
          <div className="agenda-body">
            <div className="agenda-title">{it.title}</div>
            <div className="agenda-meta">
              <i className="fa-regular fa-clock"></i> {it.time}
              {it.loan ? <><span className="agenda-sep">·</span><i className="fa-solid fa-building-columns"></i> {it.loan}</> : null}
            </div>
          </div>
          {it.amount ? <div className="agenda-amount">{it.amount}</div> : null}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 6. BONUS PRIMITIVES
// ============================================================================
function Pill({ tone = "neutral", icon, children }) {
  const t = TONE[tone];
  return (
    <span className="pill" style={{ background: t.bg, color: t.fg, borderColor: t.border }}>
      {icon ? <i className={`fa-solid ${icon}`}></i> : null}
      {children}
    </span>
  );
}

function ProgressBar({ value, label, sub, tone = "action" }) {
  const t = TONE[tone];
  return (
    <div className="progress">
      <div className="progress-head">
        <span className="progress-label">{label}</span>
        <span className="progress-sub">{sub}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%`, background: t.accent }}></div>
      </div>
    </div>
  );
}

function ListCard({ title, items }) {
  return (
    <div className="list-card">
      {title ? <div className="list-card-title">{title}</div> : null}
      <ul className="list-card-list">
        {items.map((it, i) => (
          <li key={i} className="list-card-row">
            <div className="list-card-icon" style={{ background: TONE[it.tone || "neutral"].bg, color: TONE[it.tone || "neutral"].accent }}>
              <i className={`fa-solid ${it.icon || "fa-file-lines"}`}></i>
            </div>
            <div className="list-card-body">
              <div className="list-card-name">{it.name}</div>
              <div className="list-card-sub">{it.sub}</div>
            </div>
            {it.right ? <div className="list-card-right">{it.right}</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function KeyValue({ rows }) {
  return (
    <div className="kv">
      {rows.map((r, i) => (
        <div key={i} className="kv-row">
          <div className="kv-key">{r.key}</div>
          <div className="kv-val">{r.value}</div>
        </div>
      ))}
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="dt-wrap">
      <table className="dt">
        <thead>
          <tr>
            {columns.map((c, i) => <th key={i} style={{ textAlign: c.align || "left" }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c, j) => <td key={j} style={{ textAlign: c.align || "left" }}>{r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MessageBubble({ children, trace }) {
  return (
    <div className="msg">
      {trace ? (
        <div className="msg-head">
          <ReasoningTrace
            title={trace.title}
            duration={trace.duration}
            steps={trace.steps}
            defaultOpen={trace.defaultOpen}
          />
        </div>
      ) : null}
      <div className="msg-body">{children}</div>
    </div>
  );
}

// ============================================================================
// Reasoning trace — "Make the work visible"
// Subtle, prose-forward pattern: muted "Thought process ⌄" toggle, narrative
// body with a thin connector line, optional "Show more" expand, final Done.
// step shape: { kind: "thought"|"check"|"finding"|"flag", text, source? }
// ============================================================================
function ReasoningTrace({ title = "Thought process", duration, steps, defaultOpen = false, showMoreAfter = 3 }) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? steps : steps.slice(0, showMoreAfter);
  const hidden = steps.length - visible.length;
  const flagged = steps.some(s => s.kind === "flag");
  return (
    <div className={`rt ${open ? "rt-open" : ""}`}>
      <button className="rt-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{title}</span>
        {duration && !open ? <span className="rt-toggle-meta">· {duration}</span> : null}
        {flagged && !open ? <span className="rt-toggle-flag"><i className="fa-solid fa-circle"></i> 1 flagged</span> : null}
        <i className="fa-solid fa-chevron-down rt-toggle-chev"></i>
      </button>
      {open ? (
        <div className="rt-flow">
          <div className="rt-flow-rail">
            <span className="rt-flow-cap rt-flow-cap-top">
              <i className="fa-regular fa-clock"></i>
            </span>
            <span className="rt-flow-cap rt-flow-cap-bottom">
              <i className="fa-regular fa-circle-check"></i>
            </span>
          </div>
          <div className="rt-flow-body">
            {visible.map((s, i) => (
              <div key={i} className={`rt-line rt-line-${s.kind || "thought"}`} style={{ "--i": i }}>
                <div className="rt-line-text">{s.text}</div>
                {s.source ? <div className="rt-line-source">{s.source}</div> : null}
              </div>
            ))}
            {hidden > 0 ? (
              <button className="rt-show-more" onClick={() => setExpanded(true)}>
                Show {hidden} more
              </button>
            ) : null}
            <div className="rt-flow-done">Done{duration ? <span className="rt-flow-done-meta"> · {duration}</span> : null}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ============================================================================
// PANEL HOST — replicates user's screenshot, populated with primitives
// ============================================================================
// ============================================================================
// HISTORY PANEL — slides in over the body
// ============================================================================
// ============================================================================
// HOME VIEW — greeting + primitive showcase
// ============================================================================
function HomeView({ pickedPrompt, setPickedPrompt, selDay, setSelDay }) {
  const cashflowSeries = [
    { name: "Approved", color: "#0c66ed", points: [
      { x: "Dec", y: 1.2 }, { x: "Jan", y: 1.6 }, { x: "Feb", y: 1.4 },
      { x: "Mar", y: 2.1 }, { x: "Apr", y: 2.4 }, { x: "May", y: 2.0 },
    ]},
    { name: "Requested", color: "#7560e2", points: [
      { x: "Dec", y: 1.4 }, { x: "Jan", y: 1.8 }, { x: "Feb", y: 1.7 },
      { x: "Mar", y: 2.3 }, { x: "Apr", y: 2.7 }, { x: "May", y: 2.6 },
    ]},
  ];
  const forecastData = [
    { label: "Jul", actual: 380000, forecast: 420000 },
    { label: "Aug", actual: 410000, forecast: 460000, over: true },
    { label: "Sep", actual: 0,      forecast: 510000, over: true },
    { label: "Oct", actual: 0,      forecast: 480000 },
    { label: "Nov", actual: 0,      forecast: 390000 },
  ];
  const calendarEvents = [
    { day: 6, tone: "negative" }, { day: 9, tone: "attention" },
    { day: 14, tone: "action" }, { day: 21, tone: "action" },
    { day: 27, tone: "attention" }, { day: 30, tone: "action" },
  ];
  return (
    <div className="hview hview-home">
      <div className="greet">
        <h1>Good morning, Anakin</h1>
        <p>Here's your daily update.</p>
      </div>

      <PrimitiveBlock label="01" name="Callout cards" spec="Health metrics · 4 tones · gradient">
        <div className="stack">
          <CalloutCard variant="gradient" tone="negative" eyebrow="Needs attention"
            title="3 draws are past their target review date"
            body="Riverside Phase 2, Oak & Vine, and Highland Mills draws have been pending review for more than 5 days."
            meta="$2.4M in approvals at risk" action="Review draws" />
          <CalloutCard variant="gradient" tone="attention" icon="fa-clock" eyebrow="Action recommended"
            title="6 inspections due this week"
            body="Schedule field inspections to keep approvals on track."
            action="Open inspection queue" />
          <CalloutCard variant="gradient" tone="positive" eyebrow="On track"
            title="Q2 draw cycle closed 11% faster than Q1"
            body="Average time from request to approval dropped from 6.4 to 5.7 days." />
          <CalloutCard variant="gradient" tone="neutral" icon="fa-circle-info" eyebrow="FYI"
            title="2 new lien waivers were uploaded overnight"
            meta="From Marquez Plumbing and Vega Electric" />
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="02" name="Button groups" spec="Primary + secondary">
        <div className="stack">
          <div className="demo-card">
            <div className="demo-card-q">Approve this draw and notify the borrower?</div>
            <ButtonGroup>
              <Btn variant="primary" icon="fa-check">Approve and notify</Btn>
              <Btn variant="secondary">Review first</Btn>
            </ButtonGroup>
          </div>
          <div className="demo-card">
            <div className="demo-card-q">Three actions you can take now</div>
            <ButtonGroup>
              <Btn variant="primary" icon="fa-paper-plane">Send for review</Btn>
              <Btn variant="ghost" icon="fa-floppy-disk">Save draft</Btn>
              <Btn variant="ghost" icon="fa-xmark">Discard</Btn>
            </ButtonGroup>
          </div>
          <div className="demo-card">
            <div className="demo-card-q">Destructive needs confirmation</div>
            <ButtonGroup>
              <Btn variant="danger" icon="fa-trash">Reject draw</Btn>
              <Btn variant="secondary">Cancel</Btn>
            </ButtonGroup>
          </div>
          <div className="demo-card">
            <div className="demo-card-q">Stacked, full width — common in narrow panel</div>
            <ButtonGroup stack>
              <Btn variant="primary" full icon="fa-arrow-up-right-from-square">Open in Built</Btn>
              <Btn variant="secondary" full icon="fa-share-nodes">Share with team</Btn>
            </ButtonGroup>
          </div>
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="03" name="Prompt suggestions" spec="Lists + chips">
        <div className="stack">
          <PromptList title="Try asking"
            prompts={[
              { icon: "fa-chart-line", text: "Forecast Q4 hard costs for Riverside Phase 2", sub: "Uses budget + last 6 draws" },
              { icon: "fa-magnifying-glass-dollar", text: "Which loans are trending over budget?", sub: "Across active portfolio" },
              { icon: "fa-clipboard-list", text: "Summarize this week's inspection findings", sub: "12 inspections, 3 flagged" },
              { icon: "fa-file-invoice-dollar", text: "Draft a pay app email to Marquez Plumbing", sub: "Includes lien waiver status" },
            ]} onPick={setPickedPrompt} />
          <div className="demo-card">
            <div className="demo-card-q">Quick follow-ups (chips)</div>
            <PromptChips prompts={[
              { icon: "fa-arrow-trend-up", text: "Show variance" },
              { icon: "fa-calendar", text: "By month" },
              { icon: "fa-building", text: "By project" },
              { icon: "fa-download", text: "Export CSV" },
            ]} />
          </div>
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="04" name="Charts" spec="Forecast, trend, sparkline, donut">
        <div className="stack">
          <ForecastBarChart data={forecastData} />
          <LineChart series={cashflowSeries} />
          <div className="kpi-grid">
            <SparklineKPI label="Avg. days to approve" value="5.7" delta="0.7d" deltaTone="positive" points={[6.4, 6.2, 6.5, 6.0, 5.9, 5.7]} />
            <SparklineKPI label="Variance to budget" value="+8.4%" delta="2.1pp" deltaTone="negative" points={[3.1, 4.0, 5.2, 6.0, 7.5, 8.4]} />
            <SparklineKPI label="Open exceptions" value="14" delta="3" deltaTone="positive" points={[22, 20, 19, 17, 16, 14]} />
          </div>
          <Donut label="$8.2M committed" sub="Riverside Phase 2 · 76% of total budget"
            slices={[
              { label: "Hard costs", value: 62, color: "#0c66ed" },
              { label: "Soft costs", value: 18, color: "#7560e2" },
              { label: "Contingency", value: 12, color: "#1bc0c0" },
              { label: "Other", value: 8, color: "#a6afb9" },
            ]} />
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="05" name="Calendar" spec="Month + agenda">
        <div className="stack">
          <MonthCalendar year={2026} month={4} events={calendarEvents} selected={selDay} onSelect={setSelDay} />
          <div className="demo-card">
            <div className="demo-card-q">This week's schedule</div>
            <AgendaList items={[
              { dow: "Mon", day: 11, tone: "negative", title: "Draw #14 review — Riverside Phase 2", time: "9:00 AM", loan: "L-2241", amount: "$420,000" },
              { dow: "Wed", day: 13, tone: "attention", title: "Site inspection — Oak & Vine", time: "1:30 PM", loan: "L-1188" },
              { dow: "Thu", day: 14, tone: "action", title: "Lender sync — Highland Mills", time: "10:00 AM", loan: "L-3092" },
              { dow: "Fri", day: 15, tone: "action", title: "Pay app cutoff", time: "5:00 PM" },
            ]} />
          </div>
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="06" name="Status pills" spec="Inline tone tags">
        <div className="row-wrap">
          <Pill tone="positive" icon="fa-circle-check">Approved</Pill>
          <Pill tone="action" icon="fa-spinner">In review</Pill>
          <Pill tone="attention" icon="fa-clock">Due in 2 days</Pill>
          <Pill tone="negative" icon="fa-circle-exclamation">Overdue</Pill>
          <Pill tone="verify" icon="fa-sparkles">AI suggested</Pill>
          <Pill tone="neutral" icon="fa-file-lines">Draft</Pill>
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="07" name="Progress" spec="Linear, single + grouped">
        <div className="stack">
          <div className="demo-card">
            <ProgressBar label="Draw #14 readiness" sub="8 of 11 items complete" value={73} tone="action" />
          </div>
          <div className="demo-card">
            <div className="demo-card-q">Pre-funding checklist</div>
            <div className="stack-tight">
              <ProgressBar label="Lien waivers" sub="5 / 7" value={71} tone="positive" />
              <ProgressBar label="Inspections" sub="2 / 4" value={50} tone="attention" />
              <ProgressBar label="Title update" sub="0 / 1" value={0} tone="negative" />
            </div>
          </div>
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="08" name="List card" spec="Sources / files / line items">
        <ListCard title="Sources used in this answer"
          items={[
            { icon: "fa-file-pdf", tone: "negative", name: "Riverside Phase 2 — Budget v3.2", sub: "PDF · updated 2 days ago", right: <i className="fa-solid fa-arrow-up-right-from-square"></i> },
            { icon: "fa-file-excel", tone: "positive", name: "Draws ledger — Q3", sub: "Excel · 14 sheets", right: <i className="fa-solid fa-arrow-up-right-from-square"></i> },
            { icon: "fa-file-contract", tone: "action", name: "Contractor agreement — Marquez", sub: "Signed 03/14/2026", right: <i className="fa-solid fa-arrow-up-right-from-square"></i> },
          ]} />
      </PrimitiveBlock>

      <PrimitiveBlock label="09" name="Key-value summary" spec="Loan / draw / project facts">
        <div className="demo-card">
          <div className="demo-card-q">Loan summary · L-2241</div>
          <KeyValue rows={[
            { key: "Borrower", value: "Riverside Holdings, LLC" },
            { key: "Loan amount", value: "$24,500,000" },
            { key: "Drawn to date", value: "$18,620,000" },
            { key: "Remaining", value: "$5,880,000" },
            { key: "Interest reserve", value: "$420,000" },
            { key: "Maturity", value: "Aug 14, 2027" },
          ]} />
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="10" name="Mini table" spec="Compact tabular results">
        <DataTable columns={[
            { key: "loan", label: "Loan" },
            { key: "stage", label: "Stage" },
            { key: "var", label: "Variance", align: "right" },
            { key: "due", label: "Next", align: "right" },
          ]} rows={[
            { loan: "Riverside Phase 2", stage: <Pill tone="negative" icon="fa-circle-exclamation">Over</Pill>, var: "+12.4%", due: "Tue" },
            { loan: "Oak & Vine", stage: <Pill tone="attention" icon="fa-clock">Watch</Pill>, var: "+3.1%", due: "Wed" },
            { loan: "Highland Mills", stage: <Pill tone="positive" icon="fa-circle-check">On track</Pill>, var: "−1.2%", due: "Thu" },
            { loan: "Cedar Point", stage: <Pill tone="positive" icon="fa-circle-check">On track</Pill>, var: "−0.4%", due: "Fri" },
          ]} />
      </PrimitiveBlock>

      <PrimitiveBlock label="11" name="Reasoning trace" spec="Make the work visible">
        <div className="stack">
          <ReasoningTrace
            title="Thought process"
            duration="4.2s"
            defaultOpen={true}
            steps={[
              { kind: "thought", text: <>The user is asking whether <strong>Riverside Phase 2</strong> is on track for its Q3 budget. Need to compare current actuals against the approved plan and look for unsupported line items.</> },
              { kind: "check", text: "Pulled current actuals from L-2241 — $22.4M committed across 142 line items.", source: "Loan ledger · synced 8 min ago" },
              { kind: "check", text: "Cross-checked against 12 contractor invoices. Amounts match." },
              { kind: "finding", text: <>Hard costs are running <strong>8.4% over</strong> approved Q3 budget, driven by concrete and rough framing.</> },
              { kind: "flag", text: <>Two line items missing supporting receipts: concrete pour 04/22 (<strong>$184k</strong>) and rough framing 04/28 (<strong>$96k</strong>).</>, source: "Draw package #7" },
              { kind: "thought", text: "Variance is under 10%, so no owner approval is required — but the missing receipts should surface as a follow-up before the next draw." },
            ]}
          />
          <ReasoningTrace
            title="Thought process"
            duration="1.8s"
            steps={[
              { kind: "check", text: "Updated borrower address on the loan record." },
              { kind: "check", text: "Recalculated monthly P&I with the new principal balance." },
              { kind: "check", text: "Applied the 2026 property-tax escrow schedule." },
            ]}
          />
        </div>
      </PrimitiveBlock>

      <PrimitiveBlock label="12" name="Assistant message" spec="Wraps any primitive">
        <MessageBubble
          trace={{
            title: "Thought process",
            duration: "4.2s",
            steps: [
              { kind: "thought", text: "Pulled Q3 hard-cost actuals for Riverside Phase 2 and compared against the approved budget." },
              { kind: "check",   text: "Cross-referenced concrete and rough-framing line items across the last 4 draws." },
              { kind: "finding", text: "Spend is pacing 8.4% above plan; concrete alone is +12% over, framing +6%." },
              { kind: "flag",    text: "Forecast assumes pace holds — variance widens if labor stays at current rate.", source: "Cost-to-date · Draw 4" },
            ],
          }}
        >
          <p>Riverside Phase 2 is trending <strong>8.4% over</strong> its Q3 hard-cost budget, driven by concrete and rough framing. Forecast assumes current pace holds.</p>
          <ForecastBarChart data={forecastData} />
          <ButtonGroup>
            <Btn variant="primary" icon="fa-flag">Flag for lender review</Btn>
            <Btn variant="ghost" icon="fa-arrows-rotate">Re-run forecast</Btn>
          </ButtonGroup>
        </MessageBubble>
      </PrimitiveBlock>

      <div className="end-spacer"></div>
    </div>
  );
}

// ============================================================================
// HISTORY DATA
// ============================================================================
const HISTORY_GROUPS = [
  {
    label: "Today",
    items: [
      { id: "h1",
        title: "Q3 hard-cost variance — Riverside Phase 2",
        preview: "Forecast is 8.4% over budget, driven by concrete…",
        time: "9:42 AM",
        primitives: ["Forecast chart", "Callout"],
        messages: [
          { role: "user", time: "9:38 AM", text: "Is Riverside Phase 2 on track for its Q3 hard-cost budget?" },
          { role: "assistant", time: "9:38 AM", parts: [
            { kind: "trace", title: "Thought process", duration: "4.2s", defaultOpen: false, steps: [
              { kind: "thought", text: "Need to compare current actuals against the approved Q3 plan and look for unsupported line items." },
              { kind: "check", text: "Pulled current actuals from L-2241 — $22.4M committed across 142 line items.", source: "Loan ledger · synced 8 min ago" },
              { kind: "check", text: "Cross-checked against 12 contractor invoices. Amounts match." },
              { kind: "finding", text: <>Hard costs are running <strong>8.4% over</strong> approved Q3 budget, driven by concrete and rough framing.</> },
              { kind: "flag", text: <>Two line items missing supporting receipts: concrete pour 04/22 (<strong>$184k</strong>) and rough framing 04/28 (<strong>$96k</strong>).</>, source: "Draw package #7" },
            ] },
            { kind: "p", text: <>Riverside Phase 2 is trending <strong>8.4% over</strong> its Q3 hard-cost budget, driven by concrete and rough framing. Forecast assumes current pace holds.</> },
            { kind: "forecastChart" },
            { kind: "callout", tone: "attention", eyebrow: "Action recommended", title: "2 line items need supporting receipts", body: "Concrete pour 04/22 and rough framing 04/28 are missing receipts before the next draw can clear." },
          ]},
          { role: "user", time: "9:41 AM", text: "What's the variance month by month?" },
          { role: "assistant", time: "9:42 AM", parts: [
            { kind: "p", text: "Here's the monthly cashflow — approved vs requested across the last six months." },
            { kind: "lineChart" },
            { kind: "chips", prompts: [
              { icon: "fa-arrow-trend-up", text: "Show variance" },
              { icon: "fa-calendar", text: "By line item" },
              { kind: "fa-file-export", text: "Export" },
            ]},
          ]},
        ],
      },
      { id: "h2",
        title: "Draft pay app email — Marquez Plumbing",
        preview: "Drafted with lien waiver status and pending items.",
        time: "8:15 AM",
        primitives: ["Message", "Buttons"],
        messages: [
          { role: "user", time: "8:12 AM", text: "Draft a pay app email to Marquez Plumbing — include lien waiver status and what's still pending." },
          { role: "assistant", time: "8:13 AM", parts: [
            { kind: "p", text: "Here's a draft. Tone is direct, references Draw #14 and the two outstanding items." },
            { kind: "kv", rows: [
              { key: "To", value: "ap@marquezplumbing.com" },
              { key: "Subject", value: "Pay app — Riverside Phase 2 · Draw #14" },
              { key: "Reference", value: "L-2241 · Marquez (sub #4)" },
            ]},
            { kind: "p", text: <>Hi Tony — Pay application for Draw #14 on Riverside Phase 2 is in review. Lien waivers <strong>received for $184k</strong>; we're still missing the conditional waiver for the 04/22 pour and final waiver for 04/28 framing. Please send those before EOD Wednesday so we can release funds with this cycle.</> },
            { kind: "buttons", actions: [
              { label: "Send draft", icon: "fa-paper-plane", variant: "primary" },
              { label: "Edit", icon: "fa-pen", variant: "secondary" },
              { label: "Discard", icon: "fa-xmark", variant: "ghost" },
            ]},
          ]},
        ],
      },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { id: "h3",
        title: "Inspection findings summary",
        preview: "12 inspections, 3 flagged for follow-up.",
        time: "4:18 PM",
        primitives: ["List card", "Pills"],
        messages: [
          { role: "user", time: "4:15 PM", text: "Summarize this week's inspection findings." },
          { role: "assistant", time: "4:18 PM", parts: [
            { kind: "p", text: <>This week's inspections covered 12 active draws. <strong>3 flagged</strong> for follow-up — all on Riverside Phase 2 and Oak & Vine.</> },
            { kind: "list", title: "Findings requiring follow-up", items: [
              { icon: "fa-circle-exclamation", tone: "negative", name: "Riverside — Concrete cure failed slump test", sub: "04/22 · Re-pour scheduled" },
              { icon: "fa-triangle-exclamation", tone: "attention", name: "Oak & Vine — Framing depth out of spec", sub: "Section 3B · 1\" short" },
              { icon: "fa-triangle-exclamation", tone: "attention", name: "Riverside — MEP rough-in incomplete", sub: "2nd floor · 70% complete" },
            ]},
            { kind: "pills", items: [
              { tone: "negative", icon: "fa-circle-exclamation", text: "1 critical" },
              { tone: "attention", icon: "fa-clock", text: "2 watch" },
              { tone: "positive", icon: "fa-circle-check", text: "9 cleared" },
            ]},
          ]},
        ],
      },
      { id: "h4",
        title: "Loans trending over budget",
        preview: "2 of 14 active loans projected over by >5%.",
        time: "1:02 PM",
        primitives: ["Table", "Pills"],
        messages: [
          { role: "user", time: "1:00 PM", text: "Which active loans are trending over budget?" },
          { role: "assistant", time: "1:02 PM", parts: [
            { kind: "p", text: <>Two of 14 active loans are projected to land more than 5% over their approved budget at current pace.</> },
            { kind: "table" },
          ]},
        ],
      },
      { id: "h5",
        title: "Schedule lender sync — Highland Mills",
        preview: "Proposed times for Thursday and Friday.",
        time: "10:47 AM",
        primitives: ["Calendar"],
        messages: [
          { role: "user", time: "10:45 AM", text: "Find a time this week for a lender sync on Highland Mills." },
          { role: "assistant", time: "10:47 AM", parts: [
            { kind: "p", text: "Here are open windows on Thursday and Friday. The marked days have existing draw deadlines, so I'd lean toward Thursday afternoon." },
            { kind: "buttons", actions: [
              { label: "Send calendar invite", icon: "fa-paper-plane", variant: "primary" },
              { label: "Pick a different day", icon: "fa-calendar", variant: "ghost" },
            ]},
          ]},
        ],
      },
    ],
  },
  {
    label: "Last week",
    items: [
      { id: "h6",
        title: "Q2 close-out comparison",
        preview: "Q2 closed 11% faster than Q1; cycle time down to 5.7 days.",
        time: "Mon 3:21 PM",
        primitives: ["KPI", "Line chart"],
        messages: [
          { role: "user", time: "Mon 3:20 PM", text: "How did Q2 close-out compare to Q1?" },
          { role: "assistant", time: "Mon 3:21 PM", parts: [
            { kind: "p", text: <>Q2 closed <strong>11% faster</strong> than Q1. Average request-to-approval time dropped from 6.4 to 5.7 days.</> },
            { kind: "kpi" },
          ]},
        ],
      },
      { id: "h7",
        title: "Cedar Point — initial budget review",
        preview: "Budget aligned to scope; no immediate concerns.",
        time: "Mon 11:08 AM",
        primitives: ["Key-value", "Callout"],
        messages: [
          { role: "user", time: "Mon 11:06 AM", text: "Review the Cedar Point initial budget — flag anything off." },
          { role: "assistant", time: "Mon 11:08 AM", parts: [
            { kind: "p", text: "Cedar Point's initial budget aligns with scope. Hard-cost contingency is at 7.2%, slightly above your portfolio average but appropriate for a ground-up project." },
            { kind: "kv", rows: [
              { key: "Borrower", value: "Cedar Holdings, LLC" },
              { key: "Loan amount", value: "$18,200,000" },
              { key: "Hard-cost contingency", value: "7.2%" },
              { key: "Soft-cost contingency", value: "4.0%" },
              { key: "Term", value: "30 months" },
            ]},
            { kind: "callout", tone: "positive", eyebrow: "Aligned", title: "No immediate concerns flagged", body: "Budget structure matches similar-scale projects in your portfolio." },
          ]},
        ],
      },
      { id: "h8",
        title: "Lien waiver status — all active loans",
        preview: "Outstanding waivers on Riverside Phase 2 and Oak & Vine.",
        time: "Sun 2:14 PM",
        primitives: ["Progress", "List"],
        messages: [
          { role: "user", time: "Sun 2:12 PM", text: "Where do we stand on lien waivers across all active loans?" },
          { role: "assistant", time: "Sun 2:14 PM", parts: [
            { kind: "p", text: "Two loans have outstanding waivers blocking their next draw." },
            { kind: "progressGroup" },
          ]},
        ],
      },
    ],
  },
];

function HistoryList({ onOpenThread, onBack }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return HISTORY_GROUPS;
    const q = query.toLowerCase();
    return HISTORY_GROUPS
      .map(g => ({ ...g, items: g.items.filter(it => (it.title + it.preview).toLowerCase().includes(q)) }))
      .filter(g => g.items.length > 0);
  }, [query]);

  return (
    <div className="hview hview-history">
      <div className="hview-head">
        <div className="hview-h-wrap">
          <button className="hview-back" aria-label="Back" onClick={onBack}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className="hview-h">Chat history</h2>
        </div>
        <button className="hview-new" aria-label="New chat">
          <i className="fa-solid fa-pen-to-square"></i>
          <span>New</span>
        </button>
      </div>
      <div className="hist-search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          placeholder="Search chats"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query ? (
          <button className="hist-clear" onClick={() => setQuery("")} aria-label="Clear">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ) : null}
      </div>
      <div className="hview-scroll">
        {filtered.length === 0 ? (
          <div className="hist-empty">
            <i className="fa-thin fa-comments"></i>
            <div>No chats match "{query}"</div>
          </div>
        ) : (
          filtered.map((g, gi) => (
            <div key={gi} className="hist-group" style={{ "--i": gi }}>
              <div className="hist-group-label">{g.label}</div>
              <ul className="hist-list">
                {g.items.map((it, ii) => (
                  <li key={it.id} style={{ "--i": gi * 4 + ii }}>
                    <button className="hist-row" onClick={() => onOpenThread(it)}>
                      <div className="hist-row-head">
                        <div className="hist-row-title">{it.title}</div>
                        <div className="hist-row-time">{it.time}</div>
                      </div>
                      <div className="hist-row-preview">{it.preview}</div>
                      <div className="hist-row-tags">
                        {it.primitives.map((p, pi) => (
                          <span key={pi} className="hist-tag">{p}</span>
                        ))}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Shared sample data used by transcript primitives
const THREAD_FORECAST = [
  { label: "Jul", actual: 380000, forecast: 420000 },
  { label: "Aug", actual: 410000, forecast: 460000, over: true },
  { label: "Sep", actual: 0, forecast: 510000, over: true, projected: true },
];
const THREAD_CASHFLOW = [
  { name: "Approved", color: "#0c66ed", points: [
    { x: "Dec", y: 1.2 }, { x: "Jan", y: 1.6 }, { x: "Feb", y: 1.4 },
    { x: "Mar", y: 1.9 }, { x: "Apr", y: 2.1 }, { x: "May", y: 2.4 },
  ]},
  { name: "Requested", color: "#86888c", dashed: true, points: [
    { x: "Dec", y: 1.4 }, { x: "Jan", y: 1.8 }, { x: "Feb", y: 1.6 },
    { x: "Mar", y: 2.2 }, { x: "Apr", y: 2.5 }, { x: "May", y: 2.8 },
  ]},
];

function TranscriptPart({ part }) {
  switch (part.kind) {
    case "p":
      return <p style={{ margin: "0 0 8px 0" }}>{part.text}</p>;
    case "trace":
      return <ReasoningTrace title={part.title} duration={part.duration} steps={part.steps} defaultOpen={part.defaultOpen} />;
    case "forecastChart":
      return <ForecastBarChart data={THREAD_FORECAST} />;
    case "lineChart":
      return <LineChart series={THREAD_CASHFLOW} />;
    case "callout":
      return <CalloutCard tone={part.tone} eyebrow={part.eyebrow} title={part.title} body={part.body} icon={part.icon} meta={part.meta} />;
    case "kv":
      return <KeyValue rows={part.rows} />;
    case "list":
      return <ListCard title={part.title} items={part.items} />;
    case "pills":
      return (
        <div className="row-wrap">
          {part.items.map((p, i) => <Pill key={i} tone={p.tone} icon={p.icon}>{p.text}</Pill>)}
        </div>
      );
    case "buttons":
      return (
        <ButtonGroup>
          {part.actions.map((a, i) => <Btn key={i} variant={a.variant} icon={a.icon}>{a.label}</Btn>)}
        </ButtonGroup>
      );
    case "chips":
      return <PromptChips prompts={part.prompts} />;
    case "table":
      return (
        <DataTable columns={[
          { key: "loan", label: "Loan" },
          { key: "stage", label: "Stage" },
          { key: "var", label: "Var", align: "right" },
          { key: "due", label: "Next", align: "right" },
        ]} rows={[
          { loan: "Riverside Phase 2", stage: <Pill tone="negative" icon="fa-circle-exclamation">Over</Pill>, var: "+12.4%", due: "Tue" },
          { loan: "Oak & Vine", stage: <Pill tone="attention" icon="fa-clock">Watch</Pill>, var: "+6.1%", due: "Wed" },
          { loan: "Highland Mills", stage: <Pill tone="positive" icon="fa-circle-check">On track</Pill>, var: "−1.2%", due: "Thu" },
        ]} />
      );
    case "kpi":
      return (
        <div className="kpi-grid">
          <SparklineKPI label="Avg. days to approve" value="5.7" delta="0.7d" deltaTone="positive" points={[6.4, 6.2, 6.5, 6.0, 5.9, 5.7]} />
          <SparklineKPI label="Cycles closed" value="32" delta="11%" deltaTone="positive" points={[24, 26, 28, 29, 30, 32]} />
          <SparklineKPI label="Exceptions" value="14" delta="3" deltaTone="positive" points={[22, 20, 19, 17, 16, 14]} />
        </div>
      );
    case "progressGroup":
      return (
        <div className="stack-tight">
          <ProgressBar label="Riverside Phase 2" sub="5 / 7 received" value={71} tone="attention" />
          <ProgressBar label="Oak & Vine" sub="3 / 6 received" value={50} tone="negative" />
          <ProgressBar label="Highland Mills" sub="6 / 6 received" value={100} tone="positive" />
          <ProgressBar label="Cedar Point" sub="4 / 4 received" value={100} tone="positive" />
        </div>
      );
    default:
      return null;
  }
}

function ThreadView({ thread, onBack }) {
  const scrollRef = useRef(null);
  // Auto-scroll to bottom when opening a thread so the latest reply is visible
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thread && thread.id]);

  if (!thread) return null;
  const messages = thread.messages || [
    { role: "user", time: thread.time, text: thread.title },
    { role: "assistant", time: thread.time, parts: [{ kind: "p", text: thread.preview }] },
  ];
  return (
    <div className="hview hview-thread">
      <div className="hview-head">
        <button className="hview-crumb" onClick={onBack}>
          <i className="fa-solid fa-chevron-left"></i>
          <span>History</span>
        </button>
        <div className="hview-thread-title-wrap">
          <div className="hview-thread-title">{thread.title}</div>
          <div className="hview-thread-sub">
            <i className="fa-regular fa-clock"></i> {thread.time}
          </div>
        </div>
        <button className="hview-new" aria-label="More">
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>
      <div className="hview-scroll thread-body" ref={scrollRef}>
        {messages.map((m, i) => (
          m.role === "user" ? (
            <div key={i} className="thread-msg thread-msg-user">
              <div className="thread-bubble thread-bubble-user">{m.text}</div>
              {m.time ? <div className="thread-msg-time">{m.time}</div> : null}
            </div>
          ) : (
            <div key={i} className="thread-msg thread-msg-asst">
              <MessageBubble>
                {(m.parts || []).map((p, j) => <TranscriptPart key={j} part={p} />)}
              </MessageBubble>
              {m.time ? <div className="thread-msg-time thread-msg-time-asst">{m.time}</div> : null}
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function AssistPanel() {
  const [pickedPrompt, setPickedPrompt] = useState(null);
  const [selDay, setSelDay] = useState(14);
  const [composerText, setComposerText] = useState("");
  const [attachments, setAttachments] = useState([]); // [{name, size, type}]
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const attachMenuRef = useRef(null);
  const [view, setView] = useState("home"); // "home" | "history" | "thread"
  const [activeThread, setActiveThread] = useState(null);
  const [direction, setDirection] = useState("forward"); // for crossfade direction
  const composerRef = useRef(null);
  const scrollRef = useRef(null);

  // panel width — adjustable based on context (drag handle + header expand)
  const PANEL_MIN = 360;
  const PANEL_MAX = 720;
  const [panelWidth, setPanelWidth] = useState(440);
  const [resizing, setResizing] = useState(false);
  const [showWidthHint, setShowWidthHint] = useState(false);
  const widthMode = panelWidth < 400 ? "compact" : panelWidth < 500 ? "standard" : panelWidth < 620 ? "wide" : "full";

  const startResize = (e) => {
    e.preventDefault();
    setResizing(true);
    const startX = e.clientX;
    const startW = panelWidth;
    const onMove = (ev) => {
      const dx = startX - ev.clientX; // dragging left grows panel
      const next = Math.max(PANEL_MIN, Math.min(PANEL_MAX, startW + dx));
      setPanelWidth(next);
      setShowWidthHint(true);
    };
    const onUp = () => {
      setResizing(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      setTimeout(() => setShowWidthHint(false), 700);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const cycleWidth = () => {
    // cycle: standard 440 → wide 560 → compact 380 → standard 440
    setPanelWidth((w) => (w < 460 ? (w < 400 ? 440 : 560) : 380));
    setShowWidthHint(true);
    setTimeout(() => setShowWidthHint(false), 900);
  };

  // when a prompt is picked, drop it into the composer
  useEffect(() => {
    if (pickedPrompt) {
      setComposerText(pickedPrompt.text);
      if (composerRef.current) composerRef.current.focus();
    }
  }, [pickedPrompt]);

  // scroll body to top on view change so transitions feel intentional
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [view, activeThread]);

  const hasText = composerText.trim().length > 0;
  const hasAttachments = attachments.length > 0;
  const canSend = hasText || hasAttachments;

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // close attach menu on outside click / escape
  useEffect(() => {
    if (!attachMenuOpen) return;
    const onDown = (e) => {
      if (attachMenuRef.current && !attachMenuRef.current.contains(e.target)) {
        setAttachMenuOpen(false);
      }
    };
    const onKey = (e) => { if (e.key === "Escape") setAttachMenuOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [attachMenuOpen]);
  const onFilesPicked = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const next = files.map((f) => ({ name: f.name, size: f.size, type: f.type }));
    setAttachments((prev) => [...prev, ...next].slice(0, 6));
    e.target.value = ""; // allow re-pick same file
  };
  const removeAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };
  const fileIcon = (att) => {
    const n = att.name.toLowerCase();
    const t = att.type || "";
    if (t.startsWith("image/")) return "fa-file-image";
    if (n.endsWith(".pdf")) return "fa-file-pdf";
    if (n.match(/\.(xlsx|xls|csv)$/)) return "fa-file-spreadsheet";
    if (n.match(/\.(docx|doc)$/)) return "fa-file-word";
    if (n.match(/\.(zip|rar|7z)$/)) return "fa-file-zipper";
    return "fa-file-lines";
  };
  const formatSize = (b) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
    return `${(b / 1024 / 1024).toFixed(1)} MB`;
  };

  const goHistory = () => { setDirection("forward"); setView("history"); setActiveThread(null); };
  const goHome = () => { setDirection("back"); setView("home"); setActiveThread(null); };
  const goThread = (t) => { setDirection("forward"); setActiveThread(t); setView("thread"); };
  const backFromThread = () => { setDirection("back"); setView("history"); setActiveThread(null); };

  const isOnHome = view === "home";
  const headerLeftAction = isOnHome
    ? null
    : view === "history" ? goHome : backFromThread;

  const cashflowSeries = [
    { name: "Approved", color: "#0c66ed", points: [
      { x: "Dec", y: 1.2 }, { x: "Jan", y: 1.6 }, { x: "Feb", y: 1.4 },
      { x: "Mar", y: 2.1 }, { x: "Apr", y: 2.4 }, { x: "May", y: 2.0 },
    ]},
    { name: "Requested", color: "#7560e2", points: [
      { x: "Dec", y: 1.4 }, { x: "Jan", y: 1.8 }, { x: "Feb", y: 1.7 },
      { x: "Mar", y: 2.3 }, { x: "Apr", y: 2.7 }, { x: "May", y: 2.6 },
    ]},
  ];

  const forecastData = [
    { label: "Jul", actual: 380000, forecast: 420000 },
    { label: "Aug", actual: 410000, forecast: 460000, over: true },
    { label: "Sep", actual: 0,      forecast: 510000, over: true },
    { label: "Oct", actual: 0,      forecast: 480000 },
    { label: "Nov", actual: 0,      forecast: 390000 },
  ];

  const calendarEvents = [
    { day: 6, tone: "negative" },
    { day: 9, tone: "attention" },
    { day: 14, tone: "action" },
    { day: 14, tone: "action" },
    { day: 21, tone: "action" },
    { day: 27, tone: "attention" },
    { day: 30, tone: "action" },
  ];

  return (
    <div
      className={`panel ${resizing ? "panel-resizing" : ""} panel-width-${widthMode}`}
      style={{ width: panelWidth }}
    >
      {/* drag-to-resize handle on the left edge */}
      <div
        className="panel-resize-handle"
        onMouseDown={startResize}
        title="Drag to resize"
      >
        <span className="panel-resize-grip"></span>
      </div>
      {showWidthHint ? (
        <div className="panel-width-hint">
          <i className="fa-solid fa-arrows-left-right"></i>
          {panelWidth}px · {widthMode}
        </div>
      ) : null}

      {/* ------------- panel chrome (matches screenshot) ------------- */}
      <header className="panel-head">
        <div className="panel-head-l">
          <div className="panel-spark"><i className="fa-solid fa-sparkles"></i></div>
          <div className="panel-name">Built Assistant</div>
        </div>
        <div className="panel-head-r">
          <span className="panel-icon-tip" data-tip="Chat history">
            <button
              className={`panel-icon ${!isOnHome ? "panel-icon-active" : ""}`}
              aria-label="Chat history"
              aria-pressed={!isOnHome}
              onClick={isOnHome ? goHistory : headerLeftAction}
            >
              <i className="fa-regular fa-clock-rotate-left"></i>
            </button>
          </span>
          <button className="panel-icon" aria-label="Close"><i className="fa-solid fa-xmark"></i></button>
        </div>
      </header>

      {/* ------------- body: views crossfade in place ------------- */}
      <div className="panel-body" ref={scrollRef}>
        <div className={`view-stack view-${view} view-dir-${direction}`}>
          {view === "home" ? <HomeView
            pickedPrompt={pickedPrompt} setPickedPrompt={setPickedPrompt}
            selDay={selDay} setSelDay={setSelDay}
          /> : null}
          {view === "history" ? <HistoryList onOpenThread={goThread} onBack={headerLeftAction} /> : null}
          {view === "thread" ? <ThreadView thread={activeThread} onBack={backFromThread} /> : null}
        </div>
      </div>


      {/* ------------- composer (sticky bottom, matches screenshot) ------------- */}
      <footer className="composer">
        <div className={`composer-inner ${canSend ? "composer-inner-active" : ""}`}>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={onFilesPicked}
          />
          {hasAttachments ? (
            <div className="composer-attachments">
              {attachments.map((att, i) => (
                <div className="composer-chip" key={i} title={att.name}>
                  <span className="composer-chip-icon"><i className={`fa-solid ${fileIcon(att)}`}></i></span>
                  <span className="composer-chip-meta">
                    <span className="composer-chip-name">{att.name}</span>
                    <span className="composer-chip-size">{formatSize(att.size)}</span>
                  </span>
                  <button
                    className="composer-chip-remove"
                    aria-label={`Remove ${att.name}`}
                    onClick={() => removeAttachment(i)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          <textarea
            ref={composerRef}
            className="composer-input"
            placeholder="Ask anything…"
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            onClick={(e) => {
              // If textarea is empty and the user clicks the placeholder area, surface attach affordance
              // (do not auto-open picker — that would block typing)
            }}
            rows={1}
          />
          <div className="composer-row">
            <div className="composer-add-wrap" ref={attachMenuRef}>
              <button
                className={`composer-add ${attachMenuOpen ? "composer-add-open" : ""}`}
                aria-label="Add attachment"
                aria-haspopup="menu"
                aria-expanded={attachMenuOpen}
                onClick={() => setAttachMenuOpen((v) => !v)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              {attachMenuOpen ? (
                <div className="attach-menu" role="menu">
                  <button
                    className="attach-menu-item"
                    role="menuitem"
                    onClick={() => { setAttachMenuOpen(false); openFilePicker(); }}
                  >
                    <span className="attach-menu-icon attach-menu-icon-upload">
                      <i className="fa-solid fa-file-arrow-up"></i>
                    </span>
                    <span className="attach-menu-text">
                      <span className="attach-menu-title">Upload from this device</span>
                      <span className="attach-menu-sub">PDF, DOCX, XLSX up to 50 MB</span>
                    </span>
                  </button>
                  <button
                    className="attach-menu-item"
                    role="menuitem"
                    onClick={() => setAttachMenuOpen(false)}
                  >
                    <span className="attach-menu-icon attach-menu-icon-deal">
                      <i className="fa-solid fa-folder-open"></i>
                    </span>
                    <span className="attach-menu-text">
                      <span className="attach-menu-title">From a deal in Built</span>
                      <span className="attach-menu-sub">Pick from any active deal</span>
                    </span>
                  </button>
                  <button
                    className="attach-menu-item"
                    role="menuitem"
                    onClick={() => setAttachMenuOpen(false)}
                  >
                    <span className="attach-menu-icon attach-menu-icon-link">
                      <i className="fa-solid fa-link"></i>
                    </span>
                    <span className="attach-menu-text">
                      <span className="attach-menu-title">Paste link or import</span>
                      <span className="attach-menu-sub">Box, SharePoint, Google Drive</span>
                    </span>
                  </button>
                </div>
              ) : null}
            </div>
            <div className="composer-spacer"></div>
            <button
              className={`composer-send ${canSend ? "composer-send-active" : ""}`}
              aria-label="Send"
              disabled={!canSend}
              onClick={() => { setComposerText(""); setAttachments([]); }}
            >
              {canSend ? <span className="composer-send-label">Send</span> : null}
              <i className="fa-solid fa-paper-plane-top"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// MOUNT
// ============================================================================
ReactDOM.createRoot(document.getElementById("root")).render(<AssistPanel />);
