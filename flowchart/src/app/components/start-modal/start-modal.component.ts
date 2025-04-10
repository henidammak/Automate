import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DiagramSelectionService } from 'src/Services/diagram-selection.service';

@Component({
  selector: 'app-start-modal',
  templateUrl: './start-modal.component.html',
  styleUrls: ['./start-modal.component.css'],
})
export class StartModalComponent {
  pipeline: any = null;
  devices: { id: string,name: string }[] = [];
  selectedDevices: { name: string; icon: string | null }[] = [];
  
  constructor(private dialogRef: MatDialogRef<StartModalComponent>,private selectionService: DiagramSelectionService) {}

  ngOnInit() {
    const pipelineJson = this.selectionService.getPipelineForStartAndAddTask();
    if (pipelineJson) {
      this.pipeline = JSON.parse(pipelineJson);
      console.log('Pipeline JSON :', pipelineJson);
    }
    this.devices = this.selectionService.getDevices(); // Charger les appareils enregistrés
  }

  // concernant les appareil selectionnées
  // toggleSelection(device: { name: string; icon: string | null }, event: Event) {
  //   const isChecked = (event.target as HTMLInputElement).checked;
  //   if (isChecked) {
  //     this.selectedDevices.push(device);
  //   } else {
  //     this.selectedDevices = this.selectedDevices.filter(d => d.name !== device.name);
  //   }
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

  onCancel() {
    this.dialogRef.close();
  }



  startDiagram() {
    // this.selectionService.triggerStart(this.selectedDevices); // Envoie les appareils sélectionnés
    this.selectionService.triggerStart(); // Déclenche l'événement pour informer le composant GoJS
    this.dialogRef.close();
  }
}
