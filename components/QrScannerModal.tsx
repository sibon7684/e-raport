import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface QrScannerModalProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

// Declare the global variable exposed by the script in index.html
declare const Html5QrcodeScanner: any;

export const QrScannerModal: React.FC<QrScannerModalProps> = ({ onScanSuccess, onClose }) => {
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    // Configuration for the scanner
    const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true
    };
    
    // Initialize scanner with the ID of the div element
    const scannerId = "reader";
    
    try {
        scannerRef.current = new Html5QrcodeScanner(scannerId, config, /* verbose= */ false);
        
        scannerRef.current.render(
            (decodedText: string) => {
                // Handle successful scan
                onScanSuccess(decodedText);
            },
            (errorMessage: any) => {
                // Ignore parse errors as they happen frequently when no QR is in view
            }
        );
    } catch (e) {
        console.error("Error initializing QR Scanner", e);
    }

    // Cleanup function
    return () => {
        if (scannerRef.current) {
            try {
                scannerRef.current.clear();
            } catch (e) {
                console.error("Failed to clear scanner", e);
            }
        }
    };
  }, [onScanSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col max-h-[90vh]">
        <div className="p-4 bg-blue-900 text-white flex justify-between items-center shrink-0">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                Pindai QR Code
            </h3>
            <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                aria-label="Tutup Scanner"
            >
                <X className="w-6 h-6" />
            </button>
        </div>
        
        <div className="p-4 bg-gray-100 flex-grow overflow-y-auto">
            <div id="reader" className="w-full bg-black rounded-lg overflow-hidden border-2 border-gray-300"></div>
            <p className="text-center text-sm text-gray-500 mt-4 px-2">
                Arahkan kamera ke QR Code pada kartu siswa untuk mengisi NISN secara otomatis.
            </p>
        </div>
      </div>
    </div>
  );
};
