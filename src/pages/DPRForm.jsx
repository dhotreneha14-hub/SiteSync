import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PROJECTS, WEATHER_OPTIONS } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CloudSun,
  Users,
  FileText,
  Camera,
  X,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  ExternalLink,
  MapPin,
  Calendar,
  HardHat,
  ChevronRight,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import toast from 'react-hot-toast';

const DPRForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const projectIdParam = searchParams.get('projectId');

  const [formData, setFormData] = useState({
    projectId: projectIdParam || '',
    date: new Date().toISOString().split('T')[0],
    weather: 'Sunny',
    workDescription: '',
    workerCount: '',
    photos: []
  });

  const selectedProject = PROJECTS.find(p => p.id.toString() === formData.projectId.toString());
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (projectIdParam) {
      setFormData(prev => ({ ...prev, projectId: projectIdParam }));
    }
  }, [projectIdParam]);

  const validate = () => {
    const newErrors = {};
    if (!formData.projectId) newErrors.projectId = 'Project selection is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.workDescription.trim()) newErrors.workDescription = 'Work description is required';
    if (!formData.workerCount || formData.workerCount <= 0) newErrors.workerCount = 'Valid worker count is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.photos.length + files.length > 3) {
      toast.error('Maximum 3 photos allowed');
      return;
    }
    const newPhotos = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
  };

  const removePhoto = (id) => {
    setFormData(prev => ({ ...prev, photos: prev.photos.filter(p => p.id !== id) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newReport = {
      ...formData,
      id: Date.now(),
      projectName: PROJECTS.find(p => p.id.toString() === formData.projectId.toString())?.name || 'Unknown Project',
      timestamp: new Date().toISOString()
    };
    const existingReports = JSON.parse(localStorage.getItem('dprs') || '[]');
    localStorage.setItem('dprs', JSON.stringify([newReport, ...existingReports]));
    setIsSubmitting(false);
    setShowSuccess(true);
    toast.success('DPR Submitted Successfully!');
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'in progress': return isDark ? 'bg-blue-900/40 text-blue-400 border-blue-800' : 'bg-blue-50 text-blue-600 border-blue-100';
      case 'completed': return isDark ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'planning': return isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-50 text-slate-500 border-slate-100';
      case 'on hold': return isDark ? 'bg-amber-900/40 text-amber-400 border-amber-800' : 'bg-amber-50 text-amber-600 border-amber-100';
      default: return isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  if (showSuccess) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Submission Successful</h2>
          <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Your daily progress report has been recorded safely.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/reports')}
              className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-800 hover:-translate-y-1 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >View All Reports</button>
            <button
              onClick={() => navigate('/projects')}
              className={`px-8 py-3 font-bold rounded-xl hover:-translate-y-1 active:scale-95 transition-all ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >Back to Projects</button>
          </div>
        </motion.div>
      </div>
    );
  }

  const inputCls = (hasError) =>
    `w-full p-3 border rounded-xl outline-none transition-all duration-300 font-medium ${
      hasError
        ? 'border-red-400 ring-4 ring-red-50'
        : isDark
          ? 'bg-slate-800 border-slate-700 text-white hover:border-slate-600 focus:bg-slate-800 focus:ring-4 focus:ring-primary/20 focus:border-primary'
          : 'bg-slate-50 border-slate-200 hover:border-slate-300 focus:bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary focus:shadow-sm'
    }`;

  return (
    <div className={`min-h-screen bg-dot-pattern pb-12 transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      <header className={`border-b sticky top-0 z-50 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <button
              onClick={() => navigate('/projects')}
              className={`p-2 rounded-lg active:scale-95 transition-all shrink-0 ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <ArrowLeft className={`w-5 h-5 md:w-6 md:h-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
            <h1 className={`text-lg md:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>Daily Progress Report</h1>
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
              className={`p-2.5 rounded-lg active:scale-95 transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'}`}
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

      <main className="max-w-3xl mx-auto px-4 py-8">
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                <HardHat className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>#{selectedProject.id}</span>
                </div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedProject.name}</h2>
              </div>
            </div>

            <div className={`flex flex-wrap gap-6 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{selectedProject.location}</span>
              </div>
              <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{new Date(selectedProject.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`rounded-2xl p-6 shadow-sm border space-y-6 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            {/* Project Select */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Select Project</label>
              <div className="relative">
                <select
                  value={formData.projectId}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
                  className={inputCls(errors.projectId)}
                >
                  <option value="">Choose a project...</option>
                  {PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 rotate-90 pointer-events-none" />
              </div>
              {errors.projectId && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.projectId}</p>}
            </div>

            {/* Date & Weather */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className={inputCls(false)}
                />
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <CloudSun className="w-4 h-4 text-slate-400" /> Weather
                </label>
                <div className="relative">
                  <select
                    value={formData.weather}
                    onChange={(e) => setFormData(prev => ({ ...prev, weather: e.target.value }))}
                    className={inputCls(false) + ' appearance-none'}
                  >
                    {WEATHER_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Worker Count */}
            <div>
              <label className={`block text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Users className="w-4 h-4 text-slate-400" /> Worker Count
              </label>
              <input
                type="number"
                min="1"
                placeholder="Total workers on site"
                value={formData.workerCount}
                onChange={(e) => setFormData(prev => ({ ...prev, workerCount: e.target.value }))}
                className={inputCls(errors.workerCount)}
              />
              {errors.workerCount && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.workerCount}</p>}
            </div>

            {/* Work Description */}
            <div>
              <label className={`block text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <FileText className="w-4 h-4 text-slate-400" /> Work Description
              </label>
              <textarea
                rows="5"
                placeholder="Describe today's activities and milestones..."
                value={formData.workDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, workDescription: e.target.value }))}
                className={inputCls(errors.workDescription) + ' resize-none'}
              />
              {errors.workDescription && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.workDescription}</p>}
            </div>

            {/* Photos */}
            <div>
              <label className={`block text-sm font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <Camera className="w-4 h-4 text-slate-400" /> Progress Photos (Max 3)
              </label>
              <div className="grid grid-cols-3 gap-4">
                {formData.photos.map(photo => (
                  <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={photo.url} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {formData.photos.length < 3 && (
                  <label className={`aspect-square rounded-xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center transition-all hover:border-primary hover:bg-primary/5 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <Camera className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Add Photo</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  </label>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-800 hover:shadow-xl hover:-translate-y-1 active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Daily Report</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default DPRForm;
