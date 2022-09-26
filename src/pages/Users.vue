<template>
  <div class="users" id="app">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Users</strong></h5>
              </div>

              <div
                class="
                  col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6
                  text-right
                "
              >
                <b-dropdown
                  id="dropdown-left"
                  text="Download"
                  variant="primary"
                  class="m-2"
                >
                  <b-dropdown-item @click="csvExport()">CSV</b-dropdown-item>
                  <!-- <b-dropdown-item @click="exportPDF()">PDF</b-dropdown-item> -->
                </b-dropdown>
                <button
                  v-if="
                    currentUserRole == 'read,write' ||
                    currentUserRole == 'read,write,update,delete'
                  "
                  class="btn btn-primary"
                  @click="move('/create-user')"
                >
                  <i class="fa fa-plus"></i> Create User
                </button>
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
                  :dataSource="FilterUser"
                  :scroll="{ x: 1500 }"
                  :loading="loading"
                >
                  <span slot="sr" slot-scope="id, data, index">
                    {{ index + 1 }}
                  </span>
                  <span slot="date" slot-scope="id, data">
                    {{ data.registrationTime | formatDate }}
                  </span>
                  <span slot="image" slot-scope="id, data">
                    <b-img
                      v-bind="mainProps1"
                      :src="`${APIServerImage}${data.imagePath}`"
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
                      @click="viewUserData(record)"
                      class="fa fa-eye"
                      aria-hidden="true"
                    ></i
                    ><i
                      class="fa fa-pencil"
                      v-if="currentUserRole == 'read,write,update,delete'"
                      @click="move('/edit-user/' + record._id)"
                      aria-hidden="true"
                    ></i>
                    <!-- v-if="currentUserRole == 'read,write,update,delete'" -->
                    <i
                      @click="
                        deleteModal = true;
                        storeRecord = record;
                      "
                      class="fa fa-trash"
                      aria-hidden="true"
                    ></i>
                    <!-- <button
                      class="btn btn-primary btn-sm"
                      @click="
                        remarksModal = true;
                        remarksId = id.id;
                      "
                    >
                      Remarks
                    </button> -->
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
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

    <!-- <b-modal v-model="editModal" hide-footer title="Edit User">
            <div class="row mb-3">
                <div class="col-12 text-center">
                    <div class="image" @click="pickAvatar" v-bind:style="{ 'background-image': 'url(' + image + ')' }">
                        <div v-if="!image">
                            <i class="fa fa-camera" ></i>
                            <p>Upload Image</p>
                        </div> 
                    </div>
                    <input type="file" class="btn btn-primary" style="display:none" accept="image/*"  @change="onAvatarSelected" ref="AvatarInput">
                </div>
            </div>
            <form @submit.prevent="update">
                <div class="row" v-if="editUser">
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="first_name"><strong>First Name*</strong></label>
                            <input type="text" class="form-control" v-model="editUser.first_name" placeholder="Enter First Name" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="last_name"><strong>Last Name*</strong></label>
                            <input type="text" class="form-control" v-model="editUser.last_name" placeholder="Enter Last Name" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="email"><strong>Email*</strong></label>
                            <input type="email" class="form-control" v-model="editUser.email" placeholder="Enter Email" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="mobile"><strong>Mobile*</strong></label>
                            <input type="tel" class="form-control" v-model="editUser.mobile" placeholder="Enter Mobile" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="job_title"><strong>Job Title*</strong></label>
                            <input type="text" class="form-control" v-model="editUser.job_title" placeholder="Enter Job Title" required>
                        </div>
                    </div>
                    <div class="col-6 mt-2">
                        <div class="form-group">
                            <label for="nationality"><strong>Nationality*</strong></label>
                            <input type="text" class="form-control" v-model="editUser.nationality" placeholder="Enter Nationality" required>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <button class="btn btn-primary btn-block">Edit User</button>
                    </div>
                </div>
            </form>
            
        </b-modal> -->

    <b-modal v-model="viewModal" hide-footer title="User Details">
      <div class="row">
        <div class="col-12 text-center mt-2 mb-3">
          <img
            v-bind="mainProps1"
            :src="`${APIServerImage}${viewUser.imagePath}`"
            height="150"
            width="150"
          />
        </div>
        <div class="col-12 text-center mt-2 mb-3">
          <p>
            <strong class="text-main"
              >Last Edited By Admin {{ viewUser.updated_at }}</strong
            >
          </p>
        </div>
        <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                </div> -->
        <div class="col-12 col-md-6 mt-2">
          <label for="id"><strong>User Id</strong></label>
          <p>{{ viewUser._id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="id"><strong>Registration Date</strong></label>
          <p>{{ viewUser.registrationTime | formatDate }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="first_name"><strong>First Name</strong></label>
          <p>{{ viewUser.firstName }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="last_name"><strong>Last Name</strong></label>
          <p>{{ viewUser.lastName }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="email"><strong>Email</strong></label>
          <p>{{ viewUser.email }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="mobile"><strong>Mobile</strong></label>
          <p>{{ viewUser.phoneNo }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="status"><strong>Status</strong></label>
          <p>{{ viewUser.accountActive ? "Active" : "Inactive" }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="gender"><strong>Gender</strong></label>
          <p>{{ viewUser.gender }}</p>
        </div>
        <!-- <div class="col-12 col-md-6 mt-2">
          <label for="job"><strong>Job Title</strong></label>
          <p>Software Engineer</p>
        </div> -->
        <div class="col-12 col-md-6 mt-2">
          <label for="nationality"><strong>Country</strong></label>
          <p>{{ viewUser.nationality }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label for="nationality"><strong>Residence</strong></label>
          <p>{{ viewUser.residenceCountry }}</p>
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
import axios from "axios";
import jsPDF from "jspdf";
import moment from "moment";
import countries from "../assets/countries.json";
import "jspdf-autotable";
import Vue from "vue";

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});

export default {
  name: "users",
  computed: {
    rows() {
      return this.items.length;
    },
  },

  data() {
    return {
      searchQuery: null,
      startData: "",
      endDate: "",
      itemData: "",
      items: [],
      remarks: "",
      remarksModal: false,
      dateRangeFilter: [],
      searchName: "",
      searchEmail: "",
      selectedType: "all",

      currentUserRole: "",
      dateRange: null,
      deleteModal: false,
      storeRecord: {
        id: null,
      },
      filterObject: {
        email: "",
        name_phone: "",
        status: null,
        date_from: "",
        date_to: "",
      },
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      mainProps: { blank: false, blankColor: "#777", width: 80, height: 80 },
      mainProps1: { blank: false, blankColor: "#777", width: 45, height: 45 },
      editUser: null,
      image: null,
      editModal: false,
      viewModal: false,
      //   viewUser:null,
      pagination: {},
      loading: false,
      visible: false,
      viewUser: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        nationality: null,
        image: null,
        job_title: null,
        status: "active",
        updated_at: null,
      },
      userList: [
        {
          image: null,
          id: 1,
          created_at: "01-01-2021",
          first_name: "test",
          last_name: "last",
          email: "test@test.com",
          phone: 9090909090,
          country: "India",
          residence: "indai",
        },
      ],
      columns: [
        // {
        //   title: "Id",
        //   dataIndex: "_id",
        //   width: "6%",
        // },
        {
          title: "Sr.",
          dataIndex: "_id",
          width: "4%",
          scopedSlots: { customRender: "sr" },
        },
        {
          title: "Image",
          dataIndex: "imagePath",
          width: "6%",
          scopedSlots: { customRender: "image" },
        },
        {
          title: "Registration Date",
          dataIndex: "registrationTime",
          scopedSlots: { customRender: "date" },
        },
        {
          title: "First Name",
          dataIndex: "firstName",
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Phone",
          dataIndex: "phoneNo",
        },
        {
          title: "Country",
          dataIndex: "nationality",
        },
        {
          title: "Residence",
          dataIndex: "residenceCountry",
          dataIndex: "residenceCountry",
        },
        {
          title: "Status",
          dataIndex: "status",
          width: "6%",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "Actions",
          scopedSlots: { customRender: "actions" },
        },
      ],
    };
  },
  created() {
    this.currentUserRole = sessionStorage.getItem("currentUserRole");
    this.getUsersList();
  },
  computed: {
    FilterUser: function () {
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
        return this.items.filter((item) => {
          let date = moment(
            JSON.parse(JSON.stringify(item.registrationTime))
          ).format("MM/DD/YYYY");
           date= new Date(date);      
          // console.log(date.getTime() >= start.getTime() && date.getTime() <= end.getTime())
          return (date.getTime() >= start.getTime() && date.getTime() <= end.getTime());
        });
      } else {
        return this.items.filter((item) => {
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

          // let filtered = true
          //   if(filterType && filterType.length > 0){
          //     filtered = item.type == filterType
          //   }

          // filteration by first name and last name
          var fullName = item.firstName + " " + item.lastName;
          return (
            (fullName || "")
              .toLowerCase()
              .indexOf((this.searchName || "").toLowerCase()) > -1 &&
            (item.email || "")
              .toLowerCase()
              .indexOf((this.searchEmail || "").toLowerCase()) > -1 &&
            filtered
          );
        });
      }
    },
  },

  methods: {
    // filterProductsByEmail: function(items){
    //     return this.items.filter(item => {
    //         return (item.email || '').toLowerCase().indexOf((this.searchEmail || '').toLowerCase()) > -1
    //       })
    //       },

    //         filterProductsByName: function(items) {
    //           return this.items.filter(item => {
    //           return (item.firstName || '').toLowerCase().indexOf((this.searchName || '').toLowerCase()) > -1
    //         })
    //         },

    // deleteme(item){
    //   console.log(item)
    //   axios
    //     .patch(this.APIServer + "admin/deleteUser/", {
    //       headers: { Authorization: this.$store.state.token },
    //       body: {userId: item._id}
    //     })
    //     .then((response) => {
    //       console.log(response)
    //     }).catch(e => {
    //       console.log(e, 'error')
    //     })
    // },
    getBoolVal(val) {
      if (val === 1) {
        return true;
      } else {
        return false;
      }
    },

    csvExport() {
      let arrData = [];
      arrData.push(...this.userList);
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
      link.setAttribute("download", "Users.csv");
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
      doc.text("Users List", 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: { cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: { cellPadding: 6 },
        body: vm.userList,
        columns: columns,
      });
      doc.save("Users.pdf");
    },
    openNotificationWithIcon(type, message) {
      this.$notification[type]({
        message: "Response",
        description: message,
      });
    },
    filterUserList() {
      axios
        .get("admin/searchUsers", this.filterObject.email, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          //this.userList = response.data;
          // this.items = response.data
          this.items = response.data;
          this.items.reverse()
          this.loading = false;
        });

      if (this.dateRange && this.dateRange.length !== 0) {
        this.filterObject.date_from = moment(
          JSON.parse(JSON.stringify(this.dateRange[0]))
        ).format("yyyy-MM-DD");
        this.filterObject.date_to = moment(
          JSON.parse(JSON.stringify(this.dateRange[1]))
        ).format("yyyy-MM-DD");
      } else {
        this.filterObject.date_from = null;
        this.filterObject.date_to = null;
      }

      // axios
      //   .get(this.APIServer + "admin/searchUsers?status=", this.filterObject.status, {
      //     headers: { Authorization: this.$store.state.token },
      //   })
      //   .then((response) => {
      //     if (response.data != null) {
      //       console.log(response.data.data);
      //       this.userList = response.data.data;
      //       this.userList.forEach((item) => {
      //         let countryVal = countries.filter(val=>val.name===item.country);
      //         item.phone = countryVal[0].dial_code+" "+item.phone;
      //         item.created_at = item.created_at.replace('T',' ').substring(0, 19);
      //       });
      //       this.userList.reverse();
      //     }
      //     this.loading = false;
      //   })
      //   .catch((e) => {
      //     console.log("API failed");
      //     console.log(e);
      //     this.loading = false;
      //     this.openNotificationWithIcon("error", "Internal server error");
      //   });
    },

    getUsersList() {
      this.loading = true;
      if (this.dateRange && this.dateRange.length !== 0) {
        this.filterObject.date_from = moment(
          JSON.parse(JSON.stringify(this.dateRange[0]))
        ).format("yyyy-MM-DD");
        this.filterObject.date_to = moment(
          JSON.parse(JSON.stringify(this.dateRange[1]))
        ).format("yyyy-MM-DD");
      } else {
        this.filterObject.date_from = null;
        this.filterObject.date_to = null;
      }

      console.log("yeuyeuyweeuywe", this.$store.state.token);
      axios
        .get("admin/getUsers", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log("response:", response.data);
          response.data.reverse()
          this.userList = response.data;
          this.items = response.data;
          this.userList.forEach((item) => {
            let countryVal = countries.filter(
              (val) => val.name === item.country
            );
            item.phone = countryVal[0].dial_code + " " + item.phone;
            item.created_at = item.created_at
              .replace("T", " ")
              .substring(0, 19);
          });
          this.userList.reverse();

          if (response.data.state == true) {
            console.log(response.data.data);
            this.userList = response.data.data;
            this.userList.forEach((item) => {
              let countryVal = countries.filter(
                (val) => val.name === item.country
              );
              item.phone = countryVal[0].dial_code + " " + item.phone;
              item.created_at = item.created_at
                .replace("T", " ")
                .substring(0, 19);
            });
            this.userList.reverse();
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.loading = false;
          ///this.openNotificationWithIcon("error", "Internal server error");
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
    edit(record) {
      this.editUser = record;
      this.editModal = true;
    },
    update() {
      this.editModal = false;
    },
    // view(record) {

    // },
    deleteItem(item) {
      // console.log(item._id, "record");
      this.deleteModal = false;
      axios
        .delete(
          "admin/deleteUser",
          { data: { userId: item._id } },
          {
            headers: { Authorization: this.$store.state.token },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.status == true) {
            //this.items= this.items.filter(item=>items._id!=_id)
            this.openNotificationWithIcon(
              "success",
              "User deleted successfully"
            );
            // this.deleteUser(itemIndex);
            // this.items = response.data;
            // window.location.reload();
            this.getUsersList();
          }
        })
        .catch((e) => {
          console.log("API failed");
          this.openNotificationWithIcon("error", "User deleting failed");
          console.log(e);
        });
    },
    deleteUser(itemIndex) {
      this.items.splice(itemIndex, 1);
    },
    viewUserData(record) {
      this.viewUser = record;
      this.viewModal = !this.viewModal;
    },
    onChangeStatus(record) {
      axios
        .patch(
          "admin/activeUserAccount",
          { userId: record._id },
          { headers: { Authorization: this.$store.state.token } }
        )

        .then((response) => {
          console.log(response.data);
          if (response.data.accountActivateStatus == true) {
            this.openNotificationWithIcon(
              "success",
              "User Status Active"
            );
          
            // this.filterUserList();
          }else if (response.data.accountActivateStatus == false) {
            this.openNotificationWithIcon(
              "success",
              "User Status Inactive"
            );
          
            // this.filterUserList();
          }
        })
        .catch((e) => {
          console.log("API failed");
          this.openNotificationWithIcon("warning", "User status toggle failed");
          console.log(e);
        });
    },
  },
};
</script>
<style scoped>
.action-button span {
  display: flex;
  align-items: center;
}

.table tr > td {
  padding: 16px 16px;
  overflow-wrap: break-word;
}

/*Header*/
.thead tr th {
  float: left;
  background-color: #00b3ee;
  border-color: #00b3ee;
}
</style>
