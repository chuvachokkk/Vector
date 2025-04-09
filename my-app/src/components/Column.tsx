// src/components/Column.tsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import TaskCard from './TaskCard';
import { Task } from '../store/tasksSlice';
import rawDictionary from '../assets/dictionay.json';
import { ColumnLozenge } from '../styles/LozengeStyles';

// Импорт SVG-файлов (предполагая, что они находятся в src/assets)
import NotepadIcon from '../assets/blue.svg';
import NotepadIcon1 from '../assets/notepad-text.svg';
import ZapIcon from '../assets/calendar-clock.svg';
import CalendarIcon from '../assets/zap.svg';

interface Dictionary {
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

// Контейнер колонки
const ColumnContainer = styled.div`
  flex: 1;
  background-color: #f4f5f7;
  border: 1px dashed #aaa;
  border-radius: 4px;
  padding: 8px;
  margin: 16px;
  min-height: 400px;
  position: relative;
`;

interface ColumnProps {
  statusId: number;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// Маппинг для SVG-иконок, используя импортированные переменные
const statusIcons: Record<number, string> = {
  0: CalendarIcon,
  1: NotepadIcon1,
  2: ZapIcon,
  3: NotepadIcon,
};

const Column: React.FC<ColumnProps> = ({ statusId, tasks, onEdit, onDelete }) => {
  const statusTitle = dictionary.statuses[statusId.toString()];

  return (
    <Droppable droppableId={statusId.toString()}>
      {(provided: any) => {
        const { ignoreContainerClipping, ...droppableProps } = provided.droppableProps;
        return (
          <ColumnContainer ref={provided.innerRef} {...droppableProps}>
            <ColumnLozenge statusId={statusId}>
              <img src={statusIcons[statusId]} alt={`Icon for status ${statusId}`} />
              {statusTitle}
            </ColumnLozenge>
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
