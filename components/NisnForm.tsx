import React, { useState } from 'react';
import { Search, Loader2, QrCode, ScanLine, Info } from 'lucide-react';
import { QrScannerModal } from './QrScannerModal';
import { GOOGLE_SCRIPT_URL } from '../constants';

interface NisnFormProps {
  onSearch: (nisn: string) => void;
  isLoading: boolean;
}

export const NisnForm: React.FC<NisnFormProps> = ({ onSearch, isLoading }) => {
  const [nisn, setNisn] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  
  // Check if we are in demo mode
  const isDemoMode = !GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nisn.trim().length > 0) {
      onSearch(nisn);
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    // Basic cleaning: remove extra whitespace
    const cleanedText = decodedText.trim();
    setNisn(cleanedText);
    setShowScanner(false);
  };

  return (
    <>
      <div className="w-full max-w-md glass-panel rounded-2xl shadow-2xl p-8 border border-white/40 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cek Rapor Siswa</h2>
          <p className="text-gray-500 text-sm">
            Silakan masukkan NISN Anda atau pindai QR Code untuk melihat rapor.
          </p>
        </div>
        
        {isDemoMode && (
          <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
            <Info className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div className="text-xs text-yellow-700 text-left">
              <strong>Mode Demo:</strong> Server belum dikonfigurasi.<br/>
              Gunakan NISN <code>12345678</code> untuk mencoba.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <QrCode className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="number"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 sm:text-sm"
              placeholder="Masukkan NISN"
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              disabled={isLoading}
              className="flex justify-center items-center py-3 px-4 border border-blue-900/20 rounded-xl shadow-sm text-sm font-medium text-blue-900 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <ScanLine className="mr-2 h-5 w-5" />
              Scan QR
            </button>

            <button
              type="submit"
              disabled={isLoading || nisn.length === 0}
              className="flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Proses
                </>
              ) : (
                <>
                  <Search className="-ml-1 mr-2 h-5 w-5" />
                  Lihat
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Pastikan NISN sesuai dengan data Dapodik sekolah.
          </p>
        </div>
      </div>

      {showScanner && (
        <QrScannerModal 
          onScanSuccess={handleScanSuccess} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </>
  );
};