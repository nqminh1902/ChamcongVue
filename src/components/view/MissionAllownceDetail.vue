<template lang="">
    <div class="content">
        <div class="content-header">
            <div v-if="!isEditing" class="content-title">
                <div class="content-title-left">
                    <DxButton @click="backPage" icon="arrowleft" />

                    <h2 class="content-title-text">
                        {{ webTitle }}
                    </h2>
                </div>
                <div class="content-title-btn">
                    <BaseButtonVue
                        title="Hủy"
                        @click="backPage"
                        class="marright-8"
                        :tabIndex="14"
                        @FocusOut="onTabindex"
                    />

                    <BaseButtonVue
                        title="Lưu"
                        class="pri-btn"
                        @click="Save"
                        :tabIndex="13"
                    />
                </div>
            </div>
            <div v-else class="content-title">
                <div class="content-title-left">
                    <DxButton icon="arrowleft" @click="backPage" />

                    <h2 class="content-title-text">
                        Chi tiết đề nghị đi công tác
                    </h2>
                </div>
                <div class="content-title-btn">
                    <BaseButtonVue
                        class="pri-btn"
                        title="Sửa"
                        id="edit"
                        @click="Edit"
                        :tabIndex="13"
                        @FocusOut="onTabindex"
                    />
                </div>
            </div>
            <div class="content-main">
                <div class="form-business-travel">
                    <div class="content-main-wrap">
                        <div class="form-business-travel-left">
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Người đề nghị <span>*</span>
                                </div>
                                <div
                                    class="dx-field-value"
                                    :class="
                                        validate.employeeError && 'border-error'
                                    "
                                    id="employee"
                                >
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.employeeName }}
                                    </div>
                                    <DxSelectBox
                                        :disabled="$route.params.id != '0'"
                                        drop-down-button-template="imageIcon"
                                        :visible="!isEditing"
                                        :data-source="listEmployee"
                                        :searchEnabled="true"
                                        display-expr="employeeName"
                                        value-expr="employeeID"
                                        item-template="employeeTemplete"
                                        @SelectionChanged="onValueEmployee"
                                        @opened="onEmployeeScroll"
                                        placeholder=""
                                        :accept-custom-value="true"
                                        v-model:value="
                                            missionAllowance.employeeID
                                        "
                                        noDataText="Không tìm thấy bản ghi"
                                        :tabIndex="1"
                                        @contentReady="initFocus"
                                    >
                                        <template #imageIcon="{ data }">
                                            <i
                                                class="fa-solid fa-chevron-down icon-dropdown-custom"
                                            ></i>
                                            <div
                                                v-if="validate.employeeError"
                                                class="icon-validate"
                                                id="validate-employee"
                                            ></div>
                                        </template>
                                        <template #employeeTemplete="{ data }">
                                            <div class="dropdown-flex abc">
                                                <div class="avatar marright-6">
                                                    <span class="avatar-name">{{
                                                        convertString(
                                                            data.employeeName
                                                        )
                                                    }}</span>
                                                </div>
                                                <div class="Name">
                                                    <p class="dropdown-name">
                                                        {{ data.employeeName
                                                        }}<span
                                                            style="
                                                                font-weight: 400;
                                                            "
                                                            >({{
                                                                data.employeeCode
                                                            }})</span
                                                        >
                                                    </p>
                                                    <p>
                                                        {{
                                                            data.jobPositionName
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                        </template>
                                    </DxSelectBox>
                                    <DxTooltip
                                        target="#validate-employee"
                                        show-event="dxhoverstart"
                                        hide-event="dxhoverend"
                                    >
                                        <b>Người đề nghị không được để trống</b>
                                    </DxTooltip>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Đơn vị công tác
                                </div>
                                <div class="dx-field-value">
                                    <DxTextBox
                                        :disabled="true"
                                        :value="
                                            missionAllowance.organizationUnitName
                                        "
                                        :visible="!isEditing"
                                    />
                                    <div class="value-details" v-if="isEditing">
                                        {{
                                            missionAllowance.organizationUnitName
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Ngày đề nghị <span>*</span>
                                </div>
                                <div
                                    class="dx-field-value"
                                    :class="
                                        validate.requestDateError &&
                                        'border-error'
                                    "
                                >
                                    <DxDateBox
                                        dropDownButtonTemplate="dateboxIcon"
                                        :visible="!isEditing"
                                        v-model:value="
                                            missionAllowance.requestDate
                                        "
                                        type="datetime"
                                        :display-format="'dd/MM/yyyy HH:mm'"
                                        applyButtonText="Lưu"
                                        cancelButtonText="Hủy"
                                        @ValueChanged="getValueRequetDate"
                                        :tabIndex="2"
                                        @FocusOut="blurRequestDateValidate"
                                    >
                                        <template #dateboxIcon>
                                            <div class="icon-datebox"></div>
                                            <div
                                                v-if="validate.requestDateError"
                                                class="icon-validate"
                                                id="validate-requestDate"
                                            ></div>
                                        </template>
                                    </DxDateBox>
                                    <DxTooltip
                                        target="#validate-requestDate"
                                        show-event="dxhoverstart"
                                        hide-event="dxhoverend"
                                    >
                                        <b>Ngày đề nghị không được để trống</b>
                                    </DxTooltip>
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.requestDate }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Ngày đi <span>*</span>
                                </div>
                                <div
                                    class="dx-field-value"
                                    :class="
                                        validate.fromDateError && 'border-error'
                                    "
                                >
                                    <DxDateBox
                                        dropDownButtonTemplate="dateboxIcon"
                                        :visible="!isEditing"
                                        v-model:value="
                                            missionAllowance.fromDate
                                        "
                                        type="datetime"
                                        :display-format="'dd/MM/yyyy HH:mm'"
                                        applyButtonText="Lưu"
                                        cancelButtonText="Hủy"
                                        @ValueChanged="getValueFromDate"
                                        @FocusOut="blurFromDateValidate"
                                        :tabIndex="3"
                                    >
                                        <template #dateboxIcon>
                                            <div class="icon-datebox"></div>
                                            <div
                                                v-if="validate.fromDateError"
                                                class="icon-validate"
                                                id="validate-toDate"
                                            ></div>
                                        </template>
                                    </DxDateBox>
                                    <DxTooltip
                                        target="#validate-toDate"
                                        show-event="dxhoverstart"
                                        hide-event="dxhoverend"
                                    >
                                        <b>{{ fromDateMessage }}</b>
                                    </DxTooltip>
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.fromDate }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Ngày về <span>*</span>
                                </div>
                                <div
                                    class="dx-field-value"
                                    :class="
                                        validate.toDateError && 'border-error'
                                    "
                                >
                                    <DxDateBox
                                        dropDownButtonTemplate="dateboxIcon"
                                        :visible="!isEditing"
                                        v-model:value="missionAllowance.toDate"
                                        type="datetime"
                                        :display-format="'dd/MM/yyyy HH:mm'"
                                        applyButtonText="Lưu"
                                        cancelButtonText="Hủy"
                                        @ValueChanged="getValueToDate"
                                        @FocusOut="blurToDateValidate"
                                        :tabIndex="4"
                                    >
                                        <template #dateboxIcon>
                                            <div class="icon-datebox"></div>
                                            <div
                                                v-if="validate.toDateError"
                                                class="icon-validate"
                                                id="validate-formDate"
                                            ></div>
                                        </template>
                                    </DxDateBox>
                                    <DxTooltip
                                        target="#validate-formDate"
                                        show-event="dxhoverstart"
                                        hide-event="dxhoverend"
                                    >
                                        <b>{{ toDateMessage }}</b>
                                    </DxTooltip>
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.toDate }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Số ngày đi công tác
                                </div>
                                <div class="dx-field-value">
                                    <DxNumberBox
                                        :visible="!isEditing"
                                        v-model:value="
                                            missionAllowance.leaveDay
                                        "
                                        :min="0"
                                        :show-spin-buttons="true"
                                        :tabIndex="5"
                                    />
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.leaveDay }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Địa điểm công tác <span>*</span>
                                </div>
                                <div
                                    class="dx-field-value"
                                    :class="
                                        validate.locationError && 'border-error'
                                    "
                                >
                                    <DxTextBox
                                        :visible="!isEditing"
                                        v-model:value="
                                            missionAllowance.location
                                        "
                                        @ValueChanged="validateLocation"
                                        @FocusOut="blurLocationValidate"
                                        :tabIndex="6"
                                    />
                                    <div class="validate-location">
                                        <div
                                            v-if="validate.locationError"
                                            class="icon-validate"
                                            id="validate-location"
                                        ></div>
                                        <DxTooltip
                                            target="#validate-location"
                                            show-event="dxhoverstart"
                                            hide-event="dxhoverend"
                                        >
                                            <b
                                                >Địa điểm công tác không được để
                                                trống</b
                                            >
                                        </DxTooltip>
                                    </div>

                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.location }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Lý do công tác <span>*</span>
                                </div>
                                <div
                                    class="dx-field-value"
                                    :class="
                                        validate.purposeError && 'border-error'
                                    "
                                >
                                    <DxTextArea
                                        :visible="!isEditing"
                                        :height="90"
                                        :max-length="255"
                                        v-model:value="missionAllowance.purpose"
                                        @ValueChanged="validatePerpose"
                                        @FocusOut="blurPurposeValidate"
                                        :tabIndex="7"
                                    />
                                    <div class="validate-purpose">
                                        <div
                                            v-if="validate.purposeError"
                                            class="icon-validate"
                                            id="validate-purpose"
                                        ></div>
                                        <DxTooltip
                                            target="#validate-purpose"
                                            show-event="dxhoverstart"
                                            hide-event="dxhoverend"
                                        >
                                            <b
                                                >Lý do công tác không được để
                                                trống</b
                                            >
                                        </DxTooltip>
                                    </div>
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.purpose }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-business-travel-right">
                            <div class="dx-field">
                                <div class="dx-field-label">Yêu cầu hỗ trợ</div>
                                <div class="dx-field-value">
                                    <DxTextArea
                                        v-model:value="missionAllowance.request"
                                        :visible="!isEditing"
                                        :height="90"
                                        :max-length="255"
                                        :tabIndex="8"
                                    />
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.request }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">Người hỗ trợ</div>
                                <div class="dx-field-value">
                                    <DxTagBox
                                        :visible="!isEditing"
                                        :data-source="listSupport"
                                        display-expr="employeeName"
                                        value-expr="employeeID"
                                        item-template="support"
                                        placeholder=""
                                        @selection-changed="getSupportSelection"
                                        @opened="onSupportScroll"
                                        :buttons="buttonTagBox"
                                        :accept-custom-value="true"
                                        :value="supportIDArray"
                                        noDataText="Không tìm thấy bản ghi"
                                        tabIndex="9"
                                    >
                                        <template #support="{ data }">
                                            <div
                                                class="dropdown-list-item support"
                                            >
                                                <div class="avatar marright-6">
                                                    <span class="avatar-name"
                                                        >ĐL</span
                                                    >
                                                </div>
                                                <div class="Name">
                                                    <p class="dropdown-name">
                                                        {{ data.employeeName
                                                        }}<span
                                                            style="
                                                                font-weight: 400;
                                                            "
                                                            >({{
                                                                data.employeeCode
                                                            }})</span
                                                        >
                                                    </p>
                                                    <p>
                                                        {{
                                                            data.jobPositionName
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                        </template>
                                    </DxTagBox>
                                    <i
                                        :class="isEditing && 'display-none'"
                                        class="fa-solid fa-chevron-down icon-dropdown"
                                    ></i>
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.supportNames }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Người duyệt <span>*</span>
                                </div>
                                <div
                                    class="dx-field-value"
                                    :class="
                                        validate.approvalError && 'border-error'
                                    "
                                >
                                    <DxSelectBox
                                        drop-down-button-template="imageIcon"
                                        :visible="!isEditing"
                                        :data-source="listApproval"
                                        :searchEnabled="true"
                                        display-expr="employeeName"
                                        value-expr="employeeID"
                                        item-template="approvalTemplete"
                                        placeholder=""
                                        @SelectionChanged="onValueApproval"
                                        @opened="onApprovalScroll"
                                        :accept-custom-value="true"
                                        :value="missionAllowance.approvalToID"
                                        noDataText="Không tìm thấy bản ghi"
                                        :tabIndex="10"
                                    >
                                        <template #imageIcon="{}">
                                            <i
                                                class="fa-solid fa-chevron-down icon-dropdown-custom"
                                            ></i>
                                            <div
                                                v-if="validate.approvalError"
                                                class="icon-validate"
                                                id="validate-error"
                                            ></div>
                                        </template>
                                        <template #approvalTemplete="{ data }">
                                            <div class="dropdown-flex approval">
                                                <div class="avatar marright-6">
                                                    <span class="avatar-name">{{
                                                        convertString(
                                                            data.employeeName
                                                        )
                                                    }}</span>
                                                </div>
                                                <div class="Name">
                                                    <p class="dropdown-name">
                                                        {{ data.employeeName
                                                        }}<span
                                                            style="
                                                                font-weight: 400;
                                                            "
                                                            >({{
                                                                data.employeeCode
                                                            }})</span
                                                        >
                                                    </p>
                                                    <p>
                                                        {{
                                                            data.jobPositionName
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                        </template>
                                    </DxSelectBox>
                                    <DxTooltip
                                        target="#validate-error"
                                        show-event="dxhoverstart"
                                        hide-event="dxhoverend"
                                    >
                                        <b>Người duyệt không được để trống</b>
                                    </DxTooltip>
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.approvalName }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Người liên quan
                                </div>
                                <div class="dx-field-value">
                                    <DxTagBox
                                        :visible="!isEditing"
                                        :data-source="listRelationship"
                                        display-expr="employeeName"
                                        value-expr="employeeID"
                                        item-template="relationShip"
                                        placeholder=""
                                        @selection-changed="
                                            getRelationshipSelection
                                        "
                                        :buttons="buttonTagBox"
                                        @opened="onRelationshipScroll"
                                        :accept-custom-value="true"
                                        :value="relationShipIDArray"
                                        noDataText="Không tìm thấy bản ghi"
                                        :tabIndex="11"
                                    >
                                        <template #relationShip="{ data }">
                                            <div
                                                class="dropdown-list-item relationship"
                                            >
                                                <div class="avatar marright-6">
                                                    <span class="avatar-name"
                                                        >ĐL</span
                                                    >
                                                </div>
                                                <div class="Name">
                                                    <p class="dropdown-name">
                                                        {{ data.employeeName
                                                        }}<span
                                                            style="
                                                                font-weight: 400;
                                                            "
                                                            >({{
                                                                data.employeeCode
                                                            }})</span
                                                        >
                                                    </p>
                                                    <p>
                                                        {{
                                                            data.jobPositionName
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                        </template>
                                    </DxTagBox>
                                    <i
                                        :class="isEditing && 'display-none'"
                                        class="fa-solid fa-chevron-down icon-dropdown"
                                    ></i>
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.relationShipNames }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    Trạng thái <span>*</span>
                                </div>
                                <div
                                    class="dx-field-value"
                                    :class="
                                        validate.statusError && 'border-error'
                                    "
                                >
                                    <DxSelectBox
                                        drop-down-button-template="imageIcon"
                                        :visible="!isEditing"
                                        :data-source="statusDropdown"
                                        :searchEnabled="true"
                                        display-expr="statusName"
                                        value-expr="id"
                                        item-template="statusTemplete"
                                        placeholder=""
                                        @SelectionChanged="onValueStatus"
                                        :accept-custom-value="true"
                                        :value="missionAllowance.status"
                                        :tabIndex="12"
                                    >
                                        <template #imageIcon="{}">
                                            <i
                                                class="fa-solid fa-chevron-down icon-dropdown-custom"
                                            ></i>
                                            <div
                                                v-if="validate.statusError"
                                                class="icon-validate"
                                                id="status-error"
                                            ></div>
                                        </template>
                                        <template #statusTemplete="{ data }">
                                            <div class="dropdown-flex status">
                                                <span>{{
                                                    data.statusName
                                                }}</span>
                                            </div>
                                        </template>
                                    </DxSelectBox>
                                    <DxTooltip
                                        target="#status-error"
                                        show-event="dxhoverstart"
                                        hide-event="dxhoverend"
                                    >
                                        <b>Trang thái không được để trống</b>
                                    </DxTooltip>
                                    <div class="value-details" v-if="isEditing">
                                        <BaseStatusVue
                                            :id="missionAllowance.status"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-full martop-32">
                        <h2 class="content-title-text">
                            Danh sách nhân viên đi công tác
                            <span
                                class="selected-employee marleft-16"
                                v-if="selectedRowsData.length > 0"
                            >
                                Đã chọn <b>{{ selectedRowsData.length }}</b>
                                <span
                                    class="marleft-16"
                                    style="color: blue; cursor: pointer"
                                    @click="clearSelection"
                                    >Bỏ chọn</span
                                >
                                <span
                                    class="marleft-16"
                                    style="color: red; cursor: pointer"
                                    @click="removeSelectionItem"
                                    >Loại bỏ</span
                                >
                            </span>
                        </h2>
                        <div
                            v-if="missionAllownEmployee.length == 0"
                            class="business-travel-list"
                        >
                            <span class="no-data"
                                >Chưa có dữ liệu
                                <BaseButtonVue
                                    v-if="!isEditing"
                                    class="bgcolor-white marleft-6"
                                    title="Thêm"
                                    id="add"
                                    @click="togglePopup"
                                />
                            </span>
                        </div>
                        <div v-else class="business-travel-list">
                            <div class="feature-edit-grid" v-if="!isEditing">
                                <div class="add-popup" @click="togglePopup">
                                    <i class="fa-solid fa-plus"></i>
                                    <span>Thêm</span>
                                </div>
                                <span
                                    >Tổng số bản ghi:
                                    <b>{{
                                        missionAllownEmployee.length
                                    }}</b></span
                                >
                            </div>
                            <div class="feature-edit-grid" v-else>
                                <DxTextBox
                                    placeholder="Tìm kiếm"
                                    :width="'320px'"
                                    :height="'36px'"
                                    :element-attr="inputText"
                                    @FocusOut="onSearch"
                                    @KeyDown="onEnterSearch"
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
                            </div>
                            <BaseTable
                                id="business-travel-employee"
                                keyExpr="employeeID"
                                :dataSource="missionAllownEmployee"
                                :isEditing="!isEditing"
                                :isHover="true"
                                :border="true"
                                :collumn="tableMissionDetail"
                                @removeSelection="toggleDeletePopup($event)"
                                @selectedRows="selectEntity($event)"
                                :clearSelection="isClear"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-business-travel martop-16">
                    <h2 class="content-title-text">Ghi chú</h2>
                    <div class="form-business-travel-note">
                        <div class="avatar martop-16">
                            <span class="avatar-name">ĐL</span>
                        </div>
                        <div class="dx-field-value marleft-16 martop-16 flex-1">
                            <DxTextBox placeholder="Nhập ghi chú"> </DxTextBox>
                        </div>
                    </div>
                    <div class="form-business-travel-description">
                        <p>Nhấn ESC để <span>Hủy</span></p>
                    </div>
                    <div class="form-business-travel-option">
                        <span class="marright-40 option-item">Tất cả</span>
                        <span class="marright-40 option-item active"
                            >Ghi chú</span
                        >
                        <span class="marright-40 option-item"
                            >Nhật kí hoạt động</span
                        >
                    </div>
                    <hr class="hr-class" />
                    <div class="martop-32"></div>
                </div>
            </div>
        </div>
        <BasePopupVue
            v-if="popupVisible"
            @closeModal="togglePopup"
            title="Chọn Nhân viên"
            id="add-employee"
            :missionDetail="missionAllowance.employeeIDs"
            @employeeList="onMissionEmployeeData($event)"
        />
        <BasePopupVue
            v-if="showEditPopup"
            @closeModal="closeChangePopup"
            title="Thông báo"
            id="warning"
        >
            <p>Thông tin đã bị thay đổi bạn có muốn lưu lại không?</p>
        </BasePopupVue>
        <BasePopupVue
            v-if="popupMultipleDelete"
            title="Cảnh báo"
            @closeModal="toggleDeletePopup"
            id="deleteMultiple"
            @deleteMultiple="removeEmployee"
        >
            <p>
                {{ popupMessage.deleteEmployeeMsg1 }}
                <b>{{ deleteEmployeeID.employeeName }}</b>
                {{ popupMessage.deleteEmployeeMsg2 }}
            </p>
        </BasePopupVue>
    </div>
</template>
<script>
import _ from "lodash";
import DxTextArea from "devextreme-vue/text-area";
import deMessages from "devextreme/localization/messages/de.json";
import { locale, loadMessages } from "devextreme/localization";
import DxButton from "devextreme-vue/button";
import { DxNumberBox } from "devextreme-vue/number-box";
import { DxTextBoxButton, DxTextBox } from "devextreme-vue/text-box";
import DxDropDownBox from "devextreme-vue/drop-down-box";
import DxDateBox from "devextreme-vue/date-box";
import BaseButtonVue from "../base/BaseButton.vue";
import BasePopupVue from "../base/BasePopup.vue";
import BaseTable from "../base/BaseTable.vue";
import DxTagBox from "devextreme-vue/tag-box";
import { DxSelectBox } from "devextreme-vue/select-box";
import { DxAutocomplete } from "devextreme-vue/autocomplete";
import { DxTooltip } from "devextreme-vue/tooltip";
import {
    statusDropdown,
    ErrorMessage,
    tableMissionDetail,
    popupMessage,
} from "../../common/resources";
import BaseStatusVue from "../base/BaseStatus.vue";
import {
    DxDataGrid,
    DxColumn,
    DxSearchPanel,
    DxItem,
    DxSelection,
} from "devextreme-vue/data-grid";
import DxList from "devextreme-vue/list";
import BaseComboboxVue from "../base/BaseCombobox.vue";
import DxValidator, {
    DxCustomRule,
    DxRangeRule,
} from "devextreme-vue/validator";
import axios from "axios";

export default {
    name: "EmployeeDetail",
    components: {
        DxAutocomplete,
        DxTooltip,
        BaseStatusVue,
        DxButton,
        BaseButtonVue,
        DxTextBox,
        DxDropDownBox,
        DxDateBox,
        DxNumberBox,
        DxTextArea,
        DxDataGrid,
        DxColumn,
        DxSearchPanel,
        DxList,
        DxTextBoxButton,
        BaseComboboxVue,
        BasePopupVue,
        DxValidator,
        DxCustomRule,
        DxTagBox,
        DxItem,
        DxSelectBox,
        DxRangeRule,
        DxSelection,
        BaseTable,
    },
    created() {
        loadMessages(deMessages);
        locale(navigator.language);
    },
    mounted() {
        if (this.$route.params.id != 0) {
            this.loadMission(this.$route.params.id);
            this.loadMissionDetail(this.$route.params.id);
            if (this.$route.query.isEdit == "false") {
                this.webTitle = "Chi tiết đề nghị đi công tác";
                this.isEditing = true;
            } else {
                this.webTitle = "Sửa đề nghị đi công tác";
                this.isEditing = false;
            }
        } else {
            this.webTitle = "Thêm mới đề nghị đi công tác";
            this.isEditing = false;
            this.cloneMissionAllowance = { ...this.missionAllowance };
            this.missionAllowance.status = 0;
        }
        this.loadEmployee();
        this.loadApproval();
        this.loadRelationship();
        this.loadSupport();
    },
    methods: {
        test(e) {
            console.log(e);
            console.log(this.missionAllowance.employeeName);
        },
        toggleDeletePopup(e) {
            this.popupMultipleDelete = !this.popupMultipleDelete;
            this.deleteEmployeeID = e;
        },
        blurEmployeeValidate() {
            if (this.missionAllowance.employeeName == "") {
                this.validate.employeeError = true;
            } else {
                this.validate.employeeError = false;
            }
        },
        blurRequestDateValidate(e) {
            if (!this.missionAllowance.requestDate) {
                this.validate.requestDateError = true;
            } else {
                this.validate.requestDateError = false;
            }
        },
        blurFromDateValidate() {
            if (!this.missionAllowance.fromDate) {
                this.validate.fromDateError = true;
            } else {
                this.validate.fromDateError = false;
            }
        },
        blurToDateValidate() {
            if (!this.missionAllowance.toDate) {
                this.validate.toDateError = true;
            } else {
                this.validate.toDateError = false;
                this.validateDate();
            }
        },
        blurLocationValidate() {
            if (!this.missionAllowance.location) {
                this.validate.locationError = true;
            } else {
                this.validate.locationError = false;
            }
        },
        blurPurposeValidate() {
            if (!this.missionAllowance.purpose) {
                this.validate.purposeError = true;
            } else {
                this.validate.purposeError = false;
            }
        },
        blurApprovalValidate(e) {
            if (!this.missionAllowance.approvalName) {
                console.log(e);
                this.validate.approvalError = true;
            } else {
                this.validate.approvalError = false;
            }
        },
        blurStatusValidate() {
            if (this.missionAllowance.status == "") {
                this.validate.statusError = true;
            } else {
                this.validate.statusError = false;
            }
        },
        initFocus(e) {
            e.component.focus();
        },
        onTabindex() {
            this.$refs.input.focus();
        },
        clearSelection() {
            this.isClear = !this.isClear;
        },
        loadMission(id) {
            axios
                .get(`https://localhost:7093/api/MissionAllownce/${id}`)
                .then((response) => {
                    this.missionAllowance = response.data;
                    this.cloneMissionAllowance = {
                        ...response.data,
                        employeeIDs: [],
                    };

                    if (!this.missionAllowance.supportIDs) {
                        this.supportIDArray = [];
                        this.supportNameArray = [];
                    } else {
                        this.supportIDArray =
                            response.data.supportIDs.split(", ");
                        this.supportNameArray =
                            response.data.supportNames.split(", ");
                    }
                    if (!this.missionAllowance.relationShipIDs) {
                        this.relationShipIDArray = [];
                        this.relationShipNameArray = [];
                    } else {
                        this.relationShipIDArray =
                            response.data.relationShipIDs.split(", ");
                        this.relationShipNameArray =
                            response.data.relationShipNames.split(", ");
                    }
                })
                .catch((error) => {
                    console.log("Lấy chi tiết đơn bị lỗi");
                });
        },
        loadMissionDetail(id) {
            axios
                .get(
                    `https://localhost:7093/api/MissionAllownceDetail/v1/${id}`
                )
                .then((response) => {
                    this.missionAllownEmployee = response.data;
                    (this.cloneMissionAllownEmployee = {
                        ...this.missionAllownEmployee,
                    }),
                        (this.missionAllowance.employeeIDs =
                            this.missionAllownEmployee.map((item) => {
                                return item.employeeID;
                            }));
                })
                .catch((error) => {
                    console.log("Lấy chi tiết đơn bị lỗi");
                });
        },
        loadEmployee() {
            axios
                .post("https://localhost:7093/api/Employee/filter", {
                    keyword: this.employeeKeyword,
                    organizationID: "",
                    pageSize: this.employeePageSize,
                    pageNumber: this.employeePageNumber,
                    employeeIDs: [],
                })
                .then((response) => {
                    this.listEmployee = [
                        ...this.listEmployee,
                        ...response.data.data,
                    ];
                    this.listEmployeeTotal = response.data.totalCount;
                })
                .catch((error) => {
                    console.log("lấy danh sách nhân viên bị lỗi");
                });
        },
        loadApproval() {
            axios
                .post("https://localhost:7093/api/Employee/filter", {
                    keyword: this.approvalNameKeyword,
                    organizationID: "",
                    pageSize: this.approvalNamePageSize,
                    pageNumber: this.approvalNamePageNumber,
                    employeeIDs: [],
                })
                .then((response) => {
                    this.listApproval = [
                        ...this.listApproval,
                        ...response.data.data,
                    ];
                    this.listApprovalTotal = response.data.totalCount;
                })
                .catch((error) => {
                    console.log("lấy danh sách nhân viên bị lỗi");
                });
        },
        loadRelationship() {
            axios
                .post("https://localhost:7093/api/Employee/filter", {
                    keyword: this.relationShipNameKeyword,
                    organizationID: "",
                    pageSize: this.relationShipNamePageSize,
                    pageNumber: this.relationShipNamePageNumber,
                    employeeIDs: [],
                })
                .then((response) => {
                    this.listRelationship = [
                        ...this.listRelationship,
                        ...response.data.data,
                    ];
                    this.listRelationshipTotal = response.data.totalCount;
                })
                .catch((error) => {
                    console.log("lấy danh sách nhân viên bị lỗi");
                });
        },
        loadSupport() {
            axios
                .post("https://localhost:7093/api/Employee/filter", {
                    keyword: this.supportNameKeyword,
                    organizationID: "",
                    pageSize: this.supportNamePageSize,
                    pageNumber: this.supportNamePageNumber,
                    employeeIDs: [],
                })
                .then((response) => {
                    this.listSupport = [
                        ...this.listSupport,
                        ...response.data.data,
                    ];
                    this.listSupportTotal = response.data.totalCount;
                })
                .catch((error) => {
                    console.log("lấy danh sách nhân viên bị lỗi");
                });
        },
        togglePopup() {
            this.popupVisible = !this.popupVisible;
        },
        closeChangePopup() {
            this.showEditPopup = !this.showEditPopup;
        },
        backPage() {
            if (
                JSON.stringify(this.cloneMissionAllowance) ==
                    JSON.stringify(this.missionAllowance) &&
                JSON.stringify(this.cloneMissionAllownEmployee) ===
                    JSON.stringify(this.missionAllownEmployee)
            ) {
                this.$router.push({ path: "/" });
            } else {
                this.showEditPopup = true;
            }
        },

        validateDate() {
            const fromDate = new Date(this.missionAllowance.fromDate);
            const toDate = new Date(this.missionAllowance.toDate);
            if (fromDate > toDate) {
                if (!this.missionAllowance.fromDate) {
                    this.validate.fromDateError = true;
                    this.fromDateMessage = ErrorMessage.requiredFromDate;
                }
                if (!this.missionAllowance.toDate) {
                    this.validate.toDateError = true;
                    this.toDateMessage = ErrorMessage.requiredToDate;
                } else {
                    this.validate.toDateError = true;
                    this.toDateMessage = ErrorMessage.invalidDate;
                }
            } else {
                let fromDateHour;
                let toDateHour;
                if (toDate.getHours() < 12) {
                    toDateHour = 0.5;
                } else {
                    toDateHour = 1;
                }
                if (fromDate.getHours() < 12) {
                    fromDateHour = 0.5;
                } else {
                    fromDateHour = 1;
                }
                this.missionAllowance.leaveDay =
                    toDate.getDate() +
                    toDateHour -
                    (fromDate.getDate() + fromDateHour);
                this.cloneMissionAllowance.leaveDay =
                    this.missionAllowance.leaveDay;
                this.validate.fromDateError = false;
            }
        },
        validateRequired(e) {
            return e.value != "";
        },
        validateLocation(e) {
            if (e.value == "") {
                this.validate.locationError = true;
            } else {
                this.validate.locationError = false;
            }
        },
        validatePerpose(e) {
            if (e.value == "") {
                this.validate.purposeError = true;
            } else {
                this.validate.purposeError = false;
            }
        },
        getRelationshipSelection(e) {
            if (e.addedItems.length > 0) {
                this.relationShipNameArray.push(e.addedItems[0].employeeName);
                this.relationShipIDArray.push(e.addedItems[0].employeeID);
                this.relationShipIDArray = [
                    ...new Set(this.relationShipIDArray),
                ];
                this.relationShipNameArray = [
                    ...new Set(this.relationShipNameArray),
                ];
            } else if (e.removedItems.length > 0) {
                this.relationShipNameArray = this.relationShipNameArray.filter(
                    (item) => {
                        return item !== e.removedItems[0].employeeName;
                    }
                );
                this.relationShipIDArray = this.relationShipIDArray.filter(
                    (item) => {
                        return item !== e.removedItems[0].employeeID;
                    }
                );
            }
            this.missionAllowance.relationShipIDs =
                this.relationShipIDArray.join(", ");
            this.missionAllowance.relationShipNames =
                this.relationShipNameArray.join(", ");
        },
        getSupportSelection(e) {
            if (e.addedItems.length > 0) {
                this.supportNameArray.push(e.addedItems[0].employeeName);
                this.supportIDArray.push(e.addedItems[0].employeeID);
                this.supportIDArray = [...new Set(this.supportIDArray)];
                this.supportNameArray = [...new Set(this.supportNameArray)];
            } else if (e.removedItems.length > 0) {
                this.supportNameArray = this.supportNameArray.filter((item) => {
                    return item !== e.removedItems[0].employeeName;
                });
                this.supportIDArray = this.supportIDArray.filter((item) => {
                    return item !== e.removedItems[0].employeeID;
                });
            }
            this.missionAllowance.supportIDs = this.supportIDArray.join(", ");
            this.missionAllowance.supportNames =
                this.supportNameArray.join(", ");
        },
        onEmployeeScroll() {
            const employee = document.querySelectorAll(".abc")[0];
            const cde =
                employee.parentNode.parentElement.parentElement.parentElement;
            cde.addEventListener("scroll", (e) => {
                const clientHeight = e.target.clientHeight;

                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;

                if (scrollTop + clientHeight >= scrollHeight) {
                    if (this.listEmployee.length < this.listEmployeeTotal) {
                        this.employeePageSize = 10;
                        this.employeePageNumber++;
                        this.loadEmployee();
                    }
                }
            });
        },
        onApprovalScroll() {
            const approval = document.querySelectorAll(".approval")[0];
            const approvalParent =
                approval.parentNode.parentElement.parentElement.parentElement;

            approvalParent.addEventListener("scroll", (e) => {
                const clientHeight = e.target.clientHeight;

                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;

                if (scrollTop + clientHeight >= scrollHeight) {
                    if (this.listApproval.length < this.listApprovalTotal) {
                        this.approvalNamePageSize = 10;
                        this.approvalNamePageNumber++;
                        this.loadApproval();
                    }
                }
            });
        },
        onRelationshipScroll() {
            const employee = document.querySelectorAll(".relationship")[0];
            const cde =
                employee.parentNode.parentElement.parentElement.parentElement;
            cde.addEventListener("scroll", (e) => {
                const clientHeight = e.target.clientHeight;

                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;

                if (scrollTop + clientHeight >= scrollHeight) {
                    if (
                        this.listRelationship.length <
                        this.listRelationshipTotal
                    ) {
                        this.relationShipNamePageSize = 10;
                        this.relationShipNamePageNumber++;
                        this.loadRelationship();
                    }
                }
            });
        },
        onSupportScroll() {
            const employee = document.querySelectorAll(".support")[0];
            const cde =
                employee.parentNode.parentElement.parentElement.parentElement;
            cde.addEventListener("scroll", (e) => {
                const clientHeight = e.target.clientHeight;

                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;

                if (scrollTop + clientHeight >= scrollHeight) {
                    if (this.listSupport.length < this.listSupportTotal) {
                        this.supportNamePageSize = 10;
                        this.supportNamePageNumber++;
                        this.loadSupport();
                    }
                }
            });
        },
        onMissionEmployeeData(e) {
            this.missionAllownEmployee = [...this.missionAllownEmployee, ...e];
            this.missionAllowance.employeeIDs = this.missionAllownEmployee.map(
                (item) => {
                    return item.employeeID;
                }
            );
            this.popupVisible = !this.popupVisible;
        },
        removeEmployee() {
            this.missionAllownEmployee = this.missionAllownEmployee.filter(
                (item) => item.employeeID !== this.deleteEmployeeID.employeeID
            );
            this.missionAllowance.employeeIDs = this.missionAllownEmployee.map(
                (item) => {
                    return item.employeeID;
                }
            );
            if (this.missionAllownEmployee.length == 0) {
                this.selectedRowsData = [];
            }
            this.popupMultipleDelete = false;
        },
        removeSelectionItem() {
            this.selectedRowsData.forEach((employee) => {
                this.missionAllownEmployee = this.missionAllownEmployee.filter(
                    (item) => item.employeeID !== employee.employeeID
                );
            });
            this.missionAllowance.employeeIDs = this.missionAllownEmployee.map(
                (item) => {
                    return item.employeeID;
                }
            );
            this.selectedRowsData = [];
        },
        selectEntity(e) {
            if (e.length > 0) {
                this.isSelected = true;
            } else {
                this.isSelected = false;
            }
            this.selectedRowsData = e.selectedRowsData;
        },
        Edit() {
            this.$router.push({
                name: "mission-allowance",
                params: { id: this.$route.params.id },
            });
            this.webTitle = "Sửa đề nghị đi công tác";
            this.isEditing = false;
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
        onValueEmployee(e) {
            if (e.selectedItem == null) {
                this.validate.employeeError = true;
            } else {
                this.validate.employeeError = false;
                this.missionAllowance.employeeName =
                    e.selectedItem.employeeName;
                this.missionAllowance.employeeCode =
                    e.selectedItem.employeeCode;
                this.missionAllowance.employeeID = e.selectedItem.employeeID;
                this.missionAllowance.organizationUnitID =
                    e.selectedItem.organizationUnitID;
                this.missionAllowance.organizationUnitName =
                    e.selectedItem.organizationUnitName;
                this.missionAllowance.jobPositionID =
                    e.selectedItem.jobPositionID;
                this.missionAllowance.jobPositionName =
                    e.selectedItem.jobPositionName;
            }
        },
        onValueSupport(e) {
            this.missionAllowance.supportIDs = e.selectedItem.employeeID;
            this.missionAllowance.supportNames = e.selectedItem.employeeName;
        },
        onValueApproval(e) {
            if (e.selectedItem == null) {
                this.validate.approvalError = true;
            } else {
                this.validate.approvalError = false;
                this.missionAllowance.approvalName =
                    e.selectedItem.employeeName;
                this.missionAllowance.approvalToID = e.selectedItem.employeeID;
            }
        },
        getValueRequetDate(e) {
            if (e.value == null) {
                this.validate.requestDateError = true;
            } else {
                this.missionAllowance.requestDate = e.value;
                this.validate.requestDateError = false;
            }
        },
        getValueFromDate(e) {
            if (e.value == null) {
                this.validate.fromDateError = true;
            } else {
                this.missionAllowance.fromDate = e.value;
                this.validate.fromDateError = false;
                this.validateDate();
            }
        },
        onValueStatus(e) {
            if (e.selectedItem == null) {
                this.validate.statusError = true;
            } else {
                this.validate.statusError = false;
                this.missionAllowance.status = e.selectedItem.id;
            }
        },
        getValueToDate(e) {
            if (e.value == null) {
                this.validate.toDateError = true;
                this.toDateMessage = ErrorMessage.requiredToDate;
            } else {
                this.validate.toDateError = false;
                this.missionAllowance.toDate = e.value;
                this.validateDate();
            }
        },
        validateForm() {
            let isvalid = true;
            if (this.missionAllowance.employeeID == "") {
                this.validate.employeeError = true;
                isvalid = false;
            } else {
                this.validate.employeeError = false;
                isvalid = true;
            }
            if (this.missionAllowance.requestDate == "") {
                this.validate.requestDateError = true;
                isvalid = false;
            } else {
                this.validate.requestDateError = false;
                isvalid = true;
            }
            if (this.missionAllowance.toDate == "") {
                this.validate.toDateError = true;
                this.toDateMessage = ErrorMessage.requiredToDate;
                isvalid = false;
            } else {
                this.validate.toDateError = false;
                isvalid = true;
            }
            if (this.missionAllowance.fromDate == "") {
                this.validate.fromDateError = true;
                isvalid = false;
            } else {
                this.validate.fromDateError = false;
                isvalid = true;
            }
            if (this.missionAllowance.location == "") {
                this.validate.locationError = true;
                isvalid = false;
            } else {
                this.validate.locationError = false;
                isvalid = true;
            }
            if (this.missionAllowance.purpose == "") {
                this.validate.purposeError = true;
                isvalid = false;
            } else {
                this.validate.purposeError = false;
                isvalid = true;
            }
            if (this.missionAllowance.approvalToID == "") {
                this.validate.approvalError = true;
                isvalid = false;
            } else {
                this.validate.approvalError = false;
                isvalid = true;
            }
            return isvalid;
        },
        getEmployeeMission() {
            if (this.missionAllownEmployee.length > 1) {
                let empName = this.missionAllownEmployee.map((item) => {
                    return item.employeeName;
                });
                let empCode = this.missionAllownEmployee.map((item) => {
                    return item.employeeCode;
                });
                let empID = this.missionAllownEmployee.map((item) => {
                    return item.employeeID;
                });
                this.missionAllowance.employeeMissionNames = empName.join(", ");
                this.missionAllowance.employeeMissionCodes = empCode.join(", ");
                this.missionAllowance.employeeMissionIDs = empID.join(", ");
            } else if (this.missionAllownEmployee.length == 1) {
                this.missionAllowance.employeeMissionNames =
                    this.missionAllownEmployee[0].employeeName;
                this.missionAllowance.employeeMissionCodes =
                    this.missionAllownEmployee[0].employeeCode;
                this.missionAllowance.employeeMissionIDs =
                    this.missionAllownEmployee[0].employeeID;
            }
        },
        Save() {
            const me = this;
            try {
                this.getEmployeeMission();
                if (this.$route.params.id != 0) {
                    // Format dữ liệu ngày tháng
                    this.missionAllowance.requestDate = new Date(
                        this.missionAllowance.requestDate
                    );
                    // Format dữ liệu ngày tháng
                    this.missionAllowance.fromDate = new Date(
                        this.missionAllowance.fromDate
                    );
                    this.missionAllowance.toDate = new Date(
                        this.missionAllowance.toDate
                    );
                    // Đổi kiểu dữ liệu trường gender sang int
                    this.missionAllowance.status = parseInt(
                        this.missionAllowance.status
                    );

                    axios
                        .put(
                            `https://localhost:7093/api/MissionAllownce/${this.$route.params.id}`,
                            this.missionAllowance
                        )
                        .then(function (response) {
                            me.$router.push({ path: "/" });
                        })
                        .catch(function (error) {
                            if (error) {
                                // Thông báo lỗi
                                console.log("Lưu bị lỗi");
                            }
                        });
                } else {
                    if (this.validateForm()) {
                        // Format dữ liệu ngày tháng
                        this.missionAllowance.requestDate = new Date(
                            this.missionAllowance.requestDate
                        );
                        // Format dữ liệu ngày tháng
                        this.missionAllowance.fromDate = new Date(
                            this.missionAllowance.fromDate
                        );
                        this.missionAllowance.toDate = new Date(
                            this.missionAllowance.toDate
                        );
                        // Đổi kiểu dữ liệu trường gender sang int
                        this.missionAllowance.status = parseInt(
                            this.missionAllowance.status
                        );
                        axios
                            .post(
                                "https://localhost:7093/api/MissionAllownce",
                                this.missionAllowance
                            )
                            .then(function (response) {
                                // Đóng và load lại trang
                                me.$router.push({ path: "/" });
                            })
                            .catch(function (error) {
                                if (error) {
                                    // Thông báo lỗi
                                    console.log("Lưu bị lỗi");
                                }
                            });
                    }
                }
            } catch (error) {
                console.log("Lưu thất bại");
            }
        },
    },
    data() {
        return {
            dataGridRefName: "data-grid",
            statusDropdown,
            now: Date(),
            missionAllownEmployee: [],
            cloneMissionAllownEmployee: [],
            employeeBussinesTravel: true,
            isEditing: false,
            toDateMessage: ErrorMessage.requiredToDate,
            fromDateMessage: ErrorMessage.requiredFromDate,
            missionAllowance: {
                organizationUnitID: "",
                organizationUnitName: "",
                requestDate: Date(),
                toDate: Date(),
                fromDate: Date(),
                leaveDay: 0,
                location: "",
                purpose: "",
                request: "",
                approvalName: "",
                approvalToID: "",
                relationShipIDs: "",
                relationShipNames: "",
                status: "",
                supportNames: "",
                supportIDs: "",
                employeeName: "",
                employeeCode: "",
                employeeID: "",
                jobPositionID: "",
                jobPositionName: "",
                employeeIDs: [],
                employeeMissionIDs: "",
                employeeMissionCodes: "",
                employeeMissionNames: "",
            },
            cloneMissionAllowance: {
                missionAllowanceID: "",
                organizationUnitID: "",
                organizationUnitName: "",
                requestDate: "",
                toDate: "",
                fromDate: "",
                leaveDay: "",
                location: "",
                purpose: "",
                request: "",
                approvalName: "",
                approvalToID: "",
                relationShipIDs: "",
                relationShipNames: "",
                status: "",
                supportNames: "",
                supportIDs: "",
                employeeName: "",
                employeeCode: "",
                employeeID: "",
                jobPositionID: "",
                jobPositionName: "",
                employeeIDs: [],
                employeeMissionIDs: "",
                employeeMissionCodes: "",
                employeeMissionNames: "",
            },
            popupVisible: false,
            showEditPopup: false,
            webTitle: "",
            employeeKeyword: "",
            employeePageSize: 10,
            employeePageNumber: 1,
            supportNameKeyword: "",
            supportNamePageSize: 10,
            supportNamePageNumber: 1,
            approvalNameKeyword: "",
            approvalNamePageSize: 10,
            approvalNamePageNumber: 1,
            relationShipNameKeyword: "",
            relationShipNamePageSize: 10,
            relationShipNamePageNumber: 1,
            listEmployee: [],
            listEmployeeTotal: 0,
            listApproval: [],
            listApprovalTotal: 0,
            listRelationship: [],
            listRelationshipTotal: 0,
            listSupport: [],
            listSupportTotal: 0,
            relationShipIDArray: [],
            relationShipNameArray: [],
            supportIDArray: [],
            supportNameArray: [],

            validate: {
                employeeError: false,
                requestDateError: false,
                toDateError: false,
                fromDateError: false,
                locationError: false,
                purposeError: false,
                approvalError: false,
                statusError: false,
            },
            selectedRowsData: [],
            isSelected: false,
            tableMissionDetail,
            isClear: false,
            deleteEmployeeID: "",
            popupMultipleDelete: false,
            popupMessage,
        };
    },
};
</script>
<style>
.dx-button-today {
    display: none !important;
}
</style>
