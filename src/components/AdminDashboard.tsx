import React, { useState } from 'react';
import { HealthCertificate } from '../types';
import { RiyadhEmblem } from './RiyadhEmblem';
import {
  Plus,
  Search,
  Printer,
  Edit3,
  Trash2,
  Copy,
  Eye,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  FileText,
  User,
  Calendar,
  Building,
} from 'lucide-react';

interface AdminDashboardProps {
  certificates: HealthCertificate[];
  onCreateNew: () => void;
  onEdit: (cert: HealthCertificate) => void;
  onDelete: (id: string) => void;
  onDuplicate: (cert: HealthCertificate) => void;
  onPrint: (cert: HealthCertificate) => void;
  onPreviewPublic: (cert: HealthCertificate) => void;
  onResetDefault: () => void;
  onImportCertificates: (certs: HealthCertificate[]) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  certificates,
  onCreateNew,
  onEdit,
  onDelete,
  onDuplicate,
  onPrint,
  onPreviewPublic,
  onResetDefault,
  onImportCertificates,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNationality, setFilterNationality] = useState('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered certificates
  const filteredCertificates = certificates.filter((cert) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      cert.fullName.toLowerCase().includes(q) ||
      cert.certificateNumber.toLowerCase().includes(q) ||
      cert.nationalId.includes(q) ||
      cert.profession.toLowerCase().includes(q) ||
      cert.nationality.toLowerCase().includes(q);

    const matchesNat =
      filterNationality === 'ALL' || cert.nationality.includes(filterNationality);

    return matchesSearch && matchesNat;
  });

  const handleCopyLink = (cert: HealthCertificate) => {
    const cleanCertId = cert.id || cert.certificateNumber.replace('/', '-');
    const url = `${window.location.origin}${window.location.pathname}?verify=${encodeURIComponent(cleanCertId)}`;
    navigator.clipboard.writeText(url);
    setCopiedId(cert.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(certificates, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `riyadh_health_certificates_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            onImportCertificates(parsed);
          }
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-[#005a32] via-[#006837] to-[#0b7e46] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-1 bg-white/10 rounded-full backdrop-blur-sm">
              <RiyadhEmblem size={68} />
            </div>
            <div>
              <div className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                Kingdom of Saudi Arabia
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                Riyadh Health Certificate Management
              </h1>
              <p className="text-xs text-emerald-100/90 mt-1 font-arabic" dir="rtl">
                أمانة منطقة الرياض - الإدارة العامة لصحة البيئة
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onCreateNew}
              className="px-4 py-2.5 bg-white hover:bg-neutral-100 text-[#006837] text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create New Certificate</span>
            </button>

            <button
              onClick={onResetDefault}
              className="px-3 py-2.5 bg-black/20 hover:bg-black/30 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset with default demo certificate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-2.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-[11px] text-emerald-200">Total Registered</div>
            <div className="text-2xl font-black">{certificates.length}</div>
          </div>
          <div>
            <div className="text-[11px] text-emerald-200">Active / Valid</div>
            <div className="text-2xl font-black">{certificates.filter(c => c.status === 'Published').length}</div>
          </div>
          <div>
            <div className="text-[11px] text-emerald-200">Municipality</div>
            <div className="text-sm font-bold font-arabic" dir="rtl">أمانة الرياض</div>
          </div>
          <div>
            <div className="text-[11px] text-emerald-200">QR Protocol</div>
            <div className="text-xs font-bold flex items-center gap-1 text-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Live Zero-UI Mode</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, cert no, ID..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#006837] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <label className="text-xs text-neutral-500 hidden sm:inline">Filter:</label>
          <select
            value={filterNationality}
            onChange={(e) => setFilterNationality(e.target.value)}
            className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-700 focus:outline-none focus:border-[#006837]"
          >
            <option value="ALL">All Nationalities</option>
            <option value="بنجلاديش">Bangladesh (بنجلاديش)</option>
            <option value="الهند">India (الهند)</option>
            <option value="باكستان">Pakistan (باكستان)</option>
            <option value="مصر">Egypt (مصر)</option>
            <option value="الفلبين">Philippines (الفلبين)</option>
          </select>

          <button
            onClick={handleExportData}
            className="px-2.5 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            title="Export JSON Data"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export</span>
          </button>

          <label className="px-2.5 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Import</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Certificates Grid / Cards */}
      {filteredCertificates.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-800">No Certificates Found</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            No health certificates match your search query. Try clearing your filters or create a new certificate.
          </p>
          <button
            onClick={onCreateNew}
            className="mt-4 px-4 py-2 bg-[#006837] hover:bg-[#005a32] text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Create New Certificate
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-4 bg-gradient-to-r from-emerald-950/80 to-emerald-900/90 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-white/20 text-white px-2 py-0.5 rounded font-bold">
                    CERT #{cert.certificateNumber}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-200 font-arabic" dir="rtl">
                  {cert.placeOfIssue}
                </div>
              </div>

              {/* Card Content with Photo */}
              <div className="p-4 flex gap-4 items-start">
                {/* Photo preview */}
                <div className="w-20 h-24 rounded border border-neutral-200 bg-neutral-100 overflow-hidden shrink-0 shadow-inner">
                  <img
                    src={cert.photoUrl}
                    alt={cert.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=480&q=80';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-xs font-bold text-neutral-900 truncate font-english-doc">
                    {cert.fullName}
                  </div>
                  <div className="text-xs text-neutral-600 flex items-center gap-1.5 font-arabic" dir="rtl">
                    <span className="font-bold text-[#006837]">المهنة:</span>
                    <span className="font-bold text-neutral-800">{cert.profession}</span>
                  </div>
                  <div className="text-xs text-neutral-600 flex items-center gap-1.5 font-arabic" dir="rtl">
                    <span className="font-bold text-[#006837]">الجنسية:</span>
                    <span className="font-bold text-neutral-800">{cert.nationality}</span>
                  </div>
                  <div className="text-xs text-neutral-500 font-mono">
                    ID: <span className="font-bold text-neutral-700">{cert.nationalId}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Expiry: <span className="font-semibold text-emerald-700">{cert.expiryDate}</span>
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  {/* Public QR View Preview */}
                  <button
                    onClick={() => onPreviewPublic(cert)}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-md transition-colors cursor-pointer"
                    title="Preview Public QR Verification View (Zero UI)"
                  >
                    <Eye className="w-4 h-4 text-emerald-700" />
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={() => handleCopyLink(cert)}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-md transition-colors cursor-pointer"
                    title="Copy Public Verification Link"
                  >
                    {copiedId === cert.id ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ExternalLink className="w-4 h-4 text-neutral-600" />
                    )}
                  </button>

                  {/* Direct Print */}
                  <button
                    onClick={() => onPrint(cert)}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-md transition-colors cursor-pointer"
                    title="Print Certificate (PDF Ready)"
                  >
                    <Printer className="w-4 h-4 text-neutral-700" />
                  </button>

                  {/* Duplicate */}
                  <button
                    onClick={() => onDuplicate(cert)}
                    className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-md transition-colors cursor-pointer"
                    title="Duplicate Certificate"
                  >
                    <Copy className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEdit(cert)}
                    className="px-3 py-1.5 bg-[#006837] hover:bg-[#005a32] text-white text-xs font-semibold rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  {certificates.length > 1 && (
                    <button
                      onClick={() => onDelete(cert.id)}
                      className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      title="Delete Certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
