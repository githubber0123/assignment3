<template>
  <div class="home-page">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6 col-6 col-sm-6 col-xs-6">
                <h5><strong>Home Page</strong></h5>
              </div>
              <div class="col-12 mt-3">
                <h6><strong>Slider Section</strong></h6>
              </div>
              <div class="col-12 mt-3">
                <label for=""
                  ><strong>Select at Least 3 Slider Images</strong></label
                >
                <br />
                <input
                  type="file"
                  class="btn btn-primary btn-sm"
                  accept=".pdf, .jpg, .jpeg"
                  @change="changeToLocalImage($event.target.files);"
                  multiple
                />
                <span v-for="(item, ind) in sliderImagesPath ? sliderImagesPath : data.sliderImagesPath" :key="ind">
                  <img
                    class="ml-3 mr-3"
                    width="30px"
                    :src="sliderImagesPath ? item : APIServerImage + item"
                    alt=""
                  />
                </span>
              </div>
              <div class="col-12 col-md-6 mt-3">
                <div class="content-area">
                  <h6 class="text-center"><strong>English</strong></h6>
                  <div class="form-group">
                    <label for="title"><strong>Slider Text*</strong></label>
                    <textarea
                      style="width: 100%; height: 100px; padding: 5px"
                      v-model="data.sliderTextEnglish"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 mt-3">
                <div class="content-area">
                  <h6 class="text-center"><strong>Arabic</strong></h6>
                  <div class="form-group">
                    <label for="title"><strong>Slider Text*</strong></label>
                    <textarea
                      style="width: 100%; height: 100px; padding: 5px"
                      v-model="data.sliderTextArabic"
                    >
                    </textarea>
                  </div>
                </div>
              </div>

              <div class="col-12 mt-5">
                <h6>
                  <strong
                    >Well come to STD MNG group &amp; institutes section</strong
                  >
                </h6>
              </div>
              <div class="col-12 col-md-6 mt-3">
                <div class="content-area">
                  <h6 class="text-center"><strong>English</strong></h6>
                  <div class="form-group">
                    <label for="title"><strong>Enter Title*</strong></label>
                    <input
                      type="text"
                      v-model="data.titleEnglish"
                      class="form-control mb-3"
                      placeholder="Enter Title"
                    />
                  </div>
                  <div class="form-group">
                    <label for="title"><strong>Tagline*</strong></label>
                    <input
                      type="text"
                      v-model="data.taglineEnglish"
                      class="form-control mb-3"
                      placeholder="Tagline"
                    />
                  </div>
                  <div class="form-group">
                    <label for="title"><strong>Description*</strong></label>
                    <textarea
                      style="width: 100%; height: 100px; padding: 5px"
                      v-model="data.descriptionEnglish"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 mt-3">
                <div class="content-area">
                  <h6 class="text-center"><strong>Arabic</strong></h6>
                  <div class="form-group">
                    <label for="title"><strong>Enter Title*</strong></label>
                    <input
                      type="text"
                      v-model="data.titleArabic"
                      class="form-control mb-3"
                      placeholder="Enter Title"
                    />
                  </div>
                  <div class="form-group">
                    <label for="title"><strong>Tagline*</strong></label>
                    <input
                      type="text"
                      v-model="data.taglineArabic"
                      class="form-control mb-3"
                      placeholder="Tagline"
                    />
                  </div>
                  <div class="form-group">
                    <label for="title"><strong>Description*</strong></label>
                    <textarea
                      style="width: 100%; height: 100px; padding: 5px"
                      v-model="data.descriptionArabic"
                    >
                    </textarea>
                  </div>
                </div>
              </div>

              <div class="col-12 text-right mt-3">
                <button @click="saveHomeDetails()" class="btn btn-primary">
                  Update Information
                </button>
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
export default {
  name: "HomePage",
  components: {
    VueEditor,
  },
  created() {
    this.getHomePageData();
  },
  data() {
    return {
      isFileUploaded: false,
      sliderImagesPath: null,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
      features: [],
      courseCategories: [],
      goldenGallery: [],
      packages: [],
      data: {
        sliderTextEnglish: "",
        sliderTextArabic: "",
        sliderImages: [],
        titleEnglish: "",
        titleArabic: "",
        taglineEnglish: "",
        taglineArabic: "",
        descriptionArabic: "",
        descriptionEnglish: "",
      },
    };
  },
  methods: {
    getHomePageData() {
      axios
        .get("admin/getHome", {
          headers: { Authorization: this.$store.state.token },
        })
        .then((response) => {
          this.data = response.data;
        });
    },
    openNotificationWithIcon(type, message, placement) {
      this.$notification[type]({
        message: "Response",
        description: message,
        placement,
      });
    },
    changeToLocalImage(images) {
        this.data.sliderImagesPath = images;
      let imgArr = new Array();
      images.forEach((el) => {
      
      let singleImg = window.URL.createObjectURL(el);
        imgArr.push(singleImg);
        console.log(singleImg,'images')
      });
      this.sliderImagesPath = imgArr;
    },
    saveHomeDetails() {
      let updateHome = new FormData();
      updateHome.append("homeId", this.data._id);
      updateHome.append("sliderTextEnglish", this.data.sliderTextEnglish);
      updateHome.append("sliderTextArabic", this.data.sliderTextArabic);
      updateHome.append("titleEnglish", this.data.titleEnglish);
      updateHome.append("taglineEnglish", this.data.taglineEnglish);
      updateHome.append("descriptionEnglish", this.data.descriptionEnglish);
      updateHome.append("titleArabic", this.data.titleArabic);
      updateHome.append("taglineArabic", this.data.taglineArabic);
      updateHome.append("descriptionArabic", this.data.descriptionArabic);
      this.data.sliderImagesPath.forEach((file) => {
        updateHome.append("sliderImages", file);
      });
      console.log("aaaa", ...updateHome);

      axios
        .patch("admin/updateHome", updateHome, {
          headers: {
            Authorization: this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status == true) {
            this.openNotificationWithIcon(
              "success",
              "Header updated successfully",
              "bottomRight"
            );
            this.getHomePageData();
          } else {
            console.log(response.data);
            this.openNotificationWithIcon("warning", "Error", "bottomRight");
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