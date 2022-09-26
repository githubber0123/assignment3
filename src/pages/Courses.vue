<template>
  <div class="courses">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Courses </strong></h5>
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
                <button class="btn btn-primary" @click="move('/create-course')">
                  <i class="fa fa-plus"></i> Create Course
                </button>
              </div>
            </div>

            <div class="row my-3">
              <div class="col-12 col-md-4">
                <label for="filter"><strong>Filter By Status</strong></label>
                <select class="form-control" v-model="selectedType">
                  <option value="all">All</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Name</strong></label>
                <input
                  type="text"
                  placeholder="Search By Name"
                  class="form-control"
                  v-model="searchName"
                />
              </div>
              <div class="col-12 col-md-4 mt-md-0 mt-3">
                <label for="filter"><strong>Search By Price</strong></label>
                <input
                  type="text"
                  placeholder="Search By Price"
                  class="form-control"
                  v-model="searchAmount"
                />
              </div>
            </div>
            <div class="row">
              <div class="ml-3 mr-3 table-responsive">
                <a-table
                  class="table"
                  :columns="columns"
                  :dataSource="FilterCourse"
                
                  :loading="loading"
                >
                  <span slot="id" slot-scope="id, data, index">
                    {{ index + 1 }}
                  </span>
                  <span slot="date" slot-scope="id, data">
                    {{ data.createdAt | formatDate }}
                  </span>
                  <!-- <span slot="image" slot-scope="id, data">
                    <span v-for="(item, index) in data.imagesPath" :key="index">
                      <b-img
                        class="m-1"
                        v-bind="mainProps1"
                        :src="`${APIServerImage}${item}`"
                      ></b-img>
                    </span>
                  </span> -->
                  <span slot="image" slot-scope="id, data">
                
                  <span
                    v-for="(item, index) in data.imagesPath"
                    :key="index"
                  >
                    <img
                    class="mr-3"
                      :src="`${APIServerImage}${item}`"
                      height="40"
                      width="40"
                    />
                  </span>
                  </span>
                 
                  <span slot="status" slot-scope="id, data">
                    <a-switch
                      v-model="data.activeStatus"
                      @click="onChangeStatus(data)"
                    />
                  </span>
                  <span slot="actions" slot-scope="id, record">
                    <b-dropdown>
                      <template v-slot:button-content> Actions </template>
                      <b-dropdown-item @click="move('/course/' + record._id)"
                        ><i class="fa fa-eye"></i> View Course</b-dropdown-item
                      >
                      <b-dropdown-item
                        @click="move('/edit-course/' + record._id)"
                        ><i class="fa fa-pencil"></i> Update
                        Course</b-dropdown-item
                      >
                      <b-dropdown-item
                        @click="move('/course/' + record._id + '/reviews')"
                        ><i class="fa fa-star"></i> Reviews</b-dropdown-item
                      >
                      <b-dropdown-item
                        @click="move('/course/' + record._id + '/tests')"
                        ><i class="fa fa-file"></i> Tests</b-dropdown-item
                      >
                      <b-dropdown-item
                        ><i class="fa fa-certificate"></i>
                        Certificate</b-dropdown-item
                      >
                      <b-dropdown-item
                        @click="
                          deleteModal = true;
                          storeRecord = record;
                        "
                        ><i class="fa fa-trash"></i> Delete
                        Course</b-dropdown-item
                      >
                    </b-dropdown>
                  </span>
                </a-table>
              </div>
            </div>

            <b-modal v-model="viewModal" hide-footer title="Student Details">
              <div class="row">
                <div class="col-12 text-center mt-2 mb-3">
                  <!-- {{ storeRecord }} -->
                  <span
                    v-for="(item, index) in storeRecord.imagesPath"
                    :key="index"
                  >
                    <img
                      v-if="storeRecord.imagesPath"
                      v-bind="mainProps1"
                      :src="`${APIServerImage}${item}`"
                      height="80"
                      width="80"
                    />
                  </span>
                </div>
                <div
                  class="col-12 col-md-6 mt-2"
                  v-if="storeRecord.trainerDetail"
                >
                  <label for="trainerName"><strong>Trainer Name</strong></label>
                  <p>
                    {{
                      storeRecord.trainerDetail.firstName +
                      storeRecord.trainerDetail.lastName
                    }}
                  </p>
                </div>
                <div
                  class="col-12 col-md-6 mt-2"
                  v-if="storeRecord.trainerDetail"
                >
                  <label for="trainerEmail"
                    ><strong>Trainer Email</strong></label
                  >
                  <p>{{ storeRecord.trainerDetail.email }}</p>
                </div>

                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Course Arabic</strong></label
                  >
                  <p>{{ storeRecord.nameArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Course English</strong></label
                  >
                  <p>{{ storeRecord.nameEnglish }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Course Arabic</strong></label
                  >
                  <p>{{ storeRecord.nameArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Course English</strong></label
                  >
                  <p>{{ storeRecord.nameEnglish }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Arabic Course Information</strong></label
                  >
                  <p>{{ storeRecord.courseInformationArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>English Course Information</strong></label
                  >
                  <p>{{ storeRecord.courseInformationEnglish }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Arabic Document Required</strong></label
                  >
                  <p>{{ storeRecord.documentsRequiredArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>English Document Required</strong></label
                  >
                  <p>{{ storeRecord.documentsRequiredEnglish }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Arabic Registration Process</strong></label
                  >
                  <p>{{ storeRecord.RegistrationProcedureArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>English Registration Process</strong></label
                  >
                  <p>{{ storeRecord.RegistrationProcedureEnglish }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Arabic Lecture Details</strong></label
                  >
                  <p>{{ storeRecord.lectureDetailsArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>English Lecture Details</strong></label
                  >
                  <p>{{ storeRecord.lectureDetailsEnglish }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Arabic Fee Details</strong></label
                  >
                  <p>{{ storeRecord.feesDetailsArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>English Fee Details</strong></label
                  >
                  <p>{{ storeRecord.feesDetailsEnglish }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Arabic Test Details</strong></label
                  >
                  <p>{{ storeRecord.testDetailsArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>English Test Details</strong></label
                  >
                  <p>{{ storeRecord.testDetailsEnglish }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>Arabic Refund Policy</strong></label
                  >
                  <p>{{ storeRecord.refundPolicyForOnlinePaymentsArabic }}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord">
                  <label for="trainerEmail"
                    ><strong>English Refund Policy</strong></label
                  >
                  <p>{{ storeRecord.refundPolicyForOnlinePaymentsEnglish }}</p>
                </div>

                <!-- <div class="col-12 col-md-6 mt-2" v-if="storeRecord.categoryDetail">
                  <label for="nameEnglish"><strong>Name English</strong></label>
                  <p>{{storeRecord.categoryDetail.nameEnglish}}</p>
                </div>
                <div class="col-12 col-md-6 mt-2" v-if="storeRecord.categoryDetail">
                  <label for="nameArabic"><strong>Name Arabic</strong></label>
                  <p>{{storeRecord.categoryDetail.nameArabic}}</p>
                </div> -->
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
                      <button
                        class="btn btn-primary"
                        @click="deleteItem(storeRecord)"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
export default {
  name: "courses",

  data() {
    return {
      items: [],
      searchName: "",
      searchAmount: "",
      deleteModal: false,
      storeRecord: {},
      selectedType: "all",
      filterObject: {
        status: null,
        name: "",
      },
      mainProps: { blank: false, blankColor: "#777", width: 80, height: 80 },
      mainProps1: { blank: false, blankColor: "#777", width: 45, height: 45 },
      editUser: null,
      imagesPath: null,
      editModal: false,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      createModal: false,
      viewModal: false,
      pagination: {},
      loading: false,
      visible: false,
      user: {
        first_name: null,
        last_name: null,
        email: null,
        mobile: null,
        nationality: null,
        image: null,
        job_title: null,
        activeStatus: "active",
      },
      coursesData: [
        {
          imagesPath: null,
          _id: 1,
          nameEnglish: "reuiy",
          nameArabic: "nameArabic",
          createdAt: "09-09-2021",
          activeStatus: true,
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
          scopedSlots: { customRender: "image" },
        },
        {
          title: "Registration Date",
          dataIndex: "created_at",
          scopedSlots: { customRender: "date" },
        },
        {
          title: "Name English",
          dataIndex: "nameEnglish",
        },
        {
          title: "Name Arabic",
          dataIndex: "nameArabic",
        },
        {
          title: "Price",
          dataIndex: "price",
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
    this.getAllMyCourses();
  },
  computed: {
    rows() {
      return this.items.length;
    },

    FilterCourse: function () {
      return this.items.filter((item) => {
        let filtered = true;
        if (this.selectedType == 1) {
          filtered = item.activeStatus == true;
        }
        if (this.selectedType == 0) {
          filtered = item.activeStatus == false;
        }
        if (this.selectedType == "") {
          filtered = item.activeStatus == true;
        }

        var name = item.nameArabic + " " + item.nameEnglish;
       return (
          (name || "")
            .toLowerCase()
            .indexOf((this.searchName || "").toLowerCase()) > -1 &&
            (item.price || "").toString()
            .indexOf(this.searchAmount || "").toString() > -1
             && filtered
        );
      });
    },
  },

  methods: {
    csvExport() {
      let arrData = [];
      arrData.push(...this.coursesData);
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
      link.setAttribute("download", "Courses.csv");
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
      doc.text("Courses List", 40, 50);
      doc.autoTable({
        margin: { top: 70 },
        headStyles: { cellPadding: 9, fillColor: [236, 142, 43] },
        bodyStyles: { cellPadding: 6 },
        body: vm.coursesData,
        columns: columns,
      });
      doc.save("Courses.pdf");
    },
    getBoolVal(val) {
      if (val === 1) {
        return true;
      } else {
        return false;
      }
    },
    filterCourseList() {
      axios
        .get("admin/searchCourse", this.filterObject)
        .then((response) => {
          if (response.data.status) {
            this.coursesData = response.data.data;
            this.coursesData.reverse();
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log("admin/searchCourse API failed");
          this.loading = false;
        });
    },
    getAllMyCourses() {
      this.loading = true;
      axios
        .get("admin/getCourses")
        .then((response) => {
          console.log(response.data)
          response.data.reverse()
          this.items = response.data;
          // this.coursesData.reverse();
          this.loading = false;
        })
        .catch((e) => {
          console.log("admin/getCourses API failed", e);
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
        this.imagesPath = URL.createObjectURL(file);
      }
    },
    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
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

    deleteItem(record) {
      axios
        .delete("admin/deleteCourse", {
          data: { courseId: record._id },
        })
        .then((response) => {
          this.deleteModal = false;
          if (response.data.status) {
            this.openNotificationWithIcon(
              "success",
              "Course deleted successfully"
            );
            this.getAllMyCourses();
          } else {
            this.openNotificationWithIcon("error", response.data.code);
          }
        })
        .catch((e) => {
          console.log("API failed");
          this.openNotificationWithIcon("error", "Course deleting failed");
          console.log(e);
        });
    },
    onChangeStatus(item) {
      axios
        .patch("admin/acivateCourse", {
          courseId: item._id,
        })
        .then((response) => {
          console.log(response.data)
          if(response.data.courseActiveStatus == true)
          this.openNotificationWithIcon(
            "success",
            "Course Status Active",
            "bottomRight"
          );
          else if(response.data.courseActiveStatus == false)
          this.openNotificationWithIcon(
            "success",
            "Course Status Inactive",
            "bottomRight"
          );
          this.getAllMyCourses();
        })
        .catch((e) => {
          console.log("admin/acivateCourse API failed", e);
          this.openNotificationWithIcon(
            "error",
            "Internal server error",
            "bottomRight"
          );
        });
      // let index = this.coursesData.indexOf(record);
      // if (index !== -1) {
      //   let status = this.coursesData[index].course_category.status;
      //   if (status == 1) {
      //     this.coursesData[index].course_category.status = 0;
      //   } else {
      //     this.coursesData[index].course_category.status = 1;
      //   }
      // }
    },
  },
};
</script>
<style scoped>
.table {
  width: 1700px !important;
}
</style>