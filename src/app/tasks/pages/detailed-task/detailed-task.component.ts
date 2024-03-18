import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Task } from '../../models/task.model';
import { DataService } from "../../services/data.service";
import { getFullName } from '../../helpers/helpers';
import { MatDialog } from "@angular/material/dialog";
import { DeleteConfirmationComponent } from "../../components/delete-confirmation/delete-confirmation.component";


@Component({
  selector: 'app-detailed-task',
  templateUrl: './detailed-task.component.html',
  styleUrls: ['./detailed-task.component.scss']
})
export class DetailedTaskComponent implements OnInit {
  task!: Task;
  protected readonly getFullName = getFullName;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const taskId = this.route.snapshot.params['id'];
    this.dataService.getTaskById(taskId)
      .pipe(
        // tap((res => console.log('res', res)))
        // take(1),
        // takeUntil(this.notifier$),
        // catchError((err) => throwError(() => err))
      )
      .subscribe((data) => {
        this.task = data;
        console.log('data', data);
        // console.log('date', typeof data[0].deadline);
        // this.cdr.detectChanges();
      });
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleString('en-US', { dateStyle: "full" });
  }


  deleteTask(id: string) {

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(res => {
      if (!!res) {
        // window.open(`http://youtube.com/channel/${id}`, '_blank');
          this.dataService.deleteTask(id)
            .pipe(
              // tap((res => console.log('res', res)))
              // take(1),
              // takeUntil(this.notifier$),
              // catchError((err) => throwError(() => err))
            )
            .subscribe((res: boolean) => {
              if (res) {
                this.router.navigate(['/']).then();
              }
            });
      }
    })




  }
}
