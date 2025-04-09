// src/components/TaskCard.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Task } from '../store/tasksSlice';
import rawDictionary from '../assets/dictionay.json';

// Иконки
import CircleIcon from '../assets/Circle Icon.svg';
import TrashIcon from '../assets/trash-2.svg';

interface Dictionary {
  assignees: Record<string, string>;
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

// ========== styled-components ==========

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

const DeleteIcon = styled.img`
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
      case 0: return '#36B38E';  // Easy
      case 1: return '#FFAB00';  // Medium
      case 2: return '#DE350B';  // High
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
  color: #fff;
  margin-left: 8px;
  background-color: ${({ statusId }) => {
    switch (statusId) {
      case 0: return '#0052CC'; // В ожидании
      case 1: return '#00875A'; // В работе
      case 2: return '#FFAB00'; // Тестирование
      case 3: return '#0747A6'; // Готово
      default: return '#777';
    }
  }};
`;

const Description = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

// =======================================

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// Форматирует дату в M/D/YY, например "4/4/25"
const formatDate = (dateString: string): string => {
  const d = new Date(dateString);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const yy = d.getFullYear().toString().slice(-2);
  return `${m}/${day}/${yy}`;
};

// Получаем текстовый лейбл приоритета
const getPriorityLabel = (priorityId: number): string => {
  switch (priorityId) {
    case 0: return 'Easy';
    case 1: return 'Medium';
    case 2: return 'High';
    default: return 'Unknown';
  }
};

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
          {/* 1. Заголовок */}
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

          {/* 2. Исполнитель и дата */}
          <AssignmentRow>
            <span>{assignee}</span>
            <span>{formatDate(task.dueDate)}</span>
          </AssignmentRow>

          {/* 3. Уровень сложности и 4. Статус */}
          <BadgesRow>
            <DifficultyBadge priorityId={priorityId}>
              {getPriorityLabel(priorityId)}
            </DifficultyBadge>
            <StatusBadge statusId={statusId}>
              {statusLabel}
            </StatusBadge>
          </BadgesRow>

          {/* 5. Описание */}
          <Description>{task.description}</Description>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
