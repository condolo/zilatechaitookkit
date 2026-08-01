import React, { useState } from 'react';
import { School, ParticipationPathway, TeacherDetails, AssessmentSubmission } from '../types';
import { AI_DIMENSIONS } from '../data/dimensionsData';
import { ConsentModal } from './ConsentModal';
import { IndividualReportView } from './IndividualReportView';
import { UserCheck, Sparkles, ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';

interface AssessmentFlowProps {
  school: School;
  onSubmit: (
    schoolSlug: string,
    pathway: ParticipationPathway,
    responses: Record<string, number>,
    teacherDetails?: TeacherDetails
  ) => Promise<AssessmentSubmission>;
}

export const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ school, onSubmit }) => {
  const [hasConsented, setHasConsented] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pathway, setPathway] = useState<ParticipationPathway>('personalized');

  // Teacher details for Option 2
  const [teacherDetails, setTeacherDetails] = useState<TeacherDetails>({
    fullName: '',
    email: '',
    department: 'STEM & Computing',
    subjectArea: '',
    consentGiven: true
  });

  // Questionnaire responses: questionId -> rating (1-5)
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [currentDimIndex, setCurrentDimIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSubmission, setCompletedSubmission] = useState<AssessmentSubmission | null>(null);

  const currentDimension = AI_DIMENSIONS[currentDimIndex];

  // Handle Option choice & start questionnaire
  const handleStart = () => {
    if (!hasConsented) {
      setShowConsentModal(true);
      return;
    }
  };

  const handleConsentAccept = () => {
    setHasConsented(true);
    setShowConsentModal(false);
  };

  const handleSelectOption = (qId: string, val: number) => {
    setResponses(prev => ({ ...prev, [qId]: val }));
  };

  const isCurrentDimensionComplete = () => {
    return currentDimension.questions.every(q => responses[q.id] !== undefined);
  };

  const isFormValid = () => {
    if (pathway === 'personalized') {
      if (!teacherDetails.fullName.trim() || !teacherDetails.email.includes('@')) {
        return false;
      }
    }
    return Object.keys(responses).length === AI_DIMENSIONS.reduce((acc, d) => acc + d.questions.length, 0);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submission = await onSubmit(
        school.slug,
        pathway,
        responses,
        pathway === 'personalized' ? teacherDetails : undefined
      );
      setCompletedSubmission(submission);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedSubmission) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <IndividualReportView
          submission={completedSubmission}
          schoolName={school.name}
          onReset={() => {
            setCompletedSubmission(null);
            setResponses({});
            setCurrentDimIndex(0);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 bg-white border-2 border-slate-900 p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest border border-slate-900">
          <Sparkles className="w-4 h-4 text-[#2563EB]" /> Baseline K–12 AI Readiness Survey
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter font-sans">
          ZILA TOOLKIT <span className="text-[#2563EB]">AI EVALUATION</span>
        </h1>
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="text-xs font-bold text-slate-600 font-sans">Evaluating Participating School:</span>
          <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-300 text-[#2563EB] text-xs font-black uppercase tracking-wider font-sans">
            {school.name}
          </span>
        </div>
        <p className="text-xs text-slate-700 max-w-2xl mx-auto font-sans font-medium">
          Participate in Zila Tech's evidence-based 12-dimension AI readiness assessment. Takes approx 10–15 minutes.
        </p>
      </div>

      {/* Step 1: Pathway & Identity Selection if not consented yet */}
      {!hasConsented && (
        <div className="bg-white border-2 border-slate-900 p-6 sm:p-8 space-y-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
          <div className="border-b-2 border-slate-900 pb-4">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2563EB]" /> Select Participation Pathway
            </h2>
            <p className="text-xs text-slate-600 font-mono mt-1 font-bold">
              Choose how you would like your responses recorded and delivered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Option 2: Personalized (Recommended) */}
            <div
              onClick={() => setPathway('personalized')}
              className={`p-5 border-2 transition-all cursor-pointer relative ${
                pathway === 'personalized'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]'
                  : 'border-slate-900 bg-white text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 border-2 border-slate-900 ${pathway === 'personalized' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-900'}`}>
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 bg-[#2563EB] text-white border border-slate-900">
                  Recommended
                </span>
              </div>
              <h3 className="text-base font-black uppercase tracking-tight mt-4">Personalized Participation</h3>
              <p className={`text-xs mt-2 leading-relaxed ${pathway === 'personalized' ? 'text-slate-300' : 'text-slate-600'}`}>
                Receive an immediate individualized AI Readiness diagnostic report delivered to your email. Qualifies for digital certificates & badging.
              </p>
            </div>

            {/* Option 1: Anonymous */}
            <div
              onClick={() => setPathway('anonymous')}
              className={`p-5 border-2 transition-all cursor-pointer ${
                pathway === 'anonymous'
                  ? 'border-slate-900 bg-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(37,99,235,1)]'
                  : 'border-slate-900 bg-white text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className={`p-2 border-2 border-slate-900 ${pathway === 'anonymous' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-900'}`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight mt-4">Anonymous Submission</h3>
              <p className={`text-xs mt-2 leading-relaxed ${pathway === 'anonymous' ? 'text-slate-300' : 'text-slate-600'}`}>
                Submits anonymously into overall school and department averages. No personal account or individual report generated.
              </p>
            </div>
          </div>

          {/* Teacher Info Form if Personalized */}
          {pathway === 'personalized' && (
            <div className="bg-slate-100 p-6 border-2 border-slate-900 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#2563EB] font-mono">
                Participant Profile Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. David Ochieng"
                    value={teacherDetails.fullName}
                    onChange={(e) => setTeacherDetails({ ...teacherDetails, fullName: e.target.value })}
                    className="w-full bg-white border-2 border-slate-900 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">School Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. dochieng@school.ac.ke"
                    value={teacherDetails.email}
                    onChange={(e) => setTeacherDetails({ ...teacherDetails, email: e.target.value })}
                    className="w-full bg-white border-2 border-slate-900 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Department</label>
                  <select
                    value={teacherDetails.department}
                    onChange={(e) => setTeacherDetails({ ...teacherDetails, department: e.target.value })}
                    className="w-full bg-white border-2 border-slate-900 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  >
                    {school.departments.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Subject Area / Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics & Physics"
                    value={teacherDetails.subjectArea}
                    onChange={(e) => setTeacherDetails({ ...teacherDetails, subjectArea: e.target.value })}
                    className="w-full bg-white border-2 border-slate-900 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-slate-900">
            <span className="text-xs text-slate-600 font-mono font-bold">
              * Requires consent to GDPR & Data Protection terms
            </span>
            <button
              onClick={handleStart}
              className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer"
            >
              Continue to Consent Statement <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Interactive Questionnaire */}
      {hasConsented && (
        <div className="space-y-6">
          {/* Dimension Stepper / Progress Bar */}
          <div className="bg-slate-900 text-white border-2 border-slate-900 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 bg-[#2563EB] text-white border border-slate-900 flex items-center justify-center font-black text-xs font-mono">
                {(currentDimIndex + 1).toString().padStart(2, '0')}/12
              </span>
              <div>
                <h3 className="text-base font-black uppercase tracking-tight font-sans">{currentDimension.name}</h3>
                <p className="text-xs text-slate-300 font-sans">{currentDimension.description}</p>
              </div>
            </div>

            <div className="w-full sm:w-48 bg-slate-950 h-3 border border-slate-800 p-0.5">
              <div
                className="bg-[#2563EB] h-full transition-all duration-300"
                style={{ width: `${((currentDimIndex + 1) / AI_DIMENSIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Dimension Questions */}
          <div className="space-y-6">
            {currentDimension.questions.map((q, idx) => (
              <div key={q.id} className="bg-white border-2 border-slate-900 p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <div className="flex items-start gap-3 border-b-2 border-slate-900 pb-3">
                  <span className="text-xs font-black px-2.5 py-1 bg-slate-900 text-white font-mono uppercase">
                    Q{idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug font-sans">
                    {q.text}
                  </h4>
                </div>

                {/* Likert 1-5 Radio Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = responses[q.id] === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={() => handleSelectOption(q.id, opt.value)}
                        className={`p-3.5 border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-slate-900 bg-[#2563EB] text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]'
                            : 'border-slate-900 bg-white text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-black font-mono uppercase ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              Level {opt.value}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <span className={`text-xs font-extrabold block uppercase tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {opt.label}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-2 leading-tight ${isSelected ? 'text-slate-100 font-medium' : 'text-slate-600'}`}>
                          {opt.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Stepper Navigation Actions */}
          <div className="flex items-center justify-between pt-4">
            <button
              disabled={currentDimIndex === 0}
              onClick={() => setCurrentDimIndex(prev => prev - 1)}
              className="px-5 py-3 border-2 border-slate-900 bg-white hover:bg-slate-100 text-slate-900 text-xs font-black uppercase tracking-wider flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {currentDimIndex < AI_DIMENSIONS.length - 1 ? (
              <button
                disabled={!isCurrentDimensionComplete()}
                onClick={() => setCurrentDimIndex(prev => prev + 1)}
                className="px-6 py-3 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(37,99,235,1)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next Dimension <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={!isFormValid() || isSubmitting}
                onClick={handleFinalSubmit}
                className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Generating AI Report...' : 'Complete & Generate AI Diagnostic Report'} <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Consent Modal Popup */}
      {showConsentModal && (
        <ConsentModal
          schoolName={school.name}
          onAccept={handleConsentAccept}
          onCancel={() => setShowConsentModal(false)}
        />
      )}
    </div>
  );
};
