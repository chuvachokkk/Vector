import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Column from './Column';
import { RootState } from '../store/store';
import {
  addTask,
  changeTaskStatus,
  updateTask,
  Task,
} from '../store/tasksSlice';
import styled from 'styled-components';
import rawDictionary from '../assets/dictionay.json';
import { InlineTaskData } from './InlineAddTaskCard';

interface Dictionary {
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

const statuses = Object.keys(dictionary.statuses).map(Number);

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
`;

const ProgressWrapper = styled.div`
  position: relative;
  margin: 16px;
  height: 16px;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background-color: #0052cc;
  transition: width 0.3s ease;
`;

const ProgressLabel = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  text-align: center;
  font-size: 12px;
  color: #333;
  line-height: 16px;
`;

interface KanbanBoardProps {
  onDeleteTask: (id: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ onDeleteTask }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const tasksByStatus = statuses.reduce(
    (acc: Record<number, Task[]>, status) => {
      acc[status] = tasks.filter((t) => t.statusId === status);
      return acc;
    },
    {} as Record<number, Task[]>
  );

  const doneCount = tasksByStatus[3]?.length || 0;
  const totalCount = tasks.length;
  const percentDone = totalCount
    ? Math.round((doneCount / totalCount) * 100)
    : 0;

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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {statuses.map((status) => (
            <Column
              key={status}
              statusId={status}
              tasks={tasksByStatus[status] || []}
              onDelete={onDeleteTask}
              onAdd={(data: InlineTaskData) => {
                const newTask: Task = {
                  id: Date.now().toString(),
                  taskName: data.description || 'Новая задача',
                  description: data.description,
                  dueDate: data.dueDate,
                  assigneeId: Number(data.assigneeId),
                  priorityId: Number(data.priorityId),
                  statusId: status,
                };
                dispatch(addTask(newTask));
              }}
              onUpdate={(updated: Task) => {
                dispatch(updateTask(updated));
              }}
            />
          ))}
        </Container>
      </DragDropContext>

      <ProgressWrapper>
        <ProgressBar percent={percentDone} />
        <ProgressLabel>{percentDone}%</ProgressLabel>
      </ProgressWrapper>
    </>
  );
};

export default KanbanBoard;
