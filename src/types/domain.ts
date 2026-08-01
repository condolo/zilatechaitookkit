/**
 * Zila AI Toolkit: Domain Model & Entity Specifications (Stage 3 Architecture)
 * Single source of truth for domain objects, RBAC, projects, evidence portfolios, and consulting CRM.
 */

export type UserRole = 
  | 'SuperAdmin'       // Level 1: Zila Tech SaaS Lead
  | 'Consultant'       // Level 2: Zila AI Transformation Strategy Advisor
  | 'SchoolAdmin'      // Level 3: School Executive / Principal
  | 'DepartmentHead'   // Level 4: Subject Area / Department Lead
  | 'Teacher'          // Level 5: Educator / Classroom Staff
  | 'BoardViewer';     // Level 6: Read-only Executive / Board Member

export type SchoolStatus = 'Prospective' | 'Active' | 'Archived';

export type ReadinessTier = 
  | 'Novice / AI Aware'
  | 'Emerging / AI Explorer'
  | 'Competent / AI Practitioner'
  | 'Advanced / AI Innovator'
  | 'Strategic / AI Champion';

export type ParticipationPathway = 'anonymous' | 'personalized';

export type ArtifactCategory = 
  | 'Lesson Plan'
  | 'AI Usage Policy'
  | 'Assessment Rubric'
  | 'Student AI Artifact'
  | 'Department Strategy'
  | 'Professional Learning Record';

export type AccreditationFramework = 'ISTE Standards' | 'IB AI Guidance' | 'CIS Accreditation' | 'National Curriculum' | 'Zila Benchmark';

/**
 * Tenant: School Institution
 */
export interface SchoolTenant {
  id: string;
  name: string;
  slug: string; // e.g. "brookhouse"
  category: 'Cambridge International' | 'CBC / National' | 'Private Independent' | 'Public District' | 'International Baccalaureate';
  region: string;
  status: SchoolStatus;
  contactEmail: string;
  contactName: string;
  createdAt: string;
  activatedAt?: string;
  assessmentUrl: string;
  completionCount: number;
  averageScore: number;
  departments: string[];
  assignedConsultantId?: string;
  assignedConsultantName?: string;
}

/**
 * User Account & Security Profile
 */
export interface UserProfile {
  id: string;
  schoolId: string;
  role: UserRole;
  fullName: string;
  email: string;
  department: string;
  subjectArea: string;
  activated: boolean;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
  badges: MicroBadge[];
  certificates: DigitalCertificate[];
}

/**
 * Transformation Program (Macro Engagement)
 */
export interface TransformationProgram {
  id: string;
  schoolId: string;
  title: string;
  academicYear: string; // e.g. "2026-2027"
  status: 'Planning' | 'Active' | 'Under Review' | 'Completed';
  leadConsultantId: string;
  leadConsultantName: string;
  startDate: string;
  targetCompletionDate: string;
  overallProgressPercent: number;
  projectsCount: number;
  description: string;
}

/**
 * Consulting Project (Micro Deliverable within a Program)
 */
export interface ConsultingProject {
  id: string;
  programId: string;
  schoolId: string;
  title: string;
  category: 'Policy & Governance' | 'Teacher Capacity' | 'Leadership Coaching' | 'Curriculum Redesign' | 'Infrastructure & Safety';
  assignedOwner: string; // Consultant or School Lead
  status: 'Not Started' | 'In Progress' | 'Under Review' | 'Milestone Reached';
  progressPercent: number;
  milestones: ProjectMilestone[];
  actionItems: ActionItem[];
  updatedAt: string;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  deliverableNotes?: string;
}

export interface ActionItem {
  id: string;
  title: string;
  assigneeName: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
}

/**
 * Evidence Portfolio Artifact
 */
export interface EvidenceArtifact {
  id: string;
  schoolId: string;
  department: string;
  authorUserId: string;
  authorName: string;
  title: string;
  category: ArtifactCategory;
  accreditationTags: AccreditationFramework[];
  fileUrl?: string;
  description: string;
  submittedAt: string;
  verifiedByConsultant: boolean;
  verifiedAt?: string;
}

/**
 * Consulting CRM & Meeting Logs
 */
export interface DiscoveryMeeting {
  id: string;
  schoolId: string;
  consultantId: string;
  consultantName: string;
  meetingDate: string;
  attendees: string[]; // Names & titles
  meetingSummary: string;
  identifiedRisks: string[];
  strategicActionPoints: string[];
  nextFollowUpDate?: string;
}

/**
 * Professional Learning Module & Micro Badging
 */
export interface LearningModule {
  id: string;
  title: string;
  category: string;
  targetTier: ReadinessTier;
  estimatedMinutes: number;
  description: string;
  keyTakeaways: string[];
  badgeRewardId: string;
}

export interface MicroBadge {
  id: string;
  title: string;
  category: 'Individual' | 'Department' | 'School';
  description: string;
  earnedDate: string;
  iconName: string;
  level: string;
  issuer: 'Zila Tech Africa';
}

export interface DigitalCertificate {
  id: string;
  title: string;
  recipientName: string;
  schoolName: string;
  issueDate: string;
  tier: ReadinessTier;
  verificationCode: string;
  score: number;
}
