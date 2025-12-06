import { Student } from '../types';
import { GOOGLE_SCRIPT_URL } from '../constants';

interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  data: Student | null;
}

/**
 * Fetches student data using the Google Apps Script Web App.
 * Includes a fallback to DEMO MODE if the URL is not configured.
 */
export const getStudentByNISN = async (nisn: string): Promise<Student | null> => {
  // CHECK CONFIGURATION
  const isConfigured = GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("PASTE_YOUR");

  // DEMO MODE (Fallback if no URL is set)
  if (!isConfigured) {
    console.warn("⚠️ App is running in DEMO MODE. Configure GOOGLE_SCRIPT_URL in constants.ts to use real data.");
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple Mock Database for Demo Purposes
    if (nisn === '12345678' || nisn === '12345') {
      return {
        nisn: nisn,
        name: "Siswa Demo (Budi)",
        className: "IX-A",
        semester: "Ganjil",
        academicYear: "2023/2024",
        reportLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      };
    } else if (nisn === '87654321') {
       return {
        nisn: nisn,
        name: "Siswa Demo (Siti)",
        className: "VIII-B",
        semester: "Ganjil",
        academicYear: "2023/2024",
        reportLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      };
    }

    // Not found in demo
    return null;
  }

  // REAL PRODUCTION MODE
  try {
    // Construct URL with parameter
    // We add a timestamp to prevent browser caching of the request
    const url = `${GOOGLE_SCRIPT_URL}?nisn=${encodeURIComponent(nisn)}&t=${new Date().getTime()}`;

    const response = await fetch(url, {
      method: 'GET',
      // 'follow' is important because Google Scripts redirect to a content server
      redirect: 'follow', 
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (result.status === 'success' && result.data) {
      return result.data;
    } else {
      // If status is not success, it usually means student not found
      return null;
    }

  } catch (error) {
    console.error("Fetch Error:", error);
    // Rethrow generic error
    throw new Error("Gagal menghubungi server database. Pastikan koneksi internet stabil.");
  }
};