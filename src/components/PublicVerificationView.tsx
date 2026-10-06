import React from 'react';
import { HealthCertificate } from '../types';
import { CertificateCard } from './CertificateCard';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface PublicVerificationViewProps {
  certificate: HealthCertificate | null;
  onBackToAdmin?: () => void;
}

export const PublicVerificationView: React.FC<PublicVerificationViewProps> = ({
  certificate,
  onBackToAdmin,
}) => {
  if (!certificate) {
    return (
      <div className="min-h-screen bg-[#dce1e6] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
          <div className="text-emerald-700 font-bold text-lg mb-2">أمانة منطقة الرياض</div>
          <div className="text-gray-700 text-sm mb-4">Certificate Not Found or Invalid Verification Key</div>
          {onBackToAdmin && (
            <button
              onClick={onBackToAdmin}
              className="px-4 py-2 bg-[#006837] text-white text-xs font-semibold rounded hover:bg-[#005a32]"
            >
              Return to Admin
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="public-verify-container min-h-screen bg-[#dce1e6] py-8 px-2 sm:px-4 flex flex-col items-center justify-start select-none relative">
      {/* 
        STRICT ZERO-UI RULE:
        No website header, footer, menu, banners, or status badges.
        Only the invisible helper in the very top-left for admin testing convenience.
      */}
      {onBackToAdmin && (
        <button
          onClick={onBackToAdmin}
          className="no-print fixed top-2 left-2 z-50 opacity-0 hover:opacity-90 transition-opacity bg-neutral-900/90 text-white px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-sm cursor-pointer"
          title="Back to Admin Panel"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Admin</span>
        </button>
      )}

      {/* Render Certificate Page 1 & Page 2 strictly as per dimensions */}
      <div className="w-full flex justify-center py-2">
        <CertificateCard
          certificate={certificate}
          showPage2={true}
          scale={1}
        />
      </div>
    </div>
  );
};
