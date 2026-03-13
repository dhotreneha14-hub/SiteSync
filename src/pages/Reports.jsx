import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Trash2,
  FileText,
  CloudSun,
  Users,
  Search,
  ExternalLink,
  LayoutGrid,
  X,
  Sun,
  Moon
} from 'lucide-react';
import toast from 'react-hot-toast';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('dprs') || '[]');
    setReports(savedReports);
  }, []);

  const deleteReport = (id) => {
    const updated = reports.filter(r => r.id.toString() !== id.toString());
    setReports(updated);
    localStorage.setItem('dprs', JSON.stringify(updated));
    toast.success('Successfully deleted report');
  };

  const filteredReports = reports.filter(r =>
    r.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.workDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen bg-dot-pattern transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      <header className={`border-b sticky top-0 z-50 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <button
              onClick={() => navigate('/projects')}
              className={`p-2 rounded-lg active:scale-95 transition-all shrink-0 ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <ArrowLeft className={`w-5 h-5 md:w-6 md:h-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
            <h1 className={`text-lg md:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>Submitted Reports</h1>
          </div>

          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            <button
              onClick={() => navigate('/projects')}
              className={`p-2.5 rounded-lg active:scale-95 transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/reports')}
              className={`p-2.5 rounded-lg active:scale-95 transition-all ${
                window.location.pathname === '/reports'
                  ? 'bg-primary/10 text-primary'
                  : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/dpr')}
              className={`p-2.5 rounded-lg group flex items-center gap-1 active:scale-95 transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <ExternalLink className="w-5 h-5" />
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary">NEW</span>
            </button>
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg active:scale-95 transition-all duration-300 ${isDark ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'}`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm ${
              isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredReports.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center py-24 rounded-3xl border-2 border-dashed shadow-sm ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/60 backdrop-blur-md border-slate-200'
                }`}
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <FileText className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>No reports discovered</h3>
                <p className={`font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Try adjusting your search terms</p>
              </motion.div>
            ) : (
              filteredReports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-6 rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-400'}`}>
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{report.projectName}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                            <Calendar className="w-4 h-4" />
                            {new Date(report.date).toLocaleDateString()}
                          </div>
                          <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
                          <div className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
                            <CloudSun className="w-4 h-4" />
                            {report.weather}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteReport(report.id)}
                      className={`p-2 rounded-lg transition-all hover:text-red-500 hover:bg-red-500/10 ${isDark ? 'text-slate-600' : 'text-slate-300'}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className={`text-sm leading-relaxed mb-4 italic ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    "{report.workDescription}"
                  </p>

                  <div className={`flex items-center justify-between border-t pt-4 ${isDark ? 'border-slate-800' : 'border-slate-50'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium">{report.workerCount} Workers</span>
                      </div>
                      {report.photos && report.photos.length > 0 && (
                        <div className="flex -space-x-2">
                          {report.photos.map((photo, i) => (
                            <div
                              key={i}
                              onClick={() => setSelectedImage(photo.url || photo)}
                              className="w-10 h-10 rounded-lg border-2 border-white overflow-hidden shadow-sm cursor-pointer hover:scale-110 hover:z-10 transition-transform relative z-0"
                            >
                              <img src={photo.url || photo} alt="Progress" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-red-400 bg-white/10 rounded-full transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedImage}
                alt="Fullscreen View"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reports;
