export {
    headerText,
    tooltipText,
    dropdownValue,
    departments,
    contentText,
    tableEmployeeCollumn,
    tableMissionAllownEmployee,
    statusDropdown,
    ErrorMessage,
    tableMissionDetail,
    popupMessage,
};

var headerText = {
    webTitle: "Chấm công",
    headerOverview: "Tổng quan",
    headerEstablish: "Thiết lập",
    webVersion: "RC23.",
};
var tooltipText = {
    bell: "Thông báo",
    help: "Trợ giúp",
    feature: "Tính năng khác",
    refresh: "Tải lại",
    filter: "Bộ lọc",
    export: "Xuất khẩu",
    setting: "Tùy chỉnh cột",
};
const dropdownValue = {
    timeKeeping: [
        "Bảng chấm công chi tiết",
        "Bảng chấm công tổng hợp",
        "Dữ liệu chấm công",
    ],
    shift: ["Bảng phân ca tổng hợp", "Phân ca chi tiết", "Ca làm "],
    orderManagement: [
        "Đơn xin nghỉ",
        "Đăng khí đi muộn, về sớm",
        "Đăng kí làm thêm",
        "Đề nghị cập nhật công",
        "Đề nghị đi công tác",
        "Đề nghị đổi ca",
        "Phê duyệt chấm công",
        "Bảng tổng hợp nghỉ phép",
        "Bảng tổng hợp nghỉ bù",
        "Kế hoạch nghỉ phép",
    ],
    report: [
        "Báo cáo đi sớm về muộn",
        "Báo cáo tổng hợp tình hình đi muộn",
        "Tình hình nghỉ phép theo kế hoạch",
        "Danh sách công viên đi công tác",
        "Báo cáo danh sách nhân viên làm thêm giờ",
        "Phân tích tình hình làm thêm",
        "Báo cáo tổng hợp tình hình làm thêm của nhân viên",
        "Báo cáo tình hình nhân viên đi công tác",
    ],
    pageSize: [15, 25, 50, 100],
    status: ["Tất cả", "Chờ duyệt", "Đã duyệt", "Từ chôi"],
};

const departments = [
    {
        expanded: true,
        departmentID: "1",
        departmentName: "CTY TNHH NGỌC THANH TÂM",
        items: [
            {
                departmentID: "1_1",
                departmentName: "Hồ Hàng Hải - 56",
                items: [
                    {
                        departmentID: "1_1_1",
                        departmentName: "Đỗ Đức Dục",
                    },
                    {
                        departmentID: "1_1_2",
                        departmentName: "Cầu Giấy",
                    },
                ],
            },
            {
                departmentID: "1_2",
                departmentName: "Bánh Kẹo - cana",
                items: [
                    {
                        departmentID: "1_2_1",
                        departmentName: "Hà Đông",
                    },
                    {
                        departmentID: "1_2_2",
                        departmentName: "Trần Nhật Quyết",
                    },
                ],
            },
            {
                departmentID: "1_3",
                departmentName: "Cơ sở Phố hàng Bài",
            },
            {
                departmentID: "1_4",
                departmentName: "Hoàng Minh Giám",
            },
            {
                departmentID: "1_5",
                departmentName: "Lê Đức Thọ",
            },
        ],
    },
];
const contentText = {
    webTitle: "Đề nghị đi công tác",
    export: "Nhập khẩu",
    statusText: "Trạng thái",
    totalRecords: "Tổng số bản ghi:",
    recordText: "bản ghi",
};

const tableEmployeeCollumn = [
    {
        fixed: false,
        fixedPosition: "left",
        visible: false,
        caption: "ID nhân viên",
        dataField: "employeeID",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: true,
        fixedPosition: "left",
        visible: true,
        caption: "Mã nhân viên",
        dataField: "employeeCode",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: true,
        fixedPosition: "left",

        visible: true,
        caption: "Người đề nghị",
        dataField: "employeeName",
        alignment: "left",
        dataType: "text",
        minWidth: "250",
        cellTemplate: "name-cell",
    },
    {
        fixed: false,
        fixedPosition: "left",
        visible: true,
        caption: "Vị trí công việc",
        dataField: "jobPositionName",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",
        visible: true,
        caption: "Đơn vị công tác",
        dataField: "organizationUnitName",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        alignment: "centre",
        fixed: false,
        fixedPosition: "left",
        visible: true,
        caption: "Ngày đề nghị",
        dataField: "requestDate",
        alignment: "centre",
        dataType: "datetime",
        minWidth: "150",
        cellTemplate: "requestDate",
    },
    {
        fixed: false,
        fixedPosition: "left",
        visible: true,
        caption: "Ngày đi",
        dataField: "fromDate",
        alignment: "centre",
        dataType: "datetime",
        minWidth: "150",
        cellTemplate: "fromDate",
    },
    {
        fixed: false,
        fixedPosition: "left",
        visible: true,
        caption: "Ngày về",
        dataField: "toDate",
        alignment: "centre",
        dataType: "datetime",
        minWidth: "150",
        cellTemplate: "toDate",
    },
    {
        fixed: false,
        fixedPosition: "left",
        visible: true,
        caption: "Số ngày đi công tác",
        dataField: "leaveDay",
        alignment: "right",
        dataType: "float",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",

        visible: true,
        caption: "Địa điểm công tác",
        dataField: "location",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",

        visible: true,
        caption: "Lý do công tác",
        dataField: "purpose",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",

        visible: true,
        caption: "Yêu cầu hỗ trợ",
        dataField: "request",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",

        visible: true,
        caption: "Người hỗ trợ",
        dataField: "supportNames",
        alignment: "left",
        dataType: "text",
        minWidth: "200",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",

        visible: true,
        caption: "Người duyệt",
        dataField: "approvalName",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",

        visible: true,
        caption: "Người liên quan",
        dataField: "relationShipNames",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",

        visible: true,
        caption: "Ghi chú",
        dataField: "description",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "",
    },
    {
        fixed: false,
        fixedPosition: "left",
        visible: true,
        caption: "Trang thái",
        dataField: "status",
        alignment: "left",
        dataType: "text",
        minWidth: "150",
        cellTemplate: "grid-cell",
    },
    {
        fixed: true,
        fixedPosition: "right",
        visible: true,
        caption: "",
        dataField: "",
        alignment: "center",
        dataType: "text",
        minWidth: "100",
        cellTemplate: "feature-cell",
    },
];

const tableMissionAllownEmployee = [
    {
        fixed: true,
        visible: true,
        caption: "Mã nhân viên",
        dataField: "employeeCode",
        alignment: "left",
        dataType: "text",
    },
    {
        fixed: true,
        visible: true,
        caption: "Tên nhân viên",
        dataField: "employeeName",
        alignment: "left",
        dataType: "text",
        cellTemplate: "name-cell",
    },
    {
        fixed: true,
        visible: true,
        caption: "Đơn vị",
        dataField: "organizationUnitName",
        alignment: "left",
        dataType: "text",
    },
    {
        fixed: true,
        visible: true,
        caption: "Vị trí",
        dataField: "jobPositionName",
        alignment: "left",
        dataType: "text",
    },
    {
        fixed: true,
        visible: true,
        caption: "Số điện thoại",
        dataField: "mobilePhone",
        alignment: "left",
        dataType: "text",
    },
];

const tableMissionDetail = [
    {
        fixed: false,
        caption: "Mã nhân viên",
        dataField: "employeeCode",
        minWidth: 150,
        cellTemplate: "",
    },
    {
        fixed: false,
        caption: "Họ và tên",
        dataField: "employeeName",
        minWidth: 150,
        cellTemplate: "name-cell",
    },
    {
        fixed: false,
        caption: "Vị trí công việc",
        dataField: "jobPositionName",
        minWidth: 150,
        cellTemplate: "",
    },
    {
        fixed: false,
        caption: "Đơn vị công tác",
        dataField: "organizationUnitName",
        minWidth: 150,
        cellTemplate: "",
    },
    {
        fixed: false,
        caption: "Số điện thoại",
        dataField: "mobilePhone",
        minWidth: 150,
        cellTemplate: "",
    },
    {
        fixed: true,
        fixedPosition: "right",
        caption: "",
        minWidth: 100,
        cellTemplate: "delete-cell",
    },
];

const statusDropdown = [
    {
        statusName: "Chờ duyệt",
        id: 0,
    },
    {
        statusName: "Đã duyệt",
        id: 1,
    },
    {
        statusName: "Từ chối",
        id: 2,
    },
];

const ErrorMessage = {
    requiredToDate: "Ngày về không được để trống",
    invalidDate: "Ngày về phải lớn hơn hoặc bằng ngày đi",
    requiredFromDate: "Ngày đi không được để trống",
    invalidFromDate: "Ngày đi phải nhỏ hơn hoặc bằng ngày đi",
};

const popupMessage = {
    deleteEmployeeMsg1: "Bạn có chắc chắn muốn xóa",
    deleteEmployeeMsg2: "khỏi nhân viên đi công tác không?",
};
