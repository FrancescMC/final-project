import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import DKToast from "vue-dk-toast";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(DKToast, {
  duration: 3000,
  positionY: "bottom",
  positionX: "right",
  styles: {
    color: "#EFF6E0",
    backgroundColor: "#598392",
    width: "20px",
    height: "20px",
  },
});
app.mount("#app");
