<template>
  <div class="contact">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent>
              <div class="row">
                <div class="col-12">
                  <h5><strong>Footer Details</strong></h5>
                  <hr />
                </div>
                <div class="col-12">
                  <h5><strong>About Civil Section</strong></h5>
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
                        v-model="items.headingEnglish"
                        placeholder="Enter English Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>English Content*</strong></label
                      >
                      <textarea
                        style="width: 100%; height: 100px; padding: 5px"
                        v-model="items.contentEnglish"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-12 col-lg-12 col-xl-6">
                  <div class="content-area">
                    <h5 class="text-center"><strong>Arabic</strong></h5>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Heading*</strong></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="items.headingArabic"
                        placeholder="Enter Arabic Heading"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="title"
                        ><strong>Arabic Content*</strong></label
                      >
                      <textarea
                        style="width: 100%; height: 100px; padding: 5px"
                        v-model="items.contentArabic"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Facebook URL*</strong></label>
                    <input
                      type="url"
                      v-model="items.facebookUrl"
                      placeholder="Enter Facebook URL"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Twitter URL*</strong></label>
                    <input
                      type="url"
                      v-model="items.twitterUrl"
                      placeholder="Enter Twitter URL"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>LinkedIn URL*</strong></label>
                    <input
                      type="url"
                      v-model="items.linkedinUrl"
                      placeholder="Enter LinkedIn URL"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                  <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Email*</strong></label>
                    <input
                      type="email"
                      v-model="items.email"
                      placeholder="Enter Email"
                      class="form-control"
                      required
                    />
                  </div>
                  </div>
                <div class="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
                  <div class="form-group">
                    <label><strong>Phone No*</strong></label>
                    <input
                      type="number"
                      v-model="items.phone"
                      placeholder="Enter Phone"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="col-12 text-right mt-3">
                  <button class="btn btn-primary" @click="saveInformation()">
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
export default {
  name: "users",
  created() {
    this.getFooter();
  },
  data() {
    return {
      items: [],
    };
  },

  methods: {
    getFooter() {
      axios
        .get("admin/getFooter", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
          this.openNotificationWithIcon("error", "Internal server error");
        });
    },
    saveInformation() {
      let footer = new FormData();
      footer.append("headingEnglish", this.items.headingEnglish);
      footer.append("contentEnglish", this.items.contentEnglish);
      footer.append("headingArabic", this.items.headingArabic);
      footer.append("contentArabic", this.items.contentArabic);
      footer.append("facebookUrl", this.items.facebookUrl);
      footer.append("twitterUrl", this.items.twitterUrl);
      footer.append("linkedinUrl", this.items.linkedinUrl);
      footer.append("phone", this.items.phone);
      footer.append("email", this.items.email);
      footer.append("footerId", this.items._id);

      axios
        .patch("admin/updateFooter", footer, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status == true) {
            this.openNotificationWithIcon(
              "success",
              response.data.data,
              "bottomRight"
            );
            this.getFooter();
          } else {
            this.openNotificationWithIcon(
              "warning",
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