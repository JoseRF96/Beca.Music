import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }, private dialogRef: MatDialogRef<DeleteDialogComponent>){}

  onDelete(){
    this.dialogRef.close(this.data.id);
  }
}
