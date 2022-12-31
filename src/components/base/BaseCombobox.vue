<template lang="">
    <div class="form-dropdown">
        <label v-if="label" class="form-label"
            >{{ label }} <span>*</span></label
        >
        <input
            :type="type"
            class="dropdown input-employeeDepartment"
            :placeholder="label"
            v-model="currentName"
            :id="id"
            :tabindex="tabindex"
            :class="error"
            @click="ToggleDropdown"
            @input="filterDepartment"
            @blur="validateDropdown"
        />
        <i class="fa-solid fa-circle-info icon-error"></i>
        <i
            class="fa-solid fa-chevron-down absolute-dropdown"
            :class="[{ dropup: isOpenDropdown }]"
        ></i>
        <ul class="dropdown-list" v-if="isOpenDropdown" @scroll="scrolling">
            <li
                v-for="(department, index) in list"
                :key="index"
                class="dropdown-list-item line-height0"
                :class="[
                    (department.EmployeeID == currentId && active) ||
                        (department.id == currentId && active),
                ]"
                id=""
                @click="onDepartmentValue(department)"
            >
                <span v-if="id == 'status'">{{ department.statusName }}</span>

                <div v-if="id != 'status'" class="avatar marright-6">
                    <span class="avatar-name">{{
                        convertString(department.FullName)
                    }}</span>
                </div>
                <div v-if="id != 'status'" class="Name">
                    <p>{{ department.FullName }}</p>
                    <p>{{ department.FullName }}</p>
                </div>
            </li>
        </ul>
        <div
            class="overlay-feature"
            v-if="isOpenDropdown"
            @click="ToggleDropdown"
        ></div>
    </div>
</template>
<script>
export default {
    name: "BaseCombobox",
    props: {
        label: String,
        tabindex: String,
        disable: Boolean,
        type: String,
        id: String,
        placeholder: String,
        class: String,
        departmentList: Array,
        departmentId: String,
        departmentName: String,
        departmentError: Boolean,
    },
    watch: {
        // Nhận dữ liệu từ prop và chuyền vào combobox
        departmentName() {
            this.getDepartmentEdit();
        },
        // Chuyền thông báo lỗi khi validate
        departmentError() {
            this.error = !this.error;
        },
    },
    methods: {
        convertString(str) {
            let temp = "";
            for (let x of str) {
                if (x === x.toUpperCase()) {
                    temp += x;
                }
            }
            return temp.replace(/\s/g, "").slice(-2);
        },
        scrolling(e) {
            const clientHeight = e.target.clientHeight;
            const scrollHeight = e.target.scrollHeight;
            const scrollTop = e.target.scrollTop;

            if (scrollTop + clientHeight >= scrollHeight) {
                console.log("Yay!");
            }
        },
        /**
         * Lọc danh sách đơn vị nhập
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        filterDepartment() {
            this.index = 0;
            this.list = this.departmentList.filter((item) => {
                return item.FullName.toLowerCase().startsWith(
                    this.currentName.toLowerCase()
                );
            });
        },

        /**
         * Lưu dữ liệu bằng phím tắt
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onDepartmentKeycodeValue(e) {
            // Khi ân nút pagedown chuyển đơn vị và gán dữ liệu
            if (e.keyCode == 40 && this.index <= this.list.length - 1) {
                let department = this.list[this.index];
                this.currentName = department.FullName;
                this.currentId = department.EmployeeID;
                this.currentDepartmentID = department.OrganizationUnitID;
                this.currentDepartmentName = department.OrganizationUnitName;
                this.$emit("id", this.currentId);
                this.$emit("name", this.currentName);
                this.$emit("departmentId", this.currentDepartmentID);
                this.$emit("departmentName", this.currentDepartmentName);
                this.error = false;
                this.index == this.list.length - 1
                    ? (this.index = this.list.length - 1)
                    : this.index++;
            }
            // Khi ân nút pageup chuyển đơn vị và gán dữ liệu
            if (e.keyCode == 38 && this.index >= 0) {
                this.index == 0 ? this.index : this.index--;
                let department = this.list[this.index];
                this.currentName = department.FullName;
                this.currentId = department.EmployeeID;
                this.currentDepartmentID = department.OrganizationUnitID;
                this.currentDepartmentName = department.OrganizationUnitName;
                this.$emit("id", this.currentId);
                this.$emit("name", this.currentName);
                this.$emit("departmentId", this.currentDepartmentID);
                this.$emit("departmentName", this.currentDepartmentName);
                this.error = false;
            }
        },
        /**
         * Thực hiện xử lý gán giá trị current currentDepartment để active giá trị được chọn
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onDepartmentValue(value) {
            if (this.id == "employee") {
                this.currentName = value.FullName;
                this.currentId = value.EmployeeID;
                this.currentDepartmentName = value.OrganizationUnitName;
                this.currentDepartmentID = value.OrganizationUnitID;
                this.$emit("id", this.currentId);
                this.$emit("name", this.currentName);
                this.$emit("departmentId", this.currentDepartmentID);
                this.$emit("departmentName", this.currentDepartmentName);
                this.error = false;
                this.isOpenDropdown = !this.isOpenDropdown;
            }
            if (this.id == "support") {
                this.currentName = value.SupportNames;
                this.currentId = value.SupportIDs;
                this.$emit("id", this.currentId);
                this.$emit("name", this.currentName);
                this.error = false;
                this.isOpenDropdown = !this.isOpenDropdown;
            }
            if (this.id == "approval") {
                this.currentName = value.ApprovalName;
                this.currentId = value.ApprovalToID;
                this.$emit("id", this.currentId);
                this.$emit("name", this.currentName);
                this.error = false;
                this.isOpenDropdown = !this.isOpenDropdown;
            }
            if (this.id == "status") {
                this.currentName = value.statusName;
                this.currentId = value.id;
                this.$emit("id", this.currentId);
                this.error = false;
                this.isOpenDropdown = !this.isOpenDropdown;
            }
        },
        /**
         * Thực hiện xử lý ẩn hiện dropdown pageSize
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        ToggleDropdown() {
            this.isOpenDropdown = !this.isOpenDropdown;
            this.list = this.departmentList;
        },
        /**
         * Thực hiện xử lý validate dropdown đơn vị
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        validateDropdown() {
            if (this.currentName == "") {
                this.error = "validate-error";
            } else {
                this.error = "";
            }
        },
        /**
         * Thực hiện xử lý gán giá trị được chọn vào combobox
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        getDepartmentEdit() {
            (this.currentName = this.departmentName),
                (this.currentId = this.departmentId);
        },
    },
    data() {
        return {
            isOpenDropdown: false,
            currentName: "",
            currentId: "",
            currentDepartmentName: "",
            currentDepartmentID: "",
            active: "active",
            error: "",
            index: 0,
            list: [],
        };
    },
};
</script>
<style lang=""></style>
