import { Component, OnInit, Input, NgZone } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers : [TodoService]
})
export class TodoComponent implements OnInit {
  dialogResult = '';
todolistarray: any[];
todolistarrayLength = 0;
todoChecked: any;
todoCheckedCount = 0;
closeResult: string;
  constructor(private todoservice: TodoService, public dialog: MatDialog,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.spinner.show();
    this.todoservice.gettodolist().snapshotChanges()
    .subscribe(item => {
      this.spinner.hide();
    this.todoChecked = item.filter((value) => {
return value.payload.val().isChecked === true;
      });
      this.todoCheckedCount = this.todoChecked.length;
      this.todolistarray = [];
      this.todolistarrayLength = item.length;
      item.forEach(element => {
      const x = element.payload.toJSON();
        x['$key'] = element.key;
         this.todolistarray.push(x);
      });

this.todolistarray.sort((a, b) => {
return a.isChecked - b.isChecked;
});

    });
  }

openDialog(item: any) {
  const dialogRef = this.dialog.open(MyDialogComponent, {
    width: '600px',
    data: item
  });

  dialogRef.afterClosed().subscribe( result => {
    console.log('closed');
    this.dialogResult = result;
  });
}
openDialogDeleteSingle(item: any) {
  const dialogRef = this.dialog.open(MyDialogComponent, {
    width: '600px',
    data: item
  });

  dialogRef.afterClosed().subscribe( result => {
    this.dialogResult = result;
  });
}
onAdd(itemTitle) {
  if (itemTitle.value !== '') {
    this.todoservice.addtitle(itemTitle.value);
    itemTitle.value = null;
  } else {
    this.todoservice.openSnackBar('Enter Something!!');
  }

}
alterCheck($key: string, isChecked) {
this.todoservice.checkorunchecktitle($key, !isChecked);

}
 deleteAllChecked() {
  this.openDialog('deleteAll');
}
onDelete($key: string) {
const data = {
key : $key,
message: 'delete'
};
this.openDialogDeleteSingle(data);
}
}
