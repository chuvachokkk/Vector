// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import KanbanBoard from './components/KanbanBoard';
import { store } from './store/store';
import { setTasks, addTask, updateTask, deleteTask } from './store/tasksSlice';
import AddEditTaskForm from './components/AddEditTaskForm';
import data from './assets/data.json';
import styled, { createGlobalStyle } from 'styled-components';
import { Task } from './store/tasksSlice';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    background: #e5e5e5;
  }
`;

const AppContainer = styled.div`
  padding: 16px;
`;

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<null | Task>(null);

  useEffect(() => {
    // При загрузке добавляем id, если его нет — используем стабильное значение (индекс или существующий id)
    const tasksWithId = data.map((task: any, index: number) => ({
      id: task.id ? String(task.id) : (index + 1).toString(),
      ...task,
    }));
    dispatch(setTasks(tasksWithId));
  }, [dispatch]);

  const handleAddTask = (formData: any) => {
    const newTask: Task = {
      id: Date.now().toString(),
      taskName: formData.taskName,
      description: formData.description,
      dueDate: formData.dueDate,
      assigneeId: Number(formData.assigneeId),
      priorityId: Number(formData.priorityId),
      statusId: Number(formData.statusId),
    };
    dispatch(addTask(newTask));
    setShowForm(false);
  };

  const handleUpdateTask = (formData: any) => {
    if (!editingTask) return;
    const updatedTask: Task = {
      ...editingTask,
      taskName: formData.taskName,
      description: formData.description,
      dueDate: formData.dueDate,
      assigneeId: Number(formData.assigneeId),
      priorityId: Number(formData.priorityId),
      statusId: Number(formData.statusId),
    };
    dispatch(updateTask(updatedTask));
    setEditingTask(null);
    setShowForm(false);
  };

  const onSubmit = (formData: any) => {
    if (editingTask) {
      handleUpdateTask(formData);
    } else {
      handleAddTask(formData);
    }
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <h1>Kanban Board Demo</h1>
      <button onClick={() => { setEditingTask(null); setShowForm(true); }}>
        Add Task
      </button>
      {showForm && (
        <AddEditTaskForm
          task={editingTask || undefined}
          onSubmit={onSubmit}
        />
      )}
      <KanbanBoard
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </AppContainer>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
