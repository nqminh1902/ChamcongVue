<template lang="">
    <div
        class="toast"
        :class="toast.toastType == 'success' ? 'bg-success ' : 'bg-warning '"
    >
        <div class="toast-content">
            <i
                :class="
                    toast.toastType == 'success'
                        ? 'icon fa-solid fa-circle-check color-success'
                        : 'fa-sharp fa-solid fa-circle-xmark color-warning'
                "
            ></i>

            <div class="message">
                <span class="text margleft-6">{{ toast.toastMessage }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    name: "baseToast",
    setup() {
        const store = useStore();
        const toast = computed(() => store.state.toast);
        return { toast };
    },
};
</script>
<style scoped>
.toast {
    position: absolute;
    bottom: 37px;
    right: 10px;
    max-width: 650px;
    border-radius: 4px;
    background: #fff;
    padding: 6px;
    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
    overflow: hidden;
    z-index: 669;
    border-left: 4px solid #089740;
}

.icon {
    font-size: 16px;
}

.color-success {
    color: #089740;
}

.bg-success {
    background-color: #6bc18d;
}

.color-warning {
    color: #e60000;
}

.bg-warning {
    background-color: #f06666;
}
.toast#active {
    transform: translateX(300%);
}

.toast .toast-content {
    display: flex;
    align-items: center;
}

.toast-content .check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    min-width: 35px;
    background-color: #2770ff;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
}

.toast-content .message {
    display: flex;
    margin: 0 12px;
    max-width: 460px;
}

.message .text {
    font-size: 14px;
    font-weight: 400;
    color: #212121;
}

.message .text.text-1 {
    font-weight: 600;
}

.closeToast {
    width: 126px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.toast .close {
    cursor: pointer;
    opacity: 0.7;
    width: 16px;
}

.toast .close:hover {
    opacity: 1;
}

.toast .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
}
</style>
