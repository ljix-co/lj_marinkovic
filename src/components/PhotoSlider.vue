<template>
  <div
    :class="{
      'photo-slider': artworks_page,
      'photo-slider-enlarged': artworks_page === false && admin_route === false,
    }"
  >
    <div class="left-side" :class="{ 'left-side-artwork': artworks_page }">
      <div
        class="lines"
        @click="prevImg()"
        :class="{ fade: images.length == 1 }"
      >
        <div class="trq-left-line"></div>
        <div class="gry-left-line"></div>
      </div>
    </div>
    <div class="center" :class="{ 'center-artwork': artworks_page }">
      <div class="delete-img-div" v-if="admin_route">
        <i class="far fa-trash-alt delete" @click="deleteImg()"></i>
      </div>
      <div v-if="artworks_page" class="exit-div" :class="{ 'show-exit': show_slider }">
        <i class="fas fa-times exit" @click="exitSlider"></i>
      </div>
      <img
        :class="{
          artwork_img: artworks_page,
          img: artworks_page === false && admin_route === false,
        }"
        :src="image"
        alt=""
        v-hammer:swipe.left.right="swipeFunction"
      />
      <div class="dot-div">
      <div class="dot" :class="{'selected' : index === index_img}" v-for="(dot, index) in images" :key="'d' + index"></div>
      </div>
    </div>
    <div class="right-side" :class="{ 'right-side-artwork': artworks_page }">
      <div
        class="lines"
        @click="nextImg()"
        :class="{ fade: images.length == 1 }"
      >
        <div class="trq-right-line"></div>
        <div class="gry-right-line"></div>
      </div>
    </div>
  </div>
</template>
<script>
// 
export default {
  props: {
    images: Array,
    chosen_image: Object,
    mob_slider: Boolean,
    mob_width: Boolean,
  },
  data() {
    return {
      image: null,
      index_img: 0,
      admin_route: false,
      show_slider: false,
      artworks_page: false,
    };
  },
  methods: {
    deleteImg() {
      for (let i = 0; i < this.images.length; i++) {
        if (this.image === this.images[i].path) {
          let image_id = this.images[i].id;
          this.$emit("delete-img", image_id);
        }
      }
    },
    checkPage() {
      if (this.$route.name === "Admin") {
        this.admin_route = true;
      }
      if (this.$route.name === "Artworks") {
        this.artworks_page = true;
      }
    },
    exitSlider() {
      this.show_slider = false;
      this.$emit("exit-mob-slider");
    },
    firstImage() {
      if (!this.chosen_image) {
        this.image = this.images[0].path;
      } else if (this.chosen_image) {
        this.showChosenImg();
      }
    },
    forceRerender() {
      this.elementKey++;
    },
    nextImg() {
      if (this.index_img != this.images.length - 1) {
        this.index_img++;
      } else {
        this.index_img = 0;
      }

      this.image = this.images[this.index_img].path;
    },
    prevImg() {
      if (this.index_img != 0) {
        this.index_img--;
      } else {
        this.index_img = this.images.length - 1;
      }
      this.image = this.images[this.index_img].path;
    },
    showChosenImg() {
      for (let i = 0; i < this.images.length; i++) {
        if (this.chosen_image.img_path === this.images[i].path) {
          this.image = this.images[i].path;
          this.index_img = i;
        }
      }
    },
    showSlider() {
      if (this.mob_slider === true) {
        this.show_slider = true;
      }
    },
    swipeFunction(event) {
      if (event.type === "swipeleft") {
        this.nextImg();
      }
      if (event.type === "swiperight") {
        this.prevImg();
      }
    },
  },
  mounted() {
    this.firstImage();
    this.checkPage();
  },
  watch: {
    chosen_image: {
      deep: true,

      handler() {
        if (this.chosen_image !== null) {
          this.showChosenImg();
          this.showSlider();
        }
      },
    },
    mob_slider: {
      immediate: true,
      handler() {
        if (this.mob_slider === true && this.artworks_page === true) {
          this.showSlider();
        }
      },
    },
  },
};
</script>
<style scoped>
.admin_img {
  width: 30vw;
  height: 50vh;
  object-fit: contain;
}
.artwork_img {
  width: 50vw;
  height: 75vh;
  object-fit: contain;
  background-color: #a6a6a6;
  align-self: center;/*
  border-bottom: 5px solid #27f2cb;*/
}
.center {
  width: 70vw;
  height: 85vh;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.center-artwork {
  height: 75vh;
  margin-top: 13vh;
}
.ctrl {
  font-size: 2rem;
  z-index: 1;
  color: #545454;
}

.delete-img-div {
  font-size: 2rem;
  color: #27f2cb;
  position: absolute;
  width: 30vw;
  text-align: end;
  margin-top: 2rem;
}
.dot{
width: 10px;
height: 5px;

background-color: #545454;
}
.dot-div{
display: flex;
align-items: center;
justify-content: center;
gap: .5rem;
margin-top: 5vh;
}
.exit-div {
  visibility: hidden;
}
.fade {
  opacity: 0.1;
}
.gry-left-line {
  width: 3vw;
  height: 5px;
  background-color: #545454;
}
.gry-right-line {
  width: 3vw;
  height: 5px;
  background-color: #545454;
  margin-left: 3vw;
}
.hide {
  visibility: hidden;
}
.img {
  width: 70vw;
  height: 85vh;
  object-fit: contain;
  background-color: #ebefef;
  align-self: center;/*
  border-bottom: 5px solid #27f2cb;*/
}

.left-side,
.right-side {
  width: 15vw;
  height: 85vh;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-side-artwork,
.right-side-artwork {
  height: 75vh;
  margin-top: 13vh;
}

.photo-slider {
  display: flex;
  align-items: center;
  width: 70vw;
  margin-bottom: 10vh;
  margin-left: 15vw;
}
.photo-slider-enlarged {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
}
.selected{
background-color: #27f2cb;
}
.trq-left-line {
  width: 5vw;
  height: 5px;
  margin-left: 1vw;
  margin-bottom: 0.7rem;
  background-color: #27f2cb;
}
.trq-right-line {
  width: 5vw;
  height: 5px;

  margin-bottom: 0.7rem;
  background-color: #27f2cb;
}

@media only screen and (min-width: 992px) and (max-width: 1280px) {
  .home_img {
    width: 90vw;
    height: 50vh;
    object-fit: contain;
  }

  .slider-home {
    margin-top: 5vh;
    width: 90vw;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .ctrl {
    font-size: 1.5rem;
  }
  .home_img {
    width: 90vw;
    height: 50vh;
    object-fit: contain;
  }
  .exh_img {
    height: 30vh;
  }
  .slider-home {
    margin-top: 5vh;
    width: 90vw;
  }

  .delete-img-div {
    font-size: 1.5rem;
    margin-top: 0;
  }
  .photo-slider {
    margin-left: 14vw;
  }
}
@media only screen and (max-width: 768px) {
  .admin_img {
    width: 80vw;
  }
  .artwork_img,
  .exh_img {
    width: 90vw;
    height: 70vh;
    object-fit: contain;
    background-color: #fff7f9;

  }
  .center {
    width: 100vw;
  }
  .center-artwork{
  height: 100vh;
  margin-top: 0;
  }
  .delete-img-div {
    width: 80vw;
  }
  .dot-div{
  margin-top: 0;
  }
  .exit {
    font-size: 2rem;
    color: #545454;
  }
  .exit-div {
    visibility: visible;
    position: fixed;
    left: 90vw;
    top: 10vh;
  }
  .home_img {
    width: 90vw;
    height: 60vh;
    object-fit: contain;
  }
  .img {
    width: 90vw;
    background-color: #fff7f9;
  }
  .left-side,
  .right-side {
    display: none;
  }
  .photo-slider {
    width: 100vw;
    height: 90vh;
    margin-left: 0;
    position: fixed;
    z-index: 3;
    background-color: #fff7f9;
    top: 10vh;
  }
  .right {
    visibility: hidden;
  }
  .show-exit {
    visibility: visible;

    width: 90vw;
    margin-top: 4.5rem;
    text-align: end;
  }
  .slider-artworks,
  .slider-exh {
    width: 90vw;
    margin-left: 1rem;
  }
  .slider-mob-hide {
    visibility: hidden;
    height: 10vh;
  }
  .slider-mob-show {
    visibility: visible;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: #474646;
    margin-left: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .slider-home {
    width: 100vw;
    margin-top: 0;
  }
}
</style>