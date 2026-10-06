import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { RiyadhEmblem } from './RiyadhEmblem';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === '123456') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Default is admin / 123456');
    }
  };

  const handleDemoLogin = () => {
    setUsername('admin');
    setPassword('123456');
    setError('');
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-neutral-800 border border-neutral-700/80 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Header with Municipality Emblem */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-3">
            <RiyadhEmblem size={72} />
          </div>
          <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
            Kingdom of Saudi Arabia
          </div>
          <h1 className="text-xl font-extrabold text-white tracking-tight">
            Riyadh Health Certificate Portal
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-arabic" dir="rtl">
            أمانة منطقة الرياض - بوابة إصدار الشهادات الصحية
          </p>
        </div>

        {/* Quick Demo Login Banner */}
        <div className="mb-6 p-3.5 bg-emerald-950/60 border border-emerald-600/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-200">Pre-configured Admin</div>
              <div className="text-[11px] text-neutral-400">admin / 123456</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            1-Click Demo Login
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-800/50 rounded-lg text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 bg-[#006837] hover:bg-[#005a32] text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Authorized Municipality Personnel Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
