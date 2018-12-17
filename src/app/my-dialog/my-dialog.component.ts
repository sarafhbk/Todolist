import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TodoService } from '../todo/shared/todo.service';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  edit = false;
  constructor(public thisDialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA ) public data: any,
  public todoservice: TodoService) { }

  ngOnInit() {
  }
  onUpdate(editInput: any, data: any) {
    const taskId = data;
    this.todoservice.updateTask(taskId, editInput);
this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
  delete() {
    this.todoservice.deleteAll();
    this.thisDialogRef.close('Confirm');
  }
  deleteSingle(key: any) {
    this.todoservice.removetitle(key);
    this.thisDialogRef.close('Confirm');
  }
}
