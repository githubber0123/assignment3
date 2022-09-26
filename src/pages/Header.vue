<template>
  <div class="contact">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent>
              <div class="row">
                <div class="col-12">
                  <h5><strong>Header Details</strong></h5>
                  <hr />
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group mt-4">
                    <label><strong>Upload Logo</strong></label>
                    <br />
                    <div class="d-flex">
                      <input
                        type="file"
                        accept=".pdf, .jpg, .jpeg"
                        class="btn btn-primary btn-block btn-sm col-md-6 mr-4"
                        @change="chooseImage($event, 'logo')"
                      />
                      <img
                        width="30px"
                        :src="
                          logoFilePath
                            ? logoFilePath
                            : APIServerImage + newHeader.logoFilePath
                        "
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-group mt-4">
                    <label><strong>Upload Favicon</strong></label> <br />
                    <div class="d-flex">
                      <input
                        type="file"
                        accept=".pdf, .jpg, .jpeg"
                        class="btn btn-primary btn-block btn-sm col-md-6 mr-4"
                        @change="chooseImage($event, 'favIcon')"
                      />
                      <img
                        width="30px"
                        :src="
                          favIconFilePath
                            ? favIconFilePath
                            : APIServerImage + newHeader.favIconFilePath
                        "
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>English</strong></h5>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Heading*</strong></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter English Heading"
                        v-model="newHeader.nameEnglish"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title">
                        <strong>English Content*</strong>
                      </label>
                      <textarea
                        style="width: 100%; height: 100px; padding: 5px"
                        v-model="newHeader.contentEnglish"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>Arabic</strong></h5>
                    <div class="form-group">
                      <label for="title">
                        <strong>Arabic Heading*</strong>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Arabic Heading"
                        v-model="newHeader.nameArabic"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Content*</strong></label
                      >
                      <textarea
                        style="width: 100%; height: 100px; padding: 5px"
                        v-model="newHeader.contentArabic"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Email*</strong></label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      class="form-control"
                      v-model="newHeader.email"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Mobile Number*</strong></label>
                    <input
                      type="tel"
                      placeholder="Enter Mobile Number"
                      class="form-control"
                      v-model="newHeader.mobileNo"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Twitter URL*</strong></label>
                    <input
                      type="url"
                      placeholder="Enter Twitter URL"
                      class="form-control"
                      v-model="newHeader.twitterUrl"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Telephone Number*</strong></label>
                    <input
                      type="tel"
                      placeholder="Enter Telephone Number"
                      class="form-control"
                      v-model="newHeader.telephoneNo"
                      required
                    />
                  </div>
                </div>

                <div class="col-12 text-right mt-3">
                  <button @click="saveHeaderDetails()" class="btn btn-primary">
                    Save Information
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mixin from "../containers/mixin";

export default {
  name: "users",
  data() {
    return {
      loading: false,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      newHeader: {},
      logoFilePath: null,
      favIconFilePath: null,
    };
  },
  created() {
    this.getHeaderData();
  },
  methods: {
    getHeaderData() {
      axios
        .get("admin/getHeader", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          if (response.data != "") {
            this.newHeader = response.data;
          }
        });
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
    move(to) {
      this.$router.push({ path: to });
    },
    chooseImage(event, type) {
      if (type == "logo") {
        this.logoFilePath = window.URL.createObjectURL(event.target.files[0]);
        this.newHeader.logoFilePath = event.target.files[0];
      } else {
        this.favIconFilePath = window.URL.createObjectURL(
          event.target.files[0]
        );
        this.newHeader.favIconFilePath = event.target.files[0];
      }
    },
    saveHeaderDetails() {
      let updateHeader = new FormData();
      updateHeader.append("headerId", this.newHeader._id);
      updateHeader.append("logoFilePath", this.newHeader.logoFilePath);
      updateHeader.append("favIconFilePath", this.newHeader.favIconFilePath);
      updateHeader.append("email", this.newHeader.email);
      updateHeader.append("nameEnglish", this.newHeader.nameEnglish);
      updateHeader.append("nameArabic", this.newHeader.nameArabic);
      updateHeader.append("contentEnglish", this.newHeader.contentEnglish);
      updateHeader.append("contentArabic", this.newHeader.contentArabic);
      updateHeader.append("mobileNo", this.newHeader.mobileNo);
      updateHeader.append("twitterUrl", this.newHeader.twitterUrl);
      updateHeader.append("telephoneNo", this.newHeader.telephoneNo);

      axios
        .patch("admin/updateHeader", updateHeader, {
          headers: {
            Authorization: this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status == true) {
            this.openNotificationWithIcon(
              "success",
              "Header updated successfully",
              "bottomRight"
            );
            this.getHeaderData();
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.message,
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.openNotificationWithIcon(
            "error",
            response.data.message,
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