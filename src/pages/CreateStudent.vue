<template>
  <div class="create-user">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Create Student</strong></h5>
                <span class="back" @click="move('/students')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">Students</strong></span
                >
                <i class="fa fa-chevron-right"></i
                ><strong>Create Student</strong>
              </div>
            </div>
            <div class="row mt-5 mx-md-3">
              <!-- <div class="col-12 ">
                                <label for="firstName"><strong>Upload userImage</strong></label> <br>
                                <input type="file" class="btn btn-primary" accept="userImage/*"  @change="onAvatarSelected" ref="AvatarInput">
                            </div>          -->
              <div class="col-12">
                <form @submit.prevent>
                  <div class="row">
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="firstName"
                          ><strong>First Name*</strong></label
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
                        <label for="lastName"
                          ><strong>Last Name*</strong></label
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
                        <label for="email"><strong>email*</strong></label>
                        <input
                          type="email"
                          class="form-control"
                          v-model="user.email"
                          placeholder="Enter email"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="password"><strong>Password*</strong></label>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Enter Password"
                          v-model="user.password"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="mobile"><strong>Phone*</strong></label>
                        <input
                          type="tel"
                          class="form-control"
                          v-model="user.phoneNo"
                          placeholder="Enter phoneNo"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"><strong>Country*</strong></label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Country"
                          v-model="user.residenceCountry"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="nationality"
                          ><strong>Nationanlity*</strong></label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.nationality"
                          placeholder="Enter nationality"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"
                          ><strong>Date of Birth*</strong></label
                        >
                        <input
                          type="date"
                          v-model="user.dateOfBirth"
                          class="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"><strong>Gender*</strong></label>
                        <select
                          v-model="user.gender"
                          class="form-control"
                          required
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"
                          ><strong>Course Learning*</strong></label
                        >
                        <select
                          v-model="user.courseLearningMethod"
                          class="form-control"
                          required
                        >
                          <option value="manual">Manual</option>
                          <option value="automated">Automated</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"><strong>Test Type*</strong></label>
                        <select
                          v-model="user.testType"
                          class="form-control"
                          required
                        >
                          <option value="basic">Basic</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="testDate"
                          ><strong>Test Date*</strong></label
                        >
                        <input
                          type="date"
                          v-model="user.testDate"
                          class="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="gender"
                          ><strong>Course Selection*</strong></label
                        >
                        <select
                          v-model="user.courses"
                          class="form-control"
                          required
                        >
                          <option value="car driving">Car Driving</option>
                          <option value="truck driving">Truck Driving</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-12 mt-3 text-right">
                      <button @click="saveNewStudent" class="btn btn-primary">
                        Create Student
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
import mixin from "../containers/mixin";
import axios from 'axios';
export default {
  name: "CreateUser",
  methods: {
    move(to) {
      this.$router.push({ path: to });
    },
    pickAvatar() {
      this.$refs.AvatarInput.click();
    },
    onAvatarSelected(event) {
      let file = event.target.files[0];
      if (file) {
        this.userImage = URL.createObjectURL(file);
      }
    },
    saveNewStudent() {
      console.log("saving student");
      let newStudent = new FormData();
      newStudent.append("firstName", this.user.firstName);
      newStudent.append("lastName", this.user.lastName);
      newStudent.append("email", this.user.email);
      newStudent.append("password", this.user.password);
      newStudent.append("c_password", this.user.password);
      newStudent.append("phoneNo", this.user.phoneNo);
      newStudent.append("gender", this.user.gender);
      newStudent.append("residenceCountry", this.user.residenceCountry);
      newStudent.append("nationality", this.user.residenceCountry + "i");
      newStudent.append("dateOfBirth", this.user.dateOfBirth);
      newStudent.append("courseLearningMethod", this.user.courseLearningMethod);
      newStudent.append("testType", this.user.testType);
      newStudent.append("testDate", this.user.testDate);
      // newStudent.append("courses", this.user.courses);
      // newStudent.append("userImage", this.user.userImage);
      console.log("saving student2");
      axios
        .post("http://localhost:8000/api/student/studentSignUp", this.newStudent)
        .then((response) => {
          if (response.data.status) {
            this.openNotificationWithIcon(
              "success",
              "Student added successfully",
              "bottomRight"
            );
            this.move("/students");
          } else {
            this.openNotificationWithIcon(
              "warning",
              response.data.message,
              "bottomRight"
            );
          }
        })
        .catch((e) => {
          console.log("student/studentSignup API failed", e);
          this.openNotificationWithIcon("error", e.error, "bottomRight");
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
  data() {
    return {
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      userImage: null,
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        c_password: null,
        phoneNo: null,
        residenceCountry: null,
        gender: null,
        nationality: null,
        testDate: null,
        testType: null,
        dateOfBirth: null,
        courseLearningMethod: null,
        courses: null,
        userImage: "https://www.w3schools.com/howto/img_avatar.png",
      },
    };
  },
};
</script>
