"use client";

import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  DatabaseSearch,
  FileCheck2,
  FlaskConical,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const platformLayers = [
  ["Connect agents from anywhere", "Bring agents from AWS, Azure, GCP, LangChain, on-prem, or custom stacks into one governed layer."],
  ["Run on any LLM", "Keep model choice flexible across GPT, Claude, Gemini, Llama, Mistral, or private models."],
  ["Simulation Engine", "Run domain scenarios, adversarial cases, and edge cases before the agent touches production."],
  ["Observability", "Trace live runs across latency, quality, token usage, cost, failures, tools, and decision paths."],
  ["Hallucination & PII Guard", "Detect hallucination risk, mask sensitive data, enforce output policy, and route unsafe responses."],
  ["Access & Governance", "Use SSO, RBAC, policy enforcement, and explicit permissions across agents, tools, and data."],
  ["Audit & Compliance", "Keep immutable evidence for access, governance, compliance review, and enterprise trust."],
];

const companyDirections = [
  [
    "Enterprise AI Agent Infrastructure",
    "Lyzr helps companies build, deploy, and manage AI agents at scale across business functions.",
  ],
  [
    "Agent Control Plane",
    "A neutral layer to register, govern, evaluate, approve, monitor, and audit agents from any framework or cloud.",
  ],
  [
    "Pilot-to-Production Readiness",
    "The company direction is to move agents out of pilot purgatory and into governed production faster.",
  ],
  [
    "Evaluate, Deploy, Observe, Govern",
    "Lyzr’s platform story covers the full enterprise agent lifecycle, not only the builder experience.",
  ],
  [
    "Simulation Before Launch",
    "Teams can test scenarios, catch failures, and improve agent behavior before customers experience it.",
  ],
];

const productDecision = [
  [
    "Product Bet",
    "Build Continuous Launch Intelligence, starting with an Agent Launch Readiness Checker as the MVP surface.",
  ],
  [
    "Primary User",
    "Head of AI Platform, because this person owns the go/no-go decision across product, FDE, risk, security, compliance, and business teams.",
  ],
  [
    "Why It Matters",
    "Lyzr’s promise is agents in production. The missing product moment is helping teams prove readiness before launch pressure peaks.",
  ],
  [
    "MVP Outcome",
    "Turn launch evidence and production signals into readiness score, blockers, owners, rollout stage, and next-cycle recommendations.",
  ],
];

const personas = [
  {
    initials: "AR",
    name: "Aarav Rao",
    role: "Head of AI Platform",
    profession: "AI Platform Leader",
    occupation: "Owns enterprise AI agent rollout across teams, use cases, and customer-facing production paths.",
    experience: "8+ years in AI platform, product, governance, or enterprise transformation leadership.",
    workContext: "Coordinates product, FDE, platform, risk, security, compliance, and business teams before launch.",
    context: "Owns enterprise agent rollout across business functions.",
    goal: "Move agents from prototype to governed production.",
    behavior: "Balances speed from business teams with review from security and legal.",
    success: "More agents reaching production with fewer compliance escalations.",
    decision: "Approves whether an agent is ready to move from pilot to governed launch.",
    pain: [
      "Teams bring promising prototypes without a complete launch plan.",
      "Value, risk, data, integrations, approvals, and monitoring are discussed separately.",
      "Readiness proof is scattered across demos, docs, tickets, policies, and stakeholder memory.",
      "Security and compliance questions arrive late in the launch cycle.",
      "Post-launch learning is not always fed back into the next rollout.",
    ],
  },
  {
    initials: "FK",
    name: "Farah Khan",
    role: "Forward Deployed Engineer",
    profession: "Forward Deployed Engineer",
    occupation: "Builds customer-specific agents, integrates tools, and converts real workflows into working prototypes.",
    experience: "3+ years across full-stack engineering, backend services, AI tooling, and customer implementation.",
    workContext: "Works under tight pilot timelines where demos must quickly become credible production plans.",
    context: "Builds customer-specific agents and demos with tight timelines.",
    goal: "Ship a credible prototype and convert it into a production path.",
    behavior: "Moves fast, integrates tools, and translates customer workflows into agent behavior.",
    success: "Fewer handoffs between demo, pilot, readiness review, and deployment.",
    decision: "Chooses what to test before asking customer stakeholders for approval.",
    pain: [
      "Customer workflows have hidden exceptions.",
      "Launch readiness slows down after the demo is loved.",
      "Edge cases are remembered by operators, not written down.",
      "Approval criteria change across customer teams.",
      "A blocked launch can feel like rework instead of learning.",
    ],
  },
  {
    initials: "MS",
    name: "Meera Shah",
    role: "Risk and Compliance Lead",
    profession: "Risk and Compliance Lead",
    occupation: "Reviews agent workflows for regulated data, audit evidence, policy exposure, and approval readiness.",
    experience: "6+ years in compliance, risk, security review, privacy, or enterprise AI governance.",
    workContext: "Supports regulated workflows where missing proof can block production or create audit exposure.",
    context: "Reviews AI systems for regulated data, audit evidence, and policy exposure.",
    goal: "Ensure agents operate inside policy boundaries with traceable decisions.",
    behavior: "Asks for evidence, thresholds, controls, and clear ownership.",
    success: "Audit-ready agent launches with no surprise data or policy gaps.",
    decision: "Defines which actions require hard blocks, review, or monitoring.",
    pain: [
      "Agent behavior can be hard to reconstruct from a business point of view.",
      "PII and policy risks are discovered too late.",
      "Approval language is vague.",
      "Teams confuse a good demo with a safe launch.",
      "Compliance review becomes a bottleneck when evidence is missing.",
    ],
  },
  {
    initials: "RS",
    name: "Rohan Sinha",
    role: "Business Operations Owner",
    profession: "Business Operations Owner",
    occupation: "Requests agents for support, sales, finance, or internal operations and owns workflow outcomes.",
    experience: "7+ years in operations, customer support, revenue operations, finance operations, or process ownership.",
    workContext: "Knows the real workflow and edge cases, but needs help translating them into launch-ready evidence.",
    context: "Requests an agent for support, sales, finance, or internal operations.",
    goal: "Automate repetitive work without losing control of exceptions.",
    behavior: "Knows the workflow deeply but may not know how to define launch readiness evidence.",
    success: "Faster turnaround, fewer manual handoffs, and confidence in escalations.",
    decision: "Supplies examples, exceptions, and real-world failure cases.",
    pain: [
      "Hard to explain edge cases to technical teams.",
      "Does not know what good launch readiness coverage means.",
      "Needs visibility into why the agent made a recommendation.",
      "Worries the agent may mishandle unusual customers.",
      "Manual review stays high when trust is low.",
    ],
  },
];

const finalPersonaCriteria = [
  ["Launch decision ownership", "5/5", "Aarav is accountable for the go/no-go decision before agents move into production."],
  ["Cross-functional leverage", "5/5", "He coordinates FDE, platform, risk, security, compliance, and business stakeholders."],
  ["Problem severity", "5/5", "Scattered launch evidence directly blocks his ability to approve safe rollout."],
  ["Lyzr product fit", "5/5", "His workflow maps to Lyzr’s control plane, simulation, evaluation, governance, and observability layers."],
  ["Business impact", "4/5", "Improves pilot-to-production speed and confidence, though revenue impact depends on adoption across customer teams."],
];

const journey = [
  {
    title: "Agent intake",
    action: "Aarav receives a new customer-support agent request from a business team.",
    thinking: "This could save time, but I need to know the workflow, value, data, risk, and launch path.",
    pain: "The request is framed as a use case, not as measurable launch criteria.",
    opportunity: "Add a structured readiness intake that captures users, data scope, tools, autonomy, ROI, risk, and owner.",
  },
  {
    title: "Prototype review",
    action: "The first working agent is demonstrated by an FDE or platform engineer.",
    thinking: "The demo works, but production will include edge cases the demo did not show.",
    pain: "Stakeholders see value before the deployment, governance, and operating model are ready.",
    opportunity: "Convert demo learnings into launch requirements: integrations, approvals, controls, metrics, and failure handling.",
  },
  {
    title: "Readiness review",
    action: "Aarav works with risk, operations, and engineering to define what must be true before launch.",
    thinking: "A launch needs more than correctness; it needs data readiness, integrations, approval gates, monitoring, and rollback.",
    pain: "Readiness ownership is unclear across product, FDE, platform, security, and business teams.",
    opportunity: "Create a launch readiness checklist with owners, evidence, blockers, and staging requirements.",
  },
  {
    title: "Scenario simulation",
    action: "The team runs domain scenarios, adversarial prompts, tool-use checks, and failure cases.",
    thinking: "The agent should prove it can handle messy real-world situations before launch approval.",
    pain: "Scenario coverage is hard to judge when examples, policies, and edge cases are scattered.",
    opportunity: "Tie simulation coverage directly to launch readiness evidence and blocker status.",
  },
  {
    title: "Gate decision",
    action: "The agent enters staging, evaluation, and approval before production rollout.",
    thinking: "I need a clear yes/no decision, not a vague readiness discussion.",
    pain: "Blockers are hard to interpret if the launch criteria were never captured together.",
    opportunity: "Separate blockers, warnings, human approvals, rollback triggers, and post-launch monitors.",
  },
  {
    title: "Controlled launch",
    action: "The agent is released to a limited user group with human gates, monitoring, and rollback criteria.",
    thinking: "Production should start controlled, measurable, and reversible.",
    pain: "Teams often jump from pilot confidence to broad rollout without staged operating controls.",
    opportunity: "Define rollout stage, owner, escalation path, and rollback trigger before full production.",
  },
  {
    title: "Launch learning",
    action: "Live traces, corrections, failures, and cost patterns are reviewed after launch.",
    thinking: "The launch model should improve every week as the agent sees real usage.",
    pain: "Learning can remain fragmented across logs, tickets, and stakeholder memory.",
    opportunity: "Feed production signals back into the next launch readiness cycle.",
  },
];

const riceProblems = [
  ["Launch readiness starts too late", 5, 5, 85, 2, "Aarav, Farah, Meera", "Critical gaps appear after prototype excitement, when launch pressure is already high."],
  ["Readiness signals are scattered across teams", 5, 5, 80, 2, "Aarav, Farah, Meera, Rohan", "Value, risk, data, test coverage, approvals, and monitoring live in different places."],
  ["Ownership is unclear across product, FDE, risk, and business", 4, 4, 75, 3, "Aarav, Farah, Rohan", "Teams know the agent could help, but not who owns evidence, approval, rollout, or rollback."],
  ["Approval rules are inconsistent", 3, 4, 75, 2, "Aarav, Meera", "Every agent launch can become a custom review instead of a repeatable readiness path."],
  ["Scenario coverage is hard to judge", 4, 4, 70, 3, "Farah, Meera, Rohan", "Teams cannot tell whether simulations represent real workflow exceptions and policy risks."],
  ["Post-launch learning is fragmented", 3, 4, 65, 3, "Aarav, Farah", "Production traces, cost patterns, failures, and corrections do not always improve the next launch."],
];

const userProblems = [
  [
    "Prototype value is clear, launch readiness is not",
    "Business teams see a promising demo before data, risk, approvals, rollout, and monitoring are ready.",
    "This is the highest-risk moment because confidence rises faster than governance evidence.",
  ],
  [
    "Readiness evidence is scattered",
    "Use-case notes, policies, scenario examples, integration details, approval status, and blockers sit across teams and tools.",
    "Aarav cannot make a clean go/no-go decision without one shared readiness view.",
  ],
  [
    "Risk review happens late",
    "Compliance, privacy, security, and policy questions often appear after the agent already feels close to launch.",
    "Late review creates rework, slows customer momentum, and weakens trust in the launch process.",
  ],
  [
    "Scenario coverage is hard to defend",
    "Teams run tests, but it is unclear whether they cover real user exceptions, adversarial inputs, tool failures, and regulated data paths.",
    "Without coverage confidence, the team cannot explain why an agent is ready for controlled production.",
  ],
  [
    "Ownership is unclear",
    "Platform, FDE, risk, security, compliance, and business teams all touch readiness, but ownership is split.",
    "When ownership is split, blockers become conversations instead of assigned next actions.",
  ],
  [
    "Launch learning does not close the loop",
    "Live traces, failures, corrections, latency, cost, and user feedback are not always fed back into future readiness plans.",
    "The same launch mistakes can repeat across customers, teams, or agent types.",
  ],
];

const solutionIdeas = [
  {
    title: "Continuous Launch Intelligence",
    tag: "Prioritized",
    body: "A learning layer that connects readiness evidence, launch decisions, production traces, failures, corrections, usage, and cost drift into the next rollout plan.",
    why: "Best fit because it extends Lyzr’s production story beyond go-live and turns every launch into reusable intelligence.",
  },
  {
    title: "Agent Launch Twin",
    tag: "Strategic moonshot",
    body: "A simulated launch model that predicts where an agent rollout may fail before customer production use.",
    why: "High upside, but it needs stronger historical launch data, simulation fidelity, and confidence calibration before MVP.",
  },
  {
    title: "Autonomous Launch PM",
    tag: "Long-term automation",
    body: "An AI PM assistant that creates launch plans from use case, policies, logs, integrations, and stakeholder notes.",
    why: "Compelling, but too broad until the readiness workflow, evidence model, and governance rules are proven.",
  },
];

const solutionPriority = [
  ["Continuous Launch Intelligence", "Moonshot", "6-8 weeks", 4, 5, 52, 86, "Best moonshot because it extends launch readiness with real production traces, failures, corrections, usage, and cost patterns."],
  ["Agent Launch Twin", "Moonshot", "10-12 weeks", 5, 5, 84, 78, "Highest strategic upside, but it needs stronger simulation data, historical launches, and model confidence before MVP."],
  ["Autonomous Launch PM", "Moonshot", "8-10 weeks", 4, 4, 68, 62, "Useful long-term assistant, but too broad until the readiness workflow and evidence model are proven."],
];

const mvpFrames: Array<{ step: string; title: string; body: string; icon: ReactNode }> = [
  {
    step: "01",
    title: "Launch Intake",
    body: "Capture the use case, business value, target users, data sensitivity, autonomy level, owner, and launch target.",
    icon: <ClipboardList size={38} />,
  },
  {
    step: "02",
    title: "Evidence Readiness",
    body: "Show which proof is present or missing across value, data, integrations, simulation, governance, approvals, and monitoring.",
    icon: <DatabaseSearch size={38} />,
  },
  {
    step: "03",
    title: "Risk Simulation",
    body: "Map domain scenarios, adversarial prompts, tool failures, PII exposure, and edge cases to readiness evidence.",
    icon: <FlaskConical size={38} />,
  },
  {
    step: "04",
    title: "Approval Gate",
    body: "Separate blockers, warnings, human approvals, rollback triggers, and production launch requirements.",
    icon: <BadgeCheck size={38} />,
  },
  {
    step: "05",
    title: "Rollout Blueprint",
    body: "Generate rollout stage, owner map, monitor list, next action, and post-launch review loop.",
    icon: <Rocket size={38} />,
  },
];

const metricGroups = [
  {
    label: "North Star",
    score: 5,
    title: "Governed Agent Launch Rate",
    body: "The percentage of AI agents that move from prototype to production with complete readiness evidence, approved owners, risk checks, rollout plan, and monitoring in place.",
    rows: [
      ["Metric", "Governed Agent Launch Rate", "North Star", 100],
      ["Formula", "(Agents launched with complete readiness evidence / Total agents approved for launch) x 100", "Formula", 100],
      ["Target", "Out of every 100 agents approved for launch, at least 75 should reach governed production with complete evidence, approval, rollout, and monitoring.", "75%", 75],
    ],
    note: "",
  },
  {
    label: "Completion",
    score: 70,
    title: "Completion Metrics",
    body: "Shows whether users finish the readiness flow with evidence, owners, blockers, and launch stage filled.",
    rows: [
      ["Metric", "Readiness Completion Rate", "Completion", 100],
      ["Formula", "(Readiness checks completed with evidence, owner, blockers, and launch stage / Readiness checks started) x 100", "Formula", 100],
      ["Target", "At least 70 of every 100 started readiness checks should become complete launch files.", "70%", 70],
      ["Reason", "The product only creates value when the readiness file is complete enough to support a go/no-go decision.", "Why", 100],
    ],
    note: "",
  },
  {
    label: "Quality",
    score: 85,
    title: "Quality Metrics",
    body: "Shows whether the evidence added is useful, specific, and tied to real launch risks.",
    rows: [
      ["Metric", "Accepted Evidence Rate", "Quality", 100],
      ["Formula", "(Evidence items accepted by reviewer / Total evidence items submitted) x 100", "Formula", 100],
      ["Target", "At least 85 of every 100 submitted evidence items should be accepted without rework.", "85%", 85],
      ["Reason", "Low-quality evidence can create false confidence even when the checklist looks complete.", "Why", 100],
    ],
    note: "",
  },
  {
    label: "Risk",
    score: 90,
    title: "Risk Metrics",
    body: "Shows whether blockers, policy gaps, PII concerns, failure cases, and rollback triggers are identified before launch.",
    rows: [
      ["Metric", "Pre-launch Risk Capture Rate", "Risk", 100],
      ["Formula", "(Critical risks identified before launch / Total critical risks found before launch and within 30 days after launch) x 100", "Formula", 100],
      ["Target", "At least 90 of every 100 critical risks should be identified before the agent reaches production.", "90%", 90],
      ["Reason", "Enterprise agents need trust, policy control, and rollback readiness before production.", "Why", 100],
    ],
    note: "",
  },
  {
    label: "Time-to-Launch",
    score: 30,
    title: "Time-to-Launch Metrics",
    body: "Shows whether the product reduces time from prototype review to governed launch decision.",
    rows: [
      ["Metric", "Prototype-to-Decision Speedup", "Time", 100],
      ["Formula", "((Baseline days from prototype review to launch decision - Current days) / Baseline days) x 100", "Formula", 100],
      ["Target", "Reduce the time from prototype review to launch decision by 30%.", "30%", 30],
      ["Reason", "Lyzr’s value is helping teams move agents from pilot to governed production faster.", "Why", 100],
    ],
    note: "",
  },
  {
    label: "Adoption",
    score: 75,
    title: "Adoption Metrics",
    body: "Shows whether multiple teams and stakeholders use the same readiness workflow.",
    rows: [
      ["Metric", "Cross-functional Adoption Rate", "Adoption", 100],
      ["Formula", "(Readiness checks with platform, FDE, risk, and business participation / Total readiness checks) x 100", "Formula", 100],
      ["Target", "At least 75 of every 100 readiness checks should include the required cross-functional owners.", "75%", 75],
      ["Reason", "Launch readiness only works if platform, FDE, risk, compliance, and business teams use the same evidence view.", "Why", 100],
    ],
    note: "",
  },
  {
    label: "Retention",
    score: 60,
    title: "Retention Metrics",
    body: "Shows whether users come back for future launches and reuse readiness evidence.",
    rows: [
      ["Metric", "Repeat Launch Usage Rate", "Retention", 100],
      ["Formula", "(Teams using the checker for a second agent launch / Teams that used it for one agent launch) x 100", "Formula", 100],
      ["Target", "At least 60 of every 100 teams that use the checker once should return for another agent launch.", "60%", 60],
      ["Reason", "Continuous Launch Intelligence becomes stronger when teams use it across many launches, not once.", "Why", 100],
    ],
    note: "",
  },
];

const risks = [
  ["False readiness confidence", "A score can look authoritative even when evidence is weak. The product must keep blockers, missing proof, and reviewer notes visible."],
  ["Incomplete launch evidence", "Teams may attach documents without proving data readiness, edge-case coverage, integration behavior, approval path, or monitoring readiness."],
  ["Low cross-functional adoption", "If product, FDE, platform, risk, compliance, and business owners do not use the same readiness view, launch decisions stay fragmented."],
];

const guardrails = [
  ["Human approval required", "High-impact or customer-facing actions require a named approver before staging, controlled launch, or production movement."],
  ["PII and policy checks", "Sensitive agents must complete access, PII handling, legal, audit, and policy checks before the readiness gate can pass."],
  ["Rollback trigger required", "Every controlled launch must define rollback trigger, escalation owner, monitor list, and next action before rollout."],
];

const constraints = [
  ["Does not replace core platform", "The MVP supports Lyzr’s Simulation Engine, Evaluation Gate, and Control Plane; it does not rebuild or replace them."],
  ["Does not run deployments", "The MVP recommends rollout stage and next action, but it does not execute real customer cloud deployments."],
  ["Does not certify compliance", "The readiness decision remains evidence-based and reviewer-led; the MVP does not guarantee safety, correctness, or compliance certification."],
];

const finalVerdict = [
  {
    label: "Observed",
    title: "Launch evidence is fragmented",
    body: "Agent teams can build strong prototypes, but launch readiness gets scattered across demos, docs, owners, risk reviews, and production signals.",
    icon: <DatabaseSearch size={26} />,
  },
  {
    label: "Prioritized",
    title: "Continuous Launch Intelligence",
    body: "This direction wins because it compounds over time: every readiness check, launch decision, failure, correction, and trace improves the next rollout.",
    icon: <BadgeCheck size={26} />,
  },
  {
    label: "Found",
    title: "Agent Launch Readiness Checker is the MVP",
    body: "The smallest useful surface is a guided checker that turns intake, evidence, simulation, gate decision, and rollout plan into one shared launch view.",
    icon: <ClipboardList size={26} />,
  },
  {
    label: "Conclusion",
    title: "Build the launch decision layer",
    body: "The product should help Lyzr customers prove when an agent is ready, blocked, or limited before it reaches governed production.",
    icon: <Rocket size={26} />,
  },
];

function riceScore([, reach, impact, confidence, effort]: (string | number)[]) {
  return Math.round((Number(reach) * Number(impact) * (Number(confidence) / 100)) / Number(effort) * 10) / 10;
}

export default function Home() {
  const [selectedMetric, setSelectedMetric] = useState(metricGroups[0]);
  const sortedRice = useMemo(
    () => [...riceProblems].sort((a, b) => riceScore(b) - riceScore(a)),
    [],
  );

  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--ink)]">
      <SiteHeader />

      <section id="top" className="hero-section single-hero">
        <div className="hero-main">
          <h1>Agent Launch Readiness for Lyzr AI</h1>
          <p className="hero-copy">
            A launch-readiness case study for Lyzr’s enterprise AI agent platform.
          </p>
          <div className="product-decision-strip">
            {productDecision.map(([title, body]) => (
              <div className="product-decision-card" key={title}>
                <span>{title}</span>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div id="about-company" className="about-company-section">
            <div className="about-company-title">
              <h2>About Company</h2>
            </div>
            <div className="company-context-panel hero-subsection">
              <div className="company-context-title hero-subsection-title">
                <h3>Company Context</h3>
              </div>
              <div className="company-context-summary">
                <div>
                  <span>What Company Does</span>
                  <p>
                    Lyzr builds enterprise AI agent infrastructure that helps teams design, build,
                    test, deploy, govern, observe, and improve AI agents at scale.
                  </p>
                </div>
                <div>
                  <span>Company Goal</span>
                  <p>
                    Help enterprises move AI agents from prototype to governed production faster, with
                    security, evaluation, identity, compliance, monitoring, and approvals built in.
                  </p>
                </div>
                <div>
                  <span>Company Vision</span>
                  <p>
                    Become the trusted backbone for AI agents inside enterprises worldwide, especially
                    when critical workflows are run by agentic systems.
                  </p>
                </div>
              </div>
            </div>
            <div className="company-direction hero-subsection">
              <div className="company-direction-title hero-subsection-title">
                <h3>What Lyzr is building toward</h3>
              </div>
              <div className="company-direction-grid">
                {companyDirections.map(([title, body], index) => (
                  <div className="company-direction-card" key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="platform-workflow hero-subsection">
              <div className="platform-workflow-title hero-subsection-title">
                <h3>How Platform Works</h3>
                <p>From prototype to governed production</p>
              </div>
              <div className="platform-layer-grid">
              {platformLayers.map(([title, body], index) => (
                <div className="flow-row" key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
        <a className="portfolio-float" href="https://darshdave.com" target="_blank" rel="noreferrer">
          <img src={`${siteBasePath}/darsh-portrait.png`} alt="AI generated portrait of Darsh Dave" />
          <div>
            <span>Explore Portfolio</span>
            <strong>darshdave.com</strong>
          </div>
          <ArrowRight size={34} />
        </a>
      </section>

      <section id="user-personas" className="personas-section">
        <div className="user-personas-card">
          <div className="user-personas-title">
            <h2>User Personas</h2>
          </div>
          <div className="persona-subsection">
            <div className="persona-grid">
              {personas.map((persona) => (
                <div className="persona-detail" key={persona.name}>
                  <div className="persona-visual">
                    <span>{persona.initials}</span>
                    <small>{persona.profession}</small>
                  </div>
                  <div className="persona-head">
                    <div>
                      <h3>{persona.name}</h3>
                      <p>{persona.role}</p>
                    </div>
                  </div>
                  <div className="persona-fields">
                    <p><strong>Profession:</strong> {persona.profession}</p>
                    <p><strong>Occupation:</strong> {persona.occupation}</p>
                    <p><strong>Experience:</strong> {persona.experience}</p>
                    <p><strong>Work Context:</strong> {persona.workContext}</p>
                    <p><strong>Behavior:</strong> {persona.behavior}</p>
                    <p><strong>Goal:</strong> {persona.goal}</p>
                    <p><strong>Pain Point:</strong> {persona.pain[0]}</p>
                  </div>
                  <dl className="sr-only">
                    <dt>Context</dt>
                    <dd>{persona.context}</dd>
                    <dt>Goal</dt>
                    <dd>{persona.goal}</dd>
                    <dt>Behavior</dt>
                    <dd>{persona.behavior}</dd>
                    <dt>Success metric</dt>
                    <dd>{persona.success}</dd>
                    <dt>Decision</dt>
                    <dd>{persona.decision}</dd>
                  </dl>
                </div>
              ))}
            </div>
          </div>
          <div className="final-persona-block">
            <div className="final-persona-copy">
              <span>Final User Persona</span>
              <h3>Aarav Rao, Head of AI Platform</h3>
              <p>
                Aarav sits at the decision point where business value, platform readiness, risk, legal review,
                and production confidence meet. Solving for him also helps FDEs, compliance teams, and
                business owners because everyone needs the same launch evidence.
              </p>
              <div className="score-method">
                <strong>Scoring Method</strong>
                <p>
                  Each parameter is ranked from 1 to 5 based on decision ownership, pain intensity,
                  Lyzr product fit, cross-functional leverage, and expected launch impact.
                </p>
              </div>
              <div className="final-score">
                <span>Final fit score</span>
                <strong>24 / 25</strong>
              </div>
            </div>
            <div className="selection-matrix">
              {finalPersonaCriteria.map(([parameter, score, reason]) => (
                <div className="selection-row" key={parameter}>
                  <span>{parameter}</span>
                  <strong>{score}</strong>
                  <p>{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="user-journey" className="journey-section">
        <div className="user-journey-card">
          <div className="user-journey-title">
            <h2>User Journey</h2>
          </div>
          <div className="journey-track">
            <svg className="journey-route" viewBox="0 0 120 1000" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="journey-route-arrow" markerWidth="16" markerHeight="16" refX="12" refY="8" orient="auto" markerUnits="strokeWidth">
                  <path d="M 2 2 L 14 8 L 2 14 Z" fill="#f7eadf" />
                </marker>
              </defs>
              <path
                className="journey-route-base"
                d="M 60 24 C 16 106 104 178 60 258 C 16 338 104 418 60 500 C 16 582 104 662 60 742 C 20 816 78 895 60 970"
              />
              <path
                className="journey-route-dash"
                d="M 60 24 C 16 106 104 178 60 258 C 16 338 104 418 60 500 C 16 582 104 662 60 742 C 20 816 78 895 60 970"
              />
            </svg>
            {journey.map((item, index) => (
              <div className="journey-step" key={item.title}>
                <div className="journey-card">
                  <div className="journey-card-head">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="journey-fields">
                    <p><strong>Action:</strong> {item.action}</p>
                    <p><strong>Thinking:</strong> {item.thinking}</p>
                    <p><strong>Pain Point:</strong> {item.pain}</p>
                    <p><strong>Opportunity:</strong> {item.opportunity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="problem" className="problem-section">
        <div className="problem-case-card">
          <div className="problem-title">
            <h2>Problem Statement</h2>
          </div>

          <div className="problem-subsection">
            <h3>User Problems</h3>
            <div className="problem-card-grid">
              {userProblems.map(([title, body, reason], index) => (
                <div className="problem-card" key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{title}</strong>
                  <p>{body}</p>
                  <small>{reason}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="problem-subsection">
            <h3>RICE Prioritization</h3>
            <div className="problem-table-wrap">
              <table className="problem-rice-table">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>User affected</th>
                    <th>Reach</th>
                    <th>Impact</th>
                    <th>Confidence</th>
                    <th>Effort</th>
                    <th>RICE score</th>
                    <th>Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRice.map((row) => (
                    <tr key={String(row[0])}>
                      <td><strong>{row[0]}</strong></td>
                      <td>{row[5]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}%</td>
                      <td>{row[4]}</td>
                      <td><strong>{riceScore(row)}</strong></td>
                      <td>{row[6]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="final-problem-statement">
            <AlertTriangle size={28} />
            <div>
              <span>Final Problem Statement</span>
              <h3>
                Launch readiness starts too late
              </h3>
              <p>
                Critical gaps appear after prototype excitement, when launch pressure is already high. Enterprise AI platform leaders need one shared readiness view to decide whether an agent can move from prototype to governed production.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="solution-section">
        <div className="solution-case-card">
          <div className="solution-title">
            <h2>Solution</h2>
          </div>

          <div className="solution-subsection">
            <h3>Solution Ideas</h3>
            <div className="solution-idea-grid">
              {solutionIdeas.map((idea, index) => (
                <div className="solution-idea-card" key={idea.title}>
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{idea.tag}</small>
                  </div>
                  <strong>{idea.title}</strong>
                  <p>{idea.body}</p>
                  <em>{idea.why}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="solution-subsection">
            <h3>Moonshot Solution Prioritization</h3>
            <p className="solution-section-note">
              These are the three moonshot solution ideas. Continuous Launch Intelligence is prioritized because
              it has the strongest product fit, can start with a focused MVP, and creates a compounding
              learning loop for future agent launches.
            </p>
            <div className="solution-priority-layout">
              <div className="time-effort-matrix">
                <span className="matrix-label top">Higher product value</span>
                <span className="matrix-label bottom">Lower product value</span>
                <span className="matrix-label left">Less effort</span>
                <span className="matrix-label right">More effort</span>
                {solutionPriority.map(([title, category, time, effort, value, left, bottom]) => (
                  <div
                    className={`solution-dot ${String(category).toLowerCase()}`}
                    key={String(title)}
                    style={{ left: `${Number(left)}%`, bottom: `${Number(bottom)}%` }}
                  >
                    <span>{String(title).split(" ").slice(0, 2).join(" ")}</span>
                    <small>{time} · E{effort}/V{value}</small>
                  </div>
                ))}
              </div>
              <div className="solution-priority-list">
                {solutionPriority.map(([title, category, time, effort, value, , , reason]) => (
                  <div className="solution-priority-row" key={String(title)}>
                    <span>{category}</span>
                    <strong>{title}</strong>
                    <p>{time} · Effort {effort}/5 · Value {value}/5</p>
                    <small>{reason}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="final-solution-statement">
            <CheckCircle2 size={30} />
            <div>
              <span>Finalized Solution</span>
              <h3>Continuous Launch Intelligence</h3>
              <p>
                A launch intelligence layer that learns from readiness checks, launch decisions,
                production traces, failures, and corrections.
                It helps teams improve every future agent rollout with reusable launch evidence and recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="mvp-scope" className="section alt">
        <div className="section-heading">
          <p>10 / MVP</p>
          <h2>MVP</h2>
          <a className="mvp-title-action" href={`${siteBasePath}/prototype`} target="_blank" rel="noreferrer">
            Explore Prototype <ArrowRight size={18} />
          </a>
        </div>
        <div className="mvp-recording-card" aria-label="Looping MVP prototype walkthrough">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onEnded={(event) => {
              event.currentTarget.currentTime = 0;
              void event.currentTarget.play();
            }}
          >
            <source src={`${siteBasePath}/lyzr-mvp-tour.mp4`} type="video/mp4" />
          </video>
        </div>
        <div className="mvp-workflow-subheading">
          <p>MVP Workflow</p>
        </div>
        <div className="mini-video-grid">
          {mvpFrames.map(({ step, title, body, icon }) => (
            <div className="mini-video" key={title}>
              <div className="video-window">
                <span>{step}</span>
                {icon}
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <div className="mvp-scope-subheading">
          <p>MVP Scope</p>
          <span>What this prototype proves, what it intentionally leaves out, and how the product direction extends beyond the first version.</span>
        </div>
        <div className="mvp-grid">
          <div>
            <h3>In scope</h3>
            <ul>
              <li>Agent intake, business value, target users, autonomy, and launch owner</li>
              <li>Evidence map for data, integrations, simulation, governance, approvals, and monitoring</li>
              <li>Scenario coverage and risk checks tied to launch blockers</li>
              <li>Owner, blocker, rollout stage, approval path, and rollback mapping</li>
              <li>Readiness score, readiness decision, next action, and stakeholder explanation</li>
            </ul>
          </div>
          <div>
            <h3>Out of scope</h3>
            <ul>
              <li>Replacing Lyzr’s real Simulation Engine, Evaluation Gate, or Control Plane</li>
              <li>Running real customer cloud deployments</li>
              <li>Guaranteeing safety, correctness, or compliance certification</li>
              <li>Automated production approval</li>
              <li>Autonomous launch management without human review</li>
            </ul>
          </div>
          <div>
            <h3>Product vision</h3>
            <ul>
              <li>Continuous Launch Intelligence is the final solution direction</li>
              <li>Agent Launch Readiness Checker is the MVP module used to prove the workflow</li>
              <li>Use production traces, overrides, failures, latency, cost, and corrections as learning signals</li>
              <li>Recommend what to change before the next agent launch</li>
              <li>Turn post-launch learning into reusable readiness rules</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="metrics" className="section metrics-section">
        <div className="section-heading">
          <p>11 / Metrics</p>
          <h2>Metrics</h2>
        </div>
        <div className="metric-lens">
          <div className="metric-tabs">
            {metricGroups.map((metric) => (
              <button
                className={selectedMetric.label === metric.label ? "active" : ""}
                key={metric.label}
                onClick={() => setSelectedMetric(metric)}
              >
                <span>{metric.label}</span>
              </button>
            ))}
          </div>
          <div className="metric-detail-panel">
            <h3>{selectedMetric.label === "North Star" ? "North Star Metrics" : selectedMetric.title}</h3>
            <div className="number-metrics">
              {selectedMetric.rows.map(([name, description, target, value]) => (
                <div className={`number-metric-row ${name === "Target" ? "has-value" : "is-descriptive"}`} key={name}>
                  <div className="number-metric-head">
                    <strong>{name}</strong>
                    <span>{target}</span>
                  </div>
                  <p>{description}</p>
                  {name === "Target" ? (
                    <div className="number-bar">
                      <span style={{ width: `${Math.min(Number(value), 100)}%` }} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="risks" className="section alt">
        <div className="section-heading">
          <p>12 / Risks</p>
          <h2>Risks, Guardrails, and Constraints</h2>
        </div>
        <div className="risk-section-groups">
          <div className="risk-subsection">
            <h3>Risks</h3>
            <div className="risk-grid">
              {risks.map(([title, body]) => (
                <ArticleCard icon={<AlertTriangle size={22} />} title={title} body={body} key={title} />
              ))}
            </div>
          </div>
          <div className="risk-subsection">
            <h3>Guardrails</h3>
            <div className="risk-grid">
              {guardrails.map(([title, body]) => (
                <ArticleCard icon={<ShieldCheck size={22} />} title={title} body={body} key={title} />
              ))}
            </div>
          </div>
          <div className="risk-subsection">
            <h3>Constraints</h3>
            <div className="risk-grid">
              {constraints.map(([title, body]) => (
                <ArticleCard icon={<FileCheck2 size={22} />} title={title} body={body} key={title} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="final-verdict" className="section verdict-section">
        <div className="section-heading">
          <p>13 / Final Verdict</p>
          <h2>Final Verdict</h2>
        </div>
        <div className="final-verdict-board">
          <div className="verdict-card-grid">
            {finalVerdict.map(({ label, title, body, icon }) => (
              <div className="verdict-card" key={label}>
                <div className="verdict-card-top">
                  {icon}
                  <span>{label}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="verdict-conclusion">
            <span>Final recommendation</span>
            <strong>Ship the Agent Launch Readiness Checker as the MVP for Continuous Launch Intelligence.</strong>
            <p>
              It is the clearest bridge between Lyzr’s platform strengths and the customer’s real launch decision:
              evidence, owners, blockers, governance, rollout stage, and monitoring in one place.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-20 border-b backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <a href={`${siteBasePath}/`} className="brand-lockup" aria-label="Lyzr case study">
          <strong>Lyzr AI Case Study</strong>
        </a>
        <div className="hidden items-center gap-5 text-sm text-[var(--muted-text)] lg:flex">
          <a href="#top">Overview</a>
          <a href="#about-company">Context</a>
          <a href="#user-personas">User Personas</a>
          <a href="#user-journey">User Journey</a>
          <a href="#problem">Problem Statement</a>
          <a href="#solution">Solution</a>
          <a href="#mvp-scope">MVP</a>
          <a href="#metrics">Metrics</a>
          <a href="#risks">Risks</a>
          <a href="#final-verdict">Final Verdict</a>
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return null;
}

function ArticleCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="article-card">
      {icon}
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function IdeaColumn({ label, items }: { label: string; items: string[][] }) {
  return (
    <div className="idea-block">
      <h3>{label}</h3>
      <div className="idea-grid">
        {items.map(([title, body], index) => (
          <div className="idea-card" key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pattern({ title, body }: { title: string; body: string }) {
  return (
    <div className="pattern-step">
      <FileCheck2 size={22} />
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
