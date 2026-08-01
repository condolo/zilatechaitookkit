import React, { useState } from 'react';
import { UserRole, UserAccount, School } from '../types';
import { ShieldCheck, Sparkles, Building2, User, Award, BookOpen, Layers, BarChart3, Key, LogOut } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { ZilaTechLogo } from './ZilaTechLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserAccount | null;
  currentUserRole: UserRole | 'Guest';
  onRoleChange: (role: UserRole) => void;
  onSelectUser: (user: UserAccount) => void;
  onLogout: () => void;
  users: UserAccount[];
  schools: School[];
  selectedSchoolSlug: string;
  onSchoolChange: (slug: string) => void;
  isLoginModalOpen?: boolean;
  setIsLoginModalOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  currentUserRole,
  onRoleChange,
  onSelectUser,
  onLogout,
  users,
  schools,
  selectedSchoolSlug,
  onSchoolChange,
  isLoginModalOpen: externalIsLoginModalOpen,
  setIsLoginModalOpen: externalSetIsLoginModalOpen
}) => {
  const [internalIsLoginModalOpen, setInternalIsLoginModalOpen] = useState(false);

  const isLoginOpen = externalIsLoginModalOpen !== undefined ? externalIsLoginModalOpen : internalIsLoginModalOpen;
  const setLoginOpen = externalSetIsLoginModalOpen || setInternalIsLoginModalOpen;

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-900 shadow-sm">
      {/* Top Banner: Role & Security Context Bar */}
      <div className="bg-slate-900 border-b-2 border-slate-900 px-4 py-2 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security & GDPR Compliant
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-300 font-sans text-[11px] uppercase tracking-widest font-bold">
            Multi-Tenant K–12 SaaS
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active School Selector / Context Bar */}
          {currentUser ? (
            currentUserRole === 'SuperAdmin' ? (
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 border border-slate-700">
                <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hidden md:inline">Global Admin Context:</span>
                <select
                  value={selectedSchoolSlug}
                  onChange={(e) => onSchoolChange(e.target.value)}
                  className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
                >
                  {schools.map((s) => (
                    <option key={s.id} value={s.slug} className="bg-slate-900 text-white">
                      {s.name} ({s.status})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 border border-slate-700">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hidden md:inline">Authenticated Tenant:</span>
                <span className="text-white font-bold text-xs font-sans">
                  {schools.find(s => s.slug === selectedSchoolSlug)?.name || 'Assigned School'}
                </span>
              </div>
            )
          ) : (
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 border border-slate-700">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hidden md:inline">Evaluating School:</span>
              <select
                value={selectedSchoolSlug}
                onChange={(e) => onSchoolChange(e.target.value)}
                className="bg-transparent text-cyan-200 font-bold text-xs focus:outline-none cursor-pointer"
                title="Select participating school for evaluation"
              >
                {schools.map((s) => (
                  <option key={s.id} value={s.slug} className="bg-slate-900 text-white">
                    {s.name} (Participating School)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* User Account / Role Status */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 text-xs border border-slate-700 cursor-pointer font-sans"
                title="Manage Account"
              >
                <User className="w-3.5 h-3.5 text-cyan-300" />
                <span className="font-extrabold hidden lg:inline max-w-[120px] truncate">{currentUser.fullName}</span>
                <span className="px-1.5 py-0.2 bg-[#2563EB] text-white font-black text-[10px] uppercase">{currentUserRole}</span>
              </button>

              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 font-black text-xs uppercase tracking-wider border border-slate-900 cursor-pointer transition-all active:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                title="Log Out of Zila Tech"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-3.5 py-1 font-black text-xs uppercase tracking-wider border border-slate-900 cursor-pointer transition-all active:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
            >
              <Key className="w-3.5 h-3.5 text-cyan-200" />
              <span>SIGN IN</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Official Zila Tech Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="cursor-pointer group flex items-center gap-2"
          >
            <ZilaTechLogo size="md" showTagline={true} />
            <span className="px-2 py-0.5 text-[10px] uppercase font-extrabold tracking-widest bg-slate-900 text-white border border-slate-900 hidden lg:inline-block ml-2">
              K–12 AI TOOLKIT
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {currentUser ? (
              <>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'dashboard'
                      ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(37,99,235,1)]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#2563EB]" /> Dashboard
                </button>

                <button
                  onClick={() => setActiveTab('consultant')}
                  className={`px-3 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'consultant'
                      ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(13,148,136,1)]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Strategy Hub
                </button>

                <button
                  onClick={() => setActiveTab('teacher')}
                  className={`px-3 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'teacher'
                      ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(2,132,199,1)]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-sky-400" /> Certificates
                </button>

                <button
                  onClick={() => setActiveTab('assessment')}
                  className={`px-3 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'assessment'
                      ? 'bg-slate-900 text-white border-2 border-slate-900'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" /> Assessment
                </button>

                {currentUserRole === 'SuperAdmin' && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      activeTab === 'admin'
                        ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(37,99,235,1)]'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#2563EB]" /> SaaS Admin
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    activeTab === 'home'
                      ? 'bg-slate-900 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(37,99,235,1)]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#2563EB]" /> Sign In / Home
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        currentUser={currentUser}
        currentUserRole={currentUserRole}
        users={users}
        schools={schools}
        selectedSchoolSlug={selectedSchoolSlug}
        onSelectUser={onSelectUser}
        onSwitchRole={onRoleChange}
        onLogout={onLogout}
      />
    </header>
  );
};

