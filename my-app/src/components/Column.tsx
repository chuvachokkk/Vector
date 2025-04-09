import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import TaskCard from './TaskCard';
import { InlineAddTaskCard, InlineTaskData } from './InlineAddTaskCard';
import { Task } from '../store/tasksSlice';
import rawDictionary from '../assets/dictionay.json';
import { ColumnLozenge } from '../styles/LozengeStyles';

import iconWaiting    from '../assets/zap.svg';
import iconInProgress from '../assets/notepad-text.svg';
import iconTesting    from '../assets/calendar-clock.svg';
import iconDone       from '../assets/notepad-text1.svg';

interface Dictionary {
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

const ColumnContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  background-color: #f4f5f7;
  border: 1px dashed #aaa;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  min-height: 400px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-bottom: 8px;
`;

const CountBadge = styled.span`
  display: inline-block;
  min-width: 24px;
  padding: 2px 6px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 12px;
  font-size: 12px;
  color: #333;
`;


const softColors = ['#D4F7F3', '#F7F5D4', '#E7D4F7', '#D4E0F7'];
const mainColors = ['rgb(61, 61, 61)', 'rgb(61, 61, 61)', 'rgb(61, 61, 61)', 'rgb(61, 61, 61)'];

const NewTaskButton = styled.button<{ $statusId: number }>`
  margin-top: auto;
  align-self: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ $statusId }) => mainColors[$statusId]};
  background-color: ${({ $statusId }) => softColors[$statusId]};
  border: 2px solid ${({ $statusId }) => mainColors[$statusId]};
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${({ $statusId }) => 
      softColors[$statusId].replace(/0\.1\)$/, '0.2)')};
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const statusIcons: Record<number, string> = {
  0: iconWaiting,
  1: iconInProgress,
  2: iconTesting,
  3: iconDone,
};

interface ColumnProps {
  statusId: number;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAdd: (data: InlineTaskData) => void;
}

const Column: React.FC<ColumnProps> = ({
  statusId,
  tasks,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const title = dictionary.statuses[statusId.toString()];

  const handleAdd = (data: InlineTaskData) => {
    onAdd(data);
    setIsAdding(false);
  };

  return (
    <Droppable droppableId={statusId.toString()}>
      {(provided: any) => (
        <ColumnContainer ref={provided.innerRef} {...provided.droppableProps}>
          <TitleWrapper>
            <ColumnLozenge $statusId={statusId}>
              <img src={statusIcons[statusId]} alt={title} />
              {title}
            </ColumnLozenge>
            <CountBadge>{tasks.length}</CountBadge>
          </TitleWrapper>

          {isAdding && (
            <InlineAddTaskCard
              statusId={statusId}
              onSubmit={handleAdd}
              onCancel={() => setIsAdding(false)}
            />
          )}

          {tasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              task={task}
              index={idx}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          {provided.placeholder}

          {!isAdding && (
            <NewTaskButton $statusId={statusId} onClick={() => setIsAdding(true)}>
              + Новая задача
            </NewTaskButton>
          )}
        </ColumnContainer>
      )}
    </Droppable>
  );
};

export default Column;
