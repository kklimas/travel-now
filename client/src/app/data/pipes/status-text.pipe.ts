import { Pipe, PipeTransform } from '@angular/core';
import { HistoryRecord } from 'src/app/models/HistoryRecord';

@Pipe({
  name: 'statusText'
})
export class StatusTextPipe implements PipeTransform {

  transform(record: HistoryRecord): string {
    let startDate = new Date(record.startDate);
    let endDate = new Date(record.endDate);
    let currentDate = (new Date()).getTime();
    if (currentDate < startDate.getTime()) {
      return 'Not started'
    }
    if (currentDate > endDate.getTime()) {
      return 'Ended'
    }
    return 'In progress';
  }
}
