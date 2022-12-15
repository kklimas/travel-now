import { Pipe, PipeTransform } from '@angular/core';
import { HistoryRecord } from 'src/app/models/HistoryRecord';

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {
  transform(record: HistoryRecord): string {
    let startDate = new Date(record.startDate);
    let endDate = new Date(record.endDate);
    let currentDate = (new Date()).getTime();
    if (currentDate < startDate.getTime()) {
      return 'default'
    }
    if (currentDate > endDate.getTime()) {
      return 'blue'
    }
    
    return 'blue';
  }

}
