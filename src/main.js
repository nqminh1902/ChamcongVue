import "devextreme/dist/css/dx.light.css";
import router from "./routers/index";
import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store/store";

createApp(App).use(router).use(store).mount("#app");
