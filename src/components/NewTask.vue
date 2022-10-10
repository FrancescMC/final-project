<template>
  <div class="card-wrapper">
    <div class="card">
      <input
        v-model="taskTitle"
        type="text"
        id="newTaskTitle"
        placeholder="Title"
      />
      <input
        v-model="taskDescription"
        type="text"
        id="taskDescription"
        placeholder="Description"
      />
      <div class="card-buttons">
        <button @click="createTask" class="card-button">Create</button>
      </div>
      <div>
        <h3 v-if="errorBoolean">{{ emptyString }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// definimos props
const props = defineProps(["task"]);
// define emit
const emit = defineEmits(["createTaskChildren", "deleteAllTaskChildren"]);
// borrar todas las tareas
// const deleteAllTask = () => {
//   emit("deleteAllTaskChildren", props.task.user_id);
// };
// variables for the parts that will be introduced by the user
const taskTitle = ref("");
const taskDescription = ref("");
// ??
const errorBoolean = ref("");

const emptyString = ref("");
// function that we will call to introduce a new task
// const createTask = () => {
//   const error = taskTitle.value === "";
//   try {
//     emit("createTaskChildren", taskTitle.value, taskDescription.value);
//     taskTitle.value = "";
//     taskDescription.value = "";
//   } catch (error) {
//     console.log(error);
//     errorBoolean.value = true;
//     emptyString.value = "title is required.";
//     setTimeout(() => {
//       errorBoolean.value = false;
//     }, 1000);
//   }
// };
const createTask = () => {
  if (taskTitle.value === "") {
    errorBoolean.value = true;
    emptyString.value = "title is required.";
    setTimeout(() => {
      errorBoolean.value = false;
    }, 1000);
  } else {
    emit("createTaskChildren", taskTitle.value, taskDescription.value);
    taskTitle.value = "";
    taskDescription.value = "";
  }
};

// constant to save a variable that define the custom event that will be emitted to the homeView

// constant to save a variable that holds the value of the title input field of the new task

// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>

<style></style>
