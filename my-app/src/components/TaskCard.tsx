import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Task } from '../store/tasksSlice';
import rawDictionary from '../assets/dictionay.json';

// Определяем интерфейс для словаря
interface Dictionary {
  assignees: Record<string, string>;
  priorities: Record<string, string>;
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
  const assignee = dictionary.assignees[task.assigneeId.toString()];
  const priority = dictionary.priorities[task.priorityId.toString()];
  const status = dictionary.statuses[task.statusId.toString()];

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: any) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>{task.taskName}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <p>Assignee: {assignee}</p>
          <p>Priority: {priority}</p>
          <p>Status: {status}</p>
          {/* Используем stopPropagation, чтобы клики по кнопкам не мешали DnD */}
          <button onClick={(e) => { e.stopPropagation(); onEdit(task); }}>
            Edit
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>
            Delete
          </button>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
