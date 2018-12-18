import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class TodoService {
todolist: AngularFireList<any>;
checked: any;
deleteAllBool = false;
  constructor(private firebasedb: AngularFireDatabase, public snackBar: MatSnackBar, private zone: NgZone) {
  }
  openModal() {
    return true;
  }
gettodolist() {
  this.todolist = this.firebasedb.list('titles');
  return this.todolist;
}
addtitle(title: string) {
  this.todolist.push({
title : title,
isChecked : false,
date: Date()
  }).then(() => {
this.openSnackBar('Added Task');
  });
}
openSnackBar(message: string) {
  this.zone.run(() => {
  this.snackBar.open(message, '', {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'end'
  });
});
}
checkorunchecktitle($key: string, flag: boolean) {
this.todolist.update($key, {isChecked : flag}).then((data) => {
  if (flag === true) {
    this.openSnackBar('Task Completed');
  } else {
    this.openSnackBar('Task Incomplete');
  }
});
}
updateTask(id, update) {
this.firebasedb.database.ref('/titles/' + id).update({
  title: update
}).then (() => {
  this.openSnackBar('Updated Task');
});
}
removetitle($key: string) {
  this.firebasedb.list('titles').remove($key).then(() => {
    this.openSnackBar('Deleted!');
  });
}
deleteAll() {
  this.firebasedb.database.ref('titles').orderByChild('isChecked').on('child_added', (entries) => {
    if (entries.val().isChecked === true) {
      this.firebasedb.list('titles').remove(entries.key).then(() => {
        this.openSnackBar('Deleted!');
      });
    }
        });
}

}
