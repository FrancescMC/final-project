<template>
  <button class="logout-button dontHide">Welcome, {{ userName }}</button>
  <button @click="signOut" class="logout-button hide">Log Out</button>
  <!-- <p>Welcome, {{ userName }}</p> -->
  <div v-if="errorMessageContainer">
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";
let userName = ref(useUserStore().user.email);
// Router to push user once SignOut is activated and will push user to the SignIn page.
const redirect = useRouter();

// variable that we will use to save el useUserStore that allows us the usage of the store on a cleaner way inside this component

const userStore = useUserStore();

// variable para mostrar error
const errorMessageContainer = ref(false);
const errorMessage = ref("");
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
async function signOut() {
  try {
    await userStore.signOut();
    // redirects user to the homepage
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    setTimeout(() => {
      errorMessage.value = null;
      errorMessageContainer.value = error.message;
    }, 2000);
  }
}

//constant to save a variable that will hold the use router method
// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user
</script>

<style>
.logout-button {
  background-color: #aec3b0;
  color: #124559;
  border-style: none;
  margin-right: 20px;
}

.hide {
  display: none;
  text-align: center;
}
.dontHide:hover {
  display: none;
}
.dontHide:hover + .hide {
  display: block;
}
</style>
