<template lang="">
    <div class="content">
        <div class="content-header">
            <div class="content-title">
                <h2 class="content-title-text">
                    {{ language.contentText.webTitle }}
                </h2>
                <div class="content-title-btn">
                    <router-link to="/mission-allowance/0">
                        <BaseButtonVue
                            class="pri-btn"
                            :title="language.title.add"
                            id="add"
                        />
                    </router-link>
                    <button class="pri-btn import" @click="onToggleImport">
                        <i class="fa-solid fa-angle-down icon-down"></i>
                    </button>
                    <div class="import-excel" v-if="isImport">
                        <i class="fa-solid fa-file-import import-icon"></i>
                        {{ language.contentText.export }}
                    </div>
                    <div
                        class="overlay"
                        v-if="isImport"
                        @click.seft="onToggleImport"
                    ></div>
                </div>
            </div>
            <div class="table-wrapper">
                <div class="table" :class="isFilter && 'table-sm'">
                    <div class="header-table padding-left16 padding-right16">
                        <div class="header-table-left">
                            <DxTextBox
                                :placeholder="language.placeholder.seacrh"
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
                                    >{{ language.misionListText.selected }}
                                    <b>{{ selectedRowsData.length }}</b></span
                                >
                                <span
                                    class="marleft-24 marright-24"
                                    style="color: red; cursor: pointer"
                                    @click="clearSelection"
                                    >{{
                                        language.misionListText.deSelected
                                    }}</span
                                >
                                <BaseButtonVue
                                    :title="language.title.refuse"
                                    class="btn-refuse marright-8"
                                    id="refuse"
                                    v-if="refuseSelection"
                                    @click="togglePopupStatus(2)"
                                />
                                <BaseButtonVue
                                    :title="language.title.accept"
                                    class="btn-agree marright-8"
                                    id="agree"
                                    v-if="allownSelection"
                                    @click="togglePopupStatus(1)"
                                />
                                <BaseButtonVue
                                    :title="language.title.export"
                                    class="btn-export marright-8"
                                    id="export"
                                    @click="exportExcel(1)"
                                />
                                <BaseButtonVue
                                    :title="language.title.delete"
                                    class="btn-delete marright-8"
                                    id="delete"
                                    @click="showMultipleDelete"
                                />
                            </div>
                        </div>
                        <div class="header-table-right" v-if="isSelected">
                            <div class="table-header-status">
                                <span style="color: gray; margin-right: 4px"
                                    >{{ language.contentText.statusText }}
                                </span>
                                <BaseDropdownVue
                                    :choose="language.dropdownValue.status"
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
                                :placeholder="
                                    language.placeholder.allOganization
                                "
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
                                            :placeholder="
                                                language.placeholder
                                                    .allOganization
                                            "
                                            @ValueChanged="valueOrganization"
                                        />
                                    </div>
                                </template>
                                <template #content>
                                    <DxTreeView
                                        :ref="departmentRefTreeView"
                                        :placeholder="
                                            language.placeholder.seacrh
                                        "
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
                                        :expandNodesRecursive="true"
                                        :noDataText="
                                            language.missionDetailText.noData
                                        "
                                    >
                                        <DxSearchEditorOptions
                                            :placeholder="
                                                language.placeholder.seacrh
                                            "
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
                                <b>{{ language.tooltipText.refresh }}</b>
                            </DxTooltip>
                            <BaseButtonVue
                                id="filter"
                                class="outline-btn-icon marright-8"
                                @click="onOpenFilter"
                            />

                            <DxTooltip
                                target="#filter"
                                show-event="dxhoverstart"
                                hide-event="dxhoverend"
                            >
                                <b>{{ language.tooltipText.filter }}</b>
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
                                <b>{{ language.tooltipText.export }}</b>
                            </DxTooltip>
                            <BaseButtonVue
                                id="setting"
                                class="outline-btn-icon"
                                :class="isSetting ? 'active' : ''"
                                @click="onOpenSetting"
                            />

                            <DxTooltip
                                target="#setting"
                                show-event="dxhoverstart"
                                hide-event="dxhoverend"
                            >
                                <b>{{ language.tooltipText.setting }}</b>
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
                        :collumn="language.tableEmployeeCollumn"
                        :isHover="true"
                        :clearSelection="isClear"
                        :height="'calc(100% - 120px)'"
                        :pageSize="pageSize"
                        @showPopup="showPopup($event)"
                        @selectedRows="selectEntity($event)"
                        @rawOnSelectionChanged="selectRows"
                        @editData="onEdit($event)"
                    />
                    <DxLoadPanel
                        :position="position"
                        v-model:visible="loadingVisible"
                        :show-indicator="true"
                        :show-pane="false"
                        :shading="false"
                        :indicator-src="indicatorUrl"
                        message=""
                    />

                    <div class="content-footer">
                        <div class="total-page">
                            <p class="marright-6">
                                {{ language.contentText.totalRecords }}
                            </p>
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
                                <span
                                    class="pagination-table-row-number marright-6"
                                    >{{ language.misionListText.from }}
                                    <b>{{ pageSize * (pageNumber - 1) + 1 }}</b>
                                    {{ language.misionListText.to }}
                                    <b>
                                        {{
                                            pageSize * pageNumber > total
                                                ? total
                                                : pageSize * pageNumber
                                        }}
                                    </b>
                                </span>
                                <span class="pagination-table-row-title">{{
                                    language.contentText.recordText
                                }}</span>
                            </div>
                            <div class="pagination-button marleft-16">
                                <div
                                    class="pagination-button-prev"
                                    :class="pageNumber == 1 && 'opacity03'"
                                    :title="language.title.back"
                                    @click="backPage"
                                ></div>
                                <div
                                    class="pagination-button-next marleft-24"
                                    :class="
                                        Math.ceil(this.total / this.pageSize) <=
                                            pageNumber && 'opacity03'
                                    "
                                    :title="language.title.nextPage"
                                    @click="nextPage"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div class="setting" v-if="isSetting">
                        <div class="setting-header">
                            <div class="filter-title">
                                <span>{{
                                    language.misionListText.custonCollumn
                                }}</span>
                                <i
                                    class="fa-solid fa-xmark modal-header-icon"
                                    @click="onOpenSetting"
                                ></i>
                            </div>
                            <DxTextBox
                                :placeholder="language.placeholder.seacrh"
                            />
                        </div>
                        <div class="setting-body">
                            <ul class="setting-list">
                                <li
                                    class="setting-item"
                                    v-for="collumn in language.setting"
                                >
                                    <span>
                                        <input
                                            type="checkbox"
                                            class="input-checkbox"
                                            :checked="true"
                                        />
                                        {{ collumn }}
                                    </span>
                                    <div class="dragdrop-icon"></div>
                                </li>
                            </ul>
                        </div>
                        <div class="setting-footer">
                            <BaseButtonVue :title="language.title.default" />
                            <BaseButtonVue
                                :title="language.title.apply"
                                class="pri-btn marleft-8"
                            />
                        </div>
                    </div>
                    <div
                        class="overlay-2"
                        v-if="isSetting"
                        @click.self="onOpenSetting"
                    ></div>
                </div>
                <div class="filter" v-if="isFilter">
                    <div class="filter-header">
                        <div class="filter-title">
                            <span>{{ language.misionListText.filter }}</span>
                            <i
                                class="fa-solid fa-xmark modal-header-icon"
                                @click="onOpenFilter"
                            ></i>
                        </div>
                        <DxTextBox :placeholder="language.placeholder.seacrh">
                            <DxButton
                                :element-attr="buttonSearch"
                                location="after"
                                icon="search"
                                name="search"
                            />
                        </DxTextBox>
                    </div>
                    <div class="filter-body">
                        <ul class="filter-list">
                            <li
                                class="filter-item"
                                v-for="collumn in language.filter"
                            >
                                <input type="checkbox" class="input-checkbox" />
                                {{ collumn }}
                            </li>
                        </ul>
                    </div>
                    <div class="filter-footer">
                        <BaseButtonVue :title="language.title.noFilter" />
                        <BaseButtonVue
                            :title="language.title.apply"
                            @click="onApply"
                            class="pri-btn"
                        />
                    </div>
                </div>
            </div>
        </div>

        <BasePopupVue
            v-if="popupVisible"
            :title="language.title.warning"
            @closeModal="closePopup"
            id="delete"
            :missionID="missionID"
        >
            <p>{{ language.misionListText.deleteMsg }}</p>
        </BasePopupVue>
        <BasePopupVue
            v-if="popupMultipleDelete"
            :title="language.title.warning"
            @closeModal="closeMultipleDelete"
            @deleteMultiple="onDeleteMultiple"
            id="deleteMultiple"
        >
            <p>{{ language.misionListText.multiDeleteMsg }}</p>
        </BasePopupVue>
        <BasePopupVue
            v-if="popupStatus"
            :title="
                typeMode == 1 ? language.title.accept : language.title.refuse
            "
            @closeModal="togglePopupStatus"
            @acceptChange="changeStatus($event)"
            :status="typeMode"
            id="status"
        >
            <p>
                {{ language.misionListText.sure }}
                {{
                    typeMode == 1
                        ? language.title.accept
                        : language.title.refuse
                }}
                {{ language.misionListText.selectedApplication }}
            </p>
        </BasePopupVue>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { useRouter } from "vue-router";
import BaseButtonVue from "../base/BaseButton.vue";
import { useStore } from "vuex";
import { computed } from "vue";
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
import { DxLoadPanel } from "devextreme-vue/load-panel";
import { placeholder } from "../../common/resources";
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
    filter,
    setting,
    title,
    misionListText,
} from "../../common/resources";
import BaseTable from "../base/BaseTable.vue";
import axios from "axios";

export default {
    name: "EmployeeList",
    components: {
        DxLoadPanel,
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
    // Lấy dữ liệu khi bắt đầu khởi tạo
    mounted() {
        loadMessages(deMessages);
        locale(navigator.language);
        this.onLoadData();
        this.getListOrganization();
    },
    watch: {
        // Khi danh sách đơn thay đổi
        missionAllownce: {
            handler(val) {
                if (val && val.length > 0) {
                    let indexs = [];
                    // Lặp qua mảng id nhân viên đã chọn
                    this.selectedRowsData.forEach((item) => {
                        // Lấy ra mảng id danh sách nhân viên
                        var ids = this.missionAllownce.map(
                            (x) => x.missionAllowanceID
                        );
                        // Lấy ra vị trí id nhân viên có trong danh sách nhân viên
                        var index = ids.findIndex((y) => y == item);
                        if (index != -1) {
                            indexs.push(index);
                        }
                    });
                    var me = this;
                    var time = 300;
                    // Gọi tới hàm và truyền mảng vị trí id đã tích chọn
                    setTimeout(() => {
                        me.$refs["missionGrid"] &&
                            me.$refs["missionGrid"].selectRowsByIndexes(indexs);
                    }, time);
                }
            },
        },
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
    methods: {
        onApply() {
            var lstHeader = [];
            setting.forEach((item) => {
                var check = tableEmployeeCollumn.find(
                    (x) => item.dataField == x.dataField
                );
                if (check != null) {
                    check.visible = item.visible;
                    lstHeader.push(check);
                }
            });
            tableEmployeeCollumn = lstHeader;
        },
        /**
         * Thực hiện đóng popup trạng thái
         **  Author: Nguyễn Quang Minh(3/1/2023)
         */
        togglePopupStatus(type) {
            this.popupStatus = !this.popupStatus;
            this.typeMode = type;
        },
        /**
         * Thực hiện ẩn hiện UI tích chọn ẩn hiện các cột trong bảng
         **  Author: Nguyễn Quang Minh(1/1/2023)
         */
        onOpenSetting() {
            this.isSetting = !this.isSetting;
        },
        /**
         * Thực hiện ẩn hiện UI tích chọn ẩn hiện bộ lọc tìm kiếm theo các cột
         **  Author: Nguyễn Quang Minh(1/1/2023)
         */
        onOpenFilter() {
            this.isFilter = !this.isFilter;
        },
        /**
         * Thực hiện Load lại api khi value đơn vị thay đổi
         **  Author: Nguyễn Quang Minh(12/12/2022)
         */
        valueOrganization(e) {
            if (e.value == "" && e.previousValue != "") {
                this.currentOrganization = "";
                this.pageNumber = 1;
                this.onLoadData();
            }
        },
        /**
         * Thực hiện xử lý khi ấn bỏ chọn
         **  Author: Nguyễn Quang Minh(12/12/2022)
         */
        clearSelection() {
            this.isClear = !this.isClear;
            this.selectedRowsData = [];
            this.arraySelected = [];
            this.isSelected = true;
        },
        /**
         * Thực hiện xử lý ẩn hiện nút nhâp excel
         **  Author: Nguyễn Quang Minh(12/12/2022)
         */
        onToggleImport() {
            this.isImport = !this.isImport;
        },
        /**
         * Thực hiện xử lý khi tích chọn hàng trong table danh sách đã chọn
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        selectEntity(e) {
            // Kiểm tra có phải next trang không
            if (e.currentSelectedRowKeys.length > 0) {
                // Thêm id hàng đã tích thêm vào mảng
                this.selectedRowsData = [
                    ...this.selectedRowsData,
                    ...e.currentSelectedRowKeys,
                ];
                // Lọc những id bi trùng khỏi mảng
                this.selectedRowsData = this.selectedRowsData.reduce(function (
                    a,
                    b
                ) {
                    if (a.indexOf(b) < 0) a.push(b);
                    return a;
                },
                []);

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
            }
            if (this.isNextPage) {
                //Xóa id đã bỏ tích chọn khỏi mảng
                if (e.currentDeselectedRowKeys.length > 0) {
                    e.currentDeselectedRowKeys.forEach((x) => {
                        this.selectedRowsData = this.selectedRowsData.filter(
                            (item) => item !== x
                        );
                        this.arraySelected = this.arraySelected.filter(
                            (item) => {
                                return item.missionAllowanceID != x;
                            }
                        );
                    });
                }
            } else {
                this.isNextPage = true;
            }
            //Hiện tổng số id đã chọn
            if (this.selectedRowsData.length == 0) {
                this.isSelected = true;
            } else {
                this.isSelected = false;
            }

            // Hiện trạng thái dựa trên danh sách đơn đã chọn
            const statusArray = this.arraySelected.map((item) => {
                return item.status;
            });
            // Nếu có thì ẩn đã duyệt
            if (statusArray.includes(1)) {
                this.allownSelection = false;
            } else {
                this.allownSelection = true;
            }
            // Nếu có thì ẩn từ chối
            if (statusArray.includes(2)) {
                this.refuseSelection = false;
            } else {
                this.refuseSelection = true;
            }
            // Nếu có cả 2 thì hiện tất cả
            if (
                (statusArray.includes(2) && statusArray.includes(1)) ||
                (statusArray.includes(2) && statusArray.includes(0)) ||
                (statusArray.includes(1) && statusArray.includes(0))
            ) {
                this.refuseSelection = true;
                this.allownSelection = true;
            }
        },
        /**
         * Thực hiện xử lý chuyển trang chi tiết đơn
         **  Author: Nguyễn Quang Minh(18/12/2022)
         */
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
        /**
         * Thực hiện xử lý chuyển trang sửa
         **  Author: Nguyễn Quang Minh(18/12/2022)
         */
        changePage(id) {
            this.$router.push({
                name: "mission-allowance",
                params: { id: id.missionAllowanceID },
            });
        },
        /**
         * Thực hiện xử lý chọn đơn vị
         **  Author: Nguyễn Quang Minh(17/12/2022)
         */
        treeView_itemSelectionChanged(e) {
            this.itemSelectedId = e.component.getSelectedNodeKeys();
            // Lấy ra MisaCode
            let selected = e.component.getSelectedNodes();
            let value = { ...selected[0] };
            // Lấy ra tên đơn vị
            this.itemSelectedName = value.text;
            if (this.itemSelectedName) {
                const selectedOrganization = this.organization.filter(
                    (item) => {
                        return item.misaCode == value.key;
                    }
                );
                // Lấy ra id và load lại data
                this.currentOrganization =
                    selectedOrganization[0].organizationUnitID;
                this.pageNumber = 1;
                this.onLoadData();
            }
        },
        /**
         * Thực hiện xử lý đong popup khi xóa thành công
         **  Author: Nguyễn Quang Minh(17/12/2022)
         */
        closePopup() {
            this.popupVisible = !this.popupVisible;
            this.pageNumber = 1;
            this.onLoadData();
        },
        /**
         * Thực hiện xử lý mở popup xóa nhiều
         **  Author: Nguyễn Quang Minh(17/12/2022)
         */
        showMultipleDelete() {
            this.popupMultipleDelete = !this.popupMultipleDelete;
        },
        /**
         * Thực hiện xử lý đóng popup xóa nhiều
         **  Author: Nguyễn Quang Minh(17/12/2022)
         */
        closeMultipleDelete() {
            this.popupMultipleDelete = !this.popupMultipleDelete;
        },
        /**
         * Thực hiện xử lý mở popup xóa bản ghi đã chọn
         **  Author: Nguyễn Quang Minh(17/12/2022)
         */
        showPopup(id) {
            this.popupVisible = !this.popupVisible;
            this.missionID = id.missionAllowanceID;
        },
        /**
         * Thực hiện xử lý lấy danh sách đơn vị
         **  Author: Nguyễn Quang Minh(20/12/2022)
         */
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
        /**
         * Thực hiện xử lý xuất excel
         **  Author: Nguyễn Quang Minh(28/12/2022)
         */
        exportExcel(index) {
            let idMission;
            //index == 0 thì xuất toàn bộ bản ghi
            if (index == 0) {
                idMission = [];
            }
            // index == 1 thì xuất bản ghi đã chọn
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
        /**
         * Thực hiện xử lý đổi trạng thái cho bản ghi đã chọn
         **  Author: Nguyễn Quang Minh(28/12/2022)
         */
        changeStatus(status) {
            try {
                // Đóng popup
                this.popupStatus = false;
                this.loadingVisible = true;
                axios
                    .post(
                        "https://localhost:7093/api/MissionAllownce/updateStatus",
                        { iDs: this.selectedRowsData, status: status }
                    )
                    .then((response) => {
                        // Gán lại giá trị và load lại data
                        this.pageNumber = 1;
                        this.onLoadData();
                        this.clearSelection();
                        this.loadingVisible = false;
                        if (status == 1) {
                            this.$store.commit("setToast", {
                                isToast: true,
                                toastMessage:
                                    this.language.toastMessage.approvedSuccess,
                                toastType: "success",
                            });
                            setTimeout(() => {
                                this.$store.commit("setToast", {
                                    isToast: false,
                                    toastMessage:
                                        this.language.toastMessage
                                            .approvedSuccess,
                                    toastType: "success",
                                });
                            }, 2000);
                        } else {
                            this.$store.commit("setToast", {
                                isToast: true,
                                toastMessage:
                                    this.language.toastMessage.refuseSuccess,
                                toastType: "success",
                            });
                            setTimeout(() => {
                                this.$store.commit("setToast", {
                                    isToast: false,
                                    toastMessage:
                                        this.language.toastMessage
                                            .refuseSuccess,
                                    toastType: "success",
                                });
                            }, 2000);
                        }
                    })
                    .catch((error) => {
                        this.loadingVisible = false;
                        if ((status = 1)) {
                            this.$store.commit("setToast", {
                                isToast: true,
                                toastMessage:
                                    this.language.toastMessage.approvedSuccess,
                                toastType: "warning",
                            });
                            setTimeout(() => {
                                this.$store.commit("setToast", {
                                    isToast: false,
                                    toastMessage:
                                        this.language.toastMessage
                                            .approvedSuccess,
                                    toastType: "warning",
                                });
                            }, 2000);
                        } else {
                            this.$store.commit("setToast", {
                                isToast: true,
                                toastMessage:
                                    this.language.toastMessage.refuseSuccess,
                                toastType: "warning",
                            });
                            setTimeout(() => {
                                this.$store.commit("setToast", {
                                    isToast: false,
                                    toastMessage:
                                        this.language.toastMessage
                                            .refuseSuccess,
                                    toastType: "warning",
                                });
                            }, 2000);
                        }
                    });
            } catch (error) {
                this.loadingVisible = false;
                this.$store.commit("setToast", {
                    isToast: true,
                    toastMessage: this.language.toastMessage.messageFail,
                    toastType: "warning",
                });
                setTimeout(() => {
                    this.$store.commit("setToast", {
                        isToast: false,
                        toastMessage: this.language.toastMessage.messageFail,
                        toastType: "warning",
                    });
                }, 2000);
            }
        },
        /**
         * Thực hiện xử lý lấy dữ liệu
         **  Author: Nguyễn Quang Minh(14/12/2022)
         */
        onLoadData() {
            try {
                this.loadingVisible = true;
                axios
                    .get(
                        `https://localhost:7093/api/MissionAllownce/filter?keyword=${this.keyWord}&organizationID=${this.currentOrganization}&status=${this.selectedStatus}&pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
                    )
                    .then((response) => {
                        this.missionAllownce = response.data.data;
                        this.total = response.data.totalCount;
                        this.loadingVisible = false;
                    })
                    .catch((error) => {
                        this.loadingVisible = false;
                        this.$store.commit("setToast", {
                            isToast: true,
                            toastMessage:
                                this.language.toastMessage.messageFail,
                            toastType: "warning",
                        });
                        setTimeout(() => {
                            this.$store.commit("setToast", {
                                isToast: true,
                                toastMessage:
                                    this.language.toastMessage.messageFail,
                                toastType: "warning",
                            });
                        }, 2000);
                    });
            } catch (error) {
                this.$store.state.toastType = "warning";
                this.$store.state.toastMessage =
                    this.language.toastMessage.messageFail;
                this.$store.state.isToast = true;
                setTimeout(() => {
                    this.$store.state.toastType = "warning";
                    this.$store.state.toastMessage =
                        this.language.toastMessage.messageFail;
                    this.$store.state.isToast = false;
                }, 2000);
            }
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
        /**
         * Thực hiện xử lý khi tìm kiếm
         **  Author: Nguyễn Quang Minh(14/12/2022)
         */
        valueChanged(e) {
            this.pageNumber = 1;
            this.keyWord = e.component._changedValue;
            this.onLoadData();
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table để chuyển trang
         **  Author: Nguyễn Quang Minh(15/12/2022)
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
         **  Author: Nguyễn Quang Minh(15/12/2022)
         */
        nextPage() {
            if (Math.ceil(this.total / this.pageSize) > this.pageNumber) {
                this.pageNumber++;
                this.isNextPage = false;
                this.onLoadData();
            }
        },
        /**
         * Thực hiện xử lý khi đổi số bản ghi trên 1 trang
         **  Author: Nguyễn Quang Minh(15/12/2022)
         */
        onChangePageSize(e) {
            this.pageSize = e;
            this.pageNumber = 1;
            this.onLoadData();
        },
        /**
         * Thực hiện xử lý khi chọn trạng thái
         **  Author: Nguyễn Quang Minh(15/12/2022)
         */
        onChooseStatus(e) {
            // Trạng thái đơn chờ duyệt
            if (e == this.language.statusText.NotApproved) {
                this.selectedStatus = 0;
            }
            // Trạng thái đơn đã duyệt
            else if (e == this.language.statusText.Approved) {
                this.selectedStatus = 1;
            }
            // Trạng thái đơn từ chối
            else if (e == this.language.statusText.Refuse) {
                this.selectedStatus = 2;
            }
            // Trạng thái đơn tất cả
            else {
                this.selectedStatus = 3;
            }
            this.pageNumber = 1;
            this.onLoadData();
        },
        /**
         * Thực hiện xử lý xóa nhiều bản ghi đã chọn
         **  Author: Nguyễn Quang Minh(27/12/2022)
         */
        onDeleteMultiple() {
            this.popupMultipleDelete = !this.popupMultipleDelete;
            this.loadingVisible = true;
            try {
                axios
                    .post(
                        "https://localhost:7093/api/MissionAllownce/deleteBatch",
                        { iDs: this.selectedRowsData }
                    )
                    .then((response) => {
                        this.pageNumber = 1;
                        this.onLoadData();
                        this.clearSelection();
                        this.loadingVisible = false;
                        this.$store.commit("setToast", {
                            isToast: true,
                            toastMessage:
                                this.language.toastMessage.deleteSuccess,
                            toastType: "success",
                        });
                        setTimeout(() => {
                            this.$store.commit("setToast", {
                                isToast: false,
                                toastMessage:
                                    this.language.toastMessage.deleteSuccess,
                                toastType: "success",
                            });
                        }, 2000);
                    })
                    .catch((error) => {
                        this.loadingVisible = false;
                        this.$store.commit("setToast", {
                            isToast: true,
                            toastMessage: this.language.toastMessage.deleteFail,
                            toastType: "warning",
                        });
                        setTimeout(() => {
                            this.$store.commit("setToast", {
                                isToast: false,
                                toastMessage:
                                    this.language.toastMessage.deleteFail,
                                toastType: "warning",
                            });
                        }, 2000);
                    });
            } catch (error) {
                this.loadingVisible = false;
                this.$store.commit("setToast", {
                    isToast: true,
                    toastMessage: this.language.toastMessage.messageFail,
                    toastType: "warning",
                });
                setTimeout(() => {
                    this.$store.commit("setToast", {
                        isToast: false,
                        toastMessage: this.language.toastMessage.messageFail,
                        toastType: "warning",
                    });
                }, 2000);
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
            // tableEmployeeCollumnDefault,
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
            position: { of: "#dataGrid" },
            loadingVisible: false,
            indicatorUrl:
                "https://js.devexpress.com/Content/data/loadingIcons/rolling.svg",
            filter,
            setting,
            isFilter: false,
            isSetting: false,
            placeholder,
            title,
            misionListText,
            typeMode: 1,
            popupStatus: false,
        };
    },
};
</script>
<style scoped></style>
