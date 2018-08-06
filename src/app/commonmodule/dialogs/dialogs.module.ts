import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogsService } from './dialogs.service';
import { MatButtonModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { DisplayDialogComponent } from './display-dialog/display-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [ConfirmDialogComponent, DisplayDialogComponent],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent,DisplayDialogComponent],
  providers: [DialogsService]
})
export class DialogsModule { }