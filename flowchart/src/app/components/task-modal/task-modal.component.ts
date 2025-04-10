import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DiagramSelectionService } from 'src/Services/diagram-selection.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  pipeline: any = null;
  taskTitle: string = '';
  description: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  filePath: string | null = null;
  // hasNestedCompositeTask: boolean = false; // Vérification de la tâche composite
  @Input() warningOnly: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<TaskModalComponent>,
    private selectionService: DiagramSelectionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data && this.data.warningOnly) {
      this.warningOnly = true;
    }
    const pipelineJson = this.selectionService.getPipelineForStartAndAddTask();
    if (pipelineJson) {
      this.pipeline = JSON.parse(pipelineJson);
      console.log('Pipeline JSON :', pipelineJson);

      // Vérifier s'il y a une tâche CompositeTask à l'intérieur
      // this.hasNestedCompositeTask = this.containsNestedCompositeTask(this.pipeline);
    }
  }

  // containsNestedCompositeTask(pipeline: any): boolean {
  //   if (!pipeline || !pipeline.nodeDataArray) return false;

  //   return pipeline.nodeDataArray.some((task: any) => task.category === "CompositeTask");
  // }
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
  
    // Initialiser les maps
    this.pipeline.nodeDataArray.forEach((node: any) => {
      connectionCounts.set(node.key, 0);
      fromCounts.set(node.key, 0);
      toCounts.set(node.key, 0);
    });
  
    // Comptabiliser les connexions
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
  
    // Vérifier les connexions des nœuds
    return this.pipeline.nodeDataArray.some((node: any) => {
      const key = node.key;
      const total = connectionCounts.get(key) || 0;
      const from = fromCounts.get(key) || 0;
      const to = toCounts.get(key) || 0;
  
      if (node.category === 'Start' || node.category === 'End') {
        // Start et End doivent avoir exactement 1 lien
        return total !== 1;
      }
  
      // Si un nœud a 2 connexions, il doit avoir 1 lien entrant et 1 sortant
      if (total === 2) {
        return !(from === 1 && to === 1);
      }
  
      // Tous les autres cas sont considérés comme non connectés
      return true;
    });
  }
  
  ///fin////

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        this.filePath = this.selectedFile ? this.selectedFile.name : ''; // Stocke le nom du fichier
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    // if (!this.hasNestedCompositeTask) {
    this.dialogRef.close({
      title: this.taskTitle,
      description: this.description,
      pipeline: JSON.stringify(this.pipeline),
      icon: this.filePath,
    });
    // }
    
  }
}
