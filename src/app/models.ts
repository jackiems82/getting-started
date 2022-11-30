export interface Competition {
    id: string,
    area: {
        id: string,
        name: string,
        code: String,
        flag: null
    },
    name: string,
    code: string,
    type: string,
    emblem: null,
    plan: string,
    currentSeason: {
        id: string,
        startDate: string,
        endDate: string,
        currentMatchday: number,
        winner: null
    },
    numberOfAvailableSeasons: number,
    lastUpdated: Date
}

interface Party {
    id: string,
    name: string
}

interface Person extends Party {
    nationality: string
}

interface Referee extends Person {
    type: RefereeType;
}

interface Goal {
    minute: number,
    injuryTime: null,
    type: 'PENALTY' | 'REGULAR',
    team: Party,
    scorer: Party,
    assist: null,
    score: {
        home: number,
        away: number
    }
}

type RefereeType = 'REFEREE' | 'ASSISTANT_REFEREE_N1' | 'ASSISTANT_REFEREE_N2' | 'FOURTH_OFFICIAL' | 'VIDEO_ASSISTANT_REFEREE_N1' | 'VIDEO_ASSISTANT_REFEREE_N2';

export interface MatchEntry { score: string, kickoffTime: string, homeTeam: string, awayTeam: string }

export interface Match {
    area: {
        id: string,
        name: string,
        code: string,
        flag: string
    },
    competition: {
        id: string,
        name: string,
        code: string,
        type: string,
        emblem: string
    },
    season: {
        id: string,
        startDate: string,
        endDate: string,
        currentMatchday: number,
        winner: null,
        stages: [
            'REGULAR_SEASON'
        ]
    },
    id: string,
    utcDate: Date,
    status: "FINISHED",
    minute: string,
    injuryTime: number,
    attendance: null,
    venue: string,
    matchday: number,
    stage: "REGULAR_SEASON",
    group: null,
    lastUpdated: string,
    homeTeam: {
        id: string,
        name: string,
        shortName: string,
        tla: string,
        crest: string,
        coach: Person,
        leagueRank: number,
        formation: string,
        lineup: [],
        bench: []
    },
    awayTeam: {
        id: string,
        name: string,
        shortName: string,
        tla: string,
        crest: string,
        coach: Person,
        leagueRank: number,
        formation: string,
        lineup: [],
        bench: []
    },
    score: {
        winner: "HOME_TEAM",
        duration: "REGULAR",
        fullTime: {
            home: number,
            away: number
        },
        halfTime: {
            home: number,
            away: number
        }
    },
    goals: Goal[],
    penalties: [
        {
            player: Party,
            team: Party,
            scored: boolean
        },
        {
            player: Party,
            team: Party,
            scored: boolean
        }
    ],
    bookings: [],
    substitutions: [],
    odds: {
        homeWin: number,
        draw: number,
        awayWin: number
    },
    referees: Referee[]
}