import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { HealthCertificate } from '../types';
import { INSTRUCTION_POINTS } from '../constants/presets';
import { RiyadhEmblem } from './RiyadhEmblem';

interface CertificateCardProps {
  certificate: HealthCertificate;
  showPage2?: boolean;
  scale?: number; // For responsive preview scaling
  className?: string;
  verificationBaseUrl?: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  showPage2 = true,
  scale = 1,
  className = '',
  verificationBaseUrl,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Determine verification link for the QR Code
  const getVerificationUrl = () => {
    if (typeof window === 'undefined') return '';
    const base = verificationBaseUrl || window.location.origin + window.location.pathname;
    const cleanCertId = certificate.id || certificate.certificateNumber.replace('/', '-');
    return `${base}?verify=${encodeURIComponent(cleanCertId)}`;
  };

  useEffect(() => {
    const url = getVerificationUrl();
    QRCode.toDataURL(url, {
      width: 252, // 2x crisp resolution for 126px box
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((dataUri) => {
        setQrDataUrl(dataUri);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
  }, [certificate.id, certificate.certificateNumber, verificationBaseUrl]);

  return (
    <div
      className={`flex flex-col items-center gap-8 ${className}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center',
      }}
    >
      {/* ============================================================ */}
      {/* PAGE 1: Main Health Certificate                              */}
      {/* Exact Width: 420px, Height: 595px, bg: #eef0f2, border: 6px #fff */}
      {/* ============================================================ */}
      <div
        id="certificate-page-1"
        className="cert-card-container print-page-break relative overflow-hidden select-none"
        style={{
          width: '420px',
          height: '595px',
          backgroundColor: '#eef0f2',
          border: '6px solid #ffffff',
          boxSizing: 'border-box',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Top Dark Green Header (Height: 76px, bg: #006837) */}
        <div
          className="relative w-full overflow-visible"
          style={{
            height: '76px',
            backgroundColor: '#006837',
          }}
        >
          {/* Overlapping Emblem Logo: left: 38px, top: 6px, size: 82px x 82px */}
          <div
            className="absolute z-20"
            style={{
              left: '38px',
              top: '6px',
              width: '82px',
              height: '82px',
            }}
          >
            <RiyadhEmblem
              size={82}
              customLogoUrl={certificate.customLogoUrl}
            />
          </div>

          {/* Right-aligned Municipality Typography */}
          <div
            className="h-full flex flex-col justify-center items-end"
            style={{
              paddingRight: '16px',
              textAlign: 'right',
            }}
          >
            {/* Arabic: أمانة منطقة الرياض (font-size: 20px, bold, white) */}
            <div
              dir="rtl"
              className="font-arabic leading-tight text-white font-extrabold"
              style={{
                fontSize: '20px',
                letterSpacing: '-0.2px',
              }}
            >
              أمانة منطقة الرياض
            </div>

            {/* English: RIYADH REGION MUNICIPALITY (font-size: 10.5px, bold, letter-spacing: 0.5px) */}
            <div
              className="font-english-doc text-white font-bold uppercase mt-[3px]"
              style={{
                fontSize: '10.5px',
                letterSpacing: '0.5px',
              }}
            >
              RIYADH REGION MUNICIPALITY
            </div>
          </div>
        </div>

        {/* Sub-Header Bar (Height: 36px, bg: #7c9d71, top 2px white border) */}
        <div
          className="w-full flex items-center justify-center relative z-10"
          style={{
            height: '36px',
            backgroundColor: '#7c9d71',
            borderTop: '2px solid #ffffff',
            boxSizing: 'border-box',
          }}
        >
          {/* White bold Arabic: شهادة صحية (font-size: 21px, font-weight: 700) */}
          <div
            dir="rtl"
            className="font-arabic text-white font-bold text-center leading-none"
            style={{
              fontSize: '21px',
              fontWeight: 700,
            }}
          >
            شهادة صحية
          </div>
        </div>

        {/* Body Layout: 2 Columns, Padding: 18px 14px */}
        <div
          className="w-full flex justify-between"
          style={{
            padding: '18px 14px',
            boxSizing: 'border-box',
          }}
        >
          {/* Left Column: QR Code & Photo (Width: 138px) */}
          <div
            className="flex flex-col items-center"
            style={{
              width: '138px',
            }}
          >
            {/* Dynamic QR Code: White box 138px x 138px, padding: 6px */}
            <div
              className="flex items-center justify-center"
              style={{
                width: '138px',
                height: '138px',
                padding: '6px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
              }}
            >
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Verification QR Code"
                  className="w-full h-full object-contain block"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-[10px] text-gray-400">
                  QR Code
                </div>
              )}
            </div>

            {/* Exactly 10px below: Photo Box 138px x 158px */}
            <div
              style={{
                marginTop: '10px',
                width: '138px',
                height: '158px',
                backgroundColor: '#e2e6ea',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              {certificate.photoUrl ? (
                <img
                  src={certificate.photoUrl}
                  alt={certificate.fullName}
                  className="w-full h-full block"
                  style={{
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    // Fallback to neutral avatar silhouette if URL fails
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=480&q=80';
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500 text-xs">
                  Photo
                </div>
              )}
            </div>
          </div>

          {/* Right Column: RTL Data Grid, Width: 242px */}
          <div
            dir="rtl"
            style={{
              width: '242px',
            }}
          >
            {/* 3-Column Grid: [Arabic Label: 92px] [Colon: 12px] [Value: 1fr] */}
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: '92px 12px 1fr',
                rowGap: '12px',
              }}
            >
              {/* Row 1: Certificate Number (رقم الشهادة) */}
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                رقم الشهادة
              </div>
              <div
                className="text-center font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                :
              </div>
              <div
                dir="ltr"
                className="font-english-doc text-right font-bold"
                style={{ color: '#1a1a1a', fontSize: '13.5px' }}
              >
                {certificate.certificateNumber}
              </div>

              {/* Row 2: Place of Issue (مكان الإصدار) */}
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                مكان الإصدار
              </div>
              <div
                className="text-center font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                :
              </div>
              <div
                className="font-arabic text-right font-bold leading-tight"
                style={{ color: '#1a1a1a', fontSize: '13.5px' }}
              >
                {certificate.placeOfIssue}
              </div>

              {/* Row 3: Expiry Date (نهاية الصلاحية) */}
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                نهاية الصلاحية
              </div>
              <div
                className="text-center font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                :
              </div>
              <div
                dir="ltr"
                className="font-english-doc text-right font-bold"
                style={{ color: '#1a1a1a', fontSize: '13.5px' }}
              >
                {certificate.expiryDate}
              </div>

              {/* Row 4: Name (الاسم) - English Bold Uppercase */}
              <div
                className="font-arabic text-right font-bold self-start pt-[1px]"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                الاسم
              </div>
              <div
                className="text-center font-bold self-start pt-[1px]"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                :
              </div>
              <div
                dir="ltr"
                className="font-english-doc text-right font-bold uppercase leading-tight"
                style={{
                  color: '#1a1a1a',
                  fontSize: '12.5px',
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {certificate.fullName}
              </div>

              {/* Row 5: National ID / Iqama (رقم الهوية) */}
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                رقم الهوية
              </div>
              <div
                className="text-center font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                :
              </div>
              <div
                dir="ltr"
                className="font-english-doc text-right font-bold tracking-[0.2px]"
                style={{ color: '#1a1a1a', fontSize: '13.5px' }}
              >
                {certificate.nationalId}
              </div>

              {/* Row 6: Gender (الجنس) */}
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                الجنس
              </div>
              <div
                className="text-center font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                :
              </div>
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#1a1a1a', fontSize: '13.5px' }}
              >
                {certificate.gender}
              </div>

              {/* Row 7: Nationality (الجنسية) */}
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                الجنسية
              </div>
              <div
                className="text-center font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                :
              </div>
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#1a1a1a', fontSize: '13.5px' }}
              >
                {certificate.nationality}
              </div>

              {/* Row 8: Profession (المهنة) */}
              <div
                className="font-arabic text-right font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                المهنة
              </div>
              <div
                className="text-center font-bold"
                style={{ color: '#005a32', fontSize: '13.5px' }}
              >
                :
              </div>
              <div
                className="font-arabic text-right font-bold leading-tight"
                style={{ color: '#1a1a1a', fontSize: '13.5px' }}
              >
                {certificate.profession}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PAGE 2: Instructions Page                                    */}
      {/* Exact Width: 420px, Height: 595px, bg: #eef0f2, border: 6px #fff */}
      {/* ============================================================ */}
      {showPage2 && (
        <div
          id="certificate-page-2"
          className="cert-card-container relative overflow-hidden select-none"
          dir="rtl"
          style={{
            width: '420px',
            height: '595px',
            backgroundColor: '#eef0f2',
            border: '6px solid #ffffff',
            boxSizing: 'border-box',
            padding: '36px 26px',
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div
            className="font-arabic flex flex-col justify-start h-full"
            style={{
              color: '#006837',
              fontSize: '16.5px',
              fontWeight: 700,
              lineHeight: 1.65,
              gap: '20px',
            }}
          >
            {INSTRUCTION_POINTS.map((point, index) => (
              <div
                key={index}
                className="text-right text-justify"
                style={{
                  wordBreak: 'break-word',
                }}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
