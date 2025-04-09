declare module 'react-beautiful-dnd' {
    export interface DropResult {
      draggableId: string;
      type: string;
      reason: 'DROP' | 'CANCEL';
      source: {
        droppableId: string;
        index: number;
      };
      destination?: {
        droppableId: string;
        index: number;
      } | null;
    }
  
    export const DragDropContext: any;
    export const Droppable: any;
    export const Draggable: any;
  }
  