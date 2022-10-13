<template>
  <div class="card-wrapper">
    <div v-if="task.is_complete" class="card completed-card">
      <img
        class="card-plant-logo"
        src="https://res.cloudinary.com/dglwarix0/image/upload/v1665679733/Ironhack-ToDo-Vue/hojassvg_ytcx85.svg"
        alt=""
      />
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
        rows="4"
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
        <button @click="deleteTask" class="card-button">
          <img
            class="logo-img"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665587786/Ironhack-ToDo-Vue/trashcan2_odn0fp.svg"
            alt="trashcan logo"
          />
        </button>
        <button @click="completeTask" class="card-button">
          <img
            class="logo-img active-logo"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665588954/Ironhack-ToDo-Vue/reload_zvhcod.svg"
            alt="uncompletetask-logo"
          />
        </button>
      </div>
    </div>
    <div v-else class="card un-completed-card">
      <img
        class="card-plant-logo"
        src="https://res.cloudinary.com/dglwarix0/image/upload/v1665680224/Ironhack-ToDo-Vue/hojacompuesta2_zxtq6l.svg"
        alt=""
      />
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
        rows="4"
      ></textarea>
      <div class="card-buttons">
        <button @click="updateTask" class="card-button">
          <img
            class="logo-img active-logo"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665571884/Ironhack-ToDo-Vue/save_ocolmn.svg"
            alt="save-logo"
          />
        </button>
        <button @click="deleteTask" class="card-button">
          <img
            class="logo-img active-logo"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665587786/Ironhack-ToDo-Vue/trashcan2_odn0fp.svg"
            alt="trashcan logo"
          />
        </button>
        <button @click="completeTask" class="card-button">
          <img
            class="logo-img active-logo"
            src="https://res.cloudinary.com/dglwarix0/image/upload/v1665588952/Ironhack-ToDo-Vue/check3_mhro8l.svg"
            alt="completetask-logo"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { inject } from "vue";
import { useUserStore } from "../stores/user";
const taskTitle = ref(props.task.title);
const taskDescription = ref(props.task.description);
// definimos props
const props = defineProps(["task"]);
const toast = inject("$toast");
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
  console.log("usuario actual", useUserStore().user);
  toast("Saved!");
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
.card-plant-logo {
  width: 57px;
  position: absolute;
  top: 5px;
  left: 5px;
}
textarea {
  color: #124559;
  background-color: #aec3b0;
  border-style: none;
  text-decoration: none;
  font-size: 1em;
  resize: none;
  margin: 15px;
}
textarea::-webkit-scrollbar {
  width: 12px;
  background-color: #aec3b0;
}
textarea::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #aec3b0;
}
textarea::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: #598392;
}
</style>
