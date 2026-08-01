import React, { useState, useEffect } from 'react';
import { useToolkitStore } from './services/toolkitStore';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { UnauthenticatedHome } from './components/UnauthenticatedHome';
import { FrameworkSeoPage } from './components/FrameworkSeoPage';
import { AssessmentFlow } from './components/AssessmentFlow';
import { SchoolDashboard } from './components/SchoolDashboard';
import { SuperAdminPortal } from './components/SuperAdminPortal';
import { ConsultancyHub } from './components/ConsultancyHub';
import { TeacherWorkspace } from './components/TeacherWorkspace';

export default function App() {
  const {
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
  } = useToolkitStore();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSchoolSlug, setSelectedSchoolSlug] = useState<string>(schools[0]?.slug || 'zila-demo');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const currentUserRole = currentUser?.role || 'Guest';

  // Automatically transition to dashboard upon user sign in
  useEffect(() => {
    if (currentUser && activeTab === 'home') {
      setActiveTab('dashboard');
    } else if (!currentUser && activeTab === 'dashboard') {
      setActiveTab('home');
    }
  }, [currentUser]);

  // Strict RBAC Tenant Scoping: Non-SuperAdmins are locked to their user's assigned schoolId
  const userSchool = (currentUser && schools.find(s => s.id === currentUser.schoolId)) || (schools.find(s => s.slug === selectedSchoolSlug) || schools[0]);
  const selectedSchool = (currentUserRole === 'SuperAdmin' || !currentUser)
    ? (schools.find(s => s.slug === selectedSchoolSlug) || schools[0])
    : userSchool;

  const activeSchoolSlug = selectedSchool.slug;

  const handleSelectUser = (user: any) => {
    setCurrentUser(user);
    if (activeTab === 'home') {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9] text-slate-900 font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        currentUserRole={currentUserRole}
        onRoleChange={(r) => switchRole(r, selectedSchool.id)}
        onSelectUser={handleSelectUser}
        onLogout={handleLogout}
        users={users}
        schools={schools}
        selectedSchoolSlug={activeSchoolSlug}
        onSchoolChange={setSelectedSchoolSlug}
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          currentUser ? (
            <FrameworkSeoPage onStartAssessment={() => setActiveTab('assessment')} />
          ) : (
            <UnauthenticatedHome
              schools={schools}
              selectedSchoolSlug={activeSchoolSlug}
              onSelectSchoolSlug={setSelectedSchoolSlug}
              users={users}
              onSelectUser={handleSelectUser}
              onSwitchRole={switchRole}
              onStartPublicAssessment={() => setActiveTab('assessment')}
            />
          )
        )}

        {activeTab === 'assessment' && (
          currentUser ? (
            <AssessmentFlow
              school={selectedSchool}
              onSubmit={submitAssessment}
            />
          ) : (
            <div className="max-w-2xl mx-auto my-12 p-8 bg-white border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] text-center space-y-4 font-sans">
              <span className="px-3 py-1 bg-amber-500 text-slate-900 font-black text-xs uppercase tracking-wider font-mono inline-block border border-slate-900">
                🔒 Institutional Access Only
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans">
                Diagnostic Assessment Restricted
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Public diagnostic assessments are not available. Zila Tech AI readiness evaluations are restricted exclusively to authenticated users from registered partner schools.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all"
                >
                  Sign In With School Account
                </button>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs uppercase tracking-wider border border-slate-900 cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )
        )}

        {activeTab === 'dashboard' && (
          <SchoolDashboard
            school={selectedSchool}
            submissions={submissions}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'admin' && (
          currentUserRole === 'SuperAdmin' ? (
            <SuperAdminPortal
              schools={schools}
              submissions={submissions}
              onAddSchool={addProspectiveSchool}
              onActivateSchool={activateSchool}
            />
          ) : (
            <div className="max-w-2xl mx-auto my-12 p-8 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] text-center space-y-4 font-sans">
              <span className="px-3 py-1 bg-rose-600 text-white font-black text-xs uppercase tracking-wider font-mono inline-block">
                Authentication & Role Restricted
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans">
                SaaS SuperAdmin Portal
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                The Zila Tech SaaS Admin portal is strictly restricted to <strong>Zila Master SuperAdmin</strong> accounts. Accessing platform administration features requires authenticating with a SuperAdmin account.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-wider border-2 border-slate-900 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all"
              >
                Sign In As SuperAdmin
              </button>
            </div>
          )
        )}

        {activeTab === 'consultant' && (
          <ConsultancyHub
            selectedSchool={selectedSchool}
            schools={schools}
            currentUserRole={currentUserRole}
            onSelectSchool={(slug) => {
              if (currentUserRole === 'SuperAdmin' || !currentUser) {
                setSelectedSchoolSlug(slug);
              }
            }}
            onNavigateToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherWorkspace
            user={currentUser}
            submissions={submissions}
            onRequireLogin={() => setIsLoginModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
