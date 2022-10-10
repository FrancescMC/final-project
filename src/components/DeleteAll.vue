<template>
  <button @click="deleteAllTask" class="card-button">DELETEALL</button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTaskStore } from "../stores/task";
import TaskItem from "../components/TaskItem.vue";
const props = defineProps(["task"]);
const emit = defineEmits(["deleteAllTaskChildren"]);
const deleteAllTask = () => {
  emit("deleteAllTaskChildren", props.task.user_id);
};
</script>

<style></style>
