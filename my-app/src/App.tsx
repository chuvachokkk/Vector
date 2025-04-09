// src/App.tsx
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import KanbanBoard from './components/KanbanBoard';
import { store } from './store/store';
import { setTasks, deleteTask } from './store/tasksSlice';
import data from './assets/data.json';
import styled, { createGlobalStyle } from 'styled-components';

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

  useEffect(() => {
    const tasksWithId = data.map((task: any, index: number) => ({
      id: task.id ? String(task.id) : (index + 1).toString(),
      ...task,
    }));
    dispatch(setTasks(tasksWithId));
  }, [dispatch]);

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <h1>Задачи</h1>
      <KanbanBoard onDeleteTask={handleDeleteTask} />
    </AppContainer>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
