import React, { useState } from 'react';
import { UserAccount, School, AssessmentSubmission, ExecutiveReport } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, Users, Award, Sparkles, Printer, FileText, ChevronRight, TrendingUp, AlertTriangle, Download, Lock } from 'lucide-react';

interface SchoolDashboardProps {
  school: School;
  submissions: AssessmentSubmission[];
  currentUser?: UserAccount | null;
}

const COLORS = ['#2563EB', '#0284C7', '#0D9488', '#D97706', '#DC2626'];

export const SchoolDashboard: React.FC<SchoolDashboardProps> = ({ school, submissions, currentUser }) => {
  const schoolSubmissions = submissions.filter(s => s.schoolId === school.id);
  const totalCompleted = schoolSubmissions.length;

  const [generatingReport, setGeneratingReport] = useState(false);
  const [executiveReport, setExecutiveReport] = useState<ExecutiveReport | null>(null);

  // Compute departmental averages
  const deptMap: Record<string, { count: number; totalScore: number }> = {};
  school.departments.forEach(d => { deptMap[d] = { count: 0, totalScore: 0 }; });

  schoolSubmissions.forEach(sub => {
    const dept = sub.teacherDetails?.department || 'General';
    if (!deptMap[dept]) deptMap[dept] = { count: 0, totalScore: 0 };
    deptMap[dept].count += 1;
    deptMap[dept].totalScore += sub.totalScore;
  });

  const departmentData = Object.entries(deptMap).map(([dept, data]) => ({
    department: dept,
    averageScore: data.count > 0 ? Math.round(data.totalScore / data.count) : 0,
    participated: data.count
  }));

  // Compute tier distribution
  const tierCounts: Record<string, number> = {
    'Novice / AI Aware': 0,
    'Emerging / AI Explorer': 0,
    'Competent / AI Practitioner': 0,
    'Advanced / AI Innovator': 0,
    'Strategic / AI Champion': 0
  };

  schoolSubmissions.forEach(sub => {
    if (tierCounts[sub.readinessTier] !== undefined) {
      tierCounts[sub.readinessTier] += 1;
    }
  });

  const tierPieData = Object.entries(tierCounts).map(([tier, count]) => ({
    name: tier.split('/')[1]?.trim() || tier,
    value: count
  }));

  // Generate Executive Board Summary via Gemini API
  const handleGenerateExecutiveSummary = async () => {
    setGeneratingReport(true);
    try {
      const topStrengths = ['Strong ethical awareness', 'High enthusiasm in STEM & Computing'];
      const priorityGaps = ['Standardized AI policy in student assignments', 'Infrastructure tool licensing'];

      const res = await fetch('/api/gemini/executive-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: school.name,
          schoolCategory: school.category,
          responseCount: totalCompleted,
          averageScore: school.averageScore,
          departmentAverages: departmentData,
          topStrengths,
          priorityGaps
        })
      });

      if (res.ok) {
        const data = await res.json();
        setExecutiveReport({
          id: `exec_${Date.now()}`,
          schoolId: school.id,
          generatedAt: new Date().toISOString().split('T')[0],
          title: data.title || `${school.name} Board Executive Briefing`,
          strategicNarrative: data.strategicNarrative || 'School baseline demonstrates strong willingness to integrate AI with target areas in policy and infrastructure.',
          boardRecommendations: data.boardRecommendations || [
            'Form an AI Ethics & Curriculum Committee',
            'Roll out Tier 1 AI Prompting PD across all departments',
            'Establish clear Academic Integrity guidelines'
          ],
          budgetPriorityIndex: data.budgetPriorityIndex || ['Teacher Training Workshops', 'Enterprise AI Software Licenses'],
          source: data.source || 'gemini-3.6-flash'
        });
      }
    } catch (err) {
      console.error('Failed to generate executive summary:', err);
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div className="space-y-8 print:bg-white print:text-black">
      {/* Guest Mode Banner */}
      {!currentUser && (
        <div className="bg-amber-50 border-2 border-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500 text-slate-900 font-black text-[10px] uppercase tracking-wider border border-slate-900 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3" /> Public Guest Mode
              </span>
              <span className="text-xs font-mono font-bold text-slate-700">Unauthenticated Session</span>
            </div>
            <p className="text-xs font-semibold text-slate-800 leading-relaxed font-sans">
              You are currently viewing a <strong>public evaluation preview</strong> for <strong>{school.name}</strong>. Log in to an assigned School Administrator or Teacher account to access private tenant analytics and official board briefs.
            </p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
              {school.category}
            </span>
            <span className="text-xs text-slate-400">• {school.region}</span>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
              school.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {school.status} School
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{school.name}</h1>
          <p className="text-xs text-slate-400">
            Contact: {school.contactName} ({school.contactEmail})
          </p>
        </div>

        {/* High Level Key Indicators */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center min-w-32">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Assessments</span>
            <div className="text-2xl font-bold text-white mt-0.5">{totalCompleted}</div>
            <span className="text-[10px] text-slate-500">Teachers Completed</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center min-w-32">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Average Score</span>
            <div className="text-2xl font-bold text-indigo-400 mt-0.5">{school.averageScore}/100</div>
            <span className="text-[10px] text-slate-500">Readiness Baseline</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Department Breakdown & Readiness Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Bar Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400" /> Departmental Performance Index
            </h3>
            <span className="text-xs text-slate-400">Baseline Score out of 100</span>
          </div>

          <div className="w-full h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <XAxis dataKey="department" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#818cf8', fontSize: '12px' }}
                />
                <Bar dataKey="averageScore" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Readiness Distribution Pie */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-sky-400" /> Institutional Tier Breakdown
          </h3>

          <div className="w-full h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tierPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
                  {tierPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {tierPieData.map((tp, idx) => (
              <div key={tp.name} className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span>{tp.name}</span>
                </div>
                <span className="font-bold">{tp.value} teachers</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Board Executive Briefing Generator Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Executive Board & Principal Briefing
            </h2>
            <p className="text-xs text-slate-400">
              Generate an automated Gemini-powered executive narrative for school board and leadership meetings.
            </p>
          </div>

          <button
            disabled={generatingReport}
            onClick={handleGenerateExecutiveSummary}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
          >
            {generatingReport ? 'Generating Executive Briefing...' : 'Generate Executive Report'} <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Executive Report Render */}
        {executiveReport && (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-extrabold text-white">{executiveReport.title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const content = `<!DOCTYPE html><html><head><title>${executiveReport.title}</title><style>body{font-family:sans-serif;padding:30px;color:#0f172a;}h1{color:#2563EB;}</style></head><body><h1>${school.name} Executive Board Briefing</h1><h2>${executiveReport.title}</h2><p>${executiveReport.strategicNarrative}</p><h3>Strategic Board Recommendations</h3><ol>${executiveReport.boardRecommendations.map(r => `<li>${r}</li>`).join('')}</ol><h3>High ROI Budget Priority Index</h3><ul>${executiveReport.budgetPriorityIndex.map(b => `<li>${b}</li>`).join('')}</ul><script>window.onload=function(){window.print();}</script></body></html>`;
                    const blob = new Blob([content], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Executive_Board_Report_${school.slug}.html`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#2563EB]" /> Export Document
                </button>
                <button
                  onClick={() => {
                    try { window.focus(); window.print(); } catch(e) {}
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-xs text-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Board Report
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {executiveReport.strategicNarrative}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Strategic Board Recommendations
                </h4>
                <div className="space-y-2">
                  {executiveReport.boardRecommendations.map((rec, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  High ROI Budget Priority Index
                </h4>
                <div className="space-y-2">
                  {executiveReport.budgetPriorityIndex.map((b, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
