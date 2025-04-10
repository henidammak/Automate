import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DiagramSelectionService } from 'src/Services/diagram-selection.service';

@Component({
  selector: 'app-edit-comp-task-modal',
  templateUrl: './edit-comp-task-modal.component.html',
  styleUrls: ['./edit-comp-task-modal.component.css'],
})
export class EditCompTaskModalComponent {
  pipeline: any = null;

  constructor(
    private dialogRef: MatDialogRef<EditCompTaskModalComponent>,
    private selectionService: DiagramSelectionService
  ) {}

  ngOnInit() {
    const pipelineJson = this.selectionService.getPipelineForStartAndAddTask();
    if (pipelineJson) {
      this.pipeline = JSON.parse(pipelineJson);
      console.log('Pipeline JSON :', pipelineJson);
    }
  }

  ////////pour verifier si le pipeline contient une node start et end////////
  hasStartAndEndNode(): boolean {
    if (!this.pipeline || !this.pipeline.nodeDataArray) return false;

    const hasStart = this.pipeline.nodeDataArray.some(
      (node: any) => node.category === 'Start'
    );
    const hasEnd = this.pipeline.nodeDataArray.some(
      (node: any) => node.category === 'End'
    );

    return hasStart && hasEnd;
  }
  ///fin////
  ////////pour verifier si les node sont totalement reliée////////
  hasUnconnectedNodes(): boolean {
    if (
      !this.pipeline ||
      !this.pipeline.nodeDataArray ||
      !this.pipeline.linkDataArray
    )
      return true;

    const connectionCounts = new Map<number, number>();
    const fromCounts = new Map<number, number>();
    const toCounts = new Map<number, number>();

    this.pipeline.nodeDataArray.forEach((node: any) => {
      connectionCounts.set(node.key, 0);
      fromCounts.set(node.key, 0);
      toCounts.set(node.key, 0);
    });

    this.pipeline.linkDataArray.forEach((link: any) => {
      if (connectionCounts.has(link.from)) {
        connectionCounts.set(link.from, connectionCounts.get(link.from)! + 1);
        fromCounts.set(link.from, fromCounts.get(link.from)! + 1);
      }
      if (connectionCounts.has(link.to)) {
        connectionCounts.set(link.to, connectionCounts.get(link.to)! + 1);
        toCounts.set(link.to, toCounts.get(link.to)! + 1);
      }
    });

    return this.pipeline.nodeDataArray.some((node: any) => {
      const key = node.key;
      const total = connectionCounts.get(key) || 0;
      const from = fromCounts.get(key) || 0;
      const to = toCounts.get(key) || 0;

      if (node.category === 'Start' || node.category === 'End') {
        return total !== 1;
      }

      if (total === 2) {
        return !(from === 1 && to === 1);
      }

      return true;
    });
  }

  ///fin////

  onCancel() {
    this.dialogRef.close(false);
  }

  saveChanges() {
    this.dialogRef.close(true);
  }
}
