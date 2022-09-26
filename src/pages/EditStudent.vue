<template>
  <div class="create-user">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Edit Student</strong></h5>
                <span class="back" @click="move('/students')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Students</strong></span
                >
                <i class="fa fa-chevron-right"></i><strong>Edit Student</strong>
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
                          v-model="user.studentImage"
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
                         <b-img v-if="!user.studentImage && user.imagePath"
                          :src="APIServerImage + user.imagePath"
                          height="50"
                          width="50"
                        ></b-img>
                        <b-img v-else
                          :src="user.studentImage"
                          height="50"
                          width="50"
                      ></b-img>   
                      </div>
                   
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="first_name"
                          ><strong>First Name*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.firstName"
                          :placeholder="this.user.firstName"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="last_name"
                          ><strong>Last Name*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.lastName"
                          :placeholder="this.user.lastName"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="email"><strong>Email*</strong></label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="user.email"
                          :placeholder="this.user.email"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="mobile"><strong>Phone*</strong></label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.phoneNo"
                          maxlength="10"
                          @keypress="phoneNo"
                          :placeholder="this.user.phoneNo"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"><strong>Country*</strong></label>
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
                        <label for="job_titlex"
                          ><strong>Residence*</strong></label
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
                        <label for="job_title"
                          ><strong>Date of Birth*</strong></label
                        >
                        <input
                          class="form-control"
                          v-model="user.dateOfBirth"
                          placeholder="YYY-MM-DD"
                          required
                        />
                        <!-- <p>{{ user.dateOfBirth }}</p> -->
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"><strong>Gender*</strong></label>
                        <select
                          class="form-control"
                          v-model="user.gender"
                          required
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 mt-3 text-right">
                      <button class="btn btn-primary" @click="updateStudent">
                        Edit Student
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
                      v-model="updatePassword.currentPassword"
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
                    <label for="confirm-password">
                      <strong>Confirm Password*</strong>
                    </label>
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
                      @click="updateStudentPassword()"
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
import countries from "../assets/countries.json";
import axios from "axios";
import Vue from "vue";
import moment from "moment";
import { cifNr } from "@coreui/icons";

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("yyy-MM-DD");
  }
});

export default {
  name: "EditUser",
  data() {
    return {
      countries: countries,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      formatDate: "",
      coursesData: [],
      showNewPassword: false,
      showConfirmPassword: false,
      showCurrentPassword: false,
      image: null,
      user: {
        firstName: null,
        lastName: null,
        email: null,
        residence: null,
        phoneNo: null,
        country: null,
        nationality: null,
        dateOfBirth: null,
        gender: null,
      },
      updatePassword: {
        password: null,
        currentPassword: null,
        c_password: null,
      },
    };
  },
  created() {
    this.getStudentDetails(this.$route.params.id);
  },
  methods: {
    phoneNo(e) {
      let a = [];
      let k = e.which;
      let i;
      for (i = 48; i < 58; i++) a.push(i);

      if (!(a.indexOf(k) >= 0)) e.preventDefault();
    },
    updateStudent() {
      let updatedUser = new FormData();
      updatedUser.append("studentId", this.user._id);
      updatedUser.append("firstName", this.user.firstName);
      updatedUser.append("lastName", this.user.lastName);
      updatedUser.append("email", this.user.email);
      updatedUser.append("residenceCountry", this.user.residenceCountry);
      updatedUser.append("phoneNo", Number(this.user.phoneNo));
      updatedUser.append("gender", this.user.gender);
      updatedUser.append("userImage", this.user.studentImage ? this.user.studentImage : this.user.imagePath);
      updatedUser.append("nationality", this.user.nationality);
      updatedUser.append("dateOfBirth", this.user.dateOfBirth);

      axios
        .patch("admin/updateStudent", updatedUser)
        .then((response) => {
          if (response.data.status == true) {
            this.$router.push({ path: "/students" });
            this.openNotificationWithIcon(
              "success",
              "Student updated successfully",
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
          console.log("admin/updateStudent API failed");
          console.log(e);
          this.openNotificationWithIcon("error", e, "bottomRight");
        });
    },
    getStudentDetails(id) {
      axios
        .get("student/getStudent?id=" + id)
        .then((response) => {
          console.log("student/getStudent", response);
          if (response.data != null) {
            this.user = response.data.user;

            this.user.dateOfBirth = moment(this.user.dateOfBirth).format(
              "YYYY-MM-DD"
            );
            // this.user.dateOfBirth = this.formatDate(this.user.dateOfBirth);
            //   this.user = response.data.map(user => ({
            //   ...user,
            //   dateOfBirth: this.formatDate(user.dateOfBirth),
            // }));
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
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    onAvatarSelected(event) {
      let file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
      }
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
    updateStudentPassword() {
    
      let updatedPassword = new FormData();
      updatedPassword.append(
        "currentPassword",
        this.updatePassword.currentPassword
      );
      updatedPassword.append("userId", this.$route.params.id);
      updatedPassword.append("newPassword", this.updatePassword.password);
      axios
        .patch("admin/resetStudentPassword", {
          userId: this.user._id,
          currentPassword: this.updatePassword.currentPassword,
          newPassword: this.updatePassword.password,
        }, {
          headers: { Authorization: this.$store.state.token }
        })
        .then((response) => {
     console.log('responseee kk k k ',response)
     if (response.data.message === "password reset successfully") {
              this.openNotificationWithIcon(
                "success",
                response.data.message,
                "bottomRight"
              );
              this.$router.push({ path: "/students" });
            }if (response.data.error) {
            this.openNotificationWithIcon(
                "error",
                response.data.error,
                "bottomRight"
              );
            }
            else {
              this.openNotificationWithIcon(
                "error",
                response.data.message,
                "bottomRight"
              );
            }
        })
        .catch((e) => {
          console.log("admin/resetStudentPassword API failed", e);
          this.openNotificationWithIcon("error", e, "bottomRight");
        });
    },
  },
};
</script>

<style scoped>
</style>