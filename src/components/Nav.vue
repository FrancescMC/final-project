<template>
  <div class="user-wrapper nav-logo">
    <p class="nav-text nav-user">{{ nameEmail }}'s Tasks</p>
    <img
      @click="signOut"
      class="nav-img"
      src="https://res.cloudinary.com/dglwarix0/image/upload/v1665600737/Ironhack-ToDo-Vue/logout2_d3sj46.svg"
      alt="logout-logo"
    />
  </div>
  <div class="nav-logo">
    <img
      class="nav-img"
      src="https://res.cloudinary.com/dglwarix0/image/upload/v1665680224/Ironhack-ToDo-Vue/hojacompuesta2_zxtq6l.svg"
      alt=""
    />
    <p class="nav-text">Taskie</p>
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
const arr = userName.value.indexOf("@");
const nameEmail = ref(userName.value.slice(0, arr));
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
</script>

<style>
.nav-logo {
  color: #124559;
  display: flex;
  align-items: center;
  font-size: 1.3em;
  font-weight: 500;
}
.user-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 10px;
}
.nav-user {
  font-size: 0.8em;
}
.nav-text {
  color: #124559;
}
.nav-img {
  height: 57px;
}
</style>
