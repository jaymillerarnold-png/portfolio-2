// homepage.jsx — Index / landing page for the portfolio.
// Reuses atoms (PortfolioChrome, Eyebrow, Tag, Placeholder, Reveal) and the
// CASE_STUDIES content already used by case study detail pages.
// All four case study cards link to Case Study Detail.html?study=<slug>.

const { useEffect: useEffectH, useState: useStateH } = React;

/* ─────────────────────────────────────────────────────────────────────────
   Hero — typographic statement with status & summary band.
   ───────────────────────────────────────────────────────────────────────── */
function HomeHero() {
  return (
    <section
      style={{
        padding: "120px 32px 80px",
        maxWidth: 1400,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Top eyebrow */}
      <Eyebrow>Lead Product Designer</Eyebrow>

      {/* Main statement */}
      <Reveal>
        <h1
          style={{
            margin: "56px 0 0",
            fontSize: "clamp(64px, 9.5vw, 144px)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
            fontWeight: 500,
            maxWidth: "14ch",
            textWrap: "balance",
          }}
        >
          Design that moves{" "}
          <em
            style={{
              color: "var(--accent)",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            product
          </em>{" "}
          forward.
        </h1>
      </Reveal>

      {/* Lede */}
      <Reveal delay={120}>
        <p
          style={{
            margin: "72px 0 0",
            fontSize: 22,
            lineHeight: 1.45,
            letterSpacing: "-0.005em",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "44ch",
            textWrap: "pretty",
            fontWeight: 400,
          }}
        >
          I lead design on complex, 0-to-1 product problems. User research
          and systems thinking through to shipped experiences.
        </p>
      </Reveal>

      {/* Facts strip */}
      <Reveal delay={240}>
        <div
          style={{
            marginTop: 120,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
          }}
        >
          {[
            ["0 → 1", "Specialty"],
            ["Research-led", "Approach"],
            ["Fintech / CRE", "Domain"],
            ["Durango, CO", "Based"],
          ].map(([value, label], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                paddingLeft: i === 0 ? 0 : 24,
                borderLeft:
                  i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: 22,
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  fontWeight: 500,
                  color: "var(--fg)",
                  fontFeatureSettings: '"tnum" 1, "ss01" 1',
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CaseStudyCard — one full-width editorial row.
   ───────────────────────────────────────────────────────────────────────── */
function CaseStudyCard({ index, study, accentMetric }) {
  const [hover, setHover] = useStateH(false);
  return (
    <a
      href={`Case Study Detail.html?study=${study.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        padding: "44px 32px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        transition: "background var(--t-med)",
        background: hover ? "rgba(255,255,255,0.015)" : "transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "72px 1.2fr 1.4fr 32px",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* Index */}
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: hover ? "var(--accent)" : "rgba(255,255,255,0.5)",
            paddingTop: 8,
            transition: "color var(--t-fast)",
          }}
        >
          {String(index).padStart(2, "0")}
        </div>

        {/* Title + subtitle + tags */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3.4vw, 44px)",
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              fontWeight: 500,
              maxWidth: "18ch",
              textWrap: "pretty",
              color: hover ? "var(--fg)" : "rgba(255,255,255,0.92)",
              transition: "color var(--t-fast)",
            }}
          >
            {study.title}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "44ch",
              textWrap: "pretty",
            }}
          >
            {study.subtitle}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                padding: "4px 8px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {study.year}
            </span>
          </div>
        </div>

        {/* Visual + headline metric */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Placeholder
            label={
              (study.screens && study.screens[0] && study.screens[0].label) ||
              (study.improvements && study.improvements[0] && study.improvements[0].name) ||
              study.title
            }
            src={study.cover}
            aspect="16/9"
            hint={study.role}
            style={{
              background: hover
                ? "repeating-linear-gradient(135deg, rgba(0,255,136,0.03) 0 1px, rgba(255,255,255,0.012) 1px 9px)"
                : undefined,
              borderColor: hover ? "rgba(0,255,136,0.18)" : "rgba(255,255,255,0.06)",
              transition: "border-color var(--t-fast), background var(--t-fast)",
            }}
          />
          {accentMetric != null && (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                paddingTop: 4,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                  color: "var(--accent)",
                  fontFeatureSettings: '"tnum" 1, "ss01" 1',
                }}
              >
                {study.metrics[accentMetric].value}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {study.metrics[accentMetric].label}
              </span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div
          style={{
            fontFamily: "var(--mono)",
            color: hover ? "var(--accent)" : "rgba(255,255,255,0.5)",
            fontSize: 22,
            paddingTop: 6,
            transform: hover ? "translateX(8px)" : "translateX(0)",
            transition: "transform var(--t-med), color var(--t-fast)",
            justifySelf: "end",
          }}
        >
          →
        </div>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HomeWork — 4 case study rows.
   ───────────────────────────────────────────────────────────────────────── */
function HomeWork() {
  const all = window.CASE_STUDIES;
  const order = ["collaborative", "compliance", "genui", "money"];
  // pick the most impactful metric per study for the row teaser
  const featureMetric = {
    collaborative: 0, // 94% task success
    compliance: 1,    // $290M processed
    genui: 0,         // 14 components
    money: 0,         // 4 → 2 clicks
  };
  return (
    <section id="work" style={{ marginTop: 32, scrollMarginTop: 64 }}>
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 32px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Eyebrow accent>Work</Eyebrow>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          4 case studies · 2023 — 2025
        </span>
      </div>

      {order.map((slug, i) => (
        <Reveal key={slug} delay={i * 60}>
          <CaseStudyCard
            index={i + 1}
            study={all[slug]}
            accentMetric={featureMetric[slug]}
          />
        </Reveal>
      ))}

      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 32px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HomeFooter — closer, contact, colophon.
   ───────────────────────────────────────────────────────────────────────── */
function HomeFooter() {
  return (
    <>
      <section
        style={{
          marginTop: 120,
          padding: "120px 32px 0",
          maxWidth: 1400,
          marginInline: "auto",
        }}
      >
        <Reveal>
          <a
            href="About.html"
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 80,
              alignItems: "end",
              textDecoration: "none",
              color: "inherit",
              paddingBottom: 48,
            }}
            onMouseEnter={(e) => {
              const arrow = e.currentTarget.querySelector("[data-arrow]");
              if (arrow) arrow.style.transform = "translateX(10px)";
            }}
            onMouseLeave={(e) => {
              const arrow = e.currentTarget.querySelector("[data-arrow]");
              if (arrow) arrow.style.transform = "translateX(0)";
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <Eyebrow accent>About</Eyebrow>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.92)",
                  maxWidth: "22ch",
                  textWrap: "pretty",
                }}
              >
                Lead product designer focused on 0&nbsp;→&nbsp;1 work. Turning
                ambiguous problems into experiences that hold up with real
                users.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 12,
                fontFamily: "var(--mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              <span>More about me</span>
              <span
                data-arrow
                style={{
                  fontSize: 18,
                  transition: "transform var(--t-med)",
                  display: "inline-block",
                }}
              >
                →
              </span>
            </div>
          </a>
        </Reveal>
      </section>
      <SiteFooter maxWidth={1400} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Homepage root — composed and exported.
   ───────────────────────────────────────────────────────────────────────── */
function Homepage() {
  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--sans)",
        minHeight: "100vh",
      }}
    >
      <PortfolioChrome current="work" />
      <HomeHero />
      <HomeWork />
      <HomeFooter />
    </main>
  );
}

Object.assign(window, { Homepage });
