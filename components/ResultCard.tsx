import React, { useState } from 'react';
import { Student } from '../types';
import { Download, User, ChevronLeft, Calendar, GraduationCap, ArrowRight, FileText, ExternalLink, Clock } from 'lucide-react';

interface ResultCardProps {
  student: Student;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ student, onReset }) => {
  const [showReport, setShowReport] = useState(false);

  // Helper to convert Google Drive view link to preview link for iframe
  const getPreviewLink = (link: string) => {
    try {
      if (!link) return '';
      if (link.includes('drive.google.com')) {
        return link.replace('/view', '/preview').replace('/open', '/preview');
      }
      return link;
    } catch (e) {
      return link;
    }
  };

  if (!showReport) {
    // STATE 1: Identity Confirmation (Kartu Identitas Siswa)
    return (
      <div className="w-full max-w-md glass-panel rounded-2xl shadow-2xl overflow-hidden border border-white/40 animate-fade-in-up transform transition-all">
        {/* Header - SMP Blue */}
        <div className="bg-[#003366] px-6 py-4 flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Identitas Siswa
          </h3>
          <button 
            onClick={onReset}
            className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali
          </button>
        </div>

        <div className="p-8 flex flex-col items-center">
          {/* Avatar / Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-white rounded-full flex items-center justify-center mb-4 ring-4 ring-blue-50 shadow-inner">
             <User className="w-12 h-12 text-[#003366]" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">{student.name}</h2>
          <span className="px-4 py-1 bg-blue-100 text-[#003366] text-sm font-bold rounded-full mb-6 border border-blue-200">
            NISN: {student.nisn}
          </span>

          {/* Info Grid - Updated to 3 columns to include Tahun */}
          <div className="w-full grid grid-cols-3 gap-2 mb-8">
             <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Kelas</span>
                <span className="font-bold text-gray-800 text-sm sm:text-base truncate w-full">{student.className}</span>
             </div>
             <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Semester</span>
                <span className="font-bold text-gray-800 text-sm sm:text-base truncate w-full">{student.semester}</span>
             </div>
             <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tahun</span>
                <span className="font-bold text-gray-800 text-sm sm:text-base truncate w-full">{student.academicYear}</span>
             </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setShowReport(true)}
            className="w-full group flex items-center justify-center px-6 py-4 bg-[#003366] text-white rounded-xl font-semibold shadow-lg hover:bg-blue-800 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            Lihat Hasil Raport
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="mt-4 text-xs text-center text-gray-400">
            Klik tombol di atas untuk membuka dan mengunduh raport.
          </p>
        </div>
      </div>
    );
  }

  // STATE 2: Report View & Download (Detail Raport)
  return (
    <div className="w-full max-w-5xl glass-panel rounded-2xl shadow-2xl overflow-hidden border border-white/40 animate-fade-in-up flex flex-col h-[85vh] md:h-auto">
      {/* Header - SMP Blue */}
      <div className="bg-[#003366] px-4 py-3 md:px-6 md:py-4 flex items-center justify-between shrink-0">
        <div className="flex flex-col">
            <h3 className="text-white font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            E-Rapor Digital
            </h3>
            <span className="text-blue-200 text-xs md:text-sm">{student.name} - {student.className}</span>
        </div>
        
        <button 
          onClick={() => setShowReport(false)}
          className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors border border-blue-700"
        >
          <ChevronLeft className="w-4 h-4" />
          Tutup
        </button>
      </div>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Info (Desktop) / Top Info (Mobile) */}
        <div className="bg-gray-50 p-4 md:w-72 md:border-r border-b md:border-b-0 border-gray-200 flex flex-col gap-4 shrink-0 overflow-y-auto">
            <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <User className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Nama Siswa</span>
                    </div>
                    <p className="font-semibold text-gray-900">{student.name}</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <GraduationCap className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Kelas</span>
                    </div>
                    <p className="font-semibold text-gray-900">{student.className}</p>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                        <Calendar className="w-4 h-4" /> <span className="text-xs font-medium uppercase">Periode</span>
                    </div>
                    <p className="font-semibold text-gray-900">{student.semester} / {student.academicYear}</p>
                </div>
            </div>

            <div className="mt-auto pt-4 space-y-3">
                {student.reportLink ? (
                  <>
                    <a
                      href={student.reportLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:-translate-y-1"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download PDF
                    </a>
                    <a 
                      href={student.reportLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Buka di Tab Baru
                    </a>
                  </>
                ) : (
                  <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg text-center border border-red-100">
                    Link raport tidak tersedia.
                  </div>
                )}
                
                <p className="text-xs text-gray-400 mt-2 text-center">
                    Jika preview di samping tidak muncul (blank), silakan klik tombol Download di atas.
                </p>
            </div>
        </div>

        {/* PDF Preview Area */}
        <div className="flex-grow bg-gray-200 relative min-h-[300px]">
            {student.reportLink ? (
              <iframe 
                  src={getPreviewLink(student.reportLink)} 
                  className="w-full h-full absolute inset-0 bg-white"
                  title="PDF Preview"
                  allow="autoplay"
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Dokumen tidak ditemukan
              </div>
            )}
            
            {/* Fallback hint layer behind iframe */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 text-gray-400 text-sm text-center">
                <div className="animate-pulse">Memuat Preview...</div>
            </div>
        </div>
      </div>
    </div>
  );
};