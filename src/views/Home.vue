<template>
  <div class="nav-bar">
    <Nav />
  </div>
  <DeleteAll @deleteAllTaskChildren="deleteAllTaskFather" />
  <div class="new-task-wrapper">
    <h3>create a new card</h3>
    <NewTask @createTaskChildren="createTaskFather" />
    <button @click="showComplete">showComplete</button>
  </div>
  <div><Filters @showCompleteTaskChildren="showCompleteTaskFather" /></div>
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
import DeleteAll from "../components/DeleteAll.vue";
import Filters from "../components/Filters.vue";

// nos definimos una variable para simplificar el uso de la store, que es lo equivale a la store como tal mediante un método para poder usar lo que contiene dentro.
const taskStore = useTaskStore();
onMounted(async () => {
  getTasks();
});

const tasksArray = ref([]);
const tasksData = ref([]);

async function getTasks() {
  tasksData.value = await taskStore.fetchTasks();
  tasksArray.value = await taskStore.fetchTasks();
}

async function showComplete() {
  console.log("hola");
  console.log(tasksArray);
  tasksArray.value = tasksArray.value.filter(
    (task) => task.is_complete === true
  );
}

// filters
// showNotCompleted() {
//       this.componentToDos = this.toDos;
//       this.componentToDos = this.componentToDos.filter(
//         (toDo: any) => toDo.completed !== true
//       );
// }

// declarando la función asíncrona que se encargará de borrar una tarea en supabase
const deleteTaskFather = async (taskId) => {
  await taskStore.deleteTask(taskId);
  taskStore.fetchTasks();
};
// declarando la función asíncrona que se encargará de borrar todas las tareas a la vez
const deleteAllTaskFather = async () => {
  await taskStore.deleteAllTask();
  taskStore.fetchTasks();
};
// declarando la función asíncrona que se encargará de marcar como completa una tarea en supabase
const completeTaskFather = async (taskId, bool) => {
  await taskStore.completeTask(taskId, bool);
  getTasks();
};

// declarando la función asíncrona que se encargará de enviar una tarea a supabase

const createTaskFather = async (title, description) => {
  await taskStore.addTask(title, description);
  taskStore.fetchTasks();
};
// declarando la función asíncrona que actualiza la tarea.
const updateTaskFather = async (id, title, description) => {
  await taskStore.updateTask(id, title, description);
  taskStore.fetchTasks();
};

// funciones de filtrado

// mostrar los completados
const showCompleteTaskFather = async (is_complete) => {
  await taskStore.showComplete(is_complete);
};

console.log(taskStore.fetchTasks());
</script>

<style></style>

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
