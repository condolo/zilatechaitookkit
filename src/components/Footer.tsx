import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { ZilaTechLogo } from './ZilaTechLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t-2 border-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 mt-16 print:hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-3 md:col-span-2">
          <ZilaTechLogo variant="dark" size="md" showTagline={true} />
          <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans mt-2">
            A comprehensive AI Readiness and Transformation platform designed specifically for K–12 schools. Providing evidence-based assessment, strategic guidance, and measurable transformation.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold uppercase tracking-wider pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> High-Level Data Protection & Privacy Compliant
          </div>
        </div>

        {/* Col 2: SEO & Crawlers */}
        <div className="space-y-2 text-xs font-mono">
          <h4 className="font-extrabold text-white uppercase tracking-widest text-[10px]">AI & Search Resources</h4>
          <ul className="space-y-2 text-slate-300">
            <li>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] flex items-center gap-1">
                XML Sitemap <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] flex items-center gap-1">
                Robots Directives <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="/api/seo/framework.json" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] flex items-center gap-1">
                Open JSON Schema <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Zila Tech */}
        <div className="space-y-2 text-xs">
          <h4 className="font-extrabold text-white uppercase tracking-widest text-[10px] font-mono">Zila Tech</h4>
          <p className="text-slate-300">K–12 AI Transformation & Strategic EdTech Consultancy</p>
          <p className="text-[11px] text-slate-500 mt-2">© 2026 Zila Tech — Your Tech Ally. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
