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
      <h1>Log in</h1>

      <form class="form-wrapper" @submit.prevent="signIn">
        <div class="email-form form">
          <label class="" for="">Email</label>
          <input
            class=""
            type="email"
            placeholder="Enter your email adress..."
            v-model="email"
            id="email"
          />
        </div>
        <div class="password-form form">
          <label class="" for="">Password</label>

          <div class="">
            <input
              class=""
              :type="passwordFieldType"
              onpaste="return false"
              placeholder="************"
              v-model="password"
              id="password"
            />

            <span class="">
              <!-- <EyeIcon
                :class="[passwordFieldIcon]"
                @click.prevent="hidePassword = !hidePassword"
              /> -->
            </span>
            <p v-if="errorMsg" class="">
              {{ errorMsg }}
            </p>
          </div>
        </div>

        <button class="login-button" type="submit">Log in with email</button>
        <p class="change-login-text">
          <PersonalRouter :route="route" :buttonText="buttonText" />
        </p>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task";

const light = ref(true);
const toggleDark = () => {
  light.value = !light.value;
};

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Create an account";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    console.log("fetchusers1" + useUserStore().user);
    await useUserStore().signIn(email.value, password.value);
    console.log("fetchusers2" + useUserStore().user);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

// const loginInWithGoogle = async () => {
//   try {
//     await useUserStore().signInWithGoogle();
//     redirect.push({ path: "/" });
//   } catch (error) {
//     errorMsg.value = `Error: ${error.message}`;
//     setTimeout(() => {
//       errorMsg.value = null;
//     }, 5000);
//   }
// };
// async function signInWithGoogle() {
//   console.log("testing signInWithGoogle" + (await supabase.auth.signIn));
//   const { user, session, error } = await supabase.auth.signIn({
//     provider: "google",
//   });
// }

const loginWithGoogle = async () => {
  console.log("fetchuserg1" + useUserStore().user);
  await useUserStore().signInWithGoogle();
  console.log("fetchuserg2" + useUserStore().user);
};

const loginInWithGitHub = async () => {
  try {
    await useUserStore().signInWithGitHub();
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px #aec3b0 inset;
  -webkit-text-fill-color: #124559 !important;
}
.login-logo {
  color: #124559;
  display: flex;
  align-items: center;
  font-size: 1.3em;
  font-weight: 500;
  margin-left: -66px;
}
.login-button {
  background-color: #598392;
  color: #eff6e0;
  border-style: none;
  border-radius: 7px;
  padding: 10px;
  width: 161px;
}
.form-wrapper {
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  font-size: small;
}
</style>
