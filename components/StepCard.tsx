import React from 'react';
import { Step, Task } from '../types';
import { CheckCircle2, Circle, FileDown, ArrowRight, AlertCircle } from 'lucide-react';

interface StepCardProps {
  step: Step;
  phaseColor: string;
  completedTaskIds: Set<string>;
  toggleTask: (taskId: string) => void;
}

const StepCard: React.FC<StepCardProps> = ({ step, phaseColor, completedTaskIds, toggleTask }) => {
  // Parse phaseColor class to get the border/text equivalents roughly
  // This is a simplification, usually we'd have a color map
  const borderColor = phaseColor.replace('bg-', 'border-').replace('600', '200');
  const textColor = phaseColor.replace('bg-', 'text-');

  return (
    <div className={`bg-white rounded-xl border ${borderColor} shadow-sm p-5 mb-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{step.title}</h3>
          {step.description && <p className="text-slate-500 text-sm mt-1">{step.description}</p>}
        </div>
        {step.trigger && (
           <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex items-start gap-2 max-w-xs">
             <AlertCircle size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
             <span className="text-xs text-slate-600 italic leading-tight">Trigger: {step.trigger}</span>
           </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accions & Checklists</h4>
          {step.actionItems.map((task: Task) => {
            const isDone = completedTaskIds.has(task.id);
            return (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${
                  isDone 
                    ? 'bg-emerald-50 border-emerald-100' 
                    : 'bg-white border-slate-100 hover:border-blue-300'
                }`}
              >
                <div className={`mt-0.5 ${isDone ? 'text-emerald-600' : 'text-slate-300 group-hover:text-blue-400'}`}>
                  {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDone ? 'text-emerald-800 line-through opacity-70' : 'text-slate-700'}`}>
                    {task.text}
                  </p>
                  
                  {task.details && task.details.length > 0 && (
                     <ul className="mt-2 space-y-1 ml-1 border-l-2 border-slate-100 pl-3">
                       {task.details.map((detail, idx) => (
                         <li key={idx} className="text-xs text-slate-500 leading-relaxed">• {detail}</li>
                       ))}
                     </ul>
                  )}

                  {task.templates && task.templates.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {task.templates.map((tpl, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded border border-amber-100">
                          <FileDown size={12} />
                          {tpl}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {step.outputs && step.outputs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Outputs (Resultats)</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
               {step.outputs.map((out, idx) => (
                 <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-md">
                   <ArrowRight size={14} className={textColor} />
                   {out}
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCard;