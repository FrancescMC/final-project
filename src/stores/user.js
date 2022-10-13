import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    // async signInWithGoogle() {
    //   const { user, session, error } = await supabase.auth.signIn({
    //     provider: "google",
    //   });
    //   if (error) throw error;
    //   if (user) {
    //     this.user = user;
    //     console.log(this.user);
    //   }
    // },
    async signInWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            "https://ujryhinhvmeofdmohgmw.supabase.co/auth/v1/callback",
        },
      });
    },
    // const signInWithGoogle = async () => {
    //   try {
    //     const { user, session, error } = await supabase.auth.signIn({
    //       provider: "google",
    //     });
    //     await useUserStore().fetchUser();
    //     redirect.push({ path: "/" });
    //     // console.log(useTaskStore().user);
    //   } catch (error) {
    //     errorMsg.value = `Error: ${error.message}`;
    //     setTimeout(() => {
    //       errorMsg.value = null;
    //     }, 5000);
    //   }
    // };

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    // plantilla funcion asíncrona async (function) functionName(){};
    // signout function
    async signOut() {
      const { error } = await supabase.auth.signOut();
      console.log(error);
      if (error) throw error;
    },

    // login con google
    // async signInWithGoogle() {
    //   const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider: "google",
    //   });
    // },
    async signInWithGitHub() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
