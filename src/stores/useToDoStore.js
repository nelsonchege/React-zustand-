import { create } from "zustand";

export const useToDoStore = create((set) => ({
  todos: [],
  addTodos: (todo) => {
    set({ todos: [...todo] });
  },
  deleteAllTodos: () => {
    set({ todos: [] });
  },
  deleteSingleTodo: (id) => {
    set((state) => ({ todos: state.todos.filter((task) => task.id !== id) }));
  },
}));
