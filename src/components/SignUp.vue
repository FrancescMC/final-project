<template>
  <div class="main-wrapper">
    <main class="main">
      <div class="login-logo">
        <img
          class="nav-img"
          src="https://res.cloudinary.com/dglwarix0/image/upload/v1665680224/Ironhack-ToDo-Vue/hojacompuesta2_zxtq6l.svg"
          alt=""
        />
        <p class="nav-text">Taskie</p>
      </div>
      <h1>Sign Up</h1>
      <form class="form-wrapper" @submit.prevent="signUp">
        <div class="email-form form">
          <label class="" for="">Email</label>
          <input
            class=""
            type="email"
            placeholder="your email"
            v-model="email"
            id="email"
          />
        </div>
        <div class="password-form form">
          <label class="" for="">Password</label>
          <input
            class=""
            type="password"
            placeholder="************"
            v-model="password"
            id="password"
          />
        </div>
        <div class="password-form form">
          <label class="" for="">Confirm Password</label>
          <input
            class=""
            type="password"
            placeholder="************"
            v-model="confirmPassword"
            id="confirmPassword"
          />
        </div>
        <button class="login-button" type="submit">Sign Up</button>
        <p class="">
          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
// Route Variables
const route = "/auth/login";
const buttonText = "Have an account?";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style></style>
