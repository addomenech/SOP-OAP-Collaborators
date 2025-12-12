import React from 'react';
import { LayoutDashboard, Users, CalendarCheck, BarChart3, Info } from 'lucide-react';
import { PhaseType } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  completedTasks: number;
  totalTasks: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, completedTasks, totalTasks }) => {
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="font-bold text-slate-800 text-lg">OAP Foment</h1>
        </div>
        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Oficina Acelera Pyme</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'ALL' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard size={18} />
          Vista General
        </button>

        <div className="pt-4 pb-2 px-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fases</p>
        </div>

        <button
          onClick={() => setActiveTab(PhaseType.STANDARD)}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === PhaseType.STANDARD ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <BarChart3 size={18} />
          Jornada Estàndard
        </button>

        <button
          onClick={() => setActiveTab(PhaseType.TRANSVERSAL)}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === PhaseType.TRANSVERSAL ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users size={18} />
          Assessoraments i Difusió
        </button>

        <button
          onClick={() => setActiveTab(PhaseType.MONTHLY)}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === PhaseType.MONTHLY ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <CalendarCheck size={18} />
          Tancament Mensual
        </button>
      </nav>

      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-slate-600">Progrés Total</span>
          <span className="text-xs font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-slate-500">
          {completedTasks} de {totalTasks} tasques completades
        </div>
      </div>
    </div>
  );
};

export default Sidebar;