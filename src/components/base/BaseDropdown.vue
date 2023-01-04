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
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    name: "BaseDropdownPagin",
    props: {
        id: String,
        list: Array,
        choose: Array,
        class: String,
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
    mounted() {
        /**
         * Thực hiện Thực hiện gán các giá trị tương ứng vào dropdown tùy thuộc vào ID
         **  Author: Nguyễn Quang Minh(04/01/2023)
         */
        if (this.id == "timeKeeping") {
            this.currentPage = this.language.dropdownValue.timeKeepingText;
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
        /**
         * Thực hiện xử lý dropdown các dropdown mỗi khi đổi ngôn ngữ
         **  Author: Nguyễn Quang Minh(04/01/2023)
         */
        list() {
            this.choosePage = this.language.dropdownValue.orderManagement[4];
            this.pageSize = this.list;
            if (this.id == "timeKeeping") {
                this.currentPage = this.language.dropdownValue.timeKeepingText;
                this.paginationClass = "timeKeeping";
            }
            if (this.id == "shift") {
                this.currentPage = this.language.dropdownValue.shiftText;
                this.paginationClass = "timeKeeping";
            }
            if (this.id == "orderManagement") {
                this.currentPage =
                    this.language.dropdownValue.orderManagementText;
                this.paginationClass = "orderManagement";
            }
            if (this.id == "report") {
                this.currentPage = this.language.dropdownValue.reportText;
                this.paginationClass = "report";
            }
            if (this.id == "status-dropdown") {
                this.pageSize = this.choose;
                this.currentPage = this.pageSize[0];
                this.paginationClass = "status-dropdown";
                this.choosePage = this.language.dropdownValue.status[0];
            }
            if (this.id == "pageSize") {
                this.pageSize = this.choose;
                this.currentPage = this.pageSize[0];
                this.paginationClass = "pageSize";
                this.choosePage = "15";
            }
        },
        /**
         * Thực hiện xử lý dropdown trạng thái mỗi khi đổi ngôn ngữ
         **  Author: Nguyễn Quang Minh(04/01/2023)
         */
        choose() {
            if (this.id == "status-dropdown") {
                this.pageSize = this.choose;
                this.currentPage = this.pageSize[0];
                this.paginationClass = "status-dropdown";
                this.choosePage = this.language.dropdownValue.status[0];
            }
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
            choosePage: this.language.dropdownValue.orderManagement[4],
        };
    },
};
</script>
<style lang=""></style>
