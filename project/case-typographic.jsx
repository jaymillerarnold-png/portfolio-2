// case-typographic.jsx — Variation C: Bold typographic / editorial-noir.
// Massive type anchors, oversized metric moments, scroll-driven pin.

const { useState: useStateT, useEffect: useEffectT, useRef: useRefT } = React;

function CaseTypographic({ study, all, mode, setMode, density, heroVariant }) {
  const D = densityScaleT(density);
  const nextIdx = (Object.keys(all).indexOf(study.slug) + 1) % Object.keys(all).length;
  const next = all[Object.keys(all)[nextIdx]];

  return (
    <article
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--sans)",
        overflow: "hidden",
      }}
    >
      <PortfolioChrome />

      <HeroT study={study} variant={heroVariant} D={D} mode={mode} setMode={setMode} />

      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: `${D.sectionY}px ${D.padX}px`,
        }}
      >
        {/* sticky view toggle on right */}
        <div
          style={{
            position: "sticky",
            top: 78,
            zIndex: 10,
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: -16,
          }}
        >
          <ViewToggle value={mode} onChange={setMode} density={density} />
        </div>

        {/* CONTEXT */}
        <SectionT D={D} index={1} title="Context" study={study}>
          <Skim when={mode}>{study.context}</Skim>
          {mode === "full" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 64,
                marginTop: 24,
              }}
            >
              <p style={textT(D, true)}>{study.context}</p>
              <p style={textT(D)}>{study.contextLong}</p>
            </div>
          )}
        </SectionT>

        {/* RESEARCH — full-width row, big numbers */}
        <SectionT D={D} index={2} title="Research & discovery" study={study}>
          {mode === "full" && (
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 32,
                  padding: "48px 0",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {study.research.map((r, i) => (
                  <Reveal key={r.label} delay={i * 70}>
                    <Stat value={r.value} label={r.label} size="lg" />
                  </Reveal>
                ))}
              </div>
              <p style={{ ...textT(D), marginTop: 40, maxWidth: "70ch" }}>
                {study.researchNarrative}
              </p>
            </div>
          )}
        </SectionT>

        {/* PROCESS — pinned scroll */}
        <PinnedProcess study={study} mode={mode} D={D} />

        {/* PULL — gigantic quote */}
        <Reveal>
          <div
            style={{
              padding: `${D.sectionY * 1.1}px 0`,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              marginTop: D.sectionY,
              marginBottom: D.sectionY,
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 28,
              }}
            >
              In one line
            </div>
            <div
              style={{
                fontSize: D.pull,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                fontWeight: 500,
                maxWidth: "20ch",
              }}
            >
              <span style={{ color: "var(--accent)" }}>"</span>
              {study.pull}
              <span style={{ color: "var(--accent)" }}>"</span>
            </div>
          </div>
        </Reveal>

        {/* SCREENS — full bleed alternating */}
        <SectionT D={D} index={4} title="Hi-fi screens" study={study}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              marginTop: 24,
            }}
          >
            {study.screens.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: i % 2 === 0 ? "1fr 280px" : "280px 1fr",
                    gap: 24,
                    alignItems: "start",
                  }}
                >
                  {i % 2 === 0 ? (
                    <>
                      <Placeholder label={s.label} src={s.src} aspect={s.aspect} hint={s.src ? null : `s${String(i + 1).padStart(2, "0")}`} />
                      <ScreenCaption index={i} label={s.label} />
                    </>
                  ) : (
                    <>
                      <ScreenCaption index={i} label={s.label} />
                      <Placeholder label={s.label} src={s.src} aspect={s.aspect} hint={s.src ? null : `s${String(i + 1).padStart(2, "0")}`} />
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </SectionT>

        {/* OUTCOMES — oversized */}
        <SectionT D={D} index={5} title="Outcomes" study={study}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              marginTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {study.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 60}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1.4fr",
                    gap: 40,
                    padding: "44px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    alignItems: "baseline",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} · {m.label}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 28, flexWrap: "wrap" }}>
                    <div
                      style={{
                        fontSize: D.bigStat,
                        fontWeight: 500,
                        letterSpacing: "-0.04em",
                        lineHeight: 0.9,
                        color: i === 0 ? "var(--accent)" : "var(--fg)",
                        fontFeatureSettings: '"tnum" 1',
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        letterSpacing: "0.06em",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {m.note}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionT>

        {/* NEXT */}
        <div style={{ marginTop: D.sectionY * 1.2 }}>
          <NextCaseStudy next={next} density={density} />
        </div>
      </div>

      <FooterT study={study} />
    </article>
  );
}

/* ─── HERO ─── */
function HeroT({ study, variant, D, mode, setMode }) {
  if (variant === "B") {
    // Two-line stacked title with massive type
    return (
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: `${D.heroY}px ${D.padX}px ${D.sectionY}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 32,
            gap: 32,
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Tag dim>{study.year}</Tag>
          </div>
          <ViewToggle value={mode} onChange={setMode} />
        </div>
        <h1
          style={{
            fontSize: D.h1,
            lineHeight: 0.9,
            letterSpacing: "-0.045em",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {study.title}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            marginTop: 56,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <p
            style={{
              fontSize: D.lede,
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.78)",
              margin: 0,
              maxWidth: "32ch",
              fontWeight: 400,
            }}
          >
            {study.subtitle}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              alignSelf: "end",
            }}
          >
            {[
              ["Role", study.role],
              ["Team", study.team],
              ["Year", study.year],
            ].map(([k, v]) => (
              <MetaInline key={k} k={k} v={v} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (variant === "C") {
    // Number-led hero — the lead metric is the visual
    const lead = study.metrics[0];
    return (
      <section
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: `${D.heroY}px ${D.padX}px ${D.sectionY}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
            gap: 32,
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }} />
          <ViewToggle value={mode} onChange={setMode} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 64,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: 16,
              }}
            >
              Case Study · {study.year}
            </div>
            <h1
              style={{
                fontSize: D.h1 * 0.75,
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
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.7)",
                margin: "24px 0 0",
                maxWidth: "44ch",
              }}
            >
              {study.subtitle}
            </p>
          </div>
          <div
            style={{
              textAlign: "right",
              paddingBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: D.heroNumber,
                fontWeight: 500,
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                color: "var(--accent)",
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              {lead.value}
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
                marginTop: 16,
              }}
            >
              {lead.label} · {lead.note}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {[
            ["Role", study.role],
            ["Team", study.team],
            ["Duration", study.duration],
          ].map(([k, v]) => (
            <MetaInline key={k} k={k} v={v} />
          ))}
        </div>
      </section>
    );
  }
  // Variant A — index card style
  return (
    <section
      style={{
        maxWidth: 1480,
        margin: "0 auto",
        padding: `${D.heroY}px ${D.padX}px ${D.sectionY * 0.6}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
          gap: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Case Study · 00{Object.keys(window.CASE_STUDIES).indexOf(study.slug) + 1} / 004
          </div>
        </div>
        <ViewToggle value={mode} onChange={setMode} />
      </div>
      <h1
        style={{
          fontSize: D.h1,
          lineHeight: 0.9,
          letterSpacing: "-0.045em",
          margin: 0,
          fontWeight: 500,
          maxWidth: "14ch",
        }}
      >
        {study.title}
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 56,
          marginTop: 48,
          alignItems: "start",
        }}
      >
        <p
          style={{
            fontSize: D.lede,
            lineHeight: 1.3,
            color: "rgba(255,255,255,0.78)",
            margin: 0,
            maxWidth: "48ch",
            fontWeight: 400,
          }}
        >
          {study.subtitle}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {[
            ["Role", study.role],
            ["Team", study.team],
            ["Year", study.year],
          ].map(([k, v]) => (
            <MetaInline key={k} k={k} v={v} />
          ))}
        </div>
      </div>
      <div style={{ marginTop: 56 }}>
        <Placeholder label={`${study.title} · cover`} src={study.cover} aspect="21/9" hint={study.cover ? null : "2400×1029"} />
      </div>
    </section>
  );
}

function MetaInline({ k, v }) {
  return (
    <div>
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
  );
}

function SectionT({ D, index, title, children }) {
  return (
    <section style={{ marginTop: D.sectionY }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 40,
          alignItems: "baseline",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          / {String(index).padStart(2, "0")}
        </div>
        <h2
          style={{
            fontSize: D.h2,
            margin: 0,
            letterSpacing: "-0.03em",
            fontWeight: 500,
            lineHeight: 0.95,
          }}
        >
          {title}
        </h2>
      </div>
      <div style={{ paddingLeft: 220 }}>{children}</div>
    </section>
  );
}

/* ─── Pinned process — left phase sticks while right scrolls. ─── */
function PinnedProcess({ study, mode, D }) {
  const [active, setActive] = useStateT(0);
  const refs = useRefT([]);

  useEffectT(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [study.slug]);

  return (
    <section style={{ marginTop: D.sectionY }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 40,
          alignItems: "baseline",
          marginBottom: 0,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          / 03
        </div>
        <h2
          style={{
            fontSize: D.h2,
            margin: 0,
            letterSpacing: "-0.03em",
            fontWeight: 500,
            lineHeight: 0.95,
          }}
        >
          Process
        </h2>
      </div>
      {mode === "full" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 80,
            marginTop: 40,
            paddingLeft: 0,
          }}
        >
          {/* sticky phase label */}
          <div>
            <div
              style={{
                position: "sticky",
                top: 140,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                {String(active + 1).padStart(2, "0")} of {String(study.process.length).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontSize: D.phase,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  fontWeight: 500,
                  color: "var(--fg)",
                  transition: "all var(--t-med)",
                }}
                key={active}
              >
                {study.process[active].phase}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 12 }}>
                {study.process.map((p, i) => (
                  <div
                    key={p.phase}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: i === active ? "var(--fg)" : "rgba(255,255,255,0.4)",
                      transition: "color var(--t-fast)",
                    }}
                  >
                    <span
                      style={{
                        width: i === active ? 22 : 10,
                        height: 1,
                        background:
                          i === active ? "var(--accent)" : "rgba(255,255,255,0.25)",
                        transition: "all var(--t-med)",
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
                      {p.phase}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* scrolling content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
            {study.process.map((p, i) => (
              <div
                key={p.phase}
                data-idx={i}
                ref={(el) => (refs.current[i] = el)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  minHeight: 240,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")} · {p.phase}
                </div>
                <h3
                  style={{
                    fontSize: D.h3,
                    letterSpacing: "-0.02em",
                    margin: 0,
                    fontWeight: 500,
                    lineHeight: 1.05,
                  }}
                >
                  {p.title}
                </h3>
                <p style={textT(D)}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ScreenCaption({ index, label }) {
  return (
    <div
      style={{
        padding: "24px 24px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        height: "fit-content",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 12,
        }}
      >
        Screen {String(index + 1).padStart(2, "0")}
      </div>
      <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{label}</div>
      <div
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.5,
        }}
      >
        Annotation goes here. Drop a real screen + caption when ready.
      </div>
    </div>
  );
}

function FooterT({ study }) {
  return <SiteFooter maxWidth={1480} />;
}

function densityScaleT(d) {
  if (d === "compact") return { padX: 40, heroY: 64, sectionY: 64, h1: 96, h2: 56, h3: 24, lede: 18, pull: 56, heroNumber: 160, bigStat: 88, phase: 64 };
  if (d === "spacious") return { padX: 64, heroY: 120, sectionY: 128, h1: 168, h2: 88, h3: 32, lede: 22, pull: 88, heroNumber: 240, bigStat: 144, phase: 96 };
  return { padX: 56, heroY: 96, sectionY: 96, h1: 136, h2: 72, h3: 28, lede: 20, pull: 72, heroNumber: 200, bigStat: 120, phase: 80 };
}

function textT(D, lede) {
  if (lede) {
    return {
      fontSize: 19,
      lineHeight: 1.45,
      color: "rgba(255,255,255,0.85)",
      margin: 0,
      fontWeight: 400,
      letterSpacing: "-0.005em",
    };
  }
  return {
    fontSize: 15,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.65)",
    margin: 0,
    maxWidth: "60ch",
    textWrap: "pretty",
  };
}

window.CaseTypographic = CaseTypographic;
