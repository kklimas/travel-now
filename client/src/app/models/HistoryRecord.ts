export class Record {
    _id: string;
    userId: string;
    journeyId: string;
    tickets: number;
    orderDate: Date;
}
export class HistoryRecord extends Record {
    journeyName: string;
    startDate: Date;
    endDate: Date;
}
export enum RecordStatus {
    NONE, NOT_STARTED, IN_PROGRESS, ENDED
}