import { createApp } from "vue";
import { createStore } from "vuex";
import * as resource_vie from "../common/resources";
import * as resource_eng from "../common/resource_eng";

export const store = createStore({
    state() {
        return {
            toast: {
                isToast: false,
                toastType: "",
                toastMessage: "",
            },
            // 1 là thêm, 2 là sửa
            statusMode: 0,
            resource: resource_vie,
            language: 0,
        };
    },
    mutations: {
        setToast(state, msg) {
            // mutate state
            state.toast = msg;
        },
        setStatusMode(state, mode) {
            state.statusMode = mode;
        },
        changeLanguage_v2(state, payload = 0) {
            if (payload == 1) {
                state.resource = resource_eng;
            }
            if (payload == 0) {
                state.resource = resource_vie;
            }
        },
    },
});
