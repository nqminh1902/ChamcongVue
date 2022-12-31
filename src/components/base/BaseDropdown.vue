<template lang="">
    <div class="pagination-count">
        <span
            class="pagination-count-number margleft-6"
            :id="id"
            @click="onTogglePagination"
            >{{ currentPage }}
        </span>
        <div
            class="pagination-count-dropdown"
            @click="onTogglePagination"
            :class="[{ dropup: isPaginationActive }]"
        ></div>
        <ul
            class="pagination-dropdown-list"
            :class="paginationClass"
            v-if="isPaginationActive"
        >
            <li
                v-for="(page, index) in pageSize"
                :key="index"
                class="pagination-dropdown-item"
                @click="onPageActive(page)"
                :class="[page == choosePage && active]"
            >
                {{ page }}
                <div class="check-icon">
                    <i class="fa-solid fa-check"></i>
                </div>
            </li>
        </ul>
        <div
            class="overlay"
            v-if="isPaginationActive"
            @click="onTogglePagination()"
        ></div>
    </div>
</template>
<script>
export default {
    name: "BaseDropdownPagin",
    props: {
        id: String,
        list: Array,
        choose: Array,
        class: String,
    },
    mounted() {
        if (this.id == "timeKeeping") {
            this.currentPage = "Chấm công";
            this.paginationClass = "timeKeeping";
        }
        if (this.id == "shift") {
            this.currentPage = "Ca làm việc";
            this.paginationClass = "timeKeeping";
        }
        if (this.id == "orderManagement") {
            this.currentPage = "Quản lý đơn";
            this.paginationClass = "orderManagement";
        }
        if (this.id == "report") {
            this.currentPage = "Báo cáo";
            this.paginationClass = "report";
        }
        if (this.id == "status-dropdown") {
            this.pageSize = this.choose;
            this.currentPage = this.pageSize[0];
            this.paginationClass = "status-dropdown";
            this.choosePage = "Tất cả";
        }
        if (this.id == "pageSize") {
            this.pageSize = this.choose;
            this.currentPage = this.pageSize[0];
            this.paginationClass = "pageSize";
            this.choosePage = "15";
        }
    },
    watch: {
        // Chuyền pageSize hiện tại lên thằng cha
        currentPage() {
            this.$emit("pageSize", this.currentPage);
        },
    },
    methods: {
        /**
         * Thực hiện xử lý ẩn hiện dropdown department
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onTogglePagination() {
            this.isPaginationActive = !this.isPaginationActive;
        },
        /**
         * Thực hiện active giá trị được chọn
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onPageActive(page) {
            if (this.choose) {
                this.currentPage = page;

                this.choosePage = page;
            } else {
                this.choosePage = page;
            }
            this.onTogglePagination();
        },
    },
    data() {
        return {
            isPaginationActive: false,
            pageSize: this.list,
            currentPage: "",
            active: "active",
            paginationClass: "",
            choosePage: "Đề nghị đi công tác",
        };
    },
};
</script>
<style lang=""></style>
