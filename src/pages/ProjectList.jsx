import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  ChevronRight,
  Filter,
  ArrowRight,
  ExternalLink,
  LogOut,
  LayoutGrid,
  FileText,
  Search,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const statusList = ['All', 'In Progress', 'Planning', 'On Hold', 'Completed'];

  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return isDark ? 'bg-blue-900/40 text-blue-400 border-blue-800' : 'bg-blue-50 text-blue-600 border-blue-100';
      case 'completed': return isDark ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'planning': return isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-50 text-slate-500 border-slate-100';
      case 'on hold': return isDark ? 'bg-amber-900/40 text-amber-400 border-amber-800' : 'bg-amber-50 text-amber-600 border-amber-100';
      default: return isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <div className={`min-h-screen bg-dot-pattern transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
      <header className={`border-b py-3 sticky top-0 z-50 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 text-primary shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7v10l9 5 5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2l9 5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="7" y="10" width="2.5" height="4.5" fill="currentColor" />
                <rect x="11.5" y="6" width="2.5" height="8.5" fill="currentColor" />
                <rect x="16" y="11" width="2" height="3.5" fill="currentColor" />
                <rect x="18" y="3" width="2" height="2" fill="currentColor" />
                <rect x="21" y="4.5" width="2" height="2" fill="currentColor" />
                <rect x="19.5" y="6.5" width="2" height="2" fill="currentColor" />
                <path d="M5 13.5l4.5 4.5L20 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>SiteSync</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => navigate('/projects')}
                className={`p-2 rounded-lg active:scale-95 transition-all ${window.location.pathname === '/projects' ? 'bg-primary/10 text-primary' : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/reports')}
                className={`p-2 rounded-lg active:scale-95 transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <FileText className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/dpr')}
                className={`p-2 rounded-lg flex items-center gap-1 group active:scale-95 transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary">NEW</span>
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg active:scale-95 transition-all duration-300 ${
                  isDark ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-50'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <div className={`h-6 w-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />

            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-500 font-bold hover:text-red-400 active:scale-95 transition-transform"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Active Projects</h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Manage and track your active construction sites</p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg font-medium hover:opacity-80 transition-all ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <Filter className="w-4 h-4" />
                {statusFilter === 'All' ? 'All Status' : statusFilter}
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg z-20 overflow-hidden ${
                      isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                    }`}
                  >
                    {statusList.map((status) => (
                      <button
                        key={status}
                        onClick={() => { setStatusFilter(status); setIsDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          statusFilter === status
                            ? 'bg-primary/10 text-primary font-bold'
                            : isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl p-6 border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => navigate(`/dpr?projectId=${project.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles(project.status)}`}>
                    {project.status}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>

                <h3 className={`text-xl font-bold group-hover:text-primary transition-colors mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {project.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">Started: {new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center text-primary font-bold text-sm gap-2 mt-auto">
                  <span>Generate Report</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ProjectList;
