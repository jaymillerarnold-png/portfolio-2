// content.jsx — Case study content data
// Source: case study text imported May 2026, mapped onto the existing
// CASE_STUDIES shape (title/subtitle/context/research/process/screens/pull).

const CASE_STUDIES = {
  collaborative: {
    slug: "collaborative",
    title: "Collaborative Ordering & Fulfillment",
    subtitle: "",
    cover: "images/collaborative-cover.png",
    researchImage: "images/collaborative-research.png",
    tags: ["RESEARCH", "B2B"],
    role: "Lead Product Designer · Lead Researcher",
    team: "PM · EM · 6 Engineers · Customer Success · Sales",
    year: "2024 — 2025",
    duration: "Modular shipping over multiple quarters",
    client: "Inspection ordering platform",
    headers: {
      context: "The Problem",
      research: "Turning Research into a Business Case",
      researchNav: "Research",
      process: "The Process",
      screens: "What We Built",
      outcomes: "Outcomes",
    },
    metrics: [
      { value: "94%", label: "Task success", note: "across 13 validated tasks" },
      { value: "100%", label: "Said it improved", note: "in follow-up usability" },
      { value: "<50→94%", label: "Lift from V1", note: "some tasks went 0 → 94%" },
      { value: "15", label: "Participants", note: "across 14 companies" },
    ],
    context:
      "When I joined the team, a new ordering and fulfillment feature was already deep in development, nearly ready to ship. My first move was to get it in front of real users.",
    contextLong:
      "When I joined the team, a new ordering and fulfillment feature was already deep in development, nearly ready to ship. My first move was to get it in front of real users.\n\nResults were rough. In usability sessions with buyers, over 80% failed on the order template builder and 100% failed on the core order page. Vendors weren't doing any better. 100% failed on the order page, and over 50% struggled with fulfillment. A few said the workflow would double their workload.\n\nIf buyers and vendors couldn't coordinate inspection orders inside the platform, they'd just go around it. Back to email threads, spreadsheets, or competitors like RIMS. We needed a case for a full redesign before anything shipped.",
    research: [
      { label: "Participants in V1 study", value: "15" },
      { label: "Inspection companies", value: "14" },
      { label: "Validated tasks in V2", value: "13" },
      { label: "V1 buyer failure rate", value: "80%+" },
    ],
    researchNarrative:
      "I led synthesis of the usability findings and brought them to leadership across product, sales, and customer success. This was a revenue and retention risk as much as a design one. Getting buy-in meant connecting the UX failures directly to churn and competitive displacement. We got the green light to start over.",
    process: [
      {
        phase: "Audit",
        title: "Map the current implementation",
        body: "Full review of what was already built to understand the workflow, the data model, and where things broke down.",
      },
      {
        phase: "Research",
        title: "Usability sessions with 15 participants",
        body: "Structured sessions across 14 inspection companies. Three things kept showing up: people couldn't find key information, the fulfillment path was unclear, and file uploads kept breaking.",
      },
      {
        phase: "Modular design",
        title: "Skip lo-fi, ship in chunks",
        body: "With limited runway we moved straight to mid- and high-fidelity. Each section was designed, tested, and validated independently so engineering never had to wait on the full system.",
      },
      {
        phase: "Rolling handoff",
        title: "Validate, hand off, repeat",
        body: "Validated sections handed to engineering while design continued on the next chunk. The rhythm continued until every section was shipped.",
      },
    ],
    screens: [
      {
        label: "Order template builder",
        aspect: "3/2",
        src: "images/collaborative-screen-01.png",
        caption: "Lenders compose a custom intake form per inspection type. Library on the right, live form in the center, drag to reorder.",
      },
      {
        label: "Orders table",
        aspect: "16/10",
        src: "images/collaborative-screen-02.png",
        caption: "Every order from request through fulfillment in one view. Status, vendor, due date, and completion at a glance.",
      },
      {
        label: "Vendor fulfillment · AI-populated form from inspection PDF",
        aspect: "4/3",
        src: "images/collaborative-screen-03.png",
        caption: "Vendors upload their inspection PDF and the system extracts answers into the structured form. What used to be double-entry becomes a quick review pass.",
      },
      {
        label: "Buyer review · accept or request revisions",
        aspect: "16/10",
        src: "images/collaborative-screen-04.png",
        caption: "Buyers verify the submitted inspection against the original PDF and either accept the order or request revisions.",
      },
    ],
    pull:
      "Task success went from under 50% (and in some cases 0%) to 94%. Every participant said the new design was an improvement.",
  },

  compliance: {
    slug: "compliance",
    title: "Compliance Requirements",
    subtitle:
      "Bringing insurance compliance into the payments flow for construction finance.",
    cover: "images/compliance-cover.png",
    tags: ["B2B", "CONSTRUCTION"],
    role: "Lead Product Designer · Lead Researcher",
    team: "PM · EM · Engineering · Payments Team",
    year: "2023 — 2024",
    duration: "End-to-end through delivery",
    client: "Construction finance platform",
    researchImage: "images/compliance-research.png",
    headers: {
      context: "The Problem",
      research: "Turning Research into Alignment",
      process: "The Process",
      screens: "What We Shipped",
      outcomes: "Outcomes",
    },
    metrics: [
      { value: "−50%", label: "Time to payment", note: "55 days → 27 days" },
      { value: "$290M", label: "Processed", note: "in 18 months post-launch" },
      { value: "200+", label: "Organizations", note: "using the platform" },
      { value: "3", label: "Customers retained", note: "previously at risk of churn" },
    ],
    context:
      "Before a subcontractor can work on a construction project, they need to provide proof of insurance. Specific documents, in the required coverage amounts, current. For most teams that process lived entirely in email and cloud storage. Compliance managers were chasing documents and cross-referencing coverage amounts by hand across multi-year projects.",
    contextLong:
      "The pain ran in two directions. Payments couldn't go out to non-compliant vendors, which created bottlenecks that slowed projects and frustrated subs. And if a project was audited, compliance managers had to prove every vendor was covered for the full life of the project. One missing document meant real legal and financial exposure. We wanted to make compliance trackable, get teams out of the manual chase, and give them confidence that their projects were covered at every stage.",
    research: [],
    researchNarrative:
      "I led design from discovery through delivery. Journey mapping came first to get everyone looking at the same picture. Once the existing workflow was drawn out end to end, the fragmentation was hard to miss, and the case for a purpose-built solution made itself. Wireframes for internal validation came next, then higher fidelity for customer testing.",
    process: [
      {
        phase: "Journey map",
        title: "Make the fragmentation visible",
        body: "Documented the existing compliance workflow end to end. Identified failure points and built stakeholder alignment around a single picture of the problem.",
      },
      {
        phase: "Wireframes",
        title: "Pressure-test the flows",
        body: "Low-fidelity explorations to pressure-test the core flows before investing in visual design.",
      },
      {
        phase: "Customer validation",
        title: "Test before build",
        body: "Increased fidelity and tested with customers to confirm the approach before development started.",
      },
      {
        phase: "Payments integration",
        title: "Surface compliance at the right moment",
        body: "Compliance status had to surface inside the payments flow, and documents had to be requestable before a payment could go out. That took close collaboration with the payments team. The goal was one experience, not two products glued together.",
      },
    ],
    screens: [
      { label: "Compliance templates", aspect: "16/10", src: "images/compliance-screen-01.png", caption: "Compliance managers define the requirements for a project once: coverage types, minimum amounts, expirations. The template then applies to every vendor on the job." },
      { label: "Vendor document request · reply-based upload", aspect: "16/10", src: "images/compliance-screen-02.png", caption: "Vendors get a request link and upload directly, no account creation or training required. Replies route back into the project automatically." },
      { label: "Automated extraction · mapped to requirements", aspect: "16/10", src: "images/compliance-screen-03.png", caption: "The platform reads uploaded certificates, pulls coverage data, and maps it to the requirements. Gaps surface before a payment goes out." },
      { label: "Payment flow with inline compliance status", aspect: "4761/2772", src: "images/compliance-screen-04.png", caption: "Compliance status surfaces inside the payments flow. One unmet requirement and the disbursement holds until it's resolved." },
    ],
    pull:
      "Before, we spent 1–2 hours per vendor tracking down compliance docs and cutting checks. Now we can focus on project financials.",
  },

  genui: {
    slug: "genui",
    title: "GenUI Component System",
    subtitle:
      "A dynamic component set so the AI assistant can render the right format for the question.",
    cover: "images/genui-cover.png",
    tags: ["AI/ML", "DESIGN SYSTEMS"],
    role: "Lead Product Designer",
    team: "Design · Engineering · Lender Team · Data Team",
    year: "2026",
    duration: "Ongoing — V1 set shipped",
    client: "Internal platform",
    headers: {
      context: "The Opportunity",
      research: "Discovery",
      process: "The Process",
      screens: "What We Shipped",
      outcomes: "Outcomes",
    },
    metrics: [
      { value: "14", label: "Components", note: "designed in Figma" },
      { value: "~40%", label: "Built & promoted", note: "to the design system" },
      { value: "2", label: "Teams validated", note: "lender + data" },
      { value: "1", label: "Agent response shell", note: "shared container pattern" },
    ],
    context:
      "When we launched our AI assistant, it could only respond in text. That worked for simple questions, but the platform handles complex financial data. Draws, inspections, compliance status, payment timelines. A paragraph of text often isn't the right container for any of that.",
    contextLong:
      "There were two parts to this. First, the design system was missing pieces the new AI features needed. Second, and the more interesting one, I wanted to go past filling gaps and design components that render based on what someone actually asked. Ask about a payment, get a structured card. Ask about inspection data, get a chart. The response shapes itself to the question. This is the first version of that set.",
    research: [
      { label: "Audit 1", value: "Most-visited pages" },
      { label: "Audit 2", value: "Existing AI interactions" },
      { label: "Output priority", value: "Driven by usage data" },
      { label: "Build partner", value: "Claude (in Figma)" },
    ],
    researchNarrative:
      "Before I designed anything, I wanted to know what people were actually looking for when they reached for AI. So I ran two audits in parallel. One looked at the most-visited pages in the product. The other looked at how people were using the existing text-only assistant. Between them I had the priority order for the component set, without having to guess.",
    researchSkim:
      "Two audits, run side by side: most-visited pages, plus current AI interactions. The priority order came from what people were doing, not what we assumed.",
    process: [
      {
        phase: "Audit",
        title: "Two audits, in parallel",
        body: "Most-visited pages told us what content people return to. Existing AI usage told us what people ask and where text responses fall short. Together they prioritized the set.",
      },
      {
        phase: "Define",
        title: "14 organisms, one shell",
        body: "Designed cards, tables, charts, and the agent response shell that wraps them. The shell is the consistent container and interaction pattern any of the primitives render inside of.",
      },
      {
        phase: "Build with AI",
        title: "Figma + Claude",
        body: "Components were designed in Figma and built in collaboration with Claude. ~40% are built and promoted to the design system; the rest are in progress.",
      },
      {
        phase: "Validate",
        title: "Pressure-tested with the data-heavy teams",
        body: "Reviewed with the lender and data teams. Both said the set covered more than they needed, which is a meaningful bar given the complexity they deal with daily.",
      },
    ],
    screens: [
      { label: "Callout cards · tone-driven, single-record summaries", aspect: "842/1082", frame: "panel", fit: "contain", src: "images/genui-screen-01.png", caption: "A structured snapshot when the answer is a single record: payment, draw, inspection. Tone (negative, attention, positive, neutral) drives the accent, icon, and recommended action." },
      { label: "Prompt suggestions · lists & follow-up chips", aspect: "852/640", frame: "panel", fit: "contain", src: "images/genui-screen-02.png", caption: "When the agent doesn't have a question yet, prompt suggestions kick things off. Pulled from common product flows and the user's recent activity." },
      { label: "Charts · financial & inspection data", aspect: "856/1448", frame: "panel", fit: "contain", src: "images/genui-screen-03.png", caption: "For trend, distribution, and forecast questions, the agent reaches for a chart. Same financial data that lives elsewhere in the platform." },
      { label: "Mini table · comparisons & status across many", aspect: "862/480", frame: "panel", fit: "contain", src: "images/genui-screen-04.png", caption: "When the question is about multiple items or status across a set, the agent renders a sortable table instead of a paragraph of bullet points." },
      { label: "Agent response shell · wraps any primitive", aspect: "834/948", frame: "panel", fit: "contain", src: "images/genui-screen-05.png", caption: "The shared container any GenUI primitive renders inside. One consistent pattern (thought process, flagged signals, follow-ups) whether it's a card, a table, or a chart." },
    ],
    pull:
      "The agent decides which format best fits the answer instead of defaulting to text every time.",
  },

  money: {
    slug: "money",
    title: "Payment Improvements",
    subtitle:
      "Two focused UX improvements that take work off the user and put it on the software.",
    cover: "images/money-wizard-after.png",
    tags: ["FINTECH", "PAYMENTS"],
    role: "Lead Product Designer",
    team: "Design · Engineering · Payments",
    year: "2023 — 2025",
    duration: "Three coordinated shipments",
    client: "Construction finance platform",
    // Flag for Case Study Detail.html to switch to the dedicated
    // mini-case-study renderer (case-payments.jsx).
    layout: "payments",
    metrics: [
      { value: "4 → 2", label: "Clicks to send payment", note: "wizard → drawer" },
      { value: "2", label: "Friction wins", note: "shipped under one banner" },
    ],
    context:
      "Not every design problem needs starting from scratch. Payment Improvements was a pair of focused UX fixes that came straight out of customer feedback. Each one took aim at a specific point of friction in the payments experience.",
    contextLong:
      "Same goal both times. Lower cognitive load, cut unnecessary steps, and make the software feel like it's working for the user rather than the other way around. Same approach too. Look for places where the interface is asking the user to do work the software could do instead, and fix them.",
    // Mini case studies — each rendered as its own section by case-payments.jsx.
    improvements: [
      {
        slug: "tracker",
        name: "Payment Tracker",
        kicker: "Decision fatigue",
        oneLiner: "One status, one action. The rest is available on demand.",
        problem:
          "The original tracker surfaced too much at once. Several statuses, several contextual actions, and the path forward competing with the path behind for attention. Users had to parse the whole component just to find the next thing they could do.",
        approach:
          "Show only the action that's relevant to the current status. Previous and upcoming steps are still there, tucked behind a track button, but they're no longer competing with the one decision the user needs to make right now.",
        beforeLabel: "Before · everything visible at once",
        afterLabel:  "After · one action, history on demand",
        beforeHint:  "all statuses + actions stacked",
        afterHint:   "current step + track button",
        beforeSrc:   "images/money-tracker-before.png",
        afterSrc:    "images/money-tracker-after.png",
        outcome:
          "The information density didn't drop. It just stopped fighting for attention.",
      },
      {
        slug: "wizard",
        name: "Wizard to Drawer",
        kicker: "Step reduction",
        oneLiner: "A four-click wizard collapsed into a single drawer.",
        problem:
          "The Send Payment flow was a four-step wizard: amount, account, review, send. Each step lived on its own full screen. For a task that happens dozens of times a day, every extra click and page load added up.",
        approach:
          "Consolidate every relevant detail into one drawer that overlays the current page. The user stays in context, sees the full picture at once, and confirms in two clicks instead of four.",
        beforeLabel: "Before · four-step wizard",
        afterLabel:  "After · single drawer overlay",
        beforeHint:  "amount → account → review → send",
        afterHint:   "everything in one panel",
        beforeSrc:   "images/money-wizard-before.png",
        afterSrc:    "images/money-wizard-after.png",
        outcome:
          "Two clicks instead of four, dozens of times a day. Over a year, the time saved adds up to something real.",
      },
    ],
    pull:
      "Two clicks instead of four, dozens of times a day. The time saved adds up.",
  },
};

window.CASE_STUDIES = CASE_STUDIES;
