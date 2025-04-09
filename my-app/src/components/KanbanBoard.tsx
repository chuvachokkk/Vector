import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Column from './Column';
import { RootState } from '../store/store';
import { changeTaskStatus } from '../store/tasksSlice';
import styled from 'styled-components';
import rawDictionary from '../assets/dictionay.json';
import { Task } from '../store/tasksSlice';

interface Dictionary {
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
`;

interface KanbanBoardProps {
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ onEditTask, onDeleteTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Получаем массив статусов (ключи преобразованы в числа)
  const statuses = Object.keys(dictionary.statuses).map(Number);
  
  // Группируем задачи по statusId
  const tasksByStatus = statuses.reduce((acc: { [key: number]: Task[] }, status) => {
    acc[status] = tasks.filter(task => task.statusId === status);
    return acc;
  }, {});

  const onDragEnd = (result: DropResult) => {
    console.log('onDragEnd result:', result);
    if (!result.destination) return;
    
    const { draggableId, destination, source } = result;
    
    // Если перемещение внутри одной колонки, можно не обновлять статус
    if (source.droppableId === destination.droppableId) return;
    
    const newStatusId = Number(destination.droppableId);
    
    setTimeout(() => {
      dispatch(changeTaskStatus({ id: draggableId, statusId: newStatusId }));
    }, 0);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {statuses.map(status => (
          <Column
            key={status}
            statusId={status}
            tasks={tasksByStatus[status] || []}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </Container>
    </DragDropContext>
  );
};

export default KanbanBoard;
