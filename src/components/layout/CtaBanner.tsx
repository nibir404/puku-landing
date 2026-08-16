import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  titlePrefix?: string;
  titleHighlight?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  enterpriseTitle?: string;
  enterpriseDesc?: string;
  enterpriseHref?: string;
}

export const CtaBanner = ({
  titlePrefix = 'Build more with',
  titleHighlight = 'Puku',
  primaryCtaText = 'Try Puku',
  secondaryCtaText = 'Contact sales',
  primaryCtaHref = '/signup',
  secondaryCtaHref = '/contact',
  enterpriseTitle = 'Custom Enterprise Deployment',
  enterpriseDesc = 'Dedicated VPC hosting, custom SLA, and priority support.',
  enterpriseHref = '/contact',
}: CtaBannerProps) => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" aria-labelledby="cta-heading">
      <div className="p-8 sm:p-12 bg-white border border-[#E5E5E8] rounded-[2px] shadow-none grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
        
        {/* Left Headline & Action Buttons with Generous Gap (gap-6) */}
        <div className="md:col-span-7">
          <h2 id="cta-heading" className="text-[32px] sm:text-[44px] font-semibold text-[#0F0F11] font-display tracking-tight leading-tight">
            {titlePrefix}
            <br />
            <span className="text-purple-highlight">{titleHighlight}</span>
          </h2>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-6 w-full max-w-md">
            <Link
              to={primaryCtaHref}
              className="w-full sm:w-[180px] min-h-[44px] px-6 py-2.5 bg-[#0F0F11] text-white font-semibold text-[15px] rounded-[2px] hover:bg-[#6E56CF] transition-colors shadow-none flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
            >
              {primaryCtaText}
            </Link>
            <Link
              to={secondaryCtaHref}
              className="w-full sm:w-[180px] min-h-[44px] px-6 py-2.5 bg-white border border-[#E5E5E8] text-[#0F0F11] font-semibold text-[15px] rounded-[2px] hover:bg-[#F3F3F5] transition-colors shadow-none flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
            >
              {secondaryCtaText}
            </Link>
          </div>
        </div>

        {/* Right Enterprise Info Box */}
        <div className="md:col-span-5 p-5 bg-[#FAFAFC] rounded-[2px] border border-[#E5E5E8]">
          <h3 className="text-[16px] font-semibold text-[#0F0F11] font-display mb-1">{enterpriseTitle}</h3>
          <p className="text-[16px] font-normal text-[#4A4A52] leading-relaxed mb-3.5">{enterpriseDesc}</p>
          
          <Link to={enterpriseHref} className="text-[15px] font-semibold text-[#6E56CF] hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]">
            <span>Contact sales for enterprise</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
};
