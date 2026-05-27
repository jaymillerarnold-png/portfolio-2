// case-editorial.jsx — Variation A: Editorial / narrative
// Pinned section nav on the left, generous whitespace, narrative-driven.
// Hero variants A/B/C via heroVariant prop.

const { useState: useStateE, useEffect: useEffectE, useRef: useRefE } = React;

function CaseEditorial({ study, all, mode, setMode, density, heroVariant }) {
  const D = densityScaleE(density);
  // Headers come from the study (each pasted case study has its own exact
  // section titles); fall back to generic labels if a study omits them.
  const H = study.headers || {};
  const sections = [
    { id: "context",  label: H.context  || "Context",  navLabel: H.contextNav  || H.context  || "Context"  },
    { id: "research", label: H.research || "Research", navLabel: H.researchNav || H.research || "Research" },
    { id: "process",  label: H.process  || "Process",  navLabel: H.processNav  || H.process  || "Process"  },
    { id: "screens",  label: H.screens  || "Screens",  navLabel: H.screensNav  || H.screens  || "Screens"  },
    { id: "outcomes", label: H.outcomes || "Outcomes", navLabel: H.outcomesNav || H.outcomes || "Outcomes" },
  ];
  const [active, setActive] = useStateE("context");

  useEffectE(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(`ed-${s.id}-${study.slug}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [study.slug]);

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

      {/* HERO */}
      <HeroE study={study} variant={heroVariant} density={density} D={D} />

      {/* MAIN — sticky side nav + body */}
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
        {/* sticky nav */}
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
                      href={`#ed-${s.id}-${study.slug}`}
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
                        {String(i + 1).padStart(2, "0")} {s.navLabel}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* body */}
        <main style={{ display: "flex", flexDirection: "column", gap: D.sectionY * 1.4 }}>
          {/* CONTEXT */}
          <Section id={`ed-context-${study.slug}`} index={1} title={sections[0].label} D={D}>
            <Skim when={mode}>{study.context}</Skim>
            {mode === "full" && (
              <>
                {(study.contextLong || study.context).split(/\n\n+/).map((para, i) => (
                  <p key={i} style={textP(D)}>{para}</p>
                ))}
              </>
            )}
          </Section>

          {/* RESEARCH */}
          <Section id={`ed-research-${study.slug}`} index={2} title={sections[1].label} D={D}>
            {study.researchSkim && (
              <Skim when={mode}>{study.researchSkim}</Skim>
            )}
            {mode === "full" && (
              <>
                {study.research && study.research.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 24,
                      padding: "28px 0",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {study.research.map((r) => (
                      <Stat key={r.label} value={r.value} label={r.label} size="md" />
                    ))}
                  </div>
                )}
                <p style={textP(D)}>{study.researchNarrative}</p>
              </>
            )}
            {study.researchImage && (
              <Reveal>
                <Placeholder
                  label="Usability session findings · pass/fail across 5 lender sessions"
                  src={study.researchImage}
                  aspect="16/9"
                />
              </Reveal>
            )}
          </Section>

          {/* PROCESS */}
          <Section id={`ed-process-${study.slug}`} index={3} title={sections[2].label} D={D}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {study.process.map((p, i) => (
                <Reveal key={p.phase} delay={i * 60}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: 24,
                      padding: "28px 0",
                      borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        paddingTop: 6,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")} · {p.phase}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: D.h3,
                          letterSpacing: "-0.015em",
                          margin: "0 0 12px",
                          fontWeight: 500,
                        }}
                      >
                        {p.title}
                      </h3>
                      {mode === "full" && (
                        <p
                          style={{
                            ...textP(D),
                            color: "rgba(255,255,255,0.65)",
                            margin: 0,
                          }}
                        >
                          {p.body}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* PULL QUOTE */}
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

          {/* SCREENS */}
          <Section id={`ed-screens-${study.slug}`} index={4} title={sections[3].label} D={D}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {study.screens.map((s, i) => (
                <Reveal key={s.label} delay={i * 50}>
                  <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                    <Placeholder label={s.label} src={s.src} aspect={s.aspect} fit={s.fit} frame={s.frame} hint={s.src ? null : `screen ${String(i + 1).padStart(2, "0")}`} />
                    {s.caption && (
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
                          {s.caption}
                        </p>
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          </Section>

          {/* OUTCOMES */}
          <Section id={`ed-outcomes-${study.slug}`} index={5} title={sections[4].label} D={D}>
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
          </Section>

          {/* NEXT */}
          <div style={{ marginTop: D.sectionY }}>
            <NextCaseStudy next={next} density={density} />
          </div>
        </main>
      </div>

      <FooterE />
    </article>
  );
}

/* ─── HERO ─── */
function HeroE({ study, variant, density, D }) {
  if (variant === "B") return <HeroBE study={study} D={D} />;
  if (variant === "C") return <HeroCE study={study} D={D} />;
  return <HeroAE study={study} D={D} />;
}

function HeroAE({ study, D }) {
  // Centered editorial hero — title huge, meta below
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

      <div style={{ marginTop: D.sectionY }}>
        <Placeholder label={`${study.title} · hero image`} src={study.cover} aspect="21/9" hint={study.cover ? null : "2400×1029"} />
      </div>
    </section>
  );
}

function HeroBE({ study, D }) {
  // Split — title left, meta right
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: `${D.heroY}px ${D.padX}px ${D.heroY * 0.5}px`,
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: 64,
        alignItems: "end",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h1
          style={{
            fontSize: D.h1 * 1.1,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {study.title}
        </h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {study.subtitle && (
          <p
            style={{
              fontSize: D.lede,
              lineHeight: 1.35,
              margin: 0,
              color: "rgba(255,255,255,0.7)",
              fontWeight: 400,
            }}
          >
            {study.subtitle}
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          {[
            ["Role", study.role],
            ["Year", study.year],
            ["Team", study.team],
          ].map(([k, v]) => (
            <div key={k}>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 4,
                }}
              >
                {k}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ gridColumn: "1 / -1", marginTop: D.sectionY }}>
        <Placeholder label={`${study.title} · hero`} src={study.cover} aspect="21/9" hint={study.cover ? null : "2400×1029"} />
      </div>
    </section>
  );
}

function HeroCE({ study, D }) {
  // Full bleed image, title overlayed
  return (
    <section style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <Placeholder label={`${study.title} · cover`} src={study.cover} aspect="21/9" hint={study.cover ? null : "full-bleed"} style={{ borderRadius: 0, border: 0 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--bg) 30%, transparent) 0%, color-mix(in oklab, var(--bg) 95%, transparent) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            maxWidth: 1240,
            margin: "0 auto",
            padding: `0 ${D.padX}px ${D.heroY * 0.5}px`,
          }}
        >
          <h1
            style={{
              fontSize: D.h1 * 1.05,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              margin: 0,
              fontWeight: 500,
              maxWidth: "16ch",
            }}
          >
            {study.title}
          </h1>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: `${D.sectionY * 0.5}px ${D.padX}px`,
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 48,
          alignItems: "start",
        }}
      >
        {study.subtitle && (
          <p
            style={{
              fontSize: D.lede,
              lineHeight: 1.35,
              margin: 0,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {study.subtitle}
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            ["Role", study.role],
            ["Year", study.year],
            ["Team", study.team],
          ].map(([k, v]) => (
            <div key={k}>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 4,
                }}
              >
                {k}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section({ id, index, title, D, total = 5, children }) {
  return (
    <section id={id} style={{ display: "flex", flexDirection: "column", gap: 28, scrollMarginTop: 80 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Eyebrow index={index}>{`/ ${String(total).padStart(2, "0")}`}</Eyebrow>
        <h2
          style={{
            fontSize: D.h2,
            margin: 0,
            letterSpacing: "-0.025em",
            fontWeight: 500,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function FooterE() {
  return <SiteFooter maxWidth={1240} />;
}

function densityScaleE(d) {
  if (d === "compact") return { padX: 40, heroY: 80, sectionY: 56, gap: 56, h1: 80, h2: 32, h3: 22, lede: 18 };
  if (d === "spacious") return { padX: 64, heroY: 140, sectionY: 96, gap: 96, h1: 124, h2: 44, h3: 28, lede: 22 };
  return { padX: 56, heroY: 112, sectionY: 76, gap: 72, h1: 104, h2: 38, h3: 24, lede: 20 };
}

function textP(D) {
  return {
    fontSize: 16,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.78)",
    margin: 0,
    maxWidth: "62ch",
    textWrap: "pretty",
  };
}

window.CaseEditorial = CaseEditorial;
