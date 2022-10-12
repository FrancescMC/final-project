<template>
  <div class="card-wrapper">
    <div v-if="task.is_complete" class="card completed-card">
      <input
        v-model="taskTitle"
        type="text"
        id="newTaskTitle"
        :placeholder="props.task.title"
        size="28"
        disabled
      />
      <textarea
        v-model="taskDescription"
        type="text"
        id="taskDescription"
        :placeholder="props.task.description"
        spellcheck="false"
        cols="30"
        rows="10"
        disabled
      ></textarea>
      <div class="card-buttons">
        <button class="card-button">
          <img
            class="logo-img disabled-logo"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665571884/Ironhack-ToDo-Vue/save_ocolmn.svg"
            alt="save-logo"
          />
        </button>
        <button class="card-button">
          <img
            class="logo-img disabled-logo"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665472914/Ironhack-ToDo-Vue/trashcan_mw4ep7.svg"
            alt="trashcan logo"
          />
        </button>
        <button @click="completeTask" class="card-button">
          <img
            class="logo-img"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665572495/Ironhack-ToDo-Vue/cross_n7bvqn.svg"
            alt="uncompletetask-logo"
          />
        </button>
      </div>
    </div>
    <div v-else class="card un-completed-card">
      <input
        v-model="taskTitle"
        type="text"
        id="newTaskTitle"
        :placeholder="props.task.title"
        size="28"
      />
      <textarea
        v-model="taskDescription"
        type="text"
        id="taskDescription"
        :placeholder="props.task.description"
        spellcheck="false"
        cols="30"
        rows="10"
      ></textarea>
      <div class="card-buttons">
        <button @click="updateTask" class="card-button">
          <img
            class="logo-img"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665571884/Ironhack-ToDo-Vue/save_ocolmn.svg"
            alt="save-logo"
          />
        </button>
        <button @click="deleteTask" class="card-button">
          <img
            class="logo-img"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665472914/Ironhack-ToDo-Vue/trashcan_mw4ep7.svg"
            alt="trashcan logo"
          />
        </button>
        <button @click="completeTask" class="card-button">
          <img
            class="logo-img"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665472914/Ironhack-ToDo-Vue/check_bdgd2l.svg"
            alt="completetask-logo"
          />
        </button>
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
  "deleteAllTaskChildren",
]);
// actualizar tareas
const updateTask = () => {
  emit(
    "updateTaskChildren",
    props.task.id,
    taskTitle.value,
    taskDescription.value
  );
};
// borrar tareas
const deleteTask = () => {
  emit("deleteTaskChildren", props.task.id);
};
// borrar todas las tareas

// completar tareas
const completeTask = () => {
  emit("completeTaskChildren", props.task.id, props.task.is_complete);
};
</script>

<style>
.logo-img {
  width: 100%;
}
</style>
