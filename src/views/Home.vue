<template>
  <div class="nav-bar">
    <Nav />
  </div>
  <div class="new-task-wrapper">
    <h3>Create a new card</h3>
    <NewTask @createTaskChildren="createTaskFather" />
    <div class="filter-button-wrapper">
      <button class="filter-button" @click="showAll">
        show all ({{ tasksData.length }})
      </button>
      <button class="filter-button" @click="showComplete">
        show completed ({{ tasksCompleted.length }})
      </button>
      <button class="filter-button" @click="showUnComplete">
        show uncompleted ({{ tasksUnCompleted.length }})
      </button>
    </div>
  </div>

  <div class="cards-wrapper">
    <TaskItem
      @deleteTaskChildren="deleteTaskFather"
      @completeTaskChildren="completeTaskFather"
      @updateTaskChildren="updateTaskFather"
      @deleteAllTaskChildren="deleteAllTaskFather"
      v-for="task in tasksArray"
      :task="task"
      :key="task.id"
    />
  </div>
  <div class="delete-button">
    <Button @buttonActivation="deleteAllTaskFather" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from "vue";
import TaskItem from "../components/TaskItem.vue";
import { useTaskStore } from "../stores/task";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import Button from "../components/Button.vue";

// nos definimos una variable para simplificar el uso de la store, que es lo equivale a la store como tal mediante un método para poder usar lo que contiene dentro.
const taskStore = useTaskStore();
const tasksCompleted = ref([]);
const tasksUnCompleted = ref([]);
const tasksArray = ref([]);
const tasksData = ref([]);
onMounted(async () => {
  getTasks();
});

async function getTasks() {
  tasksData.value = await taskStore.fetchTasks();
  tasksArray.value = await taskStore.fetchTasks();
  getTasksCompleted();
  getTasksUnCompleted();
}

// funciones de filtrado
// mostrar todas las tareas
async function showAll() {
  getTasks();
}
// mostrar las tareas completas
async function showComplete() {
  await getTasks();
  tasksArray.value = tasksArray.value.filter(
    (task) => task.is_complete === true
  );
}
// mostrar las tareas incompletas
async function showUnComplete() {
  await getTasks();
  tasksArray.value = tasksArray.value.filter(
    (task) => task.is_complete === false
  );
}

// const tasksCompleted = tasksData._rawValue.filter(
//   (task) => task.is_complete === true
// );
// declarando la función asíncrona que se encargará de borrar una tarea en supabase
const deleteTaskFather = async (taskId) => {
  await taskStore.deleteTask(taskId);
  getTasks();
};
// declarando la función asíncrona que se encargará de borrar todas las tareas a la vez
const deleteAllTaskFather = async () => {
  await taskStore.deleteAllTask();
  getTasks();
};
// declarando la función asíncrona que se encargará de marcar como completa una tarea en supabase
const completeTaskFather = async (taskId, bool) => {
  await taskStore.completeTask(taskId, bool);
  getTasks();
};

// declarando la función asíncrona que se encargará de enviar una tarea a supabase

const createTaskFather = async (title, description) => {
  await taskStore.addTask(title, description);
  getTasks();
};
// declarando la función asíncrona que actualiza la tarea.
const updateTaskFather = async (id, title, description) => {
  await taskStore.updateTask(id, title, description);
  getTasks();
};
// función para sacar un array con las tareas completadas
function getTasksCompleted() {
  tasksCompleted.value = tasksData.value.filter(
    (task) => task.is_complete === true
  );
}

// funcion para sacar un array con las tareas incompletas
function getTasksUnCompleted() {
  tasksUnCompleted.value = tasksData.value.filter(
    (task) => task.is_complete === false
  );
}
// mostrar los completados
// const showCompleteTaskFather = async (is_complete) => {
//   await taskStore.showComplete(is_complete);
// };

console.log(taskStore.fetchTasks());
</script>

<style>
.filter-button {
  background-color: inherit;
  border-style: none;
  padding: 10px;
}
.delete-button {
  display: flex;
  justify-content: center;
}
</style>
