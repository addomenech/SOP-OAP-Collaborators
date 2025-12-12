import { 
  Calendar, 
  FileText, 
  Camera, 
  MessageSquare, 
  Share2, 
  UserCheck, 
  Clock,
  Briefcase
} from 'lucide-react';
import { Phase, PhaseType } from './types';

export const WORKFLOW_DATA: Phase[] = [
  {
    id: 'p1',
    number: '1',
    title: 'Planificació i Activació',
    type: PhaseType.STANDARD,
    icon: Calendar,
    color: 'bg-blue-600',
    steps: [
      {
        id: 's1.1',
        title: 'Proposta de jornada / activitat',
        trigger: 'La territorial vol organitzar una activitat.',
        description: 'Enviament de mail de notificació de nova jornada amb format estàndard.',
        actionItems: [
          {
            id: 't1.1.1',
            text: 'Enviar correu de proposta',
            isCompleted: false,
            details: [
              'Títol',
              'Data i Hora',
              'Format: Presencial / Online / Híbrid',
              'Municipi < 20.000 habitants: Sí / No',
              'Ubicació',
              'Ponent(s)',
              'Tipus: Sensibilització / Networking / Emprenedoria'
            ]
          }
        ],
        outputs: [
          'Jornada validada per Foment',
          'Referència única creada (AAAAMMDD_Keywords)'
        ]
      }
    ]
  },
  {
    id: 'p2',
    number: '2',
    title: 'Preparació (Pre-Jornada)',
    type: PhaseType.STANDARD,
    icon: FileText,
    color: 'bg-indigo-600',
    steps: [
      {
        id: 's2.1',
        title: 'Estructura Documental',
        description: 'Preparació de l\'entorn digital.',
        actionItems: [
          {
            id: 't2.1.1',
            text: 'Duplicar carpeta base (ex.: 20260102_Exemple)',
            isCompleted: false
          },
          {
            id: 't2.1.2',
            text: 'Aplicar nomenclatura estàndard',
            isCompleted: false
          }
        ],
        outputs: ['Carpeta de jornada llesta per recopilar evidències.']
      },
      {
        id: 's2.2',
        title: 'Materials i Formularis',
        description: 'Creació de gràfiques i gestió d\'inscripcions.',
        actionItems: [
          {
            id: 't2.2.1',
            text: 'Crear Banner',
            templates: ['Canva_OAP_Banners_Jornades_Organització'],
            isCompleted: false
          },
          {
            id: 't2.2.2',
            text: 'Redactar Convocatòria',
            templates: ['Plantilla_Convocatoria (AAAAMMDD_Keywords_Convocatoria)'],
            isCompleted: false
          },
          {
            id: 't2.2.3',
            text: 'Configurar Formulari d’inscripció',
            templates: ['Forms Inscripció Jornades'],
            isCompleted: false
          }
        ],
        outputs: [
          'Jornada publicada i oberta a inscripcions.',
          'Llista d’inscrits en temps real (Excel automàtic).'
        ]
      }
    ]
  },
  {
    id: 'p3',
    number: '3',
    title: 'Execució (Dia de la Jornada)',
    type: PhaseType.STANDARD,
    icon: Camera,
    color: 'bg-emerald-600',
    steps: [
      {
        id: 's3.1',
        title: 'Control d’assistència',
        description: 'Registre rigorós dels assistents segons modalitat.',
        actionItems: [
          {
            id: 't3.1.1',
            text: 'Presencial: Full de firmes',
            templates: ['Plantilla_Firmas_Asistentes (escanejada)'],
            isCompleted: false
          },
          {
            id: 't3.1.2',
            text: 'Online: Excel Zoom amb emails',
            isCompleted: false
          },
          {
            id: 't3.1.3',
            text: 'Consolidació: Excel de PIMEs computades',
            templates: ['Registro_Actividades'],
            isCompleted: false
          }
        ],
        outputs: ['Llistat consolidat d\'assistents']
      },
      {
        id: 's3.2',
        title: 'Evidències visuals i tècniques',
        description: 'Recollir obligatòriament tot el material.',
        actionItems: [
          {
            id: 't3.2.1',
            text: 'Fotos (amb logos i títol visibles)',
            isCompleted: false
          },
          {
            id: 't3.2.2',
            text: 'Captura de pantalla (títol + data + hora)',
            isCompleted: false
          },
          {
            id: 't3.2.3',
            text: 'CV ponents',
            templates: ['Plantilla_Ponentes'],
            isCompleted: false
          },
          {
            id: 't3.2.4',
            text: 'Presentació Power Point',
            templates: ['Plantilla_Presentación'],
            isCompleted: false
          },
          {
            id: 't3.2.5',
            text: 'Gravació (si existeix)',
            isCompleted: false
          }
        ],
        outputs: ['Pack complet d\'evidències digitals']
      }
    ]
  },
  {
    id: 'p4',
    number: '4',
    title: 'Post-Jornada',
    type: PhaseType.STANDARD,
    icon: MessageSquare,
    color: 'bg-amber-600',
    steps: [
      {
        id: 's4.1',
        title: 'Enquesta de satisfacció',
        description: 'Recollida de feedback.',
        actionItems: [
          {
            id: 't4.1.1',
            text: 'Enviament Forms Satisfacció',
            isCompleted: false
          },
          {
            id: 't4.1.2',
            text: 'Exportació resultats a Excel',
            isCompleted: false
          }
        ],
        outputs: ['Fitxer Excel de valoració.']
      },
      {
        id: 's4.2',
        title: 'Fitxa d’activitat grupal',
        description: 'Reporting final de l\'activitat.',
        actionItems: [
          {
            id: 't4.2.1',
            text: 'Omplir Plantilla_Actividades_Grupales',
            details: ['Dades bàsiques', 'Resultats', 'Participants', 'Tipologia', 'Evidències associades'],
            isCompleted: false
          }
        ],
        outputs: ['Activitat completament documentada.']
      }
    ]
  },
  {
    id: 'p5',
    number: '5',
    title: 'Captació i Difusió',
    type: PhaseType.TRANSVERSAL,
    icon: Share2,
    color: 'bg-purple-600',
    steps: [
      {
        id: 's5.1',
        title: 'Registre d’accions',
        description: 'Activitat transversal constant.',
        actionItems: [
          {
            id: 't5.1.1',
            text: 'Registrar accions a Plantilla_Actividades_Difusión',
            details: ['Xarxes socials', 'Web', 'Newsletters', 'Emails territorials'],
            isCompleted: false
          }
        ],
        outputs: ['Registre actualitzat de difusió']
      }
    ]
  },
  {
    id: 'p6',
    number: '6',
    title: 'Assessoraments Individuals',
    type: PhaseType.TRANSVERSAL,
    icon: UserCheck,
    color: 'bg-cyan-600',
    steps: [
      {
        id: 's6.1',
        title: 'Execució assessorament',
        description: 'Gestió individualitzada per PIME.',
        actionItems: [
          {
            id: 't6.1.1',
            text: 'Utilitzar Plantilla_Asesoramientos',
            isCompleted: false
          },
          {
            id: 't6.1.2',
            text: 'Generar documents obligatoris',
            templates: [
              'AAAAMMDD_Asesoramiento_NomPYME',
              'AAAAMMDD_Formulario_NomPYME',
              'AAAAMMDD_Solicitud_NomPYME',
              'AAAAMMDD_Report_NomPYME'
            ],
            isCompleted: false
          }
        ],
        outputs: ['Assessorament traçat per empresa.', 'Report individual disponible.']
      }
    ]
  },
  {
    id: 'p7',
    number: '7',
    title: 'Tancament Mensual',
    type: PhaseType.MONTHLY,
    icon: Clock,
    color: 'bg-rose-600',
    steps: [
      {
        id: 's7.1',
        title: 'Actualització i consolidació (Dia 28)',
        description: 'Revisió final abans de tancar el mes.',
        actionItems: [
          {
            id: 't7.1.1',
            text: 'Actualitzar Plantilla Jornades',
            isCompleted: false
          },
          {
            id: 't7.1.2',
            text: 'Actualitzar Activitats de captació i difusió',
            isCompleted: false
          },
          {
            id: 't7.1.3',
            text: 'Revisar Carpetes de materials i evidències',
            isCompleted: false
          }
        ],
        outputs: ['Documentació llesta per facturar.']
      },
      {
        id: 's7.2',
        title: 'Facturació',
        description: 'Pagament: dia 10 del mes següent.',
        actionItems: [
          {
            id: 't7.2.1',
            text: 'Facturar Assessoraments',
            details: ['Concepte: Asesoramiento a (nombre empresas) en el marco de la Oficina Acelera Pyme de Foment del Treball…'],
            isCompleted: false
          },
          {
            id: 't7.2.2',
            text: 'Facturar Ponències',
            details: ['Concepte: Ponencia en la jornada (nombre jornada y fecha) en el marco de la Oficina Acelera Pyme de Foment del Treball…'],
            isCompleted: false
          }
        ],
        outputs: ['Factures enviades.']
      }
    ]
  }
];