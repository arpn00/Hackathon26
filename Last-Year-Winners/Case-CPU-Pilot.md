# Case CPU Pilot — First Prize Winner (Last Year)

> Reference writeup of a prior-year winning ZebraAI hackathon project, captured for
> idea-pool context. Sourced from the user-provided project description and the demo
> video transcript. Used to understand what wins and to find non-duplicate white space.

---

## One-liner

**"Smarter Support Starts with Case CPU"** — a manager/team-lead cockpit that gives a new
perspective on **case status** and **engineer availability**, so teams optimize resources
and every case gets the fastest, best support possible.

- Keywords: Copilot, ZebraAI, Agentic-AI
- Personas: support engineers **+** team leads / managers (resource optimization)

---

## The core concept: the "CPU" score

Each case gets a memorable **CPU** score:

| Letter | Meaning |
|--------|---------|
| **C** | **Complexity** of the case |
| **P** | **Probability** of closure within 7 days |
| **U** | **Urgency** of the case |

Plus additional signals: **Risk**, **Activeness**, **Age**, and **Sentiment**.

---

## How ZebraAI is used

Per the demo video, ZebraAI:

- Retrieves case information
- Computes **CPU values**
- Provides **sentiment** data
- Identifies **case risks** and **recommended next actions**
- Supports **case evaluation** for better case management

(Capabilities map to ZebraAI's sentiment analysis, case scoring/prioritization, case-data
injection into experiments, and Teams delivery via API/connector.)

---

## Sub-solutions (5)

1. **Case CPU Experiment** — the scoring engine (C/P/U + risk/sentiment).
2. **Case Pilot** — case status intelligence surface.
3. **OPEX Studio** — operational/resource view.
4. **Agent 7-Up** — probability-of-7-day-closure angle.
5. **Sentiment-360** — actionable customer sentiment intelligence.

---

## Product surface — "KCPU pilot" website (4 views)

1. **Team Cases View** — big-picture case status including CPU, risk, and activeness.
2. **Engineer View** — engineer workload; who is handling complex/urgent cases and may
   need help.
3. **Swarming Hub** — a central place to **seek or offer help** for better load balance;
   tracks swarming and recognizes top contributors.
4. **Teams Notification** — instant alerts to ensure timely support and drive action.

---

## Key features

1. **Case Status Intelligence** — the CPU indicators + Risk/Activeness/Age/Sentiment.
2. **Engineer Availability View** — live workload/capacity to prevent overload.
3. **Swarming Hub** — request/offer help, track swarming, recognize top contributors.
4. **Teams Notifications** — instant alerts, triage assist, collaborative actions.

---

## Top scenarios

- **Sev B/C** cases handled with **CritSit-level** focus.
- **OOF backup** — coverage when an engineer is out.
- Effective **case review / triage**.

---

## Impact

- Early risk alerts
- Real-time visibility into cases and workload
- Optimal resource utilization
- Teams-based collaboration
- Customer trust via transparency + empathy

---

## Vision / future

- More CPU factors over time
- Integrate **VDM** (smart assignment), **WFM** (capacity), **DFM**
- Integrate CaseBuddy / CES BI
- People recognition & reward
- Goal: **empower CSS to achieve more**

---

## Why it won (patterns to learn from)

1. **A crisp, branded metaphor** — "Case CPU" makes an abstract idea instantly graspable.
2. **Dual impact** — helps the individual engineer *and* the manager optimizing the team.
3. **Lands where people already work** — Microsoft Teams, not a separate portal.
4. **Human + emotional angle** — swarming, recognition, empathy, customer trust.
5. **Composed of small, demoable experiments** — 5 modular ZebraAI experiments stitched
   together.

> Note: the build was essentially a **dashboard + Teams alerts** (a manager's cockpit),
> not a deep automation engine. The "wow" was the metaphor + social swarming layer +
> Teams delivery — that's the bar to clear and the space to differentiate from.

---

## Demo video transcript (verbatim excerpts)

- 00:00 — "Have you ever asked yourself how to make support work smarter?"
- 00:04 — "Case CPU Pilot solution provides a new perspective on case status and engineer
  availability, helping us optimize resources and ensure every case gets the best support
  possible."
- 00:14 — "CPU stands for Complexity of the case, P is the possibility of seven day
  closure, U is the urgency of the case."
- 00:23 — "We can also consider factors such as risk, sentiment for better case support."
- 00:31 — "This is Zebra AI." / 00:33 — "Zebra AI helps us retrieve case information, CPU
  values, sentiment data, and identify case risks along with recommended next actions."
- 00:41 — "It also supports case evaluation for better case management."
- 00:47 — "We have 4 features." — high-level team open cases; real-time engineer status;
  Swarming Hub (seek/offer help); team notification for instant awareness.
- 00:59 — Team Cases View (CPU, risk, activeness) / 01:06 — Engineer View (workload) /
  01:12 — Swarming Hub (load balance) / 01:17 — Teams Notification.
- 01:23 — "Welcome to our KCPU pilot website."
- 01:46 — Impact: "optimize resources and ensure timely, high quality support."
- 01:52 — Vision: "integrate VDM, DFM, WFM and empower CSS to achieve more."
