<template>
  <div class="card-wrapper">
    <div class="card">
      <input
        v-model="taskTitle"
        type="text"
        id="newTaskTitle"
        :placeholder="props.task.title"
      />
      <p>{{ task.is_complete ? "✔" : "❌" }}</p>
      <!-- <h3 class="card-text card-title">
        {{ task.title }} {{ task.is_complete ? "✔" : "❌" }}
      </h3> -->
      <input
        v-model="taskDescription"
        type="text"
        id="taskDescription"
        :placeholder="props.task.description"
      />
      <!-- <p class="card-text description">{{ task.description }}</p> -->

      <div class="card-buttons">
        <button @click="updateTask" class="card-button">EDIT</button>
        <button @click="deleteTask" class="card-button">DELETE</button>
        <button @click="toggleTask" class="card-button">🐸</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const taskTitle = ref(props.task.title);
const taskDescription = ref(props.task.description);
// definimos props
const props = defineProps(["task"]);
// defino los emits
const emit = defineEmits([
  "deleteTaskChildren",
  "completeTaskChildren",
  "unCompleteTaskChildren",
  "updateTaskChildren",
]);
// actualizar tareas
const updateTask = () => {
  emit(
    "updateTaskChildren",
    props.task.id,
    taskTitle.value,
    taskDescription.value
  );
  // borrar tareas
  const deleteTask = () => {
    emit("deleteTaskChildren", props.task.id);
  };

  // completar tareas
  const completeTask = () => {
    emit("completeTaskChildren", props.task.id);
  };
  // marcar tareas como incompletas
  const unCompleteTask = () => {
    emit("unCompleteTaskChildren", props.task.id);
  };
};
// función para cambiar de completo a incompleto
const toggleTask = () => {
  const toggledTask = ref(!props.task.is_complete);
  toggledTask.value ? completeTask() : unCompleteTask();
  console.log(toggledTask.value);
};
</script>

<style></style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
<!--  -->

<!-- f25b6b5a-3e25-4d2c-850f-85f8cfef8365 -->
