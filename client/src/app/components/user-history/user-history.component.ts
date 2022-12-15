import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { StatusFilterPipe } from "src/app/data/pipes/status-filter.pipe";
import { HistoryRecord, RecordStatus } from "src/app/models/HistoryRecord";
import { ToastService } from "src/app/services/toast.service";
import { UserHistoryService } from "src/app/services/user-history.service";

@Component({
  selector: "app-user-history",
  templateUrl: "./user-history.component.html",
  styleUrls: ["./user-history.component.css"],
})
export class UserHistoryComponent implements OnInit{

  NONE = RecordStatus.NONE;
  NOT_STARTED = RecordStatus.NOT_STARTED;
  IN_PROGRESS = RecordStatus.IN_PROGRESS;
  ENDED = RecordStatus.ENDED;

  records: HistoryRecord[] = [];
  filteredRecords: HistoryRecord[] = [];

  displayedColumns: string[] = ['position', 'journeyName', 'startDate', 'tickets', 'status'];
  dataSource = new MatTableDataSource<HistoryRecord>(this.filteredRecords);

  filterPipe: StatusFilterPipe = new StatusFilterPipe();

  selected: RecordStatus = RecordStatus.NONE;

  constructor(
    private userHistoryService: UserHistoryService,
    private toastService: ToastService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.userHistoryService.getHistory().subscribe({
      next: (data) => {
        this.records = data.sort((r1, r2) => {
          if (r1.startDate > r2.startDate) return 1
          if (r2.startDate > r1.startDate) return -1
          return 0;
        });
        this.filterByStatus();
      },
      error: () => this.toastService.showError(),
    });
  }

  filterByStatus() {
    this.filteredRecords = this.filterPipe.transform(this.records, this.selected);
  }

  switchTo(record: HistoryRecord) {
    this.router.navigate(['/journeys', `/${record.journeyId}`])
    
  }
}