<template>
  <div class="edit-course">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Update Course</strong></h5>
                <span class="back" @click="move('/courses')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Courses</strong></span
                >
                <i class="fa fa-chevron-right"></i
                ><strong>Update Course</strong>
              </div>
            </div>
            <div class="row mx-md-3">
              <div class="col-12 mt-3 col-md-6">
                <label for="images"><strong>Upload Images</strong></label>
                <br />
                <input
                  type="file"
                  class="btn btn-primary btn-sm"
                  accept=".pdf, .jpg, .jpeg"
                  @change="changeToLocalImages($event.target.files)"
                  multiple
                />
                <span
                  v-for="(item, ind) in imagesPath
                    ? imagesPath
                    : course.imagesPath"
                  :key="ind"
                >
                  <img
                    class="ml-3 mr-3"
                    width="30px"
                    :src="imagesPath ? item : APIServerImage + item"
                    alt=""
                  />
                </span>
              </div>
              <div class="col-12 mt-3 col-md-6">
                <label for="images"><strong>Upload Company Logo</strong></label>
                <br />
                <input
                  type="file"
                  class="btn btn-primary btn-sm"
                  accept=".pdf, .jpg, .jpeg"
                  @change="changeToLocalImage($event.target.files[0])"
                />
                <img
                  class="ml-3 mr-3"
                  width="30px"
                  :src="
                    companyLogoImagePath
                      ? companyLogoImagePath
                      : APIServerImage + course.companyLogoImagePath
                  "
                  alt=""
                />
              </div>
            </div>
            <div class="row mx-md-3">
              <div class="col-12 mt-3">
                <form @submit.prevent>
                  <div class="row">
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Select Category*</strong></label>
                        <select
                          v-model="course.category._id"
                          class="form-control"
                          required
                        >
                          <option
                            v-for="(item, index) in categories"
                            :value="item._id"
                            :key="index"
                          >
                            {{ item.nameEnglish }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Price*</strong></label>
                        <input
                          type="number"
                          class="form-control"
                          min="0"
                          placeholder="Enter Price"
                          required
                          v-model="course.price"
                        />
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Organized By*</strong></label>
                        <select
                           v-model="course.trainer._id"
                          class="form-control"
                          required
                        >
                          <option
                            v-for="(item, index) in trainers"
                            :value="item._id"
                            :key="index"
                          >
                            {{ item.firstName }} {{ item.lastName }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <p><strong>Status</strong></p>
                      <a-switch v-model="course.activeStatus" />
                    </div>
                  </div>
                  <div
                    class="row"
                    v-for="(item, index) in addresses"
                    :key="index"
                  >
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Country*</strong></label>
                        <country-select class="form-control" placeholder="Enter Country" v-model="item.country" :country="country" topCountry="PK" required />
                          <!-- <option :value="null">Select Country</option>
                          <option
                            :value="item.name"
                            v-for="(item, index) in countries"
                            :key="index"
                          >
                            {{ item.name }}
                          </option> -->
                        <!-- </select> -->
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Address*</strong></label>
                        <input
                          type="text"
                          v-model="item.address"
                          class="form-control"
                          min="0"
                          placeholder="Enter Address"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Region*</strong></label>
                        
                        <region-select class="form-control" placeholder="Enter State" v-model="item.state" :country="item.country" :region="region" required />
                        <!-- <input
                          type="text"
                          v-model="item.state"
                          class="form-control"
                          min="0"
                          placeholder="Enter State"
                          required
                        /> -->
                      </div>
                    </div>
                    <div class="col-6 col-md-3">
                      <div class="form-group">
                        <label><strong>Area*</strong></label
                        ><i
                          class="fa fa-trash pull-right"
                          @click="removeAddress(index)"
                        ></i>
                        <input
                          type="text"
                          v-model="item.area"
                          class="form-control"
                          min="0"
                          placeholder="Enter Area"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <a class="btn btn-primary text-light" @click="addAddress">
                        Add Location
                      </a>
                    </div>
                  </div>
                
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <label><strong>Summary*</strong></label>
                        <input
                          class="form-control"
                          placeholder="Enter Summary"
                          required
                          v-model="course.summary"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label><strong>Institute*</strong></label>
                        <input
                          class="form-control"
                          placeholder="Enter institute"
                          required
                          v-model="course.institute"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <label><strong>State*</strong></label>
                        <input
                          class="form-control"
                          placeholder="Enter State"
                          required
                          v-model="course.state"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-group">
                        <label><strong>Country*</strong></label>
                        <input
                          class="form-control"
                          placeholder="Enter Country"
                          required
                          v-model="course.country"
                        />
                      </div>
                    </div>
                  </div> -->
                  <div class="row">
                    <div class="col-12 col-md-6 mt-3">
                      <div class="content-area">
                        <h5 class="text-center"><strong>English</strong></h5>
                        <div class="form-group">
                          <label for="title"><strong>Name*</strong></label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter English Name"
                            v-model="course.nameEnglish"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for=""
                            ><strong>Course Information*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.courseInformationEnglish"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for=""
                            ><strong>Documents Required*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.documentsRequiredEnglish"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Registration Proceedure*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.RegistrationProcedureEnglish"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Lecture Details*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.lectureDetailsEnglish"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Fees Details*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.feesDetailsEnglish"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Test Details*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.testDetailsEnglish"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label
                            ><strong
                              >Refund Policy For Online Payments</strong
                            ></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="
                              course.refundPolicyForOnlinePaymentsEnglish
                            "
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 mt-3">
                      <div class="content-area">
                        <h5 class="text-center"><strong>Arabic</strong></h5>
                        <div class="form-group">
                          <label for="title"><strong>Name*</strong></label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter Arabic Name"
                            v-model="course.nameArabic"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Course Information*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.courseInformationArabic"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Documents Required*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.documentsRequiredArabic"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Registration Proceedure*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.RegistrationProcedureArabic"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Lecture Details*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.lectureDetailsArabic"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Fees Details*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.feesDetailsArabic"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label for="title"
                            ><strong>Test Details*</strong></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.testDetailsArabic"
                          ></textarea>
                        </div>
                        <div class="form-group">
                          <label
                            ><strong
                              >Refund Policy For Online Payments</strong
                            ></label
                          >
                          <textarea
                            style="width: 100%; height: 100px; padding: 5px"
                            v-model="course.refundPolicyForOnlinePaymentsArabic"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mt-3 text-right">
                      <button @click="updateCourse()" class="btn btn-primary">
                        Update Course
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import countries from "../assets/countries.json";
import Vue from 'vue'
import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)
export default {
  name: "EditCourse",
  components: {
    VueEditor,
  },
  data() {
    return {
      categories: [],
      companyLogoImagePath: null,
      imagesPath: null,
      country: '',
      region: '',
      countries: countries,
      trainers: [],
      image: null,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      course: {
        summary: null,
        institute: null,
        companyLogoImage: null,
        nameArabic: null,
        category: null,
        nameEnglish: null,
        trainer: null,
        price: null,
        courseLearning: null,
        courseImages: null,
        locations: [],
        courseInformationEnglish: null,
        images: [],
        courseInformationArabic: null,
        documentsRequiredEnglish: null,
        documentsRequiredArabic: null,
        RegistrationProcedureEnglish: null,
        RegistrationProcedureArabic: null,
        activeStatus: false,
        lectureDetailsEnglish: null,
        lectureDetailsArabic: null,
        feesDetailsEnglish: null,
        feesDetailsArabic: null,
        testDetailsEnglish: null,
        testDetailsArabic: null,
        refundPolicyForOnlinePaymentsEnglish: null,
        refundPolicyForOnlinePaymentsArabic: null,
      },

      addresses: [],
    };
  },
  created() {
    this.getCourseDetails(this.$route.params.id);
    this.getAllTrainers();
    this.getAllCategories();
  },
  methods: {
    getAllTrainers() {
      this.loading = true;
      axios
        .get("admin/getTrainers", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.trainers = response.data.map((el) => {
            return el.user;
          });
        })
        .catch((e) => {
          console.log("admin/getTrainers API failed", e);
        });
      this.loading = false;
    },
    getAllCategories() {
      axios
        .get("admin/getCategories", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => {
          console.log("admin/getCategories API failed");
          this.loading = false;
          console.log(e);
        });
    },
    changeToLocalImages(images) {
      this.course.courseImages = images;
      console.log(this.course.courseImages);
      let imgArr = new Array();
      images.forEach((el) => {
        let singleImg = window.URL.createObjectURL(el);
        imgArr.push(singleImg);
      });
      this.imagesPath = imgArr;
      this.course.imagesPath = images;
      // console.log(this.imagesPath);
      console.log(this.course.courseImages);
    },
    changeToLocalImage(image) {
      this.companyLogoImagePath = window.URL.createObjectURL(image);
      // 
      this.course.companyLogoImagePath = image;
      console.log(this.course.companyLogoImagePath);
    },
    move(to) {
      this.$router.push({ path: to });
    },
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    getCourseDetails(id) {
      // this.addresses = [];
      axios
        .get("admin/getCourse?id=" + id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.course = response.data;
          // console.log(response.data)
          // console.log(this.course)
          this.addresses = JSON.parse(this.course.locations)
        })
        .catch((e) => {
          console.log("admin/getCourse API failed");
          console.log(e);
        });
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
    addAddress() {
      const add = {
        address: null,
        country: null,
        state: null,
        area: null,
      };
      this.addresses.push(add);
    },
    removeAddress(index) {
      this.addresses.splice(index, 1);
    },
    updateCourse() {
      let newCourse = new FormData();

      newCourse.append("locations", JSON.stringify(this.addresses));
      console.log(this.course.imagesPath);
      // newCourse.append("courseImages", this.course.imagesPath);
      this.course.imagesPath.forEach((file) => {
        
        newCourse.append("courseImages", file);
      });
      // console.log(newCourse);
      newCourse.append("price", this.course.price);
      newCourse.append("summary", this.course.summary);
      newCourse.append("institute", this.course.institute);
      // newCourse.append("state", this.course.state);
      // newCourse.append("country", this.course.country);

      newCourse.append("nameEnglish", this.course.nameEnglish);
      newCourse.append(
        "courseInformationEnglish",
        this.course.courseInformationEnglish
      );
      newCourse.append(
        "documentsRequiredEnglish",
        this.course.documentsRequiredEnglish
      );
      newCourse.append(
        "RegistrationProcedureEnglish",
        this.course.RegistrationProcedureEnglish
      );
      newCourse.append(
        "lectureDetailsEnglish",
        this.course.lectureDetailsEnglish
      );
      newCourse.append("feesDetailsEnglish", this.course.feesDetailsEnglish);
      newCourse.append("testDetailsEnglish", this.course.testDetailsEnglish);
      newCourse.append(
        "refundPolicyForOnlinePaymentsEnglish",
        this.course.refundPolicyForOnlinePaymentsEnglish
      );
      newCourse.append("nameArabic", this.course.nameArabic);
      newCourse.append(
        "courseInformationArabic",
        this.course.courseInformationArabic
      );
      newCourse.append(
        "documentsRequiredArabic",
        this.course.documentsRequiredArabic
      );
      newCourse.append(
        "RegistrationProcedureArabic",
        this.course.RegistrationProcedureArabic
      );
      newCourse.append(
        "lectureDetailsArabic",
        this.course.lectureDetailsArabic
      );
      newCourse.append("feesDetailsArabic", this.course.feesDetailsArabic);
      newCourse.append("testDetailsArabic", this.course.testDetailsArabic);
      newCourse.append(
        "refundPolicyForOnlinePaymentsArabic",
        this.course.refundPolicyForOnlinePaymentsArabic
      );
      console.log(this.course.companyLogoImagePath)
      newCourse.append("companyLogoImage", this.course.companyLogoImagePath);
      newCourse.append("categoryId", this.course.category._id);
      newCourse.append("organizedTrainerUserId", this.course.trainer._id);

      // newCourse.append("courseLearning", this.course.courseLearning);

      newCourse.append("status", this.course.activeStatus ? true : false);
      newCourse.append("courseId", this.course._id);

      console.log("new course", ...newCourse);
      axios
        .patch("admin/updateCourse", newCourse, {
          headers: { Authorization: this.$store.state.token,
            "Content-Type": "multipart/form-data" },
        })
      .then((response) => {
        if (response.data.status) {
          console.log(response.data)
          this.openNotificationWithIcon(
            "success",
            "Course Updated successfully",
            "bottomRight"
          );
          this.move("/courses");
        } else {
          this.openNotificationWithIcon(
            "warning",
            response.data.message,
            "bottomRight"
          );
        }
        console.log(response.data);
      })
      .catch((e) => {
        console.log("admin/upateCourse API failed");
        console.log(e);
        this.openNotificationWithIcon(
          "error",
          "Must upload two course images",
          "bottomRight"
        );
      });
    },
  },
};
</script>

<style scoped>
.content-area {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 20px 30px;
}
</style>