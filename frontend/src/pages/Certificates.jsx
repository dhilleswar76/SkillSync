import { useEffect, useState } from "react";
import axios from "../api/axios";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get("/certificates");
        setCertificates(res.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const downloadCertificate = async (certificateId) => {
    try {
      const res = await axios.get(`/certificates/${certificateId}`, {
        responseType: 'blob',
      });
      
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Failed to download certificate");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎓 My Certificates
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your earned certificates and achievements
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-12 text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Certificates Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Complete courses to earn certificates and showcase your achievements
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Browse Courses
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-xl transition-all"
            >
              {/* Certificate Header */}
              <div className="bg-gradient-to-br from-primary to-accent-coral p-6 text-center text-white">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-lg font-bold">Certificate of Completion</h3>
              </div>

              {/* Certificate Body */}
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {cert.courseName || cert.courseId?.title || "Course"}
                </h4>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>
                      Issued: {new Date(cert.issuedAt || cert.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {cert.certificateId && (
                    <div className="flex items-center gap-2">
                      <span>🔖</span>
                      <span className="text-xs font-mono">ID: {cert.certificateId}</span>
                    </div>
                  )}
                </div>

                {/* Download Button */}
                <button
                  onClick={() => downloadCertificate(cert._id)}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <span>📥</span>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              About Certificates
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Certificates are automatically generated when you complete all lessons and pass the final assessment 
              of a course. You can download them as PDF files and share them on your LinkedIn profile or resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
