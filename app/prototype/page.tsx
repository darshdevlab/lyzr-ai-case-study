"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Database,
  FileWarning,
  ListChecks,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

const steps = [
  {
    id: "intake",
    nav: "Agent intake",
    label: "Define agent",
    guide: "Click Agent intake to capture use case, owner, data, autonomy, and value.",
    task: "Complete the launch intake form and confirm who owns the launch decision.",
    next: "Add launch evidence",
    happened: "The portal created the agent profile and found missing launch evidence.",
    icon: ClipboardList,
  },
  {
    id: "evidence",
    nav: "Evidence",
    label: "Add evidence",
    guide: "Click Evidence to attach policies, examples, integrations, and owners.",
    task: "Collect proof from docs, tickets, test cases, policies, and stakeholder notes.",
    next: "Run simulation",
    happened: "Policies, workflow examples, integrations, and owners were added to the launch file.",
    icon: Database,
  },
  {
    id: "risk",
    nav: "Simulation",
    label: "Simulate risk",
    guide: "Click Simulation to run scenario, adversarial, and tool-failure checks.",
    task: "Stress test the agent against real exceptions before staging approval.",
    next: "Prepare gate decision",
    happened: "The simulation raised warnings for VIP exceptions, policy conflict, and tool timeout.",
    icon: FileWarning,
  },
  {
    id: "gate",
    nav: "Gate decision",
    label: "Gate decision",
    guide: "Click Gate decision to separate blockers, warnings, approvers, and rollback triggers.",
    task: "Decide if the agent can move to staging, controlled launch, or stay blocked.",
    next: "Generate launch plan",
    happened: "The gate package separated blockers, warnings, approvers, and rollback triggers.",
    icon: ShieldCheck,
  },
  {
    id: "blueprint",
    nav: "Launch plan",
    label: "Launch plan",
    guide: "Click Launch plan to produce rollout stage, monitors, owners, and next action.",
    task: "Generate the controlled launch plan and schedule the post-launch learning review.",
    next: "Review learning loop",
    happened: "The portal generated a controlled rollout plan and armed the learning loop.",
    icon: Sparkles,
  },
] as const;

type StepId = typeof steps[number]["id"];

const outputs: Record<StepId, {
  title: string;
  score: number;
  verdict: string;
  status: string;
  details: string[];
  blockers: string[];
  log: string[];
}> = {
  intake: {
    title: "Agent profile captured",
    score: 38,
    verdict: "Intake in progress",
    status: "Needs launch evidence",
    details: [
      "Use case: customer support resolution agent",
      "Owner: Head of AI Platform",
      "Data: tickets, refund policy, order status",
      "Autonomy: recommends action, human approves refund",
    ],
    blockers: [
      "Success metric is not defined",
      "Risk reviewer is not assigned",
      "Production monitor is not selected",
    ],
    log: [
      "New agent request received from Support Ops",
      "Business value captured as faster ticket resolution",
      "Launch owner required before evidence review",
    ],
  },
  evidence: {
    title: "Launch evidence assembled",
    score: 56,
    verdict: "Evidence review needed",
    status: "Missing observability proof",
    details: [
      "Workflow examples: refund, delivery delay, duplicate ticket, angry customer",
      "Policies linked: refund rules, escalation policy, PII handling",
      "Owners named: FDE, risk reviewer, business owner, launch approver",
      "Gap: rollback trigger still missing",
    ],
    blockers: [
      "No rollback threshold",
      "No monitor for repeated escalations",
      "VIP customer exception examples missing",
    ],
    log: [
      "Policy documents linked",
      "Integration note added for order-status API",
      "Evidence confidence increased from 38% to 56%",
    ],
  },
  risk: {
    title: "Simulation coverage mapped",
    score: 68,
    verdict: "Sandbox ready with warnings",
    status: "Simulation warnings open",
    details: [
      "500+ domain scenarios queued",
      "Adversarial prompts cover policy override attempts",
      "Tool-use checks include missing order data",
      "Human approval required for refund execution",
    ],
    blockers: [
      "VIP exception coverage is unclear",
      "Refund policy conflict needs legal review",
      "One tool timeout path is untested",
    ],
    log: [
      "Scenario suite started",
      "PII exposure check passed",
      "Three warnings routed to owner review",
    ],
  },
  gate: {
    title: "Gate decision prepared",
    score: 76,
    verdict: "Staging gate ready",
    status: "Approval pending",
    details: [
      "Hard blocker: refund execution requires named human approver",
      "Warning: add monitor for confidence drop",
      "Approval path: business owner, risk lead, AI platform leader",
      "Rollback trigger: error spike, policy conflict, unresolved PII event",
    ],
    blockers: [
      "Business approver has not signed off",
      "Rollback owner needs confirmation",
      "Post-launch review date is missing",
    ],
    log: [
      "Gate package prepared",
      "Blockers separated from warnings",
      "Approver sequence generated",
    ],
  },
  blueprint: {
    title: "Launch plan generated",
    score: 86,
    verdict: "Controlled launch ready",
    status: "Ready for controlled rollout",
    details: [
      "Rollout: 10% internal support team, then 25% customer tickets",
      "Monitor: failures, handoff rate, cost, latency, override reasons",
      "Owner map: platform, FDE, risk, support ops, launch approver",
      "Next action: start controlled launch and schedule post-launch review",
    ],
    blockers: [
      "No hard blocker remains",
      "Two warnings stay monitored during rollout",
      "Learning loop begins after first production review",
    ],
    log: [
      "Launch plan created",
      "Continuous Launch Intelligence learning loop armed",
      "Post-launch signals will update next rollout recommendations",
    ],
  },
};

const readinessChecks = [
  ["Business value", "Outcome, users, and launch owner are clear", 0],
  ["Evidence", "Policies, examples, integrations, and approvals are linked", 1],
  ["Simulation", "Domain scenarios, adversarial cases, and tool failures are tested", 2],
  ["Governance", "Approvers, blockers, warnings, and rollback triggers are named", 3],
  ["Learning loop", "Observability and post-launch improvement signals are ready", 4],
];

const tourSequence: StepId[] = [
  "intake",
  "evidence",
  "risk",
  "gate",
  "blueprint",
];

export default function PrototypePage() {
  const [activeStep, setActiveStep] = useState<StepId>("intake");
  const [targetStep, setTargetStep] = useState<StepId>("intake");
  const [guideVisible, setGuideVisible] = useState(true);
  const [guideMode, setGuideMode] = useState<"prompt" | "result">("prompt");
  const [isTouring, setIsTouring] = useState(false);
  const [tourCursor, setTourCursor] = useState(0);
  const [industry, setIndustry] = useState("Fintech / payments");
  const [autonomy, setAutonomy] = useState("Executes only after human approval");
  const output = outputs[activeStep];

  const selectedIndex = useMemo(
    () => steps.findIndex((step) => step.id === activeStep),
    [activeStep],
  );
  const targetIndex = useMemo(
    () => steps.findIndex((step) => step.id === targetStep),
    [targetStep],
  );
  const currentStep = steps[selectedIndex];
  const targetGuideStep = steps[targetIndex];
  const CurrentIcon = currentStep.icon;
  const progress = Math.round(((selectedIndex + 1) / steps.length) * 100);
  const tourCount = tourCursor + 1;

  useEffect(() => {
    if (!isTouring) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const nextCursor = tourCursor + 1;

      if (nextCursor >= tourSequence.length) {
        setIsTouring(false);
        setTourCursor(0);
        setActiveStep("intake");
        setTargetStep("intake");
        setGuideMode("result");
        setGuideVisible(false);
        return;
      }

      const next = tourSequence[nextCursor];
      setTourCursor(nextCursor);
      setActiveStep(next);
      setTargetStep(next);
      setGuideMode("result");
      setGuideVisible(true);
    }, tourCursor === 0 ? 1300 : 2300);

    return () => window.clearTimeout(timeout);
  }, [isTouring, tourCursor]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("tour") !== "1") {
      return;
    }

    const timeout = window.setTimeout(() => {
      takeTour();
    }, 800);

    return () => window.clearTimeout(timeout);
  }, []);

  function takeTour() {
    setTourCursor(0);
    setActiveStep(tourSequence[0]);
    setTargetStep(tourSequence[0]);
    setGuideMode("result");
    setGuideVisible(true);
    setIsTouring(true);
  }

  function stopTour() {
    setIsTouring(false);
    setTourCursor(0);
    setGuideVisible(false);
    setGuideMode("result");
  }

  function selectStep(stepId: StepId) {
    const shouldKeepGuideVisible = guideVisible;
    setIsTouring(false);
    setActiveStep(stepId);
    setTargetStep(stepId);
    setGuideMode("result");
    setGuideVisible(shouldKeepGuideVisible);
  }

  function promptStep(stepId: StepId) {
    setIsTouring(false);
    setTargetStep(stepId);
    setGuideMode("prompt");
    setGuideVisible(true);
  }

  function understandChanges() {
    const next = selectedIndex === steps.length - 1 ? steps[0] : steps[selectedIndex + 1];
    promptStep(next.id);
  }

  function exploreWithoutPopups() {
    setIsTouring(false);
    setTourCursor(0);
    setGuideMode("result");
    setGuideVisible(false);
  }

  return (
    <main className="prototype-page admin-prototype">
      <section className="admin-portal-shell">
        <aside className="admin-portal-sidebar">
          <div className="admin-logo">
            <strong>Lyzr</strong>
            <span>Launch Console</span>
          </div>
          <nav>
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === activeStep;
              const isDone = index < selectedIndex;
              return (
                <button
                  className={isActive ? "active" : isDone ? "complete" : ""}
                  key={step.id}
                  onClick={() => selectStep(step.id)}
                >
                  <StepIcon size={17} />
                  <span>{step.nav}</span>
                  {isDone ? <CheckCircle2 size={15} /> : <ChevronRight size={15} />}
                </button>
              );
            })}
          </nav>
          <a className="prototype-case-study-action" href="/" target="_blank" rel="noreferrer">
            Go to case study <ArrowRight size={16} />
          </a>
        </aside>

        <div className="admin-workspace">
          <div className="admin-commandbar">
            <div>
              <h1>Agent Launch Readiness Checker</h1>
            </div>
            <button className={isTouring ? "tour-running" : ""} onClick={isTouring ? stopTour : takeTour}>
              {isTouring ? "Stop tour" : <>Take a tour <ArrowRight size={16} /></>}
            </button>
          </div>

          <div className="admin-flow-map">
            <div className="admin-flow-progress" style={{ "--progress": `${progress}%` } as CSSProperties} />
            {guideVisible && guideMode === "prompt" ? (
              <div className={`target-popover step-${targetIndex}`}>
                <span>Click target</span>
                <strong>{targetGuideStep.nav}</strong>
                <button className="target-action-button" onClick={() => selectStep(targetStep)}>
                  Click now
                </button>
              </div>
            ) : null}
            {steps.map((step, index) => (
              <button
                className={[
                  index === selectedIndex ? "active" : "",
                  index < selectedIndex ? "complete" : "",
                  guideMode === "prompt" && index === targetIndex ? "guide-target target-pending" : "",
                ].filter(Boolean).join(" ")}
                key={step.id}
                onClick={() => selectStep(step.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.label}</strong>
                <small>{step.guide}</small>
              </button>
            ))}
          </div>

          <div className="admin-dashboard-grid">
            <section className="admin-panel admin-current-task">
              {guideVisible && guideMode === "result" ? (
                <div className="change-popover task">
                  <span>Changed</span>
                  <strong>Task is now {currentStep.label}</strong>
                  <p>The user knows what to complete in this step.</p>
                </div>
              ) : null}
              <div className="admin-panel-head">
                <CurrentIcon size={22} />
                <div>
                  <span>Current user task</span>
                  <h2>{currentStep.label}</h2>
                </div>
              </div>
              <p>{currentStep.task}</p>
              <div className="admin-form-grid">
                <label>
                  Industry
                  <select className="guide-target-soft" value={industry} onChange={(event) => setIndustry(event.target.value)}>
                    <option>Fintech / payments</option>
                    <option>Healthcare</option>
                    <option>Insurance</option>
                    <option>SaaS operations</option>
                  </select>
                </label>
                <label>
                  Autonomy
                  <select className="guide-target-soft" value={autonomy} onChange={(event) => setAutonomy(event.target.value)}>
                    <option>Suggests only</option>
                    <option>Drafts with review</option>
                    <option>Executes only after human approval</option>
                    <option>Executes autonomously</option>
                  </select>
                </label>
              </div>
              <div className="admin-action-card">
                <Rocket size={18} />
                <div>
                  <strong>What happens next</strong>
                  <p>{currentStep.next}</p>
                </div>
              </div>
            </section>

            <section className="admin-panel admin-simulation">
              {guideVisible && guideMode === "result" ? (
                <div className="change-popover simulation">
                  <span>Changed</span>
                  <strong>Simulation feed refreshed</strong>
                  <p>{currentStep.happened}</p>
                </div>
              ) : null}
              <div className="admin-panel-head">
                <ListChecks size={22} />
                <div>
                  <span>Simulation feed</span>
                  <h2>{output.title}</h2>
                </div>
              </div>
              <div className="admin-log-list">
                {output.log.map((item) => (
                  <div key={item}>
                    <CheckCircle2 size={16} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <div className="admin-readiness-list">
                {readinessChecks.map(([title, body, minimumStep]) => {
                  const complete = selectedIndex >= Number(minimumStep);
                  return (
                    <div className={complete ? "complete" : ""} key={title}>
                      <span>{complete ? "Done" : "Pending"}</span>
                      <strong>{title}</strong>
                      <p>{body}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="admin-panel admin-decision">
              {guideVisible && guideMode === "result" ? (
                <div className="change-popover decision">
                  <span>Changed</span>
                  <strong>{output.verdict}</strong>
                  <p>The score moved to {output.score}% and the launch status changed.</p>
                </div>
              ) : null}
              <div className="admin-panel-head">
                <ShieldCheck size={22} />
                <div>
                  <span>Readiness decision</span>
                  <h2>{output.verdict}</h2>
                </div>
              </div>
              <div className="admin-score-row">
                <div className="readiness-ring" style={{ "--score": `${output.score}%` } as CSSProperties}>
                  <span>{output.score}%</span>
                </div>
                <div>
                  <strong>{output.status}</strong>
                  <p>{industry} · {autonomy}</p>
                </div>
              </div>
              <div className="admin-detail-list">
                {output.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
              <div className="admin-blocker-box">
                {guideVisible && guideMode === "result" ? (
                  <div className="change-popover blockers">
                    <span>Changed</span>
                    <strong>Blockers updated</strong>
                    <p>Warnings and owners now match this journey step.</p>
                  </div>
                ) : null}
                <strong>Blockers and warnings</strong>
                {output.blockers.map((blocker) => (
                  <p key={blocker}>{blocker}</p>
                ))}
              </div>
            </section>
          </div>

          {isTouring ? (
            <div className="tour-progress-popover">
              <span>Launch path · {tourCount}/{tourSequence.length}</span>
              <strong>{currentStep.nav}</strong>
              <p>{currentStep.happened}</p>
            </div>
          ) : null}

          {guideVisible && guideMode === "result" && !isTouring ? (
            <div className="understand-popover">
              <div>
                <span>Review changes</span>
                <strong>Ready for the next step?</strong>
              </div>
              <div className="understand-actions">
                <button onClick={understandChanges}>Understand</button>
                <button className="secondary" onClick={exploreWithoutPopups}>
                  I will explore
                </button>
              </div>
            </div>
          ) : null}

        </div>
      </section>

    </main>
  );
}
