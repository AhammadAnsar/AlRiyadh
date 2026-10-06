import React, { useState, useRef } from 'react';
import { HealthCertificate } from '../types';
import {
  GENDER_PRESETS,
  NATIONALITY_PRESETS,
  PROFESSION_PRESETS,
  PLACE_OF_ISSUE_PRESETS,
  SAMPLE_PHOTOS,
} from '../constants/presets';
import { CertificateCard } from './CertificateCard';
import {
  Upload,
  RefreshCw,
  Printer,
  Save,
  ArrowLeft,
  Eye,
  Check,
  FileCheck,
  Sparkles,
  Image as ImageIcon,
  HelpCircle,
} from 'lucide-react';

interface CertificateFormProps {
  initialCertificate?: HealthCertificate;
  onSave: (cert: HealthCertificate) => void;
  onCancel: () => void;
  onPrintDirect: (cert: HealthCertificate) => void;
  onPreviewPublic: (cert: HealthCertificate) => void;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({
  initialCertificate,
  onSave,
  onCancel,
  onPrintDirect,
  onPreviewPublic,
}) => {
  const [formData, setFormData] = useState<HealthCertificate>(
    initialCertificate || {
      id: `${Math.floor(100000 + Math.random() * 900000)}-1448`,
      certificateNumber: `${Math.floor(100000 + Math.random() * 900000)}/1448`,
      placeOfIssue: 'أمانة منطقة الرياض',
      expiryDate: '22/04/1449',
      fullName: 'ABDULMOTALEBBNUR UZZAMAN MIAH',
      nationalId: '2085415798',
      gender: 'ذكر',
      nationality: 'بنجلاديش',
      profession: 'مندوب مبيعات',
      photoUrl: SAMPLE_PHOTOS[0].url,
      status: 'Published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Field change handlers
  const handleChange = (field: keyof HealthCertificate, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Auto-uppercase full name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      fullName: e.target.value.toUpperCase(),
    }));
  };

  // Photo file upload (converts to Base64)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom Logo upload (converts to Base64)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          customLogoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setFormData((prev) => ({
      ...prev,
      customLogoUrl: undefined,
    }));
  };

  // Quick generators
  const generateRandomCertNumber = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newCertNum = `${randomNum}/1448`;
    setFormData((prev) => ({
      ...prev,
      id: `${randomNum}-1448`,
      certificateNumber: newCertNum,
    }));
  };

  const generateRandomNationalId = () => {
    const prefix = Math.random() > 0.5 ? '2' : '1'; // 2 for Iqama, 1 for Citizen
    const random9 = Math.floor(100000000 + Math.random() * 900000000);
    setFormData((prev) => ({
      ...prev,
      nationalId: `${prefix}${random9}`,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCert: HealthCertificate = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    onSave(updatedCert);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            title="Back to List"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              {initialCertificate ? 'Edit Health Certificate' : 'Create New Health Certificate'}
            </h2>
            <p className="text-xs text-neutral-500">
              Official Riyadh Region Municipality specifications with live RTL preview
            </p>
          </div>
        </div>

        {/* View mode toggle for mobile/tablet */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden flex bg-neutral-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'editor'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Form
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Live Preview
            </button>
          </div>

          <button
            type="button"
            onClick={() => onPreviewPublic(formData)}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Open in Public QR Verification View (Zero UI)"
          >
            <Eye className="w-4 h-4 text-neutral-600" />
            <span className="hidden sm:inline">Preview Public QR View</span>
          </button>

          <button
            type="button"
            onClick={() => onPrintDirect(formData)}
            className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#006837] hover:bg-[#005a32] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
          >
            {saveSuccessMsg ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Certificate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Layout: Form on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor */}
        <div
          className={`lg:col-span-6 space-y-6 ${
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card 1: Official Header & Certificate Numbers */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-800">
                  <FileCheck className="w-4 h-4 text-[#006837]" />
                  <span>Certificate Registry Details</span>
                </div>
                <button
                  type="button"
                  onClick={generateRandomCertNumber}
                  className="text-xs text-[#006837] hover:text-[#005a32] flex items-center gap-1 font-medium cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Generate New No</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Certificate Number (رقم الشهادة) */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Certificate Number <span className="text-[#005a32] font-arabic">(رقم الشهادة)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.certificateNumber}
                    onChange={(e) => handleChange('certificateNumber', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-english-doc font-bold focus:ring-1 focus:ring-[#006837] focus:border-[#006837]"
                    placeholder="239572/1448"
                  />
                  <span className="text-[11px] text-neutral-400 mt-0.5 block">Format: Number/HijriYear</span>
                </div>

                {/* Expiry Date (نهاية الصلاحية) */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Expiry Date (Hijri) <span className="text-[#005a32] font-arabic">(نهاية الصلاحية)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange('expiryDate', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-english-doc font-bold focus:ring-1 focus:ring-[#006837] focus:border-[#006837]"
                    placeholder="22/04/1449"
                  />
                  <div className="flex gap-1.5 mt-1">
                    {['22/04/1449', '15/06/1449', '01/01/1450'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleChange('expiryDate', preset)}
                        className="text-[10px] bg-neutral-100 hover:bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Place of Issue (مكان الإصدار) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Place of Issue <span className="text-[#005a32] font-arabic">(مكان الإصدار)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={
                      PLACE_OF_ISSUE_PRESETS.find((p) => p.arValue === formData.placeOfIssue)?.arValue || 'custom'
                    }
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        handleChange('placeOfIssue', e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-neutral-50 text-neutral-800 focus:ring-1 focus:ring-[#006837]"
                  >
                    {PLACE_OF_ISSUE_PRESETS.map((p) => (
                      <option key={p.enLabel} value={p.arValue}>
                        {p.enLabel}
                      </option>
                    ))}
                    <option value="custom">Custom Value...</option>
                  </select>

                  <input
                    type="text"
                    dir="rtl"
                    value={formData.placeOfIssue}
                    onChange={(e) => handleChange('placeOfIssue', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-arabic font-bold focus:ring-1 focus:ring-[#006837]"
                    placeholder="أمانة منطقة الرياض"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Personal & Identity Information */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="text-sm font-bold text-neutral-800">Personal & Identity Information</div>
                <button
                  type="button"
                  onClick={generateRandomNationalId}
                  className="text-xs text-[#006837] hover:text-[#005a32] flex items-center gap-1 font-medium cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Random ID</span>
                </button>
              </div>

              {/* Full Name in English */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name (English Uppercase) <span className="text-[#005a32] font-arabic">(الاسم)</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={handleNameChange}
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-english-doc font-bold tracking-wide uppercase focus:ring-1 focus:ring-[#006837]"
                  placeholder="ABDULMOTALEBBNUR UZZAMAN MIAH"
                />
                <span className="text-[11px] text-neutral-400 mt-0.5 block">
                  Displayed on certificate in bold uppercase font
                </span>
              </div>

              {/* National ID / Iqama (رقم الهوية) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  National ID / Iqama Number <span className="text-[#005a32] font-arabic">(رقم الهوية)</span>
                </label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => handleChange('nationalId', e.target.value)}
                  required
                  maxLength={10}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-english-doc font-bold tracking-wider focus:ring-1 focus:ring-[#006837]"
                  placeholder="2085415798"
                />
                <span className="text-[11px] text-neutral-400 mt-0.5 block">
                  10-digit Saudi National ID or Resident Iqama number
                </span>
              </div>

              {/* Gender (الجنس) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Gender <span className="text-[#005a32] font-arabic">(الجنس)</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {GENDER_PRESETS.map((p) => (
                    <button
                      key={p.enLabel}
                      type="button"
                      onClick={() => handleChange('gender', p.arValue)}
                      className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        formData.gender === p.arValue
                          ? 'border-[#006837] bg-emerald-50 text-[#006837] ring-1 ring-[#006837]'
                          : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      <span>{p.enLabel}</span>
                      <span className="font-arabic font-bold text-sm" dir="rtl">{p.arValue}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nationality (الجنسية) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Nationality <span className="text-[#005a32] font-arabic">(الجنسية)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={
                      NATIONALITY_PRESETS.find((p) => p.arValue === formData.nationality)?.arValue || 'custom'
                    }
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        handleChange('nationality', e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-neutral-50 text-neutral-800 focus:ring-1 focus:ring-[#006837]"
                  >
                    {NATIONALITY_PRESETS.map((p) => (
                      <option key={p.enLabel} value={p.arValue}>
                        {p.enLabel} ({p.arValue})
                      </option>
                    ))}
                    <option value="custom">Custom Nationality...</option>
                  </select>

                  <input
                    type="text"
                    dir="rtl"
                    value={formData.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-arabic font-bold focus:ring-1 focus:ring-[#006837]"
                    placeholder="بنجلاديش"
                  />
                </div>
              </div>

              {/* Profession (المهنة) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Profession <span className="text-[#005a32] font-arabic">(المهنة)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={
                      PROFESSION_PRESETS.find((p) => p.arValue === formData.profession)?.arValue || 'custom'
                    }
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        handleChange('profession', e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-neutral-50 text-neutral-800 focus:ring-1 focus:ring-[#006837]"
                  >
                    {PROFESSION_PRESETS.map((p) => (
                      <option key={p.enLabel} value={p.arValue}>
                        {p.enLabel} ({p.arValue})
                      </option>
                    ))}
                    <option value="custom">Custom Profession...</option>
                  </select>

                  <input
                    type="text"
                    dir="rtl"
                    value={formData.profession}
                    onChange={(e) => handleChange('profession', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm font-arabic font-bold focus:ring-1 focus:ring-[#006837]"
                    placeholder="مندوب مبيعات"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Photo & Emblem Customization */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm space-y-4">
              <div className="text-sm font-bold text-neutral-800 border-b border-neutral-100 pb-3">
                Photo & Emblem Settings
              </div>

              {/* Photo Upload (Base64) - Fits 138px x 158px */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Certificate Photo (Fits 138px x 158px Box)
                </label>
                <div className="flex items-start gap-4">
                  {/* Photo Preview Thumbnail */}
                  <div className="w-[80px] h-[92px] rounded border border-neutral-300 bg-neutral-100 overflow-hidden shrink-0 shadow-inner">
                    {formData.photoUrl ? (
                      <img
                        src={formData.photoUrl}
                        alt="Candidate"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-medium text-neutral-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Computer</span>
                    </button>
                    <p className="text-[11px] text-neutral-500">
                      Supports JPG, PNG, WEBP. Automatically adjusted to 138px × 158px portrait ratio.
                    </p>

                    {/* Quick Sample Presets */}
                    <div className="pt-1">
                      <span className="text-[10px] text-neutral-400 block mb-1">Sample Portrait Presets:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {SAMPLE_PHOTOS.map((sample, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleChange('photoUrl', sample.url)}
                            className="text-[10px] bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded text-neutral-600 border border-neutral-200 cursor-pointer"
                          >
                            Sample #{idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Emblem Logo (Optional) */}
              <div className="pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-neutral-700">
                    Municipality Emblem (Default: Official Riyadh Vector Emblem)
                  </label>
                  {formData.customLogoUrl && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="text-[11px] text-red-600 hover:underline cursor-pointer"
                    >
                      Reset to Default Emblem
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg text-xs font-medium text-neutral-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom Logo</span>
                  </button>
                  <span className="text-[11px] text-neutral-400">
                    {formData.customLogoUrl ? 'Custom logo applied' : 'Using authentic Riyadh vector logo'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Save Button */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#006837] hover:bg-[#005a32] text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Certificate</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Side-by-Side Preview */}
        <div
          className={`lg:col-span-6 sticky top-6 ${
            activeTab === 'editor' ? 'hidden lg:block' : 'block'
          }`}
        >
          <div className="bg-neutral-800 rounded-2xl p-5 border border-neutral-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-white border-b border-neutral-700 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold">Pixel-Perfect Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-neutral-700 text-neutral-300 px-2 py-0.5 rounded font-mono">
                  420px × 595px
                </span>
                <button
                  type="button"
                  onClick={() => onPrintDirect(formData)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-neutral-400">
              Certificate replicates the exact Riyadh Region Municipality Health Certificate PDF specifications.
            </div>

            {/* Certificate Display Area */}
            <div className="overflow-auto max-h-[calc(100vh-220px)] p-4 bg-neutral-900 rounded-xl flex justify-center border border-neutral-700/60">
              <CertificateCard
                certificate={formData}
                showPage2={true}
                scale={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
