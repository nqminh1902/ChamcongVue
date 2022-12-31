import "devextreme/dist/css/dx.light.css";
import router from "./routers/index";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).use(router).mount("#app");
