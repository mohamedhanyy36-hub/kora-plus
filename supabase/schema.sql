export const mockLeagues = [
  { id: 1, name: 'دوري روشن', country: 'السعودية', matches: 8 },
  { id: 2, name: 'الدوري الإنجليزي', country: 'إنجلترا', matches: 6 },
  { id: 3, name: 'الدوري الإسباني', country: 'إسبانيا', matches: 5 },
  { id: 4, name: 'الدوري الإيطالي', country: 'إيطاليا', matches: 4 }
];

export const mockStandings = [
  { id: 1, position: 1, name: 'الاهلي', badge: 'A', played: 10, won: 8, points: 24 },
  { id: 2, position: 2, name: 'النصر', badge: 'N', played: 10, won: 7, points: 22 },
  { id: 3, position: 3, name: 'الهلال', badge: 'H', played: 10, won: 7, points: 21 },
  { id: 4, position: 4, name: 'الاتحاد', badge: 'I', played: 10, won: 6, points: 18 }
];

export const mockMatches = [
  {
    id: 1,
    slug: 'al-ahli-vs-al-nasr',
    status: 'live',
    statusLabel: 'مباشر',
    league: 'دوري روشن',
    season: '2025/2026',
    stadium: 'ملعب الملك فهد',
    homeTeam: 'الأهلي',
    awayTeam: 'النصر',
    homeBadge: 'A',
    awayBadge: 'N',
    homeScore: 2,
    awayScore: 1,
    kickoffAt: '2026-10-21T18:30:00.000Z',
    summary: 'تجري مباراة قوية بين الفريقين في المباراة الحاسمة, مع سيطرة متوترة واندفاع هجومي من الطرفين.'
  },
  {
    id: 2,
    slug: 'al-hilal-vs-al-ittihad',
    status: 'finished',
    statusLabel: 'انتهت',
    league: 'دوري روشن',
    season: '2025/2026',
    stadium: 'ملعب الأمير محمد بن فهد',
    homeTeam: 'الهلال',
    awayTeam: 'الاتحاد',
    homeBadge: 'H',
    awayBadge: 'I',
    homeScore: 3,
    awayScore: 2,
    kickoffAt: '2026-10-20T16:00:00.000Z',
    summary: 'مباراة متقاربة انتهت بهزيمة الاتحاد في الدقيقة الأخيرة بعد هدف حاسم من الهلال.'
  },
  {
    id: 3,
    slug: 'chelsea-vs-liverpool',
    status: 'upcoming',
    statusLabel: 'قريبًا',
    league: 'الدوري الإنجليزي',
    season: '2025/2026',
    stadium: 'ستامفورد بريدج',
    homeTeam: 'تشيلسي',
    awayTeam: 'ليفربول',
    homeBadge: 'C',
    awayBadge: 'L',
    homeScore: null,
    awayScore: null,
    kickoffAt: '2026-10-23T20:00:00.000Z',
    summary: 'مباراة كبرى تجمع بين فريقي كبيرين في ليلة قوية من الجولة المرتقبة.'
  }
];
