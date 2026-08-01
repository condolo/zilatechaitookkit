export type ParticipationPathway = 'anonymous' | 'personalized';

export type ReadinessTier = 
  | 'Novice / AI Aware'
  | 'Emerging / AI Explorer'
  | 'Competent / AI Practitioner'
  | 'Advanced / AI Innovator'
  | 'Strategic / AI Champion';

export type SchoolStatus = 'Prospective' | 'Active' | 'Archived';

export type UserRole = 'SuperAdmin' | 'SchoolAdmin' | 'Teacher';

export interface Dimension {
  id: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  questions: Question[];
}

export interface Question {
  id: string;
  dimensionId: string;
  text: string;
  options: {
    label: string;
    value: number; // 1 to 5 scale
    description: string;
  }[];
}

export interface TeacherDetails {
  fullName: string;
  email: string;
  department: string;
  subjectArea: string;
  consentGiven: boolean;
}

export interface AssessmentSubmission {
  id: string;
  schoolId: string;
  schoolSlug: string;
  pathway: ParticipationPathway;
  teacherDetails?: TeacherDetails;
  responses: Record<string, number>; // questionId -> value (1-5)
  dimensionScores: Record<string, number>; // dimensionId -> percentage (0-100)
  totalScore: number; // 0-100
  readinessTier: ReadinessTier;
  submittedAt: string;
  aiAnalysis?: {
    executiveSummary?: string;
    keyStrengths?: string[];
    priorityGrowthAreas?: string[];
    recommendedPathways?: string[];
    nextActionableStep?: string;
  };
}

export interface School {
  id: string;
  name: string;
  slug: string; // e.g. "brookhouse"
  category: 'Cambridge International' | 'CBC / National' | 'Private Independent' | 'Public District' | 'International Baccalaureate';
  region: string; // e.g., "Nairobi, Kenya"
  status: SchoolStatus;
  contactEmail: string;
  contactName: string;
  createdAt: string;
  activatedAt?: string;
  assessmentUrl: string;
  completionCount: number;
  averageScore: number;
  departments: string[];
}

export interface UserAccount {
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
  badges: Badge[];
  certificates: Certificate[];
}

export interface Badge {
  id: string;
  title: string;
  category: 'Individual' | 'Department' | 'School';
  description: string;
  earnedDate: string;
  icon: string;
  level: string;
}

export interface Certificate {
  id: string;
  title: string;
  recipientName: string;
  schoolName: string;
  issueDate: string;
  tier: ReadinessTier;
  verificationCode: string;
  score: number;
}

export interface ExecutiveReport {
  id: string;
  schoolId: string;
  generatedAt: string;
  title: string;
  strategicNarrative: string;
  boardRecommendations: string[];
  budgetPriorityIndex: string[];
  source: string;
}
