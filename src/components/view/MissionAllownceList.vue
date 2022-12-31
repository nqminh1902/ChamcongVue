<template lang="">
    <div class="content">
        <div class="content-header">
            <div class="content-title">
                <h2 class="content-title-text">{{ contentText.webTitle }}</h2>
                <div class="content-title-btn">
                    <router-link to="/mission-allowance/0">
                        <BaseButtonVue class="pri-btn" title="Thêm" id="add" />
                    </router-link>
                    <button class="pri-btn import" @click="onToggleImport">
                        <i class="fa-solid fa-angle-down icon-down"></i>
                    </button>
                    <div class="import-excel" v-if="isImport">
                        <i class="fa-solid fa-file-import import-icon"></i>
                        {{ contentText.export }}
                    </div>
                    <div
                        class="overlay"
                        v-if="isImport"
                        @click.seft="onToggleImport"
                    ></div>
                </div>
            </div>
            <div class="table">
                <div class="header-table padding-left16 padding-right16">
                    <div class="header-table-left">
                        <DxTextBox
                            placeholder="Tìm kiếm"
                            :width="'320px'"
                            :height="'36px'"
                            :element-attr="inputText"
                            @EnterKey="valueChanged"
                            :value="keyWord"
                            :visible="isSelected"
                        >
                            <DxButton
                                :element-attr="buttonSearch"
                                location="before"
                                icon="search"
                                name="search"
                            />
                        </DxTextBox>
                        <div class="optionSelection" v-if="!isSelected">
                            <span
                                >Đã chọn
                                <b>{{ selectedRowsData.length }}</b></span
                            >
                            <span
                                class="marleft-24 marright-24"
                                style="color: red; cursor: pointer"
                                @click="clearSelection"
                                >Bỏ chọn</span
                            >
                            <BaseButtonVue
                                title="Từ chối"
                                class="btn-refuse marright-8"
                                id="refuse"
                                v-if="refuseSelection"
                                @click="changeStatus(2)"
                            />
                            <BaseButtonVue
                                title="Duyệt"
                                class="btn-agree marright-8"
                                id="agree"
                                v-if="allownSelection"
                                @click="changeStatus(1)"
                            />
                            <BaseButtonVue
                                title="Xuất khẩu"
                                class="btn-export marright-8"
                                id="export"
                                @click="exportExcel(1)"
                            />
                            <BaseButtonVue
                                title="Xóa"
                                class="btn-delete marright-8"
                                id="delete"
                                @click="showMultipleDelete"
                            />
                        </div>
                    </div>
                    <div class="header-table-right" v-if="isSelected">
                        <div class="table-header-status">
                            <span style="color: gray; margin-right: 4px"
                                >{{ contentText.statusText }}
                            </span>
                            <BaseDropdownVue
                                :choose="dropdownValue.status"
                                id="status-dropdown"
                                @pageSize="onChooseStatus($event)"
                            />
                        </div>
                        <DxDropDownBox
                            class="marright-8"
                            drop-down-button-template="imageIcon"
                            :value="currentDepartment"
                            :data-source="organization"
                            value-expr="misaCode"
                            display-expr="organizationUnitName"
                            :width="360"
                            placeholder="Tất cả đơn vị"
                            :field-template="'item'"
                            @value-changed="syncTreeViewSelection($event)"
                        >
                            <template #imageIcon="{}">
                                <span
                                    class="fa-solid fa-chevron-down icon-dropdown-custom"
                                ></span>
                            </template>
                            <template #item>
                                <div :title="itemSelectedName">
                                    <DxTextBox
                                        :show-clear-button="true"
                                        :value="itemSelectedName"
                                        placeholder="Tất cả đơn vị"
                                        @ValueChanged="valueOrganization"
                                    />
                                </div>
                            </template>
                            <template #content>
                                <DxTreeView
                                    :ref="departmentRefTreeView"
                                    :placeholder="'Tìm kiếm'"
                                    :data-source="departments"
                                    :select-by-click="true"
                                    key-expr="departmentID"
                                    selection-mode="single"
                                    display-expr="departmentName"
                                    :width="360"
                                    :search-enabled="true"
                                    :search-mode="searchMode"
                                    @item-selection-changed="
                                        treeView_itemSelectionChanged($event)
                                    "
                                    :expandNodesRecursive="true"
                                    noDataText="Không tìm thấy bản ghi"
                                >
                                    <DxSearchEditorOptions
                                        placeholder="Tìm kiếm"
                                        :width="300"
                                    />
                                </DxTreeView>
                            </template>
                        </DxDropDownBox>
                        <BaseButtonVue
                            id="refresh"
                            class="outline-btn-icon marright-8"
                            @click="refreshData"
                        />
                        <DxTooltip
                            target="#refresh"
                            show-event="dxhoverstart"
                            hide-event="dxhoverend"
                        >
                            <b>{{ tooltipText.refresh }}</b>
                        </DxTooltip>
                        <BaseButtonVue
                            id="filter"
                            class="outline-btn-icon marright-8"
                        />

                        <DxTooltip
                            target="#filter"
                            show-event="dxhoverstart"
                            hide-event="dxhoverend"
                        >
                            <b>{{ tooltipText.filter }}</b>
                        </DxTooltip>
                        <BaseButtonVue
                            id="export-list"
                            class="outline-btn-icon marright-8"
                            @click="exportExcel(0)"
                        />

                        <DxTooltip
                            target="#export-list"
                            show-event="dxhoverstart"
                            hide-event="dxhoverend"
                        >
                            <b>{{ tooltipText.export }}</b>
                        </DxTooltip>
                        <BaseButtonVue id="setting" class="outline-btn-icon" />

                        <DxTooltip
                            target="#setting"
                            show-event="dxhoverstart"
                            hide-event="dxhoverend"
                        >
                            <b>{{ tooltipText.setting }}</b>
                        </DxTooltip>
                    </div>
                </div>
                <BaseTable
                    id="dataGrid"
                    ref="missionGrid"
                    keyExpr="missionAllowanceID"
                    :dataSource="missionAllownce"
                    :isEditing="true"
                    :border="false"
                    :collumn="tableEmployeeCollumn"
                    :isHover="true"
                    :clearSelection="isClear"
                    :height="'calc(100% - 120px)'"
                    :pageSize="pageSize"
                    @showPopup="showPopup($event)"
                    @selectedRows="selectEntity($event)"
                    @rawOnSelectionChanged="selectRows"
                    @editData="onEdit($event)"
                />
                <div class="content-footer">
                    <div class="total-page">
                        <p class="marright-6">{{ contentText.totalRecords }}</p>
                        <span>{{ total }}</span>
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
                            <span class="pagination-table-row-number marright-6"
                                >Từ
                                <b>{{ pageSize * (pageNumber - 1) + 1 }}</b>
                                đến
                                <b>
                                    {{
                                        pageSize * pageNumber > total
                                            ? total
                                            : pageSize * pageNumber
                                    }}
                                </b>
                            </span>
                            <span class="pagination-table-row-title">{{
                                contentText.recordText
                            }}</span>
                        </div>
                        <div class="pagination-button marleft-16">
                            <div
                                class="pagination-button-prev"
                                :class="pageNumber == 1 && 'opacity03'"
                                title="Quay về"
                                @click="backPage"
                            ></div>
                            <div
                                class="pagination-button-next marleft-24"
                                :class="
                                    Math.ceil(this.total / this.pageSize) <=
                                        pageNumber && 'opacity03'
                                "
                                title="Sang trang tiếp"
                                @click="nextPage"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BasePopupVue
            v-if="popupVisible"
            title="Cảnh báo"
            @closeModal="closePopup"
            id="delete"
            :missionID="missionID"
        >
            <p>Bạn có chắc chắn muốn xóa đơn này không</p>
        </BasePopupVue>
        <BasePopupVue
            v-if="popupMultipleDelete"
            title="Cảnh báo"
            @closeModal="closeMultipleDelete"
            @deleteMultiple="onDeleteMultiple"
            id="deleteMultiple"
        >
            <p>Bạn có chắc chắn muốn xóa những đơn đã chọn này không</p>
        </BasePopupVue>
    </div>
</template>
<script>
import { useRouter } from "vue-router";
import BaseButtonVue from "../base/BaseButton.vue";
import BaseDropdownVue from "../base/BaseDropdown.vue";
import { DxTooltip } from "devextreme-vue/tooltip";
import { DxSelectBox } from "devextreme-vue/select-box";
import DxButton from "devextreme-vue/button";
import { DxTextBox } from "devextreme-vue/text-box";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import DxTreeView, { DxSearchEditorOptions } from "devextreme-vue/tree-view";
import BasePopupVue from "../base/BasePopup.vue";
import BaseStatusVue from "../base/BaseStatus.vue";
import deMessages from "devextreme/localization/messages/de.json";
import { locale, loadMessages } from "devextreme/localization";
import {
    DxItem,
    DxToolbar,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxColumnFixing,
    DxSelection,
    DxEditing,
    DxExport,
} from "devextreme-vue/data-grid";
import {
    departments,
    dropdownValue,
    tooltipText,
    contentText,
    tableEmployeeCollumn,
} from "../../common/resources";
import BaseTable from "../base/BaseTable.vue";
import axios from "axios";

export default {
    name: "EmployeeList",
    components: {
        DxButton,
        DxTextBox,
        DxToolbar,
        DxItem,
        DxSelectBox,
        DxSearchPanel,
        DxExport,
        BaseButtonVue,
        BaseDropdownVue,
        DxTreeView,
        DxDropDownBox,
        DxTooltip,
        DxDataGrid,
        DxColumn,
        DxColumnChooser,
        DxColumnFixing,
        DxSelection,
        DxEditing,
        BasePopupVue,
        BaseStatusVue,
        BaseTable,
        DxSearchEditorOptions,
    },
    created() {
        loadMessages(deMessages);
        locale(navigator.language);
        this.onLoadData();
        this.getListOrganization();
    },
    watch: {
        missionAllownce: {
            handler(val) {
                if (val && val.length > 0) {
                    let indexs = [];
                    this.selectedRowsData.forEach((item) => {
                        var ids = this.missionAllownce.map(
                            (x) => x.missionAllowanceID
                        );
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
                        me.$refs["missionGrid"] &&
                            me.$refs["missionGrid"].selectRowsByIndexes(indexs);
                    }, time);
                }
            },
            // handler(val) {
            //     if (val && val.length > 0) {
            //         this.selectedRowKeys = [];
            //         var indexs = [];
            //         this.selectedRowKeysAll.forEach((id) => {
            //             if (
            //                 val.findIndex(
            //                     (x) => x["missionAllowanceID"] == id
            //                 ) != -1
            //             ) {
            //                 this.selectedRowKeys.push(id);
            //                 var index = val.findIndex(
            //                     (x) => x["missionAllowanceID"] == id
            //                 );
            //                 indexs.push(index);
            //             }
            //         });
            //         console.log(indexs);
            //         var me = this;
            //         var time = 300;
            //         if (this.pageSize == 50) {
            //             time = 1000;
            //         } else if (this.pageSize == 100) {
            //             time = 2000;
            //         }
            //         setTimeout(() => {
            //             me.$refs["missionGrid"] &&
            //                 me.$refs["missionGrid"].selectRowsByIndexes(indexs);
            //         }, time);
            //     }
            // },
        },
    },
    methods: {
        valueOrganization(e) {
            if (e.value == "" && e.previousValue != "") {
                this.currentOrganization = "";
                this.pageNumber = 1;
                this.onLoadData();
            }
        },
        clearSelection() {
            this.isClear = !this.isClear;
            this.selectedRowsData = [];
            this.arraySelected = [];
            this.isSelected = true;
        },
        onToggleImport() {
            this.isImport = !this.isImport;
        },
        /**
         * Thực hiện xử lý khi tích chọn hàng trong table danh sách đ
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        selectEntity(e) {
            // Kiểm tra có phải next trang không
            if (this.isNextPage) {
                if (e.currentSelectedRowKeys.length > 0) {
                    // Thêm id hàng đã tích thêm vào mảng
                    this.selectedRowsData.push(e.currentSelectedRowKeys[0]);

                    // Lọc những id bi trùng khỏi mảng
                    this.selectedRowsData = this.selectedRowsData.reduce(
                        function (a, b) {
                            if (a.indexOf(b) < 0) a.push(b);
                            return a;
                        },
                        []
                    );

                    // Thêm đơn vào mảng
                    for (let x of e.selectedRowsData) {
                        // Kiểm tra xem đơn đã có trong mảng chưa
                        var find = this.arraySelected.find(
                            (y) => x.missionAllowanceID == y.missionAllowanceID
                        );
                        // Chưa có thì thêm vào mảng
                        if (find == undefined) {
                            this.arraySelected.push(x);
                        }
                    }
                    console.log(this.arraySelected);
                    console.log(this.selectedRowsData);
                }
                if (e.currentDeselectedRowKeys.length > 0) {
                    this.selectedRowsData = this.selectedRowsData.filter(
                        (item) => item !== e.currentDeselectedRowKeys[0]
                    );
                    this.arraySelected = this.arraySelected.filter((item) => {
                        return (
                            item.missionAllowanceID !=
                            e.currentDeselectedRowKeys
                        );
                    });
                }
            } else {
                this.isNextPage = true;
            }
            if (this.selectedRowsData.length == 0) {
                this.isSelected = true;
            } else {
                this.isSelected = false;
            }

            const statusArray = this.arraySelected.map((item) => {
                return item.status;
            });
            if (statusArray.includes(1)) {
                this.allownSelection = false;
            } else {
                this.allownSelection = true;
            }
            if (statusArray.includes(2)) {
                this.refuseSelection = false;
            } else {
                this.refuseSelection = true;
            }
            if (
                (statusArray.includes(2) && statusArray.includes(1)) ||
                (statusArray.includes(2) && statusArray.includes(0)) ||
                (statusArray.includes(1) && statusArray.includes(0))
            ) {
                this.refuseSelection = true;
                this.allownSelection = true;
            }
        },
        // selectRows(val) {
        //     val.currentSelectedRowKeys.forEach((row) => {
        //         if (this.selectedRowKeysAll.findIndex((x) => x == row) == -1) {
        //             this.lstSelect.push(row);
        //             this.selectedRowKeys.push(row);
        //             this.selectedRowKeysAll.push(row);
        //         }
        //     });
        //     val.currentDeselectedRowKeys.forEach((row) => {
        //         if (
        //             this.missionAllownce.findIndex(
        //                 (x) => x["missionAllowanceID"] == row
        //             ) != -1
        //         ) {
        //             this.lstSelect = this.lstSelect.filter(
        //                 (x) => x["missionAllowanceID"] != row
        //             );
        //             this.selectedRowKeys = this.selectedRowKeys.filter(
        //                 (x) => x != row
        //             );
        //             this.selectedRowKeysAll = this.selectedRowKeysAll.filter(
        //                 (x) => x != row
        //             );
        //         }
        //     });
        // },
        onEdit(e) {
            if (
                e.column.cellTemplate != "feature-cell" &&
                e.column.type != "selection"
            ) {
                this.$router.push({
                    name: "mission-allowance",
                    params: { id: e.data.missionAllowanceID },
                    query: { isEdit: "false" },
                });
            }
        },
        changePage(id) {
            this.$router.push({
                name: "mission-allowance",
                params: { id: id.missionAllowanceID },
            });
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
        closePopup() {
            this.popupVisible = !this.popupVisible;
            this.pageNumber = 1;
            this.onLoadData();
        },
        showMultipleDelete() {
            this.popupMultipleDelete = !this.popupMultipleDelete;
        },
        closeMultipleDelete() {
            this.popupMultipleDelete = !this.popupMultipleDelete;
        },
        showPopup(id) {
            this.popupVisible = !this.popupVisible;
            this.missionID = id.missionAllowanceID;
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
        exportExcel(index) {
            let idMission;
            if (index == 0) {
                idMission = [];
            }
            if (index == 1) {
                idMission = this.selectedRowsData;
            }
            try {
                axios
                    .post(
                        "https://localhost:7093/api/MissionAllownce/exportExcel",
                        { iDs: idMission }
                    )
                    .then((response) => {
                        response.config.responseType = "blob";
                        axios(response.config).then((response) => {
                            const url = window.URL.createObjectURL(
                                new Blob([response.data])
                            );
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute(
                                "download",
                                "De_nghi_di_cong_tac_Tất cả đơn vị.xlsx"
                            );
                            document.body.appendChild(link);
                            link.click();
                        });
                    })
                    .catch((error) => {
                        console.log("Xuất excel bị lỗi");
                    });
            } catch (error) {
                console.log("Xuất excel bị lỗi");
            }
        },
        changeStatus(status) {
            try {
                axios
                    .post(
                        "https://localhost:7093/api/MissionAllownce/updateStatus",
                        { iDs: this.selectedRowsData, status: status }
                    )
                    .then((response) => {
                        this.pageNumber = 1;
                        this.onLoadData();
                        this.clearSelection();
                    })
                    .catch((error) => {
                        console.log("Cập nhật trạng thái bị lỗi");
                    });
            } catch (error) {
                console.log("Cập nhật trạng thái bị lỗi");
            }
        },
        onLoadData() {
            try {
                axios
                    .get(
                        `https://localhost:7093/api/MissionAllownce/filter?keyword=${this.keyWord}&organizationID=${this.currentOrganization}&status=${this.selectedStatus}&pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
                    )
                    .then((response) => {
                        this.missionAllownce = response.data.data;
                        this.total = response.data.totalCount;
                    })
                    .catch((error) => {
                        console.log("Lỗi lấy dữ liệu");
                    });
            } catch (error) {}
        },
        refreshData() {
            this.pageNumber = 1;
            this.onLoadData();
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
            this.keyWord = e.component._changedValue;
            this.onLoadData();
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table để chuyển trang
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        backPage() {
            if (this.pageNumber > 1) {
                this.pageNumber = this.pageNumber - 1;
                this.isNextPage = false;
                this.onLoadData();
            }
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table để chuyển trang
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        nextPage() {
            if (Math.ceil(this.total / this.pageSize) > this.pageNumber) {
                this.pageNumber++;
                this.isNextPage = false;
                this.onLoadData();
            }
        },
        onChangePageSize(e) {
            this.pageSize = e;
            this.onLoadData();
        },
        onChooseStatus(e) {
            if (e == "Chờ duyệt") {
                this.selectedStatus = 0;
            } else if (e == "Đã duyệt") {
                this.selectedStatus = 1;
            } else if (e == "Từ chôi") {
                this.selectedStatus = 2;
            } else {
                this.selectedStatus = 3;
            }
            this.onLoadData();
        },
        onDeleteMultiple() {
            this.popupMultipleDelete = !this.popupMultipleDelete;
            try {
                axios
                    .post(
                        "https://localhost:7093/api/MissionAllownce/deleteBatch",
                        { iDs: this.selectedRowsData }
                    )
                    .then((response) => {
                        this.pageNumber = 1;
                        this.onLoadData();
                    })
                    .catch((error) => {
                        console.log("Lỗi xóa nhiều");
                    });
            } catch (error) {
                console.log("API xóa nhiều bị lỗi");
            }
        },
    },
    data() {
        return {
            featureAttribute: {
                class: "featureAttibute",
            },
            buttonSearch: {
                class: "icon-search",
            },
            inputText: {
                class: "width320",
            },
            iconHover: {
                class: "icon-hover",
            },
            departmentRefTreeView: "departmentChoose",
            isTreeBoxOpened: false,
            currentOrganization: "",
            itemSelectedName: "",
            isImport: false,
            inputSearch: "",
            dropdownValue,
            organization: [],
            departments,
            tooltipText,
            contentText,
            tableEmployeeCollumn,
            popupVisible: false,
            selectedRowsData: [],
            isSelected: true,
            dataGridRefName: "dataGrid",
            pageSize: 15,
            pageNumber: 1,
            keyWord: "",
            missionAllownce: [],
            total: 0,
            selectedStatus: 3,
            missionID: "",
            refuseSelection: true,
            allownSelection: true,
            isClear: false,
            isNextPage: true,
            arraySelected: [],
            lstSelect: [],
            selectedRowKeys: [],
            selectedRowKeysAll: [],
            popupMultipleDelete: false,
        };
    },
};
</script>
<style scoped></style>
