import { Dimension, ReadinessTier } from '../types';

export const FRAMEWORK_METADATA = {
  name: 'Zila AI Readiness & Transformation Framework',
  version: 'v1.0 (2026 Reference Edition)',
  author: 'Zila Tech Africa Educational AI Consultancy',
  totalDimensions: 12,
  scoringMax: 100
};

export const AI_DIMENSIONS: Dimension[] = [
  {
    id: 'awareness',
    name: 'AI Awareness',
    shortName: 'Awareness',
    description: 'Understanding fundamental concepts, capabilities, and terminology of Generative AI.',
    iconName: 'Sparkles',
    questions: [
      {
        id: 'q_awar_1',
        dimensionId: 'awareness',
        text: 'How familiar are you with the core concepts and capabilities of Large Language Models (LLMs) and Generative AI?',
        options: [
          { value: 1, label: 'Unfamiliar', description: 'I have heard the terms but do not know how they work.' },
          { value: 2, label: 'Slightly Aware', description: 'I know basic terms like ChatGPT but have limited understanding.' },
          { value: 3, label: 'Moderately Aware', description: 'I understand what generative models do and their basic features.' },
          { value: 4, label: 'Well Informed', description: 'I understand underlying concepts, capabilities, and common limitations.' },
          { value: 5, label: 'Expert Knowledge', description: 'I have deep conceptual and technical understanding of educational AI.' }
        ]
      },
      {
        id: 'q_awar_2',
        dimensionId: 'awareness',
        text: 'How well do you recognize the difference between traditional digital software and generative AI tools?',
        options: [
          { value: 1, label: 'Unaware', description: 'I view all software tools identically.' },
          { value: 2, label: 'Basic Recognition', description: 'I know AI generates new text or media.' },
          { value: 3, label: 'Moderate Understanding', description: 'I can distinguish probabilistic AI output from static web search.' },
          { value: 4, label: 'Clear Distinction', description: 'I understand how AI processes context, pattern matching, and hallucination risks.' },
          { value: 5, label: 'Comprehensive Knowledge', description: 'I explain these distinctions clearly to colleagues and students.' }
        ]
      }
    ]
  },
  {
    id: 'literacy',
    name: 'AI Literacy & Practical Skills',
    shortName: 'Literacy',
    description: 'Hands-on ability to prompt, refine, and utilize AI tools effectively for educational tasks.',
    iconName: 'Cpu',
    questions: [
      {
        id: 'q_lit_1',
        dimensionId: 'literacy',
        text: 'How effectively can you write and iterate prompts to produce high-quality instructional materials?',
        options: [
          { value: 1, label: 'No Experience', description: 'I have never attempted prompt drafting.' },
          { value: 2, label: 'Basic Prompting', description: 'I use simple 1-line queries with variable results.' },
          { value: 3, label: 'Iterative Prompting', description: 'I provide context, role, and constraints to improve output.' },
          { value: 4, label: 'Advanced Prompting', description: 'I craft structured multi-turn prompts with exemplars and rubrics.' },
          { value: 5, label: 'Master Prompter', description: 'I design prompt templates and custom GPTs for department use.' }
        ]
      },
      {
        id: 'q_lit_2',
        dimensionId: 'literacy',
        text: 'How critical and rigorous are you when evaluating AI-generated outputs for factual accuracy and age appropriateness?',
        options: [
          { value: 1, label: 'Rarely Check', description: 'I accept AI output as accurate without verification.' },
          { value: 2, label: 'Occasional Checks', description: 'I skim outputs for glaring errors.' },
          { value: 3, label: 'Regular Fact-Checking', description: 'I systematically check key claims against reliable sources.' },
          { value: 4, label: 'Thorough Audit', description: 'I check citations, cross-verify math/facts, and adapt tone for grade level.' },
          { value: 5, label: 'Expert Evaluator', description: 'I train students and peers on hallucination detection and audit techniques.' }
        ]
      }
    ]
  },
  {
    id: 'pedagogy',
    name: 'Classroom Pedagogy Integration',
    shortName: 'Pedagogy',
    description: 'Incorporating AI to support differentiated instruction, lesson planning, and student learning.',
    iconName: 'BookOpen',
    questions: [
      {
        id: 'q_ped_1',
        dimensionId: 'pedagogy',
        text: 'How frequently do you use AI tools to differentiate materials for varied reading levels and student needs?',
        options: [
          { value: 1, label: 'Never', description: 'I do not use AI for lesson differentiation.' },
          { value: 2, label: 'Rarely', description: 'I have tried generating modified worksheets once or twice.' },
          { value: 3, label: 'Occasionally', description: 'I use AI to adapt text difficulty or create support scaffoldings.' },
          { value: 4, label: 'Frequently', description: 'AI is integrated into my routine workflow for tier-based student learning.' },
          { value: 5, label: 'Systematic Pedagogy', description: 'I use AI to dynamically co-create personalized learning paths for all students.' }
        ]
      },
      {
        id: 'q_ped_2',
        dimensionId: 'pedagogy',
        text: 'How effectively do you guide students to use AI as a thought partner or tutor rather than a shortcut?',
        options: [
          { value: 1, label: 'Not at all', description: 'AI is prohibited or unmentioned in student work.' },
          { value: 2, label: 'Basic Rules', description: 'I give general warnings against copying AI text.' },
          { value: 3, label: 'Active Guidance', description: 'I teach students how to brainstorm or outline with AI guidance.' },
          { value: 4, label: 'Structured Inquiry', description: 'I design assignments where AI acts as Socratic partner or peer reviewer.' },
          { value: 5, label: 'Pioneering Method', description: 'My curriculum builds metacognition through student-AI reflection loops.' }
        ]
      }
    ]
  },
  {
    id: 'confidence',
    name: 'Confidence & Competence',
    shortName: 'Confidence',
    description: 'Personal self-efficacy and feeling empowered to navigate AI advancements in education.',
    iconName: 'Zap',
    questions: [
      {
        id: 'q_conf_1',
        dimensionId: 'confidence',
        text: 'How confident do you feel when discussing or demonstrating AI tools with colleagues and leadership?',
        options: [
          { value: 1, label: 'Anxious / Hesitant', description: 'I feel unprepared and overwhelmed by AI.' },
          { value: 2, label: 'Slightly Confident', description: 'I can discuss basic tools but fear making mistakes.' },
          { value: 3, label: 'Moderately Confident', description: 'I feel comfortable sharing my personal classroom experiments.' },
          { value: 4, label: 'Highly Confident', description: 'I advocate for AI integration and mentor team members.' },
          { value: 5, label: 'Thought Leader', description: 'I lead school workshops and present on educational AI practice.' }
        ]
      }
    ]
  },
  {
    id: 'ethics',
    name: 'Ethical & Responsible AI Use',
    shortName: 'Ethics',
    description: 'Adhering to academic integrity, bias awareness, data privacy, and ethical modeling.',
    iconName: 'ShieldCheck',
    questions: [
      {
        id: 'q_eth_1',
        dimensionId: 'ethics',
        text: 'How proactively do you protect student privacy and sensitive school data when utilizing AI platforms?',
        options: [
          { value: 1, label: 'Unaware', description: 'I do not consider data privacy policies when inputting text.' },
          { value: 2, label: 'Basic Precaution', description: 'I avoid uploading full student names when I remember.' },
          { value: 3, label: 'Strict Anonymization', description: 'I strip all PII (personally identifiable info) before using AI.' },
          { value: 4, label: 'Policy Compliant', description: 'I only use approved, privacy-vetted enterprise tools and anonymize all inputs.' },
          { value: 5, label: 'Ethics Advocate', description: 'I audit department tool compliance and establish data privacy protocols.' }
        ]
      },
      {
        id: 'q_eth_2',
        dimensionId: 'ethics',
        text: 'How well do you address cultural, gender, or cognitive biases present in AI generated materials?',
        options: [
          { value: 1, label: 'Not Addressed', description: 'I am unaware of bias in model responses.' },
          { value: 2, label: 'Awareness Only', description: 'I recognize bias exists but rarely correct it.' },
          { value: 3, label: 'Active Screening', description: 'I review AI materials for inclusive representation.' },
          { value: 4, label: 'Teachable Moments', description: 'I explicitly teach students how to identify and analyze bias in AI outputs.' },
          { value: 5, label: 'Curriculum Leader', description: 'I author guidelines on critical AI literacy and bias mitigation.' }
        ]
      }
    ]
  },
  {
    id: 'assessment',
    name: 'AI in Assessment Practices',
    shortName: 'Assessment',
    description: 'Designing AI-resilient assessments, formative feedback rubrics, and process-based evaluation.',
    iconName: 'ClipboardCheck',
    questions: [
      {
        id: 'q_ass_1',
        dimensionId: 'assessment',
        text: 'How have you adapted your student assessment strategies to account for the availability of AI tools?',
        options: [
          { value: 1, label: 'Unchanged', description: 'I use the same traditional essays/homework as before.' },
          { value: 2, label: 'Detector Reliance', description: 'I rely primarily on automated AI detection software.' },
          { value: 3, label: 'Process Emphasis', description: 'I incorporate in-class drafts, presentations, and viva voce defenses.' },
          { value: 4, label: 'AI-Resilient Tasks', description: 'I design authentic, contextual performance tasks that require critical synthesis.' },
          { value: 5, label: 'Innovative Assessment', description: 'I co-evaluate student AI prompts, process logs, and final reflections.' }
        ]
      }
    ]
  },
  {
    id: 'pd',
    name: 'Professional Learning & Growth',
    shortName: 'PD & Growth',
    description: 'Active participation in AI professional development, workshops, and continuous learning.',
    iconName: 'GraduationCap',
    questions: [
      {
        id: 'q_pd_1',
        dimensionId: 'pd',
        text: 'How frequently do you engage in professional development or self-directed learning focused on AI in education?',
        options: [
          { value: 1, label: 'Never', description: 'I have not attended any AI training.' },
          { value: 2, label: 'One-off Session', description: 'I attended one orientation webinar or school briefing.' },
          { value: 3, label: 'Periodic Workshops', description: 'I complete 1-2 AI training sessions per term.' },
          { value: 4, label: 'Continuous Learning', description: 'I regularly read AI education research and test new tools monthly.' },
          { value: 5, label: 'PD Facilitator', description: 'I design and deliver AI professional learning programs for educators.' }
        ]
      }
    ]
  },
  {
    id: 'mindset',
    name: 'Innovation & Growth Mindset',
    shortName: 'Mindset',
    description: 'Willingness to experiment with new technologies, adapt strategies, and learn from iterations.',
    iconName: 'Lightbulb',
    questions: [
      {
        id: 'q_mind_1',
        dimensionId: 'mindset',
        text: 'How do you approach technological disruption and new AI innovations in your teaching practice?',
        options: [
          { value: 1, label: 'Resistant', description: 'I prefer traditional methods and avoid new tech.' },
          { value: 2, label: 'Cautious Observer', description: 'I wait until tools are mandatory before trying them.' },
          { value: 3, label: 'Open Experimenter', description: 'I willingly experiment with new tools in low-stakes settings.' },
          { value: 4, label: 'Early Adopter', description: 'I actively seek innovative tech solutions to solve classroom challenges.' },
          { value: 5, label: 'Transformation Catalyst', description: 'I inspire colleagues to embrace change and spearhead pilot projects.' }
        ]
      }
    ]
  },
  {
    id: 'citizenship',
    name: 'Digital Citizenship',
    shortName: 'Citizenship',
    description: 'Educating students on responsible digital footprint, citation, safety, and media verification.',
    iconName: 'Globe',
    questions: [
      {
        id: 'q_cit_1',
        dimensionId: 'citizenship',
        text: 'How explicitly do you teach students academic attribution and ethical citation of AI-assisted contributions?',
        options: [
          { value: 1, label: 'Never Mentioned', description: 'Citation of AI is not covered.' },
          { value: 2, label: 'General Policy', description: 'I tell students to state if they used AI.' },
          { value: 3, label: 'Clear Guidelines', description: 'I provide specific guidelines (e.g. APA/MLA/School AI acknowledgement note).' },
          { value: 4, label: 'Reflective Citation', description: 'Students submit AI prompt transcripts along with reflection notes.' },
          { value: 5, label: 'Model Exemplar', description: 'I author institutional digital citizenship and AI citation frameworks.' }
        ]
      }
    ]
  },
  {
    id: 'leadership',
    name: 'Leadership & Vision Support',
    shortName: 'Leadership',
    description: 'Perceived alignment with school administrative vision, clear AI policy guidance, and backing.',
    iconName: 'Building2',
    questions: [
      {
        id: 'q_lead_1',
        dimensionId: 'leadership',
        text: 'How clear and supportive is your school administration regarding AI policies, vision, and guidance?',
        options: [
          { value: 1, label: 'No Guidance', description: 'The school has provided no policy or communication.' },
          { value: 2, label: 'Restrictive / Unclear', description: 'Guidance is mostly about banning or ambiguous.' },
          { value: 3, label: 'Emerging Support', description: 'Leadership encourages exploration with general guidelines.' },
          { value: 4, label: 'Clear Vision', description: 'Clear institutional roadmap, resources, and explicit policy provided.' },
          { value: 5, label: 'Visionary Leadership', description: 'Active administrative backing, strategic alignment, and community engagement.' }
        ]
      }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Tool Access',
    shortName: 'Infrastructure',
    description: 'Availability of reliable internet, hardware, enterprise AI tool licenses, and IT support.',
    iconName: 'Server',
    questions: [
      {
        id: 'q_infra_1',
        dimensionId: 'infrastructure',
        text: 'How adequate is your school\'s technological infrastructure and software access for educational AI work?',
        options: [
          { value: 1, label: 'Inadequate', description: 'Poor internet connectivity and restricted personal hardware.' },
          { value: 2, label: 'Basic Access', description: 'Standard internet, but key AI domains are blocked or restricted.' },
          { value: 3, label: 'Moderate Support', description: 'Reliable internet; teachers use free tiers of AI software.' },
          { value: 4, label: 'Strong Infrastructure', description: 'High-speed network, school-provided devices, and enterprise AI tools.' },
          { value: 5, label: 'Cutting-Edge', description: 'Dedicated enterprise AI accounts, fast network, and on-site technical support.' }
        ]
      }
    ]
  },
  {
    id: 'future',
    name: 'Future Educational Aspirations',
    shortName: 'Future Vision',
    description: 'Aspiration to prepare K–12 students for future AI-integrated higher ed and workforce environments.',
    iconName: 'Compass',
    questions: [
      {
        id: 'q_fut_1',
        dimensionId: 'future',
        text: 'How actively are you preparing students with skills required for an AI-augmented future workforce and university landscape?',
        options: [
          { value: 1, label: 'Not Prioritized', description: 'I focus strictly on traditional syllabus content.' },
          { value: 2, label: 'Occasional Discussion', description: 'I mention future tech careers in casual conversations.' },
          { value: 3, label: 'Curriculum Connection', description: 'I highlight how AI is changing problem-solving in my discipline.' },
          { value: 4, label: 'Future-Focused Tasks', description: 'Students complete projects synthesizing human creativity with AI capabilities.' },
          { value: 5, label: 'Strategic Pioneer', description: 'I collaborate with universities/industry to align school curriculum with future skills.' }
        ]
      }
    ]
  }
];

export function calculateReadinessTier(score: number): ReadinessTier {
  if (score >= 90) return 'Strategic / AI Champion';
  if (score >= 75) return 'Advanced / AI Innovator';
  if (score >= 60) return 'Competent / AI Practitioner';
  if (score >= 40) return 'Emerging / AI Explorer';
  return 'Novice / AI Aware';
}
