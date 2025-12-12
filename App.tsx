import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import PhaseSection from './components/PhaseSection';
import { WORKFLOW_DATA } from './constants';
import { PhaseType } from './types';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['p1']));
  const [searchQuery, setSearchQuery] = useState('');

  // Load state from local storage on mount (simulated persistence)
  useEffect(() => {
    const saved = localStorage.getItem('oap-workflow-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedTaskIds(new Set(parsed));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem('oap-workflow-progress', JSON.stringify(Array.from(completedTaskIds)));
  }, [completedTaskIds]);

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const togglePhaseExpanded = (phaseId: string) => {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  };

  const filteredPhases = useMemo(() => {
    let phases = WORKFLOW_DATA;

    // Filter by Tab
    if (activeTab !== 'ALL') {
      phases = phases.filter(p => p.type === activeTab as PhaseType);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      phases = phases.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.steps.some(s => 
          s.title.toLowerCase().includes(lowerQuery) || 
          s.actionItems.some(t => t.text.toLowerCase().includes(lowerQuery))
        )
      );
    }

    return phases;
  }, [activeTab, searchQuery]);

  const totalTasks = useMemo(() => {
    return WORKFLOW_DATA.flatMap(p => p.steps.flatMap(s => s.actionItems)).length;
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        completedTasks={completedTaskIds.size}
        totalTasks={totalTasks}
      />

      <main className="ml-64 flex-1 p-8 md:p-12 max-w-5xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {activeTab === 'ALL' && 'Workflow Complet'}
              {activeTab === PhaseType.STANDARD && 'Jornada Estàndard'}
              {activeTab === PhaseType.TRANSVERSAL && 'Transversal'}
              {activeTab === PhaseType.MONTHLY && 'Tancament Mensual'}
            </h2>
            <p className="text-slate-500 mt-2 max-w-2xl">
              Guia pas a pas per a l'execució de les organitzacions territorials del projecte Foment Oficina Acelera Pyme.
            </p>
          </div>
          
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               type="text" 
               placeholder="Buscar tasques o documents..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-64 text-sm"
             />
          </div>
        </header>

        <div className="space-y-4">
          {filteredPhases.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
               <p className="text-slate-500">No s'han trobat fases que coincideixin amb el filtre.</p>
             </div>
          ) : (
            filteredPhases.map(phase => (
              <PhaseSection 
                key={phase.id} 
                phase={phase}
                completedTaskIds={completedTaskIds}
                toggleTask={toggleTask}
                isExpanded={expandedPhases.has(phase.id) || searchQuery !== ''}
                toggleExpanded={() => togglePhaseExpanded(phase.id)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;