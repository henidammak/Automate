import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DiagramSelectionService } from 'src/Services/diagram-selection.service';

@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.css']
})
export class ConfigModalComponent {


  
    constructor(
      private dialogRef: MatDialogRef<ConfigModalComponent>,private selectionService: DiagramSelectionService) {}

  
    onCancel() {
      this.dialogRef.close();
    }
  
    onSave() {

      this.dialogRef.close();
    }

}
