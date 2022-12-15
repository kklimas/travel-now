import { Pipe, PipeTransform } from '@angular/core';
import { HistoryRecord, RecordStatus } from 'src/app/models/HistoryRecord';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(records: HistoryRecord[], status: RecordStatus): HistoryRecord[] {
    if (status === RecordStatus.NONE) return records;
    let currentDate = (new Date()).getTime();
    return records.filter(record => {
      let startDate = new Date(record.startDate);
      let endDate = new Date(record.endDate);
      let recordStatus = RecordStatus.NOT_STARTED;
      if (currentDate >= startDate.getTime() && currentDate <= endDate.getTime()) {
        recordStatus = RecordStatus.IN_PROGRESS;
      } else if (currentDate > endDate.getTime()) {
        recordStatus = RecordStatus.ENDED;
      }
      return recordStatus === status;
    })
  }
}
