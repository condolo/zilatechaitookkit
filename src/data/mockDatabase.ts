import { School, AssessmentSubmission, UserAccount, ExecutiveReport } from '../types';
import { calculateReadinessTier } from './dimensionsData';

export const INITIAL_SCHOOLS: School[] = [
  {
    id: 'sch_zila_demo',
    name: 'Zila Demo School',
    slug: 'zila-demo',
    category: 'Cambridge International',
    region: 'Nairobi, Kenya',
    status: 'Prospective',
    contactEmail: 'leadership@zilademo.ac.ke',
    contactName: 'Dr. Eric Davies (Head Teacher)',
    createdAt: '2026-07-15T09:00:00Z',
    assessmentUrl: 'https://toolkit.zilatech.africa/assessment/zila-demo',
    completionCount: 24,
    averageScore: 68,
    departments: ['STEM & Computing', 'Humanities', 'Languages', 'Creative Arts', 'Primary Division']
  },
  {
    id: 'sch_greensteds',
    name: 'Greensteds International School',
    slug: 'greensteds',
    category: 'Cambridge International',
    region: 'Nakuru, Kenya',
    status: 'Active',
    contactEmail: 'admin@greensteds.ac.ke',
    contactName: 'Mrs. Sarah Thompson',
    createdAt: '2026-06-10T10:30:00Z',
    activatedAt: '2026-07-01T14:20:00Z',
    assessmentUrl: 'https://toolkit.zilatech.africa/assessment/greensteds',
    completionCount: 42,
    averageScore: 74,
    departments: ['Science & Math', 'English & Languages', 'Social Sciences', 'Junior School', 'Performing Arts']
  },
  {
    id: 'sch_turi',
    name: "St. Andrew's School, Turi",
    slug: 'turi',
    category: 'Private Independent',
    region: 'Molo, Kenya',
    status: 'Prospective',
    contactEmail: 'academics@st-andrews.ac.ke',
    contactName: 'Mr. Paul Harrison',
    createdAt: '2026-07-20T11:00:00Z',
    assessmentUrl: 'https://toolkit.zilatech.africa/assessment/turi',
    completionCount: 18,
    averageScore: 62,
    departments: ['Sciences', 'Humanities & Classics', 'Modern Foreign Languages', 'Prep School']
  },
  {
    id: 'sch_peponi',
    name: 'Peponi School',
    slug: 'peponi',
    category: 'Cambridge International',
    region: 'Riru, Kenya',
    status: 'Active',
    contactEmail: 'headmaster@peponischool.org',
    contactName: 'Mr. Mark Durston',
    createdAt: '2026-05-12T08:15:00Z',
    activatedAt: '2026-06-01T09:00:00Z',
    assessmentUrl: 'https://toolkit.zilatech.africa/assessment/peponi',
    completionCount: 35,
    averageScore: 81,
    departments: ['STEM', 'Humanities', 'Languages', 'Visual Arts', 'Sixth Form']
  }
];

export const INITIAL_SUBMISSIONS: AssessmentSubmission[] = [
  {
    id: 'sub_1',
    schoolId: 'sch_zila_demo',
    schoolSlug: 'zila-demo',
    pathway: 'personalized',
    teacherDetails: {
      fullName: 'David Ochieng',
      email: 'dochieng@zilademo.ac.ke',
      department: 'STEM & Computing',
      subjectArea: 'Computer Science & Physics',
      consentGiven: true
    },
    responses: { q_awar_1: 4, q_awar_2: 4, q_lit_1: 5, q_lit_2: 4, q_ped_1: 4, q_ped_2: 5, q_conf_1: 4, q_eth_1: 5, q_eth_2: 4, q_ass_1: 4, q_pd_1: 5, q_mind_1: 5, q_cit_1: 4, q_lead_1: 4, q_infra_1: 4, q_fut_1: 5 },
    dimensionScores: { awareness: 80, literacy: 90, pedagogy: 90, confidence: 80, ethics: 90, assessment: 80, pd: 100, mindset: 100, citizenship: 80, leadership: 80, infrastructure: 80, future: 100 },
    totalScore: 87,
    readinessTier: 'Advanced / AI Innovator',
    submittedAt: '2026-07-28T14:30:00Z',
    aiAnalysis: {
      executiveSummary: 'David demonstrates high technical fluency and innovative pedagogy, acting as a natural AI champion for STEM.',
      keyStrengths: ['Advanced Prompt Engineering', 'Process-based Assessment Design', 'High Professional Curiosity'],
      priorityGrowthAreas: ['Cross-departmental mentoring for humanities faculty', 'Developing standardized AI rubrics'],
      recommendedPathways: ['Advanced Generative Models in Secondary STEM', 'Co-designing AI Ethics Frameworks'],
      nextActionableStep: 'Host a 20-minute lunch-and-learn for department colleagues on prompt templates.'
    }
  },
  {
    id: 'sub_2',
    schoolId: 'sch_zila_demo',
    schoolSlug: 'zila-demo',
    pathway: 'personalized',
    teacherDetails: {
      fullName: 'Amina Hassan',
      email: 'ahassan@zilademo.ac.ke',
      department: 'Humanities',
      subjectArea: 'History & Global Perspectives',
      consentGiven: true
    },
    responses: { q_awar_1: 3, q_awar_2: 3, q_lit_1: 3, q_lit_2: 4, q_ped_1: 3, q_ped_2: 3, q_conf_1: 3, q_eth_1: 4, q_eth_2: 4, q_ass_1: 3, q_pd_1: 3, q_mind_1: 4, q_cit_1: 3, q_lead_1: 3, q_infra_1: 3, q_fut_3: 3 },
    dimensionScores: { awareness: 60, literacy: 70, pedagogy: 60, confidence: 60, ethics: 80, assessment: 60, pd: 60, mindset: 80, citizenship: 60, leadership: 60, infrastructure: 60, future: 60 },
    totalScore: 65,
    readinessTier: 'Competent / AI Practitioner',
    submittedAt: '2026-07-29T09:15:00Z',
    aiAnalysis: {
      executiveSummary: 'Amina shows solid awareness of ethical considerations in humanities and a strong growth mindset for exploring AI.',
      keyStrengths: ['Strong Ethical Consideration', 'Openness to Classroom Experimentation'],
      priorityGrowthAreas: ['Developing structured AI writing scaffolds', 'Mastering complex prompt parameters'],
      recommendedPathways: ['AI as a Historical Inquiry Thought Partner', 'Formative Feedback Scaffolds in Writing'],
      nextActionableStep: 'Try using AI to generate 3 contrasting historical perspectives for an upcoming discussion.'
    }
  },
  {
    id: 'sub_3',
    schoolId: 'sch_zila_demo',
    schoolSlug: 'zila-demo',
    pathway: 'anonymous',
    responses: { q_awar_1: 2, q_awar_2: 2, q_lit_1: 2, q_lit_2: 3, q_ped_1: 2, q_ped_2: 2, q_conf_1: 2, q_eth_1: 3, q_eth_2: 3, q_ass_1: 2, q_pd_1: 2, q_mind_1: 3, q_cit_1: 2, q_lead_1: 3, q_infra_1: 3, q_fut_1: 2 },
    dimensionScores: { awareness: 40, literacy: 50, pedagogy: 40, confidence: 40, ethics: 60, assessment: 40, pd: 40, mindset: 60, citizenship: 40, leadership: 60, infrastructure: 60, future: 40 },
    totalScore: 47,
    readinessTier: 'Emerging / AI Explorer',
    submittedAt: '2026-07-30T11:45:00Z'
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr_super',
    schoolId: 'global',
    role: 'SuperAdmin',
    fullName: 'Zila Tech Master Administrator',
    email: 'admin@zilatech.africa',
    department: 'Zila AI Consultancy Services',
    subjectArea: 'K-12 Educational Strategy',
    activated: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00Z',
    badges: [
      { id: 'b_super_1', title: 'Platform Master Architect', category: 'School', description: 'Oversees multi-school AI transformation networks.', earnedDate: '2026-01-01', icon: 'Shield', level: 'Master' }
    ],
    certificates: []
  },
  {
    id: 'usr_zila_demo_admin',
    schoolId: 'sch_zila_demo',
    role: 'SchoolAdmin',
    fullName: 'Dr. Eric Davies',
    email: 'leadership@zilademo.ac.ke',
    department: 'Executive Leadership',
    subjectArea: 'School Administration & Policy',
    activated: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-07-15T09:00:00Z',
    badges: [
      { id: 'b_lead_1', title: 'AI Visionary Leader', category: 'School', description: 'Initiated baseline institutional AI assessment.', earnedDate: '2026-07-15', icon: 'Award', level: 'Gold' }
    ],
    certificates: []
  },
  {
    id: 'usr_greensteds_admin',
    schoolId: 'sch_greensteds',
    role: 'SchoolAdmin',
    fullName: 'Mrs. Sarah Thompson',
    email: 'admin@greensteds.ac.ke',
    department: 'Academic Leadership',
    subjectArea: 'Curriculum & Innovation',
    activated: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-06-10T10:30:00Z',
    badges: [
      { id: 'b_green_1', title: 'Active AI Transformation School', category: 'School', description: 'Completed multi-department baseline and activated platform.', earnedDate: '2026-07-01', icon: 'CheckCircle', level: 'Platinum' }
    ],
    certificates: []
  },
  {
    id: 'usr_david',
    schoolId: 'sch_zila_demo',
    role: 'Teacher',
    fullName: 'David Ochieng',
    email: 'dochieng@zilademo.ac.ke',
    department: 'STEM & Computing',
    subjectArea: 'Computer Science & Physics',
    activated: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-07-28T14:30:00Z',
    badges: [
      { id: 'b_dav_1', title: 'AI Innovator Practitioner', category: 'Individual', description: 'Scored 85+ on baseline assessment.', earnedDate: '2026-07-28', icon: 'Zap', level: 'Gold' },
      { id: 'b_dav_2', title: 'Ethics First Educator', category: 'Individual', description: 'Perfect score on Data Privacy & Ethics dimension.', earnedDate: '2026-07-28', icon: 'ShieldCheck', level: 'Silver' }
    ],
    certificates: [
      {
        id: 'cert_dav_1',
        title: 'K–12 AI Innovator Practitioner Certification',
        recipientName: 'David Ochieng',
        schoolName: 'Zila Demo School',
        issueDate: '2026-07-28',
        tier: 'Advanced / AI Innovator',
        verificationCode: 'ZILA-2026-87391-DEMO',
        score: 87
      }
    ]
  }
];
