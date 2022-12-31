import { createRouter, createWebHistory } from "vue-router";
import MissionAllownceList from "../components/view/MissionAllownceList.vue";
import MissionAllownceDetail from "../components/view/MissionAllownceDetail.vue";
const routes = [
    { path: "/", name: "homepage", component: MissionAllownceList },
    {
        path: "/mission-allowance/:id",
        name: "mission-allowance",
        component: MissionAllownceDetail,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
