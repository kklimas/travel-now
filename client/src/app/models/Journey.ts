export class Journey {
    _id: string;
    name: string;
    country: string;
    ticketsLeft: number;
    cost: number;
    startDate: Date;
    endDate: Date;
    description: string;
    urls: string[];
    stars: number;
}

export class JourneyComment {
    _id: string;
    journeyId: string;
    username: string;
    text: string;
    stars: number;
    userDate: Date;

    journeyName: string;
    journeyImgPath: string;
}

export class JourneyCommentDTO {
    stars: number;
    votes: number;
}

export class JourneyFilter {
    query: string = '';
    countries: string[] = [];
    startDate: Date;
    endDate: Date;
    minCost: number;
    maxCost: number;
    stars: number[];
}