import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  AlertCircle, 
  Megaphone, 
  Settings, 
  Search, 
  Bell, 
  User,
  ChevronRight,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type View = 'dashboard' | 'services' | 'grievances' | 'announcements' | 'settings';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ReactNode;
}

interface ServiceCardProps {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

// --- Components ---

const Sidebar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'services', label: 'Village Services', icon: FileText },
    { id: 'grievances', label: 'Grievance Redressal', icon: AlertCircle },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
  ] as const;

  return (
    <div className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight font-display">Gram Connect</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              currentView === item.id 
                ? 'bg-indigo-500/10 text-indigo-400' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => setView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentView === 'settings' 
              ? 'bg-indigo-500/10 text-indigo-400' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Settings size={18} />
          Settings
        </button>
      </div>
    </div>
  );
};

const Header = ({ title }: { title: string }) => (
  <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
    <div className="flex items-center gap-4">
      <h1 className="text-lg font-semibold text-slate-900 font-display">{title}</h1>
    </div>
    <div className="flex items-center gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Search portal..." 
          className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all w-64"
        />
      </div>
      <button className="text-slate-500 hover:text-slate-900 transition-colors relative">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-slate-900">Arjun Sharma</p>
          <p className="text-xs text-slate-500">Village Administrator</p>
        </div>
        <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
          <User size={20} />
        </div>
      </div>
    </div>
  </header>
);

const StatCard = ({ title, value, change, trend, icon }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
        {icon}
      </div>
      {change && (
        <span className={`text-xs font-medium ${trend === 'up' ? 'text-indigo-600' : 'text-rose-600'}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </span>
      )}
    </div>
    <div>
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 font-mono tabular-nums">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: 'Pending Service Requests', value: 24, change: '12%', trend: 'up', icon: <FileText size={20} /> },
    { title: 'Open Grievances', value: 8, change: '25%', trend: 'down', icon: <AlertCircle size={20} /> },
    { title: 'Registered Citizens', value: '4,120', change: '3%', trend: 'up', icon: <User size={20} /> },
    { title: 'Village Projects', value: 12, icon: <LayoutDashboard size={20} /> },
  ] as const;

  const recentActivity = [
    { id: 1, type: 'grievance', user: 'Sunita Devi', subject: 'Water supply issue in Ward 4', time: '2 hours ago', status: 'Pending' },
    { id: 2, type: 'service', user: 'Rajesh Kumar', subject: 'Birth Certificate Application', time: '4 hours ago', status: 'In Review' },
    { id: 3, type: 'announcement', user: 'Admin', subject: 'Vaccination Drive at Health Center', time: 'Yesterday', status: 'Live' },
    { id: 4, type: 'grievance', user: 'Amit Singh', subject: 'Street light repair needed', time: 'Yesterday', status: 'Resolved' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Citizen</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentActivity.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-xs font-medium">
                          {item.user[0]}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{item.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{item.subject}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500 font-mono tabular-nums">{item.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'Resolved' ? 'bg-indigo-50 text-indigo-700' :
                        item.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-blue-50 text-blue-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Upcoming Projects</h2>
          </div>
          <div className="p-6 space-y-6 flex-1">
            {[
              { title: 'Ward 2 Road Repair', progress: 75, date: 'Oct 20' },
              { title: 'New Primary School Wing', progress: 40, date: 'Nov 15' },
              { title: 'Solar Street Lights Phase 3', progress: 10, date: 'Dec 05' },
            ].map((project, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-900">{project.title}</span>
                  <span className="text-slate-500 font-mono tabular-nums">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-indigo-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Est. Completion: {project.date}</p>
              </div>
            ))}
          </div>
          <button className="m-6 p-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            View All Projects <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [applyingService, setApplyingService] = useState<string | null>(null);

  const services = [
    { title: 'Birth Certificate', category: 'Civil Registry', description: 'Apply for official birth registration certificates.', icon: <FileText /> },
    { title: 'Ration Card Support', category: 'Welfare', description: 'New applications and modification of existing ration cards.', icon: <LayoutDashboard /> },
    { title: 'Agricultural Subsidy', category: 'Farming', description: 'Access government schemes and subsidies for farmers.', icon: <CheckCircle2 /> },
    { title: 'Property Tax', category: 'Finance', description: 'View and pay village property taxes securely online.', icon: <ArrowUpRight /> },
    { title: 'Health Card', category: 'Healthcare', description: 'Apply for the National Digital Health Mission card.', icon: <CheckCircle2 /> },
    { title: 'Utility Connection', category: 'Infrastructure', description: 'Requests for water and electricity connections.', icon: <Plus /> },
  ];

  if (applyingService === 'Birth Certificate') {
    return <BirthCertificateForm onBack={() => setApplyingService(null)} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
            {['All', 'Civil', 'Welfare', 'Finance'].map((f) => (
              <button key={f} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${f === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm">
          <Plus size={16} /> New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{service.category}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {service.description}
            </p>
            <button 
              onClick={() => setApplyingService(service.title)}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Apply Now <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const BirthCertificateForm = ({ onBack }: { onBack: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
          <p className="text-slate-500">Your birth certificate application (Ref: BC-2026-9921) has been received. Our administrators will review the documents and notify you via SMS.</p>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Return to Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Birth Certificate Application</h2>
        <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-900 font-medium">Cancel</button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Child's Full Name</label>
            <input required type="text" placeholder="Legal name of the child" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date of Birth</label>
            <input required type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Father's Name</label>
            <input required type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mother's Name</label>
            <input required type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Place of Birth (Hospital/Clinic/Home)</label>
            <input required type="text" placeholder="Detailed address" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" />
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 leading-relaxed">
            <p className="font-bold mb-1">Required Documents</p>
            <p>Please ensure you have physical copies of the Hospital Discharge Summary and Parent Identity Cards ready for verification at the Panchayat office.</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
          <button 
            type="button" 
            onClick={onBack}
            className="px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Clock className="animate-spin" size={16} /> : null}
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

const Grievances = () => {
  const grievances = [
    { id: 'GR-8802', subject: 'Blocked drainage system', citizen: 'Ravi Verma', status: 'Pending', priority: 'High', date: '2026-10-12' },
    { id: 'GR-8801', subject: 'Street light repair Ward 2', citizen: 'Laxmi Prasad', status: 'In Progress', priority: 'Medium', date: '2026-10-11' },
    { id: 'GR-8799', subject: 'Irregular water supply', citizen: 'Meena Sharma', status: 'Resolved', priority: 'High', date: '2026-10-09' },
    { id: 'GR-8795', subject: 'Pothole repair Main Road', citizen: 'Suresh Babu', status: 'Resolved', priority: 'Low', date: '2026-10-05' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input type="text" placeholder="Filter grievances..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={14} /> Filters
          </button>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
          Export Report
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Grievance Subject</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Citizen</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {grievances.map((g) => (
              <tr key={g.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-slate-500">{g.id}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{g.subject}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{g.citizen}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    g.status === 'Resolved' ? 'bg-indigo-50 text-indigo-700' :
                    g.status === 'Pending' ? 'bg-rose-50 text-rose-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {g.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium ${
                    g.priority === 'High' ? 'text-rose-600' :
                    g.priority === 'Medium' ? 'text-amber-600' :
                    'text-slate-500'
                  }`}>
                    {g.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono tabular-nums">{g.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <ChevronRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Announcements = () => {
  const announcements = [
    { title: 'Free Vaccination Drive', date: 'Oct 15, 2026', content: 'Gram Panchayat is organizing a free health checkup and vaccination drive for all children under 10.', type: 'Health', priority: 'High' },
    { title: 'Borewell Maintenance Notice', date: 'Oct 14, 2026', content: 'Regular maintenance of borewells in Ward 3 will happen this weekend. Water supply might be affected for 2 hours.', type: 'Utility', priority: 'Medium' },
    { title: 'New Digital Center Opening', date: 'Oct 12, 2026', content: 'Our new Village Digital Literacy Center is now open for public. Enroll for free computer classes.', type: 'Education', priority: 'Low' },
  ];

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Latest Updates</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm">
          <Plus size={16} /> Create Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((a, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              a.priority === 'High' ? 'bg-rose-500' :
              a.priority === 'Medium' ? 'bg-amber-500' :
              'bg-indigo-500'
            }`} />
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{a.type}</span>
                <span className="text-xs text-slate-400 font-mono">{a.date}</span>
              </div>
              {a.priority === 'High' && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 uppercase bg-rose-50 px-2 py-0.5 rounded">
                  <AlertCircle size={10} /> Urgent
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{a.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {a.content}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <button className="text-xs font-medium text-indigo-600 hover:underline">Mark as Read</button>
              <button className="text-xs font-medium text-slate-400 hover:text-slate-600">Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard />;
      case 'services': return <Services />;
      case 'grievances': return <Grievances />;
      case 'announcements': return <Announcements />;
      case 'settings': return <div className="p-12 text-center text-slate-400 italic">Settings configuration coming soon...</div>;
      default: return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'dashboard': return 'Administrative Dashboard';
      case 'services': return 'Village Digital Services';
      case 'grievances': return 'Grievance Redressal System';
      case 'announcements': return 'Public Announcements';
      case 'settings': return 'Portal Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-body selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar currentView={view} setView={setView} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={getTitle()} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
