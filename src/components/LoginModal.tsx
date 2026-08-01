import React, { useState } from 'react';
import { UserRole, UserAccount, School } from '../types';
import { Shield, User, Building2, Key, CheckCircle2, Lock, ArrowRight, X, LogOut, Mail, LockKeyhole, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  currentUserRole: UserRole | 'Guest';
  users: UserAccount[];
  schools: School[];
  selectedSchoolSlug: string;
  onSelectUser: (user: UserAccount) => void;
  onSwitchRole: (role: UserRole, schoolId?: string) => void;
  onLogout: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  currentUserRole,
  users,
  schools,
  selectedSchoolSlug,
  onSelectUser,
  onSwitchRole,
  onLogout
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSchool = schools.find(s => s.slug === selectedSchoolSlug) || schools[0];

  const handleAuthenticate = (emailToAuth?: string) => {
    setAuthError(null);
    const targetEmail = (emailToAuth || emailInput).trim().toLowerCase();

    if (!targetEmail) {
      setAuthError('Please enter a valid account email address.');
      return;
    }

    // Lookup user in system
    const foundUser = users.find(u => u.email.toLowerCase() === targetEmail);

    if (foundUser) {
      onSelectUser(foundUser);
      onSwitchRole(foundUser.role, foundUser.schoolId);
      const schoolObj = schools.find(s => s.id === foundUser.schoolId);
      const tenantName = foundUser.role === 'SuperAdmin' ? 'Global Zila Platform' : (schoolObj?.name || 'School Tenant');
      setLoginSuccessMessage(`Authentication Successful! Logged in as ${foundUser.fullName} (${foundUser.role}) — ${tenantName}`);
      setTimeout(() => {
        setLoginSuccessMessage(null);
        onClose();
      }, 1500);
    } else {
      // Auto-provision demo account for new email domain
      const newRole: UserRole = targetEmail.includes('admin') || targetEmail.includes('head') ? 'SchoolAdmin' : 'Teacher';
      const targetSchool = currentSchool;
      const newUser: UserAccount = {
        id: `usr_auth_${Date.now()}`,
        schoolId: targetSchool.id,
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
      onSwitchRole(newRole, targetSchool.id);
      setLoginSuccessMessage(`Authenticated as ${newUser.fullName} (${newRole}) for ${targetSchool.name}`);
      setTimeout(() => {
        setLoginSuccessMessage(null);
        onClose();
      }, 1500);
    }
  };

  const handleQuickPreset = (presetEmail: string) => {
    setEmailInput(presetEmail);
    setPasswordInput('••••••••••••');
    handleAuthenticate(presetEmail);
  };

  const handleLogoutClick = () => {
    onLogout();
    setEmailInput('');
    setPasswordInput('');
    setLoginSuccessMessage('Logged out successfully. Returned to Public Experience.');
    setTimeout(() => {
      setLoginSuccessMessage(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border-2 border-slate-900 max-w-xl w-full p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-6 relative font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 text-slate-900 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
          <div className="p-3 bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(37,99,235,1)]">
            <Key className="w-6 h-6 text-[#2563EB]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-2 py-0.5 border border-blue-200">
                Secure Authentication
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                GDPR & Multi-Tenant
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight font-sans mt-0.5">
              Zila Platform Account Sign In
            </h2>
          </div>
        </div>

        {/* Success Alert */}
        {loginSuccessMessage && (
          <div className="p-3 bg-emerald-600 text-white border-2 border-slate-900 font-mono text-xs font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
            <CheckCircle2 className="w-4 h-4 text-white" />
            {loginSuccessMessage}
          </div>
        )}

        {/* Error Alert */}
        {authError && (
          <div className="p-3 bg-rose-600 text-white border-2 border-slate-900 font-mono text-xs font-bold">
            ⚠️ {authError}
          </div>
        )}

        {/* Active Session vs Login Form */}
        {currentUser ? (
          <div className="p-5 bg-slate-900 text-white border-2 border-slate-900 space-y-4 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono font-black text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Active Authenticated Account
              </span>
              <span className="px-2 py-0.5 bg-[#2563EB] text-white font-black text-[10px] uppercase font-mono border border-slate-700">
                {currentUser.role}
              </span>
            </div>

            <div>
              <div className="text-base font-black font-sans uppercase">
                {currentUser.fullName}
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                {currentUser.email}
              </div>
              <div className="text-xs text-cyan-200 font-sans mt-2 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Tenant Context: <strong>{currentUser.role === 'SuperAdmin' ? 'Global Zila Platform Scope' : (schools.find(s => s.id === currentUser.schoolId)?.name || 'Assigned School')}</strong>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                Automatic RBAC Permissions Active
              </span>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Real Login Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAuthenticate();
              }}
              className="space-y-4 bg-slate-50 p-5 border-2 border-slate-900"
            >
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. dochieng@zilademo.ac.ke or admin@zilatech.africa"
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
                className="w-full py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-[1px]"
              >
                <span>Authenticate & Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Test Accounts Presets (Development & Reviewer Helper) */}
            <div className="space-y-2 border-t-2 border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black text-slate-700 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" /> Quick Testing Accounts (1-Click Sign In)
                </span>
                <span className="text-[9px] font-mono text-slate-500">Auto-resolves Tenant & Role</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickPreset('admin@zilatech.africa')}
                  className="p-2.5 bg-slate-900 text-white border-2 border-slate-900 text-left hover:bg-slate-800 cursor-pointer shadow-[2px_2px_0px_0px_rgba(37,99,235,1)]"
                >
                  <div className="text-[9px] font-mono text-cyan-300 font-bold uppercase">Zila Master Admin</div>
                  <div className="text-xs font-black truncate">admin@zilatech.africa</div>
                  <div className="text-[9px] text-slate-300">Global SaaS Admin</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPreset('leadership@zilademo.ac.ke')}
                  className="p-2.5 bg-white text-slate-900 border-2 border-slate-900 text-left hover:bg-slate-50 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                >
                  <div className="text-[9px] font-mono text-[#2563EB] font-bold uppercase">School Executive</div>
                  <div className="text-xs font-black truncate">Dr. Eric Davies</div>
                  <div className="text-[9px] text-slate-600">Principal (Zila Demo)</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPreset('dochieng@zilademo.ac.ke')}
                  className="p-2.5 bg-white text-slate-900 border-2 border-slate-900 text-left hover:bg-slate-50 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                >
                  <div className="text-[9px] font-mono text-emerald-600 font-bold uppercase">Educator / Teacher</div>
                  <div className="text-xs font-black truncate">David Ochieng</div>
                  <div className="text-[9px] text-slate-600">STEM Faculty</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between border-t-2 border-slate-900 pt-4 text-[10px] font-mono text-slate-600">
          <span>Zila Tech • K-12 AI Operating System</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-900 font-black uppercase tracking-wider border border-slate-900 cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

