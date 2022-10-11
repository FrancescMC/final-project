<template>
  <div class="nav-bar">
    <Nav />
  </div>
  <Button @buttonActivation="deleteAllTaskFather" />
  <div class="new-task-wrapper">
    <h3>create a new card</h3>
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
</style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function needs to be called within the setUp script in order to run within the first instance of this component lifecycle.
5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask Component. 
7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function mentioned on hint4.
7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.
-->
