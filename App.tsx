import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { NisnForm } from './components/NisnForm';
import { ResultCard } from './components/ResultCard';
import { Student, AppState } from './types';
import { getStudentByNISN } from './services/studentService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Effect to check URL for NISN parameter on initial load
  useEffect(() => {
    // Wrap in try-catch as accessing window.location in some sandboxes might be tricky
    try {
      const params = new URLSearchParams(window.location.search);
      const urlNisn = params.get('nisn');
      
      if (urlNisn) {
        handleSearch(urlNisn);
      }
    } catch (e) {
      console.log("Could not read URL parameters", e);
    }
  }, []);

  const handleSearch = async (nisn: string) => {
    setAppState(AppState.LOADING);
    setErrorMessage('');
    
    try {
      const student = await getStudentByNISN(nisn);
      
      if (student) {
        setStudentData(student);
        setAppState(AppState.SUCCESS);
        // Optional: Update URL without reloading page to make sharing easier
        // Wrapped in try-catch to handle Blob URL/Sandbox limitations
        try {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set('nisn', nisn);
          window.history.pushState({}, '', newUrl.toString());
        } catch (e) {
          console.debug("URL update skipped (sandbox environment)");
        }
      } else {
        setErrorMessage('Data tidak ditemukan. Silakan periksa kembali NISN Anda.');
        setAppState(AppState.ERROR);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Terjadi kesalahan sistem. Silakan coba lagi nanti.');
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setStudentData(null);
    setErrorMessage('');
    // Clean URL param on reset
    try {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('nisn');
      window.history.pushState({}, '', newUrl.toString());
    } catch (e) {
      console.debug("URL update skipped (sandbox environment)");
    }
  };

  return (
    <Layout>
      {appState === AppState.IDLE && (
        <NisnForm onSearch={handleSearch} isLoading={false} />
      )}

      {appState === AppState.LOADING && (
         <div className="w-full max-w-md p-8 text-center bg-white/90 backdrop-blur rounded-2xl shadow-xl animate-fade-in">
             <div className="flex flex-col items-center justify-center space-y-4">
                 <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin"></div>
                 <p className="text-gray-600 font-medium">Sedang mencari data siswa...</p>
                 <p className="text-xs text-gray-400">Menghubungkan ke Database Sekolah...</p>
             </div>
         </div>
      )}

      {/* When Success, we let the ResultCard control its own width (it expands) */}
      {appState === AppState.SUCCESS && studentData && (
        <ResultCard student={studentData} onReset={handleReset} />
      )}

      {appState === AppState.ERROR && (
        <div className="w-full max-w-md glass-panel rounded-2xl shadow-xl p-6 border border-red-100 animate-fade-in">
           <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Maaf!</h3>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              
              <button
                onClick={handleReset}
                className="w-full py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Coba Lagi
              </button>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default App;