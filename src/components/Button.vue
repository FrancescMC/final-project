<template>
  <button @click="activateButton" class="del-button delete-button">
    Delete All Tasks
  </button>
</template>

<script setup>
const emit = defineEmits(["buttonActivation"]);
const activateButton = () => {
  emit("buttonActivation");
};
</script>

<style>
.del-button {
  color: #eff6e0;
  border-style: none;
  border-radius: 7px;
  background-color: #124559;
  padding: 10px;
  height: 40px;
}
.delete-button-mobile {
  display: flex;
  justify-content: center;
}
.delete-button-desktop {
  display: none;
}
@media (min-width: 700px) {
  .delete-button-desktop {
    display: block;
    position: fixed;
    top: 60px;
    right: 20px;
  }
  .delete-button-mobile {
    display: none;
  }
}
</style>
