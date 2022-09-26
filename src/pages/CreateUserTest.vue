<template>
  <div class="create-user">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <h5><strong>Create User Test</strong></h5>
                <span class="back" @click="move('/user-tests')"
                  ><i class="fa fa-user"></i>
                  <strong class="back">User Tests</strong></span
                >
                <i class="fa fa-chevron-right"></i
                ><strong>Create User Test</strong>
              </div>
            </div>
            <div class="row mt-5 mx-md-3">
              <div class="col-12">
                <form @submit.prevent="submit">
                  <div class="row">
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="title"><strong>Title*</strong></label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="form.title"
                          required
                        />
                      </div>
                    </div>
                    
                    
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="testDuration"
                          ><strong>Test Duration*</strong></label
                        >
                        <input
                          class="form-control"
                          v-model="form.testDuration"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="testType"
                          ><strong>Test Type*</strong></label
                        >
                        <input
                          class="form-control"
                          v-model="form.testType"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6 col-xl-4 mt-2">
                      <div class="form-group">
                        <label for="job_title"
                          ><strong>courseId*</strong></label
                        >
                        <input
                          class="form-control"
                          v-model="form.courseId"
                          required
                        />
                      </div>
                    </div>

                    <div class="col-12 mt-3 text-right">
                      <button class="btn btn-primary">Create User Test</button>
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
export default {
  name: "CreateUser",
  data() {
    return {
      image: null,
      APIServer: process.env.VUE_APP_SERVER_ADDRESS,
      form: {
        title: null,
        questionsLimit: null,
        passingPercentage: null,
        testDuration: null,
        testType: null,
        courseId: null,
      },
    };
  },
  methods: {
    move(to) {
      this.$router.push({ path: to });
    },

    openNotificationWithIcon(type, message, place) {
      this.$notification[type]({
        message: "Response",
        description: message,
        place,
      });
    },

    submit() {
      //   this.loading = true;
      // console.log("saving user");
      // let newForm = new FormData();
      // newForm.append("title", this.form.title);
      // newForm.append("questionsLimit", this.form.questionsLimit);
      // newForm.append("passingPercentage", this.form.passingPercentage);
      // newForm.append("testDuration", this.form.testDuration);
      // newForm.append("testType", this.form.testType);
      // newForm.append("courseId", this.form.courseId);
      axios
        .post(this.APIServer + "admin/createTest", this.form, {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data)
          if (response.data.status) {
            this.$router.push({ path: "users" });
            this.openNotificationWithIcon(
              "success",
              "User test added successfully",
              "bottomRight"
            );
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
          console.log("admin/createTest API failed");
          console.log(e);
          this.openNotificationWithIcon(
            "error",
            "Internal error",
            "bottomRight"
          );
        });
    },
  },
};
</script>
