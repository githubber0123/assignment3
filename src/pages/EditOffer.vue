<template>
  <div class="edit-offer">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Update Offer</strong></h5>
                <span class="back" @click="move('/special-offers')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Special Offers</strong></span
                >
                <i class="fa fa-chevron-right"></i><strong>Update Offer</strong>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row mx-md-3">
                      <div class="col-12 mt-3 col-md-4">
                        <label for="images">
                          <strong>Upload Image</strong>
                        </label>
                        <b-form-file
                          v-model="specialOffer.offerImage"
                          class="btn"
                          placeholder="Choose a file or drop it here..."
                          drop-placeholder="Drop file here..."
                          required
                        ></b-form-file>
                      </div>
                      <div class="col-12 mt-3 col-md-4">
                        <label for="images">
                          <strong>Exisitng Image</strong>
                        </label>
                        <br />
                        <b-img v-if="!specialOffer.offerImage"
                          :src="APIServerImage + specialOffer.imagePath"
                          height="50"
                          width="50"
                        ></b-img>
                        <b-img v-else
                          :src="specialOffer.offerImage"
                          height="50"
                          width="50"
                        ></b-img>
                      </div>
                    </div>

                    <div class="row mx-md-3">
                      <div class="col-12 mt-3">
                        <form @submit.prevent>
                          <div class="row">
                            <div class="col-6 col-md-4">
                              <div class="form-group">
                                <label><strong>Course*</strong></label>
                                <select
                                  v-model="specialOffer.course"
                                  class="form-control"
                                  required
                                  @change="setBeforePrice()"
                                >
                                  <option
                                    v-for="course in coursesData"
                                    :value="course._id"
                                    :key="course._id"
                                  >
                                    {{ course.nameEnglish }}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="col-6 col-md-4">
                              <div class="form-group">
                                <label><strong>Price Before*</strong></label>
                                <input
                                  type="number"
                                  class="form-control"
                                  min="0"
                                  v-model="specialOffer.priceBefore"
                                  placeholder="Enter Price Before"
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-6 col-md-4">
                              <div class="form-group">
                                <label><strong>Price After*</strong></label>
                                <input
                                  type="number"
                                  class="form-control"
                                  min="0"
                                  placeholder="Price After Discount"
                                  v-model="specialOffer.priceAfter"
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-3 col-md-4">
                              <div class="form-group">
                                <label><strong>Discount*</strong></label>
                                <b-input-group append="%">
                                  <b-form-input
                                    placeholder="Enter Discount"
                                    type="number"
                                    min="0"
                                    v-model="specialOffer.discount"
                                    @keyup="calculateDiscount()"
                                    required
                                  ></b-form-input>
                                </b-input-group>
                              </div>
                            </div>
                            <div class="col-3 col-md-4">
                              <div class="form-group">
                                <label><strong>Promotion Code*</strong></label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="pro8020"
                                  v-model="specialOffer.promoCode"
                                />
                              </div>
                            </div>
                            <!-- <div class="col-6 col-md-4">
                      <div class="form-group">
                        <label><strong>Promotion Date*</strong></label>
                        <a-range-picker
                          v-model="dateRange"
                          @change="setDates"
                          class="date-input"
                          size="default"
                          typ='date'
                        />
                      </div>
                    </div> -->
                            <div class="col-6 col-md-4">
                              <div class="form-group">
                                <label
                                  ><strong>Promotion Start Date*</strong></label
                                >
                                <input
                                  class="form-control"
                                  v-model="specialOffer.startDate"
                                  size="default"
                                  type="date"
                                />
                              </div>
                            </div>
                            <div class="col-6 col-md-4">
                              <div class="form-group">
                                <label
                                  ><strong>Promotion End Date*</strong></label
                                >
                                <input
                                  class="form-control"
                                  v-model="specialOffer.endDate"
                                  size="default"
                                  type="date"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12 col-md-6 mt-3">
                              <div class="content-area">
                                <h5 class="text-center">
                                  <strong>English</strong>
                                </h5>
                                <div class="form-group">
                                  <label for="title"
                                    ><strong>Title*</strong></label
                                  >
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter English Title"
                                    v-model="specialOffer.nameEnglish"
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="title"
                                    ><strong>Description*</strong></label
                                  >
                                  <textarea
                                    style="
                                      width: 100%;
                                      height: 100px;
                                      padding: 5px;
                                    "
                                    v-model="specialOffer.descriptionEnglish"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div class="col-12 col-md-6 mt-3">
                              <div class="content-area">
                                <h5 class="text-center">
                                  <strong>Arabic</strong>
                                </h5>
                                <div class="form-group">
                                  <label for="title"
                                    ><strong>Title*</strong></label
                                  >
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter Arabic Title"
                                    v-model="specialOffer.nameArabic"
                                  />
                                </div>
                                <div class="form-group">
                                  <label for="title"
                                    ><strong>Description*</strong></label
                                  >
                                  <textarea
                                    style="
                                      width: 100%;
                                      height: 100px;
                                      padding: 5px;
                                    "
                                    v-model="specialOffer.descriptionArabic"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div class="col-12 mt-3 text-right">
                              <button
                                @click="editOffer()"
                                class="btn btn-primary"
                              >
                                Update Offer
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import moment from "moment";
export default {
  name: "CreateOffer",
  components: {
    VueEditor,
  },
  data() {
    return {
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      offerImage: null,
      coursesData: [],
      dateRange: [],
      specialOffer: {
        discount: null,
        descriptionArabic: null,
        descriptionEnglish: null,
        nameEnglish: null,
        nameArabic: null,
        before_price: null,
        after_price: null,
        startDate: null,
        endDate: null,
        courseId: null,
        offerImage: null,
        promoCode: null,
      },
    };
  },
  mounted() {
    this.getCoursesDropdownData();
    this.getOffer(this.$route.params.id);
  },
  methods: {
    calculateDiscount() {
      this.specialOffer.after_price = (
        Number(this.specialOffer.before_price) -
        (Number(this.specialOffer.before_price) *
          Number(this.specialOffer.discount)) /
          100
      ).toFixed(0);
    },
    setBeforePrice() {
      // this.specialOffer.before_price = this.coursesData.filter(
      //   (val) => val.id === this.specialOffer.courseId
      // )[0].price;
    },
    setDates() {
      console.log("CreateOffer", this.dateRange);
      let date = new Date(this.dateRange[0]._d);
      let date2 = new Date(this.dateRange[1]._d);
      this.specialOffer.startDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.specialOffer.endDate =
        date.getFullYear() +
        "-" +
        (date2.getMonth() + 1) +
        "-" +
        date2.getDate();
    },
    move(to) {
   this.$router.push({ path: to });
    },
    getOffer(id) {
      axios
        .get("admin/getOffer?id=" + id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.specialOffer = response.data;
          this.specialOffer.startDate = moment(this.specialOffer.startDate).format('YYYY-MM-DD');
          this.specialOffer.endDate = moment(this.specialOffer.endDate).format('YYYY-MM-DD');
        })
        .catch((e) => {
          console.log("admin/getOffer API failed", e);
        });
    },
    getCoursesDropdownData() {
      this.loading = true;
      axios
        .get("admin/getCourses", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.coursesData = response.data;
          this.loading = false;
        })
        .catch((e) => {
          console.log("admin/getCourses API failed", e);
          this.loading = false;
        });
    },

    editOffer() {
      let udpateOffer = new FormData();

      udpateOffer.append("courseId", this.specialOffer.course);
      udpateOffer.append("discount", this.specialOffer.discount);
      udpateOffer.append("startDate", this.specialOffer.startDate);
      udpateOffer.append("endDate", this.specialOffer.endDate);
      udpateOffer.append("offerImage", this.specialOffer.offerImage ? this.specialOffer.offerImage : this.specialOffer.imagePath);
      udpateOffer.append(
        "descriptionArabic",
        this.specialOffer.descriptionArabic
      );
      udpateOffer.append(
        "descriptionEnglish",
        this.specialOffer.descriptionEnglish
      );
      udpateOffer.append("nameArabic", this.specialOffer.nameArabic);
      udpateOffer.append("nameEnglish", this.specialOffer.nameEnglish);
      udpateOffer.append("promoCode", this.specialOffer.promoCode);
      udpateOffer.append("priceBefore", this.specialOffer.priceBefore);
      udpateOffer.append("priceAfter", this.specialOffer.priceAfter);
      udpateOffer.append("offerId", this.$route.params.id);
  
  axios
        .patch("admin/updateOffer", udpateOffer, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data.status) {
            this.$router.push({ path: "/special-offers" });
            this.openNotificationWithIcon(
              "success",
              "Record Update successfully",
              "bottomRight"
            );
          } else {
            console.log("admin/updateOffer API failed");
            this.openNotificationWithIcon(
              "warning",
              "Internal error",
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          console.log("admin/updateOffer API failed", e);
          this.openNotificationWithIcon(
            "error",
            "Internal error",
            "bottomRight"
          );
        });
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
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
.add-label {
  visibility: hidden;
}

a {
  color: #fff !important;
}
</style>