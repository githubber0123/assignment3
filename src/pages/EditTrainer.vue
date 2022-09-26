<template>
  <div class="create-user">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Edit Trainer</strong></h5>
                <span class="back" @click="move('/trainers')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Trainers</strong></span
                >
                <i class="fa fa-chevron-right"></i><strong>Edit Trainer</strong>
              </div>
            </div>
            <div class="row mt-5 mx-md-3">
              <div class="col-12">
                <form @submit.prevent>
                  <div class="row">
                    <div class="col-6 mt-3">
                      <label for="images">
                        <strong>Upload Image</strong>
                      </label>
                      <b-form-file
                        v-model="user.trainerImage"
                        class="btn"
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                    </div>
                    <div class="col-6 mt-3">
                      <label for="images">
                        <strong>Exisitng Image</strong>
                      </label>
                      <br />
                      <b-img
                        v-if="!user.trainerImage && user.imagePath"
                        :src="APIServerImage + user.imagePath"
                        height="50"
                        width="50"
                      ></b-img>
                      <b-img
                        v-else
                        :src="user.trainerImage"
                        height="50"
                        width="50"
                      ></b-img>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="first_name"
                          ><strong>First Name</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.firstName"
                          placeholder="Enter First Name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="last_name"
                          ><strong>Last Name</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.lastName"
                          placeholder="Enter Last Name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="email"><strong>Email</strong></label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="user.email"
                          placeholder="Enter Email"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="mobile"><strong>Phone</strong></label>
                        <input
                          type="tel"
                          class="form-control"
                          v-model="user.phoneNo"
                          placeholder="Enter Phone"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"><strong>Country</strong></label>
                        <select
                          class="form-control"
                          v-model="user.nationality"
                          required
                        >
                          <option
                            :value="item.name"
                            v-for="(item, index) in countries"
                            :key="index"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"
                          ><strong>Residence</strong></label
                        >
                        <select
                          class="form-control"
                          v-model="user.residenceCountry"
                          required
                        >
                          <option
                            :value="item.name"
                            v-for="(item, index) in countries"
                            :key="index"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"><strong>Gender</strong></label>
                        <select
                          class="form-control"
                          required
                          v-model="user.gender"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 mt-3 text-right">
                      <button class="btn btn-primary" @click="updateTrainer">
                        Edit Trainer
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

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Reset Password</strong></h5>
              </div>
            </div>
            <form @submit.prevent>
              <div class="row mt-3 mx-md-3">
                <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                  <div class="form-group">
                    <label for="current-password"
                      ><strong>Current Password*</strong></label
                    >
                    <input
                      :type="showCurrentPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="Enter Current Password"
                      v-model="updatePassword.current_password"
                      required
                    />
                    <span class="visiblePass"
                      ><i
                        :class="
                          showCurrentPassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                        "
                        @click="showCurrentPassword = !showCurrentPassword"
                      ></i
                    ></span>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                  <div class="form-group">
                    <label for="new-password"
                      ><strong>New Password*</strong></label
                    >
                    <input
                      :type="showNewPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="Enter New Password"
                      v-model="updatePassword.password"
                      required
                    />
                    <span class="visiblePass"
                      ><i
                        :class="
                          showNewPassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                        "
                        @click="showNewPassword = !showNewPassword"
                      ></i
                    ></span>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                  <div class="form-group">
                    <label for="confirm-password"
                      ><strong>Confirm Password*</strong></label
                    >
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="Confirm Password"
                      v-model="updatePassword.c_password"
                      required
                    />
                    <span class="visiblePass"
                      ><i
                        :class="
                          showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                        "
                        @click="showConfirmPassword = !showConfirmPassword"
                      ></i
                    ></span>
                  </div>
                </div>
                <div class="col-12 mt-2 text-right">
                  <div class="form-group">
                    <button
                      @click="updateTrainerPassword()"
                      class="btn btn-primary"
                    >
                      Reset Password
                    </button>
                  </div>
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
import mixin from "../containers/mixin";
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
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      image: null,
      user: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        trainerImage: null,
        nationality: null,
        residence: null,
        course_offered: null,
        organization: null,
        experience: null,
        gender: null,
      },
      updatePassword: {
        password: null,
        current_password: null,
        c_password: null,
      },
    };
  },
  created() {
    this.getTrainerDetails(this.$route.params.id);
  },
  methods: {
    move(to) {
      this.$router.push({ path: to });
    },
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    getTrainerDetails(id) {
      axios
        .get("admin/getTrainer/?id=" + id, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.user = response.data.user;
          // this.user.course_offered=this.user.trainer.course_offered;
          // this.user.experience=this.user.trainer.experience;
          // this.user.organization=this.user.trainer.organization;
          // this.user.residence=this.user.trainer.residenceCountry;
        })
        .catch((e) => {
          console.log("API failed");
          console.log(e);
        });
    },
    onAvatarSelected(event) {
      let file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
      }
    },
    updateTrainer() {
      let newUser = new FormData();
      newUser.append("trainerId", this.user._id);
      newUser.append("firstName", this.user.firstName);
      newUser.append("lastName", this.user.lastName);
      newUser.append("email", this.user.email);
      newUser.append("phone", Number(this.user.phoneNo));
      newUser.append("gender", this.user.gender);
      newUser.append("nationality", this.user.nationality);
      newUser.append(
        "userImage",
        this.user.trainerImage ? this.user.trainerImage : this.user.imagePath
      );
      newUser.append("residenceCountry", this.user.residenceCountry);

      axios
        .patch("admin/updateTrainer", newUser)
        .then((response) => {
          if (response.data.status == true) {
            this.$router.push({ path: "/trainers" });
            this.openNotificationWithIcon(
              "success",
              "Trainer updated successfully",
              "bottomRight"
            );
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.message,
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          this.openNotificationWithIcon("error", e, "bottomRight");
        });
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
    updateTrainerPassword() {
      console.log('tokeeeeennnnnnnnnnhhsbdbsidu',this.$store.state.token)
      let updatedPassword = new FormData();
      updatedPassword.append("userId", this.user._id);
      updatedPassword.append(
        "currentPassword",
        this.updatePassword.current_password
      );
      updatedPassword.append("newPassword", this.updatePassword.password);
      if(this.updatePassword.current_password != null && this.updatePassword.password != null && this.updatePassword.c_password != null ){
      axios
        .patch("admin/resetTrainerPassword", updatedPassword, {
          headers: { Authorization: this.$store.state.token }
        })
        .then((response) => {
          if (response.data.status == true) {
            this.$router.push({ path: "/trainers" });
            this.openNotificationWithIcon(
              "success",
              "Trainer updated successfully",
              "bottomRight"
            );
          }else if (response.data.status == 401) {
              this.openNotificationWithIcon(
                "error",
                "Current Password is Incorrect",
                "bottomRight"
              );
          } 
          else {
            this.openNotificationWithIcon(
              "warning",
              response.data.message,
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          this.openNotificationWithIcon("error", e, "bottomRight");
        });
      }else{
        this.openNotificationWithIcon(
              "warning",
              "All Field are required",
              "bottomRight"
            );
      }
    },
  },
};
</script>

<style scoped>
</style>