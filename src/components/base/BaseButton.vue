<template lang="">
    <button
        class="btn"
        :class="class"
        :id="id"
        :tabindex="tabindex"
        :type="type"
    >
        <span :class="icon"></span>
        {{ title }}
    </button>
</template>
<script>
export default {
    name: "BaseButton",
    props: {
        class: String,
        disable: Boolean,
        title: String,
        id: String,
        tabindex: String,
        type: String,
    },
    mounted() {
        if (this.id == "add") {
            this.icon = "fa-solid fa-plus icon-push marright-6";
        } else if (this.id == "edit") {
            this.icon = "fa-solid fa-pen icon-edit marright-6";
        } else if (this.id == "refuse") {
            this.icon = "icon-refuse marright-6";
        } else if (this.id == "agree") {
            this.icon = "icon-agree marright-6";
        } else if (this.id == "export-list") {
            this.icon = "icon-export ";
        } else if (this.id == "delete") {
            this.icon = "icon-delete marright-6";
        } else if (this.id == "refresh") {
            this.icon = "icon-refresh";
        } else if (this.id == "filter") {
            this.icon = "icon-filter";
        } else if (this.id == "setting") {
            this.icon = "icon-setting";
        } else if (this.id == "export") {
            this.icon = "icon-export marright-6";
        }
    },
    data() {
        return {
            icon: "",
        };
    },
};
</script>
<style lang=""></style>
