// case-modular.jsx — Variation B: Modular grid + persistent metadata sidebar.
// Info-dense, card-based, more compact rhythm.

const { useState: useStateM, useEffect: useEffectM } = React;

function CaseModular({ study, all, mode, setMode, density, heroVariant }) {
  const D = densityScaleM(density);
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

      <HeroM study={study} variant={heroVariant} density={density} D={D} mode={mode} setMode={setMode} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 48,
          maxWidth: 1320,
          margin: "0 auto",
          padding: `${D.sectionY}px ${D.padX}px ${D.sectionY * 1.2}px`,
          alignItems: "start",
        }}
      >
        {/* sticky meta */}
        <aside
          style={{
            position: "sticky",
            top: 80,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <MetaCard study={study} />
          <div>
            <Eyebrow>View</Eyebrow>
            <div style={{ marginTop: 10 }}>
              <ViewToggle value={mode} onChange={setMode} density={density} />
            </div>
          </div>
          <div>
            <Eyebrow>Key metrics</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12 }}>
              {study.metrics.slice(0, 2).map((m) => (
                <Stat key={m.label} value={m.value} label={m.label} size="sm" />
              ))}
            </div>
          </div>
        </aside>

        {/* main grid */}
        <main style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* CONTEXT card */}
          <Card index={1} title="Context" D={D}>
            <Skim when={mode}>{study.context}</Skim>
            {mode === "full" && (
              <>
                <p style={textM(D)}>{study.contextLong}</p>
              </>
            )}
          </Card>

          {/* RESEARCH grid */}
          <Card index={2} title="Research & discovery" D={D}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: mode === "full" ? 20 : 0,
              }}
            >
              {study.research.map((r) => (
                <div key={r.label} style={{ background: "var(--bg)", padding: "18px 16px" }}>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      color: "var(--fg)",
                      lineHeight: 1,
                      fontFeatureSettings: '"tnum" 1',
                    }}
                  >
                    {r.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                      marginTop: 10,
                    }}
                  >
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
            {mode === "full" && (
              <p style={textM(D)}>{study.researchNarrative}</p>
            )}
          </Card>

          {/* PROCESS cards */}
          <Card index={3} title="Process" D={D}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {study.process.map((p, i) => (
                <Reveal key={p.phase} delay={i * 40}>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: "22px 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      minHeight: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 10,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")} · {p.phase}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: 17,
                        margin: 0,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {p.title}
                    </h3>
                    {mode === "full" && (
                      <p
                        style={{
                          fontSize: 13.5,
                          lineHeight: 1.55,
                          margin: 0,
                          color: "rgba(255,255,255,0.62)",
                        }}
                      >
                        {p.body}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Card>

          {/* SCREENS grid */}
          <Card index={4} title="Hi-fi screens" D={D}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 20,
              }}
            >
              {study.screens.map((s, i) => (
                <Reveal key={s.label} delay={i * 50}>
                  <Placeholder label={s.label} src={s.src} aspect={s.src ? s.aspect : "16/10"} hint={s.src ? null : `s${String(i + 1).padStart(2, "0")}`} />
                </Reveal>
              ))}
            </div>
          </Card>

          {/* PULL */}
          <Reveal>
            <div
              style={{
                padding: "40px 32px",
                border: "1px solid rgba(255,255,255,0.08)",
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--accent) 4%, transparent), transparent 60%)",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  lineHeight: 1.3,
                  letterSpacing: "-0.015em",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                <span style={{ color: "var(--accent)", marginRight: 6 }}>"</span>
                {study.pull}
              </div>
            </div>
          </Reveal>

          {/* OUTCOMES */}
          <Card index={5} title="Outcomes" D={D}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {study.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 60}>
                  <div
                    style={{
                      background: "var(--bg)",
                      padding: "28px 24px",
                    }}
                  >
                    <Stat
                      value={m.value}
                      label={m.label}
                      note={m.note}
                      size="md"
                      accent={i === 0}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Card>

          {/* NEXT */}
          <NextCaseStudy next={next} density={density} />
        </main>
      </div>

      <FooterM />
    </article>
  );
}

function MetaCard({ study }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "20px 18px",
        background: "rgba(255,255,255,0.02)",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {[
        ["Role", study.role],
        ["Team", study.team],
        ["Year", study.year],
        ["Duration", study.duration],
        ["Client", study.client],
      ].map(([k, v]) => (
        <div
          key={k}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            fontSize: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {k}
          </span>
          <span style={{ color: "rgba(255,255,255,0.85)", textAlign: "right" }}>
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

function Card({ index, title, D, children }) {
  return (
    <section
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        padding: `${D.cardY}px ${D.cardX}px`,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 16,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--accent)",
              letterSpacing: "0.1em",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
          <h2
            style={{
              fontSize: D.h2,
              margin: 0,
              fontWeight: 500,
              letterSpacing: "-0.015em",
            }}
          >
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

function HeroM({ study, variant, density, D, mode, setMode }) {
  if (variant === "B") {
    return (
      <section
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: `${D.heroY}px ${D.padX}px 0`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Case Study · 00{Object.keys(window.CASE_STUDIES).indexOf(study.slug) + 1}
            </div>
          </div>
          <div>
            <h1
              style={{
                fontSize: D.h1,
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                margin: 0,
                fontWeight: 500,
                maxWidth: "16ch",
              }}
            >
              {study.title}
            </h1>
            <p
              style={{
                fontSize: D.lede,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.65)",
                margin: "20px 0 0",
                maxWidth: "52ch",
              }}
            >
              {study.subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }
  if (variant === "C") {
    // Hero with cover banner above
    return (
      <section style={{ position: "relative" }}>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: `${D.heroY * 0.6}px ${D.padX}px 0`,
          }}
        >
          <Placeholder label={`${study.title} · cover`} src={study.cover} aspect="32/9" hint={study.cover ? null : "banner"} />
        </div>
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: `${D.sectionY * 0.6}px ${D.padX}px 0`,
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }} />
          <div>
            <h1
              style={{
                fontSize: D.h1,
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                margin: 0,
                fontWeight: 500,
              }}
            >
              {study.title}
            </h1>
            <p
              style={{
                fontSize: D.lede,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.65)",
                margin: "20px 0 0",
                maxWidth: "52ch",
              }}
            >
              {study.subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }
  // Variant A: dense top with metric strip
  return (
    <section
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: `${D.heroY}px ${D.padX}px ${D.sectionY}px`,
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
          <Tag dim>{study.year}</Tag>
        </div>
        <h1
          style={{
            fontSize: D.h1,
            lineHeight: 0.96,
            letterSpacing: "-0.035em",
            margin: 0,
            fontWeight: 500,
            maxWidth: "16ch",
          }}
        >
          {study.title}
        </h1>
        <p
          style={{
            fontSize: D.lede,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.65)",
            margin: "22px 0 0",
            maxWidth: "60ch",
          }}
        >
          {study.subtitle}
        </p>
      </div>
      {/* metric strip */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: `0 ${D.padX}px`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderBottom: 0,
          }}
        >
          {study.metrics.map((m, i) => (
            <div
              key={m.label}
              style={{
                background: "var(--bg)",
                padding: "20px 18px",
              }}
            >
              <Stat
                value={m.value}
                label={m.label}
                note={m.note}
                size="sm"
                accent={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterM() {
  return <SiteFooter maxWidth={1320} />;
}

function densityScaleM(d) {
  if (d === "compact") return { padX: 32, heroY: 64, sectionY: 40, cardY: 24, cardX: 24, h1: 64, h2: 22, lede: 16 };
  if (d === "spacious") return { padX: 56, heroY: 120, sectionY: 80, cardY: 44, cardX: 40, h1: 96, h2: 30, lede: 20 };
  return { padX: 44, heroY: 88, sectionY: 56, cardY: 32, cardX: 32, h1: 80, h2: 26, lede: 18 };
}

function textM(D) {
  return {
    fontSize: 15,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.75)",
    margin: 0,
    maxWidth: "64ch",
    textWrap: "pretty",
  };
}

window.CaseModular = CaseModular;
