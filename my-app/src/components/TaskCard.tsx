import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Task } from '../store/tasksSlice';
import rawDictionary from '../assets/dictionay.json';
import AddEditTaskForm from './AddEditTaskForm';

import iconWaiting    from '../assets/zap.svg';
import iconInProgress from '../assets/notepad-text.svg';
import iconTesting    from '../assets/calendar-clock.svg';
import iconDone       from '../assets/notepad-text1.svg';
import CircleIcon     from '../assets/Circle Icon.svg';
import TrashIcon      from '../assets/trash-2.svg';

interface Dictionary {
  assignees: Record<string, string>;
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

const Card = styled.div`
  background: #ffffff;
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
  font-size: 16px;
  margin: 0;

  img.task-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

const IconButton = styled.img`
  margin-left: auto;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const AssignmentRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #555;
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
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`;

const Description = styled.p`
  font-size: 14px;
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


const priorityLabels = ['Low','Medium','High'];


const statusIcons = [iconWaiting, iconInProgress, iconTesting, iconDone];

interface TaskCardProps {
  task: Task;
  index: number;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (data: any) => {
    onUpdate({ ...task,
      taskName: data.taskName,
      description: data.description,
      dueDate: data.dueDate,
      assigneeId: Number(data.assigneeId),
      priorityId: Number(data.priorityId),
      statusId: Number(data.statusId),
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card>
        <AddEditTaskForm task={task} onSubmit={handleSubmit} />
      </Card>
    );
  }

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
            <IconButton
              src={TrashIcon}
              alt="Delete"
              onClick={e => { e.stopPropagation(); onDelete(task.id); }}
            />
            <IconButton
              src={CircleIcon}
              alt="Edit"
              onClick={e => { e.stopPropagation(); setIsEditing(true); }}
            />
          </TitleRow>

          <AssignmentRow>
            <span>{dictionary.assignees[task.assigneeId.toString()]}</span>
            <span>{formatDate(task.dueDate)}</span>
          </AssignmentRow>

          <BadgesRow>
            <DifficultyBadge priorityId={task.priorityId}>
              {priorityLabels[task.priorityId]}
            </DifficultyBadge>
            <StatusBadge statusId={task.statusId}>
              <img src={statusIcons[task.statusId]} alt="" />
              {dictionary.statuses[task.statusId.toString()]}
            </StatusBadge>
          </BadgesRow>

          <Description>{task.description}</Description>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
