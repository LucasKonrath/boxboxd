export interface F1Team {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
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
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG Petronas F1 Team',
    shortName: 'Mercedes',
    primaryColor: '#27F4D2',
    secondaryColor: '#00D2BE',
    accentColor: '#C0C0C0',
    textColor: '#000000',
  },
  {
    id: 'ferrari',
    name: 'Scuderia Ferrari',
    shortName: 'Ferrari',
    primaryColor: '#E8002D',
    secondaryColor: '#DC143C',
    accentColor: '#FFD700',
    textColor: '#FFFFFF',
  },
  {
    id: 'mclaren',
    name: 'McLaren F1 Team',
    shortName: 'McLaren',
    primaryColor: '#FF8000',
    secondaryColor: '#FF6600',
    accentColor: '#0099CC',
    textColor: '#FFFFFF',
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin Aramco F1 Team',
    shortName: 'Aston Martin',
    primaryColor: '#229971',
    secondaryColor: '#1B7A5A',
    accentColor: '#CEDC00',
    textColor: '#FFFFFF',
  },
  {
    id: 'alpine',
    name: 'BWT Alpine F1 Team',
    shortName: 'Alpine',
    primaryColor: '#FF87BC',
    secondaryColor: '#FF69B4',
    accentColor: '#0090FF',
    textColor: '#000000',
  },
  {
    id: 'williams',
    name: 'Williams Racing',
    shortName: 'Williams',
    primaryColor: '#64C4FF',
    secondaryColor: '#4A90E2',
    accentColor: '#FFFFFF',
    textColor: '#000000',
  },
  {
    id: 'rb',
    name: 'Visa Cash App RB F1 Team',
    shortName: 'RB',
    primaryColor: '#6692FF',
    secondaryColor: '#4169E1',
    accentColor: '#FFFFFF',
    textColor: '#FFFFFF',
  },
  {
    id: 'kick-sauber',
    name: 'Stake F1 Team Kick Sauber',
    shortName: 'Kick Sauber',
    primaryColor: '#52E252',
    secondaryColor: '#32CD32',
    accentColor: '#000000',
    textColor: '#000000',
  },
  {
    id: 'haas',
    name: 'MoneyGram Haas F1 Team',
    shortName: 'Haas',
    primaryColor: '#B6BABD',
    secondaryColor: '#808080',
    accentColor: '#DC143C',
    textColor: '#000000',
  },
  {
    id: 'default',
    name: 'Formula 1 Default',
    shortName: 'F1 Default',
    primaryColor: '#E10600',
    secondaryColor: '#DC143C',
    accentColor: '#FFD700',
    textColor: '#FFFFFF',
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
