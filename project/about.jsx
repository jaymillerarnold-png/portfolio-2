// about.jsx — standalone About page.
// Bio + contact links. Uses the shared PortfolioChrome + ContactLinks atoms.

function About() {
  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "var(--sans)",
        minHeight: "100vh",
      }}
    >
      <PortfolioChrome current="about" />

      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "120px 32px 80px",
        }}
      >
        <Eyebrow accent>About</Eyebrow>

        <div
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <Reveal delay={120}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                fontSize: 22,
                lineHeight: 1.5,
                letterSpacing: "-0.005em",
                color: "rgba(255,255,255,0.78)",
                maxWidth: "44ch",
                textWrap: "pretty",
                fontWeight: 400,
              }}
            >
              <p style={{ margin: 0 }}>
                I'm a lead product designer. I focus on 0-to-1 work and on
                taking complex, ambiguous problems and turning them into
                experiences that hold up when they meet real users.
              </p>
              <p style={{ margin: 0 }}>
                I care about the full loop. Discovery, design, validation, and
                what happens after it ships. The best design decisions I've
                made came from watching someone use a product and being honest
                about what I saw.
              </p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.55)" }}>
                Currently based in Durango, CO. Open to senior and lead roles
                in product design.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <Eyebrow>Contact</Eyebrow>
              <ContactLinks />
            </div>
          </Reveal>
        </div>

        <Reveal delay={280}>
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

      <SiteFooter maxWidth={1400} />
    </main>
  );
}

Object.assign(window, { About });
