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
        size="100%"
      />
      <div class="card-buttons">
        <button @click="createTask" class="card-button">
          <img
            class="active-logo logo-img"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665577389/Ironhack-ToDo-Vue/add2_yhhwjj.svg"
            alt=""
          />
        </button>
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
const errorBoolean = ref("");

const emptyString = ref("");

// function that we will call to introduce a new task

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
</script>

<style></style>
