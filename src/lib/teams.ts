export interface F1Team {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  surfaceColor: string;
  mutedColor: string;
  borderColor: string;
  hoverColor: string;
  logo?: string;
}

export const F1_TEAMS: F1Team[] = [
  {
    id: 'red-bull',
    name: 'Red Bull Racing',
    shortName: 'Red Bull',
    primaryColor: '#3671C6',
    secondaryColor: '#1E40AF',
    accentColor: '#FED501',
    textColor: '#FFFFFF',
    backgroundColor: '#0F1629',
    surfaceColor: '#1E2951',
    mutedColor: '#94A3B8',
    borderColor: '#475569',
    hoverColor: '#2563EB',
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG Petronas F1 Team',
    shortName: 'Mercedes',
    primaryColor: '#27F4D2',
    secondaryColor: '#00D2BE',
    accentColor: '#C0C0C0',
    textColor: '#000000',
    backgroundColor: '#F0FDFA',
    surfaceColor: '#CCFBF1',
    mutedColor: '#5EEAD4',
    borderColor: '#2DD4BF',
    hoverColor: '#14B8A6',
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari',
    shortName: 'Ferrari',
    primaryColor: '#E8002D',
    secondaryColor: '#DC143C',
    accentColor: '#FFD700',
    textColor: '#FFFFFF',
    backgroundColor: '#450A0A',
    surfaceColor: '#7F1D1D',
    mutedColor: '#FCA5A5',
    borderColor: '#EF4444',
    hoverColor: '#B91C1C',
  },
  {
    id: 'mclaren',
    name: 'McLaren F1 Team',
    shortName: 'McLaren',
    primaryColor: '#FF8000',
    secondaryColor: '#FF6600',
    accentColor: '#0099CC',
    textColor: '#FFFFFF',
    backgroundColor: '#431407',
    surfaceColor: '#9A3412',
    mutedColor: '#FDBA74',
    borderColor: '#F97316',
    hoverColor: '#EA580C',
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin Aramco F1 Team',
    shortName: 'Aston Martin',
    primaryColor: '#229971',
    secondaryColor: '#1B7A5A',
    accentColor: '#CEDC00',
    textColor: '#FFFFFF',
    backgroundColor: '#022C22',
    surfaceColor: '#064E3B',
    mutedColor: '#86EFAC',
    borderColor: '#10B981',
    hoverColor: '#059669',
  },
  {
    id: 'alpine',
    name: 'BWT Alpine F1 Team',
    shortName: 'Alpine',
    primaryColor: '#FF87BC',
    secondaryColor: '#FF69B4',
    accentColor: '#0090FF',
    textColor: '#000000',
    backgroundColor: '#FDF2F8',
    surfaceColor: '#FCE7F3',
    mutedColor: '#F9A8D4',
    borderColor: '#EC4899',
    hoverColor: '#DB2777',
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    shortName: 'Williams',
    primaryColor: '#64C4FF',
    secondaryColor: '#4A90E2',
    accentColor: '#FFFFFF',
    textColor: '#000000',
    backgroundColor: '#F0F9FF',
    surfaceColor: '#E0F2FE',
    mutedColor: '#93C5FD',
    borderColor: '#3B82F6',
    hoverColor: '#2563EB',
  },
  {
    id: 'rb',
    name: 'Visa Cash App RB F1 Team',
    shortName: 'RB',
    primaryColor: '#6692FF',
    secondaryColor: '#4169E1',
    accentColor: '#FFFFFF',
    textColor: '#FFFFFF',
    backgroundColor: '#1E1B4B',
    surfaceColor: '#312E81',
    mutedColor: '#A5B4FC',
    borderColor: '#6366F1',
    hoverColor: '#4F46E5',
  },
  {
    id: 'kick-sauber',
    name: 'Stake F1 Team Kick Sauber',
    shortName: 'Kick Sauber',
    primaryColor: '#52E252',
    secondaryColor: '#32CD32',
    accentColor: '#000000',
    textColor: '#000000',
    backgroundColor: '#F0FDF4',
    surfaceColor: '#DCFCE7',
    mutedColor: '#86EFAC',
    borderColor: '#22C55E',
    hoverColor: '#16A34A',
  },
  {
    id: 'haas',
    name: 'MoneyGram Haas F1 Team',
    shortName: 'Haas',
    primaryColor: '#B6BABD',
    secondaryColor: '#808080',
    accentColor: '#DC143C',
    textColor: '#000000',
    backgroundColor: '#F8FAFC',
    surfaceColor: '#F1F5F9',
    mutedColor: '#CBD5E1',
    borderColor: '#64748B',
    hoverColor: '#475569',
  },
  {
    id: 'default',
    name: 'Formula 1 Default',
    shortName: 'F1 Default',
    primaryColor: '#E10600',
    secondaryColor: '#DC143C',
    accentColor: '#FFD700',
    textColor: '#FFFFFF',
    backgroundColor: '#450A0A',
    surfaceColor: '#7F1D1D',
    mutedColor: '#FCA5A5',
    borderColor: '#EF4444',
    hoverColor: '#B91C1C',
  },
];

export interface ThemeContextType {
  currentTeam: F1Team;
  setTeam: (team: F1Team) => void;
  teams: F1Team[];
}

export const getTeamById = (id: string): F1Team => {
  return F1_TEAMS.find(team => team.id === id) || F1_TEAMS[F1_TEAMS.length - 1];
};
