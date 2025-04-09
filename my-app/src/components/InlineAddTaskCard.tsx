import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import CircleIcon from '../assets/Circle Icon.svg';
import TrashIcon from '../assets/trash-2.svg';
import rawDictionary from '../assets/dictionay.json';
import { ColumnLozenge } from '../styles/LozengeStyles';

interface Dictionary {
  assignees: Record<string, string>;
  priorities: Record<string, string>;
  statuses: Record<string, string>;
}
const dictionary = rawDictionary as Dictionary;

export interface InlineTaskData {
  assigneeId: string;
  dueDate: string;
  priorityId: string;
  description: string;
}

interface Props {
  statusId: number;
  onSubmit: (data: InlineTaskData) => void;
  onCancel: () => void;
}

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
  margin-bottom: 8px;

  img {
    width: 16px;
    height: 16px;
  }

  .task-icon {
    margin-right: 8px;
  }

  .cancel-icon {
    margin-left: auto;
    cursor: pointer;
  }
`;

const FormList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`;

const FormItem = styled.li`
  margin-bottom: 8px;

  input,
  select,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  input::placeholder,
  textarea::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #0052cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

export const InlineAddTaskCard: React.FC<Props> = ({ statusId, onSubmit, onCancel }) => {
  const { register, handleSubmit } = useForm<InlineTaskData>();

  return (
    <Card>
      <TitleRow>
        <img className="task-icon" src={CircleIcon} alt="New task" />
        <strong>Новая задача</strong>
        <img
          className="cancel-icon"
          src={TrashIcon}
          alt="Cancel"
          onClick={onCancel}
        />
      </TitleRow>
      <ColumnLozenge $statusId={statusId}>
        {dictionary.statuses[statusId.toString()]}
      </ColumnLozenge>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormList>
          <FormItem>
            <select {...register('assigneeId', { required: true })} defaultValue="">
              <option value="" disabled>Добавить ответственного</option>
              {Object.entries(dictionary.assignees).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </FormItem>

          <FormItem>
            <input
              type="date"
              {...register('dueDate', { required: true })}
            />
          </FormItem>

          <FormItem>
            <select {...register('priorityId', { required: true })} defaultValue="">
              <option value="" disabled>Добавить приоритет</option>
              {Object.entries(dictionary.priorities).map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </FormItem>

          <FormItem>
            <textarea
              rows={2}
              placeholder="Добавить описание"
              {...register('description')}
            />
          </FormItem>
        </FormList>

        <SubmitButton type="submit">Создать задачу</SubmitButton>
      </form>
    </Card>
);
};
