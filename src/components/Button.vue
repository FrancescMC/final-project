<template>
  <button @click="activateButton" class="card-button">DELALL</button>
</template>

<script setup>
const emit = defineEmits(["buttonActivation"]);
const activateButton = () => {
  emit("buttonActivation");
};
</script>

<style></style>
