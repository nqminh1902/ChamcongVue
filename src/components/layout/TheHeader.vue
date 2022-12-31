<template lang="">
    <div class="header">
        <div class="header-title">
            <div class="box-menu-icon"></div>
            <img
                src="../../assets/icon/icon.svg"
                class="header-icon"
                alt=""
                srcset=""
            />
            <div class="header-title">{{ headerText.webTitle }}</div>
        </div>
        <div class="header-menu">
            <ul class="header-list">
                <li class="header-list-item">
                    {{ headerText.headerOverview }}
                </li>
                <li class="header-list-item">
                    <BaseDropdownVue
                        :list="dropdownValue.timeKeeping"
                        id="timeKeeping"
                    />
                </li>
                <li class="header-list-item">
                    <BaseDropdownVue :list="dropdownValue.shift" id="shift" />
                </li>
                <li class="header-list-item active">
                    <BaseDropdownVue
                        :list="dropdownValue.orderManagement"
                        id="orderManagement"
                    />
                </li>
                <li class="header-list-item">
                    <BaseDropdownVue :list="dropdownValue.report" id="report" />
                </li>
                <li class="header-list-item">
                    {{ headerText.headerEstablish }}
                </li>
            </ul>
            <div class="header-feature">
                <div class="feature-icon marleft-16" id="bell">
                    <div class="icon-bell"></div>
                </div>
                <DxTooltip
                    target="#bell"
                    show-event="dxhoverstart"
                    hide-event="dxhoverend"
                >
                    <b>{{ tooltipText.bell }}</b>
                </DxTooltip>
                <div class="feature-icon marleft-16" id="help">
                    <div class="icon-help"></div>
                </div>
                <DxTooltip
                    target="#help"
                    show-event="dxhoverstart"
                    hide-event="dxhoverend"
                >
                    <b>{{ tooltipText.help }}</b>
                </DxTooltip>
                <div class="feature-icon marleft-16" id="feature">
                    <div class="icon-feature"></div>
                </div>
                <DxTooltip
                    target="#feature"
                    show-event="dxhoverstart"
                    hide-event="dxhoverend"
                >
                    <b>{{ tooltipText.feature }}</b>
                </DxTooltip>
                <div class="avatar marleft-24">
                    <span class="avatar-name">ĐL</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BaseDropdownVue from "../base/BaseDropdown.vue";
import { DxTooltip } from "devextreme-vue/tooltip";
import { headerText, tooltipText, dropdownValue } from "../../common/resources";

export default {
    name: "TheHeader",
    components: {
        BaseDropdownVue,
        DxTooltip,
    },
    data() {
        return {
            headerText,
            tooltipText,
            dropdownValue,
        };
    },
};
</script>
<style lang=""></style>
