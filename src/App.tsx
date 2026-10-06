import React, { useState, useEffect } from 'react';
import { HealthCertificate } from './types';
import { DEFAULT_CERTIFICATE } from './constants/presets';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { CertificateForm } from './components/CertificateForm';
import { PublicVerificationView } from './components/PublicVerificationView';
import { CertificateCard } from './components/CertificateCard';

const STORAGE_KEY = 'riyadh_health_certificates_v1';
const AUTH_KEY = 'riyadh_health_admin_auth';

export default function App() {
  // 1. Initial State from localStorage
  const [certificates, setCertificates] = useState<HealthCertificate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved certificates:', e);
    }
    // Default fallback: preloaded official dummy certificate
    return [DEFAULT_CERTIFICATE];
  });

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Navigation / Views: 'dashboard' | 'create' | 'edit' | 'public_verify'
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'edit' | 'public_verify'>('dashboard');
  const [editingCert, setEditingCert] = useState<HealthCertificate | null>(null);
  const [activeVerifyCert, setActiveVerifyCert] = useState<HealthCertificate | null>(null);
  const [printCert, setPrintCert] = useState<HealthCertificate>(DEFAULT_CERTIFICATE);

  // Sync certificates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));
    } catch (e) {
      console.error('Failed to store certificates:', e);
    }
  }, [certificates]);

  // Check URL query parameters on load for ?verify=...
  useEffect(() => {
    const handleUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const verifyParam = urlParams.get('verify');

      if (verifyParam) {
        // Find matching certificate by id or certificateNumber
        const decodedParam = decodeURIComponent(verifyParam);
        const matched =
          certificates.find(
            (c) =>
              c.id === decodedParam ||
              c.certificateNumber.replace('/', '-') === decodedParam ||
              c.certificateNumber === decodedParam
          ) || certificates[0]; // fallback to primary certificate if not found

        setActiveVerifyCert(matched);
        setCurrentView('public_verify');
      }
    };

    handleUrlParams();
    window.addEventListener('popstate', handleUrlParams);
    return () => window.removeEventListener('popstate', handleUrlParams);
  }, [certificates]);

  // Login handler
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_KEY, 'true');
    setCurrentView('dashboard');
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };

  // Save / Update certificate
  const handleSaveCertificate = (savedCert: HealthCertificate) => {
    setCertificates((prev) => {
      const index = prev.findIndex((c) => c.id === savedCert.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = savedCert;
        return updated;
      } else {
        return [savedCert, ...prev];
      }
    });
    setEditingCert(savedCert);
  };

  // Delete certificate
  const handleDeleteCertificate = (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      setCertificates((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Duplicate certificate
  const handleDuplicateCertificate = (cert: HealthCertificate) => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const duplicated: HealthCertificate = {
      ...cert,
      id: `${randomNum}-1448`,
      certificateNumber: `${randomNum}/1448`,
      fullName: `${cert.fullName} (COPY)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCertificates((prev) => [duplicated, ...prev]);
  };

  // Reset default certificates
  const handleResetDefault = () => {
    if (confirm('Reset to default preloaded Riyadh Municipality certificate?')) {
      setCertificates([DEFAULT_CERTIFICATE]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_CERTIFICATE]));
    }
  };

  // Print certificate
  const handlePrintCertificate = (cert: HealthCertificate) => {
    setPrintCert(cert);
    // Allow React state to update before opening print dialog
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Public QR Verification view launcher
  const handlePreviewPublic = (cert: HealthCertificate) => {
    setActiveVerifyCert(cert);
    const cleanId = cert.id || cert.certificateNumber.replace('/', '-');
    const newUrl = `${window.location.pathname}?verify=${encodeURIComponent(cleanId)}`;
    window.history.pushState({}, '', newUrl);
    setCurrentView('public_verify');
  };

  // Return to admin dashboard from public view
  const handleReturnToAdmin = () => {
    window.history.pushState({}, '', window.location.pathname);
    setActiveVerifyCert(null);
    setCurrentView('dashboard');
  };

  // -------------------------------------------------------------
  // Render Branch 1: Public QR Verification View (STRICT ZERO-UI)
  // -------------------------------------------------------------
  if (currentView === 'public_verify') {
    return (
      <PublicVerificationView
        certificate={activeVerifyCert || certificates[0]}
        onBackToAdmin={handleReturnToAdmin}
      />
    );
  }

  // -------------------------------------------------------------
  // Render Branch 2: Admin Login
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onViewPublicDemo={() => handlePreviewPublic(certificates[0])}
      />
    );
  }

  // -------------------------------------------------------------
  // Render Branch 3: Admin Dashboard & Editor
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 flex flex-col font-sans">
      {/* Printable Certificate Container (Visible Only In Print) */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999]">
        <CertificateCard certificate={printCert} showPage2={true} />
      </div>

      {/* Admin Web Header */}
      <header className="no-print bg-neutral-900 border-b border-neutral-800 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600/30 flex items-center justify-center border border-emerald-500/40 text-emerald-400 font-bold text-xs">
                RM
              </div>
              <div>
                <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Riyadh Health Certificate System
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  أمانة منطقة الرياض - Official Generator & QR Portal
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePreviewPublic(editingCert || certificates[0])}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition-colors border border-neutral-700 cursor-pointer"
            >
              <span>Test QR View</span>
            </button>

            <div className="h-5 w-[1px] bg-neutral-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 hidden md:inline">Logged in as:</span>
              <span className="text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 px-2.5 py-1 rounded-md">
                admin
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-neutral-400 hover:text-white px-2 py-1 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Viewport */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentView === 'dashboard' && (
          <AdminDashboard
            certificates={certificates}
            onCreateNew={() => {
              setEditingCert(null);
              setCurrentView('create');
            }}
            onEdit={(cert) => {
              setEditingCert(cert);
              setCurrentView('edit');
            }}
            onDelete={handleDeleteCertificate}
            onDuplicate={handleDuplicateCertificate}
            onPrint={handlePrintCertificate}
            onPreviewPublic={handlePreviewPublic}
            onResetDefault={handleResetDefault}
            onImportCertificates={(imported) => setCertificates(imported)}
            onLogout={handleLogout}
          />
        )}

        {(currentView === 'create' || currentView === 'edit') && (
          <CertificateForm
            initialCertificate={editingCert || undefined}
            onSave={(savedCert) => {
              handleSaveCertificate(savedCert);
              setPrintCert(savedCert);
            }}
            onCancel={() => {
              setEditingCert(null);
              setCurrentView('dashboard');
            }}
            onPrintDirect={handlePrintCertificate}
            onPreviewPublic={handlePreviewPublic}
          />
        )}
      </main>

      {/* Admin Footer */}
      <footer className="no-print bg-neutral-900 border-t border-neutral-800 text-neutral-500 text-xs py-4 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Riyadh Region Municipality (أمانة منطقة الرياض) - Health Certificate Generation System
          </span>
          <span className="font-mono text-[11px]">
            Compliant with Saudi Municipal Health Regulations
          </span>
        </div>
      </footer>
    </div>
  );
}
