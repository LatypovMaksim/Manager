<template>
  <div class="bg-white shadow-lg rounded-lg p-6 mb-6">
    <h2 class="text-2xl font-bold mb-4 text-center">Список задач</h2>
    
    <!-- Список фильтров -->
    <ul class="flex justify-center space-x-4 mb-4">
      <li>
        <button @click="setFilter('all')" class="bg-gray-200 px-4 py-2 rounded" :class="{ 'bg-blue-500 text-white': filter === 'all' }">Все задачи</button>
      </li>
      <li>
        <button @click="setFilter('completed')" class="bg-gray-200 px-4 py-2 rounded" :class="{ 'bg-blue-500 text-white': filter === 'completed' }">Только выполненные</button>
      </li>
      <li>
        <button @click="setFilter('incomplete')" class="bg-gray-200 px-4 py-2 rounded" :class="{ 'bg-blue-500 text-white': filter === 'incomplete' }">Только невыполненные</button>
      </li>
    </ul>

    <ul>
      <li v-for="task in filteredTasks" :key="task.id" class="bg-gray-100 rounded-lg p-4 mb-4 shadow-md transition-transform transform hover:scale-105 cursor-pointer" @click="openModal(task)">
        <div class="flex justify-between items-center">
          <div class="flex-1">
            <span :class="{ 'line-through text-gray-400': task.completed }" class="text-lg font-semibold">{{ task.title }}</span>
            <p class="text-gray-600 mt-1 line-clamp-2">{{ task.description }}</p>
          </div>
          <div class="flex space-x-2">
            <button 
              @click.stop="toggleCompletion(task.id)" 
              class="text-white px-2 py-1 rounded transition duration-200" 
              :class="{ 'bg-gray-300': task.completed, 'bg-green-500 hover:bg-green-600': !task.completed }"
            >
              Сделано
            </button>
            <button @click.stop="editTask(task.id)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200">Редактировать</button>
            <button @click.stop="deleteTask(task.id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200">Удалить</button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Модальное окно для просмотра задачи -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-11/12 max-w-lg max-h-96 overflow-y-auto">
        <h3 class="text-xl font-bold mb-2">{{ selectedTask.title }}</h3>
        <p class="text-gray-700 mb-4">{{ selectedTask.description }}</p>
        <div class="flex justify-end">
          <button @click="closeModal" class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore';

export default {
  data() {
    return {
      filter: 'all', // Устанавливаем начальный фильтр
      isModalOpen: false, // Состояние модального окна
      selectedTask: {}, // Выбранная задача для просмотра
    };
  },
  computed: {
    filteredTasks() {
      const store = useTaskStore();
      if (this.filter === 'completed') {
        return store.tasks.filter(task => task.completed);
      } else if (this.filter === 'incomplete') {
        return store.tasks.filter(task => !task.completed);
      }
      return store.tasks; // Возвращаем все задачи
    },
  },
  methods: {
    setFilter(newFilter) {
      this.filter = newFilter; // Устанавливаем новый фильтр
    },
    openModal(task) {
      this.selectedTask = task; // Устанавливаем выбранную задачу
      this.isModalOpen = true; // Открываем модальное окно
    },
    closeModal() {
      this.isModalOpen = false; // Закрываем модальное окно
    },
    toggleCompletion(taskId) {
      const store = useTaskStore();
      store.toggleTaskCompletion(taskId);
    },
    deleteTask(taskId) {
      const store = useTaskStore();
      store.deleteTask(taskId);
    },
    editTask(taskId) {
      const store = useTaskStore();
      const task = store.tasks.find(task => task.id === taskId);
      const newTitle = prompt('Введите новое название', task.title);
      const newDescription = prompt('Введите новое описание', task.description);
      if (newTitle && newDescription) {
        store.editTask(taskId, newTitle, newDescription);
      }
    },
  },
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}

/* Обрезка текста с многоточием */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Количество строк для отображения */
  overflow: hidden;
}
</style>