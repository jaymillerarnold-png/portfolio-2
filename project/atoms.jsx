// atoms.jsx — Shared building blocks for all case study variations.
// Placeholder visuals, tag chips, metric blocks, divider rules, etc.

const { useEffect, useRef, useState, useMemo } = React;

/* ─────────────────────────────────────────────────────────────────────────
   <Placeholder /> — striped SVG image stand-in with monospace explainer.
   This is the only imagery treatment used across all three variations.
   The user can swap in real screens later.
   ───────────────────────────────────────────────────────────────────────── */
function Placeholder({ label, aspect = "16/10", style, hint, accent, src, fit = "cover", caption, frame }) {
  const stripe = "rgba(255,255,255,0.025)";
  const stripeAlt = "rgba(255,255,255,0.012)";
  // GenUI-style frame: image renders inside a portrait assistant panel,
  // floating on a navy gradient stage. Keeps the outer aspect consistent
  // with the rest of the case study so layouts don't shift.
  if (src && frame === "panel") {
    return (
      <figure style={{ margin: 0, width: "100%", display: "flex", justifyContent: "center", ...style }}>
        <div
          style={{
            aspectRatio: aspect,
            width: "100%",
            maxWidth: 640,
            position: "relative",
            borderRadius: 4,
            overflow: "hidden",
            background: "#1a1530",
            backgroundImage:
              "radial-gradient(1200px 600px at 20% 0%, #2c1f5e 0%, transparent 60%), radial-gradient(1000px 800px at 100% 100%, #1f1547 0%, transparent 60%)",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4%",
          }}
        >
          <img
            src={src}
            alt={label || ""}
            loading="lazy"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: "block",
              borderRadius: 10,
              boxShadow:
                "0 30px 80px -20px rgba(0,0,0,0.55), 0 8px 24px -8px rgba(0,0,0,0.35)",
            }}
          />
        </div>
      </figure>
    );
  }
  // If we have a real image, render it inside the same framed container —
  // no monospace placeholder chrome, optional caption beneath.
  if (src) {
    return (
      <figure
        style={{
          margin: 0,
          width: "100%",
          ...style,
        }}
      >
        <div
          style={{
            aspectRatio: aspect,
            width: "100%",
            position: "relative",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <img
            src={src}
            alt={label || ""}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: fit,
              objectPosition: "center top",
              display: "block",
            }}
          />
        </div>
        {caption && (
          <figcaption
            style={{
              marginTop: 10,
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{caption}</span>
            {hint && <span style={{ opacity: 0.6 }}>{hint}</span>}
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <div
      style={{
        aspectRatio: aspect,
        width: "100%",
        position: "relative",
        background: `repeating-linear-gradient(135deg, ${stripe} 0 1px, ${stripeAlt} 1px 9px)`,
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 4,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "14px 16px",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: accent || "var(--accent)",
                boxShadow: `0 0 8px ${accent || "var(--accent)"}`,
              }}
            />
            placeholder
          </span>
          <span style={{ opacity: 0.6 }}>{aspect}</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          {hint && <div style={{ opacity: 0.55 }}>{hint}</div>}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Tag chip — small monospace, dot prefix.
   ───────────────────────────────────────────────────────────────────────── */
function Tag({ children, dim }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: dim ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.7)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 8px",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 999,
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          background: "var(--accent)",
          borderRadius: 999,
        }}
      />
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Stat — large metric block with monospace caption.
   ───────────────────────────────────────────────────────────────────────── */
function Stat({ value, label, note, size = "lg", accent = false }) {
  const sizes = {
    sm: { v: 32, l: 10 },
    md: { v: 48, l: 11 },
    lg: { v: 72, l: 11 },
    xl: { v: 112, l: 12 },
  };
  const s = sizes[size];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          fontSize: s.v,
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          fontWeight: 500,
          color: accent ? "var(--accent)" : "var(--fg)",
          fontFeatureSettings: '"tnum" 1, "ss01" 1',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: s.l,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {label}
      </div>
      {note && (
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.04em",
          }}
        >
          {note}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Section heading — eyebrow + title pair used in all variations.
   ───────────────────────────────────────────────────────────────────────── */
function Eyebrow({ index, children, accent }) {
  return (
    <div
      style={{
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: accent ? "var(--accent)" : "rgba(255,255,255,0.45)",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {index && (
        <span style={{ color: "var(--accent)" }}>
          {String(index).padStart(2, "0")}
        </span>
      )}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Skim/Full tab switcher — sticky in some variations.
   ───────────────────────────────────────────────────────────────────────── */
function ViewToggle({ value, onChange, density = "comfortable" }) {
  return (
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
      {["full", "skim"].map((mode) => {
        const active = value === mode;
        return (
          <button
            key={mode}
            onClick={() => onChange(mode)}
            style={{
              padding: density === "compact" ? "5px 12px" : "7px 14px",
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
            }}
          >
            {mode}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Skim block — shown only when skim mode is active. Single line summary.
   ───────────────────────────────────────────────────────────────────────── */
function Skim({ children, when }) {
  if (when !== "skim") return null;
  return (
    <div
      style={{
        padding: "16px 18px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderLeft: "2px solid var(--accent)",
        borderRadius: 2,
        fontFamily: "var(--mono)",
        fontSize: 12,
        letterSpacing: "0.02em",
        color: "rgba(255,255,255,0.75)",
        lineHeight: 1.5,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Reveal — wraps a block and fades it in on intersection.
   Intensity comes from --reveal-intensity (0..1).
   ───────────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 16 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : `calc(1 - var(--reveal-intensity, 1))`,
        transform: shown
          ? "translateY(0)"
          : `translateY(calc(${y}px * var(--reveal-intensity, 1)))`,
        transition: `opacity calc(700ms * var(--reveal-intensity, 1)) cubic-bezier(.2,.7,.2,1) ${delay}ms, transform calc(700ms * var(--reveal-intensity, 1)) cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PortfolioChrome — the persistent top nav (matches the home page).
   ───────────────────────────────────────────────────────────────────────── */
function PortfolioChrome({ current }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in oklab, var(--bg) 80%, transparent)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 32px",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a
            href="#"
            style={{
              color: "var(--fg)",
              textDecoration: "none",
              fontWeight: 600,
              fontFamily: '"Geist", "Helvetica Neue", system-ui, sans-serif',
              fontSize: 14,
              letterSpacing: "-0.01em",
              textTransform: "none",
            }}
          >
            Jay Arnold
          </a>
          <nav
            style={{
              display: "flex",
              gap: 22,
              color: "rgba(255,255,255,0.55)",
              fontFamily: '"Geist", "Helvetica Neue", system-ui, sans-serif',
              fontSize: 14,
              letterSpacing: "-0.01em",
              textTransform: "none",
            }}
          >
            <a
              href="Homepage.html"
              style={{
                color: current === "work" ? "var(--fg)" : "inherit",
                textDecoration: "none",
                fontWeight: current === "work" ? 500 : 400,
              }}
            >
              Work
            </a>
            <a
              href="About.html"
              style={{
                color: current === "about" ? "var(--fg)" : "inherit",
                textDecoration: "none",
                fontWeight: current === "about" ? 500 : 400,
              }}
            >
              About
            </a>
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent)" }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
            }}
          />
          Available for work
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   NextCaseStudy — small footer link to the next case study.
   ───────────────────────────────────────────────────────────────────────── */
function NextCaseStudy({ next, density = "comfortable" }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={`Case Study Detail.html?study=${next.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: density === "compact" ? "28px 24px" : "48px 32px",
        marginInline: density === "compact" ? -24 : -32,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        color: "var(--fg)",
        textDecoration: "none",
        gap: 24,
        background: hover ? "rgba(255,255,255,0.015)" : "transparent",
        transition: "background var(--t-med)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: hover ? "var(--accent)" : "rgba(255,255,255,0.45)",
            transition: "color var(--t-fast)",
          }}
        >
          Next case study
        </div>
        <div
          style={{
            fontSize: density === "compact" ? 32 : 44,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 500,
            color: hover ? "var(--fg)" : "rgba(255,255,255,0.92)",
            transition: "color var(--t-fast)",
          }}
        >
          {next.title}
        </div>
      </div>
      <span
        style={{
          fontFamily: "var(--mono)",
          color: hover ? "var(--accent)" : "rgba(255,255,255,0.5)",
          fontSize: 24,
          transform: hover ? "translateX(8px)" : "translateX(0)",
          transition: "transform var(--t-med), color var(--t-fast)",
          display: "inline-block",
        }}
      >
        →
      </span>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SiteFooter — unified footer used across Homepage, About, and case study pages.
   ───────────────────────────────────────────────────────────────────────── */
function SiteFooter({ maxWidth = 1400 }) {
  return (
    <footer
      style={{
        maxWidth,
        margin: "0 auto",
        padding: "32px 32px 48px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <span>© 2026 Jay Arnold · Durango, CO</span>
        <ContactLinks compact />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.32)",
        }}
      >
        <span>Geist + Geist Mono</span>
        <span>Designed in Figma · Built in Claude Code</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ContactLinks — Email / Resume / LinkedIn link list. Shared across the
   About page and the case-study page footers.
   ───────────────────────────────────────────────────────────────────────── */
function ContactLinks({ compact }) {
  const items = [
    ["Email", "jaymillerarnold@gmail.com", "mailto:jaymillerarnold@gmail.com"],
    ["Resume", "Jay_Arnold_Resume.pdf", "Jay_Arnold_Resume.pdf", { download: true }],
    ["LinkedIn", "in/jay-m-arnold", "https://www.linkedin.com/in/jay-m-arnold/", { external: true }],
  ];
  if (compact) {
    return (
      <div
        style={{
          display: "flex",
          gap: 28,
          flexWrap: "wrap",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {items.map(([label, , href, opts = {}]) => (
          <a
            key={label}
            href={href}
            {...(opts.download ? { download: "" } : {})}
            {...(opts.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {label} ↗
          </a>
        ))}
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        fontFamily: "var(--mono)",
        fontSize: 12,
        letterSpacing: "0.04em",
        color: "rgba(255,255,255,0.55)",
      }}
    >
      {items.map(([label, val, href, opts = {}]) => (
        <a
          key={label}
          href={href}
          {...(opts.download ? { download: "" } : {})}
          {...(opts.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBlock: 10,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.85)" }}>{label}</span>
          <span>{val} ↗</span>
        </a>
      ))}
    </div>
  );
}

Object.assign(window, {
  Placeholder,
  Tag,
  Stat,
  Eyebrow,
  ViewToggle,
  Skim,
  Reveal,
  PortfolioChrome,
  NextCaseStudy,
  ContactLinks,
  SiteFooter,
});
