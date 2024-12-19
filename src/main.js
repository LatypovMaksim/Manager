import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './assets/main.css'; // Импортируем стили

const app = createApp(App);
app.use(createPinia()); // Подключаем Pinia
app.mount('#app');