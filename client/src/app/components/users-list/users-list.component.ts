import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserFilter, UserRole } from 'src/app/models/User';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { EditUserDialogComponent } from '../dialogs/edit-user-dialog/edit-user-dialog.component';
import { UserFilterPipe } from 'src/app/data/pipes/user-filter.pipe';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allColumns: string[] = ['id', 'username', 'creationDate', 'role', 'status', 'edit'];
  strictedColumns: string[] = [ 'username', 'role', 'status', 'edit'];

  roles: number[] = [0, 1, 2]
  displayedColumns: string[] = ['id', 'username', 'creationDate', 'role', 'status', 'edit'];
  users: User[] = []
  filteredUsers: User[] = []
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(this.filteredUsers);

  userFilter: UserFilter = new UserFilter();

  userFilterPipe: UserFilterPipe = new UserFilterPipe();

  constructor(private userService: UserService, private toastService: ToastService, private dialog: MatDialog) {
    this.displayedColumns = window.innerWidth < 1000 ? this.strictedColumns: this.allColumns;
    this.getUsers();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 1000) {
      this.displayedColumns = this.strictedColumns;
    } else {
      this.displayedColumns = this.allColumns;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.sort((a, b) => a.role - b.role);
        this.initTable();
      },
      error: () => this.toastService.showError(),
    })
  }

  initTable() {
    this.filterChange();
    this.dataSource.paginator = this.paginator;
  }

  filterChange() {
    this.filteredUsers = this.userFilterPipe.transform(this.users, this.userFilter);
    this.dataSource = new MatTableDataSource<User>(this.filteredUsers);
    this.dataSource.paginator = this.paginator;
  }

  openEditDialog(user: User) {
    this.dialog.open(EditUserDialogComponent, {data: user})
      .afterClosed()
      .subscribe(changed => {
        if (changed) {
          this.getUsers()
        }
      })
  }

  clear() {
    this.userFilter = new UserFilter();
    this.filterChange();
  }
}