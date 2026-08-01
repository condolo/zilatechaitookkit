import React from 'react';
import { AI_DIMENSIONS } from '../data/dimensionsData';
import { Sparkles, ShieldCheck, Layers, Cpu, Globe, ArrowRight, Code, ExternalLink, Lock, CheckCircle, Info } from 'lucide-react';

export const FrameworkSeoPage: React.FC<{ onStartAssessment: () => void }> = ({ onStartAssessment }) => {
  return (
    <div className="space-y-12 py-6">
      {/* Public Visitor Experience Notice Banner */}
      <div className="bg-blue-50 border-2 border-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#2563EB] text-white font-black text-[10px] uppercase tracking-wider">
              Public Educator & Guest View
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Unauthenticated Access Mode</span>
          </div>
          <p className="text-xs font-semibold text-slate-800 leading-relaxed">
            Welcome to <strong>Zila Tech K–12 AI Transformation Platform</strong>. As a public guest or teacher, you can freely take the 12-dimension assessment, inspect our open methodology, and generate diagnostic reports. To access multi-tenant school analytics, board briefings, or SaaS management, click <strong>LOGIN</strong> in the top header.
          </p>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-4xl mx-auto border-2 border-slate-900 bg-white p-8 sm:p-12 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest border border-slate-900">
          <Sparkles className="w-4 h-4 text-[#2563EB]" /> K–12 Educational AI Transformation Framework
        </div>
        <h1 className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none font-sans">
          EVIDENCE-BASED AI READINESS FOR <span className="text-[#2563EB]">MODERN K–12</span> SCHOOLS
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto font-sans font-medium">
          The Zila Tech AI Toolkit establishes a continuous improvement cycle that supports schools from baseline self-assessment through strategic consultancy, professional learning, and measurable institutional progress.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartAssessment}
            className="px-6 py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] cursor-pointer transition-all active:translate-x-[2px] active:translate-y-[2px]"
          >
            Launch Baseline Assessment Demo <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="/api/seo/framework.json"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 border-2 border-slate-900 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all"
          >
            <Code className="w-4 h-4 text-[#2563EB]" /> AI Crawler JSON API <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* What External Users vs Authenticated Users See */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-slate-900 p-6 space-y-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex items-center gap-2 text-[#2563EB] font-black text-sm uppercase font-sans border-b-2 border-slate-900 pb-2">
            <Globe className="w-4 h-4" /> What Unauthenticated / Public Users See
          </div>
          <ul className="space-y-2 text-xs text-slate-700 font-sans font-medium">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Free access to complete the 12-dimension AI diagnostic survey.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Instant individual diagnostic result breakdown & personalized growth actions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Public methodology, JSON API schema, and framework documentation.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900 border-2 border-slate-900 p-6 space-y-3 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase font-sans border-b-2 border-slate-800 pb-2">
            <Lock className="w-4 h-4" /> What Logged-In Users See (Role Scoped)
          </div>
          <ul className="space-y-2 text-xs text-slate-300 font-sans font-medium">
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>SuperAdmin:</strong> Access to all client schools, cross-tenant SaaS metrics, and global database.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>School Admin / Educators:</strong> Strictly scoped access to their assigned school's executive dashboard & strategy briefs.</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Gemini AI Executive Board briefings, policy draft generators, and professional certificates.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 12 Dimensions Cards Grid */}
      <div className="space-y-6">
        <div className="text-left border-b-2 border-slate-900 pb-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB]">
              STRUCTURED METRICS
            </span>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight font-sans">
              The 12 Core K–12 Assessment Dimensions
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-600 font-bold uppercase">
            Measuring structural, pedagogical & cultural maturity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AI_DIMENSIONS.map((dim, idx) => (
            <div key={dim.id} className="p-6 bg-white border-2 border-slate-900 space-y-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] transition-transform">
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2.5">
                <span className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center text-xs font-black font-mono">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#2563EB] bg-slate-100 px-2 py-0.5 border border-slate-300">
                  Dimension
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 uppercase font-sans tracking-tight">{dim.name}</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">{dim.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Philosophy & Journey */}
      <div className="bg-slate-900 border-2 border-slate-900 text-white p-8 sm:p-10 space-y-8 shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#2563EB] uppercase tracking-[0.2em] font-mono">
            ZILA TECH PRODUCT PHILOSOPHY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter leading-none font-sans">
            Assessment is only the beginning. Transformation is the destination.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left pt-2 font-sans">
          <div className="p-5 bg-slate-950 border-2 border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-emerald-400 font-mono uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 border border-emerald-800">01 • Phase 1</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Baseline Assessment</h3>
            <p className="text-xs text-slate-400">Generate public assessment link & gather teacher responses.</p>
          </div>

          <div className="p-5 bg-slate-950 border-2 border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-[#2563EB] font-mono uppercase tracking-widest bg-blue-950/60 px-2 py-0.5 border border-blue-800">02 • Phase 2</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Strategic Consultancy</h3>
            <p className="text-xs text-slate-400">AI-generated executive briefs for school leadership discussions.</p>
          </div>

          <div className="p-5 bg-slate-950 border-2 border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-sky-400 font-mono uppercase tracking-widest bg-sky-950/60 px-2 py-0.5 border border-sky-800">03 • Phase 3</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Activation & Provision</h3>
            <p className="text-xs text-slate-400">Activate workspace and auto-provision participant user accounts.</p>
          </div>

          <div className="p-5 bg-slate-950 border-2 border-slate-800 space-y-2">
            <span className="text-[10px] font-black text-amber-400 font-mono uppercase tracking-widest bg-amber-950/60 px-2 py-0.5 border border-amber-800">04 • Phase 4</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Continuous PD & Badges</h3>
            <p className="text-xs text-slate-400">Follow-up pulse surveys, learning roadmaps, and digital certificates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
