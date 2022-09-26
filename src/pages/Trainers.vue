<template>
  <div class="users">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Trainers</strong></h5>
              </div>
              <div
                class="
                  col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6
                  text-right
                "
              >
                <router-link to="/create-trainer" class="btn btn-primary">
                  <i class="fa fa-plus"></i> Create Trainer
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
              <div class="col-md-12">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="FilterTrainer"
                  :scroll="{ x: 1700 }"
                  :loading="loading"
                >
                  <span slot="image" slot-scope="id, record" v-if="record.user">
                    <b-img v-bind="mainProps1" :src="APIServerImage + record.user.imagePath"></b-img>
                  </span>
                  <span slot="Id" slot-scope="id, record, index">
                    {{ index + 1 }}
                  </span>
                  <span slot="date" slot-scope="id, data" v-if="data.user">
                    {{ data.user.registrationTime | formatDate }}
                  </span>
                  <span slot="status" slot-scope="id, record">
                    <a-switch
                      :checked="record.accountActive"
                      @click="onChangeStatus(record)"
                    />
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <i class="fa fa-eye" @click="viewTrainer(record)"></i>
                    <!-- <i
                      class="fa fa-pencil"
                      @click="move('/edit-trainer/' + record._id)"
                    ></i> -->
                    <i
                      class="fa fa-trash"
                      @click="
                        deleteModal = true;
                        storeRecord = record;
                      "
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
    <b-modal v-model="editModal" hide-footer title="Edit Trainers">
      <div class="row mb-3">
        <div class="col-12 text-center">
          <div
            class="image"
            @click="pickAvatar"
            v-bind:style="{ 'background-image': 'url(' + image + ')' }"
          >
            <div v-if="!image">
              <i class="fa fa-camera"></i>
              <p>Upload Image</p>
            </div>
          </div>
          <input
            type="file"
            class="btn btn-primary"
            style="display: none"
            accept="image/*"
            @change="onAvatarSelected"
            ref="AvatarInput"
          />
        </div>
      </div>
      <form @submit.prevent="update">
        <div class="row" v-if="updateTrainer">
          <div class="col-6 mt-2">
            <div class="form-group">
              <label for="first_name"><strong>First Name</strong></label>
              <input
                type="text"
                class="form-control"
                v-model="updateTrainer.user.firstName"
                placeholder="Enter First Name"
              />
            </div>
          </div>
          <div class="col-6 mt-2">
            <div class="form-group">
              <label for="last_name"><strong>Last Name</strong></label>
              <input
                type="text"
                class="form-control"
                v-model="updateTrainer.user.lastName"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div class="col-6 mt-2">
            <div class="form-group">
              <label for="email"><strong>Email</strong></label>
              <input
                type="email"
                class="form-control"
                v-model="updateTrainer.user.email"
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div class="col-6 mt-2">
            <div class="form-group">
              <label for="mobile"><strong>Mobile</strong></label>
              <input
                type="tel"
                class="form-control"
                v-model="updateTrainer.user.phoneNo"
                placeholder="Enter Mobile"
              />
            </div>
          </div>
          <div class="col-6 mt-2">
            <div class="form-group">
              <label for="gender"><strong>Gender*</strong></label>
              <select
                class="form-control"
                v-model="updateTrainer.user.gender"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="col-6 mt-2">
            <div class="form-group">
              <label for="nationality"><strong>Nationality*</strong></label>
              <input
                type="text"
                class="form-control"
                v-model="updateTrainer.user.nationality"
                placeholder="Enter Nationality"
                required
              />
            </div>
          </div>
          <div class="col-12 mt-3">
            <button class="btn btn-primary btn-block">Update Trainer</button>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="viewModal" hide-footer title="Trainer Details">
      <div class="row">
        <div class="col-12 text-center mt-2 mb-3">
          <img v-bind="mainProps1" :src="user.image" height="150" width="150" />
        </div>
        <div class="col-12 text-center mt-2 mb-3">
          <p>
            <strong class="text-main">
              Last Edited By Admin {{ user.updated_at }}
            </strong>
          </p>
        </div>
        <!-- <div class="col-12 text-center mt-2 mb-3">
                    <b-img v-bind="mainProps" src="https://ptetutorials.com/images/user-profile.png"></b-img>
                </div> -->
        <div class="col-12 col-md-6 mt-2">
          <label for="id"><strong>Trainer Id</strong></label>
          <p>{{ user._id }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="id"><strong>Registration Date</strong></label>
          <p>{{ user.user.registrationTime }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="first_name"><strong>First Name</strong></label>
          <p>{{ user.user.firstName }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="last_name"><strong>Last Name</strong></label>
          <p>{{ user.user.lastName }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="email"><strong>Email</strong></label>
          <p>{{ user.user.email }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="mobile"><strong>Mobile</strong></label>
          <p>{{ user.user.phoneNo }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="status"><strong>Status</strong></label>
          <p>{{ user.status ? "Active" : "Inactive" }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="gender"><strong>Gender</strong></label>
          <p>{{ user.user.gender }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="job"><strong>Residence</strong></label>
          <p>{{ user.user.residenceCountry }}</p>
        </div>
        <div class="col-12 col-md-6 mt-2" v-if="user.user">
          <label for="nationality"><strong>Country</strong></label>
          <p>{{ user.user.nationality }}</p>
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
import "jspdf-autotable";
export default {
  name: "users",
  computed: {
    FilterTrainer: function () {
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
          // console.log(date.getTime() >= start.getTime() && date.getTime() <= end.getTime())
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

          // filteration by first name and last name
          if (item.user) {
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
  data() {
    return {
      remarksId: null,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      remarks: null,
      remarksModal: false,
      dateRange: null,
      dateRangeFilter: [],
      searchName: "",
      searchEmail: "",
      selectedType: "all",
      deleteModal: false,
      storeRecord: {
        id: null,
      },
      filterObject: {
        email: "",
        name_phone: "",
        status: null,
        nationality: "",
        date_from: "",
        date_to: "",
      },
      mainProps: { blank: false, blankColor: "#777", width: 80, height: 80 },
      mainProps1: { blank: false, blankColor: "#777", width: 45, height: 45 },
      updateTrainer: null,
      image: null,
      editModal: false,
      viewModal: false,
      pagination: {},
      loading: false,
      visible: false,
      user: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        nationality: null,
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
          first_name: "test",
          last_name: "last",
          email: "test@test.com",
          phone: 9090909090,
          country: "India",
          residence: "indai",
        },
      ],
      columns: [
        {
          title: "ID",
          dataIndex: "_id",
          width: "6%",
          scopedSlots: { customRender: "Id" },
        },
        {
          title: "Image",
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
          title: "Phone",
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
    this.getAllTrainers();
  },
  methods: {
    csvExport() {
      let arrData = [];
      arrData.push(...this.data);
      arrData.forEach((item) => {
        delete item.image;
        delete item._id;
        delete item.nationality;
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
      link.setAttribute("download", "Trainers.csv");
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
      doc.text("Trainers List", 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: { cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: { cellPadding: 6 },
        body: vm.data,
        columns: columns,
      });
      doc.save("Trainers.pdf");
    },
    sendRemarks() {
      // TODO: add remarks for
      axios
        .patch("admin/assignTrainerRemarks", {
          trainerId: this.remarksId,
          remarks: this.remarks,
        })
        .then((response) => {
          this.remarksModal = false;
          if (response.status == 200) {
            this.openNotificationWithIcon(
              "success",
              response.data.message,
              "bottomRight"
            );
            this.getAllTrainers();
          } else {
            this.openNotificationWithIcon(
              "error",
              "Internal server error",
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          console.log("admin/assignTrainerRemarks API failed", e.error);
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    getBoolVal(val) {
      if (val === 1) {
        return true;
      } else {
        return false;
      }
    },
    filterTrainerList() {
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
      axios
        .get("admin/searchTrainer", this.filterObject)
        .then((response) => {
          this.data = response.data.data;
          this.data.forEach((item) => {
            item.created_at = item.created_at
              .replace("T", " ")
              .substring(0, 19);
            item.residence = item.trainer.residence;
          });

          if (response.data.accountActive == "success") {
            // console.log("user updated");
          }

          this.loading = false;
          this.data.reverse();
          console.log(response.data);
        })
        .catch((e) => {
          console.log("admin/searchTrainer API failed");
          this.loading = false;
          console.log(e);
        });
    },
    viewTrainer(record) {
      this.user = record;
      this.viewModal = true;
    },
    editTrainer(record) {
      console.log("record----------", record);
      this.updateTrainer = record;
      this.editModal = true;
    },
    getAllTrainers() {
      // if (this.dateRange && this.dateRange.length !== 0) {
      //   this.filterObject.date_from = moment(
      //     JSON.parse(JSON.stringify(this.dateRange[0]))
      //   ).format("yyyy-MM-DD");
      //   this.filterObject.date_to = moment(
      //     JSON.parse(JSON.stringify(this.dateRange[1]))
      //   ).format("yyyy-MM-DD");
      // } else {
      //   this.filterObject.date_from = null;
      //   this.filterObject.date_to = null;
      // }
      this.loading = true;
      axios
        .get("admin/getTrainers")
        .then((response) => {
          this.data = response.data;
          // this.data.forEach((item) => {
          //   item.created_at = item.created_at
          //     .replace("T", " ")
          //     .substring(0, 19);
          //   item.residence = item.trainer.residence;
          // });

          if (response.data.status == "success") {
            // console.log("user updated");
          }
          this.loading = false;
          this.data.reverse();
        })
        .catch((e) => {
          console.log("admin/getTrainers API failed");
          this.loading = false;
          console.log(e);
        });
    },
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
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

    deleteItem(record) {
      console.log("trainerId: ", record._id);
      axios
        .delete("admin/deleteTrainer", {
          headers: { Authorization: this.$store.state.token },
          data: {
            trainerId: record._id,
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
            this.getAllTrainers();
          } else {
            console.log("admin/deleteTrainer API failed", response.error);
            this.openNotificationWithIcon(
              "error",
              "Internal server error",
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          console.log("admin/deleteTrainer API failed", e.error);
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
    onChangeStatus(item) {
      axios
        .patch(
          "admin/activeTrainerAccount",
          { userId: item._id },
          { headers: { Authorization: this.$store.state.token } }
        )
        .then((response) => {
          // console.log("dsdsdsd")
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
          this.getAllTrainers();
        })
        .catch((e) => {
          console.log("admin/updateStudent API failed", e);
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
    },
  },
};
</script>