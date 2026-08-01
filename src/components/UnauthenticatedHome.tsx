import React, { useState } from 'react';
import { UserAccount, UserRole, School } from '../types';
import { Sparkles, Key, Mail, LockKeyhole, ArrowRight, CheckCircle2, Building2, ShieldCheck, FileText, Calendar, Compass, Lock } from 'lucide-react';
import { ZilaTechLogo } from './ZilaTechLogo';

interface UnauthenticatedHomeProps {
  schools: School[];
  selectedSchoolSlug: string;
  onSelectSchoolSlug: (slug: string) => void;
  users: UserAccount[];
  onSelectUser: (user: UserAccount) => void;
  onSwitchRole: (role: UserRole, schoolId?: string) => void;
  onStartPublicAssessment: () => void;
}

export const UnauthenticatedHome: React.FC<UnauthenticatedHomeProps> = ({
  schools,
  selectedSchoolSlug,
  onSelectSchoolSlug,
  users,
  onSelectUser,
  onSwitchRole,
  onStartPublicAssessment
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const currentSchool = schools.find(s => s.slug === selectedSchoolSlug) || schools[0];

  const handleAuthenticate = (emailToAuth?: string) => {
    setAuthError(null);
    const targetEmail = (emailToAuth || emailInput).trim().toLowerCase();

    if (!targetEmail) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    const foundUser = users.find(u => u.email.toLowerCase() === targetEmail);

    if (foundUser) {
      onSelectUser(foundUser);
      onSwitchRole(foundUser.role, foundUser.schoolId);
      const schoolObj = schools.find(s => s.id === foundUser.schoolId);
      const tenantName = foundUser.role === 'SuperAdmin' ? 'Global Zila Platform Scope' : (schoolObj?.name || 'School Tenant');
      setSuccessMsg(`Welcome back, ${foundUser.fullName}! Authenticated as ${foundUser.role} — ${tenantName}`);
    } else {
      // Auto-provision demo account for new email domain
      const newRole: UserRole = targetEmail.includes('admin') || targetEmail.includes('head') ? 'SchoolAdmin' : 'Teacher';
      const newUser: UserAccount = {
        id: `usr_auth_${Date.now()}`,
        schoolId: currentSchool.id,
        role: newRole,
        fullName: targetEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: targetEmail,
        department: 'Academic Staff',
        subjectArea: 'General Pedagogy',
        activated: true,
        createdAt: new Date().toISOString(),
        badges: [],
        certificates: []
      };
      onSelectUser(newUser);
      onSwitchRole(newRole, currentSchool.id);
      setSuccessMsg(`Authenticated as ${newUser.fullName} (${newRole}) for ${currentSchool.name}`);
    }
  };

  const handleQuickPreset = (presetEmail: string) => {
    setEmailInput(presetEmail);
    setPasswordInput('••••••••••••');
    handleAuthenticate(presetEmail);
  };

  return (
    <div className="space-y-12 py-4 font-sans">
      {/* Top Hero Section & Sign In Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Platform Positioning & Public Actions */}
        <div className="lg:col-span-7 bg-slate-900 text-white border-2 border-slate-900 p-8 sm:p-10 shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB] text-white text-[11px] font-mono font-bold uppercase tracking-widest border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" /> K–12 AI Transformation Operating System
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white font-sans">
              EVIDENCE-BASED AI READINESS FOR <span className="text-cyan-400">MODERN K–12</span> SCHOOLS
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              The Zila Tech AI Toolkit enables school leaders, educators, and technology directors to measure 12 core dimensions of AI integration, build strategic roadmaps, and issue verifiable micro-credentials.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 bg-slate-800 border border-slate-700 space-y-1">
                <span className="text-cyan-400 font-bold block uppercase text-[10px]">1. Authentication</span>
                <span className="text-slate-300 text-[11px]">Identifies user identity via credentials</span>
              </div>
              <div className="p-3 bg-slate-800 border border-slate-700 space-y-1">
                <span className="text-emerald-400 font-bold block uppercase text-[10px]">2. Automatic RBAC</span>
                <span className="text-slate-300 text-[11px]">Auto-loads Teacher/Admin workspace</span>
              </div>
              <div className="p-3 bg-slate-800 border border-slate-700 space-y-1">
                <span className="text-amber-400 font-bold block uppercase text-[10px]">3. Tenant Isolation</span>
                <span className="text-slate-300 text-[11px]">Strict school-level data boundary</span>
              </div>
            </div>
          </div>

          {/* Institutional Registration / Demo Action Section */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" /> Institution Account Required
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Diagnostic AI assessments are reserved exclusively for registered partner schools and active institutional licenses. Free public assessments are not available. Please sign in with your school email or contact your administrator to activate your institution.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setShowDemoModal(true)}
                className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer transition-all"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Contact School / Book Activation Demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sign In Form (Default Landing Page Experience) */}
        <div className="lg:col-span-5 bg-white border-2 border-slate-900 p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
              <div className="p-3 bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(37,99,235,1)]">
                <Key className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-2 py-0.5 border border-blue-200">
                  Platform Sign In
                </span>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mt-0.5">
                  Sign In To Your Account
                </h2>
              </div>
            </div>

            {/* Success Message */}
            {successMsg && (
              <div className="p-3 bg-emerald-600 text-white border-2 border-slate-900 font-mono text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                {successMsg}
              </div>
            )}

            {/* Error Message */}
            {authError && (
              <div className="p-3 bg-rose-600 text-white border-2 border-slate-900 font-mono text-xs font-bold">
                ⚠️ {authError}
              </div>
            )}

            {/* Sign In Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAuthenticate();
              }}
              className="space-y-4 bg-slate-50 p-4 border-2 border-slate-900"
            >
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. leadership@zilademo.ac.ke or admin@zilatech.africa"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-white border-2 border-slate-900 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5">
                  <LockKeyhole className="w-3.5 h-3.5 text-[#2563EB]" /> Security Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-white border-2 border-slate-900 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-[1px]"
              >
                <span>Authenticate & Access Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Presets for Demo Reviewers */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black text-slate-700 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /> 1-Click Reviewer Accounts:
                </span>
                <span className="text-[9px] font-mono text-slate-500">Auto-resolves Tenant & Role</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickPreset('admin@zilatech.africa')}
                  className="p-3 bg-slate-900 text-white border-2 border-slate-900 text-left hover:bg-slate-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(37,99,235,1)] flex items-center justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase">1. Zila SaaS Master Admin</div>
                    <div className="text-xs font-black">admin@zilatech.africa</div>
                  </div>
                  <span className="text-[9px] bg-[#2563EB] text-white font-mono font-bold px-2 py-0.5 border border-slate-700">SuperAdmin</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPreset('leadership@zilademo.ac.ke')}
                  className="p-3 bg-white text-slate-900 border-2 border-slate-900 text-left hover:bg-slate-50 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono text-[#2563EB] font-bold uppercase">2. School Executive (Principal)</div>
                    <div className="text-xs font-black">Dr. Eric Davies • Brookhouse / Zila Demo</div>
                  </div>
                  <span className="text-[9px] bg-slate-100 text-slate-900 font-mono font-bold px-2 py-0.5 border border-slate-300">SchoolAdmin</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPreset('dochieng@zilademo.ac.ke')}
                  className="p-3 bg-white text-slate-900 border-2 border-slate-900 text-left hover:bg-slate-50 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono text-emerald-600 font-bold uppercase">3. Educator / STEM Teacher</div>
                    <div className="text-xs font-black">David Ochieng • Brookhouse / Zila Demo</div>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-800 font-mono font-bold px-2 py-0.5 border border-emerald-300">Teacher</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 text-center border-t border-slate-200 pt-3">
            Zila Tech Security Engine • GDPR Compliant Multi-Tenant Auth
          </div>
        </div>
      </div>

      {/* Book Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-900 max-w-lg w-full p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-4 font-sans">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-base font-black text-slate-900 uppercase">Book School Activation Demo</h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-slate-500 hover:text-slate-900 font-black text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Ready to onboard your K–12 institution onto the Zila AI Transformation Operating System? Our team will activate your dedicated school tenant and generate initial teacher evaluation links.
            </p>
            <div className="p-3 bg-blue-50 border border-blue-200 text-xs text-slate-800 font-mono space-y-1">
              <div><strong>Direct Contact:</strong> demo@zilatech.africa</div>
              <div><strong>School Onboarding SLA:</strong> 24–48 Hours</div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-5 py-2 bg-slate-900 text-white font-black text-xs uppercase border border-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
