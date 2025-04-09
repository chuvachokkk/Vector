import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Task } from '../store/tasksSlice';
import dictionary from '../assets/dictionay.json';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

interface FormData {
  taskName: string;
  description: string;
  dueDate: string;
  assigneeId: string;
  priorityId: string;
  statusId: string;
}

interface AddEditTaskFormProps {
  task?: Task;
  onSubmit: (data: FormData) => void;
}

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({ task, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: task
      ? {
          taskName: task.taskName,
          description: task.description,
          dueDate: task.dueDate,
          assigneeId: task.assigneeId.toString(),
          priorityId: task.priorityId.toString(),
          statusId: task.statusId.toString(),
        }
      : { statusId: "0" },
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('taskName', { required: 'Название задачи обязательно' })}
        placeholder="Название задачи"
      />
      {errors.taskName && <span>{errors.taskName.message}</span>}
      <textarea {...register('description')} placeholder="Описание задачи" />
      <input
        {...register('dueDate', { required: 'Дата обязательна' })}
        type="date"
        placeholder="Срок"
      />
      <select {...register('assigneeId', { required: 'Выберите ответственного' })}>
        {Object.entries(dictionary.assignees).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <select {...register('priorityId', { required: 'Выберите приоритет' })}>
        {Object.entries(dictionary.priorities).map(([id, label]) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <select {...register('statusId', { required: 'Выберите статус' })}>
        {Object.entries(dictionary.statuses).map(([id, label]) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <button type="submit">{task ? 'Обновить задачу' : 'Добавить задачу'}</button>
    </FormContainer>
  );
};

export default AddEditTaskForm;
