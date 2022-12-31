<template lang="">
    <div class="modal" @click.self="onCloseModal">
        <div class="modal-container">
            <div
                class="modal-wrap"
                :class="
                    id == 'delete' ||
                    (id == 'deleteMultiple' && 'width-popup-delete')
                "
            >
                <div class="modal-header">
                    <div class="modal-header-title">{{ title }}</div>
                    <i
                        class="fa-solid fa-xmark modal-header-icon"
                        @click="onCloseModal"
                    ></i>
                </div>
                <div class="modal-body">
                    <slot>
                        <div class="header-table">
                            <div class="header-table-left">
                                <DxTextBox
                                    placeholder="Tìm kiếm"
                                    :width="'320px'"
                                    :height="'36px'"
                                    :element-attr="inputText"
                                    @value-changed="valueChanged"
                                    :value="keyWord"
                                >
                                    <DxButton
                                        :element-attr="buttonSearch"
                                        location="before"
                                        icon="search"
                                        name="search"
                                    />
                                </DxTextBox>
                                <DxDropDownBox
                                    class="marleft-6"
                                    drop-down-button-template="imageIcon"
                                    :value="currentDepartment"
                                    :data-source="organization"
                                    value-expr="misaCode"
                                    display-expr="organizationUnitName"
                                    :width="360"
                                    placeholder="Tất cả đơn vị"
                                    :field-template="'text'"
                                >
                                    <template #imageIcon="{}">
                                        <span
                                            class="fa-solid fa-chevron-down icon-dropdown-custom"
                                        ></span>
                                    </template>
                                    <template #text>
                                        <div :title="itemSelectedName">
                                            <DxTextBox
                                                :show-clear-button="true"
                                                :value="itemSelectedName"
                                                placeholder="Chọn đơn vị"
                                                @ValueChanged="
                                                    valueOrganization
                                                "
                                            />
                                        </div>
                                    </template>
                                    <template #content>
                                        <DxTreeView
                                            :ref="departmentRefTreeView"
                                            :data-source="departments"
                                            :select-by-click="true"
                                            key-expr="departmentID"
                                            selection-mode="single"
                                            display-expr="departmentName"
                                            :width="360"
                                            :search-enabled="true"
                                            :search-mode="searchMode"
                                            @item-selection-changed="
                                                treeView_itemSelectionChanged(
                                                    $event
                                                )
                                            "
                                            noDataText="Không tìm thấy bản ghi"
                                        >
                                            <DxSearchEditorOptions
                                                placeholder="Tìm kiếm"
                                                :width="300"
                                            />
                                        </DxTreeView>
                                    </template>
                                </DxDropDownBox>
                                <div
                                    class="optionSelection marleft-12"
                                    v-if="selectedEmployee.length > 0"
                                >
                                    <span
                                        >Đã chọn
                                        <b>{{
                                            selectedEmployee.length
                                        }}</b></span
                                    >
                                    <span
                                        class="marleft-24"
                                        style="color: red; cursor: pointer"
                                        @click="clearSelection"
                                        >Bỏ chọn</span
                                    >
                                </div>
                            </div>
                        </div>
                        <BaseTable
                            id="dataGrid"
                            ref="employeeGrid"
                            keyExpr="employeeID"
                            :dataSource="employee"
                            :border="true"
                            :collumn="tableMissionAllownEmployee"
                            :isEditing="true"
                            :isHover="true"
                            :pageSize="pageSize"
                            @selectedRows="selectEntity($event)"
                            :clearSelection="isClear"
                        />

                        <div class="content-footer">
                            <div class="total-page">
                                <p class="marright-6">Tổng số bản ghi</p>
                                <span>{{ totalPage }}</span>
                            </div>
                            <div class="pagination">
                                <div class="pagination-border">
                                    <BaseDropdownVue
                                        :choose="dropdownValue.pageSize"
                                        id="pageSize"
                                        @pageSize="onChangePageSize($event)"
                                    />
                                </div>
                                <div class="pagination-table-row marleft-16">
                                    <span
                                        class="pagination-table-row-number marright-6"
                                        >Từ
                                        <b>{{
                                            pageSize * (pageNumber - 1) + 1
                                        }}</b>
                                        đến
                                        <b>
                                            {{
                                                pageSize * pageNumber >
                                                totalPage
                                                    ? totalPage
                                                    : pageSize * pageNumber
                                            }}
                                        </b></span
                                    >
                                    <span class="pagination-table-row-title">
                                        bản ghi
                                    </span>
                                </div>
                                <div class="pagination-button marleft-16">
                                    <div
                                        class="pagination-button-prev"
                                        title="Quay về"
                                        :class="pageNumber == 1 && 'opacity03'"
                                        @click="prevPage()"
                                    ></div>
                                    <div
                                        class="pagination-button-next marleft-24"
                                        title="Sang trang tiếp"
                                        :class="
                                            Math.ceil(
                                                this.totalPage / this.pageSize
                                            ) <= pageNumber && 'opacity03'
                                        "
                                        @click="nextPage()"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </slot>
                </div>
                <div class="modal-footer">
                    <div class="modal-footer-left"></div>
                    <div class="modal-footer-right flex-1">
                        <BaseButtonVue
                            title="Hủy"
                            class="marright-6"
                            @click="onCloseModal"
                        />
                        <BaseButtonVue
                            v-if="id == 'warning'"
                            class="marright-6"
                            title="Không lưu"
                            @click="backPage"
                        />
                        <BaseButtonVue
                            class="pri-btn delete-btn"
                            title="Xóa"
                            v-if="id == 'delete' || id == 'deleteMultiple'"
                            @click="deleteMission"
                        />
                        <BaseButtonVue
                            class="pri-btn"
                            title="Lưu"
                            v-if="id == 'warning'"
                        />
                        <BaseButtonVue
                            class="pri-btn"
                            :class="selectedEmployee.length == 0 && 'opacity03'"
                            title="Chọn"
                            v-if="id == 'add-employee'"
                            @click="addEmployee"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    DxItem,
    DxToolbar,
    DxDataGrid,
    DxColumn,
    DxSearchPanel,
    DxSelection,
} from "devextreme-vue/data-grid";
import { DxTextBox } from "devextreme-vue/text-box";
import DxButton from "devextreme-vue/button";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import DxTreeView, { DxSearchEditorOptions } from "devextreme-vue/tree-view";
import BaseButtonVue from "./BaseButton.vue";
import {
    tableMissionAllownEmployee,
    departments,
    dropdownValue,
} from "../../common/resources";
import axios from "axios";
import BaseDropdownVue from "./BaseDropdown.vue";
import BaseTable from "./BaseTable.vue";
export default {
    name: "BasePopup",
    components: {
        DxSearchEditorOptions,
        BaseTable,
        DxSelection,
        DxTreeView,
        DxDropDownBox,
        DxButton,
        DxTextBox,
        DxDataGrid,
        DxColumn,
        DxSearchPanel,
        BaseButtonVue,
        DxItem,
        DxSearchPanel,
        DxToolbar,
        BaseDropdownVue,
    },
    props: {
        title: String,
        id: String,
        missionID: String,
        missionDetail: Array,
    },
    mounted() {
        if (this.id == "add-employee") {
            this.onLoadData();
            this.getListOrganization();
        }
    },
    watch: {
        employee: {
            handler(val) {
                if (val && val.length > 0) {
                    let indexs = [];
                    this.selectedRowKeys.forEach((item) => {
                        var ids = this.employee.map((x) => x.employeeID);
                        var index = ids.findIndex((y) => y == item);
                        if (index != -1) {
                            indexs.push(index);
                        }
                    });
                    var me = this;
                    var time = 300;
                    if (this.pageSize == 50) {
                        time = 1000;
                    } else if (this.pageSize == 100) {
                        time = 2000;
                    }
                    setTimeout(() => {
                        me.$refs["employeeGrid"] &&
                            me.$refs["employeeGrid"].selectRowsByIndexes(
                                indexs
                            );
                    }, time);
                }
            },
        },
    },
    methods: {
        onCloseModal() {
            this.$emit("closeModal");
        },

        backPage() {
            this.$router.push({ path: "/" });
        },

        /**
         * Thực hiện xử lý khi tích chọn hàng trong table
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        selectEntity(e) {
            // Kiểm tra có phải next trang không
            if (this.isNextPage) {
                // Tích chọn thêm hàng
                if (e.currentSelectedRowKeys.length > 0) {
                    // Thêm id hàng đã tích thêm vào mảng
                    this.selectedRowKeys.push(e.currentSelectedRowKeys[0]);

                    // Lọc những id bi trùng khỏi mảng
                    this.selectedRowKeys = this.selectedRowKeys.reduce(
                        function (a, b) {
                            if (a.indexOf(b) < 0) a.push(b);
                            return a;
                        },
                        []
                    );
                    // Thêm employee vào mảng
                    for (let x of e.selectedRowsData) {
                        var find = this.selectedEmployee.find(
                            (y) => x.employeeID == y.employeeID
                        );
                        if (find == undefined) {
                            this.selectedEmployee.push(x);
                        }
                    }
                }
                // Bỏ tích đã chọn
                if (e.currentDeselectedRowKeys.length > 0) {
                    // Lọc bỏ id đã tích
                    this.selectedRowKeys = this.selectedRowKeys.filter(
                        (item) => item !== e.currentDeselectedRowKeys[0]
                    );
                    // Lọc bỏ employee có employeeID đó khỏi mảng
                    this.selectedEmployee = this.selectedEmployee.filter(
                        (item) => {
                            return (
                                item.employeeID != e.currentDeselectedRowKeys
                            );
                        }
                    );
                }
                if (this.selectedEmployee.length > 0) {
                    this.isSelected = true;
                } else {
                    this.isSelected = false;
                }
            } else {
                this.isNextPage = true;
            }
        },
        clearSelection() {
            this.isClear = !this.isClear;
            (this.selectedEmployee = []), (this.selectedRowKeys = []);
        },
        treeView_itemSelectionChanged(e) {
            this.itemSelectedId = e.component.getSelectedNodeKeys();
            let selected = e.component.getSelectedNodes();
            let value = { ...selected[0] };

            this.itemSelectedName = value.text;
            if (this.itemSelectedName) {
                const selectedOrganization = this.organization.filter(
                    (item) => {
                        return item.misaCode == value.key;
                    }
                );
                this.currentOrganization =
                    selectedOrganization[0].organizationUnitID;
                this.onLoadData();
            }
        },
        getListOrganization() {
            try {
                axios
                    .get("https://localhost:7093/api/Organization")
                    .then((response) => {
                        this.organization = response.data;
                    })
                    .catch((error) => {
                        console.log("Lấy đơn vị thất bại");
                    });
            } catch (error) {}
        },
        onLoadData() {
            try {
                axios
                    .post("https://localhost:7093/api/Employee/filter", {
                        keyword: this.keyWord,
                        organizationID: this.currentOrganization,
                        pageSize: this.pageSize,
                        pageNumber: this.pageNumber,
                        employeeIDs: this.missionDetail,
                    })
                    .then((response) => {
                        this.employee = response.data.data;
                        this.totalPage = response.data.totalCount;
                    })
                    .catch((error) => {
                        console.log("Lỗi lấy dữ liệu");
                    });
            } catch (error) {}
        },
        valueOrganization(e) {
            if (e.value == "" && e.previousValue != "") {
                this.currentOrganization = "";
                this.pageNumber = 1;
                this.onLoadData();
            }
        },
        deleteMission() {
            const me = this;
            if (this.id == "deleteMultiple") {
                this.$emit("deleteMultiple");
            }
            if (this.id == "delete") {
                try {
                    axios
                        .delete(
                            `https://localhost:7093/api/MissionAllownce/${this.missionID}`
                        )
                        .then((response) => {
                            me.onCloseModal();
                        })
                        .catch((error) => {
                            console.log("Lỗi xóa");
                        });
                } catch (error) {}
            }
        },
        /**
         * Thực hiện xử lý Số trang và hiện lên view
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        updatePage(totalPage) {
            return `${this.pageSize * (this.pageNumber - 1) + 1} - ${
                this.pageSize * this.pageNumber > totalPage
                    ? totalPage
                    : this.pageSize * this.pageNumber
            } `;
        },
        valueChanged(e) {
            this.keyWord = e.value;
            this.onLoadData();
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table để chuyển trang
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        prevPage() {
            this.isNextPage = false;
            if (this.pageNumber > 1) {
                this.pageNumber = this.pageNumber - 1;
                this.onLoadData();
            }
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table để chuyển trang
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        nextPage() {
            this.isNextPage = false;
            if (Math.ceil(this.totalPage / this.pageSize) > this.pageNumber) {
                this.pageNumber++;
                this.onLoadData();
            }
        },
        onChangePageSize(e) {
            this.pageSize = e;
            this.onLoadData();
        },
        addEmployee() {
            if (this.selectedEmployee.length > 0) {
                this.$emit("employeeList", this.selectedEmployee);
            }
        },
    },
    data() {
        return {
            keyWord: "",
            pageSize: 15,
            pageNumber: 1,
            employee: [],
            totalPage: 0,
            tableMissionAllownEmployee,
            organization: [],
            itemSelectedName: "",
            itemSelectedId: "",
            selectedEntity: null,
            dropdownValue,
            isNextPage: true,
            selectedRowKeys: [],
            selectedEmployee: [],
            dataGridRefName: "dataGrid",
            isSelected: true,
            currentOrganization: "",
            departments,
            isClear: false,
        };
    },
};
</script>
<style lang=""></style>
