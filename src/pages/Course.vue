<template>
  <div class="course">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Course Details</strong></h5>
                <span class="back" @click="move('/courses')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Courses</strong></span
                >
                <i class="fa fa-chevron-right"></i
                ><strong>Course Details</strong>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-12 mb-3">
                <label><strong class="text-main">Course Images</strong></label>
                <div>
                  <img
                    :src="APIServerImage + course.imagesPath[0]"
                    width="100"
                  />
                </div>
              </div>

              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label><strong class="text-main">Price</strong></label>
                <p class="pr-4">$ {{ course.price }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label><strong class="text-main">Status</strong></label>
                <p class="pr-4" v-if="course.activeStatus == 1">Active</p>
                <p class="pr-4" v-if="course.activeStatus == 0">InActive</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label><strong class="text-main">English Name</strong></label>
                <p class="pr-4">{{ course.nameEnglish }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label><strong class="text-main">Arabic Name</strong></label>
                <p class="pr-4">{{ course.nameArabic }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label
                  ><strong class="text-main">English Description</strong></label
                >
                <p class="pr-4">{{ course.RegistrationProcedureEnglish }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label
                  ><strong class="text-main">Arabic Description</strong></label
                >
                <p class="pr-4">{{ course.RegistrationProcedureArabic }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">English Course Information</strong>
                </label>
                <p class="pr-4">{{ course.courseInformationEnglish }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">Arabic Course Information</strong>
                </label>
                <p class="pr-4">{{ course.courseInformationArabic }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">English Documents Required</strong>
                </label>
                <p class="pr-4">{{ course.documentsRequiredEnglish }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">Arabic Documents Required</strong>
                </label>
                <p class="pr-4">{{ course.documentsRequiredArabic }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main"
                    >English Registration Proceedure</strong
                  >
                </label>
                <p class="pr-4">{{ course.RegistrationProcedureEnglish }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main"
                    >Arabic Registration Proceedure</strong
                  >
                </label>
                <p class="pr-4">{{ course.RegistrationProcedureArabic }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">Enlgish Lecture Details</strong>
                </label>
                <p class="pr-4">{{ course.lectureDetailsEnglish }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">Arabic Lecture Details</strong>
                </label>
                <p class="pr-4">{{ course.lectureDetailsArabic }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">English Fees Details</strong>
                </label>
                <p class="pr-4">{{ course.feesDetailsEnglish }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">Arabic Fees Details</strong>
                </label>
                <p class="pr-4">{{ course.feesDetailsArabic }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">English Test Details</strong>
                </label>
                <p class="pr-4">{{ course.testDetailsEnglish }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">Arabic Test Details</strong>
                </label>
                <p class="pr-4">{{ course.testDetailsArabic }}</p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">English Refund Policy</strong>
                </label>
                <p class="pr-4">
                  {{ course.refundPolicyForOnlinePaymentsEnglish }}
                </p>
              </div>
              <div class="col-6 col-md-12 col-lg-6 col-xl-6">
                <label>
                  <strong class="text-main">Arabic Refund Policy</strong>
                </label>
                <p class="pr-4">
                  {{ course.refundPolicyForOnlinePaymentsArabic }}
                </p>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-12 pb-4">
                <label>
                  <strong class="text-main">
                    Course Reviews ({{ total }})
                    </strong>
                </label>
              </div>
              <div class="col-12">
                <div
                  class="row"
                  v-for="review in course.reviews"
                  :key="review.id"
                >
                  <div class="col-12">
                    <div class="d-flex">
                      <b-img
                        v-bind="mainProps1"
                        src="https://ptetutorials.com/images/user-profile.png"
                      ></b-img>
                      <p class="pl-3 pt-2">
                        <strong>{{ review.user_id }}</strong>
                        <i class="fa fa-star star-icon"></i> ({{
                          review.rating
                        }})
                      </p>
                    </div>
                    <div class="review pt-2">
                      <p>{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Course",
  data() {
    return {
      totalReviews: 0,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      total: 0,
      mainProps1: { blank: false, blankColor: "#777", width: 40, height: 40 },
      course: {},
    };
  },
  created() {
    // console.log(this.$route.params.id);
    this.getCourseDetails(this.$route.params.id);
  },
  methods: {
    getCourseDetails(id) {
      axios
        .get("admin/getCourse?id=" + id, {
          data: { id: id },
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.course = response.data;
          this.course.reviews.forEach((item) => {
            this.totalReviews = this.totalReviews + Number(item.rating);
          });
          if (this.course.reviews.length > 0) {
            this.total = this.totalReviews / this.course.reviews.length;
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
        });
    },
    move(to) {
      this.$router.push({ path: to });
    },
  },
};
</script>

<style scoped>
.star-icon {
  margin-top: 4px !important;
  color: gold;
}
.image {
  /* background: url("../assets/image.jpg"); */
  width: 150px;
  height: 120px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 5px;
}
</style>