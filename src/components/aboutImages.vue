<template>
  <div class="col-6">
    <div class="d-flex">
      <input
        type="file"
        class="btn btn-primary btn-sm"
        accept=".pdf, .jpg, .jpeg"
        @change="submit"
        multiple
      />
      <span
        v-for="(item, ind) in localImages ? localImages : imageAttribute"
        :key="ind"
      >
        <img
          class="ml-3 mr-3"
          width="40px"
          :src="localImages ? item : APIServerImage + item"
          :alt="item"
        />
      </span>

      <!-- <img
        width="30px"
        :src="localImage ? localImage : APIServerImage + imageAttribute"
        :alt="imageAttribute"
      /> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "aboutImages",
  props: ["imageAttribute"],
  data() {
    return {
      localImages: null,
      APIServerImage: process.env.VUE_APP_SERVER_ADDRESS_IMAGE,
    };
  },
  methods: {
    changeToLocalImage(images) {
      let imgArr = new Array();
      images.forEach((el) => {
        let singleImg = window.URL.createObjectURL(el);
        imgArr.push(singleImg);
        console.log(singleImg, "images");
      });
      this.localImages = imgArr;
    },
    submit($event) {
      this.changeToLocalImage($event.target.files);

      this.$emit("emitImage", $event);
    },
  },
};
</script>