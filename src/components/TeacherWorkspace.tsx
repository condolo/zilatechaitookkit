import React from 'react';
import { UserAccount, AssessmentSubmission } from '../types';
import { Award, ShieldCheck, Zap, BookOpen, Printer, CheckCircle, ExternalLink, QrCode } from 'lucide-react';

interface TeacherWorkspaceProps {
  user: UserAccount | null;
  submissions: AssessmentSubmission[];
  onRequireLogin?: () => void;
}

export const TeacherWorkspace: React.FC<TeacherWorkspaceProps> = ({ user, submissions, onRequireLogin }) => {
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] text-center space-y-4 font-sans">
        <div className="w-12 h-12 bg-blue-50 border-2 border-slate-900 mx-auto flex items-center justify-center text-[#2563EB]">
          <Award className="w-6 h-6" />
        </div>
        <span className="px-3 py-1 bg-[#2563EB] text-white font-black text-xs uppercase tracking-wider font-mono inline-block">
          Authentication Required
        </span>
        <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans">
          Teacher Learning & Certification Portal
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          Access to personalized micro-credentials, earned digital badges, and verified K–12 AI readiness certificates requires an authenticated educator account.
        </p>
        {onRequireLogin && (
          <button
            onClick={onRequireLogin}
            className="px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all"
          >
            Sign In To View Certificates
          </button>
        )}
      </div>
    );
  }

  const userSubmissions = submissions.filter(s =>
    s.teacherDetails?.email?.toLowerCase() === user.email.toLowerCase()
  );

  const handlePrintCert = (certId: string) => {
    window.print();
  };

  return (
    <div className="space-y-8 print:bg-white print:text-black">
      {/* Header Profile Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xl shrink-0">
            {user.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                Teacher Workspace
              </span>
              <span className="text-xs text-slate-400">• {user.department}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{user.fullName}</h1>
            <p className="text-xs text-slate-400">{user.email} • {user.subjectArea}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center min-w-28">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Earned Badges</span>
            <div className="text-xl font-bold text-indigo-400 mt-0.5">{user.badges.length}</div>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center min-w-28">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Certificates</span>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">{user.certificates.length}</div>
          </div>
        </div>
      </div>

      {/* Earned Badges Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-400" /> Digital Badges & Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {user.badges.map((badge) => (
            <div key={badge.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {badge.level}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white mt-1">{badge.title}</h3>
              <p className="text-[11px] text-slate-400 leading-snug">{badge.description}</p>
              <span className="text-[10px] text-slate-500 block pt-1">Earned: {badge.earnedDate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Digital Certificate */}
      {user.certificates.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Official K–12 AI Transformation Certificate
            </h2>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <Printer className="w-3.5 h-3.5" /> Print Certificate
            </button>
          </div>

          {user.certificates.map((cert) => (
            <div key={cert.id} className="p-8 rounded-2xl bg-slate-950 border-2 border-indigo-500/40 space-y-6 relative text-center">
              <div className="max-w-2xl mx-auto space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                  Zila Tech Africa • K–12 AI Excellence Certification
                </span>
                <h3 className="text-2xl font-serif font-extrabold text-white">
                  Certificate of AI Readiness Achievement
                </h3>
                <p className="text-xs text-slate-400">This certifies that</p>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 py-1">
                  {cert.recipientName}
                </div>
                <p className="text-xs text-slate-300">
                  of <strong className="text-white">{cert.schoolName}</strong> has completed the baseline K–12 Educational AI Readiness Evaluation scoring <strong className="text-indigo-400">{cert.score}/100</strong> and attaining the tier:
                </p>
                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold text-xs">
                  {cert.tier}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-left text-[11px] text-slate-400">
                <div>
                  <span>Issue Date: {cert.issueDate}</span>
                  <span className="block font-mono text-[10px] text-slate-500 mt-0.5">Verification: {cert.verificationCode}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400">
                    <QrCode className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="text-[10px] text-slate-500">
                    <span>Verified by Zila Tech</span>
                    <span className="block text-slate-400 font-semibold">toolkit.zilatech.africa</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
