import React, { useState } from 'react';
import { Shield, CheckCircle2, Lock, FileText, AlertCircle } from 'lucide-react';

interface ConsentModalProps {
  schoolName: string;
  onAccept: () => void;
  onCancel: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ schoolName, onAccept, onCancel }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white border-2 border-slate-900 max-w-2xl w-full p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
          <div className="p-2.5 bg-slate-900 text-white border-2 border-slate-900">
            <Shield className="w-6 h-6 text-[#FF6321]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight font-sans">Assessment Consent & Data Protection</h2>
            <p className="text-xs font-mono font-bold text-slate-600">Zila AI Toolkit • {schoolName}</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-800 leading-relaxed max-h-80 overflow-y-auto pr-2 font-sans">
          <p className="font-bold text-slate-900">
            Before proceeding with the K–12 Baseline AI Readiness Evaluation, please review our participant privacy and consent statement:
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-slate-100 p-3.5 border-2 border-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 uppercase font-black tracking-wider block mb-0.5">Purpose of Data Collection</strong>
                This evaluation measures organizational and educator AI readiness across 12 evidence-based K–12 dimensions to inform school strategic planning.
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-100 p-3.5 border-2 border-slate-900">
              <Lock className="w-4 h-4 text-[#FF6321] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 uppercase font-black tracking-wider block mb-0.5">Voluntary Pathways & Confidentiality</strong>
                You may submit responses anonymously or personalized. Anonymous submissions contribute strictly to aggregated department and school averages. Personalized responses generate individualized reports delivered to your official email.
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-100 p-3.5 border-2 border-slate-900">
              <FileText className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 uppercase font-black tracking-wider block mb-0.5">Data Protection Compliance</strong>
                All data is encrypted in transit and at rest in accordance with applicable Data Protection Laws. Individual responses are never publicly disclosed or sold.
              </div>
            </li>
          </ul>

          <div className="p-3 bg-amber-50 border-2 border-slate-900 text-xs font-bold text-amber-950 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              If your school later activates full platform access, personalized submissions will automatically qualify for seamless account onboarding and badging.
            </span>
          </div>
        </div>

        {/* Checkbox */}
        <div className="pt-3 border-t-2 border-slate-900 flex items-center gap-3">
          <input
            type="checkbox"
            id="consent-check"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5 border-2 border-slate-900 text-[#FF6321] focus:ring-0 cursor-pointer"
          />
          <label htmlFor="consent-check" className="text-xs font-extrabold text-slate-900 uppercase tracking-tight cursor-pointer">
            I confirm that I have read and agree to the Consent & Data Protection Statement.
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t-2 border-slate-900">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 border-2 border-slate-900 text-slate-900 hover:bg-slate-100 text-xs font-black uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={!agreed}
            onClick={onAccept}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-2 border-slate-900 transition-all ${
              agreed
                ? 'bg-[#FF6321] hover:bg-[#e05217] text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Proceed to Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
