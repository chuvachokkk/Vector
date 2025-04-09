// src/components/Column.tsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import TaskCard from './TaskCard';
import { Task } from '../store/tasksSlice';
import rawDictionary from '../assets/dictionay.json';

interface Dictionary {
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

const ColumnContainer = styled.div`
  flex: 1;
  background-color: #f4f5f7;
  border: 1px dashed #aaa;
  border-radius: 4px;
  padding: 8px;
  min-height: 400px;
`;

const ColumnTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

interface ColumnProps {
  statusId: number;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const Column: React.FC<ColumnProps> = ({ statusId, tasks, onEdit, onDelete }) => {
  const statusTitle = dictionary.statuses[statusId.toString()];
  return (
    <Droppable
      droppableId={statusId.toString()}
      isDropDisabled={false}
      isCombineEnabled={false}
      ignoreContainerClipping={false}
    >
      {(provided: any) => {
        // Фильтруем свойство ignoreContainerClipping, чтобы оно не попадало в DOM
        const { ignoreContainerClipping, ...droppableProps } = provided.droppableProps;
        return (
          <ColumnContainer ref={provided.innerRef} {...droppableProps}>
            <ColumnTitle>{statusTitle}</ColumnTitle>
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </ColumnContainer>
        );
      }}
    </Droppable>
  );
};

export default Column;
