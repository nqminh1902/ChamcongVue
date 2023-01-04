<template lang="">
    <span style="display: flex; align-items: center">
        <div
            class="status-wrap"
            :class="
                id == status.NotApproved
                    ? 'status-notapproved'
                    : id == status.Approved
                    ? 'status-approved'
                    : 'status-refuse'
            "
        >
            <p class="status-text">
                {{
                    id == status.NotApproved
                        ? language.statusText.NotApproved
                        : id == status.Approved
                        ? language.statusText.Approved
                        : language.statusText.Refuse
                }}
            </p>
        </div>
    </span>
</template>
<script>
import { status } from "../../common/enum";
import { statusText } from "../../common/resources";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    name: "BaseStatus",
    props: {
        id: Number,
    },
    setup() {
        // Khai báo các state từ vuex
        const store = useStore();
        const language = computed(() => store.state.resource);

        // Khai báo các hàm gọi đến mutations
        function changeLanguage_v2(payload) {
            store.commit("changeLanguage_v2", payload);
        }

        return { changeLanguage_v2, language };
    },
    data() {
        return {
            content: "",
            colorStatus: "",
            status,
            statusText,
        };
    },
};
</script>
<style lang=""></style>
