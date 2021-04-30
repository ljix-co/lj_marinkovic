<template>
  <div class="home" v-scroll="scrollEvent">
    <div class="home-nav">
      <div class="nav">
        <p @click="goToArtworks">{{ $t("home.nav[0].txt") }}</p>
      </div>
      <div class="nav" v-if="order_web_form === false">
        <p @click="orderWeb">{{ $t("home.nav[1].txt") }}</p>
      </div>
    </div>
    <div class="start-img" v-if="scrollIndex === 0">
      <img class="img-prof" src="../../public/images/portret.png" alt="" />
    </div>
    <div class="web-img" v-if="scrollIndex === 1">
      <img class="logo-img" src="../../public/images/mars.svg" alt="" />
      <img class="logo-img" src="../../public/images/vue_logo.png" alt="" />
      <img class="logo-img" src="../../public/images/js_logo.png" alt="" />
    </div>
    <div class="art-img" v-if="scrollIndex === 2 && order_web_form === false">
      <img
        class="detail-img"
        src="../../public/images/art_detail_2.png"
        alt=""
      />
    </div>
    <div class="pg" v-if="order_web_form === false">
      <div class="web-title">
        <div class="name-div">
          <div class="f-name">
            <p class="f-letter">LJ</p>
            <p class="name">ILJANA</p>
          </div>
          <div class="f-name">
            <p class="f-letter">M</p>
            <p class="name">ARINKOVIĆ</p>
          </div>
        </div>
        <p class="occup">{{ $t("home.subtitle") }}</p>
      </div>
      <div class="content">
        <div class="category-txt" v-if="scrollIndex === 0">
          <p class="intro-txt">
            {{ $t("home.description") }}
          </p>
        </div>
        <div class="category" v-if="scrollIndex === 1">
          <p class="cat-title">
            {{ $t("home.categories[1].title") }}
          </p>
          <div class="cat-line"></div>
          <div class="tooltip">
            <img
              class="img"
              src="../../public/images/nat.png"
              alt=""
              @click="goToProjects"
            />
            <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
          </div>
          <p class="cat-desc">{{ $t("home.web_desc") }}</p>
        </div>
        <div class="category" v-if="scrollIndex === 2">
          <p class="cat-title">{{ $t("home.categories[0].title") }}</p>
          <div class="cat-line"></div>
          <div class="tooltip">
            <img
              class="img"
              src="../../public/images/art.png"
              alt=""
              @click="goToExhibitions"
            />
            <span class="tooltiptxt">{{ $t("tooltips.nav") }}</span>
          </div>
          <p class="cat-desc">{{ $t("home.art_desc") }}</p>
        </div>

        <div
          class="scroll"
          :class="{
            'scroll-top': scrollIndex === 0,
            'scroll-med': scrollIndex === 1,
            'scroll-bottom': scrollIndex === 2,
          }"
        >
          <div class="arrow-line">
            <div class="line"></div>
            <div class="arrow"></div>
          </div>
          <p class="nav-scroll" v-if="scrollIndex !== 2">
            {{ $t("home.nav[2].txt") }}
          </p>
          <p class="nav-scroll-back" v-if="scrollIndex === 2">
            {{ $t("home.nav[3].txt") }}
          </p>
        </div>
      </div>
    </div>
    <div class="order-form" v-if="order_web_form">
      <h1 class="order-title">{{ $t("home.order_title") }}</h1>
      <i class="fas fa-times order-exit" @click="exitOrderWeb"></i>
      <div class="instr">
        <p>{{ $t("home.order_instr") }}</p>
      </div>
      <div class="inpts">
        <div class="inpt-lbl">
          <label for="">{{ $t("home.inpt_lbl.website_type") }}</label>
          <select name="" id="">
          <option v-for="(i, index) in web_types_index_arr" :key="'w' + index" :value="i">{{$t(`home.website_types[${i}].type`)}}</option>
          </select>

          <label for="">{{ $t("home.inpt_lbl.photo-editing") }}</label>
          <select name="" id="">
          <option value="1">{{$t('select.yes')}}</option>
           <option value="0">{{$t('select.no')}}</option>
          </select>
        </div>
        <div class="inpt-lbl">
          <label for="">{{ $t("home.inpt_lbl.domain") }}</label>
          <input type="text" v-model="domain"/>
          <!-- </div>
        <div class="inpt-lbl"> -->
          <label for="">{{ $t("home.inpt_lbl.fullname") }}</label>
          <input type="text"  v-model="fullname"/>
          <!-- </div>
        <div class="inpt-lbl"> -->
          <label for="">{{ $t("home.inpt_lbl.email") }}</label>
          <input type="text"  v-model="email_address"/>
        </div>
      </div>
      <div class="instr">
        <p>{{ $t("home.send_email") }}</p>
      </div>
      <div class="editor">
        <vue-editor v-model="message"></vue-editor>
      </div>
      <button>{{ $t("buttons.send") }}</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",

  data() {
    return {
      scrollIndex: 0,
      lastScrollPosition: 0,
      order_web_form: false,
      web_types_index_arr: [0, 1, 2, 3, 4],
      domain: "",
      fullname: "",
      email_address: "",
      message: ""
    };
  },

  methods: {
    exitOrderWeb() {
      this.order_web_form = false;
      // window.scrollTo(this.lastScrollPosition)
    },
    goToArtworks() {
      this.$router.push({ name: "Artworks" });
    },
    goToExhibitions() {
      this.$router.push({ name: "Exhibitions" });
    },
    goToProjects() {
      this.$router.push({ name: "Projects" });
    },
    orderWeb() {
      this.order_web_form = true;
      window.scrollTo(0, 0);
    },
    scrollEvent() {
      if (window.scrollY < 150) {
        this.scrollIndex = 0;
        // this.lastScrollPosition = window.scrollY;
      }
      if (window.scrollY > 200 && window.scrollY < 490) {
        this.scrollIndex = 1;
        // this.lastScrollPosition = window.scrollY;
      }
      if (window.scrollY > 500) {
        this.scrollIndex = 2;
        // this.lastScrollPosition = window.scrollY + ',' + window.scrollX;
      }
    },
  },
  computed: {},
  mounted() {
    // window.addEventListener('scroll', this.scrollEvent())
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Megrim&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
@keyframes down_in {
  from {
    top: -100px;
  }
  to {
    top: 0px;
  }
}

h3 {
  margin-top: 1vh;
}
p {
  font-size: 1.2rem;
}
label {
  font-size: 1.5rem;
}
select{
width: 15vw;
height: 5vh;
border-radius: 10px;

}
.arrow {
  /*
  width: 0;
  height: 0;
  border-top: 20px solid #27f2cb;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  transform: rotate(-45deg);*/
}
.arrow-line {
  /*
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;*/
}
.art-img {
  position: fixed;
  left: 0;
  top: 20vh;
}
.category {
  width: 55vw;
  display: flex;

  align-items: flex-start;
  justify-content: flex-start;

  min-height: 50vh;
  position: fixed;
  top: 40vh;
  left: 25vw;
}
.cat-desc {
  width: 25vw;
  text-align: justify;
  margin-left: 1rem;
}
.cat-line {
  width: 2px;
  background-color: #27f2cb;
  height: 35vh;
  margin-right: 1rem;
}
.category-txt {
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 40vw;
  min-height: 50vh;
  position: fixed;
  top: 35vh;
  left: 30vw;
}
.cat-title {
  font-size: 2rem;
  transform: rotate(270deg);
  width: 5vw;
  margin-top: 25vh;
}
.detail-img {
  width: 15vw;
  margin-top: 15vh;
  filter: grayscale(50%);
  opacity: 0.7;
}
.f-letter {
  color: #27f2cb;
  font-size: 4.5rem;
  font-family: "HortaRegular", cursive;
}
.f-name {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home {
  height: 1500px;
}
.home-nav {
  position: fixed;
  width: 15vw;
  height: 60vh;
  left: 85vw;
  top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40vh;
}
.img {
  width: 30vw;

  height: 35vh;
  cursor: pointer;
  object-fit: cover;
  /*
border-radius: 2rem;*/
  border-bottom: 7px solid #27f2cb;
}
.img-prof {
  width: 25vw;
}
.inpts {
  width: 50vw;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 5vw;
}
.inpt-lbl {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 15vw;
  gap: 1rem;
}
.instr {
  width: 50vw;
  text-align: justify;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
.intro-txt {
  text-align: justify;
  width: 30vw;
  align-self: center;

  margin-top: 2rem;
}
.line {
  /*
  width: 2px;
  height: 10vh;
  background-color: #27f2cb;*/
}
.logo-img {
  width: 10vw;
  filter: grayscale(30%);
  opacity: 0.8;
}
.name {
  font-size: 4.5rem;
  font-family: "HortaRegular", cursive;
  color: #323131;
}
.name-div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.nav {
  width: 15vw;
  border-bottom: 5px solid #27f2cb;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
}
.nav-scroll {
  /*
  transform: rotate(90deg);*/
  margin-left: -2rem;
  font-size: 1.5rem;
  color: #323131;
  border-bottom: 3px solid #27f2cb;
  font-family: "HortaRegular", cursive;
}
.nav-scroll-back {
  transform: rotate(90deg);
  margin-left: -1rem;
  font-size: 1.5rem;
  color: #323131;
}
.occup {
  font-size: 2rem;
}
.order-exit {
  position: absolute;
  top: 0;
  left: 80vw;
  font-size: 3rem;
  cursor: pointer;
}
.order-form {
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  position: absolute;

  background-color: white;
  border-bottom: 5px solid #27f2cb;
}
.pg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  align-self: center;
  animation: down_in 2s 1;
  position: relative;
  margin-top: 15vh;
}
.scroll {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  position: fixed;
  top: 80vh;
} /*
.scroll-top {
  top: 60vh;
}*/
.scroll-bottom {
  /*transform: rotate(180deg);
  margin-left: -1rem;*/
  visibility: hidden;
}
.start-img {
  position: fixed;
  left: -4rem;
  top: 20vh;
}

.tooltip .tooltiptxt {
  position: absolute;
  margin-left: -30vw;

  background-color: #63f8daab;
  width: 30vw;
  transition-delay: 0.2s;
  visibility: hidden;
}
.tooltip:hover .tooltiptxt {
  visibility: visible;
}
.web-img {
  position: fixed;
  top: 30vh;
  left: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.web-title {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #27f2cb;
  width: 35vw;

  position: fixed;
  top: 20vh;
}
@media only screen and (max-width: 768px) {
  .pg {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .intro-photo {
    width: 100vw;
    height: 100vh;
    position: absolute;
    object-fit: contain;
    z-index: -1;
  }
  .name {
    font-size: 1rem;
    width: 45vw;
    align-self: center;
    /* position: absolute;
  top: 53vh;
  left: 4vw; */
    /* transform: rotate(270deg); */
    /* color: black; */
  }
  .occup {
    /* transform: rotate(270deg); */
    font-size: 1rem;
    margin-left: 1vw;
    width: 60vw;
    /* position: absolute;
  left: 30vw;
  top: 52vh;
  color: #214478; */
  }
  .l-sqr {
    border: none;
    box-shadow: none;
    width: 20vw;
    position: absolute;
    left: 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left-decor {
    display: none;
  }
  .right-decor {
    display: none;
  }
  .web-title {
    margin-left: 0;
    transform: rotate(270deg);
    display: flex;
    width: 120vw;
    height: fit-content;
    margin-bottom: 6vh;
  }
}
</style>