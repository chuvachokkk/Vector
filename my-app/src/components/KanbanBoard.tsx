import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Column from './Column';
import { RootState } from '../store/store';
import { addTask, changeTaskStatus, Task } from '../store/tasksSlice';
import styled from 'styled-components';
import rawDictionary from '../assets/dictionay.json';

interface Dictionary {
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

export interface InlineTaskData {
  assigneeId: string;
  dueDate: string;
  priorityId: string;
  description: string;
}

const statuses = Object.keys(dictionary.statuses).map(Number);

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
`;

interface KanbanBoardProps {
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  onEditTask,
  onDeleteTask,
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const tasksByStatus = statuses.reduce(
    (acc: Record<number, Task[]>, status) => {
      acc[status] = tasks.filter((t) => t.statusId === status);
      return acc;
    },
    {} as Record<number, Task[]>
  );

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.source.droppableId === result.destination.droppableId
    )
      return;
    dispatch(
      changeTaskStatus({
        id: result.draggableId,
        statusId: Number(result.destination.droppableId),
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {statuses.map((status) => (
          <Column
            key={status}
            statusId={status}
            tasks={tasksByStatus[status] || []}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onAdd={(formData: InlineTaskData) => {
              const newTask: Task = {
                id: Date.now().toString(),
                taskName: formData.description || 'Новая задача',
                description: formData.description,
                dueDate: formData.dueDate,
                assigneeId: Number(formData.assigneeId),
                priorityId: Number(formData.priorityId),
                statusId: status,
              };
              dispatch(addTask(newTask));
            }}
          />
        ))}
      </Container>
    </DragDropContext>
  );
};

export default KanbanBoard;
