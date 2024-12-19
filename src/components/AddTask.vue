<template>
  <form @submit.prevent="addTask" class="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-center">Добавить новую задачу</h2>
    <div class="mb-4">
      <input v-model="title" placeholder="Название задачи" 
      class="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" required />
    </div>
    <div class="mb-4">
      <textarea v-model="description" placeholder="Описание задачи" 
      class="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none" rows="4" required></textarea>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full">Добавить задачу</button>
  </form>
</template>

<script>
import { useTaskStore } from '../stores/taskStore';

export default {
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    addTask() {
      const store = useTaskStore();
      store.addTask(this.title, this.description);
      this.title = '';
      this.description = '';
    },
  },
};
</script>

<style scoped>
/* Дополнительные стили для улучшения дизайна */
input, textarea {
  transition: border-color 0.2s;
}

input:focus, textarea:focus {
  border-color: #3b82f6; /* Цвет фокуса */
}

/* Запрет на изменение размера текстового поля */
textarea {
  resize: none; /* Запрет на изменение размера */
}
</style>