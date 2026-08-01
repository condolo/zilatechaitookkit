import React, { useState } from 'react';
import { AssessmentSubmission } from '../types';
import { AI_DIMENSIONS } from '../data/dimensionsData';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Award, Printer, Share2, Sparkles, CheckCircle, ArrowUpRight, BookOpen, ShieldCheck, RefreshCw, Download, Check } from 'lucide-react';

interface IndividualReportViewProps {
  submission: AssessmentSubmission;
  schoolName: string;
  onReset?: () => void;
}

export const IndividualReportView: React.FC<IndividualReportViewProps> = ({
  submission,
  schoolName,
  onReset
}) => {
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Format dimension scores for radar chart
  const radarData = AI_DIMENSIONS.map(dim => ({
    dimension: dim.shortName,
    score: submission.dimensionScores[dim.id] || 50
  }));

  const handlePrint = () => {
    try {
      window.focus();
      window.print();
    } catch (err) {
      handleDownloadReport();
    }
  };

  const handleDownloadReport = () => {
    const reportHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Zila AI Toolkit Diagnostic Report - ${submission.teacherDetails?.fullName || 'Educator'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #fff; color: #0f172a; margin: 0; padding: 40px; }
    .card { max-width: 900px; margin: 0 auto; border: 2px solid #0f172a; padding: 32px; box-shadow: 6px 6px 0px 0px #0f172a; }
    .header { border-bottom: 2px solid #0f172a; padding-bottom: 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
    .badge { background: #FF6321; color: #fff; font-weight: 900; padding: 4px 12px; font-size: 12px; text-transform: uppercase; display: inline-block; }
    .score-box { background: #0f172a; color: #fff; padding: 20px; border: 2px solid #0f172a; text-align: center; min-width: 160px; }
    .score-val { font-size: 36px; font-weight: 900; color: #fff; margin: 8px 0; font-family: monospace; }
    .section { background: #f8fafc; border: 2px solid #0f172a; padding: 20px; margin-bottom: 24px; }
    .item { background: #fff; border: 2px solid #0f172a; padding: 12px; font-weight: bold; font-size: 13px; margin-bottom: 8px; }
    .footer { border-top: 2px solid #0f172a; padding-top: 20px; margin-top: 32px; font-size: 11px; font-family: monospace; display: flex; justify-content: space-between; }
    @media print { body { padding: 0; } .card { border: none; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div>
        <div style="color: #FF6321; font-weight: 900; font-size: 12px; text-transform: uppercase;">Zila AI Toolkit Diagnostic Report v1.0 • ${schoolName}</div>
        <h1 style="font-size: 28px; margin: 8px 0 4px 0; text-transform: uppercase;">${submission.teacherDetails?.fullName || 'Anonymous Educator'}</h1>
        <div style="font-size: 13px; color: #475569; font-weight: bold;">${submission.teacherDetails?.department || 'General Educator'} • ${submission.teacherDetails?.subjectArea || 'K–12 Curriculum'}</div>
      </div>
      <div class="score-box">
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #cbd5e1;">Overall AI Score</div>
        <div class="score-val">${submission.totalScore}<span style="font-size: 14px; color: #94a3b8;">/100</span></div>
        <div class="badge">${submission.readinessTier}</div>
      </div>
    </div>

    ${submission.aiAnalysis ? `
    <div class="section">
      <div style="color: #FF6321; font-weight: 900; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">AI Transformation Specialist Executive Analysis</div>
      <p style="font-size: 14px; line-height: 1.6; margin: 0;">${submission.aiAnalysis.executiveSummary}</p>
    </div>` : ''}

    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 14px; font-weight: 900; text-transform: uppercase; margin-bottom: 12px;">Core Identified Strengths</h3>
      ${(submission.aiAnalysis?.keyStrengths || ['Ethical AI Awareness', 'Prompt Engineering Fundamentals']).map(st => `<div class="item">✓ ${st}</div>`).join('')}
    </div>

    <div style="margin-bottom: 24px;">
      <h3 style="font-size: 14px; font-weight: 900; text-transform: uppercase; margin-bottom: 12px;">Priority Growth Opportunities</h3>
      ${(submission.aiAnalysis?.priorityGrowthAreas || ['Formative AI Assessment Design', 'Department Collaboration']).map(ga => `<div class="item" style="border-color: #FF6321;">→ ${ga}</div>`).join('')}
    </div>

    <div style="background: #0f172a; color: #fff; padding: 20px; margin-bottom: 24px;">
      <h3 style="color: #FF6321; font-size: 12px; font-weight: 900; text-transform: uppercase; margin-top: 0;">Recommended Professional Learning Pathways</h3>
      ${(submission.aiAnalysis?.recommendedPathways || ['Ethical AI Prompt Scaffolds', 'AI-Resilient Assessment Design', 'Socratic AI Tutoring']).map((p, idx) => `
        <div style="background: #fff; color: #0f172a; padding: 12px; margin-top: 8px; font-weight: bold; font-size: 12px;">
          PATHWAY 0${idx + 1}: ${p}
        </div>
      `).join('')}
    </div>

    <div class="footer">
      <div>ZILA AI TOOLKIT DIAGNOSTIC REPORT • VERIFICATION ID: ZILA-DIAG-${submission.id.toUpperCase()}</div>
      <div>Official Report Issued by Zila Tech Africa</div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 500);
    };
  </script>
</body>
</html>`;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Zila_AI_Readiness_Report_${(submission.teacherDetails?.fullName || 'Educator').replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportNotice('Standalone Diagnostic Report downloaded! Open the file to view or print as PDF.');
    setTimeout(() => setExportNotice(null), 5000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setExportNotice('Report verification link copied to clipboard!');
      setTimeout(() => setExportNotice(null), 4000);
    }
  };

  return (
    <div className="space-y-8 print:bg-white print:text-black">
      {/* Toast Notification */}
      {exportNotice && (
        <div className="bg-emerald-500 text-slate-950 p-3.5 border-2 border-slate-900 font-black text-xs uppercase tracking-wider flex items-center justify-between gap-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] print:hidden">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-slate-950 hover:underline font-bold text-xs cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#FF6321] border border-slate-900 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
            Automated Diagnostic Report Generated
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="px-3.5 py-2 border-2 border-slate-900 bg-white hover:bg-slate-100 text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retake Survey
            </button>
          )}

          <button
            onClick={handleShare}
            className="px-3.5 py-2 border-2 border-slate-900 bg-white hover:bg-slate-100 text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Report
          </button>

          <button
            onClick={handleDownloadReport}
            className="px-3.5 py-2 border-2 border-slate-900 bg-slate-900 text-white hover:bg-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(255,99,33,1)]"
          >
            <Download className="w-3.5 h-3.5 text-[#FF6321]" /> Download HTML
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#FF6321] hover:bg-[#e05217] text-white text-xs font-black uppercase tracking-wider border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Export PDF
          </button>
        </div>
      </div>

      {/* Main Printable Card */}
      <div id="report-print-area" className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] print:border-none print:shadow-none">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-2 border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black text-[#FF6321] uppercase tracking-widest font-mono">
                Zila AI Toolkit Diagnostic Report
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-bold text-slate-700">{schoolName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter font-sans">
              {submission.teacherDetails?.fullName || 'Anonymous Educator'}
            </h1>
            <p className="text-xs font-mono font-bold text-slate-600 mt-1">
              {submission.teacherDetails?.department || 'General Educator'} • {submission.teacherDetails?.subjectArea || 'K–12 Curriculum'}
            </p>
          </div>

          {/* Score & Tier Badge */}
          <div className="bg-slate-900 text-white p-5 border-2 border-slate-900 text-center min-w-44 shadow-[4px_4px_0px_0px_rgba(255,99,33,1)]">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 font-mono block">
              Overall AI Readiness Score
            </span>
            <div className="text-4xl font-black text-white my-1 tracking-tighter font-mono">
              {submission.totalScore}<span className="text-sm font-normal text-slate-400">/100</span>
            </div>
            <span className="inline-block px-3 py-1 font-black text-[10px] uppercase tracking-wider bg-[#FF6321] text-white border border-slate-900">
              {submission.readinessTier}
            </span>
          </div>
        </div>

        {/* AI Strategic Narrative */}
        {submission.aiAnalysis && (
          <div className="bg-slate-100 border-2 border-slate-900 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF6321] font-mono">
              <Sparkles className="w-4 h-4 text-slate-900" />
              AI Transformation Specialist Analysis
            </div>
            <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-sans font-medium">
              {submission.aiAnalysis.executiveSummary}
            </p>
          </div>
        )}

        {/* Visual Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Radar Chart */}
          <div className="bg-slate-50 p-5 border-2 border-slate-900 flex flex-col items-center">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono mb-2">
              12-Dimension AI Competency Profile
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#0f172a" />
                  <PolarAngleAxis dataKey="dimension" stroke="#0f172a" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#0f172a" />
                  <Radar name="Educator Score" dataKey="score" stroke="#0f172a" fill="#FF6321" fillOpacity={0.7} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Diagnostic Breakdown */}
          <div className="space-y-6">
            {/* Observed Strengths */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Core Identified Strengths
              </h3>
              <div className="space-y-2">
                {(submission.aiAnalysis?.keyStrengths || ['Ethical AI Awareness', 'Prompt Writing Fundamentals']).map((st, i) => (
                  <div key={i} className="p-3 bg-white border-2 border-slate-900 text-xs font-bold text-slate-900 flex items-center gap-2 font-sans">
                    <span className="w-2 h-2 bg-emerald-600 border border-slate-900 shrink-0" />
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Growth Areas */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 font-mono">
                <ArrowUpRight className="w-4 h-4 text-[#FF6321]" /> Priority Growth Opportunities
              </h3>
              <div className="space-y-2">
                {(submission.aiAnalysis?.priorityGrowthAreas || ['Formative AI Assessment Design', 'Department AI Collaboration']).map((ga, i) => (
                  <div key={i} className="p-3 bg-white border-2 border-slate-900 text-xs font-bold text-slate-900 flex items-center gap-2 font-sans">
                    <span className="w-2 h-2 bg-[#FF6321] border border-slate-900 shrink-0" />
                    {ga}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Learning Pathways */}
        <div className="bg-slate-900 text-white p-6 border-2 border-slate-900 space-y-4 shadow-[4px_4px_0px_0px_rgba(255,99,33,1)]">
          <h3 className="text-xs font-black text-[#FF6321] uppercase tracking-widest font-mono flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-white" /> Recommended Professional Learning Pathways
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(submission.aiAnalysis?.recommendedPathways || [
              'Module 1: Ethical AI Prompt Scaffolds in K–12',
              'Module 2: AI-Resilient Formative Assessment Design',
              'Module 3: Socratic AI Tutoring for Differentiated Instruction'
            ]).map((path, idx) => (
              <div key={idx} className="p-4 bg-white text-slate-900 border-2 border-slate-900 space-y-2">
                <span className="text-[10px] font-black text-[#FF6321] uppercase font-mono tracking-wider block">
                  Pathway {(idx + 1).toString().padStart(2, '0')}
                </span>
                <p className="text-xs font-extrabold uppercase tracking-tight">
                  {path}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Next Step */}
        {submission.aiAnalysis?.nextActionableStep && (
          <div className="p-4 bg-amber-50 border-2 border-slate-900 text-xs text-slate-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#FF6321] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-black uppercase tracking-wider mb-0.5 font-mono">High-Impact Next Action Step</strong>
              <p className="font-sans font-medium text-slate-800">{submission.aiAnalysis.nextActionableStep}</p>
            </div>
          </div>
        )}

        {/* Footer Verification Seal */}
        <div className="pt-6 border-t-2 border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-700">
          <div>
            <span className="font-bold text-slate-900 uppercase">Zila AI Toolkit • K–12 Evidence-Based Transformation Framework</span>
            <span className="block text-[10px] text-slate-600 mt-0.5">VERIFICATION ID: ZILA-DIAG-{submission.id.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-900 font-black uppercase">
            <Award className="w-4 h-4 text-[#FF6321]" />
            <span>Official Report Issued by Zila Tech Africa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
