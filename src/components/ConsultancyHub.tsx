import React, { useState } from 'react';
import { School, UserRole } from '../types';
import { Sparkles, Send, Bot, Building2, Calendar, CheckSquare, ArrowRight, FileText, Download, Plus, Target, CheckCircle2 } from 'lucide-react';

interface ConsultancyHubProps {
  selectedSchool: School;
  schools?: School[];
  currentUserRole?: UserRole | 'Guest';
  onSelectSchool?: (slug: string) => void;
  onNavigateToDashboard?: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MeetingItem {
  id: string;
  schoolName: string;
  title: string;
  date: string;
  time: string;
  attendees: string;
  status: 'Scheduled' | 'Completed' | 'In Progress';
}

interface ProjectItem {
  id: string;
  schoolName: string;
  title: string;
  category: string;
  progress: number;
  dueDate: string;
  status: 'In Progress' | 'Under Review' | 'Near Deadline';
}

interface ActionTask {
  id: string;
  schoolName: string;
  task: string;
  due: string;
  priority: 'High' | 'Medium' | 'Normal';
  completed: boolean;
}

export const ConsultancyHub: React.FC<ConsultancyHubProps> = ({
  selectedSchool,
  schools = [],
  currentUserRole = 'SuperAdmin',
  onSelectSchool,
  onNavigateToDashboard
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'meetings' | 'projects' | 'ai_advisor'>('overview');

  // Interactive AI Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: `Greetings! I am Zila Tech's Senior Educational AI Strategy Advisor. I am currently loaded with baseline analytics for **${selectedSchool.name}** (${selectedSchool.category}, ${selectedSchool.averageScore}/100 AI Readiness). How can I assist your leadership team today with AI policy drafts, professional learning roadmaps, or academic integrity frameworks?`
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Policy Generator State
  const [policyType, setPolicyType] = useState('Academic Integrity & Student AI Usage');
  const [generatedPolicy, setGeneratedPolicy] = useState<string | null>(null);
  const [generatingPolicy, setGeneratingPolicy] = useState(false);

  // Mock Meetings State
  const [meetings] = useState<MeetingItem[]>([
    {
      id: 'm-1',
      schoolName: 'Brookhouse International School',
      title: 'Executive AI Strategy Briefing & Policy Review',
      date: 'Today',
      time: '11:00 AM - 12:30 PM',
      attendees: 'Dr. E. Mbatha (Principal), Dept Heads',
      status: 'Scheduled'
    },
    {
      id: 'm-2',
      schoolName: "St. Austin's Academy",
      title: 'Baseline Diagnostic Discovery Meeting',
      date: 'Today',
      time: '02:30 PM - 03:45 PM',
      attendees: 'M. Wanjiku (Head of ICT), Senior Team',
      status: 'In Progress'
    },
    {
      id: 'm-3',
      schoolName: 'Greensteds International School',
      title: 'Annual AI Impact & Re-Assessment Workshop',
      date: 'Tomorrow',
      time: '09:00 AM - 10:30 AM',
      attendees: 'Board Members & Curriculum Leads',
      status: 'Scheduled'
    }
  ]);

  // Mock Projects State
  const [projects] = useState<ProjectItem[]>([
    {
      id: 'p-1',
      schoolName: 'Brookhouse International School',
      title: 'Responsible Student AI Policy Rollout',
      category: 'Policy & Governance',
      progress: 85,
      dueDate: 'Aug 15, 2026',
      status: 'Near Deadline'
    },
    {
      id: 'p-2',
      schoolName: "St. Austin's Academy",
      title: 'STEM Faculty Prompt Engineering Workshop',
      category: 'Teacher Capacity',
      progress: 60,
      dueDate: 'Aug 28, 2026',
      status: 'In Progress'
    },
    {
      id: 'p-3',
      schoolName: 'Greensteds International School',
      title: 'AI-Resilient Assessment Rubric Design',
      category: 'Curriculum Redesign',
      progress: 40,
      dueDate: 'Sep 10, 2026',
      status: 'In Progress'
    }
  ]);

  // Mock Action Tasks
  const [actionTasks, setActionTasks] = useState<ActionTask[]>([
    {
      id: 't-1',
      schoolName: 'Brookhouse International School',
      task: 'Finalize Board Presentation Deck with baseline spider charts',
      due: 'Today',
      priority: 'High',
      completed: false
    },
    {
      id: 't-2',
      schoolName: "St. Austin's Academy",
      task: 'Verify domain emails for auto-onboarding 28 teacher accounts',
      due: 'Aug 03',
      priority: 'High',
      completed: false
    },
    {
      id: 't-3',
      schoolName: 'Greensteds International School',
      task: 'Send AI Literacy Micro-Credential certificates to 14 staff',
      due: 'Aug 05',
      priority: 'Medium',
      completed: true
    }
  ]);

  const toggleTask = (id: string) => {
    setActionTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: inputPrompt
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsSending(true);

    try {
      const res = await fetch('/api/gemini/consultant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          schoolContext: {
            name: selectedSchool.name,
            category: selectedSchool.category,
            averageScore: selectedSchool.averageScore
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [
          ...prev,
          {
            id: `a_${Date.now()}`,
            role: 'assistant',
            content: data.reply || 'I am happy to provide strategic K–12 AI guidance.'
          }
        ]);
      }
    } catch (err) {
      console.error('Consultant chat error:', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleGeneratePolicy = async () => {
    setGeneratingPolicy(true);
    try {
      const prompt = `Draft a formal K–12 Institutional Policy document titled "${policyType}" specifically tailored for ${selectedSchool.name} (${selectedSchool.category} school in ${selectedSchool.region}).
Include:
1. Purpose & Scope
2. Core Principles of Responsible & Ethical AI Use
3. Student Citation & Academic Integrity Rules
4. Faculty Responsibilities
5. Guidance for Parents
Format with clear markdown headings and professional language.`;

      const res = await fetch('/api/gemini/consultant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          schoolContext: selectedSchool
        })
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedPolicy(data.reply);
      }
    } catch (err) {
      console.error('Failed to generate policy:', err);
    } finally {
      setGeneratingPolicy(false);
    }
  };

  const isSuperAdmin = currentUserRole === 'SuperAdmin';
  const displaySchools = isSuperAdmin ? (schools.length > 0 ? schools : [selectedSchool]) : [selectedSchool];
  const displayMeetings = isSuperAdmin 
    ? meetings 
    : meetings.filter(m => m.schoolName.toLowerCase().includes(selectedSchool.name.toLowerCase()) || selectedSchool.name.toLowerCase().includes(m.schoolName.toLowerCase()));
  const displayProjects = isSuperAdmin
    ? projects
    : projects.filter(p => p.schoolName.toLowerCase().includes(selectedSchool.name.toLowerCase()) || selectedSchool.name.toLowerCase().includes(p.schoolName.toLowerCase()));
  const displayActionTasks = isSuperAdmin
    ? actionTasks
    : actionTasks.filter(t => t.schoolName.toLowerCase().includes(selectedSchool.name.toLowerCase()) || selectedSchool.name.toLowerCase().includes(t.schoolName.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border-2 border-slate-900 rounded-none p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-[#2563EB] text-white text-[11px] font-black uppercase tracking-wider">
              {isSuperAdmin ? 'Global Strategic Workspace' : 'School Tenant Strategy Hub'}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              • {isSuperAdmin ? 'Master SaaS Scope' : `${selectedSchool.name} Institutional Scope`}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            AI Transformation Strategy Center
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {isSuperAdmin
              ? 'Managing multi-tenant client school lifecycles, executive briefings, transformation projects, and AI policy drafting for Zila Tech partner institutions.'
              : `Accessing tailored AI strategy briefings, transformation roadmaps, and automated policy generators for ${selectedSchool.name}.`}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveSubTab('ai_advisor')}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 border border-slate-900 cursor-pointer shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" /> AI Strategy Advisor
          </button>
        </div>
      </div>

      {/* Role Scoping Notice */}
      {!isSuperAdmin && (
        <div className="bg-slate-100 border-2 border-slate-900 p-3.5 text-xs text-slate-800 font-sans flex items-center justify-between gap-3 font-medium">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-900 text-white font-black text-[10px] uppercase">Scoped View</span>
            <span>Showing strategy deliverables and meetings exclusively for <strong>{selectedSchool.name}</strong>.</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">Role: {currentUserRole}</span>
        </div>
      )}

      {/* Workspace Sub-Navigation */}
      <div className="border-b-2 border-slate-900 bg-white flex items-center gap-2 p-1 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'overview'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" /> Client Schools ({displaySchools.length})
        </button>

        <button
          onClick={() => setActiveSubTab('meetings')}
          className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'meetings'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#2563EB]" /> Today's Meetings ({displayMeetings.length})
        </button>

        <button
          onClick={() => setActiveSubTab('projects')}
          className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'projects'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4 text-sky-500" /> Transformation Projects ({displayProjects.length})
        </button>

        <button
          onClick={() => setActiveSubTab('ai_advisor')}
          className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'ai_advisor'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-500" /> AI Policy & Strategy Hub
        </button>
      </div>

      {/* TAB 1: OVERVIEW & CLIENT SCHOOLS */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border-2 border-slate-900 shadow-sm">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Active Partner Schools</div>
              <div className="text-3xl font-black text-slate-900 mt-1">{displaySchools.length}</div>
              <p className="text-[10px] font-bold text-emerald-600 mt-1">✓ 100% On Track</p>
            </div>

            <div className="p-5 bg-white border-2 border-slate-900 shadow-sm">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Total Teachers Evaluated</div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                {displaySchools.reduce((acc, s) => acc + (s.completionCount || 24), 0)}
              </div>
              <p className="text-[10px] font-bold text-slate-500 mt-1">Across Cambridge & CBC curriculums</p>
            </div>

            <div className="p-5 bg-white border-2 border-slate-900 shadow-sm">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Average Readiness Index</div>
              <div className="text-3xl font-black text-[#2563EB] mt-1">68.5 / 100</div>
              <p className="text-[10px] font-bold text-slate-600 mt-1">Practitioner Tier Level</p>
            </div>

            <div className="p-5 bg-white border-2 border-slate-900 shadow-sm">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Active Policy Drafts</div>
              <div className="text-3xl font-black text-slate-900 mt-1">8 Docs</div>
              <p className="text-[10px] font-bold text-sky-600 mt-1">Gemini AI Accelerated</p>
            </div>
          </div>

          {/* Assigned Partner Schools Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
              <h2 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#2563EB]" /> Assigned K–12 Client Schools
              </h2>
              <span className="text-xs font-bold text-slate-500">Click school to switch context or view analytics</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displaySchools.map((school) => {
                const isSelected = school.id === selectedSchool.id;
                return (
                  <div
                    key={school.id}
                    className={`bg-white border-2 border-slate-900 p-6 flex flex-col justify-between shadow-md transition-all ${
                      isSelected ? 'ring-2 ring-[#2563EB] bg-blue-50/20' : 'hover:border-[#2563EB]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border ${
                          school.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}>
                          {school.status} Tenant
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">{school.category}</span>
                      </div>

                      <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-1">
                        {school.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 mb-4">{school.region}</p>

                      <div className="space-y-2 bg-slate-50 p-3 border border-slate-200 mb-4 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-bold">AI Readiness Index:</span>
                          <span className="font-black text-[#2563EB]">{school.averageScore}/100</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-bold">Baseline Submissions:</span>
                          <span className="font-black text-slate-900">{school.completionCount || 28} Teachers</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-bold">Primary Departments:</span>
                          <span className="font-bold text-slate-800">{school.departments?.length || 4} Areas</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          if (onSelectSchool) onSelectSchool(school.slug);
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] uppercase tracking-wider cursor-pointer"
                      >
                        {isSelected ? 'Current Active' : 'Select School'}
                      </button>

                      {onNavigateToDashboard && (
                        <button
                          onClick={() => {
                            if (onSelectSchool) onSelectSchool(school.slug);
                            onNavigateToDashboard();
                          }}
                          className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                        >
                          View Dashboard <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Outstanding Action Checklist */}
          <div className="bg-white border-2 border-slate-900 p-6 shadow-md">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-4">
              <h3 className="text-base font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-600" /> Consultant Outstanding Action Items
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {actionTasks.filter(t => t.completed).length} of {actionTasks.length} Completed
              </span>
            </div>

            <div className="space-y-3">
              {displayActionTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`p-3.5 border-2 flex items-start justify-between gap-4 cursor-pointer transition-all ${
                    t.completed ? 'bg-slate-50 border-slate-300 opacity-60' : 'bg-white border-slate-900 hover:border-[#FF6321]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {t.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-none border-2 border-slate-900" />
                      )}
                    </div>
                    <div>
                      <p className={`text-xs font-bold text-slate-900 ${t.completed ? 'line-through' : ''}`}>
                        {t.task}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {t.schoolName} • Due: {t.due}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                    t.priority === 'High' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}>
                    {t.priority} Priority
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEETINGS & DISCOVERY */}
      {activeSubTab === 'meetings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
            <div>
              <h2 className="text-xl font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#FF6321]" /> Scheduled Discovery & Executive Briefings
              </h2>
              <p className="text-xs text-slate-600 mt-1">Consulting sessions, discovery interviews, and board debriefs for active partner schools.</p>
            </div>
            <button className="px-4 py-2 bg-slate-900 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4" /> Schedule Session
            </button>
          </div>

          <div className="space-y-4">
            {displayMeetings.map((m) => (
              <div key={m.id} className="bg-white border-2 border-slate-900 p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider">
                      {m.schoolName}
                    </span>
                    <span className={`px-2 py-0.5 font-black text-[10px] uppercase border ${
                      m.status === 'In Progress' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-800 border-slate-300'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{m.title}</h3>
                  <p className="text-xs font-bold text-slate-600">Attendees: {m.attendees}</p>
                </div>

                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                  <div className="text-right font-mono">
                    <div className="text-xs font-black text-[#FF6321]">{m.date}</div>
                    <div className="text-[11px] font-bold text-slate-500">{m.time}</div>
                  </div>
                  <button className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider cursor-pointer">
                    Launch Briefing
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TRANSFORMATION PROJECTS */}
      {activeSubTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
            <div>
              <h2 className="text-xl font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                <Target className="w-6 h-6 text-sky-600" /> K–12 Transformation Deliverables
              </h2>
              <p className="text-xs text-slate-600 mt-1">Active implementation projects across policy, faculty capacity building, and curriculum redesign.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProjects.map((p) => (
              <div key={p.id} className="bg-white border-2 border-slate-900 p-6 flex flex-col justify-between shadow-md">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-sky-100 text-sky-800 font-black text-[10px] uppercase border border-sky-300">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-red-600">{p.status}</span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">{p.title}</h3>
                  <p className="text-xs font-bold text-slate-500 mb-4">{p.schoolName}</p>

                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Completion Progress</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 border border-slate-900">
                      <div className="bg-[#FF6321] h-full" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 font-bold">Target: {p.dueDate}</span>
                  <span className="font-black text-slate-900 cursor-pointer hover:underline">Update Status →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AI STRATEGY & POLICY HUB */}
      {activeSubTab === 'ai_advisor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chatbot Interface */}
          <div className="bg-slate-900 border-2 border-slate-900 p-6 flex flex-col justify-between shadow-xl h-[580px]">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Bot className="w-4 h-4 text-emerald-400" /> K–12 AI Strategy Advisor
              </h3>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 border border-slate-800">
                gemini-3.6-flash
              </span>
            </div>

            {/* Messages Log */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2 custom-scrollbar">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 text-xs leading-relaxed ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-7 h-7 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 font-black text-xs">
                      Z
                    </div>
                  )}

                  <div
                    className={`p-3.5 max-w-[82%] whitespace-pre-line ${
                      m.role === 'user'
                        ? 'bg-[#FF6321] text-white font-medium'
                        : 'bg-slate-950 text-slate-200 border border-slate-800'
                    }`}
                  >
                    {m.content}
                  </div>

                  {m.role === 'user' && (
                    <div className="w-7 h-7 bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                      U
                    </div>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  Thinking & formulating strategic advice...
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about AI policies, prompt workshops, or student ethics..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6321]"
              />
              <button
                type="submit"
                disabled={isSending}
                className="p-2.5 bg-[#FF6321] hover:bg-[#e05217] text-white font-black text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* AI Policy Generator */}
          <div className="bg-slate-900 border-2 border-slate-900 p-6 flex flex-col justify-between shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" /> Automated Policy Draft Generator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select an institutional policy module to draft for {selectedSchool.name}.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Target Policy Document</label>
                <select
                  value={policyType}
                  onChange={(e) => setPolicyType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6321] cursor-pointer"
                >
                  <option value="Academic Integrity & Student AI Usage">Academic Integrity & Student AI Usage</option>
                  <option value="Faculty Data Privacy & AI Ethics Guidelines">Faculty Data Privacy & AI Ethics Guidelines</option>
                  <option value="Parent & Community AI Transparency Policy">Parent & Community AI Transparency Policy</option>
                  <option value="Assessment & Viva Voce AI Scaffolding Rules">Assessment & Viva Voce AI Scaffolding Rules</option>
                </select>
              </div>

              <button
                disabled={generatingPolicy}
                onClick={handleGeneratePolicy}
                className="w-full py-3 bg-[#FF6321] hover:bg-[#e05217] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {generatingPolicy ? 'Drafting Policy Document...' : 'Generate Policy Draft'} <Sparkles className="w-4 h-4" />
              </button>
            </div>

            {/* Generated Policy Preview */}
            {generatedPolicy && (
              <div className="bg-slate-950 p-4 border border-slate-800 space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Generated Draft Preview</span>
                  <button
                    onClick={() => window.print()}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" /> Print / Export
                  </button>
                </div>
                <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                  {generatedPolicy}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
