<template>
  <button @click="deleteAllTask" class="card-button">DELETEALL</button>
</template>

<script setup>
const emit = defineEmits(["deleteAllTaskChildren"]);
const deleteAllTask = () => {
  emit("deleteAllTaskChildren");
};
</script>

<style></style>
