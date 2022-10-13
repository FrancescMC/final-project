<template>
  <div class="nav-bar">
    <Nav />
  </div>

  <main class="main-tasks-wrapper">
    <div class="new-task-wrapper">
      <NewTask @createTaskChildren="createTaskFather" />
      <div class="filter-button-wrapper">
        <button class="filter-button" @click="showAll">
          show all ({{ tasksData.length }})
        </button>
        <button class="filter-button" @click="showUnComplete">
          show uncompleted ({{ tasksUnCompleted.length }})
        </button>
        <button class="filter-button" @click="showComplete">
          show completed ({{ tasksCompleted.length }})
        </button>
      </div>
    </div>
    <div class="delete-button-mobile">
      <Button @buttonActivation="deleteAllTaskFather" />
    </div>
    <div class="delete-button-desktop">
      <Button @buttonActivation="deleteAllTaskFather" />
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
  </main>

  <div class="footer">
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from "vue";
import TaskItem from "../components/TaskItem.vue";
import { useTaskStore } from "../stores/task";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
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
.nav-bar {
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #aec3b0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  height: 40px;
  padding: 5px 0;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
.nav-logo {
  color: #124559;
  display: flex;
  align-items: center;
  font-size: 1.3em;
  font-weight: 500;
}
.new-task-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 10px;
}
.filter-button {
  background-color: inherit;
  border-style: none;
  padding: 10px;
}

.filter-button-wrapper {
  display: flex;
}
.main-tasks-wrapper {
  display: flex;
  flex-direction: column;
  margin: 30px 20px;
}
.footer {
  font-weight: bold;
  background-color: #aec3b0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: 40px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
.cards-wrapper {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.card {
  width: 280px;
  background-color: #aec3b0;
  border-radius: 7px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10px;
  position: relative;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}
@media (min-width: 700px) {
  .card {
    width: 320px;
  }
}
.completed-card {
  opacity: 50%;
  text-decoration: line-through;
}
.active-logo:hover {
  cursor: pointer;
}
.disabled-logo {
  opacity: 30%;
}
.card-text {
  color: #01161e;
}
.description {
  border-radius: 7px;
  border: 1px;
  border-color: #eff6e0;
  border-style: solid;
  padding: 10px;
}
.card-buttons {
  display: flex;
}
.card-button {
  background-color: inherit;
  border-style: none;
  border-radius: 7px;
  width: 50px;
  height: 50px;
}
.card-button:active {
  transform: translate(0px, 1px);
  -webkit-transform: translate(0px, 1px);
}
.logo-img {
  width: 96%;
  padding: 4%;
}
.logo-img:hover {
  padding: 0;
  width: 100%;
}
</style>
