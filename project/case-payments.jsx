// case-payments.jsx — Dedicated layout for the Payment Improvements case study.
// Re-uses the editorial visual language (hero, chrome, footer, type, accent)
// but reorganises the body into two mini case-studies, each with its own
// before/after comparison.

const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;

function CasePayments({ study, all, mode, setMode, density, heroVariant }) {
  const D = densityScaleP(density);
  const improvements = study.improvements || [];

  // Sticky nav: intro, one entry per improvement, throughline, outcomes.
  const sections = [
    { id: "intro",       label: "The Approach" },
    ...improvements.map((imp, i) => ({
      id: `imp-${imp.slug}`,
      label: imp.name,
      index: i + 1,
    })),
    { id: "throughline", label: "Throughline" },
    { id: "outcomes",    label: "Outcomes" },
  ];
  const [active, setActive] = useStateP("intro");

  useEffectP(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(`pay-${s.id}-${study.slug}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [study.slug, improvements.length]);

  const nextIdx = (Object.keys(all).indexOf(study.slug) + 1) % Object.keys(all).length;
  const next = all[Object.keys(all)[nextIdx]];

  return (
    <article
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--sans)",
      }}
    >
      <PortfolioChrome />

      {/* HERO — reuse the editorial hero variants for visual continuity */}
      <HeroP study={study} variant={heroVariant} D={D} improvements={improvements} />

      {/* MAIN — sticky side nav + body, identical scaffold to CaseEditorial */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: D.gap,
          maxWidth: 1240,
          margin: "0 auto",
          padding: `0 ${D.padX}px`,
        }}
      >
        {/* Sticky nav */}
        <aside
          style={{
            position: "sticky",
            top: 80,
            alignSelf: "start",
            paddingTop: D.sectionY,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ marginBottom: 8 }}>
              <ViewToggle value={mode} onChange={setMode} density={density} />
            </div>
            <Eyebrow>Contents</Eyebrow>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {sections.map((s, i) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#pay-${s.id}-${study.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "6px 0",
                        color: isActive ? "var(--fg)" : "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        fontSize: 13,
                        transition: "color var(--t-fast)",
                      }}
                    >
                      <span
                        style={{
                          width: isActive ? 18 : 8,
                          height: 1,
                          background: isActive ? "var(--accent)" : "rgba(255,255,255,0.2)",
                          transition: "width var(--t-med), background var(--t-fast)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")} {s.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* BODY */}
        <main style={{ display: "flex", flexDirection: "column", gap: D.sectionY * 1.4 }}>
          {/* INTRO — overall approach */}
          <section
            id={`pay-intro-${study.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: 28, scrollMarginTop: 80 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Eyebrow index={1}>{`/ ${String(sections.length).padStart(2, "0")}`}</Eyebrow>
              <h2
                style={{
                  fontSize: D.h2,
                  margin: 0,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                }}
              >
                {sections[0].label}
              </h2>
            </div>
            <Skim when={mode}>{study.context}</Skim>
            {mode === "full" && (
              <>
                {(study.contextLong || study.context).split(/\n\n+/).map((para, i) => (
                  <p key={i} style={textPP(D)}>{para}</p>
                ))}
              </>
            )}
          </section>

          {/* MINI CASE STUDIES — one section per improvement */}
          {improvements.map((imp, i) => (
            <ImprovementBlock
              key={imp.slug}
              imp={imp}
              index={i + 1}
              total={sections.length}
              D={D}
              mode={mode}
              study={study}
            />
          ))}

          {/* THROUGHLINE / pull quote */}
          <section
            id={`pay-throughline-${study.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: 28, scrollMarginTop: 80 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Eyebrow index={improvements.length + 2}>
                {`/ ${String(sections.length).padStart(2, "0")}`}
              </Eyebrow>
              <h2
                style={{
                  fontSize: D.h2,
                  margin: 0,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                }}
              >
                Throughline
              </h2>
            </div>
            <Reveal>
              <div
                style={{
                  padding: `${D.sectionY * 0.6}px 0`,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: D.h2 * 0.85,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "var(--fg)",
                  }}
                >
                  <span style={{ color: "var(--accent)", marginRight: 8 }}>"</span>
                  {study.pull}
                </div>
              </div>
            </Reveal>
            {mode === "full" && (
              <p style={textPP(D)}>
                Same approach in both. Look for places where the interface is
                asking the user to do work the software could do instead, and
                fix them. Iterative work like this is where the product starts
                to feel like it's actually on the user's side.
              </p>
            )}
          </section>

          {/* OUTCOMES */}
          <section
            id={`pay-outcomes-${study.slug}`}
            style={{ display: "flex", flexDirection: "column", gap: 28, scrollMarginTop: 80 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Eyebrow index={improvements.length + 3}>
                {`/ ${String(sections.length).padStart(2, "0")}`}
              </Eyebrow>
              <h2
                style={{
                  fontSize: D.h2,
                  margin: 0,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                }}
              >
                Outcomes
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 48,
                padding: "32px 0",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {study.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 80}>
                  <Stat
                    value={m.value}
                    label={m.label}
                    note={m.note}
                    size="lg"
                    accent={i === 0}
                  />
                </Reveal>
              ))}
            </div>
          </section>

          {/* NEXT */}
          <div style={{ marginTop: D.sectionY }}>
            <NextCaseStudy next={next} density={density} />
          </div>
        </main>
      </div>

      <SiteFooter maxWidth={1240} />
    </article>
  );
}

/* ─── Single improvement section (problem · approach · before/after · outcome) ─── */
function ImprovementBlock({ imp, index, total, D, mode, study }) {
  const [view, setView] = useStateP("after");

  return (
    <section
      id={`pay-imp-${imp.slug}-${study.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        scrollMarginTop: 80,
      }}
    >
      {/* Section header — matches CaseEditorial Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Eyebrow index={index + 1}>{`/ ${String(total).padStart(2, "0")}`}</Eyebrow>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontSize: D.h2,
              margin: 0,
              letterSpacing: "-0.025em",
              fontWeight: 500,
            }}
          >
            {imp.name}
          </h2>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {imp.kicker}
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: D.lede * 0.9,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.7)",
            maxWidth: "52ch",
            fontWeight: 400,
          }}
        >
          {imp.oneLiner}
        </p>
      </div>

      {/* Problem + Approach — two-up, mono-eyebrowed, matches Process rhythm */}
      {mode === "full" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {[
            ["Problem", imp.problem],
            ["Approach", imp.approach],
          ].map(([label, body], i) => (
            <div
              key={label}
              style={{
                padding: "28px 28px 28px 0",
                paddingLeft: i === 0 ? 0 : 28,
                borderLeft:
                  i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: i === 0 ? "rgba(255,255,255,0.45)" : "var(--accent)",
                }}
              >
                {label}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.78)",
                  maxWidth: "48ch",
                  textWrap: "pretty",
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Before / After comparison */}
      <Reveal>
        <BeforeAfter imp={imp} view={view} setView={setView} D={D} />
      </Reveal>

      {/* Outcome note */}
      {imp.outcome && mode === "full" && (
        <Reveal>
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              padding: "20px 0 4px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                paddingTop: 4,
                minWidth: 78,
              }}
            >
              Outcome
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.5,
                color: "var(--fg)",
                letterSpacing: "-0.005em",
                maxWidth: "52ch",
                textWrap: "pretty",
              }}
            >
              {imp.outcome}
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}

/* ─── BeforeAfter — segmented toggle above a single image stage ─── */
function BeforeAfter({ imp, view, setView, D }) {
  const isBefore = view === "before";
  const label = isBefore ? imp.beforeLabel : imp.afterLabel;
  const hint  = isBefore ? imp.beforeHint  : imp.afterHint;
  const src   = isBefore ? imp.beforeSrc   : imp.afterSrc;

  return (
    <figure
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Toggle row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 999,
            padding: 3,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {["before", "after"].map((v) => {
            const active = view === v;
            return (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "7px 16px",
                  border: 0,
                  borderRadius: 999,
                  background: active ? "var(--accent)" : "transparent",
                  color: active ? "#0a0a0a" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  letterSpacing: "inherit",
                  textTransform: "inherit",
                  fontWeight: active ? 600 : 400,
                  transition: "background var(--t-fast), color var(--t-fast)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 999,
                    background: active ? "#0a0a0a" : "rgba(255,255,255,0.4)",
                  }}
                />
                {v}
              </button>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {isBefore ? "Original design" : "Shipped design"}
        </div>
      </div>

      {/* Stage — fixed aspect, cross-fade between before/after */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/10",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {["before", "after"].map((v) => {
          const visible = view === v;
          const vLabel = v === "before" ? imp.beforeLabel : imp.afterLabel;
          const vHint  = v === "before" ? imp.beforeHint  : imp.afterHint;
          const vSrc   = v === "before" ? imp.beforeSrc   : imp.afterSrc;
          return (
            <div
              key={v}
              style={{
                position: "absolute",
                inset: 0,
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.995)",
                transition:
                  "opacity 380ms cubic-bezier(.2,.7,.2,1), transform 380ms cubic-bezier(.2,.7,.2,1)",
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <Placeholder
                label={vLabel}
                aspect="16/10"
                hint={vHint}
                src={vSrc}
                accent={v === "after" ? undefined : "rgba(255,255,255,0.35)"}
              />
            </div>
          );
        })}

      </div>

      {/* Caption */}
      <figcaption
        style={{
          paddingLeft: 2,
          maxWidth: "62ch",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.65)",
            textWrap: "pretty",
          }}
        >
          {label}
        </p>
      </figcaption>
    </figure>
  );
}

/* ─── HERO — re-use the editorial hero variants verbatim for cohesion.
   Centered editorial hero, with an extra summary strip listing the 3
   improvements right under the meta facts. ─── */
function HeroP({ study, variant, D, improvements }) {
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: `${D.heroY}px ${D.padX}px ${D.heroY * 0.5}px`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h1
          style={{
            fontSize: D.h1,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            margin: 0,
            fontWeight: 500,
            maxWidth: "16ch",
          }}
        >
          {study.title}
        </h1>
        {study.subtitle && (
          <p
            style={{
              fontSize: D.lede,
              lineHeight: 1.35,
              margin: 0,
              color: "rgba(255,255,255,0.65)",
              maxWidth: "44ch",
              fontWeight: 400,
            }}
          >
            {study.subtitle}
          </p>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          marginTop: D.sectionY,
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {[
          ["Role", study.role],
          ["Team", study.team],
          ["Year", study.year],
          ["Shipped", String(improvements.length) + " improvements"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {k}
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{v}</div>
          </div>
        ))}
      </div>

    </section>
  );
}

function densityScaleP(d) {
  if (d === "compact")  return { padX: 40, heroY: 80,  sectionY: 56, gap: 56, h1: 80,  h2: 32, h3: 22, lede: 18 };
  if (d === "spacious") return { padX: 64, heroY: 140, sectionY: 96, gap: 96, h1: 124, h2: 44, h3: 28, lede: 22 };
  return                         { padX: 56, heroY: 112, sectionY: 76, gap: 72, h1: 104, h2: 38, h3: 24, lede: 20 };
}

function textPP(D) {
  return {
    fontSize: 16,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.78)",
    margin: 0,
    maxWidth: "62ch",
    textWrap: "pretty",
  };
}

window.CasePayments = CasePayments;
