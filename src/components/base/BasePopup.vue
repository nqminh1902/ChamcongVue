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
                                    :placeholder="language.placeholder.seacrh"
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
                                    :placeholder="
                                        language.placeholder.allOganization
                                    "
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
                                                :placeholder="
                                                    language.placeholder
                                                        .allOganization
                                                "
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
                                            :noDataText="
                                                language.placeholder.noData
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
                                <div
                                    class="optionSelection marleft-12"
                                    v-if="selectedEmployee.length > 0"
                                >
                                    <span
                                        >{{
                                            language.missionDetailText.selected
                                        }}
                                        <b>{{
                                            selectedEmployee.length
                                        }}</b></span
                                    >
                                    <span
                                        class="marleft-24"
                                        style="color: red; cursor: pointer"
                                        @click="clearSelection"
                                        >{{
                                            language.missionDetailText
                                                .deSelected
                                        }}</span
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
                            :collumn="language.tableMissionAllownEmployee"
                            :isEditing="true"
                            :isHover="true"
                            :pageSize="pageSize"
                            @selectedRows="selectEntity($event)"
                            :clearSelection="isClear"
                        />

                        <div class="content-footer">
                            <div class="total-page">
                                <p class="marright-6">
                                    {{ language.missionDetailText.totalRecord }}
                                </p>
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
                                        >{{ language.misionListText.from }}
                                        <b>{{
                                            pageSize * (pageNumber - 1) + 1
                                        }}</b>
                                        {{ language.misionListText.to }}
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
                                        {{ language.misionListText.record }}
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
                            :title="language.title.cancel"
                            class="marright-6"
                            @click="onCloseModal"
                        />
                        <BaseButtonVue
                            v-if="id == 'warning'"
                            class="marright-6"
                            :title="language.title.dontSave"
                            @click="backPage"
                        />
                        <BaseButtonVue
                            class="pri-btn delete-btn"
                            :title="language.title.delete"
                            v-if="id == 'delete' || id == 'deleteMultiple'"
                            @click="deleteMission"
                        />
                        <BaseButtonVue
                            class="pri-btn"
                            :title="language.title.save"
                            v-if="id == 'warning'"
                            @click="saveForm"
                        />
                        <BaseButtonVue
                            class="pri-btn"
                            :class="selectedEmployee.length == 0 && 'opacity03'"
                            :title="language.title.choose"
                            v-if="id == 'add-employee'"
                            @click="addEmployee"
                        />
                        <BaseButtonVue
                            class="pri-btn"
                            :title="title"
                            v-if="id == 'status'"
                            @click="changeStatus"
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
import { useStore } from "vuex";
import { computed } from "vue";
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
        status: Number,
    },
    mounted() {
        if (this.id == "add-employee") {
            this.onLoadData();
            this.getListOrganization();
        }
    },
    setup() {
        const store = useStore();
        // Khai báo các state từ vuex
        const language = computed(() => store.state.resource);

        return { language };
    },
    watch: {
        /**
         * Thực hiện xử lý tích chọn các row đã tích khi chuyển trang
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        employee: {
            handler(val) {
                if (val && val.length > 0) {
                    let indexs = [];
                    // Lặp qua mảng id nhân viên đã chọn
                    this.selectedRowKeys.forEach((item) => {
                        // Lấy ra mảng id danh sách nhân viên
                        var ids = this.employee.map((x) => x.employeeID);
                        // lấy ra vị trí của id đã chọn từ mảng sách nhân viên
                        var index = ids.findIndex((y) => y == item);
                        // Nếu có thì thêm vị tri vào mảng
                        if (index != -1) {
                            indexs.push(index);
                        }
                    });
                    var me = this;
                    var time = 300;
                    // Gọi tới hàm và truyền mảng vị trí id đã tích chọn
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
        /**
         * Thực hiện xử lý đổi trạng thái
         **  Author: Nguyễn Quang Minh(20/12/2022)
         */
        changeStatus() {
            this.$emit("acceptChange", this.status);
        },
        /**
         * Thực hiện xử lý đóng mở popup danh sách nhân viên
         **  Author: Nguyễn Quang Minh(20/12/2022)
         */
        onCloseModal() {
            this.$emit("closeModal");
        },

        /**
         * Thực hiện xử lý trở về trang cũ
         **  Author: Nguyễn Quang Minh(20/12/2022)
         */
        backPage() {
            this.$router.push({ path: "/" });
        },

        /**
         * Thực hiện xử lý khi tích chọn hàng trong table
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        selectEntity(e) {
            // Tích chọn thêm hàng
            if (e.currentSelectedRowKeys.length > 0) {
                // Thêm id hàng đã tích thêm vào mảng
                this.selectedRowKeys = [
                    ...this.selectedRowKeys,
                    ...e.currentSelectedRowKeys,
                ];

                // Lọc những id bi trùng khỏi mảng
                this.selectedRowKeys = this.selectedRowKeys.reduce(function (
                    a,
                    b
                ) {
                    if (a.indexOf(b) < 0) a.push(b);
                    return a;
                },
                []);
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
            // Kiểm tra có phải next trang không
            if (this.isNextPage) {
                // Bỏ tích đã chọn
                if (e.currentDeselectedRowKeys.length > 0) {
                    // Lọc bỏ id đã tích
                    e.currentDeselectedRowKeys.forEach((x) => {
                        this.selectedRowKeys = this.selectedRowKeys.filter(
                            (item) => item !== x
                        );
                        // Lọc bỏ employee có employeeID đó khỏi mảng
                        this.selectedEmployee = this.selectedEmployee.filter(
                            (item) => {
                                return item.employeeID != x;
                            }
                        );
                    });
                }
                // Nếu mảng có giá trị thì hiện số bản ghi đã chọn
                if (this.selectedEmployee.length > 0) {
                    this.isSelected = true;
                } else {
                    this.isSelected = false;
                }
            } else {
                this.isNextPage = true;
            }
        },

        /**
         * Thực hiện xử lý xóa các hàng đã chọn
         **  Author: Nguyễn Quang Minh(27/12/2022)
         */
        clearSelection() {
            this.isClear = !this.isClear;
            (this.selectedEmployee = []), (this.selectedRowKeys = []);
        },

        /**
         * Thực hiện xử lý lấy dữ liệu đã chọn từ tree-view
         **  Author: Nguyễn Quang Minh(22/12/2022)
         */
        treeView_itemSelectionChanged(e) {
            // Lấy ra misacode đơn vị đã chọn
            this.itemSelectedId = e.component.getSelectedNodeKeys();
            let selected = e.component.getSelectedNodes();
            let value = { ...selected[0] };

            // Lấy ra text
            this.itemSelectedName = value.text;
            if (this.itemSelectedName) {
                // Lấy ra id của đơn vị đã chọn rồi gọi loadData tìm đơn vị đã chọn
                const selectedOrganization = this.organization.filter(
                    (item) => {
                        return item.misaCode == value.key;
                    }
                );
                this.currentOrganization =
                    selectedOrganization[0].organizationUnitID;
                this.pageNumber = 1;
                this.onLoadData();
            }
        },

        /**
         * Thực hiện xử lý lấy dữ liệu danh sách đơn vị
         **  Author: Nguyễn Quang Minh(22/12/2022)
         */
        getListOrganization() {
            try {
                axios
                    .get("https://localhost:7093/api/Organization")
                    .then((response) => {
                        this.organization = response.data;
                    })
                    .catch((error) => {
                        this.$store.commit("setToast", {
                            isToast: true,
                            toastMessage:
                                this.language.toastMessage.messageFail,
                            toastType: "warning",
                        });
                        setTimeout(() => {
                            this.$store.commit("setToast", {
                                isToast: false,
                                toastMessage:
                                    this.language.toastMessage.messageFail,
                                toastType: "warning",
                            });
                        }, 2000);
                    });
            } catch (error) {
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
         * Thực hiện xử lý lấy dữ liệu danh sách nhân viên
         **  Author: Nguyễn Quang Minh(20/12/2022)
         */
        onLoadData() {
            try {
                axios
                    .post("https://localhost:7093/api/Employee/filter", {
                        keyword: this.keyWord,
                        organizationID: this.currentOrganization,
                        pageSize: this.pageSize,
                        pageNumber: this.pageNumber,
                        employeeIDs: this.missionDetail,
                        getEmployeeIDs: [],
                    })
                    .then((response) => {
                        this.employee = response.data.data;
                        this.totalPage = response.data.totalCount;
                    })
                    .catch((error) => {
                        this.$store.commit("setToast", {
                            isToast: true,
                            toastMessage:
                                this.language.toastMessage.messageFail,
                            toastType: "warning",
                        });
                        setTimeout(() => {
                            this.$store.commit("setToast", {
                                isToast: false,
                                toastMessage:
                                    this.language.toastMessage.messageFail,
                                toastType: "warning",
                            });
                        }, 2000);
                    });
            } catch (error) {
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
         * Thực hiện xử lý bỏ chọn đơn vị đã chọn
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        valueOrganization(e) {
            if (e.value == "" && e.previousValue != "") {
                this.currentOrganization = "";
                this.pageNumber = 1;
                this.onLoadData();
            }
        },
        /**
         * Thực hiện xử lý xóa nhiều bản ghi đã chọn
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
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
                                        this.language.toastMessage
                                            .deleteSuccess,
                                    toastType: "success",
                                });
                            }, 2000);
                        })
                        .catch((error) => {
                            this.$store.commit("setToast", {
                                isToast: true,
                                toastMessage:
                                    this.language.toastMessage.deleteFail,
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
                    this.$store.commit("setToast", {
                        isToast: true,
                        toastMessage: this.language.toastMessage.messageFail,
                        toastType: "warning",
                    });
                    setTimeout(() => {
                        this.$store.commit("setToast", {
                            isToast: false,
                            toastMessage:
                                this.language.toastMessage.messageFail,
                            toastType: "warning",
                        });
                    }, 2000);
                }
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
        /**
         * Thực hiện xử lý Khi tìm kiếm
         **  Author: Nguyễn Quang Minh(22/10/2022)
         */
        valueChanged(e) {
            this.keyWord = e.value;
            this.pageNumber = 1;
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
        /**
         * Thực hiện xử lý Khi đổi số bản ghi trên 1 trang
         **  Author: Nguyễn Quang Minh(22/10/2022)
         */
        onChangePageSize(e) {
            this.pageSize = e;
            this.pageNumber = 1;
            this.onLoadData();
        },
        /**
         * Thực hiện xử lý Khi ấn chọn các nhân viên đi làm cùng
         **  Author: Nguyễn Quang Minh(23/10/2022)
         */
        addEmployee() {
            if (this.selectedEmployee.length > 0) {
                this.$emit("employeeList", this.selectedEmployee);
            }
        },
        /**
         * Thực hiện xử lý Khi ấn Lưu from
         **  Author: Nguyễn Quang Minh(4/01/2022)
         */
        saveForm() {
            this.$emit("onSave");
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
