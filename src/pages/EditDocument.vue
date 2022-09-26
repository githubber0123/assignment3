<template>
  <div class="create-user">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Update Document</strong></h5>
                <span class="back" @click="move('/documents')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Documents</strong></span
                >
                <i class="fa fa-chevron-right"></i
                ><strong>Update Document</strong>
              </div>
            </div>
            <div class="row mt-5 mx-md-3">
              <div class="col-12">
                <form @submit.prevent>
                  <div class="row">
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="first_name"><strong>Title*</strong></label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="document.title"
                          placeholder="Document Title"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <label for="upload"
                        ><strong>Upload Document</strong></label
                      >

                      <div class="d-flex">
                        <input
                          type="file"
                          class="btn btn-primary mr-4"
                          accept="application/pdf,image/jpeg"
                          @change="
                            ($event) => {
                              document.documentFilePath =
                                $event.target.files[0];
                            }
                          "
                        />
                        <span v-if="document.documentFilePath.name">
                          {{ document.documentFilePath.name }}
                        </span>
                        <img
                          v-else
                          width="30px"
                          :src="APIServerImage + document.documentFilePath"
                          :alt="document.documentFilePath"
                        />
                      </div>
                    </div>
                    <div class="col-12 mt-3 text-right">
                      <button class="btn btn-primary" @click="updateDocument()">
                        Update Document
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
import axios from "axios";
import countries from "../assets/countries.json";
export default {
  name: "EditUser",
  data() {
    return {
      countries: countries,
      showNewPassword: false,
      showConfirmPassword: false,
      showCurrentPassword: false,
      image: null,
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      document: {},
      title: null,
      documentFilePath: null,
      documentId: null,
    };
  },
  created() {
    this.getUserDetails(this.$route.params.id);
  },
  methods: {
    getUserDetails(id) {
      axios
        .get("admin/getDocument?id=" + id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log("ll");
          console.log(response.data);
          if (response.data != null) {
            this.document = response.data;

            // console.log("user updated");
          }
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
        });
    },
    updateDocument() {
      const data = new FormData();
      data.append("documentId", this.document._id);
      data.append("title", this.document.title);
      data.append("documentFile", this.document.documentFilePath);
      axios
        .patch("admin/updateDocument", data, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.openNotificationWithIcon(
            "success",
            response.data.data,
            "bottomRight"
          );
          this.$router.push({ path: "/documents" });
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
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    onAvatarSelected(event) {
      let file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
      }
    },
  },
};
</script>

<style scoped>
</style>