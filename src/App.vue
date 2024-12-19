<template>
  <div class="container mx-auto p-4">
    <AddTask />
    <TaskList />
  </div>
</template>

<script>
import AddTask from './components/AddTask.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    AddTask,
    TaskList,
  },
};
</script>