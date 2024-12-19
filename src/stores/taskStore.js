import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [], // Загружаем задачи из localStorage
  }),
  actions: {
    addTask(title, description) {
      const newTask = { id: Date.now(), title, description, completed: false };
      this.tasks.push(newTask);
      this.saveTasks(); // Сохраняем задачи в localStorage
    },
    toggleTaskCompletion(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks(); // Сохраняем изменения в localStorage
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasks(); // Сохраняем изменения в localStorage
    },
    editTask(taskId, newTitle, newDescription) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.title = newTitle;
        task.description = newDescription;
        this.saveTasks(); // Сохраняем изменения в localStorage
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Сохраняем задачи в localStorage
    },
  },
});