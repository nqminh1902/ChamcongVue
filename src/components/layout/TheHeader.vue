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
            <div class="header-title">{{ language.headerText.webTitle }}</div>
        </div>
        <div class="header-menu">
            <ul class="header-list">
                <li class="header-list-item">
                    {{ language.headerText.headerOverview }}
                </li>
                <li class="header-list-item">
                    <BaseDropdownVue
                        :list="language.dropdownValue.timeKeeping"
                        id="timeKeeping"
                    />
                </li>
                <li class="header-list-item">
                    <BaseDropdownVue
                        :list="language.dropdownValue.shift"
                        id="shift"
                    />
                </li>
                <li class="header-list-item active">
                    <BaseDropdownVue
                        :list="language.dropdownValue.orderManagement"
                        id="orderManagement"
                    />
                </li>
                <li class="header-list-item">
                    <BaseDropdownVue
                        :list="language.dropdownValue.report"
                        id="report"
                    />
                </li>
                <li class="header-list-item">
                    {{ language.headerText.headerEstablish }}
                </li>
            </ul>
            <div class="header-feature">
                <div
                    @click="toggleNotification"
                    class="feature-icon marleft-16"
                    id="bell"
                >
                    <div
                        :class="
                            notificatonOpen ? 'icon-bell-active' : 'icon-bell'
                        "
                    ></div>
                </div>
                <div
                    class="notification icon-no-notification"
                    v-if="notificatonOpen"
                >
                    <div class="notification-header">
                        <div class="notification-header-left">Thông báo</div>
                        <div class="notification-header-right">
                            <div class="notifi-option">
                                Tất cả <span class="icon-dropdown-sm"></span>
                            </div>
                            <div class="icon-option marleft-8"></div>
                        </div>
                    </div>
                </div>
                <div
                    class="overlay-2"
                    v-if="notificatonOpen"
                    @click.self="toggleNotification"
                ></div>
                <DxTooltip
                    target="#bell"
                    show-event="dxhoverstart"
                    hide-event="dxhoverend"
                >
                    <b>{{ language.tooltipText.bell }}</b>
                </DxTooltip>
                <div class="feature-icon marleft-16" id="help">
                    <div class="icon-help"></div>
                </div>
                <DxTooltip
                    target="#help"
                    show-event="dxhoverstart"
                    hide-event="dxhoverend"
                >
                    <b>{{ language.tooltipText.help }}</b>
                </DxTooltip>
                <div
                    class="marleft-16 feature-icon"
                    id="feature"
                    @click="toggleSetting"
                >
                    <div
                        :class="
                            isFeature ? 'icon-feature-active' : 'icon-feature'
                        "
                    ></div>
                </div>
                <div class="feature" v-if="isFeature">
                    <div class="feature-list">
                        <div
                            class="feature-item"
                            v-for="item in language.feature"
                        >
                            <div :class="item.class" class="marright-8"></div>
                            <span>{{ item.text }}</span>
                        </div>
                    </div>
                </div>
                <div
                    class="overlay-2"
                    v-if="isFeature"
                    @click.self="toggleSetting"
                ></div>
                <DxTooltip
                    target="#feature"
                    show-event="dxhoverstart"
                    hide-event="dxhoverend"
                >
                    <b>{{ language.tooltipText.feature }}</b>
                </DxTooltip>
                <div class="avatar marleft-24" @click="toggleUserMenu">
                    <span class="avatar-name">{{
                        language.headerText.userName
                    }}</span>
                </div>
                <div class="account-user" v-if="isUser">
                    <div class="user-detail">
                        <div class="avatar-lg">
                            <span>{{ language.headerText.userName }}</span>
                        </div>
                        <span class="user-name">{{
                            headerText.userFullName
                        }}</span>
                        <p class="user-email">
                            {{ language.headerText.email }}
                        </p>
                        <div class="company-name">
                            <span>{{ language.headerText.companyName }}</span>
                        </div>
                        <div class="user-item">
                            <div class="icon-key"></div>
                            <div class="user-item-text">
                                {{ language.headerText.changePass }}
                            </div>
                        </div>
                        <div class="user-item">
                            <div class="icon-user"></div>
                            <div class="user-item-text">
                                {{ language.headerText.accountSetting }}
                            </div>
                        </div>
                        <div class="user-item">
                            <div class="icon-security"></div>
                            <div class="user-item-text">
                                {{ language.headerText.securitySetting }}
                            </div>
                        </div>
                        <div class="user-item">
                            <div class="icon-gift"></div>
                            <div class="user-item-text">
                                {{ language.headerText.introducingPoints }}
                            </div>
                        </div>
                        <div class="user-item" @click="toggleChangeLanguage">
                            <div
                                :class="
                                    languageActive == 0
                                        ? 'icon-vie'
                                        : 'icon-eng'
                                "
                            ></div>
                            <div class="user-item-text">
                                {{
                                    languageActive == 0
                                        ? language.headerText.vie
                                        : language.headerText.eng
                                }}
                            </div>
                            <div class="icon-dropdown-sm seft-justify"></div>
                            <ul class="language-list" v-if="isChangeLanguage">
                                <li
                                    class="language-item"
                                    @click="changeLanguage(0)"
                                >
                                    <span>
                                        <div class="icon-vie"></div>
                                        {{ language.headerText.vie }}
                                    </span>

                                    <div
                                        class="icon-check"
                                        v-show="language.languageActive == 0"
                                    ></div>
                                </li>
                                <li
                                    class="language-item"
                                    @click="changeLanguage(1)"
                                >
                                    <span>
                                        <div class="icon-eng"></div>
                                        {{ language.headerText.eng }}
                                    </span>
                                    <div
                                        class="icon-check"
                                        v-show="languageActive == 1"
                                    ></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="user-logout martop-16">
                        <div class="icon-logout"></div>
                        <span>{{ language.headerText.logOut }}</span>
                    </div>
                </div>
                <div
                    class="overlay-2"
                    v-if="isUser"
                    @click.self="toggleUserMenu"
                ></div>
            </div>
        </div>
    </div>
</template>
<script>
import BaseDropdownVue from "../base/BaseDropdown.vue";
import { DxTooltip } from "devextreme-vue/tooltip";
import { DxTextBox } from "devextreme-vue/text-box";

import {
    headerText,
    tooltipText,
    dropdownValue,
    feature,
} from "../../common/resources";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    name: "TheHeader",
    components: {
        BaseDropdownVue,
        DxTooltip,
        DxTextBox,
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
        /**
         * Thực hiện xử lý đóng mở popup thông báo
         **  Author: Nguyễn Quang Minh(7/12/2022)
         */
        toggleNotification() {
            this.notificatonOpen = !this.notificatonOpen;
        },
        /**
         * Thực hiện xử lý đóng mở popup cài đặt
         **  Author: Nguyễn Quang Minh(7/12/2022)
         */
        toggleSetting() {
            this.isFeature = !this.isFeature;
        },
        /**
         * Thực hiện xử lý đóng mở popup thông tin người dùng
         **  Author: Nguyễn Quang Minh(7/12/2022)
         */
        toggleUserMenu() {
            this.isUser = !this.isUser;
            this.isChangeLanguage = false;
        },
        /**
         * Thực hiện xử lý đóng mở menu đổi ngôn ngữ
         **  Author: Nguyễn Quang Minh(7/12/2022)
         */
        toggleChangeLanguage() {
            this.isChangeLanguage = !this.isChangeLanguage;
        },
        /**
         * Thực hiện xử lý chọn ngôn ngữ
         **  Author: Nguyễn Quang Minh(7/12/2022)
         */
        changeLanguage(number) {
            this.languageActive = number;
            this.changeLanguage_v2(number);
        },
    },
    data() {
        return {
            headerText,
            tooltipText,
            dropdownValue,
            notificatonOpen: false,
            feature,
            isFeature: false,
            isUser: false,
            isChangeLanguage: false,
            languageActive: 0,
        };
    },
};
</script>
<style lang=""></style>
