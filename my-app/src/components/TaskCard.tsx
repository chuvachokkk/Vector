import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Task } from '../store/tasksSlice';
import rawDictionary from '../assets/dictionay.json';

import iconWaiting    from '../assets/zap.svg';
import iconInProgress from '../assets/notepad-text.svg';
import iconTesting    from '../assets/calendar-clock.svg'
import iconDone       from '../assets/notepad-text1.svg';

import CircleIcon from '../assets/Circle Icon.svg';
import TrashIcon  from '../assets/trash-2.svg';

interface Dictionary {
  assignees: Record<string, string>;
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;


const Card = styled.div`
  background:rgb(236, 236, 236);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

const TaskTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 19px;
  margin: 0;

  img.task-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

const DeleteIcon = styled.img`
  margin-left: auto;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const AssignmentRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #888;
  margin: 8px 0;
`;

const BadgesRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const DifficultyBadge = styled.div<{ priorityId: number }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: ${({ priorityId }) => {
    switch (priorityId) {
      case 0: return '#36B37E';
      case 1: return '#FFAB00';
      case 2: return '#DE350B';
      default: return '#777';
    }
  }};
`;

const StatusBadge = styled.div<{ statusId: number }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  color: gray;
  margin-left: 8px;
  background-color: ${({ statusId }) => {
    switch (statusId) {
      case 0: return '#D4F7F3';
      case 1: return '#F7F5D4';
      case 2: return '#E7D4F7';
      case 3: return '#D4E0F7';
      default: return '#777';
    }
  }};

  img {
    width: 19px;
    height: 19px;
    margin-right: 8px;
  }
`;

const Description = styled.p`
  font-size: 17px;
  color: #333;
  margin: 0;
`;

const formatDate = (dateString: string): string => {
  const d = new Date(dateString);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const yy = d.getFullYear().toString().slice(-2);
  return `${m}/${day}/${yy}`;
};

const getPriorityLabel = (priorityId: number): string => {
  switch (priorityId) {
    case 0: return 'Easy';
    case 1: return 'Medium';
    case 2: return 'High';
    default: return 'Unknown';
  }
};

const statusIcons: Record<number, string> = {
  0: iconWaiting,
  1: iconInProgress,
  2: iconTesting,
  3: iconDone,
};

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
  const assignee = dictionary.assignees[task.assigneeId.toString()];
  const priorityId = task.priorityId;
  const statusId = task.statusId;
  const statusLabel = dictionary.statuses[statusId.toString()];

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: any) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TitleRow>
            <TaskTitle>
              <img className="task-icon" src={CircleIcon} alt="Task" />
              {task.taskName}
            </TaskTitle>
            <DeleteIcon
              src={TrashIcon}
              alt="Delete"
              onClick={e => { e.stopPropagation(); onDelete(task.id); }}
            />
          </TitleRow>
          <AssignmentRow>
            <span>{assignee}</span>
            <span>{formatDate(task.dueDate)}</span>
          </AssignmentRow>
          <BadgesRow>
            <DifficultyBadge priorityId={priorityId}>
              {getPriorityLabel(priorityId)}
            </DifficultyBadge>
            <StatusBadge statusId={statusId}>
              <img src={statusIcons[statusId]} alt={statusLabel} />
              {statusLabel}
            </StatusBadge>
          </BadgesRow>
          <Description>{task.description}</Description>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
