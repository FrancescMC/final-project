<template>
  <div>
    <button>show all</button>
    <button @click="showComplete">show completed</button>
    <button>show uncompleted</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["task"]);
const emit = defineEmits(["showCompleteTaskChildren"]);
const showComplete = () => {
  emit("showCompleteTaskChildren", props.task.is_complete);
};
</script>

<style></style>
