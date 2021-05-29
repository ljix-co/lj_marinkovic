<template>
  <div class="gallery" :style="{height: gallery_hight}">
    <i
      :class="{
        'fas fa-times exit': enlarged === false,
      }"
      @click="goBack()"
    ></i>
    <i
      :class="{ 'fas fa-times exit': enlarged }"
      @click="exitLargeGallery()"
    ></i>
    <transition name="fade">
      <div class="content" v-if="enlarged === false" ref="content">
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
            <div v-lazyload class="tooltip">
              <img
                :key="'img' + elementKey"
                class="img-gallery"
                :class="{ 'img-selected': image.selected }"
                :data-url="image.img_path"
                alt=""
                @click="showLarge(image, index)"
                src="../../public/images/placeholder.gif"
              />
              <span class="tooltiptxt">{{ $t("tooltips.nav-gallery") }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="enlarged"
        :class="{ 'enlarged-gallery': enlarged, 'no-show': enlarged === false }"
      >
        <photo-slider
          :key="'p' + componentKey"
          :images="photoslider_imgs"
          :chosen_image="chosen_image"
        ></photo-slider>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import PhotoSlider from "./PhotoSlider.vue";
import { scrollToElement } from "../mixins/scrollToElement.js";
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
      componentKey: 0,
      elementKey: 0,
      gallery_hight: '150px'
    };
  },
  mixins: [scrollToElement],
  methods: {
    ...mapActions(["changeLoader"]),
    exitLargeGallery() {
      this.enlarged = false;
      setTimeout(() => {
        this.scrollToElement("img-selected");
      }, 500);
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
      setTimeout(() => {
      this.gallery_hight = this.$refs.content.clientHeight + 100 + 'px';
      this.scrollToElement('title')
      }, 500);
      console.log(this.gallery_hight)
    //  window.scrollTo(0,0)
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
      for (let i = 0; i < this.images.length; i++) {
        this.photoslider_imgs.push({
          path: this.images[i].img_path,
          id: this.images[i].img_id,
        });
        if (this.images[i].selected === true) {
          this.images[i].selected = false;
        }
        if (image === this.images[i]) {
          this.images[i].selected = true;
          this.elementKey += 1;
        }
      }
      this.chosen_image = image;
      this.componentKey += 1;
      window.scrollTo(0, 0);
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
  height: 30vh;
  object-fit: contain;
  background-color: #7e7e7e;
}

.content {
  display: flex;
  gap: 1rem;
  position: absolute;
  top: 10vh;
  left: 10vw;
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
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
}

.exit {
  position: fixed;
  top: 10vh;
  left: 92vw;
  font-size: 3rem;
  z-index: 2;
}
.gallery {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh;
}

.images {
  display: flex;
  flex-wrap: wrap;
  width: 50vw;
  margin-top: 10vh;
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
  border-bottom: 1px solid #27f2cb;
}
.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -20vw;
  background-color: #63f8daab;
  width: 20vw;
  transition-delay: 0.2s;
  visibility: hidden;
}
.tooltip:hover .tooltiptxt {
  visibility: visible;
}
.txt {
  border-right: 3px solid #27f2cb;
  width: 30vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10vh;
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
img{
width: 50vw;
}
.content{
width: 90vw;
left: 1rem;
}
.description{
width: 30vw;
}
.exit{
font-size: 2rem;
left: 95vw;
}
.title{
width: 30vw;
font-size: 1.5rem;
}
.txt{
width: 35vw;
}
}
@media only screen and (max-width: 768px) {
img{
width: 90vw;
}
  .content {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    left: 0;
  }
  .description {
    width: 80vw;
  }
  .enlarged-img {
    width: 100vw;
  }

  .exit {
    top: 5vh;
    left: 0;
    height: 5vh;
    width: 95vw;
    background-color: #fff7f9;
  text-align: end;
  }
  .images{
  width: 90vw;
  margin-top: 5vh;
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
  .title{
  width: 80vw;
  }
  .txt {
    width: 90vw;
    margin-top: 5vh;
  }
}
</style>