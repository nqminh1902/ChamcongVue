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
                        :title="language.title.cancel"
                        @click="backPage"
                        class="marright-8"
                        :tabIndex="14"
                        @FocusOut="onTabindex"
                    />

                    <BaseButtonVue
                        :title="language.title.save"
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
                        {{ language.missionDetailText.title }}
                    </h2>
                </div>
                <div class="content-title-btn">
                    <BaseButtonVue
                        class="pri-btn"
                        :title="language.title.edit"
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
                                    {{
                                        language.missionDetailText.employeeName
                                    }}
                                    <span>*</span>
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
                                        :noDataText="
                                            language.missionDetailText.noData
                                        "
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
                                                        {{
                                                            `${data.employeeName} `
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
                                        <b>{{
                                            language.ErrorMessage
                                                .employeeMessage
                                        }}</b>
                                    </DxTooltip>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    {{
                                        language.missionDetailText
                                            .oganizationName
                                    }}
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
                                    {{ language.missionDetailText.requestDate }}
                                    <span>*</span>
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
                                        <b>{{
                                            language.ErrorMessage.requiredToDate
                                        }}</b>
                                    </DxTooltip>
                                    <div class="value-details" v-if="isEditing">
                                        {{
                                            formatDate(
                                                missionAllowance.requestDate
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    {{ language.missionDetailText.fromDate }}
                                    <span>*</span>
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
                                        {{
                                            formatDate(
                                                missionAllowance.fromDate
                                            )
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    {{ language.missionDetailText.toDate }}
                                    <span>*</span>
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
                                        {{
                                            formatDate(missionAllowance.toDate)
                                        }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    {{ language.missionDetailText.leaveDay }}
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
                                    {{ language.missionDetailText.Location }}
                                    <span>*</span>
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
                                            <b>{{
                                                language.ErrorMessage
                                                    .locaionMessage
                                            }}</b>
                                        </DxTooltip>
                                    </div>

                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.location }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    {{ language.missionDetailText.purpose }}
                                    <span>*</span>
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
                                            <b>{{
                                                language.ErrorMessage
                                                    .purposeMessage
                                            }}</b>
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
                                <div class="dx-field-label">
                                    {{ language.missionDetailText.request }}
                                </div>
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
                                <div class="dx-field-label">
                                    {{ language.missionDetailText.support }}
                                </div>
                                <div class="dx-field-value">
                                    <DxTagBox
                                        :visible="!isEditing"
                                        :searchEnabled="true"
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
                                        :noDataText="
                                            language.missionDetailText.noData
                                        "
                                        tabIndex="9"
                                    >
                                        <template #support="{ data }">
                                            <div
                                                class="dropdown-list-item support"
                                            >
                                                <div class="avatar marright-6">
                                                    <span class="avatar-name">{{
                                                        convertString(
                                                            data.employeeName
                                                        )
                                                    }}</span>
                                                </div>
                                                <div class="Name">
                                                    <p class="dropdown-name">
                                                        {{
                                                            `${data.employeeName} `
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
                                    {{ language.missionDetailText.approvedName
                                    }}<span> *</span>
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
                                        :noDataText="
                                            language.missionDetailText.noData
                                        "
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
                                                        {{
                                                            `${data.employeeName} `
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
                                        <b>{{
                                            language.ErrorMessage
                                                .approvedMessage
                                        }}</b>
                                    </DxTooltip>
                                    <div class="value-details" v-if="isEditing">
                                        {{ missionAllowance.approvalName }}
                                    </div>
                                </div>
                            </div>
                            <div class="dx-field">
                                <div class="dx-field-label">
                                    {{
                                        language.missionDetailText.relationship
                                    }}
                                </div>
                                <div class="dx-field-value">
                                    <DxTagBox
                                        :visible="!isEditing"
                                        :searchEnabled="true"
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
                                        :noDataText="
                                            language.missionDetailText.noData
                                        "
                                        :tabIndex="11"
                                    >
                                        <template #relationShip="{ data }">
                                            <div
                                                class="dropdown-list-item relationship"
                                            >
                                                <div class="avatar marright-6">
                                                    <span class="avatar-name">{{
                                                        convertString(
                                                            data.employeeName
                                                        )
                                                    }}</span>
                                                </div>
                                                <div class="Name">
                                                    <p class="dropdown-name">
                                                        {{
                                                            `${data.employeeName} `
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
                                    {{ language.missionDetailText.status }}
                                    <span>*</span>
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
                                        :data-source="language.statusDropdown"
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
                                        <b>{{
                                            language.ErrorMessage.statusMessage
                                        }}</b>
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
                            {{ language.missionDetailText.tableTitle }}
                            <span
                                class="selected-employee marleft-16"
                                v-if="selectedRowsData.length > 0"
                            >
                                {{ language.missionDetailText.selected }}
                                <b>{{ selectedRowsData.length }}</b>
                                <span
                                    class="marleft-16"
                                    style="color: blue; cursor: pointer"
                                    @click="clearSelection"
                                    >{{
                                        language.missionDetailText.deSelected
                                    }}</span
                                >
                                <span
                                    class="marleft-16"
                                    style="color: red; cursor: pointer"
                                    @click="removeSelectionItem"
                                    >{{
                                        language.missionDetailText.remove
                                    }}</span
                                >
                            </span>
                        </h2>
                        <div
                            v-if="missionAllownEmployee.length == 0"
                            class="business-travel-list"
                        >
                            <span class="no-data"
                                >{{ language.missionDetailText.noData }}
                                <BaseButtonVue
                                    v-if="!isEditing"
                                    class="bgcolor-white marleft-6"
                                    :title="language.title.add"
                                    id="add"
                                    @click="togglePopup"
                                />
                            </span>
                        </div>
                        <div v-else class="business-travel-list">
                            <div class="feature-edit-grid" v-if="!isEditing">
                                <div class="add-popup" @click="togglePopup">
                                    <i class="fa-solid fa-plus"></i>
                                    <span>{{
                                        language.missionDetailText.add
                                    }}</span>
                                </div>
                                <span
                                    >{{
                                        language.missionDetailText.totalRecord
                                    }}
                                    <b>{{
                                        missionAllownEmployee.length
                                    }}</b></span
                                >
                            </div>
                            <div class="feature-edit-grid" v-else>
                                <DxTextBox
                                    :placeholder="language.placeholder.seacrh"
                                    :width="'320px'"
                                    :height="'36px'"
                                    @EnterKey="valueChanged"
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
                                :collumn="language.tableMissionDetail"
                                @removeSelection="toggleDeletePopup($event)"
                                @selectedRows="selectEntity($event)"
                                :clearSelection="isClear"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-business-travel martop-16">
                    <h2 class="content-title-text">
                        {{ language.missionDetailText.note }}
                    </h2>
                    <div class="form-business-travel-note">
                        <div class="avatar martop-16">
                            <span class="avatar-name">{{
                                language.missionDetailText.name
                            }}</span>
                        </div>
                        <div class="dx-field-value marleft-16 martop-16 flex-1">
                            <DxTextBox placeholder="Nhập ghi chú"> </DxTextBox>
                        </div>
                    </div>
                    <div class="form-business-travel-description">
                        <p>
                            {{ language.missionDetailText.ESC
                            }}<span>{{ language.title.cancel }}</span>
                        </p>
                    </div>
                    <div class="form-business-travel-option">
                        <span class="marright-40 option-item">{{
                            language.missionDetailText.all
                        }}</span>
                        <span class="marright-40 option-item active">{{
                            language.missionDetailText.note
                        }}</span>
                        <span class="marright-40 option-item">{{
                            language.missionDetailText.activityDiary
                        }}</span>
                    </div>
                    <hr class="hr-class" />
                    <div class="martop-32"></div>
                </div>
            </div>
        </div>
        <BasePopupVue
            v-if="popupVisible"
            @closeModal="togglePopup"
            :title="language.title.addEmployee"
            id="add-employee"
            :missionDetail="missionAllowance.employeeIDs"
            @employeeList="onMissionEmployeeData($event)"
        />
        <BasePopupVue
            v-if="showEditPopup"
            @closeModal="closeChangePopup"
            @onSave="Save()"
            :title="language.title.notification"
            id="warning"
        >
            <p>{{ language.missionDetailText.inforChange }}</p>
        </BasePopupVue>
        <BasePopupVue
            v-if="popupMultipleDelete"
            title="Cảnh báo"
            @closeModal="toggleDeletePopup"
            id="deleteMultiple"
            @deleteMultiple="removeEmployee"
        >
            <p>
                {{ language.popupMessage.deleteEmployeeMsg1 }}
                <b>{{ deleteEmployeeID.employeeName }}</b>
                {{ language.popupMessage.deleteEmployeeMsg2 }}
            </p>
        </BasePopupVue>

        <div class="overlay-2" v-if="loadIndicatorVisible">
            <!-- <DxLoadIndicator
                :visible="loadIndicatorVisible"
                :height="60"
                :width="60"
                :indicator-src="indicatorUrl"
            /> -->
            <div class="loader"></div>
        </div>
    </div>
</template>
<script>
import _ from "lodash";
import { useStore } from "vuex";
import { computed } from "vue";
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
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import {
    statusDropdown,
    ErrorMessage,
    tableMissionDetail,
    popupMessage,
    missionDetailText,
    title,
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
        DxLoadIndicator,
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
    setup() {
        // Khai báo các state từ vuex
        const store = useStore();
        const toast = computed(() => store.state.toast);
        const statusMode = computed(() => store.state.statusMode);
        const language = computed(() => store.state.resource);

        // Khai báo các hàm gọi đến mutations
        function setToast(payload) {
            store.commit("setToast", payload);
        }
        function setStatusMode(payload) {
            store.commit("setStatusMode", payload);
        }

        return { setToast, toast, statusMode, setStatusMode, language };
    },
    mounted() {
        // Kiểm tra router nếu param là 0 thì form thêm ngược lại là chi tiết hoặc sửa
        if (this.$route.params.id != 0) {
            // Gọi API lấy thông tin đơn
            this.loadMission(this.$route.params.id);
            this.loadMissionDetail(this.$route.params.id);
            // Kiểm tra router query xem là form chi tiết hay là sửa
            if (this.$route.query.isEdit == "false") {
                this.webTitle = this.language.missionDetailText.title;
                this.isEditing = true;
            } else {
                this.webTitle = this.language.missionDetailText.titleEdit;
                this.isEditing = false;
            }
        } else {
            // Title form
            this.webTitle = this.language.missionDetailText.titleAdd;
            this.isEditing = false;
            // Clone ra chi tiết đơn để so sánh khi có sự thay đổi
            this.cloneMissionAllowance = { ...this.missionAllowance };
            this.missionAllowance.status = 0;
            this.cloneMissionAllowance.status = 0;
            // API lấy danh sách nhân viên
            this.loadEmployee();
            this.loadApproval();
            this.loadSupport();
            this.loadRelationship();
        }
    },
    methods: {
        /**
         * Thực hiện xử lý Khi tìm kiếm ở table danh sách nhân viên đi công tác cùng
         **  Author: Nguyễn Quang Minh(02/01/2023)
         */
        valueChanged(e) {
            const search = e.component._changedValue;
            this.missionAllownEmployee = this.cloneMissionAllownEmployee.filter(
                (item) => {
                    return (
                        item.employeeName.includes(search) ||
                        item.employeeCode.includes(search)
                    );
                }
            );
        },
        /**
         * Thực hiện xử lý ẩn hiện popup khi xóa nhân viên khỏi bảng
         **  Author: Nguyễn Quang Minh(31/12/2022)
         */
        toggleDeletePopup(e) {
            this.popupMultipleDelete = !this.popupMultipleDelete;
            this.deleteEmployeeID = e;
        },

        /**
         * Thực hiện xử lý validate combobox người đề nghị khi blur
         **  Author: Nguyễn Quang Minh(31/12/2022)
         */
        blurEmployeeValidate() {
            if (this.missionAllowance.employeeName == "") {
                this.validate.employeeError = true;
            } else {
                this.validate.employeeError = false;
            }
        },

        /**
         * Thực hiện xử lý validate ngày đề nghị khi blur
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        blurRequestDateValidate(e) {
            if (!this.missionAllowance.requestDate) {
                this.validate.requestDateError = true;
            } else {
                this.validate.requestDateError = false;
            }
        },
        /**
         * Thực hiện xử lý validate ngày đi khi blur
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        blurFromDateValidate() {
            if (!this.missionAllowance.fromDate) {
                this.validate.fromDateError = true;
            } else {
                this.validate.fromDateError = false;
            }
        },
        /**
         * Thực hiện xử lý validate ngày về khi blur
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        blurToDateValidate() {
            if (!this.missionAllowance.toDate) {
                this.validate.toDateError = true;
            } else {
                this.validate.toDateError = false;
                this.validateDate();
            }
        },
        /**
         * Thực hiện xử lý validate địa điểm nghị khi blur
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        blurLocationValidate() {
            if (!this.missionAllowance.location) {
                this.validate.locationError = true;
            } else {
                this.validate.locationError = false;
            }
        },
        /**
         * Thực hiện xử lý validate lý do công tác khi blur
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        blurPurposeValidate() {
            if (!this.missionAllowance.purpose) {
                this.validate.purposeError = true;
            } else {
                this.validate.purposeError = false;
            }
        },
        /**
         * Thực hiện xử lý validate người duyệt khi blur
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        blurApprovalValidate(e) {
            if (!this.missionAllowance.approvalName) {
                console.log(e);
                this.validate.approvalError = true;
            } else {
                this.validate.approvalError = false;
            }
        },
        /**
         * Thực hiện xử lý validate trạng thái khi blur
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        blurStatusValidate() {
            if (this.missionAllowance.status == "") {
                this.validate.statusError = true;
            } else {
                this.validate.statusError = false;
            }
        },
        /**
         * Thực hiện xử lý focus vào combobox người đề nghị khi chuyển trang
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        initFocus(e) {
            e.component.focus();
        },
        /**
         * Thực hiện xử lý tabindex
         **  Author: Nguyễn Quang Minh(19/12/2022)
         */
        onTabindex() {
            this.$refs.input.focus();
        },
        /**
         * Thực hiện thay đổi trạng thái khi ấn bỏ chọn các row trong table
         **  Author: Nguyễn Quang Minh(26/12/2022)
         */
        clearSelection() {
            this.isClear = !this.isClear;
        },
        /**
         * Thực hiện lấy API chi tiết đơn
         **  Author: Nguyễn Quang Minh(21/12/2022)
         */
        loadMission(id) {
            try {
                this.loadIndicatorVisible = true;
                axios
                    .get(`https://localhost:7093/api/MissionAllownce/${id}`)
                    .then((response) => {
                        // Lấy thông tin đơn
                        this.missionAllowance = {
                            ...response.data,
                            employeeIDs: [],
                        };
                        // clone lại để so sánh khi thông tin bị thay đổi
                        this.cloneMissionAllowance = {
                            ...this.missionAllowance,
                        };
                        // Kiểm tra id người hỗ trợ nếu không có thì gắn bằng mảng rỗng
                        if (!this.missionAllowance.supportIDs) {
                            this.supportIDArray = [];
                            this.supportNameArray = [];
                        } else {
                            // Chuyển từ dạng chuỗi về mảng
                            this.supportIDArray =
                                response.data.supportIDs.split(", ");
                            this.supportNameArray =
                                response.data.supportNames.split(", ");
                        }
                        // Kiểm tra id người hỗ trợ nếu không có thì gắn bằng mảng rỗng
                        if (!this.missionAllowance.relationShipIDs) {
                            this.relationShipIDArray = [];
                            this.relationShipNameArray = [];
                        } else {
                            // Chuyển từ dạng chuỗi về mảng
                            this.relationShipIDArray =
                                response.data.relationShipIDs.split(", ");
                            this.relationShipNameArray =
                                response.data.relationShipNames.split(", ");
                        }
                        // Gọi API lấy ra danh sách nhân viên
                        this.loadEmployee(this.missionAllowance.employeeID);
                        // Tham số == 1 để lấy ra danh sách nhân viên đã đc chọn
                        // Tham số == 0 để lấy ra dánh sách nhân viên khác vs những id đã đc chọn
                        this.loadApproval(
                            this.missionAllowance.approvalToID,
                            1
                        );
                        this.loadApproval(
                            this.missionAllowance.approvalToID,
                            0
                        );
                        this.loadSupport(this.supportIDArray, 1);
                        this.loadSupport(this.supportIDArray, 0);
                        this.loadRelationship(this.relationShipIDArray, 1);
                        this.loadRelationship(this.relationShipIDArray, 0);
                        this.loadIndicatorVisible = false;
                    })
                    .catch((error) => {
                        console.log("Lấy chi tiết đơn bị lỗi");
                        this.loadIndicatorVisible = false;
                    });
            } catch (error) {
                console.log("Lấy chi tiết đơn bị lỗi");
            }
        },
        /**
         * Thực hiện lấy API nhân viên đi công tác cùng
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        loadMissionDetail(id) {
            try {
                this.loadIndicatorVisible = true;
                axios
                    .get(
                        `https://localhost:7093/api/MissionAllownceDetail/v1/${id}`
                    )
                    .then((response) => {
                        this.missionAllownEmployee = response.data;
                        (this.cloneMissionAllownEmployee = [
                            ...this.missionAllownEmployee,
                        ]),
                            // Lấy ra danh sách id từ mảng nhân viên đi công tác cùng
                            (this.missionAllowance.employeeIDs =
                                this.missionAllownEmployee.map((item) => {
                                    return item.employeeID;
                                }));
                        this.cloneMissionAllowance.employeeIDs =
                            this.missionAllownEmployee.map((item) => {
                                return item.employeeID;
                            });
                        this.loadIndicatorVisible = false;
                    })
                    .catch((error) => {
                        console.log("Lấy chi tiết đơn bị lỗi");
                        this.loadIndicatorVisible = false;
                    });
            } catch (error) {
                console.log("Lấy chi tiết đơn bị lỗi");
            }
        },
        /**
         * Thực hiện lấy API lấy danh sách nhân viên cho combobox người đề nghị
         **  Author: Nguyễn Quang Minh(19/12/2022)
         */
        loadEmployee(id) {
            try {
                let employeeID = [];
                if (id) {
                    employeeID.push(id);
                }
                axios
                    .post("https://localhost:7093/api/Employee/filter", {
                        keyword: this.employeeKeyword,
                        organizationID: "",
                        pageSize: this.employeePageSize,
                        pageNumber: this.employeePageNumber,
                        employeeIDs: [],
                        getEmployeeIDs: employeeID,
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
            } catch (error) {
                console.log("lấy danh sách nhân viên bị lỗi");
            }
        },
        /**
         * Thực hiện lấy API lấy danh sách nhân viên cho combobox người duyệt
         **  Author: Nguyễn Quang Minh(19/12/2022)
         */
        loadApproval(id, number) {
            try {
                let approvalID = [];
                let approvalIDNotIn = [];
                // Nếu number = 1 thì thêm id vào mảng để filter
                if (id && number == 1) {
                    approvalID.push(id);
                } else {
                    approvalID = [];
                }
                // Nếu number = 0 thì thêm id vào mảng để filter
                if (id && number == 0) {
                    approvalIDNotIn.push(id);
                } else {
                    approvalIDNotIn = [];
                }
                axios
                    .post("https://localhost:7093/api/Employee/filter", {
                        keyword: this.approvalNameKeyword,
                        organizationID: "",
                        pageSize: this.approvalNamePageSize,
                        pageNumber: this.approvalNamePageNumber,
                        employeeIDs: approvalIDNotIn,
                        getEmployeeIDs: approvalID,
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
            } catch (error) {
                console.log("lấy danh sách nhân viên bị lỗi");
            }
        },
        /**
         * Thực hiện lấy API lấy danh sách nhân viên cho combobox người liên quan
         **  Author: Nguyễn Quang Minh(19/12/2022)
         */
        loadRelationship(val, number) {
            try {
                let listID;
                let listIdNotIn;
                // Nếu number = 1 thì thêm id vào mảng để filter
                if (val && number == 1) {
                    listID = val;
                } else {
                    listID = [];
                }
                // Nếu number = 0 thì thêm id vào mảng để filter
                if (val && number == 0) {
                    listIdNotIn = val;
                } else {
                    listIdNotIn = [];
                }
                axios
                    .post("https://localhost:7093/api/Employee/filter", {
                        keyword: this.relationShipNameKeyword,
                        organizationID: "",
                        pageSize: this.relationShipNamePageSize,
                        pageNumber: this.relationShipNamePageNumber,
                        employeeIDs: listIdNotIn,
                        getEmployeeIDs: listID,
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
            } catch (error) {
                console.log("lấy danh sách nhân viên bị lỗi");
            }
        },
        /**
         * Thực hiện lấy API lấy danh sách nhân viên cho combobox người hỗ trợ
         **  Author: Nguyễn Quang Minh(19/12/2022)
         */
        loadSupport(val, number) {
            try {
                let listID;
                let listIdNotIn;
                // Nếu number = 1 thì thêm id vào mảng để filter
                if (val && number == 1) {
                    listID = val;
                } else {
                    listID = [];
                }
                // Nếu number = 0 thì thêm id vào mảng để filter
                if (val && number == 0) {
                    listIdNotIn = val;
                } else {
                    listIdNotIn = [];
                }
                axios
                    .post("https://localhost:7093/api/Employee/filter", {
                        keyword: this.supportNameKeyword,
                        organizationID: "",
                        pageSize: this.supportNamePageSize,
                        pageNumber: this.supportNamePageNumber,
                        employeeIDs: listIdNotIn,
                        getEmployeeIDs: listID,
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
            } catch (error) {
                console.log("lấy danh sách nhân viên bị lỗi");
            }
        },
        /**
         * Thực hiện xử lý đóng mở popup danh sách nhân viên
         **  Author: Nguyễn Quang Minh(22/12/2022)
         */
        togglePopup() {
            this.popupVisible = !this.popupVisible;
        },
        /**
         * Thực hiện xử lý đóng mở popup thông tin có sự thay đổi
         **  Author: Nguyễn Quang Minh(22/12/2022)
         */
        closeChangePopup() {
            this.showEditPopup = !this.showEditPopup;
        },
        /**
         * Thực hiện xử lý khi chuyển trang
         **  Author: Nguyễn Quang Minh(22/12/2022)
         */
        backPage() {
            // Nếu form có sự thay đổi thì thông báo không thì chuyển trang luôn
            if (
                JSON.stringify(this.cloneMissionAllowance) ==
                JSON.stringify(this.missionAllowance)
            ) {
                this.$router.push({ path: "/" });
            } else {
                this.showEditPopup = true;
            }
        },
        /**
         * Thực hiện xử lý validate ngày đi và ngày về
         **  Author: Nguyễn Quang Minh(24/12/2022)
         */
        validateDate() {
            const fromDate = new Date(this.missionAllowance.fromDate);
            const toDate = new Date(this.missionAllowance.toDate);
            // So sánh ngày đi ngày về
            if (fromDate > toDate) {
                // Thông báo lỗi nếu nhưng input trống hoặc ngày về nhỏ hơn ngày đi
                if (!this.missionAllowance.fromDate) {
                    this.validate.fromDateError = true;
                    this.fromDateMessage =
                        this.language.ErrorMessage.requiredFromDate;
                }
                if (!this.missionAllowance.toDate) {
                    this.validate.toDateError = true;
                    this.toDateMessage =
                        this.language.ErrorMessage.requiredToDate;
                } else {
                    this.validate.toDateError = true;
                    this.toDateMessage = this.language.ErrorMessage.invalidDate;
                }
            } else {
                this.validate.fromDateError = false;
                this.validate.toDateError = false;
                // Xử lý lấy ra số ngày đi công tác và gán vào số ngày công tác
                const minute = 1000 * 60;
                const hour = minute * 60;
                const day = hour * 24;
                let fromDateHour = fromDate.getTime();
                let toDateHour = toDate.getTime();
                let leaveDay = (toDateHour - fromDateHour) / day;
                // leaveDay = leaveDay.toFixed(2);
                this.missionAllowance.leaveDay = leaveDay;
                this.cloneMissionAllowance.leaveDay =
                    this.missionAllowance.leaveDay;
            }
        },
        /**
         * Thực hiện xử lý validate bắt buộc nhập
         **  Author: Nguyễn Quang Minh(24/12/2022)
         */
        validateRequired(e) {
            return e.value != "";
        },
        /**
         * Thực hiện xử lý validate bắt buộc nhập input địa điểm
         **  Author: Nguyễn Quang Minh(24/12/2022)
         */
        validateLocation(e) {
            if (e.value == "") {
                this.validate.locationError = true;
            } else {
                this.validate.locationError = false;
            }
        },
        /**
         * Thực hiện xử lý validate bắt buộc nhập input lý do công tác
         **  Author: Nguyễn Quang Minh(24/12/2022)
         */
        validatePerpose(e) {
            if (e.value == "") {
                this.validate.purposeError = true;
            } else {
                this.validate.purposeError = false;
            }
        },
        /**
         * Thực hiện xử lý lấy value khi chọn nhiều combobox người liên quan
         **  Author: Nguyễn Quang Minh(21/12/2022)
         */
        getRelationshipSelection(e) {
            // Nếu chọn thêm thì add id và tên nhân viên đã chọn vào mảng
            if (e.addedItems.length > 0) {
                this.relationShipNameArray.push(e.addedItems[0].employeeName);
                this.relationShipIDArray.push(e.addedItems[0].employeeID);
                this.relationShipIDArray = [
                    ...new Set(this.relationShipIDArray),
                ];
                this.relationShipNameArray = [
                    ...new Set(this.relationShipNameArray),
                ];
            }
            // Xóa id và tên nhân viên đã chọn khỏi mảng
            else if (e.removedItems.length > 0) {
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
            // Đưa về dạng chuỗi cách nhau bởi dấu ,
            this.missionAllowance.relationShipIDs =
                this.relationShipIDArray.join(", ");
            this.missionAllowance.relationShipNames =
                this.relationShipNameArray.join(", ");
        },
        /**
         * Thực hiện xử lý lấy value khi chọn nhiều combobox người hỗ trợ
         **  Author: Nguyễn Quang Minh(21/12/2022)
         */
        getSupportSelection(e) {
            // Nếu chọn thêm thì add id và tên nhân viên đã chọn vào mảng
            if (e.addedItems.length > 0) {
                this.supportNameArray.push(e.addedItems[0].employeeName);
                this.supportIDArray.push(e.addedItems[0].employeeID);
                this.supportIDArray = [...new Set(this.supportIDArray)];
                this.supportNameArray = [...new Set(this.supportNameArray)];
            }
            // Xóa id và tên nhân viên đã chọn khỏi mảng
            else if (e.removedItems.length > 0) {
                this.supportNameArray = this.supportNameArray.filter((item) => {
                    return item !== e.removedItems[0].employeeName;
                });
                this.supportIDArray = this.supportIDArray.filter((item) => {
                    return item !== e.removedItems[0].employeeID;
                });
            }
            // Đưa về dạng chuỗi cách nhau bởi dấu ,
            this.missionAllowance.supportIDs = this.supportIDArray.join(", ");
            this.missionAllowance.supportNames =
                this.supportNameArray.join(", ");
        },
        /**
         * Thực hiện combobox người đề nghị khi scroll
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        onEmployeeScroll() {
            const employee = document.querySelectorAll(".abc")[0];
            const cde =
                employee.parentNode.parentElement.parentElement.parentElement;
            cde.addEventListener("scroll", (e) => {
                const clientHeight = e.target.clientHeight;

                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;
                // Điều kiện khi scroll đến cuối element
                if (scrollTop + clientHeight >= scrollHeight) {
                    // Điều kiện kiểm tra danh sách nhân viên có nhỏ hơn tổng số nhân viên không?
                    if (this.listEmployee.length < this.listEmployeeTotal) {
                        this.employeePageSize = 300;
                        this.employeePageNumber++;
                        this.loadEmployee();
                    }
                }
            });
        },
        /**
         * Thực hiện combobox người duyệt khi scroll
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        onApprovalScroll() {
            const approval = document.querySelectorAll(".approval")[0];
            const approvalParent =
                approval.parentNode.parentElement.parentElement.parentElement;

            approvalParent.addEventListener("scroll", (e) => {
                const clientHeight = e.target.clientHeight;

                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;

                // Điều kiện khi scroll đến cuối element
                if (scrollTop + clientHeight >= scrollHeight) {
                    // Điều kiện kiểm tra danh sách nhân viên có nhỏ hơn tổng số nhân viên không?
                    if (this.listApproval.length < this.listApprovalTotal) {
                        this.approvalNamePageSize = 300;
                        this.approvalNamePageNumber++;
                        this.loadApproval(
                            this.missionAllowance.approvalToID,
                            0
                        );
                    }
                }
            });
        },
        /**
         * Thực hiện combobox người liên quan khi scroll
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        onRelationshipScroll() {
            const employee = document.querySelectorAll(".relationship")[0];
            const cde =
                employee.parentNode.parentElement.parentElement.parentElement;
            cde.addEventListener("scroll", (e) => {
                const clientHeight = e.target.clientHeight;

                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;

                // Điều kiện khi scroll đến cuối element
                if (scrollTop + clientHeight >= scrollHeight) {
                    // Điều kiện kiểm tra danh sách nhân viên có nhỏ hơn tổng số nhân viên không?
                    if (
                        this.listRelationship.length <
                        this.listRelationshipTotal
                    ) {
                        this.relationShipNamePageSize = 300;
                        this.relationShipNamePageNumber++;
                        this.loadRelationship(this.relationShipIDArray, 0);
                    }
                }
            });
        },
        /**
         * Thực hiện combobox người hỗ trọ khi scroll
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        onSupportScroll() {
            const employee = document.querySelectorAll(".support")[0];
            const cde =
                employee.parentNode.parentElement.parentElement.parentElement;
            cde.addEventListener("scroll", (e) => {
                const clientHeight = e.target.clientHeight;

                const scrollHeight = e.target.scrollHeight;
                const scrollTop = e.target.scrollTop;

                // Điều kiện khi scroll đến cuối element
                if (scrollTop + clientHeight >= scrollHeight) {
                    // Điều kiện kiểm tra danh sách nhân viên có nhỏ hơn tổng số nhân viên không?
                    if (this.listSupport.length < this.listSupportTotal) {
                        this.supportNamePageSize = 300;
                        this.supportNamePageNumber++;
                        this.loadSupport();
                    }
                }
            });
        },
        /**
         * Thực hiện lấy những nhân viên đã chọn lưu vào bảng đi công tác cùng
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        onMissionEmployeeData(e) {
            this.missionAllownEmployee = [...this.missionAllownEmployee, ...e];
            this.missionAllowance.employeeIDs = this.missionAllownEmployee.map(
                (item) => {
                    return item.employeeID;
                }
            );
            this.popupVisible = !this.popupVisible;
        },
        /**
         * Thực hiện xóa nhân viên đã chọn khỏi bảng đi công tác cùng
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        removeEmployee() {
            // Dùng filter để lọc bỏ nhân viên
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
        /**
         * Thực hiện xóa nhân viên chọn nhiều khỏi bảng đi công tác cùng
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        removeSelectionItem() {
            // Lặp qua từng phần tử và loại bỏ các nhân viên có trùng id muốn xóa
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
        /**
         * Thực hiện lưu tổng số hàng đã tích
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        selectEntity(e) {
            if (e.length > 0) {
                this.isSelected = true;
            } else {
                this.isSelected = false;
            }
            this.selectedRowsData = e.selectedRowsData;
        },
        /**
         * Thực hiện format dữ liệu dạng ngày
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        formatDate(data) {
            const date = new Date(data);
            return `${
                date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
            }/${
                date.getMonth() + 1 < 10
                    ? `0${date.getMonth() + 1}`
                    : date.getMonth() + 1
            }/${date.getFullYear()} ${
                date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
            }:${
                date.getMinutes() < 10
                    ? `0${date.getMinutes()}`
                    : date.getMinutes()
            }`;
        },
        /**
         * Thực hiện đổi Ui khi ấn nút sửa
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        Edit() {
            this.missionAllownEmployee = this.cloneMissionAllownEmployee;
            this.$router.push({
                name: "mission-allowance",
                params: { id: this.$route.params.id },
            });
            this.webTitle = missionDetailText.titleEdit;
            this.isEditing = false;
        },
        /**
         * Thực hiện lấy chữ cái đầu của tên đệm và tên cho vào avartar
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        convertString(str) {
            let temp = "";
            for (let x of str) {
                if (x === x.toUpperCase()) {
                    temp += x;
                }
            }
            return temp.replace(/\s/g, "").slice(-2);
        },
        // onSearchBox(e) {
        //     var search = e.component.option("text");
        //     this.employeeKeyword = search;
        // },
        /**
         * Thực hiện lấy Lưu lại thông tin người đề nghị đã chọn
         **  Author: Nguyễn Quang Minh(19/12/2022)
         */
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
        /**
         * Thực hiện lấy Lưu lại thông tin những người hỗ trợ đã chọn
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        onValueSupport(e) {
            this.missionAllowance.supportIDs = e.selectedItem.employeeID;
            this.missionAllowance.supportNames = e.selectedItem.employeeName;
        },
        /**
         * Thực hiện lấy Lưu lại thông tin người duyệt đã chọn
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
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
        /**
         * Thực hiện lấy Lưu lại ngày đề nghị
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        getValueRequetDate(e) {
            if (e.value == null) {
                this.validate.requestDateError = true;
            } else {
                this.missionAllowance.requestDate = e.value;
                this.validate.requestDateError = false;
            }
        },
        /**
         * Thực hiện lấy Lưu lại ngày đi
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        getValueFromDate(e) {
            if (e.value == null) {
                this.validate.fromDateError = true;
            } else {
                this.missionAllowance.fromDate = e.value;
                this.validate.fromDateError = false;
                this.validateDate();
            }
        },
        /**
         * Thực hiện lấy Lưu lại trạng thái
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        onValueStatus(e) {
            if (e.selectedItem == null) {
                this.validate.statusError = true;
            } else {
                this.validate.statusError = false;
                this.missionAllowance.status = e.selectedItem.id;
            }
        },
        /**
         * Thực hiện lấy Lưu lại ngày về
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        getValueToDate(e) {
            if (e.value == null) {
                this.validate.toDateError = true;
                this.toDateMessage = this.language.ErrorMessage.requiredToDate;
            } else {
                this.validate.toDateError = false;
                this.missionAllowance.toDate = e.value;
                this.validateDate();
            }
        },
        /**
         * Thực hiện validate form khi ấn lưu
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        validateForm() {
            var isError = true;
            if (this.missionAllowance.employeeID == "") {
                this.validate.employeeError = true;
                isError = false;
            }
            if (!this.missionAllowance.requestDate) {
                this.validate.requestDateError = true;
                isError = false;
            }
            if (
                !this.missionAllowance.toDate ||
                new Date(this.missionAllowance.toDate) <
                    new Date(this.missionAllowance.fromDate)
            ) {
                this.validate.toDateError = true;
                this.toDateMessage = this.language.ErrorMessage.requiredToDate;
                isError = false;
            }
            if (!this.missionAllowance.fromDate) {
                this.validate.fromDateError = true;
                isError = false;
            }
            if (this.missionAllowance.location == "") {
                this.validate.locationError = true;
                isError = false;
            }
            if (this.missionAllowance.purpose == "") {
                this.validate.purposeError = true;
                isError = false;
            }
            if (this.missionAllowance.approvalToID == "") {
                this.validate.approvalError = true;
                isError = false;
            }
            return isError;
        },
        /**
         * Thực hiện xử lý lấy dữ liệu nhân viên đi làm cùng trước khi lưu lưu vào 3 trường employeeaMission
         **  Author: Nguyễn Quang Minh(23/12/2022)
         */
        getEmployeeMission() {
            // Kiểm tra trường hợp mảng lớn hơn 1
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
            }
            // Kiểm tra trường hợp mảng == 1
            else if (this.missionAllownEmployee.length == 1) {
                this.missionAllowance.employeeMissionNames =
                    this.missionAllownEmployee[0].employeeName;
                this.missionAllowance.employeeMissionCodes =
                    this.missionAllownEmployee[0].employeeCode;
                this.missionAllowance.employeeMissionIDs =
                    this.missionAllownEmployee[0].employeeID;
            }
        },
        /**
         * Thực hiện xử lý khi ấn lưu
         **  Author: Nguyễn Quang Minh(25/12/2022)
         */
        async Save() {
            const me = this;
            this.loadIndicatorVisible = true;
            try {
                // Thực hiện xử lý trước khi lưu
                this.showEditPopup = false;
                this.getEmployeeMission();
                // id != 0 la form sửa
                if (this.$route.params.id != 0) {
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
                            .put(
                                `https://localhost:7093/api/MissionAllownce/${this.$route.params.id}`,
                                this.missionAllowance
                            )
                            .then(function (response) {
                                me.$router.push({ path: "/" });
                                me.loadIndicatorVisible = false;
                            })
                            .catch(function (error) {
                                me.loadIndicatorVisible = false;
                            });

                        // Bật thông báo
                        this.setToast({
                            isToast: true,
                            toastMessage:
                                this.language.toastMessage.editSuccess,
                            toastType: "success",
                        });

                        setTimeout(() => {
                            this.setToast({
                                isToast: false,
                                toastMessage:
                                    this.language.toastMessage.editSuccess,
                                toastType: "success",
                            });
                        }, 1000);
                    } else {
                        this.loadIndicatorVisible = false;
                    }
                }
                // id == 0 là form thêm
                else {
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
                                me.loadIndicatorVisible = false;
                            })
                            .catch(function (error) {
                                if (error) {
                                    me.loadIndicatorVisible = false;
                                }
                            });
                        // Bật thông báo
                        this.setToast({
                            isToast: true,
                            toastMessage: this.language.toastMessage.addSuccess,
                            toastType: "success",
                        });
                        setTimeout(() => {
                            this.setToast({
                                isToast: false,
                                toastMessage:
                                    this.language.toastMessage.addSuccess,
                                toastType: "success",
                            });
                        }, 1000);
                    } else {
                        this.loadIndicatorVisible = false;
                    }
                }
            } catch (error) {}
        },
    },
    data() {
        return {
            ErrorMessage,
            missionDetailText,
            title,
            dataGridRefName: "data-grid",
            statusDropdown,
            now: Date(),
            missionAllownEmployee: [],
            cloneMissionAllownEmployee: [],
            employeeBussinesTravel: true,
            isEditing: false,
            toDateMessage: this.language.ErrorMessage.requiredToDate,
            fromDateMessage: this.language.ErrorMessage.requiredFromDate,
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
            employeePageSize: 300,
            employeePageNumber: 1,
            supportNameKeyword: "",
            supportNamePageSize: 300,
            supportNamePageNumber: 1,
            approvalNameKeyword: "",
            approvalNamePageSize: 300,
            approvalNamePageNumber: 1,
            relationShipNameKeyword: "",
            relationShipNamePageSize: 300,
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
            loadIndicatorVisible: false,
            indicatorUrl:
                "https://js.devexpress.com/Content/data/loadingIcons/rolling.svg",
        };
    },
};
</script>
<style>
.dx-button-today {
    display: none !important;
}
</style>
