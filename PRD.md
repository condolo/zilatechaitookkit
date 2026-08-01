# Product Requirements Document (PRD)
## Zila AI Toolkit: K–12 AI Transformation Operating System (OS)

---

| Document Metadata | Details |
| :--- | :--- |
| **Product Name** | Zila AI Toolkit (K–12 AI Transformation OS) |
| **Document Version** | 2.0 (Stage 2 Architecture Blueprint) |
| **Author / Lead** | Zila Tech Product & Consulting Architecture Team |
| **Status** | Approved Blueprint — Base for Domain Modeling & Implementation |
| **Target Audience** | Software Engineers, Product Managers, AI Transformation Consultants, School Executives |

---

## 1. Executive Summary & Strategic Vision

### 1.1 Beyond Assessment: The AI Transformation OS
The **Zila AI Toolkit** is not merely survey or assessment software. It is a purpose-built **AI Transformation Operating System (OS)** designed specifically for K–12 educational institutions and Zila Tech Africa’s specialized consulting practice.

While traditional tools focus strictly on one-off questionnaire output, the Zila AI Toolkit captures and digitizes Zila Tech's entire end-to-end consulting lifecycle:
$$\text{Lead Capture} \longrightarrow \text{Baseline Diagnostic} \longrightarrow \text{Executive Briefing} \longrightarrow \text{Account Activation} \longrightarrow \text{Consulting Projects} \longrightarrow \text{Evidence Portfolios} \longrightarrow \text{Re-Assessment \& Growth}$$

### 1.2 Core Value Propositions
1. **For K–12 School Leadership**: Provides an evidence-based roadmap for ethical, pedagogical, and operational AI integration with institutional benchmarking and board-level reporting.
2. **For Educators & Staff**: Delivers individualized diagnostic feedback, targeted professional learning pathways, digital micro-credentials, and an evidence portfolio to showcase lesson plans and classroom innovation.
3. **For Zila Tech Consultants**: Functions as a specialized CRM and project management platform to track client school engagements, record discovery meetings, monitor milestones, and deliver AI-assisted strategic recommendations.

---

## 2. User Personas & Role-Based Access Control (RBAC)

The system enforces a granular 6-tier Role-Based Access Control model to support multi-tenancy, privacy, and administrative oversight.

```
+---------------------------------------------------------------------------------+
|                                LEVEL 1: SUPER ADMIN                            |
|                            (Zila Tech Platform Lead)                            |
+---------------------------------------------------------------------------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
+------------------v------------------+ +------------------v------------------+
|          LEVEL 2: CONSULTANT        | |       LEVEL 3: SCHOOL ADMIN         |
|     (Zila Transformation Advisor)   | |      (Principal / Headteacher)      |
+-------------------------------------+ +-------------------------------------+
                                                           |
                                        +------------------+------------------+
                                        |                                     |
                         +--------------v--------------+       +--------------v--------------+
                         |  LEVEL 4: DEPARTMENT HEAD   |       |      LEVEL 6: BOARD VIEWER  |
                         |   (Subject Area Lead)       |       |     (Read-Only Executive)   |
                         +--------------+--------------+       +-----------------------------+
                                        |
                         +--------------v--------------+
                         |      LEVEL 5: TEACHER       |
                         |   (Educator / Staff User)   |
                         +-----------------------------+
```

### 2.1 Persona Specifications & Permissions Matrix

| Level & Role | User Persona | Key Capabilities & Access Level |
| :--- | :--- | :--- |
| **Level 1: Super Admin** | Zila Tech Platform Lead | Full platform access. Manages all school tenants, activates prospective leads, configures global AI prompts, views cross-institutional benchmarks, and manages platform billing/subscriptions. |
| **Level 2: Consultant** | Zila AI Strategy Advisor | Assigned to specific school projects. Manages discovery logs, strategic milestones, meeting notes, custom AI report tuning, and client presentations. |
| **Level 3: School Admin** | Executive Leadership (Headteacher, CEO, Principal) | School-wide dashboard access. Views aggregated department matrices, board summaries, activates teacher accounts, and tracks institutional AI maturity over time. |
| **Level 4: Dept Head** | Subject Area Lead (e.g., STEM, Humanities) | Department-level dashboard access. Views anonymized/identified readiness for department staff, coordinates subject-specific AI action plans. |
| **Level 5: Teacher** | Educator / Classroom Instructor | Individual dashboard access. Takes baseline & follow-up surveys, receives personalized diagnostic reports, uploads lesson plan evidence, earns micro-badges. |
| **Level 6: Board Viewer** | Board Member / Auditor | Read-only executive view. Accesses high-level impact summaries, ROI metrics, and accreditation evidence exports without viewing individual teacher responses. |

---

## 3. End-to-End Client Operating Lifecycle

The platform models the full operational workflow of a school's digital transformation journey with Zila Tech:

```
[1. Prospective Lead] ---> [2. Public Link & Baseline] ---> [3. Strategy Briefing]
                                                                    |
                                                                    v
[6. Annual Re-Evaluation] <--- [5. Evidence & Badging] <--- [4. School Activation]
```

### 3.1 Lifecycle Stage Breakdown

#### Stage 1: Lead Capture & Prospect Management
- A school registers interest or is created as a "Prospective Tenant" by Zila Tech sales/consulting.
- The system generates a dedicated public assessment slug (e.g., `app.zila.tech/eval/brookhouse`).

#### Stage 2: Public Assessment & Baseline Survey
- Teachers complete the assessment via two consent pathways:
  1. **Anonymous Pathway**: Aggregated directly into department averages; no account required.
  2. **Personalized Pathway**: Captures name, email, department; generates immediate individual PDF/web diagnostic report.

#### Stage 3: Executive Briefing & Proposal Generation
- Zila Tech consultants review aggregated survey data.
- The AI Intelligence layer generates an Executive Strategic Report highlighting readiness scores, department gaps, and risk factors.
- Consultant presents findings to school leadership along with a transformation proposal.

#### Stage 4: Institutional Account Activation (The "Magic" Onboarding)
- Upon contract approval, Super Admin clicks **"Activate School Tenant"**.
- The system automatically:
  1. Scans all historical personalized baseline submissions matching the school's email domain.
  2. Provisions formal User Accounts for each educator.
  3. Dispatches automated welcome emails with secure password setup tokens.
  4. Binds prior assessment history to the user's permanent profile.

#### Stage 5: Consulting Projects, Evidence & Professional Learning
- **Consulting Projects**: Active deliverables (e.g., "AI Policy Draft", "Leadership Workshop", "Stem AI Curriculum Integration") are tracked with milestones.
- **Evidence Portfolio**: Teachers and department heads upload tangible evidence (AI lesson plans, rubrics, policy documents) to substantiate self-reported competence.
- **Micro-Badging**: Educators complete learning modules to earn verifiable digital badges.

#### Stage 6: Longitudinal Tracking & Annual Re-Assessment
- Schools trigger post-intervention surveys (e.g., 6-month or 12-month re-evaluations).
- The platform overlays progress radar charts (Baseline vs. Month 6 vs. Month 12) demonstrating ROI and institutional growth.

---

## 4. Platform Architectural Modules & Specifications

### 4.1 Tenancy & Data Hierarchy
To guarantee enterprise multi-tenancy, all data entities resolve to a strict relational hierarchy:

$$\text{Tenant (School)} \longrightarrow \text{Department} \longrightarrow \text{User Account} \longrightarrow \text{Consulting Project} \longrightarrow \text{Assessment / Evidence}$$

```
+-------------------------------------------------------------------+
| SCHOOL TENANT (e.g., Brookhouse International School)             |
| - ID, Name, Domain, Tier, Activation Date, Slug                   |
+-------------------------------------------------------------------+
    |
    +---> DEPARTMENTS (e.g., Mathematics, Sciences, Humanities)
    |
    +---> USERS (SuperAdmin, SchoolAdmin, DeptHead, Teacher)
    |
    +---> CONSULTING PROJECTS (Milestones, Meetings, Action Items)
    |
    +---> ASSESSMENTS (Baseline, Post-Training, Annual Review)
    |        |
    |        +---> RESPONSES (Dimension Scores, Question Items)
    |        +---> DIAGNOSTIC REPORTS (AI Narratives, Recommendations)
    |
    +---> EVIDENCE PORTFOLIO (Files, Lesson Plans, Tags, Accreditation)
    |
    +---> BADGES & CERTIFICATES (Earned Micro-credentials)
```

### 4.2 Reference Assessment Framework Engine
The platform includes a modular **12-Dimension Reference Framework** that can be customized or replaced per tenant without breaking database structure:

1. **AI Awareness**: Fundamental understanding of AI capabilities & limitations.
2. **AI Literacy & Concepts**: Technical grasp of generative AI, LLMs, and prompt mechanics.
3. **Classroom Pedagogy**: Integration of AI tools into daily instruction & differentiation.
4. **Personal Confidence**: Educator self-efficacy and comfort with emerging tech.
5. **Ethical AI & Bias**: Awareness of hallucination, bias, data privacy, and academic integrity.
6. **Assessment Practices**: Design of AI-resilient formative & summative assessments.
7. **Professional Learning**: Active participation in AI professional development.
8. **Curriculum Innovation**: Redesigning learning objectives for an AI-native world.
9. **Digital Citizenship**: Guiding students on responsible, critical AI use.
10. **Leadership Alignment**: Administrative support, vision, and strategic direction.
11. **Technical Infrastructure**: Device access, bandwidth, and software availability.
12. **Future Aspirations**: Willingness to experiment and lead peer learning.

#### Maturity Scoring Scale
Evaluated on a 0–100 normalized score mapped to 5 Educational Tiers:
- **0–39 (Novice)**: Awareness phase; requires foundational AI literacy.
- **40–59 (Explorer)**: Occasional experimentation; needs structured guidance.
- **60–74 (Practitioner)**: Regular integration; ready for pedagogical refinement.
- **75–89 (Innovator)**: Advanced usage; creates AI-enhanced learning experiences.
- **90–100 (Strategic Leader)**: Peer mentor; drives institutional policy and innovation.

---

### 4.3 Evidence Portfolio & Proof Engine
Self-assessment survey scores are substantiated through an **Evidence Portfolio**:
- **Artifact Uploads**: Teachers upload lesson plans, custom system prompts, AI policies, or student activity rubrics (PDF, DOCX, links).
- **Accreditation Tagging**: Artifacts are tagged against international frameworks (e.g., ISTE, CIS, IB AI Guidelines).
- **Verification Workflow**: Department Heads or Zila Consultants review and verify submitted evidence to validate competency badges.

---

### 4.4 Consulting Operating System (Lightweight CRM)
To serve Zila Tech's consulting team, the platform incorporates a project execution layer:
- **Client Engagement Tracker**: Tracks lead stage, meeting history, key decision-makers, and contract status.
- **Consulting Meetings**: Log discovery sessions, executive debriefs, and teacher coaching notes directly linked to the school entity.
- **Action Items & Deliverables**: Assigns transformation tasks (e.g., "Draft Responsible AI Use Policy by Oct 15") to school admins or consultants.

---

### 4.5 AI Intelligence Layer (Server-Side Gemini Integration)
Powered by server-side Gemini endpoints (`/api/ai/*`):
- **Individual Diagnostic Narratives**: Synthesizes teacher score profiles into tailored strengths, growth areas, and immediate action steps.
- **Executive School Summaries**: Analyzes cross-department benchmarks to draft board-ready executive summaries.
- **Zila AI Strategy Assistant**: An interactive chat advisor for school leaders pre-loaded with the school's diagnostic data and Zila Tech's transformation methodologies.

---

## 5. Data Governance, Privacy & Consent Architecture

Given strict regulations around school and educator data (GDPR, Data Protection Laws):

1. **Explicit Consent Capture**:
   - Every participant must accept the *Assessment Consent & Data Protection Statement* before beginning questions.
   - Separate consent switches for:
     - Aggregated research inclusion.
     - Direct email contact for individual diagnostic reports.
     - Automated account provisioning upon school tenant activation.
2. **Data Anonymization**: Anonymous survey submissions store zero IP addresses, names, or email headers, rendering responses mathematically un-linkable to individuals.
3. **Data Security & Encryption**: TLS 1.3 encryption in transit and AES-256 at rest across database and file storage endpoints.

---

## 6. Implementation Roadmap & Next Stages

| Stage | Name | Description & Objectives | Status |
| :--- | :--- | :--- | :--- |
| **Stage 1** | Product Vision | High-level concept alignment and feature positioning. | ✅ Completed |
| **Stage 2** | Product Requirements (PRD) | Exhaustive blueprint defining roles, lifecycle, modules, and scope. | ✅ Completed (This Document) |
| **Stage 3** | Domain Model & Entity Specs | Detailed TypeScript / Object domain model schema (`src/types/domain.ts`). | ⏳ Next Action Step |
| **Stage 4** | Database Architecture | Relational database schema (Cloud SQL / Drizzle ORM / Firestore rules). | Pending Stage 3 |
| **Stage 5** | Production Feature Implementation | Development of evidence portfolios, CRM logs, and activation pipelines. | Pending Stage 4 |

---
*End of Product Requirements Document — Zila AI Toolkit (Stage 2)*
