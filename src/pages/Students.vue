<template>
  <div class="users">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Students</strong></h5>
              </div>
              <div
                class="
                  col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6
                  text-right
                "
              >
              
                <router-link to="/create-student" class="btn btn-primary">
                  <i class="fa fa-plus"></i> Create Student
                </router-link>
                
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 col-md-3">
                <label for="filter"><strong> Filter By Status</strong></label>
                <select
                  class="form-control"
                  placeolder=""
                  v-model="selectedType"
                >
                  <option value="all">All</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div class="col-12 col-md-3 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Name</strong></label>
                <input
                  type="text"
                  placeholder="Search By Name"
                  class="form-control"
                  v-model="searchName"
                />
              </div>
              <!-- <div class="col-12 col-md-3 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Residence</strong></label>

                <country-select
                  v-model="residenceCountry"
                  :country="country"
                  type="text"
                  placeholder="Search By Residence"
                  class="form-control"
                />
              </div> -->

              <div class="col-12 col-md-3 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Email</strong></label>
                <input
                  type="text"
                  placeholder="Search By Email"
                  class="form-control"
                  v-model="searchEmail"
                />
              </div>
              <div class="col-12 col-md-3 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Date</strong></label>
                <a-range-picker
                  class="date-input form-control"
                  size="default"
                  v-model="dateRangeFilter"
                />
              </div>
            </div>

            <div class="row">
              <div class="ml-3 mr-3 table-responsive">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="FilterStudent"
                  :scroll="{ x: 1500 }"
                  :loading="loading"
                >
                  <span slot="id" slot-scope="id, data, index">
                    {{ index + 1 }}
                  </span>
                  <span slot="date" slot-scope="id, data" v-if="data.user">
                    {{ data.user.registrationTime | formatDate }}
                  </span>
                  <span slot="image" slot-scope="id, data">
                    <b-img
                      v-if="data.user"
                      v-bind="mainProps1"
                      :src="`${APIServerImage}${data.user.imagePath}`"
                    ></b-img>
                  </span>
                  <span slot="status" slot-scope="id, data">
                    <a-switch
                      v-model="data.accountActive"
                      @click="onChangeStatus(data)"
                    />
                  </span>
                  <span slot="send" slot-scope="id, data">
                    <button
                      class="btn btn-primary btn-sm"
                      @click="sendPromotion(data)"
                    >
                      Send
                    </button>
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i
                      @click="viewStudent(record)"
                      class="fa fa-eye"
                      aria-hidden="true"
                    >
                    </i>
                    <!-- <i
                      class="fa fa-pencil"
                      @click="edit(record)"
                      aria-hidden="true"
                    ></i> -->
                    <i
                      @click="
                        deleteModal = true;
                        storeRecord = record;
                      "
                      class="fa fa-trash"
                      aria-hidden="true"
                    ></i>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="
                        remarksModal = true;
                        remarksId = record._id;
                      "
                    >
                      Remarks
                    </button>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   
    <b-modal v-model="remarksModal" hide-footer title="Add Remarks">
      <form @submit.prevent>
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <h5 class="d-block text-center">
                <strong>
                  <textarea
                    class="form-control"
                    required
                    placeholder="Enter Remarks here..."
                    rows="6"
                    v-model="remarks"
                  ></textarea>
                </strong>
              </h5>
              <br />
            </div>
          </div>
          <div class="col-12 mt-10 fr">
            <span>
              <button
                class="btn btn-secondary mr-4"
                @click="remarksModal = false"
              >
                Cancel
              </button>
              <button class="btn btn-primary" @click="sendRemarks()">
                Send
              </button>
            </span>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal v-model="viewModal" hide-footer title="Student Details">
      <div class="row">
        <div class="col-12 text-center mt-2 mb-3">
          <img
            v-if="userRecord.user"
            v-bind="mainProps1"
            :src="`${APIServerImage}${userRecord.user.imagePath}`"
            height="150"
            width="150"
          />
        </div>
        <div class="col-12 text-center mt-2 mb-3">
          <p>
            <strong class="text-main">
              Last Edited By Admin {{ userRecord.updated_at }}
            </strong>
          </p>
        </div>
        <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                </div> -->

        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="id"><strong>Student Id</strong></label>
          <p>{{ userRecord._id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="id"><strong>Registration Date</strong></label>
          <p>{{ userRecord.user.registrationTime }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="firstName"><strong>First Name</strong></label>
          <p>{{ userRecord.user.firstName }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="lastName"><strong>Last Name</strong></label>
          <p>{{ userRecord.user.lastName }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="email"><strong>Email</strong></label>
          <p>{{ userRecord.user.email }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="mobile"><strong>Mobile</strong></label>
          <p>{{ userRecord.user.phoneNo }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="status"><strong>Status</strong></label>
          <p>{{ userRecord.accountActive ? "Active" : "Inactive" }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="gender"><strong>Gender</strong></label>
          <p>{{ userRecord.user.gender }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="job"><strong>Residence</strong></label>
          <p>{{ userRecord.user.nationality }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="userRecord.user">
          <label for="nationality"><strong>Country</strong></label>
          <p>{{ userRecord.user.residenceCountry }}</p>
        </div>
      </div>
    </b-modal>
    <b-modal
      title="Delete Confirmation"
      modal-class="myclass"
      :hide-footer="true"
      v-model="deleteModal"
    >
      <form @submit.prevent>
        <div class="row">
          <div class="col-12 mt-3">
            <div class="form-group">
              <h5 class="d-block text-center">
                <strong>Are you sure you want to delete it?</strong>
              </h5>
              <br />
            </div>
          </div>
          <div class="col-12 mt-10">
            <span>
              <button
                class="btn btn-secondary mr-4"
                @click="deleteModal = false"
              >
                Cancel
              </button>
              <button class="btn btn-primary" @click="deleteItem(storeRecord)">
                Delete
              </button>
            </span>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import moment from "moment";
import axios from "axios";
import "jspdf-autotable";
import vueCountryRegionSelect from "vue-country-region-select";
export default {
  name: "users",

  data() {
    return {
      startData: "",
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      endDate: "",
      itemData: "",
      items: [],
      residenceCountry: "",
      nationality: "",
      currentUserRole: "",
      dateRangeFilter: "",
      selectedType: "all",
      searchName: "",
      searchEmail: "",
      remarksId: null,
      remarks: null,
      country: null,
      remarksModal: false,
      dateRange: null,
      deleteModal: false,

      filterObject: {
        email: "",
        name_phoneNo: "",
        status: null,
        date_from: "",
        date_to: "",
      },
      mainProps: { blank: false, blankColor: "#777", width: 80, height: 80 },
      mainProps1: { blank: false, blankColor: "#777", width: 45, height: 45 },
      editUser: null,
      image: null,
      editModal: false,
      viewModal: false,
      pagination: {},
      loading: false,
      visible: false,
      userRecord: {
        email: null,
        firstName: null,
        lastName: null,
        password: null,
        gender: null,
        residenceCountry: null,
        phoneNo: null,
        nationality: null,
        companyName: null,
        yearsOfExperience: null,
        dateOfBirth: null,
        trnCertificateFile: null,
        companyLogoFile: null,
        certificateFile: null,
        tradeLicenseFile: null,
        emiratesIdFile: null,
        image: null,
        role: null,
        updated_at: null,
        status: "active",
      },
      data: [
        {
          image: null,
          id: 1,
          created_at: "01-01-2021",
          email: "test@test.com",
          firstName: "test",
          lastName: "last",
          phoneNo: 9090909090,
          country: "India",
          residence: "indai",
        },
      ],
      columns: [
         {
          title: "Sr.",
          width: "4%",
          scopedSlots: { customRender: "id" },
        },
        {
          title: "Image",
          width: "5%",
          scopedSlots: { customRender: "image" },
        },
        {
          title: "Registration Date",
          dataIndex: "registrationTime",
          scopedSlots: { customRender: "date" },
        },
        {
          title: "First Name",
          dataIndex: "user.firstName",
        },
        {
          title: "Last Name",
          dataIndex: "user.lastName",
        },
        {
          title: "Email",
          dataIndex: "user.email",
        },
        {
          title: "phoneNo",
          dataIndex: "user.phoneNo",
        },
        {
          title: "Nationality",
          dataIndex: "user.nationality",
        },
        {
          title: "Residence",
          dataIndex: "user.residenceCountry",
        },
        {
          title: "Status",
          dataIndex: "accountActive",
          type: "checkbox ",
          width: "6%",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Actions",
          width: "13%",
          scopedSlots: { customRender: "actions" },
        },
      ],
    };
  },
  created() {
    this.currentUserRole = sessionStorage.getItem("currentUserRole");

    console.log("Current User Role", this.currentUserRole);
    this.getAllStudents();
  },
  computed: {
    FilterStudent: function () {
      if (this.dateRangeFilter && this.dateRangeFilter.length !== 0) {
        this.startDate = moment(
          JSON.parse(JSON.stringify(this.dateRangeFilter[0]))
        ).format("MM/DD/YYYY");
        this.endDate = moment(
          JSON.parse(JSON.stringify(this.dateRangeFilter[1]))
        ).format("MM/DD/YYYY");
      }
      if (this.startDate != "" && this.endDate != "") {
        let start = new Date(this.startDate);
        let end = new Date(this.endDate);
        this.startDate = "";
        this.endDate = "";
        return this.data.filter((item) => {
          if (item.user) {
            let date = moment(
              JSON.parse(JSON.stringify(item.user.registrationTime))
            ).format("MM/DD/YYYY");
            date= new Date(date);
            return (date.getTime() >= start.getTime() && date.getTime() <= end.getTime());
          } else {
            return this.data;
          }
        });
      } else {
        return this.data.filter((item) => {
          let filtered = true;
          if (this.selectedType == 1) {
            filtered = item.accountActive == true;
          }
          if (this.selectedType == 0) {
            filtered = item.accountActive == false;
          }
          if (this.selectedType == "") {
            filtered = item.accountActive == true;
          }

          if (item.user) {
          //   if (this.residenceCountry == item.user.residenceCountry) {
          //    console.log(this.residenceCountry,'residence==============')
          //    console.log(item.user.residenceCountry,'itemresidence==============')
          //  }

            // filteration by first name and last name
            var fullName = item.user.firstName + " " + item.user.lastName;
            return (
              (fullName || "")
                .toLowerCase()
                .indexOf((this.searchName || "").toLowerCase()) > -1 &&
              (item.user.email || "")
                .toLowerCase()
                .indexOf((this.searchEmail || "").toLowerCase()) > -1 &&
              filtered
            );
          }
        });
      }
    },

    rows() {
      return this.items.length;
    },
  },

  methods: {
    csvExport() {
      let arrData = [];
      arrData.push(...this.data);
      arrData.forEach((item) => {
        delete item.image;
        delete item.id;
        delete item.nationality;
        delete item.created_at;
        delete item.updated_at;
        delete item.dob;
        delete item.email_verified_at;
      });

      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]).join(","),
        ...arrData.map((item) => Object.values(item).join(",")),
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "Students.csv");
      link.click();
    },

    exportPDF() {
      var vm = this;
      let columns = [];
      columns.push(...this.columns);
      columns.forEach((item) => {
        item.dataKey = item.dataIndex;
      });
      columns.shift();
      columns.pop();
      var doc = new jsPDF("p", "pt");
      doc.text("Students List", 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: { cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: { cellPadding: 6 },
        body: vm.data,
        columns: columns,
      });
      doc.save("Students.pdf");
    },
    getBoolVal(val) {
      if (val === 1) {
        return true;
      } else {
        return false;
      }
    },
    filterStudentList() {
      if (this.dateRange && this.dateRange.length !== 0) {
        this.filterObject.dateFrom = moment(
          JSON.parse(JSON.stringify(this.dateRange[0]))
        ).format("yyyy-MM-DD");
        this.filterObject.dateTo = moment(
          JSON.parse(JSON.stringify(this.dateRange[1]))
        ).format("yyyy-MM-DD");
      } else {
        this.filterObject.dateFrom = null;
        this.filterObject.dateTo = null;
      }
      // TODO: API for search/ filte student
      axios
        .get("admin/searchStudent", this.filterObject, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.data = response.data;
        })
        .catch((e) => {
          console.log("admin/searchStudent API failed");
          console.log(e);
          this.loading = false;
        });
    },
    getAllStudents() {
     
      this.loading = true;

      axios
        .get("admin/getStudents", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          // console.log(response.data)
          this.items = response.data;
          console.log(this.items)
          this.data = response.data;
          this.loading = false;
          this.data.reverse();
        })
        .catch((e) => {
          console.log("admin/getStudents API failed", e);
          this.loading = false;
        });
    },

    sendRemarks() {
      // TODO: remarks API for student
      axios
        .patch(
          "admin/assignStudentRemarks",
          { studentId: this.remarksId, remarks: this.remarks },
          { headers: { Authorization: this.$store.state.token } }
        )
        .then((response) => {
          this.remarksModal = false;
          if (response.status == 200) {
            this.openNotificationWithIcon(
              "success",
              response.data.data,
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
          console.log("API failed");
          console.log(e);
          this.loading = false;
        });
    },
    move(to) {
      this.$router.push({ path: to });
    },
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    onAvatarSelected(event) {
      let file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
      }
    },
    createUser() {
      let last = this.data[this.data.length - 1];
      this.user.key = last.key + 1;
      this.data.push(this.user);
      this.viewModal = false;
    },
    edit(student) {
      this.editUser = student;
      this.move("edit-student/" + student._id);
      this.editModal = true;
    },
    update() {
      this.editModal = false;
    },
    deleteItem(record) {
      axios
        .delete("admin/deleteStudent", {
          headers: { Authorization: this.$store.state.token },
          data: {
            studentId: record._id,
          },
        })
        .then((response) => {
          this.deleteModal = false;
          if (response.data.status) {
            this.openNotificationWithIcon(
              "success",
              response.data.message,
              "bottomRight"
            );
            // let index = this.data.indexOf(record);
            // if (index !== -1) {
            //   this.data.splice(index, 1);
            // }
            this.getAllStudents();
          } else {
            console.log("admin/deleteStudent API failed", response.error);
            this.openNotificationWithIcon(
              "error",
              "Internal server error",
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          console.log("admin/deleteStudent API failed", e.error);
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },

    viewStudent(record) {
      console.log(record);
      this.userRecord = record;
      this.viewModal = true;
    },

    onChangeStatus(item) {
      console.log(item._id)
      axios
        .patch(
          "admin/activeStudentAccount",
          { studentId: item._id },
          { headers: { Authorization: this.$store.state.token } }
        )
        .then((response) => {
          console.log(response.data)
          if(response.data.accountActivateStatus == true)
          this.openNotificationWithIcon(
            "success",
            "Account Status Active",
            "bottomRight"
          );
          else if(response.data.accountActivateStatus == false)
          this.openNotificationWithIcon(
            "success",
            "Account Status Inactive",
            "bottomRight"
          );
          this.getAllStudents();
        })
        .catch((e) => {
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
    },
  },
};
</script>
<style scoped>
.action-button span {
  display: flex;
}
td {
  white-space: normal !important;
  word-wrap: break-word;
}
table {
  table-layout: fixed;
}

.icons-s i {
  margin-top: 10px;
}
</style>
