<template lang="">
    <span style="display: flex; align-items: center">
        <div class="status-wrap" :class="colorStatus">
            <p class="status-text">{{ content }}</p>
        </div>
    </span>
</template>
<script>
import { status } from "../../common/enum";

export default {
    name: "BaseStatus",
    props: {
        id: Number,
    },
    created() {
        if (this.id == status.NotApproved) {
            this.content = "Chờ duyệt";
            this.colorStatus = "status-notapproved";
        } else if (this.id == status.Approved) {
            this.content = "Đã duyệt";
            this.colorStatus = "status-approved";
        } else if (this.id == status.Refuse) {
            this.content = "Từ chối";
            this.colorStatus = "status-refuse";
        }
    },
    data() {
        return {
            content: "",
            colorStatus: "",
        };
    },
};
</script>
<style lang=""></style>
