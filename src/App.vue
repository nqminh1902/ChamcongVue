<script>
import TheHeader from "./components/layout/TheHeader.vue";
import MissionAllownedList from "./components/view/MissionAllownceList.vue";
import BaseToast from "./components/base/BaseToast.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    components: {
        TheHeader,
        MissionAllownedList,
        BaseToast,
    },
    setup() {
        const store = useStore();
        const toast = computed(() => store.state.toast);
        return { toast };
    },
};
</script>

<template>
    <TheHeader />
    <RouterView></RouterView>
    <BaseToast v-if="toast.isToast" />
</template>

<style>
@import url(./css/main.css);
</style>
