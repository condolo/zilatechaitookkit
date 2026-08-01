import { useState, useEffect } from 'react';
import { School, AssessmentSubmission, UserAccount, UserRole, ParticipationPathway, TeacherDetails } from '../types';
import { INITIAL_SCHOOLS, INITIAL_SUBMISSIONS, INITIAL_USERS } from '../data/mockDatabase';
import { calculateReadinessTier, AI_DIMENSIONS } from '../data/dimensionsData';

const LOCAL_STORAGE_KEY_SCHOOLS = 'zila_ai_toolkit_schools_v1';
const LOCAL_STORAGE_KEY_SUBMISSIONS = 'zila_ai_toolkit_submissions_v1';
const LOCAL_STORAGE_KEY_USERS = 'zila_ai_toolkit_users_v1';
const LOCAL_STORAGE_KEY_CURRENT_USER = 'zila_ai_toolkit_current_user_v1';

export function useToolkitStore() {
  const [schools, setSchools] = useState<School[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SCHOOLS);
    return saved ? JSON.parse(saved) : INITIAL_SCHOOLS;
  });

  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SUBMISSIONS);
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_USER);
    if (saved && saved !== 'null') {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null; // Default unauthenticated public visitor
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SCHOOLS, JSON.stringify(schools));
  }, [schools]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_CURRENT_USER);
    }
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
  };

  // Create a new prospective school
  const addProspectiveSchool = (name: string, category: School['category'], region: string, contactName: string, contactEmail: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const newSchool: School = {
      id: `sch_${Date.now()}`,
      name,
      slug,
      category,
      region,
      status: 'Prospective',
      contactName,
      contactEmail,
      createdAt: new Date().toISOString(),
      assessmentUrl: `${window.location.origin}/assessment/${slug}`,
      completionCount: 0,
      averageScore: 0,
      departments: ['STEM', 'Humanities', 'Languages', 'Arts & Music', 'Primary Division', 'Leadership']
    };

    setSchools(prev => [newSchool, ...prev]);
    return newSchool;
  };

  // Record a new assessment submission
  const submitAssessment = async (
    schoolSlug: string,
    pathway: ParticipationPathway,
    responses: Record<string, number>,
    teacherDetails?: TeacherDetails
  ): Promise<AssessmentSubmission> => {
    const targetSchool = schools.find(s => s.slug === schoolSlug) || schools[0];

    // Calculate score per dimension
    const dimensionScores: Record<string, number> = {};
    let grandTotalPoints = 0;
    let grandMaxPoints = 0;

    AI_DIMENSIONS.forEach(dim => {
      let dimPoints = 0;
      let dimMax = 0;
      dim.questions.forEach(q => {
        const val = responses[q.id] || 3;
        dimPoints += val;
        dimMax += 5;
      });
      const dimPercentage = Math.round((dimPoints / dimMax) * 100);
      dimensionScores[dim.id] = dimPercentage;
      grandTotalPoints += dimPoints;
      grandMaxPoints += dimMax;
    });

    const totalScore = Math.round((grandTotalPoints / grandMaxPoints) * 100);
    const readinessTier = calculateReadinessTier(totalScore);

    // Call server AI endpoint for detailed personalized report if identified
    let aiAnalysis = undefined;
    try {
      const res = await fetch('/api/gemini/analyze-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherName: teacherDetails?.fullName,
          schoolName: targetSchool.name,
          department: teacherDetails?.department,
          subject: teacherDetails?.subjectArea,
          totalScore,
          readinessLevel: readinessTier,
          dimensionScores
        })
      });
      if (res.ok) {
        aiAnalysis = await res.json();
      }
    } catch (err) {
      console.warn('AI analysis call failed, fallback will be used', err);
    }

    const newSubmission: AssessmentSubmission = {
      id: `sub_${Date.now()}`,
      schoolId: targetSchool.id,
      schoolSlug,
      pathway,
      teacherDetails,
      responses,
      dimensionScores,
      totalScore,
      readinessTier,
      submittedAt: new Date().toISOString(),
      aiAnalysis
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    // Update school statistics
    setSchools(prev => prev.map(s => {
      if (s.id === targetSchool.id) {
        const schoolSubs = [...submissions.filter(sub => sub.schoolId === s.id), newSubmission];
        const avg = Math.round(schoolSubs.reduce((acc, curr) => acc + curr.totalScore, 0) / schoolSubs.length);
        return {
          ...s,
          completionCount: schoolSubs.length,
          averageScore: avg
        };
      }
      return s;
    }));

    return newSubmission;
  };

  // School Activation & Automatic User Provisioning
  const activateSchool = (schoolId: string) => {
    const targetSchool = schools.find(s => s.id === schoolId);
    if (!targetSchool) return;

    // 1. Update school status
    setSchools(prev => prev.map(s => {
      if (s.id === schoolId) {
        return {
          ...s,
          status: 'Active',
          activatedAt: new Date().toISOString()
        };
      }
      return s;
    }));

    // 2. Identify all personalized submissions for this school that consented
    const schoolSubmissions = submissions.filter(
      sub => sub.schoolId === schoolId && sub.pathway === 'personalized' && sub.teacherDetails?.consentGiven
    );

    // 3. Auto-provision user accounts
    const provisionedUsers: UserAccount[] = [];

    schoolSubmissions.forEach(sub => {
      if (!sub.teacherDetails) return;
      // Check if user already exists
      const exists = users.some(u => u.email.toLowerCase() === sub.teacherDetails!.email.toLowerCase());
      if (!exists) {
        const newUser: UserAccount = {
          id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          schoolId,
          role: 'Teacher',
          fullName: sub.teacherDetails.fullName,
          email: sub.teacherDetails.email,
          department: sub.teacherDetails.department,
          subjectArea: sub.teacherDetails.subjectArea,
          activated: true,
          createdAt: new Date().toISOString(),
          badges: [
            {
              id: `b_init_${Date.now()}`,
              title: 'Baseline Assessment Participant',
              category: 'Individual',
              description: 'Completed baseline AI readiness evaluation prior to school activation.',
              earnedDate: sub.submittedAt.split('T')[0],
              icon: 'Award',
              level: 'Standard'
            }
          ],
          certificates: [
            {
              id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
              title: 'K–12 AI Readiness Individual Evaluation',
              recipientName: sub.teacherDetails.fullName,
              schoolName: targetSchool.name,
              issueDate: sub.submittedAt.split('T')[0],
              tier: sub.readinessTier,
              verificationCode: `ZILA-2026-${Math.floor(10000 + Math.random() * 90000)}`,
              score: sub.totalScore
            }
          ]
        };
        provisionedUsers.push(newUser);
      }
    });

    if (provisionedUsers.length > 0) {
      setUsers(prev => [...prev, ...provisionedUsers]);
    }

    return {
      activatedSchool: targetSchool,
      provisionedCount: provisionedUsers.length
    };
  };

  const switchRole = (role: UserRole, schoolId?: string) => {
    if (role === 'SuperAdmin') {
      const superUser = users.find(u => u.role === 'SuperAdmin') || INITIAL_USERS[0];
      setCurrentUser(superUser);
      return;
    }

    const targetSchoolId = schoolId || (currentUser && currentUser.schoolId !== 'global' ? currentUser.schoolId : schools[0]?.id);
    let matchedUser = users.find(u => u.role === role && u.schoolId === targetSchoolId);
    
    if (!matchedUser) {
      const school = schools.find(s => s.id === targetSchoolId) || schools[0];
      matchedUser = {
        id: `usr_${role.toLowerCase()}_${school.id}`,
        schoolId: school.id,
        role: role,
        fullName: role === 'SchoolAdmin' ? `${school.contactName}` : `Educator (${school.name})`,
        email: role === 'SchoolAdmin' ? school.contactEmail : `teacher@${school.slug}.ac.ke`,
        department: role === 'SchoolAdmin' ? 'Executive Leadership' : 'STEM & Innovation',
        subjectArea: role === 'SchoolAdmin' ? 'Institutional Policy & Administration' : 'Pedagogy & AI',
        activated: true,
        createdAt: new Date().toISOString(),
        badges: [
          {
            id: `b_${Date.now()}`,
            title: `${role === 'SchoolAdmin' ? 'Institutional AI Visionary' : 'AI Explorer Educator'}`,
            category: role === 'SchoolAdmin' ? 'School' : 'Individual',
            description: `Active ${role} account for ${school.name}.`,
            earnedDate: new Date().toISOString().split('T')[0],
            icon: role === 'SchoolAdmin' ? 'Shield' : 'Award',
            level: 'Gold'
          }
        ],
        certificates: []
      };
      setUsers(prev => [...prev, matchedUser!]);
    }
    setCurrentUser(matchedUser);
  };

  return {
    schools,
    submissions,
    users,
    currentUser,
    setCurrentUser,
    logout,
    switchRole,
    addProspectiveSchool,
    submitAssessment,
    activateSchool
  };
}
