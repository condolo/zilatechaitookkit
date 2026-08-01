import React, { useState } from 'react';
import { School, AssessmentSubmission } from '../types';
import { Building2, Plus, Link, CheckCircle, ExternalLink, Sparkles, Shield, Users, BarChart3, ArrowRight, Award } from 'lucide-react';

interface SuperAdminPortalProps {
  schools: School[];
  submissions: AssessmentSubmission[];
  onAddSchool: (name: string, category: School['category'], region: string, contactName: string, contactEmail: string) => School;
  onActivateSchool: (schoolId: string) => { activatedSchool: School; provisionedCount: number } | undefined;
}

export const SuperAdminPortal: React.FC<SuperAdminPortalProps> = ({
  schools,
  submissions,
  onAddSchool,
  onActivateSchool
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolCategory, setNewSchoolCategory] = useState<School['category']>('Cambridge International');
  const [newSchoolRegion, setNewSchoolRegion] = useState('Nairobi, Kenya');
  const [newSchoolContactName, setNewSchoolContactName] = useState('');
  const [newSchoolContactEmail, setNewSchoolContactEmail] = useState('');

  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [activationResult, setActivationResult] = useState<{ schoolName: string; count: number } | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName || !newSchoolContactEmail) return;

    onAddSchool(
      newSchoolName,
      newSchoolCategory,
      newSchoolRegion,
      newSchoolContactName || 'School Head',
      newSchoolContactEmail
    );

    setNewSchoolName('');
    setNewSchoolContactName('');
    setNewSchoolContactEmail('');
    setShowAddModal(false);
  };

  const handleCopyLink = (school: School) => {
    const url = `${window.location.origin}/assessment/${school.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedSlug(school.slug);
      setTimeout(() => setCopiedSlug(null), 3000);
    }
  };

  const handleActivate = (schoolId: string) => {
    const res = onActivateSchool(schoolId);
    if (res) {
      setActivationResult({
        schoolName: res.activatedSchool.name,
        count: res.provisionedCount
      });
      setTimeout(() => setActivationResult(null), 6000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
              Zila Tech Master SaaS Console
            </span>
            <span className="text-xs text-slate-400">• Multi-School Tenant Manager</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Participating K–12 Schools Network
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Oversee baseline assessments, activate prospective schools, and trigger automatic user account provisioning.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Prospective School
        </button>
      </div>

      {/* Activation Success Alert */}
      {activationResult && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white block font-bold">School Activated Successfully!</strong>
              {activationResult.schoolName} is now an Active School workspace. Auto-provisioned {activationResult.count} teacher user accounts from baseline submissions.
            </div>
          </div>
        </div>
      )}

      {/* Schools Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-400" /> Managed Educational Institutions ({schools.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">School & Region</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Assessments Completed</th>
                <th className="p-4 text-center">Avg Score</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{school.name}</div>
                    <div className="text-[11px] text-slate-400">{school.region} • {school.contactName}</div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-medium">
                      {school.category}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      school.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {school.status}
                    </span>
                  </td>

                  <td className="p-4 text-center font-bold text-white">
                    {school.completionCount}
                  </td>

                  <td className="p-4 text-center">
                    <span className="font-bold text-indigo-400">{school.averageScore}/100</span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopyLink(school)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                        title="Copy Public Assessment Link"
                      >
                        <Link className="w-3.5 h-3.5" />
                        {copiedSlug === school.slug ? 'Copied Link!' : 'Assessment Link'}
                      </button>

                      {school.status === 'Prospective' && (
                        <button
                          onClick={() => handleActivate(school.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-600/20"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Activate School
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Prospective School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" /> Create Prospective School
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">School Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brookhouse School"
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Curriculum / Category</label>
                <select
                  value={newSchoolCategory}
                  onChange={(e) => setNewSchoolCategory(e.target.value as School['category'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Cambridge International">Cambridge International</option>
                  <option value="CBC / National">CBC / National</option>
                  <option value="Private Independent">Private Independent</option>
                  <option value="Public District">Public District</option>
                  <option value="International Baccalaureate">International Baccalaureate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Region / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Nairobi, Kenya"
                  value={newSchoolRegion}
                  onChange={(e) => setNewSchoolRegion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Contact Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Headmaster"
                    value={newSchoolContactName}
                    onChange={(e) => setNewSchoolContactName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="admin@school.ac.ke"
                    value={newSchoolContactEmail}
                    onChange={(e) => setNewSchoolContactEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                Generate Assessment Link <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
