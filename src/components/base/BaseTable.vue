<template lang="">
    <DxDataGrid
        :id="id"
        :key-expr="keyExpr"
        :data-source="dataSource"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :column-auto-width="true"
        :selected-row-keys="selectedRowKeys"
        @selection-changed="selectEntity"
        @cell-click="onEdit"
        :hover-state-enabled="isHover"
        :show-borders="border"
        :ref="dataGridRefName"
        :height="height"
        noDataText="Không có bản ghi"
    >
        <DxScrolling row-rendering-mode="infinite" />
        <DxPaging :page-size="pageSize" />
        <DxSelection
            v-if="isEditing"
            select-all-mode="allPages"
            show-check-boxes-mode="always"
            mode="multiple"
            :allowSelectAll="true"
        />
        <DxColumn
            v-for="(item, index) in collumn"
            :key="index"
            :fixed="item.fixed"
            :caption="item.caption"
            :data-field="item.dataField"
            :min-width="item.minWidth"
            :cell-template="item.cellTemplate"
            :fixed-position="item.fixedPosition"
            :allow-sorting="false"
            :alignment="item.alignment"
            :visible="item.visible"
            :data-type="item.dataType"
        />
        <template #name-cell="{ data }">
            <div class="cell-name">
                <div class="avatar-sm">
                    <span class="avatar-namesm">{{
                        convertString(data.data.employeeName)
                    }}</span>
                </div>
                <span class="marleft-6">{{ data.data.employeeName }}</span>
            </div>
        </template>
        <template #delete-cell="{ data }">
            <div
                class="feature-wrap"
                @click="removeEmployee(data.data)"
                v-if="isEditing"
            >
                <i class="fa-solid fa-xmark dispose"></i>
            </div>
        </template>
        <template #grid-cell="{ data }">
            <BaseStatusVue :id="data.value" />
        </template>

        <template #feature-cell="{ data }">
            <div class="feature-wrap">
                <div
                    class="edit-cell"
                    @click="changePage(data.data)"
                    id="edit-btn-fix"
                ></div>
                <div
                    class="delete-cell marleft-12"
                    @click="showPopup(data.data)"
                    id="delete"
                ></div>
            </div>
        </template>
        <template #requestDate="{ data }">
            <div>
                {{ formatDate(data.data.requestDate) }}
            </div>
        </template>
        <template #fromDate="{ data }">
            <div>{{ formatDate(data.data.fromDate) }}</div>
        </template>
        <template #toDate="{ data }">
            <div>{{ formatDate(data.data.toDate) }}</div>
        </template>
    </DxDataGrid>
</template>
<script>
import {
    DxDataGrid,
    DxColumn,
    DxSelection,
    DxScrolling,
    DxPaging,
} from "devextreme-vue/data-grid";
import BaseStatusVue from "./BaseStatus.vue";
export default {
    name: "BaseTable",
    components: {
        DxDataGrid,
        DxColumn,
        DxSelection,
        BaseStatusVue,
        DxScrolling,
        DxPaging,
    },
    props: {
        id: String,
        keyExpr: String,
        dataSource: Array,
        isEditing: Boolean,
        border: Boolean,
        collumn: Array,
        isHover: Boolean,
        clearSelection: Boolean,
        selectedRowKeys: Array,
        pageSize: Number,
        height: String,
    },
    watch: {
        clearSelection() {
            this.clearAll();
        },
    },
    methods: {
        /**
         * Thực hiện bỏ chọn tất cả hàng
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        clearAll() {
            const dataGrid = this.$refs[this.dataGridRefName].instance;

            dataGrid.clearSelection();
        },
        selectRows(keys, preserve) {
            const dataGrid = this.$refs[this.dataGridRefName].instance;
            dataGrid.selectRows(keys, preserve);
        },
        deselectRows(keys) {
            const dataGrid = this.$refs[this.dataGridRefName].instance;
            dataGrid.deselectRows(keys);
        },
        selectRowsByIndexes(indexes) {
            const dataGrid = this.$refs[this.dataGridRefName].instance;
            dataGrid.selectRowsByIndexes(indexes);
        },

        /**
         * Thực hiện chọn hàng
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        selectEntity(e) {
            this.selectedRowsData = e;
            this.$emit("selectedRows", this.selectedRowsData);
            this.$emit("rawOnSelectionChanged", e);
        },

        /**
         * Thực hiện bỏ chọn hàng chỉ định
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        removeEmployee(data) {
            this.$emit("removeSelection", data);
        },

        /**
         * Thực hiện chuyển router sang view sửa
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        changePage(id) {
            this.$router.push({
                name: "mission-allowance",
                params: { id: id.missionAllowanceID },
            });
        },

        /**
         * Thực hiện mở popup
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        showPopup(id) {
            this.$emit("showPopup", id);
        },

        /**
         * Thực hiện mở sang trang chi tiết đơn
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        onEdit(e) {
            this.$emit("editData", e);
        },

        formatDate(data) {
            const date = new Date(data);
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        },
        convertString(str) {
            let temp = "";
            for (let x of str) {
                if (x === x.toUpperCase()) {
                    temp += x;
                }
            }
            return temp.replace(/\s/g, "").slice(-2);
        },
    },
    data() {
        return {
            dataGridRefName: "data-grid",
        };
    },
};
</script>
<style lang=""></style>
