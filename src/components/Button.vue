<template>
  <button @click="activateButton" class="del-button">Delete All Tasks</button>
</template>

<script setup>
const emit = defineEmits(["buttonActivation"]);
const activateButton = () => {
  emit("buttonActivation");
};
</script>

<style></style>
