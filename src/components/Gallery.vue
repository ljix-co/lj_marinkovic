<template>
  <div class="gallery">
    <i
      :class="{
        'far fa-arrow-alt-circle-left go-back': enlarged === false,
      }"
      @click="goBack()"
    ></i>
    <i
      :class="{ 'far fa-times-circle go-back': enlarged }"
      @click="exitLargeGallery()"
    ></i>
    <div class="content" v-if="enlarged === false">
      <div>
        <div class="txt">
          <div class="title-date">
            <h2 class="title">{{ title.toUpperCase() }}</h2>
            <div>
              <p class="date">{{ date }}</p>
            </div>
          </div>
          <div class="description" v-html="description"></div>
          <div class="description" v-if="review" v-html="review"></div>
        </div>
      </div>
      <div class="images">
        <div v-for="(image, index) in images" :key="index">
          <div  v-lazyload class="tooltip">
            <img
            class="img-gallery"
              :data-url="image.img_path"
              alt=""
              @click="showLarge(image, index)"
              src="../../public/images/placeholder_photo_l.gif"
            />
            <span class="tooltiptxt">{{ $t("tooltips.nav-gallery") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="enlarged"
      :class="{ 'enlarged-gallery': enlarged, 'no-show': enlarged === false }"
    >
    <photo-slider :key="'p' + componentKey" :images="photoslider_imgs" :chosen_image="chosen_image"></photo-slider>
      <!-- <div class="left-side-bar">
        <i
          class="far fa-arrow-alt-circle-left link-btn"
          @click="prevImg(curIndex)"
        ></i>
      </div>
      <img class="enlarged-img" :src="enlarged_img" alt="" />
      <div class="rigth-side-bar">
        <i
          class="far fa-arrow-alt-circle-right link-btn"
          @click="nextImg(curIndex)"
        ></i>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import PhotoSlider from './PhotoSlider.vue';
export default {
  components: { PhotoSlider },
  props: {
    images: Array,
    // description: String,
    // title: String,
    // date: String,
    // review: String,
    chosenExh: Object,
    chosenProj: Object,
  },
  data() {
    return {
      enlarged: false,
      enlarged_img: "",
      curIndex: null,
      description: "",
      title: "",
      date: "",
      review: "",
      photoslider_imgs: [],
      chosen_image: new Object(),
      componentKey: 0
    };
  },
  methods: {
    ...mapActions(["changeLoader"]),
    exitLargeGallery() {
      this.enlarged = false;
    },
    getDetails() {
      if (this.chosenExh) {
        this.description = this.chosenExh.desc;
        this.title = this.chosenExh.title;
        this.date =
          this.chosenExh.exh_date_start +
          " - " +
          this.chosenExh.exh_date_finish;
        this.review = this.chosenExh.rev;
      }
      if (this.chosenProj) {
        this.description = this.chosenProj.desc;
        this.title = this.chosenProj.title;
        this.date = this.chosenProj.proj_year;
      }
    },
    goBack() {
      this.$emit("go-back");
    },

    nextImg(curIndex) {
      this.curIndex = curIndex + 1;

      if (this.curIndex > this.images.length - 1) {
        this.curIndex = 0;
      }
      this.enlarged_img = this.images[this.curIndex].img_path;
    },
    prevImg(curIndex) {
      this.curIndex = curIndex - 1;

      if (this.curIndex < 0) {
        this.curIndex = this.images.length - 1;
      }
      this.enlarged_img = this.images[this.curIndex].img_path;
    },
    showLarge(image, index) {
      this.enlarged = true;
      this.curIndex = index;
      for(let i = 0; i < this.images.length; i++) {
        this.photoslider_imgs.push({path: this.images[i].img_path, id: this.images[i].img_id})
      }
      this.chosen_image = image;
      console.log(this.chosen_image)
      this.componentKey +=1;
      // this.enlarged_img = image.img_path;
    },
  },

  mounted() {
    // this.changeLoader(true);
    this.getDetails();
  },
};
</script>
<style  scoped>
@keyframes in {
  from {
    top: -100px;
  }
  to {
    top: 0px;
  }
}
img {
  width: 20vw;
  /* height: fit-content; */
  /* object-fit: contain; */
  margin-left: 1rem;
  margin-bottom: 0.7rem;
 
  /* align-self: space; */
  min-height: 200px;
}
.content {
  display: flex;
  gap: 1rem;

  margin-top: 10vh;
  align-items: flex-start;
  justify-content: flex-start;
  width: 80vw;
}
.date {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.description {
  text-align: justify;
  width: 20vw;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.enlarged-gallery {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;/*
  background-color: #c8c8ca;*/

}

.exit {
  font-size: 2rem;
  position: fixed;
  left: 22vw;
  top: 0.7rem;
  cursor: pointer;
  z-index: 2;
}
.gallery {
  position: relative;
  animation: in 2s 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.go-back {
  font-size: 2rem;
  position: fixed;
  left: 2vw;
  top: 1.2rem;

  z-index: 2;
  color: #27f2cb;
}
.images {
  display: flex;
  flex-wrap: wrap;

  width: 50vw;
  margin-top: 10vh;
 
  min-height: 90vh;
  gap: 1rem;
}
.link-btn {
  font-size: 3rem;
  cursor: pointer;
  z-index: 1;
}
.no-show {
  visibility: hidden;
}
.no-txt {
  /* visibility: hidden; */
  display: none;
}
.left-side-bar,
.rigth-side-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
.title {
  font-size: 2rem;
  width: 25vw;
}
.title-date {
  border-bottom: 2px solid #27f2cb;
}
.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -20vw;
  background-color: #63f8daab;
  width: 20vw;
  transition-delay: 0.2s;
  visibility: hidden;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.tooltip:hover .tooltiptxt {
  visibility: visible;
}
.txt {
  border-right: 5px solid #27f2cb;
  width: 30vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10vh;
 
}
@media only screen and (max-width: 768px) {
  .content {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }
  .description {
    width: 80vw;
  }
  .enlarged-img {
    width: 100vw;
  }
  .exit {
    top: 4rem;
    left: 1rem;
    background-color: transparent;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .go-back {
    top: 4rem;
    left: 1rem;
    background-color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left-side-bar {
    position: absolute;
    left: 8vw;
    width: 2vw;
  }
  .rigth-side-bar {
    position: absolute;
    left: 90vw;
    width: 2vw;
  }
  .link-btn {
    font-size: 1.5rem;
  }
  .txt {
    width: 90vw;
  }
}
</style>