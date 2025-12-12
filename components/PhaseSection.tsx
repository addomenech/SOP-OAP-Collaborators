import React from 'react';
import { Phase } from '../types';
import StepCard from './StepCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PhaseSectionProps {
  phase: Phase;
  completedTaskIds: Set<string>;
  toggleTask: (taskId: string) => void;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const PhaseSection: React.FC<PhaseSectionProps> = ({ 
  phase, 
  completedTaskIds, 
  toggleTask,
  isExpanded,
  toggleExpanded
}) => {
  // Calculate progress for this specific phase
  const phaseTaskIds = phase.steps.flatMap(s => s.actionItems.map(t => t.id));
  const completedPhaseTasks = phaseTaskIds.filter(id => completedTaskIds.has(id)).length;
  const totalPhaseTasks = phaseTaskIds.length;
  const isComplete = totalPhaseTasks > 0 && completedPhaseTasks === totalPhaseTasks;

  return (
    <div className="mb-8 last:mb-24">
      <div 
        onClick={toggleExpanded}
        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
          isExpanded ? 'bg-white shadow-sm ring-1 ring-slate-200 mb-4' : 'bg-white hover:bg-slate-50 mb-2'
        }`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md ${phase.color} flex-shrink-0 relative`}>
          <phase.icon size={24} />
          {isComplete && (
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
             <h2 className="text-lg font-bold text-slate-800">
               <span className="opacity-40 mr-2">Fase {phase.number}</span>
               {phase.title}
             </h2>
             <div className="text-slate-400">
               {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
             </div>
          </div>
          
          <div className="w-full flex items-center gap-3">
            <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
               <div 
                 className={`h-full ${phase.color} opacity-60 rounded-full transition-all duration-500`}
                 style={{ width: `${(completedPhaseTasks / totalPhaseTasks) * 100}%` }}
               ></div>
            </div>
            <span className="text-xs font-medium text-slate-400 w-12 text-right">
              {completedPhaseTasks}/{totalPhaseTasks}
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="pl-4 md:pl-8 border-l-2 border-slate-200 ml-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          {phase.steps.map(step => (
            <StepCard 
              key={step.id} 
              step={step} 
              phaseColor={phase.color}
              completedTaskIds={completedTaskIds}
              toggleTask={toggleTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhaseSection;