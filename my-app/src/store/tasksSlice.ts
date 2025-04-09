// src/store/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  taskName: string;
  description: string;
  dueDate: string;
  assigneeId: number;
  priorityId: number;
  statusId: number;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    changeTaskStatus(state, action: PayloadAction<{ id: string; statusId: number }>) {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.statusId = action.payload.statusId;
      }
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, changeTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
